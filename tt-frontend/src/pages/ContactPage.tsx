import { useQuery } from '@tanstack/react-query'
import { getContact } from '@/lib/api/endpoints'
import { PageSEO } from '@/components/seo/PageSEO'
import { LoadingState } from '@/components/ui/LoadingState'
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

  if (isLoading) return <LoadingState variant="card" />
  if (isError) {
    return <ErrorState message={(error as Error)?.message} onRetry={() => refetch()} />
  }

  return (
    <>
      <PageSEO pageTitle="Contact" />

      <div className="tt-section">
        <div className="tt-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left: heading + copy */}
            <div className="space-y-8">
              <RevealText as="h1" className="tt-display tt-serif text-tt-ink">
                {data?.heading ?? 'Let\'s Talk'}
              </RevealText>

              {data?.intro && (
                <p className="tt-body-lead max-w-sm">{data.intro}</p>
              )}

              <div className="space-y-2 pt-4">
                <p className="tt-caption">Response time</p>
                <p className="tt-body text-sm">Within 24 hours</p>
              </div>

              <div className="space-y-2">
                <p className="tt-caption">Based in</p>
                <p className="tt-body text-sm">Mumbai, India</p>
              </div>
            </div>

            {/* Right: form */}
            <div>
              <InquiryForm config={data} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
