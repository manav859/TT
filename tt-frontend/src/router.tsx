import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/components/layout/RootLayout'
import { PageSkeleton } from '@/components/ui/PageSkeleton'

/* ── Lazy page imports ───────────────────────────────────────────────── */
const HomePage          = lazy(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage })))
const WorksPage         = lazy(() => import('@/pages/WorksPage').then(m => ({ default: m.WorksPage })))
const WorkSinglePage    = lazy(() => import('@/pages/WorkSinglePage').then(m => ({ default: m.WorkSinglePage })))
const ServicesPage      = lazy(() => import('@/pages/ServicesPage').then(m => ({ default: m.ServicesPage })))
const ServiceSinglePage = lazy(() => import('@/pages/ServiceSinglePage').then(m => ({ default: m.ServiceSinglePage })))
const AboutPage         = lazy(() => import('@/pages/AboutPage').then(m => ({ default: m.AboutPage })))
const JournalPage       = lazy(() => import('@/pages/JournalPage').then(m => ({ default: m.JournalPage })))
const JournalSinglePage = lazy(() => import('@/pages/JournalSinglePage').then(m => ({ default: m.JournalSinglePage })))
const ContactPage       = lazy(() => import('@/pages/ContactPage').then(m => ({ default: m.ContactPage })))
const PrivacyPage       = lazy(() => import('@/pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })))
const NotFoundPage      = lazy(() => import('@/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })))

function SuspendedPage({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageSkeleton />}>{children}</Suspense>
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true,             element: <SuspendedPage><HomePage /></SuspendedPage> },
      { path: 'works',           element: <SuspendedPage><WorksPage /></SuspendedPage> },
      { path: 'works/:slug',     element: <SuspendedPage><WorkSinglePage /></SuspendedPage> },
      { path: 'services',        element: <SuspendedPage><ServicesPage /></SuspendedPage> },
      { path: 'services/:slug',  element: <SuspendedPage><ServiceSinglePage /></SuspendedPage> },
      { path: 'about',           element: <SuspendedPage><AboutPage /></SuspendedPage> },
      { path: 'journal',         element: <SuspendedPage><JournalPage /></SuspendedPage> },
      { path: 'journal/:slug',   element: <SuspendedPage><JournalSinglePage /></SuspendedPage> },
      { path: 'contact',         element: <SuspendedPage><ContactPage /></SuspendedPage> },
      { path: 'privacy',         element: <SuspendedPage><PrivacyPage /></SuspendedPage> },
      { path: '*',               element: <SuspendedPage><NotFoundPage /></SuspendedPage> },
    ],
  },
])
