import { useQuery } from '@tanstack/react-query'
import { getContact } from '@/lib/api/endpoints'
import { PageSEO } from '@/components/seo/PageSEO'
import { ContactSkeleton } from '@/components/ui/PageSkeleton'
import { ErrorState } from '@/components/ui/ErrorState'
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

      <div className="tt-wide" style={{ paddingTop: 'clamp(4rem, 8vw, 7rem)', paddingBottom: 'clamp(5rem, 10vw, 9rem)' }}>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 xl:gap-32">
          <aside className="lg:w-[38%] lg:sticky lg:top-32 lg:self-start">
            <h1
              className="leading-[1.05]"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.75rem, 5vw, 3.75rem)',
                fontWeight: 400,
                color: '#c4b5a5',
                margin: 0,
              }}
            >
              Let&rsquo;s Talk
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '15px',
                lineHeight: 1.7,
                color: '#c4b5a5',
                margin: '1.25rem 0 0',
                maxWidth: '24rem',
              }}
            >
              We understand your branding problems. Give us a call or connect with us on socials.
            </p>
          </aside>

          <div className="lg:w-[62%]">
            <InquiryForm />
          </div>
        </div>
      </div>
    </>
  )
}
