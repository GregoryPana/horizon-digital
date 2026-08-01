# Horizon Digital service visuals and mobile menu implementation

**Status:** Approved for local implementation on 2026-07-31  
**Repository:** `/home/gpanagary/projects/horizon-digital-services-rollout-20260730`  
**Release boundary:** Local only; no commit, push or deployment without Gregory's approval.

## Approved outcomes

1. Preserve the homepage hero and its custom rotating-word effect unchanged.
2. Replace the empty double-height Services website card with an intentional Website Build Atelier story; add smaller truthful SEO and Analytics stories.
3. Rebuild the Website Design comparison so the starting state is stripped-back and askew while the Horizon Digital outcome is aligned, detailed and premium.
4. Place comparison-section CTAs after the visual proof; keep hero CTAs.
5. Add representational icons, connectors and restrained motion to numbered service journeys.
6. Add an SEO Review Story that ends in priorities and separates advice from implementation without implying rankings.
7. Add an Analytics/Digital Presence story covering consent, measurement, verification, basic activity and client account ownership without invented outcomes.
8. Rework the compact menu as a smooth masked overlay: page remains behind it, logo never moves, and one fixed toggle morphs between menu and close in exactly the same position.

## Motion and visual rules

- One persistent focal object per story; observable changes in no more than five or six stages.
- Semantic copy remains HTML. Decorative art is `aria-hidden` and pointer-inert.
- Use inline SVG/DOM and existing project animation systems; no autoplay MP4 or heavy new dependency.
- Transform, opacity and stroke motion first; no continuous expensive filters.
- Mobile is simplified rather than scaled down.
- Reduced motion shows a meaningful final state with no autonomous animation.
- No fabricated proof, rankings, traffic, enquiries, bookings, sales, revenue, speed or launch claims.

## Acceptance gate

- Focused and full tests pass.
- Production build and generated-knowledge checks pass.
- Services, Website Design, SEO and Analytics inspected at mobile, tablet, short laptop and desktop widths.
- Mobile menu logo/toggle coordinates remain stable across open and closed states.
- Menu overlay does not visually replace the page frame and passes Escape, focus, body-lock, safe-area and short-viewport checks.
- Early, middle and final motion states inspected; reduced-motion state is complete and static.
- No horizontal overflow or JavaScript errors.
- Homepage hero strings and rendered composition remain unchanged.
