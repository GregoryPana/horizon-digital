import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Button from "../components/Button";
import Card from "../components/Card";
import Modal from "../components/Modal";
import Section from "../components/Section";
import Seo from "../components/Seo";
import HomeHero from "../components/ui/home-hero";
import HomeFaq, { type HomeFaqCategory } from "../components/ui/home-faq";
import HomeWorkAccordion from "../components/ui/home-work-accordion";
import { ShimmerButton } from "../components/ui/shimmer-button";
import { WordReveal, AccentLine, GlowUnderline } from "../components/ui/animated-text";
import { Link } from "react-router-dom";
import { scrollToTopSmooth } from "../lib/utils";
import {
  customPackage,
  foundationPackage,
  growthPackage,
  projectSteps,
  services,
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
  { id: "what-we-build", label: "What we build" },
  { id: "industries", label: "Industries" },
  { id: "featured-work", label: "Work" },
  { id: "process", label: "Process" },
  { id: "packages", label: "Packages" },
  { id: "why-us", label: "Why us" },
  { id: "insights", label: "Insights" },
  { id: "faq", label: "FAQ" },
  { id: "ready", label: "Ready" },
] as const;

const homeFaqCategories: HomeFaqCategory[] = [
  {
    key: "services",
    label: "Services",
    items: [
      {
        question: "What kind of websites do you build?",
        answer:
          "We design and develop custom business websites focused on clarity, speed, and enquiry flow. Most projects include service pages, contact capture, and SEO-ready structure from day one.",
      },
      {
        question: "Can you refresh my current website instead of starting from scratch?",
        answer:
          "Yes. We can either redesign your current site or rebuild it on a cleaner structure if performance and content flow need major improvements.",
      },
      {
        question: "Do you also help with content and structure?",
        answer:
          "Absolutely. We guide page structure, section order, and messaging so visitors understand your offer quickly and know what action to take.",
      },
    ],
  },
  {
    key: "process",
    label: "Process",
    items: [
      {
        question: "What is a typical timeline?",
        answer:
          "Most projects launch in 3 to 6 weeks, depending on scope, feedback speed, and content readiness.",
      },
      {
        question: "How many revisions are included?",
        answer:
          "Each package includes clear revision rounds tied to project milestones, so feedback stays focused and predictable.",
      },
      {
        question: "How involved do I need to be during the project?",
        answer:
          "We keep the process lightweight. You mainly review milestone drafts, approve direction, and share business details we use to shape the final site.",
      },
    ],
  },
  {
    key: "packages",
    label: "Packages",
    items: [
      {
        question: "Is pricing flexible?",
        answer:
          "Yes. Package pricing gives a clear starting range, then we adjust based on page count, content complexity, and extra functionality.",
      },
      {
        question: "How do I choose the right package?",
        answer:
          "We recommend a package after a short discovery call. The goal is to match your current business stage without overbuilding.",
      },
      {
        question: "Can I start small and expand later?",
        answer:
          "Definitely. We can launch with a focused scope and extend the site in phases as your business grows.",
      },
    ],
  },
  {
    key: "hosting",
    label: "Hosting & Ownership",
    items: [
      {
        question: "Do I own the website when the project is complete?",
        answer:
          "Yes. You own the final codebase and approved assets once the project closes.",
      },
      {
        question: "Who controls my domain name?",
        answer:
          "Your domain stays under your registrar account and renews yearly. We can assist with setup and renewals, but ownership remains with you.",
      },
      {
        question: "What is hosting and who provides it?",
        answer:
          "Hosting keeps your site live online. You can host with Horizon Digital or choose your own provider. We support both options.",
      },
    ],
  },
];

/* ── Package banner data ──────────────────────────────────── */
const packageBanners = [
  {
    ...foundationPackage,
    highlights: ["Up to 3 pages", "Mobile-friendly", "Contact form", "30-day support"],
    featured: false,
  },
  {
    ...starterPackage,
    highlights: ["Custom design", "SEO setup", "5 pages", "Analytics"],
    featured: true,
  },
  {
    ...growthPackage,
    highlights: ["10-12 pages", "Portfolio", "Multi-step form", "60-day support"],
    featured: false,
  },
];

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const [activeWork, setActiveWork] = useState<WorkPreviewItem | null>(null);
  const [passedSectionIds, setPassedSectionIds] = useState<string[]>([]);
  const [isRailOpen, setIsRailOpen] = useState(false);
  const handleWorkScrollTop = () => scrollToTopSmooth();
  const allHomeFaqItems = homeFaqCategories.flatMap((category) => category.items);

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
    mainEntity: allHomeFaqItems.map((faq) => ({
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
      <h1 className="sr-only">Clear, Professional Websites for Seychelles Businesses</h1>
      <Seo
        title="Website Design Seychelles - Fast Business Websites"
        description="Custom websites for Seychelles businesses. Clear design, fast performance, and structured packages. Start your website project with Horizon Digital."
        path="/"
        keywords="website design Seychelles, business websites Seychelles, web design packages Seychelles"
        structuredData={faqSchema}
      />
      <HomeHero />

      {/* ── Mobile jump rail ── */}
      {passedSectionIds.length > 0 && (
        <div className="fixed left-0 top-[64%] z-40 -translate-y-1/2 md:hidden">
          <button
            type="button"
            onClick={() => setIsRailOpen((prev) => !prev)}
            aria-label={isRailOpen ? "Close section jump rail" : "Open section jump rail"}
            className="jump-rail-toggle focus-ring h-12 w-[18px] rounded-r-full border border-l-0 border-accent/40 bg-bg-elev/95 text-base leading-none text-accent shadow-[0_8px_24px_rgba(2,8,12,0.32)]"
          >
            {isRailOpen ? "‹" : "›"}
          </button>

          {isRailOpen && (
            <nav aria-label="Section quick nav" className="ml-2 mt-2">
              <ul className="jump-rail-panel flex max-h-[64svh] flex-col gap-2 overflow-y-auto rounded-2xl border border-border bg-bg-elev/92 px-2 py-2 shadow-[0_8px_30px_rgba(2,8,12,0.35)] backdrop-blur">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      scrollToTopSmooth();
                      setIsRailOpen(false);
                    }}
                    className="jump-rail-top focus-ring rounded-full border border-border px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.14em] text-text-muted"
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
                        onClick={() => {
                          document
                            .getElementById(section.id)
                            ?.scrollIntoView({ behavior: "smooth", block: "start" });
                          setIsRailOpen(false);
                        }}
                        className="jump-rail-item focus-ring rounded-full border border-accent/35 bg-accent-soft px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.14em] text-accent"
                      >
                        {section.label}
                      </button>
                    </li>
                  ))}
              </ul>
            </nav>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          SERVICES — Split banner with 12-col grid
          ══════════════════════════════════════════════════════ */}
      <section id="services" className="services-split-banner overflow-hidden py-20 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent section-eyebrow-glow">
                Services
              </p>
              <h2 className="section-title mt-4 text-[2rem] font-semibold tracking-[-0.01em] text-text md:text-[3.5rem] md:leading-[1.1]">
                <WordReveal staggerDelay={0.06}>
                  Websites designed to be clear and convert
                </WordReveal>
              </h2>
              <AccentLine className="mt-5 w-24 md:w-36" direction="left" />
              <p className="mt-6 max-w-xl text-base leading-relaxed text-text-muted md:text-lg">
                Whether you are launching a new business or improving an existing site, the goal is
                the same: a website that helps customers understand what you do and how to contact
                you quickly.
              </p>

              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                <motion.div className="group">
                  <h3 className="text-sm font-semibold text-text transition-colors group-hover:text-accent">Present professionally</h3>
                  <p className="mt-1.5 text-sm text-text-muted">Clear imagery and branding that builds trust.</p>
                </motion.div>
                <motion.div className="group">
                  <h3 className="text-sm font-semibold text-text transition-colors group-hover:text-accent">Guide customers</h3>
                  <p className="mt-1.5 text-sm text-text-muted">Structured flows that lead to enquiries.</p>
                </motion.div>
                <motion.div className="group">
                  <h3 className="text-sm font-semibold text-text transition-colors group-hover:text-accent">Mobile-first</h3>
                  <p className="mt-1.5 text-sm text-text-muted">Work seamlessly on every device size.</p>
                </motion.div>
                <motion.div className="group">
                  <h3 className="text-sm font-semibold text-text transition-colors group-hover:text-accent">Fast & visible</h3>
                  <p className="mt-1.5 text-sm text-text-muted">Load quickly and support search engine discovery.</p>
                </motion.div>
              </div>

              <div className="mt-10 flex justify-center lg:justify-start">
                <Link to="/services-pricing">
                  <ShimmerButton
                    shimmerColor="#0b1212"
                    shimmerDuration="4.2s"
                    background="#46c6e8"
                    className="px-6 py-3 text-sm font-semibold tracking-[0.1em] text-black"
                  >
                    View services & pricing
                  </ShimmerButton>
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            >
              <div className="image-placeholder aspect-[4/3] lg:aspect-[3/4]">
                <p className="relative z-10 text-sm font-medium text-text-muted/70">Service showcase preview</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHAT WE BUILD 
          ══════════════════════════════════════════════════════ */}
      <section id="what-we-build" className="py-20 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <motion.div
              className="lg:col-span-5 lg:sticky lg:top-32"
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent section-eyebrow-glow">
                What Horizon Digital Builds
              </p>
              <h2 className="section-title mt-4 text-[2rem] font-semibold tracking-[-0.01em] text-text md:text-[3.2rem] md:leading-[1.1]">
                <WordReveal staggerDelay={0.05}>Core website services</WordReveal>
              </h2>
              <AccentLine className="mt-6 w-16" direction="left" />
              <p className="mt-6 text-base leading-relaxed text-text-muted md:text-lg">
                Built around clarity, speed, and customer journey structure.
              </p>
              <div className="mt-10 mb-8 aspect-[4/3] w-full max-w-sm overflow-hidden rounded-2xl bg-bg-panel lg:mb-0">
                <div className="image-placeholder h-full w-full">
                  <span className="text-sm font-medium text-text-muted/60">Builds showcase</span>
                </div>
              </div>
            </motion.div>
            
            <div className="lg:col-span-7">
              <div className="flex flex-col gap-8">
                {services.slice(0, 5).map((service, idx) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                    className="group border-b border-border/40 pb-8 last:border-0"
                  >
                    <div className="flex items-start gap-5">
                      <span className="mt-1 text-sm font-bold text-accent-2/40 transition-colors group-hover:text-accent-2">
                        / 0{idx + 1}
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold text-text md:text-2xl">{service.title}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-text-muted md:text-base">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          INDUSTRIES — Banner style list
          ══════════════════════════════════════════════════════ */}
      <section id="industries" className="relative py-20 md:py-32">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-bg-panel/20 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent section-eyebrow-glow">
              Built for Seychelles Businesses
            </p>
            <h2 className="section-title mx-auto mt-4 max-w-3xl text-[2rem] font-semibold tracking-[-0.01em] text-text md:text-[3.2rem] md:leading-[1.1]">
              Shaped for real local business needs
            </h2>
            <div className="mt-6 flex justify-center">
              <AccentLine className="w-24" direction="center" />
            </div>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-text-muted md:text-lg">
              From hospitality to professional services, structure changes based on how your customers decide.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-0 md:grid-cols-2 lg:grid-cols-12">
            {[
              {
                title: "Hospitality Businesses",
                desc: "Hotels, guesthouses, and tourism services benefit from clear information, strong visual presentation, and easy booking or enquiry paths.",
                span: "lg:col-span-7",
                bg: "bg-bg-panel/30",
              },
              {
                title: "Retail Businesses",
                desc: "Retail websites can showcase products, clarify what is available, and make it easy for customers to ask questions or place enquiries.",
                span: "lg:col-span-5",
                bg: "bg-bg-panel/50",
              },
              {
                title: "Professional Services",
                desc: "Consultants, agencies, and service providers need websites that explain value clearly and guide visitors toward confident contact decisions.",
                span: "lg:col-span-5",
                bg: "bg-bg-panel/50",
              },
              {
                title: "Growing Local Businesses",
                desc: "Businesses expanding their online presence need a structure that communicates credibility and supports steady growth over time.",
                span: "lg:col-span-7",
                bg: "bg-bg-panel/30",
              },
            ].map((industry, i) => (
              <motion.div
                key={industry.title}
                initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className={`${industry.span} ${industry.bg} group flex flex-col justify-between border border-border/40 p-10 transition-colors hover:bg-bg-panel/80 md:p-14`}
              >
                <div>
                  <h3 className="text-xl font-semibold text-text md:text-3xl">
                    <GlowUnderline>{industry.title}</GlowUnderline>
                  </h3>
                  <p className="mt-5 max-w-sm text-sm leading-relaxed text-text-muted md:text-base">
                    {industry.desc}
                  </p>
                </div>
                <div className="mt-12 h-32 w-full max-w-[200px] overflow-hidden rounded-xl">
                  <div className="image-placeholder h-full w-full">
                    <span className="text-xs text-text-muted/50">Industry img</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Link to="/contact">
              <ShimmerButton
                shimmerColor="#0b1212"
                shimmerDuration="4.2s"
                background="#46c6e8"
                className="px-6 py-3 text-sm font-semibold tracking-[0.1em] text-black"
              >
                Discuss your industry
              </ShimmerButton>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FEATURED WORK 
          ══════════════════════════════════════════════════════ */}
      <Section
        id="featured-work"
        eyebrow="Selected Website Projects"
        title="Examples of websites Horizon Digital builds"
        description="Retail, service, and hospitality website examples with clear business outcomes."
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

      {/* ══════════════════════════════════════════════════════
          PROCESS — Asymmetric 12-col layout
          ══════════════════════════════════════════════════════ */}
      <section id="process" className="py-20 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-20">
            {/* Left column — title area (4 cols) */}
            <motion.div
              className="lg:col-span-4 lg:sticky lg:top-32"
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent section-eyebrow-glow">
                How the website process works
              </p>
              <h2 className="section-title mt-3 text-[1.95rem] font-semibold tracking-[-0.01em] text-text md:text-[2.8rem] md:leading-[1.1]">
                <GlowUnderline>A clear</GlowUnderline> five-step workflow
              </h2>
              <p className="mt-4 text-base text-text-muted">
                Simple milestones from discovery to launch and post-launch support.
              </p>
              <div className="mt-8 hidden lg:block">
                <Link to="/services-pricing">
                  <ShimmerButton
                    shimmerColor="#0b1212"
                    shimmerDuration="4.2s"
                    background="#46c6e8"
                    className="px-5 py-2.5 text-xs font-semibold tracking-[0.12em] text-black"
                  >
                    See full process
                  </ShimmerButton>
                </Link>
              </div>
            </motion.div>

            {/* Right column — steps (8 cols) */}
            <div className="space-y-0 lg:col-span-8">
              {projectSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : 42 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.38 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.42, delay: index * 0.06, ease: "easeOut" }}
                  className="group relative border-b border-border py-8 pl-16 first:pt-0 last:border-0 md:py-10 md:pl-20"
                >
                  {/* Step number — positioned absolutely left */}
                  <span className="absolute left-0 top-8 font-display text-[2.5rem] font-bold leading-none text-accent/20 transition-colors group-hover:text-accent/50 md:top-10 md:text-[3rem]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[0.68rem] uppercase tracking-[0.4em] text-accent">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-text md:text-xl">{step.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-text-muted md:text-base">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="flex justify-center lg:hidden">
              <Link to="/services-pricing">
                <ShimmerButton
                  shimmerColor="#0b1212"
                  shimmerDuration="4.2s"
                  background="#46c6e8"
                  className="px-5 py-2.5 text-xs font-semibold tracking-[0.12em] text-black"
                >
                  See full process
                </ShimmerButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PACKAGES — Horizontal banner rows
          ══════════════════════════════════════════════════════ */}
      <section id="packages" className="py-20 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: "easeOut" }}
            className="mb-14 text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent section-eyebrow-glow">
              Website Packages
            </p>
            <h2 className="section-title mt-3 text-[1.95rem] font-semibold tracking-[-0.01em] text-text md:text-[3.15rem]">
              Website packages for different needs
            </h2>
            <p className="section-description mt-4 text-[1.05rem] leading-[1.65] text-text-muted">
              Foundation, Starter, and Growth packages with clear scope and pricing.
            </p>
          </motion.div>

          <div className="banner-row rounded-xl border border-border">
            {packageBanners.map((pkg, i) => (
              <motion.div
                key={pkg.title}
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                className={`pkg-banner px-6 py-8 md:px-10 md:py-10 ${
                  pkg.featured ? "pkg-banner-featured" : ""
                } last:border-b-0`}
              >
                <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-8">
                  <div className="lg:col-span-4">
                    <div className="flex items-baseline gap-3">
                      <h3 className="text-xl font-semibold text-accent-2 md:text-2xl">{pkg.title}</h3>
                      {pkg.featured && (
                        <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-accent">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="pricing-price mt-2 text-xl font-semibold text-accent md:text-2xl">{pkg.price}</p>
                    <p className="mt-2 text-sm text-text-muted">{pkg.description}</p>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="flex flex-wrap gap-2">
                      {pkg.highlights.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-border bg-bg-elev px-3 py-1.5 text-[0.72rem] text-text-muted"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center lg:col-span-3 lg:justify-end">
                    <Link to="/services-pricing">
                      <ShimmerButton
                        shimmerColor="#0b1212"
                        shimmerDuration="4.2s"
                        background={pkg.featured ? "#46c6e8" : "#2ca99b"}
                        className={`px-5 py-2.5 text-xs font-semibold tracking-[0.12em] ${
                          pkg.featured ? "text-black" : "text-white !border-[#2ca99b] !shadow-none"
                        }`}
                      >
                        Discuss your project
                      </ShimmerButton>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="mt-10 rounded-2xl border border-accent/30 bg-bg-elev px-8 py-10 md:px-12"
          >
            <div className="grid items-center gap-6 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h3 className="text-xl font-semibold text-accent-2">{customPackage.title}</h3>
                <p className="mt-1 text-2xl font-semibold text-accent">Let's chat</p>
                <p className="mt-3 max-w-2xl text-sm text-text-muted">{customPackage.description}</p>
                <p className="mt-2 text-sm text-text-muted">
                  Advanced builds are scoped per project. We will clarify your requirements, then provide
                  a clear proposal and timeline.
                </p>
              </div>
              <div className="flex justify-center lg:col-span-4 lg:justify-end">
                <Link to="/contact">
                  <ShimmerButton
                    shimmerColor="#0b1212"
                    shimmerDuration="4.2s"
                    background="#46c6e8"
                    className="px-6 py-3 text-sm font-semibold tracking-[0.1em] text-black"
                  >
                    Request a custom scope
                  </ShimmerButton>
                </Link>
              </div>
            </div>
          </motion.div>
          <p className="mt-6 text-center text-sm text-text-muted">Final pricing depends on scope.</p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHY US 
          ══════════════════════════════════════════════════════ */}
      <section id="why-us" className="py-20 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="mb-16 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent section-eyebrow-glow">
              Why businesses choose Horizon Digital
            </p>
            <h2 className="section-title mx-auto mt-4 max-w-4xl text-[2rem] font-semibold tracking-[-0.01em] text-text md:text-[3.2rem] md:leading-[1.1]">
              <WordReveal>Clear process, practical design, modern performance</WordReveal>
            </h2>
            <div className="mt-6 flex justify-center">
              <AccentLine className="w-20" direction="center" />
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-4 lg:gap-8">
            {[
              { title: "Clear Communication", text: "The project process stays straightforward from scope to launch, so you always know what is happening next." },
              { title: "Practical Website Design", text: "Layout and content decisions are made to help visitors understand your offer quickly and take clear action." },
              { title: "Modern Performance", text: "Fast loading, mobile responsiveness, and clean technical setup improve trust and usability from first visit." },
              { title: "Structured Projects", text: "A defined milestone flow helps the project move efficiently with fewer delays and better delivery confidence." },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="relative flex flex-col border-t border-border pt-8"
              >
                <span className="absolute -top-6 left-0 bg-bg px-2 font-display text-4xl font-bold text-accent/20">
                  [{i + 1}]
                </span>
                <h3 className="text-xl font-semibold text-accent-2">{feature.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-text-muted">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          INSIGHTS 
          ══════════════════════════════════════════════════════ */}
      <section id="insights" className="py-20 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="group relative overflow-hidden rounded-3xl border border-border/50 bg-bg-panel/30"
          >
            <div className="grid lg:grid-cols-12">
              <div className="flex flex-col justify-center p-10 md:p-16 lg:col-span-7">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent section-eyebrow-glow">
                  Digital Insights
                </p>
                <h2 className="mt-4 text-3xl font-semibold text-text md:text-5xl">
                  Digital insights for <GlowUnderline>business owners</GlowUnderline>
                </h2>
                <p className="mt-5 text-base leading-relaxed text-text-muted md:text-lg">
                  Simple, practical reads on AI, automation, analytics, and modern digital decisions.
                </p>
                
                <ul className="mt-8 space-y-4 text-sm text-text-muted md:text-base">
                  <li className="flex items-center gap-3"><span className="text-accent">↗</span> Digital trends affecting small businesses</li>
                  <li className="flex items-center gap-3"><span className="text-accent">↗</span> Understanding AI chatbots</li>
                  <li className="flex items-center gap-3"><span className="text-accent">↗</span> Why data and analytics matter</li>
                  <li className="flex items-center gap-3"><span className="text-accent">↗</span> How automation saves time</li>
                </ul>

                <div className="mt-10 flex justify-start">
                  <Link to="/insights">
                    <ShimmerButton
                      shimmerColor="#0b1212"
                      shimmerDuration="4.2s"
                      background="#46c6e8"
                      className="px-6 py-3 text-sm font-semibold tracking-[0.1em] text-black"
                    >
                      Read digital insights
                    </ShimmerButton>
                  </Link>
                </div>
              </div>
              
              <div className="relative min-h-[300px] lg:col-span-5 lg:min-h-full">
                <div className="image-placeholder absolute inset-0 rounded-none border-0 transition-colors duration-500 group-hover:after:bg-black/10">
                  <span className="relative z-10 text-sm font-medium uppercase tracking-widest text-text-muted/60">Insights Visual</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FAQ
          ══════════════════════════════════════════════════════ */}
      <Section
        id="faq"
        eyebrow="FAQ"
        title="Clarity before we start"
        description="Straight answers to help you plan with confidence."
      >
        <HomeFaq categories={homeFaqCategories} />
        <div className="mt-10 flex flex-col items-center gap-6 rounded-3xl border border-border bg-bg-elev px-6 py-8 text-center md:flex-row md:justify-between md:text-left">
          <p className="text-sm text-text-muted">Still have questions? We can walk you through it.</p>
          <Link to="/contact">
            <ShimmerButton
              shimmerColor="#0b1212"
              shimmerDuration="4.2s"
              background="#46c6e8"
              className="px-5 py-2 text-xs font-semibold tracking-[0.12em] text-black"
            >
              Book a free consult
            </ShimmerButton>
          </Link>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════
          READY — Full-width CTA banner with 12-col asymmetry
          ══════════════════════════════════════════════════════ */}
      <section id="ready" className="ready-banner bg-bg-elev">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-10 py-24 md:py-32 lg:grid-cols-12">
            <motion.div
              className="text-center lg:col-span-7 lg:text-left"
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <p className="text-xs uppercase tracking-[0.4em] text-accent">Ready to build</p>
              <h2 className="mt-3 text-3xl font-semibold text-text md:text-5xl md:leading-[1.1]">
                Empowering Your{" "}
                <GlowUnderline>
                  <span className="text-accent-2">Digital Horizon</span>
                </GlowUnderline>
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-base text-text-muted lg:mx-0">
                Start your website project with confidence. Tell us about your business and we will guide you through the next steps.
              </p>
            </motion.div>
            <motion.div
              className="flex justify-center lg:col-span-5 lg:justify-end"
              initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              <Link to="/contact">
                <ShimmerButton
                  shimmerColor="#0b1212"
                  shimmerDuration="4.2s"
                  background="#46c6e8"
                  className="px-8 py-4 text-base font-semibold tracking-[0.08em] text-black md:text-lg"
                >
                  Book a free consult
                </ShimmerButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Work preview modal ── */}
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
