import { describe, expect, it, vi } from "vitest";
import {
  PORTFOLIO_CACHE_CONTROL,
  PORTFOLIO_FAILURE_CACHE_CONTROL,
  SANITY_DATASET,
  SANITY_PROJECT_ID,
  buildSanityPortfolioUrl,
  fetchPortfolioProjects,
  mapPortfolioResponse,
} from "./portfolioApi";

const validProject = {
  id: "drake",
  title: "Drake Seaside",
  tier: "Growth Tier",
  body: "A live redesign.",
  link: "https://example.com/work",
  reqCta: "Request similar site",
  bgColor: "rgba(10, 40, 80, 0.45)",
  align: "left",
  altText: "Drake Seaside booking interface",
};

describe("buildSanityPortfolioUrl", () => {
  it("uses the public CDN, URLSearchParams, explicit draft exclusion, and no token", () => {
    const url = new URL(buildSanityPortfolioUrl());
    expect(url.hostname).toBe(`${SANITY_PROJECT_ID}.apicdn.sanity.io`);
    expect(url.pathname).toBe(`/v2024-04-16/data/query/${SANITY_DATASET}`);
    expect(url.searchParams.get("query")).toContain('_type == "portfolio"');
    expect(url.searchParams.get("query")).toContain('path("drafts.**")');
    expect(url.searchParams.has("token")).toBe(false);
  });
});

describe("mapPortfolioResponse", () => {
  it("returns an empty array for non-array or incomplete data", () => {
    expect(mapPortfolioResponse(undefined)).toEqual([]);
    expect(mapPortfolioResponse({ result: [] })).toEqual([]);
    expect(mapPortfolioResponse([{ id: "drake", title: "Drake" }])).toEqual([]);
  });

  it("returns only the minimal normalized render contract", () => {
    const result = mapPortfolioResponse([{ ...validProject, secretToken: "never-return-this", cta: "Untrusted" }]);
    expect(result).toEqual([{ ...validProject, link: "https://example.com/work" }]);
    expect(result[0]).not.toHaveProperty("secretToken");
    expect(result[0]).not.toHaveProperty("cta");
  });

  it.each([
    ["draft id", { id: "drafts.drake" }],
    ["unsafe link", { link: "javascript:alert(1)" }],
    ["credential-bearing link", { link: "https://user:pass@example.com/" }],
    ["unsafe style", { bgColor: "url(https://evil.example/pixel)" }],
    ["out-of-range colour", { bgColor: "rgba(999, 0, 0, 1)" }],
    ["unknown alignment", { align: "center" }],
    ["unknown tier", { tier: "Enterprise Tier" }],
  ])("drops a record with %s", (_label, patch) => {
    expect(mapPortfolioResponse([{ ...validProject, ...patch }])).toEqual([]);
  });

  it("allows a missing alt text but rejects an invalid non-string alt text", () => {
    expect(mapPortfolioResponse([{ ...validProject, altText: null }])).toHaveLength(1);
    expect(mapPortfolioResponse([{ ...validProject, altText: 42 }])).toEqual([]);
  });
});

describe("fetchPortfolioProjects", () => {
  it("returns a validated non-empty response and makes a credential-free GET", async () => {
    const fetchImpl = vi.fn(async () =>
      new Response(JSON.stringify({ projects: [validProject] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    ) as unknown as typeof fetch;

    expect(await fetchPortfolioProjects(fetchImpl)).toEqual([{ ...validProject, link: "https://example.com/work" }]);
    expect(fetchImpl).toHaveBeenCalledWith("/api/portfolio", {
      method: "GET",
      credentials: "omit",
      headers: { accept: "application/json" },
    });
  });

  it.each([
    ["non-ok response", async () => new Response("upstream down", { status: 502 })],
    ["empty response", async () => new Response(JSON.stringify({ projects: [] }), { status: 200 })],
    ["malformed JSON", async () => new Response("not json", { status: 200 })],
    ["network rejection", async () => { throw new Error("network down"); }],
  ])("returns null for %s", async (_label, implementation) => {
    expect(await fetchPortfolioProjects(vi.fn(implementation) as unknown as typeof fetch)).toBeNull();
  });
});

describe("cache policies", () => {
  it("exports the approved success and controlled-failure policies", () => {
    expect(PORTFOLIO_CACHE_CONTROL).toBe("public, max-age=300, s-maxage=1800, stale-while-revalidate=86400");
    expect(PORTFOLIO_FAILURE_CACHE_CONTROL).toBe("no-store");
  });
});
