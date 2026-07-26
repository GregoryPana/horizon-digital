import { describe, it, expect } from "vitest";
import {
  STATIC_ROUTES,
  REDIRECTS,
  DYNAMIC_ROUTES,
  findStaticRoute,
  findRedirect,
  matchDynamicRoute,
  getSitemapEntries,
  normalizePathname,
  buildFullTitle,
  SITE_NAME,
} from "./routes";
import { insightArticlesMeta } from "../data/insightsMeta";

describe("route registry uniqueness", () => {
  it("has no duplicate static route paths", () => {
    const paths = STATIC_ROUTES.map((route) => route.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("has no overlap between static routes and redirect sources", () => {
    const staticPaths = new Set(STATIC_ROUTES.map((route) => route.path));
    for (const redirect of REDIRECTS) {
      expect(staticPaths.has(redirect.path)).toBe(false);
    }
  });

  it("has no duplicate redirect source paths", () => {
    const paths = REDIRECTS.map((redirect) => redirect.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("redirects only point to real static routes", () => {
    const staticPaths = new Set(STATIC_ROUTES.map((route) => route.path));
    for (const redirect of REDIRECTS) {
      expect(staticPaths.has(redirect.to)).toBe(true);
    }
  });
});

describe("canonical and redirect logic", () => {
  it("treats /pricing as canonical and indexable", () => {
    const route = findStaticRoute("/pricing");
    expect(route).toBeDefined();
    expect(route?.seo.robots).toContain("index,follow");
    expect(route?.sitemap).not.toBeNull();
  });

  it("redirects /services-pricing to /pricing permanently", () => {
    const redirect = findRedirect("/services-pricing");
    expect(redirect).toEqual({ kind: "redirect", path: "/services-pricing", to: "/pricing", status: 301 });
  });

  it("redirects /ai-digital-tools to /insights permanently", () => {
    const redirect = findRedirect("/ai-digital-tools");
    expect(redirect?.to).toBe("/insights");
    expect(redirect?.status).toBe(301);
  });

  it("does not find a redirect for an unrelated path", () => {
    expect(findRedirect("/pricing")).toBeUndefined();
  });

  it("normalizes trailing slashes but keeps root path", () => {
    expect(normalizePathname("/pricing/")).toBe("/pricing");
    expect(normalizePathname("/")).toBe("/");
    expect(normalizePathname("/pricing")).toBe("/pricing");
  });
});

describe("dynamic insight routes", () => {
  it("matches a known insight slug with its article", () => {
    const known = insightArticlesMeta[0];
    const match = matchDynamicRoute(`/insights/${known.slug}`);
    expect(match).toBeDefined();
    expect(match?.article?.slug).toBe(known.slug);
  });

  it("matches an unknown insight slug but returns no article", () => {
    const match = matchDynamicRoute("/insights/this-slug-does-not-exist");
    expect(match).toBeDefined();
    expect(match?.article).toBeUndefined();
  });

  it("does not match unrelated paths", () => {
    expect(matchDynamicRoute("/pricing")).toBeUndefined();
    expect(matchDynamicRoute("/insights")).toBeUndefined();
  });

  it("does not match nested extra path segments", () => {
    expect(matchDynamicRoute("/insights/some-slug/extra")).toBeUndefined();
  });
});

describe("sitemap membership", () => {
  const entries = getSitemapEntries("2026-07-26");
  const paths = entries.map((entry) => entry.path);

  it("includes canonical /pricing", () => {
    expect(paths).toContain("/pricing");
  });

  it("excludes the /services-pricing redirect source", () => {
    expect(paths).not.toContain("/services-pricing");
  });

  it("excludes noindex showcase demo routes", () => {
    expect(paths).not.toContain("/showcase/forma-studio");
    expect(paths).not.toContain("/showcase/takamaka-house");
  });

  it("includes the indexable showcase case study", () => {
    expect(paths).toContain("/showcase/drake-seaside");
  });

  it("includes every insight article once", () => {
    for (const article of insightArticlesMeta) {
      expect(paths.filter((path) => path === `/insights/${article.slug}`)).toHaveLength(1);
    }
  });

  it("has no duplicate sitemap entries", () => {
    expect(new Set(paths).size).toBe(paths.length);
  });
});

describe("title helper", () => {
  it("appends the site name when absent", () => {
    expect(buildFullTitle("Some Page")).toBe(`Some Page | ${SITE_NAME}`);
  });

  it("does not double up the site name when already present", () => {
    const title = `Some Page | ${SITE_NAME}`;
    expect(buildFullTitle(title)).toBe(title);
  });
});

describe("dynamic route sanity", () => {
  it("defines exactly the /insights base path", () => {
    expect(DYNAMIC_ROUTES.map((route) => route.basePath)).toEqual(["/insights"]);
  });
});
