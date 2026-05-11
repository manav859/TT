import { Link } from 'react-router-dom'
import { useServices } from '@/hooks/useServices'
import { useQuery } from '@tanstack/react-query'
import { getContact } from '@/lib/api/endpoints'
import { PageSEO } from '@/components/seo/PageSEO'
import { LoadingState } from '@/components/ui/LoadingState'
import { ErrorState } from '@/components/ui/ErrorState'
import { MaskImage } from '@/lib/animations/MaskImage'
import { RevealText } from '@/lib/animations/RevealText'
import { StaggerGrid, StaggerItem } from '@/lib/animations/StaggerGrid'
import { InquiryForm } from '@/components/forms/InquiryForm'
import type { ContactData } from '@/types/api'

const CARD_PLACEHOLDER = [
  'linear-gradient(145deg, #d4c9b8 0%, #c5b8a8 40%, #b8aa98 100%)',
  'linear-gradient(150deg, #2a2420 0%, #3d3630 50%, #4a4038 100%)',
  'linear-gradient(135deg, #e0d8cc 0%, #c8baa8 50%, #b0a090 100%)',
  'linear-gradient(160deg, #1a1916 0%, #2e2a26 55%, #3d3630 100%)',
  'linear-gradient(145deg, #c8bba8 0%, #9e8f7e 55%, #8b7d6e 100%)',
]

export function ServicesPage() {
  const { data, isLoading, isError, error, refetch } = useServices()
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
      <PageSEO pageTitle="Services" />

      <div className="tt-section">
        <div className="tt-wide">

          {/* Page header */}
          <div className="mb-16 max-w-2xl">
            <RevealText as="h1" className="tt-display tt-serif text-tt-ink mb-6">
              {data.heading}
            </RevealText>
            {data.intro && (
              <p className="tt-body text-tt-ink-light leading-relaxed">{data.intro}</p>
            )}
          </div>

          {/* 5 service cards — portrait grid */}
          <StaggerGrid
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 md:gap-6"
            staggerDelay={0.07}
          >
            {data.items.map((service, i) => (
              <StaggerItem key={service.slug}>
                <Link
                  to={`/services/${service.slug}`}
                  className="group block"
                  aria-label={service.title}
                >
                  <MaskImage delay={0.05 * i}>
                    {/*
                      Images are 500×800 poster covers that already contain
                      styled text — use object-top so the top content is visible,
                      no overlay, no duplicate headings.
                    */}
                    <div className="relative overflow-hidden w-full aspect-5/8">
                      {service.image?.url ? (
                        <img
                          src={service.image.url}
                          alt={service.image.alt || service.title}
                          loading={i < 3 ? 'eager' : 'lazy'}
                          decoding="async"
                          width={service.image.width}
                          height={service.image.height}
                          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div
                          className="absolute inset-0"
                          style={{ background: CARD_PLACEHOLDER[i % CARD_PLACEHOLDER.length] }}
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  </MaskImage>

                  {/* Subtle metadata below image — no heading duplication */}
                  <div className="mt-4 space-y-1.5">
                    <p className="tt-label text-tt-ink group-hover:opacity-60 transition-opacity duration-200">
                      {service.title}
                    </p>
                    {service.short_desc && (
                      <p className="text-xs italic text-tt-ink-light leading-relaxed font-light line-clamp-2">
                        {service.short_desc}
                      </p>
                    )}
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGrid>

          {/* Divider */}
          <div className="tt-divider mt-20 mb-20" />

          {/* Inquiry section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              <RevealText as="h2" className="tt-heading-xl tt-serif text-tt-ink">
                Reach out to inquire about our services
              </RevealText>
              <p className="tt-body max-w-sm">
                Tell us what you're working on. We'll come back to you with
                thoughts on how we can help and what that might look like.
              </p>
            </div>
            <div>
              <InquiryForm config={contactData} />
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
