import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import { MOBILE_NAV_LINKS, NAV_LINKS } from '@/lib/content'
import { ScrollTrigger, useGSAP } from '@/lib/gsap'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isDesktopLinkActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/'
    }

    return location.pathname.startsWith(href)
  }

  useGSAP(() => {
    ScrollTrigger.create({
      start: 'top -60',
      end: 99999,
      onUpdate: (self) => {
        const nav = document.getElementById('main-nav')
        nav?.classList.toggle('nav-scrolled', self.progress > 0)
      },
    })
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileOpen])

  return (
    <>
      <nav
        id="main-nav"
        className="fixed left-0 right-0 top-0 z-nav h-nav border-b border-transparent bg-transparent transition duration-300"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <Container className="!max-w-[1560px] flex h-full items-center justify-between">
          <Link to="/" onClick={scrollToTop} className="font-syne text-ui-btn font-bold uppercase text-white">
            Horizon Digital
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} to={link.href} end={link.href === '/'} onClick={scrollToTop} className="relative px-0.5 pb-1 font-syne text-ui-nav text-muted transition-colors duration-200 hover:text-white">
                <span className={cn('relative z-[1]', isDesktopLinkActive(link.href) ? 'text-white' : undefined)}>{link.label}</span>
                {isDesktopLinkActive(link.href) ? (
                  <motion.span
                    layoutId="desktop-nav-active"
                    transition={{ type: 'spring', stiffness: 540, damping: 42, mass: 0.7 }}
                    className="absolute inset-x-0 -bottom-1 h-[2px] rounded-full bg-teal"
                  />
                ) : null}
              </NavLink>
            ))}

            <Button variant="primary" href="/contact" onClick={scrollToTop} className="px-5 py-2.5" showArrow>
              Get a quote
            </Button>
          </div>

          <button
            type="button"
            className="relative group inline-flex h-11 w-11 items-center justify-center lg:hidden"
            aria-label="Open menu"
            aria-expanded={isMobileOpen}
            onClick={() => setIsMobileOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <span className="block h-px w-6 bg-cream transition duration-200 group-hover:bg-white" />
            <span className="absolute block h-px w-6 -translate-y-2 bg-cream transition duration-200 group-hover:bg-white" />
            <span className="absolute block h-px w-6 translate-y-2 bg-cream transition duration-200 group-hover:bg-white" />
          </button>
        </Container>
      </nav>

      <div
        className={cn(
          'fixed inset-0 z-mob flex flex-col items-center justify-center gap-8 bg-dark px-gut-sm transition-transform duration-500 ease-mobile-nav lg:hidden',
          isMobileOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        style={{ paddingTop: 'max(1.5rem, env(safe-area-inset-top))', paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
      >
        <button type="button" onClick={() => setIsMobileOpen(false)} className="absolute right-6 top-6 font-syne text-ui-btn text-muted">
          Close ×
        </button>

        {MOBILE_NAV_LINKS.map((link) => (
          <NavLink
            key={link.href}
            to={link.href}
            end={link.href === '/'}
            onClick={() => {
              setIsMobileOpen(false)
              scrollToTop()
            }}
            className={({ isActive }) =>
              cn('relative font-cormorant text-display-md text-white transition-colors duration-200 hover:text-teal', isActive && 'text-teal')
            }
          >
            {({ isActive }) => (
              <>
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="mobile-nav-active"
                    className="absolute -left-6 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-teal"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}

        <NavLink
          to="/contact"
          onClick={() => {
            setIsMobileOpen(false)
            scrollToTop()
          }}
          className="font-cormorant text-display-md text-teal"
        >
          Start a project →
        </NavLink>
      </div>
    </>
  )
}
