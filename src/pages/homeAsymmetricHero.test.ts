import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const heroSource = readFileSync(new URL("../components/ui/BuildExtractionHero.tsx", import.meta.url), "utf8");
const heroStyles = readFileSync(new URL("../components/ui/heroBuildExtraction.css", import.meta.url), "utf8");
const globalStyles = readFileSync(new URL("../index.css", import.meta.url), "utf8");

describe("homepage asymmetric hero and continuous atmosphere", () => {
  it("uses viewport-wide desktop geometry and a substantially larger homepage title", () => {
    expect(heroStyles).toMatch(/\.hbe-context-home \.hbe-preview-shell\s*\{[\s\S]*width:\s*100%/);
    expect(heroStyles).toContain("padding-inline: clamp(24px, 2.25vw, 44px)");
    expect(heroStyles).toMatch(/\.hbe-context-home \.hbe-title\s*\{[\s\S]*font-size:\s*clamp\(3\.55rem,\s*min\(6\.4vw,\s*11vh\),\s*7\.4rem\)/);
  });

  it("places the desktop action rail below the right-side SVG rather than inside the left copy column", () => {
    expect(heroSource).toContain('className="hbe-visual-column"');
    const visualColumn = heroSource.indexOf('className="hbe-visual-column"');
    const story = heroSource.indexOf("<HeroBuildExtractionStory", visualColumn);
    const actions = heroSource.indexOf('className="hbe-actions"', visualColumn);
    expect(visualColumn).toBeGreaterThan(-1);
    expect(story).toBeGreaterThan(visualColumn);
    expect(actions).toBeGreaterThan(story);
    expect(heroStyles).toMatch(/@media \(min-width:\s*768px\)[\s\S]*\.hbe-copy-column\s*\{[\s\S]*align-self:\s*end/);
  });

  it("makes the direct desktop website-build story a prominent high-contrast visual", () => {
    expect(heroStyles).toMatch(/\.hbe-desktop-build-story \.website-build-story\s*\{[\s\S]*opacity:\s*1/);
    expect(heroStyles).toMatch(/\.hbe-desktop-build-story \.website-build-story svg\s*\{[\s\S]*brightness\(1\.48\)[\s\S]*drop-shadow/);
  });

  it("uses one tighter section rhythm token", () => {
    expect(globalStyles).toMatch(/\.section-space\s*\{[\s\S]*padding-block:\s*clamp\(4\.25rem,\s*7vw,\s*7rem\)/);
  });

  it("runs one persistent atmosphere behind every dark homepage section while paper sections stay opaque", () => {
    expect(globalStyles).toMatch(/\.home-neutral-prototype::before\s*\{[\s\S]*position:\s*fixed/);
    expect(globalStyles).toContain("@keyframes home-continuous-atmosphere");
    expect(globalStyles).toMatch(/\.home-neutral-prototype \.trust-ribbon\s*\{[\s\S]*background:\s*transparent/);
    expect(globalStyles).toMatch(/\.home-neutral-prototype #featured-work\s*\{[\s\S]*background:\s*transparent/);
    expect(globalStyles).toMatch(/\.home-neutral-prototype \.section-light\s*\{[\s\S]*background:\s*var\(--home-neutral-paper\)/);
    expect(globalStyles).toMatch(/prefers-reduced-motion:\s*reduce[\s\S]*\.home-neutral-prototype::before[\s\S]*animation:\s*none/);
  });
});
