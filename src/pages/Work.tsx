import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { ShimmerButton } from "../components/ui/shimmer-button";
import drakeMain from "../assets/work/drake-seaside/drake-seaside.png";
import drakeAltOne from "../assets/work/drake-seaside/drake-seaside 2.png";
import drakeMainWebp from "../assets/work/drake-seaside/drake-seaside.webp";
import drakeAltOneWebp from "../assets/work/drake-seaside/drake-seaside 2.webp";
import seykelzMain from "../assets/work/demo-beauty/demo-beauty.jpg";
import seykelzMainWebp from "../assets/work/demo-beauty/demo-beauty.webp";
import seykelzAltOne from "../assets/work/demo-beauty/demo-beauty 2.png";
import WordReveal from "../components/ui/word-reveal";

export default function Work() {
  const shouldReduceMotion = useReducedMotion();

  const fadeIn = {
    initial: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.7, ease: "easeOut" },
  };

  return (
    <div className="overflow-hidden">
      <h1 className="sr-only">Website Design Portfolio Horizon Digital</h1>
      <Seo
        title="Our Work | Website Design Portfolio Seychelles"
        description="Explore the Horizon Digital website portfolio. We build custom websites designed to communicate clearly, perform fast, and support real business needs in Seychelles."
        path="/work"
        keywords="website design portfolio Seychelles, web design examples Seychelles, real business websites, fast web templates"
      />

      {/* Hero Header */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 text-center px-5 sm:px-8 max-w-5xl mx-auto">
        <motion.div {...fadeIn}>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent section-eyebrow-glow mb-6">
            Featured Projects
          </p>
          <h2 className="text-4xl md:text-7xl font-semibold tracking-tight text-text mb-8">
            <WordReveal staggerDelay={0.06}>Design engineered for conversion</WordReveal>
          </h2>
          <p className="text-lg md:text-2xl font-light text-text-muted max-w-3xl mx-auto leading-relaxed">
            Each project is structurally designed and optimized around the core business goals it needs to support.
          </p>
        </motion.div>
      </section>

      {/* Portfolio Item 1: Drake Seaside (Split Banner layout) */}
      <section className="py-20 md:py-32 border-t border-white/[0.03] bg-gradient-to-b from-transparent to-bg-panel/20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              
              <motion.div className="lg:col-span-5 relative z-10" {...fadeIn}>
                 <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-2 mb-4 bg-accent-2/10 inline-block px-3 py-1 rounded-full border border-accent-2/20">
                    Growth Tier
                  </p>
                  <h3 className="text-3xl md:text-5xl font-semibold text-text mb-6">Drake Seaside</h3>
                  <p className="text-base md:text-lg text-text-muted mb-8 leading-relaxed">
                    A complete redesign with new pages, updated SEO-focused content, significantly faster load times, and a structure engineered for higher click-through conversions and bookings.
                  </p>
                  <div className="flex flex-wrap gap-4">
                     <a href="https://thedrake-seaside.com/" target="_blank" rel="noreferrer" className="inline-block hover:opacity-80 transition-opacity">
                       <button className="px-6 py-3 border border-border text-sm font-semibold rounded-full hover:bg-white/5 transition-colors">
                         View live site
                       </button>
                     </a>
                     <Link to="/contact">
                       <ShimmerButton
                          shimmerColor="#0b1212"
                          shimmerDuration="4.2s"
                          background="#46c6e8"
                          className="px-6 py-3 text-sm font-semibold tracking-wide text-black"
                        >
                          Request similar site
                        </ShimmerButton>
                     </Link>
                  </div>
              </motion.div>

              <motion.div className="lg:col-span-7 flex flex-col gap-6" {...fadeIn} transition={{ delay: 0.2 }}>
                 <picture className="block rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(70,198,232,0.1)] border border-white/10 group">
                    <source srcSet={drakeMainWebp} type="image/webp" />
                    <img
                      src={drakeMain}
                      alt="Drake Seaside main homepage layout"
                      width={800}
                      height={520}
                      loading="eager"
                      fetchpriority="high"
                      decoding="sync"
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </picture>
                  <div className="w-full flex justify-end -mt-16 sm:-mt-24 sm:-ml-12 relative z-20 pointer-events-none pr-8 sm:pr-0">
                    <picture className="block rounded-xl overflow-hidden shadow-2xl border border-white/20 w-2/3 md:w-1/2">
                      <source srcSet={drakeAltOneWebp} type="image/webp" />
                      <img
                        src={drakeAltOne}
                        alt="Drake Seaside booking detail interface"
                        width={600}
                        height={400}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto"
                      />
                    </picture>
                  </div>
              </motion.div>

           </div>
        </div>
      </section>

      {/* Portfolio Item 2: Beauty Demo (Alternated layout) */}
      <section className="py-20 md:py-32 border-t border-white/[0.03]">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              
              <motion.div className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-1" {...fadeIn}>
                 <picture className="block rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.05)] border border-white/10 group">
                    {seykelzMainWebp && <source srcSet={seykelzMainWebp} type="image/webp" />}
                    <img
                      src={seykelzMain}
                      alt="Beauty demo website preview layout"
                      width={800}
                      height={520}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </picture>
                  <div className="w-full flex justify-start -mt-16 sm:-mt-24 sm:-mr-12 relative z-20 pointer-events-none pl-8 sm:pl-0">
                    <picture className="block rounded-xl overflow-hidden shadow-2xl border border-white/20 w-2/3 md:w-1/2 bg-bg">
                      <img
                        src={seykelzAltOne}
                        alt="Beauty demo services detail interface"
                        width={600}
                        height={400}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto mix-blend-lighten"
                      />
                    </picture>
                  </div>
              </motion.div>

              <motion.div className="lg:col-span-5 relative z-10 order-1 lg:order-2" {...fadeIn} transition={{ delay: 0.2 }}>
                 <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50 mb-4 bg-white/5 inline-block px-3 py-1 rounded-full border border-white/10">
                    Foundation Tier
                  </p>
                  <h3 className="text-3xl md:text-5xl font-semibold text-text mb-6">Beauty Demo</h3>
                  <p className="text-base md:text-lg text-text-muted mb-8 leading-relaxed">
                    A streamlined foundation-tier website demo built for service-based businesses. It showcases a crystal-clear service layout and a frictionless contact path mapped to high-conversion Web Vitals UX standards.
                  </p>
                  <div className="flex flex-wrap gap-4">
                     <a href="https://demo-beauty.horizondigitalsey.com/" target="_blank" rel="noreferrer" className="inline-block hover:opacity-80 transition-opacity">
                       <button className="px-6 py-3 border border-border text-sm font-semibold rounded-full hover:bg-white/5 transition-colors">
                         View live site
                       </button>
                     </a>
                     <Link to="/contact">
                       <ShimmerButton
                          shimmerColor="#0b1212"
                          shimmerDuration="4.2s"
                          background="#ffffff"
                          className="px-6 py-3 text-sm font-semibold tracking-wide text-black"
                        >
                          Request similar site
                        </ShimmerButton>
                     </Link>
                  </div>
              </motion.div>

           </div>
        </div>
      </section>

      {/* Philosophy Banner */}
      <section className="bg-bg-elev border-t border-accent/10 py-24 md:py-32 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(70,198,232,0.05)_0%,transparent_70%)]" />
        <div className="mx-auto w-full max-w-4xl px-5 sm:px-8 relative z-10">
          <motion.div {...fadeIn}>
            <p className="text-xs uppercase tracking-[0.4em] text-accent font-semibold mb-6">Our Philosophy</p>
            <h2 className="text-3xl font-semibold text-text md:text-5xl md:leading-[1.2] tracking-tight mb-8">
              Clear structure, intuitive flows, reliable performance.
            </h2>
            <p className="text-lg md:text-xl text-text-muted mb-12 font-light">
              Good websites balance stunning bespoke aesthetics, immediate usability, and lightning fast speeds to support real business outcomes. Layouts are comprehensively tested for mobile-first speed and readability.
            </p>
            <Link to="/contact" className="inline-block hover:-translate-y-1 transition-transform duration-300">
              <ShimmerButton
                shimmerColor="#0b1212"
                shimmerDuration="4.2s"
                background="#46c6e8"
                className="px-8 py-4 text-base font-semibold tracking-[0.08em] text-black shadow-[0_0_30px_rgba(70,198,232,0.3)]"
              >
                Start your project
              </ShimmerButton>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
