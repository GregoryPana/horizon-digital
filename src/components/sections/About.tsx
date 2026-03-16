import { useRef } from 'react'
import Container from '@/components/ui/Container'
import { ABOUT } from '@/lib/content'
import { gsap, useGSAP } from '@/lib/gsap'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Parallax for the background block
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])

  useGSAP(
    () => {
      const paragraphs = sectionRef.current?.querySelectorAll('.reveal-para')
      if (paragraphs) {
        paragraphs.forEach((p) => {
          gsap.fromTo(p, 
            { opacity: 0, x: -20 },
            { 
              opacity: 1, 
              x: 0, 
              duration: 1, 
              ease: 'cinematic',
              scrollTrigger: {
                trigger: p,
                start: 'top 85%',
                toggleActions: 'play none none none'
              }
            }
          )
        })
      }
    },
    { scope: sectionRef }
  )

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="relative bg-white dark:bg-[#050505] py-cinematic overflow-hidden"
    >
      {/* Cinematic Bold Color Block */}
      <motion.div 
        style={{ y }}
        className="absolute top-20 right-[-10%] w-[50%] h-[120%] bg-teal/5 dark:bg-teal/[0.02] transform rotate-3"
      />

      <Container>
        <div className="relative z-10 grid grid-cols-12 gap-gutter">
          <div className="col-span-12 lg:col-span-10 lg:col-start-2">
            <span className="text-teal font-syne text-sm uppercase tracking-[0.3em] mb-8 block">
              {ABOUT.tag}
            </span>

            <h2 className="font-syne text-display-hero text-black dark:text-white uppercase mb-16 leading-[0.85]">
              {ABOUT.quoteWords[0]} <span className="text-teal">{ABOUT.quoteWords[1]}</span> {ABOUT.quoteWords[2]}
            </h2>

            <div ref={containerRef} className="space-y-12">
              {ABOUT.paragraphs.map((paragraph, i) => (
                <div key={i} className="reveal-para grid grid-cols-12">
                  <div className="hidden lg:block col-span-1 text-teal/20 font-syne text-4xl">0{i + 1}</div>
                  <p className="col-span-12 lg:col-span-9 font-dm text-2xl md:text-3xl text-black/70 dark:text-white/60 leading-relaxed italic">
                    {paragraph}
                  </p>
                </div>
              ))}
            </div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="mt-20 inline-block"
            >
              <a 
                href="#cta" 
                className="group relative inline-flex items-center gap-4 text-black dark:text-white font-syne text-xl uppercase py-4"
              >
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-teal origin-left transition-transform scale-x-50 group-hover:scale-x-100" />
                {ABOUT.cta}
                <div className="w-12 h-12 rounded-full border border-teal flex items-center justify-center transition-colors group-hover:bg-teal group-hover:text-white">
                  →
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}
