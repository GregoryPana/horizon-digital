import Button from "../components/Button";
import Card from "../components/Card";
import Section from "../components/Section";
import { pricingTiers } from "../data/site";
import { ShimmerButton } from "../components/ui/shimmer-button";
import { Link } from "react-router-dom";

export default function Pricing() {
  return (
    <div>
      <Section
        eyebrow="Pricing"
        title="Clear starting points with flexible scope"
        description="Each package scales with your content, goals, and functionality needs."
      >
        <div className="grid gap-10 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <Card key={tier.title}>
              <h3 className="text-lg font-semibold text-text">{tier.title}</h3>
              <p className="mt-5 text-2xl font-semibold text-text">{tier.price}</p>
              <p className="mt-3 text-sm text-text-muted">{tier.description}</p>
              <ul className="mt-7 space-y-4 text-sm text-text-muted">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button label="Start a scope" to="/contact" variant="outline" size="sm" className="mt-10" />
            </Card>
          ))}
        </div>
        <p className="mt-6 text-sm text-text-muted">Final pricing depends on scope.</p>
      </Section>

      <section className="bg-bg-elev">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-10 px-8 py-28 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-accent">Next step</p>
            <h2 className="mt-3 text-3xl font-semibold text-text md:text-4xl">
              Let's define the right package for your growth goals.
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
