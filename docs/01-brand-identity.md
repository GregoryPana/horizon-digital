# 01 — BRAND IDENTITY
## Horizon Digital · Visual System, Tone of Voice & Brand Rules

**Version:** 1.0  
**Prepared:** April 2026  
**Part of:** [Project Context →](./00-project-context.md)

> This document defines every design and brand decision for Horizon Digital. All designers and AI code editors working on this project must treat this as law. Do not deviate from the palette, typography, or tone rules without explicit approval.

---

## 1. Brand Positioning Statement

Horizon Digital is the **only custom web design studio based in Seychelles** that combines:
- Bespoke code (no templates, no page builders)
- Local accountability (Mahé-based, same timezone, WhatsApp accessible)
- Performance guarantees (90+ PageSpeed on every delivery)
- Transparent SCR pricing

**The brand is not a tech company.** It is a trusted local partner for business owners who care about results. The design must reflect this: premium but not intimidating, confident but not arrogant, technical but explained in plain English.

---

## 2. Visual Identity — The "Abyss" System

The visual identity is built around the concept of **deep ocean clarity** — like looking into clear Seychellois water at night. Deep, dark, beautiful — with electric light piercing through.

### 2.1 Colour Palette

#### Backgrounds

| Token | Hex | Tailwind approximation | Usage |
|---|---|---|---|
| `bg-main` / `#0A0A0C` | Deep near-black | `bg-[#0A0A0C]` | Primary page background — all sections |
| `bg-panel` / `#1A1A1C` | Elevated surface | `bg-[#1A1A1C]` | Cards, panels, elevated containers |
| `bg-elev` / `#121214` | Mid-elevation | `bg-[#121214]` | Featured cards (e.g. Starter pricing) |
| `black` | `#000000` | `bg-black` | Contrast elements, marquee strip |

#### Accents

| Token | Hex | Usage |
|---|---|---|
| `cyan` / Electric Cyan | `#00E5FF` | **Primary accent.** CTAs, hover states, key words in headlines, underline decorations, shimmer effects |
| `deep-teal` | `#0D9488` | **Secondary accent.** Eyebrow labels (`section-eyebrow-glow`), step badges, bullet markers, trust strips |
| `accent-2` | Lighter teal | Service card headings in Pricing |

#### Text

| Token | Usage |
|---|---|
| `text-white` / `#FFFFFF` | Primary headings |
| `text-gray-300` | Body paragraphs |
| `text-text-muted` | Subheadings, descriptions, supporting copy |
| `text-cyan` | Highlighted words within body copy, CTAs, labels |
| `text-deep-teal` | Eyebrow labels, step numbers |

#### Borders

| Token | Value | Usage |
|---|---|---|
| `border` (default) | `rgba(255,255,255,0.05)` – `0.1` | Card borders, section dividers |
| `border-cyan/40` | Cyan at 40% opacity | Package card default border |
| `border-deep-teal/35` | Teal at 35% opacity | Tier badges, trust markers |

#### Special Effects

| Effect | CSS Value | Usage |
|---|---|---|
| Cyan glow CTA | `box-shadow: 0 0 40px rgba(0,229,255,0.5)` | Primary CTA buttons |
| Cyan card hover | `box-shadow: 0 0 12px rgba(0,229,255,0.3)` | Card hover states |
| Teal pulse | `box-shadow: 0 0 10px rgba(13,148,136,0.4)` | Live indicator dots, tier badge dots |
| Section eyebrow glow | CSS class `section-eyebrow-glow` | All section eyebrow labels |
| Gradient animated CTA | `linear-gradient(90deg, #00E5FF, #38B2F5, #0C7CC4, #00E5FF)` at `300% 100%` | Animated primary CTA buttons |

---

### 2.2 Typography

#### Display Font (Headlines)

Class: `font-display`  
Used for: All `<h1>`, `<h2>`, `<h3>` tags, project titles on Work page, hero headlines  
Style: Tight tracking (`tracking-tight`), semibold or bold weight

**Rules:**
- Hero headlines: `text-4xl md:text-5xl` or larger
- Section headlines: `text-3xl md:text-5xl`
- Card titles: `text-xl md:text-2xl`
- Project titles on Work page: `text-2xl sm:text-3xl lg:text-5xl font-semibold`
- Large work showcase titles: `text-4xl font-bold uppercase tracking-[-0.04em] md:text-7xl`

#### Body Font

Used for: All paragraph text, descriptions, FAQ answers, body copy  
Style: `leading-relaxed`, `text-lg` or `text-base`

#### Eyebrow / Label Style

```
text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-deep-teal
```
Class: add `section-eyebrow-glow`  
Always placed immediately above the section headline.

#### CTA Button Typography

```
font-black uppercase tracking-[0.2em] text-xs sm:text-sm
```
Primary CTAs in `text-black` (on cyan gradient background).  
Secondary CTAs in `text-cyan hover:text-white`.

---

### 2.3 Shape & Border Radius

| Element | Border Radius | Class |
|---|---|---|
| Primary CTA buttons | Full pill | `rounded-full` |
| Cards (most) | 2xl | `rounded-2xl` |
| Cards (premium/featured) | 3xl | `rounded-3xl` |
| "Different" section container | 2.5rem | `rounded-[2.5rem]` |
| Project showcase cards | 2.5rem | `rounded-[2.5rem]` |
| Showcase image overlays | xl | `rounded-xl` |
| Laptop mockup screen | Custom | `rounded-t-lg lg:rounded-t-[1.5rem]` |

---

### 2.4 Animation System

#### Framer Motion — Section Entry (Standard)

All content sections on scroll-in use this baseline:

```tsx
initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
viewport={{ once: true, amount: 0.3 }}
transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
```

Cards stagger by: `delay: index * 0.1`

#### Framer Motion — Heading Scale Blur (Hero-level emphasis)

```tsx
initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
```

#### Framer Motion — Horizontal Slide (About page columns)

```tsx
// Left: initial={{ opacity: 0, x: -20 }}
// Right: initial={{ opacity: 0, x: 20 }}
viewport={{ once: true, amount: 0.3 }}
transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
```

#### GSAP ScrollTrigger — Work Page (Cinematic Pin)

The Work page uses a pinned container with GSAP:
- Container pinned while scroll extends `projects.length * 130%`
- Each project: text fades in (`opacity: 0 → 1, y: 30 → 0`), visual rises from `100vh` to `0`
- Laptop mockup tilts from `rotateX(-25)` to `rotateX(-12)` on entry
- Background colour transitions to project-specific tint on entry
- Exit: visual exits to `-100vh`, text fades out

#### CSS Animations (Custom)

| Class | Effect |
|---|---|
| `hd-marquee-track` | Infinite left-scroll ticker |
| `hd-anim-before` / `hd-anim-after` | Animated before/after layout comparison |
| `hd-phone-scroll` | Simulated phone scroll animation |
| `hd-typing` | Typewriter text effect |
| `hd-search-result` | Highlighted search result reveal |
| `hd-ring` | Circular progress ring draw |
| `cta-gradient-anim` | Animated gradient shift on primary CTAs |
| `section-eyebrow-glow` | Text-shadow glow on teal eyebrow labels |
| `pricing-card-featured-shine` | Animated shine on featured pricing card |

#### Reduced Motion

All animations respect `useReducedMotion()` from Framer Motion. When `true`, animations are disabled or set to instant (no `initial` or `whileInView` props applied).

---

### 2.5 Logo & Visual Marks

- **Logo file:** `/assets/logo/logo.webp` — used as OG image and in navbar
- **Logo display:** Horizontal text-based logo with glow/dark treatment
- **Favicon:** Derivative of logo mark

**Rules:**
- Never stretch or distort the logo
- Always show on dark backgrounds; the logo is designed for dark-mode only
- Minimum clear space: 1× logo height on all sides

---

## 3. Tone of Voice

### 3.1 Voice Characteristics

Horizon Digital speaks as a **trusted, honest local expert** — not a multinational agency, not a tech startup, not a salesperson.

| Quality | What it means in practice |
|---|---|
| **Direct** | Say what we mean. No filler phrases. No "leveraging synergies". |
| **Plain English** | No jargon. No acronyms the client will need to Google. |
| **Warm but confident** | Not timid, not arrogant. Reassuring because we know what we're doing. |
| **Specific** | Always prefer concrete over vague. "14-day average launch" beats "fast turnaround". |
| **Locally grounded** | Reference Seychelles, Mahé, SCR, local search terms. Never generic. |
| **Honest before persuasive** | If something needs stating plainly (e.g. "we don't offer this yet"), say it directly. |

### 3.2 Tone by Section

| Section | Tone |
|---|---|
| Hero | Confident, bold, immediately relevant |
| Problem section | Empathetic, recognising pain without over-dramatising |
| Services | Functional, benefit-focused, specific |
| Difference / About | Personal, grounded, honest about what makes us different |
| Pricing | Clear, factual, reassuring — no hidden tricks |
| Process | Step-by-step, calming, no-jargon |
| Contact | Welcoming, low-pressure, conversational |
| FAQ | Honest, direct, preemptive — addresses real doubts |
| Insights | Educational, accessible, not selling anything |

### 3.3 Key Copy Principles

**DO:**
- Use "you" and "your" constantly — this is about the client, not us
- Use first person plural "we" sparingly and only when it adds warmth
- Start headlines with the client's perspective: *"My website looks outdated"* not *"We fix outdated websites"*
- Use active voice: *"We build your site"* not *"Your site is built by us"*
- Use short sentences for impact. Then longer ones when explanation is needed.
- Reference the Seychelles context explicitly and often

**DO NOT:**
- Use phrases like "world-class", "cutting-edge", "innovative solution", "seamless experience"
- Make claims that cannot be verified (e.g. "340% enquiry increase" is placeholder — remove or verify)
- Use passive voice for key promises
- Use technical jargon (DNS, CMS, React, API) without plain-English explanation
- Use exclamation marks except in very rare, casual contexts
- Over-promise ("guaranteed #1 on Google") — instead: "real chance of appearing"

### 3.4 Signature Copy Lines (Use These — They Are On-Brand)

| Line | Used On |
|---|---|
| *"Your business, beautifully online"* | Tagline — use everywhere |
| *"We fix this. Every time."* | Problem section closing |
| *"No templates. Just your business."* | Services / hero |
| *"Based on Mahé. Available on WhatsApp."* | About, contact, trust strips |
| *"90+ PageSpeed. Every time."* | Services, About trust strip |
| *"Priced in SCR. No foreign invoices, no hidden fees."* | About trust strip, pricing |
| *"The person who builds your site is the person you speak to."* | About, contact |
| *"A website that works as hard as you do."* | About headline variation |

---

## 4. Photography & Imagery Direction

### Current Assets

- **Studio photo:** `/public/studio-desktop.webp` and `/public/studio-mobile.webp` — Eden Island, Mahé — used on About page
- **Project screenshots:** `/src/assets/work/` — per project folder, `.png`, `.jpg`, `.webp` variants

### Direction for New Assets

- **Style:** Natural light, genuine Seychelles environments (not stock photos of generic offices or beaches)
- **Subject:** Real work — laptop screens with actual project screenshots, desk setups, local context
- **Mood:** Smart, professional, but grounded — not slick corporate photography
- **Dark surfaces preferred** where controllable — aligns with brand palette
- **Animated mockups:** Use Animockup + GoFullPage workflow (agreed) — see Outstanding Items in `02-sitemap-analysis.md`

### Illustration / UI Animations (In-Code)

All illustrations are built directly in JSX/CSS — no external illustration library:
- Before/After layout comparison — CSS positioned divs
- Phone scroll animation — CSS keyframes
- Search result visual — HTML mock of Google result
- Performance ring — SVG with CSS dash-offset animation
- Laptop mockup — pure CSS/HTML 3D transform (no image — built in Work.tsx)

---

## 5. Component Design Rules

### Cards

- **Default card:** `rounded-2xl border border-white/5 bg-[#1A1A1C]`
- **Hover state:** `hover:!border-[#00E5FF] hover:shadow-[0_0_12px_rgba(0,229,255,0.3)]`
- **Top highlight bar on hover:** `absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-cyan to-transparent opacity-0 transition-opacity group-hover:opacity-100`
- **Featured card (Starter package):** Additional `shadow-[0_0_30px_rgba(0,229,255,0.15)]` and `-translate-y-4` elevation

### Section Layout

All sections use `max-w-7xl mx-auto px-6` or `px-5 sm:px-8` as the container.  
Full-bleed elements use the `-mx-[50vw]` trick to break out of the container width.

### CTAs — Primary

```html
<!-- Animated gradient pill -->
<button class="px-8 py-4 sm:px-12 sm:py-5 text-black rounded-full font-black uppercase tracking-[0.2em] text-xs sm:text-sm cta-gradient-anim shadow-[0_0_40px_rgba(0,229,255,0.5)]"
  style="background: linear-gradient(90deg, #00E5FF, #38B2F5, #0C7CC4, #00E5FF); background-size: 300% 100%;">
  Get Started
</button>
```

### CTAs — Secondary (text-link style)

```html
<a class="text-sm font-bold uppercase tracking-widest text-cyan hover:text-white transition-colors underline decoration-cyan/30 underline-offset-8">
  See the full portfolio →
</a>
```

### Eyebrow Labels

```html
<span class="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-deep-teal section-eyebrow-glow">
  Eyebrow Text
</span>
```

---

## 6. Brand Don'ts — Absolute Rules

1. ❌ **Never use a light/white background** — dark mode only
2. ❌ **Never use a template screenshot** as portfolio evidence — only real or purpose-built demos
3. ❌ **Never show unverified statistics** as fact — flag and remove before launch
4. ❌ **Never use testimonials that aren't from real, named clients** 
5. ❌ **Never use generic stock photography** of beaches, handshakes, or laptops in coffee shops
6. ❌ **Never replace WhatsApp as the primary CTA** — it must be first
7. ❌ **Never use USD or EUR pricing** in client-facing copy — always SCR
8. ❌ **Never describe Horizon Digital as a "team"** unless the studio genuinely grows — it's currently a solo studio

---

*→ Next: Read [`02-sitemap-analysis.md`](./02-sitemap-analysis.md) for the full site structure analysis.*
