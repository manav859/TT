import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import clsx from 'clsx'

const NAV_ITEMS = [
  { label: 'HOME',     url: '/' },
  { label: 'WORKS',    url: '/works' },
  { label: 'SERVICES', url: '/services' },
  { label: 'ABOUT',    url: '/about' },
  { label: 'JOURNAL',  url: '/journal' },
] as const

const CONTACT_ITEM = { label: 'CONTACT', url: '/contact' }

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [logoBroken, setLogoBroken] = useState(false)
  const location = useLocation()
  const menuRef = useRef<HTMLDivElement>(null)

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

  return (
    <>
      <header
        className="sticky left-0 right-0 top-0 z-50 h-16 bg-white"
        style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}
      >
        <div className="tt-wide flex h-full items-center justify-between">
          <Link
            to="/"
            className="flex items-center"
            aria-label="Tusk Tales home"
          >
            {logoBroken ? (
              <span className="tt-brand-mark">TUSK TALES</span>
            ) : (
              <img
                src="/images/tt-logo.png"
                alt="Tusk Tales"
                style={{ height: '26px', width: 'auto' }}
                onError={() => setLogoBroken(true)}
              />
            )}
          </Link>

          <nav
            className="hidden items-center lg:flex"
            style={{ gap: '2.5rem' }}
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.url}
                to={item.url}
                end={item.url === '/'}
                className={({ isActive }) => clsx('tt-nav-link', isActive && 'active')}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <NavLink
              to={CONTACT_ITEM.url}
              className="tt-nav-link tt-nav-link--contact hidden md:inline-flex"
            >
              {CONTACT_ITEM.label}
            </NavLink>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center transition-opacity duration-200 hover:opacity-70 lg:hidden"
              style={{ color: '#111111' }}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            className="fixed inset-0 z-40 overflow-y-auto bg-white"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div
              className="tt-wide flex min-h-full flex-col gap-10 pb-12"
              style={{ paddingTop: 'calc(var(--height-nav) + 1.5rem)' }}
            >
              <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
                {[...NAV_ITEMS, CONTACT_ITEM].map((item, index) => (
                  <motion.div
                    key={item.url}
                    initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ delay: 0.05 * index, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <NavLink
                      to={item.url}
                      end={item.url === '/'}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        clsx('tt-nav-link block border-b border-black/[0.06] py-5', isActive && 'active')
                      }
                      style={{ fontSize: '15px', letterSpacing: '0.1em' }}
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
