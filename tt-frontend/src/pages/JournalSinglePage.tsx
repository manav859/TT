import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useJournalPost } from '@/hooks/useJournal'
import { PageSEO } from '@/components/seo/PageSEO'
import { SinglePageSkeleton } from '@/components/ui/PageSkeleton'
import { ErrorState } from '@/components/ui/ErrorState'
import { MaskImage } from '@/lib/animations/MaskImage'
import { RevealText } from '@/lib/animations/RevealText'
import { ApiError } from '@/types/api'

function formatDate(date?: string): string {
  if (!date) return ''
  try {
    return new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return date
  }
}

export function JournalSinglePage() {
  const { slug } = useParams<{ slug: string }>()
  const { data, isLoading, isError, error } = useJournalPost(slug ?? '')

  if (isLoading) return <SinglePageSkeleton />

  if (isError) {
    const is404 = error instanceof ApiError && error.status === 404
    return <ErrorState notFound={is404} message={is404 ? undefined : (error as Error)?.message} />
  }

  if (!data) return null

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    datePublished: data.date,
    author: { '@type': 'Organization', name: data.author ?? 'Tusk Tales' },
    ...(data.featured_image?.url ? { image: data.featured_image.url } : {}),
  }

  return (
    <>
      <PageSEO seo={data.seo} pageTitle={data.title} type="article" jsonLd={articleJsonLd} />

      <div className="tt-wide tt-page-shell">
        <Link
          to="/journal"
          className="mb-8 inline-flex items-center gap-2 tt-caption text-tt-ink-light transition-colors duration-200 hover:text-tt-ink md:mb-10"
        >
          <ArrowLeft size={12} strokeWidth={1.5} />
          Journal
        </Link>

        <div className="mb-10 tt-rule" />

        <div className="mb-12 max-w-3xl space-y-5 md:mb-14">
          {data.category && (
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-tt-accent" />
              <p className="tt-caption text-tt-accent-dark">{data.category}</p>
            </div>
          )}
          <RevealText as="h1" className="tt-heading-xl text-tt-ink">
            {data.title}
          </RevealText>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {data.author && <span className="tt-caption">{data.author}</span>}
            {data.date && <span className="tt-caption">{formatDate(data.date)}</span>}
            {data.reading_time && <span className="tt-caption">{data.reading_time} min read</span>}
          </div>
        </div>

        <MaskImage delay={0.12} className="mb-14 w-full">
          <div className="relative aspect-16/7 overflow-hidden">
            {data.featured_image?.url ? (
              <img
                src={data.featured_image.url}
                alt={data.featured_image.alt || data.title}
                loading="eager"
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="tt-placeholder-editorial absolute inset-0" />
            )}
          </div>
        </MaskImage>

        {data.content ? (
          <div className="tt-prose" dangerouslySetInnerHTML={{ __html: data.content }} />
        ) : data.excerpt ? (
          <p className="tt-prose">{data.excerpt}</p>
        ) : null}

        <div className="pt-14">
          <div className="tt-panel flex flex-col gap-5 p-7 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="tt-stack-sm">
              <p className="tt-caption text-tt-accent-dark">Continue Reading</p>
              <p className="tt-body">Explore more notes on campaigns, product imagery, and brand atmosphere.</p>
            </div>
            <Link to="/journal" className="tt-link self-start md:self-center">
              <ArrowLeft size={11} strokeWidth={2} />
              Back to Journal
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
