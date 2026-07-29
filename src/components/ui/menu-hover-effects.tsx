import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { NavLink, useLocation } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";
import { navLinks, siteConfig } from "../../data/site";
import { cn, scrollToTopSmooth } from "../../lib/utils";

// Compact/mobile menu only: the desktop nav relies on the logo as the Home link,
// but the full-screen mobile menu needs an explicit Home entry of its own.
export const mobileNavLinks = [{ label: "Home", path: "/" }, ...navLinks];

export default function NavMenu({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean | ((current: boolean) => boolean)) => void;
}) {
  const location = useLocation();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);

  const closeMenu = (restoreFocus = false) => {
    setIsMenuOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => triggerRef.current?.focus());
    }
  };

  useEffect(() => {
    closeMenu();
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
        return;
      }

      if (event.key === "Tab" && menuRef.current) {
        const focusable = Array.from(
          menuRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((element) => !element.hasAttribute("hidden"));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;
        if (!menuRef.current.contains(document.activeElement)) {
          event.preventDefault();
          (event.shiftKey ? last : first).focus();
        } else if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    scrollPositionRef.current = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.classList.add("menu-open");
    document.addEventListener("keydown", handleKeyDown);
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus({ preventScroll: true }), 50);

    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
      document.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [isMenuOpen]);

  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    cn(
      "focus-ring relative inline-flex min-h-11 items-center rounded-lg px-2 text-[0.68rem] font-bold uppercase tracking-[0.13em] transition-colors duration-200",
      isActive ? "text-accent" : "text-text-muted hover:text-text"
    );

  return (
    <div className="flex items-center">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsMenuOpen((current) => !current)}
        className="header-control-dark focus-ring relative z-[210] inline-flex h-11 w-11 items-center justify-center rounded-xl border xl:hidden"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-site-menu"
      >
        <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
        <span className="grid gap-1.5" aria-hidden="true">
          <span className={cn("block h-px w-5 bg-current transition-transform duration-200", isMenuOpen && "translate-y-[3.5px] rotate-45")} />
          <span className={cn("block h-px w-5 bg-current transition-transform duration-200", isMenuOpen && "-translate-y-[3.5px] -rotate-45")} />
        </span>
      </button>

      <nav className="hidden xl:block" aria-label="Primary navigation">
        <ul className="flex items-center gap-3 2xl:gap-5">
          {navLinks.map((item) => (
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
          ))}
        </ul>
      </nav>

      {createPortal(
        <div
          ref={menuRef}
          id="mobile-site-menu"
          className={cn(
            "fixed inset-0 z-[200] h-[100dvh] overflow-y-auto bg-bg-elev text-text transition-[opacity,visibility] duration-300 xl:hidden",
            isMenuOpen ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
          )}
          aria-hidden={!isMenuOpen}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          onTransitionEnd={(event) => {
            if (isMenuOpen && event.propertyName === "opacity") {
              closeButtonRef.current?.focus();
            }
          }}
        >
          <div className="hero-editorial-grid absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="relative mx-auto flex min-h-full w-full max-w-3xl flex-col px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-[calc(1.25rem+env(safe-area-inset-top))] sm:px-8 sm:pt-[calc(1.75rem+env(safe-area-inset-top))]">
            <div className="flex items-center justify-between border-b border-border pb-5">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-text-dim">Navigate Horizon Digital</p>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => closeMenu(true)}
                className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border text-text-muted transition-colors hover:border-accent hover:text-accent"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav className="flex-none py-6 sm:py-7" aria-label="Compact navigation">
              <ul className="w-full">
                {mobileNavLinks.map((item, index) => (
                  <li key={item.path} className="border-b border-border first:border-t">
                    <NavLink
                      to={item.path}
                      end={item.path === "/"}
                      onClick={() => {
                        if (item.path === "/work") scrollToTopSmooth();
                        closeMenu();
                      }}
                      className={({ isActive }) =>
                        cn(
                          "focus-ring group flex min-h-16 items-center justify-between rounded-sm py-4 text-xl font-semibold tracking-[-0.02em] sm:text-2xl",
                          isActive ? "text-accent" : "text-text hover:text-accent"
                        )
                      }
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-[0.65rem] tracking-[0.12em] text-text-dim">0{index + 1}</span>
                        {item.label}
                      </span>
                      <ArrowRight className="h-5 w-5 text-text-dim transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true" />
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <NavLink
              to="/contact"
              onClick={() => closeMenu()}
              className="focus-ring mt-auto inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-7 py-4 text-[0.72rem] font-black uppercase tracking-[0.18em] text-[#071013] transition-colors hover:bg-accent-strong"
            >
              {siteConfig.primaryCtaLabel}
            </NavLink>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
