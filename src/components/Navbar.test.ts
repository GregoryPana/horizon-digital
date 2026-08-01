import { describe, expect, it } from "vitest";
import { getHeaderClassName, getHeaderInnerClassName } from "./Navbar";

describe("getHeaderClassName", () => {
  it("keeps the closed header interactive", () => {
    const className = getHeaderClassName(false, false);
    expect(className).not.toContain("pointer-events-none");
  });

  it("keeps the open header above the overlay without letting its empty box swallow taps", () => {
    const className = getHeaderClassName(false, true);
    expect(className).toContain("pointer-events-none");
    expect(className).toContain("!z-[250]");
  });

  it("never hides or moves the header contents when the compact menu opens", () => {
    const closedClassName = getHeaderInnerClassName(false);
    const openClassName = getHeaderInnerClassName(true);

    expect(openClassName).toBe(closedClassName);
    expect(openClassName).not.toContain("opacity-0");
    expect(openClassName).not.toContain("translate");
    expect(openClassName).not.toContain("pointer-events-none");
  });
});
