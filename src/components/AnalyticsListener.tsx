import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../lib/analytics';

export function shouldTrackPageView(pathname: string, isDev: boolean): boolean {
  return !(isDev && (pathname === '/dev' || pathname.startsWith('/dev/')));
}

export default function AnalyticsListener() {
  const location = useLocation();

  useEffect(() => {
    if (!shouldTrackPageView(location.pathname, import.meta.env.DEV)) return;

    const frame = window.requestAnimationFrame(() => {
      trackPageView({
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname + location.search,
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location]);

  return null;
}
