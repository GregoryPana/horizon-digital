import Card from "../components/Card";
import Section from "../components/Section";
import Seo from "../components/Seo";
import { ShimmerButton } from "../components/ui/shimmer-button";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>
      <h1 className="sr-only">About Horizon Digital</h1>
      <Seo
        title="About Horizon Digital"
        description="Horizon Digital helps businesses create websites that communicate clearly and work effectively."
        path="/about"
        keywords="about Horizon Digital, web design studio Seychelles"
      />
      <Section
        eyebrow="About"
        title="Helping businesses build better websites"
        description="Practical solutions for websites that are clearer, faster, and easier to use."
      >
        <div className="grid gap-10 md:grid-cols-2">
          <Card>
              <h3 className="text-lg font-semibold text-text">Built with intention</h3>
              <p className="mt-3 text-sm text-text-muted">
                Many businesses struggle with websites that are slow, unclear, or difficult to
                update. Horizon Digital focuses on fixing those friction points with clearer
                structure and practical decisions.
              </p>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold text-text">Customer-journey focus</h3>
              <p className="mt-3 text-sm text-text-muted">
                Pages are planned to guide visitors from first impression to enquiry. The goal is a
                website that helps people understand your services and act confidently.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-text-muted">
                <li>Clarity-first messaging</li>
                <li>Structured navigation flow</li>
                <li>Performance-aware builds</li>
              </ul>
            </Card>
        </div>
      </Section>

      <Section
        eyebrow="Our approach"
        title="How we work with businesses"
        description="Consultation, design, development, launch - with practical communication at each step."
      >
        <Card>
          <ul className="grid gap-3 text-sm text-text-muted md:grid-cols-2">
            <li>Consultation and project scope</li>
            <li>Design and page structure</li>
            <li>Development and testing</li>
            <li>Launch and post-launch stabilisation</li>
          </ul>
        </Card>
      </Section>

      <Section
        eyebrow="Digital Insights"
        title="Looking ahead at emerging digital tools"
        description="Educational content for Seychelles businesses exploring AI and automation trends."
      >
        <Card>
          <p className="text-sm text-text-muted">
            We share practical insights on artificial intelligence, automation, and digital tools in
            a clear way for non-technical business owners. This helps local businesses stay informed
            as technology evolves.
          </p>
          <div className="mt-6">
            <Link to="/ai-digital-tools">
              <ShimmerButton
                shimmerColor="#0b1212"
                shimmerDuration="4.2s"
                background="#46c6e8"
                className="px-5 py-2 text-xs font-semibold tracking-[0.12em] text-black"
              >
                Visit Digital Insights
              </ShimmerButton>
            </Link>
          </div>
        </Card>
      </Section>

      <section className="bg-bg-elev">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-10 px-8 py-28 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-accent">Let's connect</p>
            <h2 className="mt-3 text-3xl font-semibold text-text md:text-4xl">
              Let's build a site that supports where your business is going next.
            </h2>
          </div>
          <Link to="/contact">
            <ShimmerButton
              shimmerColor="#0b1212"
              shimmerDuration="4.2s"
              background="#46c6e8"
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
