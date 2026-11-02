export const ANALYTICS_CONSENT_STORAGE_KEY = 'horizon.analytics.consent.v1';
export const ANALYTICS_CONSENT_VERSION = 1;
const CHANGE_EVENT = 'horizon:analytics-consent';
export type AnalyticsConsent = 'granted' | 'denied' | 'unknown';
// A failed denial write must still stop tracking for the lifetime of this document.
let deniedInMemory = false;

export function getAnalyticsConsent(): AnalyticsConsent {
  if (typeof window === 'undefined') return 'unknown';
  if (deniedInMemory) return 'denied';
  try {
    const value = JSON.parse(window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY) ?? 'null');
    if (value?.version !== ANALYTICS_CONSENT_VERSION) return 'unknown';
    return value.choice === 'granted' || value.choice === 'denied' ? value.choice : 'unknown';
  } catch {
    return 'unknown';
  }
}

export function hasAnalyticsConsent(): boolean {
  return getAnalyticsConsent() === 'granted';
}

/** Returns false if the choice could not be persisted. Never grants on storage failure. */
export function setAnalyticsConsent(choice: 'granted' | 'denied'): boolean {
  deniedInMemory = choice === 'denied';
  let saved = false;
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, JSON.stringify({
      version: ANALYTICS_CONSENT_VERSION, choice,
    }));
    saved = true;
  } catch {
    deniedInMemory = true; // A rejected opt-in must not fall back to an older stored grant.
    // Remove an old grant if writing the denial failed (for example quota exhaustion).
    try { window.localStorage.removeItem(ANALYTICS_CONSENT_STORAGE_KEY); } catch { /* blocked storage */ }
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
  return saved;
}

/** Never reload into an old grant if the browser rejected a denial write. */
export function canReloadWithoutAnalytics(): boolean {
  try {
    const serialized = window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY);
    if (serialized === null) return true;
    const value = JSON.parse(serialized);
    return value?.version !== ANALYTICS_CONSENT_VERSION || value?.choice !== 'granted';
  } catch {
    return false;
  }
}

export function subscribeAnalyticsConsent(listener: () => void): () => void {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== ANALYTICS_CONSENT_STORAGE_KEY && event.key !== null) return;
    deniedInMemory = false;
    listener();
  };
  window.addEventListener(CHANGE_EVENT, listener);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, listener);
    window.removeEventListener('storage', onStorage);
  };
}
