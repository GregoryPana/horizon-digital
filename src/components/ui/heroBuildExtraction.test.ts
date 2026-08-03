import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Hero from "./animated-shader-hero";
import { BuildExtractionHero } from "./BuildExtractionHero";
import { HeroBuildExtractionStory } from "./HeroBuildExtractionStory";
import {
  HERO_BUILD_EXTRACTION_POLICIES,
  getHeroBuildExtractionComposition,
  type HeroBuildExtractionStageId,
} from "./heroBuildExtraction";

const DESKTOP_ORDER: HeroBuildExtractionStageId[] = ["screen-build"];
const MOBILE_ORDER: HeroBuildExtractionStageId[] = ["headline-reveal", "support"];
const previewSource = readFileSync(new URL("../../pages/dev/HeroBuildExtractionPreview.tsx", import.meta.url), "utf8");
const sharedHeroSource = readFileSync(new URL("./BuildExtractionHero.tsx", import.meta.url), "utf8");
const sharedHeroStyles = readFileSync(new URL("./heroBuildExtraction.css", import.meta.url), "utf8");
const storySource = readFileSync(new URL("./HeroBuildExtractionStory.tsx", import.meta.url), "utf8");
const websiteBuildStorySource = readFileSync(new URL("./WebsiteBuildStory.tsx", import.meta.url), "utf8");
const productionAdapterSource = readFileSync(new URL("./animated-shader-hero.tsx", import.meta.url), "utf8");
const homeSource = readFileSync(new URL("../../pages/Home.tsx", import.meta.url), "utf8");
const stripMarkup = (html: string) => html.replace(/<[^>]+>/g, "");

describe("shared BuildExtractionHero integration contract", () => {
  it("keeps the DEV route as a thin wrapper with approved copy", () => {
    expect(previewSource).toContain('const HEADLINE = "Your Web Designer of Choice in Seychelles";');
    expect(previewSource).toContain('text: "Request a free consult"');
    expect(previewSource).toContain('text: "See our work"');
    expect(previewSource).toContain('context="preview"');
    expect(previewSource).not.toContain("useGSAP");
  });

  it("owns and cleans up its finite scoped mobile timeline", () => {
    expect(sharedHeroSource).toContain("{ scope: rootRef }");
    expect(sharedHeroSource).toContain("let timeline: gsap.core.Timeline | undefined;");
    expect(sharedHeroSource).toContain("timeline?.kill();");
    expect(sharedHeroSource).toContain("mm.revert();");
    expect(sharedHeroSource).not.toContain("repeat: -1");
    expect(sharedHeroSource.match(/<h1\b/g)).toHaveLength(1);
  });

  it("keeps each decorative story lightweight without laptop or phone hardware", () => {
    const html = renderToStaticMarkup(createElement(HeroBuildExtractionStory));
    expect(html).toContain("hbe-desktop-build-story");
    expect(html).toContain("story-wireframe");
    expect(html).toContain('data-hbe-device="desktop"');
    expect(html).not.toContain('data-hbe-device="mobile"');
    expect(html).toContain('data-hbe-window="desktop"');
    expect(html).not.toContain("hbe-phone");
    expect(html).not.toContain("hbe-laptop");
    expect(storySource).not.toContain("MobileHeadlineScreen");
    expect(sharedHeroStyles).not.toContain(".hbe-phone");
  });

  it("renders one semantic headline with normal text and letter-level visual hooks", () => {
    const html = renderToStaticMarkup(
      createElement(MemoryRouter, null, createElement(BuildExtractionHero, {
        headline: "Made in Seychelles",
        subtitle: "Support",
      })),
    );
    expect(html.match(/<h1\b/g)).toHaveLength(1);
    expect(html.match(/class="hbe-title-letter"/g)).toHaveLength("MadeinSeychelles".length);
    expect(stripMarkup(html)).toContain("Made in Seychelles");
    expect(html).not.toContain("aria-label=\"Made in Seychelles\"");
  });

  it("runs a slow controlled mobile letter reveal before all supporting elements", () => {
    expect(sharedHeroSource).toContain('query<HTMLElement>(".hbe-title-letter")');
    expect(sharedHeroSource).toContain('filter: "blur(10px)"');
    expect(sharedHeroSource).toContain('filter: "blur(0px)"');
    expect(sharedHeroSource).toContain('ease: "power2.out"');
    expect(sharedHeroSource).toMatch(/setPhase\("headline-reveal"\)[\s\S]*\.to\(letters[\s\S]*setPhase\("support"\)/);
    expect(sharedHeroSource).not.toContain("elevatedTitleScale");
    expect(sharedHeroSource).not.toContain("data-hbe-headline-slot");
  });

  it("builds the SVG without browser chrome", () => {
    expect(websiteBuildStorySource).not.toContain('className="story-browser"');
    expect(websiteBuildStorySource).toContain('query(".story-wireframe .story-trace")');
    expect(websiteBuildStorySource).toContain('className="story-wireframe-block story-trace"');
  });

  it("keeps desktop static and mobile motion-only at the 768px boundary", () => {
    expect(sharedHeroSource).toContain('(prefers-reduced-motion: no-preference) and (min-width: 768px)');
    expect(sharedHeroSource).toContain('(prefers-reduced-motion: no-preference) and (max-width: 767px)');
    expect(HERO_BUILD_EXTRACTION_POLICIES.desktop.stages).toEqual([{ id: "screen-build", start: 0, duration: 0 }]);
    expect(HERO_BUILD_EXTRACTION_POLICIES.mobile.stages.some(({ id }) => id === "screen-build")).toBe(false);
  });

  it("preserves exact production copy, links, ReactNode icons and callbacks", () => {
    expect(homeSource).toContain('lines: ["Your Web Designer of Choice in Seychelles"]');
    expect(homeSource).toContain('subtitle="Built with you, in Seychelles — made custom for your business, not a template."');
    expect(homeSource).toContain('text: "Made for your business"');
    expect(homeSource).toContain('icon: <InteractiveSvgIcon kind="devices"');
    expect(homeSource).toContain("text: siteConfig.primaryCtaLabel");
    expect(homeSource).toContain('onClick: () => trackCta("hero_book_call")');
    expect(homeSource).toContain('onClick: () => trackCta("hero_see_work")');
  });

  it("adapts the production hero without the old competing narrative", () => {
    expect(productionAdapterSource).toContain('import { BuildExtractionHero } from "./BuildExtractionHero"');
    expect(productionAdapterSource).toContain("websiteBuildStory");
    expect(productionAdapterSource).not.toContain("HeroFlowField");
    expect(productionAdapterSource).not.toContain("WebsiteBuildStory");
  });

  it("renders one title and one copy of each production action", () => {
    const html = renderToStaticMarkup(createElement(MemoryRouter, null, createElement(Hero, {
      websiteBuildStory: true,
      headline: { lines: ["Your Web Designer of Choice in Seychelles"] },
      subtitle: "Built with you, in Seychelles — made custom for your business, not a template.",
      buttons: {
        primary: { text: "Request a free consult", link: "/contact" },
        secondary: { text: "See our work", link: "/work" },
      },
    })));
    expect(html.match(/<h1\b/g)).toHaveLength(1);
    expect(html).toContain('class="motion-headline-accessible"');
    expect(html).toContain('class="hbe-title-visual" aria-hidden="true"');
    expect(html).toContain('href="/contact"');
    expect(html).toContain('href="/work"');
  });

  it("keeps Home and preview viewport ownership distinct", () => {
    expect(sharedHeroStyles).toMatch(/\.hbe-context-home\s*\{[\s\S]*min-height:\s*100svh/);
    expect(sharedHeroStyles).toMatch(/\.hbe-context-preview\s*\{[\s\S]*min-height:\s*calc\(100svh - var\(--header-height/);
    expect(sharedHeroStyles).not.toMatch(/will-change\s*:/);
  });
});

describe("hero responsive timing policy", () => {
  it.each(["desktop", "mobile"] as const)("keeps the %s stages ordered, unique and bounded", (mode) => {
    const policy = HERO_BUILD_EXTRACTION_POLICIES[mode];
    const ids = policy.stages.map((stage) => stage.id);
    const starts = policy.stages.map((stage) => stage.start);
    expect(ids).toEqual(mode === "desktop" ? DESKTOP_ORDER : MOBILE_ORDER);
    expect(new Set(ids).size).toBe(ids.length);
    expect(starts.every((start, index) => index === 0 || start > starts[index - 1])).toBe(true);
    expect(policy.totalDuration).toBeLessThanOrEqual(5.5);
  });

  it("finishes every letter before support begins", () => {
    const [headline, support] = HERO_BUILD_EXTRACTION_POLICIES.mobile.stages;
    expect(headline.id).toBe("headline-reveal");
    expect(headline.duration).toBeGreaterThanOrEqual(2.55);
    expect(headline.duration).toBeLessThanOrEqual(2.7);
    expect(support.start).toBeGreaterThanOrEqual(headline.start + headline.duration);
    expect(support.duration).toBeGreaterThanOrEqual(0.7);
    expect(support.duration).toBeLessThanOrEqual(0.8);
  });

  it("settles mobile without a build SVG and shows an immediate reduced-motion final state", () => {
    expect(HERO_BUILD_EXTRACTION_POLICIES.mobile.finalState).toEqual({
      copyPosition: "mobile-top",
      device: "absent",
      supportVisible: true,
    });
    expect(getHeroBuildExtractionComposition({ viewportWidth: 767, reducedMotion: false })).toMatchObject({ mode: "mobile", animate: true });
    expect(getHeroBuildExtractionComposition({ viewportWidth: 768, reducedMotion: false })).toMatchObject({ mode: "desktop", animate: false });
    const reduced = getHeroBuildExtractionComposition({ viewportWidth: 390, reducedMotion: true });
    expect(reduced).toMatchObject({ mode: "mobile", animate: false, totalDuration: 0 });
    expect(reduced.stages).toEqual([]);
  });
});

describe("HeroBuildExtractionStory decorative contract", () => {
  it("contains one direct decorative SVG and no baked copy or duplicate IDs", () => {
    const html = renderToStaticMarkup(createElement("div", null, createElement(HeroBuildExtractionStory), createElement(HeroBuildExtractionStory)));
    expect(html).toContain('aria-hidden="true"');
    expect(html).not.toContain("Your Web Designer of Choice in Seychelles");
    const ids = Array.from(html.matchAll(/ id="([^"]+)"/g), (match) => match[1]);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
