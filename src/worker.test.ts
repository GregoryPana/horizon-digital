import { afterEach, describe, it, expect, vi } from "vitest";
import worker, { escapeHtml, safeJsonLd, injectRouteHtml, type WorkerEnv } from "./worker";
import { insightArticlesMeta } from "./data/insightsMeta";

const SHELL_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Placeholder Title</title>
    <meta name="description" content="Placeholder description" />
    <meta name="robots" content="index,follow" />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

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

  it("keeps the chat webhook token server-side", async () => {
    const upstreamFetch = vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
      expect(String(input)).toBe("https://chat.example.test/webhook/chat");
      expect(new Headers(init?.headers).get("x-chat-token")).toBe("server-secret");
      expect(init?.body).toBeInstanceOf(ArrayBuffer);
      return Response.json({ reply: "Hello" });
    });
    vi.stubGlobal("fetch", upstreamFetch);

    const response = await worker.fetch(
      new Request("https://horizondigitalsey.com/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: "Hello" }),
      }),
      {
        ...makeEnv(),
        CHAT_WEBHOOK_TOKEN: "server-secret",
        CHAT_API_BASE: "https://chat.example.test/webhook",
      },
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ reply: "Hello" });
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(upstreamFetch).toHaveBeenCalledOnce();
  });

  it("returns 503 when the server-side chat secret is not configured", async () => {
    const response = await worker.fetch(
      new Request("https://horizondigitalsey.com/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: "Hello" }),
      }),
      makeEnv(),
    );
    expect(response.status).toBe(503);
  });

  it("rejects non-POST and oversized chat requests", async () => {
    const env = { ...makeEnv(), CHAT_WEBHOOK_TOKEN: "server-secret" };
    const methodResponse = await worker.fetch(
      new Request("https://horizondigitalsey.com/api/chat"),
      env,
    );
    expect(methodResponse.status).toBe(405);
    expect(methodResponse.headers.get("allow")).toBe("POST");

    const sizeResponse = await worker.fetch(
      new Request("https://horizondigitalsey.com/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: "x".repeat(33_000) }),
      }),
      env,
    );
    expect(sizeResponse.status).toBe(413);
  });

  it("returns 200 for the canonical /pricing route", async () => {
    const response = await worker.fetch(new Request("https://horizondigitalsey.com/pricing"), makeEnv());
    expect(response.status).toBe(200);
    const body = await response.text();
    expect(body).toContain("Custom Website Packages");
  });

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
    expect(body).toContain("<loc>https://horizondigitalsey.com/pricing</loc>");
    expect(body).not.toContain("/showcase/forma-studio");
    expect(body).not.toContain("/showcase/takamaka-house");
  });
});
