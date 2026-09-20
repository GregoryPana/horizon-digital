import Card from "../components/Card";
import Section from "../components/Section";
import Seo from "../components/Seo";
import { emailTemplate, siteConfig } from "../data/site";
import { buildMailtoLink } from "../lib/utils";
import { Link, useLocation } from "react-router-dom";
import { trackContactIntent, trackEvent } from "../lib/analytics";
import { Instagram, Facebook } from "lucide-react";
import WhatsAppIcon from "../components/ui/WhatsAppIcon";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ENQUIRY_PACKAGES,
  ENQUIRY_FIELD_LIMITS,
  ENQUIRY_TIMELINES,
} from "../lib/enquiryContract";

type EnquiryState =
  | "idle"
  | "submitting"
  | "success"
  | "validation-error"
  | "server-validation-error"
  | "verification-error"
  | "delivery-error"
  | "configuration-error";

type FieldName = "businessName" | "email" | "message" | "website";
type FieldErrors = Partial<Record<FieldName, string>>;

type EnquiryPayload = {
  businessName: string;
  name: string;
  email: string;
  industry: string;
  website: string;
  packageInterest: string;
  timeline: string;
  message: string;
  honeypot: string;
  turnstileToken: string;
};

type TurnstileApi = {
  render: (element: HTMLElement, options: {
    sitekey: string;
    callback: (token: string) => void;
    "expired-callback": () => void;
    "error-callback": () => void;
  }) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

const TURNSTILE_SCRIPT_URL =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const TURNSTILE_LOAD_TIMEOUT_MS = 8_000;
const ENQUIRY_REQUEST_PREFILLS = {
  "restaurant-concept":
    "I'm interested in a website similar to the Restaurant Website Concept. Please let me know how we can get started.",
} as const;

const getTurnstile = () =>
  (window as Window & { turnstile?: TurnstileApi }).turnstile;

const statusCopy: Partial<Record<EnquiryState, string>> = {
  "validation-error": "Please check the highlighted details and try again.",
  "server-validation-error": "The form could not accept the enquiry details. Please review them and try again, or use the email option below.",
  "verification-error": "Security verification expired or could not be confirmed. Please verify again before retrying.",
  "delivery-error": "Delivery could not be confirmed. Please retry, email us, or use WhatsApp.",
  "configuration-error": "The enquiry form is temporarily unavailable. Please email us or use WhatsApp instead.",
};

const buildEnquiryFallback = (payload: EnquiryPayload) => {
  const optionalLines = [
    payload.name && `Name: ${payload.name}`,
    payload.industry && `Industry: ${payload.industry}`,
    payload.website && `Website: ${payload.website}`,
    payload.packageInterest && `Package interest: ${payload.packageInterest}`,
    payload.timeline && `Timeline: ${payload.timeline}`,
  ].filter(Boolean);
  const body = [
    "Hi Horizon Digital,",
    "",
    "The website form could not confirm delivery. Here are my retained enquiry details:",
    "",
    `Business name: ${payload.businessName}`,
    `Email: ${payload.email}`,
    ...optionalLines,
    "",
    "Message:",
    payload.message,
  ].join("\n");
  return buildMailtoLink(
    siteConfig.email,
    `Website enquiry fallback — ${payload.businessName}`,
    body,
  );
};

export default function Contact() {
  const location = useLocation();
  const genericMailtoHref = buildMailtoLink(
    siteConfig.email,
    emailTemplate.subject,
    emailTemplate.body
  );

  const packageParam = new URLSearchParams(location.search).get("package") ?? "";
  const requestParam = new URLSearchParams(location.search).get("request") ?? "";
  const defaultPackage = ENQUIRY_PACKAGES.includes(packageParam as (typeof ENQUIRY_PACKAGES)[number])
    ? packageParam
    : "";
  const approvedRequestMessage = ENQUIRY_REQUEST_PREFILLS[
    requestParam as keyof typeof ENQUIRY_REQUEST_PREFILLS
  ];
  const defaultMessage = approvedRequestMessage?.slice(0, ENQUIRY_FIELD_LIMITS.message) ?? "";
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY?.trim() ?? "";
  const [enquiryState, setEnquiryState] = useState<EnquiryState>(siteKey ? "idle" : "configuration-error");
  const [verificationStatus, setVerificationStatus] = useState(siteKey ? "Security verification is loading." : "Security verification is not configured.");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [fallbackMailtoHref, setFallbackMailtoHref] = useState(genericMailtoHref);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const submittingRef = useRef(false);
  const configurationLockedRef = useRef(!siteKey);

  const resetVerification = useCallback(() => {
    const remainLocked = configurationLockedRef.current;
    configurationLockedRef.current = true;
    setTurnstileToken("");
    setVerificationStatus("Complete the security verification before sending.");
    const turnstile = getTurnstile();
    if (turnstile && widgetIdRef.current) turnstile.reset(widgetIdRef.current);
    configurationLockedRef.current = remainLocked;
  }, []);

  useEffect(() => {
    if (!siteKey || !turnstileContainerRef.current) return;
    let disposed = false;
    let ownedScript = false;
    let loadTimeout: ReturnType<typeof setTimeout> | null = null;
    const container = turnstileContainerRef.current;

    const clearLoadTimeout = () => {
      if (loadTimeout !== null) {
        clearTimeout(loadTimeout);
        loadTimeout = null;
      }
    };
    const failConfiguration = (message: string) => {
      if (disposed) return;
      clearLoadTimeout();
      configurationLockedRef.current = true;
      setTurnstileToken("");
      setEnquiryState("configuration-error");
      setVerificationStatus(message);
    };
    const renderWidget = () => {
      if (disposed || widgetIdRef.current) return;
      clearLoadTimeout();
      const turnstile = getTurnstile();
      if (!turnstile) {
        failConfiguration("Security verification could not be loaded.");
        return;
      }
      try {
        widgetIdRef.current = turnstile.render(container, {
          sitekey: siteKey,
          callback: (token) => {
            if (disposed || configurationLockedRef.current) return;
            setTurnstileToken(token);
            setVerificationStatus("Security verification complete.");
            setEnquiryState((current) => current === "verification-error" ? "idle" : current);
          },
          "expired-callback": () => {
            if (disposed) return;
            setEnquiryState("verification-error");
            resetVerification();
          },
          "error-callback": () => {
            if (disposed) return;
            setEnquiryState("verification-error");
            resetVerification();
          },
        });
        configurationLockedRef.current = false;
      } catch {
        failConfiguration("Security verification could not be started.");
      }
    };
    const handleScriptLoad = () => renderWidget();
    const handleScriptError = () => failConfiguration("Security verification could not be loaded.");

    let script = document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SCRIPT_URL}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = TURNSTILE_SCRIPT_URL;
      script.async = true;
      script.defer = true;
      ownedScript = true;
    }
    script.addEventListener("load", handleScriptLoad);
    script.addEventListener("error", handleScriptError);
    loadTimeout = setTimeout(
      () => failConfiguration("Security verification timed out while loading."),
      TURNSTILE_LOAD_TIMEOUT_MS,
    );
    if (ownedScript) document.head.appendChild(script);
    if (getTurnstile()) renderWidget();

    return () => {
      disposed = true;
      clearLoadTimeout();
      script?.removeEventListener("load", handleScriptLoad);
      script?.removeEventListener("error", handleScriptError);
      const turnstile = getTurnstile();
      if (turnstile && widgetIdRef.current) turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
      if (ownedScript) script?.remove();
    };
  }, [resetVerification, siteKey]);

  useEffect(() => {
    if (["success", "server-validation-error", "verification-error", "delivery-error", "configuration-error"].includes(enquiryState)) {
      statusRef.current?.focus();
    }
  }, [enquiryState]);

  const validate = (data: FormData): FieldErrors => {
    const errors: FieldErrors = {};
    const businessName = String(data.get("businessName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const website = String(data.get("website") ?? "").trim();
    if (!businessName) errors.businessName = "Enter your business name.";
    if (!email) errors.email = "Enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address.";
    if (!message) errors.message = "Tell us briefly about your project.";
    if (website) {
      try {
        const url = new URL(website);
        if (!(["http:", "https:"] as string[]).includes(url.protocol)) throw new Error();
      } catch {
        errors.website = "Enter a full website address beginning with http:// or https://.";
      }
    }
    return errors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const errors = validate(data);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setEnquiryState("validation-error");
      const firstInvalid = (["businessName", "email", "website", "message"] as FieldName[])
        .find((name) => errors[name]);
      (form.elements.namedItem(firstInvalid ?? "") as HTMLElement | null)?.focus();
      return;
    }
    if (!siteKey) {
      setEnquiryState("configuration-error");
      return;
    }
    if (!turnstileToken) {
      setEnquiryState("verification-error");
      return;
    }

    trackContactIntent({ method: "contact_form", source: "contact_page_form" });
    submittingRef.current = true;
    setEnquiryState("submitting");
    const payload: EnquiryPayload = {
      businessName: String(data.get("businessName") ?? "").trim(),
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      industry: String(data.get("industry") ?? "").trim(),
      website: String(data.get("website") ?? "").trim(),
      packageInterest: String(data.get("package") ?? "").trim(),
      timeline: String(data.get("timeline") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      honeypot: String(data.get("honeypot") ?? ""),
      turnstileToken,
    };
    setFallbackMailtoHref(buildEnquiryFallback(payload));
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      let body: unknown = null;
      try { body = await response.json(); } catch { body = null; }
      if (response.status === 201 && (body as { ok?: unknown } | null)?.ok === true) {
        trackEvent("generate_lead", {
          source: "contact_page_form",
          page_path: location.pathname,
          transport_type: "beacon",
        });
        form.reset();
        setFieldErrors({});
        setEnquiryState("success");
        resetVerification();
      } else if (response.status === 400) {
        setFieldErrors({});
        setEnquiryState("server-validation-error");
      } else if (response.status === 403) {
        setEnquiryState("verification-error");
        resetVerification();
      } else if (response.status === 503) {
        configurationLockedRef.current = true;
        setEnquiryState("configuration-error");
        resetVerification();
      } else {
        setEnquiryState("delivery-error");
        resetVerification();
      }
    } catch {
      setEnquiryState("delivery-error");
      resetVerification();
    } finally {
      submittingRef.current = false;
    }
  };


  return (
    <div>
      <Seo
        title="Custom Website Project Seychelles | Horizon Digital"
        description="Start your custom website project in Seychelles. Share your goals, preferred timeline and package interest, then receive a tailored scope and quote after a free consultation."
        path="/contact"
        keywords="contact custom web designer Seychelles, start custom website project Seychelles, bespoke web solutions"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Horizon Digital",
            description: "Get in touch with Horizon Digital to start your custom website project in Seychelles.",
            url: "https://horizondigitalsey.com/contact",
            mainEntity: {
              "@type": "Organization",
              name: "Horizon Digital",
              url: "https://horizondigitalsey.com",
              email: siteConfig.email,
              telephone: siteConfig.phone,
              areaServed: siteConfig.serviceArea,
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                email: siteConfig.email,
                areaServed: siteConfig.serviceArea,
                availableLanguage: "English",
              },
            },
          }
        ]}
      />
      <Section
        eyebrow="Get in touch"
        title="Let's figure out the right website for you"
        description="Takes less than 2 minutes. We read every message personally. Just tell us where you're at and we'll suggest the best path forward."
        headingLevel="h1"
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
            <form
              ref={formRef}
              className="grid gap-7"
              onSubmit={handleSubmit}
              noValidate
              aria-label="Project enquiry"
            >
              <label className="text-sm font-semibold text-text">
                Business name
                <input
                  type="text"
                  name="businessName"
                  autoComplete="organization"
                  required
                  maxLength={ENQUIRY_FIELD_LIMITS.businessName}
                  aria-invalid={fieldErrors.businessName ? "true" : undefined}
                  aria-describedby={fieldErrors.businessName ? "businessName-error" : undefined}
                  className="contact-input mt-3 w-full rounded-xl border border-white/20 bg-white/5 hover:border-white/30 px-4 py-3 text-sm text-text placeholder:text-text-muted focus-ring"
                  placeholder="Your business name"
                />
                {fieldErrors.businessName ? <span id="businessName-error" className="mt-2 block text-sm text-text">{fieldErrors.businessName}</span> : null}
              </label>
              <label className="text-[13px] text-text-muted">
                Your name
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  maxLength={ENQUIRY_FIELD_LIMITS.name}
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
                  maxLength={ENQUIRY_FIELD_LIMITS.email}
                  aria-invalid={fieldErrors.email ? "true" : undefined}
                  aria-describedby={fieldErrors.email ? "email-error" : undefined}
                  className="contact-input mt-3 w-full rounded-xl border border-white/20 bg-white/5 hover:border-white/30 px-4 py-3 text-sm text-text placeholder:text-text-muted focus-ring"
                  placeholder="you@example.com"
                />
                {fieldErrors.email ? <span id="email-error" className="mt-2 block text-sm text-text">{fieldErrors.email}</span> : null}
              </label>
              <label className="text-[13px] text-text-muted">
                Industry
                <input
                  type="text"
                  name="industry"
                  maxLength={ENQUIRY_FIELD_LIMITS.industry}
                  className="contact-input mt-2.5 w-full rounded-xl border border-white/20 bg-white/5 hover:border-white/30 px-4 py-3 text-sm text-text placeholder:text-text-muted focus-ring"
                  placeholder="e.g. Tell us what your business does"
                />
              </label>
              <label className="text-[13px] text-text-muted">
                Current website
                <input
                  type="url"
                  name="website"
                  maxLength={ENQUIRY_FIELD_LIMITS.website}
                  aria-invalid={fieldErrors.website ? "true" : undefined}
                  aria-describedby={fieldErrors.website ? "website-error" : undefined}
                  className="contact-input mt-2.5 w-full rounded-xl border border-white/20 bg-white/5 hover:border-white/30 px-4 py-3 text-sm text-text placeholder:text-text-muted focus-ring"
                  placeholder="https://"
                />
                {fieldErrors.website ? <span id="website-error" className="mt-2 block text-sm text-text">{fieldErrors.website}</span> : null}
              </label>
              <label className="text-[13px] text-text-muted">
                Which package interests you?
                <select
                  name="package"
                  className="contact-input mt-2.5 w-full rounded-xl border border-white/20 bg-white/5 hover:border-white/30 px-4 py-3 text-sm text-text placeholder:text-text-muted focus-ring"
                  defaultValue={defaultPackage}
                >
                  <option value="" disabled>Select a package</option>
                  {ENQUIRY_PACKAGES.map((packageId) => (
                    <option key={packageId} value={packageId}>{({
                      foundation: "Foundation",
                      starter: "Starter",
                      growth: "Growth",
                      custom: "Custom project",
                      "not-sure": "Not sure yet - I'd like guidance",
                    } as const)[packageId]}</option>
                  ))}
                </select>
              </label>
              <label className="text-[13px] text-text-muted">
                Estimated timeline
                <select
                  name="timeline"
                  className="contact-input mt-2.5 w-full rounded-xl border border-white/20 bg-white/5 hover:border-white/30 px-4 py-3 text-sm text-text placeholder:text-text-muted focus-ring"
                  defaultValue=""
                >
                  <option value="" disabled>Select a timeline</option>
                  {ENQUIRY_TIMELINES.map((timeline) => (
                    <option key={timeline} value={timeline}>{({
                      asap: "ASAP",
                      "2-4-weeks": "2-4 weeks",
                      "1-2-months": "1-2 months",
                      "2-3-months": "2-3 months",
                      "not-sure": "Not sure yet - I'd like guidance",
                    } as const)[timeline]}</option>
                  ))}
                </select>
              </label>
              <label className="text-sm font-semibold text-text">
                Message
                <textarea
                  name="message"
                  rows={5}
                  required
                  maxLength={ENQUIRY_FIELD_LIMITS.message}
                  defaultValue={defaultMessage}
                  aria-invalid={fieldErrors.message ? "true" : undefined}
                  aria-describedby={fieldErrors.message ? "message-error" : undefined}
                  className="contact-input mt-3 w-full rounded-xl border border-white/20 bg-white/5 hover:border-white/30 px-4 py-3 text-sm text-text placeholder:text-text-muted focus-ring"
                  placeholder="Tell us about your project"
                />
                {fieldErrors.message ? <span id="message-error" className="mt-2 block text-sm text-text">{fieldErrors.message}</span> : null}
              </label>
              <input
                type="text"
                name="honeypot"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                maxLength={ENQUIRY_FIELD_LIMITS.honeypot}
                style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)" }}
              />
              <div>
                <p className="text-sm font-semibold text-text">Security verification</p>
                <p className="mt-2 text-sm text-text-muted" aria-live="polite">{verificationStatus}</p>
                <div
                  ref={turnstileContainerRef}
                  aria-label="Security verification"
                  className="mt-3 min-h-11"
                />
              </div>
              {enquiryState === "submitting" ? (
                <div role="status" aria-live="polite" className="text-sm text-text">Sending your enquiry. Please wait.</div>
              ) : null}
              {enquiryState === "success" ? (
                <div ref={statusRef} role="status" aria-live="polite" aria-label="Enquiry sent" tabIndex={-1} className="rounded-xl border border-border p-4 text-sm text-text">
                  Your enquiry has been received. We will review it and reply using the email you provided.
                </div>
              ) : null}
              {statusCopy[enquiryState] ? (
                <div ref={statusRef} role="alert" aria-live="assertive" tabIndex={-1} data-enquiry-state={enquiryState} className="rounded-xl border border-border p-4 text-sm text-text">
                  <p>{statusCopy[enquiryState]}</p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {["verification-error", "delivery-error", "configuration-error"].includes(enquiryState) ? (
                      <button type="button" className="focus-ring min-h-11 rounded-lg border border-border px-4" onClick={() => {
                        const turnstile = getTurnstile();
                        if (!siteKey || !turnstile || !widgetIdRef.current) {
                          configurationLockedRef.current = true;
                          setEnquiryState("configuration-error");
                          return;
                        }
                        configurationLockedRef.current = false;
                        resetVerification();
                        setEnquiryState("idle");
                      }}>Retry verification</button>
                    ) : null}
                    <a className="focus-ring inline-flex min-h-11 items-center" href={fallbackMailtoHref}>Email {siteConfig.email}</a>
                    <a className="focus-ring inline-flex min-h-11 items-center" href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer noopener">Use WhatsApp</a>
                  </div>
                </div>
              ) : null}
              <div className="flex flex-col gap-4">
                <button
                  type="submit"
                  disabled={enquiryState === "submitting" || enquiryState === "configuration-error" || !turnstileToken || !siteKey}
                  aria-disabled={enquiryState === "submitting" || enquiryState === "configuration-error" || !turnstileToken || !siteKey}
                  className="btn btn-primary focus-ring inline-flex min-h-11 w-full items-center justify-center rounded-[9px] bg-accent px-6 py-3 text-base font-medium text-black disabled:cursor-not-allowed disabled:opacity-60 md:w-fit"
                >
                  {enquiryState === "submitting" ? "Sending…" : "Send message"}
                </button>
                <p className="pl-1 text-sm text-text-muted">We reply within 24 hours — usually sooner.</p>
              </div>
              <p className="text-sm text-text-muted">
                Enquiry details are used to review and respond to your request, not to subscribe you to marketing. See our <Link className="focus-ring text-accent" to="/privacy">privacy information</Link>.
              </p>
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
              onClick={() => trackContactIntent({ method: "whatsapp", source: "contact_page_primary" })}
            >

              <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
              <span className="text-base font-bold text-[#25D366]">Chat on WhatsApp — fastest reply</span>
            </a>

            <div className="relative my-8 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
              <span className="relative bg-bg-elev px-3 text-[10px] font-bold uppercase tracking-widest text-text-muted">OR</span>
            </div>

            <div className="space-y-5">
              <a
                className="flex items-center gap-4 break-all text-lg font-semibold text-text transition hover:text-cyan group"
                href={genericMailtoHref}
                onClick={() => trackContactIntent({ method: "email", source: "contact_page_link" })}
              >

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.05] bg-white/[0.03] text-text-muted transition-colors group-hover:bg-amber-500/10 group-hover:text-[#F59E0B]">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span>{siteConfig.email}</span>
              </a>
              <a
                className="flex items-center gap-4 text-lg font-semibold text-text transition hover:text-cyan group"
                href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                onClick={() => trackContactIntent({ method: "phone", source: "contact_page_link" })}
              >

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.05] bg-white/[0.03] text-text-muted transition-colors group-hover:bg-blue-500/10 group-hover:text-[#3B82F6]">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span>{siteConfig.phone}</span>
              </a>
              <div className="flex items-center gap-4 pt-2">
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group/social flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.05] bg-white/[0.03] text-text-muted transition-all hover:bg-white/[0.05]"
                  aria-label="Instagram"
                  onClick={() =>
                    trackEvent("cta_click", {
                      cta_name: "instagram_contact",
                      page_path: window.location.pathname,
                    })
                  }
                >
                  <Instagram className="h-5 w-5 text-[#E4405F]" strokeWidth={1.5} />
                </a>
                <a
                  href={siteConfig.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group/social flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.05] bg-white/[0.03] text-text-muted transition-all hover:bg-white/[0.05]"
                  aria-label="Facebook"
                  onClick={() =>
                    trackEvent("cta_click", {
                      cta_name: "facebook_contact",
                      page_path: window.location.pathname,
                    })
                  }
                >
                  <Facebook className="h-5 w-5 text-[#1877F2]" strokeWidth={1.5} />
                </a>
              </div>
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
                  trackContactIntent({ method: "email", source: "contact_page_consult" });
                  window.location.href = genericMailtoHref;
                }}
              >
                {siteConfig.primaryCtaLabel}
              </button>
            </div>
          </Card>
        </div>
      </Section>
    </div>
  );
}
