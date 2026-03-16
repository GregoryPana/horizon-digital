import { motion, useReducedMotion } from 'framer-motion'
import CTA from '@/components/sections/CTA'
import SeoMeta from '@/components/SeoMeta'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import { KNOWLEDGE_PAGES, WORK } from '@/lib/content'
import { cn } from '@/lib/utils'

export default function WorkPage() {
  const shouldReduceMotion = useReducedMotion()
  const page = KNOWLEDGE_PAGES.work

  return (
    <>
      <SeoMeta title={page.seoTitle} description={page.seoDescription} path={page.seoPath} keywords={page.seoKeywords} />

      <main className="overflow-hidden">
        <section className="relative border-b border-border bg-black pb-[clamp(52px,8vw,96px)] pt-page-top-sm md:pt-page-top">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(0,201,167,0.14),transparent_36%)]" />
          <Container>
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative z-above max-w-content-lg"
            >
              <Eyebrow className="mb-4">{page.eyebrow}</Eyebrow>
              <h1 className="font-cormorant text-display-xl text-white">
                {page.title} <em>{page.titleEm}</em>
              </h1>
              <p className="mt-5 max-w-copy font-dm text-body-lg text-muted">{page.lead}</p>
            </motion.div>

            <div className="relative z-above mt-8 grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
              {WORK.slice(0, 4).map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.12 + index * 0.07, ease: 'easeOut' }}
                  className="border border-border bg-card px-4 py-4"
                >
                  <p className="font-syne text-ui-label uppercase text-muted-2">Project {String(index + 1).padStart(2, '0')}</p>
                  <p className="mt-1 font-cormorant text-title-sm text-white">{item.client}</p>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-dark py-sec-sm md:py-sec">
          <Container>
            <div className="space-y-3">
              {WORK.map((item, index) => {
                const isEven = index % 2 === 0

                return (
                  <motion.article
                    key={item.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
                    whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.62, ease: 'easeOut' }}
                    className="relative overflow-hidden border border-border bg-card"
                  >
                    <div className={cn('absolute inset-0', isEven ? 'bg-[radial-gradient(circle_at_85%_14%,rgba(0,201,167,0.16),transparent_40%)]' : 'bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.06),transparent_36%)]')} />

                    <div className="relative grid grid-cols-1 lg:grid-cols-12">
                      <div className={cn('relative min-h-[260px] overflow-hidden sm:min-h-[300px] lg:min-h-[320px]', isEven ? 'lg:col-span-7' : 'order-2 lg:order-1 lg:col-start-6 lg:col-span-7')}>
                        <img src={item.image} alt={item.imageAlt} loading="lazy" className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                      </div>

                      <div className={cn('relative flex flex-col justify-between p-5 sm:p-6 lg:p-8', isEven ? 'lg:col-span-5' : 'order-1 lg:order-2 lg:col-span-5')}>
                        <div>
                          <p className="font-syne text-ui-label uppercase text-teal/80">{item.type}</p>
                          <h2 className="mt-2 font-cormorant text-display-md text-white">{item.client}</h2>
                          <p className="mt-2 font-dm text-body-base text-muted">{item.description}</p>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3">
                          {item.url ? (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center rounded-btn border border-border-strong px-5 py-2.5 font-syne text-ui-btn text-cream transition duration-200 hover:border-teal-border hover:bg-teal/10"
                            >
                              Visit live site
                            </a>
                          ) : (
                            <Button variant="ghost" href="/contact" showArrow={false}>
                              Request a similar layout
                            </Button>
                          )}

                          <Button variant="primary" href="/contact">
                            Start your project
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </div>
          </Container>
        </section>

        <CTA />
      </main>
    </>
  )
}
