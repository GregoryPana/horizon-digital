// @vitest-environment jsdom

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  ANALYTICS_PENDING_EVENT_LIMIT,
  ANALYTICS_PENDING_EVENT_TTL_MS,
  GA_MEASUREMENT_ID,
  initializeAnalytics,
  shouldInitializeAnalytics,
  trackContactIntent,
  trackEvent,
  trackPageView,
} from './analytics';

const projectFile = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf8');
const scriptSelector = `script[src="https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"]`;

describe('analytics initialization policy', () => {
  it('is enabled only for production builds', () => {
    expect(shouldInitializeAnalytics(true)).toBe(true);
    expect(shouldInitializeAnalytics(false)).toBe(false);
  });

  it('keeps the static HTML free of the production GA bootstrap', () => {
    const html = projectFile('index.html');

    expect(html).not.toContain('googletagmanager.com');
    expect(html).not.toContain(GA_MEASUREMENT_ID);
  });

  it('guards initialization in the entry point with import.meta.env.PROD', () => {
    const main = projectFile('src/main.tsx');

    expect(main).toMatch(/if\s*\(\s*import\.meta\.env\.PROD\s*\)\s*{\s*initializeAnalytics\(\);\s*}/s);
  });
});

describe('initializeAnalytics', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    document.head.innerHTML = '';
    window.sessionStorage.clear();
    delete window.gtag;
    delete window.dataLayer;
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
    delete window.gtag;
    delete window.dataLayer;
    window.sessionStorage.clear();
  });

  it('primes the queue immediately without injecting gtag.js', () => {
    initializeAnalytics();

    expect(document.head.querySelector(scriptSelector)).toBeNull();
    expect(window.gtag).toBeTypeOf('function');
    expect(window.dataLayer).toHaveLength(2);
    expect(Array.from(window.dataLayer![0])).toEqual(['js', expect.any(Date)]);
    expect(Array.from(window.dataLayer![1])).toEqual([
      'config',
      GA_MEASUREMENT_ID,
      { send_page_view: false },
    ]);
  });

  it('keeps page views and contact events queued before the script loads', () => {
    initializeAnalytics();
    trackPageView({ page_path: '/contact' });
    trackContactIntent({ method: 'whatsapp', source: 'footer', pagePath: '/contact' });

    expect(document.head.querySelector(scriptSelector)).toBeNull();
    expect(window.dataLayer?.map((entry) => Array.from(entry))).toEqual([
      ['js', expect.any(Date)],
      ['config', GA_MEASUREMENT_ID, { send_page_view: false }],
      ['event', 'page_view', { page_title: undefined, page_location: undefined, page_path: '/contact' }],
      ['event', 'contact_intent', {
        method: 'whatsapp',
        source: 'footer',
        page_path: '/contact',
        transport_type: 'beacon',
      }],
    ]);
  });

  it('restores queued events after a navigation race and clears them only when gtag loads', async () => {
    const cleanup = initializeAnalytics();
    trackPageView({ page_path: '/contact' });
    trackContactIntent({ method: 'email', source: 'footer', pagePath: '/contact' });

    cleanup();
    document.head.innerHTML = '';
    delete window.gtag;
    delete window.dataLayer;
    vi.resetModules();
    const reloadedAnalytics = await import('./analytics');

    reloadedAnalytics.initializeAnalytics();
    reloadedAnalytics.initializeAnalytics();
    const restoredDataLayer = window.dataLayer as any[] | undefined;

    expect(restoredDataLayer?.map((entry: any[]) => Array.from(entry))).toEqual([
      ['js', expect.any(Date)],
      ['config', GA_MEASUREMENT_ID, { send_page_view: false }],
      ['event', 'page_view', { page_path: '/contact' }],
      ['event', 'contact_intent', {
        method: 'email',
        source: 'footer',
        page_path: '/contact',
        transport_type: 'beacon',
      }],
    ]);

    vi.advanceTimersByTime(2_000);
    const script = document.head.querySelector<HTMLScriptElement>(scriptSelector);
    expect(script).not.toBeNull();
    expect(window.sessionStorage.length).toBeGreaterThan(0);

    script!.dispatchEvent(new Event('load'));
    expect(window.sessionStorage.length).toBe(0);
  });

  it('preserves repeated identical events while restoring each record only once', async () => {
    const cleanup = initializeAnalytics();
    trackEvent('cta_click', { cta_name: 'request_consult' });
    trackEvent('cta_click', { cta_name: 'request_consult' });

    cleanup();
    document.head.innerHTML = '';
    delete window.gtag;
    delete window.dataLayer;
    vi.resetModules();
    const reloadedAnalytics = await import('./analytics');

    reloadedAnalytics.initializeAnalytics();
    reloadedAnalytics.initializeAnalytics();

    const restoredDataLayer = window.dataLayer as any[] | undefined;
    const restoredEvents = restoredDataLayer?.filter((entry: any[]) => entry[0] === 'event');
    expect(restoredEvents).toHaveLength(2);
    expect(restoredEvents?.[0]).toEqual(restoredEvents?.[1]);
  });

  it('drops pending events after the freshness window', async () => {
    vi.setSystemTime(new Date('2026-08-03T10:00:00Z'));
    const cleanup = initializeAnalytics();
    trackEvent('page_view', { page_path: '/services' });
    cleanup();

    vi.setSystemTime(Date.now() + ANALYTICS_PENDING_EVENT_TTL_MS + 1);
    document.head.innerHTML = '';
    delete window.gtag;
    delete window.dataLayer;
    vi.resetModules();
    const reloadedAnalytics = await import('./analytics');
    reloadedAnalytics.initializeAnalytics();

    const restoredDataLayer = window.dataLayer as any[] | undefined;
    expect(restoredDataLayer?.filter((entry: any[]) => entry[0] === 'event')).toHaveLength(0);
    expect(window.sessionStorage.length).toBe(0);
  });

  it('keeps only the latest bounded set of pending events', async () => {
    const cleanup = initializeAnalytics();
    for (let index = 0; index < ANALYTICS_PENDING_EVENT_LIMIT + 5; index += 1) {
      trackEvent(`bounded_event_${index}`);
    }
    cleanup();

    document.head.innerHTML = '';
    delete window.gtag;
    delete window.dataLayer;
    vi.resetModules();
    const reloadedAnalytics = await import('./analytics');
    reloadedAnalytics.initializeAnalytics();

    const restoredDataLayer = window.dataLayer as any[] | undefined;
    const restoredEvents = restoredDataLayer?.filter((entry: any[]) => entry[0] === 'event') ?? [];
    expect(restoredEvents).toHaveLength(ANALYTICS_PENDING_EVENT_LIMIT);
    expect(restoredEvents[0]?.[1]).toBe('bounded_event_5');
    expect(restoredEvents[restoredEvents.length - 1]?.[1]).toBe(`bounded_event_${ANALYTICS_PENDING_EVENT_LIMIT + 4}`);
  });

  it('injects on the first trusted interaction and cleans up listeners', () => {
    const listeners = new Map<string, EventListener>();
    const add = vi.spyOn(window, 'addEventListener').mockImplementation((type, listener) => {
      listeners.set(type, listener as EventListener);
    });
    const remove = vi.spyOn(window, 'removeEventListener');

    initializeAnalytics();
    listeners.get('pointerdown')?.({ isTrusted: false } as Event);
    expect(document.head.querySelector(scriptSelector)).toBeNull();

    listeners.get('keydown')?.({ isTrusted: true } as Event);

    expect(document.head.querySelector<HTMLScriptElement>(scriptSelector)?.async).toBe(true);
    expect(remove).toHaveBeenCalled();
    expect(add).toHaveBeenCalled();
  });

  it('injects on the idle fallback and remains idempotent', () => {
    const idleCallbacks: IdleRequestCallback[] = [];
    const requestIdleCallback = vi.fn((callback: IdleRequestCallback) => {
      idleCallbacks.push(callback);
      return 1;
    });
    vi.stubGlobal('requestIdleCallback', requestIdleCallback);

    initializeAnalytics();
    initializeAnalytics();
    window.dispatchEvent(new Event('load'));
    idleCallbacks[0]?.({ didTimeout: false, timeRemaining: () => 10 });

    expect(requestIdleCallback).toHaveBeenCalledOnce();
    expect(document.head.querySelectorAll(scriptSelector)).toHaveLength(1);
    expect(window.dataLayer).toHaveLength(2);
  });
});

describe('analytics event helpers', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('sends SPA page views with the hydrated route identity', () => {
    const gtag = vi.fn();
    vi.stubGlobal('window', { gtag });

    trackPageView({
      page_title: 'Contact | Horizon Digital',
      page_location: 'https://horizondigitalsey.com/contact',
      page_path: '/contact',
    });

    expect(gtag).toHaveBeenCalledWith('event', 'page_view', {
      page_title: 'Contact | Horizon Digital',
      page_location: 'https://horizondigitalsey.com/contact',
      page_path: '/contact',
    });
  });

  it('normalizes contact intent without sending contact details', () => {
    const gtag = vi.fn();
    vi.stubGlobal('window', { gtag, location: { pathname: '/contact' } });

    trackContactIntent({ method: 'whatsapp', source: 'footer' });

    expect(gtag).toHaveBeenCalledWith('event', 'contact_intent', {
      method: 'whatsapp',
      source: 'footer',
      page_path: '/contact',
      transport_type: 'beacon',
    });
  });

  it('fails quietly when analytics is unavailable', () => {
    vi.stubGlobal('window', {});
    expect(() => trackEvent('cta_click', { cta_name: 'example' })).not.toThrow();
  });
});
