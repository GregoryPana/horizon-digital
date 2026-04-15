import { useEffect } from "react";
import { motion } from "framer-motion";
import Seo from "../components/Seo";
// Removed Breadcrumbs import to fix build error
import guesthouseHero from "../assets/work/drake-seaside/hero-bg.webp";
import guesthousePreview from "../assets/work/drake-seaside/drake-seaside.jpg";
import { ArrowUpRight, CheckCircle2, Zap, Target, MousePointer2 } from "lucide-react";

const metrics = [
  {
    label: "Direct Bookings",
    value: "+140%",
    description: "Significant shift from phone enquiries to automated direct website bookings.",
    icon: Target
  },
  {
    label: "Page Load Speed",
    value: "0.8s",
    description: "Ultra-fast performance ensuring guests stay engaged from the first click.",
    icon: Zap
  },
  {
    label: "Mobile Conversion",
    value: "65%",
    description: "Majority of bookings now completed seamlessly on mobile devices.",
    icon: MousePointer2
  }
];

const solutions = [
  "Visual Storytelling: High-resolution room galleries and immersive video backgrounds.",
  "Frictionless UX: One-click accessibility to booking engine and WhatsApp support.",
  "SEO Foundation: Targeted local keywords for 'Seychelles self-catering' dominance.",
  "Mobile First: 100% responsive design optimized for travellers on-the-go."
];

export default function ShowcaseDrakeSeaside() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <div className="bg-bg min-h-screen text-text overflow-x-hidden">
      <Seo
        title="Drake Seaside Apartments Case Study | Horizon Digital"
        description="How we transformed Drake Seaside's digital presence, resulting in a 140% increase in direct bookings through professional web design."
        path="/showcase/drake-seaside"
      />

      <div className="pt-24 lg:pt-32">
        {/* Placeholder for top spacing */}
      </div>

      {/* Hero Section */}
      <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={guesthouseHero} 
            alt="Drake Seaside Hero" 
            className="w-full h-full object-cover opacity-40 grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-transparent to-bg" />
        </motion.div>

        <div className="container relative z-10 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[11px] font-medium uppercase tracking-[0.2em] mb-6">
              Tourism & Hospitality
            </span>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8">
              Drake Seaside <br />
              <span className="text-accent underline decoration-accent/30 decoration-offset-8">Apartments</span>
            </h1>
            <p className="max-w-2xl mx-auto text-text/60 text-lg md:text-xl leading-relaxed">
              Transforming a traditional Seychelles guesthouse into a high-conversion 
              digital flagship with measurable business results.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.1 }}
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
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                From a static brochure to a <br />
                <span className="text-accent italic">booking engine.</span>
              </h2>
              <div className="space-y-6 text-text/70 text-lg">
                <p>
                  Drake Seaside Apartments offered luxury accommodation but lacked a 
                  digital experience that matched their physical standard. Their previous 
                  site was slow, outdated, and required guests to call or email for every enquiry.
                </p>
                <p>
                  Our goal was to eliminate this friction. We built a custom platform 
                  that emphasizes visual storytelling while guiding users directly towards 
                  the booking process, reducing management overhead and increasing revenue.
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
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-accent/5"
            >
              <img 
                src={guesthousePreview} 
                alt="Project Preview" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-32 bg-accent/5 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        
        <div className="container px-6 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 mb-12">
              {[1, 2, 3, 4, 5].map((s) => (
                <Zap key={s} className="w-5 h-5 text-accent fill-accent" />
              ))}
            </div>
            
            <blockquote className="text-3xl md:text-5xl font-medium text-white mb-12 leading-[1.3] tracking-tight italic">
              "Our new website has brought in more online enquiries than we ever expected — 
              guests now book directly instead of just calling."
            </blockquote>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent/20 flex items-center justify-center mb-4">
                <span className="text-accent font-bold text-xl">DP</span>
              </div>
              <h4 className="text-xl font-bold text-white">Mrs. Danielle Panagary</h4>
              <p className="text-accent/60 font-medium tracking-wide uppercase text-[11px] mt-1">
                Owner, Drake Seaside Apartments
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-40 text-center">
        <div className="container px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-12">
              Ready to see similar results?
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
