import { NavLink, useLocation } from "react-router-dom";
import Button from "./Button";
import Logo from "./Logo";
import NavMenu from "./ui/menu-hover-effects";
import ThemeToggle from "./ThemeToggle";
import headerLogo from "../assets/logo/svg logo (1).png";

export default function Navbar() {
  const { pathname } = useLocation();
  const showHeaderLogo = pathname === "/";

  return (
    <header
      data-site-header
      className="site-header-dark fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg-elev backdrop-blur-lg"
    >
      <div className="mx-auto flex w-full max-w-[1400px] items-center gap-4 px-5 py-4 md:gap-6 md:px-8 md:py-5 lg:px-10 xl:px-14">
        <NavLink
          to="/"
          className="focus-ring inline-flex items-center rounded-full"
          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
        >
          {showHeaderLogo ? <Logo imageSrc={headerLogo} imageClassName="rounded-none" /> : null}
          <span className="brand-name ml-2 text-sm uppercase tracking-[0.18em] text-accent">
            Horizon Digital
          </span>
        </NavLink>
        <div className="ml-auto flex items-center gap-3">
          <ThemeToggle />
          <div className="hidden lg:block">
            <NavMenu />
          </div>
          <div className="hidden items-center gap-7 lg:flex">
            <Button
              label="Book a free consult"
              to="/contact"
              size="sm"
              className="shadow-[0_0_20px_var(--glow)]"
            />
          </div>
          <div className="lg:hidden">
            <NavMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
