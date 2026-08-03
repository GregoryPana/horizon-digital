import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { NavLink, useLocation } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { navLinks, serviceNavigation, siteConfig } from "../../data/site";
import { cn, scrollToTopSmooth } from "../../lib/utils";

// The close transition (opacity/clip-path fade, ~360ms) must run uncontested.
// Continuous page animations (e.g. the homepage's looping GSAP timelines and
// ScrollTrigger recalculations) steal main-thread frames and stall the fade's
// start for ~150-200ms if left ticking, so GSAP stays paused for the open
// duration and for one transition length after close.
const MENU_CLOSE_TRANSITION_MS = 700;

export const mobileNavLinks = [{ label: "Home", path: "/" }, ...navLinks];
export const serviceNavItems = serviceNavigation;
const servicePaths = new Set(serviceNavigation.map((item) => item.path));

export default function NavMenu({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean | ((current: boolean) => boolean)) => void;
}) {
  const location = useLocation();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const desktopServicesRef = useRef<HTMLLIElement>(null);
  const closeTimerRef = useRef<number>();
  const resumeTimerRef = useRef<number>();
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const closeMenu = (restoreFocus = false) => {
    setIsMenuOpen(false);
    setMobileServicesOpen(false);
    if (restoreFocus)
      window.requestAnimationFrame(() => triggerRef.current?.focus());
  };
  const closeDesktopServices = () => {
    window.clearTimeout(closeTimerRef.current);
    setDesktopServicesOpen(false);
  };
  const openDesktopServices = () => {
    window.clearTimeout(closeTimerRef.current);
    setDesktopServicesOpen(true);
  };
  const scheduleDesktopClose = () => {
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(
      () => setDesktopServicesOpen(false),
      150,
    );
  };

  useEffect(() => {
    closeMenu();
    setDesktopServicesOpen(false);
  }, [location.pathname, location.hash]);
  useEffect(() => () => window.clearTimeout(closeTimerRef.current), []);
  useEffect(() => () => window.clearTimeout(resumeTimerRef.current), []);

  useEffect(() => {
    if (!isMenuOpen || typeof window.matchMedia !== "function") return;
    const desktopQuery = window.matchMedia("(min-width: 1280px)");
    const closeAtDesktopWidth = () => {
      if (desktopQuery.matches) closeMenu();
    };
    closeAtDesktopWidth();
    desktopQuery.addEventListener("change", closeAtDesktopWidth);
    return () => desktopQuery.removeEventListener("change", closeAtDesktopWidth);
  }, [isMenuOpen]);

  useEffect(() => {
    if (!desktopServicesOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!desktopServicesRef.current?.contains(event.target as Node))
        setDesktopServicesOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setDesktopServicesOpen(false);
        desktopServicesRef.current?.querySelector<HTMLElement>("a")?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [desktopServicesOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
        return;
      }
      if (event.key === "Tab" && menuRef.current) {
        const menuFocusable = Array.from(
          menuRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        ).filter(
          (element) =>
            !element.hasAttribute("hidden") &&
            element.getAttribute("aria-hidden") !== "true" &&
            element.tabIndex !== -1,
        );
        const focusable = triggerRef.current
          ? [triggerRef.current, ...menuFocusable]
          : menuFocusable;
        const first = focusable[0];
        const firstMenuItem = menuFocusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;
        if (!focusable.includes(document.activeElement as HTMLElement)) {
          event.preventDefault();
          (event.shiftKey ? last : first).focus();
        } else if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (
          event.shiftKey &&
          document.activeElement === firstMenuItem &&
          triggerRef.current
        ) {
          event.preventDefault();
          triggerRef.current.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === triggerRef.current &&
          firstMenuItem
        ) {
          event.preventDefault();
          firstMenuItem.focus();
        }
      }
    };
    document.body.style.overflow = "hidden";
    document.body.classList.add("menu-open");
    document.addEventListener("keydown", handleKeyDown);
    window.clearTimeout(resumeTimerRef.current);
    gsap.globalTimeline.pause();
    const timer = window.setTimeout(
      () => triggerRef.current?.focus({ preventScroll: true }),
      50,
    );
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
      document.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(timer);
      resumeTimerRef.current = window.setTimeout(() => {
        gsap.globalTimeline.resume();
      }, MENU_CLOSE_TRANSITION_MS);
    };
  }, [isMenuOpen]);

  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    cn(
      "focus-ring relative inline-flex min-h-11 items-center rounded-lg px-2 text-[0.68rem] font-bold uppercase tracking-[0.13em] transition-colors duration-200",
      isActive ? "text-accent" : "text-text-muted hover:text-text",
    );
  const isServiceActive = servicePaths.has(location.pathname);

  return (
    <div className="pointer-events-auto flex items-center">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsMenuOpen((current) => !current)}
        className="nav-menu-button header-control-dark focus-ring relative z-[210] inline-flex h-11 w-11 items-center justify-center rounded-xl border xl:hidden"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-site-menu"
      >
        <span className="grid gap-1.5" aria-hidden="true">
          <span
            className={cn(
              "mobile-menu-icon-line block h-px w-5 bg-current transition-transform duration-200",
              isMenuOpen && "translate-y-[3.5px] rotate-45",
            )}
          />
          <span
            className={cn(
              "mobile-menu-icon-line block h-px w-5 bg-current transition-transform duration-200",
              isMenuOpen && "-translate-y-[3.5px] -rotate-45",
            )}
          />
        </span>
      </button>

      <nav className="hidden xl:block" aria-label="Primary navigation">
        <ul className="flex items-center gap-3 2xl:gap-5">
          {navLinks.map((item) =>
            item.path === "/services" ? (
              <li
                ref={desktopServicesRef}
                key={item.path}
                className="relative"
                onPointerEnter={openDesktopServices}
                onPointerLeave={scheduleDesktopClose}
                onFocusCapture={openDesktopServices}
                onBlur={(event) => {
                  if (
                    !event.currentTarget.contains(event.relatedTarget as Node)
                  )
                    setDesktopServicesOpen(false);
                }}
              >
                <div className="flex items-center">
                  <NavLink
                    to="/services"
                    onClick={closeDesktopServices}
                    className={() =>
                      linkClassName({ isActive: isServiceActive })
                    }
                    aria-current={
                      location.pathname === "/services" ? "page" : undefined
                    }
                  >
                    Services
                  </NavLink>
                  <button
                    type="button"
                    className="focus-ring -ml-1 inline-flex h-11 w-8 items-center justify-center rounded-lg text-text-muted hover:text-accent"
                    aria-label={
                      desktopServicesOpen
                        ? "Hide service pages"
                        : "Show service pages"
                    }
                    aria-expanded={desktopServicesOpen}
                    aria-controls="desktop-services-menu"
                    onClick={() => setDesktopServicesOpen((v) => !v)}
                  >
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        desktopServicesOpen && "rotate-180",
                      )}
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <div
                  id="desktop-services-menu"
                  className={cn(
                    "absolute left-0 top-[calc(100%+.35rem)] z-50 w-[30rem] origin-top-left rounded-2xl border border-border bg-[#0b1c22] p-3 shadow-[0_24px_60px_rgba(0,0,0,.36)] transition-[opacity,transform,visibility] duration-200",
                    desktopServicesOpen
                      ? "visible translate-y-0 opacity-100"
                      : "invisible pointer-events-none -translate-y-2 opacity-0",
                  )}
                  aria-hidden={!desktopServicesOpen}
                >
                  <NavLink
                    to="/services"
                    onClick={closeDesktopServices}
                    tabIndex={desktopServicesOpen ? 0 : -1}
                    className="focus-ring flex min-h-12 items-center justify-between rounded-xl px-3 text-sm font-bold text-accent hover:bg-white/[.04]"
                  >
                    {serviceNavigation[0].title}{" "}
                    <span className="font-normal text-text-muted">
                      {serviceNavigation[0].support}
                    </span>
                  </NavLink>
                  <div className="mt-1 border-t border-border pt-1">
                    {serviceNavigation.slice(1).map((entry, index) => (
                      <NavLink
                        key={entry.path}
                        to={entry.path}
                        onClick={closeDesktopServices}
                        tabIndex={desktopServicesOpen ? 0 : -1}
                        className={({ isActive }) =>
                          cn(
                            "focus-ring group grid min-h-16 grid-cols-[2rem_1fr] items-center rounded-xl px-3 hover:bg-white/[.045]",
                            isActive && "bg-white/[.05]",
                          )
                        }
                      >
                        <span className="font-mono text-[.65rem] text-accent">
                          0{index + 1}
                        </span>
                        <span>
                          <strong className="block text-sm text-text">
                            {entry.title}
                          </strong>
                          <small className="mt-1 block text-xs text-text-muted">
                            {entry.support}
                          </small>
                        </span>
                      </NavLink>
                    ))}
                  </div>
                </div>
              </li>
            ) : (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={linkClassName}
                  onClick={() => {
                    if (item.path === "/work") scrollToTopSmooth();
                  }}
                >
                  {item.label}
                </NavLink>
              </li>
            ),
          )}
        </ul>
      </nav>

      {createPortal(
        <div
          ref={menuRef}
          id="mobile-site-menu"
          className={cn(
            "mobile-site-menu-overlay fixed inset-0 z-[200] h-[100dvh] overflow-y-auto text-text xl:hidden",
            isMenuOpen && "is-open",
          )}
          aria-hidden={!isMenuOpen}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div
            className="hero-editorial-grid absolute inset-0 opacity-40"
            aria-hidden="true"
          />
          <div className="mobile-site-menu-panel relative mx-auto flex min-h-full w-full max-w-3xl flex-col px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-[calc(var(--header-height)+1rem+env(safe-area-inset-top))] sm:px-8">
            <div className="border-b border-border pb-4">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-text-dim">
                Navigate Horizon Digital
              </p>
            </div>
            <nav className="flex-none py-6" aria-label="Compact navigation">
              <ul className="w-full">
                {mobileNavLinks.map((item, index) =>
                  item.path === "/services" ? (
                    <li key={item.path} className="border-b border-border">
                      <div className="grid grid-cols-[1fr_48px] items-center">
                        <NavLink
                          to="/services"
                          onClick={() => closeMenu()}
                          className={({ isActive }) =>
                            cn(
                              "focus-ring flex min-h-16 items-center gap-4 rounded-sm text-xl font-semibold",
                              (isActive || isServiceActive) && "text-accent",
                            )
                          }
                        >
                          <span className="font-mono text-[.65rem] text-text-dim">
                            0{index + 1}
                          </span>
                          Services
                        </NavLink>
                        <button
                          type="button"
                          className="focus-ring inline-flex h-12 w-12 items-center justify-center rounded-lg"
                          aria-label={
                            mobileServicesOpen
                              ? "Hide service pages"
                              : "Show service pages"
                          }
                          aria-expanded={mobileServicesOpen}
                          aria-controls="mobile-services-submenu"
                          onClick={() => setMobileServicesOpen((v) => !v)}
                        >
                          <ChevronDown
                            className={cn(
                              "h-5 w-5 transition-transform duration-200",
                              mobileServicesOpen && "rotate-180",
                            )}
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                      <div
                        id="mobile-services-submenu"
                        className={cn(
                          "grid transition-[grid-template-rows,opacity] duration-[260ms]",
                          mobileServicesOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0",
                        )}
                        aria-hidden={!mobileServicesOpen}
                      >
                        <div className="min-h-0 overflow-hidden border-l border-accent/35 pl-4">
                          {serviceNavigation.map((entry) => (
                            <NavLink
                              key={entry.path}
                              to={entry.path}
                              tabIndex={mobileServicesOpen ? 0 : -1}
                              onClick={() => closeMenu()}
                              className={({ isActive }) =>
                                cn(
                                  "focus-ring flex min-h-12 items-center rounded-lg px-3 text-sm font-semibold text-text-muted hover:text-accent",
                                  isActive && "text-accent",
                                )
                              }
                            >
                              {entry.title}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    </li>
                  ) : (
                    <li key={item.path} className="border-b border-border">
                      <NavLink
                        to={item.path}
                        end={item.path === "/"}
                        onClick={() => {
                          if (item.path === "/work") scrollToTopSmooth();
                          closeMenu();
                        }}
                        className={({ isActive }) =>
                          cn(
                            "focus-ring group flex min-h-16 items-center justify-between rounded-sm text-xl font-semibold",
                            isActive
                              ? "text-accent"
                              : "text-text hover:text-accent",
                          )
                        }
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="font-mono text-[.65rem] text-text-dim">
                            0{index + 1}
                          </span>
                          {item.label}
                        </span>
                        <ArrowRight
                          className="h-5 w-5 text-text-dim"
                          aria-hidden="true"
                        />
                      </NavLink>
                    </li>
                  ),
                )}
              </ul>
            </nav>
            <NavLink
              to={siteConfig.contactPath}
              onClick={() => closeMenu()}
              className="consultation-attraction focus-ring mt-auto inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-7 py-4 text-[.72rem] font-black uppercase tracking-[.18em] text-[#071013]"
            >
              {siteConfig.primaryCtaLabel}
            </NavLink>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}
