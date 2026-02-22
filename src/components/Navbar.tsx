import { NavLink } from "react-router-dom";
import Button from "./Button";
import Logo from "./Logo";
import logo from "../assets/logo/favicon.png";
import NavMenu from "./ui/menu-hover-effects";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg-elev backdrop-blur-lg">
      <div className="mx-auto flex w-full max-w-[1400px] items-center gap-8 px-10 py-8 xl:px-14">
        <NavLink
          to="/"
          className="focus-ring rounded-full"
          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
        >
          <Logo imageSrc={logo} />
        </NavLink>
        <div className="ml-auto flex items-center gap-6">
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
