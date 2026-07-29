import { describe, expect, it } from "vitest";
import { getHeaderClassName } from "./Navbar";

describe("getHeaderClassName", () => {
  it("keeps the closed header interactive", () => {
    const className = getHeaderClassName(false, false);
    expect(className).not.toContain("pointer-events-none");
  });

  it("makes the header non-interactive while the compact menu is open", () => {
    // Regression: the header is raised to z-[250] while the menu is open, above the
    // portaled compact menu's z-[200]. Without pointer-events-none, the header's own
    // (invisible) box still intercepts taps meant for the menu's close button, even
    // though the header's inner content is separately hidden and disabled.
    const className = getHeaderClassName(false, true);
    expect(className).toContain("pointer-events-none");
    expect(className).toContain("!z-[250]");
  });
});
