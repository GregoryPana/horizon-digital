import { useRef } from 'react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { HERO } from '@/lib/content'
import { gsap, prefersReduced, useGSAP } from '@/lib/gsap'
import { motion } from 'framer-motion'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      const revealTargets = ['.h-h1', '.h-body', '.h-btns']

      if (prefersReduced()) {
        gsap.set(revealTargets, { opacity: 1, y: 0 })
        return
      }

      // Cinematic Parallax
      gsap.to('#hero-bg-img', {
        scale: 1.25,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })


      // Kinetic Typography Reveal
      const tl = gsap.timeline({ delay: 0.1 })
      
      tl.fromTo('.h-h1', 
        { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', y: 100 },
        { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', y: 0, duration: 1.2, ease: 'cinematic' }
      )
      .fromTo('.h-body', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
      .fromTo('.h-btns', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6 }, '-=0.4')
    },
    { scope: sectionRef },
  )

  return (
    <section 
      id="hero" 
      ref={sectionRef} 
      className="relative flex min-h-screen items-center overflow-hidden texture-noise" 
      aria-label="Cinematic Hero"
    >
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden cinematic-bg">
        <picture id="hero-bg-img" className="absolute inset-0 block h-full w-full grayscale opacity-30">
          <source media="(max-width: 767px)" srcSet="/images/hero-mobile.png" />
          <img
            src="/images/hero-bg.jpg"
            alt="Horizon Digital Cinematic Background"
            className="h-full w-full object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-mesh-gradient opacity-60" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-[1200px] mx-auto text-center md:text-left">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 
              ref={headlineRef}
              className="h-h1 font-display text-display-cinematic text-white uppercase tracking-tight"
            >
              {HERO.h1Line1}
              <br />
              <span className="text-teal italic">{HERO.h1Em}</span>
            </h1>

            <p className="h-body mt-8 max-w-[800px] font-sans text-xl text-white/70 leading-relaxed md:text-2xl">
              {HERO.body}
            </p>

            <div className="h-btns mt-12 flex flex-wrap justify-center md:justify-start gap-6">
              <Button 
                variant="primary" 
                href={HERO.cta1.href}
                className="px-10 py-5 text-lg rounded-full"
              >
                {HERO.cta1.label}
              </Button>
              <Button 
                variant="ghost" 
                href={HERO.cta2.href}
                className="px-10 py-5 text-lg border-white/20 hover:bg-white/5 rounded-full"
              >
                {HERO.cta2.label}
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Parallax Depth Elements */}
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-teal/20 blur-[120px] rounded-full parallax-layer" data-speed="0.2" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-accent/10 blur-[150px] rounded-full parallax-layer" data-speed="0.5" />
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/30 uppercase tracking-[0.3em] text-[10px] pointer-events-none">
        <div className="w-[1px] h-16 bg-gradient-to-t from-teal to-transparent" />
        Scroll to Explore
      </div>
    </section>
  )
}
