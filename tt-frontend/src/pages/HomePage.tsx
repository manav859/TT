import { useHome } from '@/hooks/useHome'
import { useBootstrap } from '@/hooks/useBootstrap'
import { PageSEO } from '@/components/seo/PageSEO'
import { HomeSkeleton } from '@/components/ui/PageSkeleton'
import { ErrorState } from '@/components/ui/ErrorState'
import { HeroSection } from '@/components/sections/HeroSection'
import { SelectedWorksSection } from '@/components/sections/SelectedWorksSection'
import { ServicesPreviewSection } from '@/components/sections/ServicesPreviewSection'
import { JournalPreviewSection } from '@/components/sections/JournalPreviewSection'
import { CTABannerSection } from '@/components/sections/CTABannerSection'

export function HomePage() {
  const { data, isLoading, isError, error, refetch } = useHome()
  const { data: bootstrap } = useBootstrap()

  if (isLoading) return <HomeSkeleton />
  if (isError || !data) {
    return (
      <ErrorState
        message={(error as Error)?.message}
        onRetry={() => refetch()}
      />
    )
  }

  const orgJsonLd = bootstrap?.seo?.schema
    ? {
        '@context': 'https://schema.org',
        '@type': bootstrap.seo.schema.type,
        name: bootstrap.seo.schema.name,
        url: bootstrap.seo.schema.url,
      }
    : undefined

  return (
    <>
      <PageSEO seo={data.seo} type="website" jsonLd={orgJsonLd} />

      <HeroSection hero={data.hero} />

      {data.selected_works.items.length > 0 && (
        <SelectedWorksSection section={data.selected_works} />
      )}

      {data.services_preview.items.length > 0 && (
        <ServicesPreviewSection section={data.services_preview} />
      )}

      {data.journal_preview.items.length > 0 && (
        <JournalPreviewSection section={data.journal_preview} />
      )}

      <CTABannerSection banner={data.cta_banner} />
    </>
  )
}
