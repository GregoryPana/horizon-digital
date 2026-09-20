import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../lib/analytics';
import {
  buildFullTitle,
  findRedirect,
  findStaticRoute,
  matchDynamicRoute,
  NOT_FOUND_SEO,
} from '../config/routes';

export function shouldTrackPageView(pathname: string, isDev: boolean): boolean {
  return !(isDev && (pathname === '/dev' || pathname.startsWith('/dev/')));
}

export function getAnalyticsPageTitle(pathname: string): string {
  const redirect = findRedirect(pathname);
  const resolvedPath = redirect?.to ?? pathname;
  const staticRoute = findStaticRoute(resolvedPath);
  if (staticRoute) return buildFullTitle(staticRoute.seo.title);

  const dynamicRoute = matchDynamicRoute(resolvedPath);
  if (dynamicRoute?.article) return buildFullTitle(dynamicRoute.article.seoTitle);

  return buildFullTitle(NOT_FOUND_SEO.title);
}

export default function AnalyticsListener() {
  const location = useLocation();

  useEffect(() => {
    if (!shouldTrackPageView(location.pathname, import.meta.env.DEV)) return;

    const frame = window.requestAnimationFrame(() => {
      trackPageView({
        page_title: getAnalyticsPageTitle(location.pathname),
        page_location: window.location.href,
        page_path: location.pathname + location.search,
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location]);

  return null;
}
