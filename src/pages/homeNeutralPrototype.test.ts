import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const homeSource = readFileSync(new URL("./Home.tsx", import.meta.url), "utf8");
const styles = readFileSync(new URL("../index.css", import.meta.url), "utf8");

describe("homepage neutral premium prototype", () => {
  it("scopes the prototype to the homepage and preserves explicit pricing roles", () => {
    expect(homeSource).toContain('className="site-atmosphere home-neutral-prototype bg-bg text-text"');
    expect(homeSource).toContain("home-pricing-card");
    expect(homeSource).toContain("home-pricing-card-featured");
  });

  it("uses ink and paper foundations while retaining brand signals", () => {
    expect(styles).toContain("--home-neutral-ink: #000000");
    expect(styles).toContain("--home-neutral-paper: #fafaf8");
    expect(styles).toMatch(/\.home-neutral-prototype \.section-light\s*\{[\s\S]*background:\s*var\(--home-neutral-paper\)/);
    expect(styles).toMatch(/\.home-neutral-prototype \.section-lagoon,[\s\S]*background:\s*transparent/);
    expect(styles).toMatch(/\.home-neutral-prototype \.featured-package\s*\{[\s\S]*--accent:\s*#58d5e3/);
  });

  it("neutralises atmospheric blobs instead of removing purposeful brand animation", () => {
    expect(styles).toMatch(/\.home-neutral-prototype \.ambient-blob\s*\{[\s\S]*background:\s*rgba\(255, 255, 255, 0\.08\)/);
    expect(styles).toMatch(/\.home-neutral-prototype \.section-light \.ambient-blob\s*\{[\s\S]*background:\s*rgba\(0, 0, 0, 0\.055\)/);
    expect(homeSource).toContain("websiteBuildStory");
    expect(homeSource).toContain("text-gradient-tropical");
  });
});
