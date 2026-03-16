import { motion } from 'framer-motion'
import CTA from '@/components/sections/CTA'
import FAQ from '@/components/sections/FAQ'
import Pricing from '@/components/sections/Pricing'
import Process from '@/components/sections/Process'
import Services from '@/components/sections/Services'
import SeoMeta from '@/components/SeoMeta'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import { KNOWLEDGE_PAGES } from '@/lib/content'

export default function ServicesPricingPage() {
  const page = KNOWLEDGE_PAGES.servicesPricing

  return (
    <>
      <SeoMeta title={page.seoTitle} description={page.seoDescription} path={page.seoPath} keywords={page.seoKeywords} />

      <main className="overflow-hidden">
        <section className="relative overflow-hidden border-b border-border bg-black pb-sec-sm pt-page-top-sm md:pb-sec md:pt-page-top">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(0,201,167,0.12),transparent_42%)]" />
          <Container>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-above max-w-content-lg">
              <Eyebrow className="mb-4">{page.eyebrow}</Eyebrow>
              <h1 className="font-display text-display-xl text-white">
                {page.title} <em>{page.titleEm}</em>
              </h1>
              <p className="mt-5 max-w-copy font-sans text-body-lg text-muted">{page.lead}</p>
            </motion.div>

            <div className="relative z-above mt-12 space-y-3">
              {page.blocks.map((block, index) => (
                <motion.article
                  key={block.heading}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className={`group relative overflow-hidden border border-border ${index % 2 === 0 ? 'bg-card' : 'bg-dark'}`}
                >
                  <div className={`pointer-events-none absolute inset-0 ${index % 2 === 0 ? 'bg-[radial-gradient(circle_at_12%_20%,rgba(0,201,167,0.13),transparent_36%)]' : 'bg-[radial-gradient(circle_at_90%_16%,rgba(255,255,255,0.08),transparent_34%)]'}`} />

                  <div className="relative grid grid-cols-1 lg:grid-cols-12">
                    <div className={`px-5 py-6 sm:px-6 lg:px-7 lg:py-7 ${index % 2 === 0 ? 'lg:col-span-8' : 'lg:col-start-5 lg:col-span-8'}`}>
                      <h2 className="font-display text-display-md text-white">{block.heading}</h2>
                      <div className="mt-3 space-y-2.5">
                        {block.paragraphs.map((paragraph) => (
                          <p key={paragraph} className="font-sans text-body-sm text-muted">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className={`hidden lg:flex ${index % 2 === 0 ? 'lg:col-span-4 items-end justify-end pr-7 pb-7' : 'lg:col-span-4 items-end justify-start pl-7 pb-7'}`}>
                      <span className="font-display text-num-md leading-none text-teal/15">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </Container>
        </section>

        <Services />
        <Pricing />
        <Process />
        <FAQ />
        <CTA />
      </main>
    </>
  )
}
