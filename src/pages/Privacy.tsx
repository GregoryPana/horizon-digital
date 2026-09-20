import Section from "../components/Section";
import Seo from "../components/Seo";
import { siteConfig } from "../data/site";

const privacyTitle = "Privacy | Horizon Digital";
const privacyDescription =
  "How Horizon Digital handles enquiry details, necessary security verification and optional analytics preferences.";

export default function Privacy() {
  return (
    <div>
      <Seo
        title={privacyTitle}
        description={privacyDescription}
        path="/privacy"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ]}
      />
      <Section
        eyebrow="Privacy"
        title="How we handle website and enquiry information"
        description="This page explains the practical data handling used for Horizon Digital's website, enquiries, security and optional analytics."
        headingLevel="h1"
        className="!pt-16 !pb-24 md:!pt-32 md:!pb-32"
      >
        <div className="mx-auto grid w-full max-w-3xl gap-10 text-text-muted">
          <section aria-labelledby="enquiries-heading">
            <h2 id="enquiries-heading" className="text-2xl font-semibold text-text">Enquiries</h2>
            <p className="mt-4 leading-relaxed">
              Details submitted through the enquiry form are used to review and respond to your request. Sending an enquiry does not subscribe you to marketing.
            </p>
            <p className="mt-4 leading-relaxed">
              Horizon Digital does not sell enquiry data. Unsuccessful enquiries may be retained for up to 12 months. If work proceeds, project and client records are retained for the engagement and for necessary business records.
            </p>
          </section>

          <section aria-labelledby="services-heading">
            <h2 id="services-heading" className="text-2xl font-semibold text-text">Services that process website data</h2>
            <ul className="mt-4 grid gap-3 leading-relaxed">
              <li><strong className="text-text">Cloudflare</strong> processes website and security traffic, including necessary anti-abuse verification.</li>
              <li><strong className="text-text">Resend</strong> processes the notification sent to the Horizon Digital owner after a verified enquiry.</li>
              <li><strong className="text-text">Google Analytics</strong> runs only after a visitor accepts optional analytics. Declining leaves necessary website and enquiry functions available.</li>
            </ul>
          </section>

          <section aria-labelledby="verification-heading">
            <h2 id="verification-heading" className="text-2xl font-semibold text-text">Necessary security verification</h2>
            <p className="mt-4 leading-relaxed">
              Cloudflare Turnstile is used as necessary anti-abuse protection for the enquiry form. It operates independently of your analytics choice; declining analytics does not disable this security check.
            </p>
          </section>

          <section aria-labelledby="preferences-heading">
            <h2 id="preferences-heading" className="text-2xl font-semibold text-text">Analytics preference</h2>
            <p className="mt-4 leading-relaxed">
              Your analytics choice is stored locally in this browser. You can reopen “Analytics choices” in the footer at any time. If you revoke consent after analytics has loaded, the page reloads immediately with analytics disabled so the loaded runtime and its listeners are removed before you continue browsing.
            </p>
          </section>

          <section aria-labelledby="scope-heading">
            <h2 id="scope-heading" className="text-2xl font-semibold text-text">Scope of this notice</h2>
            <p className="mt-4 leading-relaxed">
              This is a practical operational notice, not legal certification or legal advice.
            </p>
          </section>

          <section aria-labelledby="rights-heading">
            <h2 id="rights-heading" className="text-2xl font-semibold text-text">Questions about your information</h2>
            <p className="mt-4 leading-relaxed">
              For access, correction or deletion questions, email{` `}
              <a className="focus-ring rounded text-accent" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
              A request may be limited where records must be retained for an engagement or necessary business records.
            </p>
          </section>
        </div>
      </Section>
    </div>
  );
}
