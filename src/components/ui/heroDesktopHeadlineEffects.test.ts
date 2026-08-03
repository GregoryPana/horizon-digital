import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { HERO_DESKTOP_HEADLINE_EFFECT } from "./heroBuildExtraction";

const hero = readFileSync(new URL("./BuildExtractionHero.tsx", import.meta.url), "utf8");
const styles = readFileSync(new URL("./heroBuildExtraction.css", import.meta.url), "utf8");
const shine = readFileSync(new URL("./characterShine.ts", import.meta.url), "utf8");


describe("adapted desktop hero headline effects", () => {
  it("uses the existing GSAP system for a finite word-level reveal", () => {
    expect(hero).toContain("buildDesktopHeadlineTimeline");
    expect(hero).toContain('query<HTMLElement>(".hbe-title-word")');
    expect(hero).toContain('filter: "blur(14px)"');
    expect(hero).toContain("rotationX: 12");
    expect(hero).toContain("HERO_DESKTOP_HEADLINE_EFFECT.wordStagger");
    expect(hero).not.toContain("repeat: -1");
  });

  it("adapts shimmer into a recurring character-level cyan-white pass", () => {
    expect(hero).toContain('query<HTMLElement>(".hbe-title-letter")');
    expect(hero).toContain("createCharacterShineTimeline");
    expect(shine).toContain("repeat: -1");
    expect(shine).toContain('shineColor: "#aef8f2"');
    expect(shine).toContain("repeatDelay");
    expect(hero).not.toContain("backgroundPositionX");
    expect(styles).not.toContain("background-clip: text");
    expect(HERO_DESKTOP_HEADLINE_EFFECT.shineDuration).toBeGreaterThanOrEqual(0.3);
    expect(HERO_DESKTOP_HEADLINE_EFFECT.shineRepeatDelay).toBeGreaterThanOrEqual(4);
    expect(HERO_DESKTOP_HEADLINE_EFFECT.totalDuration).toBeLessThanOrEqual(2.6);
  });

  it("hands motion from the headline to both device stories instead of competing", () => {
    expect(HERO_DESKTOP_HEADLINE_EFFECT.desktopStoryStart).toBeGreaterThanOrEqual(HERO_DESKTOP_HEADLINE_EFFECT.totalDuration);
    expect(HERO_DESKTOP_HEADLINE_EFFECT.mobileStoryStart).toBeGreaterThan(HERO_DESKTOP_HEADLINE_EFFECT.desktopStoryStart);
    expect(hero).toContain("startDelay={HERO_DESKTOP_HEADLINE_EFFECT.desktopStoryStart}");
    expect(hero).toContain("startDelay={HERO_DESKTOP_HEADLINE_EFFECT.mobileStoryStart}");
  });

  it("keeps mobile unchanged and reduced motion immediately readable", () => {
    expect(hero).toContain('(prefers-reduced-motion: no-preference) and (min-width: 768px)');
    expect(hero).toContain('(prefers-reduced-motion: no-preference) and (max-width: 767px)');
    expect(hero).toContain('mm.add("(prefers-reduced-motion: reduce)", setFinal)');
    expect(hero.match(/<h1\b/g)).toHaveLength(1);
  });

  it("reuses GSAP rather than importing either supplied Motion implementation", () => {
    expect(hero).toContain('import gsap from "gsap"');
    expect(hero).not.toContain("framer-motion");
    expect(hero).not.toContain('from "motion/react"');
  });
});
