import type { ComponentType } from "react";
import {
  NOT_FOUND_ROUTE_OWNER,
  findRedirect,
  findStaticRoute,
  matchDynamicRoute,
  type ClientRouteOwner,
} from "./routes";

export type RouteModule = { default: ComponentType };
export type RouteModuleLoader = () => Promise<RouteModule>;
export type ClientRouteLoaderRegistry = Record<ClientRouteOwner, RouteModuleLoader>;

// Keep every import target literal so Vite can discover and split each route module.
export const clientRouteLoaders = {
  "home": () => import("../pages/Home"),
  "what-you-need": () => import("../pages/WhatYouNeed"),
  "work": () => import("../pages/Work"),
  "services": () => import("../pages/Services"),
  "pricing": () => import("../pages/Pricing"),
  "process": () => import("../pages/Process"),
  "insights": () => import("../pages/Insights"),
  "about": () => import("../pages/About"),
  "contact": () => import("../pages/Contact"),
  "privacy": () => import("../pages/Privacy"),
  "showcase-forma-studio": () => import("../pages/ShowcaseFormaStudio"),
  "showcase-takamaka-house": () => import("../pages/ShowcaseTakamakaHouse"),
  "showcase-restaurant-concept": () => import("../pages/ShowcaseRestaurantConcept"),
  "showcase-drake-seaside": () => import("../pages/ShowcaseDrakeSeaside"),
  "web-design-seychelles": () => import("../pages/WebDesignSeychelles"),
  "seo-services-seychelles": () => import("../pages/SeoServicesSeychelles"),
  "analytics-digital-presence-seychelles": () =>
    import("../pages/AnalyticsDigitalPresenceSeychelles"),
  "insight-article": () => import("../pages/InsightArticle"),
  "not-found": () => import("../pages/NotFound"),
} satisfies ClientRouteLoaderRegistry;

export function selectCurrentRouteOwner(pathname: string): ClientRouteOwner {
  const staticRoute = findStaticRoute(pathname);
  if (staticRoute) return staticRoute.owner;

  const dynamicMatch = matchDynamicRoute(pathname);
  if (dynamicMatch) return dynamicMatch.route.owner;

  const redirect = findRedirect(pathname);
  if (redirect) return findStaticRoute(redirect.to)?.owner ?? NOT_FOUND_ROUTE_OWNER;

  return NOT_FOUND_ROUTE_OWNER;
}

export function selectCurrentRouteLoader(
  pathname: string,
  registry: ClientRouteLoaderRegistry = clientRouteLoaders,
): RouteModuleLoader {
  return registry[selectCurrentRouteOwner(pathname)];
}

export function preloadCurrentRoute(
  pathname: string,
  registry: ClientRouteLoaderRegistry = clientRouteLoaders,
): Promise<RouteModule> {
  return selectCurrentRouteLoader(pathname, registry)();
}
