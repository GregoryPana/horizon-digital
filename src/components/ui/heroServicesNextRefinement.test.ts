const lineMotion = readFileSync(new URL("./heroLineReveal.ts", import.meta.url), "utf8");
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { HERO_BUILD_EXTRACTION_POLICIES, HERO_WORD_HEADLINE_EFFECT, getHeroWordRevealTiming, shouldMountHeroStories } from "./heroBuildExtraction";

const source = (relativePath: string) => readFileSync(new URL(relativePath, import.meta.url), "utf8");
const hero = source("./BuildExtractionHero.tsx");
const heroStyles = source("./heroBuildExtraction.css");
const story = source("./WebsiteBuildStory.tsx");
const services = source("../../pages/Services.tsx");
const servicesStyles = source("../../pages/ServicePages.css");
const serviceShowcase = source("./ServicesFamilyShowcase.tsx");
const indexStyles = source("../../index.css");
import { editorialHomeHtml as home } from "../editorial-home/content";

describe("next responsive hero and Services refinement", () => {
  it("does not mount hidden homepage story SVGs below the desktop/tablet breakpoint", () => {
    expect(shouldMountHeroStories(767)).toBe(false);
    expect(shouldMountHeroStories(768)).toBe(true);
    expect(hero).toContain("useHeroStoryMount");
    expect(hero).toMatch(/mountHeroStories\s*\?[\s\S]*HeroWebsitePlayback[\s\S]*:\s*null/);
  });

  it("restores a slightly faster and cleaner mobile text-only reveal", () => {
    const [headline, support] = HERO_BUILD_EXTRACTION_POLICIES.mobile.stages;
    expect(headline.start + headline.duration).toBeCloseTo(getHeroWordRevealTiming(7).revealEnd);
    expect(support.start).toBeGreaterThan(headline.start + headline.duration);
    expect(HERO_WORD_HEADLINE_EFFECT.blur).toBe(6);
    expect(lineMotion).toContain("HERO_LINE_REVEAL.blur");
    expect(hero).not.toContain('filter: "blur(12px)"');
  });

  it("removes obsolete device-extraction and miniature-site CSS", () => {
    for (const deadSelector of [
      ".hbe-laptop",
      ".hbe-device-motion",
      ".hbe-headline-screen",
      ".hbe-site-canvas",
      ".hbe-scaffold-piece",
      ".hbe-completion-piece",
    ]) {
      expect(heroStyles).not.toContain(deadSelector);
    }
  });

  it("gives the landscape story the same authored interface fidelity as portrait", () => {
    expect(story).toContain("story-landscape-nav");
    expect(story).toContain("story-landscape-hero-copy");
    expect(story).toContain("story-landscape-services");
    expect(story).toContain("PROJECT READY");
    expect(story).toContain("#58d5e3");
    expect(story).toContain("#73dca8");
    expect(story).toContain("#9d8fff");
  });

  it("reserves visible breathing room between the story stage and CTAs at 720p and 1080p", () => {
    expect(heroStyles).toContain("--hbe-story-action-gap");
    expect(heroStyles).toMatch(/\.hbe-visual-column \.hbe-actions[\s\S]*margin-top:\s*var\(--hbe-story-action-gap\)/);
    expect(heroStyles).toMatch(/@media \(min-width: 768px\) and \(max-height: 800px\)[\s\S]*--hbe-story-action-gap:\s*22px/);
    expect(heroStyles).toMatch(/@media \(min-width: 1200px\) and \(min-height: 900px\)[\s\S]*--hbe-story-action-gap:\s*clamp\(28px, 3vh, 36px\)/);
  });

  it("shares the homepage atmosphere with Services and establishes it as the route rollout primitive", () => {
    // Services retains its primitive; editorial atmosphere is independently scoped.
    expect(home).toContain('id="opening"');
    expect(services).toContain("site-atmosphere");
    expect(indexStyles).toContain(".site-atmosphere::before");
    expect(indexStyles).toContain(".site-atmosphere::after");
    expect(servicesStyles).toContain(".service-hub.site-atmosphere");
  });

  it("replaces the Services decision diagram/carousel with a large visual and active vertical service narrative", () => {
    expect(services).toContain("ServicesFamilyShowcase");
    expect(services).not.toContain("ServicesDecisionStory");
    expect(services).not.toContain("FloatingCarousel");
    expect(serviceShowcase).toContain("ServiceFamilyVisual");
    expect(serviceShowcase).toContain("services-family-showcase-visual");
    expect(serviceShowcase).toContain("services-family-showcase-steps");
    expect(serviceShowcase).toContain('aria-pressed={isActive}');
    expect(servicesStyles).toMatch(/\.services-family-showcase[\s\S]*grid-template-columns:\s*minmax\(0, 1\.35fr\) minmax\(320px, \.85fr\)/);
    expect(servicesStyles).toContain(".services-family-showcase-step[aria-pressed=\"false\"]");
  });
});
