import { useEffect, useLayoutEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { PageTransition } from '@/lib/animations/PageTransition'
import { getLenis, useLenis } from '@/lib/animations/useLenis'

export function RootLayout() {
  const location = useLocation()
  const mainRef = useRef<HTMLElement>(null)

  useLenis()

  useLayoutEffect(() => {
    const lenis = getLenis()

    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true })
      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  // Move focus to main on route change for keyboard and screen-reader users.
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

      <main
        id="main-content"
        ref={mainRef}
        className="flex-1 outline-none"
      >
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
