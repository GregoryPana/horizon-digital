import {
  DEFAULT_OG_IMAGE_PATH,
  DEFAULT_ROBOTS,
  INSIGHT_NOT_FOUND_SEO,
  NOT_FOUND_SEO,
  SITE_NAME,
  SITE_URL,
  buildFullTitle,
  findRedirect,
  findStaticRoute,
  getSitemapEntries,
  matchDynamicRoute,
  normalizePathname,
  type InsightRouteMatch,
  type RouteSeo,
} from "./config/routes";

export type WorkerEnv = {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  CHAT_WEBHOOK_TOKEN?: string;
  CHAT_API_BASE?: string;
};

type JsonLdSchema = Record<string, unknown>;

const DEFAULT_CHAT_API_BASE = "https://chat.horizondigitalsey.com/webhook";
const MAX_CHAT_REQUEST_BYTES = 32_768;

function jsonResponse(body: Record<string, unknown>, status: number, extraHeaders?: HeadersInit): Response {
  return Response.json(body, {
    status,
    headers: {
      "cache-control": "no-store",
      ...extraHeaders,
    },
  });
}

export async function proxyChatRequest(
  request: Request,
  env: WorkerEnv,
  endpoint: "chat" | "lead",
): Promise<Response> {
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405, { allow: "POST" });
  }

  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return jsonResponse({ error: "Content-Type must be application/json" }, 415);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declaredLength) && declaredLength > MAX_CHAT_REQUEST_BYTES) {
    return jsonResponse({ error: "Request too large" }, 413);
  }

  if (!env.CHAT_WEBHOOK_TOKEN) {
    return jsonResponse({ error: "Chat service is not configured" }, 503);
  }

  const body = await request.arrayBuffer();
  if (body.byteLength > MAX_CHAT_REQUEST_BYTES) {
    return jsonResponse({ error: "Request too large" }, 413);
  }

  const apiBase = (env.CHAT_API_BASE ?? DEFAULT_CHAT_API_BASE).replace(/\/$/, "");
  try {
    const upstream = await fetch(`${apiBase}/${endpoint}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-chat-token": env.CHAT_WEBHOOK_TOKEN,
      },
      body,
      redirect: "error",
    });
    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        "content-type": upstream.headers.get("content-type") ?? "application/json; charset=utf-8",
        "cache-control": "no-store",
      },
    });
  } catch {
    return jsonResponse({ error: "Chat service unavailable" }, 502);
  }
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function safeJsonLd(schema: JsonLdSchema): string {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

export function buildBaseSchemas(canonical: string, seo: RouteSeo, fullTitle: string): JsonLdSchema[] {
  const organizationSchema: JsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  };
  const websiteSchema: JsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
  };
  const webPageSchema: JsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}/#webpage`,
    url: canonical,
    name: fullTitle,
    description: seo.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
  return [organizationSchema, websiteSchema, webPageSchema];
}

export function buildBlogSchema(
  article: NonNullable<InsightRouteMatch["article"]>,
  canonical: string,
): JsonLdSchema {
  const ogImage = new URL(DEFAULT_OG_IMAGE_PATH, SITE_URL).toString();
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.seoTitle,
    description: article.metaDescription,
    image: ogImage,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: ogImage },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${canonical}/#webpage` },
  };
}

export function injectRouteHtml(
  html: string,
  params: { seo: RouteSeo; canonical: string; schemas: JsonLdSchema[] },
): string {
  const { seo, canonical, schemas } = params;
  const fullTitle = buildFullTitle(seo.title);
  const ogImage = new URL(DEFAULT_OG_IMAGE_PATH, SITE_URL).toString();

  let out = html;
  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title data-rh="true">${escapeHtml(fullTitle)}</title>`);
  out = out.replace(
    /<meta\s+name="description"[^>]*>/,
    `<meta data-rh="true" name="description" content="${escapeHtml(seo.description)}" />`,
  );
  out = out.replace(
    /<meta\s+name="robots"[^>]*>/,
    `<meta data-rh="true" name="robots" content="${escapeHtml(seo.robots)}" />`,
  );

  const schemaTags = schemas
    .map((schema) => `<script type="application/ld+json" data-rh="true">${safeJsonLd(schema)}</script>`)
    .join("\n    ");

  const extraTags = [
    `<link data-rh="true" rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<meta data-rh="true" property="og:title" content="${escapeHtml(fullTitle)}" />`,
    `<meta data-rh="true" property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta data-rh="true" property="og:url" content="${escapeHtml(canonical)}" />`,
    `<meta data-rh="true" property="og:type" content="${escapeHtml(seo.ogType)}" />`,
    `<meta data-rh="true" property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
    `<meta data-rh="true" property="og:image" content="${escapeHtml(ogImage)}" />`,
    `<meta data-rh="true" name="twitter:card" content="summary_large_image" />`,
    `<meta data-rh="true" name="twitter:title" content="${escapeHtml(fullTitle)}" />`,
    `<meta data-rh="true" name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    schemaTags,
  ].join("\n    ");

  return out.replace("</head>", `    ${extraTags}\n  </head>`);
}

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const url = new URL(request.url);
    const isAssetRequest = url.pathname.includes(".");
    const canonicalOrigin = SITE_URL;

    if (url.pathname === "/api/chat") {
      return proxyChatRequest(request, env, "chat");
    }
    if (url.pathname === "/api/lead") {
      return proxyChatRequest(request, env, "lead");
    }

    if (url.pathname === "/robots.txt") {
      const body = `User-agent: *\nAllow: /\nHost: horizondigitalsey.com\n\nSitemap: ${canonicalOrigin}/sitemap.xml`;
      return new Response(body, {
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }

    if (url.pathname === "/sitemap.xml") {
      const todayIso = new Date().toISOString().split("T")[0];
      const entries = getSitemapEntries(todayIso);
      const urls = entries
        .map(
          (entry) =>
            `  <url>\n    <loc>${canonicalOrigin}${entry.path}</loc>\n    <lastmod>${entry.lastmod}</lastmod>\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`,
        )
        .join("\n");

      const body =
        `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

      return new Response(body, {
        headers: { "content-type": "application/xml; charset=utf-8" },
      });
    }

    if (isAssetRequest) {
      return env.ASSETS.fetch(request);
    }

    const redirect = findRedirect(url.pathname);
    if (redirect) {
      return Response.redirect(new URL(redirect.to, url.origin).toString(), redirect.status);
    }

    const canonicalPath = normalizePathname(url.pathname);
    if (canonicalPath !== url.pathname) {
      const normalizedUrl = new URL(request.url);
      normalizedUrl.pathname = canonicalPath;
      return Response.redirect(normalizedUrl.toString(), 301);
    }
    const canonical = new URL(canonicalPath, canonicalOrigin).toString();
    const staticRoute = findStaticRoute(url.pathname);
    const dynamicMatch = !staticRoute ? matchDynamicRoute(url.pathname) : undefined;

    let status: 200 | 404 = 404;
    let seo: RouteSeo = NOT_FOUND_SEO;
    let schemas: JsonLdSchema[] = [];

    if (staticRoute) {
      status = 200;
      seo = staticRoute.seo;
      schemas = buildBaseSchemas(canonical, seo, buildFullTitle(seo.title));
    } else if (dynamicMatch?.article) {
      status = 200;
      const { article } = dynamicMatch;
      seo = {
        title: article.seoTitle,
        description: article.metaDescription,
        keywords: article.keywords,
        robots: DEFAULT_ROBOTS,
        ogType: "article",
      };
      schemas = [
        ...buildBaseSchemas(canonical, seo, buildFullTitle(seo.title)),
        buildBlogSchema(article, canonical),
      ];
    } else if (dynamicMatch) {
      status = 404;
      seo = INSIGHT_NOT_FOUND_SEO;
      schemas = buildBaseSchemas(canonical, seo, buildFullTitle(seo.title));
    } else {
      status = 404;
      seo = NOT_FOUND_SEO;
      schemas = buildBaseSchemas(canonical, seo, buildFullTitle(seo.title));
    }

    const shellResponse = await env.ASSETS.fetch(new Request(new URL("/", url).toString(), request));
    const shellHtml = await shellResponse.text();
    const html = injectRouteHtml(shellHtml, { seo, canonical, schemas });

    const headers = new Headers(shellResponse.headers);
    headers.set("content-type", "text/html; charset=utf-8");
    headers.delete("content-length");
    headers.delete("content-encoding");
    headers.delete("etag");
    if (status === 404) {
      headers.set("x-robots-tag", "noindex, follow");
    }

    return new Response(html, {
      status,
      headers,
    });
  },
};
