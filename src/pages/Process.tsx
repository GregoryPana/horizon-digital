import Section from "../components/Section";
import Seo from "../components/Seo";
import { processSteps } from "../data/site";
import { ShimmerButton } from "../components/ui/shimmer-button";
import { Link } from "react-router-dom";

export default function Process() {
  return (
    <div>
      <h1 className="sr-only">How We Build Your Website | Horizon Digital Process</h1>
      <Seo
        title="How We Build Your Website | Horizon Digital"
        description="A clear, step-by-step look at how Horizon Digital takes your website from discovery to launch. No surprises, no guesswork — just a process you'll actually enjoy."
        path="/process"
        keywords="website build process Seychelles, how to build a website, web design timeline, website project steps"
      />
      <Section
        eyebrow="How we get there"
        title="A process you'll actually enjoy"
        description="Every step is clear, every decision is yours, and nothing happens without your green light."
      >
        <p className="text-sm text-text-muted">No surprises. <span className="text-accent">Clear timelines.</span> Defined milestones.</p>
        <div className="section-band section-band-medium relative left-1/2 right-1/2 mt-14 -mx-[50vw] mb-8 w-screen py-16 md:mt-16 md:mb-10 md:py-20">
          <div className="mx-auto grid w-full max-w-7xl gap-8 px-8 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <div key={step.title} className="min-w-0">
              <p className="text-xs uppercase tracking-[0.4em] text-accent">Step {index + 1}</p>
              <h3 className="mt-3 text-lg font-semibold text-text">{step.title}</h3>
              <p className="mt-3 text-sm text-text-muted">{step.description}</p>
            </div>
          ))}
          </div>
        </div>
        <p className="mt-10 text-sm text-text-muted">
          Most projects complete within 2-6 weeks depending on scope.
        </p>
      </Section>

      <Section
        eyebrow="You're never in the dark"
        title="We keep you in the loop — always"
        description="No chasing. No confusion. Just regular, honest updates so you always know where we are."
      >
        <div className="section-band section-band-soft relative left-1/2 right-1/2 -mx-[50vw] my-8 w-screen py-14 md:my-10 md:py-16">
          <div className="mx-auto grid w-full max-w-7xl gap-5 px-8 md:grid-cols-2">
          {[
            "Weekly progress updates",
            "Clear milestone approvals",
            "Direct access — no middle layers",
            "Transparent pricing adjustments",
          ].map((item) => (
            <div key={item} className="text-sm text-text-muted">
              {item}
            </div>
          ))}
          </div>
        </div>
      </Section>

      <section className="bg-bg-elev">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-10 px-8 py-28 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-accent">Sounds good?</p>
            <h2 className="mt-3 text-3xl font-semibold text-text md:text-4xl">
              Let's figure out the <span className="text-accent">right path</span> for your business
            </h2>
          </div>
          <Link to="/contact">
            <ShimmerButton
              shimmerColor="#0A0A0C"
              shimmerDuration="4.2s"
              background="#00E5FF"
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
