import { useState, useMemo } from 'react'
import { useWorks } from '@/hooks/useWorks'
import { PageSEO } from '@/components/seo/PageSEO'
import { LoadingState } from '@/components/ui/LoadingState'
import { ErrorState } from '@/components/ui/ErrorState'
import { WorkCard } from '@/components/ui/WorkCard'
import { RevealText } from '@/lib/animations/RevealText'
import { StaggerGrid, StaggerItem } from '@/lib/animations/StaggerGrid'
import clsx from 'clsx'

const CATEGORIES = [
  'All',
  'Campaign Shoots',
  'Cinematic Content',
  'Product Story',
  'Social Media',
  'Creative Direction',
]

export function WorksPage() {
  const { data, isLoading, isError, error, refetch } = useWorks()
  const [active, setActive] = useState('All')

  const filtered = useMemo(() => {
    if (!data?.items) return []
    if (active === 'All') return data.items
    return data.items.filter(w => w.category === active)
  }, [data, active])

  if (isLoading) return <LoadingState />
  if (isError || !data) {
    return <ErrorState message={(error as Error)?.message} onRetry={() => refetch()} />
  }

  return (
    <>
      <PageSEO pageTitle="Our Work" />

      <div className="tt-section">
        <div className="tt-wide">
          {/* Header */}
          <div className="mb-10 max-w-2xl">
            <RevealText as="h1" className="tt-display tt-serif text-tt-ink mb-6">
              {data.heading}
            </RevealText>
            {data.intro && (
              <p className="tt-body text-tt-ink-light leading-relaxed">{data.intro}</p>
            )}
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 mb-16 pb-8 border-b border-tt-border">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={clsx(
                  'flex items-center gap-2.5 tt-caption transition-all duration-200 pb-0.5',
                  active === cat
                    ? 'text-tt-ink border-b border-tt-ink'
                    : 'text-tt-ink-light hover:text-tt-ink border-b border-transparent',
                )}
                aria-pressed={active === cat}
              >
                <span className="opacity-35 tabular-nums">
                  {String(i).padStart(2, '0')}
                </span>
                {cat === 'All' ? 'All Works' : cat}
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          {filtered.length === 0 ? (
            <p className="tt-body py-16">No works in this category yet.</p>
          ) : (
            <StaggerGrid
              className="columns-1 sm:columns-2 lg:columns-3 gap-5"
              staggerDelay={0.05}
            >
              {filtered.map((work, i) => (
                <StaggerItem key={work.slug}>
                  <div className="break-inside-avoid mb-5">
                    <WorkCard work={work} delay={0.03 * i} />
                  </div>
                </StaggerItem>
              ))}
            </StaggerGrid>
          )}
        </div>
      </div>
    </>
  )
}
