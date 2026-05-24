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

      <div
        className="tt-wide"
        style={{
          height: 'calc(100vh - var(--height-nav))',
          minHeight: '0',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: 'clamp(1rem, 2vh, 2rem)',
          paddingBottom: 'clamp(1rem, 2vh, 2rem)',
        }}
      >
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-16 xl:gap-24">
          <aside className="lg:w-[36%] lg:self-center">
            <h1
              className="leading-[1.05]"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.25rem, 4vw, 3.25rem)',
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
                fontSize: '14px',
                lineHeight: 1.6,
                color: '#c4b5a5',
                margin: '1rem 0 0',
                maxWidth: '24rem',
              }}
            >
              We understand your branding problems. Give us a call or connect with us on socials.
            </p>
          </aside>

          <div className="lg:w-[64%]">
            <InquiryForm />
          </div>
        </div>
      </div>
    </>
  )
}
