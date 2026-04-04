import { Link } from "react-router-dom";
import { scrollToTopSmooth } from "../../lib/utils";
import { motion } from "framer-motion";
import heroDesktop from "../../assets/hero/hero-desktop-tech-v2.webp";
import heroMobile from "../../assets/hero/hero-mobile-tech-v2.webp";

export default function HomeHero() {
  const handleWorkScrollTop = () => scrollToTopSmooth();

  return (
    <section id="top" className="relative h-[100svh] md:h-screen min-h-[660px] md:min-h-[700px] w-full overflow-hidden bg-black text-white">
      {/* Background Tech Image with Mask */}
      <div className="absolute inset-0 z-0">
         <picture>
            <source media="(max-width: 768px)" srcSet={heroMobile} />
            <img 
              src={heroDesktop} 
              alt="Tech interface background" 
              className="w-full h-full object-cover object-center opacity-85" 
              fetchPriority="high"
              loading="eager"
              width={1600}
              height={900}
            />
         </picture>
         {/* Bottom Fade Mask */}
         <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/40 to-transparent z-[1]" />
         {/* Top Overlay for Contrast */}
         <div className="absolute inset-0 z-[2]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent md:hidden" />
          <div className="absolute inset-y-0 left-0 hidden w-[75%] bg-gradient-to-r from-black/95 via-black/45 to-transparent md:block" />
        </div>
      </div>

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1760px] flex-col justify-between px-6 pb-[4svh] pt-32 md:min-h-screen md:px-10 md:pt-48 lg:px-14 xl:px-20">
        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between z-20">
          <div className="max-w-4xl">
            {/* Eyebrow - Slide from Left */}
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-deep-teal section-eyebrow-glow mb-6 motion-safe-gpu"
            >
              Web Design Studio • Seychelles
            </motion.p>
            
            {/* Heading - Letter Reveal + Blur-In */}
            <motion.h1 
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[2.2rem] sm:text-[3.2rem] md:text-[5rem] lg:text-[6.2rem] font-semibold leading-[0.9] tracking-[0.02em] text-white mb-6 uppercase md:leading-[0.92] motion-safe-gpu min-h-[4.4em] sm:min-h-[3.3em] md:min-h-0"
            >
              YOUR WEBSITE <br className="hidden sm:block" />
              SHOULD BRING YOU <br className="hidden sm:block" />
              CUSTOMERS <br className="hidden sm:block" />
              <span className="text-accent italic font-normal">&</span> LOOK GOOD.
            </motion.h1>

            {/* Subheading - Fade & Gentle Rise (Desktop Only) */}
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="hidden md:block max-w-[46ch] text-sm sm:text-base md:text-lg leading-relaxed text-gray-300 font-light motion-safe-gpu"
            >
              Your business deserves a website that works as hard as you do — beautifully designed, easy to find, and built to turn visitors into customers you're proud to serve.
            </motion.p>
            
            {/* Mobile Trust Pills - Staggered Scale-In */}
            <div className="mt-16 flex flex-wrap justify-center gap-x-3 gap-y-2 opacity-100 md:hidden">
              {['CUSTOM DESIGN', 'MOBILE FIRST', 'SEO READY'].map((tag, idx) => (
                <motion.span 
                  key={tag} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + (idx * 0.1), ease: "backOut" }}
                  className="text-[9px] font-bold tracking-[0.16em] text-accent uppercase border border-accent/60 px-3 py-1.5 rounded-full bg-accent/15 whitespace-nowrap motion-safe-gpu"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Desktop-Only Feature Tags - Staggered Slide */}
            <div className="mt-20 hidden md:flex flex-wrap justify-start gap-x-4 gap-y-3 opacity-100">
              {['CUSTOM DESIGN', 'MOBILE READY', 'FAST LOADING', 'SEO READY'].map((tag, idx) => (
                <motion.span 
                  key={tag} 
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + (idx * 0.1) }}
                  className="text-[11px] font-bold tracking-[0.2em] text-accent uppercase border border-accent/50 px-4 py-1.5 rounded-full bg-accent/10 whitespace-nowrap motion-safe-gpu"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Desktop CTAs - Subtle Float-In */}
            <div className="mt-8 md:mt-12 hidden md:flex flex-col items-center gap-6 sm:flex-row sm:justify-center md:justify-start">
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="motion-safe-gpu"
              >
                <Link to="/contact">
                  <button 
                    aria-label="Contact us to get started with your project"
                    className="rounded-lg bg-accent px-10 py-4 text-sm font-black uppercase tracking-[0.2em] text-black transition-all hover:opacity-90 hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_var(--glow)]"
                  >
                    Get Started
                  </button>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="motion-safe-gpu"
              >
                <Link to="/work">
                  <button 
                    onClick={handleWorkScrollTop} 
                    aria-label="View our portfolio of web design work"
                    className="group rounded-lg border border-accent/30 bg-white/[0.05] px-10 py-4 text-sm font-black uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all hover:bg-white/[0.1] hover:border-accent/50"
                  >
                    Our Work <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile-Only Bottom Block */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col items-center md:hidden z-20 motion-safe-gpu"
        >
          <div className="flex flex-col w-full gap-4 px-4 pb-2">
            <Link to="/contact" className="w-full">
              <button 
                aria-label="Contact us to discuss your project"
                className="w-full rounded-lg bg-accent py-4 text-[11px] font-black uppercase tracking-[0.2em] text-black active:scale-95 transition-transform shadow-[0_0_30px_rgba(0,229,255,0.3)]"
              >
                Discuss project
              </button>
            </Link>
            <Link to="/work" className="w-full">
              <button 
                onClick={handleWorkScrollTop} 
                aria-label="View our showcase projects"
                className="w-full rounded-lg border border-accent/30 bg-white/[0.05] py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white active:scale-95 transition-transform backdrop-blur-sm"
              >
                View Our Work
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
