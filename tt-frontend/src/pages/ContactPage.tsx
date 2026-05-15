import { useQuery } from '@tanstack/react-query'
import { getContact } from '@/lib/api/endpoints'
import { PageSEO } from '@/components/seo/PageSEO'
import { ContactSkeleton } from '@/components/ui/PageSkeleton'
import { ErrorState } from '@/components/ui/ErrorState'
import { RevealText } from '@/lib/animations/RevealText'
import { InquiryForm } from '@/components/forms/InquiryForm'
import type { ContactData } from '@/types/api'

export function ContactPage() {
  const { data, isLoading, isError, error, refetch } = useQuery<ContactData>({
    queryKey: ['contact'],
    queryFn: getContact,
    staleTime: 1000 * 60 * 10,
  })

  if (isLoading) return <ContactSkeleton />
  if (isError) {
    return <ErrorState message={(error as Error)?.message} onRetry={() => refetch()} />
  }

  return (
    <>
      <PageSEO pageTitle="Contact" />

      <div className="tt-wide tt-page-shell">
        <div className="mb-14 tt-rule md:mb-20" />

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-10 bg-tt-accent" />
              <p className="tt-caption text-tt-accent-dark">Inquiry</p>
            </div>

            <RevealText as="h1" className="tt-display text-tt-ink">
              {data?.heading ?? "Let's Talk"}
            </RevealText>

            {data?.intro && (
              <p className="mt-8 max-w-md text-[1.05rem] leading-[1.8] text-tt-ink-soft">
                {data.intro}
              </p>
            )}

            <div className="mt-14 grid grid-cols-1 gap-y-8 border-t border-tt-border/70 pt-10 sm:grid-cols-2 sm:gap-x-10">
              <div className="space-y-2">
                <p className="tt-caption text-tt-ink-light">Response Time</p>
                <p className="text-[0.95rem] text-tt-ink">Within 24 — 48 hours</p>
              </div>
              <div className="space-y-2">
                <p className="tt-caption text-tt-ink-light">Based In</p>
                <p className="text-[0.95rem] text-tt-ink">Mumbai, India</p>
              </div>
              <div className="space-y-2">
                <p className="tt-caption text-tt-ink-light">Email</p>
                <a
                  href="mailto:hello@tusktales.studio"
                  className="text-[0.95rem] text-tt-ink underline decoration-tt-accent/50 underline-offset-4 transition-colors hover:text-tt-accent-dark"
                >
                  hello@tusktales.studio
                </a>
              </div>
              <div className="space-y-2">
                <p className="tt-caption text-tt-ink-light">Studio</p>
                <p className="text-[0.95rem] text-tt-ink">Tusk Tales · 04</p>
              </div>
            </div>
          </aside>

          <div className="mt-10 lg:mt-24">
            <InquiryForm config={data} />
          </div>
        </div>
      </div>
    </>
  )
}
