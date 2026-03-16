# 04 — GSAP Animation System
## Every Animation Named, Specified, and Production-Ready

---

## Setup

```bash
npm install gsap @gsap/react split-type
```

```typescript
// src/lib/gsap.ts — register once, import everywhere
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// Global reduced-motion guard
export const prefersReduced = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export { gsap, ScrollTrigger }
```

```typescript
// src/lib/animations.ts — reusable factory functions
import SplitType from 'split-type'
import { gsap, ScrollTrigger, prefersReduced } from './gsap'
```

**Pattern for every section component:**
```tsx
'use client'  // if using Next.js — omit for Vite
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'

export default function Services() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (prefersReduced()) return
    // all animations here
  }, { scope: ref })  // scope cleanup to this component

  return <section ref={ref} id="services">...</section>
}
```

---

## A. HERO ANIMATIONS (load-triggered, no ScrollTrigger)

### A1. Ken Burns Image Zoom

Plays immediately on mount. Image zooms from 106% → 100% scale over 20 seconds.

```typescript
// In Hero.tsx useGSAP:
gsap.fromTo('#hero-bg-img',
  { scale: 1.06 },
  { scale: 1.0, duration: 20, ease: 'power1.out', immediateRender: true }
)
```

### A2. Hero Overlay System (static CSS, not animated)

Four overlay layers tuned for the laptop-in-Seychelles image:
```css
/* Layer 1 — Primary bottom-heavy gradient */
.h-ov1 {
  background: linear-gradient(
    to bottom,
    rgba(10,10,9,0.08) 0%,
    rgba(10,10,9,0.05) 15%,
    rgba(10,10,9,0.14) 38%,
    rgba(10,10,9,0.52) 60%,
    rgba(10,10,9,0.86) 78%,
    rgba(10,10,9,0.98) 100%
  );
}
/* Layer 2 — Right-side taming (kills warm orange on the right) */
.h-ov2 {
  background: linear-gradient(
    to right,
    transparent 0%, transparent 45%,
    rgba(10,10,9,0.22) 70%,
    rgba(10,10,9,0.52) 88%,
    rgba(10,10,9,0.72) 100%
  );
}
/* Layer 3 — Radial vignette (cinematic lens framing) */
.h-ov3 {
  background: radial-gradient(
    ellipse at 42% 48%,
    transparent 32%,
    rgba(10,10,9,0.22) 68%,
    rgba(10,10,9,0.55) 100%
  );
}
/* Layer 4 — Teal brand accent glow (ties image to brand palette) */
.h-tel {
  position: absolute;
  bottom: 15%; left: 0; right: 0; height: 180px;
  background: radial-gradient(
    ellipse at 38% 100%,
    rgba(0,201,167,0.055) 0%, transparent 62%
  );
}
```

### A3. Hero Content Cascade (staggered entrance on page load)

Elements reveal bottom-up in sequence, starting 80ms after mount.

```typescript
// In Hero.tsx, useGSAP with { scope: sectionRef }:
const tl = gsap.timeline({ delay: 0.08 })

tl.fromTo('.h-eyebrow',
  { opacity: 0, y: 20 },
  { opacity: 1, y: 0, duration: 0.78, ease: 'power2.out' }
).fromTo('.h-h1',
  { opacity: 0, y: 28 },
  { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out' },
  '-=0.5'
).fromTo('.h-body',
  { opacity: 0, y: 18 },
  { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' },
  '-=0.42'
).fromTo('.h-btns',
  { opacity: 0, y: 16 },
  { opacity: 1, y: 0, duration: 0.68, ease: 'power2.out' },
  '-=0.38'
).fromTo('.h-stats',
  { opacity: 0, y: 14 },
  { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' },
  '-=0.32'
)
// IMPORTANT: set initial state via GSAP set() not CSS, to avoid FOUC
gsap.set(['.h-eyebrow','.h-h1','.h-body','.h-btns','.h-stats'], 
  { opacity: 0, y: 20, immediateRender: true })
```

### A4. Hero Teal Underline Draw

The `<em>` word in the H1 gets a teal underline that draws left-to-right 600ms after the headline appears.

```typescript
// In Hero.tsx, chained to A3 timeline:
tl.add(() => {
  document.querySelector('.h-h1 em')?.classList.add('underline-active')
}, '+=0.5')

// CSS in globals.css:
// .font-cormorant em { position: relative; }
// .font-cormorant em::after {
//   content: '';
//   position: absolute; bottom: -2px; left: 0;
//   height: 1px; width: 0; background: var(--tel);
//   transition: width 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94);
// }
// .font-cormorant em.underline-active::after { width: 100%; }
```

### A5. Hero Parallax on Scroll

The hero image translates downward at 25% scroll speed, creating depth.

```typescript
// Separate from the entrance timeline:
ScrollTrigger.create({
  trigger: '#hero',
  start: 'top top',
  end: 'bottom top',
  scrub: true,
  onUpdate: (self) => {
    if (self.progress < 1) {
      gsap.set('#hero-bg-img', {
        y: self.progress * window.innerHeight * 0.25,
        overwrite: 'auto',
      })
    }
  }
})
```

### A6. Hero Content Fade on Scroll Exit

As user scrolls past the hero midpoint, content fades and drifts up — "leaving" the hero.

```typescript
gsap.to('.h-cont', {
  opacity: 0,
  y: -36,
  ease: 'none',
  scrollTrigger: {
    trigger: '#hero',
    start: '55% top',
    end: 'bottom top',
    scrub: 0.4,
  }
})
```

---

## B. GLOBAL SCROLL PROGRESS BAR

```typescript
// In ScrollProgressBar component useGSAP:
ScrollTrigger.create({
  start: 'top top',
  end: 'bottom bottom',
  scrub: 0,
  onUpdate: (self) => {
    const bar = document.getElementById('scroll-progress-bar')
    if (bar) bar.style.width = `${self.progress * 100}%`
  }
})
// CSS: position fixed, top 0, height 1px, bg-teal, z-[600], no transition
```

---

## C. SECTION TITLE WORD SPLIT REVEAL

Used on **every H2** across all sections. Words clip-reveal from bottom.

```typescript
// src/lib/animations.ts
export function revealSectionTitle(element: HTMLElement) {
  if (prefersReduced()) {
    gsap.set(element, { opacity: 1, y: 0 })
    return
  }
  const split = new SplitType(element, { types: 'words' })

  // Wrap each word in a clip container
  split.words?.forEach(word => {
    const wrapper = document.createElement('span')
    wrapper.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:bottom'
    word.parentNode?.insertBefore(wrapper, word)
    wrapper.appendChild(word)
  })

  gsap.fromTo(split.words,
    { y: '110%', opacity: 0 },
    {
      y: '0%',
      opacity: 1,
      duration: 0.85,
      ease: 'power3.out',
      stagger: 0.065,
      scrollTrigger: {
        trigger: element,
        start: 'top 86%',
        toggleActions: 'play none none none',
      }
    }
  )
}

// Usage in each section:
useGSAP(() => {
  const h2 = sectionRef.current?.querySelector('h2')
  if (h2) revealSectionTitle(h2 as HTMLElement)
}, { scope: sectionRef })
```

---

## D. FADE-UP UTILITY (body text, eyebrows, descriptions)

```typescript
// src/lib/animations.ts
export function fadeUp(
  targets: gsap.TweenTarget,
  options?: {
    delay?: number
    stagger?: number
    trigger?: gsap.TweenTarget
    start?: string
  }
) {
  if (prefersReduced()) { gsap.set(targets, { opacity: 1, y: 0 }); return }

  gsap.fromTo(targets,
    { opacity: 0, y: 26 },
    {
      opacity: 1, y: 0,
      duration: 0.75,
      ease: 'power2.out',
      delay: options?.delay ?? 0,
      stagger: options?.stagger ?? 0,
      scrollTrigger: {
        trigger: options?.trigger ?? targets as Element,
        start: options?.start ?? 'top 88%',
        toggleActions: 'play none none none',
      }
    }
  )
}
```

---

## E. WORK SECTION — Image Wipe Reveal

Each work card thumbnail reveals with a left-to-right curtain wipe. The curtain div (sibling to the image container) scales from `scaleX(1)` to `scaleX(0)`, `transform-origin: right center`.

```typescript
// In Work.tsx useGSAP:
document.querySelectorAll('.work-card').forEach((card, i) => {
  const curtain = card.querySelector('.work-curtain')
  const inner = card.querySelector('.work-thumb-inner')
  if (!curtain || !inner) return

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: card,
      start: 'top 84%',
      toggleActions: 'play none none none',
    }
  })

  tl.fromTo(curtain,
    { scaleX: 1, transformOrigin: 'right center' },
    { scaleX: 0, duration: 0.88, ease: 'power3.inOut', delay: i * 0.06 }
  ).fromTo(inner,
    { scale: 1.07 },
    { scale: 1, duration: 0.88, ease: 'power3.out' },
    '<'
  )
})

// Work card thumbnail DOM:
// <div className="work-thumb relative overflow-hidden">
//   <div className="work-curtain absolute inset-0 bg-card z-10 origin-right" />
//   <div className="work-thumb-inner w-full h-full flex items-center justify-center">
//     ...label
//   </div>
// </div>
```

---

## F. SERVICES — Stagger Card Reveal + Hover

```typescript
// In Services.tsx useGSAP:
fadeUp('.service-card', {
  stagger: 0.1,
  trigger: '.services-grid',
  start: 'top 82%'
})
```

**Hover effect — CSS only, no GSAP:**
```css
.service-card { transition: background 300ms ease; position: relative; }
.service-card::after {
  content: ''; position: absolute; inset: 0;
  background: var(--tel-bg); opacity: 0;
  transition: opacity 300ms ease; pointer-events: none;
}
.service-card:hover { background: var(--card); }
.service-card:hover::after { opacity: 1; }
.service-card .svc-n { transition: color 300ms ease; }
.service-card:hover .svc-n { color: rgba(0,201,167,0.22); }
```

---

## G. ABOUT — Quote Mark Scale + Body Stagger

```typescript
// In About.tsx useGSAP:
gsap.fromTo('.about-quote-mark',
  { opacity: 0, scale: 0.55, transformOrigin: 'bottom left' },
  {
    opacity: 1, scale: 1, duration: 1.0, ease: 'back.out(1.15)',
    scrollTrigger: { trigger: '#about', start: 'top 75%' }
  }
)

// H2 uses revealSectionTitle()

// Body paragraphs stagger:
gsap.fromTo('.about-body p',
  { opacity: 0, y: 18 },
  {
    opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1,
    scrollTrigger: { trigger: '.about-body', start: 'top 84%' }
  }
)
```

---

## H. PROCESS — Step Reveal + Line Draw + Number Count-Up

### H1. Step Line Draw (vertical connecting line)

```typescript
// The .process-list has a ::before absolute line
// CSS: .process-list { position: relative; }
// .process-list::before {
//   content: ''; position: absolute;
//   left: calc(var(--num-col-center)); top: 0;
//   width: 1px; height: calc(var(--line-progress, 0) * 100%);
//   background: rgba(255,255,255,0.08);
// }

ScrollTrigger.create({
  trigger: '.process-list',
  start: 'top 65%',
  end: 'bottom 75%',
  scrub: 0.6,
  onUpdate: (self) => {
    const el = document.querySelector('.process-list') as HTMLElement
    el?.style.setProperty('--line-progress', String(self.progress))
  }
})
```

### H2. Step Number Count-Up

```typescript
document.querySelectorAll('.process-step-num').forEach(el => {
  const target = parseInt(el.textContent?.replace(/\D/g,'') ?? '1')
  ScrollTrigger.create({
    trigger: el,
    start: 'top 88%',
    once: true,
    onEnter: () => {
      const obj = { val: 0 }
      gsap.to(obj, {
        val: target, duration: 0.7, ease: 'power2.out',
        onUpdate: () => {
          el.textContent = String(Math.round(obj.val)).padStart(2, '0')
        }
      })
    }
  })
})
```

### H3. Each Step Reveals (number left, content right)

```typescript
document.querySelectorAll('.process-step').forEach((step) => {
  const num = step.querySelector('.process-step-num')
  const content = step.querySelector('.process-step-content')
  const tl = gsap.timeline({
    scrollTrigger: { trigger: step, start: 'top 87%' }
  })
  tl.fromTo(num, { opacity: 0, x: -18 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' })
   .fromTo(content, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' }, '-=0.38')
})
```

---

## I. PRICING — Count-Up + Card Stagger

### I1. Price Count-Up

```typescript
[
  { selector: '.price-foundation .price-val', target: 7500 },
  { selector: '.price-starter .price-val',    target: 12500 },
  { selector: '.price-growth .price-val',     target: 25000 },
].forEach(({ selector, target }) => {
  const el = document.querySelector(selector)
  if (!el) return
  ScrollTrigger.create({
    trigger: el, start: 'top 88%', once: true,
    onEnter: () => {
      const obj = { val: 0 }
      gsap.to(obj, {
        val: target, duration: 1.4, ease: 'power2.out',
        onUpdate: () => { el.textContent = Math.round(obj.val).toLocaleString() }
      })
    }
  })
})
```

### I2. Featured Card Elevation

```typescript
// Featured card comes in slightly scaled up
gsap.fromTo('.price-card-featured',
  { opacity: 0, y: 32, scale: 0.97 },
  {
    opacity: 1, y: 0, scale: 1, duration: 0.82, ease: 'back.out(1.1)',
    scrollTrigger: { trigger: '.pricing-grid', start: 'top 80%' }
  }
)
// Non-featured stagger slightly behind
gsap.fromTo('.price-card-standard',
  { opacity: 0, y: 26 },
  {
    opacity: 1, y: 0, duration: 0.75, ease: 'power2.out', stagger: 0.14,
    scrollTrigger: { trigger: '.pricing-grid', start: 'top 80%' }
  }
)
```

---

## J. FAQ — Checkerboard Stagger + GSAP Accordion

### J1. FAQ Grid Reveal

```typescript
gsap.fromTo('.faq-item',
  { opacity: 0, y: 18 },
  {
    opacity: 1, y: 0, duration: 0.58, ease: 'power2.out',
    stagger: { each: 0.055, from: 'start' },
    scrollTrigger: { trigger: '.faq-grid', start: 'top 84%' }
  }
)
```

### J2. FAQ Accordion with Real Height Animation

**Critical:** Use real GSAP height animation, NOT the CSS `max-height` hack. The `max-height` approach causes a delayed "snap" — this is visible and amateurish.

```typescript
// In FAQ.tsx component:
const answerRefs = useRef<(HTMLDivElement | null)[]>([])
const [openIndex, setOpenIndex] = useState<number | null>(null)

const toggleFaq = (index: number) => {
  const answer = answerRefs.current[index]
  if (!answer) return

  if (openIndex === index) {
    // Closing
    gsap.to(answer, {
      height: 0, opacity: 0, duration: 0.32, ease: 'power2.in',
      onComplete: () => setOpenIndex(null)
    })
    // Rotate + icon back
    gsap.to(`.faq-icon-${index}`, { rotation: 0, duration: 0.3, ease: 'power2.out' })
  } else {
    // Close previous if any
    if (openIndex !== null) {
      const prev = answerRefs.current[openIndex]
      if (prev) gsap.to(prev, { height: 0, opacity: 0, duration: 0.25, ease: 'power2.in' })
      gsap.to(`.faq-icon-${openIndex}`, { rotation: 0, duration: 0.25 })
    }
    // Open new
    setOpenIndex(index)
    gsap.fromTo(answer,
      { height: 0, opacity: 0 },
      { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' }
    )
    gsap.to(`.faq-icon-${index}`, { rotation: 45, duration: 0.3, ease: 'power2.out' })
  }
}

// DOM setup for FAQ answer:
// <div ref={el => answerRefs.current[i] = el} style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
//   <p className="...">{answer}</p>
// </div>
```

---

## K. CTA — Text Scramble on Section Enter

```typescript
// src/lib/textScramble.ts
export class TextScramble {
  private el: HTMLElement
  private chars = '!<>-_\\/[]{}—=+*^?#'
  private queue: Array<{from:string;to:string;start:number;end:number;char?:string}> = []
  private frame = 0
  private rafId = 0
  private resolve!: () => void

  constructor(el: HTMLElement) {
    this.el = el
    this.update = this.update.bind(this)
  }

  setText(newText: string): Promise<void> {
    const old = this.el.innerText
    const len = Math.max(old.length, newText.length)
    const promise = new Promise<void>(r => { this.resolve = r })
    this.queue = Array.from({ length: len }, (_, i) => ({
      from: old[i] || '',
      to: newText[i] || '',
      start: Math.floor(Math.random() * 18),
      end: Math.floor(Math.random() * 18) + Math.floor(Math.random() * 18),
    }))
    cancelAnimationFrame(this.rafId)
    this.frame = 0
    this.update()
    return promise
  }

  private update() {
    let out = '', done = 0
    for (const item of this.queue) {
      if (this.frame >= item.end) { done++; out += item.to }
      else if (this.frame >= item.start) {
        if (!item.char || Math.random() < 0.28)
          item.char = this.chars[Math.floor(Math.random() * this.chars.length)]
        out += `<span style="color:var(--mut2)">${item.char}</span>`
      } else out += item.from
    }
    this.el.innerHTML = out
    if (done === this.queue.length) this.resolve()
    else { this.rafId = requestAnimationFrame(this.update); this.frame++ }
  }
}

// In CTA.tsx useGSAP:
ScrollTrigger.create({
  trigger: '#cta',
  start: 'top 72%',
  once: true,
  onEnter: () => {
    const el = document.querySelector('.cta-scramble')
    if (el && !prefersReduced()) {
      const scramble = new TextScramble(el as HTMLElement)
      scramble.setText('Ready to get more enquiries?')
    }
  }
})
```

---

## L. NAVIGATION — Scroll State + Active Section

```typescript
// In Navbar.tsx useGSAP:
ScrollTrigger.create({
  start: 'top -60',
  end: 99999,
  onUpdate: (self) => {
    const nav = document.getElementById('main-nav')
    nav?.classList.toggle('nav-scrolled', self.progress > 0)
  }
})

// Active nav link on scroll (IntersectionObserver — not GSAP):
const sections = ['work','services','about','process','pricing','faq','cta']
const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) setActiveSection(e.target.id)
  }),
  { threshold: 0.3 }
)
sections.forEach(id => {
  const el = document.getElementById(id)
  if (el) observer.observe(el)
})
```

---

## M. CUSTOM CURSOR

```typescript
// src/hooks/useCursor.ts
import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

export function useCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse   = useRef({ x: 0, y: 0, rx: 0, ry: 0 })
  const rafRef  = useRef<number>(0)

  useEffect(() => {
    // Only on pointer:fine (mouse) devices
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top  = e.clientY + 'px'
      }
    }

    const animate = () => {
      const m = mouse.current
      m.rx += (m.x - m.rx) * 0.11
      m.ry += (m.y - m.ry) * 0.11
      if (ringRef.current) {
        ringRef.current.style.left = m.rx + 'px'
        ringRef.current.style.top  = m.ry + 'px'
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    animate()

    // Expand on interactives
    const targets = document.querySelectorAll('a, button, .interactive')
    targets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        gsap.to(dotRef.current,  { scale: 2.4, duration: 0.2, ease: 'power2.out' })
        gsap.to(ringRef.current, { width: 52, height: 52, duration: 0.25 })
      })
      el.addEventListener('mouseleave', () => {
        gsap.to(dotRef.current,  { scale: 1, duration: 0.2 })
        gsap.to(ringRef.current, { width: 36, height: 36, duration: 0.25 })
      })
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return { dotRef, ringRef }
}
```

---

## Reduced Motion Fallback Pattern

Every animation in this file must be guarded:

```typescript
// At the TOP of every useGSAP callback:
if (prefersReduced()) {
  // Ensure all animated elements are in their final visible state
  gsap.set('.animated-elements', { opacity: 1, y: 0, scale: 1, x: 0 })
  return  // exit — no animations
}
// ... rest of animation code
```

---

## Performance Rules

1. Only animate `transform` and `opacity` — GPU composited, never causes layout
2. Use `will-change: transform` on the hero image only (most expensive animation)
3. `scrub: true` on parallax — never `requestAnimationFrame` loop for scroll effects
4. Kill ScrollTrigger instances in `useGSAP` cleanup (handled automatically by `{ scope: ref }`)
5. `stagger` values: 55–120ms for reveals, 60–80ms for large grids (FAQ, work cards)
6. Hero timeline total duration including overlaps: ~2.5s. User should be interactive by 1s.
