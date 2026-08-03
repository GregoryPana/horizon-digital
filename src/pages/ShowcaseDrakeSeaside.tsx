import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Seo from "../components/Seo";
// Removed Breadcrumbs import to fix build error
import guesthouseHeroAvif400 from "../assets/work/drake-seaside/hero-bg-400.avif";
import guesthouseHeroAvif800 from "../assets/work/drake-seaside/hero-bg-800.avif";
import guesthouseHeroAvif1200 from "../assets/work/drake-seaside/hero-bg-1200.avif";
import guesthouseHeroWebp400 from "../assets/work/drake-seaside/hero-bg-400.webp";
import guesthouseHeroWebp800 from "../assets/work/drake-seaside/hero-bg-800.webp";
import guesthouseHeroWebp1200 from "../assets/work/drake-seaside/hero-bg-1200.webp";
import guesthouseHeroFallback from "../assets/work/drake-seaside/hero-bg-1200.jpg";
import guesthousePreviewAvif400 from "../assets/work/drake-seaside/drake-seaside-400.avif";
import guesthousePreviewAvif800 from "../assets/work/drake-seaside/drake-seaside-800.avif";
import guesthousePreviewAvif1200 from "../assets/work/drake-seaside/drake-seaside-1200.avif";
import guesthousePreviewWebp400 from "../assets/work/drake-seaside/drake-seaside-400.webp";
import guesthousePreviewWebp800 from "../assets/work/drake-seaside/drake-seaside-800.webp";
import guesthousePreviewWebp1200 from "../assets/work/drake-seaside/drake-seaside-1200.webp";
import guesthousePreviewFallback from "../assets/work/drake-seaside/drake-seaside-1200.jpg";
import { ArrowUpRight, CheckCircle2, Zap, Target, MousePointer2 } from "lucide-react";

const metrics = [
  {
    label: "Project Status",
    value: "Live",
    description: "Commissioned client work, not a concept or demonstration.",
    icon: Target
  },
  {
    label: "Delivery",
    value: "Redesign",
    description: "Performance-aware page and media delivery for common visitor devices and connections.",
    icon: Zap
  },
  {
    label: "Responsive Build",
    value: "Multi-device",
    description: "Layouts prepared for common phone, tablet, and desktop sizes.",
    icon: MousePointer2
  }
];

const solutions = [
  "Property Presentation: Room galleries, accommodation information and video where appropriate.",
  "Booking Path: Direct access to the existing booking engine and WhatsApp contact.",
  "SEO Foundation: Page structure and metadata for relevant Seychelles self-catering searches.",
  "Responsive Design: Layouts tested across common phone, tablet, and desktop sizes."
];

const responsiveSrcSet = (small: string, medium: string, large: string) =>
  `${small} 400w, ${medium} 800w, ${large} 1200w`;

export default function ShowcaseDrakeSeaside() {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <div className="bg-bg min-h-screen text-text overflow-x-hidden">
      <Seo
        title="Drake Seaside Apartments Website Project | Horizon Digital"
        description="A live client website redesign for Drake Seaside Apartments, with updated pages, responsive layouts and direct contact paths."
        path="/showcase/drake-seaside"
      />

      <div className="pt-24 lg:pt-32">
        {/* Placeholder for top spacing */}
      </div>

      {/* Hero Section */}
      <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: shouldReduceMotion ? 1 : 1.1, opacity: shouldReduceMotion ? 1 : 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <picture className="block h-full w-full">
            <source srcSet={responsiveSrcSet(guesthouseHeroAvif400, guesthouseHeroAvif800, guesthouseHeroAvif1200)} sizes="100vw" type="image/avif" />
            <source srcSet={responsiveSrcSet(guesthouseHeroWebp400, guesthouseHeroWebp800, guesthouseHeroWebp1200)} sizes="100vw" type="image/webp" />
            <img
              src={guesthouseHeroFallback}
              alt="Drake Seaside Apartments exterior"
              width="1200"
              height="900"
              className="w-full h-full object-cover opacity-40 grayscale-[20%]"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-transparent to-bg" />
        </motion.div>

        <div className="container relative z-10 px-6 text-center">
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: "easeOut", delay: shouldReduceMotion ? 0 : 0.2 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[11px] font-medium uppercase tracking-[0.2em] mb-6">
              Website concept
            </span>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8">
              Drake Seaside <br />
              <span className="text-accent underline decoration-accent/30 decoration-offset-8">Apartments</span>
            </h1>
            <p className="max-w-2xl mx-auto text-text/60 text-lg md:text-xl leading-relaxed">
              A live redesign for a Seychelles guesthouse, with clearer property
              information, responsive layouts, and direct booking paths.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.8 }}
            className="mt-12"
          >
            <a 
              href="https://thedrake-seaside.com/?utm_source=horizondigitalsey.com&utm_medium=referral&utm_campaign=case_study"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-bg font-semibold hover:bg-accent hover:text-white transition-all duration-300"
            >
              Visit Live Project
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="py-24 border-y border-white/5 bg-white/[0.01]">
        <div className="container px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {metrics.map((metric, idx) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: "easeOut", delay: shouldReduceMotion ? 0 : idx * 0.1 }}
                className="relative p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <metric.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-4xl font-bold text-white mb-2">{metric.value}</h3>
                <p className="text-lg font-medium text-text mb-2">{metric.label}</p>
                <p className="text-text/50 text-sm leading-relaxed">{metric.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-32">
        <div className="container px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: "easeOut" }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                Clearer property information and <br />
                <span className="text-accent italic">direct booking paths.</span>
              </h2>
              <div className="space-y-6 text-text/70 text-lg">
                <p>
                  The redesign reorganised the property's accommodation information, updated the page layouts and gave visitors clearer routes to the existing booking engine and WhatsApp contact.
                </p>
                <p>
                  Responsive imagery and clearer page structure support that journey across common screen sizes. This case study describes the delivered website changes; it does not claim a booking, revenue or operational result without measured evidence.
                </p>
              </div>
              
              <div className="mt-12 grid gap-4">
                {solutions.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-1" />
                    <span className="text-text/80">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: shouldReduceMotion ? 0 : 1, ease: "easeOut" }}
              className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-accent/5"
            >
              <picture className="block h-full w-full">
                <source srcSet={responsiveSrcSet(guesthousePreviewAvif400, guesthousePreviewAvif800, guesthousePreviewAvif1200)} sizes="(min-width: 1024px) 50vw, 100vw" type="image/avif" />
                <source srcSet={responsiveSrcSet(guesthousePreviewWebp400, guesthousePreviewWebp800, guesthousePreviewWebp1200)} sizes="(min-width: 1024px) 50vw, 100vw" type="image/webp" />
                <img
                  src={guesthousePreviewFallback}
                  alt="Drake Seaside Apartments website interface"
                  width="1200"
                  height="628"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Verified project classification */}
      <section className="py-32 bg-accent/5 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        
        <div className="container px-6 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: "easeOut" }}
          >
            <p className="text-3xl md:text-5xl font-medium text-white mb-8 leading-[1.3] tracking-tight">
              A live client redesign with updated pages, clearer property information, and responsive layouts.
            </p>
            <p className="text-text-muted uppercase tracking-widest text-xs">Project classification: live client work</p>
          </motion.div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-40 text-center">
        <div className="container px-6">
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-12">
              Ready to discuss a similar approach?
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="/contact"
                className="px-12 py-5 rounded-full bg-accent text-white font-bold hover:scale-105 transition-transform"
              >
                Start Your Project
              </a>
              <a 
                href="/work"
                className="px-12 py-5 rounded-full border border-white/20 hover:bg-white/5 transition-colors"
              >
                Explore More Work
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
