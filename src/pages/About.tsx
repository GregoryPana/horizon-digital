import Card from "../components/Card";
import Section from "../components/Section";
import { ShimmerButton } from "../components/ui/shimmer-button";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>
      <Section
        eyebrow="About"
        title="A small studio built on clarity"
        description="Direct communication, reliable delivery, and practical guidance."
      >
        <div className="grid gap-10 md:grid-cols-2">
          <Card>
            <h3 className="text-lg font-semibold text-text">Built with intention</h3>
            <p className="mt-3 text-sm text-text-muted">
              Horizon Digital is a focused studio that partners directly with local businesses.
              Every site is built to build trust, explain your service clearly, and turn visitors
              into enquiries or bookings.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-text">Reliable partnership</h3>
            <p className="mt-3 text-sm text-text-muted">
              You work directly with the builder, not a rotating team. The approach is clear,
              transparent, and designed to support you over time.
            </p>
          </Card>
        </div>
      </Section>

      <section className="bg-bg-elev">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-10 px-8 py-28 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-accent">Let's connect</p>
            <h2 className="mt-3 text-3xl font-semibold text-text md:text-4xl">
              Build a site that supports where your business is going.
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
