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
    if (location.hash) return /* hash navigation handled below */
    const lenis = getLenis()

    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true })
      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname, location.hash])

  /* When the URL has a #section-id, smooth-scroll to that section. Two
     rAFs give the page-transition / lazy chunk time to mount before we
     measure the target. */
  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    let cancelled = false

    const scroll = () => {
      if (cancelled) return
      const el = document.getElementById(id)
      if (!el) return
      const lenis = getLenis()
      if (lenis) {
        lenis.scrollTo(el, { offset: -64 })
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(scroll)
      ;(scroll as { _raf2?: number })._raf2 = raf2
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(raf1)
    }
  }, [location.pathname, location.hash])

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
