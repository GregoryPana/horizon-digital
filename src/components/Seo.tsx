import { Helmet } from "react-helmet-async";
import { siteConfig } from "../data/site";

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
  robots = "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
  ogType = "website",
  structuredData,
  breadcrumbs,
}: SeoProps) {
  const canonical = new URL(path, siteConfig.url).toString();
  const fullTitle = title?.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;
  const ogImageUrl = new URL("/og-image.png", siteConfig.url).toString();
  const schemas: Array<Record<string, unknown>> = [];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    logo: ogImageUrl,
    sameAs: [
      siteConfig.whatsappUrl,
      siteConfig.instagramUrl,
      siteConfig.facebookUrl,
      "https://share.google/40ZCpJGHmi2tMZhDv",
      "https://maps.app.goo.gl/YcZHnx4ABoa4oHoCA",
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    image: ogImageUrl,
    description: "Custom website design and development for businesses in Seychelles. Fast, mobile-friendly, and SEO-optimised websites.",
    priceRange: "SCR 7,500 - SCR 25,000+",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mahé",
      addressRegion: "Mahé",
      addressCountry: "SC",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -4.6796,
      longitude: 55.4796,
    },
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Mahé"
      },
      {
        "@type": "AdministrativeArea",
        name: "Praslin"
      },
      {
        "@type": "AdministrativeArea",
        name: "La Digue"
      },
      {
        "@type": "Country",
        name: "Seychelles"
      }
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Web Design"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Development"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Search Engine Optimisation (SEO)"
          }
        }
      ]
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    currenciesAccepted: "SCR",
    paymentAccepted: "Bank Transfer, Cash",
    serviceType: [
      "Web Design",
      "Web Development",
      "SEO",
      "Digital Marketing",
    ],
    knowsLanguage: ["en", "fr"],
    sameAs: [
      siteConfig.instagramUrl,
      siteConfig.facebookUrl,
      "https://share.google/40ZCpJGHmi2tMZhDv",
      "https://maps.app.goo.gl/YcZHnx4ABoa4oHoCA",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.tagline,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/insights/{search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}/#webpage`,
    url: canonical,
    name: fullTitle,
    description: description,
    isPartOf: {
      "@id": `${siteConfig.url}/#website`
    }
  };

  schemas.push(organizationSchema, localBusinessSchema, websiteSchema, webPageSchema);

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
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${siteConfig.name} — ${siteConfig.tagline}`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />

      {schemas.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Helmet>
  );
}
