# 02 — SITEMAP ANALYSIS

> **Historical April 2026 snapshot.** It does not describe current route or content state. Use `CONTENT_AUTHORITY.md`, `../src/config/routes.ts` and `TRANSFORMATION_TRACKER.md`. Do not ingest this document into the chatbot.
## Horizon Digital · Full Diff: Relume Original vs Revised Sitemap vs Live Codebase

**Version:** 1.0  
**Prepared:** April 2026  
**Part of:** [Project Context →](../docs/00-project-context.md)

> This document maps every page, section, and notable component across three sources: the original Relume sitemap, the revised sitemap (v2 blueprint), and the actual live codebase. Gaps, conflicts, and action items are flagged explicitly.

---

## Source Legend

| Symbol | Meaning |
|---|---|
| ✅ | Present and complete |
| ⚠️ | Present but needs attention / is placeholder |
| 🔴 | Missing — not implemented |
| 📌 | In revised plan but not in Relume original |
| 🗑️ | In Relume original / old plan but removed or reconsidered |

---

## 1. Route-Level Comparison

| Route | Relume Original | Revised Sitemap (v2) | Live Codebase (v1) | Action |
|---|---|---|---|---|
| `/` (Home) | ✅ | ✅ | ✅ | Redesign per v2 blueprint |
| `/work` | ✅ (as "Portfolio") | ✅ | ✅ | Evolve — add pending demos |
| `/services-pricing` | ✅ (as "Pricing") | ✅ | ✅ | Evolve layout |
| `/about` | 🗑️ Not in Relume | 📌 ✅ | ✅ | Keep — strong trust page |
| `/contact` | ✅ | ✅ | ✅ | Simplify, WhatsApp-first |
| `/what-you-need` | 🗑️ Not in Relume | 📌 ✅ | ✅ | Keep — educational value |
| `/ai-digital-tools` | 🗑️ Not in Relume | 📌 ✅ (as "Digital Insights") | ✅ | Keep — authority building |
| `/insights` | 🗑️ Not in Relume | 📌 ✅ | ✅ | Keep — SEO content hub |
| `/insights/:slug` | 🗑️ Not in Relume | 📌 ✅ | ✅ | Keep — individual articles |
| `/process` | ✅ (as "Process") | ⚠️ Not in main nav | ✅ Page exists | **Add to nav or footer** |
| `/showcase/takamaka-house` | 🗑️ Not in Relume | ✅ | ✅ | Keep |
| `/showcase/forma-studio` | 🗑️ Not in Relume | ✅ | ✅ | Keep |
| `/privacy` | 🔴 Noted as gap | 🔴 Noted as gap | 🔴 Missing | **HIGH PRIORITY — Build** |
| `/terms` | 🔴 Noted as gap | 🔴 Noted as gap | 🔴 Missing | **HIGH PRIORITY — Build** |
| Cookie notice | 🔴 Noted as gap | 🔴 Noted as gap | 🔴 Missing | **Add — GA is live** |

---

## 2. Home Page (`/`) — Section Diff

| Section | Relume Original | Revised Sitemap (v2) | Live Codebase (v1) | Match? |
|---|---|---|---|---|
| Hero Header | ✅ WhatsApp CTA | ✅ Primary: Get Started → /contact. Secondary: View Work | ✅ Matches v2 — WebGL shader, rotating words, 4 trust tags | ✅ |
| Identity Feature "No templates. No agencies." | ✅ | 🗑️ Merged into "How We're Different" section | ✅ Exists as "Difference" section | ✅ |
| Problem Section "Sound Familiar?" | 🗑️ Not in Relume | 📌 ✅ 3-card grid | ✅ Live — animated icons, mobile carousel | ✅ |
| Marquee / Banner Strip | 🗑️ Not in Relume | 📌 ✅ | ✅ Live — desktop only | ✅ |
| Services Section | ✅ "Features List" — 3 pillars | ✅ 4-card grid | ✅ Live — 4 animated cards, mobile carousel | ✅ |
| Difference Section | ✅ | ✅ | ✅ Live — 3-paragraph statement panel with glow | ✅ |
| Process Section | ✅ "4-Stage Timeline" | ✅ 5-column steps | ✅ Live — 5 steps, desktop grid / mobile: link to /process | ✅ |
| Work Showcase | ✅ "Portfolio List" | ✅ 3-project sticky scroll | ✅ Live — 3 projects, sticky background scroll | ✅ |
| Stats Grid | ✅ "Stats Grid" | 🗑️ Removed — stats are unverified | ⚠️ Stats exist (340%, 3 weeks) — PLACEHOLDER | ⚠️ Remove before launch |
| Testimonials | ✅ "Testimonials" | 🗑️ Removed — not yet verified | 🔴 Not present | ✅ |
| Packages Section | ✅ "Pricing Preview" | ✅ 4-column cards | ✅ Live — 4 cards (Foundation/Starter/Growth/Custom) | ✅ |
| Insights Strip | 🗑️ Not in Relume | 📌 ✅ "Stay in the know" | 🔴 Not present | 🔴 **Add in v2** |
| FAQ Section | ✅ | ✅ Tabbed accordion | ✅ Live — tabbed (4 categories) | ✅ |
| Final CTA Banner | ✅ "WhatsApp CTA" | ✅ "Let us build something you are proud of" | ✅ Exists — check content matches | ⚠️ Content review |
| Email Form | ✅ "Secondary CTA" | 🗑️ Not on homepage — moved to /contact only | ⚠️ Unknown — check code | Review |

**Summary:** Home page v1 is very close to the v2 revised plan. Key additions needed: **Insights Strip**, removal of placeholder stats, and final CTA content review.

---

## 3. Work Page (`/work`) — Section Diff

| Section | Relume Original | Revised Sitemap (v2) | Live Codebase (v1) | Match? |
|---|---|---|---|---|
| Hero Header | ✅ | ✅ "Real work, real businesses" | ✅ Live — matches exactly | ✅ |
| Portfolio Projects | ✅ "Sorted by niche" | ✅ Alternating full-width layout | ✅ GSAP cinematic scroll — 4 projects | ✅ |
| Project Testimonials | ✅ | 🗑️ Removed | 🔴 Not present | ✅ |
| Industry FAQ | ✅ | 🗑️ Removed | 🔴 Not present | ✅ |
| Philosophy CTA | 🗑️ Not in Relume | 📌 "What we believe" | ✅ Live — matches v2 | ✅ |
| Project sub-pages | ✅ Deep case study template | 🗑️ Not in v2 (kept as showcases) | ✅ Showcase iframes only | Partial |

**Outstanding:** Pending portfolio additions — Depths Dive Centre + LUMINE wellness — not yet in Work page. Animated mockup video (Animockup) for Drake Seaside agreed but not fully implemented.

---

## 4. Services & Pricing Page (`/services-pricing`) — Section Diff

| Section | Relume Original | Revised Sitemap (v2) | Live Codebase (v1) | Match? |
|---|---|---|---|---|
| Header / Overview | ✅ "Transparent Pricing" | ✅ "What we do" | ✅ Live — "Websites that work for your business" | ✅ |
| Process | ✅ | ✅ 5-step | ✅ Live — 5 steps with scroll animation | ✅ |
| Packages / Tier Selector | ✅ | ✅ 4 tiers + custom | ✅ Live — Foundation/Starter/Growth/Custom | ✅ |
| Comparison Matrix | ✅ "Side-by-side table" | 🗑️ Not in v2 | 🔴 Not present | Consider adding |
| Hosting | 🗑️ Not in Relume | 📌 ✅ SCR 2,500/year | ✅ Live | ✅ |
| Add-ons | 🗑️ Not in Relume | 📌 ✅ 5 add-on items | ✅ Live — 5 items | ✅ |
| After Launch / Stabilisation | 🗑️ Not in Relume | 📌 ✅ | ✅ Live — covers/excludes panel | ✅ |
| Visibility / SEO | 🗑️ Not in Relume | 📌 ✅ | ✅ Live | ✅ |
| Payment Terms | 🗑️ Not in Relume | ✅ Split payment detail | ⚠️ Not visible in code — in data? | Check |
| Pricing FAQ | ✅ | ✅ | ✅ Live — 4 FAQ cards | ✅ |
| Final CTA | ✅ | ✅ "Not sure which package fits?" | ✅ Live — gradient CTA button | ✅ |
| Sticky Side Nav | 🗑️ Not in Relume | ✅ | ✅ Live — desktop vertical nav + mobile rail | ✅ |

---

## 5. About Page (`/about`) — Section Diff

| Section | Relume Original | Revised Sitemap (v2) | Live Codebase (v1) | Match? |
|---|---|---|---|---|
| — | 🗑️ Not in Relume | ✅ Full page spec | ✅ Live — 6 sections | ✅ |
| Opening / Person | — | ✅ Studio photo + 3 paragraphs + trust tags | ✅ Live — matches | ✅ |
| Local Difference | — | ✅ 2-column comparison | ✅ Live — matches | ✅ |
| How We Work (Beliefs) | — | ✅ 4 beliefs | ✅ Live — 4 numbered beliefs | ✅ |
| Portfolio Evidence | — | ✅ 3 project cards | ✅ Live — 3 cards (Drake/Takamaka/Forma) | ✅ |
| Specificity Strip | — | ✅ 4-column trust strip | ✅ Live — matches | ✅ |
| Closing CTA | — | ✅ WhatsApp primary + form link | ✅ Live — WhatsApp button + form link | ✅ |

---

## 6. Contact Page (`/contact`) — Section Diff

| Section | Relume Original | Revised Sitemap (v2) | Live Codebase (v1) | Match? |
|---|---|---|---|---|
| Header | ✅ | ✅ "Let's figure out the right website" | ✅ Live | ✅ |
| Contact Form | ✅ | ✅ 8 fields + budget selector | ✅ Live — check exact fields | Review |
| WhatsApp Primary CTA | ✅ | ✅ Prominent | ✅ Live | ✅ |
| Contact Details | ✅ Email / Phone | ✅ Email + Phone + WhatsApp | ✅ Live | ✅ |
| What Happens Next | 🗑️ Not in Relume | 📌 ✅ 4-step panel | ✅ Live? | Check |
| Locations / Mahé | ✅ | ✅ | ✅ Live? | Check |
| Trust Testimonial | ✅ | 🗑️ Removed | 🔴 Not present | ✅ |

---

## 7. Pages in v1 Not in Relume Original

These pages were created beyond the original Relume scope and are valuable additions:

| Page | Route | Value |
|---|---|---|
| What You Need | `/what-you-need` | Educational — reduces confusion about what websites involve |
| AI & Digital Tools | `/ai-digital-tools` | Authority — positions HD as informed on digital trends |
| Insights Hub | `/insights` | SEO content — builds long-term organic authority |
| Insight Articles | `/insights/:slug` | Individual article pages — 5 current articles |
| Showcase Pages | `/showcase/*` | Portfolio demos for non-live projects |
| About | `/about` | Personal trust — essential for solo studio |
| Process | `/process` | Explains workflow — exists but NOT in navigation |

---

## 8. Navigation Comparison

| Nav Item | Relume Original | Revised Sitemap (v2) Footer | Live Navbar (v1) |
|---|---|---|---|
| Home | ✅ | ✅ | ✅ |
| Services & Pricing | ✅ | ✅ | ✅ |
| Our Work | ✅ | ✅ | ✅ |
| What You Need | — | ✅ | ✅ |
| Digital Insights | — | ✅ | ✅ |
| About | — | ✅ | ✅ |
| Contact | ✅ | ✅ | ✅ |
| Process | ✅ | ⚠️ Not in main nav | ⚠️ Route exists — not in navLinks |
| Privacy Policy | — | ⚠️ "to be added" | 🔴 Missing |
| Terms of Use | — | ⚠️ "to be added" | 🔴 Missing |

**Current navLinks (source: `data/site.ts`):**
```
Home → /
Services & Pricing → /services-pricing
Our Work → /work
What You Need → /what-you-need
Digital Insights → /ai-digital-tools
About → /about
Contact → /contact
```

---

## 9. Flagged Action Items

All items below require a decision — what to action, what to defer, and what to remove.

### 🔴 CRITICAL — Legal Compliance

| Item | Issue | Recommendation |
|---|---|---|
| `/privacy` page | Missing — contact form collects personal data | Build before next marketing push |
| `/terms` page | Missing | Build alongside privacy |
| Cookie notice/banner | Missing — Google Analytics is active | Implement consent banner |

### ⚠️ CONTENT INTEGRITY — Remove or Verify Before Launch

| Item | Location | Issue |
|---|---|---|
| "340% enquiry increase" | Home.tsx `WorkShowcase` stats | Placeholder — not verified |
| "3 weeks first booking" | Home.tsx `WorkShowcase` stats | Placeholder — not verified |
| "85% direct bookings" | Home.tsx `WorkShowcase` stats | Placeholder — not verified |
| "4.9 guest rating" | Home.tsx `WorkShowcase` stats | Placeholder — not verified |
| "12x portfolio views" | Home.tsx `WorkShowcase` stats | Placeholder — not verified |
| "Featured — editorial style" | Home.tsx `WorkShowcase` stats | Placeholder — not verified |

**Decision needed:** Are any of these real? If yes, what evidence do we have? If no, remove them entirely.

### ⚠️ NAVIGATION — `/process` page not linked

The process page exists as a built React page but is not in the `navLinks` array in `data/site.ts` and therefore not reachable from the navigation. Options:
- Add to main nav (7th item — may crowd the nav)
- Add to footer nav
- Add as a link within the Services & Pricing page process section

### 📌 PORTFOLIO — Pending additions

| Demo | Status | Action |
|---|---|---|
| Depths Dive Centre | In development | Add to `/work` when finalised |
| LUMINE Wellness | In development | Add to `/work` when ready |
| Drake Seaside — animated mockup | Animockup + GoFullPage workflow agreed | Create and replace static image with video |

### 📌 New Section — Home Insights Strip

The revised sitemap v2 includes an "Insights Strip" on the home page (section 1.9 — "The digital world, explained simply") that does not exist in v1. This connects the home page to the `/insights` hub. Assess whether to add in v2 build.

---

## 10. Footer Structure Comparison

| Element | Relume | Revised v2 | Live v1 |
|---|---|---|---|
| Logo + descriptor | ✅ | ✅ | ✅ (check) |
| Navigation links | ✅ | ✅ 6 main links | ✅ (check) |
| Insights links | 🗑️ | 📌 ✅ | Unknown |
| Contact details | ✅ | ✅ WhatsApp + Email + Location | ✅ (check) |
| Copyright | — | ✅ | ✅ (check) |
| Privacy Policy link | 🔴 | 🔴 "to be added" | 🔴 Missing |
| Terms of Use link | 🔴 | 🔴 "to be added" | 🔴 Missing |

---

*→ Next: Read [`03-component-map.md`](./03-component-map.md) for per-page component breakdown with animation details.*
