import { describe, expect, it } from "vitest";
import { interactiveSvgIconData, requiredInteractiveIconKinds } from "./interactiveSvgIconData";

describe("interactive SVG icon data", () => {
  it("defines every required icon", () => {
    requiredInteractiveIconKinds.forEach((kind) => {
      expect(interactiveSvgIconData[kind]).toBeDefined();
    });
  });

  it("gives every icon a viewBox and at least one path", () => {
    Object.values(interactiveSvgIconData).forEach((icon) => {
      expect(icon.viewBox).toMatch(/^0 0 \d+ \d+$/);
      expect(icon.paths.length).toBeGreaterThan(0);
      icon.paths.forEach((path) => expect(path.trim().length).toBeGreaterThan(2));
    });
  });

  it("does not reuse a complete path signature between icon kinds", () => {
    const signatures = Object.values(interactiveSvgIconData).map((icon) => icon.paths.join("|"));
    expect(new Set(signatures).size).toBe(signatures.length);
  });
});
