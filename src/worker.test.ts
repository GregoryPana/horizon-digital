import { readFileSync } from "node:fs";
import { afterEach, describe, it, expect, vi } from "vitest";
import worker, { createWorker, escapeHtml, safeJsonLd, injectRouteHtml, type PortfolioCache, type WorkerEnv } from "./worker";
import { insightArticlesMeta } from "./data/insightsMeta";
import {
  ANALYTICS_PRESENCE_SEO,
  SEO_SERVICES_SEO,
  WEB_DESIGN_SEO,
  buildFullTitle,
} from "./config/routes";
import {
  PORTFOLIO_CACHE_CONTROL,
  PORTFOLIO_FAILURE_CACHE_CONTROL,
  PORTFOLIO_FRESH_SECONDS,
  PORTFOLIO_STALE_SECONDS,
} from "./lib/portfolioApi";

const SHELL_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Placeholder Title</title>
    <meta name="description" data-rh="true" content="Placeholder description" />
    <meta name="robots" data-rh="true" content="index,follow" />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

const indexHtmlSource = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const servicePillars = [
  ["/web-design-seychelles", WEB_DESIGN_SEO],
  ["/seo-services-seychelles", SEO_SERVICES_SEO],
  ["/analytics-and-digital-presence-seychelles", ANALYTICS_PRESENCE_SEO],
] as const;

function makeEnv(): WorkerEnv {
  return {
    ASSETS: {
      fetch: async (request) => {
        if (new URL(request.url).pathname !== "/") {
          return new Response("Not Found", { status: 404 });
        }
        return new Response(SHELL_HTML, {
          headers: {
            "content-type": "text/html",
            "cache-control": "public, max-age=60",
            etag: '"stale-shell-etag"',
          },
        });
      },
    },
  };
}

describe("escapeHtml", () => {
  it("escapes html-significant characters", () => {
    expect(escapeHtml(`<script>"quote" & 'apos'</script>`)).toBe(
      "&lt;script&gt;&quot;quote&quot; &amp; &#39;apos&#39;&lt;/script&gt;",
    );
  });
});

describe("safeJsonLd", () => {
  it("escapes closing script tags to prevent breakout", () => {
    const json = safeJsonLd({ name: "</script><script>alert(1)</script>" });
    expect(json).not.toContain("</script>");
    expect(json).toContain("\\u003c/script>");
  });
});

describe("injectRouteHtml", () => {
  const seo = {
    title: "Test Page",
    description: "A test description",
    robots: "noindex,follow",
    ogType: "website" as const,
  };

  it("replaces title, description and robots with data-rh tags", () => {
    const html = injectRouteHtml(SHELL_HTML, {
      seo,
      canonical: "https://horizondigitalsey.com/test",
      schemas: [],
    });
    expect(html).toContain('<title data-rh="true">Test Page | Horizon Digital</title>');
    expect(html).not.toContain("Placeholder Title");
    expect(html).toContain('name="description" content="A test description"');
    expect(html).toContain('name="robots" content="noindex,follow"');
    expect(html).toContain('rel="canonical" href="https://horizondigitalsey.com/test"');
    expect(html.match(/<meta[^>]+name="description"[^>]*>/g)).toHaveLength(1);
    expect(html.match(/<meta[^>]+name="robots"[^>]*>/g)).toHaveLength(1);
  });

  it("keeps Helmet ownership on static fallbacks without breaking Worker name-first matching", () => {
    expect(indexHtmlSource).toMatch(/<meta\s+name="description"\s+data-rh="true"[\s\S]*?>/);
    expect(indexHtmlSource).toMatch(/<meta\s+name="robots"\s+data-rh="true"[^>]*>/);

    const html = injectRouteHtml(indexHtmlSource, {
      seo,
      canonical: "https://horizondigitalsey.com/test",
      schemas: [],
    });
    expect(html.match(/<meta[^>]+name="description"[^>]*>/g)).toHaveLength(1);
    expect(html.match(/<meta[^>]+name="robots"[^>]*>/g)).toHaveLength(1);
    expect(html).toContain('name="description" content="A test description"');
    expect(html).toContain('name="robots" content="noindex,follow"');
  });

  it("embeds escaped JSON-LD schemas before </head>", () => {
    const html = injectRouteHtml(SHELL_HTML, {
      seo,
      canonical: "https://horizondigitalsey.com/test",
      schemas: [{ "@type": "WebPage", name: "</script>" }],
    });
    expect(html).toContain('type="application/ld+json" data-rh="true"');
    expect(html).toContain("\\u003c/script>");
    expect(html.indexOf("application/ld+json")).toBeLessThan(html.indexOf("</head>"));
  });
});

describe("worker fetch handler", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("permanently redirects www requests to the canonical apex", async () => {
    const response = await worker.fetch(
      new Request("https://www.horizondigitalsey.com/pricing?source=www"),
      makeEnv(),
    );
    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toBe(
      "https://horizondigitalsey.com/pricing?source=www",
    );
  });

  it("returns 200 for the canonical /pricing route", async () => {
    const response = await worker.fetch(new Request("https://horizondigitalsey.com/pricing"), makeEnv());
    expect(response.status).toBe(200);
    const body = await response.text();
    expect(body).toContain("Custom Website Packages");
  });

  it("returns canonical /services with the unique registry metadata in raw HTML", async () => {
    const response = await worker.fetch(new Request("https://horizondigitalsey.com/services"), makeEnv());
    expect(response.status).toBe(200);
    const body = await response.text();
    expect(body).toContain("<title data-rh=\"true\">Website, SEO &amp; Analytics Services Seychelles | Horizon Digital</title>");
    expect(body).toContain('name="description" content="Explore custom website design, SEO review and implementation, analytics setup and Google Business Profile support for Seychelles businesses."');
    expect(body).toContain('rel="canonical" href="https://horizondigitalsey.com/services"');
    expect(body.match(/<title[^>]*>[^<]*Horizon Digital[^<]*<\/title>/g)).toHaveLength(1);
    expect(body).not.toContain("Horizon Digital | Horizon Digital");
  });

  it.each(servicePillars)(
    "returns exact raw metadata, canonical, robots and base schema for %s",
    async (path, seo) => {
      const response = await worker.fetch(
        new Request(`https://horizondigitalsey.com${path}`),
        makeEnv(),
      );
      expect(response.status).toBe(200);
      const body = await response.text();
      expect(body).toContain(`<title data-rh="true">${escapeHtml(buildFullTitle(seo.title))}</title>`);
      expect(body).toContain(`name="description" content="${escapeHtml(seo.description)}"`);
      expect(body).toContain(`name="robots" content="${seo.robots}"`);
      expect(body).toContain(`rel="canonical" href="https://horizondigitalsey.com${path}"`);
      expect(body).toContain('\"@type\":\"WebPage\"');
      expect(body).toContain(`\"url\":\"https://horizondigitalsey.com${path}\"`);
      expect(body.match(/<meta[^>]+name="robots"[^>]*>/g)).toHaveLength(1);
    },
  );

  it.each(["/services/web-design", "/services/seo", "/services/analytics"])(
    "returns a genuine noindex 404 for unknown nested route %s",
    async (path) => {
      const response = await worker.fetch(
        new Request(`https://horizondigitalsey.com${path}`),
        makeEnv(),
      );
      expect(response.status).toBe(404);
      expect(response.headers.get("x-robots-tag")).toBe("noindex, follow");
      expect(await response.text()).toContain('name="robots" content="noindex,follow"');
    },
  );

  it("redirects /services-pricing to /pricing with 301", async () => {
    const response = await worker.fetch(
      new Request("https://horizondigitalsey.com/services-pricing"),
      makeEnv(),
    );
    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toBe("https://horizondigitalsey.com/pricing");
  });

  it("keeps redirects on the request origin during local development", async () => {
    const response = await worker.fetch(new Request("http://127.0.0.1:8787/services-pricing"), makeEnv());
    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toBe("http://127.0.0.1:8787/pricing");
  });

  it("preserves campaign parameters through the short restaurant redirect", async () => {
    const response = await worker.fetch(
      new Request(
        "https://horizondigitalsey.com/restaurant-concept?utm_source=instagram&utm_medium=social&utm_campaign=restaurant_outreach_cycle02&utm_content=ig_carousel_restaurant_website_essentials",
      ),
      makeEnv(),
    );

    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toBe(
      "https://horizondigitalsey.com/showcase/restaurant-website-concept?utm_source=instagram&utm_medium=social&utm_campaign=restaurant_outreach_cycle02&utm_content=ig_carousel_restaurant_website_essentials",
    );
  });

  it("permanently normalizes trailing slashes", async () => {
    const response = await worker.fetch(new Request("https://horizondigitalsey.com/pricing/"), makeEnv());
    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toBe("https://horizondigitalsey.com/pricing");
  });

  it("returns a genuine 404 for an unknown route with noindex body", async () => {
    const response = await worker.fetch(
      new Request("https://horizondigitalsey.com/this-route-does-not-exist"),
      makeEnv(),
    );
    expect(response.status).toBe(404);
    const body = await response.text();
    expect(body).toContain('name="robots" content="noindex,follow"');
    expect(body).toContain("Page Not Found");
    expect(response.headers.get("x-robots-tag")).toBe("noindex, follow");
  });

  it("preserves safe shell response headers but drops stale entity headers", async () => {
    const response = await worker.fetch(new Request("https://horizondigitalsey.com/pricing"), makeEnv());
    expect(response.headers.get("cache-control")).toBe("public, max-age=60");
    expect(response.headers.get("etag")).toBeNull();
    expect(response.headers.get("content-type")).toBe("text/html; charset=utf-8");
  });

  it("returns 200 with BlogPosting schema for a valid insight article", async () => {
    const known = insightArticlesMeta[0];
    const response = await worker.fetch(
      new Request(`https://horizondigitalsey.com/insights/${known.slug}`),
      makeEnv(),
    );
    expect(response.status).toBe(200);
    const body = await response.text();
    expect(body).toContain("BlogPosting");
    expect(body).toContain(known.seoTitle.replace(/</g, "&lt;"));
  });

  it("returns 404 with noindex for an unknown insight slug", async () => {
    const response = await worker.fetch(
      new Request("https://horizondigitalsey.com/insights/not-a-real-slug"),
      makeEnv(),
    );
    expect(response.status).toBe(404);
    const body = await response.text();
    expect(body).toContain("Insight Not Found");
    expect(body).toContain('name="robots" content="noindex,follow"');
  });

  it("passes through asset requests untouched", async () => {
    let passthroughCalled = false;
    const env: WorkerEnv = {
      ASSETS: {
        fetch: async () => {
          passthroughCalled = true;
          return new Response("binary-data");
        },
      },
    };
    const response = await worker.fetch(new Request("https://horizondigitalsey.com/assets/index-abc123.js"), env);
    expect(passthroughCalled).toBe(true);
    expect(response.status).toBe(200);
  });

  it("preserves the HTML redirect and serves its extensionless standalone asset", async () => {
    const requestedPaths: string[] = [];
    const env: WorkerEnv = {
      ASSETS: {
        fetch: async (request) => {
          const path = new URL(request.url).pathname;
          requestedPaths.push(path);
          if (path === "/forma-studio.html") {
            return Response.redirect("https://horizondigitalsey.com/forma-studio", 307);
          }
          if (path === "/forma-studio") {
            return new Response("standalone showcase", {
              status: 200,
              headers: { "content-type": "text/html" },
            });
          }
          return new Response("Not Found", { status: 404 });
        },
      },
    };

    const artifactRedirect = await worker.fetch(
      new Request("https://horizondigitalsey.com/forma-studio.html"),
      env,
    );
    const artifact = await worker.fetch(
      new Request("https://horizondigitalsey.com/forma-studio"),
      env,
    );

    expect(artifactRedirect.status).toBe(307);
    expect(artifactRedirect.headers.get("location")).toBe("https://horizondigitalsey.com/forma-studio");
    expect(await artifact.text()).toBe("standalone showcase");
    expect(requestedPaths).toEqual(["/forma-studio.html", "/forma-studio"]);
  });

  it("keeps registered SPA routes ahead of matching extensionless assets", async () => {
    const requestedPaths: string[] = [];
    const env: WorkerEnv = {
      ASSETS: {
        fetch: async (request) => {
          const path = new URL(request.url).pathname;
          requestedPaths.push(path);
          return path === "/"
            ? new Response(SHELL_HTML, { headers: { "content-type": "text/html" } })
            : new Response("shadow asset", { headers: { "content-type": "text/html" } });
        },
      },
    };

    const response = await worker.fetch(
      new Request("https://horizondigitalsey.com/pricing"),
      env,
    );

    expect(response.status).toBe(200);
    const body = await response.text();
    expect(body).toContain('rel="canonical" href="https://horizondigitalsey.com/pricing"');
    expect(body).not.toContain("shadow asset");
    expect(requestedPaths).toEqual(["/"]);
  });

  it("serves the sitemap from the registry excluding noindex showcase pages", async () => {
    const response = await worker.fetch(new Request("https://horizondigitalsey.com/sitemap.xml"), makeEnv());
    const body = await response.text();
    expect(response.status).toBe(200);
    expect(body.match(/<loc>https:\/\/horizondigitalsey\.com\/services<\/loc>/g)).toHaveLength(1);
    expect(body).toContain("<loc>https://horizondigitalsey.com/pricing</loc>");
    expect(body).not.toContain("/showcase/forma-studio");
    expect(body).not.toContain("/showcase/takamaka-house");
    for (const [path] of servicePillars) {
      const location = `<loc>https://horizondigitalsey.com${path}</loc>`;
      expect(body.split(location)).toHaveLength(2);
    }
  });
});

describe("/api/portfolio", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  function makeCache(initial?: Response) {
    let stored = initial;
    const cache: PortfolioCache = {
      match: vi.fn(async () => stored?.clone()),
      put: vi.fn(async (_request, response) => {
        stored = response.clone();
      }),
    };
    return cache;
  }

  function upstreamPortfolio(id: string): Response {
    return new Response(JSON.stringify({ result: [{
      id,
      title: id === "fresh" ? "Fresh Project" : "Drake Seaside",
      tier: "Growth Tier",
      body: "A live redesign.",
      link: "https://example.com/work",
      reqCta: "Request similar site",
      bgColor: "rgba(10, 40, 80, 0.45)",
      align: "left",
      altText: null,
    }] }));
  }

  function cachedPortfolio(id: string, cachedAt: number): Response {
    return new Response(JSON.stringify({ projects: [{ id }] }), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "cache-control": `public, max-age=${PORTFOLIO_FRESH_SECONDS + PORTFOLIO_STALE_SECONDS}`,
        "x-horizon-cached-at": String(cachedAt),
      },
    });
  }

  it("returns mapped JSON with the approved cache policy on GET", async () => {
    const upstreamFetch = vi.fn(async () =>
      new Response(
        JSON.stringify({
          result: [
            {
              id: "drake",
              title: "Drake Seaside",
              tier: "Growth Tier",
              body: "A live redesign.",
              link: "https://example.com/work",
              reqCta: "Request similar site",
              bgColor: "rgba(10, 40, 80, 0.45)",
              align: "left",
              altText: "Drake Seaside booking interface",
              secretToken: "must-not-leak",
            },
            { id: "drafts.hidden", title: "Should be excluded" },
          ],
        }),
        { status: 200 },
      ),
    ) as unknown as typeof fetch;

    const response = await createWorker(upstreamFetch).fetch(
      new Request("https://horizondigitalsey.com/api/portfolio"),
      makeEnv(),
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("application/json; charset=utf-8");
    expect(response.headers.get("cache-control")).toBe(PORTFOLIO_CACHE_CONTROL);

    const body = await response.json();
    expect(body).toEqual({
      projects: [
        {
          id: "drake",
          title: "Drake Seaside",
          tier: "Growth Tier",
          body: "A live redesign.",
          link: "https://example.com/work",
          reqCta: "Request similar site",
          bgColor: "rgba(10, 40, 80, 0.45)",
          align: "left",
          altText: "Drake Seaside booking interface",
        },
      ],
    });

    expect(upstreamFetch).toHaveBeenCalledTimes(1);
    const [requestedInput, requestedInit] = (upstreamFetch as ReturnType<typeof vi.fn>).mock.calls[0];
    const requestedUrl = String(requestedInput);
    expect(requestedUrl).toContain("apicdn.sanity.io");
    expect(requestedUrl).not.toContain("token=");
    const query = new URL(requestedUrl).searchParams.get("query");
    expect(query).toContain('path("drafts.**")');
    expect(query).toContain("[0...20]");
    expect(requestedInit).toMatchObject({ method: "GET", headers: { accept: "application/json" } });
    expect(requestedInit.signal).toBeInstanceOf(AbortSignal);
    expect(JSON.stringify(requestedInit).toLowerCase()).not.toContain("authorization");
  });

  it("populates the injected edge cache on a miss and serves the next request as a hit", async () => {
    const upstreamFetch = vi.fn(async () => new Response(JSON.stringify({ result: [{
      id: "drake", title: "Drake Seaside", tier: "Growth Tier", body: "A live redesign.",
      link: "https://example.com/work", reqCta: "Request similar site",
      bgColor: "rgba(10, 40, 80, 0.45)", align: "left", altText: null,
    }] }))) as unknown as typeof fetch;
    const cache = makeCache();
    const cachedWorker = createWorker(upstreamFetch, cache);
    const request = new Request("https://horizondigitalsey.com/api/portfolio?ignored=1");
    const backgroundTasks: Promise<unknown>[] = [];

    const miss = await cachedWorker.fetch(request, makeEnv(), {
      waitUntil: (promise) => backgroundTasks.push(promise),
    });
    await Promise.all(backgroundTasks);
    const hit = await cachedWorker.fetch(request, makeEnv());

    expect(miss.status).toBe(200);
    expect(hit.status).toBe(200);
    expect(await hit.json()).toEqual(await miss.json());
    expect(upstreamFetch).toHaveBeenCalledTimes(1);
    expect(cache.put).toHaveBeenCalledTimes(1);
    expect(cache.match).toHaveBeenCalledTimes(2);
  });

  it("returns upstream success without waiting for cache.put and handles a rejected put", async () => {
    const upstreamFetch = vi.fn(async () => new Response(JSON.stringify({ result: [{
      id: "drake", title: "Drake Seaside", tier: "Growth Tier", body: "A live redesign.",
      link: "https://example.com/work", reqCta: "Request similar site",
      bgColor: "rgba(10, 40, 80, 0.45)", align: "left", altText: null,
    }] }))) as unknown as typeof fetch;
    const cache: PortfolioCache = {
      match: vi.fn(async () => undefined),
      put: vi.fn(async () => { throw new Error("cache unavailable"); }),
    };

    const response = await createWorker(upstreamFetch, cache).fetch(
      new Request("https://horizondigitalsey.com/api/portfolio"), makeEnv(),
    );
    await Promise.resolve();

    expect(response.status).toBe(200);
    expect(cache.put).toHaveBeenCalledTimes(1);
  });

  it("serves a fresh cache hit without contacting upstream and preserves the public contract", async () => {
    const now = 2_000_000;
    const cache = makeCache(cachedPortfolio("cached", now - (PORTFOLIO_FRESH_SECONDS * 1_000 - 1)));
    const upstreamFetch = vi.fn(async () => { throw new Error("must not run"); }) as unknown as typeof fetch;
    const response = await createWorker(upstreamFetch, cache, () => now).fetch(
      new Request("https://horizondigitalsey.com/api/portfolio"), makeEnv(),
    );
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe(PORTFOLIO_CACHE_CONTROL);
    expect(response.headers.get("x-horizon-cached-at")).toBeNull();
    expect(await response.json()).toEqual({ projects: [{ id: "cached" }] });
    expect(upstreamFetch).not.toHaveBeenCalled();
    expect(cache.put).not.toHaveBeenCalled();
  });

  it("serves stale immediately and refreshes it in the background via waitUntil", async () => {
    const now = 10_000_000;
    const staleAge = PORTFOLIO_FRESH_SECONDS * 1_000 + 1;
    const cache = makeCache(cachedPortfolio("stale", now - staleAge));
    let releaseFetch: (() => void) | undefined;
    const upstreamFetch = vi.fn(() => new Promise<Response>((resolve) => {
      releaseFetch = () => resolve(upstreamPortfolio("fresh"));
    })) as unknown as typeof fetch;
    const tasks: Promise<unknown>[] = [];

    const response = await createWorker(upstreamFetch, cache, () => now).fetch(
      new Request("https://horizondigitalsey.com/api/portfolio"),
      makeEnv(),
      { waitUntil: (promise) => tasks.push(promise) },
    );

    expect(await response.json()).toEqual({ projects: [{ id: "stale" }] });
    expect(tasks).toHaveLength(1);
    expect(cache.put).not.toHaveBeenCalled();
    releaseFetch?.();
    await Promise.all(tasks);
    expect(cache.put).toHaveBeenCalledTimes(1);

    const refreshed = await createWorker(upstreamFetch, cache, () => now).fetch(
      new Request("https://horizondigitalsey.com/api/portfolio"), makeEnv(),
    );
    expect((await refreshed.json()).projects[0].id).toBe("fresh");
    expect(upstreamFetch).toHaveBeenCalledTimes(1);
  });

  it("retains and serves stale content when background refresh fails", async () => {
    const now = 10_000_000;
    const cache = makeCache(cachedPortfolio(
      "stale",
      now - PORTFOLIO_FRESH_SECONDS * 1_000 - 1,
    ));
    const upstreamFetch = vi.fn(async () => { throw new Error("upstream down"); }) as unknown as typeof fetch;
    const tasks: Promise<unknown>[] = [];

    const response = await createWorker(upstreamFetch, cache, () => now).fetch(
      new Request("https://horizondigitalsey.com/api/portfolio"),
      makeEnv(),
      { waitUntil: (promise) => tasks.push(promise) },
    );
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ projects: [{ id: "stale" }] });
    await Promise.all(tasks);
    expect(cache.put).not.toHaveBeenCalled();
  });

  it("returns controlled 502 after stale expiry when refresh fails, including no-cache", async () => {
    const now = 100_000_000;
    const expiredAge = (PORTFOLIO_FRESH_SECONDS + PORTFOLIO_STALE_SECONDS) * 1_000 + 1;
    const upstreamFetch = vi.fn(async () => new Response("down", { status: 503 })) as unknown as typeof fetch;
    const expiredCache = makeCache(cachedPortfolio("expired", now - expiredAge));

    const expired = await createWorker(upstreamFetch, expiredCache, () => now).fetch(
      new Request("https://horizondigitalsey.com/api/portfolio"), makeEnv(),
    );
    const missing = await createWorker(upstreamFetch, makeCache(), () => now).fetch(
      new Request("https://horizondigitalsey.com/api/portfolio"), makeEnv(),
    );

    for (const response of [expired, missing]) {
      expect(response.status).toBe(502);
      expect(response.headers.get("cache-control")).toBe(PORTFOLIO_FAILURE_CACHE_CONTROL);
      expect(await response.json()).toEqual({ projects: [] });
    }
  });

  it("does not cache oversized upstream responses", async () => {
    const cache = makeCache();
    const oversized = "x".repeat(128 * 1024 + 1);
    const upstreamFetch = vi.fn(async () => new Response(oversized, { status: 200 })) as unknown as typeof fetch;
    const response = await createWorker(upstreamFetch, cache).fetch(
      new Request("https://horizondigitalsey.com/api/portfolio"), makeEnv(),
    );
    expect(response.status).toBe(502);
    expect(response.headers.get("cache-control")).toBe(PORTFOLIO_FAILURE_CACHE_CONTROL);
    expect(cache.put).not.toHaveBeenCalled();
  });

  it("times out even when an upstream implementation ignores abort and clears the timer", async () => {
    vi.useFakeTimers();
    const upstreamFetch = vi.fn(() => new Promise<Response>(() => undefined)) as unknown as typeof fetch;
    const pending = createWorker(upstreamFetch).fetch(
      new Request("https://horizondigitalsey.com/api/portfolio"), makeEnv(),
    );
    await vi.advanceTimersByTimeAsync(4_001);
    const response = await pending;
    expect(response.status).toBe(502);
    expect(response.headers.get("cache-control")).toBe(PORTFOLIO_FAILURE_CACHE_CONTROL);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("returns 405 for non-GET methods", async () => {
    const upstreamFetch = vi.fn() as unknown as typeof fetch;
    const response = await createWorker(upstreamFetch).fetch(
      new Request("https://horizondigitalsey.com/api/portfolio", { method: "POST" }),
      makeEnv(),
    );
    expect(response.status).toBe(405);
    expect(response.headers.get("allow")).toBe("GET");
    expect(response.headers.get("cache-control")).toBe(PORTFOLIO_FAILURE_CACHE_CONTROL);
    expect(upstreamFetch).not.toHaveBeenCalled();
  });

  it("returns a fallback-safe empty response when the upstream is unavailable", async () => {
    const upstreamFetch = vi.fn(async () => new Response("Sanity is down", { status: 500 })) as unknown as typeof fetch;
    const response = await createWorker(upstreamFetch).fetch(
      new Request("https://horizondigitalsey.com/api/portfolio"),
      makeEnv(),
    );
    expect(response.status).toBe(502);
    const body = await response.json();
    expect(body).toEqual({ projects: [] });
    const text = JSON.stringify(body);
    expect(text).not.toContain("Sanity is down");
  });

  it("stays fallback-safe when the upstream fetch throws", async () => {
    const upstreamFetch = vi.fn(async () => {
      throw new Error("network unreachable");
    }) as unknown as typeof fetch;
    const response = await createWorker(upstreamFetch).fetch(
      new Request("https://horizondigitalsey.com/api/portfolio"),
      makeEnv(),
    );
    expect(response.status).toBe(502);
    const body = await response.json();
    expect(body).toEqual({ projects: [] });
  });

  it("treats a valid empty Sanity result as a cacheable success", async () => {
    const upstreamFetch = vi.fn(async () =>
      new Response(JSON.stringify({ result: [] }), { status: 200 }),
    ) as unknown as typeof fetch;
    const cache = makeCache();
    const cachedWorker = createWorker(upstreamFetch, cache);
    const tasks: Promise<unknown>[] = [];

    const response = await cachedWorker.fetch(
      new Request("https://horizondigitalsey.com/api/portfolio"),
      makeEnv(),
      { waitUntil: (promise) => tasks.push(promise) },
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe(PORTFOLIO_CACHE_CONTROL);
    expect(await response.json()).toEqual({ projects: [] });
    expect(response.headers.get("authorization")).toBeNull();
    expect(response.headers.has("set-cookie")).toBe(false);
    await Promise.all(tasks);

    const cached = await cachedWorker.fetch(
      new Request("https://horizondigitalsey.com/api/portfolio"),
      makeEnv(),
    );
    expect(cached.status).toBe(200);
    expect(await cached.json()).toEqual({ projects: [] });
    expect(upstreamFetch).toHaveBeenCalledTimes(1);
  });

  it.each([
    ["missing result", {}],
    ["non-array result", { result: {} }],
    ["non-empty wholly invalid result", { result: [{ id: "invalid" }] }],
  ])("keeps malformed Sanity contract %s on controlled failure", async (_label, payload) => {
    const upstreamFetch = vi.fn(async () =>
      new Response(JSON.stringify(payload), { status: 200 }),
    ) as unknown as typeof fetch;

    const response = await createWorker(upstreamFetch).fetch(
      new Request("https://horizondigitalsey.com/api/portfolio"),
      makeEnv(),
    );

    expect(response.status).toBe(502);
    expect(response.headers.get("cache-control")).toBe(PORTFOLIO_FAILURE_CACHE_CONTROL);
    expect(await response.json()).toEqual({ projects: [] });
  });
});

describe("/api/enquiry", () => {
  const validPayload = () => ({
    businessName: "Island Studio", name: "Ava Smith", email: "ava.visitor@example.com",
    industry: "Hospitality", website: "https://example.com", packageInterest: "starter",
    timeline: "1-2-months", message: "We need a clearer booking journey.", honeypot: "",
    turnstileToken: "valid-turnstile-token",
  });

  const configuredEnv = (): WorkerEnv => ({
    ...makeEnv(),
    RESEND_API_KEY: "resend-secret-value",
    TURNSTILE_SECRET_KEY: "turnstile-secret-value",
    ENQUIRY_FROM_EMAIL: "Horizon Enquiries <enquiries@horizondigitalsey.com>",
    ENQUIRY_TO_EMAIL: "owner@horizondigitalsey.com",
  });

  function enquiryRequest(
    body = JSON.stringify(validPayload()), init: RequestInit = {},
    url = "https://horizondigitalsey.com/api/enquiry",
  ): Request {
    return new Request(url, {
      method: "POST",
      body,
      ...init,
      headers: {
        "content-type": "application/json",
        origin: "https://horizondigitalsey.com",
        ...init.headers,
      },
    });
  }

  function successfulUpstream() {
    const order: string[] = [];
    const upstreamFetch = vi.fn(async (input: RequestInfo | URL) => {
      if (String(input).includes("turnstile")) {
        order.push("turnstile");
        return new Response(JSON.stringify({ success: true, hostname: "horizondigitalsey.com" }));
      }
      order.push("resend");
      return new Response(JSON.stringify({ id: "email-id" }), { status: 200 });
    }) as unknown as typeof fetch;
    return { upstreamFetch, order };
  }

  async function expectSafeJson(response: Response, status: number) {
    expect(response.status).toBe(status);
    expect(response.headers.get("content-type")).toBe("application/json; charset=utf-8");
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("access-control-allow-origin")).toBeNull();
    const text = await response.text();
    for (const forbidden of [
      "ava.visitor@example.com", "Island Studio", "resend-secret-value",
      "turnstile-secret-value", "RESEND_API_KEY", "TURNSTILE_SECRET_KEY", "provider exploded",
    ]) expect(text).not.toContain(forbidden);
    return JSON.parse(text) as unknown;
  }

  it("returns 405 with Allow POST and no-store before delivery", async () => {
    const upstreamFetch = vi.fn() as unknown as typeof fetch;
    const response = await createWorker(upstreamFetch).fetch(
      new Request("https://horizondigitalsey.com/api/enquiry", { method: "GET" }), configuredEnv(),
    );
    await expectSafeJson(response, 405);
    expect(response.headers.get("allow")).toBe("POST");
    expect(upstreamFetch).not.toHaveBeenCalled();
  });

  it("returns 415 for non-JSON content types", async () => {
    const upstreamFetch = vi.fn() as unknown as typeof fetch;
    for (const contentType of ["text/plain", "application/x-www-form-urlencoded", ""]) {
      const response = await createWorker(upstreamFetch).fetch(enquiryRequest("hello", {
        headers: { "content-type": contentType, origin: "https://horizondigitalsey.com" },
      }), configuredEnv());
      await expectSafeJson(response, 415);
    }
    expect(upstreamFetch).not.toHaveBeenCalled();
  });

  it("returns 413 for a declared body larger than 12 KiB", async () => {
    const upstreamFetch = vi.fn() as unknown as typeof fetch;
    const response = await createWorker(upstreamFetch).fetch(enquiryRequest("{}", { headers: {
      "content-type": "application/json", origin: "https://horizondigitalsey.com",
      "content-length": String(12 * 1024 + 1),
    } }), configuredEnv());
    await expectSafeJson(response, 413);
    expect(upstreamFetch).not.toHaveBeenCalled();
  });

  it("returns 413 while streaming a body larger than 12 KiB", async () => {
    const upstreamFetch = vi.fn() as unknown as typeof fetch;
    const stream = new ReadableStream<Uint8Array>({ start(controller) {
      controller.enqueue(new TextEncoder().encode(`{"message":"${"x".repeat(12 * 1024)}"`));
      controller.enqueue(new TextEncoder().encode("}"));
      controller.close();
    } });
    const request = new Request("https://horizondigitalsey.com/api/enquiry", {
      method: "POST", body: stream, duplex: "half",
      headers: { "content-type": "application/json", origin: "https://horizondigitalsey.com" },
    } as RequestInit & { duplex: "half" });
    await expectSafeJson(await createWorker(upstreamFetch).fetch(request, configuredEnv()), 413);
    expect(upstreamFetch).not.toHaveBeenCalled();
  });

  it("returns controlled 400 for malformed JSON or invalid closed-schema bodies", async () => {
    const upstreamFetch = vi.fn() as unknown as typeof fetch;
    for (const body of ["{", JSON.stringify({ ...validPayload(), unknown: "field" })]) {
      await expectSafeJson(
        await createWorker(upstreamFetch).fetch(enquiryRequest(body), configuredEnv()), 400,
      );
    }
    expect(upstreamFetch).not.toHaveBeenCalled();
  });

  it("accepts the exact production Origin", async () => {
    const { upstreamFetch } = successfulUpstream();
    const response = await createWorker(upstreamFetch).fetch(enquiryRequest(), configuredEnv());
    expect(await expectSafeJson(response, 201)).toEqual({ ok: true });
    expect(upstreamFetch).toHaveBeenCalledTimes(2);
  });

  it("rejects localhost Origins on the production endpoint without an upstream call", async () => {
    const upstreamFetch = vi.fn() as unknown as typeof fetch;
    for (const origin of [
      "http://localhost:8787", "http://127.0.0.1:8787", "http://[::1]:8787",
    ]) {
      const response = await createWorker(upstreamFetch).fetch(enquiryRequest(undefined, {
        headers: { "content-type": "application/json", origin },
      }), configuredEnv());
      await expectSafeJson(response, 403);
    }
    expect(upstreamFetch).not.toHaveBeenCalled();
  });

  it("accepts each exact approved Wrangler endpoint and Origin pair", async () => {
    for (const { origin, hostname } of [
      { origin: "http://localhost:8787", hostname: "localhost" },
      { origin: "http://127.0.0.1:8787", hostname: "127.0.0.1" },
      { origin: "http://[::1]:8787", hostname: "[::1]" },
    ]) {
      const upstreamFetch = vi.fn(async (input: RequestInfo | URL) => (
        String(input).includes("turnstile")
          ? new Response(JSON.stringify({ success: true, hostname }))
          : new Response("{}", { status: 201 })
      )) as unknown as typeof fetch;
      const response = await createWorker(upstreamFetch).fetch(enquiryRequest(undefined, {
        headers: { "content-type": "application/json", origin },
      }, `${origin}/api/enquiry`), configuredEnv());
      expect(await expectSafeJson(response, 201)).toEqual({ ok: true });
      expect(upstreamFetch).toHaveBeenCalledTimes(2);
    }
  });

  it("rejects local aliases, different ports, and non-Wrangler local schemes", async () => {
    const upstreamFetch = vi.fn() as unknown as typeof fetch;
    for (const { endpoint, origin } of [
      { endpoint: "http://localhost:8787", origin: "http://127.0.0.1:8787" },
      { endpoint: "http://127.0.0.1:8787", origin: "http://[::1]:8787" },
      { endpoint: "http://[::1]:8787", origin: "http://localhost:8787" },
      { endpoint: "http://localhost:8787", origin: "http://localhost:5173" },
      { endpoint: "http://localhost:8787", origin: "http://localhost:4173" },
      { endpoint: "http://localhost:8787", origin: "https://localhost:8787" },
    ]) {
      const response = await createWorker(upstreamFetch).fetch(enquiryRequest(undefined, {
        headers: { "content-type": "application/json", origin },
      }, `${endpoint}/api/enquiry`), configuredEnv());
      await expectSafeJson(response, 403);
    }
    expect(upstreamFetch).not.toHaveBeenCalled();
  });

  it("rejects missing, malformed, and syntactically parseable non-exact Origins", async () => {
    const upstreamFetch = vi.fn() as unknown as typeof fetch;
    const missingOriginRequest = new Request("https://horizondigitalsey.com/api/enquiry", {
      method: "POST",
      body: JSON.stringify(validPayload()),
      headers: { "content-type": "application/json" },
    });
    await expectSafeJson(
      await createWorker(upstreamFetch).fetch(missingOriginRequest, configuredEnv()), 403,
    );

    for (const origin of [
      "", "null", "not an origin", "https://www.horizondigitalsey.com", "https://evil.example",
      "https://horizondigitalsey.com/", "https://horizondigitalsey.com/path",
      "https://horizondigitalsey.com?query=1", "https://horizondigitalsey.com#fragment",
    ]) {
      const response = await createWorker(upstreamFetch).fetch(enquiryRequest(undefined, {
        headers: { "content-type": "application/json", origin },
      }), configuredEnv());
      await expectSafeJson(response, 403);
    }
    expect(upstreamFetch).not.toHaveBeenCalled();
  });

  it("returns 503 when any required delivery configuration is absent", async () => {
    const upstreamFetch = vi.fn() as unknown as typeof fetch;
    for (const key of ["RESEND_API_KEY", "TURNSTILE_SECRET_KEY", "ENQUIRY_FROM_EMAIL", "ENQUIRY_TO_EMAIL"] as const) {
      const response = await createWorker(upstreamFetch).fetch(
        enquiryRequest(), { ...configuredEnv(), [key]: undefined },
      );
      await expectSafeJson(response, 503);
    }
    expect(upstreamFetch).not.toHaveBeenCalled();
  });

  it("returns 403 for an invalid Turnstile result or wrong hostname", async () => {
    for (const verification of [
      { success: false, "error-codes": ["invalid-input-response"] },
      { success: true, hostname: "evil.example" },
    ]) {
      const upstreamFetch = vi.fn(async () => new Response(JSON.stringify(verification))) as unknown as typeof fetch;
      await expectSafeJson(
        await createWorker(upstreamFetch).fetch(enquiryRequest(), configuredEnv()), 403,
      );
      expect(upstreamFetch).toHaveBeenCalledTimes(1);
    }
  });

  it("keeps Turnstile network, non-2xx, and malformed failures controlled", async () => {
    const behaviors = [
      vi.fn(async () => { throw new Error("provider exploded"); }),
      vi.fn(async () => new Response("provider exploded", { status: 500 })),
      vi.fn(async () => new Response("not-json", { status: 200 })),
    ];
    for (const behavior of behaviors) {
      await expectSafeJson(
        await createWorker(behavior as unknown as typeof fetch).fetch(enquiryRequest(), configuredEnv()), 403,
      );
      expect(behavior).toHaveBeenCalledTimes(1);
    }
  });

  it("verifies Turnstile before delivery and forwards optional connecting IP", async () => {
    const { upstreamFetch, order } = successfulUpstream();
    const response = await createWorker(upstreamFetch).fetch(enquiryRequest(undefined, { headers: {
      "content-type": "application/json", origin: "https://horizondigitalsey.com",
      "CF-Connecting-IP": "203.0.113.7",
    } }), configuredEnv());
    expect(response.status).toBe(201);
    expect(order).toEqual(["turnstile", "resend"]);
    expect(JSON.parse(String((upstreamFetch as ReturnType<typeof vi.fn>).mock.calls[0][1]?.body))).toEqual({
      secret: "turnstile-secret-value", response: "valid-turnstile-token", remoteip: "203.0.113.7",
    });
  });

  it("sends plain text through Resend with configured address boundaries", async () => {
    const { upstreamFetch } = successfulUpstream();
    const response = await createWorker(upstreamFetch).fetch(enquiryRequest(), configuredEnv());
    expect(await expectSafeJson(response, 201)).toEqual({ ok: true });
    const [url, init] = (upstreamFetch as ReturnType<typeof vi.fn>).mock.calls[1];
    expect(String(url)).toBe("https://api.resend.com/emails");
    expect(init).toMatchObject({ method: "POST", headers: {
      authorization: "Bearer resend-secret-value", "content-type": "application/json",
    } });
    const delivery = JSON.parse(String(init?.body));
    expect(delivery).toMatchObject({
      from: "Horizon Enquiries <enquiries@horizondigitalsey.com>",
      to: ["owner@horizondigitalsey.com"], reply_to: "ava.visitor@example.com",
    });
    expect(delivery.html).toBeUndefined();
    expect(delivery.text).toContain("Island Studio");
    expect(JSON.stringify({ from: delivery.from, to: delivery.to })).not.toContain("ava.visitor@example.com");
  });

  it("returns 502 when Resend returns non-2xx or throws", async () => {
    for (const delivery of ["non-2xx", "throw"] as const) {
      const upstreamFetch = vi.fn(async (input: RequestInfo | URL) => {
        if (String(input).includes("turnstile")) {
          return new Response(JSON.stringify({ success: true, hostname: "horizondigitalsey.com" }));
        }
        if (delivery === "throw") throw new Error("provider exploded");
        return new Response("provider exploded", { status: 500 });
      }) as unknown as typeof fetch;
      await expectSafeJson(
        await createWorker(upstreamFetch).fetch(enquiryRequest(), configuredEnv()), 502,
      );
      expect(upstreamFetch).toHaveBeenCalledTimes(2);
    }
  });

  it("leaves retired /api/lead on existing page-route fallthrough", async () => {
    const upstreamFetch = vi.fn() as unknown as typeof fetch;
    const response = await createWorker(upstreamFetch).fetch(
      new Request("https://horizondigitalsey.com/api/lead", { method: "POST" }), configuredEnv(),
    );
    expect(response.status).toBe(404);
    expect(response.headers.get("content-type")).toBe("text/html; charset=utf-8");
    expect(upstreamFetch).not.toHaveBeenCalled();
  });
});
