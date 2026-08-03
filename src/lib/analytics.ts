export const GA_MEASUREMENT_ID = 'G-Z79X024S87';
const GA_SCRIPT_SRC = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export function shouldInitializeAnalytics(isProduction: boolean): boolean {
  return isProduction;
}

function hasAnalyticsConfig(dataLayer: any[]): boolean {
  return dataLayer.some((entry) => entry?.[0] === 'config' && entry?.[1] === GA_MEASUREMENT_ID);
}

export function initializeAnalytics(): void {
  window.dataLayer ??= [];

  if (hasAnalyticsConfig(window.dataLayer)) return;

  window.gtag ??= function gtag(...args: any[]) {
    window.dataLayer!.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });

  if (!document.querySelector(`script[src="${GA_SCRIPT_SRC}"]`)) {
    const script = document.createElement('script');
    script.async = true;
    script.src = GA_SCRIPT_SRC;
    document.head.appendChild(script);
  }
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
