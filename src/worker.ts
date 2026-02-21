type WorkerEnv = {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
};

export default {
  async fetch(request: Request, env: WorkerEnv) {
    const url = new URL(request.url);
    const isAssetRequest = url.pathname.includes(".");

    const response = await env.ASSETS.fetch(request);

    if (response.status === 404 && !isAssetRequest) {
      return env.ASSETS.fetch(new Request(new URL("/index.html", url).toString(), request));
    }

    return response;
  },
};
