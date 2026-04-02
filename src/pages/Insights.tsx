import { Link } from "react-router-dom";
import { trackEvent } from "../lib/analytics";

import Seo from "../components/Seo";
import Section from "../components/Section";
import Card from "../components/Card";
import { insightArticles } from "../data/insights";
import InsightsHero from "../components/InsightsHero";

export default function Insights() {
  return (
    <div>
      <Seo
        title="Digital Insights for Businesses in Seychelles"
        description="Educational articles from Horizon Digital on AI, automation, analytics, and digital trends relevant to businesses in Seychelles."
        path="/insights"
        keywords="AI Seychelles, Artificial Intelligence Seychelles, digital transformation Seychelles, automation tools for businesses, AI for small businesses Seychelles"
      />

      <InsightsHero
        eyebrow="Fresh reads for curious minds"
        title="The digital world, made simple for you"
        description="No jargon. No fluff. Just honest, useful context for running a modern business."
      />

      <Section
        eyebrow="Worth reading"
        title="Things we think you'll find useful"
        description="Short reads on the digital topics that actually matter for your business."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="no-scroll-glow border-dashed text-center flex flex-col justify-center items-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-2">
              All Insights
            </p>
            <h2 className="mt-4 text-xl font-semibold text-text">Monthly AI updates are coming</h2>
            <p className="mt-3 text-sm text-text-muted">
              We will publish monthly updates with practical AI news, plus simple tips and tricks
              to help businesses use AI tools in a clear and useful way.
            </p>
          </Card>

          {insightArticles.map((article) => (
            <Card key={article.slug} className="no-scroll-glow text-center flex flex-col items-center">
              <picture className="w-full">
                {article.imageWebp ? <source srcSet={article.imageWebp} type="image/webp" /> : null}
                <img
                  src={article.image}
                  alt={article.title}
                  width={1200}
                  height={680}
                  loading="lazy"
                  decoding="async"
                  className="h-44 w-full rounded-xl border border-border object-cover mx-auto"
                />
              </picture>
              <h2 className="mt-4 text-xl font-semibold text-text">{article.title}</h2>
              <p className="mt-3 text-sm text-text-muted">{article.excerpt}</p>
              <div className="mt-5 flex justify-center">
                <Link
                  to={`/insights/${article.slug}`}
                  className="text-sm font-semibold uppercase tracking-[0.12em] text-accent transition hover:text-accent-2"
                  onClick={() =>
                    trackEvent("cta_click", {
                      cta_name: `insight_article_read_${article.slug.replace(/-/g, "_")}`,
                      page_path: window.location.pathname,
                    })
                  }
                >
                  Read article
                </Link>
              </div>

            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
