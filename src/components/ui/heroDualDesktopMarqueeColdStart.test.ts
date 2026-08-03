import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { HERO_BUILD_EXTRACTION_POLICIES } from "./heroBuildExtraction";

const hero = readFileSync(new URL("./BuildExtractionHero.tsx", import.meta.url), "utf8");
const heroStyles = readFileSync(new URL("./heroBuildExtraction.css", import.meta.url), "utf8");
const marquee = readFileSync(new URL("./WorkMarquee.tsx", import.meta.url), "utf8");

describe("corrected hero device placement and marquee startup contract", () => {
  it("keeps every build SVG out of the mobile composition", () => {
    expect(hero).not.toContain("hbe-mobile-story-slot");
    expect(hero).toContain("useHeroStoryMount");
    expect(hero).toMatch(/mountHeroStories\s*\?[\s\S]*hbe-story-column[\s\S]*:\s*null/);
    expect(heroStyles).not.toMatch(/\.hbe-story-column\s*\{[^}]*display:\s*none/);
    expect(HERO_BUILD_EXTRACTION_POLICIES.mobile.finalState.device).toBe("absent");
  });

  it("renders desktop and mobile build stories together inside the desktop visual column", () => {
    const visualColumn = hero.slice(hero.indexOf('className="hbe-visual-column"'));
    expect(visualColumn).toContain('className="hbe-desktop-story-primary"');
    expect(visualColumn).toContain('className="hbe-desktop-story-mobile-preview"');
    expect(visualColumn).toContain('variant="desktop"');
    expect(visualColumn).toContain('variant="mobile"');
    expect(heroStyles).toContain(".hbe-desktop-story-mobile-preview");
  });

  it("places the desktop CTA slightly below the dual-device stage", () => {
    expect(heroStyles).toMatch(/\.hbe-visual-column \.hbe-actions\s*\{[\s\S]*margin-top:\s*var\(--hbe-story-action-gap\)/);
  });

  it("arms native marquee autoplay from intrinsic layout and page lifecycle signals", () => {
    expect(marquee).toContain("measureLoopWidth");
    expect(marquee).toContain("group.scrollWidth");
    expect(marquee).toContain("ResizeObserver");
    expect(marquee).toContain('addEventListener("pageshow"');
    expect(marquee).toContain('addEventListener("visibilitychange"');
  });
});
