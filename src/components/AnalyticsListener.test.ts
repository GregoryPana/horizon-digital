import { describe, expect, it } from "vitest";
import { getAnalyticsPageTitle, shouldTrackPageView } from "./AnalyticsListener";

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

describe("getAnalyticsPageTitle", () => {
  it("uses governed route metadata instead of a stale document title", () => {
    expect(getAnalyticsPageTitle("/")).toBe("Custom Website Design Seychelles | Horizon Digital");
    expect(getAnalyticsPageTitle("/pricing")).toBe("Custom Website Packages & Pricing in Seychelles | Horizon Digital");
  });

  it("resolves legacy redirects to the destination title", () => {
    expect(getAnalyticsPageTitle("/services-pricing")).toBe("Custom Website Packages & Pricing in Seychelles | Horizon Digital");
  });

  it("uses article-specific, insight-not-found and generic not-found metadata", () => {
    expect(getAnalyticsPageTitle("/insights/ai-small-business-seychelles")).toBe("What AI Means for Small Businesses in Seychelles | Horizon Digital");
    expect(getAnalyticsPageTitle("/insights/missing-article")).toBe("Insight Not Found | Horizon Digital");
    expect(getAnalyticsPageTitle("/missing")).toBe("Page Not Found | Horizon Digital");
  });
});
