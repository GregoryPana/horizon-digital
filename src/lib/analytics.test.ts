// @vitest-environment jsdom

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  GA_MEASUREMENT_ID,
  initializeAnalytics,
  shouldInitializeAnalytics,
  trackContactIntent,
  trackEvent,
  trackPageView,
} from './analytics';

const projectFile = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf8');

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
    document.head.innerHTML = '';
    delete window.gtag;
    delete window.dataLayer;
  });

  it('creates the production config and asynchronously injects gtag.js', () => {
    initializeAnalytics();

    const script = document.head.querySelector<HTMLScriptElement>(
      `script[src="https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"]`,
    );

    expect(script).not.toBeNull();
    expect(script?.async).toBe(true);
    expect(window.gtag).toBeTypeOf('function');
    expect(window.dataLayer).toHaveLength(2);
    expect(Array.from(window.dataLayer![0])).toEqual(['js', expect.any(Date)]);
    expect(Array.from(window.dataLayer![1])).toEqual([
      'config',
      GA_MEASUREMENT_ID,
      { send_page_view: false },
    ]);
  });

  it('is idempotent when called more than once', () => {
    initializeAnalytics();
    const firstGtag = window.gtag;

    initializeAnalytics();

    expect(document.head.querySelectorAll(`script[src*="gtag/js?id=${GA_MEASUREMENT_ID}"]`)).toHaveLength(1);
    expect(window.dataLayer).toHaveLength(2);
    expect(window.gtag).toBe(firstGtag);
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
