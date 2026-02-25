import { Helmet } from "react-helmet-async";
import { siteConfig } from "../data/site";

type SeoProps = {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
};

export default function Seo({ title, description, path, keywords, structuredData }: SeoProps) {
  const canonical = new URL(path, siteConfig.url).toString();
  const fullTitle = `${title} | ${siteConfig.name}`;
  const ogImageUrl = new URL(siteConfig.ogImage, siteConfig.url).toString();
  const schemas: Array<Record<string, unknown>> = [];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    logo: ogImageUrl,
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ServiceAreaBusiness",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location,
      addressCountry: "SC",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: siteConfig.location,
    },
  };

  schemas.push(organizationSchema, localBusinessSchema);

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
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={ogImageUrl} />

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
