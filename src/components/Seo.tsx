import { Helmet } from "react-helmet-async";
import { siteConfig } from "../data/site";

type SeoProps = {
  title: string;
  description: string;
  path: string;
  keywords?: string;
};

export default function Seo({ title, description, path, keywords }: SeoProps) {
  const canonical = new URL(path, siteConfig.url).toString();
  const fullTitle = `${title} | ${siteConfig.name}`;

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

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
