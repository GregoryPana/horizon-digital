import { useRef } from 'react'
import Container from '@/components/ui/Container'
import Grid from '@/components/ui/Grid'
import { ABOUT } from '@/lib/content'
import { gsap, prefersReduced, useGSAP } from '@/lib/gsap'
import { revealSectionTitle } from '@/lib/animations'

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) {
        return
      }

      const title = section.querySelector('h2')
      if (title instanceof HTMLElement) {
        revealSectionTitle(title)
      }

      if (prefersReduced()) {
        gsap.set('.about-quote-mark, .about-body p', { opacity: 1, y: 0, scale: 1 })
        return
      }

      gsap.fromTo(
        '.about-quote-mark',
        { opacity: 0, scale: 0.55, transformOrigin: 'bottom left' },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'back.out(1.15)',
          scrollTrigger: {
            trigger: '#about',
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        },
      )

      gsap.fromTo(
        '.about-body p',
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.about-body',
            start: 'top 84%',
            toggleActions: 'play none none none',
          },
        },
      )
    },
    { scope: sectionRef },
  )

  return (
    <section id="about" ref={sectionRef} className="bg-black py-sec-sm md:py-about" aria-labelledby="about-title">
      <Container>
        <Grid className="items-center gap-y-8 lg:gap-y-10">
          <div className="col-span-12 lg:col-span-5">
            <span className="about-quote-mark mb-2 block font-cormorant text-quote text-teal/15">“</span>
            <h2 id="about-title" className="font-cormorant text-display-lg text-white">
              {ABOUT.quoteWords[0]}
              <br />
              {ABOUT.quoteWords[1]}
              <br />
              <em>{ABOUT.quoteWords[2]}</em>
            </h2>
          </div>

          <div className="col-span-12 lg:col-start-7 lg:col-span-6">
            <span className="mb-5 inline-block rounded-pill border border-border-strong px-3.5 py-1.5 font-syne text-ui-label text-muted">
              {ABOUT.tag}
            </span>

            <div className="about-body">
              {ABOUT.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mb-4 font-dm text-body-base text-muted last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>

            <a href="#cta" className="mt-5 inline-flex items-center gap-2 font-syne text-ui-nav text-teal transition-all duration-200 hover:gap-3.5">
              {ABOUT.cta} →
            </a>
          </div>
        </Grid>
      </Container>
    </section>
  )
}
