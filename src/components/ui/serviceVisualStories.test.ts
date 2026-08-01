import { describe, expect, it } from "vitest";
import {
  getServiceStoryDelay,
  getServiceStoryDuration,
  SERVICE_STORY_STAGES,
} from "./serviceVisualStories";

describe("service visual story timing", () => {
  it.each(Object.entries(SERVICE_STORY_STAGES))(
    "%s has unique labels, increasing starts and bounded timing",
    (kind, stages) => {
      expect(new Set(stages.map((stage) => stage.id)).size).toBe(stages.length);
      expect(new Set(stages.map((stage) => stage.label)).size).toBe(stages.length);
      expect(stages[0]?.start).toBe(0);
      for (let index = 1; index < stages.length; index += 1) {
        expect(stages[index]!.start).toBeGreaterThan(stages[index - 1]!.start);
      }
      expect(getServiceStoryDuration(kind as keyof typeof SERVICE_STORY_STAGES)).toBeLessThanOrEqual(5);
    },
  );

  it("keeps the approved narrative boundaries explicit", () => {
    expect(SERVICE_STORY_STAGES.seo.map((stage) => stage.label)).toEqual([
      "Crawl",
      "Page checks",
      "Priorities",
      "Review or scoped implementation",
    ]);
    expect(SERVICE_STORY_STAGES.analytics.map((stage) => stage.label)).toEqual([
      "Interaction",
      "Consent",
      "Measurement",
      "Verification",
      "Simple activity",
    ]);
    expect(getServiceStoryDelay("atelier", "responsive")).toBe(2.9);
  });
});
