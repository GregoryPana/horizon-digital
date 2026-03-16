# 05 — Component Specifications
## Full Component Tree, Props, DOM Structure, Tailwind Classes

---

## File Structure

```
src/
├── App.tsx
├── main.tsx
├── styles/
│   └── globals.css
├── lib/
│   ├── gsap.ts
│   ├── animations.ts
│   ├── textScramble.ts
│   └── content.ts
├── hooks/
│   ├── useCursor.ts
│   ├── useScrollProgress.ts
│   └── useMediaQuery.ts
├── components/
│   ├── ui/
│   │   ├── Container.tsx
│   │   ├── Grid.tsx
│   │   ├── Eyebrow.tsx
│   │   ├── Button.tsx
│   │   └── Badge.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── FloatingWA.tsx
│   │   └── ScrollProgressBar.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── Marquee.tsx
│       ├── Work.tsx
│       ├── Services.tsx
│       ├── About.tsx
│       ├── Process.tsx
│       ├── Pricing.tsx
│       ├── FAQ.tsx
│       └── CTA.tsx
└── assets/
    └── images/
        └── hero-bg.jpg  ← extract from HTML prototype
```

---

## UI Primitives

### `<Container>`
```tsx
interface ContainerProps {
  children: React.ReactNode
  className?: string
}
// <div className="max-w-[1180px] mx-auto px-[48px] md:px-[28px] sm:px-[20px] {className}">
```

### `<Grid>`
```tsx
interface GridProps {
  children: React.ReactNode
  className?: string
  gapClass?: string  // default 'gap-x-6 md:gap-x-[18px] sm:gap-x-3'
}
// <div className="grid grid-cols-12 md:grid-cols-8 sm:grid-cols-4 {gapClass} {className}">
```

### `<Eyebrow>`
```tsx
interface EyebrowProps {
  children: React.ReactNode
  className?: string
  centered?: boolean
}
// <p className="flex items-center gap-[9px] font-syne text-[11px] tracking-[0.18em]
//               uppercase text-teal font-medium {centered ? 'justify-center' : ''} {className}">
//   <span aria-hidden="true" className="text-[9px]">✦</span>
//   {children}
// </p>
```

### `<Button>`
```tsx
type ButtonVariant = 'primary' | 'ghost'

interface ButtonProps {
  variant: ButtonVariant
  href?: string           // renders <a> if provided, <button> otherwise
  onClick?: () => void
  children: React.ReactNode
  showArrow?: boolean     // default: true for primary
  className?: string
}

// primary: bg-teal text-black font-syne text-[13px] font-bold px-[26px] py-[13px] rounded-btn
//          inline-flex items-center gap-2 group transition-[opacity,transform] duration-200
//          hover:opacity-[.87] hover:-translate-y-0.5
// ghost:   border border-white/[.13] text-cream font-syne text-[13px] font-medium
//          px-[26px] py-[13px] rounded-btn inline-flex items-center gap-2
//          transition-[border-color,background] duration-200
//          hover:border-white/25 hover:bg-white/[.03]

// Arrow span: <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
```

### `<Badge>`
```tsx
interface BadgeProps {
  children: React.ReactNode
  variant?: 'teal' | 'featured'
}
// teal:     bg-teal/[.09] text-teal font-syne text-[10px] font-bold tracking-[0.1em]
//           uppercase px-[10px] py-[2px] rounded-badge
// featured: same — used for "Most popular" on Starter pricing card
```

---

## Layout Components

### `<Navbar>`

```tsx
interface NavbarProps {}  // no props

// State:
// isScrolled: boolean — window.scrollY > 60, toggles frosted glass class
// isMobOpen: boolean — mobile menu overlay

// Structure:
// <nav id="main-nav" className={cn(
//   'fixed top-0 left-0 right-0 z-nav h-[68px]',
//   'flex items-center justify-between px-[48px] md:px-[24px]',
//   'transition-[background,backdrop-filter,border-bottom] duration-400',
//   isScrolled && 'bg-black/90 backdrop-blur-[18px] border-b border-border'
// )}>

// Links: Work · Services · Pricing · Process · FAQ · [Get a quote →]
// "Get a quote" = Button variant="primary" href="#cta"

// Mobile: hamburger (3 bars) → full-screen overlay, translateX(100%→0)
// Overlay links in Cormorant Garamond 40px, centered column
```

### `<CustomCursor>`

```tsx
// Only renders on window.matchMedia('(hover: hover) and (pointer: fine)')
// Two divs returned:
// Dot:  8px circle, bg-teal, fixed, z-[9999], pointer-events-none, translate(-50%,-50%)
// Ring: 36px, border border-teal/30, fixed, z-[9998], translate(-50%,-50%)
// See useCursor() hook in 04_ANIMATIONS.md M
// globals.css: @media (hover: hover) and (pointer: fine) { body, a, button { cursor: none; } }
```

### `<FloatingWA>`

```tsx
// <a href="https://wa.me/2482500000" target="_blank" rel="noopener noreferrer"
//    className="fixed bottom-[26px] right-[26px] z-[400] w-[50px] h-[50px]
//               bg-[#25D366] rounded-full flex items-center justify-center
//               opacity-[.55] hover:opacity-100 hover:scale-[1.08]
//               transition-[opacity,transform] duration-200 shadow-wa"
//    aria-label="Chat on WhatsApp">
//   <WhatsAppIcon className="w-6 h-6 fill-white" />
// </a>
```

### `<ScrollProgressBar>`

```tsx
// <div id="scroll-progress-bar"
//      className="fixed top-0 left-0 h-px bg-teal z-[600] pointer-events-none"
//      style={{ width: '0%' }} />
// Width controlled by GSAP (04_ANIMATIONS.md B)
```

---

## Section Components

### `<Hero>`

```tsx
// Full viewport, image behind, text right-aligned (cols 6–12)
// Key DOM IDs for GSAP targeting:
//   #hero-bg-img — the <img> element
//   .h-eyebrow, .h-h1, .h-body, .h-btns, .h-stats — content elements
//   .h-h1 em — the teal italic word, receives .underline-active class
//   .h-cont — content wrapper, fades on scroll exit

// Image extraction:
// node -e "
//   const fs = require('fs');
//   const html = fs.readFileSync('horizon-digital.html','utf8');
//   const m = html.match(/src=\"(data:image\/jpeg;base64,[^\"]+)\"/);
//   if(m){ fs.writeFileSync('public/images/hero-bg.jpg',
//     Buffer.from(m[1].replace('data:image/jpeg;base64,',''),'base64'));
//     console.log('Extracted.'); }
// "

// Overlay layers (4 absolute divs, z-[1]):
// h-ov1: bottom-heavy gradient (primary)
// h-ov2: right-side horizontal gradient (tames orange horizon glow)
// h-ov3: radial vignette (cinematic framing)
// h-tel: teal brand accent glow (bottom-center)

// Bottom fade (absolute, z-[2]): 120px, gradient to --blk
// Scroll hint (absolute, z-[3], bottom-right): "Scroll" + animated 1px line

// Stats strip: flex row, gap-[40px], flex-wrap, border-top border-white/[.14]
// On mobile: flex-wrap allows stats to stack naturally
```

### `<Marquee>`

```tsx
// <div id="mq" className="border-t border-border border-b border-border
//                         py-[15px] overflow-hidden relative">
//   <div className="absolute left-0 inset-y-0 z-[2] flex items-center
//                   px-[48px] font-syne text-[10px] text-muted2 uppercase tracking-[.14em]
//                   bg-gradient-to-r from-black via-black/75 to-transparent whitespace-nowrap">
//     Trusted by
//   </div>
//   <div className="flex animate-marquee w-max pl-[190px]">
//     {[...ITEMS, ...ITEMS].map((item, i) => (
//       <MarqueeItem key={i} {...item} />
//     ))}
//   </div>
// </div>

// MarqueeItem:
// <div className="whitespace-nowrap px-[34px] font-syne text-[12px] font-medium
//                 text-muted border-r border-border tracking-[.03em]">
//   <span className="text-muted2 text-[10px] mr-2 uppercase tracking-[.1em]">{type}</span>
//   {name}
// </div>
```

### `<Work>`

```tsx
interface WorkCardProps {
  id: string
  title: string
  client: string
  type: string
  description: string
  url?: string
  isDemo: boolean
  colSpan: string         // Tailwind col-span class e.g. "col-span-12"
  aspectClass: string     // e.g. "aspect-[21/9]" or "aspect-video"
}

// Grid parent: "grid grid-cols-12 gap-[2px] bg-border"
// Each card: "bg-card overflow-hidden relative group {colSpan}"
// Thumbnail: "relative {aspectClass} bg-surface overflow-hidden"
//   - Curtain: "work-curtain absolute inset-0 bg-card z-10 origin-right"
//   - Inner: "work-thumb-inner w-full h-full flex items-center justify-center
//             relative transition-transform duration-[600ms] ease-[cubic-bezier(.25,.46,.45,.94)]
//             group-hover:scale-[1.04]"
//     - Grid pattern bg: "absolute inset-0 bg-grid-pattern bg-grid-52"
//     - Label (centered, z-[1]):
//       - Title: font-cormorant font-light text-display-sm text-cream
//       - URL: font-syne text-[10px] text-muted2 uppercase tracking-[.1em]
// Card info bar: padding 20px 22px, border-t border-border, flex justify-between
//   - Visit/Demo link: font-syne text-[11px] text-teal tracking-[.06em]
//     opacity-0 -translate-x-1.5 → group-hover:opacity-100 group-hover:translate-x-0
//     transition-all duration-[250ms]
```

### `<Services>`

```tsx
// Grid: "grid grid-cols-2 md:grid-cols-1 gap-[1px] bg-border" (service tiles)
// Each card has data-service-card class for GSAP targeting
// Card has ::after teal overlay (CSS, not Tailwind — use arbitrary value or global CSS)

// Redesign callout below grid:
// "mt-[1px] bg-surface border border-border px-[36px] py-[28px]
//  flex justify-between items-center flex-wrap gap-[18px] md:px-[22px]"
```

### `<About>`

```tsx
// Section: bg-black, py-[130px] md:py-[80px]
// Grid: grid-cols-12, gap-x-6
// Left (cols 1–5): quote mark + H2
//   Quote mark: font-cormorant text-[72px] leading-[.6] text-teal/[.14]
//               about-quote-mark class for GSAP
// Right (col-start-7, span 6):
//   Tag pill: border border-border-strong rounded-pill px-[14px] py-[5px]
//             font-syne text-[11px] text-muted tracking-[.04em] inline-block mb-[20px]
//   Paragraphs: about-body p class for GSAP stagger
//   CTA link: about-link class, font-syne text-[12px] text-teal, arrow nudges on hover
//             "inline-flex items-center gap-2 transition-[gap] duration-200 hover:gap-3.5"
```

### `<Process>`

```tsx
// Each step is a CSS grid row (process-step class):
// "grid grid-cols-12 md:grid-cols-8 sm:grid-cols-4 gap-x-6
//  border-b border-border py-[38px] first:border-t first:border-border"

// Number column (cols 1–2):
// "col-span-2 sm:col-span-1 font-cormorant font-light text-[62px] leading-[.9]
//  text-teal/[.11] pt-1 text-right process-step-num
//  transition-colors duration-300 group-hover:text-teal/[.28]"

// Content column (cols 3–12):
// "col-start-3 col-span-10 md:col-start-2 md:col-span-7 sm:col-start-2 sm:col-span-3
//  process-step-content"
//   Title: "font-cormorant font-light text-[26px] text-white mb-[9px] ptitle class"
//   Desc: "font-dm text-[14px] text-muted leading-[1.76] max-w-[580px] pdesc class"
//   Timeline Eyebrow: "mt-[10px]"

// IMPORTANT: Add "group" class to each .process-step div for hover color transition
```

### `<Pricing>`

```tsx
interface PriceCardProps {
  name: string
  tagline: string
  price: number          // numeric — for GSAP count-up
  priceFormatted: string // display string
  isFeatured: boolean
  paymentTerms: string
  features: string[]
}

// Grid: "grid grid-cols-3 md:grid-cols-1 gap-[2px] bg-border"
// Regular card: "price-card price-card-standard bg-dark px-[32px] pt-[36px] pb-[40px]"
// Featured card: "price-card price-card-featured bg-card border-t-2 border-teal px-[32px] pt-[36px] pb-[40px]"

// Price amount span has class "price-val" for GSAP count-up targeting
// The count-up shows just the number — "SCR " prefix is a sibling span, always static

// Add-ons block below:
// "mt-[48px] border border-border px-[34px] py-[30px] md:px-[18px]"
// Inner grid: "grid gap-0" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))' }}
// Each addon row: "flex justify-between items-center py-[10px] border-b border-border last:border-b-0"
```

### `<FAQ>`

```tsx
// Grid: "grid grid-cols-2 md:grid-cols-1 gap-[2px] bg-border"
// Each item: "faq-item bg-dark px-[30px] py-[26px] cursor-pointer
//             transition-colors duration-200 hover:bg-card"
// Question row: "flex justify-between items-start gap-3 font-syne font-semibold
//                text-[13.5px] text-white leading-[1.45]"
// Icon: className={`faq-icon-${i} text-teal text-[20px] font-light flex-shrink-0 -mt-0.5`}
//       Initial state: rotation 0 — GSAP rotates to 45deg on open

// Answer div: ref={el => answerRefs.current[i] = el}
//             style={{ height: 0, overflow: 'hidden', opacity: 0 }}
//             GSAP handles height/opacity animation (04_ANIMATIONS.md J2)
// Answer text: font-dm text-[13.5px] text-muted leading-[1.75] pt-3
```

### `<CTA>`

```tsx
// Section: id="cta", bg-dark, border-y border-border, py-[110px] px-[44px] md:py-[80px] md:px-[20px]
//          relative overflow-hidden, text-center
// ::before: radial teal glow (use global CSS or arbitrary bg value)
// Content: max-w-[600px] mx-auto (centered in cols 3–10)

// H2 has className="cta-scramble" — TextScramble targets this
// Initial textContent must match the scramble target: "Ready to get more enquiries?"

// Form: max-w-[560px] mx-auto text-left
// Input styling (all inputs/selects/textareas):
// "bg-surface border border-border-strong rounded-input px-[14px] py-3
//  font-dm text-[14px] text-cream w-full
//  focus:border-teal-border focus:ring-2 focus:ring-teal/[.12] outline-none
//  transition-[border-color] duration-200"
// Select: add -webkit-appearance: none in globals.css
```

---

## App.tsx Structure

```tsx
import CustomCursor      from '@/components/layout/CustomCursor'
import FloatingWA        from '@/components/layout/FloatingWA'
import ScrollProgressBar from '@/components/layout/ScrollProgressBar'
import Navbar    from '@/components/layout/Navbar'
import Footer    from '@/components/layout/Footer'
import Hero      from '@/components/sections/Hero'
import Marquee   from '@/components/sections/Marquee'
import Work      from '@/components/sections/Work'
import Services  from '@/components/sections/Services'
import About     from '@/components/sections/About'
import Process   from '@/components/sections/Process'
import Pricing   from '@/components/sections/Pricing'
import FAQ       from '@/components/sections/FAQ'
import CTA       from '@/components/sections/CTA'

export default function App() {
  return (
    <>
      <ScrollProgressBar />
      <CustomCursor />
      <FloatingWA />
      <Navbar />
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
      <Footer />
    </>
  )
}
```
