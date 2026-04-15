import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { trackEvent } from "../lib/analytics";

import NavMenu from "./ui/menu-hover-effects";

import Logo from "./Logo";

export default function Navbar() {
  const { pathname } = useLocation();
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  const isHomeRoute = normalizedPath === "/";
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
      className={`site-header-dark fixed top-0 left-0 right-0 z-[150] border-b ${isScrolled ? "is-scrolled" : ""} ${isMenuOpen ? "!z-[250] !bg-transparent !border-transparent !backdrop-blur-none" : ""}`.trim()}
    >
      <div className="mx-auto flex w-full max-w-[1760px] items-center gap-4 px-5 py-3 md:gap-6 md:px-8 md:py-4 lg:px-12 xl:px-16 2xl:px-20">
        <NavLink
          to="/"
          className="focus-ring inline-flex items-center rounded-full"
          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
        >
          <Logo
            className="items-center gap-2"
            imageClassName="h-8 w-[48px] rounded-sm object-contain md:h-9 md:w-[54px]"
          />
          <span className="brand-name ml-2 whitespace-nowrap text-[11px] sm:text-xs uppercase tracking-[0.12em] text-accent text-left">
            Horizon Digital
          </span>
        </NavLink>
        <div className="ml-auto flex items-center gap-3">
          <NavMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <div className="hidden items-center gap-7 lg:flex">
            <style>{`
              @keyframes nav-cta-gradient {
                0% { background-position: 0% 50%; }
                100% { background-position: -300% 50%; }
              }
            `}</style>
            <NavLink
              to="/contact"
              className="px-6 py-2.5 sm:px-8 sm:py-3 text-black rounded-full font-black uppercase tracking-[0.2em] text-[11px] sm:text-xs transition-all duration-300 hover:scale-[1.02] hover:brightness-110 active:scale-95 text-center whitespace-nowrap"
              style={{ backgroundImage: 'linear-gradient(90deg, var(--accent), var(--accent-2), #0C7CC4, var(--accent))', backgroundSize: '300% 100%', animation: 'nav-cta-gradient 5s linear infinite' }}
              onClick={() =>
                trackEvent("cta_click", {
                  cta_name: "nav_book_free_consult",
                  page_path: window.location.pathname,
                })
              }
            >
              Book a free consult
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}
