import { NavLink } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { buildMailtoLink, scrollToTopSmooth } from "../lib/utils";
import { emailTemplate, navLinks, siteConfig } from "../data/site";
import { trackContactIntent } from "../lib/analytics";
import WhatsAppIcon from "./ui/WhatsAppIcon";

export default function Footer() {
  return (
    <footer className="site-footer-dark border-t border-border bg-bg-elev">
      <div className="container-wide py-16 sm:py-20 lg:py-24">
        <div className="grid gap-12 border-b border-border pb-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="brand-name text-sm uppercase tracking-[0.16em] text-accent">Horizon Digital</p>
            <h2 className="mt-5 max-w-xl text-balance text-3xl font-semibold tracking-[-0.03em] text-text sm:text-4xl">
              Custom websites for Seychelles businesses.
            </h2>
            <p className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-text-muted">
              Planned, designed and built in Seychelles around your services, customers and agreed project goals.
            </p>
          </div>

          <nav className="lg:col-span-3 lg:col-start-7" aria-label="Footer navigation">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-text-dim">Explore</p>
            <ul className="mt-4 grid gap-1">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    onClick={() => {
                      if (link.path === "/work") scrollToTopSmooth();
                    }}
                    className={({ isActive }) =>
                      `focus-ring inline-flex min-h-11 items-center rounded-lg text-sm transition-colors ${
                        isActive ? "text-accent" : "text-text-muted hover:text-text"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3 lg:col-start-10">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-text-dim">Start a conversation</p>
            <div className="mt-4 grid gap-2">
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="focus-ring group flex min-h-11 items-center gap-3 rounded-lg text-sm text-text-muted transition-colors hover:text-[#51df87]"
                onClick={() => trackContactIntent({ method: "whatsapp", source: "footer" })}
              >
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                Chat on WhatsApp
              </a>
              <a
                href={buildMailtoLink(siteConfig.email, emailTemplate.subject, emailTemplate.body)}
                className="focus-ring flex min-h-11 items-center gap-3 rounded-lg text-sm text-text-muted transition-colors hover:text-text"
                onClick={() => trackContactIntent({ method: "email", source: "footer" })}
              >
                <Mail className="h-4 w-4 text-accent" aria-hidden="true" />
                {siteConfig.email}
              </a>
              <a
                href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                className="focus-ring flex min-h-11 items-center gap-3 rounded-lg text-sm text-text-muted transition-colors hover:text-text"
                onClick={() => trackContactIntent({ method: "phone", source: "footer" })}
              >
                <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
                {siteConfig.phone}
              </a>
              <p className="flex min-h-11 items-center gap-3 text-sm text-text-dim">
                <MapPin className="h-4 w-4 text-accent-2" aria-hidden="true" />
                {siteConfig.location}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-7 text-[0.68rem] uppercase tracking-[0.13em] text-text-dim sm:flex-row sm:items-center sm:justify-between sm:pr-28">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Built in Seychelles · Custom code</p>
        </div>
      </div>
    </footer>
  );
}
