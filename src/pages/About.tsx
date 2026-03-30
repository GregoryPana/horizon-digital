import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { ShimmerButton } from "../components/ui/shimmer-button";
import { AccentLine } from "../components/ui/animated-text";

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  const fadeIn = {
    initial: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.7, ease: "easeOut" as const },
  };

  return (
    <div className="overflow-hidden">
      <h1 className="sr-only">About Horizon Digital</h1>
      <Seo
        title="About Horizon Digital | Web Design Studio in Seychelles"
        description="Horizon Digital is a Seychelles web design studio helping local businesses build beautiful, fast websites that attract customers and grow online."
        path="/about"
        keywords="about Horizon Digital, web design studio Seychelles, website designer Seychelles, local web design"
      />

      {/* Hero Banner */}
      <section className="relative flex items-center pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-bg-panel/20 to-bg pointer-events-none" />
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 relative z-10 text-center">
          <motion.div {...fadeIn} className="mb-8 md:mb-12 text-center">
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-accent section-eyebrow-glow">Based in Seychelles</span>
            <h2 className="font-display mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              We care about your business <span className="text-cyan">doing well online</span>
            </h2>
            <AccentLine className="mt-8 mx-auto w-32" direction="right" />
            <p className="mt-8 text-lg text-text-muted md:text-xl max-w-2xl mx-auto leading-relaxed">
              We build websites that make it easy for customers to find you, trust you, and reach out. As a local digital studio in Mahé, we combine world-class design standards with a deep understanding of the Seychelles market.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 12-Column Manifesto Section */}
      <section className="py-12 md:py-16">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <motion.div className="lg:col-span-6 relative" {...fadeIn}>
              <div className="absolute -inset-4 bg-accent/5 blur-[80px] rounded-full z-0" />
              <div className="relative z-10 p-8 rounded-2xl border border-border bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm">
                 <h3 className="text-2xl font-semibold text-text">We think before we build</h3>
                  <p className="mt-4 text-base text-text-muted leading-relaxed">
                    A lot of websites are slow, confusing, or hard to update. We fix that — with clear structure, sensible design, and pages built to actually work.
                  </p>
              </div>
            </motion.div>

            <motion.div className="lg:col-span-6 relative" {...fadeIn} transition={{ delay: 0.2 }}>
               <div className="absolute -inset-4 bg-accent-2/5 blur-[80px] rounded-full z-0" />
               <div className="relative z-10 p-8 rounded-2xl border border-border bg-[#121214] backdrop-blur-sm">
                 <h3 className="text-2xl font-semibold text-text">The Local Advantage</h3>
                  <p className="mt-4 text-base text-text-muted leading-relaxed">
                    Being the only agency in Mahé building at this quality level is a trust signal no overseas competitor can replicate.
                  </p>
                  <ul className="mt-6 space-y-3 text-sm font-medium text-text-muted">
                    <li className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      We intimately understand the Seychelles market
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      All prices quoted locally in SCR with zero hidden fees
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      Always available for a quick chat on WhatsApp
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
          <motion.div {...fadeIn} className="mb-20 text-center">
            <h2 className="font-display mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              How we work with you
            </h2>
            <p className="mt-6 text-base md:text-lg text-text-muted max-w-2xl mx-auto">
              We keep things simple. You share what you need, we handle the rest — and we talk through every step together.
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
            <motion.div {...fadeIn} className="text-center">
              <div className="inline-flex items-center justify-center p-4 rounded-full bg-accent/10 mb-8 border border-accent/20">
                 <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                 </svg>
              </div>
              <h2 className="font-display mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl mb-6"><span className="text-accent-2">Staying ahead,</span> together</h2>
              <p className="text-lg text-text-muted mb-10 leading-relaxed">
                We share simple, honest reads on the digital tools that could matter for your business — no jargon, just useful context.
              </p>
              
              <Link to="/ai-digital-tools" className="inline-block hover:scale-105 transition-transform duration-300">
                <ShimmerButton
                  shimmerColor="#0A0A0C"
                  shimmerDuration="4.2s"
                  background="#00E5FF"
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.05)_0%,transparent_70%)]" />
        <div className="mx-auto w-full max-w-4xl px-5 sm:px-8 text-center relative z-10">
          <motion.div {...fadeIn} className="mb-20 text-center">
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-accent section-eyebrow-glow">Let's connect</span>
            <h2 className="font-display mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl mb-12">
              <span className="text-accent">Ready</span> when you are
            </h2>
            <Link to="/contact" className="inline-block hover:-translate-y-1 transition-transform duration-300">
              <ShimmerButton
                shimmerColor="#0A0A0C"
                shimmerDuration="4.2s"
                background="#00E5FF"
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
