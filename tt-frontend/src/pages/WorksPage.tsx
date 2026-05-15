import { useState } from 'react'
import clsx from 'clsx'
import { useWorks } from '@/hooks/useWorks'
import { PageSEO } from '@/components/seo/PageSEO'
import { WorksSkeleton } from '@/components/ui/PageSkeleton'
import { ErrorState } from '@/components/ui/ErrorState'
import { WorkCard } from '@/components/ui/WorkCard'
import { RevealText } from '@/lib/animations/RevealText'
import { StaggerGrid, StaggerItem } from '@/lib/animations/StaggerGrid'

export function WorksPage() {
  const { data, isLoading, isError, error, refetch } = useWorks()
  const [active, setActive] = useState('All')

  if (isLoading) return <WorksSkeleton />
  if (isError || !data) {
    return <ErrorState message={(error as Error)?.message} onRetry={() => refetch()} />
  }

  const categories = [
    'All',
    ...Array.from(
      new Set(
        data.items
          .map((item) => item.category)
          .filter((category): category is string => Boolean(category)),
      ),
    ),
  ]
  const filtered =
    active === 'All' ? data.items : data.items.filter((item) => item.category === active)

  return (
    <>
      <PageSEO pageTitle="Our Work" />

      <div className="tt-wide tt-page-shell pt-3 md:pt-5">
        <div className="mb-14 tt-rule md:mb-16" />

        <div className="mb-32 max-w-3xl md:mb-48">
          <div className="mb-5 flex items-center gap-4 md:mb-6">
            <span className="h-px w-10 bg-tt-accent" />
            <p className="tt-caption text-tt-accent-dark">Works</p>
          </div>
          <RevealText as="h1" className="mb-6 tt-display text-tt-ink md:mb-8">
            {data.heading}
          </RevealText>
          {data.intro && <p className="tt-body-lead max-w-2xl leading-[1.85]">{data.intro}</p>}
        </div>

        <div className="mb-32 md:mb-44">
          <div className="tt-scroll-clean -mx-[var(--spacing-gutter)] overflow-x-auto px-[var(--spacing-gutter)]">
            <div className="flex min-w-max items-center gap-6 md:flex-wrap md:gap-x-8 md:gap-y-4">
              {categories.map((category, index) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActive(category)}
                  aria-pressed={active === category}
                  className={clsx(
                    'group relative inline-flex items-center gap-3 whitespace-nowrap pb-2 text-[0.8rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-200',
                    active === category
                      ? 'text-tt-ink'
                      : 'text-tt-ink-light hover:text-tt-ink-soft',
                  )}
                >
                  <span
                    className={clsx(
                      'tabular-nums text-[0.72rem] tracking-[0.18em] transition-colors duration-200',
                      active === category ? 'text-tt-accent-dark' : 'text-tt-taupe-dark/80',
                    )}
                  >
                    {String(index).padStart(2, '0')}
                  </span>
                  <span>{category === 'All' ? 'All Works' : category}</span>
                  <span
                    aria-hidden="true"
                    className={clsx(
                      'absolute inset-x-0 bottom-0 h-px origin-left transition-all duration-200',
                      active === category
                        ? 'scale-x-100 bg-tt-accent'
                        : 'scale-x-0 bg-tt-accent/70 group-hover:scale-x-100',
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="tt-body py-16">No works in this category yet.</p>
        ) : (
          <StaggerGrid className="columns-1 gap-6 sm:columns-2 md:gap-7 xl:columns-3" staggerDelay={0.05}>
            {filtered.map((work, index) => (
              <StaggerItem key={work.slug}>
                <div className="mb-12 break-inside-avoid md:mb-14">
                  <WorkCard work={work} delay={0.03 * index} />
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        )}
      </div>
    </>
  )
}
