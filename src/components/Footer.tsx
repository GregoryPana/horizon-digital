import { NavLink } from "react-router-dom";
import { emailTemplate, navLinks, siteConfig } from "../data/site";
import { buildMailtoLink, scrollToTopSmooth } from "../lib/utils";

export default function Footer() {
  return (
    <footer className="site-footer-dark border-t border-border bg-bg-elev min-h-[440px]">
      <div className="mx-auto w-full max-w-[1760px] px-5 py-24 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="footer-content grid gap-16 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-6">
            <p className="brand-name text-sm uppercase tracking-[0.24em] text-accent">Horizon Digital</p>
            <p className="max-w-xs text-sm leading-relaxed text-text-muted">
              Horizon Digital builds custom, clear, fast websites for Seychelles businesses. We focus on calm
              design, structured content, and performance that helps visitors take action.
            </p>
          </div>
          
          <div className="flex flex-col gap-6">
            <p className="text-xs uppercase tracking-[0.4em] text-accent">Navigate</p>
            <div className="flex flex-col gap-3">
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

          <div className="flex flex-col gap-6">
            <p className="text-xs uppercase tracking-[0.4em] text-accent">Contact</p>
            <div className="flex flex-col gap-4">
              <a
                className="flex w-fit items-center gap-3 text-sm text-text-muted transition hover:text-accent"
                href={buildMailtoLink(siteConfig.email, emailTemplate.subject, emailTemplate.body)}
              >
                <div className="p-1.5 rounded-md bg-white/5 border border-white/10">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 text-accent">
                    <path d="M4 6h16v12H4z" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </div>
                {siteConfig.email}
              </a>
              <a
                className="flex w-fit items-center gap-3 text-sm text-text-muted transition hover:text-accent"
                href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
              >
                <div className="p-1.5 rounded-md bg-white/5 border border-white/10">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 text-accent">
                    <path d="M7.2 4.5h3.2l1.1 3.2-1.8 1.8a13.8 13.8 0 005.2 5.2l1.8-1.8 3.2 1.1v3.2c0 .8-.6 1.4-1.4 1.4A14.8 14.8 0 014.5 7.3c0-.8.6-1.4 1.4-1.4z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  </svg>
                </div>
                {siteConfig.phone}
              </a>
              <a
                className="group flex w-fit items-center gap-3 text-sm text-text-muted transition hover:text-accent"
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noreferrer"
              >
                <div className="p-1.5 rounded-md bg-white/5 border border-white/10 group-hover:border-accent/40 transition">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 text-accent">
                    <path d="M20 11.8A8 8 0 006.4 6.2a8 8 0 00-1.1 8.9L4 20l5-1.3a8 8 0 0011-6.9z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                    <path d="M9.8 10.2c.2-.5.3-.6.6-.6h.5c.2 0 .4 0 .5.4l.7 1.7c.1.2 0 .4-.1.6l-.3.4c.4.7 1 1.4 1.7 1.9l.5-.2c.2-.1.4-.1.6 0l1.6.8c.3.1.3.3.3.5v.5c0 .3-.1.4-.5.6-.6.2-1.2.2-1.8 0-2-.7-3.8-2.5-4.6-4.5-.3-.6-.2-1.2 0-1.8z" fill="currentColor" />
                  </svg>
                </div>
                <span>Chat on <span className="font-medium text-text transition-colors group-hover:text-accent">WhatsApp</span></span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-20 horizon-line opacity-20" />
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.7rem] uppercase tracking-[0.22em] text-text-muted/80">
            © {new Date().getFullYear()} <span className="brand-name font-semibold text-accent/80">{siteConfig.name}</span> — All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[0.65rem] uppercase tracking-[0.3em] text-text-muted/60">Seychelles Built</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
