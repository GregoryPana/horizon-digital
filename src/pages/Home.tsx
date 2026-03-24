import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Seo from "../components/Seo";
import HomeFaq, { type HomeFaqCategory } from "../components/ui/home-faq";
import { ShimmerButton } from "../components/ui/shimmer-button";
import { Link } from "react-router-dom";
import { scrollToTopSmooth } from "../lib/utils";
import {
  foundationPackage,
  starterPackage,
  growthPackage,
  customPackage,
  siteConfig,
  projectSteps,
  workItems,
} from "../data/site";
import heroDesktop from "../assets/hero/hero-desktop-tech-v2.webp";
import heroMobile from "../assets/hero/hero-mobile-tech-v2.webp";
import drakeHeroBg from "../assets/work/drake-seaside/hero-bg.jpg";

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

const marqueeItems = [
  "Visible on Google within weeks of launch",
  "Average project: 3-5 weeks",
  "Your site, owned by you forever",
  "Launched in under 4 weeks",
  "Zero enquiries to consistent bookings",
];

const problemCards = [
  {
    title: "My website looks outdated",
    body: "I'm embarrassed to share it with customers. It doesn't reflect the quality of service we provide in person.",
    color: "cyan",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </>
    ),
  },
  {
    title: "Customers cannot find me",
    body: "I tell people to Google us, but we don't show up. I don't know how to fix it and competitors get all the search traffic.",
    color: "cyan",
    icon: (
      <>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </>
    ),
  },
  {
    title: "Zero enquiries",
    body: "The site is online but has never brought a new customer. It feels like an expense, not an asset.",
    color: "cyan",
    icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
  },
] as const;

function WorkShowcase() {
  const showcase = useMemo(
    () => [
      {
        ...workItems[0],
        tier: "Growth Tier",
        stats: [
          { value: "340%", label: "Enquiry Increase" },
          { value: "3 weeks", label: "First booking" },
        ],
      },
      {
        ...workItems[2],
        tier: "Foundation Tier",
        stats: [
          { value: "85%", label: "Direct bookings" },
          { value: "4.9", label: "Guest rating" },
        ],
      },
      {
        ...workItems[1],
        tier: "Foundation Tier",
        stats: [
          { value: "12x", label: "Portfolio views" },
          { value: "Featured", label: "Editorial style" },
        ],
      },
    ],
    []
  );

  const getWorkBackdrop = (index: number, fallback: string) => {
    if (index === 0) return drakeHeroBg;
    return fallback;
  };

  return (
    <section id="work" className="relative overflow-hidden bg-[#0A0A0C]">
      <div className="relative z-30 mx-auto max-w-7xl bg-[#0A0A0C] px-6 pb-10 pt-24 md:pt-28">
        <div className="mb-20 text-center">
          <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-accent section-eyebrow-glow">Real Results, Real Businesses</span>
          <h2 className="font-display mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            See what is <span className="text-cyan hd-text-glow">possible</span> for your business
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-400">Three businesses. Three transformations. One studio that cares.</p>
        </div>
      </div>

      {showcase.map((project, idx) => (
        <article key={project.title} className="relative min-h-[135vh]">
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                src={getWorkBackdrop(idx, project.image)}
                alt={project.title}
                className="h-full w-full scale-[1.08] object-cover opacity-66"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C] via-transparent to-[#0A0A0C]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_112%_100%_at_center,transparent_0%,#0A0A0C_86%)] translate-y-[-1px]" />
              <div className="absolute inset-0 md:hidden bg-gradient-to-b from-[#0A0A0C]/86 via-[#0A0A0C]/34 to-[#0A0A0C]/90" />
            </div>

            <div className="relative z-20 mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
              <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative rounded-[2.5rem] border border-white/[0.05] bg-black/10 p-8 text-center backdrop-blur-[1px] md:p-12 md:text-left lg:-ml-12 xl:-ml-16">
                  <div className="mx-auto mb-7 inline-flex items-center gap-3 rounded-full border border-cyan/35 bg-cyan/10 px-4 py-2 md:mx-0">
                    <span className="h-2 w-2 rounded-full bg-cyan animate-pulse shadow-[0_0_10px_#00E5FF]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan md:text-xs">{project.tier}</span>
                  </div>
                  <h3 className="font-display text-4xl font-bold uppercase tracking-[-0.04em] text-white md:text-7xl">
                    {project.title}
                  </h3>
                  <p className="mx-auto mt-6 max-w-xl text-lg text-gray-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] md:mx-0 md:text-2xl">{project.outcome}</p>

                  <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-x-10 md:justify-start">
                    <Link
                      to="/services-pricing"
                      className="group flex flex-1 items-center justify-center rounded-lg border border-cyan/40 bg-transparent px-8 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] text-cyan transition-all hover:border-cyan hover:bg-cyan/5 md:flex-none md:text-[11px]"
                    >
                      <span className="whitespace-nowrap">Get Started</span>
                      <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>

                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex flex-1 items-center justify-center rounded-lg border border-cyan/40 bg-transparent px-8 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] text-cyan transition-all hover:border-cyan hover:bg-cyan/5 md:flex-none md:text-[11px]"
                      >
                        <span className="whitespace-nowrap">Explore Project</span>
                        <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className={`hidden lg:block ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className={`relative ${idx % 2 === 0 ? "rotate-3" : "-rotate-3"} rounded-2xl border border-white/10 bg-[#1A1A1C] p-2 shadow-2xl transition-transform duration-700 hover:rotate-0`}>
                  <img src={project.image} alt={project.title} className="h-80 w-full rounded-xl object-cover" loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const allHomeFaqItems = homeFaqCategories.flatMap((category) => category.items);
  const handleWorkScrollTop = () => scrollToTopSmooth();

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
    <div className="bg-[#0A0A0C] text-white">
      <Seo
        title="Website Design Seychelles - Fast Business Websites"
        description="Custom websites for Seychelles businesses. Clear design, fast performance, and structured packages. Start your website project with Horizon Digital."
        path="/"
        keywords="website design Seychelles, business websites Seychelles, web design packages Seychelles"
        structuredData={faqSchema}
      />

      <section id="top" className="relative h-[100svh] min-h-[660px] w-full overflow-hidden bg-[#0A0A0C] text-white md:h-screen md:min-h-[700px]">
        <picture className="absolute inset-0 z-0">
          <source media="(max-width: 768px)" srcSet={heroMobile} />
          <img
            src={heroDesktop}
            alt="Horizon Digital hero"
            className="h-full w-full object-cover object-center"
            fetchPriority="high"
            loading="eager"
            width={1600}
            height={900}
          />
        </picture>
        <div className="absolute inset-0 z-[1] bg-[#0A0A0C]/20" />
        <div className="absolute inset-x-0 bottom-0 z-[1] h-[60%] bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/80 via-[#0A0A0C]/40 to-transparent" />
        <div className="absolute inset-0 z-[2]">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C]/88 via-[#0A0A0C]/48 to-transparent md:hidden" />
          <div className="absolute inset-y-0 left-0 hidden w-[75%] bg-gradient-to-r from-[#0A0A0C]/86 via-[#0A0A0C]/38 to-transparent md:block" />
        </div>

        <div className="absolute bottom-0 z-0 h-[60%] w-full opacity-60 mix-blend-screen pointer-events-none" style={{ perspective: "1000px" }}>
          <div className="hd-grid-plane absolute left-[-50%] top-0 h-[200%] w-[200%]" />
        </div>

        <div className="hd-float absolute right-[28%] top-[58%] z-0 hidden h-48 w-64 -translate-y-1/2 flex-col rounded-xl border border-cyan/55 bg-cyan/15 p-4 shadow-[0_0_0_1.5px_rgba(0,229,255,0.72),0_0_66px_rgba(0,229,255,0.68)] backdrop-blur-md lg:flex hd-box-glow">
          <div className="mb-4 flex items-center gap-2 border-b border-cyan/20 pb-2">
            <div className="h-3 w-3 rounded-full bg-cyan/60 shadow-[0_0_10px_#00E5FF]" />
            <div className="h-3 w-3 rounded-full bg-white/20" />
            <div className="h-3 w-3 rounded-full bg-white/20" />
          </div>
          <div className="flex-1 space-y-3">
            <div className="h-4 w-3/4 rounded bg-white/10" />
            <div className="h-4 w-1/2 rounded bg-white/10" />
            <div className="mt-auto h-16 w-full rounded border border-cyan/10 bg-gradient-to-t from-cyan/20 to-transparent" />
          </div>
        </div>

        <div className="hd-float-reverse absolute right-[15%] top-[44%] z-0 hidden h-56 w-48 -translate-y-1/2 flex-col rounded-xl border border-cyan/40 bg-cyan/12 p-4 shadow-[0_0_42px_rgba(0,229,255,0.4)] backdrop-blur-md lg:flex">
          <div className="mb-auto grid grid-cols-2 gap-2">
            <div className="h-12 rounded bg-white/5" />
            <div className="h-12 rounded bg-white/5" />
            <div className="col-span-2 h-12 rounded bg-white/5" />
          </div>
          <div className="mt-4 h-1 w-full overflow-hidden rounded bg-cyan/30">
            <div className="h-full w-2/3 bg-cyan shadow-[0_0_16px_#00E5FF]" />
          </div>
        </div>

        <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1760px] flex-col justify-between px-6 pb-[4svh] pt-20 md:min-h-screen md:px-10 md:pt-48 lg:px-14 xl:px-20">
          <div className="z-20 flex flex-col md:flex-row md:items-end md:justify-between">
            <div className="max-w-4xl">
              <motion.p
                initial={shouldReduceMotion ? undefined : { opacity: 0, x: -20 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="mb-6 text-[11px] font-bold uppercase leading-none tracking-[0.3em] text-accent section-eyebrow-glow"
              >
                Web Design Studio • Seychelles
              </motion.p>

              <motion.h1
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10, scale: 0.98 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-display mb-3 min-h-[4em] text-[1.8rem] font-semibold uppercase leading-[0.95] tracking-[0.02em] text-white sm:min-h-[3.3em] sm:text-[3.2rem] md:mb-6 md:min-h-0 md:text-[5rem] md:leading-[0.92] lg:text-[6.2rem]"
              >
                YOUR WEBSITE <br className="hidden sm:block" />
                SHOULD BRING YOU <br className="hidden sm:block" />
                CUSTOMERS <br className="hidden sm:block" />
                <span className="font-normal italic text-accent">&</span> LOOK GOOD.
              </motion.h1>

              <motion.p
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="max-w-[46ch] text-sm font-light leading-relaxed text-gray-300 sm:text-base md:text-lg md:text-white/80"
              >
                Your business deserves a website that works as hard as you do — beautifully designed, easy to find, and built to turn visitors into customers you are proud to serve.
              </motion.p>

              <div className="mt-4 flex flex-wrap justify-center gap-x-3 gap-y-1.5 md:mt-20 md:justify-start md:gap-x-4">
                {[
                  { text: "BUILT JUST FOR YOUR BUSINESS", icon: (
                    <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )},
                  { text: "PERFECT ON EVERY PHONE", icon: (
                    <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                      <line x1="12" y1="18" x2="12.01" y2="18" />
                    </svg>
                  )},
                  { text: "OPENS IN UNDER 2 SECONDS", icon: (
                    <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  )},
                  { text: "CUSTOMERS FIND YOU ON GOOGLE", icon: (
                    <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  )},
                ].map((tag, idx) => (
                  <motion.span
                    key={tag.text}
                    initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
                    animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 + idx * 0.1 }}
                    className="flex items-center gap-2 whitespace-nowrap rounded-full border-[1.5px] border-cyan/60 bg-cyan/10 px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-accent md:border-accent/50 md:bg-accent/10 md:px-4 md:py-1.5 md:text-[11px] md:tracking-[0.2em]"
                  >
                    <span className="text-cyan">{tag.icon}</span>
                    {tag.text}
                  </motion.span>
                ))}
              </div>

              <div className="mt-8 hidden flex-col items-center gap-6 sm:flex-row sm:justify-center md:mt-12 md:flex md:justify-start">
                <motion.div
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: 5 }}
                  animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  <Link to="/contact">
                    <button className="rounded-lg bg-accent px-10 py-4 text-sm font-black uppercase tracking-[0.2em] text-black shadow-[0_0_30px_var(--glow)] transition-all hover:scale-[1.02] hover:opacity-90 active:scale-95">
                      Get Started
                    </button>
                  </Link>
                </motion.div>

                <motion.div
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: 5 }}
                  animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                >
                  <Link to="/work" onClick={handleWorkScrollTop}>
                    <button className="group rounded-lg border border-cyan/40 bg-white/[0.05] px-10 py-4 text-sm font-black uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all hover:border-cyan hover:bg-white/[0.1]">
                      Our Work <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                    </button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>

          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 15 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="z-20 flex w-full flex-col items-center md:hidden"
          >
            <div className="flex w-full flex-col gap-4 px-4 pb-2">
              <Link to="/contact" className="w-full">
                <button className="group w-full rounded-lg bg-accent py-4 text-[11px] font-black uppercase tracking-[0.2em] text-black shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-transform active:scale-95">
                  Get Started <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">→</span>
                </button>
              </Link>
              <Link to="/work" className="w-full" onClick={handleWorkScrollTop}>
                <button className="group w-full rounded-lg border border-cyan/40 bg-white/[0.05] py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-transform active:scale-95">
                  View Our Work <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">→</span>
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-20 bg-[#0A0A0C] py-28 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            className="mb-20 text-center"
          >
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-accent section-eyebrow-glow">Sound Familiar?</span>
            <h2 className="font-display mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              Most businesses in Seychelles face the same three problems <span className="text-cyan">online.</span>
            </h2>
          </motion.div>

          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {problemCards.map((card, index) => (
              <motion.article
                key={card.title}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                whileHover={shouldReduceMotion ? undefined : { y: -6, scale: 1.01 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#1A1A1C] p-8 transition-all duration-500 hover:!border-[#00E5FF] hover:shadow-[0_0_12px_rgba(0,229,255,0.3)]"
              >
                <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-cyan to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl border border-white/10 bg-[#0A0A0C] transition-colors group-hover:!border-[#00E5FF]">
                  <svg
                    className="h-8 w-8 text-cyan transition-colors duration-300 group-hover:text-cyan-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {card.icon}
                  </svg>
                </div>
                <h3 className="font-display mb-3 text-xl font-semibold text-white">{card.title}</h3>
                <p className="mb-6 leading-relaxed text-gray-400">{card.body}</p>
                <Link to="/services-pricing" className="mt-auto inline-flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-cyan hover:text-[#00e5ff] transition-colors group/link pb-2">
                  Learn More <span className="ml-2 inline-block transition-transform group-hover/link:translate-x-1">→</span>
                </Link>
              </motion.article>
            ))}
          </div>

          <div className="text-center">
            <p className="font-display inline-flex items-center gap-4 text-2xl font-bold uppercase tracking-[0.2em] text-cyan">
              <span className="h-px w-12 bg-cyan/50" />
              We fix this. Every time.
              <span className="h-px w-12 bg-cyan/50" />
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-20 overflow-hidden border-y border-[#1a2c33] bg-[#0d1a1f] py-6">
        <div className="hd-marquee-track flex w-max whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.3em] text-[#5c757d]">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <div key={`${item}-${i}`} className="flex flex-shrink-0 items-center">
              <span>{item}</span>
              <span className="mx-12 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6f8891]/40" />
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="relative z-20 bg-[#0A0A0C] py-28 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-20 text-center">
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-accent section-eyebrow-glow">Our Services</span>
            <h2 className="font-display mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              Websites built around how your business <span className="text-cyan">actually works.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-transparent transition-colors duration-500 hover:!border-[#00E5FF] hover:shadow-[0_0_12px_rgba(0,229,255,0.3)]">
              <div className="relative flex h-72 items-center justify-center overflow-hidden bg-[#1A1A1C]/60 p-8">
                <div className="relative h-full w-full max-w-sm">
                  <div className="hd-anim-before absolute inset-0 flex flex-col gap-3 rounded-lg border-2 border-dashed border-red-400/50 p-4">
                    <div className="-mt-8 mb-2 w-full text-center"><span className="text-xs font-bold uppercase tracking-widest text-red-400/70">Before</span></div>
                    <div className="h-5 w-2/3 rotate-1 rounded border-2 border-dashed border-red-400/50" />
                    <div className="ml-4 h-4 w-1/2 -rotate-2 rounded border-2 border-dashed border-red-400/50" />
                    <div className="flex-1 rounded border-2 border-dashed border-red-400/50" />
                    <div className="flex h-10 gap-3">
                      <div className="h-8 w-1/3 rounded border-2 border-dashed border-red-400/50" />
                      <div className="mt-2 h-6 w-1/2 rounded border-2 border-dashed border-red-400/50" />
                    </div>
                    <div className="h-3 w-3/4 rounded border-2 border-dashed border-red-400/50" />
                  </div>
                  <div className="hd-anim-after absolute inset-0 flex flex-col gap-4 rounded-lg border border-cyan/30 bg-[#1A1A1C] p-4 shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                    <div className="-mt-8 mb-2 w-full text-center"><span className="text-xs font-bold uppercase tracking-widest text-cyan">After</span></div>
                    <div className="mt-2 flex h-6 w-1/3 items-center rounded bg-cyan/20 px-2"><div className="h-2 w-2 rounded-full bg-cyan" /></div>
                    <div className="relative flex-1 overflow-hidden rounded border border-white/5 bg-gradient-to-br from-[#0A0A0C] to-[#1A1A1C]">
                      <img src={workItems[0]?.imageWebp} alt="Service visual" className="absolute inset-0 h-full w-full object-cover opacity-50" />
                    </div>
                    <div className="flex h-12 gap-4">
                      <div className="w-1/2 rounded bg-white/5" />
                      <div className="w-1/2 rounded bg-cyan" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-8 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/95 via-[#0A0A0C]/80 to-transparent -mt-20 pt-24 relative z-10">
                <h3 className="font-display mb-4 text-2xl font-bold uppercase text-white">Custom Design</h3>
                <p className="mb-6 leading-relaxed text-gray-400">Every page designed around your specific services, your customers, and how you want to be found. No common Templates</p>
                <Link to="/services-pricing" className="mt-auto inline-flex items-center text-sm font-bold uppercase tracking-[0.16em] text-cyan hover:text-[#00e5ff] transition-colors group/link">
                  Learn More <span className="ml-2 inline-block transition-transform group-hover/link:translate-x-1">→</span>
                </Link>
              </div>
            </article>

            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-transparent transition-colors duration-500 hover:!border-[#00E5FF] hover:shadow-[0_0_12px_rgba(0,229,255,0.3)]">
              <div className="relative flex h-72 items-center justify-center overflow-hidden bg-[#1A1A1C]/60 p-8">
                <div className="translate-y-6 overflow-hidden rounded-[2rem] border-4 border-gray-800 bg-black shadow-2xl transition-transform duration-500 group-hover:translate-y-2">
                  <div className="flex h-6 justify-center rounded-t-[1.7rem] bg-black">
                    <div className="h-3 w-12 rounded-b-xl bg-gray-900" />
                  </div>
                  <div className="hd-phone-scroll w-[140px] space-y-3 bg-[#1A1A1C] px-3 pb-20 pt-8">
                    <div className="h-24 w-full rounded-lg border border-teal/10 bg-gradient-to-b from-teal/20 to-transparent" />
                    <div className="h-4 w-3/4 rounded bg-white/10" />
                    <div className="h-4 w-1/2 rounded bg-white/10" />
                    <div className="mt-4 h-16 w-full rounded-lg bg-white/5" />
                    <div className="h-16 w-full rounded-lg bg-white/5" />
                    <div className="h-16 w-full rounded-lg bg-white/5" />
                    <div className="h-32 w-full rounded-lg bg-cyan/10" />
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-8 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/95 via-[#0A0A0C]/80 to-transparent -mt-20 pt-24 relative z-10">
                <h3 className="font-display mb-4 text-2xl font-bold uppercase text-white">Perfect on Mobile</h3>
                <p className="mb-6 leading-relaxed text-gray-400">Over 70% of customers browse on phones. Your site works beautifully on the phones your customers use — no pinching, no squinting.</p>
                <Link to="/services-pricing" className="mt-auto inline-flex items-center text-sm font-bold uppercase tracking-[0.16em] text-cyan hover:text-[#00e5ff] transition-colors group/link">
                  Learn More <span className="ml-2 inline-block transition-transform group-hover/link:translate-x-1">→</span>
                </Link>
              </div>
            </article>

            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#1A1A1C] transition-colors duration-500 hover:!border-[#00E5FF] hover:shadow-[0_0_12px_rgba(0,229,255,0.3)]">
              <div className="relative flex h-64 flex-col items-center justify-center overflow-hidden border-b border-white/5 bg-[#111113] p-8">
                <div className="w-full max-w-sm">
                  <div className="mb-4 flex h-12 items-center rounded-full border border-gray-700 bg-[#202124] px-4 shadow-lg">
                    <span className="mr-3 text-gray-400">⌕</span>
                    <div className="h-5 text-gray-300">
                      <span className="hd-typing inline-block overflow-hidden whitespace-nowrap">guesthouse mahe seychelles</span>
                    </div>
                  </div>
                  <div className="hd-search-result relative overflow-hidden rounded-lg border border-gray-700 bg-[#202124] p-4 shadow-2xl">
                    <div className="absolute inset-0 bg-cyan/5" />
                    <div className="absolute bottom-0 left-0 top-0 w-1 bg-cyan" />
                    <h4 className="relative pl-3 text-lg font-medium text-blue-400">Best Guesthouse in Mahe | Book Direct</h4>
                    <p className="relative mt-1 line-clamp-2 pl-3 text-sm text-gray-300">Experience authentic Creole hospitality with direct booking flow and clear value.</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-8 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/95 via-[#0A0A0C]/80 to-transparent -mt-20 pt-24 relative z-10">
                <h3 className="font-display mb-4 text-2xl font-bold uppercase text-white">Found on Google</h3>
                <p className="mb-6 leading-relaxed text-gray-400">We build every page so Google understands your business and shows you when locals are searching.</p>
                <Link to="/services-pricing" className="mt-auto inline-flex items-center text-sm font-bold uppercase tracking-[0.16em] text-cyan hover:text-[#00e5ff] transition-colors group/link">
                  Learn More <span className="ml-2 inline-block transition-transform group-hover/link:translate-x-1">→</span>
                </Link>
              </div>
            </article>

            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-transparent transition-colors duration-500 hover:!border-[#00E5FF] hover:shadow-[0_0_12px_rgba(0,229,255,0.3)]">
              <div className="relative flex h-72 items-center justify-center overflow-hidden bg-[#1A1A1C]/60 p-8">
                <div className="relative flex h-32 w-32 items-center justify-center">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#222" strokeWidth="8" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#22F1D6" strokeWidth="8" strokeLinecap="round" className="hd-ring" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-3xl font-bold text-white">100%</span>
                  </div>
                </div>
                <div className="ml-8 space-y-4">
                  <div className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-teal shadow-[0_0_8px_#22F1D6]" /><span className="text-sm text-gray-300">LOAD TIME <b className="text-white">1.2s</b></span></div>
                  <div className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-cyan shadow-[0_0_8px_#00E5FF]" /><span className="text-sm text-gray-300">UPTIME <b className="text-white">99.9%</b></span></div>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-8 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/95 via-[#0A0A0C]/80 to-transparent -mt-20 pt-24 relative z-10">
                <h3 className="font-display mb-4 text-2xl font-bold uppercase text-white">Fast & Reliable</h3>
                <p className="mb-6 leading-relaxed text-gray-400">Fast-loading pages keep visitors on your site — and slow sites send them straight to your competitors.</p>
                <Link to="/services-pricing" className="mt-auto inline-flex items-center text-sm font-bold uppercase tracking-[0.16em] text-cyan hover:text-[#00e5ff] transition-colors group/link">
                  Learn More <span className="ml-2 inline-block transition-transform group-hover/link:translate-x-1">→</span>
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="process" className="border-t border-white/5 bg-[#0A0A0C] py-28 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-20 text-center">
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-accent section-eyebrow-glow">What Actually Happens</span>
            <h2 className="font-display mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              Here's exactly what we do together - step by step.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-5 md:gap-6">
            {projectSteps.slice(0, 5).map((step, idx) => (
              <article
                key={step.title}
                className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-[#1A1A1C] p-6 transition-all duration-500 ${
                  idx % 2 === 0
                    ? "hover:!border-[#00E5FF] hover:shadow-[0_0_12px_rgba(0,229,255,0.3)]"
                    : "hover:!border-[#00E5FF] hover:shadow-[0_0_12px_rgba(0,229,255,0.3)]"
                }`}
              >
                <div className={`absolute right-0 top-0 h-20 w-20 rounded-bl-full ${idx % 2 === 0 ? "bg-cyan/5" : "bg-teal/5"}`} />
                <div className="relative z-10">
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full font-display text-lg font-bold ${
                        idx % 2 === 0
                          ? "border border-cyan/35 bg-cyan/10 text-cyan"
                          : "border border-teal/35 bg-teal/10 text-teal"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <h3 className="font-display text-lg font-bold uppercase text-white">{step.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-400">{step.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 hidden items-center justify-center gap-2 md:flex">
            <div className="h-px max-w-[100px] flex-1 bg-gradient-to-r from-transparent via-cyan/30 to-cyan/30" />
            <div className="h-2 w-2 animate-pulse rounded-full bg-cyan" />
            <div className="h-px max-w-[100px] flex-1 bg-gradient-to-l from-transparent via-cyan/30 to-cyan/30" />
          </div>
        </div>
      </section>

      <WorkShowcase />

      <section id="packages" className="py-24 md:py-40 bg-black border-t border-white/[0.05]">
        <div className="mx-auto w-full max-w-[92rem] px-6 md:px-10 lg:px-14">
          <div className="mb-20 text-center">
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-accent section-eyebrow-glow">Find your fit</span>
            <h2 className="font-display mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              A home online, built for where you are right now
            </h2>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-8 items-stretch pt-8">
            {[
              { ...foundationPackage, featured: false },
              { ...starterPackage, featured: true },
              { ...growthPackage, featured: false },
              { ...customPackage, featured: false }
            ].map((pkg, idx) => (
              <motion.div
                key={pkg.title}
                initial={{ opacity: 1, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col relative p-8 sm:p-10 rounded-[2rem] border transition-all duration-500 motion-safe-gpu ${
                  pkg.featured
                    ? "bg-[#121214] border-cyan shadow-[0_0_30px_rgba(0,229,255,0.15)] xl:-translate-y-4 z-20"
                    : "bg-[#121214] border-white/[0.1] z-10 hover:!border-[#00E5FF] hover:shadow-[0_0_12px_rgba(0,229,255,0.3)] mt-0"
                }`}
              >
                {pkg.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan px-6 py-[6px] rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-[#0A0A0C] whitespace-nowrap shadow-[0_0_20px_rgba(0,229,255,0.5)]">
                    Most Popular
                  </div>
                )}

                <div className="mb-10">
                  <p className="mb-4 ml-0.5 inline-flex w-fit items-center rounded-full border border-cyan/35 bg-cyan/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan">
                    {pkg.title === "Foundation" ? "Essentials" : pkg.title === "Starter" ? "Scalable" : pkg.title === "Growth" ? "Full Scale" : "One-of-a-kind"}
                  </p>
                  <h3 className="text-3xl font-semibold text-white mb-6 pr-4 leading-tight tracking-tight font-display">{pkg.title}</h3>
                  <p className="text-4xl sm:text-[2.75rem] font-light text-cyan font-display mb-8 leading-tight">
                    {pkg.price}
                  </p>
                </div>

                <ul className="space-y-5 mb-12 flex-grow">
                  {pkg.includes.map((item, includeIdx) => (
                    <li key={`${item}-${includeIdx}`} className="flex items-start gap-4">
                      <svg className="h-4 w-4 text-cyan mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-400 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6 border-t border-white/[0.05]">
                  <Link to="/contact" className="block w-full">
                    <button className={`w-full py-5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all transform active:scale-95 ${
                      pkg.featured
                        ? "bg-cyan text-[#0A0A0C] hover:bg-cyan/90 border border-transparent shadow-[0_0_24px_rgba(0,229,255,0.4)]"
                        : "bg-white/[0.03] border border-cyan/25 text-cyan hover:bg-white/[0.06] hover:!border-[#00e5ff] hover:text-[#00e5ff]"
                    }`}>
                      Get Started
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="insights" className="py-20 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#1A1A1C]"
          >
            <div className="grid lg:grid-cols-12">
              <div className="relative z-20 flex flex-col justify-center p-10 md:p-16 lg:col-span-7">
                <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-accent section-eyebrow-glow">Stay in the know</span>
                <h2 className="font-display mt-4 text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">The digital world, <span className="text-cyan">explained simply.</span></h2>
                <p className="mt-5 text-base leading-relaxed text-gray-400 md:text-lg">
                  No jargon. No fluff. Just the things worth knowing for your business.
                </p>

                <ul className="mt-8 space-y-4 text-sm text-gray-300 md:text-base">
                  <li className="flex items-center gap-3"><span className="text-cyan">↗</span> Digital trends affecting small businesses</li>
                  <li className="flex items-center gap-3"><span className="text-cyan">↗</span> Understanding AI chatbots</li>
                  <li className="flex items-center gap-3"><span className="text-cyan">↗</span> Why data and analytics matter</li>
                  <li className="flex items-center gap-3"><span className="text-cyan">↗</span> How automation saves time</li>
                </ul>

                <div className="mt-10 flex justify-start">
                  <Link to="/insights">
                    <ShimmerButton shimmerColor="#0A0A0C" shimmerDuration="4.2s" background="#00E5FF" className="px-6 py-3 text-sm font-semibold tracking-[0.1em] text-black">
                      Read digital insights
                    </ShimmerButton>
                  </Link>
                </div>
              </div>

              <div className="relative flex min-h-[350px] items-center justify-center overflow-visible p-8 lg:col-span-5 lg:min-h-full lg:p-12">
                <div className="absolute left-1/2 top-1/2 z-0 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/25 blur-[140px] lg:h-[120%] lg:w-[150%]" />

                <div className="relative z-10 flex h-full w-full max-w-[400px] items-center justify-center pt-8 pr-12 lg:absolute lg:-left-24 lg:top-1/2 lg:w-[160%] lg:max-w-none lg:-translate-y-1/2 lg:pr-0 pointer-events-none">
                  <motion.div className="absolute left-[0%] top-1/2 z-10 w-52 -translate-y-[45%] rounded-[1.25rem] border-2 border-cyan/30 shadow-[0_0_60px_rgba(0,229,255,0.3)] lg:w-[15rem]" animate={shouldReduceMotion ? undefined : { y: [0, -15, 0], rotate: [-3, -5, -3] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                    <img src="/digital_trends_1.webp" alt="Digital trends for small business" className="h-auto w-full rounded-xl object-cover" />
                  </motion.div>

                  <motion.div className="absolute left-[20%] top-1/2 z-20 w-60 -translate-y-[48%] rounded-[1.25rem] border-2 border-cyan/40 shadow-[0_0_80px_rgba(0,229,255,0.45)] lg:left-[22%] lg:w-[18rem]" animate={shouldReduceMotion ? undefined : { y: [-10, 10, -10], scale: [1, 1.02, 1] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}>
                    <img src="/digital_trends_2.webp" alt="Understanding AI chatbots" className="h-auto w-full rounded-xl object-cover" />
                  </motion.div>

                  <motion.div className="absolute left-[40%] top-1/2 z-30 w-64 -translate-y-[52%] rounded-[1.25rem] border-2 border-cyan/50 shadow-[0_0_120px_rgba(0,229,255,0.6)] lg:left-[45%] lg:w-[22rem]" animate={shouldReduceMotion ? undefined : { y: [-5, 15, -5], rotate: [3, 5, 3] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                    <img src="/digital_trends_3.webp" alt="Why data and analytics matter" className="h-auto w-full rounded-xl object-cover" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="faq" className="py-20 md:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="mb-20 text-center">
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-accent section-eyebrow-glow">You probably have questions</span>
            <h2 className="font-display mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">We have answered the ones we hear most</h2>
            <p className="mx-auto mt-4 max-w-3xl text-gray-400">Honest, plain-language answers so you feel confident before we begin.</p>
          </div>

          <HomeFaq categories={homeFaqCategories} />

          <div className="mt-10 flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-[#1A1A1C] px-6 py-8 text-center md:flex-row md:justify-between md:text-left">
            <p className="text-sm text-gray-400">Still have questions? We can walk you through it.</p>
            <Link to="/contact">
              <ShimmerButton shimmerColor="#0A0A0C" shimmerDuration="4.2s" background="#00E5FF" className="px-6 py-3 text-sm font-semibold tracking-[0.1em] text-black">
                Contact us
              </ShimmerButton>
            </Link>
          </div>
        </div>
      </section>

      <section id="ready" className="bg-gradient-to-b from-transparent to-black/20 py-24 md:py-36">
        <div className="mx-auto w-full max-w-4xl px-5 text-center sm:px-8">
          <h2 className="font-display mb-8 text-4xl font-semibold text-white md:text-7xl">
            Let us build something
            <br />
            <span className="text-cyan">you are proud of</span>
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg font-light leading-relaxed text-gray-400 md:text-2xl">
            A short, free call is all it takes to get started. No pressure. Just a conversation.
          </p>
          <div className="flex justify-center">
            <Link to="/contact">
              <ShimmerButton shimmerColor="#0A0A0C" shimmerDuration="4.2s" background="#00E5FF" className="px-8 py-5 text-lg font-bold tracking-[0.1em] text-black">
                Book a discovery call
              </ShimmerButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
