import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { projectSteps } from "../data/site";
import { ShimmerButton } from "../components/ui/shimmer-button";
import { ContainerScroll, CardSticky } from "../components/ui/cards-stack";

export default function Process() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="bg-bg text-white overflow-x-hidden">
      <Seo
        title="How We Build Your Website | Horizon Digital"
        description="A clear, step-by-step look at how Horizon Digital takes your website from discovery to launch. No surprises, no guesswork — just a process you'll actually enjoy."
        path="/process"
        keywords="website build process Seychelles, how to build a website, web design timeline, website project steps"
      />

      <section id="hero" className="relative pt-32 pb-20 px-6 xl:px-12 border-b border-white/5">
        <div className="mx-auto max-w-[92rem]">
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <span className="mb-6 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-deep-teal section-eyebrow-glow">How we get there</span>
            <h1 className="font-display mb-8 text-5xl sm:text-7xl lg:text-8xl font-semibold leading-[1.05] tracking-tight">
              A process you'll <br />
              <span className="text-cyan italic">actually enjoy.</span>
            </h1>
            <p className="max-w-2xl text-lg sm:text-2xl leading-relaxed text-text-muted font-normal">
              Every step is clear, every decision is yours, and nothing happens without your green light.
            </p>
          </motion.div>
        </div>
      </section>

      <section id="steps" className="py-20 px-6 xl:px-12 relative z-10 bg-[#0A0A0C]">
        <div className="mx-auto max-w-[92rem] min-h-svh place-content-center">
          <div className="grid md:grid-cols-2 md:gap-8 xl:gap-24">
            
            {/* Left side text sticky wrapper */}
            <div className="h-full w-full">
              <div className="md:sticky md:top-32 w-full max-w-xl left-0 pb-10 md:pb-0 md:py-12 z-10">
                <motion.div
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24, filter: 'blur(10px)' }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2 className="font-display mb-8 text-3xl sm:text-5xl font-semibold leading-tight tracking-tight">
                    From discovery to <span className="text-cyan">deployment.</span>
                  </h2>
                  <p className="max-w-prose text-base md:text-xl leading-relaxed text-text-muted font-normal mb-10">
                    A clear sequence. No guesswork. You know exactly what's happening at every step of your project.
                  </p>
                  
                  <div className="hidden md:flex flex-col gap-5 border-l border-white/5 pl-8">
                    {[
                      "Transparent pricing",
                      "Weekly progress updates",
                      "Direct access to builders",
                      "Clear milestone approvals"
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-text-dim font-medium tracking-wide">
                        <div className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_rgba(94,209,222,0.6)]" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right side ContainerScroll area */}
            <ContainerScroll
              className="space-y-[55vh] md:space-y-[70vh] pb-[50vh] md:pb-[60vh] pt-6 md:pt-32 z-20"
              style={{
                '--sticky-increment': '32px',
                '--sticky-top': '15vh'
              } as React.CSSProperties}
            >
              {projectSteps.map((step, idx) => (
                <CardSticky
                  key={step.title}
                  index={idx}
                  incrementY={32}
                  style={{ '--sticky-increment': '32px', '--sticky-top': '15vh' } as React.CSSProperties}
                  className="group hd-card rounded-[1.5rem] shadow-[0_-8px_24px_rgba(0,0,0,0.35)] w-full"
                >
                  <div className="relative overflow-hidden rounded-[1.5rem] bg-[#111113] border border-white/10 p-8 sm:p-12 h-full w-full">
                    <div className={`absolute right-0 top-0 h-40 w-40 sm:h-64 sm:w-64 rounded-bl-full ${idx % 2 === 0 ? "bg-cyan/5" : "bg-teal/5"} pointer-events-none transition-transform duration-1000 group-hover:scale-110`} />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />

                    <div className="relative z-10 flex flex-col h-full gap-6">
                      <div className="flex items-start justify-between gap-4">
                        <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white mb-2 max-w-[80%]">
                          {step.title}
                        </h2>
                        <h3 className="font-display text-4xl sm:text-6xl font-black text-cyan/20 group-hover:text-cyan transition-colors duration-700 drop-shadow-[0_2px_10px_rgba(94,209,222,0.1)]">
                          {String(idx + 1).padStart(2, "0")}
                        </h3>
                      </div>

                      <p className="text-base sm:text-xl text-text-muted font-normal leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </CardSticky>
              ))}
            </ContainerScroll>

          </div>
        </div>
      </section>

      <section className="bg-bg py-40 border-t border-white/5">
        <div className="mx-auto w-full max-w-[92rem] px-6">
          <div className="flex flex-col items-center text-center">
            <p className="mb-6 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-deep-teal section-eyebrow-glow">Ready to start?</p>
            <h2 className="font-display mb-10 text-4xl sm:text-6xl font-semibold leading-tight tracking-tight text-white">
              Let's build something <span className="text-cyan italic">exceptional.</span>
            </h2>
            <Link to="/contact">
              <ShimmerButton
                shimmerColor="#ffffff"
                shimmerDuration="3s"
                background="var(--accent)"
                className="px-10 py-5 text-lg font-bold tracking-widest text-black uppercase"
              >
                Start your project
              </ShimmerButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
