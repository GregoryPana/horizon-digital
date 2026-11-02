import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import facts from "../data/businessFacts.json";
import { trackEvent } from "../lib/analytics";
import EditorialContactLinks from "./EditorialContactLinks";
import logo from "../assets/logo/logo-compact.webp";

const site = facts.site;
const destinations = [
  { title: "Services", path: site.servicesPath },
  { title: "Work", path: "/work" },
  { title: "Pricing", path: "/pricing" },
  { title: "About", path: "/about" },
];
const DURATION = 560;
type SmoothWindow = Window & { lenis?: { stop: () => void; start: () => void; isStopped?: boolean } };

/** One lifecycle-owned playhead. Exit samples the exact entrance in reverse. */
export default function EditorialNavbar() {
  const header = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const controller = useRef<(open: boolean, action?: () => void) => void>(() => {});
  const [expanded, setExpanded] = useState(false);
  const [ambientPaused, setAmbientPaused] = useState(() => typeof document !== "undefined" && document.body.hasAttribute("data-ambient-paused"));
  const setAmbient = () => {
    const paused = !ambientPaused;
    document.body.toggleAttribute("data-ambient-paused", paused);
    setAmbientPaused(paused);
  };
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const root = header.current!, menu = panel.current!, button = toggle.current!;
    const scrollArea = menu.querySelector<HTMLElement>(".editorial-menu-layout")!;
    const html = document.documentElement, body = document.body;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let wanted = false, active = false, time = 0, frame = 0, last: number | null = null;
    let afterClose: (() => void) | undefined;
    let restore: (() => void) | undefined;
    const animations: Animation[] = [];
    const add = (node: Element, keys: Keyframe[]) => {
      if (!node.animate) return;
      const animation = node.animate(keys, { duration: DURATION, fill: "both", easing: "linear" });
      animation.pause(); animation.currentTime = 0; animations.push(animation);
    };
    add(menu.querySelector(".editorial-menu-surface")!, [
      { opacity: 0, easing: "cubic-bezier(.22,1,.36,1)" }, { opacity: 1 },
    ]);
    root.querySelectorAll(".editorial-menu-glyph span").forEach((line, i) => add(line, [
      { transform: `translateY(${i === 0 ? -4 : 4}px) rotate(0deg)`, easing: "cubic-bezier(.65,0,.35,1)" },
      { transform: `translateY(0px) rotate(${i === 0 ? 45 : -45}deg)` },
    ]));
    root.querySelectorAll("[data-menu-actor]").forEach((actor, i) => {
      const start = .055 + i * .055, end = Math.min(.99, .60 + i * .055);
      add(actor, [
        { opacity: 0, transform: "translateY(22px)", offset: 0 },
        { opacity: 0, transform: "translateY(22px)", offset: start, easing: "cubic-bezier(.22,1,.36,1)" },
        { opacity: 1, transform: "translateY(0)", offset: end },
        { opacity: 1, transform: "translateY(0)", offset: 1 },
      ]);
    });
    const sample = () => {
      animations.forEach(a => { a.currentTime = time; });
      root.dataset.menuProgress = String(time / DURATION);
    };
    const release = (focus: boolean) => {
      active = false; menu.hidden = true;
      root.setAttribute("role", "banner"); root.removeAttribute("aria-modal"); root.removeAttribute("aria-label");
      root.removeAttribute("data-menu-active");
      restore?.(); restore = undefined;
      if (focus) button.focus({ preventScroll: true });
    };
    const endpoint = () => {
      if (!wanted && time === 0) {
        const action = afterClose; afterClose = undefined;
        release(!action); action?.();
      }
    };
    const tick = (now: number) => {
      frame = 0;
      if (last !== null) time = Math.max(0, Math.min(DURATION, time + (now - last) * (wanted ? 1 : -1)));
      last = now; sample();
      if ((wanted && time < DURATION) || (!wanted && time > 0)) frame = requestAnimationFrame(tick);
      else { last = null; endpoint(); }
    };
    const acquire = () => {
      active = true; menu.hidden = false; scrollArea.scrollTop = 0;
      root.dataset.menuActive = "";
      root.setAttribute("role", "dialog"); root.setAttribute("aria-modal", "true"); root.setAttribute("aria-label", "Site navigation");
      const previous = { html: html.style.overflow, overscroll: html.style.overscrollBehavior, body: body.style.overflowY,
        menu: body.getAttribute("data-menu-open"), ambient: body.getAttribute("data-ambient-paused") };
      // Isolate every branch outside the header, including floating widgets/portals.
      const isolated: { node: HTMLElement; inert: boolean }[] = [];
      let branch: Element = root;
      while (branch.parentElement) {
        for (const sibling of Array.from(branch.parentElement.children)) {
          if (sibling !== branch && sibling instanceof HTMLElement) {
            isolated.push({ node: sibling, inert: Boolean(sibling.inert) }); sibling.inert = true;
          }
        }
        if (branch.parentElement === body) break;
        branch = branch.parentElement;
      }
      const bar = root.querySelector<HTMLElement>(".editorial-bar-content")!;
      const barWasInert = bar.inert; bar.inert = true;
      html.style.overflow = "hidden"; html.style.overscrollBehavior = "none"; body.style.overflowY = "hidden";
      body.setAttribute("data-menu-open", ""); body.setAttribute("data-ambient-paused", "");
      // The integrated home owns Lenis privately and observes body flags.
      // A legacy id="lenis" can expose an HTMLElement via window.lenis;
      // never mistake the browser's named element for a runtime instance.
      const candidate = (window as SmoothWindow).lenis;
      const lenis = candidate && typeof candidate.stop === "function" && typeof candidate.start === "function" ? candidate : undefined;
      const stopped = lenis?.isStopped;
      lenis?.stop();
      restore = () => {
        isolated.forEach(({ node, inert }) => { node.inert = inert; }); bar.inert = barWasInert;
        html.style.overflow = previous.html; html.style.overscrollBehavior = previous.overscroll; body.style.overflowY = previous.body;
        for (const [key, value] of [["data-menu-open", previous.menu], ["data-ambient-paused", previous.ambient]]) {
          if (value === null) body.removeAttribute(key!); else body.setAttribute(key!, value!);
        }
        if (!stopped) lenis?.start();
      };
      button.focus({ preventScroll: true });
    };
    const state = (open: boolean, action?: () => void) => {
      wanted = open; afterClose = open ? undefined : action;
      setExpanded(open); button.setAttribute("aria-expanded", String(open));
      if (open && !active) acquire();
      if (!active) return;
      cancelAnimationFrame(frame); frame = 0; last = null;
      if (reduced.matches || !animations.length) { time = open ? DURATION : 0; sample(); endpoint(); }
      else frame = requestAnimationFrame(tick);
    };
    controller.current = state;
    const focusable = () => [button, ...Array.from(menu.querySelectorAll<HTMLElement>("a[href],button:not([disabled])")).filter(node =>
      getComputedStyle(node).display !== "none" &&
      (!node.closest(".editorial-menu-services") || getComputedStyle(node.closest(".editorial-menu-services")!).display !== "none")
    )];
    const key = (event: KeyboardEvent) => {
      if (!active) return;
      if (event.key === "Escape") { event.preventDefault(); state(false); }
      if (event.key === "Tab") {
        const items = focusable(), index = items.indexOf(document.activeElement as HTMLElement);
        const next = event.shiftKey ? (index <= 0 ? items.length - 1 : index - 1) : (index + 1) % items.length;
        event.preventDefault(); items[next].focus(); items[next].scrollIntoView?.({ block: "nearest" });
      }
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key) && !(event.target as Element).closest("button,input,select,textarea")) {
        event.preventDefault();
        scrollArea.scrollTop = event.key === "Home" ? 0 : event.key === "End" ? scrollArea.scrollHeight : scrollArea.scrollTop +
          (event.key.includes("Up") ? -1 : 1) * (event.key.startsWith("Page") || event.key === " " ? scrollArea.clientHeight * .7 : 52);
      }
    };
    const shield = (event: Event) => {
      if (active && !root.contains(event.target as Node)) { event.preventDefault(); event.stopImmediatePropagation(); }
    };
    const gesture = (event: Event) => {
      if (!active) return;
      if (!menu.contains(event.target as Node)) event.preventDefault();
      event.stopImmediatePropagation();
    };
    const focus = (event: FocusEvent) => {
      if (active && !root.contains(event.target as Node)) button.focus({ preventScroll: true });
    };
    const settle = () => {
      if (!active) return;
      cancelAnimationFrame(frame); frame = 0; last = null;
      time = wanted ? DURATION : 0; sample(); endpoint();
    };
    const visibility = () => { if (document.hidden) settle(); };
    const height = () => html.style.setProperty("--header-height", `${root.querySelector(".editorial-bar")!.getBoundingClientRect().height}px`);
    const oldHeight = html.style.getPropertyValue("--header-height");
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(height) : null;
    observer?.observe(root.querySelector(".editorial-bar")!); height();
    document.addEventListener("keydown", key, true); document.addEventListener("focusin", focus, true);
    document.addEventListener("pointerdown", shield, true); document.addEventListener("click", shield, true);
    window.addEventListener("wheel", gesture, { capture: true, passive: false });
    window.addEventListener("touchmove", gesture, { capture: true, passive: false });
    reduced.addEventListener("change", settle); document.addEventListener("visibilitychange", visibility);
    return () => {
      controller.current = () => {}; cancelAnimationFrame(frame); afterClose = undefined;
      if (active) release(false);
      animations.forEach(a => a.cancel()); observer?.disconnect();
      if (oldHeight) html.style.setProperty("--header-height", oldHeight); else html.style.removeProperty("--header-height");
      document.removeEventListener("keydown", key, true); document.removeEventListener("focusin", focus, true);
      document.removeEventListener("pointerdown", shield, true); document.removeEventListener("click", shield, true);
      window.removeEventListener("wheel", gesture, true); window.removeEventListener("touchmove", gesture, true);
      reduced.removeEventListener("change", settle); document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  // Back/Forward and externally initiated navigation close on the same owned clock.
  useEffect(() => { controller.current(false); }, [location.key]);
  const select = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    controller.current(false, () => {
      navigate(path);
      requestAnimationFrame(() => {
        const target = document.querySelector<HTMLElement>("main h1, main");
        if (target) { target.setAttribute("tabindex", "-1"); target.focus({ preventScroll: true });
          if (path === location.pathname) window.scrollTo({ top: 0, behavior: "auto" }); }
      });
    });
  };
  return (
    <div ref={header} role="banner" className="editorial-header" data-site-header>
      <div className="editorial-bar">
        <div className="editorial-bar-content">
          <NavLink to="/" className="editorial-brand" aria-label="Horizon Digital home" onClick={event => {
            if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            if (location.pathname === "/") {
              event.preventDefault();
              navigate("/");
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              const title = document.querySelector<HTMLElement>("main h1");
              title?.focus({ preventScroll: true });
            }
          }}><img src={logo} alt="" width="108" height="74" /><span>horizon digital</span></NavLink>
          <nav className="editorial-desktop-nav" aria-label="Primary navigation">
            {destinations.map(x => <NavLink key={x.path} to={x.path}>{x.title}</NavLink>)}
          </nav>
          <button type="button" className="editorial-ambient-control" aria-label={ambientPaused ? "Play background animation" : "Pause background animation"} aria-pressed={ambientPaused} onClick={setAmbient}>
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor">
              {ambientPaused ? <path d="M8 5v14l11-7z" /> : <><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></>}
            </svg>
          </button>
          <NavLink to={site.contactPath} className="editorial-button editorial-header-cta" onClick={() => trackEvent("cta_click", { cta_name: "navbar_contact", page_path: location.pathname })}>{site.primaryCtaLabel}<span aria-hidden="true">↗</span></NavLink>
        </div>
        <button ref={toggle} className="editorial-menu-toggle" type="button" aria-expanded={expanded} aria-controls="editorial-site-menu" aria-label={expanded ? "Close the menu" : "Open the menu"} onClick={() => controller.current(!expanded)}>
          <span className="editorial-menu-glyph" aria-hidden="true"><span /><span /></span>
        </button>
      </div>
      <div ref={panel} id="editorial-site-menu" className="editorial-menu" hidden data-lenis-prevent>
        <div className="editorial-menu-surface" />
        <div className="editorial-menu-layout">
          <nav className="editorial-menu-primary" aria-label="All site destinations" data-menu-actor>
            <span className="editorial-kicker">Explore Horizon</span>

            {destinations.map(x => <NavLink key={x.path} to={x.path} end={x.path === "/"} aria-current={x.path.includes("#") ? "false" : "page"} onClick={e => select(e, x.path)}>{x.title}<span aria-hidden="true">↗</span></NavLink>)}
          </nav>

        </div>
          <div className="editorial-menu-bottom" data-menu-actor>
            <NavLink to={site.contactPath} className="editorial-button" onClick={e => select(e, site.contactPath)}>{site.primaryCtaLabel}<span aria-hidden="true">↗</span></NavLink>
            <EditorialContactLinks source="navbar" />
            <div className="editorial-menu-details">
              <p className="editorial-menu-tagline">{site.tagline}</p>
              <div className="editorial-menu-meta">
                <span>{site.location}</span>
                <a href={`tel:${site.phone.replace(/\s+/g, "")}`}>{site.phone}</a>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}
