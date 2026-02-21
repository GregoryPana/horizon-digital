import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Modal from "../components/Modal";
import Section from "../components/Section";
import InfiniteHero from "../components/ui/infinite-hero";
import { ShimmerButton } from "../components/ui/shimmer-button";
import { Link } from "react-router-dom";
import {
  addOns,
  faqs,
  pricingTiers,
  processSteps,
  services,
  trustItems,
  workItems,
} from "../data/site";

export default function Home() {
  const [activeWork, setActiveWork] = useState<null | (typeof workItems)[0]>(null);

  return (
    <div>
      <InfiniteHero />

      <section className="border-y border-border bg-bg-elev">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-10 px-8 py-12 text-xs uppercase tracking-[0.4em] text-text-muted">
          {trustItems.map((item) => (
            <span key={item} className="flex items-center gap-3">
              <span className="h-1 w-8 bg-horizon" />
              {item}
            </span>
          ))}
        </div>
      </section>

      <Section
        eyebrow="Services"
        title="Designed to be clear and reliable"
        description="Modern websites that help customers understand you and get in touch."
        className="!pt-16 !pb-24 md:!pt-24 md:!pb-32"
      >
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <div key={service.title} className="contents">
              <Card>
                <h3 className="text-lg font-semibold text-text">{service.title}</h3>
                <p className="mt-3 text-sm leading-snug text-text-muted">
                  {service.description}
                </p>
              </Card>
              {(index + 1) % 2 === 0 && (
                <div className="col-span-full md:hidden">
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-border/60 to-transparent" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-start gap-3 text-sm text-text-muted sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
          <span className="text-xs uppercase tracking-[0.4em] text-accent">Add-ons</span>
          {addOns.map((addon) => (
            <span
              key={addon}
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-bg-elev/80 px-3 py-1 text-text active:shadow-[inset_0_0_10px_var(--glow)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {addon}
            </span>
          ))}
        </div>
        <div className="mt-12 horizon-line" />
      </Section>

      <Section
        eyebrow="Featured work"
        title="Concept demos to show layout direction"
        description="Examples that show structure and flow before real content is added."
      >
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
          {workItems.map((item) => (
            <Card key={item.label} className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
              <div className="relative">
                <div className="preview-frame mb-6 h-32 w-full rounded-2xl border border-border bg-gradient-to-br from-accent/20 via-transparent to-accent-2/20">
                  <div className="absolute inset-0 preview-shimmer" />
                  <div className="absolute left-4 top-4 h-12 w-20 rounded-lg bg-bg-elev/70 blur-[1px]" />
                  <div className="absolute right-5 top-6 h-6 w-16 rounded-md bg-bg-elev/60 blur-[1px]" />
                  <div className="absolute left-6 bottom-4 h-5 w-24 rounded-md bg-bg-elev/60 blur-[1px]" />
                </div>
                <p className="text-xs uppercase tracking-[0.3em] text-accent">{item.label}</p>
                <h3 className="mt-2 text-lg font-semibold text-text">{item.title}</h3>
                <p className="mt-4 text-sm text-text-muted">{item.outcome}</p>
                <div className="mt-10 flex flex-wrap gap-5">
                  <Button
                    label="View preview"
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveWork(item)}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Process"
        title="A clear four-step workflow"
        description="Simple milestones, direct communication, and reliable delivery."
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

      <Section
        eyebrow="Pricing"
        title="Website build packages"
        description="Clear starting points for the build. Hosting and ongoing support are separate."
      >
        <div className="grid gap-10 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.title}
              className={`relative pricing-pop ${
                tier.badge ? "pricing-pop-strong" : "pricing-pop-soft"
              }`.trim()}
            >
              {tier.badge && (
                <span className="absolute -top-3 left-6 rounded-full border border-accent/40 bg-bg px-3 py-1 text-[0.65rem] uppercase tracking-[0.28em] text-accent">
                  {tier.badge}
                </span>
              )}
              <h3 className="text-lg font-semibold text-accent-2">{tier.title}</h3>
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
              <Button label="View details" to="/pricing" variant="outline" size="sm" className="mt-10" />
            </Card>
          ))}
        </div>
        <p className="mt-6 text-sm text-text-muted">Final pricing depends on scope.</p>
      </Section>

      <Section
        eyebrow="FAQ"
        title="Clarity before we start"
        description="Straight answers to help you plan with confidence."
      >
        <div className="grid gap-10 md:grid-cols-2">
          {faqs.map((faq) => (
            <Card key={faq.question}>
              <h3 className="text-base font-semibold text-text">{faq.question}</h3>
              <p className="mt-3 text-sm text-text-muted">{faq.answer}</p>
            </Card>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-border bg-bg-elev px-6 py-6">
          <p className="text-sm text-text-muted">Still have questions? We can walk you through it.</p>
          <Link to="/contact">
            <ShimmerButton
              shimmerColor="#0b1212"
              shimmerDuration="4.2s"
              background="linear-gradient(135deg, rgba(34,241,214,0.95), rgba(34,241,214,0.7))"
              className="px-5 py-2 text-xs font-semibold tracking-[0.12em] text-black"
            >
              Book a free consult
            </ShimmerButton>
          </Link>
        </div>
      </Section>

      <section className="bg-bg-elev">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-10 px-8 py-28 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-accent">Ready to build</p>
            <h2 className="mt-3 text-3xl font-semibold text-text md:text-4xl">
              Empowering Your <span className="text-accent-2">Digital Horizon</span>
            </h2>
            <p className="mt-4 text-sm text-text-muted">
              Ready for a website that feels clear and easy to use?
            </p>
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

      <Modal
        open={Boolean(activeWork)}
        title={activeWork ? `${activeWork.title} - ${activeWork.label}` : ""}
        onClose={() => setActiveWork(null)}
      >
        <p>
          This is a concept demo showing layout direction and flow. Each project is built around
          your goals, content, and customer journey.
        </p>
        <div className="mt-6">
          <Button label="Request similar site" to="/contact" size="sm" />
        </div>
      </Modal>
    </div>
  );
}
