import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const homeSource = readFileSync(new URL("./Home.tsx", import.meta.url), "utf8");

describe("homepage desktop pricing density", () => {
  it("uses a compact desktop-only package treatment without removing package content", () => {
    expect(homeSource).toContain("pricing-section home-pricing-compact");
    expect(homeSource).toContain("lg:mt-10");
    expect(homeSource).toContain("lg:pt-6");
    expect(homeSource).toContain("lg:p-6");
    expect(homeSource).toContain("sm:p-9 lg:p-7");
    expect(homeSource).toContain("lg:mt-5 lg:pt-4");
    expect(homeSource).toContain("lg:mt-6");
    expect(homeSource).toContain("pkg.includes.slice(0, featured ? 6 : 4)");
  });
});
