import Button from "../components/Button";
import Card from "../components/Card";
import Section from "../components/Section";
import Seo from "../components/Seo";
import { emailTemplate, siteConfig } from "../data/site";
import { buildMailtoLink } from "../lib/utils";
import { useLocation } from "react-router-dom";
import { trackEvent } from "../lib/analytics";


export default function Contact() {
  const location = useLocation();
  const mailtoHref = buildMailtoLink(
    siteConfig.email,
    emailTemplate.subject,
    emailTemplate.body
  );

  const allowedBudgets = ["7500-12500", "12500-25000", "25000-plus", "not-sure"];
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
      "7500-12500": "SCR 7,500-12,500",
      "12500-25000": "SCR 12,500-25,000",
      "25000-plus": "SCR 25,000+",
      "25000+": "SCR 25,000+",
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

    trackEvent("generate_lead", {
      form_name: "contact_form",
      page_path: window.location.pathname,
    });

    window.location.href = buildMailtoLink(siteConfig.email, subject, body);
  };


  return (
    <div>
      <h1 className="sr-only">Contact Horizon Digital - Start Your Custom Website Project</h1>
      <Seo
        title="Custom Website Project Seychelles | Horizon Digital"
        description="Tell us about your business goals and start your custom website project with Horizon Digital today."
        path="/contact"
        keywords="contact custom web designer Seychelles, start custom website project Seychelles, bespoke web solutions"
      />
      <Section
        eyebrow="Get in touch"
        title="Let's figure out the right website for you"
        description="Takes less than 2 minutes. We read every message personally. Just tell us where you're at and we'll suggest the best path forward."
        className="!pt-16 !pb-24 md:!pt-32 md:!pb-32"
      >
        <div className="mx-auto max-w-2xl text-center mt-4 mb-10 lg:max-w-none lg:text-left">
          <p className="text-sm text-text-muted leading-relaxed">
            Not sure what you need yet? That's completely fine — 
            most people aren't when they first reach out. 
            <span className="text-text"> Just tell us about your business 
            and we'll guide you from there.</span>
          </p>
        </div>
        <div className="mx-auto grid w-full max-w-2xl min-w-0 items-start gap-10 lg:max-w-none lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="min-w-0 order-last lg:order-first">
            <form className="grid gap-7" onSubmit={handleSubmit}>
              <label className="text-sm font-semibold text-text">
                Business name
                <input
                  type="text"
                  name="businessName"
                  autoComplete="organization"
                  required
                  className="contact-input mt-3 w-full rounded-xl border border-white/20 bg-white/5 hover:border-white/30 px-4 py-3 text-sm text-text placeholder:text-text-muted focus-ring"
                  placeholder="Your business name"
                />
              </label>
              <label className="text-[13px] text-text-muted">
                Your name
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  className="contact-input mt-2.5 w-full rounded-xl border border-white/20 bg-white/5 hover:border-white/30 px-4 py-3 text-sm text-text placeholder:text-text-muted focus-ring"
                  placeholder="Your name"
                />
              </label>
              <label className="text-sm font-semibold text-text">
                Email
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  className="contact-input mt-3 w-full rounded-xl border border-white/20 bg-white/5 hover:border-white/30 px-4 py-3 text-sm text-text placeholder:text-text-muted focus-ring"
                  placeholder="you@example.com"
                />
              </label>
              <label className="text-[13px] text-text-muted">
                Industry
                <input
                  type="text"
                  name="industry"
                  className="contact-input mt-2.5 w-full rounded-xl border border-white/20 bg-white/5 hover:border-white/30 px-4 py-3 text-sm text-text placeholder:text-text-muted focus-ring"
                  placeholder="e.g. Hospitality, Services, Retail"
                />
              </label>
              <label className="text-[13px] text-text-muted">
                Current website
                <input
                  type="url"
                  name="website"
                  className="contact-input mt-2.5 w-full rounded-xl border border-white/20 bg-white/5 hover:border-white/30 px-4 py-3 text-sm text-text placeholder:text-text-muted focus-ring"
                  placeholder="https://"
                />
              </label>
              <label className="text-[13px] text-text-muted">
                Project budget range
                <select
                  name="budget"
                  className="contact-input mt-2.5 w-full rounded-xl border border-white/20 bg-white/5 hover:border-white/30 px-4 py-3 text-sm text-text placeholder:text-text-muted focus-ring"
                  defaultValue={defaultBudget}
                >
                  <option value="" disabled>
                    Select a range
                  </option>
                  <option value="7500-12500">SCR 7,500-12,500</option>
                  <option value="12500-25000">SCR 12,500-25,000</option>
                  <option value="25000-plus">SCR 25,000+</option>
                  <option value="not-sure">Not sure yet - I'd like guidance</option>
                </select>
              </label>
              <label className="text-[13px] text-text-muted">
                Estimated timeline
                <select
                  name="timeline"
                  className="contact-input mt-2.5 w-full rounded-xl border border-white/20 bg-white/5 hover:border-white/30 px-4 py-3 text-sm text-text placeholder:text-text-muted focus-ring"
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
              <label className="text-sm font-semibold text-text">
                Message
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="contact-input mt-3 w-full rounded-xl border border-white/20 bg-white/5 hover:border-white/30 px-4 py-3 text-sm text-text placeholder:text-text-muted focus-ring"
                  placeholder="Tell us about your project"
                />
              </label>
              <div className="flex flex-col gap-4">
                <Button label="Send message" type="submit" size="lg" className="w-full md:w-fit" />
                <p className="pl-1 text-sm text-text-muted">
                  We reply within 24 hours — usually sooner.
                </p>
              </div>
            </form>
            <p className="mt-6 text-sm text-text-muted">
              We respect your time. No spam. No obligation.
            </p>
          </Card>
          <Card className="min-w-0 order-first lg:order-last">
            <span className="mb-6 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-deep-teal section-eyebrow-glow">Contact Horizon Digital</span>
            
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex w-full items-center justify-center gap-3 rounded-xl border border-[#25D366]/30 bg-[#25D366]/10 px-6 py-4 transition-all hover:bg-[#25D366]/20 hover:border-[#25D366]/50"
              onClick={() =>
                trackEvent("cta_click", {
                  cta_name: "whatsapp_chat",
                  page_path: window.location.pathname,
                })
              }
            >

              <svg className="h-5 w-5 fill-[#25D366]" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .011 5.403.008 12.039c0 2.12.54 4.19 1.566 6.02L0 24l6.142-1.61c1.768.963 3.75 1.47 5.762 1.472h.005c6.634 0 12.037-5.404 12.04-12.04.002-3.213-1.248-6.234-3.515-8.504z" />
              </svg>
              <span className="text-base font-bold text-[#25D366]">Chat on WhatsApp — fastest reply</span>
            </a>

            <div className="relative my-8 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
              <span className="relative bg-bg-elev px-3 text-[10px] font-bold uppercase tracking-widest text-text-muted">OR</span>
            </div>

            <div className="space-y-5">
              <a
                className="flex items-center gap-4 break-all text-lg font-semibold text-text transition hover:text-cyan group"
                href={mailtoHref}
                onClick={() =>
                  trackEvent("cta_click", {
                    cta_name: "email_link",
                    page_path: window.location.pathname,
                  })
                }
              >

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.05] bg-white/[0.03] text-text-muted transition-colors group-hover:bg-cyan/10 group-hover:text-cyan">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span>{siteConfig.email}</span>
              </a>
              <a
                className="flex items-center gap-4 text-lg font-semibold text-text transition hover:text-cyan group"
                href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                onClick={() =>
                  trackEvent("cta_click", {
                    cta_name: "phone_link",
                    page_path: window.location.pathname,
                  })
                }
              >

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.05] bg-white/[0.03] text-text-muted transition-colors group-hover:bg-cyan/10 group-hover:text-cyan">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span>{siteConfig.phone}</span>
              </a>
            </div>

            <div className="mt-10 rounded-2xl border border-border bg-bg-panel p-5">
              <p className="mb-4 block text-[11px] font-bold uppercase tracking-[0.3em] leading-none text-deep-teal section-eyebrow-glow">What happens next</p>
              <ul className="mt-4 space-y-2.5 text-sm text-text-muted">
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-deep-teal" />
                  We reply within 24 hours — usually sooner
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-deep-teal" />
                  We read your message carefully
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-deep-teal" />
                  We suggest the best fit for your stage
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-deep-teal" />
                  We agree on a plan that works for you
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <button 
                className="w-full px-8 py-4 text-black rounded-full font-black uppercase tracking-[0.2em] text-sm transition-all duration-300 hover:scale-[1.02] hover:brightness-110 active:scale-95 text-center flex items-center justify-center sm:w-auto sm:min-w-[240px] cta-gradient-anim"
                style={{ backgroundImage: 'linear-gradient(90deg, var(--accent), var(--accent-2), #0C7CC4, var(--accent))', backgroundSize: '300% 100%' }}
                type="button"
                onClick={() => {
                  trackEvent("cta_click", {
                    cta_name: "book_free_consult",
                    page_path: window.location.pathname,
                  });
                  window.location.href = mailtoHref;
                }}
              >
                Book a free consult
              </button>
            </div>
          </Card>
        </div>
      </Section>
    </div>
  );
}
