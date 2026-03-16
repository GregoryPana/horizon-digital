# 06 — Content, Tech Setup & SEO
## Verbatim Content · Vite Config · Tailwind Config · SEO Requirements

---

# PART A: CONTENT (src/lib/content.ts)

All copy must come from this file verbatim. Do not invent, summarise, or alter.

```typescript
export const HERO = {
  eyebrow: 'Web Design Studio — Seychelles',
  h1Line1: 'Websites that turn visitors into',
  h1Em: 'clients.',   // This is the italic teal <em> word
  body: 'We design and build custom websites for Seychelles businesses — guesthouses, restaurants, shops, and service firms. Every site is built to drive enquiries, not just look good.',
  cta1: { label: 'Start a project', href: '#cta' },
  cta2: { label: 'See our work',    href: '#work' },
  stats: [
    { number: '4–8',   label: 'Weeks to launch' },
    { number: '100%',  label: 'Mobile-first builds' },
    { number: 'SCR 0', label: 'Hidden fees' },
    { number: '30–60', label: 'Days post-launch support' },
  ],
}

export const MARQUEE = [
  { type: 'Guesthouse',    name: 'The Drake Seaside' },
  { type: 'Restaurant',    name: 'Concept Demo' },
  { type: 'Café',          name: 'Concept Demo' },
  { type: 'Consulting',    name: 'Concept Demo' },
  { type: 'Tour Operator', name: 'Seychelles' },
  { type: 'Retail',        name: 'Seychelles' },
]

export const WORK = [
  {
    id: 'drake',
    title: 'The Drake Seaside',
    client: 'The Drake Seaside Apartments',
    type: 'Guesthouse — Full Redesign',
    description: 'Redesign with new pages, updated content, faster load times, and higher click-through conversions.',
    url: 'https://thedrake-seaside.com/',
    isDemo: false,
    colSpan: 'col-span-12',
    aspect: 'aspect-[21/9]',
  },
  { id: 'restaurant', title: 'Restaurant Concept', client: 'Restaurant Demo', type: 'F&B — Concept Preview', description: 'Menu-first layout with clear contact buttons.', url: undefined, isDemo: true, colSpan: 'col-span-6 md:col-span-8 sm:col-span-4', aspect: 'aspect-video' },
  { id: 'cafe', title: 'Café Concept', client: 'Café Demo', type: 'F&B — Concept Preview', description: 'Mobile-first story with location details.', url: undefined, isDemo: true, colSpan: 'col-span-6 md:col-span-8 sm:col-span-4', aspect: 'aspect-video' },
  { id: 'consulting', title: 'Consulting Concept', client: 'Consulting Demo', type: 'Professional Services — Concept', description: 'Clear contact flow for new enquiries.', url: undefined, isDemo: true, colSpan: 'col-span-7 md:col-span-8 sm:col-span-4', aspect: 'aspect-video' },
  { id: 'tour', title: 'Tour Operator', client: 'Tour Operator Demo', type: 'Tourism — Concept Preview', description: 'Booking-first layout with activity focus.', url: undefined, isDemo: true, colSpan: 'col-span-5 md:col-span-8 sm:col-span-4', aspect: 'aspect-video' },
]

export const SERVICES = [
  { number: '01', name: 'Foundation', price: 'From SCR 7,500',
    description: 'For businesses that need a clean, professional online presence quickly. Pre-built Horizon Digital layout customised to your brand — not a generic template.',
    features: ['Up to 3 pages','Mobile-friendly layout','Contact form + Google Maps','WhatsApp integration','Search-ready setup (SEO foundations)','30 days post-launch support'] },
  { number: '02', name: 'Starter', price: 'From SCR 12,500',
    description: 'A fully custom website designed around your specific business, customers, and goals. Not a template — every layout is planned and designed from scratch.',
    features: ['Up to 5 custom-designed pages','Mobile-first custom layout','WhatsApp + social media integration','Google Analytics setup','Two revision rounds','45 days post-launch support'] },
  { number: '03', name: 'Growth', price: 'From SCR 25,000',
    description: 'For established businesses needing deeper structure, stronger search visibility, and features that convert serious traffic.',
    features: ['Up to 12 pages','Portfolio or gallery sections','Multi-step enquiry forms','Google Business Profile setup','Three revision rounds','60 days post-launch support'] },
  { number: '04', name: 'Custom Build', price: 'Scoped per project',
    description: 'Advanced requirements scoped and priced individually. Booking systems, multi-language, complex integrations — built to exact specification.',
    features: ['Bespoke scope and timeline','Direct builder access throughout','Full technical specification','Priority post-launch support'] },
]

export const REDESIGN_CTA = {
  eyebrow: 'Already have a website?',
  headline: 'We offer design refresh and full redesign services.',
  body: 'Horizon Digital can modernise your existing site with a mobile-friendly layout, faster load times, and clearer customer paths — without losing your brand identity.',
  cta: 'Discuss a redesign',
}

export const ABOUT = {
  quoteWords: ['A studio', 'built on', 'clarity.'],  // 'clarity.' gets <em>
  tag: 'Direct. Honest. Focused.',
  paragraphs: [
    "Horizon Digital is a focused studio that partners directly with local businesses. Every site is designed to attract visitors and turn them into enquiries or bookings — not just look modern.",
    "You work directly with the builder, not a rotating team of account managers. The approach is clear and transparent, designed to support you over time — not to lock you into complex retainers you don't need.",
    "After seeing businesses across Seychelles struggle with unclear websites and overcomplicated processes, Horizon Digital was built to offer something simpler: direct communication, practical solutions, and websites built for measurable growth.",
  ],
  cta: 'Start a conversation',
}

export const PROCESS = [
  { number: '01', title: 'Discovery & Scope', timeline: 'Day 1–7', description: "Reach out via the contact form or WhatsApp. We discuss your goals, target audience, and what the website needs to achieve. Horizon Digital recommends the right package and defines a clear project scope — no jargon, no pressure." },
  { number: '02', title: 'Content Gathering', timeline: 'Week 1–2', description: "Before building begins, the client provides logo, brand guidelines, and contact details — plus written text and high-quality photos for each page. Gathering this early keeps the project moving and the launch clean." },
  { number: '03', title: 'Design Phase', timeline: 'Week 2–4', description: "For Starter and Growth packages, full visual layouts are created before a single line of code is written. You review designs through structured revision rounds until the result looks exactly right." },
  { number: '04', title: 'Build & Test', timeline: 'Week 4–7', description: "Approved designs become fast, mobile-optimised code. Tested across devices and browsers to ensure every contact form, WhatsApp button, and page load performs flawlessly before going live." },
  { number: '05', title: 'Launch & Support', timeline: 'Week 7–8 + post-launch', description: "The site goes live. Domain connected, settings verified, and Horizon Digital stays on hand for 30 to 60 days post-launch to resolve any issues. Your investment is protected from day one." },
]

export const PRICING = [
  { name: 'Foundation', tagline: 'Simple professional presence', price: 7500, priceFormatted: '7,500', isFeatured: false, paymentTerms: '50% deposit · 50% on launch',
    features: ['Up to 3 pages','Pre-built layout (customised)','Mobile-friendly design','Contact form + Google Maps','WhatsApp integration','Search-ready setup','30 days post-launch support'] },
  { name: 'Starter', tagline: 'Fully custom website', price: 12500, priceFormatted: '12,500', isFeatured: true, paymentTerms: '50% deposit · 50% on launch',
    features: ['Up to 5 custom-designed pages','Mobile-first custom layout','WhatsApp + social media integration','Google Analytics setup','Two revision rounds','Search-ready setup','45 days post-launch support'] },
  { name: 'Growth', tagline: 'Deep structure + visibility', price: 25000, priceFormatted: '25,000', isFeatured: false, paymentTerms: '40% deposit · 40% design approval · 20% launch',
    features: ['Up to 12 pages','Portfolio or gallery sections','Multi-step enquiry forms','Google Business Profile setup','Three revision rounds','Expanded search-ready setup','60 days post-launch support'] },
]

export const ADDONS = [
  { name: 'Managed Hosting (monthly)',             price: 'SCR 250 / mo'  },
  { name: 'Managed Hosting (annual)',              price: 'SCR 2,500 / yr' },
  { name: 'Additional page',                       price: 'SCR 2,500'     },
  { name: 'Content writing (per page)',            price: 'SCR 600'       },
  { name: 'Booking or enquiry form',               price: 'SCR 2,000'     },
  { name: 'Google Business Profile setup',         price: 'SCR 2,200'     },
  { name: 'Rush delivery (subject to availability)', price: '+40% fee'    },
]
export const ADDONS_NOTE = 'Managed Hosting includes SSL certificate, site monitoring, monthly analytics report, and regular backups. Domain registration is separate and owned by you. For advanced builds, hosting charges may differ.'

export const FAQ = [
  { q: 'How much does a website cost?', a: 'Foundation starts at SCR 7,500, Starter at SCR 12,500, and Growth at SCR 25,000. The final cost depends on the number of pages, custom features, and any add-ons chosen. Custom builds are scoped individually.' },
  { q: 'How long does the build take?', a: 'Most projects take 4 to 8 weeks from start to public launch. The Foundation package is usually fastest. Timelines depend heavily on how quickly you provide content, photos, and feedback during review stages.' },
  { q: 'Do you provide website hosting?', a: 'Yes. Managed Hosting costs SCR 250 per month or SCR 2,500 per year and includes SSL security, site monitoring, monthly analytics, and backups. You can also choose to host elsewhere — we\'ll help set it up either way.' },
  { q: 'Can you redesign my existing website?', a: 'Yes. Horizon Digital offers design refresh and full redesign services. We modernise your existing site with a mobile-friendly layout, faster load speeds, and clearer paths to contact — while keeping your core messaging intact.' },
  { q: 'What do I need to provide to start?', a: "You'll need to provide your logo, brand colours, contact details, written text for each page, and high-quality photos. If you don't have written content, we offer content writing support at SCR 600 per page." },
  { q: 'How do payments work?', a: 'Foundation and Starter packages require a 50% deposit upfront and 50% on launch. The Growth package is split into 40% deposit, 40% at design approval, and 20% on launch. No surprise invoices at any stage.' },
  { q: 'Will my website work on mobile?', a: 'Yes — every Horizon Digital website is built mobile-first. Layouts are engineered to load quickly and display correctly across all screen sizes, from smartphones to large desktop monitors.' },
  { q: 'Can I use my existing domain name?', a: "Yes. We can build the website and connect it to your existing domain. It's best practice for you to own your domain directly — we'll guide you through linking it to the new hosting once the site is ready." },
  { q: 'Can I edit the website myself after launch?', a: "Horizon Digital builds custom-coded websites rather than CMS platforms like WordPress. This keeps sites fast and secure, but means direct content editing isn't available out-of-the-box. We handle all future updates." },
  { q: 'What if something breaks after launch?', a: 'All packages include 30 to 60 days of post-launch support. Clients on Managed Hosting benefit from ongoing monitoring and a stabilised server environment that rarely encounters problems.' },
]

export const CTA_SECTION = {
  eyebrow: 'Ready when you are',
  headline: 'Ready to get more enquiries?',
  body: "Tell us about your business — we'll recommend the right package and reply within one to two business days.",
  emailBtn: { label: 'Send an email', href: 'mailto:hello@horizondigitalsey.com' },
  waBtn: { label: 'Chat on WhatsApp', href: 'https://wa.me/2482500000' },
  formNote: 'We reply within 1–2 business days. No aggressive follow-ups.',
  businessTypes: ['Guesthouse / Hotel','Restaurant / Café / Bar','Tour Operator / Activity Provider','Retail Shop','Professional Services / Consulting','Other'],
  packages: ['Foundation — from SCR 7,500','Starter — from SCR 12,500','Growth — from SCR 25,000','Custom Build — let\'s discuss','Website Redesign','Not sure yet'],
}

export const FOOTER = {
  tagline: 'Custom web design for Seychelles businesses. Built to get you more enquiries.',
  quote: '"A studio built on clarity."',
  copyright: '© 2025 Horizon Digital. Mahé, Seychelles.',
  email: 'hello@horizondigitalsey.com',
  wa: 'https://wa.me/2482500000',
  site: 'https://horizondigitalsey.com',
  nav: [
    { label: 'Our Work',  href: '#work'     },
    { label: 'Services',  href: '#services' },
    { label: 'Pricing',   href: '#pricing'  },
    { label: 'Process',   href: '#process'  },
    { label: 'FAQ',       href: '#faq'      },
  ],
}
```

---

# PART B: TECH SETUP

## vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          gsap: ['gsap', '@gsap/react'],
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
})
```

## tailwind.config.ts (complete)

```typescript
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: { sm: '480px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1440px' },
    extend: {
      colors: {
        black: '#0A0A09', dark: '#111110', card: '#161614', surface: '#1C1C1A',
        white: '#FAFAF8', cream: '#F5F0E8',
        muted: { DEFAULT: '#8A8278', 2: '#5A5550' },
        teal:  { DEFAULT: '#00C9A7', bg: 'rgba(0,201,167,0.09)', border: 'rgba(0,201,167,0.25)', glow: 'rgba(0,201,167,0.055)' },
        border: { DEFAULT: 'rgba(255,255,255,0.07)', strong: 'rgba(255,255,255,0.13)' },
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        syne: ['Syne', 'system-ui', 'sans-serif'],
        dm: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-hero': ['clamp(40px,5.2vw,74px)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
        'display-xl': ['clamp(36px,4vw,56px)', { lineHeight: '1.07', letterSpacing: '-0.012em' }],
        'display-lg': ['clamp(30px,3.5vw,48px)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'display-md': ['clamp(24px,2.5vw,36px)', { lineHeight: '1.15' }],
        'display-sm': ['22px', { lineHeight: '1.2' }],
        'ui-eyebrow': ['11px', { lineHeight: '1', letterSpacing: '0.18em' }],
        'ui-nav': ['12px', { lineHeight: '1.4', letterSpacing: '0.02em' }],
        'ui-btn': ['13px', { lineHeight: '1', letterSpacing: '0.01em' }],
        'ui-badge': ['10px', { lineHeight: '1', letterSpacing: '0.1em' }],
        'body-lg': ['15px', { lineHeight: '1.75' }],
        'body-base': ['14px', { lineHeight: '1.78' }],
        'body-sm': ['13.5px', { lineHeight: '1.72' }],
        'body-xs': ['13px', { lineHeight: '1.65' }],
        'body-caption': ['12px', { lineHeight: '1.6' }],
      },
      spacing: {
        sec: '110px', 'sec-sm': '80px',
        gutter: '48px', 'gut-md': '28px', 'gut-sm': '20px',
      },
      borderRadius: {
        btn: '8px', badge: '4px', pill: '100px', input: '7px', card: '0px',
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'scroll-pulse': 'scroll-pulse 2.2s ease-in-out infinite',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        'scroll-pulse': { '0%,100%': { opacity: '0.38' }, '50%': { opacity: '0.12' } },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(255,255,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.06) 1px,transparent 1px)',
      },
      backgroundSize: { 'grid-52': '52px 52px' },
    },
  },
  plugins: [],
} satisfies Config
```

## tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## Image Extraction Script

Run once before starting the React build:
```bash
node -e "
const fs = require('fs');
const html = fs.readFileSync('horizon-digital.html', 'utf8');
const match = html.match(/src=\"(data:image\/jpeg;base64,[^\"]+)\"/);
if (match) {
  const base64 = match[1].replace('data:image/jpeg;base64,', '');
  fs.mkdirSync('public/images', { recursive: true });
  fs.writeFileSync('public/images/hero-bg.jpg', Buffer.from(base64, 'base64'));
  console.log('hero-bg.jpg extracted successfully');
} else { console.error('No base64 image found'); }
"
```

---

# PART C: SEO REQUIREMENTS

## index.html (Vite root)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Primary Meta -->
  <title>Horizon Digital — Custom Web Design, Seychelles</title>
  <meta name="description" content="Horizon Digital designs and builds custom websites for Seychelles businesses — guesthouses, restaurants, shops, and service firms. Mobile-first, SEO-ready, built to drive enquiries.">
  <meta name="keywords" content="web design Seychelles, website Seychelles, custom website Mahé, Horizon Digital, guesthouse website Seychelles">
  <meta name="author" content="Horizon Digital">
  <link rel="canonical" href="https://horizondigitalsey.com">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://horizondigitalsey.com">
  <meta property="og:title" content="Horizon Digital — Custom Web Design, Seychelles">
  <meta property="og:description" content="Custom websites for Seychelles businesses. Built to drive enquiries.">
  <meta property="og:image" content="https://horizondigitalsey.com/og-image.jpg">
  <meta property="og:locale" content="en_SC">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Horizon Digital — Web Design, Seychelles">
  <meta name="twitter:description" content="Custom websites for Seychelles businesses. Built to drive enquiries.">

  <!-- Performance -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="image" href="/images/hero-bg.jpg">

  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Horizon Digital",
    "description": "Custom web design studio for Seychelles businesses",
    "url": "https://horizondigitalsey.com",
    "email": "hello@horizondigitalsey.com",
    "areaServed": "Seychelles",
    "serviceType": ["Web Design", "Website Development", "SEO"],
    "address": { "@type": "PostalAddress", "addressCountry": "SC", "addressRegion": "Mahé" },
    "priceRange": "SCR 7,500–25,000+"
  }
  </script>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

## Semantic HTML Rules

- `<header>` wraps the `<nav>`
- `<main>` wraps all sections
- `<section>` for each content section with `aria-labelledby` pointing to its H2
- `<footer>` for the footer
- `<h1>` appears exactly once — in the Hero
- `<h2>` is the section title for every other section
- `<h3>` for individual card/item titles within sections (service names, process titles)
- All images have descriptive `alt` text
- All interactive elements are keyboard-accessible
- Form inputs have associated `<label>` elements
- `aria-label` on icon-only buttons (WhatsApp float, hamburger)

## Performance Budget

| Metric | Target | How |
|--------|--------|-----|
| LCP | < 2.5s | Hero image preloaded, JPEG 90% quality |
| FID / INP | < 100ms | No blocking JS on load, GSAP deferred |
| CLS | < 0.1 | All images have explicit width/height |
| Total JS (gzipped) | < 200KB | GSAP code-split, vendor chunk |
| Hero image | < 250KB | JPEG, optimised, 2000px max-width |
| Lighthouse score | 90+ | Semantic HTML, preload, no render-blocking |

## Performance Implementation

```tsx
// Hero image: use loading="eager" fetchpriority="high"
<img
  src="/images/hero-bg.jpg"
  alt="Laptop on terrace overlooking Seychelles granite boulders and Indian Ocean at blue hour"
  loading="eager"
  fetchpriority="high"
  width={2000}
  height={1116}
  className="h-img ..."
/>

// All other images: loading="lazy"
// Font display: swap (already set by Google Fonts ?display=swap param)
```
