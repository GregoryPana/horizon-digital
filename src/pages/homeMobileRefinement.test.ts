const lineMotion = readFileSync(new URL("../components/ui/heroLineReveal.ts", import.meta.url), "utf8");
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const styles = readFileSync(new URL("../index.css", import.meta.url), "utf8");
const hero = readFileSync(new URL("../components/ui/BuildExtractionHero.tsx", import.meta.url), "utf8");
const story = readFileSync(new URL("../components/ui/HeroBuildExtractionStory.tsx", import.meta.url), "utf8");
const heroStyles = readFileSync(new URL("../components/ui/heroBuildExtraction.css", import.meta.url), "utf8");
const menu = readFileSync(new URL("../components/ui/menu-hover-effects.tsx", import.meta.url), "utf8");

describe("mobile density and controlled motion refinements", () => {
  // Retired Home-only integration: docs/release-evidence/retired-homepage-assertions.md.
  // Replacement: editorialHome.reconciliation.test.ts (content/route) and editorial runtime tests.

  it("clips each inactive desktop service visual to a narrow edge strip", () => {
    expect(styles).toMatch(/floating-carousel-panel:not\(\[data-active="true"\]\) \.service-story[\s\S]*clip-path:\s*inset\(0 calc\(100% - 46px\) 0 0\)/);
    expect(styles).toMatch(/floating-carousel-panel\[data-active="true"\] \.service-story[\s\S]*clip-path:\s*none/);
  });

  it("contains no mobile phone mockup and reveals semantic headline words before support", () => {
    expect(story).not.toContain("hbe-phone");
    expect(story).not.toContain('data-hbe-device="mobile"');
    expect(hero).not.toContain("hbe-phone");
    expect(heroStyles).not.toContain(".hbe-phone");
    expect(hero).toContain('className="hbe-title-word"');
    expect(lineMotion).toContain("word.getBoundingClientRect().top");
    expect(lineMotion).toContain("HERO_LINE_REVEAL.blur");
    expect(lineMotion).toContain('root.dataset.hbePhase = "headline-reveal"');
  });

  it("uses a slower controlled menu close before page timelines resume", () => {
    expect(menu).toContain("MENU_CLOSE_TRANSITION_MS = 700");
    expect(styles).toMatch(/\.mobile-site-menu-overlay\s*\{[\s\S]*opacity 520ms[\s\S]*clip-path 620ms/);
    expect(styles).toMatch(/\.mobile-site-menu-overlay\.is-open\s*\{[\s\S]*transition-duration:\s*320ms,\s*440ms/);
  });
});
