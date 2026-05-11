import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { useBootstrap } from '@/hooks/useBootstrap'
import { buildTitle } from '@/lib/seo/buildMeta'
import type { SEOData } from '@/types/api'

interface PageSEOProps {
  seo?: SEOData
  pageTitle?: string
  noindex?: boolean
  type?: 'website' | 'article'
  jsonLd?: Record<string, unknown>
}

export function PageSEO({ seo, pageTitle, noindex, type = 'website', jsonLd }: PageSEOProps) {
  const { data: bootstrap } = useBootstrap()
  const location = useLocation()
  const globalSeo = bootstrap?.seo
  const template  = globalSeo?.title_template ?? '{page} — Tusk Tales'

  const title       = seo?.title ?? (pageTitle ? buildTitle(pageTitle, template) : 'Tusk Tales')
  const description = seo?.description || globalSeo?.default_description || ''
  const ogImage     = seo?.og_image || globalSeo?.default_og_image || ''
  const siteUrl     = globalSeo?.schema?.url || ''
  const canonical   = siteUrl ? `${siteUrl.replace(/\/$/, '')}${location.pathname}` : undefined

  const orgSchema = globalSeo?.schema
    ? {
        '@context': 'https://schema.org',
        '@type': globalSeo.schema.type,
        name: globalSeo.schema.name,
        url: globalSeo.schema.url,
        ...(globalSeo.schema.logo ? { logo: globalSeo.schema.logo } : {}),
      }
    : null

  const activeJsonLd = jsonLd ?? (type === 'website' && orgSchema ? orgSchema : null)

  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {noindex   && <meta name="robots" content="noindex, follow" />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:title"       content={title} />
      <meta property="og:type"        content={type} />
      {canonical   && <meta property="og:url"         content={canonical} />}
      {description && <meta property="og:description" content={description} />}
      {ogImage     && <meta property="og:image"       content={ogImage} />}

      {/* Twitter */}
      <meta name="twitter:card"  content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      {ogImage     && <meta name="twitter:image"       content={ogImage} />}

      {/* JSON-LD */}
      {activeJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(activeJsonLd)}
        </script>
      )}
    </Helmet>
  )
}
