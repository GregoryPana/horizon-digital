import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const floating = readFileSync(new URL("./FloatingCarousel.tsx", import.meta.url), "utf8");
const autoTabs = readFileSync(new URL("./useViewportAutoTabs.ts", import.meta.url), "utf8");
const showcase = readFileSync(new URL("./ServicesFamilyShowcase.tsx", import.meta.url), "utf8");
const stories = readFileSync(new URL("./ServiceVisualStories.tsx", import.meta.url), "utf8");
const home = readFileSync(new URL("../../pages/Home.tsx", import.meta.url), "utf8");
const services = readFileSync(new URL("../../pages/Services.tsx", import.meta.url), "utf8");
const webDesign = readFileSync(new URL("../../pages/WebDesignSeychelles.tsx", import.meta.url), "utf8");
const pillar = readFileSync(new URL("../../pages/ServicePillarPage.tsx", import.meta.url), "utf8");
const pricing = readFileSync(new URL("../../pages/Pricing.tsx", import.meta.url), "utf8");
const heroStyles = readFileSync(new URL("./heroBuildExtraction.css", import.meta.url), "utf8");
const serviceStyles = readFileSync(new URL("../../pages/ServicePages.css", import.meta.url), "utf8");
const globalStyles = readFileSync(new URL("../../index.css", import.meta.url), "utf8");
const facts = readFileSync(new URL("../../data/businessFacts.json", import.meta.url), "utf8");
const factData = JSON.parse(facts);

describe("mobile service tabs and final performance refinement", () => {
  it("uses named service tabs on both routes without decorative category numbering", () => {
    expect(home).toContain('tabs={["Website", "SEO", "Analytics"]}');
    expect(floating).toContain("floating-carousel-tabs");
    expect(showcase).toContain("services-family-showcase-tabs");
    expect(showcase).not.toContain("services-family-showcase-step-number");
    expect(showcase).not.toContain("padStart");
    expect(globalStyles).toMatch(/@media \(max-width:\s*767px\)[\s\S]*\.services-floating-carousel \.floating-carousel-tabs\s*\{[^}]*display:\s*grid/);
    expect(serviceStyles).toMatch(/@media \(max-width:\s*767px\)[\s\S]*\.services-family-showcase-tabs\s*\{[^}]*display:\s*grid/);
  });

  it("autoplays only an untouched visible mobile selector and stops after direct input", () => {
    expect(autoTabs).toContain("IntersectionObserver");
    expect(autoTabs).toContain("visibilitychange");
    expect(autoTabs).toContain("prefers-reduced-motion");
    expect(autoTabs).toContain("(max-width: 767px)");
    expect(autoTabs).toContain("userInteractedRef");
    expect(autoTabs).toContain("setInterval");
    expect(autoTabs).toContain("onPointerDown");
    expect(autoTabs).toContain("onPointerUp");
    expect(floating).toContain("useViewportAutoTabs");
    expect(showcase).toContain("useViewportAutoTabs");
  });

  it("keeps mobile visuals compact and swipeable", () => {
    expect(floating).toContain("onPointerDown={markUserInteraction}");
    expect(globalStyles).toContain("scroll-snap-type: x mandatory");
    expect(showcase).toContain("swipeHandlers");
    expect(globalStyles).toMatch(/@media \(max-width:\s*767px\)[\s\S]*\.services-floating-carousel \.service-story\s*\{[^}]*aspect-ratio:\s*16\s*\/\s*9/);
    expect(serviceStyles).toMatch(/@media \(max-width:\s*767px\)[\s\S]*\.services-family-showcase-visual\s*\{[^}]*min-height:\s*min\(70vw,\s*280px\)/);
  });

  it("keeps service story loops limited to active, visible panels and browser state", () => {
    expect(stories).toContain("document.visibilityState");
    expect(stories).toContain("visibilitychange");
    expect(stories).toContain('rootMargin: "0px"');
    expect(globalStyles).toMatch(/floating-carousel-panel:not\(\[data-active="true"\]\)[\s\S]*\.story-stage\s*\{[^}]*animation:\s*none/);
  });

  it("restores every hero signal and adds deliberate CTA clearance on short mobile screens", () => {
    expect(heroStyles).not.toMatch(/max-height:\s*740px[\s\S]*\.hbe-trust-list\s*\{[^}]*display:\s*none/);
    expect(heroStyles).toMatch(/@media \(max-width:\s*767px\)[\s\S]*\.hbe-actions\s*\{[^}]*margin-top:\s*24px/);
    expect(heroStyles).toMatch(/max-height:\s*740px[\s\S]*\.hbe-trust-list\s*\{[^}]*display:\s*flex/);
  });

  it("removes generic item numbers and the rejected results-guarantee boundary", () => {
    expect(home).not.toContain("{item.number}");
    expect(home).not.toContain("key={item.number}");
    expect(services).not.toContain("{item.index}");
    expect(factData.servicePages.hub.routePrompts.items.every((item: object) => !("index" in item))).toBe(true);
    expect(webDesign).not.toContain("startingPoints.items.map((item, index)");
    expect(webDesign).not.toContain("packageFit.fits.map((fit, index)");
    expect(webDesign).not.toContain("afterLaunch.items.map((item, index)");
    expect(pillar).not.toContain("section.items.map((item, itemIndex)");
    expect(pricing).not.toContain("addOnItems.map((item, index)");
    expect(factData.servicePages.hub.primaryBoundaryIds).not.toContain("no-results-guarantees");
  });

  it("removes superseded service-family selectors and dead global keyframes", () => {
    expect(serviceStyles).not.toContain(".service-family-layout");
    expect(serviceStyles).not.toContain(".service-family[data-featured");
    expect(globalStyles).not.toContain("@keyframes pricing-glow-strong-dark");
    expect(globalStyles).not.toContain("@keyframes subtle-pulse");
    expect(globalStyles).not.toContain("@keyframes hero-scroll");
  });
});
