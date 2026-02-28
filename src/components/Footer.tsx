import { NavLink } from "react-router-dom";
import { emailTemplate, navLinks, siteConfig } from "../data/site";
import Logo from "./Logo";
import { buildMailtoLink, scrollToTopSmooth } from "../lib/utils";

export default function Footer() {
  return (
    <footer className="site-footer-dark border-t border-border bg-bg-elev">
      <div className="mx-auto w-full max-w-7xl px-8 py-20">
        <div className="footer-content flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Logo />
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
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => {
                      if (link.path === "/work") scrollToTopSmooth();
                    }}
                    className={({ isActive }) =>
                      `footer-nav-link text-sm transition ${
                        isActive
                          ? "text-accent drop-shadow-[0_0_10px_rgba(34,241,214,0.5)]"
                          : "text-text-muted hover:text-accent"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-accent">Contact</p>
              <a
                className="mt-4 inline-flex items-center gap-2 text-sm text-text-muted transition hover:text-accent"
                href={buildMailtoLink(siteConfig.email, emailTemplate.subject, emailTemplate.body)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
                  <path d="M4 6h16v12H4z" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                {siteConfig.email}
              </a>
              <a
                className="mt-3 inline-flex items-center gap-2 text-sm text-text-muted transition hover:text-accent"
                href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
                  <path d="M7.2 4.5h3.2l1.1 3.2-1.8 1.8a13.8 13.8 0 005.2 5.2l1.8-1.8 3.2 1.1v3.2c0 .8-.6 1.4-1.4 1.4A14.8 14.8 0 014.5 7.3c0-.8.6-1.4 1.4-1.4z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
                {siteConfig.phone}
              </a>
              <a
                className="group mt-3 inline-flex items-center gap-2 text-sm text-text-muted transition hover:text-accent"
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
                  <path d="M20 11.8A8 8 0 006.4 6.2a8 8 0 00-1.1 8.9L4 20l5-1.3a8 8 0 0011-6.9z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M9.8 10.2c.2-.5.3-.6.6-.6h.5c.2 0 .4 0 .5.4l.7 1.7c.1.2 0 .4-.1.6l-.3.4c.4.7 1 1.4 1.7 1.9l.5-.2c.2-.1.4-.1.6 0l1.6.8c.3.1.3.3.3.5v.5c0 .3-.1.4-.5.6-.6.2-1.2.2-1.8 0-2-.7-3.8-2.5-4.6-4.5-.3-.6-.2-1.2 0-1.8z" fill="currentColor" />
                </svg>
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
