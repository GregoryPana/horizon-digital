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
  if (records.length === 0) {
    window.sessionStorage?.removeItem(PENDING_EVENTS_STORAGE_KEY);
    return;
  }
  window.sessionStorage?.setItem(PENDING_EVENTS_STORAGE_KEY, JSON.stringify(records));
}

function readPendingEvents(): PendingEventRecord[] {
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

function restorePendingEvents(dataLayer: any[]): void {
  for (const pending of readPendingEvents()) {
    if (representedPendingEventIds.has(pending.id)) continue;
    dataLayer.push(pending.command);
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

export function initializeAnalytics(): () => void {
  window.dataLayer ??= [];
  window.gtag ??= function gtag(...args: any[]) {
    window.dataLayer!.push(args);
    if (args[0] === 'event') persistPendingEvent(args);
  };

  if (!hasAnalyticsConfig(window.dataLayer)) {
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });
  }

  restorePendingEvents(window.dataLayer);

  if (hasAnalyticsScript()) return () => undefined;
  return scheduleAnalyticsScript();
}

export function trackPageView({ page_title, page_location, page_path }: { page_title?: string; page_location?: string; page_path?: string }) {
  if (!window.gtag) return;

  window.gtag('event', 'page_view', {
    page_title,
    page_location,
    page_path,
  });
}

export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  if (!window.gtag) return;

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
