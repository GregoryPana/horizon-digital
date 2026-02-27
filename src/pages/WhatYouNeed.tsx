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
      <Seo
        title="What You Need Before Launch"
        description="Clear guidance on website build, domain, and hosting, with practical setup scenarios."
        path="/what-you-need"
        keywords="website domain hosting Seychelles"
        structuredData={serviceSchema}
      />

      <Section
        eyebrow="What You Need"
        title="The three things every website needs"
        description="A website always includes three parts: the build, the name, and the hosting."
      >
        <div className="section-band section-band-strong relative left-1/2 right-1/2 -mx-[50vw] my-8 w-screen py-16 md:my-10 md:py-20">
          <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 sm:px-8 md:grid-cols-3">
            <div>
              <h3 className="inline-flex items-center gap-2 text-base font-semibold text-accent-2">
                <BuildIcon className="h-4 w-4" />
                <span>Design and build</span>
              </h3>
              <p className="mt-3 text-sm text-text-muted">
                This is how your website looks, reads, and guides people to contact you. Horizon
                Digital plans and builds this part with you, so it feels clear, professional, and
                easy to use.
              </p>
            </div>
            <div>
              <h3 className="inline-flex items-center gap-2 text-base font-semibold text-accent-2">
                <DomainIcon className="h-4 w-4" />
                <span>Domain name</span>
              </h3>
              <p className="mt-3 text-sm text-text-muted">
                Your domain is your website name, like yourbusiness.com. It is rented yearly
                through a domain registrar. It stays in your control, and we can guide you with
                setup.
              </p>
            </div>
            <div>
              <h3 className="inline-flex items-center gap-2 text-base font-semibold text-accent-2">
                <HostingIcon className="h-4 w-4" />
                <span>Hosting</span>
              </h3>
              <p className="mt-3 text-sm text-text-muted">
                Hosting keeps your website live every day. You can host with Horizon Digital or a
                different provider. We can manage this for you if you want a simpler process.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Scenarios"
        title="Common setup options"
        description="Choose the setup that fits your business. In every case, your domain remains yours."
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
        <p className="mt-8 text-sm text-text-muted">
          Domain ownership stays with the client in all scenarios. We can assist with setup,
          DNS connection, and renewals guidance.
        </p>
      </Section>
    </div>
  );
}
