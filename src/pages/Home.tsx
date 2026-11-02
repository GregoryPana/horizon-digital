import Seo from '../components/Seo';
import EditorialHome from '../components/editorial-home/EditorialHome';
import { editorialHomeFaq } from '../components/editorial-home/content';
import { siteConfig } from '../data/site';

type HomeProps = { seoPath?: string; seoTitle?: string; seoDescription?: string };

export default function Home({
  seoPath = '/',
  seoTitle = 'Custom Website Design Seychelles | Horizon Digital',
  seoDescription = 'Custom-built websites for Seychelles businesses, with responsive design, clear contact paths and technical SEO foundations.',
}: HomeProps = {}) {
  return <>
    <Seo title={seoTitle} description={seoDescription} path={seoPath}
      structuredData={[
        {
          '@context': 'https://schema.org', '@type': 'FAQPage',
          mainEntity: editorialHomeFaq.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
          mainEntityOfPage: new URL(seoPath, siteConfig.url).toString(),
        },
        {
          '@context': 'https://schema.org', '@type': 'Service', serviceType: 'Custom Web Development',
          provider: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url, email: siteConfig.email, telephone: siteConfig.phone },
          description: 'Custom web design and development for Seychelles businesses, with responsive layouts and technical SEO foundations.',
          areaServed: { '@type': 'Country', name: 'Seychelles' },
          hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Web Design Packages', itemListElement: ['Foundation', 'Starter', 'Growth'].map(name => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: `${name} Package` } })) },
        },
      ]}
    />
    <EditorialHome />
  </>;
}
