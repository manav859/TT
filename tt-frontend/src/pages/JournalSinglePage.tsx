import { useParams, Link } from 'react-router-dom'
import { useJournalPost } from '@/hooks/useJournal'
import { PageSEO } from '@/components/seo/PageSEO'
import { LoadingState } from '@/components/ui/LoadingState'
import { ErrorState } from '@/components/ui/ErrorState'
import { MaskImage } from '@/lib/animations/MaskImage'
import { RevealText } from '@/lib/animations/RevealText'
import { ArrowLeft } from 'lucide-react'
import { ApiError } from '@/types/api'

function formatDate(dateStr?: string): string {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric',
    })
  } catch { return dateStr }
}

export function JournalSinglePage() {
  const { slug } = useParams<{ slug: string }>()
  const { data, isLoading, isError, error } = useJournalPost(slug ?? '')

  if (isLoading) return <LoadingState variant="card" />

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

      <div className="tt-section">
        <div className="tt-wide">
          <Link
            to="/journal"
            className="inline-flex items-center gap-2 tt-caption text-tt-ink-light hover:text-tt-ink transition-colors duration-200 mb-12"
          >
            <ArrowLeft size={12} strokeWidth={1.5} />
            Journal
          </Link>

          {/* Header */}
          <div className="max-w-2xl mb-14">
            {data.category && <p className="tt-caption mb-4">{data.category}</p>}
            <RevealText as="h1" className="tt-heading-xl tt-serif text-tt-ink mb-6">
              {data.title}
            </RevealText>
            <div className="flex items-center flex-wrap gap-x-4 gap-y-1">
              {data.author && <span className="tt-caption">{data.author}</span>}
              {data.date && (
                <>
                  <span className="tt-caption opacity-30">—</span>
                  <span className="tt-caption">{formatDate(data.date)}</span>
                </>
              )}
              {data.reading_time && (
                <>
                  <span className="tt-caption opacity-30">—</span>
                  <span className="tt-caption">{data.reading_time} min read</span>
                </>
              )}
            </div>
          </div>

          {/* Featured image */}
          <MaskImage delay={0.12} className="w-full mb-16">
            <div className="relative w-full overflow-hidden aspect-16/7">
              {data.featured_image?.url ? (
                <img
                  src={data.featured_image.url}
                  alt={data.featured_image.alt || data.title}
                  loading="eager"
                  fetchPriority="high"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(145deg, #d4c9b8 0%, #c5b8a8 40%, #b8aa98 100%)' }}
                />
              )}
            </div>
          </MaskImage>

          {/* Article content */}
          {data.content ? (
            <div className="tt-prose" dangerouslySetInnerHTML={{ __html: data.content }} />
          ) : data.excerpt ? (
            <p className="tt-prose">{data.excerpt}</p>
          ) : null}

          <div className="mt-20 pt-10 border-t border-tt-border">
            <Link to="/journal" className="tt-link">
              <ArrowLeft size={11} strokeWidth={2} />
              Back to Journal
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
