import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../lib/analytics';

export default function AnalyticsListener() {
  const location = useLocation();

  useEffect(() => {
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
