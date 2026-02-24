import { Link } from "react-router-dom";
import { emailTemplate, navLinks, siteConfig } from "../data/site";
import Logo from "./Logo";
import logo from "../assets/logo/favicon.png";
import { buildMailtoLink } from "../lib/utils";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-elev">
      <div className="mx-auto w-full max-w-7xl px-8 py-20">
        <div className="footer-content flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Logo imageSrc={logo} />
            <p className="mt-6 text-sm text-text-muted">
              Horizon Digital builds custom, clear, fast websites for Seychelles businesses. We focus on calm
              design, structured content, and performance that helps visitors take action.
            </p>
          </div>
          <div className="grid gap-12 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-accent">Navigate</p>
              <div className="mt-4 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-sm text-text-muted transition hover:text-accent"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-accent">Contact</p>
              <a
                className="mt-4 block text-sm text-text-muted transition hover:text-accent"
                href={buildMailtoLink(siteConfig.email, emailTemplate.subject, emailTemplate.body)}
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
              <p className="mt-6 text-xs text-text-muted">
                Designed and built by {" "}
                <a
                  className="text-text/90 transition hover:text-accent"
                  href={siteConfig.url}
                >
                  {siteConfig.name}
                </a>
                {" — Web Design in "}
                {siteConfig.location}. Contact: {" "}
                <a
                  className="text-text/90 transition hover:text-accent"
                  href={buildMailtoLink(siteConfig.email, emailTemplate.subject, emailTemplate.body)}
                >
                  {siteConfig.email}
                </a>
                {" | "}
                <a
                  className="text-text/90 transition hover:text-accent"
                  href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                >
                  {siteConfig.phone}
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10 horizon-line" />
        <p className="mt-6 text-xs text-text-muted">(c) {new Date().getFullYear()} {siteConfig.name}</p>
      </div>
    </footer>
  );
}
