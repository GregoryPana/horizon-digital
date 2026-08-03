// Single authoritative route/SEO registry for Horizon Digital.
//
// Consumed by:
//  - src/App.tsx (client React Router: path strings + redirect targets)
//  - src/worker.ts (Cloudflare Worker: status codes, redirects, sitemap, raw HTML metadata/JSON-LD)
//  - src/components/Seo.tsx and page components (shared SEO defaults)
//
// Bundler constraint: this module (and everything it imports) must stay free of
// binary asset imports (images, fonts). The Worker is bundled by Wrangler/esbuild
// directly from src/worker.ts with no image loader configured, so pulling in
// modules like src/data/site.ts or src/data/insights.ts (which import images)
// here would break the Worker build. src/data/insightsMeta.ts exists specifically
// as the image-free projection of insight article SEO fields for this reason.
import { insightArticlesMeta } from "../data/insightsMeta";

export const SITE_URL = "https://horizondigitalsey.com";
export const SITE_NAME = "Horizon Digital";
export const DEFAULT_OG_IMAGE_PATH = "/og-image.png";

export type RouteSeo = {
  title: string;
  description: string;
  keywords?: string;
  robots: string;
  ogType: "website" | "article";
};

export type SitemapMeta = {
  priority: string;
  changefreq: string;
};

export type StaticRoute = {
  kind: "static";
  path: string;
  seo: RouteSeo;
  sitemap: SitemapMeta | null;
};

export type RedirectRoute = {
  kind: "redirect";
  path: string;
  to: string;
  status: 301;
};

export type DynamicRoute = {
  kind: "dynamic";
  basePath: string;
  paramName: string;
  sitemap: SitemapMeta;
};

export const DEFAULT_ROBOTS = "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";

export const NOT_FOUND_SEO: RouteSeo = {
  title: "Page Not Found",
  description: "The page you requested could not be found.",
  robots: "noindex,follow",
  ogType: "website",
};

export const INSIGHT_NOT_FOUND_SEO: RouteSeo = {
  title: "Insight Not Found",
  description: "The requested insight article could not be found.",
  robots: "noindex,follow",
  ogType: "website",
};

export const SERVICES_SEO: RouteSeo = {
  title: "Website, SEO & Analytics Services Seychelles | Horizon Digital",
  description:
    "Explore custom website design, SEO review and implementation, analytics setup and Google Business Profile support for Seychelles businesses.",
  keywords:
    "website services Seychelles, SEO consultation Seychelles, analytics setup Seychelles, Google Business Profile Seychelles",
  robots: DEFAULT_ROBOTS,
  ogType: "website",
};

export const WEB_DESIGN_SEO: RouteSeo = {
  title: "Web Design Seychelles | Custom Websites | Horizon Digital",
  description: "Custom website planning, design and development for Seychelles businesses, including new websites, redesigns, responsive layouts and technical SEO foundations.",
  keywords: "web design Seychelles, custom websites Seychelles, website redesign Seychelles",
  robots: DEFAULT_ROBOTS,
  ogType: "website",
};

export const SEO_SERVICES_SEO: RouteSeo = {
  title: "SEO Review & Implementation Seychelles | Horizon Digital",
  description: "Practical technical and on-page SEO review for Seychelles businesses, with clear recommendations and separately scoped implementation support.",
  keywords: "SEO services Seychelles, SEO consultation Seychelles, website SEO review Seychelles, technical SEO Seychelles",
  robots: DEFAULT_ROBOTS,
  ogType: "website",
};

export const ANALYTICS_PRESENCE_SEO: RouteSeo = {
  title: "Analytics & Google Business Profile Seychelles | Horizon Digital",
  description: "Basic website analytics setup and Google Business Profile support for Seychelles businesses, subject to access, consent and verified business details.",
  keywords: "website analytics setup Seychelles, Google Analytics setup Seychelles, Google Business Profile Seychelles, digital presence Seychelles",
  robots: DEFAULT_ROBOTS,
  ogType: "website",
};

export const STATIC_ROUTES: StaticRoute[] = [
  {
    kind: "static",
    path: "/",
    seo: {
      title: "Custom Website Design Seychelles | Horizon Digital",
      description:
        "Custom-built websites for Seychelles businesses, with responsive design, clear contact paths and technical SEO foundations.",
      keywords:
        "custom website Seychelles, custom web design Seychelles, custom web development Seychelles, website design Seychelles, bespoke websites Seychelles",
      robots: DEFAULT_ROBOTS,
      ogType: "website",
    },
    sitemap: { priority: "1.0", changefreq: "weekly" },
  },
  {
    kind: "static",
    path: "/what-you-need",
    seo: {
      title: "Choosing the Right Custom Website | Horizon Digital",
      description:
        "A guide to understanding custom website options for your Seychelles business. Learn about domains, hosting, and finding the perfect custom web solution.",
      keywords: "what custom website do I need, bespoke business website types Seychelles, custom web design guidance",
      robots: DEFAULT_ROBOTS,
      ogType: "website",
    },
    sitemap: { priority: "0.9", changefreq: "monthly" },
  },
  {
    kind: "static",
    path: "/work",
    seo: {
      title: "Custom Website Portfolio Seychelles | Horizon Digital",
      description:
        "Explore the Horizon Digital website portfolio. We build custom websites designed to communicate clearly, perform fast, and support real business needs in Seychelles.",
      keywords:
        "custom website portfolio Seychelles, bespoke web design examples Seychelles, custom-built business websites Seychelles, tailored web development showcase",
      robots: DEFAULT_ROBOTS,
      ogType: "website",
    },
    sitemap: { priority: "0.8", changefreq: "monthly" },
  },
  {
    kind: "static",
    path: "/services",
    seo: SERVICES_SEO,
    sitemap: { priority: "0.9", changefreq: "monthly" },
  },
  {
    kind: "static",
    path: "/pricing",
    seo: {
      title: "Custom Website Packages & Pricing in Seychelles | Horizon Digital",
      description:
        "Website packages for Seychelles businesses, with published SCR starting prices, defined inclusions and custom design.",
      keywords:
        "custom website packages Seychelles, custom web design pricing Seychelles, bespoke website development Seychelles, tailored web solutions Seychelles",
      robots: DEFAULT_ROBOTS,
      ogType: "website",
    },
    sitemap: { priority: "0.9", changefreq: "monthly" },
  },
  {
    kind: "static",
    path: "/process",
    seo: {
      title: "How We Build Your Website | Horizon Digital",
      description:
        "A clear, step-by-step look at how Horizon Digital takes your website from the first chat through launch and package-based support.",
      keywords: "website build process Seychelles, how to build a website, web design timeline, website project steps",
      robots: DEFAULT_ROBOTS,
      ogType: "website",
    },
    sitemap: { priority: "0.7", changefreq: "monthly" },
  },
  {
    kind: "static",
    path: "/insights",
    seo: {
      title: "Digital Insights for Businesses in Seychelles",
      description:
        "Educational articles from Horizon Digital on AI, automation, analytics, and digital trends relevant to businesses in Seychelles.",
      keywords:
        "AI Seychelles, Artificial Intelligence Seychelles, digital transformation Seychelles, automation tools for businesses, AI for small businesses Seychelles",
      robots: DEFAULT_ROBOTS,
      ogType: "website",
    },
    sitemap: { priority: "0.8", changefreq: "weekly" },
  },
  {
    kind: "static",
    path: "/about",
    seo: {
      title: "Custom Website Design Studio Seychelles | About Horizon Digital",
      description:
        "Horizon Digital is a Mahé-based studio that plans, designs and builds custom websites for Seychelles businesses.",
      keywords:
        "about Horizon Digital, custom web design studio Seychelles, bespoke website designer Seychelles, custom web development",
      robots: DEFAULT_ROBOTS,
      ogType: "website",
    },
    sitemap: { priority: "0.7", changefreq: "monthly" },
  },
  {
    kind: "static",
    path: "/contact",
    seo: {
      title: "Custom Website Project Seychelles | Horizon Digital",
      description:
        "Discuss a custom website project for your Seychelles business, including scope, timeline, starting budget and contact requirements.",
      keywords: "contact custom web designer Seychelles, start custom website project Seychelles, bespoke web solutions",
      robots: DEFAULT_ROBOTS,
      ogType: "website",
    },
    sitemap: { priority: "0.7", changefreq: "monthly" },
  },
  {
    kind: "static",
    path: "/showcase/forma-studio",
    seo: {
      title: "Forma Studio Showcase",
      description:
        "View the Forma Studio website showcase by Horizon Digital, including layout, storytelling flow, and visual direction.",
      robots: "noindex,nofollow",
      ogType: "website",
    },
    sitemap: null,
  },
  {
    kind: "static",
    path: "/showcase/takamaka-house",
    seo: {
      title: "Takamaka House Showcase",
      description:
        "Explore the Takamaka House showcase by Horizon Digital, focused on accommodation storytelling and clear booking intent.",
      robots: "noindex,nofollow",
      ogType: "website",
    },
    sitemap: null,
  },
  {
    kind: "static",
    path: "/showcase/drake-seaside",
    seo: {
      title: "Drake Seaside Apartments Website Project | Horizon Digital",
      description:
        "A live client website redesign for Drake Seaside Apartments, with updated pages, responsive layouts and direct contact paths.",
      robots: DEFAULT_ROBOTS,
      ogType: "website",
    },
    sitemap: { priority: "0.7", changefreq: "monthly" },
  },
  {
    kind: "static",
    path: "/web-design-seychelles",
    seo: WEB_DESIGN_SEO,
    sitemap: { priority: "1.0", changefreq: "monthly" },
  },
  {
    kind: "static",
    path: "/seo-services-seychelles",
    seo: SEO_SERVICES_SEO,
    sitemap: { priority: "0.8", changefreq: "monthly" },
  },
  {
    kind: "static",
    path: "/analytics-and-digital-presence-seychelles",
    seo: ANALYTICS_PRESENCE_SEO,
    sitemap: { priority: "0.8", changefreq: "monthly" },
  },
];

export const REDIRECTS: RedirectRoute[] = [
  { kind: "redirect", path: "/services-pricing", to: "/pricing", status: 301 },
  { kind: "redirect", path: "/ai-digital-tools", to: "/insights", status: 301 },
];

export const DYNAMIC_ROUTES: DynamicRoute[] = [
  {
    kind: "dynamic",
    basePath: "/insights",
    paramName: "slug",
    sitemap: { priority: "0.7", changefreq: "monthly" },
  },
];

export function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.replace(/\/+$/, "") || "/";
  }
  return pathname;
}

export function findStaticRoute(pathname: string): StaticRoute | undefined {
  const normalized = normalizePathname(pathname);
  return STATIC_ROUTES.find((route) => route.path === normalized);
}

export function findRedirect(pathname: string): RedirectRoute | undefined {
  const normalized = normalizePathname(pathname);
  return REDIRECTS.find((redirect) => redirect.path === normalized);
}

export type InsightRouteMatch = {
  route: DynamicRoute;
  slug: string;
  article: (typeof insightArticlesMeta)[number] | undefined;
};

export function matchDynamicRoute(pathname: string): InsightRouteMatch | undefined {
  const normalized = normalizePathname(pathname);
  for (const route of DYNAMIC_ROUTES) {
    const prefix = `${route.basePath}/`;
    if (normalized.startsWith(prefix) && normalized.length > prefix.length) {
      const remainder = normalized.slice(prefix.length);
      if (remainder.includes("/")) continue;
      const article = insightArticlesMeta.find((item) => item.slug === remainder);
      return { route, slug: remainder, article };
    }
  }
  return undefined;
}

export type SitemapEntry = {
  path: string;
  priority: string;
  changefreq: string;
  lastmod: string;
};

export function getSitemapEntries(todayIso: string): SitemapEntry[] {
  const staticEntries: SitemapEntry[] = STATIC_ROUTES.filter((route) => route.sitemap !== null).map((route) => ({
    path: route.path,
    priority: route.sitemap!.priority,
    changefreq: route.sitemap!.changefreq,
    lastmod: todayIso,
  }));

  const dynamicEntries: SitemapEntry[] = DYNAMIC_ROUTES.flatMap((route) => {
    if (route.basePath === "/insights") {
      return insightArticlesMeta.map((article) => ({
        path: `${route.basePath}/${article.slug}`,
        priority: route.sitemap.priority,
        changefreq: route.sitemap.changefreq,
        lastmod: article.dateModified,
      }));
    }
    return [];
  });

  return [...staticEntries, ...dynamicEntries];
}

export function buildFullTitle(title: string): string {
  return title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
}
