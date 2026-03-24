import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { ShimmerButton } from "../components/ui/shimmer-button";

// Image Imports
import drakeMain from "../assets/work/drake-seaside/drake-seaside.png";
import drakeAltOne from "../assets/work/drake-seaside/drake-seaside 2.png";
import drakeMainWebp from "../assets/work/drake-seaside/drake-seaside.webp";
import drakeAltOneWebp from "../assets/work/drake-seaside/drake-seaside 2.webp";

import seykelzMain from "../assets/work/demo-beauty/demo-beauty.jpg";
import seykelzMainWebp from "../assets/work/demo-beauty/demo-beauty.webp";
import seykelzAltOne from "../assets/work/demo-beauty/demo-beauty 2.png";
import seykelzAltOneWebp from "../assets/work/demo-beauty/demo-beauty 2.webp";

import formaMain from "../assets/work/forma studio/forma studio.png";
import formaMainWebp from "../assets/work/forma studio/forma studio.webp";
import formaAltOne from "../assets/work/forma studio/forma studio 2.png";
import formaAltOneWebp from "../assets/work/forma studio/forma studio 2.webp";

import takamakaMain from "../assets/work/takamaka-house/takamaka house.png";
import takamakaMainWebp from "../assets/work/takamaka-house/takamaka house.webp";
import takamakaAltOne from "../assets/work/takamaka-house/takamaka house 2.png";
import takamakaAltOneWebp from "../assets/work/takamaka-house/takamaka house 2.webp";



export default function Work() {
  const shouldReduceMotion = useReducedMotion();

  const fadeIn = {
    initial: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.7, ease: "easeOut" as const },
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
        <motion.div {...fadeIn} className="mb-20 text-center">
          <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-accent section-eyebrow-glow">Real work, real businesses</span>
          <h2 className="font-display mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            Websites we've built with care
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-text-muted md:text-2xl font-light leading-relaxed">
            Every site you see here was built for a real business, with real goals. Take a look and imagine what we could do for yours.
          </p>
        </motion.div>
      </section>

      {/* Portfolio Item 1: Drake Seaside (Text Left, Image Right) */}
      <section className="py-20 md:py-32 border-t border-border bg-gradient-to-b from-transparent to-bg-panel/20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              
              <motion.div className="lg:col-span-12 xl:col-span-5 relative z-10 flex flex-col items-start text-left" {...fadeIn}>
                 <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-2 mb-4 bg-accent-2/10 inline-block px-3 py-1 rounded-[9px] border border-accent-2/20">
                    Growth Tier
                  </p>
                  <h3 className="font-display text-3xl md:text-5xl font-semibold text-text mb-6">Drake Seaside</h3>
                  <p className="text-base md:text-lg text-text-muted mb-8 leading-relaxed lg:max-w-xl">
                    A complete redesign with new pages, updated SEO-focused content, significantly faster load times, and a structure engineered for higher click-through conversions and bookings.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-start">
                     <a href="https://thedrake-seaside.com/" target="_blank" rel="noreferrer" className="inline-block hover:opacity-80 transition-opacity">
                       <button className="px-6 py-3 border border-accent/30 bg-[#0D102D] text-sm font-semibold rounded-[9px] hover:bg-accent/10 transition-colors shadow-[0_0_15px_rgba(0,229,255,0.08)]">
                         View live site
                       </button>
                     </a>
                     <Link to="/contact">
                       <ShimmerButton
                          shimmerColor="#060818"
                          shimmerDuration="4.2s"
                          background="#00E5FF"
                          className="px-6 py-3 text-sm font-semibold tracking-wide text-black"
                        >
                          Request similar site
                        </ShimmerButton>
                     </Link>
                  </div>
              </motion.div>

              <motion.div className="lg:col-span-12 xl:col-span-7 flex flex-col gap-6" {...fadeIn} transition={{ delay: 0.2 }}>
                 <div className="relative group">
                   <picture className="block rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,229,255,0.3)] dark:shadow-[0_0_50px_rgba(0,229,255,0.15)] border border-border/30">
                      <source srcSet={drakeMainWebp} type="image/webp" />
                      <img
                        src={drakeMain}
                        alt="Drake Seaside main homepage layout"
                        width={800}
                        height={520}
                        loading="eager"
                        fetchPriority="high"
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </picture>
                 </div>
                  <div className="w-full flex justify-center xl:justify-end -mt-16 sm:-mt-24 xl:-ml-12 relative z-20 pointer-events-none px-8 xl:pr-0">
                    <picture className="block rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,229,255,0.25)] dark:shadow-2xl border border-border/30 w-3/4 md:w-[62%]">
                      <source srcSet={drakeAltOneWebp} type="image/webp" />
                      <img
                        src={drakeAltOne}
                        alt="Drake Seaside booking detail interface"
                        width={600}
                        height={400}
                        loading="lazy"
                        className="w-full h-auto"
                      />
                    </picture>
                  </div>
              </motion.div>

           </div>
        </div>
      </section>

      {/* Portfolio Item 2: Takamaka House (Text Right, Image Left) */}
      <section className="py-20 md:py-32 border-t border-border">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              
              <motion.div className="lg:col-span-12 xl:col-span-7 flex flex-col gap-6 order-2 lg:order-1" {...fadeIn}>
                 <div className="relative group">
                   <picture className="block rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,229,255,0.3)] dark:shadow-[0_0_50px_rgba(0,229,255,0.15)] border border-border/30">
                      <source srcSet={takamakaMainWebp} type="image/webp" />
                      <img
                        src={takamakaMain}
                        alt="Takamaka House official layout"
                        width={800}
                        height={520}
                        loading="lazy"
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </picture>
                 </div>
                  <div className="w-full flex justify-center xl:justify-start -mt-16 sm:-mt-24 xl:ml-12 relative z-20 pointer-events-none px-8 xl:pl-0">
                    <picture className="block rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,229,255,0.25)] dark:shadow-2xl border border-border/30 w-3/4 md:w-[62%]">
                      <source srcSet={takamakaAltOneWebp} type="image/webp" />
                      <img
                        src={takamakaAltOne}
                        alt="Takamaka House detail interface"
                        width={600}
                        height={400}
                        loading="lazy"
                        className="w-full h-auto"
                      />
                    </picture>
                  </div>
              </motion.div>

              <motion.div className="lg:col-span-12 xl:col-span-5 relative z-10 order-1 lg:order-2 flex flex-col items-start text-left" {...fadeIn} transition={{ delay: 0.2 }}>
                 <p className="text-xs font-semibold uppercase tracking-[0.3em] text-text mb-4 bg-text/5 inline-block px-3 py-1 rounded-[9px] border border-border">
                    Foundation Tier
                  </p>
                  <h3 className="font-display text-3xl md:text-5xl font-semibold text-text mb-6">Takamaka House</h3>
                  <p className="text-base md:text-lg text-text-muted mb-8 leading-relaxed lg:max-w-xl">
                    A calm, immersive site designed to let the beauty of Takamaka House do the talking – and make guests excited to book before they even arrive.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-start">
                     <a href="https://horizondigitalsey.com/showcase/takamaka-house" target="_blank" rel="noreferrer" className="inline-block hover:opacity-80 transition-opacity">
                       <button className="px-6 py-3 border border-accent/30 bg-[#0D102D] text-sm font-semibold rounded-[9px] hover:bg-accent/10 transition-colors shadow-[0_0_15px_rgba(0,229,255,0.08)]">
                         View live site
                       </button>
                     </a>
                     <Link to="/contact">
                       <ShimmerButton
                          shimmerColor="#060818"
                          shimmerDuration="4.2s"
                          background="#00E5FF"
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

      {/* Portfolio Item 3: Forma Studio (Text Left, Image Right) */}
      <section className="py-20 md:py-32 border-t border-border bg-gradient-to-b from-transparent to-bg-panel/20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              
              <motion.div className="lg:col-span-12 xl:col-span-5 relative z-10 flex flex-col items-start text-left" {...fadeIn}>
                 <p className="text-xs font-semibold uppercase tracking-[0.3em] text-text mb-4 bg-text/5 inline-block px-3 py-1 rounded-[9px] border border-border">
                    Foundation Tier
                  </p>
                  <h3 className="font-display text-3xl md:text-5xl font-semibold text-text mb-6">Forma Studio</h3>
                  <p className="text-base md:text-lg text-text-muted mb-8 leading-relaxed lg:max-w-xl">
                    A clean, editorial showcase for a creative studio – designed to let their work breathe and make enquiries feel natural.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-start">
                     <a href="https://horizondigitalsey.com/showcase/forma-studio" target="_blank" rel="noreferrer" className="inline-block hover:opacity-80 transition-opacity">
                       <button className="px-6 py-3 border border-accent/30 bg-[#0D102D] text-sm font-semibold rounded-[9px] hover:bg-accent/10 transition-colors shadow-[0_0_15px_rgba(0,229,255,0.08)]">
                         View live site
                       </button>
                     </a>
                     <Link to="/contact">
                       <ShimmerButton
                          shimmerColor="#060818"
                          shimmerDuration="4.2s"
                          background="#00E5FF"
                          className="px-6 py-3 text-sm font-semibold tracking-wide text-black"
                        >
                          Request similar site
                        </ShimmerButton>
                     </Link>
                  </div>
              </motion.div>

              <motion.div className="lg:col-span-12 xl:col-span-7 flex flex-col gap-6" {...fadeIn} transition={{ delay: 0.2 }}>
                 <div className="relative group">
                   <picture className="block rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,229,255,0.3)] dark:shadow-[0_0_50px_rgba(0,229,255,0.15)] border border-border/30">
                      <source srcSet={formaMainWebp} type="image/webp" />
                      <img
                        src={formaMain}
                        alt="Forma Studio portal concept"
                        width={800}
                        height={520}
                        loading="lazy"
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </picture>
                 </div>
                  <div className="w-full flex justify-center xl:justify-end -mt-16 sm:-mt-24 xl:-ml-12 relative z-20 pointer-events-none px-8 xl:pr-0">
                    <picture className="block rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,229,255,0.25)] dark:shadow-2xl border border-border/30 w-3/4 md:w-[62%]">
                      <source srcSet={formaAltOneWebp} type="image/webp" />
                      <img
                        src={formaAltOne}
                        alt="Forma Studio gallery interface"
                        width={600}
                        height={400}
                        loading="lazy"
                        className="w-full h-auto"
                      />
                    </picture>
                  </div>
              </motion.div>

           </div>
        </div>
      </section>

      {/* Portfolio Item 4: Beauty Demo (Text Right, Image Left) */}
      <section className="py-20 md:py-32 border-t border-border">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              
              <motion.div className="lg:col-span-12 xl:col-span-7 flex flex-col gap-6 order-2 lg:order-1" {...fadeIn}>
                 <div className="relative group">
                   <picture className="block rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,229,255,0.3)] dark:shadow-[0_0_50px_rgba(0,229,255,0.15)] border border-border/30">
                      <source srcSet={seykelzMainWebp} type="image/webp" />
                      <img
                        src={seykelzMain ?? ""}
                        alt="Beauty demo website preview layout"
                        width={800}
                        height={520}
                        loading="lazy"
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </picture>
                 </div>
                  <div className="w-full flex justify-center xl:justify-start -mt-16 sm:-mt-24 xl:ml-12 relative z-20 pointer-events-none px-8 xl:pl-0">
                    <picture className="block rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,229,255,0.25)] dark:shadow-2xl border border-border/30 w-3/4 md:w-[62%]">
                       <source srcSet={seykelzAltOneWebp} type="image/webp" />
                       <img
                         src={seykelzAltOne ?? ""}
                         alt="Beauty demo services detail interface"
                         width={600}
                         height={400}
                         loading="lazy"
                         className="w-full h-auto"
                       />
                    </picture>
                  </div>
              </motion.div>

              <motion.div className="lg:col-span-12 xl:col-span-5 relative z-10 order-1 lg:order-2 flex flex-col items-start text-left" {...fadeIn} transition={{ delay: 0.2 }}>
                 <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-4 bg-accent/5 inline-block px-3 py-1 rounded-[9px] border border-accent/20">
                    Foundation Tier
                  </p>
                  <h3 className="font-display text-3xl md:text-5xl font-semibold text-text mb-6">Beauty Demo</h3>
                  <p className="text-base md:text-lg text-text-muted mb-8 leading-relaxed lg:max-w-xl">
                    A fast, focused site for a service business - clear pricing, easy contact, and a layout that turns curious visitors into real clients.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-start">
                     <a href="https://demo-beauty.horizondigitalsey.com/" target="_blank" rel="noreferrer" className="inline-block hover:opacity-80 transition-opacity">
                       <button className="px-6 py-3 border border-accent/30 bg-[#0D102D] text-sm font-semibold rounded-[9px] hover:bg-accent/10 transition-colors shadow-[0_0_15px_rgba(0,229,255,0.08)]">
                         View live site
                       </button>
                     </a>
                     <Link to="/contact">
                       <ShimmerButton
                          shimmerColor="#060818"
                          shimmerDuration="4.2s"
                          background="#00E5FF"
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,229,255,0.05)_0%,transparent_70%)]" />
        <div className="mx-auto w-full max-w-4xl px-5 sm:px-8 relative z-10">
          <motion.div {...fadeIn} className="mb-20 text-center">
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-accent section-eyebrow-glow">What we believe</span>
            <h2 className="font-display mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              Great websites feel effortless — for you and your customers
            </h2>
            <p className="text-lg md:text-xl text-text-muted mb-12 font-light">
              We build every site to look great, load fast, and feel natural to use — on any device, at any time.
            </p>
            <Link to="/contact" className="inline-block hover:-translate-y-1 transition-transform duration-300">
              <ShimmerButton
                shimmerColor="#060818"
                shimmerDuration="4.2s"
                background="#00E5FF"
                className="px-8 py-4 text-base font-semibold tracking-[0.08em] text-black shadow-[0_0_30_rgba(0,229,255,0.3)]"
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


