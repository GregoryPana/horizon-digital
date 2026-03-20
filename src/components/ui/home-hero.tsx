import { Link } from "react-router-dom";
import { scrollToTopSmooth } from "../../lib/utils";
import { motion } from "framer-motion";
import heroDesktop from "../../assets/hero/hero-desktop-tech-v2.webp";
import heroMobile from "../../assets/hero/hero-mobile-tech-v2.webp";

export default function HomeHero() {
  const handleWorkScrollTop = () => scrollToTopSmooth();

  return (
    <section id="top" className="relative h-screen min-h-[700px] w-full overflow-hidden bg-black text-white">
      {/* Background Tech Image with Mask */}
      <div className="absolute inset-0 z-0">
         <picture>
            <source media="(max-width: 768px)" srcSet={heroMobile} />
            <img 
              src={heroDesktop} 
              alt="Tech interface background" 
              className="w-full h-full object-cover object-center opacity-70" 
            />
         </picture>
         {/* Bottom Fade Mask */}
         <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/60 to-transparent z-[1]" />
         {/* Top Overlay for Contrast */}
         <div className="absolute inset-0 bg-black/40 z-[1]" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 pt-20 md:flex-row md:items-center md:px-10 md:pt-0 lg:px-14">
        {/* Left Side: Content */}
        <div className="w-full text-center md:items-start md:text-left z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-6 font-display italic">Seychelles Web Design Studio</p>
            <h1 className="font-display text-5xl font-medium leading-[1.05] tracking-tight text-white md:text-7xl lg:text-8xl xl:text-9xl">
              Your Website should bring you customers <span className="text-accent italic">&</span> <br />look good.
            </h1>
            <p className="mt-8 max-w-[44ch] text-lg leading-relaxed text-text-muted md:text-xl lg:text-2xl font-light mx-auto md:mx-0">
              Your business deserves a website that works as hard as you do — beautifully designed, easy to find, and built to turn visitors into customers you're proud to serve.
            </p>
            
            <div className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:justify-center md:justify-start">
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
