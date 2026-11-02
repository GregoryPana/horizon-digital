import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { editorialHomeHtml as home } from "../components/editorial-home/content";
const styles = readFileSync(new URL("../index.css", import.meta.url), "utf8");

describe("desktop evidence and services refinement", () => {
  it("reduces desktop Work card width without changing the compact mobile contract", () => {
    expect(styles).toMatch(/\.work-marquee-item\s*\{[\s\S]*flex:\s*0 0 clamp\(290px,\s*34vw,\s*480px\)/);
    expect(styles).toMatch(/@media \(max-width:\s*767px\)[\s\S]*width:\s*min\(76vw,\s*360px\)/);
  });

  it("caps oversized desktop Services compositions and gives copy stronger hierarchy", () => {
    expect(styles).toMatch(/@media \(min-width:\s*768px\)[\s\S]*services-floating-carousel \.floating-carousel-panel[\s\S]*width:\s*min\(calc\(100vw - 64px\),\s*1240px\)/);
    expect(styles).toMatch(/@media \(min-width:\s*1024px\)[\s\S]*\.service-carousel-item[\s\S]*grid-template-columns:\s*minmax\(320px,\s*1fr\) minmax\(0,\s*1\.12fr\)/);
    expect(styles).toMatch(/@media \(min-width:\s*1024px\)[\s\S]*\.service-story[\s\S]*max-height:\s*500px/);
    expect(styles).toMatch(/@media \(min-width:\s*1024px\) and \(max-height:\s*800px\)[\s\S]*width:\s*min\(100%,\s*550px\)[\s\S]*max-height:\s*440px/);
    // Editorial Home uses readable service cards, not the retired carousel.
    for (const label of ['Website design', 'Mobile design', 'Website build', 'Search optimisation', 'Analytics']) expect(home).toContain(label);
  });

  // Retired Home-only integration: docs/release-evidence/retired-homepage-assertions.md.
  // Replacement: editorialHome.reconciliation.test.ts (content/route) and editorial runtime tests.
});
