import { Link } from "react-router-dom";
import { trackEvent } from "../lib/analytics";

import Seo from "../components/Seo";
import Section from "../components/Section";
import Card from "../components/Card";
import { insightArticles } from "../data/insights";
import InsightsHero from "../components/InsightsHero";

export default function Insights() {
  return (
    <div className="insights-theme-shell">
      <Seo
        title="Digital Insights for Businesses in Seychelles"
        description="Educational articles from Horizon Digital on AI, automation, analytics, and digital trends relevant to businesses in Seychelles."
        path="/insights"
        keywords="AI Seychelles, Artificial Intelligence Seychelles, digital transformation Seychelles, automation tools for businesses, AI for small businesses Seychelles"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
        ]}
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
            <p className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-deep-teal section-eyebrow-glow">All Insights</p>
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
                  className="cta-gradient-anim relative z-10 flex items-center justify-center rounded-full px-8 py-3 text-xs font-black uppercase tracking-[0.2em] text-[#0a0a0a] transition-all hover:scale-105 active:scale-95"
                  style={{ backgroundImage: 'linear-gradient(90deg, var(--accent), #A5F3FC, #FFFFFF, var(--accent))', backgroundSize: '300% 100%' }}
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
