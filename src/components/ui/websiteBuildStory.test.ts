import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  WEBSITE_BUILD_ACTIVE_DURATION,
  WEBSITE_BUILD_STAGES,
  shouldAnimateWebsiteBuildStory,
} from "./websiteBuildStory";

describe("website build story configuration", () => {
  it("does not animate the removed finished-page target", () => {
    const source = readFileSync(resolve(process.cwd(), "src/components/ui/WebsiteBuildStory.tsx"), "utf8");
    expect(source).not.toContain('query(".story-finished-page")');
  });

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
      shouldAnimateWebsiteBuildStory({ reducedMotion: true, inViewport: true, mobile: false })
    ).toBe(false);
  });

  it("does not animate while off-screen", () => {
    expect(
      shouldAnimateWebsiteBuildStory({ reducedMotion: false, inViewport: false, mobile: false })
    ).toBe(false);
  });

  it("does not animate when both reduced motion and off-screen apply", () => {
    expect(
      shouldAnimateWebsiteBuildStory({ reducedMotion: true, inViewport: false, mobile: false })
    ).toBe(false);
  });

  it("animates on desktop/tablet when motion is allowed and the story is in viewport", () => {
    expect(
      shouldAnimateWebsiteBuildStory({ reducedMotion: false, inViewport: true, mobile: false })
    ).toBe(true);
  });

  it("never animates on narrow mobile, even when in viewport and motion is allowed", () => {
    expect(
      shouldAnimateWebsiteBuildStory({ reducedMotion: false, inViewport: true, mobile: true })
    ).toBe(false);
  });

  it("never animates on narrow mobile while off-screen either", () => {
    expect(
      shouldAnimateWebsiteBuildStory({ reducedMotion: false, inViewport: false, mobile: true })
    ).toBe(false);
  });
});
