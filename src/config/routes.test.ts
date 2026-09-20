import { describe, it, expect } from "vitest";
import { clientRouteLoaders } from "./clientRouteLoaders";
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
  SITE_URL,
  DEFAULT_ROBOTS,
  SERVICES_SEO,
  WEB_DESIGN_SEO,
  SEO_SERVICES_SEO,
  ANALYTICS_PRESENCE_SEO,
  CLIENT_ROUTE_OWNERS,
  NOT_FOUND_ROUTE_OWNER,
  type ClientRouteOwner,
} from "./routes";
import { insightArticlesMeta } from "../data/insightsMeta";

const servicePillars = [
  ["/web-design-seychelles", "web-design-seychelles", WEB_DESIGN_SEO],
  ["/seo-services-seychelles", "seo-services-seychelles", SEO_SERVICES_SEO],
  [
    "/analytics-and-digital-presence-seychelles",
    "analytics-digital-presence-seychelles",
    ANALYTICS_PRESENCE_SEO,
  ],
] as const satisfies readonly (readonly [string, ClientRouteOwner, typeof WEB_DESIGN_SEO])[];

describe("route registry uniqueness", () => {
  it("assigns a valid unique owner to every canonical static and dynamic route", () => {
    const owners = [
      ...STATIC_ROUTES.map((route) => route.owner),
      ...DYNAMIC_ROUTES.map((route) => route.owner),
    ];
    expect(owners.every((owner) => CLIENT_ROUTE_OWNERS.includes(owner))).toBe(true);
    expect(new Set(owners).size).toBe(owners.length);
  });

  it("exports the generic not-found owner outside canonical path records", () => {
    expect(NOT_FOUND_ROUTE_OWNER).toBe("not-found");
    expect(STATIC_ROUTES.some((route) => route.owner === NOT_FOUND_ROUTE_OWNER)).toBe(false);
    expect(DYNAMIC_ROUTES.some((route) => route.owner === NOT_FOUND_ROUTE_OWNER)).toBe(false);
  });

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
  it("treats /services as its own canonical and indexable route", () => {
    const route = findStaticRoute("/services");
    expect(route).toBeDefined();
    expect(route?.path).toBe("/services");
    expect(route?.seo).toBe(SERVICES_SEO);
    expect(route?.seo).toEqual({
      title: "Website, SEO & Analytics Services Seychelles | Horizon Digital",
      description:
        "Explore custom website design, SEO review and implementation, analytics setup and Google Business Profile support for Seychelles businesses.",
      keywords:
        "website services Seychelles, SEO consultation Seychelles, analytics setup Seychelles, Google Business Profile Seychelles",
      robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
      ogType: "website",
    });
    expect(buildFullTitle(route!.seo.title)).toBe(route!.seo.title);
    expect(new URL(route!.path, SITE_URL).toString()).toBe("https://horizondigitalsey.com/services");
    expect(route?.seo.robots).toContain("index,follow");
    expect(route?.sitemap).not.toBeNull();
    expect(findRedirect("/services")).toBeUndefined();
  });

  it("registers all three root-level service pillars with exact metadata", () => {
    expect([
      WEB_DESIGN_SEO.title,
      SEO_SERVICES_SEO.title,
      ANALYTICS_PRESENCE_SEO.title,
    ]).toEqual([
      "Web Design Seychelles | Custom Websites | Horizon Digital",
      "SEO Review & Implementation Seychelles | Horizon Digital",
      "Analytics & Google Business Profile Seychelles | Horizon Digital",
    ]);
    for (const [path, owner, seo] of servicePillars) {
      const route = findStaticRoute(path);
      expect(route?.owner).toBe(owner);
      expect(route?.seo).toEqual(seo);
      expect(route?.seo.title).toBe(seo.title);
      expect(route?.seo.description).toBe(seo.description);
      expect(route?.seo.robots).toBe(DEFAULT_ROBOTS);
      expect(route?.sitemap).not.toBeNull();
    }
    expect(STATIC_ROUTES.some((route) => route.path.startsWith("/services/"))).toBe(false);
  });

  it("registers every pillar in the lazy client route map", () => {
    for (const [, owner] of servicePillars) {
      expect(clientRouteLoaders[owner]).toBeTypeOf("function");
    }
  });

  it("does not register unknown nested Services aliases", () => {
    for (const path of ["/services/web-design", "/services/seo", "/services/analytics"]) {
      expect(findStaticRoute(path)).toBeUndefined();
      expect(findRedirect(path)).toBeUndefined();
      expect(matchDynamicRoute(path)).toBeUndefined();
    }
  });

  it("registers /privacy with exact metadata and no /terms route", () => {
    const privacy = findStaticRoute("/privacy");
    expect(privacy).toEqual({
      kind: "static",
      owner: "privacy",
      path: "/privacy",
      seo: {
        title: "Privacy | Horizon Digital",
        description:
          "How Horizon Digital handles enquiry details, necessary security verification and optional analytics preferences.",
        robots: DEFAULT_ROBOTS,
        ogType: "website",
      },
      sitemap: { priority: "0.2", changefreq: "yearly" },
    });
    expect(findStaticRoute("/terms")).toBeUndefined();
    expect(findRedirect("/terms")).toBeUndefined();
  });

  it("treats /pricing as canonical and indexable", () => {
    const route = findStaticRoute("/pricing");
    expect(route).toBeDefined();
    expect(route?.seo.robots).toContain("index,follow");
    expect(route?.sitemap).not.toBeNull();
  });

  it("registers the truthful Process description", () => {
    const route = findStaticRoute("/process");
    expect(route?.seo.description).toBe(
      "A clear, step-by-step look at how Horizon Digital takes your website from the first chat through launch and package-based support.",
    );
    expect(route?.seo.description).not.toContain("actually enjoy");
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

  it("redirects the short restaurant campaign path to the noindex concept", () => {
    expect(findRedirect("/restaurant-concept")).toEqual({
      kind: "redirect",
      path: "/restaurant-concept",
      to: "/showcase/restaurant-website-concept",
      status: 301,
    });
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

  it("includes /privacy once with conservative sitemap metadata and no /terms", () => {
    expect(entries.filter((entry) => entry.path === "/privacy")).toEqual([
      {
        path: "/privacy",
        priority: "0.2",
        changefreq: "yearly",
        lastmod: "2026-07-26",
      },
    ]);
    expect(paths).not.toContain("/terms");
  });

  it("includes canonical /services separately from /pricing", () => {
    expect(paths).toContain("/services");
    expect(paths).toContain("/pricing");
    expect(paths.filter((path) => path === "/services")).toHaveLength(1);
  });

  it("includes every service pillar exactly once", () => {
    for (const [path] of servicePillars) {
      expect(paths.filter((entry) => entry === path)).toHaveLength(1);
    }
  });

  it("excludes the /services-pricing redirect source", () => {
    expect(paths).not.toContain("/services-pricing");
    expect(paths).not.toContain("/restaurant-concept");
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
