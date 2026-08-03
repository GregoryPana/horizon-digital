import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const heroStyles = readFileSync(new URL("../components/ui/heroBuildExtraction.css", import.meta.url), "utf8");
const heroSource = readFileSync(new URL("../components/ui/BuildExtractionHero.tsx", import.meta.url), "utf8");
const styles = readFileSync(new URL("../index.css", import.meta.url), "utf8");
const marquee = readFileSync(new URL("../components/ui/WorkMarquee.tsx", import.meta.url), "utf8");

describe("homepage atmosphere consistency, work flow and clean service stack", () => {
  it("lets the homepage hero use the exact shared atmosphere and pointer glow", () => {
    expect(heroStyles).toMatch(/\.hbe-context-home\s*\{[\s\S]*background:\s*transparent/);
    expect(heroSource).toContain('context === "preview" ? <ElegantDarkPattern');
    expect(heroStyles).not.toContain(".hbe-context-home .elegant-dark-pattern");
    expect(heroStyles).not.toContain(".hbe-context-home::before");
  });

  it("keeps the shared fixed atmosphere beneath an opaque original footer", () => {
    expect(styles).toMatch(/body:has\(\.home-neutral-prototype\) \.site-footer-dark\s*\{[\s\S]*z-index:\s*[2-9]/);
    expect(styles).toMatch(/body:has\(\.home-neutral-prototype\) \.site-footer-dark\s*\{[\s\S]*background(?:-color)?:\s*#0F141A/i);
    expect(styles).toMatch(/body:has\(\.home-neutral-prototype\) \.site-footer-dark\s*\{[\s\S]*background-image:\s*none/);
  });

  it("keeps autoplay visibly flowing after focus and direct interaction", () => {
    expect(marquee).toContain("AUTO_SCROLL_PIXELS_PER_SECOND = 120");
    expect(marquee).not.toContain("onFocus={handleFocus}");
    expect(marquee).not.toContain("onBlur={handleBlur}");
  });

  it("positions inactive service visuals as narrow peeks around the active visual only", () => {
    expect(styles).toContain("min(calc(100vw - 64px), 1240px) + clamp(-170px, -11vw, -105px) - 40px");
    expect(styles).toContain("calc(-1 * clamp(240px, 31.5vw, 455px))");
    expect(styles).toMatch(/floating-carousel-panel:not\(\[data-active="true"\]\) \.service-carousel-copy\s*\{[\s\S]*visibility:\s*hidden/);
    expect(styles).toMatch(/floating-carousel-panel\[data-offset="-2"\] \.service-story[\s\S]*visibility:\s*hidden/);
  });
});
