// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createElement } from 'react';
import { cleanup, fireEvent, render, screen, act } from '@testing-library/react';

let consent: typeof import('./analyticsConsent');
let analytics: typeof import('./analytics');
let stop: (() => void) | undefined;

beforeEach(async () => {
  vi.resetModules();
  vi.useFakeTimers();
  window.localStorage.clear();
  window.sessionStorage.clear();
  document.head.innerHTML = '';
  document.body.removeAttribute('data-menu-open');
  document.cookie = '_ga=; Max-Age=0; path=/';
  delete window.gtag;
  delete window.dataLayer;
  consent = await import('./analyticsConsent');
  analytics = await import('./analytics');
});
afterEach(() => {
  stop?.(); stop = undefined;
  cleanup();
  vi.clearAllTimers();
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function start(reload = vi.fn()) {
  stop = analytics.initializeAnalytics({ reload });
  return reload;
}
function assertOff() {
  analytics.trackPageView({ page_path: '/private-before-consent' });
  analytics.trackContactIntent({ method: 'email', source: 'test' });
  analytics.trackEvent('cta_click');
  window.dispatchEvent(new Event('load'));
  vi.advanceTimersByTime(10_000);
  expect(window.gtag).toBeUndefined();
  expect(window.dataLayer).toBeUndefined();
  expect(window.sessionStorage.length).toBe(0);
  expect(document.querySelector('script[src*="googletagmanager"]')).toBeNull();
}

describe('consent-first analytics policy', () => {
  it('creates no queue, script or event storage by default', () => {
    expect(consent.getAnalyticsConsent()).toBe('unknown');
    start(); assertOff();
    expect(window.localStorage.length).toBe(0);
  });

  it('honours a versioned explicit denial across reloads', async () => {
    consent.setAnalyticsConsent('denied');
    vi.resetModules();
    const fresh = await import('./analyticsConsent');
    expect(fresh.getAnalyticsConsent()).toBe('denied');
    start(); assertOff();
  });

  it.each(['not-json', '{"version":0,"choice":"granted"}', '{"version":1,"choice":"yes"}', 'null'])(
    'fails closed for an invalid/stale record: %s', (record) => {
      window.localStorage.setItem(consent.ANALYTICS_CONSENT_STORAGE_KEY, record);
      start(); assertOff();
    });

  it('records only the current page once on opt-in; never replays pre-consent routes', () => {
    document.title = 'Current page';
    start();
    analytics.trackPageView({ page_path: '/never-replay' });
    consent.setAnalyticsConsent('granted');
    consent.setAnalyticsConsent('granted');
    const events = window.dataLayer?.filter((entry) => entry[0] === 'event');
    expect(events).toEqual([['event', 'page_view', {
      page_title: document.title, page_location: window.location.href,
      page_path: window.location.pathname + window.location.search,
    }]]);
    expect(window.dataLayer?.[1]).toEqual(['config', analytics.GA_MEASUREMENT_ID, { send_page_view: false }]);
  });

  it('blocks helpers even if a vendor gtag exists without a grant', () => {
    const gtag = vi.fn(); window.gtag = gtag;
    analytics.trackEvent('contact_intent');
    analytics.trackPageView({ page_path: '/' });
    analytics.trackContactIntent({ method: 'whatsapp', source: 'test' });
    expect(gtag).not.toHaveBeenCalled();
  });

  it.each([false, true])('denies, clears owned cookies/queues/storage and reloads under persisted denial (loaded=%s)', (loaded) => {
    consent.setAnalyticsConsent('granted');
    const reload = start();
    analytics.trackContactIntent({ method: 'phone', source: 'test' });
    const queued = window.dataLayer!;
    if (loaded) {
      window.dispatchEvent(new Event('load'));
      vi.advanceTimersByTime(2_000);
      const loadedScript = document.querySelector('script[src*="googletagmanager"]');
      expect(loadedScript).not.toBeNull();
      loadedScript!.dispatchEvent(new Event('load'));
    } else {
      expect(window.sessionStorage.length).toBeGreaterThan(0);
    }
    const gtag = vi.fn(window.gtag); window.gtag = gtag;
    document.cookie = '_ga=synthetic; path=/';
    document.cookie = '_ga_TEST=synthetic; path=/';
    document.cookie = 'essential_preference=keep; path=/';
    consent.setAnalyticsConsent('denied');
    expect(gtag).toHaveBeenCalledWith('consent', 'update', {
      analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
    });
    expect(queued).toEqual([]);
    expect(document.cookie).not.toContain('_ga=');
    expect(document.cookie).not.toContain('_ga_TEST=');
    expect(document.cookie).toContain('essential_preference=keep');
    expect(JSON.parse(window.localStorage.getItem(consent.ANALYTICS_CONSENT_STORAGE_KEY)!)).toEqual({ version: 1, choice: 'denied' });
    expect(reload).toHaveBeenCalledOnce();
    assertOff();
  });

  it('gates a previously scheduled idle injection against the current persisted choice', () => {
    let delayed: IdleRequestCallback | undefined;
    vi.stubGlobal('requestIdleCallback', (callback: IdleRequestCallback) => { delayed = callback; return 1; });
    consent.setAnalyticsConsent('granted'); start();
    window.dispatchEvent(new Event('load'));
    window.localStorage.setItem(consent.ANALYTICS_CONSENT_STORAGE_KEY, '{"version":1,"choice":"denied"}');
    delayed?.({ didTimeout: false, timeRemaining: () => 10 });
    expect(document.querySelector('script[src*="googletagmanager"]')).toBeNull();
    const size = window.dataLayer?.length;
    analytics.trackEvent('should_not_queue');
    expect(window.dataLayer?.length).toBe(size);
  });

  it('responds to denial in another tab', () => {
    consent.setAnalyticsConsent('granted');
    const reload = start();
    window.localStorage.setItem(consent.ANALYTICS_CONSENT_STORAGE_KEY, '{"version":1,"choice":"denied"}');
    window.dispatchEvent(new StorageEvent('storage', { key: consent.ANALYTICS_CONSENT_STORAGE_KEY }));
    expect(reload).toHaveBeenCalledOnce();
    assertOff();
  });

  it('fails closed when local storage is unavailable, including attempted opt-in', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked'); });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked'); });
    start();
    expect(consent.setAnalyticsConsent('granted')).toBe(false);
    assertOff();
  });

  it('keeps denial fail-closed if storage rejects both the write and removal of an old grant; retries safely', () => {
    consent.setAnalyticsConsent('granted');
    const reload = start();
    const set = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked'); });
    const remove = vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => { throw new Error('blocked'); });
    expect(consent.setAnalyticsConsent('denied')).toBe(false);
    expect(consent.setAnalyticsConsent('granted')).toBe(false); // Cannot revive the old grant on a rejected write.
    expect(consent.hasAnalyticsConsent()).toBe(false);
    expect(reload).not.toHaveBeenCalled(); // Must not reload into the old stored grant.
    expect(Reflect.get(window, `ga-disable-${analytics.GA_MEASUREMENT_ID}`)).toBe(true);
    expect(window.gtag).toBeUndefined();
    expect(window.dataLayer).toBeUndefined();
    set.mockRestore(); remove.mockRestore();
    consent.setAnalyticsConsent('denied');
    expect(reload).toHaveBeenCalledOnce();
    assertOff();
  });

  it('retains in-memory allowed events when only session storage is unavailable', () => {
    consent.setAnalyticsConsent('granted');
    vi.spyOn(window, 'sessionStorage', 'get').mockImplementation(() => { throw new Error('blocked'); });
    start();
    expect(() => analytics.trackEvent('contact_intent', { method: 'email' })).not.toThrow();
    expect(window.dataLayer?.[window.dataLayer.length - 1]).toEqual(['event', 'contact_intent', { method: 'email' }]);
  });
});

describe('consent presentation', () => {
  async function mount() {
    const { default: Component } = await import('../components/AnalyticsConsent');
    return render(createElement(Component));
  }
  it('offers equal explicit choices and a durable preference control after denial', async () => {
    await mount();
    expect(screen.getByRole('button', { name: 'Allow analytics' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'No thanks' }));
    expect(consent.getAnalyticsConsent()).toBe('denied');
    expect(screen.queryByRole('button', { name: 'Allow analytics' })).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Analytics preferences' }));
    expect(screen.getByRole('heading', { name: 'Your analytics choice' })).toBe(document.activeElement);
    fireEvent.keyDown(screen.getByRole('region', { name: 'Your analytics choice' }), { key: 'Escape' });
    expect(screen.getByRole('button', { name: 'Analytics preferences' })).toBe(document.activeElement);
    expect(screen.queryByRole('button', { name: 'Allow analytics' })).toBeNull();
  });

  it('hides presentation and keyboard controls while the main menu is open without losing state', async () => {
    await mount();
    await act(async () => { document.body.setAttribute('data-menu-open', 'true'); });
    expect(screen.queryByRole('button', { name: 'No thanks' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Analytics preferences' })).toBeNull();
    await act(async () => { document.body.removeAttribute('data-menu-open'); });
    expect(screen.getByRole('button', { name: 'No thanks' })).toBeTruthy();
    expect(consent.getAnalyticsConsent()).toBe('unknown');
  });

  it('does not initialize analytics in development merely by allowing in the UI', async () => {
    await mount();
    fireEvent.click(screen.getByRole('button', { name: 'Allow analytics' }));
    expect(consent.getAnalyticsConsent()).toBe('granted');
    expect(window.gtag).toBeUndefined();
    expect(window.dataLayer).toBeUndefined();
  });

  it('shows an actionable storage error rather than silently granting', async () => {
    await mount();
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked'); });
    fireEvent.click(screen.getByRole('button', { name: 'Allow analytics' }));
    expect(screen.getByRole('status').textContent).toContain('could not save');
    expect(consent.hasAnalyticsConsent()).toBe(false);
    expect(screen.getByRole('button', { name: 'No thanks' })).toBeTruthy();
  });
});
