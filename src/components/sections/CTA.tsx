import { FormEvent, useRef, useState } from 'react'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Grid from '@/components/ui/Grid'
import { CTA_SECTION } from '@/lib/content'
import { TextScramble } from '@/lib/textScramble'
import { prefersReduced, ScrollTrigger, useGSAP } from '@/lib/gsap'

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitted(true)
  }

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: '#cta',
        start: 'top 72%',
        once: true,
        onEnter: () => {
          const element = document.querySelector('.cta-scramble')
          if (!(element instanceof HTMLElement) || prefersReduced()) {
            return
          }

          const scramble = new TextScramble(element)
          void scramble.setText(CTA_SECTION.headline)
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section id="cta" ref={sectionRef} className="cta-shell bg-dark py-sec-sm md:py-sec" aria-labelledby="cta-title">
      <Container>
        <Grid>
          <div className="col-span-4 text-center md:col-start-2 md:col-span-6 lg:col-start-3 lg:col-span-8">
            <Eyebrow centered className="mb-4">
              {CTA_SECTION.eyebrow}
            </Eyebrow>

            <h2 id="cta-title" className="cta-scramble font-cormorant text-display-xl text-white">
              {CTA_SECTION.headline}
            </h2>

            <p className="mx-auto mt-5 max-w-cta-body font-dm text-body-lg text-muted">{CTA_SECTION.body}</p>

            <div className="mt-10 flex flex-wrap justify-center gap-3.5 max-sm:flex-col">
              <Button variant="primary" href={CTA_SECTION.emailBtn.href} className="max-sm:w-full max-sm:justify-center">
                {CTA_SECTION.emailBtn.label}
              </Button>
              <a
                href={CTA_SECTION.waBtn.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-btn border border-border-strong px-6 py-3 font-syne text-ui-btn font-medium text-cream transition duration-200 hover:border-whatsapp/40 hover:bg-whatsapp/10 hover:text-whatsapp max-sm:w-full max-sm:justify-center"
              >
                <span className="text-whatsapp">●</span>
                {CTA_SECTION.waBtn.label}
              </a>
            </div>

            <form className="mx-auto mt-10 max-w-copy-sm text-left sm:mt-11" onSubmit={onSubmit}>
              <div className="mb-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="form-field">
                  <label htmlFor="name">Your name</label>
                  <input id="name" name="name" type="text" placeholder="e.g. Marie Dupont" required />
                </div>
                <div className="form-field">
                  <label htmlFor="business">Business name</label>
                  <input id="business" name="business" type="text" placeholder="e.g. Anse Bleue Guesthouse" required />
                </div>
              </div>

              <div className="mb-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="form-field">
                  <label htmlFor="email">Email address</label>
                  <input id="email" name="email" type="email" placeholder="you@yourbusiness.sc" required />
                </div>
                <div className="form-field">
                  <label htmlFor="whatsapp">WhatsApp number</label>
                  <input id="whatsapp" name="whatsapp" type="tel" placeholder="+248 ..." required />
                </div>
              </div>

              <div className="form-field mb-3">
                <label htmlFor="businessType">Type of business</label>
                <select id="businessType" name="businessType" defaultValue="" required>
                  <option value="" disabled>
                    Select your business type
                  </option>
                  {CTA_SECTION.businessTypes.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field mb-3">
                <label htmlFor="package">Package interest</label>
                <select id="package" name="package" defaultValue="" required>
                  <option value="" disabled>
                    Which package are you considering?
                  </option>
                  {CTA_SECTION.packages.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field mb-3">
                <label htmlFor="budget">Project budget range</label>
                <select id="budget" name="budget" defaultValue="">
                  <option value="" disabled>
                    (Optional) Select a budget range
                  </option>
                  {/* @ts-ignore - budgets added to CTA_SECTION */}
                  {CTA_SECTION.budgets.map((item: string) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field mb-3">
                <label htmlFor="description">Tell us about your project</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Briefly describe your business, what your website needs to do, and any deadline you have in mind..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-btn bg-teal px-6 py-3 font-syne text-ui-btn font-bold text-black transition duration-200 hover:-translate-y-0.5 hover:opacity-90"
              >
                {isSubmitted ? 'Message sent ✓' : 'Send enquiry →'}
              </button>

              <p className="mt-2 text-center font-dm text-body-caption text-muted-2">{CTA_SECTION.formNote}</p>
            </form>
          </div>
        </Grid>
      </Container>
    </section>
  )
}
