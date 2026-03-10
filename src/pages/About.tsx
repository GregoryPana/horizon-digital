import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { ShimmerButton } from "../components/ui/shimmer-button";
import { WordReveal, AccentLine } from "../components/ui/animated-text";

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  const fadeIn = {
    initial: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.2 },
    transition: { duration: 0.7, ease: "easeOut" as const },
  };

  return (
    <div className="overflow-hidden">
      <h1 className="sr-only">About Horizon Digital</h1>
      <Seo
        title="About Horizon Digital | Seychelles Web Design"
        description="Horizon Digital helps Seychelles businesses create custom websites built for clearance, fast performance, and customer conversions."
        path="/about"
        keywords="about Horizon Digital, web design studio Seychelles, SEO optimization, performance"
      />

      {/* Hero Banner */}
      <section className="relative flex min-h-[60vh] items-center py-24 md:py-32">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-bg-panel/20 to-bg pointer-events-none" />
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 relative z-10 text-center">
          <motion.div {...fadeIn}>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent section-eyebrow-glow inline-block">
              Our Vision
            </p>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-text md:text-6xl max-w-4xl mx-auto">
              <WordReveal staggerDelay={0.06}>
                Helping businesses build better, more effective websites
              </WordReveal>
            </h2>
            <AccentLine className="mt-8 mx-auto w-32" direction="right" />
            <p className="mt-8 text-lg text-text-muted md:text-xl max-w-2xl mx-auto leading-relaxed">
              We focus on removing friction—designing practical solutions for websites that are clearer, faster, and remarkably easy to use.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 12-Column Manifesto Section */}
      <section className="py-20 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <motion.div className="lg:col-span-6 relative" {...fadeIn}>
              <div className="absolute -inset-4 bg-accent/5 blur-[80px] rounded-full z-0" />
              <div className="relative z-10 p-8 rounded-2xl border border-border bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm">
                 <h3 className="text-2xl font-semibold text-text">Built with intention</h3>
                  <p className="mt-4 text-base text-text-muted leading-relaxed">
                    Many businesses struggle with websites that are slow, unclear, or difficult to update. Horizon Digital focuses on fixing those friction points with clearer structure, logical design, and engineering focused on performance and WCAG accessibility standards.
                  </p>
              </div>
            </motion.div>

            <motion.div className="lg:col-span-6 relative" {...fadeIn} transition={{ delay: 0.2 }}>
               <div className="absolute -inset-4 bg-accent-2/5 blur-[80px] rounded-full z-0" />
               <div className="relative z-10 p-8 rounded-2xl border border-border bg-gradient-to-bl from-white/[0.03] to-transparent backdrop-blur-sm">
                 <h3 className="text-2xl font-semibold text-text">Customer-journey focus</h3>
                  <p className="mt-4 text-base text-text-muted leading-relaxed">
                    Pages are planned to guide visitors from first impression to enquiry. The goal is a website that helps people understand your services and act confidently.
                  </p>
                  <ul className="mt-6 space-y-3 text-sm font-medium text-text-muted">
                    <li className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      Clarity-first messaging and layout 
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                       Structured navigation flow for higher conversion
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                       Core Web Vitals and Performance-aware architectures
                    </li>
                  </ul>
               </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Feature Banner: Approach */}
      <section className="py-24 bg-bg-panel/30 border-y border-border">
        <div className="mx-auto w-full max-w-5xl px-5 sm:px-8 text-center text-balance">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl font-semibold text-text md:text-5xl tracking-tight">
              Our Collaborative Approach
            </h2>
            <p className="mt-6 text-base md:text-lg text-text-muted max-w-2xl mx-auto">
              Consultation, design, development, launch - with practical communication at each step. We make the technical details simple.
            </p>
            
            <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { num: "01", title: "Consult & Scope" },
                { num: "02", title: "Design & UX" },
                { num: "03", title: "Develop & Test" },
                { num: "04", title: "Launch & Optimise" },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-4xl md:text-5xl font-light text-text">{step.num}</span>
                  <span className="mt-4 text-sm font-semibold text-text-muted">{step.title}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Digital Insights CTA */}
      <section className="py-20 md:py-32 relative">
         <div className="mx-auto w-full max-w-4xl px-5 sm:px-8 text-center">
            <motion.div {...fadeIn}>
              <div className="inline-flex items-center justify-center p-4 rounded-full bg-accent/10 mb-8 border border-accent/20">
                 <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                 </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold text-text mb-6">Looking ahead at digital tools</h2>
              <p className="text-lg text-text-muted mb-10 leading-relaxed">
                We share practical insights on artificial intelligence, automation, and tech trends in a clear way for non-technical owners. This helps local businesses stay informed as technology evolves.
              </p>
              
              <Link to="/ai-digital-tools" className="inline-block hover:scale-105 transition-transform duration-300">
                <ShimmerButton
                  shimmerColor="#0b1212"
                  shimmerDuration="4.2s"
                  background="#46c6e8"
                  className="px-6 py-3 text-sm font-semibold tracking-[0.1em] text-black shadow-lg shadow-accent/20"
                >
                  Visit Digital Insights
                </ShimmerButton>
              </Link>
            </motion.div>
         </div>
      </section>

      {/* Final Conversion Banner */}
      <section className="bg-bg-elev border-t border-accent/10 py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(70,198,232,0.05)_0%,transparent_70%)]" />
        <div className="mx-auto w-full max-w-4xl px-5 sm:px-8 text-center relative z-10">
          <motion.div {...fadeIn}>
            <p className="text-xs uppercase tracking-[0.4em] text-accent font-semibold mb-6">Let's connect</p>
            <h2 className="text-3xl font-semibold text-text md:text-5xl md:leading-[1.2] tracking-tight mb-12">
              Let's build a site that supports where your business is going next.
            </h2>
            <Link to="/contact" className="inline-block hover:-translate-y-1 transition-transform duration-300">
              <ShimmerButton
                shimmerColor="#0b1212"
                shimmerDuration="4.2s"
                background="#46c6e8"
                className="px-8 py-4 text-base font-semibold tracking-[0.08em] text-black shadow-lg shadow-accent/20"
              >
                Book a free consult
              </ShimmerButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
