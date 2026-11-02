import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from './lenis.js';
import { mountOriginalScenes } from './original-scenes';

// Register while the lazy module evaluates, before React inserts the Home tree.
// Scene setup and font-ready geometry remain route-mount owned below.
gsap.registerPlugin(ScrollTrigger);

/** Every resource belongs to one route mount, including deferred fonts/image work.
 * No window.lenis/global queue, no killAll, no mutation of another route's clocks. */
export function mountEditorialHome(root: HTMLElement) {
  let active = true;
  const disposers: Array<() => void> = [];
  const observers: Array<{ disconnect(): void }> = [];
  const jobs: Array<() => void> = [];
  const context = gsap.context(() => {}, root);
  const own = <T,>(fn: () => T): T | undefined => {
    if (!active) return;
    let result: T | undefined;
    context.add(() => { result = fn(); });
    return result;
  };
  // Original scripts use standard EventTarget methods. ScrollTrigger's refresh
  // event API is structurally similar, so accept its narrower overload as well.
  const listen = (target: any, type: string, callback: (...args: any[]) => void, options?: any) => {
    const wrapped = (...args: any[]) => own(() => callback(...args));
    target.addEventListener(type, wrapped, options);
    disposers.push(() => target.removeEventListener(type, wrapped, options));
  };
  const observeClass = <T extends new (...args: any[]) => { disconnect(): void }>(Base: T) =>
    class extends Base {
      constructor(...args: any[]) {
        const callback = args[0];
        super((...events: any[]) => own(() => callback(...events)), ...args.slice(1));
        observers.push(this);
      }
    };
  const scopedGsap = Object.create(gsap) as typeof gsap;
  scopedGsap.matchMedia = (...args: Parameters<typeof gsap.matchMedia>) => own(() => gsap.matchMedia(...args))!;
  const scopedDocument = {
    querySelector: (selector: string) => root.querySelector(selector),
    querySelectorAll: (selector: string) => root.querySelectorAll(selector),
    getElementById: (id: string) => root.querySelector(`[id="${CSS.escape(id)}"]`),
    get activeElement() { return document.activeElement; },
    get hidden() { return document.hidden; },
    body: document.body,
    fonts: document.fonts ?? { ready: Promise.resolve() },
    addEventListener: document.addEventListener.bind(document),
    removeEventListener: document.removeEventListener.bind(document),
  };
  let finishReady: () => void = () => {};
  const motionReady = new Promise<void>(resolve => { finishReady = resolve; });
  const diagnostics: { workPreviews?: unknown } = {};
  const refreshScroll = () => { if (active) { ScrollTrigger.sort(); ScrollTrigger.refresh(); } };
  let lenis: Lenis | null = null;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const syncLenis = () => {
    if (!active) return;
    if (reduced.matches) { lenis?.destroy(); lenis = null; return; }
    if (!lenis) {
      lenis = new Lenis({ lerp: 0.09, anchors: false, prevent: node => !!node.closest('[data-lenis-prevent], [role="dialog"]') });
      lenis.on('scroll', ScrollTrigger.update);
    }
    document.hidden || document.body.hasAttribute('data-menu-open') ? lenis.stop() : lenis.start();
  };
  const tick = (seconds: number) => lenis?.raf(seconds * 1000);
  gsap.ticker.add(tick);
  disposers.push(() => { gsap.ticker.remove(tick); lenis?.destroy(); lenis = null; });
  listen(reduced, 'change', syncLenis);
  listen(document, 'visibilitychange', () => {
    root.toggleAttribute('data-home-hidden', document.hidden);
    syncLenis();
  });
  const shellState = new MutationObserver(syncLenis);
  shellState.observe(document.body, { attributes: true, attributeFilter: ['data-menu-open'] });
  observers.push(shellState);
  root.toggleAttribute('data-home-hidden', document.hidden);
  syncLenis();
  const pointer = (event: PointerEvent) => {
    if (event.pointerType === 'touch' || reduced.matches || document.body.hasAttribute('data-ambient-paused') || document.body.hasAttribute('data-menu-open')) return;
    root.style.setProperty('--home-pointer-x', `${event.clientX}px`);
    root.style.setProperty('--home-pointer-y', `${event.clientY}px`);
  };
  listen(root, 'pointermove', pointer);
  // Exposed only on this root for focused lifecycle QA; never a global singleton.
  const state = {
    diagnostics,
    get active() { return active; },
    get lenis() { return lenis; },
    get triggerCount() { return ScrollTrigger.getAll().filter(trigger => trigger.trigger && root.contains(trigger.trigger)).length; },
    get tweenCount() { return context.getTweens().length; },
  };
  Object.defineProperty(root, '__editorialHome', { configurable: true, value: state });
  // Share the same lifecycle-owned capability with legacy window feature tests
  // and its directly injected constructor; otherwise viewport gating is bypassed.
  const OwnedIntersectionObserver = observeClass(IntersectionObserver);
  try {
    own(() => mountOriginalScenes({
      document: scopedDocument,
      window: { gsap: scopedGsap, ScrollTrigger, motionReady, IntersectionObserver: OwnedIntersectionObserver },
      browser: window,
      gsap: scopedGsap,
      ScrollTrigger,
      matchMedia: window.matchMedia.bind(window),
      IntersectionObserver: OwnedIntersectionObserver,
      ResizeObserver: observeClass(ResizeObserver),
      MutationObserver: observeClass(MutationObserver),
      listen,
      alive: () => active,
      diagnostics,
      refreshScroll,
      queueMotion: (setup: () => void) => jobs.push(setup),
    }));
    void (document.fonts?.ready ?? Promise.resolve()).then(() => {
      if (!active) return;
      jobs.forEach(setup => {
        // Preserve v13b's queue guard: on a hash/restored-scroll load, a
        // timeline's deferred refresh can otherwise be re-entered by the next
        // scene after once-triggers remove themselves during initialization.
        for (const trigger of ScrollTrigger.getAll()) {
          if (!trigger.end && trigger.trigger && root.contains(trigger.trigger) && ScrollTrigger.getAll().includes(trigger)) {
            // The runtime accepts the original soft/force flags; public GSAP
            // typings expose only the zero-argument overload.
            (trigger.refresh as (soft: boolean, force: boolean) => void)(false, true);
          }
        }
        own(setup);
      });
      refreshScroll();
      root.dataset.motionReady = 'true';
      finishReady();
    });
  } catch (error) {
    // Static HTML remains fully visible if a platform lacks enhancement APIs.
    context.revert();
    console.error('Editorial homepage enhancement failed', error);
    finishReady();
  }
  return () => {
    active = false;
    finishReady();
    observers.forEach(observer => observer.disconnect());
    disposers.reverse().forEach(dispose => dispose());
    context.revert();
    root.getAnimations({ subtree: true }).forEach(animation => animation.cancel());
    root.removeAttribute('data-motion-ready');
    root.removeAttribute('data-home-hidden');
    root.style.removeProperty('--home-pointer-x');
    root.style.removeProperty('--home-pointer-y');
    delete (root as HTMLElement & { __editorialHome?: unknown }).__editorialHome;
  };
}
