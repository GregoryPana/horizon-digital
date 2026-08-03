import { describe, expect, it } from "vitest";
import { clampCarouselIndex } from "./FloatingCarousel";

describe("FloatingCarousel", () => {
  it("keeps navigation within the available items", () => {
    expect(clampCarouselIndex(-1, 3)).toBe(0);
    expect(clampCarouselIndex(1, 3)).toBe(1);
    expect(clampCarouselIndex(4, 3)).toBe(2);
  });

  it("handles an empty carousel defensively", () => {
    expect(clampCarouselIndex(2, 0)).toBe(0);
  });
});
