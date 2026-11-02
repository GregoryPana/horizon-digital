import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { HERO_DESKTOP_HEADLINE_EFFECT } from "./heroBuildExtraction";

import { HERO_LINE_REVEAL } from "./heroLineReveal";
const lineMotion = readFileSync(new URL("./heroLineReveal.ts", import.meta.url), "utf8");
const hero = readFileSync(new URL("./BuildExtractionHero.tsx", import.meta.url), "utf8");

describe("rendered-line homepage headline on every viewport", () => {
  it("uses one finite opacity/blur line sequence without per-letter DOM or shine", () => {
    expect(lineMotion).toContain("word.getBoundingClientRect().top");
    expect(lineMotion).toContain("HERO_LINE_REVEAL.duration + HERO_LINE_REVEAL.gap");
    expect(lineMotion).toContain("autoAlpha: 1");
    expect(lineMotion).toContain('filter: "blur(0px)"');
    expect(hero).not.toContain("hbe-title-letter");
    expect(hero).not.toContain("createCharacterShineTimeline");
    expect(hero).not.toContain("rotationX");
    expect(hero).not.toContain("repeat: -1");
  });

  it.each([1, 3, 4, 7])("finishes each of %i lines before the next begins", (count) => {
    const starts = Array.from({length: count}, (_,i) => HERO_LINE_REVEAL.start + i * (HERO_LINE_REVEAL.duration + HERO_LINE_REVEAL.gap));
    starts.slice(1).forEach((start,i) => expect(start).toBeGreaterThan(starts[i] + HERO_LINE_REVEAL.duration));
  });

  it("fully hides waiting lines and never overlaps adjacent line reveals", () => {
    expect(lineMotion).toContain("autoAlpha: 0");
    expect(HERO_LINE_REVEAL.gap).toBeGreaterThan(0);
    expect(lineMotion).toContain("document.fonts.ready");
    expect(lineMotion).toContain("layout(false)");
  });

  it("starts both representations independently before the headline completes", () => {
    expect(HERO_DESKTOP_HEADLINE_EFFECT.desktopStoryStart).toBe(0);
    expect(HERO_DESKTOP_HEADLINE_EFFECT.mobileStoryStart).toBe(0);
    expect(hero).toContain("startDelay={HERO_DESKTOP_HEADLINE_EFFECT.desktopStoryStart}");
    expect(hero).toContain("startDelay={HERO_DESKTOP_HEADLINE_EFFECT.mobileStoryStart}");
  });

  it("uses the same line treatment in both branches and static reduced motion", () => {
    expect(hero).toContain("enhanceHeroLines(rootRef.current)");
    expect(lineMotion).toContain("ResizeObserver");
    expect(lineMotion).toContain("!animate || media.matches");
    expect(hero.match(/<h1\b/g)).toHaveLength(1);
  });

  it("reuses existing GSAP without installing another motion system", () => {
    expect(hero).toContain('import gsap from "gsap"');
    expect(hero).not.toContain("framer-motion");
    expect(hero).not.toContain('from "motion/react"');
    expect(HERO_LINE_REVEAL.blur).toBeLessThanOrEqual(6);
  });
});
