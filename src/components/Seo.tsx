import { Helmet } from "react-helmet-async";
import { useCmsContent } from "../content/cms-content";

type SeoProps = {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  robots?: string;
  ogType?: "website" | "article";
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
};

export default function Seo({
  title,
  description,
  path,
  keywords,
  robots = "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
  ogType = "website",
  structuredData,
}: SeoProps) {
  const { siteConfig } = useCmsContent();
  const canonical = new URL(path, siteConfig.url).toString();
  const fullTitle = title.includes(siteConfig.name)
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
      addressLocality: siteConfig.location,
      addressCountry: "SC",
    },
    areaServed: {
      "@type": "Country",
      name: "Seychelles",
    },
    serviceType: [
      "Web Design",
      "Web Development",
      "SEO",
      "Digital Marketing",
    ],
    knowsLanguage: ["en", "fr"],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
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

  schemas.push(organizationSchema, localBusinessSchema, websiteSchema);

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
