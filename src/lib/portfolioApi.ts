// Shared, asset-free contract for the Worker's public portfolio endpoint and its
// browser consumer. Keep this module free of Node-only APIs and binary imports.

export const SANITY_PROJECT_ID = "rnod6h69";
export const SANITY_DATASET = "production";
const SANITY_API_VERSION = "2024-04-16";

export const PORTFOLIO_QUERY = `*[
  _type == "portfolio" &&
  !(_id in path("drafts.**"))
] | order(_createdAt asc) [0...20] {
  "id": _id,
  title,
  "tier": category,
  "body": short_desc,
  link,
  reqCta,
  bgColor,
  align,
  "altText": cover_image.altText
}`;

export const PORTFOLIO_CACHE_CONTROL = "public, max-age=300, s-maxage=1800, stale-while-revalidate=86400";
export const PORTFOLIO_FAILURE_CACHE_CONTROL = "no-store";
export const PORTFOLIO_FRESH_SECONDS = 1_800;
export const PORTFOLIO_STALE_SECONDS = 86_400;
export const PORTFOLIO_CACHE_STORAGE_SECONDS = PORTFOLIO_FRESH_SECONDS + PORTFOLIO_STALE_SECONDS;
export const PORTFOLIO_UPSTREAM_TIMEOUT_MS = 4_000;
export const PORTFOLIO_MAX_UPSTREAM_BYTES = 128 * 1024;

export const PORTFOLIO_TIERS = ["Foundation Tier", "Starter Tier", "Growth Tier"] as const;
export type PortfolioTier = (typeof PORTFOLIO_TIERS)[number];
export const PORTFOLIO_ALIGNMENTS = ["left", "right"] as const;
export type PortfolioAlignment = (typeof PORTFOLIO_ALIGNMENTS)[number];

export interface PortfolioApiItem {
  id: string;
  title: string;
  tier: PortfolioTier;
  body: string;
  link: string;
  reqCta: string;
  bgColor: string;
  align: PortfolioAlignment;
  altText: string | null;
}

/** Builds a public, unauthenticated Sanity CDN query URL. No token is required or sent. */
export function buildSanityPortfolioUrl(): string {
  const url = new URL(
    `https://${SANITY_PROJECT_ID}.apicdn.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`,
  );
  url.search = new URLSearchParams({ query: PORTFOLIO_QUERY }).toString();
  return url.toString();
}

function boundedString(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  return normalized.length > 0 && normalized.length <= maxLength ? normalized : null;
}

function safeHttpsUrl(value: unknown): string | null {
  const candidate = boundedString(value, 2048);
  if (!candidate) return null;
  try {
    const url = new URL(candidate);
    return url.protocol === "https:" && url.username === "" && url.password === "" ? url.toString() : null;
  } catch {
    return null;
  }
}

function safeBackgroundColor(value: unknown): string | null {
  const candidate = boundedString(value, 64);
  if (!candidate) return null;
  const match = candidate.match(/^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(0(?:\.\d+)?|1(?:\.0+)?))?\s*\)$/i);
  if (!match) return null;
  const red = Number(match[1]);
  const green = Number(match[2]);
  const blue = Number(match[3]);
  const alpha = match[4] === undefined ? null : Number(match[4]);
  if ([red, green, blue].some((channel) => channel > 255) || (alpha !== null && (alpha < 0 || alpha > 1))) {
    return null;
  }
  return alpha === null ? `rgb(${red}, ${green}, ${blue})` : `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function isOneOf<T extends readonly string[]>(value: unknown, allowed: T): value is T[number] {
  return typeof value === "string" && allowed.includes(value);
}

/**
 * Reduces arbitrary data to the exact render contract. Invalid records are
 * discarded as a unit, preventing partial/null records, unsafe URLs, arbitrary
 * CSS, or unknown enum values from reaching Work.
 */
export function mapPortfolioResponse(raw: unknown): PortfolioApiItem[] {
  if (!Array.isArray(raw)) return [];

  const projects: PortfolioApiItem[] = [];
  for (const entry of raw) {
    if (!entry || typeof entry !== "object") continue;
    const record = entry as Record<string, unknown>;
    const id = boundedString(record.id, 128);
    const title = boundedString(record.title, 120);
    const body = boundedString(record.body, 600);
    const link = safeHttpsUrl(record.link);
    const reqCta = boundedString(record.reqCta, 80);
    const bgColor = safeBackgroundColor(record.bgColor);
    const altText = record.altText == null ? null : boundedString(record.altText, 200);

    if (
      !id || id.startsWith("drafts.") || !title || !body || !link || !reqCta || !bgColor ||
      !isOneOf(record.tier, PORTFOLIO_TIERS) || !isOneOf(record.align, PORTFOLIO_ALIGNMENTS) ||
      (record.altText != null && !altText)
    ) {
      continue;
    }

    projects.push({ id, title, tier: record.tier, body, link, reqCta, bgColor, align: record.align, altText });
  }
  return projects;
}

/** Returns null on every fallback condition so Work retains its immediate local data. */
export async function fetchPortfolioProjects(fetchImpl: typeof fetch = fetch): Promise<PortfolioApiItem[] | null> {
  try {
    const response = await fetchImpl("/api/portfolio", {
      method: "GET",
      credentials: "omit",
      headers: { accept: "application/json" },
    });
    if (!response.ok) return null;
    const payload: unknown = await response.json();
    const projects = mapPortfolioResponse(
      payload && typeof payload === "object" ? (payload as Record<string, unknown>).projects : undefined,
    );
    return projects.length > 0 ? projects : null;
  } catch {
    return null;
  }
}
