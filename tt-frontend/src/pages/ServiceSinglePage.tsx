import { useParams, Link } from 'react-router-dom'
import { useService } from '@/hooks/useServices'
import { PageSEO } from '@/components/seo/PageSEO'
import { LoadingState } from '@/components/ui/LoadingState'
import { ErrorState } from '@/components/ui/ErrorState'
import { MaskImage } from '@/lib/animations/MaskImage'
import { RevealText } from '@/lib/animations/RevealText'
import { StaggerGrid, StaggerItem } from '@/lib/animations/StaggerGrid'
import { ArrowLeft } from 'lucide-react'
import { ApiError } from '@/types/api'

const PLACEHOLDER = 'linear-gradient(150deg, #2a2420 0%, #3d3630 50%, #4a4038 100%)'

function ListSection({ heading, items }: { heading: string; items: string[] }) {
  if (!items.length) return null
  return (
    <div>
      <p className="tt-caption mb-4">{heading}</p>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="tt-caption opacity-40 shrink-0 tabular-nums mt-px">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="tt-body text-sm text-tt-ink">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ServiceSinglePage() {
  const { slug } = useParams<{ slug: string }>()
  const { data, isLoading, isError, error } = useService(slug ?? '')

  if (isLoading) return <LoadingState variant="card" />

  if (isError) {
    const is404 = error instanceof ApiError && error.status === 404
    return <ErrorState notFound={is404} message={is404 ? undefined : (error as Error)?.message} />
  }

  if (!data) return null

  const hasLists = (data.deliverables?.length ?? 0) > 0
    || (data.process?.length ?? 0) > 0
    || (data.best_for?.length ?? 0) > 0

  return (
    <>
      <PageSEO seo={data.seo} pageTitle={data.title} />

      <div className="tt-section">
        <div className="tt-wide">

          {/* Back */}
          <Link
            to="/services"
            className="inline-flex items-center gap-2 tt-caption text-tt-ink-light hover:text-tt-ink transition-colors duration-200 mb-14"
          >
            <ArrowLeft size={12} strokeWidth={1.5} />
            All Services
          </Link>

          {/* Hero: image left, content right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">

            {/* Poster image — 5:8 portrait, object-top to show full cover */}
            <MaskImage>
              <div className="relative overflow-hidden w-full aspect-5/8">
                {data.image?.url ? (
                  <img
                    src={data.image.url}
                    alt={data.image.alt || data.title}
                    loading="eager"
                    fetchPriority="high"
                    {...(data.image.width  ? { width:  data.image.width  } : {})}
                    {...(data.image.height ? { height: data.image.height } : {})}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="absolute inset-0" style={{ background: PLACEHOLDER }} />
                )}
              </div>
            </MaskImage>

            {/* Content */}
            <div className="space-y-8 md:pt-4">
              <div>
                <RevealText as="h1" className="tt-heading-xl tt-serif text-tt-ink">
                  {data.title}
                </RevealText>
                {data.short_desc && (
                  <p className="mt-4 text-base italic text-tt-ink-light font-light leading-relaxed">
                    {data.short_desc}
                  </p>
                )}
              </div>

              {data.description && (
                <div
                  className="tt-prose"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
              )}

              {/* Metadata details (label/value pairs if present) */}
              {data.details && data.details.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-tt-border">
                  {data.details.map((d) => (
                    <div key={d.label} className="grid grid-cols-[130px_1fr] gap-4">
                      <p className="tt-caption pt-0.5">{d.label}</p>
                      <p className="text-sm text-tt-ink">{d.value}</p>
                    </div>
                  ))}
                </div>
              )}

              <Link to="/contact" className="tt-button tt-button-accent inline-flex">
                Inquire About This
              </Link>
            </div>
          </div>

          {/* Deliverables / Process / Best For — below the hero */}
          {hasLists && (
            <div className="border-t border-tt-border pt-14">
              <StaggerGrid
                className="grid grid-cols-1 sm:grid-cols-3 gap-10"
                staggerDelay={0.08}
              >
                {data.deliverables && data.deliverables.length > 0 && (
                  <StaggerItem>
                    <ListSection heading="Deliverables" items={data.deliverables} />
                  </StaggerItem>
                )}
                {data.process && data.process.length > 0 && (
                  <StaggerItem>
                    <ListSection heading="Our Process" items={data.process} />
                  </StaggerItem>
                )}
                {data.best_for && data.best_for.length > 0 && (
                  <StaggerItem>
                    <ListSection heading="Best For" items={data.best_for} />
                  </StaggerItem>
                )}
              </StaggerGrid>
            </div>
          )}

          {/* Bottom CTA strip */}
          <div className="mt-16 pt-10 border-t border-tt-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="tt-caption mb-1">Ready to work together?</p>
              <p className="text-sm text-tt-ink-light">
                Tell us about your brand and what you're trying to build.
              </p>
            </div>
            <Link to="/contact" className="tt-button shrink-0">
              Start a Conversation
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}
