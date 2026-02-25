import Card from "../components/Card";
import Section from "../components/Section";
import { processSteps } from "../data/site";
import { ShimmerButton } from "../components/ui/shimmer-button";
import { Link } from "react-router-dom";

export default function Process() {
  return (
    <div>
      <Section
        eyebrow="Process"
        title="Clear delivery from start to launch"
        description="Clear milestones, reliable communication, and steady progress."
      >
        <p className="text-sm text-text-muted">No surprises. Clear timelines. Defined milestones.</p>
        <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <Card key={step.title}>
              <p className="text-xs uppercase tracking-[0.4em] text-accent">Step {index + 1}</p>
              <h3 className="mt-3 text-lg font-semibold text-text">{step.title}</h3>
              <p className="mt-3 text-sm text-text-muted">{step.description}</p>
            </Card>
          ))}
        </div>
        <p className="mt-10 text-sm text-text-muted">
          Most projects complete within 2-6 weeks depending on scope.
        </p>
      </Section>

      <Section
        eyebrow="Communication"
        title="How communication works"
        description="Direct, clear, and structured from start to finish."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {[
            "Weekly progress updates",
            "Clear milestone approvals",
            "Direct access — no middle layers",
            "Transparent pricing adjustments",
          ].map((item) => (
            <Card key={item}>
              <p className="text-sm text-text-muted">{item}</p>
            </Card>
          ))}
        </div>
      </Section>

      <section className="bg-bg-elev">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-10 px-8 py-28 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-accent">Next step</p>
            <h2 className="mt-3 text-3xl font-semibold text-text md:text-4xl">
              Ready to start? Let's define your roadmap.
            </h2>
          </div>
          <Link to="/contact">
            <ShimmerButton
              shimmerColor="#0b1212"
              shimmerDuration="4.2s"
              background="#22f1d6"
              className="px-7 py-3.5 text-base font-semibold tracking-[0.08em] text-black"
            >
              Book a free consult
            </ShimmerButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
