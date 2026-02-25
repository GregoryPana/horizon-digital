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
        title="Web Design Company in Seychelles"
        description="A studio built on clarity, direct communication, and reliable delivery."
        path="/about"
        keywords="web design studio Seychelles"
      />
      <Section
        eyebrow="About"
        title="A studio built on clarity"
        description="Direct communication, reliable delivery, and practical guidance."
      >
        <div className="grid gap-10 md:grid-cols-2">
          <Card>
            <h3 className="text-lg font-semibold text-text">Built with intention</h3>
            <p className="mt-3 text-sm text-text-muted">
              Horizon Digital is a focused studio that partners directly with local businesses.
              Every site is designed to attract visitors and turn them into enquiries or bookings
              — not just look modern.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-text">Reliable partnership</h3>
            <p className="mt-3 text-sm text-text-muted">
              You work directly with the builder, not a rotating team. The approach is clear,
              transparent, and designed to support you over time.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-text-muted">
              <li>No handoffs</li>
              <li>No account managers</li>
              <li>No layered approvals</li>
            </ul>
          </Card>
        </div>
      </Section>

      <Section
        eyebrow="Why this exists"
        title="Why Horizon Digital exists"
        description="A simpler, clearer way to build websites."
      >
        <Card>
          <p className="text-sm text-text-muted">
            After seeing businesses struggle with unclear websites and complex agency processes,
            Horizon Digital was built to offer something simpler — direct communication, practical
            solutions, and websites designed for measurable growth.
          </p>
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
