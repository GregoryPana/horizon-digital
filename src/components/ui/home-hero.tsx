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
            />
         </picture>
         {/* Bottom Fade Mask */}
         <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/40 to-transparent z-[1]" />
         {/* Top Overlay for Contrast */}
         <div className="absolute inset-0 bg-black/5 z-[1]" />
          <div className="absolute inset-y-0 left-0 w-full md:w-[75%] bg-gradient-to-r from-black/95 via-black/45 to-transparent z-[2]" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-between px-6 pt-24 pb-[4svh] md:justify-center md:items-start md:pb-0 md:px-6 lg:px-8">
        {/* Top/Center: Header Content */}
        <div className="w-full text-center md:items-start md:text-left z-20 md:max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col"
          >
            <div className="mb-auto md:mb-0">
              <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.45em] text-accent mb-6 font-display italic">Horizon Digital • Web Design Studio • Seychelles</p>
              <h1 className="font-display text-3xl sm:text-4xl font-medium leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl uppercase md:leading-[0.92] md:tracking-normal">
                YOUR WEBSITE <br />
                SHOULD BRING YOU <br />
                CUSTOMERS <br />
                <span className="text-accent italic font-normal">&</span> LOOK GOOD.
              </h1>
            </div>
            
            <p className="mt-8 max-w-[46ch] text-sm md:text-lg leading-relaxed text-white/70 font-light mx-auto md:mx-0 hidden md:block">
              Your business deserves a website that works as hard as you do — beautifully designed, easy to find, and built to turn visitors into customers you're proud to serve.
            </p>
            
            {/* Mobile Trust Pills - Now below header */}
            <div className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-2 opacity-100 md:hidden">
              {['CUSTOM DESIGN', 'MOBILE FIRST', 'SEO READY'].map((tag) => (
                <span key={tag} className="text-[9px] font-bold tracking-[0.16em] text-accent uppercase border border-accent/60 px-3 py-1.5 rounded-full bg-accent/15 whitespace-nowrap">{tag}</span>
              ))}
            </div>

            {/* Desktop-Only Feature Tags */}
            <div className="mt-10 hidden md:flex flex-wrap justify-start gap-x-4 gap-y-3 opacity-100">
              {['CUSTOM DESIGN', 'MOBILE READY', 'FAST LOADING', 'SEO READY'].map((tag) => (
                <span key={tag} className="text-[11px] font-bold tracking-[0.2em] text-accent uppercase border border-accent/50 px-4 py-1.5 rounded-full bg-accent/10 whitespace-nowrap">{tag}</span>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="mt-8 md:mt-12 hidden md:flex flex-col items-center gap-6 sm:flex-row sm:justify-center md:justify-start">
              <Link to="/contact">
                <button className="rounded-lg bg-accent px-10 py-4 text-sm font-black uppercase tracking-[0.2em] text-black transition-all hover:opacity-90 hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_var(--glow)]">
                  Get Started
                </button>
              </Link>
              <Link to="/work">
                <button onClick={handleWorkScrollTop} className="group rounded-lg border border-accent/30 bg-white/[0.05] px-10 py-4 text-sm font-black uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all hover:bg-white/[0.1] hover:border-accent/50">
                  Our Work <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Mobile-Only Bottom Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full flex flex-col items-center md:hidden z-20"
        >
          <div className="flex flex-col w-full gap-4 px-4 pb-2">
            <Link to="/contact" className="w-full">
              <button className="w-full rounded-lg bg-accent py-4 text-[11px] font-black uppercase tracking-[0.2em] text-black active:scale-95 transition-transform shadow-[0_0_30px_rgba(0,229,255,0.3)]">
                Discuss project
              </button>
            </Link>
            <Link to="/work" className="w-full">
              <button onClick={handleWorkScrollTop} className="w-full rounded-lg border border-accent/30 bg-white/[0.05] py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white active:scale-95 transition-transform backdrop-blur-sm">
                View Our Work
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
