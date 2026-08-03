import { describe, expect, it } from "vitest";
import { shouldTrackPageView } from "./AnalyticsListener";

describe("shouldTrackPageView", () => {
  it("skips DEV-only preview paths during local development", () => {
    expect(shouldTrackPageView("/dev/hero-build-extraction", true)).toBe(false);
    expect(shouldTrackPageView("/dev/hero-build-extraction/", true)).toBe(false);
  });

  it("allows normal routes during local development", () => {
    expect(shouldTrackPageView("/", true)).toBe(true);
    expect(shouldTrackPageView("/work", true)).toBe(true);
  });

  it("allows production /dev paths to retain existing Not Found analytics", () => {
    expect(shouldTrackPageView("/dev/hero-build-extraction", false)).toBe(true);
  });
});