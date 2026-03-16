import { useRef } from 'react'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import { WORK, SECTION_CONTENT } from '@/lib/content'
import { gsap, useGSAP } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import { motion, useScroll, useTransform } from 'framer-motion'

function WorkCard({ item }: { item: typeof WORK[0] }) {
  const cardRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50])

  return (
    <article 
      ref={cardRef}
      className={cn('work-card group relative overflow-hidden bg-black border border-white/5', item.colSpan)}
    >
      <div className={cn('relative overflow-hidden', item.aspect)}>
        {/* Parallax Layer */}
        <motion.div 
          style={{ y, scale: 1.2 }}
          className="absolute inset-0 z-0 h-[120%]"
        >
          <img 
            src={item.image} 
            alt={item.imageAlt} 
            loading="lazy" 
            className="absolute inset-0 h-full w-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-700" 
          />
        </motion.div>

        {/* Overlay Textures */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
        <div className="absolute inset-0 z-10 texture-noise opacity-20 pointer-events-none" />

        <div className="relative z-20 flex h-full items-end p-10">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <span className="text-teal font-display text-[10px] uppercase tracking-[0.4em] mb-4 block">
              {item.type}
            </span>
            <h3 className="font-display text-display-cinematic text-white leading-none mb-2">
              {item.client}
            </h3>
            <p className="font-sans text-muted-2 text-lg max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              {item.description}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute top-6 right-6 z-30">
        <a
          href={item.url ?? '#cta'}
          target={item.url ? '_blank' : undefined}
          rel={item.url ? 'noopener noreferrer' : undefined}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-teal hover:border-teal transition-colors"
        >
          ↗
        </a>
      </div>
    </article>
  )
}

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('.work-card', {
        opacity: 0,
        y: 80,
        stagger: 0.15,
        ease: 'cinematic',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section id="work" ref={sectionRef} className="bg-black py-sec overflow-hidden" aria-labelledby="work-title">
      <Container>
        <div className="relative mb-24 flex flex-col items-center text-center">
          <Eyebrow className="mb-6">{SECTION_CONTENT.work.eyebrow}</Eyebrow>
          <h2 id="work-title" className="font-display text-display-hero text-white uppercase leading-[0.85]">
            {SECTION_CONTENT.work.titleStart} <span className="text-teal">{SECTION_CONTENT.work.titleEm}</span>
          </h2>
          <div className="mt-8 h-[1px] w-24 bg-teal" />
        </div>
      </Container>

      <Container className="!max-w-full px-4 lg:px-12">
        <div className="grid grid-cols-12 gap-8">
          {WORK.map((item) => (
            <WorkCard key={item.id} item={item} />
          ))}
        </div>
        
        <div className="mt-24 flex justify-center">
          <motion.a
            href="/work"
            whileHover={{ scale: 1.05 }}
            className="group px-12 py-5 rounded-full border border-teal text-teal font-display uppercase tracking-widest hover:bg-teal hover:text-black transition-colors"
          >
            Explore Portfolio
          </motion.a>
        </div>
      </Container>
    </section>
  )
}
