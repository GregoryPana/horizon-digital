import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { STATIC_ROUTES } from "./routes";
import {
  clientRouteLoaders,
  preloadCurrentRoute,
  selectCurrentRouteLoader,
  type ClientRouteLoaderRegistry,
  type RouteModuleLoader,
} from "./clientRouteLoaders";

const projectFile = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("client route loader registry", () => {
  it("covers every canonical static route and only those routes", () => {
    expect(Object.keys(clientRouteLoaders.static).sort()).toEqual(
      STATIC_ROUTES.map((route) => route.path).sort(),
    );
  });

  it("selects normalized static routes and insight article routes", () => {
    expect(selectCurrentRouteLoader("/pricing/")).toBe(clientRouteLoaders.static["/pricing"]);
    expect(selectCurrentRouteLoader("/insights/a-current-slug/")).toBe(
      clientRouteLoaders.insightArticle,
    );
    expect(selectCurrentRouteLoader("/missing-page")).toBe(clientRouteLoaders.notFound);
  });

  it("preloads only the selected current route module", async () => {
    const home = vi.fn(() => Promise.resolve({ default: () => null })) as RouteModuleLoader;
    const pricing = vi.fn(() => Promise.resolve({ default: () => null })) as RouteModuleLoader;
    const insightArticle = vi.fn(() => Promise.resolve({ default: () => null })) as RouteModuleLoader;
    const notFound = vi.fn(() => Promise.resolve({ default: () => null })) as RouteModuleLoader;
    const registry = {
      static: { ...clientRouteLoaders.static, "/": home, "/pricing": pricing },
      insightArticle,
      notFound,
    } as ClientRouteLoaderRegistry;

    await preloadCurrentRoute("/pricing/", registry);

    expect(pricing).toHaveBeenCalledOnce();
    expect(home).not.toHaveBeenCalled();
    expect(insightArticle).not.toHaveBeenCalled();
    expect(notFound).not.toHaveBeenCalled();
  });

  it("keeps Home lazy and preloads before React creates the root", () => {
    const app = projectFile("src/App.tsx");
    const main = projectFile("src/main.tsx");

    expect(app).not.toMatch(/import\s+Home\s+from\s+["']\.\/pages\/Home["']/);
    expect(main).toContain("preloadCurrentRoute(window.location.pathname)");
    expect(main).toMatch(/preloadCurrentRoute\(window\.location\.pathname\)\.catch\(/);
    expect(main.indexOf("preloadCurrentRoute(window.location.pathname)")).toBeLessThan(
      main.indexOf("initializeAnalytics()"),
    );
    expect(main.indexOf("preloadCurrentRoute(window.location.pathname)")).toBeLessThan(
      main.indexOf("ReactDOM.createRoot"),
    );
  });
});
