import Card from "../components/Card";
import Section from "../components/Section";
import Seo from "../components/Seo";
import { BuildIcon, DomainIcon, HostingIcon, ScenarioIcon } from "../components/ui/symbol-icons";
import { siteConfig } from "../data/site";

export default function WhatYouNeed() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "What You Need",
    description: "Understand the essentials: website build, domain, and hosting.",
    url: new URL("/what-you-need", siteConfig.url).toString(),
  };

  return (
    <div>
      <h1 className="sr-only">What Website Does Your Business Need?</h1>
      <Seo
        title="What Website Does Your Business Need?"
        description="A clear guide for Seychelles businesses choosing the right website type, features, and package."
        path="/what-you-need"
        keywords="what website do I need, business website types Seychelles, website package guidance"
        structuredData={serviceSchema}
      />

      <Section
        eyebrow="What You Need"
        title="What website does your business need?"
        description="Many businesses know they need a website but are unsure which type is right. This guide helps you choose clearly."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <h3 className="inline-flex items-center gap-2 text-base font-semibold text-accent-2">
              <BuildIcon className="h-4 w-4" />
              <span>Service Business Websites</span>
            </h3>
            <p className="mt-3 text-sm text-text-muted">
              Best for consultants and service providers that need clear service pages and strong
              enquiry flow.
            </p>
          </Card>
          <Card>
            <h3 className="inline-flex items-center gap-2 text-base font-semibold text-accent-2">
              <DomainIcon className="h-4 w-4" />
              <span>Retail Showcase Websites</span>
            </h3>
            <p className="mt-3 text-sm text-text-muted">
              Useful for businesses that need to display products clearly and guide customers toward
              contact or order requests.
            </p>
          </Card>
          <Card>
            <h3 className="inline-flex items-center gap-2 text-base font-semibold text-accent-2">
              <HostingIcon className="h-4 w-4" />
              <span>Hospitality Websites</span>
            </h3>
            <p className="mt-3 text-sm text-text-muted">
              Designed to highlight accommodation, facilities, local trust signals, and simplified
              booking enquiries.
            </p>
          </Card>
        </div>
      </Section>

      <Section
        eyebrow="Features"
        title="Features businesses often need"
        description="Most business websites rely on a clear core feature set before adding advanced tools."
      >
        <div className="section-band section-band-strong relative left-1/2 right-1/2 -mx-[50vw] my-8 w-screen py-16 md:my-10 md:py-20">
          <div className="mx-auto grid w-full max-w-7xl gap-4 px-5 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              "Contact forms",
              "Enquiry forms",
              "Product displays",
              "Booking options",
            ].map((feature) => (
              <div key={feature} className="rounded-xl border border-border bg-bg-elev px-4 py-4 text-sm text-text">
                {feature}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Package fit"
        title="Choosing the right website package"
        description="Simple needs usually fit Foundation, while businesses needing flexibility often prefer Starter or Growth."
      >
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Option 1</p>
            <h3 className="mt-3 inline-flex items-center gap-2 text-xl font-semibold text-text">
              <ScenarioIcon className="h-5 w-5 text-accent-2" />
              <span>Website by Horizon Digital, hosting elsewhere</span>
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-text-muted">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                We design and build your website.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                Hosting is managed by your preferred provider.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                Your domain remains registered and controlled by you.
              </li>
            </ul>
          </Card>

          <Card>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Option 2</p>
            <h3 className="mt-3 inline-flex items-center gap-2 text-xl font-semibold text-text">
              <ScenarioIcon className="h-5 w-5 text-accent-2" />
              <span>Website and hosting by Horizon Digital</span>
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-text-muted">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                We design, build, launch, and manage hosting.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                You get one point of contact for build and technical support.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                Your domain is still handled by you at your registrar.
              </li>
            </ul>
          </Card>
        </div>
      </Section>

      <Section
        eyebrow="Project prep"
        title="Preparing for a website project"
        description="A few basics help your project move faster and launch cleaner."
      >
        <Card>
          <ul className="grid gap-3 text-sm text-text-muted md:grid-cols-2">
            <li>Your services list and priorities</li>
            <li>Business information and contact details</li>
            <li>Photos, branding, and logo assets</li>
            <li>Any existing website or social links</li>
          </ul>
          <p className="mt-6 text-sm text-text-muted">
            If you are not sure where to start, we can guide you through each item during the
            discovery call.
          </p>
        </Card>
      </Section>
    </div>
  );
}
