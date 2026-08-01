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
import {
  PORTFOLIO_CACHE_CONTROL,
  PORTFOLIO_CACHE_STORAGE_SECONDS,
  PORTFOLIO_FAILURE_CACHE_CONTROL,
  PORTFOLIO_FRESH_SECONDS,
  PORTFOLIO_MAX_UPSTREAM_BYTES,
  PORTFOLIO_STALE_SECONDS,
  PORTFOLIO_UPSTREAM_TIMEOUT_MS,
  buildSanityPortfolioUrl,
  mapPortfolioResponse,
} from "./lib/portfolioApi";

export type WorkerEnv = {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
};

export type WorkerExecutionContext = {
  waitUntil(promise: Promise<unknown>): void;
};

type JsonLdSchema = Record<string, unknown>;

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

const JSON_HEADERS = { "content-type": "application/json; charset=utf-8" };

export interface PortfolioCache {
  match(request: Request): Promise<Response | undefined>;
  put(request: Request, response: Response): Promise<void>;
}

function portfolioCacheKey(request: Request): Request {
  const url = new URL(request.url);
  url.search = "";
  return new Request(url.toString(), { method: "GET" });
}

async function readBoundedJson(response: Response): Promise<unknown> {
  const declaredLength = Number(response.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > PORTFOLIO_MAX_UPSTREAM_BYTES) {
    throw new Error("Sanity upstream response is too large");
  }
  if (!response.body) return JSON.parse(await response.text()) as unknown;

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    totalBytes += value.byteLength;
    if (totalBytes > PORTFOLIO_MAX_UPSTREAM_BYTES) {
      await reader.cancel().catch(() => undefined);
      throw new Error("Sanity upstream response is too large");
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(bytes)) as unknown;
}

const PORTFOLIO_CACHED_AT_HEADER = "x-horizon-cached-at";
const PORTFOLIO_FRESH_MS = PORTFOLIO_FRESH_SECONDS * 1_000;
const PORTFOLIO_USABLE_MS = (PORTFOLIO_FRESH_SECONDS + PORTFOLIO_STALE_SECONDS) * 1_000;

function publicPortfolioResponse(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.delete(PORTFOLIO_CACHED_AT_HEADER);
  headers.set("cache-control", PORTFOLIO_CACHE_CONTROL);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

function storedPortfolioResponse(response: Response, cachedAt: number): Response {
  const headers = new Headers(response.headers);
  headers.set(PORTFOLIO_CACHED_AT_HEADER, String(cachedAt));
  // Cloudflare Cache API does not implement stale-while-revalidate. Retain the
  // internal entry for the complete explicit fresh + stale window instead.
  headers.set("cache-control", `public, max-age=${PORTFOLIO_CACHE_STORAGE_SECONDS}`);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

function cachedPortfolioAge(response: Response, now: number): number | null {
  const rawCachedAt = response.headers.get(PORTFOLIO_CACHED_AT_HEADER);
  if (rawCachedAt === null) return null;
  const cachedAt = Number(rawCachedAt);
  if (!Number.isFinite(cachedAt) || cachedAt < 0) return null;
  return Math.max(0, now - cachedAt);
}

async function fetchPortfolioResponse(upstreamFetch: typeof fetch): Promise<Response> {
  const controller = new AbortController();
  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    const upstreamWork = (async () => {
      const upstreamResponse = await upstreamFetch(buildSanityPortfolioUrl(), {
        method: "GET",
        headers: { accept: "application/json" },
        signal: controller.signal,
      });
      if (!upstreamResponse.ok) {
        throw new Error(`Sanity upstream responded with ${upstreamResponse.status}`);
      }
      const payload = await readBoundedJson(upstreamResponse);
      return mapPortfolioResponse(
        payload && typeof payload === "object" ? (payload as Record<string, unknown>).result : undefined,
      );
    })();
    const timeoutWork = new Promise<never>((_resolve, reject) => {
      timeout = setTimeout(() => {
        controller.abort();
        reject(new Error("Sanity upstream timed out"));
      }, PORTFOLIO_UPSTREAM_TIMEOUT_MS);
    });
    const projects = await Promise.race([upstreamWork, timeoutWork]);
    if (projects.length === 0) throw new Error("Sanity upstream returned no valid portfolio projects");
    return new Response(JSON.stringify({ projects }), {
      status: 200,
      headers: { ...JSON_HEADERS, "cache-control": PORTFOLIO_CACHE_CONTROL },
    });
  } finally {
    if (timeout !== undefined) clearTimeout(timeout);
  }
}

function safeCachePut(cache: PortfolioCache, cacheKey: Request, response: Response): Promise<void> {
  return cache.put(cacheKey, response).catch(() => undefined);
}

export async function handlePortfolioRequest(
  request: Request,
  upstreamFetch: typeof fetch = fetch,
  cache?: PortfolioCache,
  waitUntil?: (promise: Promise<unknown>) => void,
  now: () => number = Date.now,
): Promise<Response> {
  if (request.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { ...JSON_HEADERS, allow: "GET", "cache-control": PORTFOLIO_FAILURE_CACHE_CONTROL },
    });
  }

  const cacheKey = portfolioCacheKey(request);
  const cached = cache ? await cache.match(cacheKey).catch(() => undefined) : undefined;
  const cacheAge = cached ? cachedPortfolioAge(cached, now()) : null;

  if (cached && cacheAge !== null && cacheAge < PORTFOLIO_FRESH_MS) {
    return publicPortfolioResponse(cached);
  }

  if (cached && cacheAge !== null && cacheAge <= PORTFOLIO_USABLE_MS) {
    const refresh = (async () => {
      const response = await fetchPortfolioResponse(upstreamFetch);
      if (cache) {
        await safeCachePut(cache, cacheKey, storedPortfolioResponse(response.clone(), now()));
      }
    })().catch(() => undefined);
    if (waitUntil) waitUntil(refresh);
    else void refresh;
    return publicPortfolioResponse(cached);
  }

  try {
    const response = await fetchPortfolioResponse(upstreamFetch);
    if (cache) {
      const cacheWrite = safeCachePut(cache, cacheKey, storedPortfolioResponse(response.clone(), now()));
      if (waitUntil) waitUntil(cacheWrite);
      else void cacheWrite;
    }
    return response;
  } catch {
    return new Response(JSON.stringify({ projects: [] }), {
      status: 502,
      headers: { ...JSON_HEADERS, "cache-control": PORTFOLIO_FAILURE_CACHE_CONTROL },
    });
  }
}

export function createWorker(
  upstreamFetch: typeof fetch = fetch,
  portfolioCache?: PortfolioCache,
  now: () => number = Date.now,
) {
  return {
  async fetch(request: Request, env: WorkerEnv, context?: WorkerExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const isAssetRequest = url.pathname.includes(".");
    const canonicalOrigin = SITE_URL;

    if (url.hostname === "www.horizondigitalsey.com") {
      url.hostname = "horizondigitalsey.com";
      return Response.redirect(url.toString(), 301);
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

    if (url.pathname === "/api/portfolio") {
      return handlePortfolioRequest(
        request,
        upstreamFetch,
        portfolioCache,
        context?.waitUntil.bind(context),
        now,
      );
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
}

const defaultPortfolioCache = (globalThis as unknown as { caches?: { default?: PortfolioCache } }).caches?.default;

export default createWorker(fetch, defaultPortfolioCache);
