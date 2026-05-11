import { useQuery } from '@tanstack/react-query'
import { getContact } from '@/lib/api/endpoints'
import { PageSEO } from '@/components/seo/PageSEO'
import { ContactSkeleton } from '@/components/ui/PageSkeleton'
import { ErrorState } from '@/components/ui/ErrorState'
import { RevealText } from '@/lib/animations/RevealText'
import { MaskImage } from '@/lib/animations/MaskImage'
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
        <div className="mb-10 tt-rule" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
          <div className="tt-panel overflow-hidden">
            <div className="p-7 md:p-10">
              <div className="mb-8 flex items-center gap-4">
                <span className="h-px w-10 bg-tt-accent" />
                <p className="tt-caption text-tt-accent-dark">Inquiry</p>
              </div>

              <div className="tt-stack-md">
                <RevealText as="h1" className="tt-display text-tt-ink">
                  {data?.heading ?? "Let's Talk"}
                </RevealText>

                {data?.intro && (
                  <p className="tt-body-lead max-w-lg">{data.intro}</p>
                )}
              </div>

              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
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

            <MaskImage className="w-full">
              <div className="relative aspect-4/5 overflow-hidden">
                <div className="tt-placeholder-editorial absolute inset-0" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.32),transparent_0_18%),linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(35,29,24,0.32)_100%)]" />
                <div className="absolute left-6 top-6 right-6 flex items-center justify-between">
                  <p className="tt-caption text-white/[0.82]">04</p>
                  <p className="tt-caption text-white/[0.82]">Tusk Tales Studio</p>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="mb-4 tt-rule opacity-70" />
                  <p className="tt-heading-md max-w-sm text-white">
                    Tell us the brand, the idea, or the feeling you want to build.
                  </p>
                </div>
              </div>
            </MaskImage>
          </div>

          <div className="tt-panel p-7 md:p-10">
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-10 bg-tt-accent" />
              <p className="tt-caption text-tt-accent-dark">Contact Form</p>
            </div>
            <InquiryForm config={data} />
          </div>
        </div>
      </div>
    </>
  )
}
