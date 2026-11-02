import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import "./heroLightWorkspace.css";
import coastalStay from "../../assets/hero-business/coastal-stay.avif";
import coffeeHouse from "../../assets/hero-business/coffee-house.avif";
import sailingCharter from "../../assets/hero-business/sailing-charter.avif";

export const WEBSITE_BUILD_TIMING = { placement: 0.6, step: 0.4, finish: 2, hold: 0.85 } as const;
export const WEBSITE_BUSINESSES = {
  a: { kind: "coastal-stay", photo: coastalStay, width: 600, height: 400 },
  b: { kind: "coffee-house", photo: coffeeHouse, width: 600, height: 800 },
  c: { kind: "sailing-charter", photo: sailingCharter, width: 600, height: 450 },
} as const;

export const WEBSITE_BUILD_STYLES = ["a", "b", "c"] as const;
type WebsiteBuildStyle = typeof WEBSITE_BUILD_STYLES[number];

/** One clock owns both responsive representations and all three art directions. */
export function HeroWebsitePlayback({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const field = ref.current;
    if (!field) return;
    const hero = field.closest<HTMLElement>(".hbe-hero");
    const roots = field.querySelectorAll<HTMLElement>("[data-website-build]");
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let timeline: gsap.core.Timeline | undefined;
    let intersecting = false, hovered = false, focused = false;
    let manual = hero?.dataset.hbePreviewPaused === "true";
    let cycle = 0;
    const state = (style: string, phase: string) => roots.forEach(root => {
      root.dataset.buildStyle = style; root.dataset.buildPhase = phase;
      root.dataset.buildCycle = String(cycle);
    });
    const sync = () => {
      if (media.matches) {
        timeline?.kill(); timeline = undefined;
        gsap.set(field.querySelectorAll("[data-build-part], [data-build-skeleton], .hwb-design, .hwb-guides, .hwb-finished, .hwb-wash-edge"), { clearProps: "all" });
        state("a", "complete"); roots.forEach(root => { root.dataset.buildPaused = "reduced"; });
        return;
      }
      if (!timeline) {
        const designs = field.querySelectorAll(".hwb-design");
        gsap.set(designs, { autoAlpha: 0 });
        timeline = gsap.timeline({ paused: true, repeat: -1, onRepeat: () => { cycle++; } });
        for (const style of WEBSITE_BUILD_STYLES) {
          const pages = field.querySelectorAll(`.hwb-design-${style}`);
          const guides = field.querySelectorAll(`.hwb-design-${style} .hwb-guides`);
          const masks = field.querySelectorAll(`.hwb-design-${style} [data-build-skeleton]`);
          const wash = field.querySelectorAll(`.hwb-design-${style} .hwb-finished`);
          const edge = field.querySelectorAll(`.hwb-design-${style} .hwb-wash-edge`);
          // A readable build, not a rapid cascade followed by an apparent state swap.
          // Fixed final geometry/artwork stay untouched; only these owned intermediates move.
          const parts = field.querySelectorAll(`.hwb-design-${style} [data-build-part]`);
          timeline.set(pages, { autoAlpha: 1 })
            .set(edge, { xPercent: 0, opacity: 0 }).set(masks, { opacity: 1 }).set(wash, { clipPath: "inset(0 100% 0 0)" })
            .set(guides, { opacity: 0, scaleX: 0.15, transformOrigin: "left center" })
            .set(parts, { autoAlpha: 0, x: -18, y: 12, scale: 0.94, clipPath: "inset(0 100% 0 0)", transformOrigin: "left top" })
            .call(() => state(style, "plan"))
            .to(guides, { opacity: 0.8, scaleX: 1, duration: 0.6, ease: "power2.inOut" })
            .to({}, { duration: 0.2 })
            .call(() => state(style, "construct"));
          // Header → image → headline → copy → action → supporting section.
          // Slightly faster owner-requested placement; the two-second finish stays legible.
          for (const [index, part] of [1, 0, 2, 3, 4, 5, 6].entries()) {
            timeline.to(field.querySelectorAll(`.hwb-design-${style} [data-build-part="${part}"]`),
              { autoAlpha: 1, x: 0, y: 0, scale: 1, clipPath: "inset(0 0% 0 0)", duration: WEBSITE_BUILD_TIMING.placement, ease: "power2.inOut" }, index ? `<${WEBSITE_BUILD_TIMING.step}` : ">");
          }
          timeline.to({}, { duration: 0.3 })
            .call(() => state(style, "resolve"))
            .to(wash, { clipPath: "inset(0 0% 0 0)", duration: WEBSITE_BUILD_TIMING.finish, ease: "none" })
            .set(edge, { opacity: 1 }, "<")
            .to(edge, { xPercent: 100, duration: WEBSITE_BUILD_TIMING.finish, ease: "none" }, "<")
            .to(guides, { opacity: 0, duration: WEBSITE_BUILD_TIMING.finish }, "<")
            .set(edge, { opacity: 0 })
            .call(() => state(style, "complete"))
            .to({}, { duration: WEBSITE_BUILD_TIMING.hold })
            .call(() => state(style, "reset"))
            .to(pages, { autoAlpha: 0, duration: 0.45 });
        }
      }
      const active = intersecting && !document.hidden && !manual && !hovered && !focused;
      const reason = active ? "false" : document.hidden ? "hidden" : !intersecting ? "offscreen" : manual ? "manual" : focused ? "focus" : "hover";
      roots.forEach(root => { root.dataset.buildPaused = reason; });
      if (active) timeline.play(); else timeline.pause();
    };
    const observer = new IntersectionObserver(([entry]) => { intersecting = entry.isIntersecting; sync(); }, { threshold: 0.12 });
    observer.observe(field);
    const playback = (event: Event) => { manual = Boolean((event as CustomEvent<boolean>).detail); sync(); };
    const enter = () => { hovered = true; sync(); };
    const leave = () => { hovered = false; sync(); };
    const focus = () => { focused = true; sync(); };
    const blur = () => { focused = false; sync(); };
    document.addEventListener("visibilitychange", sync); media.addEventListener("change", sync);
    hero?.addEventListener("hbe-preview-playback", playback);
    field.addEventListener("mouseenter", enter); field.addEventListener("mouseleave", leave);
    field.addEventListener("focusin", focus); field.addEventListener("focusout", blur);
    sync();
    return () => {
      observer.disconnect(); timeline?.kill();
      document.removeEventListener("visibilitychange", sync); media.removeEventListener("change", sync);
      hero?.removeEventListener("hbe-preview-playback", playback);
      field.removeEventListener("mouseenter", enter); field.removeEventListener("mouseleave", leave);
      field.removeEventListener("focusin", focus); field.removeEventListener("focusout", blur);
      gsap.set(field.querySelectorAll("[data-build-part], [data-build-skeleton], .hwb-design, .hwb-guides, .hwb-finished, .hwb-wash-edge"), { clearProps: "all" });
    };
  }, []);
  return <div ref={ref} className="hbe-story-column">{children}</div>;
}

/** Licensed, locally served subject photography. No words or client-work claims. */
function Artwork({ style }: { style: WebsiteBuildStyle }) {
  const business = WEBSITE_BUSINESSES[style];
  return <img src={business.photo} width={business.width} height={business.height} alt="" decoding="async" />;
}

/** Shared markup is the geometry contract: wash changes paint, never layout. */
function WebsiteParts({ style, skeleton }: { style: WebsiteBuildStyle; skeleton: boolean }) {
  const part = (n: number) => ({ "data-build-part": skeleton ? String(n) : undefined, "data-geometry-part": String(n) });
  return <>
    <div className="hwb-image" {...part(0)}>{!skeleton && <Artwork style={style} />}</div>
    <div className="hwb-header" {...part(1)}>
      <div className="hwb-logo"><span/><span/></div>
      <div className="hwb-nav"><span/><span/><span/><b/></div>
    </div>
    <div className="hwb-heading" {...part(2)}><span/><span/><span/></div>
    <div className="hwb-lines" {...part(3)}><span/><span/><span/></div>
    <div className="hwb-cta" {...part(4)}><span/><b/></div>
    <div className="hwb-editorial" {...part(5)}><i/><span/><span/><b/></div>
    <div className="hwb-inset" {...part(6)}>{[0,1].map(n => <div className="hwb-card" key={n}><div className="hwb-card-image">{!skeleton && <Artwork style={style}/>}</div><div className="hwb-card-copy"><span/><span/><b/></div></div>)}</div>
  </>;
}

export function HeroLightWorkspace({ variant }: { variant: "desktop" | "mobile"; startDelay?: number }) {
  return <div className={`hwb hwb-${variant}`} data-light-workspace={variant} data-website-build={variant} data-build-style="a" data-build-cycle="0" data-build-phase="complete" aria-hidden="true">
    {WEBSITE_BUILD_STYLES.map(style => <div className={`hwb-design hwb-design-${style}`} key={style} data-business={WEBSITE_BUSINESSES[style].kind}>
      <div className="hwb-guides" />
      {([true, false] as const).map(skeleton => <div className={`hwb-page ${skeleton ? "hwb-blueprint" : "hwb-finished"}`} key={String(skeleton)} data-build-skeleton={skeleton ? "page" : undefined}>
        <WebsiteParts style={style} skeleton={skeleton} />
      </div>)}
      <div className="hwb-wash-edge" />
    </div>)}
  </div>;
}
