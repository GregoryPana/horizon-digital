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
        title="Structured delivery from start to launch"
        description="Clear milestones, reliable communication, and growth-focused execution."
      >
        <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <Card key={step.title}>
              <p className="text-xs uppercase tracking-[0.4em] text-accent">Step {index + 1}</p>
              <h3 className="mt-3 text-lg font-semibold text-text">{step.title}</h3>
              <p className="mt-3 text-sm text-text-muted">{step.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <section className="bg-bg-elev">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-10 px-8 py-28 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-accent">Next step</p>
            <h2 className="mt-3 text-3xl font-semibold text-text md:text-4xl">
              Let's plan the structure, timeline, and goals.
            </h2>
          </div>
          <Link to="/contact">
            <ShimmerButton
              shimmerColor="#0b1212"
              shimmerDuration="4.2s"
              background="linear-gradient(135deg, rgba(34,241,214,0.95), rgba(34,241,214,0.7))"
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
