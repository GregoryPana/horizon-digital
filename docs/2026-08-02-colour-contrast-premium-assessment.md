# Horizon Digital colour and contrast assessment

**Date:** 2026-08-02
**Scope:** current local website source and rendered homepage
**Status:** assessment, bounded contrast repair and homepage-only neutral prototype implemented locally; sitewide migration remains unapproved

## Executive verdict

A more neutral, black-and-white-led system would likely make Horizon Digital feel **more premium, calmer and more intentional**. The strongest direction is not literal `#000` and `#fff` on every surface. It is a controlled **ink / paper / brand-signal** system:

- near-black and true black for the dominant dark canvas;
- soft white and paper-white for light reading sections;
- neutral greys for hierarchy;
- Horizon cyan and green reserved for the logo, motion, selected highlights, key states and primary conversion moments;
- WhatsApp green retained only for WhatsApp.

This would make the brand colours feel more valuable because they would no longer compete with teal-tinted backgrounds, cyan glows and green gradients across most sections.

## Evidence from the current source

Across 107 production `.css`, `.tsx` and `.ts` files, the audit found:

- 576 hex-colour occurrences;
- 278 unique case-normalised hex colours;
- 576 `rgb()` / `rgba()` occurrences;
- 402 unique RGB/RGBA expressions.

The homepage currently moves through several distinct surface families:

- near-black root canvas;
- mint-tinted light sections;
- lagoon-teal process section;
- blue-green pricing section;
- teal final CTA;
- bright teal trust ribbon;
- multiple cyan/emerald ambient blobs and gradients.

Each section can look attractive in isolation, but the combined effect is more colourful and atmospheric than restrained and premium. The pricing section is currently the strongest dark composition because it has clearer hierarchy and concentrates colour around the featured package.

## Current contrast findings

Representative authored token ratios:

| Pair | Ratio | Result |
|---|---:|---|
| Root text `#f1f5f7` / root `#090b0d` | 17.97:1 | AAA |
| Root muted `#a3b0b8` / root | 8.88:1 | AAA |
| Root dim `#71808a` / root | 4.84:1 | AA |
| Light text `#10262b` / `#eef7f5` | 14.43:1 | AAA |
| Light muted `#486268` / `#eef7f5` | 5.98:1 | AA |
| Previous light dim `#688087` / `#eef7f5` | 3.83:1 | Fail for normal text |
| Lagoon muted `#bfdbdd` / `#12333a` | 9.22:1 | AAA |
| Pricing muted `#aec5ca` / `#0b1c22` | 9.67:1 | AAA |
| Previous Insights dim `#5c6b7a` / black | 3.84:1 | Fail for normal text |

Bounded fixes applied during this assessment:

- light-section dim text changed to `#587179` — **4.75:1**;
- Insights dim text changed to `#71808A` — **5.05:1** against black;
- tiny service-animation labels changed from `#5C6B7A` to `#8292A2` for stronger legibility;
- automated WCAG-AA regression tests added for the two scoped text tokens.

## Recommended premium palette

### Neutral foundations

| Role | Proposed token |
|---|---|
| True black | `#000000` |
| Main dark canvas | `#050505` |
| Raised dark surface | `#0E0E0F` |
| Dark border | `rgba(255,255,255,.10)` |
| Light paper canvas | `#FAFAF8` |
| Raised light surface | `#FFFFFF` |
| Light border | `rgba(10,10,10,.12)` |
| Primary text on dark | `#F7F7F5` |
| Secondary text on dark | `#B6B8BB` |
| Primary text on light | `#111111` |
| Secondary text on light | `#565A5E` |

### Brand signals to retain

- Horizon cyan: `#58D5E3`
- Horizon green: `#36BDA9`
- Focus cyan: retain a brighter accessible focus token
- WhatsApp: `#25D366`, only for WhatsApp affordances

Use brand colour for:

- the logo and wordmark details;
- representational SVG animation stages;
- selected words or short heading accents;
- focus rings, checks and active states;
- the featured pricing tier and primary CTA;
- restrained hover feedback.

Avoid using brand colour as the default background of every major section.

## Recommended rollout

1. **Pilot the homepage only — implemented locally.** Section backgrounds now use the neutral foundation while preserving current content and motion.
2. Keep one light paper section for rhythm rather than alternating several tinted families.
3. Make pricing neutral-black; retain cyan/green only on Starter emphasis and controls.
4. Replace ambient cyan/green blobs with much subtler neutral luminance unless they explain motion.
5. Consolidate hard-coded colours into semantic tokens before extending the treatment to other routes.
6. Verify every normal-text token at 4.5:1 or better and every large/display text token at 3:1 or better.
7. Compare current and neutral-led homepage screenshots before adopting the migration sitewide.

## Recommendation

**The homepage neutral-palette prototype is now implemented locally; do not perform an immediate sitewide replacement.** The result uses approximately 80–90% neutral surface/typography and 10–20% brand signal. Browser inspection shows stronger pricing hierarchy, more prominent project imagery and calmer process/CTA sections without losing Horizon Digital’s Seychelles identity. Owner comparison remains the gate before extending this system to other routes.
