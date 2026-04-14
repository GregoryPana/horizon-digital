import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import { emailTemplate, siteConfig } from "../data/site";
import { buildMailtoLink, scrollToTopSmooth } from "../lib/utils";

const mainLinks = [
  { label: "Home", path: "/" },
  { label: "Our Work", path: "/work" },
  { label: "Services & Pricing", path: "/services-pricing" },
  { label: "About", path: "/about" },
  { label: "What You Need", path: "/what-you-need" },
  { label: "Process", path: "/process" },
  { label: "Contact", path: "/contact" },
];

const insightsLinks = [
  { label: "Digital Insights", path: "/ai-digital-tools" },
  { label: "All Articles", path: "/insights" },
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
              className="group inline-flex w-fit items-center gap-2.5 rounded-lg bg-white/5 px-3.5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-colors hover:text-accent"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-accent" fill="currentColor" aria-hidden="true">
                <path d="M21.35 11.1H12.18V13.83H18.69C18.36 17.64 15.19 19.27 12.19 19.27C8.36 19.27 5 16.25 5 12C5 7.9 8.2 4.73 12.2 4.73C15.29 4.73 17.1 6.7 17.1 6.7L19 4.72C19 4.72 16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12C2.03 17.05 6.16 22 12.25 22C17.6 22 21.5 18.33 21.5 12.91C21.5 11.76 21.35 11.1 21.35 11.1Z" />
              </svg>
              Verified on Google
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

          {/* Insights column */}
          <div className="flex flex-col gap-5">
            <p className="text-xs uppercase tracking-[0.4em] text-deep-teal">Insights</p>
            <div className="flex flex-col gap-3">
              {insightsLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-text-muted transition hover:text-cyan"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-2 flex flex-col gap-2.5">
              <p className="text-xs uppercase tracking-[0.4em] text-deep-teal/70">Showcases</p>
              <a href="/showcase/takamaka-house" className="text-sm text-text-muted transition hover:text-cyan">Takamaka House</a>
              <a href="/showcase/forma-studio" className="text-sm text-text-muted transition hover:text-cyan">Forma Studio</a>
            </div>
          </div>

          {/* Contact column */}
          <div className="flex flex-col gap-5">
            <p className="text-xs uppercase tracking-[0.4em] text-deep-teal">Contact</p>
            <div className="flex flex-col gap-4">
              <a
                className="group/email flex w-fit items-center gap-3 text-sm text-text-muted transition hover:text-cyan"
                href={buildMailtoLink(siteConfig.email, emailTemplate.subject, emailTemplate.body)}
              >
                <motion.div
                  whileHover={{ y: -2, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 12 }}
                  className="p-1.5 rounded-md bg-white/5"
                >
                  <Mail className="h-3.5 w-3.5 text-cyan" strokeWidth={1.6} />
                </motion.div>
                {siteConfig.email}
              </a>
              <a
                className="group/phone flex w-fit items-center gap-3 text-sm text-text-muted transition hover:text-cyan"
                href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
              >
                <motion.div
                  whileHover={{ rotate: 18, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="p-1.5 rounded-md bg-white/5"
                >
                  <Phone className="h-3.5 w-3.5 text-cyan" strokeWidth={1.6} />
                </motion.div>
                {siteConfig.phone}
              </a>
              <a
                className="group/wa flex w-fit items-center gap-3 text-sm text-text-muted transition hover:text-cyan"
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noreferrer"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: -8 }}
                  transition={{ type: "spring", stiffness: 350, damping: 10 }}
                  className="p-1.5 rounded-md bg-white/5"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-cyan" strokeWidth={1.6} />
                </motion.div>
                <span>Chat on <span className="font-medium text-text transition-colors group-hover/wa:text-cyan">WhatsApp</span></span>
              </a>
              <p className="flex items-center gap-3 text-sm text-text-muted/70">
                <MapPin className="h-3.5 w-3.5 text-deep-teal/60 shrink-0" strokeWidth={1.6} />
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
