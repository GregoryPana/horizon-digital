import type { ComponentType } from "react";
import { findRedirect, matchDynamicRoute, normalizePathname } from "./routes";

export type RouteModule = { default: ComponentType };
export type RouteModuleLoader = () => Promise<RouteModule>;

export type StaticClientRoutePath =
  | "/"
  | "/what-you-need"
  | "/work"
  | "/services"
  | "/pricing"
  | "/process"
  | "/insights"
  | "/about"
  | "/contact"
  | "/showcase/forma-studio"
  | "/showcase/takamaka-house"
  | "/showcase/drake-seaside"
  | "/web-design-seychelles"
  | "/seo-services-seychelles"
  | "/analytics-and-digital-presence-seychelles";

export type ClientRouteLoaderRegistry = {
  static: Record<StaticClientRoutePath, RouteModuleLoader>;
  insightArticle: RouteModuleLoader;
  notFound: RouteModuleLoader;
};

export const clientRouteLoaders = {
  static: {
    "/": () => import("../pages/Home"),
    "/what-you-need": () => import("../pages/WhatYouNeed"),
    "/work": () => import("../pages/Work"),
    "/services": () => import("../pages/Services"),
    "/pricing": () => import("../pages/Pricing"),
    "/process": () => import("../pages/Process"),
    "/insights": () => import("../pages/Insights"),
    "/about": () => import("../pages/About"),
    "/contact": () => import("../pages/Contact"),
    "/showcase/forma-studio": () => import("../pages/ShowcaseFormaStudio"),
    "/showcase/takamaka-house": () => import("../pages/ShowcaseTakamakaHouse"),
    "/showcase/drake-seaside": () => import("../pages/ShowcaseDrakeSeaside"),
    "/web-design-seychelles": () => import("../pages/WebDesignSeychelles"),
    "/seo-services-seychelles": () => import("../pages/SeoServicesSeychelles"),
    "/analytics-and-digital-presence-seychelles": () =>
      import("../pages/AnalyticsDigitalPresenceSeychelles"),
  },
  insightArticle: () => import("../pages/InsightArticle"),
  notFound: () => import("../pages/NotFound"),
} satisfies ClientRouteLoaderRegistry;

export function selectCurrentRouteLoader(
  pathname: string,
  registry: ClientRouteLoaderRegistry = clientRouteLoaders,
): RouteModuleLoader {
  const normalized = normalizePathname(pathname);
  const staticLoader = registry.static[normalized as StaticClientRoutePath];
  if (staticLoader) return staticLoader;

  if (matchDynamicRoute(normalized)) return registry.insightArticle;

  const redirect = findRedirect(normalized);
  if (redirect) {
    return registry.static[redirect.to as StaticClientRoutePath] ?? registry.notFound;
  }

  return registry.notFound;
}

export function preloadCurrentRoute(
  pathname: string,
  registry: ClientRouteLoaderRegistry = clientRouteLoaders,
): Promise<RouteModule> {
  return selectCurrentRouteLoader(pathname, registry)();
}
