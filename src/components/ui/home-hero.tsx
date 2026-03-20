import { Link } from "react-router-dom";
import { scrollToTopSmooth } from "../../lib/utils";
import { motion } from "framer-motion";
import heroDesktop from "../../assets/hero/hero-desktop-tech-v2.webp";
import heroMobile from "../../assets/hero/hero-mobile-tech-v2.webp";

export default function HomeHero() {
  const handleWorkScrollTop = () => scrollToTopSmooth();

  return (
    <section id="top" className="relative h-[75vh] md:h-screen min-h-[550px] md:min-h-[700px] w-full overflow-hidden bg-black text-white">
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

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 pt-12 md:items-start md:px-6 lg:px-8">
        {/* Left Side: Content */}
        <div className="w-full text-center md:items-start md:text-left z-20 md:max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.45em] text-accent mb-6 font-display italic">Horizon Digital • Web Design Studio • Seychelles</p>
            <h1 className="font-display text-3xl sm:text-4xl font-medium leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl uppercase md:leading-[0.92] md:tracking-normal">
              YOUR WEBSITE <br />
              SHOULD BRING YOU <br />
              CUSTOMERS <br />
              <span className="text-accent italic font-normal">&</span> LOOK GOOD.
            </h1>
            <p className="mt-8 max-w-[46ch] text-sm md:text-lg leading-relaxed text-white/70 font-light mx-auto md:mx-0 hidden md:block">
              Your business deserves a website that works as hard as you do — beautifully designed, easy to find, and built to turn visitors into customers you're proud to serve.
            </p>
            
            {/* Feature Tags List */}
            <div className="mt-6 md:mt-8 flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-3 opacity-60">
              {['CUSTOM DESIGN', 'MOBILE READY', 'FAST LOADING', 'SEO READY'].map((tag) => (
                <span key={tag} className="text-[9px] font-bold tracking-[0.25em] text-accent uppercase border-b border-accent/20 pb-0.5">{tag}</span>
              ))}
            </div>
            
            <div className="mt-8 md:mt-12 flex flex-col items-center gap-6 sm:flex-row sm:justify-center md:justify-start">
              <Link to="/contact">
                <button className="rounded-lg bg-accent px-10 py-4 text-sm font-black uppercase tracking-[0.2em] text-black transition-all hover:opacity-90 hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_var(--glow)]">
                  Get Started
                </button>
              </Link>
              <Link to="/work">
                <button onClick={handleWorkScrollTop} className="group rounded-lg border border-white/10 bg-white/[0.03] px-10 py-4 text-sm font-black uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all hover:bg-white/[0.1] hover:border-white/30">
                  Our Work <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
