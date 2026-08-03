import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const heroStyles = readFileSync(new URL("../components/ui/heroBuildExtraction.css", import.meta.url), "utf8");
const homeSource = readFileSync(new URL("./Home.tsx", import.meta.url), "utf8");
const styles = readFileSync(new URL("../index.css", import.meta.url), "utf8");
const atmosphereSource = readFileSync(new URL("../components/ui/siteAtmosphere.ts", import.meta.url), "utf8");

describe("full-viewport hero, dark glow field and service reading order", () => {
  it("uses the full viewport, grows the desktop visual and centres its CTA rail", () => {
    expect(heroStyles).toMatch(/\.hbe-context-home\s*\{[\s\S]*height:\s*100svh/);
    expect(heroStyles).toMatch(/\.hbe-context-home\s*\{[\s\S]*overflow:\s*hidden/);
    expect(heroStyles).toMatch(/\.hbe-visual-column \.hbe-actions\s*\{[\s\S]*justify-content:\s*center/);
    expect(heroStyles).toMatch(/\.hbe-desktop-build-story \.website-build-story\s*\{[\s\S]*scale\(1\.08\)/);
  });

  it("updates pointer coordinates for a glow shared by the hero and later dark sections", () => {
    expect(homeSource).toContain("updateSiteAtmospherePointer");
    expect(atmosphereSource).toContain("--home-pointer-x");
    expect(atmosphereSource).toContain("--home-pointer-y");
    expect(styles).toContain(".home-neutral-prototype::after");
    expect(heroStyles).toMatch(/\.hbe-context-home\s*\{[\s\S]*background:\s*transparent/);
    expect(heroStyles).not.toContain(".hbe-context-home .elegant-dark-pattern");
    expect(styles).toMatch(/\.home-neutral-prototype::before\s*\{[\s\S]*opacity:\s*0\.8[2-9]/);
  });

  it("aligns desktop service copy to the wide page edge and puts mobile copy below its animation", () => {
    expect(styles).toMatch(/@media \(min-width:\s*768px\)[\s\S]*\.services-floating-carousel \.floating-carousel-panel\s*\{[\s\S]*width:\s*min\(calc\(100vw - 64px\),\s*1240px\)/);
    expect(styles).toMatch(/\.services-floating-carousel \.service-carousel-copy\s*\{\s*order:\s*2/);
    expect(styles).toMatch(/\.services-floating-carousel \.service-story\s*\{\s*order:\s*1/);
  });
});
