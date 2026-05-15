import { useQuery } from '@tanstack/react-query'
import { getAbout, getContact } from '@/lib/api/endpoints'
import { PageSEO } from '@/components/seo/PageSEO'
import { AboutSkeleton } from '@/components/ui/PageSkeleton'
import { ErrorState } from '@/components/ui/ErrorState'
import { MaskImage } from '@/lib/animations/MaskImage'
import { RevealText } from '@/lib/animations/RevealText'
import { StaggerGrid, StaggerItem } from '@/lib/animations/StaggerGrid'
import { InquiryForm } from '@/components/forms/InquiryForm'
import type { AboutData, ContactData } from '@/types/api'

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

      <div className="tt-wide tt-page-shell pb-0">
        <div className="mb-10 tt-rule" />

        <div className="mb-10 space-y-5 md:mb-12">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-tt-accent" />
            <p className="tt-caption text-tt-accent-dark">About</p>
          </div>
          <RevealText as="h1" className="tt-display text-tt-ink">
            {data.heading}
          </RevealText>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
          <RevealText as="p" className="tt-body-lead text-tt-ink" delay={0.08}>
            {data.intro}
          </RevealText>
          {data.body && (
            <div className="tt-prose" dangerouslySetInnerHTML={{ __html: data.body }} />
          )}
        </div>
      </div>

      <div className="tt-wide mt-6 md:mt-8">
        <MaskImage className="w-full">
          <div className="tt-editorial-frame relative aspect-16/7 overflow-hidden">
            {data.main_image?.url ? (
              <img
                src={data.main_image.url}
                alt={data.main_image.alt || 'About Tusk Tales'}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="tt-placeholder-editorial absolute inset-0" />
            )}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(35,29,24,0.18)_100%)]" />
          </div>
        </MaskImage>
      </div>

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
