export const GA_MEASUREMENT_ID = 'G-Z79X024S87';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
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
