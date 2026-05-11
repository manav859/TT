import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { PageTransition } from '@/lib/animations/PageTransition'
import { useLenis } from '@/lib/animations/useLenis'

export function RootLayout() {
  const location  = useLocation()
  const mainRef   = useRef<HTMLElement>(null)

  useLenis()

  /* Move focus to main on route change — accessibility */
  useEffect(() => {
    const el = mainRef.current
    if (!el) return
    el.setAttribute('tabindex', '-1')
    el.focus({ preventScroll: true })
    el.removeAttribute('tabindex')
  }, [location.pathname])

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <Navbar />

      <main id="main-content" ref={mainRef} className="flex-1 outline-none" style={{ paddingTop: 'var(--height-nav)' }}>
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>

      <Footer />
    </>
  )
}
