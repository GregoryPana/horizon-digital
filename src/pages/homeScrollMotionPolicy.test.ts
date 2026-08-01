import { describe, expect, it } from "vitest";
import { HOME_SCROLL_PRELOAD_MARGIN, shouldLoadHomeScrollMotion } from "./homeScrollMotionPolicy";

const viewportHeight = 800;

function shouldLoad(sectionTop: number): boolean {
  return shouldLoadHomeScrollMotion({
    sectionTop,
    viewportHeight,
    preloadMargin: HOME_SCROLL_PRELOAD_MARGIN,
  });
}

describe("shouldLoadHomeScrollMotion", () => {
  it("loads when the sentinel is intersecting or near the viewport", () => {
    expect(shouldLoad(700)).toBe(true);
    expect(shouldLoad(viewportHeight + HOME_SCROLL_PRELOAD_MARGIN - 1)).toBe(true);
  });

  it("does not load while the sentinel remains genuinely far below", () => {
    expect(shouldLoad(viewportHeight + HOME_SCROLL_PRELOAD_MARGIN + 1)).toBe(false);
    expect(shouldLoad(10_000)).toBe(false);
  });

  it("loads when the sentinel has already passed far above the viewport", () => {
    expect(shouldLoad(-10_000)).toBe(true);
  });

  it("loads at the exact preload boundary", () => {
    expect(shouldLoad(viewportHeight + HOME_SCROLL_PRELOAD_MARGIN)).toBe(true);
  });

  it("loads for a restored or hash-style entry below the sentinel", () => {
    const restoredEntrySentinelTop = -1_200;

    expect(shouldLoad(restoredEntrySentinelTop)).toBe(true);
  });
});
