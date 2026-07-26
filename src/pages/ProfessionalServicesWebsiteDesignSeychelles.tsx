import React, { useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Seo from "../components/Seo";
import HomeFaq, { type HomeFaqCategory } from "../components/ui/home-faq";
import { ShimmerButton } from "../components/ui/shimmer-button";
import { Link } from "react-router-dom";
import { scrollToTopSmooth } from "../lib/utils";
import { trackEvent } from "../lib/analytics";

import {
  siteConfig,
} from "../data/site";

import { TracingCard, InteractiveIcon } from '../components/ui/TracingCard';
import { AnimatedIcon } from "../components/ui/AnimatedIcon";

import Hero from "../components/ui/animated-shader-hero";


const profFaqCategories: HomeFaqCategory[] = [
  {
    key: "authority",
    label: "Trust & Authority",
    items: [
      {
        question: "How do you help build trust with online clients?",
        answer: "We use a combination of clear information architecture, high-end typography, and strategic placement of certifications and testimonials to establish your authority from the first second a potential client lands on your site."
      },
      {
        question: "Can you help with lead generation?",
        answer: "We can structure calls to action and enquiry forms so visitors have a clear route to contact you. Enquiry volume and business results are not guaranteed."
      },
      {
        question: "Is the site secure for my clients' data?",
        answer: "We use HTTPS, minimize requested contact data, and apply appropriate form and deployment controls within scope. No website can be described as risk-free, so requirements involving sensitive data need specific review."
      }
    ]
  }
];

const profProblemCards = [
  {
    title: "Generic Templates",
    body: "If your site looks like everyone else's, why should a client choose you? We build custom identities that reflect your unique professional value.",
    type: "outdated" as const
  },
  {
    title: "Zero Lead Flow",
    body: "A site with unclear calls to action can make it difficult for prospective clients to enquire. We create clear contact paths without guaranteeing enquiry volume or business growth.",
    type: "zero" as const
  },
  {
    title: "Invisible to Locals",
    body: "If Seychelles businesses can't find you on Google, you're missing out on local contracts. Our SEO puts you where the decision-makers are looking.",
    type: "found" as const
  },
  {
    title: "Poor Professional Polish",
    body: "In professional services, first impressions are everything. We deliver a level of design finish that matches the quality of your counsel.",
    type: "start" as const
  }
];

const marqueeItems = [
  "CLEAR ENQUIRY FORMS",
  "AUTHORITY-DRIVEN DESIGN",
  "LOCAL SEO FOR PROFESSIONALS",
  "SECURITY-AWARE DELIVERY",
  "MOBILE-OPTIMIZED ENQUIRIES",
  "SEYCHELLES BUSINESS TARGETING",
];

export default function ProfessionalServicesWebsiteDesignSeychelles() {
  const [activeProblem, setActiveProblem] = useState(0);
  const problemScrollRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleWorkScrollTop = () => {
    scrollToTopSmooth();
  };

  const handleProblemScroll = () => {
    if (!problemScrollRef.current) return;
    const scrollLeft = problemScrollRef.current.scrollLeft;
    const width = problemScrollRef.current.offsetWidth;
    const newIdx = Math.round(scrollLeft / (width * 0.8));
    if (newIdx !== activeProblem && newIdx >= 0 && newIdx < profProblemCards.length) {
      setActiveProblem(newIdx);
    }
  };

  const handleProblemCardClick = (idx: number) => {
    setActiveProblem(idx);
    if (problemScrollRef.current) {
      const cardWidth = problemScrollRef.current.children[0].clientWidth;
      const gap = 20;
      problemScrollRef.current.scrollTo({
        left: idx * (cardWidth + gap),
        behavior: "smooth"
      });
    }
  };

  const scrollCarouselTo = (ref: React.RefObject<HTMLDivElement>, idx: number, max: number) => {
    if (!ref.current) return;
    const targetIdx = Math.max(0, Math.min(idx, max - 1));
    const cardWidth = ref.current.children[0].clientWidth;
    const gap = 20;
    ref.current.scrollTo({
      left: targetIdx * (cardWidth + gap),
      behavior: "smooth"
    });
    setActiveProblem(targetIdx);
  };

  const allFaqItems = profFaqCategories.flatMap(cat => cat.items);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const profServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Professional Services Web Design",
    "provider": {
      "@type": "ProfessionalService",
      "name": siteConfig.name,
      "url": siteConfig.url,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mahé",
        "addressCountry": "SC"
      }
    },
    "description": "Premium website design for Seychelles professionals. Custom sites for lawyers, accountants, consultants, and real estate agencies optimized for authority and lead generation.",
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Mahé" },
      { "@type": "AdministrativeArea", "name": "Praslin" },
      { "@type": "AdministrativeArea", "name": "La Digue" },
      { "@type": "Country", "name": "Seychelles" }
    ]
  };

  return (
    <div className="bg-[#0A0A0C] text-white">
      <Seo
        title="Professional Services Web Design Seychelles | Agency & Consultant Websites"
        description="Horizon Digital creates high-authority websites for Seychelles professional services. Custom web design for lawyers, accountants, and consultants built for trust and leads."
        path="/professional-services-website-design-seychelles"
        keywords="professional services web design seychelles, lawyer website mahé, accountant web design victoria, consultant website praslin, real estate website seychelles"
        structuredData={[faqSchema, profServiceSchema]}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Professional Web Design", path: "/professional-services-website-design-seychelles" },
        ]}
      />

      <Hero
        trustBadge={{ text: "Authority-First Design • Seychelles" }}
        headline={{
          lines: ["STUNNING", "PROFESSIONAL WEBSITES"],
          rotatingWords: ["LEGAL", "FINANCE", "CONSULT", "REALTY"],
        }}
        subtitle="We build clear, professional websites for Seychelles service businesses, with structured information and direct enquiry paths."
        tags={[
          { text: "Lead Generation Ready", icon: (
            <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" y1="8" x2="19" y2="14" />
              <line x1="22" y1="11" x2="16" y2="11" />
            </svg>
          )},
          { text: "Authority Architecture", icon: (
            <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          )},
          { text: "B2B SEO Targeted", icon: (
            <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          )},
        ]}
        buttons={{
          primary: {
            text: "Build Your Authority",
            link: "/contact",
            onClick: () => trackEvent("cta_click", { cta_name: "hero_prof_cta", page_path: window.location.pathname }),
          },
          secondary: {
            text: "See Our Work",
            link: "/work",
            onClick: () => { trackEvent("cta_click", { cta_name: "hero_prof_work", page_path: window.location.pathname }); handleWorkScrollTop(); },
          },
        }}
      />

      <section className="relative z-20 bg-[#0A0A0C] py-20 md:py-32 focus-visible:outline-none">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24, filter: 'blur(10px)' }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20 text-center"
          >
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-deep-teal section-eyebrow-glow">Expertise Deserves Excellence</span>
            <h2 className="font-display mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              Does your website match the <span className="text-cyan font-semibold">quality of your advice?</span>
            </h2>
          </motion.div>

          <div
            ref={problemScrollRef}
            className="mb-8 md:mb-16 flex items-stretch gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 md:mx-0 md:px-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:snap-none md:pb-0 lg:grid-cols-4 scrollbar-hide touch-pan-x"
            onScroll={handleProblemScroll}
          >
            {profProblemCards.map((card, idx) => (
              <TracingCard
                key={card.title}
                active={activeProblem === idx}
                onClick={() => handleProblemCardClick(idx)}
                className="p-5 sm:p-6 min-w-[calc(100vw-40px)] w-[calc(100vw-40px)] max-w-[calc(100vw-40px)] snap-center snap-always shrink-0 md:w-auto md:max-w-none md:min-w-0 md:shrink self-stretch md:cursor-pointer"
              >
                <InteractiveIcon shouldReduceMotion={shouldReduceMotion || undefined}>
                  <AnimatedIcon type={card.type} active={activeProblem === idx} />
                </InteractiveIcon>
                <h3 className="font-display mb-2 text-lg semibold-underline text-white">{card.title}</h3>
                <p className="text-sm leading-relaxed text-text-muted flex-1">{card.body}</p>
              </TracingCard>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mb-16 md:hidden">
            <motion.button onClick={() => scrollCarouselTo(problemScrollRef, activeProblem - 1, profProblemCards.length)} className="p-3 text-cyan bg-[#131315] rounded-full"><ChevronLeft className="w-5 h-5" /></motion.button>
            <div className="flex gap-3">
              {profProblemCards.map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all duration-300 ${activeProblem === i ? "w-8 bg-cyan" : "w-2 bg-white/20"}`} />
              ))}
            </div>
            <motion.button onClick={() => scrollCarouselTo(problemScrollRef, activeProblem + 1, profProblemCards.length)} className="p-3 text-cyan bg-[#131315] rounded-full"><ChevronRight className="w-5 h-5" /></motion.button>
          </div>
        </div>
      </section>

      <section className="relative z-20 overflow-hidden border-y border-[#1a2c33] bg-[#0d1a1f] py-5 sm:py-6">
        <div className="hd-marquee-track flex items-center gap-20 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.3em] text-[#8fa7b4]">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={`${item}-${i}`} className="inline-flex items-center gap-20">
              <span>{item}</span>
              <span className="h-2 w-2 rounded-full bg-[#6f8891]" />
            </span>
          ))}
        </div>
      </section>

      <section className="bg-black py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] text-deep-teal section-eyebrow-glow">Professional Service Structure</span>
          <h2 className="font-display mx-auto max-w-3xl text-3xl font-semibold text-white md:text-4xl">
            Clear website structure for <span className="text-cyan font-semibold">professional B2B services.</span>
          </h2>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {[
              { label: "Professional Presentation", text: "We use clear hierarchy, service information, and genuine trust signals appropriate to the business." },
              { label: "Enquiry Paths", text: "We provide direct routes for prospective clients to enquire, read case studies, or request a consultation." },
              { label: "B2B Search Foundations", text: "We structure relevant service content and metadata without guaranteeing rankings or visibility." }
            ].map((item) => (
              <div key={item.label} className="relative pl-6 text-left border-l border-cyan/30">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-deep-teal">{item.label}</p>
                <p className="text-text-muted leading-relaxed text-base">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0A0A0C] py-20 px-6">
        <div className="mx-auto max-w-4xl rounded-[3rem] border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-12 text-center">
          <h2 className="font-display mb-6 text-3xl font-bold text-white md:text-5xl">Ready to grow your practice?</h2>
          <p className="mb-10 text-lg text-text-muted">Discuss a professional website structured around your services, evidence, and client enquiry process.</p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center">
             <Link to="/contact">
                <ShimmerButton className="px-10 py-4 font-bold uppercase tracking-widest">Start the consultation</ShimmerButton>
             </Link>
          </div>
        </div>
      </section>

      <HomeFaq categories={profFaqCategories} />
    </div>
  );
}
