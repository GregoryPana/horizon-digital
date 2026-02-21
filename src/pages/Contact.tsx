import Button from "../components/Button";
import Card from "../components/Card";
import Section from "../components/Section";
import { siteConfig } from "../data/site";
import { ShimmerButton } from "../components/ui/shimmer-button";

export default function Contact() {
  return (
    <div>
      <Section
        eyebrow="Contact"
        title="Start a clear project conversation"
        description="Tell us about your business, your goals, and your timeline."
        className="!pt-16 !pb-24 md:!pt-32 md:!pb-32"
      >
        <div className="mx-auto grid w-full max-w-2xl min-w-0 gap-10 lg:max-w-none lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="min-w-0">
            <form className="grid gap-7">
              <label className="text-sm text-text">
                Name
                <input
                  type="text"
                  name="name"
                  className="mt-3 w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm text-text focus-ring"
                  placeholder="Your name"
                />
              </label>
              <label className="text-sm text-text">
                Email
                <input
                  type="email"
                  name="email"
                  className="mt-3 w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm text-text focus-ring"
                  placeholder="you@example.com"
                />
              </label>
              <label className="text-sm text-text">
                Message
                <textarea
                  name="message"
                  rows={5}
                  className="mt-3 w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm text-text focus-ring"
                  placeholder="Tell us about your project"
                />
              </label>
              <Button label="Send inquiry" type="submit" size="lg" className="w-fit" />
            </form>
          </Card>
          <Card className="min-w-0">
            <p className="text-xs uppercase tracking-[0.4em] text-accent">Direct contact</p>
            <p className="mt-4 text-sm text-text-muted">Email or call us at</p>
            <a
              className="mt-2 block break-all text-lg font-semibold text-text transition hover:text-accent"
              href={`mailto:${siteConfig.email}`}
            >
              {siteConfig.email}
            </a>
            <a
              className="mt-3 block text-sm text-text-muted transition hover:text-accent"
              href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
            >
              {siteConfig.phone}
            </a>
            <div className="mt-8">
              <ShimmerButton
                shimmerColor="#0b1212"
                shimmerDuration="4.2s"
                background="linear-gradient(135deg, rgba(34,241,214,0.95), rgba(34,241,214,0.7))"
                className="w-full px-6 py-3 text-sm font-semibold tracking-[0.08em] text-black sm:w-auto"
                type="button"
                onClick={() => {
                  window.location.href = `mailto:${siteConfig.email}`;
                }}
              >
                Book a free consult
              </ShimmerButton>
            </div>
          </Card>
        </div>
      </Section>
    </div>
  );
}
