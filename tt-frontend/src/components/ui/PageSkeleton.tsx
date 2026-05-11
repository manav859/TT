import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

function SkeletonLine({
  className,
}: {
  className: string
}) {
  return <div className={`tt-skeleton ${className}`} style={{ borderRadius: 0 }} />
}

function SkeletonShell({
  children,
  label,
}: {
  children: React.ReactNode
  label: string
}) {
  return (
    <motion.div
      aria-busy="true"
      aria-label={label}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.18 }}
      className="tt-page-shell"
    >
      {children}
    </motion.div>
  )
}

export function HomeSkeleton() {
  return (
    <SkeletonShell label="Loading home page">
      <div className="tt-wide space-y-14">
        <div className="flex flex-col items-center gap-5 pt-8">
          <SkeletonLine className="h-4 w-28" />
          <SkeletonLine className="h-20 w-full max-w-3xl" />
          <SkeletonLine className="h-4 w-48" />
        </div>
      </div>
      <div className="mt-10 tt-skeleton w-full aspect-16/7" />
      <div className="tt-wide tt-section-tight">
        <div className="space-y-[4.5rem]">
          <section className="space-y-10">
            <div className="flex items-end justify-between gap-8">
              <div className="space-y-4">
                <SkeletonLine className="h-4 w-20" />
                <SkeletonLine className="h-12 w-72" />
              </div>
              <SkeletonLine className="hidden h-4 w-28 sm:block" />
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="space-y-4">
                  <SkeletonLine className="aspect-3/4 w-full" />
                  <SkeletonLine className="h-4 w-40" />
                  <SkeletonLine className="h-3 w-28" />
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-10">
            <div className="flex items-end justify-between gap-8">
              <div className="space-y-4">
                <SkeletonLine className="h-4 w-24" />
                <SkeletonLine className="h-12 w-80" />
              </div>
              <SkeletonLine className="hidden h-4 w-28 sm:block" />
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="space-y-4">
                  <SkeletonLine className="aspect-5/8 w-full" />
                  <SkeletonLine className="h-4 w-28" />
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-10">
            <div className="space-y-4">
              <SkeletonLine className="h-4 w-24" />
              <SkeletonLine className="h-12 w-72" />
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="space-y-4">
                  <SkeletonLine className="aspect-3/2 w-full" />
                  <SkeletonLine className="h-4 w-20" />
                  <SkeletonLine className="h-6 w-full" />
                  <SkeletonLine className="h-3 w-5/6" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <div className="tt-wide pb-20">
        <div className="tt-panel grid grid-cols-1 gap-8 p-8 md:grid-cols-[1.1fr_0.9fr] md:p-12">
          <div className="space-y-4">
            <SkeletonLine className="h-4 w-24" />
            <SkeletonLine className="h-16 w-full max-w-xl" />
            <SkeletonLine className="h-4 w-full max-w-md" />
            <SkeletonLine className="h-12 w-48" />
          </div>
          <SkeletonLine className="aspect-4/5 w-full" />
        </div>
      </div>
    </SkeletonShell>
  )
}

export function WorksSkeleton() {
  return (
    <SkeletonShell label="Loading works page">
      <div className="tt-wide tt-page-shell space-y-12">
        <div className="max-w-2xl space-y-5">
          <SkeletonLine className="h-4 w-20" />
          <SkeletonLine className="h-20 w-full max-w-3xl" />
          <SkeletonLine className="h-4 w-full max-w-xl" />
        </div>
        <div className="flex flex-wrap gap-3 border-b border-tt-border pb-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonLine key={index} className="h-10 w-28" />
          ))}
        </div>
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="mb-5 break-inside-avoid space-y-4">
              <SkeletonLine className={`${index % 3 === 0 ? 'aspect-4/3' : 'aspect-3/4'} w-full`} />
              <SkeletonLine className="h-4 w-40" />
              <SkeletonLine className="h-3 w-24" />
            </div>
          ))}
        </div>
      </div>
    </SkeletonShell>
  )
}

export function ServicesSkeleton() {
  return (
    <SkeletonShell label="Loading services page">
      <div className="tt-wide tt-page-shell space-y-[4.5rem]">
        <div className="max-w-2xl space-y-5">
          <SkeletonLine className="h-4 w-24" />
          <SkeletonLine className="h-18 w-full max-w-3xl" />
          <SkeletonLine className="h-4 w-full max-w-xl" />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <SkeletonLine className="aspect-5/8 w-full" />
              <SkeletonLine className="h-4 w-28" />
              <SkeletonLine className="h-3 w-full" />
            </div>
          ))}
        </div>
        <div className="tt-divider" />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <SkeletonLine className="h-4 w-24" />
            <SkeletonLine className="h-14 w-full max-w-sm" />
            <SkeletonLine className="h-4 w-full max-w-xs" />
            <SkeletonLine className="h-4 w-full max-w-xs" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonLine key={index} className={`${index === 5 ? 'h-36 sm:col-span-2' : 'h-14'} w-full`} />
            ))}
          </div>
        </div>
      </div>
    </SkeletonShell>
  )
}

export function AboutSkeleton() {
  return (
    <SkeletonShell label="Loading about page">
      <div className="tt-wide tt-page-shell space-y-14">
        <div className="space-y-5">
          <SkeletonLine className="h-4 w-20" />
          <SkeletonLine className="h-18 w-full max-w-2xl" />
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <SkeletonLine className="h-4 w-28" />
            <SkeletonLine className="h-4 w-full" />
            <SkeletonLine className="h-4 w-11/12" />
            <SkeletonLine className="h-4 w-10/12" />
          </div>
          <div className="space-y-4">
            <SkeletonLine className="h-4 w-full" />
            <SkeletonLine className="h-4 w-full" />
            <SkeletonLine className="h-4 w-10/12" />
          </div>
        </div>
      </div>
      <div className="tt-wide mt-10">
        <SkeletonLine className="aspect-16/7 w-full" />
      </div>
      <div className="tt-wide tt-section-tight space-y-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <SkeletonLine className="h-4 w-20" />
              <SkeletonLine className="h-px w-8" />
              <SkeletonLine className="h-4 w-full" />
              <SkeletonLine className="h-4 w-11/12" />
            </div>
          ))}
        </div>
      </div>
    </SkeletonShell>
  )
}

export function ContactSkeleton() {
  return (
    <SkeletonShell label="Loading contact page">
      <div className="tt-wide tt-page-shell">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="tt-panel p-8 md:p-10 space-y-6">
            <SkeletonLine className="h-4 w-24" />
            <SkeletonLine className="h-18 w-full max-w-lg" />
            <SkeletonLine className="h-4 w-full max-w-md" />
            <SkeletonLine className="aspect-4/5 w-full" />
          </div>
          <div className="tt-panel p-8 md:p-10">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Array.from({ length: 7 }).map((_, index) => (
                <SkeletonLine key={index} className={`${index === 6 ? 'h-36 sm:col-span-2' : 'h-14'} w-full`} />
              ))}
              <div className="sm:col-span-2 flex flex-wrap gap-3">
                {Array.from({ length: 7 }).map((_, index) => (
                  <SkeletonLine key={index} className="h-11 w-32" />
                ))}
              </div>
              <SkeletonLine className="h-12 w-44 sm:col-span-2" />
            </div>
          </div>
        </div>
      </div>
    </SkeletonShell>
  )
}

export function JournalSkeleton() {
  return (
    <SkeletonShell label="Loading journal page">
      <div className="tt-wide tt-page-shell space-y-12">
        <div className="space-y-5">
          <SkeletonLine className="h-4 w-24" />
          <SkeletonLine className="h-18 w-full max-w-2xl" />
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <SkeletonLine className="aspect-3/2 w-full" />
              <SkeletonLine className="h-4 w-24" />
              <SkeletonLine className="h-6 w-full" />
              <SkeletonLine className="h-4 w-5/6" />
              <SkeletonLine className="h-3 w-32" />
            </div>
          ))}
        </div>
      </div>
    </SkeletonShell>
  )
}

export function SinglePageSkeleton() {
  return (
    <SkeletonShell label="Loading page">
      <div className="tt-wide space-y-12 pb-24 pt-16 md:space-y-16 md:pb-32 md:pt-24">
        <div className="mx-auto max-w-[90rem]">
          <div className="grid grid-cols-1 gap-10 xl:gap-16 lg:grid-cols-[minmax(0,0.58fr)_minmax(360px,0.42fr)]">
            <div className="space-y-6">
              <SkeletonLine className="h-4 w-28" />
              <SkeletonLine className="h-[clamp(320px,65vh,480px)] w-full md:h-[clamp(520px,72vh,760px)]" />
            </div>

            <div className="space-y-8">
              <SkeletonLine className="h-4 w-24" />
              <div className="space-y-5">
                <SkeletonLine className="h-20 w-full max-w-2xl" />
                <SkeletonLine className="h-4 w-full max-w-xl" />
              </div>
              <div className="grid grid-cols-2 gap-5 border-y border-tt-border py-5">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="space-y-2">
                    <SkeletonLine className="h-3 w-20" />
                    <SkeletonLine className="h-4 w-full max-w-28" />
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <SkeletonLine className="h-4 w-full" />
                <SkeletonLine className="h-4 w-11/12" />
                <SkeletonLine className="h-4 w-10/12" />
              </div>
              <div className="flex gap-4 border-t border-tt-border pt-6">
                <SkeletonLine className="h-4 w-24" />
                <SkeletonLine className="h-4 w-28" />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[90rem] space-y-8">
          <div className="space-y-2">
            <SkeletonLine className="h-4 w-24" />
            <SkeletonLine className="h-3 w-20" />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonLine
                key={index}
                className={`${index % 3 === 0 ? 'aspect-4/3' : 'aspect-3/4'} w-full`}
              />
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-[76rem] border-t border-tt-border pt-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <SkeletonLine className="h-4 w-24" />
              <SkeletonLine className="h-4 w-full max-w-md" />
            </div>
            <div className="flex flex-wrap gap-4">
              <SkeletonLine className="h-10 w-32" />
              <SkeletonLine className="h-12 w-44" />
            </div>
          </div>
        </div>
      </div>
    </SkeletonShell>
  )
}

export function PageSkeleton() {
  const { pathname } = useLocation()

  if (pathname === '/') return <HomeSkeleton />
  if (pathname === '/works') return <WorksSkeleton />
  if (pathname === '/services') return <ServicesSkeleton />
  if (pathname === '/about') return <AboutSkeleton />
  if (pathname === '/contact') return <ContactSkeleton />
  if (pathname === '/journal') return <JournalSkeleton />
  if (
    pathname.startsWith('/works/')
    || pathname.startsWith('/services/')
    || pathname.startsWith('/journal/')
    || pathname === '/privacy'
  ) {
    return <SinglePageSkeleton />
  }

  return <HomeSkeleton />
}
