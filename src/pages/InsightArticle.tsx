import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Seo from "../components/Seo";
import Section from "../components/Section";
import Card from "../components/Card";
import { insightArticles } from "../data/insights";
import { siteConfig } from "../data/site";
import InsightsHero from "../components/InsightsHero";
import { trackEvent } from "../lib/analytics";
import { INSIGHT_NOT_FOUND_SEO } from "../config/routes";

export default function InsightArticle() {
  const { slug = "" } = useParams();
  const article = insightArticles.find((item) => item.slug === slug);

  if (!article) {
    return (
      <div className="insights-theme-shell">
        <Seo
          title={INSIGHT_NOT_FOUND_SEO.title}
          description={INSIGHT_NOT_FOUND_SEO.description}
          path="/insights"
          robots={INSIGHT_NOT_FOUND_SEO.robots}
        />
        <Section eyebrow="Insights" title="Article not found" description="Please return to the insights list.">
          <Link to="/insights" className="text-sm font-semibold uppercase tracking-[0.12em] text-cyan hover:text-white">
            Back to insights
          </Link>
        </Section>
      </div>
    );
  }

  const canonicalPath = `/insights/${article.slug}`;
  const imageUrl = new URL(article.image, siteConfig.url).toString();
  const ogImageUrl = new URL("/og-image.png", siteConfig.url).toString();

  useEffect(() => {
    trackEvent("insight_article_view", {
      article_slug: article.slug,
      article_title: article.title,
      page_path: window.location.pathname,
    });
  }, [article.slug, article.title]);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.seoTitle,
    description: article.metaDescription,
    image: imageUrl,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: ogImageUrl,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": new URL(canonicalPath, siteConfig.url).toString(),
    },
  };

  return (
    <div className="insights-theme-shell">
      <Seo
        title={article.seoTitle}
        description={article.metaDescription}
        path={canonicalPath}
        keywords={article.keywords}
        ogType="article"
        structuredData={articleSchema}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: article.title, path: canonicalPath },
        ]}
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
          <div className="mt-6 flex items-center justify-start">
            <Link 
              to="/insights" 
              className="cta-gradient-anim relative z-10 flex items-center justify-center rounded-full px-8 py-3 text-xs font-black uppercase tracking-[0.2em] text-[#0a0a0a] transition-all hover:scale-105 active:scale-95"
              style={{ backgroundImage: 'linear-gradient(90deg, var(--accent), #A5F3FC, #FFFFFF, var(--accent))', backgroundSize: '300% 100%' }}
              onClick={() =>
                trackEvent("cta_click", {
                  cta_name: "insight_article_back_to_list",
                  article_slug: article.slug,
                  page_path: window.location.pathname,
                })
              }
            >
              Back to insights
            </Link>
          </div>
        </Card>
      </Section>
    </div>
  );
}
