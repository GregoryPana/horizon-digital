import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, MapPin, Instagram, Facebook } from "lucide-react";
import { emailTemplate, siteConfig } from "../data/site";
import { buildMailtoLink, scrollToTopSmooth } from "../lib/utils";
import { trackEvent } from "../lib/analytics";

const mainLinks = [
  { label: "Home", path: "/" },
  { label: "Services & Pricing", path: "/pricing" },
  { label: "Our Work", path: "/work" },
  { label: "What You Need", path: "/what-you-need" },
  { label: "Digital Insights", path: "/insights" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function Footer() {
  return (
    <footer className="site-footer-dark border-t border-border bg-bg-elev">
      <div className="mx-auto w-full max-w-[1760px] px-5 py-20 md:px-8 lg:px-12 xl:px-16 2xl:px-20">

        {/* Top grid — 4 columns on xl, 2 on md, 1 on mobile */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div className="flex flex-col gap-6 sm:col-span-2 lg:col-span-1">
            <p className="brand-name text-sm uppercase tracking-[0.24em] text-accent">Horizon Digital</p>
            <p className="max-w-xs text-sm leading-relaxed text-text-muted">
              Custom website design for Seychelles businesses. Built to perform, designed to convert, priced in SCR.
            </p>
            {/* Google Business badge */}
            <motion.a
              href="https://share.google/40ZCpJGHmi2tMZhDv"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04, y: -1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              onClick={() =>
                trackEvent("cta_click", {
                  cta_name: "google_verified_badge",
                  page_path: window.location.pathname,
                })
              }
              className="group inline-flex w-fit items-center gap-2.5 rounded-lg bg-white/5 px-3.5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-colors hover:text-accent"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Verified on <span className="text-text transition-colors group-hover:text-accent">Google</span></span>
            </motion.a>
          </div>

          {/* Navigate column */}
          <div className="flex flex-col gap-5">
            <p className="text-xs uppercase tracking-[0.4em] text-deep-teal">Navigate</p>
            <div className="flex flex-col gap-3">
              {mainLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => {
                    if (link.path === "/work") scrollToTopSmooth();
                  }}
                  className={({ isActive }) =>
                    `footer-nav-link nav-link-underline text-sm transition ${
                      isActive
                        ? "text-deep-teal drop-shadow-[0_0_10px_rgba(13,148,136,0.3)]"
                        : "text-text-muted hover:text-cyan"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Showcases column */}
          <div className="flex flex-col gap-5">
            <p className="text-xs uppercase tracking-[0.4em] text-deep-teal">Showcases</p>
            <div className="flex flex-col gap-2.5">
              <Link to="/showcase/takamaka-house" className="text-sm text-text-muted transition hover:text-cyan">Takamaka House</Link>
              <Link to="/showcase/forma-studio" className="text-sm text-text-muted transition hover:text-cyan">Forma Studio</Link>
              <Link to="/showcase/drake-seaside" className="text-sm text-text-muted transition hover:text-cyan">Drake Seaside</Link>
            </div>
          </div>

          {/* Contact column */}
          <div className="flex flex-col gap-5">
            <p className="text-xs uppercase tracking-[0.4em] text-deep-teal">Contact</p>
            <div className="flex flex-col gap-4">
              <a
                className="group/email flex w-fit items-center gap-3 text-sm text-text-muted transition hover:text-cyan"
                href={buildMailtoLink(siteConfig.email, emailTemplate.subject, emailTemplate.body)}
                onClick={() =>
                  trackEvent("contact_click", {
                    type: "email",
                    source: "footer",
                    page_path: window.location.pathname,
                  })
                }
              >
                <motion.div
                  whileHover={{ y: -2, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 12 }}
                  className="p-1.5 rounded-md bg-white/5"
                >
                  <Mail className="h-3.5 w-3.5 text-[#F59E0B]" strokeWidth={1.6} />
                </motion.div>
                {siteConfig.email}
              </a>
              <a
                className="group/phone flex w-fit items-center gap-3 text-sm text-text-muted transition hover:text-cyan"
                href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                onClick={() =>
                  trackEvent("contact_click", {
                    type: "phone",
                    source: "footer",
                    page_path: window.location.pathname,
                  })
                }
              >
                <motion.div
                  whileHover={{ rotate: 18, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="p-1.5 rounded-md bg-white/5"
                >
                  <Phone className="h-3.5 w-3.5 text-[#3B82F6]" strokeWidth={1.6} />
                </motion.div>
                {siteConfig.phone}
              </a>
              <a
                className="group/wa flex w-fit items-center gap-3 text-sm text-text-muted transition hover:text-cyan"
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackEvent("cta_click", {
                    cta_name: "whatsapp_footer",
                    page_path: window.location.pathname,
                  })
                }
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: -8 }}
                  transition={{ type: "spring", stiffness: 350, damping: 10 }}
                  className="p-1.5 rounded-md bg-white/5"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" strokeWidth={1.6} />
                </motion.div>
                <span>Chat on <span className="font-medium text-text transition-colors group-hover/wa:text-[#25D366]">WhatsApp</span></span>
              </a>
              <div className="flex items-center gap-4 pt-2">
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group/social p-2 rounded-md bg-white/5 transition-all hover:bg-white/10"
                  aria-label="Instagram"
                  onClick={() =>
                    trackEvent("cta_click", {
                      cta_name: "instagram_footer",
                      page_path: window.location.pathname,
                    })
                  }
                >
                  <Instagram className="h-4 w-4 text-[#E4405F] transition-colors" strokeWidth={1.8} />
                </a>
                <a
                  href={siteConfig.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group/social p-2 rounded-md bg-white/5 transition-all hover:bg-white/10"
                  aria-label="Facebook"
                  onClick={() =>
                    trackEvent("cta_click", {
                      cta_name: "facebook_footer",
                      page_path: window.location.pathname,
                    })
                  }
                >
                  <Facebook className="h-4 w-4 text-[#1877F2] transition-colors" strokeWidth={1.8} />
                </a>
              </div>
              <p className="flex items-center gap-3 text-sm text-text-muted/70">
                <MapPin className="h-3.5 w-3.5 text-[#EF4444] shrink-0 drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]" strokeWidth={1.8} />
                Based on Mahé, Seychelles
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 horizon-line opacity-20" />

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.7rem] uppercase tracking-[0.22em] text-text-muted/80">
            © {new Date().getFullYear()}{" "}
            <span className="brand-name font-semibold text-accent/80">{siteConfig.name}</span>
            {" "}— All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[0.65rem] uppercase tracking-[0.3em] text-text-muted/60">Seychelles Built</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
