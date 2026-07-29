import { Helmet } from "react-helmet-async";
import { siteConfig } from "../data/site";
import { DEFAULT_ROBOTS, buildFullTitle, findStaticRoute } from "../config/routes";

type SeoProps = {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  robots?: string;
  ogType?: "website" | "article";
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
  breadcrumbs?: Array<{ name: string; path: string }>;
};

export default function Seo({
  title,
  description,
  path,
  keywords,
  robots,
  ogType,
  structuredData,
  breadcrumbs,
}: SeoProps) {
  const registeredRoute = findStaticRoute(path);
  const effectivePath = registeredRoute?.path ?? path;
  const effectiveTitle = registeredRoute?.seo.title ?? title;
  const effectiveDescription = registeredRoute?.seo.description ?? description;
  const effectiveKeywords = registeredRoute?.seo.keywords ?? keywords;
  const effectiveRobots = registeredRoute?.seo.robots ?? robots ?? DEFAULT_ROBOTS;
  const effectiveOgType = registeredRoute?.seo.ogType ?? ogType ?? "website";
  const canonical = new URL(effectivePath, siteConfig.url).toString();
  const fullTitle = buildFullTitle(effectiveTitle);
  const ogImageUrl = new URL("/og-image.png", siteConfig.url).toString();
  const schemas: Array<Record<string, unknown>> = [];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    areaServed: siteConfig.serviceArea,
    logo: ogImageUrl,
    sameAs: [
      siteConfig.instagramUrl,
      siteConfig.facebookUrl,
      "https://share.google/40ZCpJGHmi2tMZhDv",
      "https://maps.app.goo.gl/YcZHnx4ABoa4oHoCA",
    ].filter(Boolean),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.tagline,
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}/#webpage`,
    url: canonical,
    name: fullTitle,
    description: effectiveDescription,
    isPartOf: {
      "@id": `${siteConfig.url}/#website`
    }
  };

  schemas.push(organizationSchema, websiteSchema, webPageSchema);

  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: new URL(crumb.path, siteConfig.url).toString(),
      })),
    });
  }

  if (structuredData) {
    if (Array.isArray(structuredData)) {
      schemas.push(...structuredData);
    } else {
      schemas.push(structuredData);
    }
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={effectiveDescription} />
      {effectiveKeywords ? <meta name="keywords" content={effectiveKeywords} /> : null}
      <meta name="robots" content={effectiveRobots} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={effectiveDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={effectiveOgType} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${siteConfig.name} — ${siteConfig.tagline}`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={effectiveDescription} />
      <meta name="twitter:image" content={ogImageUrl} />

      {schemas.map((schema, index) => (
        <script key={`schema-${index}`} type="application/ld+json">
          {JSON.stringify(schema).replace(/</g, "\\u003c")}
        </script>
      ))}
    </Helmet>
  );
}
