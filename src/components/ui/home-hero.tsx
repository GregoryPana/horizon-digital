import { Link } from "react-router-dom";
import { scrollToTopSmooth } from "../../lib/utils";
import { motion } from "framer-motion";
import drakeMain from "../../assets/work/drake-seaside/drake-seaside.jpg";

export default function HomeHero() {
  const handleWorkScrollTop = () => scrollToTopSmooth();

  return (
    <section id="top" className="relative h-screen min-h-[850px] w-full overflow-hidden bg-black text-white">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,255,255,0.05),transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-full opacity-30 select-none pointer-events-none">
           <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full" />
           <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600/5 blur-[150px] rounded-full" />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center px-6 pt-32 md:flex-row md:items-center md:px-10 md:pt-10 lg:px-14">
        {/* Left Side: Content */}
        <div className="w-full text-center md:w-1/2 md:text-left z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-cyan-400 mb-6 font-display italic">Premium Seychelles Digital</p>
            <h1 className="font-display text-5xl font-medium leading-[1.05] tracking-tight text-white md:text-7xl lg:text-8xl xl:text-9xl">
              Your business,
              <br />
              <span className="text-cyan-400">beautifully</span> online.
            </h1>
            <p className="mt-8 max-w-[38ch] text-lg leading-relaxed text-gray-400 md:text-xl lg:text-2xl font-light">
              Websites built for where you are right now — tailored for Seychelles, engineered for performance, and designed to move your business forward.
            </p>
            
            <div className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:justify-center md:justify-start">
              <Link to="/contact">
                <button className="rounded-lg bg-cyan-400 px-10 py-4 text-sm font-black uppercase tracking-[0.2em] text-black transition-all hover:bg-cyan-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(34,211,238,0.4)]">
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

        {/* Right Side: Bento / Image Showcase */}
        <div className="mt-20 w-full md:mt-0 md:w-1/2 md:pl-12 lg:pl-16 relative perspective-1000 hidden md:block">
           <motion.div 
             initial={{ opacity: 0, rotateY: 5, rotateX: 2 }}
             animate={{ opacity: 1, rotateY: 0, rotateX: 0 }}
             transition={{ duration: 1.2, ease: "easeOut" }}
             className="relative"
           >
              <div className="relative z-10 hero-bento-fixed rounded-2xl overflow-hidden border border-white/[0.1] shadow-2xl">
                 <img src={drakeMain} alt="Horizon Digital work sample" className="w-full h-auto grayscale-[0.2] hover:grayscale-0 transition-all duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                 <div className="absolute bottom-6 left-6">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-1">Featured Project</p>
                    <p className="text-white font-display text-xl">Drake Seaside Apartments</p>
                 </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl z-0" />
              <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl z-0" />
           </motion.div>
        </div>
      </div>

      {/* Trust Bar (Trusted by Visionary Enterprises) */}
      <div className="absolute bottom-12 w-full text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold mb-8">Trusted by Visionary Enterprises</p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 px-4 opacity-50 contrast-125 brightness-150">
           <span className="font-display text-xl tracking-widest">VOLTAIRE</span>
           <span className="font-display text-xl tracking-widest">AETHER</span>
           <span className="font-display text-xl tracking-widest">LUMINA</span>
           <span className="font-display text-xl tracking-widest">QUANTUM</span>
           <span className="font-display text-xl tracking-widest">NEXUS</span>
        </div>
      </div>
    </section>
  );
}
