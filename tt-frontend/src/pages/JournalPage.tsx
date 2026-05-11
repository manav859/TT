import { useJournal } from '@/hooks/useJournal'
import { PageSEO } from '@/components/seo/PageSEO'
import { JournalSkeleton } from '@/components/ui/PageSkeleton'
import { ErrorState } from '@/components/ui/ErrorState'
import { JournalCard } from '@/components/ui/JournalCard'
import { RevealText } from '@/lib/animations/RevealText'
import { StaggerGrid, StaggerItem } from '@/lib/animations/StaggerGrid'

export function JournalPage() {
  const { data, isLoading, isError, error, refetch } = useJournal()

  if (isLoading) return <JournalSkeleton />
  if (isError || !data) {
    return <ErrorState message={(error as Error)?.message} onRetry={() => refetch()} />
  }

  return (
    <>
      <PageSEO pageTitle="Journal" />

      <div className="tt-wide tt-page-shell">
        <div className="mb-10 tt-rule" />

        <div className="mb-12 space-y-5 md:mb-14">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-tt-accent" />
            <p className="tt-caption text-tt-accent-dark">Journal</p>
          </div>
          <RevealText as="h1" className="tt-display text-tt-ink">
            {data.heading}
          </RevealText>
        </div>

        {data.items.length === 0 ? (
          <p className="tt-body py-16">No posts yet. Check back soon.</p>
        ) : (
          <StaggerGrid className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 xl:grid-cols-3" staggerDelay={0.1}>
            {data.items.map((post, index) => (
              <StaggerItem key={post.slug}>
                <JournalCard post={post} delay={0.08 * index} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        )}
      </div>
    </>
  )
}
