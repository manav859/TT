import { useQuery } from '@tanstack/react-query'
import { getAbout, getContact } from '@/lib/api/endpoints'
import { PageSEO } from '@/components/seo/PageSEO'
import { AboutSkeleton } from '@/components/ui/PageSkeleton'
import { ErrorState } from '@/components/ui/ErrorState'
import { RevealText } from '@/lib/animations/RevealText'
import { StaggerGrid, StaggerItem } from '@/lib/animations/StaggerGrid'
import { InquiryForm } from '@/components/forms/InquiryForm'
import type { AboutData, ContactData } from '@/types/api'

const ABOUT_IMAGE = '/images/About_image.png'

export function AboutPage() {
  const { data, isLoading, isError, error, refetch } = useQuery<AboutData>({
    queryKey: ['about'],
    queryFn: getAbout,
    staleTime: 1000 * 60 * 10,
  })
  const { data: contactData } = useQuery<ContactData>({
    queryKey: ['contact'],
    queryFn: getContact,
    staleTime: 1000 * 60 * 10,
  })

  if (isLoading) return <AboutSkeleton />
  if (isError || !data) {
    return <ErrorState message={(error as Error)?.message} onRetry={() => refetch()} />
  }

  return (
    <>
      <PageSEO seo={data.seo} pageTitle={data.heading} />

      <section className="tt-about-page-hero">
        <div className="tt-wide tt-page-shell pb-0">
          <div className="tt-about-page-copy">
            <RevealText as="h1" className="tt-about-page-title">
              {data.heading}
            </RevealText>

            <div className="tt-about-page-text-grid">
              <RevealText as="p" className="tt-about-page-intro" delay={0.08}>
                {data.intro}
              </RevealText>
              {data.body && (
                <div
                  className="tt-about-page-body"
                  dangerouslySetInnerHTML={{ __html: data.body }}
                />
              )}
            </div>
          </div>
        </div>

        <div className="tt-about-page-image-stage">
          <p className="tt-about-page-image-heading">Purpose in every frame</p>
          <div className="tt-about-page-image-wrap">
            <img
              src={ABOUT_IMAGE}
              alt="Purpose in every frame"
              loading="lazy"
              decoding="async"
              className="tt-about-page-image"
            />
          </div>
        </div>
      </section>

      {data.values && data.values.length > 0 && (
        <div className="tt-wide tt-section-tight">
          <div className="mb-10 flex items-center gap-4">
            <span className="h-px w-10 bg-tt-accent" />
            <p className="tt-caption text-tt-accent-dark">Approach</p>
          </div>
          <StaggerGrid
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
            staggerDelay={0.08}
          >
            {data.values.map((value) => (
              <StaggerItem key={value.heading}>
                <div className="h-full border-t border-tt-border/80 pt-4 md:pt-5">
                  <div className="space-y-4">
                    <p className="tt-label text-tt-ink">{value.heading}</p>
                    <div className="h-px w-8 bg-tt-border-strong" />
                    <p className="tt-body">{value.text}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      )}

      {data.cta_text && (
        <div className="tt-wide pb-14 md:pb-20">
          <div className="border-t border-tt-border/80 pt-8 md:pt-12">
            <RevealText as="p" className="tt-heading-xl max-w-3xl text-tt-ink">
              {data.cta_text}
            </RevealText>
          </div>
        </div>
      )}

      <div className="tt-wide" style={{ paddingBottom: 'var(--spacing-section-loose)' }}>
        <div className="grid grid-cols-1 gap-10 border-t border-tt-border/80 pt-12 md:pt-16 lg:grid-cols-[0.68fr_1.32fr] lg:gap-16">
          <div className="tt-stack-md max-w-[30rem]">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-tt-accent" />
              <p className="tt-caption text-tt-accent-dark">Let's Talk</p>
            </div>
            <RevealText as="h2" className="tt-heading-lg text-tt-ink">
              Tell us what you are building, even if it is still only a feeling.
            </RevealText>
            <p className="tt-body max-w-md">
              We will shape the right visual direction, define the scope, and figure out what
              the next frame should be.
            </p>
          </div>
          <div className="lg:pt-10">
            <InquiryForm config={contactData} />
          </div>
        </div>
      </div>
    </>
  )
}
