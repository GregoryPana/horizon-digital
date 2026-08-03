import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const componentUrl = new URL("./ElegantDarkPattern.tsx", import.meta.url);
const heroSource = readFileSync(new URL("./BuildExtractionHero.tsx", import.meta.url), "utf8");
const heroStyles = readFileSync(new URL("./heroBuildExtraction.css", import.meta.url), "utf8");

describe("ElegantDarkPattern", () => {
  it("exists in the established components/ui path and is mounted in the hero", () => {
    expect(existsSync(componentUrl)).toBe(true);
    expect(heroSource).toContain('import { ElegantDarkPattern } from "./ElegantDarkPattern"');
    expect(heroSource).toContain('<ElegantDarkPattern className="hbe-dark-pattern" />');
  });

  it("adapts the supplied dark radial foundation and cyan skewed streaks without a remote texture", () => {
    expect(heroStyles).toContain(".elegant-dark-pattern");
    expect(heroStyles).toMatch(/radial-gradient\(100% 100% at 0% 0%/);
    expect(heroStyles).toContain("rgb(46, 46, 46)");
    expect(heroStyles).toContain("skewX(45deg)");
    expect(heroStyles).toContain(".elegant-dark-pattern__dots");
    expect(heroStyles).not.toContain("framerusercontent.com");
  });

  it("is decorative, pointer-inert and motion-safe", () => {
    expect(heroStyles).toMatch(/\.elegant-dark-pattern\s*\{[\s\S]*pointer-events:\s*none/);
    expect(heroStyles).toMatch(/prefers-reduced-motion:\s*reduce[\s\S]*\.elegant-dark-pattern__streaks[\s\S]*animation:\s*none/);
  });
});
