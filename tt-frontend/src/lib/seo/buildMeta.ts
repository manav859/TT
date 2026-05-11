import type { SEOData, GlobalSEO } from '@/types/api'

export function buildTitle(pageTitle: string | undefined, template: string): string {
  if (!pageTitle) return template.replace('{page}', 'Tusk Tales')
  return template.replace('{page}', pageTitle)
}

export function buildMeta(seo: SEOData | undefined, global: GlobalSEO | undefined) {
  return {
    title: seo?.title ?? buildTitle(undefined, global?.title_template ?? 'Tusk Tales'),
    description: seo?.description ?? global?.default_description ?? '',
    ogImage: seo?.og_image ?? global?.default_og_image ?? '',
  }
}
