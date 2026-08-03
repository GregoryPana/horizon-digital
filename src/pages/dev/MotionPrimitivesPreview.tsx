import { ScrollRevealText } from "../../components/ui/ScrollRevealText";
import { CursorGlowPanel } from "../../components/ui/CursorGlowPanel";
import { FloatingCarousel } from "../../components/ui/FloatingCarousel";
import { LineDrawStat } from "../../components/ui/LineDrawStat";
import { MagneticButton } from "../../components/ui/MagneticButton";

/**
 * DEV-ONLY preview harness for the five Phase 2 motion primitives
 * (docs/plans/2026-08-01-site-wide-premium-redesign-plan.md). Not linked
 * from navigation, not part of STATIC_ROUTES/sitemap -- the route that
 * mounts this page in App.tsx is gated behind `import.meta.env.DEV` so it
 * never resolves in a production build. Placeholder copy/stats only.
 */
export default function MotionPrimitivesPreview() {
  return (
    <div className="min-h-[100dvh] bg-bg px-6 py-16 text-text sm:px-10">
      <div className="mx-auto max-w-3xl space-y-3 rounded-2xl border border-border bg-bg-panel p-5 text-sm text-text-muted">
        <strong className="text-text">Dev-only preview.</strong> Not linked from navigation, not
        part of the production route table, gated behind{" "}
        <code>import.meta.env.DEV</code>. Content shown is placeholder for visual/motion
        comparison only.
      </div>

      <section className="mx-auto mt-20 max-w-3xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-text-dim">
          1 -- ScrollRevealText
        </p>
        <ScrollRevealText
          as="h2"
          className="font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em]"
          text="Per-word reveal on scroll, one shot, never loops"
        />
      </section>

      <section className="mx-auto mt-20 max-w-3xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-text-dim">
          2 -- CursorGlowPanel
        </p>
        <CursorGlowPanel className="border border-border bg-bg-elev p-10">
          <p className="max-w-md text-lg text-text-muted">
            Move the pointer across this panel on a fine-pointer device -- the glow tracks it.
            On touch or reduced motion it holds a fixed, static position instead.
          </p>
        </CursorGlowPanel>
      </section>

      <section className="mx-auto mt-20 max-w-4xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-text-dim">
          3 -- FloatingCarousel
        </p>
        <FloatingCarousel label="Preview panels">
          {["Plan", "Design", "Build", "Test", "Live"].map((stage) => (
            <div
              key={stage}
              className="card flex h-64 items-center justify-center text-2xl font-display font-bold"
            >
              {stage}
            </div>
          ))}
        </FloatingCarousel>
      </section>

      <section className="mx-auto mt-20 grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-3">
        <p className="col-span-full font-mono text-xs uppercase tracking-[0.14em] text-text-dim">
          4 -- LineDrawStat
        </p>
        <LineDrawStat value="10+" label="Years combined experience" />
        <LineDrawStat value="100%" label="Custom-coded, no templates" />
        <LineDrawStat value="24h" label="Typical first-response time" />
      </section>

      <section className="mx-auto mt-20 max-w-3xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-text-dim">
          5 -- MagneticButton
        </p>
        <MagneticButton className="cta-primary rounded-full bg-accent px-8 py-4 text-base font-semibold text-bg">
          Request a free consult
        </MagneticButton>
      </section>
    </div>
  );
}
