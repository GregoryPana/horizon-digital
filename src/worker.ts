type WorkerEnv = {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
};

export default {
  async fetch(request: Request, env: WorkerEnv) {
    const url = new URL(request.url);
    const isAssetRequest = url.pathname.includes(".");
    const origin = url.origin;

    if (url.pathname === "/robots.txt") {
      const body = `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml`;
      return new Response(body, {
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }

    if (url.pathname === "/sitemap.xml") {
      const lastmod = new Date().toISOString().split("T")[0];
      const routes = [
        { path: "/", priority: "1.0", changefreq: "weekly" },
        { path: "/services-pricing", priority: "0.9", changefreq: "monthly" },
        { path: "/work", priority: "0.8", changefreq: "monthly" },
        { path: "/about", priority: "0.7", changefreq: "monthly" },
        { path: "/contact", priority: "0.7", changefreq: "monthly" },
      ];

      const urls = routes
        .map(
          (route) => `  <url>\n` +
            `    <loc>${origin}${route.path}</loc>\n` +
            `    <lastmod>${lastmod}</lastmod>\n` +
            `    <changefreq>${route.changefreq}</changefreq>\n` +
            `    <priority>${route.priority}</priority>\n` +
            `  </url>`
        )
        .join("\n");

      const body =
        `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
        `${urls}\n` +
        `</urlset>`;

      return new Response(body, {
        headers: { "content-type": "application/xml; charset=utf-8" },
      });
    }

    const response = await env.ASSETS.fetch(request);

    if (response.status === 404 && !isAssetRequest) {
      return env.ASSETS.fetch(new Request(new URL("/index.html", url).toString(), request));
    }

    return response;
  },
};
