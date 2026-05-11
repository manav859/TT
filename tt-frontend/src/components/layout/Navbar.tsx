import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import clsx from 'clsx'
import { useBootstrap } from '@/hooks/useBootstrap'
import { SocialIcon } from '@/components/ui/SocialIcon'

const SCROLL_THRESHOLD = 54

export function Navbar() {
  const { data: bootstrap } = useBootstrap()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const menuRef = useRef<HTMLDivElement>(null)

  const identity = bootstrap?.identity
  const navItems = bootstrap?.navigation ?? []
  const social = identity?.social ?? {}

  const { primaryItems, contactItem } = useMemo(() => {
    const contact = navItems.find((item) => item.url === '/contact')
    return {
      primaryItems: navItems.filter((item) => item.url !== '/contact'),
      contactItem: contact ?? { label: 'Contact', url: '/contact', new_tab: false },
    }
  }, [navItems])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const socialEntries = Object.entries(social).filter(([, value]) => Boolean(value)) as [
    'instagram' | 'facebook' | 'twitter',
    string,
  ][]

  return (
    <>
      <header
        className={clsx(
          'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
          scrolled || menuOpen
            ? 'bg-[rgba(246,242,235,0.88)] backdrop-blur-xl'
            : 'bg-transparent',
        )}
        style={{ height: 'var(--height-nav)' }}
      >
        <div className="tt-wide h-full">
          <div
            className={clsx(
              'grid h-full grid-cols-[1fr_auto] items-center gap-4 border-b transition-colors duration-300 md:grid-cols-[auto_1fr_auto]',
              scrolled || menuOpen ? 'border-tt-border' : 'border-transparent',
            )}
          >
            <Link
              to="/"
              className="flex min-w-0 flex-col justify-center gap-1 py-3"
              aria-label="Tusk Tales home"
            >
              {identity?.logo_image?.url ? (
                <img
                  src={identity.logo_image.url}
                  alt={identity.logo_image.alt || identity.logo_text || 'Tusk Tales'}
                  className="h-10 w-auto md:h-12"
                />
              ) : (
                <span className="tt-logo-wordmark">
                  <strong>{(identity?.logo_text ?? 'TUSK TALES').split(' ')[0]}</strong>
                  <span>{(identity?.logo_text ?? 'TUSK TALES').split(' ').slice(1).join(' ') || 'Tales'}</span>
                </span>
              )}
              <span className="tt-logo-submark hidden md:inline-flex">
                {identity?.tagline || 'Purpose in every frame'}
              </span>
            </Link>

            <nav className="hidden items-center justify-center gap-8 lg:flex" aria-label="Main navigation">
              {primaryItems.map((item) => (
                <NavLink
                  key={item.url}
                  to={item.url}
                  target={item.new_tab ? '_blank' : undefined}
                  rel={item.new_tab ? 'noopener noreferrer' : undefined}
                  className={({ isActive }) => clsx('tt-nav-link', isActive && 'active')}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center justify-end gap-3 md:gap-4">
              <div className="hidden items-center gap-4 md:flex">
                {socialEntries.map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={key}
                    className="text-tt-ink-light transition-colors duration-200 hover:text-tt-ink"
                  >
                    <SocialIcon name={key} size={15} />
                  </a>
                ))}
              </div>

              <Link
                to={contactItem.url}
                className="hidden min-w-[10rem] items-center justify-center border border-tt-accent/[0.7] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-tt-ink transition-all duration-200 hover:bg-tt-ink hover:text-tt-white md:inline-flex"
              >
                {contactItem.label}
              </Link>

              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center border border-tt-border bg-white/[0.6] text-tt-ink transition-colors duration-200 hover:border-tt-accent hover:text-tt-accent lg:hidden"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
              >
                {menuOpen ? <X size={19} strokeWidth={1.75} /> : <Menu size={19} strokeWidth={1.75} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            className="fixed inset-0 z-40 overflow-y-auto bg-[linear-gradient(180deg,rgba(251,248,243,0.98)_0%,rgba(243,237,228,0.98)_100%)]"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="tt-wide flex min-h-full flex-col gap-12 pb-12" style={{ paddingTop: 'calc(var(--height-nav) + 1.5rem)' }}>
              <div className="tt-panel p-6 md:p-8">
                <p className="tt-caption mb-3">Studio</p>
                <p className="tt-heading-md text-tt-ink">
                  {identity?.tagline || 'Purpose in every frame'}
                </p>
                {identity?.description && (
                  <p className="tt-body mt-4 max-w-md">{identity.description}</p>
                )}
              </div>

              <nav className="flex flex-col gap-5" aria-label="Mobile navigation">
                {[...primaryItems, contactItem].map((item, index) => (
                  <motion.div
                    key={item.url}
                    initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ delay: 0.05 * index, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <NavLink
                      to={item.url}
                      target={item.new_tab ? '_blank' : undefined}
                      rel={item.new_tab ? 'noopener noreferrer' : undefined}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        clsx(
                          'tt-heading-xl block border-b border-tt-border py-3 text-tt-ink transition-opacity duration-200',
                          isActive ? 'opacity-100' : 'opacity-75 hover:opacity-100',
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {socialEntries.length > 0 && (
                <div className="mt-auto flex items-center gap-6 border-t border-tt-border pt-6">
                  {socialEntries.map(([key, url]) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={key}
                      className="text-tt-ink-light transition-colors duration-200 hover:text-tt-ink"
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
