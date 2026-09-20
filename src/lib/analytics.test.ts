// @vitest-environment jsdom

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  ANALYTICS_CONSENT_EVENT,
  GA_MEASUREMENT_ID,
  clearAnalyticsRuntime,
  getAnalyticsConsent,
  initializeAnalytics,
  setAnalyticsConsent,
  shouldInitializeAnalytics,
  trackContactIntent,
  trackEvent,
  trackPageView,
} from "./analytics";

const projectFile = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");
const scriptSelector = `script[src="https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"]`;

describe("consent-first analytics", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
    window.localStorage.clear();
    delete window.gtag;
    delete window.dataLayer;
  });

  afterEach(() => {
    clearAnalyticsRuntime();
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it("treats a missing or malformed preference as unknown", () => {
    expect(getAnalyticsConsent()).toBe("unknown");
    window.localStorage.setItem("horizon.analytics.consent.v1", "not-json");
    expect(getAnalyticsConsent()).toBe("unknown");
  });

  it("initializes only for production with affirmative consent", () => {
    expect(shouldInitializeAnalytics(true, "unknown")).toBe(false);
    expect(shouldInitializeAnalytics(true, "denied")).toBe(false);
    expect(shouldInitializeAnalytics(false, "granted")).toBe(false);
    expect(shouldInitializeAnalytics(true, "granted")).toBe(true);
  });

  it("stores a versioned choice and announces it without loading analytics", () => {
    const listener = vi.fn();
    window.addEventListener(ANALYTICS_CONSENT_EVENT, listener);

    setAnalyticsConsent("denied");

    expect(getAnalyticsConsent()).toBe("denied");
    expect(listener).toHaveBeenCalledOnce();
    expect(window.gtag).toBeUndefined();
    expect(window.dataLayer).toBeUndefined();
    expect(document.head.querySelector(scriptSelector)).toBeNull();
    window.removeEventListener(ANALYTICS_CONSENT_EVENT, listener);
  });

  it("does not create a queue, script or event before consent", () => {
    initializeAnalytics(true);
    trackPageView({ page_path: "/contact" }, true);
    trackContactIntent({ method: "whatsapp", source: "footer", pagePath: "/contact" }, true);

    expect(window.gtag).toBeUndefined();
    expect(window.dataLayer).toBeUndefined();
    expect(document.head.querySelector(scriptSelector)).toBeNull();
  });

  it("does not initialize or lazily track outside production even after consent", () => {
    setAnalyticsConsent("granted");
    initializeAnalytics(false);
    trackEvent("page_view", { page_path: "/" }, false);

    expect(window.gtag).toBeUndefined();
    expect(window.dataLayer).toBeUndefined();
    expect(document.head.querySelector(scriptSelector)).toBeNull();
  });

  it("creates the queue and script only after consent is granted", () => {
    setAnalyticsConsent("granted");
    initializeAnalytics(true);

    expect(document.head.querySelector(scriptSelector)).not.toBeNull();
    expect(window.gtag).toBeTypeOf("function");
    expect(window.dataLayer?.map((entry) => Array.from(entry))).toEqual([
      ["consent", "default", {
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      }],
      ["js", expect.any(Date)],
      ["config", GA_MEASUREMENT_ID, {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      }],
    ]);
  });

  it("queues only normalized analytics events after consent", () => {
    setAnalyticsConsent("granted");
    trackPageView({
      page_title: "Contact | Horizon Digital",
      page_location: "https://horizondigitalsey.com/contact",
      page_path: "/contact",
    }, true);
    trackContactIntent({ method: "email", source: "footer", pagePath: "/contact" }, true);

    expect(window.dataLayer?.slice(3).map((entry) => Array.from(entry))).toEqual([
      ["event", "page_view", {
        page_title: "Contact | Horizon Digital",
        page_location: "https://horizondigitalsey.com/contact",
        page_path: "/contact",
      }],
      ["event", "contact_intent", {
        method: "email",
        cta_location: "footer",
        page_path: "/contact",
        transport_type: "beacon",
      }],
    ]);
  });

  it("prevents reserved source parameters from reaching GA4", () => {
    setAnalyticsConsent("granted");
    trackEvent("custom_action", { source: "legacy_label", page_path: "/" }, true);

    const lastEntry = window.dataLayer?.[(window.dataLayer?.length ?? 1) - 1] ?? [];
    expect(Array.from(lastEntry)).toEqual([
      "event",
      "custom_action",
      { event_source: "legacy_label", page_path: "/" },
    ]);
  });

  it("revocation removes the current analytics runtime and blocks future events", () => {
    setAnalyticsConsent("granted");
    initializeAnalytics(true);
    expect(document.head.querySelector(scriptSelector)).not.toBeNull();

    expect(setAnalyticsConsent("denied")).toBe(true);
    trackEvent("cta_click", { cta_name: "request_consult" }, true);

    expect(getAnalyticsConsent()).toBe("denied");
    expect(document.head.querySelector(scriptSelector)).toBeNull();
    expect(window.gtag).toBeUndefined();
    expect(window.dataLayer).toBeUndefined();
  });

  it("keeps static HTML and the entry point free of a pre-consent GA bootstrap", () => {
    const html = projectFile("index.html");
    const main = projectFile("src/main.tsx");

    expect(html).not.toContain("googletagmanager.com");
    expect(html).not.toContain(GA_MEASUREMENT_ID);
    expect(main).not.toContain("initializeAnalytics");
    expect(main).not.toContain("dataLayer");
  });
});
