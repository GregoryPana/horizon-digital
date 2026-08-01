import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { navLinks } from "../../data/site";
import { mobileNavLinks, serviceNavItems } from "./menu-hover-effects";

const menuSource = readFileSync(
  new URL("./menu-hover-effects.tsx", import.meta.url),
  "utf8",
);

describe("mobileNavLinks", () => {
  it("adds an explicit Home item only to the compact/mobile menu", () => {
    expect(mobileNavLinks[0]).toEqual({ label: "Home", path: "/" });
    expect(mobileNavLinks.slice(1)).toEqual(navLinks);
  });

  it("leaves the desktop nav links untouched", () => {
    expect(navLinks.some((item) => item.label === "Home")).toBe(false);
  });

  it("publishes the overview and three approved root-level service destinations", () => {
    expect(serviceNavItems.map((item) => item.path)).toEqual([
      "/services",
      "/web-design-seychelles",
      "/seo-services-seychelles",
      "/analytics-and-digital-presence-seychelles",
    ]);
    expect(serviceNavItems.every((item) => item.title && item.support)).toBe(
      true,
    );
    expect(
      serviceNavItems.some((item) => item.path.startsWith("/services/")),
    ).toBe(false);
  });

  it("uses the exact five-item primary decision navigation", () => {
    expect(navLinks).toEqual([
      { label: "Services", path: "/services" },
      { label: "Work", path: "/work" },
      { label: "Pricing", path: "/pricing" },
      { label: "Insights", path: "/insights" },
      { label: "About", path: "/about" },
    ]);
  });

  it("explicitly closes every desktop Services route link, including same-route selections", () => {
    expect(menuSource).toContain("const closeDesktopServices = () =>");
    expect(menuSource).toMatch(
      /to="\/services"\s+onClick=\{closeDesktopServices\}/,
    );
    expect(
      menuSource.match(/to="\/services"\s+onClick=\{closeDesktopServices\}/g),
    ).toHaveLength(2);
    expect(menuSource).toMatch(
      /to=\{entry\.path\}\s+onClick=\{closeDesktopServices\}/,
    );
    expect(menuSource).not.toMatch(/onClick=\{\(\)=>location\./);
  });

  it("retains desktop protected-close, Escape, outside and focus-leave contracts", () => {
    expect(menuSource).toMatch(
      /setTimeout\(\s*\(\)\s*=>\s*setDesktopServicesOpen\(false\),\s*150,?\s*\)/,
    );
    expect(menuSource).toContain('event.key === "Escape"');
    expect(menuSource).toContain(
      'document.addEventListener("pointerdown", onPointerDown)',
    );
    expect(menuSource).toContain(
      "event.currentTarget.contains(event.relatedTarget as Node)",
    );
    expect(menuSource).toMatch(
      /tabIndex=\{desktopServicesOpen\s*\?\s*0\s*:\s*-1\}/,
    );
  });

  it("retains mobile disclosure, hidden focus exclusion, route closure and focus return", () => {
    expect(menuSource).toContain("aria-expanded={mobileServicesOpen}");
    expect(menuSource).toContain('aria-controls="mobile-services-submenu"');
    expect(menuSource).toMatch(
      /tabIndex=\{mobileServicesOpen\s*\?\s*0\s*:\s*-1\}/,
    );
    expect(menuSource).toMatch(/onClick=\{\(\)\s*=>\s*closeMenu\(\)\}/);
    expect(menuSource).toContain("closeMenu(true)");
    expect(menuSource).toContain('document.body.style.overflow = "hidden"');
  });
});
