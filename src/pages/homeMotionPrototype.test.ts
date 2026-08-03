import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const homeSource = readFileSync(new URL("./Home.tsx", import.meta.url), "utf8");
const heroSource = readFileSync(new URL("../components/ui/BuildExtractionHero.tsx", import.meta.url), "utf8");
const globalStyles = readFileSync(new URL("../index.css", import.meta.url), "utf8");
const heroStyles = readFileSync(
  new URL("../components/ui/heroBuildExtraction.css", import.meta.url),
  "utf8"
);

describe("homepage atmospheric motion prototype", () => {
  it("uses the autonomous WorkMarquee for selected work without replacing other editorial carousels", () => {
    expect(homeSource).toContain('import { WorkMarquee } from "../components/ui/WorkMarquee"');
    expect(homeSource).toContain('<WorkMarquee label="Selected work">');
    expect(homeSource).not.toContain('<FloatingCarousel label="Selected work">');
  });

  it("uses one continuous atmospheric field behind all dark homepage sections", () => {
    expect(globalStyles).toContain("@keyframes home-continuous-atmosphere");
    expect(globalStyles).toContain(".home-neutral-prototype::before");
    expect(globalStyles).toMatch(/linear-gradient\(\s*118deg/);
    expect(globalStyles).toMatch(/\.home-neutral-prototype \.trust-ribbon\s*\{[\s\S]*background:\s*transparent/);
    expect(globalStyles).toMatch(/\.home-neutral-prototype \.section-lagoon[\s\S]*background:\s*transparent/);
    expect(globalStyles).toMatch(/\.home-neutral-prototype \.pricing-section[\s\S]*background:\s*transparent/);
    expect(globalStyles).toMatch(/\.home-neutral-prototype \.final-cta-section[\s\S]*background:\s*transparent/);
  });

  it("lets the homepage hero use the same shared atmosphere while retaining the reusable preview pattern", () => {
    expect(heroStyles).toMatch(/\.hbe-hero\s*\{[\s\S]*background:\s*#020304/);
    expect(heroStyles).toContain(".elegant-dark-pattern");
    expect(heroStyles).toMatch(/\.hbe-context-home\s*\{[\s\S]*background:\s*transparent/);
    expect(heroSource).toContain('context === "preview" ? <ElegantDarkPattern');
    expect(heroStyles).not.toContain(".hbe-context-home .elegant-dark-pattern");
    expect(heroStyles).toContain("@keyframes elegant-dark-pattern-drift");
  });

  it("holds meaningful static godrays and disables autonomous drift for reduced motion", () => {
    expect(globalStyles).toMatch(/prefers-reduced-motion:\s*reduce[\s\S]*animation:\s*none/);
    expect(heroStyles).toMatch(/prefers-reduced-motion:\s*reduce[\s\S]*\.elegant-dark-pattern__streaks[\s\S]*animation:\s*none/);
  });
});
