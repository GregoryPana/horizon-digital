import { useRef } from 'react'
import Container from '@/components/ui/Container'
import Grid from '@/components/ui/Grid'
import Button from '@/components/ui/Button'
import Eyebrow from '@/components/ui/Eyebrow'
import { HERO } from '@/lib/content'
import { gsap, prefersReduced, ScrollTrigger, useGSAP } from '@/lib/gsap'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) {
        return
      }

      const revealTargets = ['.h-eyebrow', '.h-h1', '.h-body', '.h-btns', '.h-stats']

      if (prefersReduced()) {
        gsap.set(revealTargets, { opacity: 1, y: 0 })
        sectionRef.current.querySelector('.h-h1 em')?.classList.add('underline-active')
        return
      }

      gsap.fromTo(
        '#hero-bg-img',
        { scale: 1.06 },
        { scale: 1, duration: 20, ease: 'power1.out', immediateRender: true },
      )

      gsap.set(revealTargets, { opacity: 0, y: 20, immediateRender: true })

      const timeline = gsap.timeline({ delay: 0.08 })

      timeline
        .fromTo('.h-eyebrow', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.78, ease: 'power2.out' })
        .fromTo('.h-h1', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' }, '-=0.5')
        .fromTo('.h-body', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' }, '-=0.42')
        .fromTo('.h-btns', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.68, ease: 'power2.out' }, '-=0.38')
        .fromTo('.h-stats', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' }, '-=0.32')
        .add(() => {
          sectionRef.current?.querySelector('.h-h1 em')?.classList.add('underline-active')
        }, '+=0.5')

      ScrollTrigger.create({
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (self.progress < 1) {
            gsap.set('#hero-bg-img', {
              y: self.progress * window.innerHeight * 0.25,
              overwrite: 'auto',
            })
          }
        },
      })

      gsap.to('.h-cont', {
        opacity: 0,
        y: -36,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: '55% top',
          end: 'bottom top',
          scrub: 0.4,
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section id="hero" ref={sectionRef} className="relative flex min-h-screen items-center overflow-hidden" aria-label="Hero section">
      <picture id="hero-bg-img" className="absolute inset-0">
        <source media="(max-width: 767px)" srcSet="/images/hero-mobile.png" />
        <img
          src="/images/hero-bg.jpg"
          alt="Laptop on terrace overlooking Seychelles granite boulders and Indian Ocean at blue hour"
          loading="eager"
          fetchPriority="high"
          width={2000}
          height={1116}
          className="h-img absolute inset-0 h-full w-full object-cover"
        />
      </picture>

      <div className="h-ov1 absolute inset-0 z-heroOv" />
      <div className="h-ov2 absolute inset-0 z-heroOv" />
      <div className="h-ov3 absolute inset-0 z-heroOv" />
      <div className="h-tel z-heroOv" />
      <div className="h-fade absolute bottom-0 left-0 right-0 z-hero" />

      <div className="h-scroll" aria-hidden="true">
        <span>Scroll</span>
        <div className="h-sbar" />
      </div>

      <div className="h-cont relative z-hero w-full pt-20 pb-12 md:pb-16">
        <Container>
          <Grid>
            <div className="h-spacer col-span-4 max-md:hidden" />
            <div className="h-text-col col-start-5 col-span-4 lg:col-span-8 max-md:[grid-column:1/-1] max-md:max-w-[430px]">
              <Eyebrow className="h-eyebrow mb-6">{HERO.eyebrow}</Eyebrow>

              <h1 className="h-h1 font-cormorant text-display-hero text-white max-md:text-[clamp(36px,12vw,56px)]">
                {HERO.h1Line1}
                <br />
                <em>{HERO.h1Em}</em>
              </h1>

              <p className="h-body mt-5 max-w-hero-body font-dm text-body-lg text-muted max-md:max-w-[92vw]">{HERO.body}</p>

              <div className="h-btns mt-8 flex flex-wrap gap-3.5">
                <Button variant="primary" href={HERO.cta1.href}>
                  {HERO.cta1.label}
                </Button>
                <Button variant="ghost" href={HERO.cta2.href} showArrow={false}>
                  {HERO.cta2.label}
                </Button>
              </div>

              <div className="h-stats mt-12 flex flex-wrap gap-10 border-t border-white/15 pt-6">
                {HERO.stats.map((item) => (
                  <div key={item.label}>
                    <p className="font-cormorant text-3xl font-light leading-none text-white">{item.number}</p>
                    <p className="mt-1 font-syne text-ui-label text-muted">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Grid>
        </Container>
      </div>
    </section>
  )
}
