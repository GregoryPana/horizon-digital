import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { createClient } from "@sanity/client";
import {
  addOnItems as fallbackAddOnItems,
  emailTemplate as fallbackEmailTemplate,
  faqs as fallbackFaqs,
  foundationPackage,
  growthPackage,
  hostingPlan as fallbackHostingPlan,
  navLinks as fallbackNavLinks,
  projectSteps as fallbackProjectSteps,
  services as fallbackServices,
  servicesPricingIntro as fallbackServicesPricingIntro,
  siteConfig as fallbackSiteConfig,
  stabilisationPlan as fallbackStabilisationPlan,
  starterPackage,
  customPackage,
} from "../data/site";
import { insightArticles as fallbackInsightArticles, type InsightArticle } from "../data/insights";

type CmsStatus = "idle" | "loading" | "ready" | "error";

type SiteConfig = typeof fallbackSiteConfig;
type NavLink = (typeof fallbackNavLinks)[number];
type EmailTemplate = typeof fallbackEmailTemplate;
type ServiceItem = (typeof fallbackServices)[number];
type ProjectStep = (typeof fallbackProjectSteps)[number];
type AddOnItem = (typeof fallbackAddOnItems)[number];
type HostingPlan = typeof fallbackHostingPlan;
type StabilisationPlan = typeof fallbackStabilisationPlan;
type ServicesPricingIntro = typeof fallbackServicesPricingIntro;
type FaqItem = (typeof fallbackFaqs)[number];

type ServicePackage = {
  title: string;
  price: string;
  description: string;
  includes: string[];
  tier: "foundation" | "starter" | "growth" | "custom";
  sortOrder: number;
};

type HomeHeroContent = {
  trustBadgeText: string;
  headlineLines: string[];
  rotatingWords: string[];
  subtitle: string;
};

type HomeProblemSection = {
  eyebrow: string;
  title: string;
  closingText: string;
};

type HomeProblemCard = {
  title: string;
  body: string;
};

type CmsContentValue = {
  siteConfig: SiteConfig;
  navLinks: NavLink[];
  emailTemplate: EmailTemplate;
  insightArticles: InsightArticle[];
  services: ServiceItem[];
  projectSteps: ProjectStep[];
  addOnItems: AddOnItem[];
  hostingPlan: HostingPlan;
  stabilisationPlan: StabilisationPlan;
  servicesPricingIntro: ServicesPricingIntro;
  servicePackages: ServicePackage[];
  faqs: FaqItem[];
  homeHero: HomeHeroContent;
  homeProblemSection: HomeProblemSection;
  homeProblemCards: HomeProblemCard[];
  status: CmsStatus;
  isUsingSanity: boolean;
  error: string | null;
};

const fallbackServicePackages: ServicePackage[] = [
  { ...foundationPackage, tier: "foundation", sortOrder: 100 },
  { ...starterPackage, tier: "starter", sortOrder: 200 },
  { ...growthPackage, tier: "growth", sortOrder: 300 },
  { ...customPackage, tier: "custom", sortOrder: 400 },
];

const fallbackHomeHero: HomeHeroContent = {
  trustBadgeText: "Custom Web Design Studio • Seychelles",
  headlineLines: ["CUSTOM STUNNING WEBSITES"],
  rotatingWords: ["STUNNING", "PROFESSIONAL", "FAST", "MOBILE-READY"],
  subtitle: "A website that looks great, loads fast, and brings in real customers.",
};

const fallbackHomeProblemSection: HomeProblemSection = {
  eyebrow: "Sound Familiar?",
  title: "Most businesses in Seychelles face the same three problems online.",
  closingText: "We fix this. Every time.",
};

const fallbackHomeProblemCards: HomeProblemCard[] = [
  {
    title: "My website looks outdated",
    body: "I'm embarrassed to share it with customers. It doesn't reflect the quality of service we provide in person.",
  },
  {
    title: "Customers cannot find me",
    body: "I tell people to Google us, but we don't show up. I don't know how to fix it and competitors get all the search traffic.",
  },
  {
    title: "Zero enquiries",
    body: "The site is online but has never brought a new customer. It feels like an expense, not an asset.",
  },
];

const SITE_SETTINGS_QUERY = `*[_id == "siteSettings"][0]{
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

const BUSINESS_CONTENT_QUERY = `*[_type == "businessContent"][0]{
  "servicesPricingIntro": servicesPricingIntro{title, subtitle, summary},
  "homeHero": homeHero{trustBadgeText, headlineLines, rotatingWords, subtitle},
  "homeProblemSection": homeProblemSection{eyebrow, title, closingText},
  "homeProblemCards": homeProblemCards[]{title, body},
  "services": services[]{title, description},
  "projectSteps": projectSteps[]{title, description},
  "addOnItems": addOnItems[]{title, price},
  "hostingPlan": hostingPlan{title, price, billing, features, details, note},
  "stabilisationPlan": stabilisationPlan{title, covers, excludes}
}`;

const SERVICE_PACKAGES_QUERY = `*[_type == "servicePackage"] | order(sortOrder asc, _createdAt asc){
  title,
  price,
  description,
  includes,
  tier,
  sortOrder
}`;

const FAQ_QUERY = `*[_type == "faqItem"] | order(sortOrder asc, _createdAt asc){
  question,
  answer,
  category
}`;

const initialValue: CmsContentValue = {
  siteConfig: fallbackSiteConfig,
  navLinks: fallbackNavLinks,
  emailTemplate: fallbackEmailTemplate,
  insightArticles: fallbackInsightArticles,
  services: fallbackServices,
  projectSteps: fallbackProjectSteps,
  addOnItems: fallbackAddOnItems,
  hostingPlan: fallbackHostingPlan,
  stabilisationPlan: fallbackStabilisationPlan,
  servicesPricingIntro: fallbackServicesPricingIntro,
  servicePackages: fallbackServicePackages,
  faqs: fallbackFaqs,
  homeHero: fallbackHomeHero,
  homeProblemSection: fallbackHomeProblemSection,
  homeProblemCards: fallbackHomeProblemCards,
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

const asStringArray = (value: unknown) =>
  Array.isArray(value) ? value.map((item) => item?.toString() ?? "").filter(Boolean) : [];

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
        const [rawSettings, rawInsights, rawBusinessContent, rawServicePackages, rawFaqs] = await Promise.all([
          client.fetch<Record<string, unknown> | null>(SITE_SETTINGS_QUERY),
          client.fetch<Array<Record<string, unknown>>>(INSIGHT_ARTICLES_QUERY),
          client.fetch<Record<string, unknown> | null>(BUSINESS_CONTENT_QUERY),
          client.fetch<Array<Record<string, unknown>>>(SERVICE_PACKAGES_QUERY),
          client.fetch<Array<Record<string, unknown>>>(FAQ_QUERY),
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

        const nextServices = Array.isArray(rawBusinessContent?.services)
          ? (rawBusinessContent.services as Array<Record<string, unknown>>)
              .filter((item) => isNonEmptyString(item.title) && isNonEmptyString(item.description))
              .map((item) => ({ title: item.title as string, description: item.description as string }))
          : [];

        const nextProjectSteps = Array.isArray(rawBusinessContent?.projectSteps)
          ? (rawBusinessContent.projectSteps as Array<Record<string, unknown>>)
              .filter((item) => isNonEmptyString(item.title) && isNonEmptyString(item.description))
              .map((item) => ({ title: item.title as string, description: item.description as string }))
          : [];

        const nextAddOnItems = Array.isArray(rawBusinessContent?.addOnItems)
          ? (rawBusinessContent.addOnItems as Array<Record<string, unknown>>)
              .filter((item) => isNonEmptyString(item.title) && isNonEmptyString(item.price))
              .map((item) => ({ title: item.title as string, price: item.price as string }))
          : [];

        const nextHostingPlan: HostingPlan =
          rawBusinessContent && typeof rawBusinessContent.hostingPlan === "object"
            ? {
                title:
                  (rawBusinessContent.hostingPlan as Record<string, unknown>).title?.toString() ??
                  fallbackHostingPlan.title,
                price:
                  (rawBusinessContent.hostingPlan as Record<string, unknown>).price?.toString() ??
                  fallbackHostingPlan.price,
                billing:
                  (rawBusinessContent.hostingPlan as Record<string, unknown>).billing?.toString() ??
                  fallbackHostingPlan.billing,
                features:
                  asStringArray((rawBusinessContent.hostingPlan as Record<string, unknown>).features)
                    .length > 0
                    ? asStringArray((rawBusinessContent.hostingPlan as Record<string, unknown>).features)
                    : fallbackHostingPlan.features,
                details:
                  asStringArray((rawBusinessContent.hostingPlan as Record<string, unknown>).details)
                    .length > 0
                    ? asStringArray((rawBusinessContent.hostingPlan as Record<string, unknown>).details)
                    : fallbackHostingPlan.details,
                note:
                  (rawBusinessContent.hostingPlan as Record<string, unknown>).note?.toString() ??
                  fallbackHostingPlan.note,
              }
            : fallbackHostingPlan;

        const nextStabilisationPlan: StabilisationPlan =
          rawBusinessContent && typeof rawBusinessContent.stabilisationPlan === "object"
            ? {
                title:
                  (rawBusinessContent.stabilisationPlan as Record<string, unknown>).title?.toString() ??
                  fallbackStabilisationPlan.title,
                covers:
                  asStringArray((rawBusinessContent.stabilisationPlan as Record<string, unknown>).covers)
                    .length > 0
                    ? asStringArray((rawBusinessContent.stabilisationPlan as Record<string, unknown>).covers)
                    : fallbackStabilisationPlan.covers,
                excludes:
                  asStringArray((rawBusinessContent.stabilisationPlan as Record<string, unknown>).excludes)
                    .length > 0
                    ? asStringArray((rawBusinessContent.stabilisationPlan as Record<string, unknown>).excludes)
                    : fallbackStabilisationPlan.excludes,
              }
            : fallbackStabilisationPlan;

        const nextServicesPricingIntro: ServicesPricingIntro =
          rawBusinessContent && typeof rawBusinessContent.servicesPricingIntro === "object"
            ? {
                title:
                  (rawBusinessContent.servicesPricingIntro as Record<string, unknown>).title?.toString() ??
                  fallbackServicesPricingIntro.title,
                subtitle:
                  (rawBusinessContent.servicesPricingIntro as Record<string, unknown>).subtitle?.toString() ??
                  fallbackServicesPricingIntro.subtitle,
                summary:
                  (rawBusinessContent.servicesPricingIntro as Record<string, unknown>).summary?.toString() ??
                  fallbackServicesPricingIntro.summary,
              }
            : fallbackServicesPricingIntro;

        const nextServicePackages = Array.isArray(rawServicePackages)
          ? rawServicePackages
              .map((pkg) => ({
                title: pkg.title?.toString() ?? "",
                price: pkg.price?.toString() ?? "",
                description: pkg.description?.toString() ?? "",
                includes: asStringArray(pkg.includes),
                tier: (pkg.tier?.toString() ?? "") as ServicePackage["tier"],
                sortOrder: Number(pkg.sortOrder ?? 100),
              }))
              .filter((pkg) => isNonEmptyString(pkg.title) && isNonEmptyString(pkg.price) && pkg.includes.length > 0)
          : [];

        const nextFaqs = Array.isArray(rawFaqs)
          ? rawFaqs
              .map((faq) => ({
                question: faq.question?.toString() ?? "",
                answer: faq.answer?.toString() ?? "",
              }))
              .filter((faq) => isNonEmptyString(faq.question) && isNonEmptyString(faq.answer))
          : [];

        const nextHomeHero: HomeHeroContent =
          rawBusinessContent && typeof rawBusinessContent.homeHero === "object"
            ? {
                trustBadgeText:
                  (rawBusinessContent.homeHero as Record<string, unknown>).trustBadgeText?.toString() ??
                  fallbackHomeHero.trustBadgeText,
                headlineLines:
                  asStringArray((rawBusinessContent.homeHero as Record<string, unknown>).headlineLines).length > 0
                    ? asStringArray((rawBusinessContent.homeHero as Record<string, unknown>).headlineLines)
                    : fallbackHomeHero.headlineLines,
                rotatingWords:
                  asStringArray((rawBusinessContent.homeHero as Record<string, unknown>).rotatingWords).length > 0
                    ? asStringArray((rawBusinessContent.homeHero as Record<string, unknown>).rotatingWords)
                    : fallbackHomeHero.rotatingWords,
                subtitle:
                  (rawBusinessContent.homeHero as Record<string, unknown>).subtitle?.toString() ??
                  fallbackHomeHero.subtitle,
              }
            : fallbackHomeHero;

        const nextHomeProblemSection: HomeProblemSection =
          rawBusinessContent && typeof rawBusinessContent.homeProblemSection === "object"
            ? {
                eyebrow:
                  (rawBusinessContent.homeProblemSection as Record<string, unknown>).eyebrow?.toString() ??
                  fallbackHomeProblemSection.eyebrow,
                title:
                  (rawBusinessContent.homeProblemSection as Record<string, unknown>).title?.toString() ??
                  fallbackHomeProblemSection.title,
                closingText:
                  (rawBusinessContent.homeProblemSection as Record<string, unknown>).closingText?.toString() ??
                  fallbackHomeProblemSection.closingText,
              }
            : fallbackHomeProblemSection;

        const nextHomeProblemCards = Array.isArray(rawBusinessContent?.homeProblemCards)
          ? (rawBusinessContent.homeProblemCards as Array<Record<string, unknown>>)
              .map((item) => ({
                title: item.title?.toString() ?? "",
                body: item.body?.toString() ?? "",
              }))
              .filter((item) => isNonEmptyString(item.title) && isNonEmptyString(item.body))
          : [];

        setValue({
          siteConfig: nextSiteConfig,
          navLinks: nextNavLinks.length > 0 ? nextNavLinks : fallbackNavLinks,
          emailTemplate: nextEmailTemplate,
          insightArticles: nextInsights.length > 0 ? nextInsights : fallbackInsightArticles,
          services: nextServices.length > 0 ? nextServices : fallbackServices,
          projectSteps: nextProjectSteps.length > 0 ? nextProjectSteps : fallbackProjectSteps,
          addOnItems: nextAddOnItems.length > 0 ? nextAddOnItems : fallbackAddOnItems,
          hostingPlan: nextHostingPlan,
          stabilisationPlan: nextStabilisationPlan,
          servicesPricingIntro: nextServicesPricingIntro,
          servicePackages: nextServicePackages.length > 0 ? nextServicePackages : fallbackServicePackages,
          faqs: nextFaqs.length > 0 ? nextFaqs : fallbackFaqs,
          homeHero: nextHomeHero,
          homeProblemSection: nextHomeProblemSection,
          homeProblemCards: nextHomeProblemCards.length > 0 ? nextHomeProblemCards : fallbackHomeProblemCards,
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
