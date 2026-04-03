import { useMemo, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Seo from "../components/Seo";
import HomeFaq, { type HomeFaqCategory } from "../components/ui/home-faq";
import { ShimmerButton } from "../components/ui/shimmer-button";
import { Link } from "react-router-dom";
import { scrollToTopSmooth } from "../lib/utils";
import { trackEvent } from "../lib/analytics";

import {
  foundationPackage,
  starterPackage,
  growthPackage,
  customPackage,
  siteConfig,
  projectSteps,
  workItems,
} from "../data/site";
import Hero from "../components/ui/animated-shader-hero";


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



  return (
    <section id="work" className="relative overflow-hidden bg-[#0A0A0C]">
      <div className="relative z-30 mx-auto max-w-7xl bg-[#0A0A0C] px-6 pb-10 pt-24 md:pt-28">
        <div className="mb-20 text-center">
          <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-accent section-eyebrow-glow">Real Results, Real Businesses</span>
          <h2 className="font-display mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            See what is <span className="text-gradient-cyan">possible</span> for your business
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-300">Three businesses. Three transformations. One studio that cares.</p>
        </div>
      </div>

      {showcase.map((project, idx) => (
        <article key={project.title} className="relative min-h-[135vh]">
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                src={idx === 0 ? project.imageWebp : project.imageWebp800}
                alt={project.title}
                width="600"
                height="400"
                className="h-full w-full scale-[1.08] object-cover opacity-66"
                loading={idx === 0 ? "eager" : "lazy"}
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
                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex flex-1 items-center justify-center rounded-lg border border-cyan/40 bg-transparent px-8 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] text-cyan transition-all hover:border-cyan hover:bg-cyan/5 md:flex-none md:text-[11px]"
                        onClick={() =>
                          trackEvent("cta_click", {
                            cta_name: `explore_project_${project.title.toLowerCase().replace(/\s+/g, "_")}`,
                            page_path: window.location.pathname,
                          })
                        }
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
                  <img src={project.image} alt={project.title} width="600" height="320" className="h-80 w-full rounded-xl object-cover" loading="lazy" decoding="async" />
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

  const [activeProblem, setActiveProblem] = useState(0);
  const [activeService, setActiveService] = useState(0);

  const problemScrollRef = useRef<HTMLDivElement>(null);
  const serviceScrollRef = useRef<HTMLDivElement>(null);

  const scrollCarouselTo = (ref: React.RefObject<HTMLDivElement>, targetIndex: number, totalSlides: number) => {
    if (!ref.current) return;
    const scrollContainer = ref.current;
    
    let index = targetIndex;
    if (index >= totalSlides) {
      index = 0;
    }
    if (index < 0) {
      index = totalSlides - 1;
    }
    
    const child = scrollContainer.children[index] as HTMLElement;
    if (child) {
      scrollContainer.scrollTo({
        left: child.offsetLeft - parseInt(getComputedStyle(scrollContainer).paddingLeft || "20", 10),
        behavior: "smooth"
      });
    }
  };

  const handleProblemScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.clientWidth;
    const index = Math.round(scrollLeft / width);
    setActiveProblem(index);
  };

  const handleServiceScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.clientWidth;
    const index = Math.round(scrollLeft / width);
    setActiveService(index);
  };

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

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Custom Web Development",
    "provider": {
      "@type": "ProfessionalService",
      "name": siteConfig.name,
      "url": siteConfig.url,
      "email": siteConfig.email,
      "telephone": siteConfig.phone,
      "image": new URL("/og-image.png", siteConfig.url).toString(),
      "priceRange": "SCR 7,500 - SCR 25,000+",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": siteConfig.location,
        "addressCountry": "SC"
      }
    },
    "description": "Expert custom web design and development services in Seychelles, focusing on speed, mobile-readiness, and SEO optimization.",
    "areaServed": {
      "@type": "Country",
      "name": "Seychelles"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Design Packages",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Foundation Package"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Starter Package"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Growth Package"
          }
        }
      ]
    }
  };

  return (
    <div className="bg-[#0A0A0C] text-white">
      <Seo
        title="Custom Website Design Seychelles | Horizon Digital"
        description="Custom-built websites for Seychelles businesses. Professional web design & development — no templates, just results. Fast, mobile-ready, SEO-optimized from day one."
        path="/"
        keywords="custom website Seychelles, custom web design Seychelles, custom web development Seychelles, website design Seychelles, bespoke websites Seychelles"
        structuredData={[faqSchema, serviceSchema]}
      />

      <Hero
        trustBadge={{ text: "Custom Web Design Studio • Seychelles" }}
        headline={{
          lines: [
            "CUSTOM STUNNING WEBSITES"
          ],
          rotatingWords: ["STUNNING", "PROFESSIONAL", "FAST", "MOBILE-READY"]
        }}
        subtitle="A website that looks great, loads fast, and brings in real customers."
        tags={[
          { text: "BUILT AROUND YOU", icon: (
            <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )},
          { text: "OPENS IN SECONDS", icon: (
            <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          )},
          { text: "LOOKS GREAT ON ANY PHONE", icon: (
            <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
          )},
          { text: "CUSTOMERS CAN FIND YOU", icon: (
            <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          )},
        ]}
        buttons={{
          primary: {
            text: "Get Started",
            link: "/contact",
            onClick: () =>
              trackEvent("cta_click", {
                cta_name: "hero_get_started",
                page_path: window.location.pathname,
              }),
          },
          secondary: {
            text: "View Our Work",
            link: "/work",
            onClick: () => {
              trackEvent("cta_click", {
                cta_name: "hero_view_work",
                page_path: window.location.pathname,
              });
              handleWorkScrollTop();
            },
          },
        }}

      />

      <section className="relative z-20 bg-[#0A0A0C] py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            className="mb-20 text-center"
          >
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-accent section-eyebrow-glow">Sound Familiar?</span>
            <h2 className="font-display mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              Most businesses in Seychelles face the same three problems <span className="text-gradient-cyan">online.</span>
            </h2>
          </motion.div>

          <div 
            ref={problemScrollRef}
            className="mb-8 md:mb-16 flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:snap-none md:pb-0 scrollbar-hide"
            onScroll={handleProblemScroll}
          >
            {problemCards.map((card) => (
              <motion.article
                key={card.title}
                whileHover={shouldReduceMotion ? undefined : { y: -6, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#1A1A1C] p-8 transition-all duration-500 hover:!border-[#00E5FF] hover:shadow-[0_0_12px_rgba(0,229,255,0.3)] min-w-[calc(100vw-40px)] w-[calc(100vw-40px)] max-w-[calc(100vw-40px)] snap-center snap-always shrink-0 md:w-auto md:max-w-none md:min-w-0 md:shrink"
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
                <p className="mb-6 leading-relaxed text-white/80">{card.body}</p>
              </motion.article>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mb-16 md:hidden">
            <button 
              onClick={() => scrollCarouselTo(problemScrollRef, activeProblem - 1, problemCards.length)} 
              className="flex items-center justify-center p-3 text-cyan hover:text-cyan-400 transition-colors bg-[#1A1A1C] border border-white/5 shadow-sm rounded-full active:scale-95"
              aria-label="Previous problem"
            >
               <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
            </button>
            <div className="flex justify-center gap-3">
              {problemCards.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2 rounded-full transition-all duration-300 ${activeProblem === i ? "w-8 bg-cyan" : "w-2 bg-gray-700 hover:bg-gray-500 cursor-pointer"}`}
                  onClick={() => scrollCarouselTo(problemScrollRef, i, problemCards.length)}
                />
              ))}
            </div>
            <button 
              onClick={() => scrollCarouselTo(problemScrollRef, activeProblem + 1, problemCards.length)} 
              className="flex items-center justify-center p-3 text-cyan hover:text-cyan-400 transition-colors bg-[#1A1A1C] border border-white/5 shadow-sm rounded-full active:scale-95"
              aria-label="Next problem"
            >
               <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
            </button>
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

      <section className="relative z-20 hidden sm:block overflow-hidden border-y border-[#1a2c33] bg-[#0d1a1f] py-6">
        <div className="hd-marquee-track flex items-center gap-20 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.3em] text-[#8fa7b4]">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={`${item}-${i}`} className="inline-flex items-center gap-20">
              <span>{item}</span>
              <span className="h-2 w-2 rounded-full bg-[#6f8891]" />
            </span>
          ))}
        </div>
      </section>

      <section id="services" className="relative z-20 bg-[#0A0A0C] py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-20 text-center">
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-accent section-eyebrow-glow">Our Services</span>
            <h2 className="font-display mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              Websites built around how your business <span className="text-gradient-cyan">actually works.</span>
            </h2>
          </div>

          <div 
            ref={serviceScrollRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 md:mx-0 md:px-0 md:grid md:grid-cols-2 md:gap-8 md:overflow-visible md:snap-none md:pb-0 scrollbar-hide"
            onScroll={handleServiceScroll}
          >
            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-transparent transition-colors duration-500 hover:!border-[#00E5FF] hover:shadow-[0_0_12px_rgba(0,229,255,0.3)] min-w-[calc(100vw-40px)] w-[calc(100vw-40px)] max-w-[calc(100vw-40px)] snap-center snap-always shrink-0 md:w-auto md:max-w-none md:min-w-0 md:shrink">
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
                      <img src={workItems[0]?.imageWebp800} alt="Service visual" width="348" height="182" className="absolute inset-0 h-full w-full object-cover opacity-50" loading="lazy" decoding="async" />
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
                <p className="mb-6 leading-relaxed text-gray-300">Every page designed around your specific services, your customers, and how you want to be found. No common Templates</p>
              </div>
            </article>

            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-transparent transition-colors duration-500 hover:!border-[#00E5FF] hover:shadow-[0_0_12px_rgba(0,229,255,0.3)] min-w-[calc(100vw-40px)] w-[calc(100vw-40px)] max-w-[calc(100vw-40px)] snap-center snap-always shrink-0 md:w-auto md:max-w-none md:min-w-0 md:shrink">
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
                <p className="mb-6 leading-relaxed text-gray-300">Over 70% of customers browse on phones. Your site works beautifully on the phones your customers use — no pinching, no squinting.</p>
              </div>
            </article>

            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#1A1A1C] transition-colors duration-500 hover:!border-[#00E5FF] hover:shadow-[0_0_12px_rgba(0,229,255,0.3)] min-w-[calc(100vw-40px)] w-[calc(100vw-40px)] max-w-[calc(100vw-40px)] snap-center snap-always shrink-0 md:w-auto md:max-w-none md:min-w-0 md:shrink">
              <div className="relative flex h-64 flex-col items-center justify-center overflow-hidden border-b border-white/5 bg-[#111113] p-8">
                <div className="w-full max-w-sm">
                  <div className="mb-4 flex h-12 items-center rounded-full border border-gray-700 bg-[#202124] px-4 shadow-lg">
                    <span className="mr-3 text-gray-300">⌕</span>
                    <div className="h-5 text-gray-300">
                      <span className="hd-typing inline-block overflow-hidden whitespace-nowrap">guesthouse mahe seychelles</span>
                    </div>
                  </div>
                  <div className="hd-search-result relative overflow-hidden rounded-lg border border-gray-700 bg-[#202124] p-4 shadow-2xl">
                    <div className="absolute inset-0 bg-cyan/5" />
                    <div className="absolute bottom-0 left-0 top-0 w-1 bg-cyan" />
                    <h4 className="relative pl-3 text-lg font-medium text-blue-300">Best Guesthouse in Mahe | Book Direct</h4>
                    <p className="relative mt-1 line-clamp-2 pl-3 text-sm text-gray-300">Experience authentic Creole hospitality with direct booking flow and clear value.</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-8 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/95 via-[#0A0A0C]/80 to-transparent -mt-20 pt-24 relative z-10">
                <h3 className="font-display mb-4 text-2xl font-bold uppercase text-white">Found on Google</h3>
                <p className="mb-6 leading-relaxed text-gray-300">We build every page so Google understands your business and shows you when locals are searching.</p>
              </div>
            </article>

            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-transparent transition-colors duration-500 hover:!border-[#00E5FF] hover:shadow-[0_0_12px_rgba(0,229,255,0.3)] min-w-[calc(100vw-40px)] w-[calc(100vw-40px)] max-w-[calc(100vw-40px)] snap-center snap-always shrink-0 md:w-auto md:max-w-none md:min-w-0 md:shrink">
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
                <p className="mb-6 leading-relaxed text-gray-300">Fast-loading pages keep visitors on your site — and slow sites send them straight to your competitors.</p>
              </div>
            </article>
          </div>

          <div className="flex justify-center items-center gap-4 mt-8 md:hidden">
            <button 
              onClick={() => scrollCarouselTo(serviceScrollRef, activeService - 1, 4)} 
              className="flex items-center justify-center p-3 text-cyan hover:text-cyan-400 transition-colors bg-[#1A1A1C] border border-white/5 shadow-sm rounded-full active:scale-95"
              aria-label="Previous service"
            >
               <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
            </button>
            <div className="flex justify-center gap-3">
              {[0, 1, 2, 3].map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2 rounded-full transition-all duration-300 ${activeService === i ? "w-8 bg-cyan" : "w-2 bg-gray-700 hover:bg-gray-500 cursor-pointer"}`}
                  onClick={() => scrollCarouselTo(serviceScrollRef, i, 4)}
                />
              ))}
            </div>
            <button 
              onClick={() => scrollCarouselTo(serviceScrollRef, activeService + 1, 4)} 
              className="flex items-center justify-center p-3 text-cyan hover:text-cyan-400 transition-colors bg-[#1A1A1C] border border-white/5 shadow-sm rounded-full active:scale-95"
              aria-label="Next service"
            >
               <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
            </button>
          </div>
        </div>
      </section>

      <section id="difference" className="border-t border-white/5 bg-black py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8 text-center">
          <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-accent section-eyebrow-glow">How We're Different</span>
          <h2 className="font-display mx-auto max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
            A different kind of <span className="text-gradient-cyan">digital partner.</span>
          </h2>
          <div className="mt-10 md:mt-14 p-7 md:p-12 lg:p-14 rounded-[2.5rem] border border-white/10 bg-[#0A0A0C] text-left shadow-[0_0_60px_rgba(0,229,255,0.03)] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-40 bg-cyan/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="relative z-10 space-y-6 md:space-y-8 text-gray-300 leading-relaxed text-lg md:text-[22px] font-light md:leading-[1.8]">
              <p>
                We believe in <span className="text-gradient-cyan font-medium">absolute transparency.</span> Every project kicks off with a clear, written brief that you approve before a single line of code is written.
              </p>
              <p>
                As a team <span className="text-white font-medium drop-shadow-md">based locally in Seychelles</span>, we quote honestly in <span className="text-cyan font-medium">local SCR</span> with zero hidden fees — and we're always just a WhatsApp message away.
              </p>
              <p>
                Before any website goes live, we guarantee it scores <span className="text-gradient-cyan font-bold">90+ on Google PageSpeed</span> so that your customers get the fast, premium experience they expect.
              </p>
            </div>
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
                  <p className="text-sm leading-relaxed text-gray-300">{step.description}</p>
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
                  <h3 className="text-4xl font-bold text-white mb-4 pr-4 leading-tight tracking-tight font-display">{pkg.title}</h3>
                  <p className="text-2xl font-medium text-cyan/90 font-display mb-8 leading-tight">
                    {pkg.price}
                  </p>
                </div>

                <ul className="space-y-3 sm:space-y-5 mb-8 sm:mb-12 flex-grow">
                  {pkg.includes.map((item, includeIdx) => (
                    <li key={`${item}-${includeIdx}`} className="flex items-start gap-4">
                      <svg className="h-4 w-4 text-cyan mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-300 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6 border-t border-white/[0.05]">
                  <Link to="/contact" className="block w-full">
                    <button
                      className={`w-full py-5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all transform active:scale-95 ${
                        pkg.featured
                          ? "bg-cyan text-[#0A0A0C] hover:bg-cyan/90 border border-transparent shadow-[0_0_24px_rgba(0,229,255,0.4)]"
                          : "bg-white/[0.03] border border-cyan/25 text-cyan hover:bg-white/[0.06] hover:!border-[#00e5ff] hover:text-[#00e5ff]"
                      }`}
                      onClick={() =>
                        trackEvent("cta_click", {
                          cta_name: `package_get_started_${pkg.title.toLowerCase()}`,
                          page_path: window.location.pathname,
                        })
                      }
                    >
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
                <h2 className="font-display mt-4 text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">The digital world, <span className="text-gradient-cyan">explained simply.</span></h2>
                <p className="mt-5 text-base leading-relaxed text-gray-300 md:text-lg">
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
                    <img src="/digital_trends_1.webp" alt="Digital trends for small business" width="400" height="300" className="h-auto w-full rounded-xl object-cover" loading="lazy" decoding="async" />
                  </motion.div>

                  <motion.div className="absolute left-[20%] top-1/2 z-20 w-60 -translate-y-[48%] rounded-[1.25rem] border-2 border-cyan/40 shadow-[0_0_80px_rgba(0,229,255,0.45)] lg:left-[22%] lg:w-[18rem]" animate={shouldReduceMotion ? undefined : { y: [-10, 10, -10], scale: [1, 1.02, 1] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}>
                    <img src="/digital_trends_2.webp" alt="Understanding AI chatbots" width="400" height="300" className="h-auto w-full rounded-xl object-cover" loading="lazy" decoding="async" />
                  </motion.div>

                  <motion.div className="absolute left-[40%] top-1/2 z-30 w-64 -translate-y-[52%] rounded-[1.25rem] border-2 border-cyan/50 shadow-[0_0_120px_rgba(0,229,255,0.6)] lg:left-[45%] lg:w-[22rem]" animate={shouldReduceMotion ? undefined : { y: [-5, 15, -5], rotate: [3, 5, 3] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                    <img src="/digital_trends_3.webp" alt="Why data and analytics matter" width="400" height="300" className="h-auto w-full rounded-xl object-cover" loading="lazy" decoding="async" />
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
            <p className="mx-auto mt-4 max-w-3xl text-gray-300">Honest, plain-language answers so you feel confident before we begin.</p>
          </div>

          <HomeFaq categories={homeFaqCategories} />

          <div className="mt-10 flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-[#1A1A1C] px-6 py-8 text-center md:flex-row md:justify-between md:text-left">
            <p className="text-sm text-gray-300">Still have questions? We can walk you through it.</p>
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
            <span className="text-gradient-cyan">you are proud of</span>
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg font-light leading-relaxed text-gray-300 md:text-2xl">
            A short, free call is all it takes to get started. No pressure. Just a conversation.
          </p>
          <div className="flex justify-center">
            <Link 
              to="/contact"
              className="px-8 py-4 sm:px-10 sm:py-5 text-black rounded-full font-black uppercase tracking-[0.2em] text-xs sm:text-sm transition-all duration-300 hover:scale-[1.02] hover:brightness-110 active:scale-95 shadow-[0_0_40px_rgba(0,229,255,0.5)] text-center flex items-center justify-center w-full sm:w-auto sm:min-w-[240px] cta-gradient-anim"
              style={{ backgroundImage: 'linear-gradient(90deg, #00E5FF, #38B2F5, #0C7CC4, #00E5FF)', backgroundSize: '300% 100%' }}
            >
              Book a discovery call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
