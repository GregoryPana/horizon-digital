import Card from "../components/Card";
import Section from "../components/Section";
import { addOns, services } from "../data/site";
import { ShimmerButton } from "../components/ui/shimmer-button";
import { Link } from "react-router-dom";

export default function Services() {
  return (
    <div>
      <Section
        eyebrow="Services"
        title="Structured solutions engineered to convert attention into action."
        description="Every build is structured to communicate credibility and guide action."
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
      </Section>

      <Section
        eyebrow="Add-ons"
        title="Optional enhancements"
        description="Extend your site with conversion-ready functionality."
      >
        <div className="grid gap-10 md:grid-cols-2">
          {addOns.map((addon) => (
            <Card key={addon}>
              <p className="text-sm text-text">{addon}</p>
            </Card>
          ))}
        </div>
      </Section>

      <section className="bg-bg-elev">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-10 px-8 py-28 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-accent">Let's scope it</p>
            <h2 className="mt-3 text-3xl font-semibold text-text md:text-4xl">
              Build a website that drives bookings and inquiries.
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
