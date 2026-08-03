import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

function source(path: string) {
  try {
    return readFileSync(new URL(path, import.meta.url), "utf8");
  } catch {
    return "";
  }
}

const hero = source("./BuildExtractionHero.tsx");
const headlineMotion = source("./characterShine.ts");
const websiteStory = source("./WebsiteBuildStory.tsx");
const storyStyles = source("./heroBuildExtraction.css");
const services = source("../../pages/Services.tsx");
const servicesShowcase = source("./ServicesFamilyShowcase.tsx");
const serviceStyles = source("../../pages/ServicePages.css");

describe("transferable premium hero motion", () => {
  it("loops a restrained character-level shine rather than illuminating words", () => {
    expect(hero).toContain('query<HTMLElement>(".hbe-title-letter")');
    expect(hero).toContain("createCharacterShineTimeline");
    expect(headlineMotion).toContain("repeat: -1");
    expect(headlineMotion).toContain("repeatDelay");
    expect(headlineMotion).toContain("stagger");
    expect(headlineMotion).toContain("clearProps: \"color,text-shadow\"");
    expect(headlineMotion).not.toContain(".hbe-title-word");
  });

  it("keeps recurring shine out of mobile and reduced-motion branches", () => {
    expect(hero).toContain('(prefers-reduced-motion: no-preference) and (min-width: 768px)');
    expect(hero).toContain('(prefers-reduced-motion: no-preference) and (max-width: 767px)');
    expect(hero).toContain('mm.add("(prefers-reduced-motion: reduce)", setFinal)');
    expect(hero.match(/createCharacterShineTimeline/g)).toHaveLength(2);
  });

  it("authors independent landscape and portrait SVG narratives", () => {
    expect(websiteStory).toContain('mode?: "landscape" | "portrait"');
    expect(websiteStory).toContain("buildLandscapeTimeline");
    expect(websiteStory).toContain("buildPortraitTimeline");
    expect(websiteStory).toContain("story-portrait-cards");
    expect(websiteStory).toContain("story-portrait-contact");
    expect(websiteStory).toContain("story-scene-base");
    expect(storyStyles).toContain('[data-story-mode="portrait"]');
  });

  it("transfers the system to Services with a route-specific family showcase", () => {
    expect(services).toContain("ServicesHeroHeadline");
    expect(services).toContain("ServicesFamilyShowcase");
    expect(servicesShowcase).toContain("ServiceFamilyVisual");
    expect(servicesShowcase).toContain("services-family-showcase-steps");
    expect(serviceStyles).toContain(".services-family-showcase");
  });

  it("keeps the Services route semantically intact across the responsive showcase", () => {
    expect(serviceStyles).toMatch(/@media \(max-width: 767px\)[\s\S]*\.services-family-showcase\s*\{[\s\S]*grid-template-columns:\s*1fr/);
    expect(services.match(/<h1\b/g) ?? []).toHaveLength(0);
    expect(source("./ServicesHeroHeadline.tsx").match(/<h1\b/g) ?? []).toHaveLength(1);
  });
});
