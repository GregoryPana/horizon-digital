import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { HERO_BUILD_EXTRACTION_POLICIES } from "./heroBuildExtraction";

const hero = readFileSync(new URL("./BuildExtractionHero.tsx", import.meta.url), "utf8");
const story = readFileSync(new URL("./HeroBuildExtractionStory.tsx", import.meta.url), "utf8");
const websiteStory = readFileSync(new URL("./WebsiteBuildStory.tsx", import.meta.url), "utf8");
const heroStyles = readFileSync(new URL("./heroBuildExtraction.css", import.meta.url), "utf8");
const home = readFileSync(new URL("../../pages/Home.tsx", import.meta.url), "utf8");
const site = readFileSync(new URL("../../data/site.ts", import.meta.url), "utf8");
const globalStyles = readFileSync(new URL("../../index.css", import.meta.url), "utf8");

describe("Phase 3 homepage polish contract", () => {
  it("frames desktop and mobile build stories together in the desktop visual only", () => {
    expect(story).toContain('variant?: "desktop" | "mobile"');
    expect(story).toContain("data-hbe-window={variant}");
    expect(story).toContain("hbe-build-window-toolbar");
    expect(hero).toContain('variant="desktop"');
    expect(hero).toContain('variant="mobile"');
    expect(hero).not.toContain("hbe-mobile-story-slot");
    expect(hero).toContain("hbe-desktop-story-primary");
    expect(hero).toContain("hbe-desktop-story-mobile-preview");
    expect(heroStyles).toMatch(/\.hbe-build-window-desktop\s*\{[\s\S]*width:\s*min\(100%,\s*920px\)[\s\S]*aspect-ratio:\s*1\.42/);
    expect(heroStyles).toContain(".hbe-build-window-mobile");
    expect(heroStyles).toMatch(/@media \(max-width: 1023px\) and \(min-width: 768px\)[\s\S]*\.hbe-build-window-desktop\s*\{[\s\S]*min-height:\s*0/);
    expect(heroStyles).not.toContain(".hbe-phone");
  });

  it("reduces ambient glow, brightens the artwork and lowers the CTA rail", () => {
    expect(heroStyles).toMatch(/\.hbe-desktop-build-story::before\s*\{[\s\S]*background:\s*rgba\(80,\s*211,\s*222,\s*0\.0[5-9]\)/);
    expect(heroStyles).toMatch(/\.hbe-desktop-build-story \.website-build-story svg\s*\{[\s\S]*brightness\(1\.4[0-9]\)/);
    expect(heroStyles).toMatch(/\.hbe-visual-column \.hbe-actions\s*\{[^}]*margin-top:\s*var\(--hbe-story-action-gap\)/);
  });

  it("runs the phone-free mobile headline faster before support", () => {
    const [headline, support] = HERO_BUILD_EXTRACTION_POLICIES.mobile.stages;
    expect(headline.duration).toBeGreaterThanOrEqual(2.55);
    expect(headline.duration).toBeLessThanOrEqual(2.7);
    expect(support.start).toBeGreaterThanOrEqual(headline.start + headline.duration);
    expect(websiteStory).toContain("startDelay = 0.12");
    expect(hero).not.toContain("startDelay={supportStage.start}");
    expect(HERO_BUILD_EXTRACTION_POLICIES.mobile.finalState.device).toBe("absent");
  });

  it("makes only desktop Work cards another step smaller", () => {
    expect(globalStyles).toMatch(/\.work-marquee-item\s*\{[\s\S]*flex:\s*0 0 clamp\(290px,\s*34vw,\s*480px\)/);
    expect(globalStyles).toMatch(/@media \(max-width:\s*767px\)[\s\S]*width:\s*min\(76vw,\s*360px\)/);
  });

  it("uses generic internal client proof and a non-price local trust signal", () => {
    expect(site).toContain('value: "Live client project"');
    expect(site).toContain('href: "/work"');
    expect(site).toContain('label: "Seychelles-based studio"');
    expect(site).toContain('value: "Mahé, Seychelles"');
    expect(home).toContain('"live", "local", "process", "support"');
    expect(home).toContain('data-proof-visual="local"');
    expect(home).not.toContain("home-trust-price-ticket");
  });
});
