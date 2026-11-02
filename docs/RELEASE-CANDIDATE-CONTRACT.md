# Editorial release candidate contract

## Authority and scope

Owner instruction: work on the changes needed before the selected homepage can become live, including cross-page consistency. Local implementation only. No deployment, remote write, commit, push, DNS, production configuration or analytics-ID changes.

Workspace: `/home/gpanagary/projects/horizon-digital-release-candidate`, isolated hash-checked copy of the dirty original, not a Git checkout. Original `/home/gpanagary/projects/horizon-digital-home-headline` remains read-only. Reference `/home/gpanagary/projects/horizon-digital-template-track/review-v13b-stability-dist` is immutable. Do not modify any AGENTS.md. Existing source-copy receipt and baseline logs are in `docs/release-evidence/`.

The accepted v13b editorial prototype governs homepage composition, original title/scroll/hover choreography, rounded chapters, meaningful owned-screen hero, Satoshi/Switzer fonts, charcoal/cyan/teal palette, asymmetrical work and service cards. This supersedes older homepage-only visual restrictions in the copied DESIGN.md and continuation notes for THIS isolated track. Existing app and businessFacts.json govern routes, services, pricing, legal terms, analytics, consent and functional contact behaviour. Drake is client work; Auto and Forma are concepts. Support periods are 30/45/60 days. Preserve template LICENSE and provenance; optional visible attribution is not required.

## Integration contract

- Real React route integration, never proxying the original app, never iframe-hosting the agency homepage.
- A single shared site header and footer. New optional files `src/components/EditorialNavbar.tsx` and `src/components/EditorialFooter.tsx`; export default components without required props. Parent integrates them into Layout. No duplicate header/footer inside Home.
- Homepage mounted inside Layout's existing main landmark. Preserve exactly one visible H1; no nested main. Trusted local HTML is acceptable if deterministic and lifecycle-owned, not runtime fetched from a parallel server. Prefer normal React modules where practical.
- Full SPA home→other-route→home, Back, hash and unmount cleanup: no leaked ScrollTriggers, listeners, native clocks, Lenis or modal state. Keep scope/lifecycle ownership explicit. Root relative links; no localhost dependencies.
- Header must preserve literal shared-clock forward/reverse animation, fixed blurred backdrop, inert/scroll isolation until closing completes, stable opener footprint, independently scrolling menu and bottom-reach CTA. Rapid reversal, short landscape, focus containment and same-route actions must work. All existing top-level/service-family destinations remain discoverable. FAQ can link to /#faq. Main destinations use the existing app registry and governed names.
- Homepage atmosphere remains accepted. Functional pages inherit restrained tokens, rounded panels, type and shared controls, not oversized homepage titles or heavy ambient scenes. Services, Work, Pricing priority; Contact behaviour stays protected; About/Insights light alignment and About duplicate H1 correction are in scope.
- Preserve independent fictional showcases' own visual systems, route metadata and isolation.
- SEO remains controlled by existing route registry/SEO components/Worker. Do not copy prototype noindex or drop canonical/structured data. Genuine local edge statuses, canonical redirects, indexability and hydrated metadata must be tested, not inferred from Vite.

## Work ownership

- Homepage integrator: `src/pages/Home.tsx`, NEW `src/components/editorial-home/**`, `public/editorial-home/**`, `scripts/*editorial-home*`, and NEW homepage-specific test files. Do not edit Layout, header/footer, global index.css, package files, route registry or other pages.
- Shared-shell/page-parity implementer: NEW EditorialNavbar.tsx, EditorialFooter.tsx, NEW `src/styles/editorial-system.css` (parent imports it), About.tsx duplicate H1 fix and NEW shell-specific test files. No Layout, Home, package files, route registry or other route edits. Use scoped `.editorial-site` class on Layout's outer wrapper (parent adds) and `.editorial-standard-page` on main for non-home/non-showcase routes (parent adds). Avoid generic resets leaking into showcase pages. Header/footer use `.editorial-*` names to avoid homepage CSS collisions.
- Parent owns Layout wiring, integration, actual runtime/browser regressions, technical release gates, dependency assessment, and reports.

## Tests before acceptance

1. Baseline npm ci, npm test and npm run build (already executed successfully; npm audit reports findings separately).
2. Focused integration/shell contract tests; full test/build/drift after integration.
3. Normal/reduced Chromium and Firefox at desktop, tablet, phone and short-landscape for representative shell/home states; key routes desktop/phone. Verify exact route, visible H1, no horizontal overflow, actual fonts, decode required displayed media, console/network, CTA/menu/focus.
4. Actual SPA journeys including repeated home remounts, service selection, work/concept links, pricing→contact prefill, invalid form and no-send/mock transport success/failure. Never send real leads or alter production storage.
5. Production-build local edge raw/hydrated metadata, redirects, unknown 404 and safe endpoint/consent behaviour. Performance measured separately without concurrent heavy browser work.
6. Independent source/spec review and final owner review are distinct from test passes. Deployment/real production delivery cannot be claimed by local tests.

## Design route

Website transformation + Horizon premium websites; accepted template, not new reference exploration. Extract original editorial rhythm and reversible shell; adapt common tokens/navigation to functional routes; reject giant homepage choreography on forms/decision pages. GSAP lifecycle ownership and interface polish required. Frontend quality gate required. Inherited Lucide is a documented legacy exception outside this slice, not a new mixed icon migration.

## Status

Workspace/baseline: verified. Integration, parity and release checks: in progress. Owner review and publication: not granted.
