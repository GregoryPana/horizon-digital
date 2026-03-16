import { FOOTER } from '@/lib/content'
import Container from '@/components/ui/Container'
import Grid from '@/components/ui/Grid'
import { Link } from 'react-router-dom'
import { Globe, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black px-0 pb-[max(2.25rem,env(safe-area-inset-bottom))] pt-10 md:pt-14" aria-label="Footer">
      <Container>
        <div className="border-b border-border pb-8">
          <Grid className="gap-y-10">
            <div className="col-span-4 md:col-span-8 lg:col-span-3">
              <p className="mb-3 font-display text-ui-btn font-bold uppercase text-white">Horizon Digital</p>
              <p className="max-w-footer-brand font-sans text-body-xs text-muted">{FOOTER.tagline}</p>
            </div>

            <div className="col-span-4 md:col-span-4 lg:col-start-5 lg:col-span-4">
              <h2 className="mb-4 font-display text-ui-badge uppercase text-muted-2">Navigate</h2>
              <div className="space-y-2">
                {FOOTER.nav.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="block font-sans text-body-xs text-muted transition-colors duration-200 hover:text-teal"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="col-span-4 md:col-span-4 lg:col-start-9 lg:col-span-4">
              <h2 className="mb-4 font-display text-ui-badge uppercase text-muted-2">Contact</h2>
              <div className="space-y-3">
                <a href={`mailto:${FOOTER.email}`} className="flex items-center gap-2.5 font-sans text-body-xs text-muted transition-colors duration-200 hover:text-teal">
                  <Mail size={14} className="text-teal/60" />
                  {FOOTER.email}
                </a>
                <a href={`tel:${FOOTER.phone.replace(/\s+/g, '')}`} className="flex items-center gap-2.5 font-sans text-body-xs text-muted transition-colors duration-200 hover:text-teal">
                  <Phone size={14} className="text-teal/60" />
                  {FOOTER.phone}
                </a>
                <a href={FOOTER.wa} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 font-sans text-body-xs text-muted transition-colors duration-200 hover:text-teal">
                  <div className="flex h-[14px] w-[14px] items-center justify-center rounded-full bg-teal/10 text-[10px] text-teal">W</div>
                  WhatsApp
                </a>
                <a href={FOOTER.site} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 font-sans text-body-xs text-muted transition-colors duration-200 hover:text-teal">
                  <Globe size={14} className="text-teal/60" />
                  {FOOTER.site.replace(/^https?:\/\//, '')}
                </a>
              </div>
            </div>
          </Grid>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="font-sans text-body-caption text-muted-2">{FOOTER.copyright}</p>
          <p className="font-display text-body-xs italic text-muted-2">{FOOTER.quote}</p>
        </div>
      </Container>
    </footer>
  )
}
