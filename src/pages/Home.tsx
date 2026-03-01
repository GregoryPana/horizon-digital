import { useEffect, useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Modal from "../components/Modal";
import Section from "../components/Section";
import Seo from "../components/Seo";
import HomeHero from "../components/ui/home-hero";
import HomeFaq from "../components/ui/home-faq";
import HomeWorkAccordion from "../components/ui/home-work-accordion";
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

type WorkPreviewItem = {
  label: string;
  title: string;
  outcome: string;
  image: string;
  imageWebp: string;
  imageWebp800: string;
  url?: string;
};

const homeSectionLinks = [
  { id: "services", label: "Services" },
  { id: "featured-work", label: "Work" },
  { id: "process", label: "Process" },
  { id: "packages", label: "Packages" },
  { id: "faq", label: "FAQ" },
  { id: "ready", label: "Ready" },
] as const;

export default function Home() {
  const [activeWork, setActiveWork] = useState<WorkPreviewItem | null>(null);
  const [mobileOpen, setMobileOpen] = useState({
    foundation: false,
    starter: false,
    growth: false,
  });
  const [passedSectionIds, setPassedSectionIds] = useState<string[]>([]);
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

  useEffect(() => {
    const syncPassedSections = () => {
      const threshold = window.innerHeight * 0.42;
      const nextPassed = homeSectionLinks
        .filter((section) => {
          const node = document.getElementById(section.id);
          return node ? node.getBoundingClientRect().top <= threshold : false;
        })
        .map((section) => section.id);

      setPassedSectionIds((current) =>
        current.join("|") === nextPassed.join("|") ? current : nextPassed
      );
    };

    syncPassedSections();
    window.addEventListener("scroll", syncPassedSections, { passive: true });
    window.addEventListener("resize", syncPassedSections);

    return () => {
      window.removeEventListener("scroll", syncPassedSections);
      window.removeEventListener("resize", syncPassedSections);
    };
  }, []);

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
      <HomeHero />

      {passedSectionIds.length > 0 && (
        <nav
          aria-label="Section quick nav"
          className="fixed left-2 top-1/2 z-40 -translate-y-1/2 md:hidden"
        >
          <ul className="flex max-h-[70svh] flex-col gap-2 overflow-y-auto rounded-2xl border border-border bg-bg-elev/92 px-2 py-2 shadow-[0_8px_30px_rgba(2,8,12,0.35)] backdrop-blur">
            <li>
              <button
                type="button"
                onClick={scrollToTopSmooth}
                className="focus-ring rounded-full border border-border px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.14em] text-text-muted"
              >
                Top
              </button>
            </li>
            {homeSectionLinks
              .filter((section) => passedSectionIds.includes(section.id))
              .map((section) => (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() =>
                      document
                        .getElementById(section.id)
                        ?.scrollIntoView({ behavior: "smooth", block: "start" })
                    }
                    className="focus-ring rounded-full border border-accent/35 bg-accent-soft px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.14em] text-accent"
                  >
                    {section.label}
                  </button>
                </li>
              ))}
          </ul>
        </nav>
      )}

      <Section
        id="services"
        eyebrow="Services"
        title="Designed to be clear and reliable"
        description="Modern websites that help customers understand you and get in touch."
        className="!pt-12 !pb-16 md:!pt-20 md:!pb-24"
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
        id="featured-work"
        eyebrow="Featured work"
        title="Selected work and layout previews"
        description="A focused snapshot of recent builds and layout direction."
      >
        <HomeWorkAccordion items={workItems} onPreview={setActiveWork} />
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
        id="process"
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
        id="packages"
        eyebrow="Services & Pricing"
        title="Website build packages"
        description="Clear starting points for the build."
      >
        <div className="grid items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="flex h-full flex-col no-scroll-glow pricing-card pricing-card-foundation">
            <h3 className="text-lg font-semibold text-accent-2">{foundationPackage.title}</h3>
            <p className="pricing-price mt-4 text-2xl font-semibold text-accent">{foundationPackage.price}</p>
            <p className="mt-3 text-sm text-text-muted">{foundationPackage.description}</p>
            <button
              type="button"
              onClick={() =>
                setMobileOpen((prev) => ({ ...prev, foundation: !prev.foundation }))
              }
              className="mt-4 inline-flex w-full items-center justify-between rounded-full border border-border px-4 py-2.5 text-[0.68rem] uppercase tracking-[0.16em] text-text-muted md:hidden"
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
                <div className="mt-6 md:hidden">
                  <Link to="/services-pricing">
                    <ShimmerButton
                      shimmerColor="#0b1212"
                      shimmerDuration="4.2s"
                      background="#2ca99b"
                      className="!border-[#2ca99b] px-5 py-2 text-xs font-semibold tracking-[0.12em] text-white !shadow-none"
                    >
                      Discuss your project
                    </ShimmerButton>
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-auto hidden pt-8 md:block">
              <Link to="/services-pricing">
                <ShimmerButton
                  shimmerColor="#0b1212"
                  shimmerDuration="4.2s"
                  background="#2ca99b"
                  className="!border-[#2ca99b] px-5 py-2 text-xs font-semibold tracking-[0.12em] text-white !shadow-none"
                >
                  Discuss your project
                </ShimmerButton>
              </Link>
            </div>
          </Card>

          <Card className="relative flex h-full flex-col overflow-visible pt-8 no-scroll-glow pricing-card pricing-card-featured pricing-card-featured-shine">
            <h3 className="text-lg font-semibold text-accent-2">{starterPackage.title}</h3>
            <p className="pricing-price mt-4 text-2xl font-semibold text-accent">{starterPackage.price}</p>
            <p className="mt-3 text-sm text-text-muted">{starterPackage.description}</p>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => ({ ...prev, starter: !prev.starter }))}
              className="mt-4 inline-flex w-full items-center justify-between rounded-full border border-border px-4 py-2.5 text-[0.68rem] uppercase tracking-[0.16em] text-text-muted md:hidden"
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
                <div className="mt-6 md:hidden">
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
              </div>
            </div>
            <div className="mt-auto hidden pt-8 md:block">
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

          <Card className="flex h-full flex-col no-scroll-glow pricing-card pricing-card-growth">
            <h3 className="text-lg font-semibold text-accent-2">{growthPackage.title}</h3>
            <p className="pricing-price mt-4 text-2xl font-semibold text-accent">{growthPackage.price}</p>
            <p className="mt-3 text-sm text-text-muted">{growthPackage.description}</p>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => ({ ...prev, growth: !prev.growth }))}
              className="mt-4 inline-flex w-full items-center justify-between rounded-full border border-border px-4 py-2.5 text-[0.68rem] uppercase tracking-[0.16em] text-text-muted md:hidden"
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
                <div className="mt-6 md:hidden">
                  <Link to="/services-pricing">
                    <ShimmerButton
                      shimmerColor="#0b1212"
                      shimmerDuration="4.2s"
                      background="#2ca99b"
                      className="!border-[#2ca99b] px-5 py-2 text-xs font-semibold tracking-[0.12em] text-white !shadow-none"
                    >
                      Discuss your project
                    </ShimmerButton>
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-auto hidden pt-8 md:block">
              <Link to="/services-pricing">
                <ShimmerButton
                  shimmerColor="#0b1212"
                  shimmerDuration="4.2s"
                  background="#2ca99b"
                  className="!border-[#2ca99b] px-5 py-2 text-xs font-semibold tracking-[0.12em] text-white !shadow-none"
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
        id="faq"
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

      <section id="ready" className="bg-bg-elev">
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
          This preview shows layout direction and flow. Each project is built around your goals,
          content, and customer journey.
        </p>
        <div className="mt-6">
          <Button label="Request similar site" to="/contact" size="sm" />
        </div>
      </Modal>
    </div>
  );
}
