import beautyDemoImage from '@/assets/work/demo-beauty/demo-beauty.webp'
import cafeDemoImage from '@/assets/work/demos/cafe.webp'
import consultingDemoImage from '@/assets/work/demos/consulting.webp'
import drakeSeasideImage from '@/assets/work/drake-seaside/drake-seaside.webp'
import drakeSeasideAltImage from '@/assets/work/drake-seaside/drake-seaside-600.webp'

export type Stat = {
  number: string
  label: string
}

export type MarqueeItem = {
  type: string
  name: string
}

export type WorkItem = {
  id: string
  title: string
  client: string
  type: string
  description: string
  image: string
  imageAlt: string
  url?: string
  isDemo: boolean
  colSpan: string
  aspect: string
}

export type ServiceItem = {
  number: string
  name: string
  price: string
  description: string
  features: string[]
}

export type ProcessItem = {
  number: string
  title: string
  timeline: string
  description: string
}

export type PricingItem = {
  name: string
  tagline: string
  price: number
  priceFormatted: string
  isFeatured: boolean
  paymentTerms: string
  features: string[]
  exclusions?: string[]
}

export type AddonItem = {
  name: string
  price: string
}

export type FaqItem = {
  q: string
  a: string
}

export type SiteNavItem = {
  label: string
  href: string
}

export type KnowledgeBlock = {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

export type KnowledgePage = {
  eyebrow: string
  title: string
  titleEm: string
  lead: string
  blocks: KnowledgeBlock[]
  seoTitle: string
  seoDescription: string
  seoPath: string
  seoKeywords: string
  columns?: 1 | 2
}

export const SITE = {
  name: 'Horizon Digital',
  url: 'https://horizondigitalsey.com',
  email: 'horizondigital.sey@gmail.com',
  phone: '+248 260 4525',
  whatsappUrl: 'https://wa.me/2482604525',
}

export const NAV_LINKS: SiteNavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services & Pricing', href: '/services-pricing' },
  { label: 'Our Work', href: '/work' },
  { label: 'What You Need', href: '/what-you-need' },
  { label: 'Digital Insights', href: '/ai-digital-tools' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const MOBILE_NAV_LINKS: SiteNavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services & Pricing', href: '/services-pricing' },
  { label: 'Our Work', href: '/work' },
  { label: 'What You Need', href: '/what-you-need' },
  { label: 'Digital Insights', href: '/ai-digital-tools' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const HOME_SEO = {
  title: 'Website Design Seychelles - Fast Business Websites',
  description:
    'Custom websites for Seychelles businesses. Clear design, fast performance, and structured packages. Start your website project with Horizon Digital.',
  path: '/',
  keywords:
    'website design Seychelles, business websites Seychelles, web design packages Seychelles, custom website seychelles, seychelles website design',
}

export const SECTION_CONTENT = {
  work: {
    eyebrow: 'Selected Work',
    titleStart: "Sites we've built.",
    titleEm: "Results they've seen.",
  },
  services: {
    eyebrow: 'What We Build',
    titleStart: 'Four packages.',
    titleEm: 'One standard of quality.',
  },
  process: {
    eyebrow: 'How It Works',
    titleStart: 'From first message to',
    titleEm: 'live in 8 weeks.',
  },
  pricing: {
    eyebrow: 'Transparent Pricing',
    titleStart: 'No surprises.',
    titleEm: 'No hidden fees.',
  },
  faq: {
    eyebrow: 'Common Questions',
    titleStart: 'Everything you need to',
    titleEm: 'know.',
  },
} as const

export const HERO = {
  eyebrow: 'Web Design Studio - Seychelles',
  h1Line1: 'Websites that turn visitors into',
  h1Em: 'clients.',
  body: 'We design and build custom websites for Seychelles businesses - guesthouses, restaurants, shops, and service firms. Every site is built to drive enquiries, not just look good.',
  cta1: { label: 'Start a project', href: '/contact' },
  cta2: { label: 'See our work', href: '/work' },
  stats: [
    { number: '4-8', label: 'Weeks to launch' },
    { number: '100%', label: 'Mobile-first builds' },
    { number: 'SCR 0', label: 'Hidden fees' },
    { number: '30-60', label: 'Days post-launch support' },
  ] satisfies Stat[],
}

export const MARQUEE: MarqueeItem[] = [
  { type: 'Guesthouse', name: 'The Drake Seaside' },
  { type: 'Restaurant', name: 'Concept Demo' },
  { type: 'Cafe', name: 'Concept Demo' },
  { type: 'Consulting', name: 'Concept Demo' },
  { type: 'Tour Operator', name: 'Seychelles' },
  { type: 'Retail', name: 'Seychelles' },
]

export const WORK: WorkItem[] = [
  {
    id: 'drake',
    title: 'The Drake Seaside',
    client: 'The Drake Seaside Apartments',
    type: 'Guesthouse - Full Redesign',
    description: 'Redesign with new pages, updated content, faster load times, and higher click-through conversions.',
    image: drakeSeasideImage,
    imageAlt: 'The Drake Seaside website homepage preview',
    url: 'https://thedrake-seaside.com/',
    isDemo: false,
    colSpan: 'col-span-12',
    aspect: 'aspect-[21/9]',
  },
  {
    id: 'restaurant',
    title: 'Restaurant Concept',
    client: 'Restaurant Demo',
    type: 'F&B - Concept Preview',
    description: 'Menu-first layout with clear contact buttons.',
    image: beautyDemoImage,
    imageAlt: 'Restaurant concept website preview image',
    isDemo: true,
    colSpan: 'col-span-12 lg:col-span-6',
    aspect: 'aspect-video',
  },
  {
    id: 'cafe',
    title: 'Cafe Concept',
    client: 'Cafe Demo',
    type: 'F&B - Concept Preview',
    description: 'Mobile-first story with location details.',
    image: cafeDemoImage,
    imageAlt: 'Cafe concept website preview image',
    isDemo: true,
    colSpan: 'col-span-12 lg:col-span-6',
    aspect: 'aspect-video',
  },
  {
    id: 'consulting',
    title: 'Consulting Concept',
    client: 'Consulting Demo',
    type: 'Professional Services - Concept',
    description: 'Clear contact flow for new enquiries.',
    image: consultingDemoImage,
    imageAlt: 'Consulting concept website preview image',
    isDemo: true,
    colSpan: 'col-span-12 lg:col-span-7',
    aspect: 'aspect-video',
  },
  {
    id: 'tour',
    title: 'Tour Operator',
    client: 'Tour Operator Demo',
    type: 'Tourism - Concept Preview',
    description: 'Booking-first layout with activity focus.',
    image: drakeSeasideAltImage,
    imageAlt: 'Tour operator concept website preview image',
    isDemo: true,
    colSpan: 'col-span-12 lg:col-span-5',
    aspect: 'aspect-video',
  },
]

export const SERVICES: ServiceItem[] = [
  {
    number: '01',
    name: 'Foundation',
    price: 'From SCR 7,500',
    description:
      'For businesses that need a clean, professional online presence quickly. Pre-built Horizon Digital layout customised to your brand - not a generic template.',
    features: [
      'Up to 3 pages',
      'Mobile-friendly layout',
      'Contact form + Google Maps',
      'WhatsApp integration',
      'Search-ready setup (SEO foundations)',
      '30 days post-launch support',
    ],
  },
  {
    number: '02',
    name: 'Starter',
    price: 'From SCR 12,500',
    description:
      'A fully custom website designed around your specific business, customers, and goals. Not a template - every layout is planned and designed from scratch.',
    features: [
      'Up to 5 custom-designed pages',
      'Mobile-first custom layout',
      'WhatsApp + social media integration',
      'Google Analytics setup',
      'Two revision rounds',
      '45 days post-launch support',
    ],
  },
  {
    number: '03',
    name: 'Growth',
    price: 'From SCR 25,000',
    description:
      'For established businesses needing deeper structure, stronger search visibility, and features that convert serious traffic.',
    features: [
      'Up to 12 pages',
      'Portfolio or gallery sections',
      'Multi-step enquiry forms',
      'Google Business Profile setup',
      'Three revision rounds',
      '60 days post-launch support',
    ],
  },
  {
    number: '04',
    name: 'Custom Build',
    price: 'Scoped per project',
    description:
      'Advanced requirements scoped and priced individually. Booking systems, multi-language, complex integrations - built to exact specification.',
    features: [
      'Bespoke scope and timeline',
      'Direct builder access throughout',
      'Full technical specification',
      'Priority post-launch support',
    ],
  },
]

export const REDESIGN_CTA = {
  eyebrow: 'Already have a website?',
  headline: 'We offer design refresh and full redesign services.',
  body: 'Horizon Digital can modernise your existing site with a mobile-friendly layout, faster load times, and clearer customer paths - without losing your brand identity.',
  cta: 'Discuss a redesign',
}

export const ABOUT = {
  quoteWords: ['A studio', 'built on', 'clarity.'],
  tag: 'Direct. Honest. Focused.',
  paragraphs: [
    'Horizon Digital is a focused studio that partners directly with local businesses. Every site is designed to attract visitors and turn them into enquiries or bookings - not just look modern.',
    "You work directly with the builder, not a rotating team of account managers. The approach is clear and transparent, designed to support you over time - not to lock you into complex retainers you don't need.",
    'After seeing businesses across Seychelles struggle with unclear websites and overcomplicated processes, Horizon Digital was built to offer something simpler: direct communication, practical solutions, and websites built for measurable growth.',
  ],
  cta: 'Start a conversation',
}

export const PROCESS: ProcessItem[] = [
  {
    number: '01',
    title: 'Discovery & Scope',
    timeline: 'Day 1-7',
    description:
      'Reach out via the contact form or WhatsApp. We discuss your goals, target audience, and what the website needs to achieve. Horizon Digital recommends the right package and defines a clear project scope - no jargon, no pressure.',
  },
  {
    number: '02',
    title: 'Content Gathering',
    timeline: 'Week 1-2',
    description:
      'Before building begins, the client provides logo, brand guidelines, and contact details - plus written text and high-quality photos for each page. Gathering this early keeps the project moving and the launch clean.',
  },
  {
    number: '03',
    title: 'Design Phase',
    timeline: 'Week 2-4',
    description:
      'For Starter and Growth packages, full visual layouts are created before a single line of code is written. You review designs through structured revision rounds until the result looks exactly right.',
  },
  {
    number: '04',
    title: 'Build & Test',
    timeline: 'Week 4-7',
    description:
      'Approved designs become fast, mobile-optimised code. Tested across devices and browsers to ensure every contact form, WhatsApp button, and page load performs flawlessly before going live.',
  },
  {
    number: '05',
    title: 'Launch & Support',
    timeline: 'Week 7-8 + post-launch',
    description:
      'The site goes live. Domain connected, settings verified, and Horizon Digital stays on hand for 30 to 60 days post-launch to resolve any issues. Your investment is protected from day one.',
  },
]

export const PRICING: PricingItem[] = [
  {
    name: 'Foundation',
    tagline: 'Simple professional presence',
    price: 7500,
    priceFormatted: '7,500',
    isFeatured: false,
    paymentTerms: '50% deposit - 50% on launch',
    features: [
      'Up to 3 pages',
      'Pre-built layout (customised)',
      'Mobile-friendly design',
      'Contact form + Google Maps',
      'WhatsApp integration',
      'Search-ready setup',
      '30 days post-launch support',
    ],
    exclusions: ['Layout structure cannot be modified', 'Design customisation is limited to colours, logo, and content'],
  },
  {
    name: 'Starter',
    tagline: 'Fully custom website',
    price: 12500,
    priceFormatted: '12,500',
    isFeatured: true,
    paymentTerms: '50% deposit - 50% on launch',
    features: [
      'Up to 5 custom-designed pages',
      'Mobile-first custom layout',
      'WhatsApp + social media integration',
      'Google Analytics setup',
      'Two revision rounds',
      'Search-ready setup',
      '45 days post-launch support',
    ],
    exclusions: ['Hosting fees', 'Ongoing updates beyond support period', 'Advanced integrations'],
  },
  {
    name: 'Growth',
    tagline: 'Deep structure + visibility',
    price: 25000,
    priceFormatted: '25,000',
    isFeatured: false,
    paymentTerms: '40% deposit - 40% design approval - 20% launch',
    features: [
      'Up to 12 pages',
      'Portfolio or gallery sections',
      'Multi-step enquiry forms',
      'Google Business Profile setup',
      'Three revision rounds',
      'Expanded search-ready setup',
      '60 days post-launch support',
    ],
    exclusions: ['Hosting fees', 'Ongoing feature development', 'Complex system integrations'],
  },
]

export const ADDONS: AddonItem[] = [
  { name: 'Managed Hosting (annual)', price: 'SCR 2,500 / yr' },
  { name: 'Additional page', price: 'SCR 2,500' },
  { name: 'Content writing (per page)', price: 'SCR 600' },
  { name: 'Booking or enquiry form', price: 'SCR 2,000' },
  { name: 'Google Business Profile setup', price: 'SCR 2,200' },
  { name: 'Rush delivery (subject to availability)', price: '+40% fee' },
]

export const ADDONS_NOTE =
  'Managed Hosting includes SSL certificate, site monitoring, monthly analytics report, and regular backups. Domain registration is separate and owned by you. For advanced builds, hosting charges may differ.'

export const FAQ: FaqItem[] = [
  {
    q: 'How much does a website cost?',
    a: 'Foundation starts at SCR 7,500, Starter at SCR 12,500, and Growth at SCR 25,000. The final cost depends on the number of pages, custom features, and any add-ons chosen. Custom builds are scoped individually.',
  },
  {
    q: 'How long does the build take?',
    a: 'Most projects take 4 to 8 weeks from start to public launch. The Foundation package is usually fastest. Timelines depend heavily on how quickly you provide content, photos, and feedback during review stages.',
  },
  {
    q: 'Do you provide website hosting?',
    a: "Yes. Managed Hosting costs SCR 2,500 per year and includes SSL security, site monitoring, monthly analytics, and backups. You can also choose to host elsewhere - we'll help set it up either way.",
  },
  {
    q: 'Can you redesign my existing website?',
    a: 'Yes. Horizon Digital offers design refresh and full redesign services. We modernise your existing site with a mobile-friendly layout, faster load speeds, and clearer paths to contact - while keeping your core messaging intact.',
  },
  {
    q: 'What do I need to provide to start?',
    a: "You'll need to provide your logo, brand colours, contact details, written text for each page, and high-quality photos. If you don't have written content, we offer content writing support at SCR 600 per page.",
  },
  {
    q: 'How do payments work?',
    a: 'Foundation and Starter packages require a 50% deposit upfront and 50% on launch. The Growth package is split into 40% deposit, 40% at design approval, and 20% on launch. No surprise invoices at any stage.',
  },
  {
    q: 'Will my website work on mobile?',
    a: 'Yes - every Horizon Digital website is built mobile-first. Layouts are engineered to load quickly and display correctly across all screen sizes, from smartphones to large desktop monitors.',
  },
  {
    q: 'Can I use my existing domain name?',
    a: "Yes. We can build the website and connect it to your existing domain. It's best practice for you to own your domain directly - we'll guide you through linking it to the new hosting once the site is ready.",
  },
  {
    q: 'Can I edit the website myself after launch?',
    a: "Horizon Digital builds custom-coded websites rather than CMS platforms like WordPress. This keeps sites fast and secure, but means direct content editing isn't available out-of-the-box. We handle all future updates.",
  },
  {
    q: 'What if something breaks after launch?',
    a: 'All packages include 30 to 60 days of post-launch support. Clients on Managed Hosting benefit from ongoing monitoring and a stabilised server environment that rarely encounters problems.',
  },
]

export const CTA_SECTION = {
  eyebrow: 'Ready when you are',
  headline: 'Ready to get more enquiries?',
  body: "Tell us about your business - we'll recommend the right package and reply within one to two business days.",
  emailBtn: { label: 'Send an email', href: 'mailto:horizondigital.sey@gmail.com' },
  waBtn: { label: 'Chat on WhatsApp', href: 'https://wa.me/2482604525' },
  formNote: 'We reply within 1-2 business days. No aggressive follow-ups.',
  businessTypes: [
    'Guesthouse / Hotel',
    'Restaurant / Cafe / Bar',
    'Tour Operator / Activity Provider',
    'Retail Shop',
    'Professional Services / Consulting',
    'Other',
  ],
  packages: [
    'Foundation - from SCR 7,500',
    'Starter - from SCR 12,500',
    'Growth - from SCR 25,000',
    "Custom Build - let's discuss",
    'Website Redesign',
    'Not sure yet',
  ],
  budgets: [
    'SCR 7,500 - 12,500',
    'SCR 12,500 - 25,000',
    'SCR 25,000 - 50,000',
    'SCR 50,000+',
    'Specific budget in mind',
    'Not sure yet - need advice',
  ],
}

export const FOOTER = {
  tagline: 'Custom web design for Seychelles businesses. Built to get you more enquiries.',
  quote: '"A studio built on clarity."',
  copyright: '© 2025 Horizon Digital. Mahe, Seychelles.',
  email: 'horizondigital.sey@gmail.com',
  phone: '+248 260 4525',
  wa: 'https://wa.me/2482604525',
  site: 'https://horizondigitalsey.com',
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Services & Pricing', href: '/services-pricing' },
    { label: 'Our Work', href: '/work' },
    { label: 'What You Need', href: '/what-you-need' },
    { label: 'Digital Insights', href: '/ai-digital-tools' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
}

export const KNOWLEDGE_PAGES: Record<
  'about' | 'services' | 'work' | 'pricing' | 'process' | 'faq' | 'hosting' | 'contact' | 'whatYouNeed' | 'digitalInsights' | 'servicesPricing',
  KnowledgePage
> = {
  about: {
    eyebrow: 'About Horizon Digital',
    title: 'A studio built on',
    titleEm: 'clarity.',
    lead: 'Horizon Digital is a focused studio that partners directly with local businesses in Seychelles and builds websites designed to generate enquiries and bookings.',
    seoTitle: 'About Horizon Digital - Seychelles Website Studio',
    seoDescription:
      'Learn how Horizon Digital delivers custom website design in Seychelles through direct communication, practical strategy, and measurable growth outcomes.',
    seoPath: '/about',
    seoKeywords: 'about horizon digital, custom website seychelles, seychelles website design studio',
    blocks: [
      {
        heading: 'A studio built on clarity',
        paragraphs: [
          'Horizon Digital is a focused studio that partners directly with local businesses. Every site is designed to attract visitors and turn them into enquiries or bookings - not just look modern.',
        ],
      },
      {
        heading: 'Built with intention',
        paragraphs: [
          'Many businesses struggle with websites that are slow, unclear, or difficult to update. Horizon Digital focuses on fixing those friction points with clearer structure, logical design, and engineering focused on performance and WCAG accessibility standards.',
        ],
      },
      {
        heading: 'Customer-journey focus',
        paragraphs: [
          'Pages are planned to guide visitors from first impression to enquiry. The goal is a website that helps people understand your services and act confidently.',
        ],
        bullets: [
          'Clarity-first messaging and layout',
          'Structured navigation flow for higher conversion',
          'Core Web Vitals and Performance-aware architectures',
        ],
      },
      {
        heading: 'Reliable partnership',
        paragraphs: [
          'You work directly with the builder, not a rotating team. The approach is clear, transparent, and designed to support you over time.',
        ],
      },
      {
        heading: 'Why Horizon Digital exists',
        paragraphs: [
          'After seeing businesses struggle with unclear websites and complex agency processes, Horizon Digital was built to offer something simpler - direct communication, practical solutions, and websites designed for measurable growth.',
        ],
      },
      {
        heading: 'Collaborative approach',
        paragraphs: [
          'Consultation, design, development, launch - with practical communication at each step. We make the technical details simple.',
        ],
        bullets: [
          '01 Consult & Scope - Defining measurable outcomes',
          '02 Design & UX - Visual direction and conversion flow',
          '03 Develop & Test - Production engineering and QA',
          '04 Launch & Optimise - Public deployment and refinements',
        ],
      },
    ],
    columns: 1,
  },
  services: {
    eyebrow: 'Services',
    title: 'Custom websites for',
    titleEm: 'Seychelles.',
    lead: 'Horizon Digital designs and builds conversion-focused websites for small businesses across Seychelles, with clear structure, mobile-first layouts, and practical contact pathways.',
    seoTitle: 'Services - Custom Website Design Seychelles',
    seoDescription:
      'Explore Horizon Digital services for custom Seychelles website design, redesign, SEO foundations, WhatsApp integration, and conversion-ready business websites.',
    seoPath: '/services',
    seoKeywords: 'custom website design seychelles, seychelles website services, custom seychelles website',
    blocks: [
      {
        heading: 'Horizon Digital target audience',
        paragraphs: [
          'Horizon Digital designs and builds websites specifically for small businesses in Seychelles. Typical clients include guesthouses, restaurants, retail shops, tour operators, and professional service firms.',
          'The main goal of every Horizon Digital website is to help these businesses receive more enquiries, bookings, and customer messages.',
        ],
      },
      {
        heading: 'Core website design services',
        paragraphs: [
          'Horizon Digital specializes in custom website design and development from start to finish. This includes structured planning, writing the underlying code, and a clean public launch.',
          'Websites are built using modern practices to ensure fast load times and logical paths that guide visitors toward contacting the business.',
          'All websites are fully mobile-friendly and optimized for smartphones and tablets.',
        ],
      },
      {
        heading: 'Website redesign and refresh',
        paragraphs: [
          'If a business already has a website, Horizon Digital offers design refresh services. This modernizes the look and feel while preserving existing content and branding that already works.',
          'A redesign improves the user experience and makes it easier for customers to navigate and contact the business.',
        ],
      },
      {
        heading: 'Search-ready setup',
        paragraphs: [
          'Every website includes basic search-ready setup (SEO foundations), including clean semantic page structures and clear heading hierarchy.',
          'This helps search engines understand what the business offers and improves local discoverability.',
        ],
      },
      {
        heading: 'Included website features',
        paragraphs: [
          'Horizon Digital websites include practical lead-capture tools and contact pathways.',
        ],
        bullets: [
          'Contact forms and enquiry forms for secure lead capture',
          'Direct WhatsApp integration for instant conversation',
          'Google Maps embed for physical location visibility',
        ],
      },
      {
        heading: 'What is a custom website?',
        paragraphs: [
          'Starter and Growth packages include fully custom websites, planned around the business model, customer flow, and conversion goals - not copied from generic templates.',
          'The Foundation package is the exception, using a structured Horizon Digital layout to keep entry pricing lower.',
        ],
      },
    ],
  },
  work: {
    eyebrow: 'Our Work',
    title: 'Proven projects and concept',
    titleEm: 'direction.',
    lead: 'A focused selection of build outcomes and concept structures showing how Horizon Digital designs for conversion clarity.',
    seoTitle: 'Work - Seychelles Website Design Portfolio',
    seoDescription:
      'See Horizon Digital custom website work in Seychelles, including guesthouse redesign outcomes and concept demos for service-focused businesses.',
    seoPath: '/work',
    seoKeywords: 'website portfolio seychelles, custom website seychelles, seychelles web design work',
    blocks: [
      {
        heading: 'Drake Seaside Apartments (Guesthouse)',
        paragraphs: [
          'Redesign with new pages, updated content, faster load times, and higher click-through conversions.',
          'Live site: https://thedrake-seaside.com/',
        ],
      },
      {
        heading: 'Concept demos',
        paragraphs: [
          'These are layout previews that show section order, button placement, and structure. Each live project is built around your content and goals.',
        ],
        bullets: [
          'Restaurant concept demo: Menu-first layout with clear contact buttons',
          'Cafe concept demo: Mobile-first story with location details',
          'Consulting concept demo: Clear contact flow for new enquiries',
        ],
      },
    ],
    columns: 1,
  },
  pricing: {
    eyebrow: 'Pricing',
    title: 'Structured packages with clear',
    titleEm: 'milestones.',
    lead: 'Transparent package baselines with defined scope, payment terms, hosting options, and optional add-ons for additional features.',
    seoTitle: 'Pricing - Custom Seychelles Website Packages',
    seoDescription:
      'Compare Horizon Digital pricing for custom Seychelles website design, including Foundation, Starter, Growth, hosting, payment terms, and add-ons.',
    seoPath: '/pricing',
    seoKeywords: 'website pricing seychelles, custom website package seychelles, seychelles website design cost',
    blocks: [
      {
        heading: 'Package baselines',
        paragraphs: [
          'Horizon Digital offers three main website packages to suit different business needs.',
        ],
        bullets: [
          'Foundation starts at SCR 7,500',
          'Starter starts at SCR 12,500',
          'Growth starts at SCR 25,000',
          'Custom builds are scoped per project for advanced requirements',
        ],
      },
      {
        heading: 'Foundation package',
        paragraphs: [
          'The Foundation package is the most affordable option and is designed for businesses needing a simple, professional presence with a predefined Horizon Digital layout.',
          'It includes up to 3 pages, mobile-friendly layout, contact form, and Google Maps integration. Design customization is limited to brand colors, logos, and written content.',
        ],
      },
      {
        heading: 'Starter package',
        paragraphs: [
          'The Starter package is built for small businesses that want a unique, fully custom website design.',
          'It includes up to 5 custom-designed pages, a mobile-first layout, social integration, Google Analytics setup, and two structured revision rounds.',
        ],
      },
      {
        heading: 'Growth package',
        paragraphs: [
          'The Growth package suits established businesses needing deeper structure and stronger search visibility.',
          'It includes up to 12 pages, expanded service structure, gallery sections, multi-step enquiry forms, Google Business Profile setup support, and three revision rounds.',
        ],
      },
      {
        heading: 'Managed hosting pricing',
        paragraphs: [
          'Managed Hosting keeps your website secure and online 24/7.',
        ],
        bullets: ['SCR 2,500 per year', 'Domain registration and renewals are handled separately by the client'],
      },
      {
        heading: 'Payment terms',
        paragraphs: [
          'Website projects are split into milestone-based payments.',
        ],
        bullets: [
          'Foundation and Starter: 50% deposit, 50% before launch',
          'Growth: 40% deposit, 40% at design approval, 20% on launch',
        ],
      },
      {
        heading: 'Optional add-on services',
        paragraphs: [
          'Add-ons are available for businesses that need functionality beyond the package baseline.',
        ],
        bullets: [
          'Additional page: SCR 2,500 per page',
          'Content writing support: SCR 600 per page',
          'Structured booking or enquiry form: SCR 2,000',
          'Google Business Profile setup: SCR 2,200',
          'Rush delivery: +40% (subject to availability)',
        ],
      },
    ],
  },
  process: {
    eyebrow: 'Process and Timelines',
    title: 'A clear build path from',
    titleEm: 'brief to launch.',
    lead: 'Every project follows a practical structure that reduces friction and keeps delivery timelines reliable.',
    seoTitle: 'Process - Seychelles Website Build Timeline',
    seoDescription:
      'Understand the Horizon Digital process for custom Seychelles website projects, including scope, content prep, design revisions, build, and launch support.',
    seoPath: '/process',
    seoKeywords: 'website process seychelles, website timeline seychelles, custom website development process',
    blocks: [
      {
        heading: 'Getting started',
        paragraphs: [
          'The process begins when a business reaches out through the website contact form or WhatsApp.',
          'Horizon Digital clarifies goals, audience, and requirements, then recommends the right package and project scope.',
        ],
      },
      {
        heading: 'The Website Checklist',
        paragraphs: [
          'Every website build requires a few core assets from your side to ensure the project moves quickly and the final result is high quality.',
        ],
        bullets: [
          'Logo files (preferably vector or high-resolution)',
          'Brand guidelines or preferred colors/fonts',
          'Clear list of services and business descriptions',
          'High-quality photos for each main page',
          'Contact details, opening hours, and physical location',
          'Existing social media links or Google Business Profile access',
        ],
      },
      {
        heading: 'The Three Essentials',
        paragraphs: [
          'Whether you build with Horizon Digital or someone else, every website needs three fundamental pieces to exist on the internet.',
        ],
        bullets: [
          '1. The Domain Name - Your address (e.g., yourbusiness.sc). We recommend registering this yourself so you own it legally.',
          '2. Design & Build - The actual work of creating layouts, code and formatting content (what we specialize in).',
          '3. The Hosting - The server space where your website files live 24/7. This can be managed by us or a provider of your choice.',
        ],
      },
      {
        heading: 'The build timeline',
        paragraphs: [
          'A typical project takes 4 to 8 weeks from start to launch. Foundation projects are usually fastest, while Growth and Custom builds may take longer due to complexity.',
          'Timelines depend heavily on feedback speed and content readiness.',
        ],
      },
      {
        heading: 'Design phase and revisions',
        paragraphs: [
          'For Starter and Growth, the process starts with custom visual design layouts before code development begins.',
          'Clients review and provide feedback through structured revision rounds before build execution.',
        ],
      },
      {
        heading: 'Development and handover',
        paragraphs: [
          'After design approval, Horizon Digital engineers the site into production code with mobile optimization and search visibility setup.',
          'Each website is tested before launch and includes 30 to 60 days of post-launch support.',
        ],
      },
    ],
  },
  faq: {
    eyebrow: 'Frequently Asked Questions',
    title: 'Answers for common',
    titleEm: 'project decisions.',
    lead: 'Practical answers to pricing, timeline, hosting, process, technical ownership, and post-launch support.',
    seoTitle: 'FAQ - Seychelles Website Design Questions',
    seoDescription:
      'Read common Horizon Digital FAQ answers about custom Seychelles website pricing, hosting, mobile design, timelines, payments, and support.',
    seoPath: '/faq',
    seoKeywords: 'seychelles website design faq, custom website seychelles questions, web design seychelles support',
    blocks: [
      {
        heading: 'How much does a website cost?',
        paragraphs: [
          'Foundation starts at SCR 7,500, Starter at SCR 12,500, and Growth at SCR 25,000. Final cost depends on pages, features, and package scope.',
        ],
      },
      {
        heading: 'What is included in each package?',
        paragraphs: [
          'Every package includes mobile-friendly design, contact forms, search-ready setup, and post-launch support. Foundation includes up to 3 pages, Starter up to 5 custom pages, and Growth up to 12 pages with advanced structure.',
        ],
      },
      {
        heading: 'Do you provide website hosting?',
        paragraphs: [
          'Yes. Managed Hosting is SCR 2,500 per year. Clients can also choose external hosting if preferred.',
        ],
      },
      {
        heading: 'How long does it take to build a website?',
        paragraphs: [
          'Most projects take 4 to 8 weeks depending on package scope and how quickly content and feedback are provided.',
        ],
      },
      {
        heading: 'Can you redesign my existing website?',
        paragraphs: [
          'Yes. Horizon Digital provides both design refresh and full redesign services with mobile-friendly layouts, faster loading, and clearer contact paths.',
        ],
      },
      {
        heading: 'What information do you need from me to start?',
        paragraphs: [
          'To begin, Horizon Digital needs logo files, brand colors, contact details, written text, and high-quality photos for each page. Optional content writing support is available.',
        ],
      },
      {
        heading: 'How do payments work?',
        paragraphs: [
          'Smaller packages are usually split 50% deposit and 50% before launch. Larger packages use a 40/40/20 milestone split.',
        ],
      },
      {
        heading: 'Can you add WhatsApp or contact forms?',
        paragraphs: [
          'Yes. WhatsApp integration and secure contact forms are included in all website packages and positioned to support conversions.',
        ],
      },
      {
        heading: 'Will my website work on mobile phones?',
        paragraphs: [
          'Yes. Every Horizon Digital website is mobile-first and optimized across smartphones and tablets.',
        ],
      },
      {
        heading: 'If I already have a domain, can you still build my website?',
        paragraphs: [
          'Yes. Horizon Digital can connect the new build to your existing domain and guide the full linking process.',
        ],
      },
      {
        heading: 'Will I have access to edit my website after launch?',
        paragraphs: [
          'Sites are custom-coded (not CMS by default), so direct self-editing is generally not included. Horizon Digital handles updates to protect performance and security.',
        ],
      },
      {
        heading: 'Do you offer maintenance if something breaks later?',
        paragraphs: [
          'All packages include 30 to 60 days post-launch support. Managed Hosting clients benefit from ongoing server stability and monitoring.',
        ],
      },
    ],
    columns: 1,
  },
  hosting: {
    eyebrow: 'Managed Hosting',
    title: 'Reliable hosting with practical',
    titleEm: 'protection.',
    lead: 'Managed Hosting keeps the website secure, monitored, and recoverable so business owners can stay focused on operations.',
    seoTitle: 'Managed Hosting - Horizon Digital Seychelles',
    seoDescription:
      'Managed hosting for Seychelles websites: SSL security, monitoring, backups, and analytics support with clear monthly or annual pricing.',
    seoPath: '/hosting',
    seoKeywords: 'managed hosting seychelles, website hosting seychelles, custom website hosting seychelles',
    blocks: [
      {
        heading: 'Managed hosting pricing',
        paragraphs: ['SCR 2,500 per year billed annually.'],
      },
      {
        heading: 'Included in managed hosting',
        paragraphs: ['Managed hosting includes:'],
        bullets: ['Secure website (SSL) and monitoring', 'Monthly analytics report', 'Backups'],
      },
      {
        heading: 'Advanced builds',
        paragraphs: ['For advanced builds, hosting charges may differ.'],
      },
    ],
    columns: 1,
  },
  contact: {
    eyebrow: 'Contact Information',
    title: 'Start your project through a clear',
    titleEm: 'brief.',
    lead: 'The fastest way to begin is through the contact form or WhatsApp, with enough project detail to recommend the right package immediately.',
    seoTitle: 'Contact - Custom Website Design Seychelles',
    seoDescription:
      'Contact Horizon Digital for custom Seychelles website design. Send your project brief, business details, and goals for a structured recommendation.',
    seoPath: '/contact',
    seoKeywords: 'contact web designer seychelles, custom website seychelles contact, seychelles website consultation',
    blocks: [
      {
        heading: 'Primary contact methods',
        paragraphs: [
          'The best way to start is by completing the secure website contact form. Businesses can also begin directly on WhatsApp for faster discussion.',
        ],
      },
      {
        heading: 'Lead capture expectations',
        paragraphs: [
          'When submitting a project enquiry, include business name, service type, budget expectation, and website goals. Early detail improves package fit and response clarity.',
        ],
      },
      {
        heading: 'Response times',
        paragraphs: [
          'Messages are typically reviewed and replied to within one to two business days during standard business hours.',
          'The team replies clearly and professionally without aggressive sales pressure.',
        ],
      },
    ],
    columns: 1,
  },
  servicesPricing: {
    eyebrow: 'Services & Pricing',
    title: 'Website services and packages',
    titleEm: 'for Seychelles.',
    lead: 'Website design services built to help businesses communicate clearly online and convert interest into enquiries.',
    seoTitle: 'Website Packages & Pricing Seychelles',
    seoDescription:
      'Explore Horizon Digital website packages for Seychelles businesses. Clear pricing, professional design, and structured website projects optimized for Google Core Web Vitals.',
    seoPath: '/services-pricing',
    seoKeywords: 'website packages Seychelles, web design pricing Seychelles, website services Seychelles, custom website seychelles',
    blocks: [
      {
        heading: 'Website design services overview',
        paragraphs: [
          'Every website is planned around your services, your customers, and your goals - not copied from a generic template.',
          'Horizon Digital combines clear visual structure with practical search setup so people can find your business more easily and contact you faster.',
        ],
      },
      {
        heading: 'Package structure and pricing',
        paragraphs: [
          'Foundation starts at SCR 7,500, Starter starts at SCR 12,500, and Growth starts at SCR 25,000. Custom builds are scoped per project for advanced requirements.',
          'Each package includes mobile-friendly implementation, contact pathways, and post-launch support, with higher tiers adding deeper structure and custom functionality.',
        ],
      },
      {
        heading: 'Managed hosting and add-ons',
        paragraphs: [
          'Managed hosting is available at SCR 2,500 per year, including SSL security, monitoring, backups, and analytics reporting.',
          'Optional add-ons include additional pages, content writing, structured enquiry forms, Google Business Profile setup, and rush delivery where availability allows.',
        ],
      },
      {
        heading: 'Delivery process and timeline',
        paragraphs: [
          'Most projects follow a 4 to 8 week timeline from discovery to launch, depending on package scope and content readiness.',
          'Work progresses through clear stages: scope, design, build, testing, launch, and post-launch support.',
        ],
      },
    ],
  },
  whatYouNeed: {
    eyebrow: 'Guidance',
    title: 'What website does your business',
    titleEm: 'actually need?',
    lead: 'Many businesses know they need a website but are unsure which type is right. This guide helps you choose with clarity and confidence.',
    seoTitle: 'What Website Does Your Business Need?',
    seoDescription:
      'A clear guide for Seychelles businesses choosing the right website type, features, and package. Learn about service, retail, and hospitality web design.',
    seoPath: '/what-you-need',
    seoKeywords: 'what website do I need, business website types Seychelles, website package guidance, web design hosting',
    blocks: [
      {
        heading: 'Service business websites',
        paragraphs: [
          'Service businesses usually need clear service pages, trust-building structure, and direct enquiry pathways that guide visitors from first impression to contact.',
        ],
      },
      {
        heading: 'Retail showcase websites',
        paragraphs: [
          'Retail-focused websites prioritize product presentation, clear availability, and simple message or order-request pathways.',
        ],
      },
      {
        heading: 'Hospitality websites',
        paragraphs: [
          'Hospitality businesses benefit from clear room or service details, visual trust signals, location context, and frictionless booking enquiry flow.',
        ],
      },
      {
        heading: 'The three essentials every website needs',
        paragraphs: [
          'Every website depends on three core pieces: your domain name, your design/build implementation, and your hosting environment.',
          'Understanding these parts early helps you make better investment decisions and avoid avoidable delays.',
        ],
      },
      {
        heading: 'Two practical setup options',
        paragraphs: [
          'Option one: Horizon builds the website and you host externally. Option two: Horizon handles both website build and hosting management while you keep domain ownership.',
        ],
      },
    ],
  },
  digitalInsights: {
    eyebrow: 'Digital Insights',
    title: 'Artificial intelligence and digital tools',
    titleEm: 'for Seychelles businesses.',
    lead: 'A practical guide to AI, automation, and analytics for business owners who want clarity without technical noise.',
    seoTitle: 'Artificial Intelligence & Digital Tools for Businesses in Seychelles',
    seoDescription:
      'Learn how artificial intelligence, automation, and digital tools are shaping businesses in Seychelles and where they can be applied practically.',
    seoPath: '/ai-digital-tools',
    seoKeywords:
      'AI Seychelles, Artificial Intelligence Seychelles, digital tools Seychelles, automation for small businesses Seychelles, AI for small business',
    blocks: [
      {
        heading: 'Digital awareness',
        paragraphs: [
          'Around the world, businesses are beginning to use artificial intelligence, automation, and digital tools to work more efficiently and better understand their customers.',
          'While many of these technologies are still emerging in Seychelles, they are likely to play an increasing role in the future of business. Horizon Digital follows these developments closely to help local businesses stay informed.',
        ],
      },
      {
        heading: 'AI Chatbots for Customer Communication',
        paragraphs: [
          'AI-powered chatbots can answer common questions, guide visitors, and support customer communication outside normal working hours. They can help with booking enquiries, service questions, and basic support requests.',
        ],
      },
      {
        heading: 'Automation Tools',
        paragraphs: [
          'Automation tools can streamline repetitive tasks like confirmations, follow-ups, and information routing. This can reduce workload and help teams focus on customer-facing work.',
        ],
      },
      {
        heading: 'Understanding Customers Through Data',
        paragraphs: [
          'Digital analytics can help businesses understand customer behaviour, popular services, and content performance. Better insights support better decisions.',
        ],
      },
      {
        heading: 'AI Tools for Content and Communication',
        paragraphs: [
          'AI-assisted tools can support drafting, translation, and idea generation. They should support human judgement, not replace it.',
        ],
      },
      {
        heading: 'Current Horizon Digital focus',
        paragraphs: [
          'Horizon Digital currently focuses on clear, fast website engineering. AI and automation are tracked closely, but AI implementation services are not currently a core offering.',
        ],
      },
    ],
    columns: 2,
  },
}
