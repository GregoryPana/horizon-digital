import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { navLinks } from "../../data/site";
import { scrollToTopSmooth } from "../../lib/utils";

export default function NavMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (!menuRef.current) return;
      if (menuRef.current.contains(target)) return;
      if (buttonRef.current?.contains(target)) return;
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
    <nav className="nav-menu relative inline-block">
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="nav-menu-button header-control-dark focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border shadow-[0_0_12px_var(--glow)] lg:hidden"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-site-menu"
      >
        <span className="relative inline-flex h-5 w-5 items-center justify-center" aria-hidden="true">
          <span
            className={`absolute h-[2px] w-4 rounded-full bg-current transition-all duration-300 ${
              isMenuOpen ? "translate-y-0 rotate-45" : "-translate-y-[5px] rotate-0"
            }`.trim()}
          />
          <span
            className={`absolute h-[2px] w-4 rounded-full bg-current transition-all duration-250 ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`.trim()}
          />
          <span
            className={`absolute h-[2px] w-4 rounded-full bg-current transition-all duration-300 ${
              isMenuOpen ? "translate-y-0 -rotate-45" : "translate-y-[5px] rotate-0"
            }`.trim()}
          />
        </span>
      </button>

      <div
        id="mobile-site-menu"
        className={
          `mobile-nav-dropdown absolute right-0 top-full z-40 mt-2 w-max max-w-[90vw] rounded-2xl border border-border bg-bg p-[1.05rem] shadow-soft ` +
          `origin-top-right transition-all duration-250 lg:static lg:mt-0 lg:block lg:w-auto lg:translate-x-0 lg:border-none lg:bg-transparent lg:p-0 lg:shadow-none lg:transition-none ` +
          `lg:opacity-100 lg:translate-y-0 lg:pointer-events-auto ` +
          `${isMenuOpen ? "opacity-100 scale-100 translate-y-0" : "pointer-events-none opacity-0 scale-95 -translate-y-2"}`
        }
        ref={menuRef}
      >
        <ul className="flex flex-col items-end gap-2 text-right lg:flex-row lg:items-center lg:text-left lg:gap-4 xl:gap-6">
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
                      : "text-text lg:text-text-muted"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`nav-menu-item relative z-10 block whitespace-nowrap px-2.5 py-1.5 text-[0.76rem] uppercase tracking-[0.13em] transition-colors duration-300 group-hover:text-accent lg:px-2.5 lg:py-1.5 lg:text-[0.68rem] ${
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
