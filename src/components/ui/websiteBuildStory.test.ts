import { describe, expect, it } from "vitest";
import {
  WEBSITE_BUILD_ACTIVE_DURATION,
  WEBSITE_BUILD_STAGES,
  shouldAnimateWebsiteBuildStory,
} from "./websiteBuildStory";

describe("website build story configuration", () => {
  it("uses the approved website lifecycle order", () => {
    expect(WEBSITE_BUILD_STAGES.map((stage) => stage.id)).toEqual([
      "plan",
      "design",
      "build",
      "test",
      "launch",
    ]);
  });

  it("uses increasing, non-overlapping stage starts", () => {
    WEBSITE_BUILD_STAGES.slice(1).forEach((stage, index) => {
      const previous = WEBSITE_BUILD_STAGES[index];
      expect(stage.start).toBeGreaterThanOrEqual(previous.start + previous.duration);
    });
  });

  it("uses short unique labels", () => {
    const labels = WEBSITE_BUILD_STAGES.map((stage) => stage.label);
    expect(new Set(labels).size).toBe(labels.length);
    labels.forEach((label) => expect(label.length).toBeLessThanOrEqual(6));
  });

  it("keeps the active story between twelve and sixteen seconds", () => {
    expect(WEBSITE_BUILD_ACTIVE_DURATION).toBeGreaterThanOrEqual(12);
    expect(WEBSITE_BUILD_ACTIVE_DURATION).toBeLessThanOrEqual(16);
  });
});

describe("shouldAnimateWebsiteBuildStory", () => {
  it("never animates when the user prefers reduced motion, even in viewport", () => {
    expect(
      shouldAnimateWebsiteBuildStory({ reducedMotion: true, inViewport: true })
    ).toBe(false);
  });

  it("does not animate while off-screen", () => {
    expect(
      shouldAnimateWebsiteBuildStory({ reducedMotion: false, inViewport: false })
    ).toBe(false);
  });

  it("does not animate when both reduced motion and off-screen apply", () => {
    expect(
      shouldAnimateWebsiteBuildStory({ reducedMotion: true, inViewport: false })
    ).toBe(false);
  });

  it("animates only when motion is allowed and the story is in viewport", () => {
    expect(
      shouldAnimateWebsiteBuildStory({ reducedMotion: false, inViewport: true })
    ).toBe(true);
  });
});
