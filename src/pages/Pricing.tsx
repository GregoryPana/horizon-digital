import Card from "../components/Card";
import Section from "../components/Section";
import Seo from "../components/Seo";
import {
  addOnItems,
  carePlanNotes,
  carePlans,
  customPackage,
  growthPackage,
  hostingPlan,
  projectSteps,
  servicesPricingIntro,
  starterPackage,
  stabilisationPlan,
  trustStatement,
} from "../data/site";
import { ShimmerButton } from "../components/ui/shimmer-button";
import { Link } from "react-router-dom";

export default function Pricing() {
  return (
    <div>
      <h1 className="sr-only">Services & Pricing</h1>
      <Seo
        title="Services & Pricing"
        description="Clear packages, add-ons, hosting, and care plans for Seychelles businesses."
        path="/services-pricing"
        keywords="website pricing Seychelles"
      />
      <Section
        eyebrow="Services & Pricing"
        title={servicesPricingIntro.title}
        description={servicesPricingIntro.subtitle}
      >
        <p className="text-sm text-text-muted">{servicesPricingIntro.summary}</p>
      </Section>

      <Section
        eyebrow="How it works"
        title="How your project works"
        description="A simple, structured process from start to launch."
      >
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {projectSteps.map((step, index) => (
            <Card key={step.title}>
              <p className="text-xs uppercase tracking-[0.4em] text-accent">Step {index + 1}</p>
              <h3 className="mt-3 text-lg font-semibold text-text">{step.title}</h3>
              <p className="mt-3 text-sm text-text-muted">{step.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Packages"
        title="Choose the right package"
        description="Starter, Growth, and Custom side by side for a clear comparison."
      >
        <div className="grid items-stretch gap-8 lg:grid-cols-3">
          <Card className="flex h-full flex-col pricing-pop pricing-pop-soft">
            <h3 className="text-lg font-semibold text-accent-2">{starterPackage.title}</h3>
            <p className="mt-4 text-2xl font-semibold text-accent">{starterPackage.price}</p>
            <p className="mt-3 text-sm text-text-muted">{starterPackage.description}</p>
            <div className="mt-6 space-y-3 text-sm text-text-muted md:min-h-[420px] lg:min-h-[440px]">
              <ul className="space-y-3">
                {starterPackage.includes.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Payment terms</p>
              <ul className="mt-4 space-y-2 text-sm text-text-muted">
                {starterPackage.paymentTerms.map((term) => (
                  <li key={term}>{term}</li>
                ))}
              </ul>
            </div>
            <div className="mt-auto pt-8">
              <Link to="/contact">
                <ShimmerButton
                  shimmerColor="#0b1212"
                  shimmerDuration="4.2s"
                  background="linear-gradient(135deg, rgba(34,241,214,0.95), rgba(34,241,214,0.7))"
                  className="px-5 py-2 text-xs font-semibold tracking-[0.12em] text-black"
                >
                  Discuss your project
                </ShimmerButton>
              </Link>
            </div>
          </Card>

          <Card className="relative flex h-full flex-col pricing-pop pricing-pop-strong">
            <span className="absolute -top-3 left-6 rounded-full border border-accent/40 bg-bg px-3 py-1 text-[0.65rem] uppercase tracking-[0.28em] text-accent">
              Most popular
            </span>
            <h3 className="text-lg font-semibold text-accent-2">{growthPackage.title}</h3>
            <p className="mt-4 text-2xl font-semibold text-accent">{growthPackage.price}</p>
            <p className="mt-3 text-sm text-text-muted">{growthPackage.description}</p>
            <div className="mt-6 space-y-3 text-sm text-text-muted md:min-h-[420px] lg:min-h-[440px]">
              <p>Includes everything in Starter, plus:</p>
              <ul className="space-y-3">
                {growthPackage.includes.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Payment terms</p>
              <ul className="mt-4 space-y-2 text-sm text-text-muted">
                {growthPackage.paymentTerms.map((term) => (
                  <li key={term}>{term}</li>
                ))}
              </ul>
            </div>
            <div className="mt-auto pt-8">
              <Link to="/contact">
                <ShimmerButton
                  shimmerColor="#0b1212"
                  shimmerDuration="4.2s"
                  background="linear-gradient(135deg, rgba(34,241,214,0.95), rgba(34,241,214,0.7))"
                  className="px-5 py-2 text-xs font-semibold tracking-[0.12em] text-black"
                >
                  Discuss your project
                </ShimmerButton>
              </Link>
            </div>
          </Card>

          <Card className="flex h-full flex-col pricing-pop pricing-pop-soft">
            <h3 className="text-lg font-semibold text-accent-2">{customPackage.title}</h3>
            <p className="mt-4 text-2xl font-semibold text-accent">Let's chat</p>
            <p className="mt-3 text-sm text-text-muted">{customPackage.description}</p>
            <p className="mt-4 text-sm text-text-muted">
              Advanced builds are scoped per project. We will clarify your requirements, then
              provide a clear proposal and timeline.
            </p>
            <div className="mt-auto pt-8">
              <Link to="/contact">
                <ShimmerButton
                  shimmerColor="#0b1212"
                  shimmerDuration="4.2s"
                  background="linear-gradient(135deg, rgba(34,241,214,0.95), rgba(34,241,214,0.7))"
                  className="px-5 py-2 text-xs font-semibold tracking-[0.12em] text-black"
                >
                  Request a custom scope
                </ShimmerButton>
              </Link>
            </div>
          </Card>
        </div>
      </Section>

      <Section
        eyebrow="Add-ons"
        title="Optional add-ons"
        description="All add-ons are clearly scoped before work begins."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {addOnItems.map((item) => (
            <Card key={item.title}>
              <h3 className="text-base font-semibold text-accent-2">{item.title}</h3>
              <p className="mt-3 text-sm text-accent">{item.price}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Managed hosting"
        title={hostingPlan.title}
        description="Hosting that keeps your site secure and stable."
      >
        <Card className="pricing-pop pricing-pop-soft">
          <p className="text-2xl font-semibold text-accent">{hostingPlan.price}</p>
          <ul className="mt-6 grid gap-4 text-sm text-text-muted sm:grid-cols-2">
            {hostingPlan.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                {feature}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-text-muted">{hostingPlan.note}</p>
        </Card>
      </Section>

      <Section
        eyebrow="Stabilisation"
        title={stabilisationPlan.title}
        description="Included with every website build."
      >
        <Card>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Covers</p>
              <ul className="mt-4 space-y-3 text-sm text-text-muted">
                {stabilisationPlan.covers.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Does not cover</p>
              <ul className="mt-4 space-y-3 text-sm text-text-muted">
                {stabilisationPlan.excludes.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-border" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </Section>

      <Section
        eyebrow="Ongoing care"
        title="Ongoing Care Plans"
        description="Care plans help keep your website secure and gradually improving over time."
      >
        <div className="grid gap-10 lg:grid-cols-3">
          {carePlans.map((plan) => (
            <Card key={plan.title} className="pricing-pop pricing-pop-soft">
              <h3 className="text-lg font-semibold text-accent-2">{plan.title}</h3>
              <p className="mt-4 text-2xl font-semibold text-accent">{plan.price}</p>
              <ul className="mt-6 space-y-3 text-sm text-text-muted">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
              {plan.note && <p className="mt-6 text-sm text-text-muted">{plan.note}</p>}
            </Card>
          ))}
        </div>
        <div className="mt-8 text-sm text-text-muted">
          {carePlanNotes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Ad-hoc support"
        title="Ad-hoc Support"
        description="For clients not on a care plan."
      >
        <Card className="pricing-pop pricing-pop-soft">
          <p className="text-2xl font-semibold text-accent">SCR 1,200 per hour</p>
          <ul className="mt-6 space-y-3 text-sm text-text-muted">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-accent" />
              Available for clients not on a care plan
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-accent" />
              All work scoped and approved before starting
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-accent" />
              Subject to scheduling availability
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-accent" />
              Care plan clients receive priority scheduling
            </li>
          </ul>
        </Card>
      </Section>

      <Section
        eyebrow="Trust"
        title="Clear scope. Clear outcomes."
        description="We keep everything transparent from day one."
      >
        <Card>
          <ul className="grid gap-4 text-sm text-text-muted sm:grid-cols-2">
            {trustStatement.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </Section>

      <section className="bg-bg-elev">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-10 px-8 py-28 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-accent">Next step</p>
            <h2 className="mt-3 text-3xl font-semibold text-text md:text-4xl">
              Ready to start? Let's define your scope.
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
