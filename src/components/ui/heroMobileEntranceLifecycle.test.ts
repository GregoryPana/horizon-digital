// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { enhanceHeroLines } from "./heroLineReveal";

vi.mock("gsap", () => ({ default: { set: vi.fn(), timeline: vi.fn() } }));

describe("phone entrance lifecycle (real late-font event ordering)", () => {
  let root: HTMLElement;
  let cleanup: () => void;
  let frames: Map<number, FrameRequestCallback>;
  let animations: Array<{ play: ReturnType<typeof vi.fn>; pause: ReturnType<typeof vi.fn>; cancel: ReturnType<typeof vi.fn>; playState: string; onfinish: null | (() => void) }>;
  let fonts: EventTarget & { ready: Promise<void> };
  let media: EventTarget & { matches: boolean };
  let intersection: (entries: Array<{ isIntersecting: boolean }>) => void;
  let resize: () => void;
  let metricWidth: number;
  const flushFrames = () => { const pending = [...frames.values()]; frames.clear(); pending.forEach(callback => callback(100)); };
  const started = async () => { cleanup = enhanceHeroLines(root); await Promise.resolve(); flushFrames(); };
  const expectRunning = () => {
    expect(root.dataset.hbePhase).toBe("headline-reveal");
    expect(root.querySelector(".hbe-construction-overlay")).not.toBeNull();
    expect(animations.length).toBeGreaterThan(10);
    expect(animations.every(animation => animation.cancel.mock.calls.length === 0)).toBe(true);
  };
  const expectFinal = () => {
    expect(root.dataset.hbePhase).toBe("final");
    expect(root.querySelector(".hbe-construction-overlay")).toBeNull();
    expect(root.querySelector<HTMLElement>(".hbe-copy-support")!.style.opacity).toBe("");
    expect(document.querySelector<HTMLElement>("[data-site-header]")!.style.opacity).toBe("");
  };
  beforeEach(() => {
    document.body.innerHTML = `<header data-site-header><button>Menu</button></header><section><span class="hbe-kicker">Kicker</span><h1 class="hbe-title-visual"><span class="hbe-title-word">Build</span> <span class="hbe-title-word">better</span></h1><p class="hbe-copy-support">Support</p><ul class="hbe-trust-list"><li>Benefit</li></ul><div class="hbe-actions"><a href="/contact">Contact</a><a href="/work">Work</a></div><i class="hbe-mobile-guides"></i></section>`;
    root = document.querySelector("section")!;
    cleanup = () => {};
    frames = new Map(); animations = []; metricWidth = 300;
    let id = 0;
    vi.stubGlobal("requestAnimationFrame", vi.fn(callback => { frames.set(++id, callback); return id; }));
    vi.stubGlobal("cancelAnimationFrame", vi.fn(id => frames.delete(id)));
    media = Object.assign(new EventTarget(), { matches: false });
    vi.stubGlobal("matchMedia", vi.fn(query => query.includes("prefers-reduced") ? media : { matches: true }));
    fonts = Object.assign(new EventTarget(), { ready: Promise.resolve() });
    Object.defineProperty(document, "timeline", { configurable: true, value: { currentTime: 100 } });
    Object.defineProperty(document, "fonts", { configurable: true, value: fonts });
    Object.defineProperty(document, "hidden", { configurable: true, value: false });
    vi.stubGlobal("IntersectionObserver", class { constructor(callback: typeof intersection) { intersection = callback; } observe() {} disconnect() {} });
    vi.stubGlobal("ResizeObserver", class { constructor(callback: () => void) { resize = callback; } observe() {} disconnect() {} });
    vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockImplementation(() => metricWidth);
    vi.spyOn(HTMLElement.prototype, "offsetWidth", "get").mockImplementation(() => metricWidth);
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(() => ({ top: 0, left: 0, width: metricWidth, height: 24, right: metricWidth, bottom: 24, x: 0, y: 0, toJSON() {} }));
    Object.defineProperty(Element.prototype, "animate", { configurable: true, value: vi.fn(() => {
      const animation = { playState: "paused", onfinish: null, play: vi.fn(), pause: vi.fn(), cancel: vi.fn() };
      animation.play.mockImplementation(() => { animation.playState = "running"; });
      animation.pause.mockImplementation(() => { animation.playState = "paused"; });
      animations.push(animation); return animation;
    }) });
  });
  afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); document.body.innerHTML = ""; });

  it("does not cancel before the first text stage when another page font finishes", async () => {
    await started(); fonts.dispatchEvent(new Event("loadingdone")); flushFrames(); expectRunning();
  });
  it("does not cancel on a same-size initial responsive resize notification", async () => {
    await started(); window.dispatchEvent(new Event("resize")); flushFrames(); expectRunning();
  });
  it("settles when a late font actually changes measured text geometry", async () => {
    await started(); metricWidth += 20; fonts.dispatchEvent(new Event("loadingdone")); flushFrames(); expectFinal();
    expect(animations.every(animation => animation.cancel.mock.calls.length > 0)).toBe(true);
  });
  it("settles on a real viewport height change", async () => {
    await started(); const previous = innerHeight;
    vi.stubGlobal("innerHeight", previous + 80); window.dispatchEvent(new Event("resize")); flushFrames(); expectFinal();
  });
  it("settles on ResizeObserver width change without replay", async () => {
    await started(); metricWidth += 40; resize(); expectFinal();
    const count = animations.length; fonts.dispatchEvent(new Event("loadingdone")); flushFrames(); expect(animations).toHaveLength(count);
  });
  it("settles immediately for actual focus entering a future CTA", async () => {
    await started(); root.querySelector<HTMLAnchorElement>("a")!.focus(); expectFinal(); expect(document.activeElement).toBe(root.querySelector("a"));
  });
  it("does not hide controls already focused before initialization", async () => {
    document.querySelector<HTMLButtonElement>("button")!.focus(); await started(); expectFinal(); expect(animations).toHaveLength(0);
  });
  it("keeps pre-focused header and hero controls visible while font readiness is still pending", async () => {
    let ready!: () => void;
    fonts.ready = new Promise<void>(resolve => { ready = resolve; });
    document.querySelector<HTMLButtonElement>('button')!.focus();
    cleanup = enhanceHeroLines(root);
    expect(document.querySelector<HTMLElement>('[data-site-header]')!.style.opacity).toBe('');
    expect(root.querySelector<HTMLElement>('.hbe-title-visual')!.style.visibility).toBe('');
    expect(root.querySelector<HTMLElement>('a')!.style.opacity).toBe('');
    expect(animations).toHaveLength(0);
    ready();await Promise.resolve();flushFrames();expectFinal();expect(animations).toHaveLength(0);
  });
  it("pauses and resumes the same clocks offscreen", async () => {
    await started(); intersection([{ isIntersecting: false }]); expect(animations.every(a => a.playState === "paused")).toBe(true);
    intersection([{ isIntersecting: true }]); expect(animations.every(a => a.playState === "running")).toBe(true); expectRunning();
  });
  it("pauses and resumes on document visibility changes", async () => {
    await started(); Object.defineProperty(document, "hidden", { configurable: true, value: true }); document.dispatchEvent(new Event("visibilitychange"));
    expect(animations.every(a => a.playState === "paused")).toBe(true);
    Object.defineProperty(document, "hidden", { configurable: true, value: false }); document.dispatchEvent(new Event("visibilitychange")); expectRunning();
  });
  it("settles on live reduced motion and starts visibly under reduced motion", async () => {
    await started(); media.matches = true; media.dispatchEvent(new Event("change")); expectFinal(); cleanup(); animations = [];
    await started(); expectFinal(); expect(animations).toHaveLength(0);
  });
  it("ignores initial pageshow and clears all owned effects on completion", async () => {
    await started(); window.dispatchEvent(new Event("pageshow")); expectRunning(); animations[animations.length - 1].onfinish!(); expectFinal();
  });
  it("cleans listeners and pending callbacks without late font replay", async () => {
    await started(); cleanup(); const count = animations.length;
    fonts.dispatchEvent(new Event("loadingdone")); window.dispatchEvent(new Event("resize")); flushFrames(); expectFinal(); expect(animations).toHaveLength(count); expect(frames.size).toBe(0);
  });
});
