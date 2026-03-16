import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { MOBILE_NAV_LINKS, NAV_LINKS } from '@/lib/content'
import { ScrollTrigger, useGSAP } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import ReactiveButton from '@/components/ui/ReactiveButton'

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
        if (self.progress > 0) {
          nav?.classList.add('nav-scrolled')
        } else {
          nav?.classList.remove('nav-scrolled')
        }
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
        className="fixed left-0 right-0 top-0 z-nav h-24 bg-transparent transition-all duration-500"
      >
        <div className="mx-auto max-w-[1600px] px-8 h-full flex items-center justify-between">
          <Link 
            to="/" 
            onClick={scrollToTop} 
            className="font-syne text-2xl font-bold uppercase tracking-tighter text-black dark:text-white"
          >
            Horizon <span className="text-teal">Digital</span>
          </Link>

          <div className="hidden items-center gap-10 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink 
                key={link.href} 
                to={link.href} 
                end={link.href === '/'} 
                onClick={scrollToTop} 
                className="relative py-2 font-syne text-xs uppercase tracking-widest text-black/60 dark:text-white/60 transition-colors duration-200 hover:text-black dark:hover:text-white"
              >
                <span className={cn(isDesktopLinkActive(link.href) ? 'text-black dark:text-white' : undefined)}>{link.label}</span>
                {isDesktopLinkActive(link.href) ? (
                  <motion.span
                    layoutId="desktop-nav-active"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute inset-x-0 bottom-0 h-[1px] bg-teal"
                  />
                ) : null}
              </NavLink>
            ))}

            <Link to="/contact" onClick={scrollToTop}>
              <ReactiveButton className="py-3 px-8 text-[10px]">
                Enquire
              </ReactiveButton>
            </Link>
          </div>

          <button
            type="button"
            className="group flex flex-col gap-1.5 items-end lg:hidden"
            aria-label="Open menu"
            onClick={() => setIsMobileOpen(true)}
          >
            <span className="block h-px w-8 bg-black dark:bg-white transition-all group-hover:w-6" />
            <span className="block h-px w-5 bg-black dark:bg-white" />
            <span className="block h-px w-8 bg-black dark:bg-white transition-all group-hover:w-10" />
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-mob flex flex-col p-12 bg-white dark:bg-black transition-transform duration-700 ease-[0.16, 1, 0.3, 1] lg:hidden',
          isMobileOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <button 
          type="button" 
          onClick={() => setIsMobileOpen(false)} 
          className="self-end font-syne text-sm uppercase tracking-widest text-black dark:text-white mb-20"
        >
          Close [×]
        </button>

        <div className="flex flex-col gap-8">
          {MOBILE_NAV_LINKS.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ x: 20, opacity: 0 }}
              animate={isMobileOpen ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <NavLink
                to={link.href}
                end={link.href === '/'}
                onClick={() => {
                  setIsMobileOpen(false)
                  scrollToTop()
                }}
                className={({ isActive }) =>
                  cn('font-syne text-5xl uppercase font-bold tracking-tighter text-black/20 dark:text-white/20 transition-colors', isActive && 'text-teal dark:text-teal')
                }
              >
                {link.label}
              </NavLink>
            </motion.div>
          ))}
        </div>

        <div className="mt-auto">
          <Link to="/contact" onClick={() => setIsMobileOpen(false)}>
            <ReactiveButton className="w-full h-20 text-xl">
              Start Project
            </ReactiveButton>
          </Link>
        </div>
      </div>
    </>
  )
}
