import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { trackEvent } from "../lib/analytics";
import { siteConfig } from "../data/site";
import NavMenu from "./ui/menu-hover-effects";
import Logo from "./Logo";

export function getHeaderClassName(isScrolled: boolean, isMenuOpen: boolean): string {
  return [
    "site-header-dark fixed inset-x-0 top-0 z-[150] border-b",
    isScrolled ? "is-scrolled" : "",
    // The compact menu portals to document.body at z-[200]; without pointer-events-none here,
    // this header (raised to z-[250] while open) sits above it and swallows taps meant for the
    // close button, since the header's own box still overlaps that region even though its inner
    // content is already hidden and non-interactive.
    isMenuOpen ? "!z-[250] !border-transparent !bg-transparent !backdrop-blur-none pointer-events-none" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export default function Navbar() {
  const { pathname } = useLocation();
  const isHomeRoute = (pathname.replace(/\/+$/, "") || "/") === "/";
  const [isScrolled, setIsScrolled] = useState(!isHomeRoute);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHomeRoute) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => setIsScrolled(window.scrollY > 14);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomeRoute]);

  return (
    <header
      data-site-header
      className={getHeaderClassName(isScrolled, isMenuOpen)}
    >
      <div
        className={`container-wide flex h-[var(--header-height)] items-center gap-4 transition-opacity duration-200 ${
          isMenuOpen ? "pointer-events-none opacity-0" : "opacity-100"
        }`.trim()}
      >
        <NavLink
          to="/"
          aria-label="Horizon Digital home"
          title="Home"
          className="focus-ring inline-flex min-h-11 items-center rounded-xl"
          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
        >
          <Logo className="items-center gap-2" imageClassName="h-8 w-[48px] object-contain" />
          <span className="brand-name ml-2 hidden whitespace-nowrap text-[0.7rem] uppercase tracking-[0.14em] text-accent sm:inline">
            Horizon Digital
          </span>
        </NavLink>

        <div className="ml-auto flex items-center gap-3 xl:gap-5">
          <NavMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <NavLink
            to="/contact"
            className="focus-ring hidden min-h-11 items-center justify-center rounded-xl bg-accent px-5 text-center text-[0.68rem] font-black uppercase tracking-[0.14em] text-[#071013] transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-accent-strong hover:shadow-[0_10px_28px_rgba(88,213,227,0.18)] active:translate-y-0 xl:inline-flex 2xl:px-6"
            onClick={() =>
              trackEvent("cta_click", {
                cta_name: "nav_book_free_consult",
                page_path: window.location.pathname,
              })
            }
          >
            {siteConfig.primaryCtaLabel}
          </NavLink>
        </div>
      </div>
    </header>
  );
}
