export const GA_MEASUREMENT_ID = "G-Z79X024S87";
const GA_SCRIPT_SRC = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
const ANALYTICS_SCRIPT_ATTRIBUTE = "data-horizon-analytics";
const ANALYTICS_CONSENT_STORAGE_KEY = "horizon.analytics.consent.v1";
export const ANALYTICS_CONSENT_EVENT = "horizon:analytics-consent-change";
export const ANALYTICS_PREFERENCES_OPEN_EVENT = "horizon:analytics-preferences-open";
export const ANALYTICS_CONSENT_VERSION = 1;

export type AnalyticsConsent = "granted" | "denied" | "unknown";

type StoredAnalyticsConsent = {
  version: number;
  choice: Exclude<AnalyticsConsent, "unknown">;
  updatedAt: string;
};

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

function isStoredConsent(value: unknown): value is StoredAnalyticsConsent {
  if (!value || typeof value !== "object") return false;
  const record = value as Partial<StoredAnalyticsConsent>;
  return record.version === ANALYTICS_CONSENT_VERSION
    && (record.choice === "granted" || record.choice === "denied")
    && typeof record.updatedAt === "string";
}

export function getAnalyticsConsent(): AnalyticsConsent {
  try {
    const serialized = window.localStorage?.getItem(ANALYTICS_CONSENT_STORAGE_KEY);
    if (!serialized) return "unknown";
    const parsed: unknown = JSON.parse(serialized);
    return isStoredConsent(parsed) ? parsed.choice : "unknown";
  } catch {
    return "unknown";
  }
}

export function hasAnalyticsConsent(): boolean {
  return getAnalyticsConsent() === "granted";
}

export function shouldInitializeAnalytics(
  isProduction: boolean,
  consent: AnalyticsConsent = getAnalyticsConsent(),
): boolean {
  return isProduction && consent === "granted";
}

function expireAnalyticsCookies(): void {
  const cookieNames = document.cookie
    .split(";")
    .map((cookie) => cookie.trim().split("=")[0])
    .filter((name) => name === "_ga" || name.startsWith("_ga_"));
  for (const name of cookieNames) {
    document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
  }
}

export function clearAnalyticsRuntime(): boolean {
  const hadAnalyticsRuntime = Boolean(window.gtag || window.dataLayer || hasAnalyticsScript());
  window.gtag?.("consent", "update", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  document
    .querySelectorAll<HTMLScriptElement>(`script[${ANALYTICS_SCRIPT_ATTRIBUTE}]`)
    .forEach((script) => script.remove());
  delete window.gtag;
  delete window.dataLayer;
  expireAnalyticsCookies();
  return hadAnalyticsRuntime;
}

export function setAnalyticsConsent(choice: Exclude<AnalyticsConsent, "unknown">): boolean {
  const record: StoredAnalyticsConsent = {
    version: ANALYTICS_CONSENT_VERSION,
    choice,
    updatedAt: new Date().toISOString(),
  };
  try {
    window.localStorage?.setItem(ANALYTICS_CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // The current-page choice still applies even when storage is unavailable.
  }
  const requiresReload = choice === "denied" ? clearAnalyticsRuntime() : false;
  window.dispatchEvent(new CustomEvent(ANALYTICS_CONSENT_EVENT, { detail: { choice } }));
  return requiresReload;
}

function hasAnalyticsConfig(dataLayer: any[]): boolean {
  return dataLayer.some((entry) => entry?.[0] === "config" && entry?.[1] === GA_MEASUREMENT_ID);
}

function hasAnalyticsScript(): boolean {
  return Boolean(document.querySelector(`script[src="${GA_SCRIPT_SRC}"]`));
}

export function initializeAnalytics(isProduction = import.meta.env.PROD): () => void {
  if (!shouldInitializeAnalytics(isProduction)) return () => undefined;

  window.dataLayer ??= [];
  window.gtag ??= function gtag(...args: any[]) {
    window.dataLayer!.push(args);
  };

  if (!hasAnalyticsConfig(window.dataLayer)) {
    window.gtag("consent", "default", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
  }

  if (!hasAnalyticsScript()) {
    const script = document.createElement("script");
    script.async = true;
    script.src = GA_SCRIPT_SRC;
    script.setAttribute(ANALYTICS_SCRIPT_ATTRIBUTE, "true");
    script.addEventListener("error", () => script.remove(), { once: true });
    document.head.appendChild(script);
  }

  return () => undefined;
}

function analyticsReady(isProduction: boolean): boolean {
  if (!shouldInitializeAnalytics(isProduction)) return false;
  if (!window.gtag) initializeAnalytics(isProduction);
  return Boolean(window.gtag);
}

export function trackPageView({
  page_title,
  page_location,
  page_path,
}: {
  page_title?: string;
  page_location?: string;
  page_path?: string;
}, isProduction = import.meta.env.PROD) {
  if (!analyticsReady(isProduction)) return;
  window.gtag!("event", "page_view", { page_title, page_location, page_path });
}

export function trackEvent(
  eventName: string,
  params: Record<string, any> = {},
  isProduction = import.meta.env.PROD,
) {
  if (!analyticsReady(isProduction)) return;
  window.gtag!("event", eventName, params);
}

export type ContactIntentMethod = "whatsapp" | "email" | "phone" | "contact_form";

export function trackContactIntent({
  method,
  source,
  pagePath = window.location.pathname,
}: {
  method: ContactIntentMethod;
  source: string;
  pagePath?: string;
}, isProduction = import.meta.env.PROD) {
  trackEvent("contact_intent", {
    method,
    source,
    page_path: pagePath,
    transport_type: "beacon",
  }, isProduction);
}
