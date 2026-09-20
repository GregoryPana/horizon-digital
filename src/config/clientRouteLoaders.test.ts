import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { insightArticlesMeta } from "../data/insightsMeta";
import {
  DYNAMIC_ROUTES,
  NOT_FOUND_ROUTE_OWNER,
  STATIC_ROUTES,
} from "./routes";
import {
  clientRouteLoaders,
  preloadCurrentRoute,
  selectCurrentRouteLoader,
  selectCurrentRouteOwner,
  type ClientRouteLoaderRegistry,
  type RouteModuleLoader,
} from "./clientRouteLoaders";

const projectFile = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

const canonicalOwners = () => [
  ...STATIC_ROUTES.map((route) => route.owner),
  ...DYNAMIC_ROUTES.map((route) => route.owner),
  NOT_FOUND_ROUTE_OWNER,
];

describe("client route loader registry", () => {
  it("has exactly one owner-keyed loader for every canonical owner", () => {
    const expected = [...canonicalOwners()].sort();
    const loaderKeys = Object.keys(clientRouteLoaders).sort();

    expect(new Set(expected).size).toBe(expected.length);
    expect(loaderKeys).toEqual(expected);
  });

  it("selects owners for normalized static paths", () => {
    expect(selectCurrentRouteOwner("/privacy/")).toBe("privacy");
    expect(selectCurrentRouteOwner("/pricing/")).toBe("pricing");
    expect(selectCurrentRouteOwner("/showcase/forma-studio///")).toBe("showcase-forma-studio");
  });

  it("selects the insight article owner for known and unknown insight slugs", () => {
    expect(selectCurrentRouteOwner(`/insights/${insightArticlesMeta[0].slug}/`)).toBe(
      "insight-article",
    );
    expect(selectCurrentRouteOwner("/insights/a-current-slug/")).toBe("insight-article");
  });

  it("selects the generic not-found owner for unrelated paths", () => {
    expect(selectCurrentRouteOwner("/terms")).toBe(NOT_FOUND_ROUTE_OWNER);
    expect(selectCurrentRouteOwner("/missing-page")).toBe(NOT_FOUND_ROUTE_OWNER);
  });

  it("selects a redirect target's canonical owner", () => {
    expect(selectCurrentRouteOwner("/services-pricing/")).toBe("pricing");
    expect(selectCurrentRouteOwner("/ai-digital-tools")).toBe("insights");
  });

  it("uses the selected owner for loader lookup", () => {
    expect(selectCurrentRouteLoader("/pricing/")).toBe(clientRouteLoaders.pricing);
    expect(selectCurrentRouteLoader("/insights/a-current-slug/")).toBe(
      clientRouteLoaders["insight-article"],
    );
    expect(selectCurrentRouteLoader("/missing-page")).toBe(
      clientRouteLoaders[NOT_FOUND_ROUTE_OWNER],
    );
  });

  it("preloads only the selected owner loader", async () => {
    const home = vi.fn(() => Promise.resolve({ default: () => null })) as RouteModuleLoader;
    const pricing = vi.fn(() => Promise.resolve({ default: () => null })) as RouteModuleLoader;
    const insightArticle = vi.fn(() => Promise.resolve({ default: () => null })) as RouteModuleLoader;
    const notFound = vi.fn(() => Promise.resolve({ default: () => null })) as RouteModuleLoader;
    const registry = {
      ...clientRouteLoaders,
      home,
      pricing,
      "insight-article": insightArticle,
      [NOT_FOUND_ROUTE_OWNER]: notFound,
    } satisfies ClientRouteLoaderRegistry;

    await preloadCurrentRoute("/services-pricing/", registry);

    expect(pricing).toHaveBeenCalledOnce();
    expect(home).not.toHaveBeenCalled();
    expect(insightArticle).not.toHaveBeenCalled();
    expect(notFound).not.toHaveBeenCalled();
  });

  it("preserves selected loader rejections", async () => {
    const failure = new Error("chunk unavailable");
    const pricing = vi.fn(() => Promise.reject(failure)) as RouteModuleLoader;
    const registry = { ...clientRouteLoaders, pricing } satisfies ClientRouteLoaderRegistry;

    await expect(preloadCurrentRoute("/pricing", registry)).rejects.toBe(failure);
    expect(pricing).toHaveBeenCalledOnce();
  });

  it("keeps Home lazy and preloads before React creates the root", () => {
    const app = projectFile("src/App.tsx");
    const main = projectFile("src/main.tsx");

    expect(app).not.toMatch(/import\s+Home\s+from\s+["']\.\/pages\/Home["']/);
    expect(main).toContain("preloadCurrentRoute(window.location.pathname)");
    expect(main).toMatch(/preloadCurrentRoute\(window\.location\.pathname\)\.catch\(/);
    expect(main.indexOf("preloadCurrentRoute(window.location.pathname)")).toBeLessThan(
      main.indexOf("ReactDOM.createRoot"),
    );
  });
});
