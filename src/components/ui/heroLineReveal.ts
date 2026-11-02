import gsap from "gsap";

export const HERO_LINE_REVEAL = { start: 0.14, duration: 0.42, gap: 0.04, blur: 4 } as const;

/** Group actual browser word rectangles, not editorially guessed line breaks.
 * DOM ownership is bounded to the aria-hidden visual copy and restored on cleanup.
 */
export function enhanceHeroLines(root: HTMLElement) {
  const visual = root.querySelector<HTMLElement>(".hbe-title-visual");
  if (!visual) return () => {};
  const original = visual.innerHTML;
  const media = matchMedia("(prefers-reduced-motion: reduce)");
  let disposed = false;
  let timeline: gsap.core.Timeline | undefined;
  let nativeAnimations: Animation[] = [];
  let nativeStartFrame = 0;
  let nativeStarted = false;
  let blueprint: HTMLDivElement | undefined;
  let width = 0;
  let geometry = "";
  // FontFaceSet.loadingdone is document-wide: unrelated/lazy fonts can finish
  // after this hero's fonts.ready. Compare untransformed layout, not animated
  // rectangles, before invalidating the measured slots. Reads are event-bound.
  const measureGeometry = () => [window.innerWidth, window.innerHeight,
    ...[root, ...root.querySelectorAll<HTMLElement>(".hbe-title-word, .hbe-copy-support, .hbe-trust-list > li, .hbe-actions > a")]
      .flatMap(element => [element.offsetLeft, element.offsetTop, element.offsetWidth, element.offsetHeight]),
  ].join(",");
  let observer: ResizeObserver | undefined;
  const support = root.querySelectorAll(".hbe-kicker, .hbe-copy-support, .hbe-actions, .hbe-trust-list");
  const header = document.querySelector<HTMLElement>("[data-site-header]");
  const phone = matchMedia("(max-width: 767px)").matches;
  const intro = [header, root.querySelector(".hbe-kicker"), root.querySelector(".hbe-copy-support"), ...root.querySelectorAll(".hbe-trust-list > li, .hbe-actions > a")].filter((e): e is HTMLElement => e instanceof HTMLElement);
  const active = document.activeElement;
  let interrupted = active instanceof HTMLElement && (root.contains(active) || Boolean(header?.contains(active)));
  let intersecting = true;
  const syncPlayback = () => nativeStarted && nativeAnimations.forEach(animation => {
    if (document.hidden || !intersecting) animation.pause(); else if (animation.playState === "paused") animation.play();
  });
  const intersection = new IntersectionObserver(([entry]) => { intersecting = entry.isIntersecting; syncPlayback(); });
  intersection.observe(root);
  document.addEventListener("visibilitychange", syncPlayback);
  const finish = () => {
    cancelAnimationFrame(nativeStartFrame); nativeStarted = false;
    timeline?.kill();
    nativeAnimations.forEach(animation => { animation.onfinish = null; animation.cancel(); });
    nativeAnimations = [];
    blueprint?.remove(); blueprint = undefined;
    // Native phone delivery does not need GSAP style parsing/transform caches.
    // Clear only properties owned by this enhancement, including the external header.
    const clear = (elements: Iterable<Element>, properties: string[]) => {
      for (const element of elements) for (const property of properties) (element as HTMLElement).style.removeProperty(property);
    };
    clear(visual.querySelectorAll(".hbe-title-line"), ["transform", "opacity", "visibility", "filter", "will-change", "clip-path"]);
    clear([...support, ...intro], ["transform", "opacity", "visibility", "will-change", "clip-path"]);
    clear(root.querySelectorAll(".hbe-mobile-guides, .hbe-action-resolve"), ["opacity", "visibility", "transform"]);
    root.dataset.hbePhase = "final";
  };
  const layout = (animate: boolean) => {
    finish();
    visual.innerHTML = original;
    const words = [...visual.querySelectorAll<HTMLElement>(".hbe-title-word")];
    const groups: HTMLElement[][] = [];
    let top = -Infinity;
    for (const word of words) {
      const y = word.getBoundingClientRect().top;
      if (Math.abs(y - top) > 2) { groups.push([]); top = y; }
      groups[groups.length - 1].push(word);
    }
    visual.replaceChildren();
    for (const group of groups) {
      const line = document.createElement("span");
      line.className = "hbe-title-line";
      group.forEach((word, i) => { if (i) line.append(" "); line.append(word); });
      visual.append(line);
    }
    width = visual.clientWidth;
    geometry = measureGeometry();
    root.dataset.hbeLineCount = String(groups.length);
    const lines = visual.querySelectorAll(".hbe-title-line");
    if (!animate || media.matches || interrupted) { finish(); return; }
    root.dataset.hbePhase = "headline-reveal";
    if (!phone || typeof visual.animate !== "function") gsap.set(lines, { autoAlpha: 0, y: 8, filter: `blur(${HERO_LINE_REVEAL.blur}px)` });
    // Finite native phone sequence: header → eyebrow → rendered lines → copy → benefits → actions.
    // Only the small headline surface uses blur. Future stages stay fully transparent.
    if (phone && typeof visual.animate === "function") {
      // One font-ready geometry pass. Decorative bars/frames, never future text.
      blueprint = document.createElement("div");
      blueprint.className = "hbe-construction-overlay";
      blueprint.setAttribute("aria-hidden", "true");
      const bounds = root.getBoundingClientRect();
      const targets = [...lines, root.querySelector(".hbe-copy-support"), ...root.querySelectorAll(".hbe-trust-list > li, .hbe-actions > a")].filter((e): e is HTMLElement => e instanceof HTMLElement);
      const slots = new Map<Element, HTMLElement>();
      for (const target of targets) {
        const r = target.getBoundingClientRect();
        const slot = document.createElement("i");
        slot.className = target.matches(".hbe-actions > a") ? "hbe-blueprint-slot hbe-blueprint-button" : "hbe-blueprint-slot";
        slot.dataset.blueprintFor = target.className;
        Object.assign(slot.style, { left: `${r.left - bounds.left}px`, top: `${r.top - bounds.top}px`, width: `${r.width}px`, height: `${r.height}px` });
        slot.style.borderRadius = getComputedStyle(target).borderRadius;
        const beam = document.createElement("b"); beam.className = "hbe-laser-edge";
        slot.append(beam); blueprint.append(slot); slots.set(target, slot);
      }
      root.append(blueprint);
      const animate = (element: Element | null, frames: Keyframe[], duration: number, delay = 0) => {
        if (!element) return undefined;
        const animation = element.animate(frames, { duration: duration * 1000, delay: delay * 1000, fill: "both", easing: slots.has(element) ? "linear" : "cubic-bezier(.2,.7,.3,1)" });
        animation.pause();
        nativeAnimations.push(animation);
        const slot = slots.get(element);
        if (slot) {
          // Hold the whole transparent cross-box until its own ink is resolved.
          const wash = slot.animate([{ opacity: 1 }, { opacity: 1, offset: 0.78 }, { opacity: 0 }], { duration: duration * 1000, delay: delay * 1000, fill: "both", easing: "linear" });
          wash.pause(); nativeAnimations.push(wash);
          if (!slot.classList.contains("hbe-blueprint-button")) {
            const beam = slot.firstElementChild!;
            const travel = beam.animate([
              { transform: "translateX(0px)", opacity: 0 },
              { opacity: 1, offset: 0.04 },
              { opacity: 1, offset: 0.94 },
              { transform: `translateX(${parseFloat(slot.style.width)}px)`, opacity: 0 },
            ], { duration: duration * 1000, delay: delay * 1000, fill: "both", easing: "linear" });
            travel.pause(); nativeAnimations.push(travel);
          }
        }
        return animation;
      };
      const entrance = [{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "translateY(0)" }];
      let cursor = 0;
      for (const element of [header, root.querySelector(".hbe-kicker")]) {
        if (!element) continue;
        animate(element, entrance, 0.17, cursor); cursor += 0.18;
      }
      const phoneLineDuration = 0.30, phoneLineGap = 0.015;
      // Reveal the existing live typography; the thin beam follows the same linear boundary.
      // Spatial text creation, deliberately not a font-outline/path tracing claim.
      const ink = [
        { opacity: 0, visibility: "hidden", clipPath: "inset(0 100% 0 0)" },
        { opacity: 1, visibility: "visible", clipPath: "inset(0 99.9% 0 0)", offset: 0.001 },
        { opacity: 1, visibility: "visible", clipPath: "inset(0 0% 0 0)" },
      ];
      lines.forEach((line, i) => animate(line, ink, phoneLineDuration, cursor + i * (phoneLineDuration + phoneLineGap)));
      cursor += groups.length * (phoneLineDuration + phoneLineGap);
      animate(root.querySelector(".hbe-copy-support"), ink, 0.22, cursor); cursor += 0.23;
      const benefits = [...root.querySelectorAll(".hbe-trust-list > li")];
      benefits.forEach((item, i) => animate(item, ink, 0.16, cursor + i * 0.04));
      if (benefits.length) cursor += 0.16 + (benefits.length - 1) * 0.04 + 0.01;
      const actions = [...root.querySelectorAll(".hbe-actions > a")];
      // Invisible future controls stay keyboard-focusable; focus settles the entire intro.
      const actionInk = ink.map(frame => ({ ...frame, visibility: "visible" }));
      actions.forEach((item, i) => animate(item, actionInk, 0.22, cursor + i * 0.23));
      cursor += actions.length * 0.23;
      const guides = animate(root.querySelector(".hbe-mobile-guides"), [{ opacity: 0 }, { opacity: 0.3, offset: 0.12 }, { opacity: 0.3, offset: 0.7 }, { opacity: 0 }], cursor);
      if (guides) guides.onfinish = finish;
      // Start on a fresh rendered frame, not a stale document clock during bootstrap.
      nativeStartFrame = requestAnimationFrame(time => {
        if (disposed) return;
        const origin = document.timeline.currentTime ?? time;
        nativeAnimations.forEach(animation => { animation.play(); animation.startTime = origin; });
        nativeStarted = true; syncPlayback();
      });
      return;
    }
    // CTA and lead remain painted and operable; only the requested heading animates.
    timeline = gsap.timeline({ onComplete: finish });
    lines.forEach((line, i) => {
      timeline!.to(line, { autoAlpha: 1, y: 0, ...(phone ? {} : { filter: "blur(0px)" }), duration: HERO_LINE_REVEAL.duration, ease: "power2.out" }, HERO_LINE_REVEAL.start + i * (HERO_LINE_REVEAL.duration + HERO_LINE_REVEAL.gap));
    });
    if (matchMedia("(max-width: 767px)").matches) {
      const end = HERO_LINE_REVEAL.start + (groups.length - 1) * (HERO_LINE_REVEAL.duration + HERO_LINE_REVEAL.gap) + HERO_LINE_REVEAL.duration;
      timeline.fromTo(root.querySelector(".hbe-mobile-guides"), { opacity: 0 }, { opacity: 0.5, duration: 0.3 }, 0)
        .fromTo(root.querySelector(".hbe-copy-support"), { y: 6 }, { y: 0, duration: 0.35 }, end)
        .fromTo(root.querySelector(".hbe-action-resolve"), { opacity: 0 }, { opacity: 0.65, duration: 0.25 }, end + 0.2)
        .to(root.querySelectorAll(".hbe-mobile-guides, .hbe-action-resolve"), { opacity: 0, duration: 0.6 }, end + 0.5);
    }
  };
  let resizeFrame = 0;
  const onResize = () => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => {
      if (disposed || !geometry || measureGeometry() === geometry) return;
      if (phone) interrupted = true;
      visual.style.removeProperty("visibility");
      layout(false);
    });
  };
  window.addEventListener("resize", onResize);
  const onPreference = () => { interrupted = true; visual.style.removeProperty("visibility"); finish(); };
  const onFocus = () => { interrupted = true; visual.style.removeProperty("visibility"); finish(); };
  // Arm only with a live enhancement; CSS/no-JS always remains visible.
  if (!media.matches && !interrupted) {
    visual.style.visibility = "hidden";
    if (phone) intro.forEach(element => { element.style.opacity = "0"; });
  }
  void document.fonts.ready.then(() => {
    if (disposed) return;
    visual.style.removeProperty("visibility");
    layout(true);
    if (phone) document.fonts.addEventListener("loadingdone", onResize);
    observer = new ResizeObserver(() => {
      if (Math.abs(visual.clientWidth - width) > 1) layout(false);
    });
    observer.observe(visual);
  });
  media.addEventListener("change", onPreference);
  root.addEventListener("focusin", onFocus);
  header?.addEventListener("focusin", onFocus);
  return () => {
    intersection.disconnect(); document.removeEventListener("visibilitychange", syncPlayback);
    if (phone) document.fonts.removeEventListener("loadingdone", onResize);
    header?.removeEventListener("focusin", onFocus);
    disposed = true; observer?.disconnect(); cancelAnimationFrame(resizeFrame); window.removeEventListener("resize", onResize); finish();
    media.removeEventListener("change", onPreference); root.removeEventListener("focusin", onFocus);
    visual.style.removeProperty("visibility"); visual.innerHTML = original;
  };
}
