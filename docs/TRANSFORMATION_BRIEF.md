# Horizon Digital Transformation Brief

## Authority and purpose

This is the local-only transformation workspace for Horizon Digital. The aim is to improve premium visual quality, information flow, credible copy, conversion reliability, technical/local SEO, accessibility and performance while preserving the established dark Tropical Precision brand.

No session in this workspace may push, deploy, change DNS/Cloudflare production configuration, publish public copy, or alter production analytics IDs without Gregory's separate approval.

## Baselines

- Production-source baseline: `origin/main@6e1a2ed`.
- Transformation branch: `transformation/local-redesign`.
- Preserved local source snapshot: `baseline/source-sanity-aa5f418`.
- Live comparison: `https://horizondigitalsey.com/`.
- Audit evidence: `/mnt/c/Users/gpanagary/Hermes Knowledge Vault/04 - Projects/Horizon Digital/Horizon Digital - Website Design Content and SEO Audit Checklist.md`.

## Design read

Reading this as: **a premium Seychelles service-business website for local owners and operators, with a dark tropical-technical language, editorial hierarchy and restrained motion rather than a generic SaaS or effects showcase.**

## Design route

- Domain/product skill: Horizon Digital premium website.
- Visual direction: established Tropical Precision; refine rather than replace.
- Component/craft route: Impeccable frontend craft plus existing React/Tailwind primitives.
- Motion: CSS/restraint by default; retain GSAP/Framer only where motion improves orientation or meaning.
- Interface polish: required after architecture/content foundations.
- Final verification: frontend design quality gate with build, responsive browser, console, accessibility and screenshot evidence.

## Non-negotiable business rules

- Dark-mode Tropical Precision identity remains.
- SCR pricing and Seychelles/Mahé relevance remain.
- WhatsApp remains a high-value conversion path.
- Custom-code/no-template positioning remains where truthful.
- Never invent testimonials, clients, awards, rankings, metrics, case studies or logos.
- Classify every portfolio item as real client work, concept, demo or internal showcase.
- Remove or qualify claims that Horizon cannot directly guarantee.
- Do not publish a private address merely to fill LocalBusiness schema.
- Do not expose tokens or secret-like values in client bundles.

## Confirmed baseline defects to address

1. Unknown routes receive HTTP 200/indexable app-shell responses instead of genuine 404s.
2. `/pricing` and `/services-pricing` both resolve; one canonical route and a permanent redirect are required.
3. Route knowledge is duplicated across React routing, Worker logic, sitemap and metadata.
4. Raw route HTML is generic; per-route title/description/canonical/schema depend on hydration.
5. Live JSON-LD was not observed on tested pages.
6. Primary desktop consultation CTA clips at a 1280px viewport.
7. Pricing exposes two H1 elements.
8. Primary contact submission is `mailto:` rather than a verifiable server endpoint.
9. Public PageSpeed/ranking/booking and portfolio metrics lack sufficient visible evidence.
10. Homepage is overlong and repeats substantial services/process/pricing content.
11. Heavy animation/canvas/media increase performance and motion risk.
12. `www` returns 522; document as a deployment prerequisite but do not change DNS locally.
13. Legal/privacy coverage is incomplete for analytics, forms and chat.

## Product outcome

The transformed local site should:

- communicate what Horizon does, for whom and why local buyers should care in the first viewport;
- use one dominant CTA and a quieter secondary path;
- move trustworthy proof closer to the proposition;
- preview rather than duplicate dedicated pages on the homepage;
- provide accurate, server-visible route metadata and status behaviour;
- expose truthful structured data matching visible content;
- remain responsive, keyboard usable and reduced-motion safe;
- substantially reduce unnecessary JavaScript, render work and oversized media;
- build and run locally with comparison screenshots and measurable bundle/performance evidence.

## Completion evidence

No session is complete from an agent summary alone. Hermes must independently verify the diff, build/tests, relevant HTTP responses, browser routes, console output and session acceptance checklist. Each session ends with an updated `docs/TRANSFORMATION_TRACKER.md` entry and a bounded next action.
