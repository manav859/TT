import { useParams, Link } from 'react-router-dom'
import { useWork } from '@/hooks/useWorks'
import { PageSEO } from '@/components/seo/PageSEO'
import { LoadingState } from '@/components/ui/LoadingState'
import { ErrorState } from '@/components/ui/ErrorState'
import { AspectImage } from '@/components/ui/AspectImage'
import { aspectRatioFromDimensions } from '@/lib/imageUtils'
import { MaskImage } from '@/lib/animations/MaskImage'
import { RevealText } from '@/lib/animations/RevealText'
import { StaggerGrid, StaggerItem } from '@/lib/animations/StaggerGrid'
import { ArrowLeft } from 'lucide-react'
import { ApiError } from '@/types/api'
import type { ImageAsset } from '@/types/api'

/* ── Gallery layout ───────────────────────────────────────────────────── */

function GalleryImage({ img, index, title }: { img: ImageAsset; index: number; title: string }) {
  const ratio = aspectRatioFromDimensions(img.width, img.height) ?? (index % 3 === 0 ? '3/4' : '4/3')
  return (
    <StaggerItem>
      <div className="break-inside-avoid mb-4 md:mb-5">
        <MaskImage delay={0.04 * index}>
          <AspectImage
            image={img}
            ratio={ratio}
            label={img.alt || `${title} — ${index + 1}`}
          />
        </MaskImage>
      </div>
    </StaggerItem>
  )
}

export function WorkSinglePage() {
  const { slug } = useParams<{ slug: string }>()
  const { data, isLoading, isError, error } = useWork(slug ?? '')

  if (isLoading) return <LoadingState variant="card" />

  if (isError) {
    const is404 = error instanceof ApiError && error.status === 404
    return <ErrorState notFound={is404} message={is404 ? undefined : (error as Error)?.message} />
  }

  if (!data) return null

  const hasGallery = data.gallery && data.gallery.length > 0

  return (
    <>
      <PageSEO seo={data.seo} pageTitle={data.title} />

      <div className="tt-section">
        <div className="tt-wide">
          {/* Back */}
          <Link
            to="/works"
            className="inline-flex items-center gap-2 tt-caption text-tt-ink-light hover:text-tt-ink transition-colors duration-200 mb-14"
          >
            <ArrowLeft size={12} strokeWidth={1.5} />
            All Works
          </Link>

          {/* Title + metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14 items-end">
            <RevealText as="h1" className="tt-display tt-serif text-tt-ink">
              {data.title}
            </RevealText>
            <dl className="flex flex-wrap gap-x-10 gap-y-5 md:justify-end pb-1">
              {([
                { label: 'Client',   value: data.client   },
                { label: 'Category', value: data.category },
                { label: 'Year',     value: data.year     },
                { label: 'Location', value: data.location },
              ] as const).filter(m => m.value).map(m => (
                <div key={m.label}>
                  <dt className="tt-caption mb-1">{m.label}</dt>
                  <dd className="text-sm text-tt-ink">{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Featured image */}
          <MaskImage className="w-full mb-12">
            <AspectImage
              image={data.featured_image}
              ratio={aspectRatioFromDimensions(
                data.featured_image?.width,
                data.featured_image?.height
              ) ?? '16/9'}
              label={data.title}
              priority
            />
          </MaskImage>

          {/* Description */}
          {data.description && (
            <div className="max-w-2xl mb-16">
              <div className="tt-prose" dangerouslySetInnerHTML={{ __html: data.description }} />
            </div>
          )}

          {/* Gallery */}
          {hasGallery && (
            <div>
              <div className="flex items-center gap-4 mb-8">
                <p className="tt-caption">Gallery</p>
                <div className="flex-1 h-px bg-tt-border" />
                <p className="tt-caption">{data.gallery.length} images</p>
              </div>

              <StaggerGrid
                className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-5"
                staggerDelay={0.06}
              >
                {data.gallery.map((img, i) => (
                  <GalleryImage key={img.id ?? i} img={img} index={i} title={data.title} />
                ))}
              </StaggerGrid>
            </div>
          )}

          {/* Bottom */}
          <div className="mt-20 pt-10 border-t border-tt-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link to="/works" className="tt-link">
              <ArrowLeft size={11} strokeWidth={2} />
              Back to Works
            </Link>
            <Link to="/contact" className="tt-button">
              Start a Project
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
