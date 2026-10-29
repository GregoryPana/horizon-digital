import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { portfolioDeviceMedia } from "../../data/portfolioDeviceMedia";
import { getPortfolioPauseReason } from "../../lib/portfolioPlayback";
import "./PortfolioDeviceShowcase.css";

export type PortfolioDeviceId = keyof typeof portfolioDeviceMedia;
export interface PortfolioDeviceShowcaseProps {
  id: PortfolioDeviceId;
  title: string;
  href: string;
  active: boolean;
  preload?: boolean;
  reducedMotion: boolean;
  onVisit?: () => void;
}

/** The bitmap fills the exact captured viewport width; only its Y offset changes.
 * Each phone is an independently rendered 390×844 layout, never a desktop crop.
 */
export function PortfolioDeviceShowcase({ id, title, href, active, preload = false, reducedMotion, onVisit }: PortfolioDeviceShowcaseProps) {
  const root = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline>();
  const activeRef = useRef(active);
  const hover = useRef(false);
  const focus = useRef(false);
  const visible = useRef(false);
  const manual = useRef(false);
  const [paused, setPaused] = useState(false);
  const [loadMedia, setLoadMedia] = useState(id === "drake");
  const media = portfolioDeviceMedia[id];

  useEffect(() => {
    if (preload || (active && !reducedMotion)) setLoadMedia(true);
  }, [preload, active, reducedMotion]);

  useEffect(() => {
    if (!reducedMotion || loadMedia || !root.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setLoadMedia(true);
    }, { rootMargin: "300px 0px" });
    observer.observe(root.current);
    return () => observer.disconnect();
  }, [reducedMotion, loadMedia]);

  useEffect(() => {
    activeRef.current = active;
    root.current?.dispatchEvent(new Event("portfolio-activity-change"));
  }, [active]);

  useEffect(() => {
    const el = root.current;
    if (!el || !loadMedia) return;
    const images = Array.from(el.querySelectorAll<HTMLImageElement>(".portfolio-device-page"));
    let disposed = false;
    let decoded = false;
    const sync = () => {
      const reason = getPortfolioPauseReason({ active: activeRef.current, reducedMotion, hovered: hover.current, focused: focus.current, manual: manual.current, visible: visible.current, hidden: document.hidden });
      const stop = reason !== undefined;
      timeline.current?.paused(stop);
      el.dataset.playback = stop ? "paused" : "playing";
      el.dataset.pauseReason = reason ?? "none";
    };
    const build = () => {
      const progress = timeline.current?.progress() ?? 0;
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
        tl.to(image, { y: -distance, duration: 11.5, ease: "none" }, 1.4);
      });
      tl.to({}, { duration: 1.1 }, 12.9)
        .call(() => { el.dataset.phase = "blur-out"; }, [], 14)
        .to(images, { filter: "blur(7px)", opacity: 0.35, duration: 0.55, ease: "power1.in" }, 14)
        .set(images, { y: 0 }, 14.55)
        .call(() => { el.dataset.phase = "reset"; el.dataset.cycles = String(Number(el.dataset.cycles ?? 0) + 1); }, [], 14.55)
        .to(images, { filter: "blur(0px)", opacity: 1, duration: 0.65, ease: "power1.out" }, 14.55);
      tl.progress(progress, true);
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
    const resize = new ResizeObserver(() => { if (decoded) build(); });
    resize.observe(el);
    Promise.all(images.map(image => image.decode().catch(() => undefined))).then(() => { decoded = true; if (!disposed) build(); });
    // Keep explicit touch pause independent of pointer/focus lifecycle.
    const pauseChange = () => sync();
    el.addEventListener("portfolio-pause-change", pauseChange);
    el.addEventListener("portfolio-activity-change", sync);
    return () => {
      disposed = true;
      observer.disconnect(); resize.disconnect(); timeline.current?.kill();
      el.removeEventListener("pointerenter", enter); el.removeEventListener("pointerleave", leave);
      el.removeEventListener("focusin", focusIn); el.removeEventListener("focusout", focusOut);
      el.removeEventListener("portfolio-pause-change", pauseChange);
      el.removeEventListener("portfolio-activity-change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [id, reducedMotion, loadMedia]);

  const toggle = () => {
    manual.current = !manual.current;
    setPaused(manual.current);
    root.current?.dispatchEvent(new Event("portfolio-pause-change"));
  };

  return (
    <div ref={root} className="portfolio-devices" data-project={id} data-media-loaded={loadMedia} data-playback={!loadMedia ? "paused" : undefined} data-pause-reason={!loadMedia ? "inactive" : undefined} data-phase="start" data-cycles="0">
      <a href={href} target="_blank" rel="noreferrer" aria-label={`View ${title} project`} onClick={onVisit} className="portfolio-device-link">
        <div className="portfolio-laptop" data-device="desktop">
          <div className="portfolio-laptop-model">
            <div className="portfolio-laptop-assembly">
              <div className="portfolio-laptop-lid">
                <div className="portfolio-device-screen portfolio-desktop-screen">
                  <img className="portfolio-device-page" src={loadMedia ? media.desktop.src : undefined} srcSet={loadMedia ? media.desktop.srcSet : undefined} sizes="(min-width: 1024px) 45vw, (min-width: 600px) and (max-height: 600px) 28vw, 80vw" fetchPriority={id === "drake" ? "high" : "low"} width={media.desktop.width} height={media.desktop.height} alt={`${title} website at a 1440-pixel laptop viewport`} loading={id === "drake" ? "eager" : "lazy"} decoding="async" draggable="false" />
                </div>
              </div>
              <div className="portfolio-laptop-hinge" aria-hidden="true" />
              <div className="portfolio-laptop-base" aria-hidden="true">
                <div className="portfolio-laptop-keyboard">
                  {loadMedia && [14, 14, 13, 13, 12, 8].map((count, row) => <div className="portfolio-key-row" key={row}>
                    {Array.from({ length: count }, (_, key) => <span className={row === 5 && key === 3 ? "portfolio-key portfolio-key-space" : "portfolio-key"} key={key} />)}
                  </div>)}
                </div>
                <div className="portfolio-laptop-trackpad" />
                <div className="portfolio-laptop-front" />
              </div>
            </div>
          </div>
        </div>
        <div className="portfolio-phone" data-device="mobile">
          <div className="portfolio-device-screen portfolio-mobile-screen">
            <img className="portfolio-device-page" src={loadMedia ? media.mobile.src : undefined} srcSet={loadMedia ? media.mobile.srcSet : undefined} sizes="(min-width: 1024px) 14vw, (min-width: 600px) and (max-height: 600px) 12vw, 25vw" fetchPriority={id === "drake" ? "high" : "low"} width={media.mobile.width} height={media.mobile.height} alt={`${title} website independently rendered at a 390-pixel phone viewport`} loading={id === "drake" ? "eager" : "lazy"} decoding="async" draggable="false" />
          </div>
        </div>
      </a>
      {!reducedMotion && <button type="button" className="portfolio-playback" onClick={toggle} aria-pressed={paused} aria-label={`${paused ? "Play" : "Pause"} ${title} screen previews`}>
        <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span> {paused ? "Play previews" : "Pause previews"}
      </button>}
    </div>
  );
}
