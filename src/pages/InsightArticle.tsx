import { Link, useParams } from "react-router-dom";
import Seo from "../components/Seo";
import Section from "../components/Section";
import Card from "../components/Card";
import { insightArticles } from "../data/insights";
import { siteConfig } from "../data/site";
import InsightsHero from "../components/InsightsHero";

export default function InsightArticle() {
  const { slug = "" } = useParams();
  const article = insightArticles.find((item) => item.slug === slug);

  if (!article) {
    return (
      <div>
        <Seo title="Insight Not Found" description="The requested insight article could not be found." path="/insights" />
        <Section eyebrow="Insights" title="Article not found" description="Please return to the insights list.">
          <Link to="/insights" className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">
            Back to insights
          </Link>
        </Section>
      </div>
    );
  }

  const canonicalPath = `/insights/${article.slug}`;
  const imageUrl = new URL(article.image, siteConfig.url).toString();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.seoTitle,
    description: article.metaDescription,
    image: imageUrl,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: new URL(siteConfig.ogImage, siteConfig.url).toString(),
      },
    },
    mainEntityOfPage: new URL(canonicalPath, siteConfig.url).toString(),
  };

  return (
    <div>
      <Seo
        title={article.seoTitle}
        description={article.metaDescription}
        path={canonicalPath}
        keywords={article.keywords}
        structuredData={articleSchema}
      />

      <InsightsHero eyebrow="Digital Insights" title={article.title} description={article.excerpt} />

      <Section>
        <Card className="no-scroll-glow">
          <picture>
            {article.imageWebp ? <source srcSet={article.imageWebp} type="image/webp" /> : null}
            <img
              src={article.image}
              alt={article.title}
              width={1400}
              height={780}
              loading="eager"
              decoding="async"
              className="h-56 w-full rounded-xl border border-border object-cover md:h-72"
            />
          </picture>

          <div className="mt-6 space-y-8 text-sm text-text-muted">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-semibold text-text">{section.heading}</h2>
                <div className="mt-4 space-y-4">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <h3 className="mt-6 text-lg font-semibold text-accent-2">{section.subheading}</h3>
                <p className="mt-3">{section.subBody}</p>
              </section>
            ))}
          </div>

          <div className="mt-8 horizon-line" />
          <div className="mt-6 flex items-center justify-between">
            <Link to="/insights" className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">
              Back to insights
            </Link>
            <Link to="/ai-digital-tools" className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">
              AI & Digital Tools page
            </Link>
          </div>
        </Card>
      </Section>
    </div>
  );
}
