import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useService } from '@/hooks/useServices'
import { PageSEO } from '@/components/seo/PageSEO'
import { SinglePageSkeleton } from '@/components/ui/PageSkeleton'
import { ErrorState } from '@/components/ui/ErrorState'
import { MaskImage } from '@/lib/animations/MaskImage'
import { RevealText } from '@/lib/animations/RevealText'
import { StaggerGrid, StaggerItem } from '@/lib/animations/StaggerGrid'
import { ApiError } from '@/types/api'

const PLACEHOLDER = 'linear-gradient(150deg, #2a2420 0%, #3d3630 50%, #4a4038 100%)'

function ListSection({
  heading,
  items,
}: {
  heading: string
  items: string[]
}) {
  if (!items.length) return null

  return (
    <div className="tt-panel h-full p-6 md:p-7">
      <p className="tt-caption mb-5 text-tt-accent-dark">{heading}</p>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="tt-caption mt-0.5 shrink-0 opacity-45 tabular-nums">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="tt-body text-tt-ink-soft">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ServiceSinglePage() {
  const { slug } = useParams<{ slug: string }>()
  const { data, isLoading, isError, error } = useService(slug ?? '')

  if (isLoading) return <SinglePageSkeleton />

  if (isError) {
    const is404 = error instanceof ApiError && error.status === 404
    return <ErrorState notFound={is404} message={is404 ? undefined : (error as Error)?.message} />
  }

  if (!data) return null

  const hasLists =
    (data.deliverables?.length ?? 0) > 0
    || (data.process?.length ?? 0) > 0
    || (data.best_for?.length ?? 0) > 0

  return (
    <>
      <PageSEO seo={data.seo} pageTitle={data.title} />

      <div className="tt-wide tt-page-shell">
        <Link
          to="/services"
          className="mb-8 inline-flex items-center gap-2 tt-caption text-tt-ink-light transition-colors duration-200 hover:text-tt-ink md:mb-10"
        >
          <ArrowLeft size={12} strokeWidth={1.5} />
          All Services
        </Link>

        <div className="mb-10 tt-rule" />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[0.86fr_1.14fr] lg:gap-14">
          <MaskImage>
            <div className="relative aspect-5/8 overflow-hidden">
              {data.image?.url ? (
                <img
                  src={data.image.url}
                  alt={data.image.alt || data.title}
                  loading="eager"
                  fetchPriority="high"
                  {...(data.image.width ? { width: data.image.width } : {})}
                  {...(data.image.height ? { height: data.image.height } : {})}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              ) : (
                <div className="absolute inset-0" style={{ background: PLACEHOLDER }} />
              )}
            </div>
          </MaskImage>

          <div className="flex flex-col justify-between gap-8 md:pt-4">
            <div className="tt-stack-md">
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-tt-accent" />
                <p className="tt-caption text-tt-accent-dark">Service</p>
              </div>

              <RevealText as="h1" className="tt-heading-xl text-tt-ink">
                {data.title}
              </RevealText>

              {data.short_desc && (
                <p className="tt-body-lead max-w-xl">{data.short_desc}</p>
              )}

              {data.description && (
                <div className="tt-prose" dangerouslySetInnerHTML={{ __html: data.description }} />
              )}

              {data.details && data.details.length > 0 && (
                <div className="grid grid-cols-1 gap-4 border-t border-tt-border pt-6">
                  {data.details.map((detail) => (
                    <div key={detail.label} className="grid grid-cols-1 gap-1 sm:grid-cols-[9rem_1fr] sm:gap-4">
                      <p className="tt-caption">{detail.label}</p>
                      <p className="tt-metadata">{detail.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="tt-caption text-tt-ink-light">Built to fit your brand, pace, and intent.</p>
              <Link to="/contact" className="tt-button tt-button-accent self-start">
                Inquire About This
                <ArrowRight size={14} strokeWidth={1.8} />
              </Link>
            </div>
          </div>
        </div>

        {hasLists && (
          <div className="pt-14">
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-10 bg-tt-accent" />
              <p className="tt-caption text-tt-accent-dark">How It Works</p>
            </div>
            <StaggerGrid className="grid grid-cols-1 gap-5 lg:grid-cols-3" staggerDelay={0.08}>
              {data.deliverables && data.deliverables.length > 0 && (
                <StaggerItem>
                  <ListSection heading="Deliverables" items={data.deliverables} />
                </StaggerItem>
              )}
              {data.process && data.process.length > 0 && (
                <StaggerItem>
                  <ListSection heading="Process" items={data.process} />
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

        <div className="pt-14">
          <div className="tt-panel flex flex-col gap-5 p-7 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="tt-stack-sm">
              <p className="tt-caption text-tt-accent-dark">Ready to begin?</p>
              <p className="tt-body max-w-xl">
                Tell us about the brand, the launch, or the moment you need this work to carry.
              </p>
            </div>
            <Link to="/contact" className="tt-button self-start md:self-center">
              Start a Conversation
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
