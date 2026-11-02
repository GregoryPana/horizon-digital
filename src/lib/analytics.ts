import { canReloadWithoutAnalytics, hasAnalyticsConsent, subscribeAnalyticsConsent } from './analyticsConsent';

export const GA_MEASUREMENT_ID = 'G-Z79X024S87';
const GA_SCRIPT_SRC = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
const INTERACTION_EVENTS = ['pointerdown', 'keydown', 'touchstart'] as const;
const IDLE_TIMEOUT_MS = 2_000;
const PENDING_EVENTS_STORAGE_KEY = 'horizon.analytics.pending-events.v2';
const ANALYTICS_LOADED_ATTRIBUTE = 'data-horizon-analytics-loaded';
export const ANALYTICS_PENDING_EVENT_TTL_MS = 30 * 60 * 1_000;
export const ANALYTICS_PENDING_EVENT_LIMIT = 50;

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

let scheduledCleanup: (() => void) | undefined;

export function shouldInitializeAnalytics(isProduction: boolean): boolean {
  return isProduction;
}

function hasAnalyticsConfig(dataLayer: any[]): boolean {
  return dataLayer.some((entry) => entry?.[0] === 'config' && entry?.[1] === GA_MEASUREMENT_ID);
}

function hasAnalyticsScript(): boolean {
  return Boolean(document.querySelector(`script[src="${GA_SCRIPT_SRC}"]`));
}

type PendingEventRecord = {
  id: string;
  capturedAt: number;
  command: any[];
};

const representedPendingEventIds = new Set<string>();
let pendingEventSequence = 0;

function isPendingEventRecord(value: unknown): value is PendingEventRecord {
  if (!value || typeof value !== 'object') return false;
  const record = value as Partial<PendingEventRecord>;
  return typeof record.id === 'string'
    && Number.isFinite(record.capturedAt)
    && Array.isArray(record.command)
    && record.command[0] === 'event';
}

function writePendingEvents(records: PendingEventRecord[]): void {
  if (!hasAnalyticsConsent()) return;
  if (records.length === 0) {
    window.sessionStorage?.removeItem(PENDING_EVENTS_STORAGE_KEY);
    return;
  }
  window.sessionStorage?.setItem(PENDING_EVENTS_STORAGE_KEY, JSON.stringify(records));
}

function readPendingEvents(): PendingEventRecord[] {
  if (!hasAnalyticsConsent()) return [];
  try {
    const serialized = window.sessionStorage?.getItem(PENDING_EVENTS_STORAGE_KEY);
    if (!serialized) return [];
    const parsed = JSON.parse(serialized);
    if (!Array.isArray(parsed)) {
      writePendingEvents([]);
      return [];
    }

    const now = Date.now();
    const fresh = parsed
      .filter(isPendingEventRecord)
      .filter((record) => record.capturedAt <= now + 60_000)
      .filter((record) => now - record.capturedAt <= ANALYTICS_PENDING_EVENT_TTL_MS)
      .slice(-ANALYTICS_PENDING_EVENT_LIMIT);

    if (fresh.length !== parsed.length) writePendingEvents(fresh);
    return fresh;
  } catch {
    return [];
  }
}

function createPendingEventId(): string {
  const randomId = globalThis.crypto?.randomUUID?.();
  if (randomId) return randomId;
  pendingEventSequence += 1;
  return `${Date.now().toString(36)}-${pendingEventSequence.toString(36)}`;
}

function persistPendingEvent(command: any[]): void {
  if (!hasAnalyticsConsent()) return;
  if (document.querySelector(`script[${ANALYTICS_LOADED_ATTRIBUTE}="true"]`)) return;
  try {
    const record: PendingEventRecord = {
      id: createPendingEventId(),
      capturedAt: Date.now(),
      command,
    };
    const pending = [...readPendingEvents(), record].slice(-ANALYTICS_PENDING_EVENT_LIMIT);
    representedPendingEventIds.add(record.id);
    writePendingEvents(pending);
  } catch {
    // Storage can be unavailable or full. The in-memory dataLayer remains the fallback.
  }
}

// The vendor consumes native Arguments, not Arrays. Keep persisted JSON separate.
function enqueueAnalyticsCommand(..._args: any[]): void {
  window.dataLayer!.push(arguments);
}

function restorePendingEvents(): void {
  if (!hasAnalyticsConsent()) return;
  for (const pending of readPendingEvents()) {
    if (representedPendingEventIds.has(pending.id)) continue;
    // Replay after config through the same native adapter, without persisting anew.
    enqueueAnalyticsCommand(...pending.command);
    representedPendingEventIds.add(pending.id);
  }
}

function clearPendingEvents(): void {
  representedPendingEventIds.clear();
  try {
    window.sessionStorage?.removeItem(PENDING_EVENTS_STORAGE_KEY);
  } catch {
    // Storage cleanup is best-effort and must not block analytics initialization.
  }
}

function injectAnalyticsScript(): void {
  if (!hasAnalyticsConsent()) { scheduledCleanup?.(); return; }
  if (!hasAnalyticsScript()) {
    const script = document.createElement('script');
    script.async = true;
    script.src = GA_SCRIPT_SRC;
    script.addEventListener('load', () => {
      script.setAttribute(ANALYTICS_LOADED_ATTRIBUTE, 'true');
      clearPendingEvents();
    }, { once: true });
    script.addEventListener('error', () => script.remove(), { once: true });
    document.head.appendChild(script);
  }

  scheduledCleanup?.();
}

function scheduleAnalyticsScript(): () => void {
  if (scheduledCleanup) return scheduledCleanup;

  let idleId: number | undefined;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let listeningForLoad = false;
  let cleanedUp = false;

  const onTrustedInteraction = (event: Event) => {
    if (event.isTrusted) injectAnalyticsScript();
  };

  const scheduleIdleFallback = () => {
    listeningForLoad = false;
    const requestIdle = window.requestIdleCallback?.bind(window);
    if (typeof requestIdle === 'function') {
      idleId = requestIdle(injectAnalyticsScript, { timeout: IDLE_TIMEOUT_MS });
    } else {
      timeoutId = setTimeout(injectAnalyticsScript, IDLE_TIMEOUT_MS);
    }
  };

  const cleanup = () => {
    if (cleanedUp) return;
    cleanedUp = true;
    INTERACTION_EVENTS.forEach((eventName) => {
      window.removeEventListener(eventName, onTrustedInteraction);
    });
    if (listeningForLoad) window.removeEventListener('load', scheduleIdleFallback);
    if (idleId !== undefined && typeof window.cancelIdleCallback === 'function') {
      window.cancelIdleCallback(idleId);
    }
    if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    if (scheduledCleanup === cleanup) scheduledCleanup = undefined;
  };

  scheduledCleanup = cleanup;
  INTERACTION_EVENTS.forEach((eventName) => {
    window.addEventListener(eventName, onTrustedInteraction, { passive: true });
  });

  if (document.readyState === 'complete') {
    scheduleIdleFallback();
  } else {
    listeningForLoad = true;
    window.addEventListener('load', scheduleIdleFallback, { once: true });
  }

  return cleanup;
}

function startConsentedAnalytics(): void {
  if (!hasAnalyticsConsent()) return;
  Object.assign(window, { [`ga-disable-${GA_MEASUREMENT_ID}`]: false });
  window.dataLayer ??= [];
  window.gtag ??= function gtag(...args: any[]) {
    if (args[0] !== 'consent' && !hasAnalyticsConsent()) return;
    enqueueAnalyticsCommand(...args);
    if (args[0] === 'event') persistPendingEvent(args);
  };

  if (!hasAnalyticsConfig(window.dataLayer)) {
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });
  }

  restorePendingEvents();

  if (!hasAnalyticsScript()) scheduleAnalyticsScript();
}

/** Expire only Google Analytics cookies owned by this site, not unrelated preferences. */
function expireAnalyticsCookies(): void {
  const names = document.cookie.split(';').map((cookie) => cookie.trim().split('=')[0])
    .filter((name) => name === '_ga' || name.startsWith('_ga_') || name === '_gid' || name === '_gat' || name.startsWith('_gat_'));
  const hostParts = window.location.hostname.split('.');
  const domains = ['', ...hostParts.map((_, index) => hostParts.slice(index).join('.'))];
  const segments = window.location.pathname.split('/').filter(Boolean);
  const paths = new Set(['/']);
  for (let index = 1; index <= segments.length; index += 1) {
    const path = '/' + segments.slice(0, index).join('/');
    paths.add(path);
    paths.add(path + '/');
  }
  for (const name of names) for (const path of paths) for (const domain of domains) {
    const base = `${name}=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path};`;
    document.cookie = base + (domain ? ` domain=${domain};` : '');
    if (domain) document.cookie = base + ` domain=.${domain};`;
  }
}

let initializationCleanup: (() => void) | undefined;

/** Only the existing production entry guard calls this; the UI cannot enable dev tracking. */
export function initializeAnalytics({ reload = () => window.location.reload() }: { reload?: () => void } = {}): () => void {
  if (initializationCleanup) return initializationCleanup;
  let allowed = hasAnalyticsConsent();
  let needsRevocationReload = false;
  const onConsentChange = () => {
    const nextAllowed = hasAnalyticsConsent();
    if (nextAllowed === allowed && !(needsRevocationReload && !nextAllowed)) return;
    if (allowed && !nextAllowed) needsRevocationReload = true;
    allowed = nextAllowed;
    if (nextAllowed) {
      startConsentedAnalytics();
      // The SPA route effect already ran without consent. Do not replay prior routes.
      trackPageView({ page_title: document.title, page_location: window.location.href,
        page_path: window.location.pathname + window.location.search });
    } else {
      scheduledCleanup?.();
      Object.assign(window, { [`ga-disable-${GA_MEASUREMENT_ID}`]: true });
      window.gtag?.('consent', 'update', {
        analytics_storage: 'denied', ad_storage: 'denied',
        ad_user_data: 'denied', ad_personalization: 'denied',
      });
      if (window.dataLayer) window.dataLayer.length = 0;
      delete window.gtag;
      delete window.dataLayer;
      clearPendingEvents();
      document.querySelectorAll(`script[src="${GA_SCRIPT_SRC}"]`).forEach((script) => script.remove());
      expireAnalyticsCookies();
      // Removing a script cannot unload executed vendor listeners. Never reload into an old grant.
      if (canReloadWithoutAnalytics()) {
        needsRevocationReload = false;
        reload();
      }
    }
  };
  const unsubscribe = subscribeAnalyticsConsent(onConsentChange);
  if (allowed) startConsentedAnalytics();
  else clearPendingEvents();
  initializationCleanup = () => {
    scheduledCleanup?.();
    unsubscribe();
    initializationCleanup = undefined;
  };
  return initializationCleanup;
}

export function trackPageView({ page_title, page_location, page_path }: { page_title?: string; page_location?: string; page_path?: string }) {
  if (!hasAnalyticsConsent() || !window.gtag) return;

  window.gtag('event', 'page_view', {
    page_title,
    page_location,
    page_path,
  });
}

export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  if (!hasAnalyticsConsent() || !window.gtag) return;

  window.gtag('event', eventName, params);
}

export type ContactIntentMethod = 'whatsapp' | 'email' | 'phone' | 'contact_form';

export function trackContactIntent({
  method,
  source,
  pagePath = window.location.pathname,
}: {
  method: ContactIntentMethod;
  source: string;
  pagePath?: string;
}) {
  trackEvent('contact_intent', {
    method,
    source,
    page_path: pagePath,
    transport_type: 'beacon',
  });
}
