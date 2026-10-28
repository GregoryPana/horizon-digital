import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { portfolioDeviceMedia } from "../../data/portfolioDeviceMedia";
import "./PortfolioDeviceShowcase.css";

export type PortfolioDeviceId = keyof typeof portfolioDeviceMedia;
export interface PortfolioDeviceShowcaseProps {
  id: PortfolioDeviceId;
  title: string;
  href: string;
  active: boolean;
  reducedMotion: boolean;
  onVisit?: () => void;
}

/** The bitmap fills the exact captured viewport width; only its Y offset changes.
 * Each phone is an independently rendered 390×844 layout, never a desktop crop.
 */
export function PortfolioDeviceShowcase({ id, title, href, active, reducedMotion, onVisit }: PortfolioDeviceShowcaseProps) {
  const root = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline>();
  const hover = useRef(false);
  const focus = useRef(false);
  const visible = useRef(false);
  const manual = useRef(false);
  const [paused, setPaused] = useState(false);
  const media = portfolioDeviceMedia[id];

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const images = Array.from(el.querySelectorAll<HTMLImageElement>(".portfolio-device-page"));
    let disposed = false;
    const sync = () => {
      const stop = !active || reducedMotion || hover.current || focus.current || manual.current || !visible.current || document.hidden;
      timeline.current?.paused(stop);
      el.dataset.playback = stop ? "paused" : "playing";
    };
    const build = () => {
      timeline.current?.kill();
      gsap.set(images, { y: 0, filter: "blur(0px)", opacity: 1 });
      if (reducedMotion || disposed) { el.dataset.playback = "reduced"; return; }
      const tl = gsap.timeline({ paused: true, repeat: -1 });
      timeline.current = tl;
      tl.call(() => { el.dataset.phase = "start"; })
        .to({}, { duration: 1.4 })
        .call(() => { el.dataset.phase = "scroll"; });
      images.forEach((image) => {
        const screen = image.parentElement!;
        const distance = Math.max(0, image.clientHeight - screen.clientHeight);
        tl.to(image, { y: -distance, duration: 13, ease: "none" }, 1.4);
      });
      tl.to({}, { duration: 1.1 }, 14.4)
        .call(() => { el.dataset.phase = "blur-out"; }, [], 15.5)
        .to(images, { filter: "blur(7px)", opacity: 0.35, duration: 0.55, ease: "power1.in" }, 15.5)
        .set(images, { y: 0 }, 16.05)
        .call(() => { el.dataset.phase = "reset"; el.dataset.cycles = String(Number(el.dataset.cycles ?? 0) + 1); }, [], 16.05)
        .to(images, { filter: "blur(0px)", opacity: 1, duration: 0.65, ease: "power1.out" }, 16.05);
      sync();
    };
    const observer = new IntersectionObserver(([entry]) => { visible.current = entry.isIntersecting; sync(); }, { threshold: 0.05 });
    observer.observe(el);
    const enter = (event: PointerEvent) => { if (event.pointerType !== "touch") { hover.current = true; sync(); } };
    const leave = () => { hover.current = false; sync(); };
    const focusIn = () => { focus.current = true; sync(); };
    const focusOut = (event: FocusEvent) => { if (!el.contains(event.relatedTarget as Node)) { focus.current = false; sync(); } };
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    el.addEventListener("focusin", focusIn);
    el.addEventListener("focusout", focusOut);
    document.addEventListener("visibilitychange", sync);
    const resize = new ResizeObserver(build);
    resize.observe(el);
    Promise.all(images.map(image => image.decode().catch(() => undefined))).then(() => { if (!disposed) build(); });
    // Keep explicit touch pause independent of pointer/focus lifecycle.
    const pauseChange = () => sync();
    el.addEventListener("portfolio-pause-change", pauseChange);
    return () => {
      disposed = true;
      observer.disconnect(); resize.disconnect(); timeline.current?.kill();
      el.removeEventListener("pointerenter", enter); el.removeEventListener("pointerleave", leave);
      el.removeEventListener("focusin", focusIn); el.removeEventListener("focusout", focusOut);
      el.removeEventListener("portfolio-pause-change", pauseChange);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [id, active, reducedMotion]);

  const toggle = () => {
    manual.current = !manual.current;
    setPaused(manual.current);
    root.current?.dispatchEvent(new Event("portfolio-pause-change"));
  };

  return (
    <div ref={root} className="portfolio-devices" data-project={id} data-phase="start" data-cycles="0">
      <a href={href} target="_blank" rel="noreferrer" aria-label={`View ${title} project`} onClick={onVisit} className="portfolio-device-link">
        <div className="portfolio-laptop" data-device="desktop">
          <div className="portfolio-laptop-lid">
            <div className="portfolio-device-screen portfolio-desktop-screen">
              <img className="portfolio-device-page" src={media.desktop.src} width={media.desktop.width} height={media.desktop.height} alt={`${title} website at a 1440-pixel laptop viewport`} loading="lazy" decoding="async" draggable="false" />
            </div>
          </div>
          <div className="portfolio-laptop-base" />
        </div>
        <div className="portfolio-phone" data-device="mobile">
          <div className="portfolio-device-screen portfolio-mobile-screen">
            <img className="portfolio-device-page" src={media.mobile.src} width={media.mobile.width} height={media.mobile.height} alt={`${title} website independently rendered at a 390-pixel phone viewport`} loading="lazy" decoding="async" draggable="false" />
          </div>
        </div>
      </a>
      {!reducedMotion && <button type="button" className="portfolio-playback" onClick={toggle} aria-pressed={paused} aria-label={`${paused ? "Play" : "Pause"} ${title} screen previews`}>
        <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span> {paused ? "Play previews" : "Pause previews"}
      </button>}
    </div>
  );
}
