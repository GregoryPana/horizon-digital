import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const home = readFileSync(new URL("./Home.tsx", import.meta.url), "utf8");
const styles = readFileSync(new URL("../index.css", import.meta.url), "utf8");
const hero = readFileSync(new URL("../components/ui/BuildExtractionHero.tsx", import.meta.url), "utf8");
const story = readFileSync(new URL("../components/ui/HeroBuildExtractionStory.tsx", import.meta.url), "utf8");
const heroStyles = readFileSync(new URL("../components/ui/heroBuildExtraction.css", import.meta.url), "utf8");
const menu = readFileSync(new URL("../components/ui/menu-hover-effects.tsx", import.meta.url), "utf8");

describe("mobile density and controlled motion refinements", () => {
  it("uses compact mobile work cards whose copy aligns to the media edge", () => {
    expect(home).toContain('className="home-work-card');
    expect(home).toContain('className="home-work-card-media');
    expect(home).toContain('className="home-work-card-copy');
    expect(styles).toMatch(/@media \(max-width:\s*767px\)[\s\S]*\.home-work-card-media img[\s\S]*aspect-ratio:\s*16\s*\/\s*10/);
    expect(styles).toMatch(/@media \(max-width:\s*767px\)[\s\S]*\.home-work-card-copy[\s\S]*padding-inline:\s*0/);
    expect(styles).toMatch(/@media \(max-width:\s*767px\)[\s\S]*\.work-marquee-item[\s\S]*width:\s*min\(76vw,\s*360px\)/);
  });

  it("clips each inactive desktop service visual to a narrow edge strip", () => {
    expect(styles).toMatch(/floating-carousel-panel:not\(\[data-active="true"\]\) \.service-story[\s\S]*clip-path:\s*inset\(0 calc\(100% - 46px\) 0 0\)/);
    expect(styles).toMatch(/floating-carousel-panel\[data-active="true"\] \.service-story[\s\S]*clip-path:\s*none/);
  });

  it("contains no mobile phone mockup and reveals semantic headline letters before support", () => {
    expect(story).not.toContain("hbe-phone");
    expect(story).not.toContain('data-hbe-device="mobile"');
    expect(hero).not.toContain("hbe-phone");
    expect(heroStyles).not.toContain(".hbe-phone");
    expect(hero).toContain('className="hbe-title-letter"');
    expect(hero).toContain('query<HTMLElement>(".hbe-title-letter")');
    expect(hero).toContain('filter: "blur(10px)"');
    expect(hero).toMatch(/setPhase\("headline-reveal"\)[\s\S]*\.to\(letters[\s\S]*setPhase\("support"\)/);
  });

  it("uses a slower controlled menu close before page timelines resume", () => {
    expect(menu).toContain("MENU_CLOSE_TRANSITION_MS = 700");
    expect(styles).toMatch(/\.mobile-site-menu-overlay\s*\{[\s\S]*opacity 520ms[\s\S]*clip-path 620ms/);
    expect(styles).toMatch(/\.mobile-site-menu-overlay\.is-open\s*\{[\s\S]*transition-duration:\s*320ms,\s*440ms/);
  });
});
