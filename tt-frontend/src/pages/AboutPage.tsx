import { useQuery } from '@tanstack/react-query'
import { getAbout, getContact } from '@/lib/api/endpoints'
import { PageSEO } from '@/components/seo/PageSEO'
import { LoadingState } from '@/components/ui/LoadingState'
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

  if (isLoading) return <LoadingState />
  if (isError || !data) {
    return <ErrorState message={(error as Error)?.message} onRetry={() => refetch()} />
  }

  return (
    <>
      <PageSEO seo={data.seo} pageTitle={data.heading} />

      {/* Heading + intro */}
      <div className="tt-section pb-0">
        <div className="tt-wide">
          <RevealText as="h1" className="tt-display tt-serif text-tt-ink mb-14">
            {data.heading}
          </RevealText>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
            <RevealText as="p" className="tt-body-lead text-tt-ink font-medium leading-relaxed" delay={0.1}>
              {data.intro}
            </RevealText>
            {data.body && (
              <div className="tt-prose" dangerouslySetInnerHTML={{ __html: data.body }} />
            )}
          </div>
        </div>
      </div>

      {/* Wide editorial image */}
      <div className="mt-16">
        <MaskImage delay={0.15} className="w-full">
          <div className="relative w-full overflow-hidden aspect-16/7">
            {data.main_image?.url ? (
              <img
                src={data.main_image.url}
                alt={data.main_image.alt || 'About Tusk Tales'}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(160deg, #c5b8a8 0%, #b0a290 25%, #9e8f7e 55%, #7d6e5f 80%, #5a4e42 100%)' }}
              />
            )}
          </div>
        </MaskImage>
      </div>

      {/* Values */}
      {data.values && data.values.length > 0 && (
        <div className="tt-section">
          <div className="tt-wide">
            <p className="tt-caption mb-12">Approach</p>
            <StaggerGrid
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
              staggerDelay={0.08}
            >
              {data.values.map((v) => (
                <StaggerItem key={v.heading}>
                  <div className="space-y-3">
                    <h3 className="tt-label text-tt-ink">{v.heading}</h3>
                    <div className="w-8 h-px bg-tt-border" />
                    <p className="tt-body text-sm leading-relaxed">{v.text}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </div>
      )}

      {/* CTA text */}
      {data.cta_text && (
        <div className="tt-wide pb-16">
          <div className="border-t border-tt-border pt-14">
            <RevealText as="p" className="tt-heading-xl tt-serif text-tt-ink max-w-2xl">
              {data.cta_text}
            </RevealText>
          </div>
        </div>
      )}

      {/* Let's Talk — contact form */}
      <div className="tt-section border-t border-tt-border">
        <div className="tt-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="space-y-5">
              <RevealText as="h2" className="tt-heading-xl tt-serif text-tt-ink">
                Let's Talk
              </RevealText>
              <p className="tt-body max-w-sm">
                Tell us about your project and what you're trying to build.
                We'll get back to you within 24 hours.
              </p>
            </div>
            <InquiryForm config={contactData} />
          </div>
        </div>
      </div>
    </>
  )
}
