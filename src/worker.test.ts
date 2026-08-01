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
      fetch: async () =>
        new Response(SHELL_HTML, {
          headers: {
            "content-type": "text/html",
            "cache-control": "public, max-age=60",
            etag: '"stale-shell-etag"',
          },
        }),
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

  it("never exposes a secret or token header to the browser", async () => {
    const upstreamFetch = vi.fn(async () => new Response(JSON.stringify({ result: [] }), { status: 200 })) as unknown as typeof fetch;
    const response = await createWorker(upstreamFetch).fetch(
      new Request("https://horizondigitalsey.com/api/portfolio"),
      makeEnv(),
    );
    expect(response.headers.get("authorization")).toBeNull();
    expect(response.headers.has("set-cookie")).toBe(false);
  });
});
