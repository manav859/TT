import { useJournal } from '@/hooks/useJournal'
import { PageSEO } from '@/components/seo/PageSEO'
import { LoadingState } from '@/components/ui/LoadingState'
import { ErrorState } from '@/components/ui/ErrorState'
import { JournalCard } from '@/components/ui/JournalCard'
import { RevealText } from '@/lib/animations/RevealText'
import { StaggerGrid, StaggerItem } from '@/lib/animations/StaggerGrid'

export function JournalPage() {
  const { data, isLoading, isError, error, refetch } = useJournal()

  if (isLoading) return <LoadingState />
  if (isError || !data) {
    return <ErrorState message={(error as Error)?.message} onRetry={() => refetch()} />
  }

  return (
    <>
      <PageSEO pageTitle="Journal" />

      <div className="tt-section">
        <div className="tt-wide">
          <div className="mb-16">
            <RevealText as="h1" className="tt-display tt-serif text-tt-ink">
              {data.heading}
            </RevealText>
          </div>

          {data.items.length === 0 ? (
            <p className="tt-body py-16">No posts yet. Check back soon.</p>
          ) : (
            <StaggerGrid
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14"
              staggerDelay={0.1}
            >
              {data.items.map((post, i) => (
                <StaggerItem key={post.slug}>
                  <JournalCard post={post} delay={0.08 * i} />
                </StaggerItem>
              ))}
            </StaggerGrid>
          )}
        </div>
      </div>
    </>
  )
}
