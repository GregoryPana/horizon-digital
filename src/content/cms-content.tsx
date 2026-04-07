import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { createClient } from "@sanity/client";
import {
  emailTemplate as fallbackEmailTemplate,
  navLinks as fallbackNavLinks,
  siteConfig as fallbackSiteConfig,
} from "../data/site";
import { insightArticles as fallbackInsightArticles, type InsightArticle } from "../data/insights";

type CmsStatus = "idle" | "loading" | "ready" | "error";

type SiteConfig = typeof fallbackSiteConfig;
type NavLink = (typeof fallbackNavLinks)[number];
type EmailTemplate = typeof fallbackEmailTemplate;

type CmsContentValue = {
  siteConfig: SiteConfig;
  navLinks: NavLink[];
  emailTemplate: EmailTemplate;
  insightArticles: InsightArticle[];
  status: CmsStatus;
  isUsingSanity: boolean;
  error: string | null;
};

const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  name,
  tagline,
  taglineLong,
  email,
  phone,
  whatsappUrl,
  url,
  location,
  "navLinks": navLinks[]{label, path},
  "emailTemplate": emailTemplate{subject, body}
}`;

const INSIGHT_ARTICLES_QUERY = `*[_type == "insightArticle"] | order(publishedAt desc, _updatedAt desc){
  "slug": slug.current,
  title,
  seoTitle,
  metaDescription,
  excerpt,
  keywords,
  "image": image.asset->url,
  "imageWebp": imageWebp.asset->url,
  sections[]{
    heading,
    body,
    subheading,
    subBody
  }
}`;

const initialValue: CmsContentValue = {
  siteConfig: fallbackSiteConfig,
  navLinks: fallbackNavLinks,
  emailTemplate: fallbackEmailTemplate,
  insightArticles: fallbackInsightArticles,
  status: "idle",
  isUsingSanity: false,
  error: null,
};

const CmsContentContext = createContext<CmsContentValue>(initialValue);

const getClient = () => {
  const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
  const dataset = import.meta.env.VITE_SANITY_DATASET;
  const apiVersion = import.meta.env.VITE_SANITY_API_VERSION ?? "2026-04-01";
  const token = import.meta.env.VITE_SANITY_TOKEN;

  if (!projectId || !dataset) return null;

  return createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: import.meta.env.VITE_SANITY_USE_CDN !== "false",
  });
};

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

export function CmsContentProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState<CmsContentValue>(initialValue);

  useEffect(() => {
    const client = getClient();
    if (!client) {
      setValue((current) => ({ ...current, status: "ready", isUsingSanity: false }));
      return;
    }

    let cancelled = false;

    const load = async () => {
      setValue((current) => ({ ...current, status: "loading", error: null }));

      try {
        const [rawSettings, rawInsights] = await Promise.all([
          client.fetch<Record<string, unknown> | null>(SITE_SETTINGS_QUERY),
          client.fetch<Array<Record<string, unknown>>>(INSIGHT_ARTICLES_QUERY),
        ]);

        if (cancelled) return;

        const nextSiteConfig: SiteConfig = {
          ...fallbackSiteConfig,
          ...(rawSettings ?? {}),
        };

        const nextNavLinks = Array.isArray(rawSettings?.navLinks)
          ? (rawSettings.navLinks as Array<Record<string, unknown>>)
              .filter((item) => isNonEmptyString(item.label) && isNonEmptyString(item.path))
              .map((item) => ({
                label: item.label as string,
                path: item.path as string,
              }))
          : fallbackNavLinks;

        const nextEmailTemplate: EmailTemplate =
          rawSettings && typeof rawSettings.emailTemplate === "object"
            ? {
                subject:
                  (rawSettings.emailTemplate as Record<string, unknown>).subject?.toString() ??
                  fallbackEmailTemplate.subject,
                body:
                  (rawSettings.emailTemplate as Record<string, unknown>).body?.toString() ??
                  fallbackEmailTemplate.body,
              }
            : fallbackEmailTemplate;

        const nextInsights = Array.isArray(rawInsights)
          ? rawInsights
              .map((article) => ({
                slug: article.slug?.toString() ?? "",
                title: article.title?.toString() ?? "",
                seoTitle: article.seoTitle?.toString() ?? "",
                metaDescription: article.metaDescription?.toString() ?? "",
                excerpt: article.excerpt?.toString() ?? "",
                keywords: article.keywords?.toString() ?? "",
                image: article.image?.toString() ?? "",
                imageWebp: article.imageWebp?.toString() || undefined,
                sections: Array.isArray(article.sections)
                  ? (article.sections as Array<Record<string, unknown>>).map((section) => ({
                      heading: section.heading?.toString() ?? "",
                      body: Array.isArray(section.body)
                        ? section.body.map((line) => line?.toString() ?? "").filter(Boolean)
                        : [],
                      subheading: section.subheading?.toString() ?? "",
                      subBody: section.subBody?.toString() ?? "",
                    }))
                  : [],
              }))
              .filter((article) => isNonEmptyString(article.slug) && isNonEmptyString(article.title))
          : [];

        setValue({
          siteConfig: nextSiteConfig,
          navLinks: nextNavLinks.length > 0 ? nextNavLinks : fallbackNavLinks,
          emailTemplate: nextEmailTemplate,
          insightArticles: nextInsights.length > 0 ? nextInsights : fallbackInsightArticles,
          status: "ready",
          isUsingSanity: true,
          error: null,
        });
      } catch (error) {
        if (cancelled) return;
        const message = error instanceof Error ? error.message : "Unknown Sanity fetch error";
        setValue({
          ...initialValue,
          status: "error",
          error: message,
          isUsingSanity: false,
        });
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const memoizedValue = useMemo(() => value, [value]);

  return <CmsContentContext.Provider value={memoizedValue}>{children}</CmsContentContext.Provider>;
}

export function useCmsContent() {
  return useContext(CmsContentContext);
}
