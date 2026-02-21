import Button from "../components/Button";
import Card from "../components/Card";
import Section from "../components/Section";
import { adHocRate, hostingPlan, pricingTiers, stabilisationPeriod, supportPlans } from "../data/site";
import { ShimmerButton } from "../components/ui/shimmer-button";
import { Link } from "react-router-dom";

export default function Pricing() {
  return (
    <div>
      <Section
        eyebrow="Pricing"
        title="Clear pricing with no hidden extras"
        description="Website builds, hosting, and support are separate so you stay in control."
      >
        <div className="grid gap-10 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <Card key={tier.title} className="relative">
              {tier.badge && (
                <span className="absolute -top-3 left-6 rounded-full border border-accent/40 bg-bg px-3 py-1 text-[0.65rem] uppercase tracking-[0.28em] text-accent">
                  {tier.badge}
                </span>
              )}
              <h3 className="text-lg font-semibold text-accent-2">
                {tier.title}
              </h3>
              <p className="mt-5 text-2xl font-semibold text-accent">{tier.price}</p>
              {tier.priceNote && (
                <p className="mt-3 text-sm text-text-muted">{tier.priceNote}</p>
              )}
              <p className="mt-3 text-sm text-text-muted">{tier.description}</p>
              <ul className="mt-7 space-y-4 text-sm text-text-muted">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
              {tier.exclusions && tier.exclusions.length > 0 && (
                <div className="mt-7">
                  <p className="text-xs uppercase tracking-[0.3em] text-text-muted">
                    Available separately
                  </p>
                  <ul className="mt-4 space-y-3 text-sm text-text-muted">
                    {tier.exclusions.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-border" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <Button
                label="Discuss your project"
                to="/contact"
                variant="outline"
                size="sm"
                className="mt-10"
              />
            </Card>
          ))}
        </div>
        <p className="mt-6 text-sm text-text-muted">
          Hosting and ongoing support are available separately to keep your website flexible and
          under your control.
        </p>
        <p className="mt-3 text-sm text-text-muted">
          Final pricing depends on project requirements and agreed details.
        </p>
      </Section>

      <Section
        eyebrow="Managed hosting"
        title="Hosting if we manage the site"
        description="Required only when we host your website."
      >
        <Card>
          <h3 className="text-lg font-semibold text-accent-2">{hostingPlan.title}</h3>
          <p className="mt-4 text-2xl font-semibold text-accent">{hostingPlan.price}</p>
          <p className="mt-3 text-sm text-text-muted">{hostingPlan.description}</p>
          <ul className="mt-7 grid gap-4 text-sm text-text-muted sm:grid-cols-2">
            {hostingPlan.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                {feature}
              </li>
            ))}
          </ul>
          <div className="mt-7">
            <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Not included</p>
            <ul className="mt-4 space-y-3 text-sm text-text-muted">
              {hostingPlan.exclusions.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-border" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </Section>

      <Section
        eyebrow="Stabilisation"
        title="30-day post-launch support"
        description="Small fixes and adjustments after launch."
      >
        <Card>
          <h3 className="text-lg font-semibold text-accent-2">{stabilisationPeriod.title}</h3>
          <p className="mt-3 text-sm text-text-muted">{stabilisationPeriod.description}</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-text-muted">Covers</p>
              <ul className="mt-4 space-y-3 text-sm text-text-muted">
                {stabilisationPeriod.covers.map((item) => (
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
                {stabilisationPeriod.exclusions.map((item) => (
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
        eyebrow="Ongoing support"
        title="Optional monthly support plans"
        description="For regular updates and steady improvements."
      >
        <div className="grid gap-10 lg:grid-cols-2">
          {supportPlans.map((plan) => (
            <Card key={plan.title}>
              <h3 className="text-lg font-semibold text-accent-2">{plan.title}</h3>
              <p className="mt-4 text-2xl font-semibold text-accent">{plan.price}</p>
              <p className="mt-3 text-sm text-text-muted">{plan.description}</p>
              <ul className="mt-6 space-y-4 text-sm text-text-muted">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-text-muted">{plan.note}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Ad-hoc"
        title="One-off updates"
        description="For clients not on a support plan."
      >
        <Card>
          <h3 className="text-lg font-semibold text-accent-2">{adHocRate.title}</h3>
          <p className="mt-4 text-2xl font-semibold text-accent">{adHocRate.price}</p>
          <p className="mt-3 text-sm text-text-muted">{adHocRate.description}</p>
          <p className="mt-6 text-sm text-text-muted">{adHocRate.note}</p>
        </Card>
      </Section>

      <section className="bg-bg-elev">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-10 px-8 py-28 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-accent">Next step</p>
            <h2 className="mt-3 text-3xl font-semibold text-text md:text-4xl">
              Let's choose the right package for your goals.
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
