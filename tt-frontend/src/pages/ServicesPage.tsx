import { useServices } from '@/hooks/useServices'
import { PageSEO } from '@/components/seo/PageSEO'
import { ServicesSkeleton } from '@/components/ui/PageSkeleton'
import { ErrorState } from '@/components/ui/ErrorState'
import { RevealText } from '@/lib/animations/RevealText'
import { StaggerGrid, StaggerItem } from '@/lib/animations/StaggerGrid'
import { InquiryForm } from '@/components/forms/InquiryForm'
import { ServiceCard } from '@/components/ui/ServiceCard'

export function ServicesPage() {
  const { data, isLoading, isError, error, refetch } = useServices()

  if (isLoading) return <ServicesSkeleton />
  if (isError || !data) {
    return <ErrorState message={(error as Error)?.message} onRetry={() => refetch()} />
  }

  return (
    <>
      <PageSEO pageTitle="Services" />

      <div className="tt-wide tt-page">
        <div className="mb-10 tt-rule" />

        <div className="max-w-3xl space-y-5">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-tt-accent" />
            <p className="tt-caption text-tt-accent-dark">Services</p>
          </div>
          <RevealText as="h1" className="tt-display text-tt-ink">
            {data.heading}
          </RevealText>
          {data.intro && (
            <p className="tt-body-lead max-w-2xl">{data.intro}</p>
          )}
        </div>

        <StaggerGrid
          className="tt-heading-gap grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          staggerDelay={0.07}
        >
          {data.items.map((service, index) => (
            <StaggerItem key={service.slug}>
              <ServiceCard service={service} delay={0.05 * index} />
            </StaggerItem>
          ))}
        </StaggerGrid>

        <section className="tt-section-gap border-t border-tt-border/80 py-20 md:py-28">
          <div className="mx-auto max-w-[84rem]">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] lg:gap-14 xl:gap-20">
              <div className="space-y-8 lg:pt-2">
                <div className="flex items-center gap-4">
                  <span className="h-px w-10 bg-tt-accent" />
                  <p className="tt-caption text-tt-accent-dark">Inquiry</p>
                </div>

                <div className="space-y-5">
                  <RevealText as="h2" className="tt-heading-lg max-w-md text-tt-ink">
                    Reach out about the service you need.
                  </RevealText>
                  <p className="tt-body max-w-md">
                    Campaigns, product stories, social content, or something harder to name.
                    Start with the intent and we&apos;ll help shape the scope.
                  </p>
                </div>

                <div className="grid max-w-md grid-cols-1 gap-5 border-t border-tt-border pt-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <div className="space-y-2">
                    <p className="tt-caption">Response Time</p>
                    <p className="tt-metadata">Within 24 to 48 hours</p>
                  </div>
                  <div className="space-y-2">
                    <p className="tt-caption">Based In</p>
                    <p className="tt-metadata">Mumbai, India</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 lg:mt-24">
                <InquiryForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
