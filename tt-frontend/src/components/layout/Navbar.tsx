import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useBootstrap } from '@/hooks/useBootstrap'
import { SocialIcon } from '@/components/ui/SocialIcon'
import clsx from 'clsx'

const SCROLL_THRESHOLD = 60

export function Navbar() {
  const { data: bootstrap } = useBootstrap()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const menuRef  = useRef<HTMLDivElement>(null)

  const identity  = bootstrap?.identity
  const navItems  = bootstrap?.navigation ?? []
  const social    = bootstrap?.identity?.social ?? {}

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const socialEntries = Object.entries(social).filter(([, v]) => Boolean(v)) as [
    'instagram' | 'facebook' | 'twitter', string
  ][]

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-tt-off-white/95 backdrop-blur-sm shadow-[0_1px_0_var(--color-tt-border)]'
            : 'bg-transparent',
        )}
        style={{ height: 'var(--height-nav)' }}
      >
        <div className="tt-wide h-full flex items-center justify-between gap-6">
          {/* Logo */}
          <Link
            to="/"
            className="tt-label text-tt-ink hover:opacity-60 transition-opacity duration-200 shrink-0"
            aria-label="Tusk Tales — Home"
          >
            {identity?.logo_text ?? 'TUSK TALES'}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.url}
                to={item.url}
                className={({ isActive }) => clsx('tt-nav-link', isActive && 'active')}
                target={item.new_tab ? '_blank' : undefined}
                rel={item.new_tab ? 'noopener noreferrer' : undefined}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-5">
            {/* Social icons */}
            <div className="hidden md:flex items-center gap-4">
              {socialEntries.map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={key}
                  className="text-tt-ink opacity-50 hover:opacity-100 transition-opacity duration-200"
                >
                  <SocialIcon name={key} size={15} />
                </a>
              ))}
            </div>

            {/* Contact CTA */}
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center px-4 py-1.5 border border-tt-border text-tt-ink tt-label hover:bg-tt-ink hover:text-tt-white hover:border-tt-ink transition-all duration-250"
            >
              Contact
            </Link>

            {/* Hamburger */}
            <button
              className="md:hidden text-tt-ink opacity-70 hover:opacity-100 transition-opacity"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            className="fixed inset-0 z-40 bg-tt-off-white flex flex-col"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="tt-wide flex-1 flex flex-col justify-center pb-16 gap-10" style={{ paddingTop: 'var(--height-nav)' }}>
              <nav className="flex flex-col gap-6" aria-label="Mobile navigation">
                {[...navItems, { label: 'Contact', url: '/contact', new_tab: false }].map((item, i) => (
                  <motion.div
                    key={item.url}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        clsx(
                          'tt-heading-lg tt-serif block',
                          isActive
                            ? 'text-tt-ink opacity-100'
                            : 'text-tt-ink opacity-40 hover:opacity-70 transition-opacity duration-200',
                        )
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {socialEntries.length > 0 && (
                <div className="flex items-center gap-6 pt-6 border-t border-tt-border">
                  {socialEntries.map(([key, url]) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={key}
                      className="text-tt-ink opacity-50 hover:opacity-100 transition-opacity"
                    >
                      <SocialIcon name={key} size={18} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
