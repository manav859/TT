import { useHome } from '@/hooks/useHome'
import { useBootstrap } from '@/hooks/useBootstrap'
import { PageSEO } from '@/components/seo/PageSEO'
import { HomeSkeleton } from '@/components/ui/PageSkeleton'
import { ErrorState } from '@/components/ui/ErrorState'
import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { WhatWeBuildSection } from '@/components/sections/WhatWeBuildSection'
import { OurWorkSection } from '@/components/sections/OurWorkSection'
import { ExtraSlideSection } from '@/components/sections/ExtraSlideSection'

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

      <AboutSection />

      <WhatWeBuildSection />

      <OurWorkSection />

      <ExtraSlideSection />
    </>
  )
}
