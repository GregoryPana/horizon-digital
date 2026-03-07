import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./navigation-menu";
import { navLinks, workItems } from "../../data/site";
import { cn, scrollToTopSmooth } from "../../lib/utils";

type MobileMenuItem = {
  id: string;
  label: string;
  to?: string;
  children?: Array<{ label: string; to: string }>;
};

const mobileMenuItems: MobileMenuItem[] = [
  { id: "home", label: "Home", to: "/" },
  { id: "need", label: "What You Need", to: "/what-you-need" },
  { id: "work", label: "Our Work", to: "/work" },
  {
    id: "pricing",
    label: "Services & Pricing",
    to: "/services-pricing",
    children: [
      { label: "Overview", to: "/services-pricing#overview" },
      { label: "Packages", to: "/services-pricing#packages" },
      { label: "Hosting", to: "/services-pricing#hosting" },
      { label: "Add-ons", to: "/services-pricing#addons" },
    ],
  },
  {
    id: "insights",
    label: "Digital Insights",
    to: "/ai-digital-tools",
    children: [
      { label: "Main page", to: "/ai-digital-tools" },
      { label: "All insights", to: "/insights" },
    ],
  },
  { id: "about", label: "About", to: "/about" },
  { id: "contact", label: "Contact", to: "/contact" },
];

const desktopDropdowns: Record<string, Array<{ label: string; to: string }>> = {
  "/": [
    { label: "Services", to: "/#services" },
    { label: "Featured Work", to: "/#featured-work" },
    { label: "Process", to: "/#process" },
    { label: "Packages", to: "/#packages" },
    { label: "FAQ", to: "/#faq" },
    { label: "Ready", to: "/#ready" },
  ],
  "/services-pricing": [
    { label: "Overview", to: "/services-pricing#overview" },
    { label: "Process", to: "/services-pricing#process" },
    { label: "Packages", to: "/services-pricing#packages" },
    { label: "Hosting", to: "/services-pricing#hosting" },
    { label: "Add-ons", to: "/services-pricing#addons" },
    { label: "Visibility", to: "/services-pricing#visibility" },
  ],
  "/ai-digital-tools": [
    { label: "Main page", to: "/ai-digital-tools" },
    { label: "All insights", to: "/insights" },
  ],
};

export default function NavMenu() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const scrollLockRef = useRef(0);

  const closeMenu = () => setIsMenuOpen(false);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((current) =>
      current.includes(groupId) ? current.filter((item) => item !== groupId) : [...current, groupId]
    );
  };

  const handleDesktopPrimaryNavClick = (path: string) => {
    navigate(path);
    if (path === "/work") {
      scrollToTopSmooth();
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const normalizePath = (value: string) => {
    if (value === "/") return "/";
    return value.replace(/\/+$/, "") || "/";
  };

  const isDesktopItemActive = (path: string) => {
    const currentPath = normalizePath(location.pathname);
    const itemPath = normalizePath(path);

    if (itemPath === "/") return currentPath === "/";
    if (path === "/ai-digital-tools") {
      return currentPath === "/ai-digital-tools" || currentPath.startsWith("/insights");
    }
    return currentPath === itemPath;
  };

  useEffect(() => {
    closeMenu();
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.documentElement.style.overflow = "";
      return;
    }

    scrollLockRef.current = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollLockRef.current}px`;
    document.body.style.width = "100%";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.documentElement.style.overflow = "";
      window.scrollTo(0, scrollLockRef.current);
    };
  }, [isMenuOpen]);

  return (
    <nav className="nav-menu relative inline-block">
      <button
        onClick={() => setIsMenuOpen((prev) => !prev)}
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
            className={`absolute h-[2px] w-4 rounded-full bg-current transition-all duration-200 ${
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
        className={`fixed inset-0 z-[95] h-[100dvh] w-screen overflow-y-auto overscroll-contain bg-[#060b12] text-[#e8edf5] transition-all duration-300 ease-out lg:hidden ${
          isMenuOpen ? "pointer-events-auto translate-x-0 opacity-100" : "pointer-events-none translate-x-full opacity-0"
        }`.trim()}
        style={{ backgroundColor: "rgba(6, 11, 18, 0.99)" }}
      >
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 bg-[#060b12]" />

        <div className="relative z-[1] mx-auto flex min-h-full w-full max-w-3xl flex-col px-6 pb-10 pt-20">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.34em] text-[#a8bfd4]">Navigation</p>
            <button
              type="button"
              onClick={closeMenu}
              className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#36506b] text-[#a8bfd4]"
              aria-label="Close menu"
            >
              <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
                <path
                  d="M5 5l10 10M15 5L5 15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <ul className="mt-8 flex-1">
            {mobileMenuItems.map((item) => {
              const isExpanded = expandedGroups.includes(item.id);
              return (
                <li key={item.id} className="border-b border-[#28415a] py-4">
                  <div className="flex items-center justify-between gap-3">
                    {item.to ? (
                      <NavLink
                        to={item.to}
                        onClick={() => {
                          if (item.to === "/work") scrollToTopSmooth();
                          closeMenu();
                        }}
                        className={({ isActive }) =>
                          `focus-ring text-sm font-semibold uppercase tracking-[0.14em] transition ${
                            isActive ? "text-[#46c6e8]" : "text-[#e8edf5]"
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    ) : (
                      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#e8edf5]">
                        {item.label}
                      </p>
                    )}

                    {item.children?.length ? (
                      <button
                        type="button"
                        onClick={() => toggleGroup(item.id)}
                        className="focus-ring inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#36506b] text-sm text-[#a8bfd4]"
                        aria-expanded={isExpanded}
                        aria-controls={`mobile-submenu-${item.id}`}
                        aria-label={isExpanded ? `Hide ${item.label} options` : `Show ${item.label} options`}
                      >
                        <svg
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                          className={`h-4 w-4 transition-transform duration-200 ${
                            isExpanded ? "rotate-90" : "rotate-0"
                          }`.trim()}
                        >
                          <path
                            d="M7 4l6 6-6 6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    ) : null}
                  </div>

                  {item.children?.length ? (
                    <div
                      id={`mobile-submenu-${item.id}`}
                      className={`grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-300 ${
                        isExpanded ? "mt-3 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
                      }`.trim()}
                    >
                      <ul className="overflow-hidden border-l border-[#36506b] pl-3">
                        {item.children.map((subItem) => (
                          <li key={subItem.to} className="py-1.5">
                            <NavLink
                              to={subItem.to}
                              onClick={closeMenu}
                              className={({ isActive }) =>
                                `focus-ring text-xs uppercase tracking-[0.13em] transition ${
                                  isActive ? "text-[#ff8f5a]" : "text-[#bfd0de] hover:text-[#46c6e8]"
                                }`
                              }
                            >
                              {subItem.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>

          <div className="horizon-line mt-6" />
        </div>
      </div>

      <div className="hidden lg:block">
        <NavigationMenu viewport={false} className="relative">
          <NavigationMenuList className="gap-3 xl:gap-5">
            {navLinks.map((item) => {
              const hasSectionDropdown = Object.prototype.hasOwnProperty.call(desktopDropdowns, item.path);
              const hasWorkDropdown = item.path === "/work";
              const hasDropdown = hasSectionDropdown || hasWorkDropdown;
              const isInsightsMenu = item.path === "/ai-digital-tools";
              const isActive = isDesktopItemActive(item.path);

              if (!hasDropdown) {
                return (
                  <NavigationMenuItem key={item.path}>
                    <NavigationMenuLink asChild>
                      <NavLink
                        to={item.path}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          isActive ? "nav-active-page !text-accent" : "hover:border-accent/18"
                        )}
                      >
                        {item.label}
                      </NavLink>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              }

              return (
                <NavigationMenuItem key={item.path}>
                  <NavigationMenuTrigger
                    onClick={() => handleDesktopPrimaryNavClick(item.path)}
                    className={cn(
                      isActive ? "nav-active-page !text-accent" : "hover:border-accent/18"
                    )}
                  >
                    {item.label}
                  </NavigationMenuTrigger>

                  <NavigationMenuContent className={isInsightsMenu ? "nav-dropdown-insights" : undefined}>
                    {hasWorkDropdown ? (
                      <div className="grid min-w-[170px] grid-cols-1 gap-2">
                        {workItems.map((work) => (
                          <a
                            key={work.title}
                            href={work.url ?? "/work"}
                            target="_blank"
                            rel="noreferrer"
                            className="group flex items-center gap-2 rounded-lg border border-border bg-bg-panel/80 p-1.5 transition hover:border-accent/50"
                          >
                            <img
                              src={work.imageWebp800 || work.imageWebp || work.image}
                              alt={work.title}
                              width={52}
                              height={68}
                              loading="lazy"
                              decoding="async"
                              className="h-[68px] w-[52px] rounded-md object-cover"
                            />
                            <p className="line-clamp-2 text-[0.62rem] font-semibold uppercase tracking-[0.11em] text-accent-2">
                              {work.title}
                            </p>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div className="grid min-w-[460px] grid-cols-2 gap-x-8 gap-y-2">
                        {desktopDropdowns[item.path].map((sectionLink) => (
                          <Link
                            key={`${item.path}-${sectionLink.to}`}
                            to={sectionLink.to}
                            className={cn(
                              "nav-dropdown-link rounded-md px-1.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] transition",
                              isInsightsMenu
                                ? "nav-dropdown-link-insights"
                                : "text-text hover:bg-accent-soft hover:text-accent"
                            )}
                          >
                            {sectionLink.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
