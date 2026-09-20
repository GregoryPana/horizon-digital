import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = (relativePath: string) =>
  readFileSync(new URL(relativePath, import.meta.url), "utf8");

const homeHero = source("./BuildExtractionHero.tsx");
const servicesHeadline = source("./ServicesHeroHeadline.tsx");
const homePage = source("../../pages/Home.tsx");
const workMarquee = source("./WorkMarquee.tsx");
const floatingCarousel = source("./FloatingCarousel.tsx");
const globalStyles = source("../../index.css");
const serviceStyles = source("../../pages/ServicePages.css");

describe("design-agnostic critical render and accessibility contract", () => {
  it("keeps redesigned Home and Services headings painted before enhancement motion", () => {
    expect(homeHero).toContain('data-critical-render="immediate"');
    expect(servicesHeadline).toContain('data-critical-render="immediate"');

    expect(homeHero).not.toContain("gsap.set(words, {\n          autoAlpha: 0");
    expect(homeHero).not.toContain("gsap.set(letters, {\n          autoAlpha: 0");
    expect(servicesHeadline).not.toContain(
      "gsap.set(words, { autoAlpha: 0",
    );
  });

  it("keeps desktop depth while removing mobile blur and homepage shine", () => {
    expect(homeHero).toContain('filter: "blur(14px)"');
    expect(homeHero).not.toContain('filter: "blur(10px)"');
    expect(homeHero).toContain("rotationX: 12");
    expect(homeHero).not.toContain("createCharacterShineTimeline");
    expect(servicesHeadline).toContain('filter: "blur(11px)"');
    expect(servicesHeadline).toContain("createCharacterShineTimeline");
  });

  it("renders ordinary semantic hero links before enhancement runs", () => {
    expect(homeHero).toContain("<Link");
    expect(homeHero).toContain('className="hbe-primary-action focus-ring"');
    expect(homeHero).toContain('className="hbe-secondary-action focus-ring"');
    expect(homeHero).not.toMatch(/tabIndex=\{-1\}|inert=/);
  });

  it("keeps the Home Framer runtime route-local and honours reduced motion", () => {
    expect(homePage).toContain('import { MotionConfig } from "framer-motion"');
    expect(homePage).toContain('<MotionConfig reducedMotion="user">');
  });

  it("keeps service journey copy readable in every motion state", () => {
    expect(serviceStyles).toMatch(
      /\.service-journey li\s*\{[^}]*opacity:\s*1[^}]*\}/,
    );
    expect(serviceStyles).not.toMatch(
      /\.service-journey li\s*\{[^}]*opacity:\s*\.4[^}]*\}/,
    );
  });

  it("uses sufficient inactive mobile service-tab contrast", () => {
    expect(globalStyles).toMatch(
      /\.services-floating-carousel \.floating-carousel-tab\s*\{[^}]*color:\s*#587179[^}]*\}/,
    );
  });

  it("uses ARIA-compatible listitem hosts without changing carousel styling", () => {
    expect(workMarquee).toContain('<div\n        className="work-marquee-item"');
    expect(workMarquee).not.toMatch(
      /<article[\s\S]*?className="work-marquee-item"[\s\S]*?role=/,
    );
    expect(floatingCarousel).toContain('<div\n              className="floating-carousel-panel"');
    expect(floatingCarousel).not.toMatch(
      /<article[\s\S]*?className="floating-carousel-panel"[\s\S]*?role="listitem"/,
    );
  });
});
