import { Helmet } from 'react-helmet-async'
import { SITE } from '@/lib/content'

type SeoMetaProps = {
  title: string
  description: string
  path: string
  keywords: string
}

export default function SeoMeta({ title, description, path, keywords }: SeoMetaProps) {
  const canonical = `${SITE.url}${path === '/' ? '' : path}`
  const fullTitle = `${title} | ${SITE.name}`
  const image = `${SITE.url}/og-image.jpg`

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE.name,
    description: 'Custom web design studio for Seychelles businesses',
    url: SITE.url,
    email: SITE.email,
    areaServed: 'Seychelles',
    serviceType: ['Web Design', 'Website Development', 'SEO'],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'SC',
      addressRegion: 'Mahe',
    },
    priceRange: 'SCR 7,500-25,000+',
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_SC" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
    </Helmet>
  )
}
