import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getRoutePageTitle } from "../config/routes";
import {
  ANALYTICS_CONSENT_EVENT,
  ANALYTICS_PREFERENCES_OPEN_EVENT,
  clearAnalyticsRuntime,
  getAnalyticsConsent,
  initializeAnalytics,
  setAnalyticsConsent,
  trackPageView,
  type AnalyticsConsent,
} from "../lib/analytics";

export default function AnalyticsConsentControl({
  showPersistentButton = false,
  isProduction = import.meta.env.PROD,
}: {
  showPersistentButton?: boolean;
  isProduction?: boolean;
}) {
  const [choice, setChoice] = useState<AnalyticsConsent>(() => getAnalyticsConsent());
  const [isOpen, setIsOpen] = useState(() => getAnalyticsConsent() === "unknown");
  const firstActionRef = useRef<HTMLButtonElement>(null);
  const persistentButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const wasOpenRef = useRef(isOpen);

  const openPreferences = useCallback(() => {
    if (document.activeElement instanceof HTMLElement) {
      returnFocusRef.current = document.activeElement;
    }
    setIsOpen(true);
  }, []);

  useEffect(() => {
    const handleConsentChange = (event: Event) => {
      const next = (event as CustomEvent<{ choice?: AnalyticsConsent }>).detail?.choice;
      if (next === "granted" || next === "denied") setChoice(next);
    };
    const handleOpenPreferences = () => openPreferences();
    window.addEventListener(ANALYTICS_CONSENT_EVENT, handleConsentChange);
    window.addEventListener(ANALYTICS_PREFERENCES_OPEN_EVENT, handleOpenPreferences);
    return () => {
      window.removeEventListener(ANALYTICS_CONSENT_EVENT, handleConsentChange);
      window.removeEventListener(ANALYTICS_PREFERENCES_OPEN_EVENT, handleOpenPreferences);
    };
  }, [openPreferences]);

  useEffect(() => {
    if (isOpen) {
      firstActionRef.current?.focus();
    } else if (wasOpenRef.current) {
      const returnTarget = returnFocusRef.current;
      if (returnTarget?.isConnected) returnTarget.focus();
      else persistentButtonRef.current?.focus();
      returnFocusRef.current = null;
    }
    wasOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isProduction) return;
    if (choice === "granted") initializeAnalytics(isProduction);
    if (choice === "denied") clearAnalyticsRuntime();
  }, [choice, isProduction]);

  const choose = (next: Exclude<AnalyticsConsent, "unknown">) => {
    const requiresReload = setAnalyticsConsent(next);
    setChoice(next);
    setIsOpen(false);
    if (next === "granted") {
      initializeAnalytics(isProduction);
      trackPageView({
        page_title: getRoutePageTitle(window.location.pathname),
        page_location: window.location.href,
        page_path: window.location.pathname + window.location.search,
      }, isProduction);
    }
    if (requiresReload) window.location.reload();
  };

  if (!isOpen) {
    return showPersistentButton ? (
      <button
        type="button"
        className="focus-ring fixed bottom-4 left-4 z-[110] min-h-11 rounded-full border border-white/20 bg-[#0f1821]/[0.98] px-4 text-xs font-semibold uppercase tracking-[0.12em] text-text shadow-xl"
        onClick={openPreferences}
        ref={persistentButtonRef}
      >
        Analytics choices
      </button>
    ) : null;
  }

  return (
    <aside
      aria-describedby="analytics-preferences-description"
      aria-labelledby="analytics-preferences-title"
      aria-modal="true"
      className="fixed inset-x-4 bottom-4 z-[110] mx-auto max-w-2xl rounded-2xl border border-white/15 bg-[#0f1821]/[0.98] p-5 text-left shadow-2xl backdrop-blur-xl sm:bottom-6 sm:p-6"
      role="dialog"
    >
      <p className="text-sm font-semibold text-text" id="analytics-preferences-title">Optional website analytics</p>
      <p className="mt-2 text-sm leading-relaxed text-text-muted" id="analytics-preferences-description">
        Horizon Digital uses Google Analytics only if you accept. Necessary website and enquiry security still work if you decline. No enquiry form content is sent to analytics.
      </p>
      {choice !== "unknown" ? (
        <p className="mt-2 text-xs text-text-dim" role="status">
          Current choice: {choice === "granted" ? "analytics accepted" : "analytics declined"}.
        </p>
      ) : null}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          className="focus-ring min-h-11 rounded-full bg-accent px-5 text-sm font-semibold text-bg"
          onClick={() => choose("granted")}
          ref={firstActionRef}
        >
          Accept analytics
        </button>
        <button
          type="button"
          className="focus-ring min-h-11 rounded-full border border-white/20 px-5 text-sm font-semibold text-text hover:border-white/35"
          onClick={() => choose("denied")}
        >
          Decline optional analytics
        </button>
        <Link className="focus-ring inline-flex min-h-11 items-center rounded-lg px-2 text-sm text-accent" to="/privacy">
          Read privacy details
        </Link>
      </div>
    </aside>
  );
}
