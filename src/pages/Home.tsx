import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Modal from "../components/Modal";
import Section from "../components/Section";
import Seo from "../components/Seo";
import InfiniteHero from "../components/ui/infinite-hero";
import HomeFaq from "../components/ui/home-faq";
import { ShimmerButton } from "../components/ui/shimmer-button";
import { Link } from "react-router-dom";
import { scrollToTopSmooth } from "../lib/utils";
import {
  customPackage,
  faqs,
  foundationPackage,
  growthPackage,
  projectSteps,
  siteConfig,
  starterPackage,
  workItems,
} from "../data/site";

export default function Home() {
  const [activeWork, setActiveWork] = useState<null | (typeof workItems)[0]>(null);
  const [mobileOpen, setMobileOpen] = useState({
    foundation: false,
    starter: false,
    growth: false,
  });
  const handleWorkScrollTop = () => scrollToTopSmooth();
  const normalizeFeature = (value: string) => value.trim().toLowerCase();
  const foundationFeatureSet = new Set(foundationPackage.includes.map(normalizeFeature));
  const starterFeatureSet = new Set(starterPackage.includes.map(normalizeFeature));
  const starterUniqueIncludes = starterPackage.includes.filter(
    (item) => !foundationFeatureSet.has(normalizeFeature(item))
  );
  const growthUniqueIncludes = growthPackage.includes.filter(
    (item) => !starterFeatureSet.has(normalizeFeature(item))
  );

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
    mainEntityOfPage: new URL("/", siteConfig.url).toString(),
  };

  return (
    <div>
      <Seo
        title="Custom Web Design in Seychelles"
        description="Custom-built websites for Seychelles businesses. Clean, fast, and structured for clarity and results."
        path="/"
        keywords="Seychelles web design"
        structuredData={faqSchema}
      />
      <InfiniteHero />

      <Section
        eyebrow="Services"
        title="Designed to be clear and reliable"
        description="Modern websites that help customers understand you and get in touch."
        className="!pt-16 !pb-24 md:!pt-24 md:!pb-32"
      >
        <div className="section-band section-band-strong relative left-1/2 right-1/2 -mx-[50vw] my-8 w-screen py-14 md:my-10 md:py-16">
          <div className="mx-auto w-full max-w-7xl px-8">
            <p className="max-w-3xl text-sm text-text">
              We build clean, fast websites with clear structure, thoughtful design, and practical
              support options. Everything is scoped up front so you know exactly what to expect.
            </p>
            <div className="mt-6">
              <Link to="/services-pricing">
                <ShimmerButton
                  shimmerColor="#0b1212"
                  shimmerDuration="4.2s"
                  background="#22f1d6"
                  className="px-5 py-2 text-xs font-semibold tracking-[0.12em] text-black"
                >
                  View services & pricing
                </ShimmerButton>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 horizon-line" />
      </Section>

      <Section
        eyebrow="Featured work"
        title="Selected work and layout previews"
        description="A mix of real projects and concept demos to show the direction."
      >
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
          {workItems.map((item) => (
            <Card key={item.label} className="relative flex h-full flex-col overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
              <div className="relative flex h-full flex-col">
                <div className="preview-frame mb-6 h-32 w-full overflow-hidden rounded-2xl border border-border">
                  {item.image ? (
                    item.imageWebp ? (
                      <picture>
                        <source
                          srcSet={item.imageWebp800 ? `${item.imageWebp800} 800w, ${item.imageWebp} 1600w` : item.imageWebp}
                          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 42vw, 360px"
                          type="image/webp"
                        />
                        <img
                          src={item.image}
                          alt={`${item.label} concept preview`}
                          width={640}
                          height={360}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full bg-bg object-contain scale-[1.08] md:scale-[1.12]"
                        />
                      </picture>
                    ) : (
                      <img
                        src={item.image}
                        alt={`${item.label} concept preview`}
                        width={640}
                        height={360}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full bg-bg object-contain scale-[1.08] md:scale-[1.12]"
                      />
                    )
                  ) : (
                    <div className="absolute inset-0 preview-shimmer" />
                  )}
                </div>
                <p className="text-xs uppercase tracking-[0.3em] text-accent">{item.label}</p>
                <h3 className="mt-2 text-lg font-semibold text-text">{item.title}</h3>
                <p className="mt-4 text-sm text-text-muted">{item.outcome}</p>
                <div className="mt-auto flex flex-wrap gap-5 pt-10">
                  {item.url ? (
                    <Button
                      label="View live site"
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      variant="outline"
                      size="sm"
                    />
                  ) : (
                    <Button
                      label="View preview"
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveWork(item)}
                    />
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button
            label="View all work"
            to="/work"
            size="sm"
            onClick={handleWorkScrollTop}
          />
        </div>
      </Section>

      <Section
        eyebrow="Process"
        title="A clear five-step workflow"
        description="Simple milestones, direct communication, and reliable delivery."
      >
        <div className="section-band section-band-medium relative left-1/2 right-1/2 mt-14 -mx-[50vw] mb-8 w-screen py-16 md:mt-16 md:mb-10 md:py-20">
          <div className="mx-auto grid w-full max-w-7xl gap-8 px-8 md:grid-cols-2 lg:grid-cols-5">
          {projectSteps.map((step, index) => (
            <div key={step.title} className="min-w-0">
              <p className="text-xs uppercase tracking-[0.4em] text-accent">Step {index + 1}</p>
              <h3 className="mt-3 text-lg font-semibold text-text">{step.title}</h3>
              <p className="mt-3 text-sm text-text-muted">{step.description}</p>
            </div>
          ))}
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Services & Pricing"
        title="Website build packages"
        description="Clear starting points for the build."
      >
        <div className="grid items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="flex h-full flex-col no-scroll-glow pricing-card">
            <h3 className="text-lg font-semibold text-accent-2">{foundationPackage.title}</h3>
            <p className="mt-4 text-2xl font-semibold text-accent">{foundationPackage.price}</p>
            <p className="mt-3 text-sm text-text-muted">{foundationPackage.description}</p>
            <button
              type="button"
              onClick={() =>
                setMobileOpen((prev) => ({ ...prev, foundation: !prev.foundation }))
              }
              className="mt-4 inline-flex w-full items-center justify-between rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.2em] text-text-muted md:hidden"
            >
              <span>View included items</span>
              <span aria-hidden="true" className="text-accent">
                {mobileOpen.foundation ? "-" : "+"}
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows,opacity,margin] duration-300 md:mt-6 md:block md:opacity-100 ${
                mobileOpen.foundation ? "mt-6 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
              }`.trim()}
            >
              <div className="space-y-3 overflow-hidden text-sm text-text-muted md:overflow-visible">
                <ul className="space-y-3 mb-8">
                  {foundationPackage.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-accent">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Not included</p>
                <ul className="mt-4 space-y-2 text-sm text-text-muted">
                  {foundationPackage.exclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-auto pt-8">
              <Link to="/services-pricing">
                <ShimmerButton
                  shimmerColor="#0b1212"
                  shimmerDuration="4.2s"
                  background="#0e3a36"
                  className="px-5 py-2 text-xs font-semibold tracking-[0.12em] text-white !shadow-none"
                >
                  Discuss your project
                </ShimmerButton>
              </Link>
            </div>
          </Card>

          <Card className="relative flex h-full flex-col overflow-visible pt-8 no-scroll-glow pricing-card pricing-card-featured pricing-card-featured-shine">
            <h3 className="text-lg font-semibold text-accent-2">{starterPackage.title}</h3>
            <p className="mt-4 text-2xl font-semibold text-accent">{starterPackage.price}</p>
            <p className="mt-3 text-sm text-text-muted">{starterPackage.description}</p>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => ({ ...prev, starter: !prev.starter }))}
              className="mt-4 inline-flex w-full items-center justify-between rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.2em] text-text-muted md:hidden"
            >
              <span>View included items</span>
              <span aria-hidden="true" className="text-accent">
                {mobileOpen.starter ? "-" : "+"}
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows,opacity,margin] duration-300 md:mt-6 md:block md:opacity-100 ${
                mobileOpen.starter ? "mt-6 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
              }`.trim()}
            >
              <div className="space-y-3 overflow-hidden text-sm text-text-muted md:overflow-visible">
                <p className="text-sm font-medium text-text">Includes everything in Foundation, plus:</p>
                <ul className="space-y-3">
                  {starterUniqueIncludes.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-accent">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-auto pt-8">
              <Link to="/services-pricing">
                <ShimmerButton
                  shimmerColor="#0b1212"
                  shimmerDuration="4.2s"
                  background="#22f1d6"
                  className="px-5 py-2 text-xs font-semibold tracking-[0.12em] text-black"
                >
                  Discuss your project
                </ShimmerButton>
              </Link>
            </div>
          </Card>

          <Card className="flex h-full flex-col no-scroll-glow pricing-card">
            <h3 className="text-lg font-semibold text-accent-2">{growthPackage.title}</h3>
            <p className="mt-4 text-2xl font-semibold text-accent">{growthPackage.price}</p>
            <p className="mt-3 text-sm text-text-muted">{growthPackage.description}</p>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => ({ ...prev, growth: !prev.growth }))}
              className="mt-4 inline-flex w-full items-center justify-between rounded-full border border-border px-4 py-2 text-xs uppercase tracking-[0.2em] text-text-muted md:hidden"
            >
              <span>View included items</span>
              <span aria-hidden="true" className="text-accent">
                {mobileOpen.growth ? "-" : "+"}
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows,opacity,margin] duration-300 md:mt-6 md:block md:opacity-100 ${
                mobileOpen.growth ? "mt-6 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
              }`.trim()}
            >
              <div className="space-y-3 overflow-hidden text-sm text-text-muted md:overflow-visible">
                <p className="text-sm font-medium text-text">Includes everything in Starter, plus:</p>
                <ul className="space-y-3">
                  {growthUniqueIncludes.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-accent">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-auto pt-8">
              <Link to="/services-pricing">
                <ShimmerButton
                  shimmerColor="#0b1212"
                  shimmerDuration="4.2s"
                  background="#0e3a36"
                  className="px-5 py-2 text-xs font-semibold tracking-[0.12em] text-white !shadow-none"
                >
                  Discuss your project
                </ShimmerButton>
              </Link>
            </div>
          </Card>
        </div>
        <Card className="relative mt-10 flex h-full flex-col no-scroll-glow pricing-card pricing-card-featured-shine pricing-card-featured-shine-muted lg:mx-auto lg:max-w-3xl">
          <h3 className="text-lg font-semibold text-accent-2">{customPackage.title}</h3>
          <p className="mt-4 text-2xl font-semibold text-accent">Let's chat</p>
          <p className="mt-4 text-sm text-text-muted">{customPackage.description}</p>
          <p className="mt-4 text-sm text-text-muted">
            Advanced builds are scoped per project. We will clarify your requirements, then provide
            a clear proposal and timeline.
          </p>
          <div className="mt-8">
            <Link to="/contact">
              <ShimmerButton
                shimmerColor="#0b1212"
                shimmerDuration="4.2s"
                background="#22f1d6"
                className="px-5 py-2 text-xs font-semibold tracking-[0.12em] text-black"
              >
                Request a custom scope
              </ShimmerButton>
            </Link>
          </div>
        </Card>
        <p className="mt-6 text-center text-sm text-text-muted">Final pricing depends on scope.</p>
      </Section>

      <Section
        eyebrow="FAQ"
        title="Clarity before we start"
        description="Straight answers to help you plan with confidence."
      >
        <HomeFaq items={faqs} />
        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-border bg-bg-elev px-6 py-6">
          <p className="text-sm text-text-muted">Still have questions? We can walk you through it.</p>
          <Link to="/contact">
            <ShimmerButton
              shimmerColor="#0b1212"
              shimmerDuration="4.2s"
              background="#22f1d6"
              className="px-5 py-2 text-xs font-semibold tracking-[0.12em] text-black"
            >
              Book a free consult
            </ShimmerButton>
          </Link>
        </div>
      </Section>

      <section className="bg-bg-elev">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-10 px-8 py-28 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-accent">Ready to build</p>
            <h2 className="mt-3 text-3xl font-semibold text-text md:text-4xl">
              Empowering Your <span className="text-accent-2">Digital Horizon</span>
            </h2>
            <p className="mt-4 text-sm text-text-muted">
              Ready for a website that feels clear and easy to use?
            </p>
          </div>
          <Link to="/contact">
            <ShimmerButton
              shimmerColor="#0b1212"
              shimmerDuration="4.2s"
              background="#22f1d6"
              className="px-7 py-3.5 text-base font-semibold tracking-[0.08em] text-black"
            >
              Book a free consult
            </ShimmerButton>
          </Link>
        </div>
      </section>

      <Modal
        open={Boolean(activeWork)}
        title={activeWork ? `${activeWork.title} - ${activeWork.label}` : ""}
        onClose={() => setActiveWork(null)}
      >
        <p>
          This is a concept demo showing layout direction and flow. Each project is built around
          your goals, content, and customer journey.
        </p>
        <div className="mt-6">
          <Button label="Request similar site" to="/contact" size="sm" />
        </div>
      </Modal>
    </div>
  );
}
