import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Button from "../components/Button";
import Section from "../components/Section";
import Seo from "../components/Seo";
import HomeHero from "../components/ui/home-hero";
import HomeFaq, { type HomeFaqCategory } from "../components/ui/home-faq";
import HomeWorkAccordion from "../components/ui/home-work-accordion";
import { ShimmerButton } from "../components/ui/shimmer-button";
import { Link } from "react-router-dom";
import { scrollToTopSmooth } from "../lib/utils";
import MarqueeBanner from "../components/ui/MarqueeBanner";
import {
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
  const [, setActiveWork] = useState<WorkPreviewItem | null>(null);
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
      <MarqueeBanner 
        items={["Hospitality", "Retail", "Real Estate", "Professional Services", "Wellness", "E-commerce"]}
      />

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

      {/* ── OUR SERVICES ── */}
      <section id="services" className="py-24 md:py-32 bg-black border-t border-white/[0.05]">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-14">
          <div className="mb-16 text-left relative">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-cyan-400 mb-6">Our Services</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-display text-4xl font-medium tracking-tight text-white md:text-6xl lg:text-7xl max-w-3xl leading-[1.05]">
              Websites built around how your business actually works.
            </h2>
              <Link to="/work" className="text-sm font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-2 group whitespace-nowrap mb-2">
                View Full Spectrum <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => {
              const Icons = [
                () => (
                  <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                () => (
                  <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-3" />
                  </svg>
                ),
                () => (
                  <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                ),
                () => (
                  <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                )
              ];
              const Icon = Icons[idx] || Icons[0];
              
              return (
                <div key={service.title} className="p-10 rounded-2xl bg-[#121214] border border-white/[0.08] hover:border-cyan-400/30 transition-all group">
                  <div className="w-12 h-12 rounded-lg bg-cyan-400/10 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                    <Icon />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4 pr-4">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── THE METHODOLOGY ── */}
      <section id="methodology" className="py-24 md:py-32 bg-black border-t border-white/[0.05]">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-14">
          <div className="mb-20 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-cyan-400 mb-6">The Methodology</p>
            <h2 className="font-display text-4xl font-medium tracking-tight text-white md:text-6xl lg:text-7xl">
              A clear path from vision to launch.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-4 relative text-center">
             {/* Subtle line behind */}
             <div className="absolute top-10 left-0 right-0 h-px bg-white/10 hidden md:block" />
             
             {projectSteps.map((step, idx) => (
                <div key={step.title} className="flex flex-col items-center relative z-10">
                  <div className="w-20 h-20 rounded-full border-2 border-cyan-400 flex items-center justify-center text-xl font-bold text-cyan-400 bg-black mb-6 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500 leading-relaxed px-2">
                    {step.description}
                  </p>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED WORK ── */}
      <Section
        id="featured-work"
        eyebrow="Real results, real businesses"
        title="See what's possible for your business"
        description="Businesses just like yours — built with care, launched with confidence."
        containerClassName="max-w-[92rem]"
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

      {/* ── INVESTMENT TIERS ── */}
      <section id="packages" className="py-24 md:py-40 bg-black border-t border-white/[0.05]">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-14">
          <div className="mb-20 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-cyan-400 mb-6 font-display italic">Investment Tiers</p>
            <h2 className="font-display text-4xl font-medium tracking-tight text-white md:text-6xl lg:text-7xl">
              Which package works for you?
            </h2>
          </div>

          <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {[
              { ...foundationPackage, featured: false },
              { ...starterPackage, featured: true },
              { ...growthPackage, featured: false }
            ].map((pkg) => (
              <div 
                key={pkg.title}
                className={`flex flex-col relative p-10 rounded-2xl border transition-all duration-500 ${
                  pkg.featured 
                    ? "bg-[#121214] border-cyan-400/60 shadow-[0_0_80px_rgba(34,211,238,0.1)] scale-105 z-20" 
                    : "bg-[#121214] border-white/[0.1] z-10 hover:border-white/[0.2]"
                }`}
              >
                {pkg.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-400 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-black">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">{pkg.title === "Foundation" ? "Essentials" : pkg.title === "Starter" ? "Scalable" : "Full Scale"}</p>
                  <h3 className="text-3xl font-semibold text-white mb-6 pr-4 leading-tight tracking-tight font-display">{pkg.title}</h3>
                  <p className="text-4xl font-light text-cyan-400 font-display mb-6">
                    {pkg.price.replace("From ", "").replace("SCR ", "SCR ")}
                  </p>
                </div>

                <ul className="space-y-4 mb-10 flex-grow">
                  {pkg.includes.slice(0, 6).map((item, idx) => (
                    <li key={`${item}-${idx}`} className="flex items-start gap-3">
                      <svg className="h-4 w-4 text-cyan-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-400">{item}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/contact" className="mt-auto">
                  <button className={`w-full py-4 rounded-lg text-xs font-black uppercase tracking-[0.2em] transition-all transform active:scale-95 ${
                    pkg.featured 
                      ? "bg-cyan-400 text-black hover:bg-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.4)]" 
                      : "bg-white/[0.02] border border-cyan-400/20 text-white hover:bg-white/[0.05] hover:border-cyan-400/40"
                  }`}>
                    Get Started
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section id="why-us" className="py-20 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="mb-16 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent section-eyebrow-glow">
              Why clients come back
            </p>
            <h2 className="section-title mx-auto mt-4 max-w-4xl text-[2rem] font-semibold tracking-[-0.01em] text-text md:text-[3.2rem] md:leading-[1.1]">
              We make it <span className="text-accent">easy</span> to trust the process
            </h2>
            <div className="mt-6 flex justify-center">
              <div className="w-20 h-1 bg-accent/40 rounded-full" />
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-4 lg:gap-8">
            {[
              { title: "You'll always know what's next", text: "We keep things straightforward from your first message to launch day. No guessing, no radio silence." },
              { title: "Built to help people say yes", text: "Every layout and word is chosen to help your visitors understand your offer and reach out with confidence." },
              { title: "Fast, smooth, and ready on any device", text: "Your site will load quickly and look great everywhere — from a desktop in an office to a phone on the beach." },
              { title: "Delivered without the chaos", text: "A clear milestone structure keeps the project moving — so your website arrives on time and without drama." },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="relative flex flex-col border-t border-border pt-8"
              >
                <span className="absolute -top-6 left-0 bg-bg px-2 font-display text-4xl font-bold text-accent/20">
                  [{i + 1}]
                </span>
                <h3 className="text-xl font-semibold text-accent-2 mb-4 h-[3.5rem] flex items-end">{feature.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-text-muted">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSIGHTS ── */}
      <section id="insights" className="py-20 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.4 }}
            className="group relative overflow-hidden rounded-3xl border border-border/50 bg-[#1A1A1C]"
          >
            <div className="grid lg:grid-cols-12">
              <div className="relative z-20 flex flex-col justify-center p-10 md:p-16 lg:col-span-7">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent section-eyebrow-glow">
                  Stay in the know
                </p>
                <h2 className="mt-4 text-3xl font-semibold text-white md:text-5xl">
                  The digital world, explained simply.
                </h2>
                <p className="mt-5 text-base leading-relaxed text-text-muted md:text-lg">
                  No jargon. No fluff. Just the things worth knowing for your business.
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
                      shimmerColor="#0A0A0C"
                      shimmerDuration="4.2s"
                      background="#00E5FF"
                      className="px-6 py-3 text-sm font-semibold tracking-[0.1em] text-black"
                    >
                      Read digital insights
                    </ShimmerButton>
                  </Link>
                </div>
              </div>
              
              <div className="relative min-h-[350px] lg:col-span-5 lg:min-h-full flex items-center justify-center p-8 lg:p-12 overflow-visible">
                <div className="absolute inset-0 bg-gradient-to-r from-bg-panel/30 to-transparent z-0 lg:hidden pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full lg:w-[150%] lg:h-[120%] bg-accent/25 blur-[140px] rounded-full z-0 pointer-events-none" />

                <div className="relative z-10 flex h-full w-full max-w-[400px] lg:max-w-none lg:w-[160%] lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:-left-24 items-center justify-center pt-8 pr-12 lg:pr-0 pointer-events-none">
                  <motion.div
                    className="absolute left-0 lg:left-0 top-1/2 w-52 lg:w-64 -translate-y-[45%] rounded-[1.25rem] shadow-[0_0_60px_rgba(0,229,255,0.3)] border-2 border-accent/30 z-10"
                    initial={{ opacity: 0, x: -30, rotate: -4 }}
                    whileInView={{ opacity: 1, x: 0, rotate: -4 }}
                    animate={{ y: [-15, 5, -15], rotate: [-4, -2, -4] }}
                    viewport={{ once: false }}
                    transition={{ 
                      opacity: { duration: 0.6, delay: 0.2 },
                      x: { duration: 0.6, delay: 0.2 },
                      y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                      rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    <img src="/digital trends 1.png" alt="Digital trends affecting small businesses" className="w-full h-auto rounded-xl object-cover" />
                  </motion.div>
                  
                  <motion.div
                    className="absolute left-[20%] lg:left-[22%] top-1/2 w-60 lg:w-[18rem] -translate-y-[48%] rounded-[1.25rem] shadow-[0_0_80px_rgba(0,229,255,0.45)] border-2 border-accent/40 z-20"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    animate={{ y: [-10, 10, -10], scale: [1, 1.02, 1] }}
                    viewport={{ once: false }}
                    transition={{ 
                      opacity: { duration: 0.6, delay: 0.3 },
                      x: { duration: 0.6, delay: 0.3 },
                      y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                      scale: { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    <img src="/digital trends 2.png" alt="Understanding AI chatbots" className="w-full h-auto rounded-xl object-cover" />
                  </motion.div>

                  <motion.div
                    className="absolute left-[40%] lg:left-[45%] top-1/2 w-64 lg:w-[22rem] -translate-y-[52%] rounded-[1.25rem] shadow-[0_0_120px_rgba(0,229,255,0.6)] border-2 border-accent/50 z-30"
                    initial={{ opacity: 0, x: 20, rotate: 3 }}
                    whileInView={{ opacity: 1, x: 0, rotate: 3 }}
                    animate={{ y: [-5, 15, -5], rotate: [3, 5, 3] }}
                    viewport={{ once: false }}
                    transition={{ 
                      opacity: { duration: 0.6, delay: 0.4 },
                      x: { duration: 0.6, delay: 0.4 },
                      y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 },
                      rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    <img src="/digital trends 3.png" alt="Why data and analytics matter" className="w-full h-auto rounded-xl object-cover" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <Section
        id="faq"
        eyebrow="You probably have questions"
        title="We've answered the ones we hear most"
        description="Honest, plain-language answers — so you feel confident before we begin."
      >
        <HomeFaq categories={homeFaqCategories} />
        <div className="mt-10 flex flex-col items-center gap-6 rounded-3xl border border-border bg-[#1A1A1C] px-6 py-8 text-center md:flex-row md:justify-between md:text-left">
          <p className="text-sm text-text-muted">Still have questions? We can walk you through it.</p>
          <Link to="/contact">
             <ShimmerButton
              shimmerColor="#0A0A0C"
              shimmerDuration="4.2s"
              background="#00E5FF"
              className="px-6 py-3 text-sm font-semibold tracking-[0.1em] text-black"
            >
              Contact us
            </ShimmerButton>
          </Link>
        </div>
      </Section>

      {/* ── READY ── */}
      <section id="ready" className="py-24 md:py-40 bg-gradient-to-b from-transparent to-bg-elev/20">
        <div className="mx-auto w-full max-w-4xl px-5 sm:px-8 text-center">
           <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
           >
              <h2 className="text-4xl md:text-7xl font-semibold text-text mb-8">
                Let's build something <br /><span className="text-accent underline decoration-accent/20">you're proud of</span>
              </h2>
              <p className="text-lg md:text-2xl text-text-muted mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                A short, free call is all it takes to get started. No pressure. Just a conversation.
              </p>
              <div className="flex justify-center">
                <Link to="/contact">
                  <ShimmerButton
                    shimmerColor="#0A0A0C"
                    shimmerDuration="4.2s"
                    background="#00E5FF"
                    className="px-8 py-5 text-lg font-bold tracking-[0.1em] text-black"
                  >
                    Book a discovery call
                  </ShimmerButton>
                </Link>
              </div>
           </motion.div>
        </div>
      </section>

    </div>
  );
}
