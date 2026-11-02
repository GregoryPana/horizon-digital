import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const styles = readFileSync(new URL("../index.css", import.meta.url), "utf8");

describe("homepage neutral premium prototype", () => {
  // Retired Home-only integration: docs/release-evidence/retired-homepage-assertions.md.
  // Replacement: editorialHome.reconciliation.test.ts (content/route) and editorial runtime tests.

  it("uses ink and paper foundations while retaining brand signals", () => {
    expect(styles).toContain("--home-neutral-ink: #000000");
    expect(styles).toContain("--home-neutral-paper: #fafaf8");
    expect(styles).toMatch(/\.home-neutral-prototype \.section-light\s*\{[\s\S]*background:\s*var\(--home-neutral-paper\)/);
    expect(styles).toMatch(/\.home-neutral-prototype \.section-lagoon,[\s\S]*background:\s*transparent/);
    expect(styles).toMatch(/\.home-neutral-prototype \.featured-package\s*\{[\s\S]*--accent:\s*#58d5e3/);
  });

  // Retired Home-only integration: docs/release-evidence/retired-homepage-assertions.md.
  // Replacement: editorialHome.reconciliation.test.ts (content/route) and editorial runtime tests.
});
