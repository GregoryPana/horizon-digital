import SeoMeta from '@/components/SeoMeta'
import About from '@/components/sections/About'
import CTA from '@/components/sections/CTA'
import FAQ from '@/components/sections/FAQ'
import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import Pricing from '@/components/sections/Pricing'
import Process from '@/components/sections/Process'
import Services from '@/components/sections/Services'
import Work from '@/components/sections/Work'
import { HOME_SEO } from '@/lib/content'

export default function HomePage() {
  return (
    <>
      <SeoMeta title={HOME_SEO.title} description={HOME_SEO.description} path={HOME_SEO.path} keywords={HOME_SEO.keywords} />
      <main>
        <Hero />
        <Marquee />
        <Work />
        <Services />
        <About />
        <Process />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
    </>
  )
}
