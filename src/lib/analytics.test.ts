import { afterEach, describe, expect, it, vi } from "vitest";
import { trackContactIntent, trackEvent, trackPageView } from "./analytics";

describe("analytics helpers", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("sends SPA page views with the hydrated route identity", () => {
    const gtag = vi.fn();
    vi.stubGlobal("window", { gtag });

    trackPageView({
      page_title: "Contact | Horizon Digital",
      page_location: "https://horizondigitalsey.com/contact",
      page_path: "/contact",
    });

    expect(gtag).toHaveBeenCalledWith("event", "page_view", {
      page_title: "Contact | Horizon Digital",
      page_location: "https://horizondigitalsey.com/contact",
      page_path: "/contact",
    });
  });

  it("normalizes contact intent without sending contact details", () => {
    const gtag = vi.fn();
    vi.stubGlobal("window", { gtag, location: { pathname: "/contact" } });

    trackContactIntent({ method: "whatsapp", source: "footer" });

    expect(gtag).toHaveBeenCalledWith("event", "contact_intent", {
      method: "whatsapp",
      source: "footer",
      page_path: "/contact",
      transport_type: "beacon",
    });
  });

  it("fails quietly when analytics is unavailable", () => {
    vi.stubGlobal("window", {});
    expect(() => trackEvent("cta_click", { cta_name: "example" })).not.toThrow();
  });
});
