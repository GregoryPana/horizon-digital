import { useRef } from 'react'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import { ADDONS, ADDONS_NOTE, PRICING, SECTION_CONTENT } from '@/lib/content'
import { revealSectionTitle } from '@/lib/animations'
import { gsap, prefersReduced, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { cn } from '@/lib/utils'

export default function Pricing() {
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
        gsap.set('.price-card', { opacity: 1, y: 0, scale: 1 })
        return
      }

      PRICING.forEach((item) => {
        const selector = `.price-${item.name.toLowerCase()} .price-val`
        const element = section.querySelector(selector)
        if (!element) {
          return
        }

        ScrollTrigger.create({
          trigger: element,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            const value = { current: 0 }
            gsap.to(value, {
              current: item.price,
              duration: 1.4,
              ease: 'power2.out',
              onUpdate: () => {
                element.textContent = Math.round(value.current).toLocaleString()
              },
            })
          },
        })
      })

      gsap.fromTo(
        '.price-card-featured',
        { opacity: 0, y: 32, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.82,
          ease: 'back.out(1.1)',
          scrollTrigger: {
            trigger: '.pricing-grid',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      )

      gsap.fromTo(
        '.price-card-standard',
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power2.out',
          stagger: 0.14,
          scrollTrigger: {
            trigger: '.pricing-grid',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      )
    },
    { scope: sectionRef },
  )

  return (
    <section id="pricing" ref={sectionRef} className="bg-black py-sec-sm md:py-sec" aria-labelledby="pricing-title">
      <Container>
        <div className="mb-header-gap">
          <Eyebrow className="mb-3">{SECTION_CONTENT.pricing.eyebrow}</Eyebrow>
          <h2 id="pricing-title" className="font-cormorant text-display-lg text-white">
            {SECTION_CONTENT.pricing.titleStart} <em>{SECTION_CONTENT.pricing.titleEm}</em>
          </h2>
        </div>

        <div className="pricing-grid grid grid-cols-1 gap-card-gap bg-border lg:grid-cols-3">
          {PRICING.map((item) => (
            <article
              key={item.name}
              className={cn(
                'price-card px-5 pb-7 pt-card-pad sm:px-6 sm:pb-8 lg:px-8 lg:pb-10',
                item.isFeatured
                  ? `price-card-featured price-${item.name.toLowerCase()} border-t-2 border-teal bg-card`
                  : `price-card-standard price-${item.name.toLowerCase()} bg-dark`,
              )}
            >
              {item.isFeatured ? <Badge variant="featured" className="mb-5">Most popular</Badge> : null}

              <h3 className="font-cormorant text-display-md text-white">{item.name}</h3>
              <p className="mt-1 font-dm text-body-xs text-muted">{item.tagline}</p>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-syne text-body-base text-muted">SCR</span>
                <span className="price-val font-cormorant text-display-xl leading-none text-teal">{item.priceFormatted}</span>
              </div>
              <p className="mt-1 font-syne text-ui-label uppercase text-muted-2">Starting price</p>

              <div className="my-5 h-px bg-border" />

              <ul className="mb-6 space-y-2">
                {item.features.map((feature) => (
                  <li key={feature} className="flex gap-2 font-dm text-body-xs text-muted">
                    <span className="font-syne text-ui-badge text-teal">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
                {item.exclusions?.map((exclusion) => (
                  <li key={exclusion} className="flex gap-2 font-dm text-body-xs text-muted/50">
                    <span className="font-syne text-ui-badge text-muted-2">✕</span>
                    <span className="italic">{exclusion}</span>
                  </li>
                ))}
              </ul>

              <Button variant={item.isFeatured ? 'primary' : 'ghost'} href="#cta" className="w-full justify-center">
                {item.isFeatured ? 'Start this package' : 'Get started'}
              </Button>

              <p className="mt-3 text-center font-dm text-body-caption text-muted-2">{item.paymentTerms}</p>
            </article>
          ))}
        </div>

        <div className="mt-20 border border-border px-5 py-8 sm:px-8 lg:mt-24 lg:px-12 lg:py-12">
          <div className="mb-10 lg:flex lg:items-end lg:justify-between lg:border-b lg:border-border lg:pb-8">
            <div className="max-w-xl">
              <Eyebrow className="mb-3">Optional Services</Eyebrow>
              <h3 className="font-cormorant text-display-md text-white">Managed Hosting & Add-ons</h3>
              <p className="mt-2 font-dm text-body-sm text-muted">Additional features and professional services to support your website over the long term.</p>
            </div>
            <div className="mt-6 lg:mt-0">
              <span className="font-cormorant text-num-md text-teal/20">01—06</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
            {ADDONS.map((addon) => (
              <div key={addon.name} className="group relative border-b border-border-strong/40 pb-4 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <p className="font-syne text-ui-label uppercase tracking-wider text-cream group-hover:text-teal transition-colors duration-200">{addon.name}</p>
                </div>
                <p className="mt-1 font-cormorant text-title-sm text-teal">{addon.price}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-10 bg-card/50 p-5 lg:mt-12 lg:p-7">
            <div className="flex gap-4">
              <span className="shrink-0 font-syne text-teal text-ui-badge">Note</span>
              <p className="font-dm text-body-caption leading-relaxed text-muted">{ADDONS_NOTE}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
