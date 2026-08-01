import { describe, expect, it } from "vitest";
import {
  DEFAULT_WEBSITE_COMPARISON_STATE,
  WEBSITE_COMPARISON_STATES,
  selectWebsiteComparisonState,
} from "./websiteComparisonState";

describe("website comparison state policy", () => {
  it("defaults to the honest starting point and exposes both manual states", () => {
    expect(DEFAULT_WEBSITE_COMPARISON_STATE).toBe("starting-point");
    expect(WEBSITE_COMPARISON_STATES).toEqual([
      "starting-point",
      "horizon-outcome",
    ]);
  });

  it("makes either state directly reachable by a button selection", () => {
    expect(selectWebsiteComparisonState("horizon-outcome")).toBe(
      "horizon-outcome",
    );
    expect(selectWebsiteComparisonState("starting-point")).toBe(
      "starting-point",
    );
  });
});
