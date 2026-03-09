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

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const [activeWork, setActiveWork] = useState<WorkPreviewItem | null>(null);
  const [mobileOpen, setMobileOpen] = useState({
    foundation: false,
    starter: false,
    growth: false,
  });
  const [passedSectionIds, setPassedSectionIds] = useState<string[]>([]);
  const [isRailOpen, setIsRailOpen] = useState(false);
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

      <Section
        id="services"
        eyebrow="Services"
        title="Website Design That Works for Real Businesses"
        description="Structured website design services that make the process simple, clear, and practical."
        className="!pt-12 !pb-16 md:!pt-20 md:!pb-24"
      >
        <div className="section-band section-band-strong relative left-1/2 right-1/2 -mx-[50vw] my-8 w-screen py-14 md:my-10 md:py-16">
          <div className="mx-auto w-full max-w-7xl px-8">
            <p className="mx-auto max-w-4xl text-sm text-text">
              Whether you are launching a new business or improving an existing site, the goal is
              the same: a website that helps customers understand what you do and how to contact
              you quickly.
            </p>
            <ul className="mx-auto mt-8 grid max-w-4xl gap-4 text-sm text-text-muted sm:grid-cols-2">
              <li className="rounded-xl border border-border px-4 py-3">Present your business professionally</li>
              <li className="rounded-xl border border-border px-4 py-3">Guide customers clearly through your services</li>
              <li className="rounded-xl border border-border px-4 py-3">Work smoothly on mobile devices</li>
              <li className="rounded-xl border border-border px-4 py-3">Load quickly and support search visibility</li>
            </ul>
            <div className="mt-6">
              <Link to="/services-pricing">
                <ShimmerButton
                  shimmerColor="#0b1212"
                  shimmerDuration="4.2s"
                  background="#46c6e8"
                  className="px-5 py-2 text-xs font-semibold tracking-[0.12em] text-black"
                >
                  Explore website services and packages
                </ShimmerButton>
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="what-we-build"
        eyebrow="What Horizon Digital Builds"
        title="Core website services"
        description="Built around clarity, speed, and customer journey structure."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 5).map((service) => (
            <Card key={service.title}>
              <h3 className="text-lg font-semibold text-accent-2">{service.title}</h3>
              <p className="mt-3 text-sm text-text-muted">{service.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="industries"
        eyebrow="Built for Seychelles Businesses"
        title="Websites shaped for real local business needs"
        description="From hospitality to professional services, structure changes based on how your customers decide."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h3 className="text-lg font-semibold text-accent-2">Hospitality Businesses</h3>
            <p className="mt-3 text-sm text-text-muted">
              Hotels, guesthouses, and tourism services benefit from clear information, strong visual
              presentation, and easy booking or enquiry paths.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-accent-2">Retail Businesses</h3>
            <p className="mt-3 text-sm text-text-muted">
              Retail websites can showcase products, clarify what is available, and make it easy for
              customers to ask questions or place enquiries.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-accent-2">Professional Services</h3>
            <p className="mt-3 text-sm text-text-muted">
              Consultants, agencies, and service providers need websites that explain value clearly
              and guide visitors toward confident contact decisions.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-accent-2">Growing Local Businesses</h3>
            <p className="mt-3 text-sm text-text-muted">
              Businesses expanding their online presence need a structure that communicates
              credibility and supports steady growth over time.
            </p>
          </Card>
        </div>
      </Section>

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

      <Section
        id="process"
        eyebrow="How the website process works"
        title="A clear five-step project structure"
        description="Simple milestones from discovery to launch and post-launch support."
      >
        <div className="section-band section-band-medium relative left-1/2 right-1/2 mt-14 -mx-[50vw] mb-8 w-screen py-16 md:mt-16 md:mb-10 md:py-20">
          <div className="mx-auto grid w-full max-w-7xl gap-8 px-8 md:grid-cols-2 lg:grid-cols-5">
          {projectSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : 42 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.38 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.42, delay: index * 0.06, ease: "easeOut" }}
              className="min-w-0"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-accent">Step {index + 1}</p>
              <h3 className="mt-3 text-lg font-semibold text-text">{step.title}</h3>
              <p className="mt-3 text-sm text-text-muted">{step.description}</p>
            </motion.div>
          ))}
          </div>
        </div>
      </Section>

      <Section
        id="packages"
        eyebrow="Website packages"
        title="Website packages for different business needs"
        description="Foundation, Starter, and Growth packages with clear scope and pricing."
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
                      background="#46c6e8"
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
                  background="#46c6e8"
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
                background="#46c6e8"
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
        id="why-us"
        eyebrow="Why businesses choose Horizon Digital"
        title="Clear process, practical design, modern performance"
        description="Every decision is focused on clarity, speed, and better enquiries."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h3 className="text-lg font-semibold text-accent-2">Clear Communication</h3>
            <p className="mt-3 text-sm text-text-muted">
              The project process stays straightforward from scope to launch, so you always know
              what is happening next.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-accent-2">Practical Website Design</h3>
            <p className="mt-3 text-sm text-text-muted">
              Layout and content decisions are made to help visitors understand your offer quickly
              and take clear action.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-accent-2">Modern Performance</h3>
            <p className="mt-3 text-sm text-text-muted">
              Fast loading, mobile responsiveness, and clean technical setup improve trust and
              usability from first visit.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-accent-2">Structured Projects</h3>
            <p className="mt-3 text-sm text-text-muted">
              A defined milestone flow helps the project move efficiently with fewer delays and
              better delivery confidence.
            </p>
          </Card>
        </div>
      </Section>

      <Section
        id="insights"
        eyebrow="Digital Insights"
        title="Digital insights for business owners"
        description="Simple, practical reads on AI, automation, analytics, and modern digital decisions."
      >
        <Card>
          <ul className="grid gap-3 text-sm text-text-muted md:grid-cols-2">
            <li>Digital trends affecting small businesses</li>
            <li>Understanding AI chatbots</li>
            <li>Why data and analytics matter for growth</li>
            <li>How automation can save business time</li>
          </ul>
          <div className="mt-6">
            <Link to="/insights">
              <ShimmerButton
                shimmerColor="#0b1212"
                shimmerDuration="4.2s"
                background="#46c6e8"
                className="px-5 py-2 text-xs font-semibold tracking-[0.12em] text-black"
              >
                Read digital insights
              </ShimmerButton>
            </Link>
          </div>
        </Card>
      </Section>

      <Section
        id="faq"
        eyebrow="FAQ"
        title="Clarity before we start"
        description="Straight answers to help you plan with confidence."
      >
        <HomeFaq categories={homeFaqCategories} />
        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-border bg-bg-elev px-6 py-6">
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

      <section id="ready" className="bg-bg-elev">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-10 px-8 py-28 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-accent">Ready to build</p>
            <h2 className="mt-3 text-3xl font-semibold text-text md:text-4xl">
              Start your website project with confidence
            </h2>
            <p className="mt-4 text-sm text-text-muted">
              Tell us about your business and we will guide you through the next steps.
            </p>
          </div>
          <Link to="/contact">
            <ShimmerButton
              shimmerColor="#0b1212"
              shimmerDuration="4.2s"
              background="#46c6e8"
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
