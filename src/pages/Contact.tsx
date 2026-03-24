import Button from "../components/Button";
import Card from "../components/Card";
import Section from "../components/Section";
import Seo from "../components/Seo";
import { emailTemplate, siteConfig } from "../data/site";
import { ShimmerButton } from "../components/ui/shimmer-button";
import { buildMailtoLink } from "../lib/utils";
import { useLocation } from "react-router-dom";

export default function Contact() {
  const location = useLocation();
  const mailtoHref = buildMailtoLink(
    siteConfig.email,
    emailTemplate.subject,
    emailTemplate.body
  );

  const allowedBudgets = ["9500-15000", "15000-30000", "30000+", "not-sure"];
  const budgetParam = new URLSearchParams(location.search).get("budget") ?? "";
  const defaultBudget = allowedBudgets.includes(budgetParam) ? budgetParam : "";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const businessName = String(data.get("businessName") ?? "").trim();
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const industry = String(data.get("industry") ?? "").trim();
    const website = String(data.get("website") ?? "").trim();
    const budget = String(data.get("budget") ?? "").trim();
    const timeline = String(data.get("timeline") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const budgetLabelMap: Record<string, string> = {
      "9500-15000": "SCR 9,500-15,000",
      "15000-30000": "SCR 15,000-30,000",
      "30000+": "SCR 30,000+",
      "not-sure": "Not sure yet - I'd like guidance",
    };

    const timelineLabelMap: Record<string, string> = {
      asap: "ASAP",
      "2-4-weeks": "2-4 weeks",
      "1-2-months": "1-2 months",
      "2-3-months": "2-3 months",
      "not-sure": "Not sure yet - I'd like guidance",
    };

    const budgetLabel = budgetLabelMap[budget] ?? "";
    const timelineLabel = timelineLabelMap[timeline] ?? "";

    const subject = emailTemplate.subject.replace(
      "[Business Name]",
      businessName || "Business"
    );

    const body = `Hi Horizon Digital,

 I'd like to discuss a new website project.

Business name: ${businessName}
Your name: ${name}
Industry: ${industry}
Current website (if any): ${website}

Estimated timeline: ${timelineLabel}
Project budget range: ${budgetLabel}
Contact email: ${email}

Main goal details:
${message}

Looking forward to your reply.`;

    window.location.href = buildMailtoLink(siteConfig.email, subject, body);
  };

  return (
    <div>
      <h1 className="sr-only">Contact Horizon Digital</h1>
      <Seo
        title="Start Your Website Project"
        description="Tell us about your business and the type of website you would like to build."
        path="/contact"
        keywords="contact web designer Seychelles, start website project Seychelles"
      />
      <Section
        eyebrow="Get in touch"
        title="Tell us about your business"
        description="We'll take it from here — no pressure, just a friendly conversation about what you need."
        className="!pt-16 !pb-24 md:!pt-32 md:!pb-32"
      >
        <p className="-mt-6 text-sm text-text-muted">
          We reply within 24 hours.
        </p>
        <div className="mx-auto mt-6 grid w-full max-w-2xl min-w-0 items-start gap-10 lg:max-w-none lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="min-w-0">
            <form className="grid gap-7" onSubmit={handleSubmit}>
              <label className="text-sm text-text">
                Business name
                <input
                  type="text"
                  name="businessName"
                  autoComplete="organization"
                  required
                  className="contact-input mt-3 w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm text-text focus-ring"
                  placeholder="Your business"
                />
              </label>
              <label className="text-sm text-text">
                Your name (optional)
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  className="contact-input mt-3 w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm text-text focus-ring"
                  placeholder="Your name"
                />
              </label>
              <label className="text-sm text-text">
                Email
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  className="contact-input mt-3 w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm text-text focus-ring"
                  placeholder="you@example.com"
                />
              </label>
              <label className="text-sm text-text">
                Industry (optional)
                <input
                  type="text"
                  name="industry"
                  className="contact-input mt-3 w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm text-text focus-ring"
                  placeholder="e.g. Hospitality, Services, Retail"
                />
              </label>
              <label className="text-sm text-text">
                Current website (if any)
                <input
                  type="url"
                  name="website"
                  className="contact-input mt-3 w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm text-text focus-ring"
                  placeholder="https://"
                />
              </label>
              <label className="text-sm text-text">
                Project budget range (optional)
                <select
                  name="budget"
                  className="contact-input mt-3 w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm text-text focus-ring"
                  defaultValue={defaultBudget}
                >
                  <option value="" disabled>
                    Select a range
                  </option>
                  <option value="9500-15000">SCR 9,500-15,000</option>
                  <option value="15000-30000">SCR 15,000-30,000</option>
                  <option value="30000+">SCR 30,000+</option>
                  <option value="not-sure">Not sure yet - I'd like guidance</option>
                </select>
              </label>
              <label className="text-sm text-text">
                Estimated timeline (optional)
                <select
                  name="timeline"
                  className="contact-input mt-3 w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm text-text focus-ring"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a timeline
                  </option>
                  <option value="asap">ASAP</option>
                  <option value="2-4-weeks">2-4 weeks</option>
                  <option value="1-2-months">1-2 months</option>
                  <option value="2-3-months">2-3 months</option>
                  <option value="not-sure">Not sure yet - I'd like guidance</option>
                </select>
              </label>
              <label className="text-sm text-text">
                Message
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="contact-input mt-3 w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm text-text focus-ring"
                  placeholder="Tell us about your project"
                />
              </label>
              <Button label="Begin conversation" type="submit" size="lg" className="w-fit" />
            </form>
            <p className="mt-6 text-sm text-text-muted">
              We respect your time. No spam. No obligation.
            </p>
          </Card>
          <Card className="min-w-0">
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-accent section-eyebrow-glow">Contact Horizon Digital</span>
            <p className="mt-4 text-sm text-text-muted">We typically respond within 24 hours.</p>
            <p className="mt-3 text-sm text-text-muted">
              Email or call us for a simple conversation about what makes your business different,
              and how your website can stand out and be found more easily.
            </p>
            <a
              className="mt-2 block break-all text-lg font-semibold text-text transition hover:text-accent"
              href={mailtoHref}
            >
              {siteConfig.email}
            </a>
            <a
              className="mt-3 block text-sm text-text-muted transition hover:text-accent"
              href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
            >
              {siteConfig.phone}
            </a>
            <a
              className="group mt-3 block text-sm text-text-muted transition hover:text-accent"
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              Lets chat on {" "}
              <span className="font-medium text-text transition-colors group-hover:text-accent">
                Whatsapp
              </span>
            </a>
            <div className="mt-6 rounded-2xl border border-border bg-bg-panel p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-accent-2">Here's what to expect</p>
              <ul className="mt-3 space-y-2 text-sm text-text-muted">
                <li>We read your message carefully</li>
                <li>We suggest the best fit for your stage</li>
                <li>We agree on a plan that works for you</li>
              </ul>
            </div>
            <div className="mt-8">
              <ShimmerButton
                shimmerColor="#0A0A0C"
                shimmerDuration="4.2s"
                background="#00E5FF"
                className="w-full px-6 py-3 text-sm font-semibold tracking-[0.08em] text-black sm:w-auto"
                type="button"
                onClick={() => {
                  window.location.href = mailtoHref;
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
