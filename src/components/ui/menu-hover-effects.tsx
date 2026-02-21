import { useState } from "react";
import { NavLink } from "react-router-dom";
import { navLinks } from "../../data/site";

export default function NavMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="relative w-full">
      <button
        onClick={toggleMenu}
        className="focus-ring rounded-full border border-accent/40 bg-bg-elev/80 px-5 py-2 text-xs uppercase tracking-[0.22em] text-text shadow-[0_0_12px_var(--glow)] lg:hidden"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMenuOpen ? "Close" : "Menu"}
      </button>

      <div
        className={
          `fixed inset-0 z-30 bg-black/40 transition-opacity duration-300 lg:hidden ` +
          `${isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`
        }
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      <div
        className={
          `fixed left-1/2 top-24 z-40 w-[min(90vw,420px)] -translate-x-1/2 rounded-3xl border border-border bg-bg p-6 shadow-soft ` +
          `transition-all duration-300 lg:static lg:mt-0 lg:block lg:w-auto lg:translate-x-0 lg:border-none lg:bg-transparent lg:p-0 lg:shadow-none lg:transition-none ` +
          `lg:opacity-100 lg:translate-y-0 lg:pointer-events-auto ` +
          `${isMenuOpen ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-2"}`
        }
      >
        <ul className="flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:gap-6 xl:gap-10">
          {navLinks.map((item) => (
            <li key={item.path} className="list-none">
              <NavLink
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
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
                      className={`relative z-10 block whitespace-nowrap px-3 py-2 text-xs uppercase tracking-[0.18em] transition-colors duration-300 group-hover:text-accent ${
                        isActive
                          ? "rounded-full border border-accent/60 bg-accent/10 lg:rounded-none lg:border-transparent lg:bg-transparent"
                          : ""
                      }`.trim()}
                    >
                      {item.label}
                    </span>
                    <span className="pointer-events-none absolute inset-0 border-y border-accent/70 opacity-0 transition-all duration-300 group-hover:opacity-100" />
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
