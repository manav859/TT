import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import clsx from 'clsx'
import { useWork } from '@/hooks/useWorks'
import { PageSEO } from '@/components/seo/PageSEO'
import { SinglePageSkeleton } from '@/components/ui/PageSkeleton'
import { ErrorState } from '@/components/ui/ErrorState'
import { AspectImage } from '@/components/ui/AspectImage'
import { aspectRatioFromDimensions } from '@/lib/imageUtils'
import type { ImageRatio } from '@/lib/imageUtils'
import { MaskImage } from '@/lib/animations/MaskImage'
import { RevealText } from '@/lib/animations/RevealText'
import { StaggerGrid, StaggerItem } from '@/lib/animations/StaggerGrid'
import { ApiError } from '@/types/api'
import type { ImageAsset } from '@/types/api'

function galleryRatioForImage(image: ImageAsset, index: number): ImageRatio {
  return aspectRatioFromDimensions(image.width, image.height)
    ?? (index % 2 === 0 ? '4/3' : '3/4')
}

function isPortraitRatio(ratio: ImageRatio) {
  return ratio === '2/3' || ratio === '3/4' || ratio === '1/1'
}

function isWideRatio(ratio: ImageRatio) {
  return ratio === '3/2' || ratio === '16/9' || ratio === '16/7'
}

function GalleryImage({
  image,
  index,
  title,
}: {
  image: ImageAsset
  index: number
  title: string
}) {
  const ratio = galleryRatioForImage(image, index)
  const spanWide = isWideRatio(ratio) && index % 4 === 0

  return (
    <StaggerItem>
      <div className={clsx(spanWide && 'md:col-span-2')}>
        <MaskImage delay={0.05 * index}>
          <AspectImage
            image={image}
            ratio={ratio}
            label={image.alt || `${title} - ${index + 1}`}
            className="bg-tt-off-white-strong"
            objectPosition={isPortraitRatio(ratio) ? 'center top' : 'center center'}
          />
        </MaskImage>
      </div>
    </StaggerItem>
  )
}

export function WorkSinglePage() {
  const { slug } = useParams<{ slug: string }>()
  const { data, isLoading, isError, error } = useWork(slug ?? '')

  if (isLoading) return <SinglePageSkeleton />

  if (isError) {
    const is404 = error instanceof ApiError && error.status === 404
    return <ErrorState notFound={is404} message={is404 ? undefined : (error as Error)?.message} />
  }

  if (!data) return null

  const hasGallery = data.gallery && data.gallery.length > 0
  const featuredRatio =
    aspectRatioFromDimensions(data.featured_image?.width, data.featured_image?.height) ?? '4/3'
  const featuredFit = isPortraitRatio(featuredRatio) ? 'contain' : 'cover'
  const metaItems = ([
    { label: 'Category', value: data.category },
    { label: 'Client', value: data.client },
    { label: 'Year', value: data.year ? String(data.year) : undefined },
    { label: 'Location', value: data.location },
  ] as const).filter((item) => item.value)

  return (
    <>
      <PageSEO seo={data.seo} pageTitle={data.title} />

      <article className="tt-wide pb-24 pt-16 md:pb-32 md:pt-24">
        <header className="mx-auto mb-16 max-w-[90rem] md:mb-24">
          <div className="grid grid-cols-1 gap-10 xl:gap-16 lg:grid-cols-[minmax(0,0.58fr)_minmax(360px,0.42fr)]">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-tt-accent" />
                <p className="tt-caption text-tt-accent-dark">Project / 01</p>
              </div>

              <MaskImage className="w-full">
                <AspectImage
                  image={data.featured_image}
                  ratio="auto"
                  label={data.title}
                  priority
                  objectFit={featuredFit}
                  objectPosition={featuredFit === 'contain' ? 'center center' : 'center top'}
                  className="h-[clamp(320px,65vh,480px)] bg-tt-off-white-strong md:h-[clamp(520px,72vh,760px)]"
                />
              </MaskImage>
            </div>

            <div className="flex flex-col justify-between gap-8 lg:sticky lg:top-[calc(var(--height-nav)+2rem)] lg:self-start">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <span className="h-px w-10 bg-tt-accent" />
                  <p className="tt-caption text-tt-accent-dark">Overview</p>
                </div>

                <div className="space-y-5">
                  <RevealText as="h1" className="tt-display text-tt-ink">
                    {data.title}
                  </RevealText>
                  {data.caption && <p className="tt-body-lead max-w-xl">{data.caption}</p>}
                </div>

                {metaItems.length > 0 && (
                  <dl className="grid grid-cols-2 gap-x-8 gap-y-5 border-y border-tt-border py-5">
                    {metaItems.map((item) => (
                      <div key={item.label}>
                        <dt className="tt-caption mb-1.5">{item.label}</dt>
                        <dd className="tt-metadata">{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {data.description && (
                  <div className="tt-prose max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: data.description }} />
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-5 border-t border-tt-border pt-6">
                <Link
                  to="/works"
                  className="inline-flex items-center gap-2 tt-caption text-tt-ink-light transition-colors duration-200 hover:text-tt-ink"
                >
                  <ArrowLeft size={12} strokeWidth={1.5} />
                  All Works
                </Link>
                {data.category && <p className="tt-caption">{data.category}</p>}
              </div>
            </div>
          </div>
        </header>

        {hasGallery && (
          <section className="py-16 md:py-24">
            <div className="mx-auto mb-8 flex max-w-[90rem] flex-wrap items-center gap-x-4 gap-y-2 md:mb-10">
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-tt-accent" />
                <p className="tt-caption text-tt-accent-dark">Gallery</p>
              </div>
              <p className="tt-caption">{data.gallery.length} images</p>
            </div>

            <StaggerGrid
              className="mx-auto grid max-w-[90rem] grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
              staggerDelay={0.06}
            >
              {data.gallery.map((image, index) => (
                <GalleryImage key={image.id ?? index} image={image} index={index} title={data.title} />
              ))}
            </StaggerGrid>
          </section>
        )}

        <div className="mx-auto max-w-[76rem] border-t border-tt-border pt-10 md:pt-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="tt-caption text-tt-accent-dark">Next Step</p>
              <p className="tt-body max-w-xl">
                If this atmosphere feels close to what your brand needs, let us shape the next story with you.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/works" className="tt-link">
                <ArrowLeft size={11} strokeWidth={2} />
                Back to Works
              </Link>
              <Link to="/contact" className="tt-button tt-button-accent">
                Start a Project
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
