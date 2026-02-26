import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { navLinks } from "../../data/site";
import { scrollToTopSmooth } from "../../lib/utils";

export default function NavMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!menuRef.current) return;
      if (menuRef.current.contains(event.target as Node)) return;
      setIsMenuOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isMenuOpen]);

  return (
    <nav className="nav-menu relative w-full">
      <button
        onClick={isMenuOpen ? closeMenu : openMenu}
        className="nav-menu-button focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent/45 bg-bg-elev/90 text-text shadow-[0_0_12px_var(--glow)] lg:hidden"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-site-menu"
      >
        {isMenuOpen ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M4 12H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M4 17H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        )}
      </button>

      <div
        className={
          `fixed inset-0 z-30 bg-black/40 transition-opacity duration-300 lg:hidden ` +
          `${isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`
        }
        onClick={closeMenu}
        aria-hidden="true"
      />

      <div
        id="mobile-site-menu"
        className={
          `fixed left-1/2 top-24 z-40 w-[min(90vw,420px)] -translate-x-1/2 rounded-3xl border border-border bg-bg p-6 shadow-soft ` +
          `transition-all duration-300 lg:static lg:mt-0 lg:block lg:w-auto lg:translate-x-0 lg:border-none lg:bg-transparent lg:p-0 lg:shadow-none lg:transition-none ` +
          `lg:opacity-100 lg:translate-y-0 lg:pointer-events-auto ` +
          `${isMenuOpen ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-2"}`
        }
        ref={menuRef}
      >
        <ul className="flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:gap-4 xl:gap-6">
          {navLinks.map((item) => (
            <li key={item.path} className="list-none">
              <NavLink
                to={item.path}
                onClick={() => {
                  if (item.path === "/work") scrollToTopSmooth();
                  closeMenu();
                }}
                className={({ isActive }) =>
                  `group relative inline-flex items-center rounded-full lg:rounded-none ${
                    isActive
                      ? "text-accent drop-shadow-[0_0_10px_rgba(34,241,214,0.5)]"
                      : "text-text-muted"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`nav-menu-item relative z-10 block whitespace-nowrap px-3 py-2 text-sm uppercase tracking-[0.16em] transition-colors duration-300 group-hover:text-accent lg:px-2.5 lg:py-1.5 lg:text-[0.68rem] ${
                        isActive ? "" : ""
                      }`.trim()}
                    >
                      {item.label}
                    </span>
                    <span
                      className={`pointer-events-none absolute inset-0 border-y border-accent/70 opacity-0 transition-all duration-300 ${
                        isActive ? "opacity-100" : "group-hover:opacity-100"
                      }`}
                    />
                    <span className="pointer-events-none absolute inset-0 z-0 bg-accent/10 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
