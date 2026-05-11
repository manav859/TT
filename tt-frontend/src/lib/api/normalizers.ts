/**
 * Normalizers map raw backend API shapes → clean frontend TypeScript types.
 * All backend field-name differences are handled here — components stay clean.
 *
 * Backend image shapes encountered:
 *   List endpoints:  featured_image_url (string) | image_url (string)
 *   Single endpoints: featured_image { id, url, width, height, alt } + featured_image_url
 *                     image { id, url, width, height, alt } + image_url
 *   Gallery items:   { id, url, width, height, alt }
 */

import type {
  ImageAsset,
  SEOData,
  BootstrapData,
  HomeData,
  WorksData,
  WorkSummary,
  WorkDetail,
  ServicesData,
  ServiceSummary,
  ServiceDetail,
  AboutData,
  JournalData,
  JournalSummary,
  JournalDetail,
  ContactData,
  ContactFormConfig,
} from '@/types/api'

/* ── Image primitives ───────────────────────────────────────────────────── */

/**
 * Build ImageAsset from a full image object: { id, url, width, height, alt }.
 * Returns null if url is missing/empty.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normImgObj(obj: any, fallbackAlt = ''): ImageAsset | null {
  if (!obj || typeof obj !== 'object') return null
  const url = (obj.url ?? obj.image_url ?? '') as string
  if (!url) return null
  return {
    id:     typeof obj.id === 'number' ? obj.id : undefined,
    url,
    alt:    (obj.alt ?? obj.title ?? fallbackAlt) as string,
    width:  typeof obj.width  === 'number' ? obj.width  : undefined,
    height: typeof obj.height === 'number' ? obj.height : undefined,
  }
}

/**
 * Build ImageAsset from a URL string. Returns null if url is missing/empty.
 */
function normImgUrl(url: string | null | undefined, alt = ''): ImageAsset | null {
  if (!url) return null
  return { url, alt }
}

/**
 * Resolve an image that the backend may send as either a full object OR a URL string.
 * Prefers the full object (has alt, dimensions) over a bare URL string.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function resolveImg(obj: any, urlFallback: string | null | undefined, alt = ''): ImageAsset | null {
  return normImgObj(obj, alt) ?? normImgUrl(urlFallback, alt)
}

/** Normalise a raw SEO sub-object from any endpoint. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normSeo(raw: any): SEOData | undefined {
  if (!raw) return undefined
  return {
    title:       raw.title       ?? undefined,
    description: raw.description ?? undefined,
    og_image:    raw.og_image_url ?? raw.og_image ?? undefined,
  }
}

/* ── Bootstrap ──────────────────────────────────────────────────────────── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normBootstrap(raw: any): BootstrapData {
  /* social_links is an array [{ platform, url, label }] → flat object */
  const socialArr: { platform: string; url: string }[] =
    raw?.identity?.social_links ?? []
  const social: BootstrapData['identity']['social'] = {}
  for (const s of socialArr) {
    const p = s.platform?.toLowerCase()
    if      (p === 'instagram') social.instagram = s.url
    else if (p === 'facebook')  social.facebook  = s.url
    else if (p === 'twitter')   social.twitter   = s.url
  }
  const navSocials: { platform: string; url: string }[] = raw?.nav_socials ?? []
  for (const s of navSocials) {
    const p = s.platform?.toLowerCase()
    if      (p === 'instagram' && !social.instagram) social.instagram = s.url
    else if (p === 'facebook'  && !social.facebook)  social.facebook  = s.url
    else if (p === 'twitter'   && !social.twitter)   social.twitter   = s.url
  }

  const footerRaw = raw?.footer ?? {}
  const footerNav = (footerRaw.nav_items ?? footerRaw.nav ?? [])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((n: any) => ({ label: n.label, url: n.url, new_tab: n.new_tab ?? false }))

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = (raw?.navigation ?? []).map((n: any) => ({
    label:   n.label,
    url:     n.url,
    new_tab: n.new_tab ?? false,
  }))

  return {
    identity: {
      logo_text:  raw?.identity?.logo_text ?? 'TUSK TALES',
      logo_image: resolveImg(
        raw?.identity?.logo_image,
        raw?.identity?.logo_image_url,
        raw?.identity?.logo_text ?? 'Tusk Tales',
      ),
      tagline:    raw?.identity?.tagline ?? '',
      description: raw?.identity?.brand_description ?? raw?.identity?.description ?? undefined,
      favicon:    raw?.identity?.favicon_url ?? undefined,
      social,
    },
    navigation,
    footer: {
      newsletter_heading: footerRaw.newsletter_heading ?? 'Subscribe',
      newsletter_text:    footerRaw.newsletter_text    ?? '',
      newsletter_success: footerRaw.newsletter_success ?? undefined,
      nav:       footerNav,
      copyright: footerRaw.copyright ?? `© ${new Date().getFullYear()} Tusk Tales`,
      credit:    footerRaw.credit ?? footerRaw.credit_text ?? undefined,
    },
    seo: {
      title_template:
        raw?.seo?.title_template
        ?? raw?.seo_defaults?.title_pattern
        ?? '{page} — Tusk Tales',
      default_description:
        raw?.seo?.default_description
        ?? raw?.seo_defaults?.description
        ?? raw?.seo?.description
        ?? '',
      default_og_image:
        raw?.seo?.og_image_url
        ?? raw?.seo_defaults?.og_image_url
        ?? raw?.seo?.default_og_image
        ?? undefined,
      schema: raw?.seo?.schema ?? {
        type: raw?.seo_defaults?.schema_type ?? 'Organization',
        name: raw?.seo_defaults?.schema_name ?? 'Tusk Tales',
        url:  raw?.seo_defaults?.schema_url || (typeof window !== 'undefined' ? window.location.origin : ''),
      },
    },
  }
}

/* ── Home ───────────────────────────────────────────────────────────────── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normHome(raw: any): HomeData {
  const hero      = raw?.hero          ?? {}
  const selWorks  = raw?.selected_works  ?? {}
  const svcPreview = raw?.services_preview ?? {}
  const jPreview  = raw?.journal_preview ?? {}
  const cta       = raw?.cta_banner    ?? {}

  return {
    hero: {
      title:    hero.title    ?? 'Tusk Tales',
      subtitle: hero.subtitle ?? '',
      image:    resolveImg(hero.image, hero.image_url, hero.image_alt ?? 'Tusk Tales'),
    },
    selected_works: {
      heading:    selWorks.section_title ?? selWorks.heading ?? 'Selected Works',
      link_label: selWorks.link_label   ?? 'View Work',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      items: (selWorks.items ?? []).map((w: any) => ({
        title:          w.title ?? '',
        slug:           w.slug  ?? '',
        featured_image: resolveImg(w.featured_image, w.featured_image_url, w.title ?? ''),
        caption:        w.short_caption ?? w.caption ?? undefined,
      })),
    },
    services_preview: {
      heading:    svcPreview.section_title ?? svcPreview.heading ?? 'Services',
      link_label: svcPreview.link_label   ?? 'View Services',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      items: (svcPreview.items ?? []).map((s: any) => ({
        id:         s.id    ?? 0,
        title:      s.title ?? '',
        slug:       s.slug  ?? '',
        image:      resolveImg(s.image, s.image_url, s.title ?? ''),
        short_desc: s.short_description ?? s.short_desc ?? undefined,
      })),
    },
    journal_preview: {
      heading:    jPreview.section_title ?? jPreview.heading ?? 'Journal',
      link_label: jPreview.link_label   ?? 'Read More',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      items: (jPreview.items ?? []).map((p: any) => ({
        title:          p.title ?? '',
        slug:           p.slug  ?? '',
        featured_image: resolveImg(p.featured_image, p.featured_image_url, p.title ?? ''),
        excerpt: p.excerpt ?? undefined,
        date:    p.publish_date ?? p.date ?? undefined,
      })),
    },
    cta_banner: {
      title:        cta.title        ?? '',
      subtitle:     cta.subtitle     ?? undefined,
      image:        resolveImg(cta.image, cta.image_url, cta.title ?? ''),
      button_label: cta.button_label ?? null,
      button_url:   cta.button_url   ?? null,
    },
    seo: normSeo(raw?.seo),
  }
}

/* ── Works ──────────────────────────────────────────────────────────────── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normWorkSummary(w: any): WorkSummary {
  return {
    id:             w.id ?? 0,
    title:          w.title    ?? '',
    slug:           w.slug     ?? '',
    /* Prefer full object (has alt + dimensions); fall back to URL string */
    featured_image: resolveImg(w.featured_image, w.featured_image_url, w.title ?? ''),
    category:  w.category     ?? undefined,
    caption:   w.short_caption ?? w.caption ?? undefined,
    layout:    w.layout        ?? 'portrait',
    year:      w.year ? String(w.year) : undefined,
    client:    w.client        ?? undefined,
    location:  w.location      ?? undefined,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normWorks(raw: any): WorksData {
  return {
    heading: raw?.heading ?? 'Our Work',
    intro:   raw?.intro   ?? undefined,
    items:   (raw?.items ?? []).map(normWorkSummary),
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normWork(raw: any): WorkDetail {
  const base = normWorkSummary(raw)

  /* Gallery: items are full objects { id, url, width, height, alt } */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gallery: ImageAsset[] = (raw?.gallery ?? [])
    .map((g: any) => {
      if (typeof g === 'string') return normImgUrl(g, raw.title ?? '') ?? { url: g, alt: raw.title ?? '' }
      return normImgObj(g, raw.title ?? '') ?? { url: '', alt: '' }
    })
    .filter((g: ImageAsset) => Boolean(g.url))

  return {
    ...base,
    gallery,
    description: raw?.description ?? undefined,
    seo: normSeo(raw?.seo),
  }
}

/* ── Services ───────────────────────────────────────────────────────────── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normServiceSummary(s: any): ServiceSummary {
  return {
    id:         s.id    ?? 0,
    title:      s.title ?? '',
    slug:       s.slug  ?? '',
    /* Prefer full object; fall back to URL string */
    image:      resolveImg(s.image, s.image_url, s.title ?? ''),
    short_desc: s.short_description ?? s.short_desc ?? undefined,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normServices(raw: any): ServicesData {
  return {
    heading: raw?.heading ?? 'Services',
    intro:   raw?.intro   ?? undefined,
    items:   (raw?.items ?? []).map(normServiceSummary),
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normService(raw: any): ServiceDetail {
  const base = normServiceSummary(raw)

  /* deliverables / process / best_for — arrays of strings */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toStringArr = (v: any): string[] | undefined => {
    if (!v) return undefined
    if (Array.isArray(v) && v.length > 0) return v.map(String)
    return undefined
  }

  return {
    ...base,
    description:    raw?.full_description ?? raw?.description ?? undefined,
    details:        Array.isArray(raw?.details) && raw.details.length > 0 ? raw.details : undefined,
    deliverables:   toStringArr(raw?.deliverables),
    process:        toStringArr(raw?.process),
    best_for:       toStringArr(raw?.best_for),
    starting_price: raw?.starting_price || undefined,
    duration:       raw?.duration       || undefined,
    inquiry_option: Array.isArray(raw?.inquiry_options)
      ? raw.inquiry_options.length > 0
      : Boolean(raw?.inquiry_option),
    seo: normSeo(raw?.seo),
  }
}

/* ── About ──────────────────────────────────────────────────────────────── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normAbout(raw: any): AboutData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const values = (raw?.values ?? []).map((v: any) => ({
    heading: v.label ?? v.heading ?? '',
    text:    v.text  ?? '',
  }))

  const ctaRaw = raw?.cta
  const cta_text =
    typeof ctaRaw === 'string'
      ? ctaRaw
      : ctaRaw?.text ?? raw?.cta_text ?? undefined

  const main_image = resolveImg(raw?.main_image, raw?.main_image_url, raw?.heading ?? '')

  return {
    heading:           raw?.heading    ?? 'About',
    intro:             raw?.intro_text ?? raw?.intro ?? '',
    body:              raw?.body_text  ?? raw?.body  ?? undefined,
    main_image,
    secondary_images: raw?.secondary_images ?? [],
    values:  values.length > 0 ? values : undefined,
    cta_text,
    seo: normSeo(raw?.seo),
  }
}

/* ── Journal ────────────────────────────────────────────────────────────── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normJournalSummary(p: any): JournalSummary {
  return {
    title:          p.title ?? '',
    slug:           p.slug  ?? '',
    featured_image: resolveImg(p.featured_image, p.featured_image_url, p.title ?? ''),
    excerpt:        p.excerpt ?? undefined,
    category:       p.category ?? undefined,
    author:         p.author_display ?? p.author ?? undefined,
    date:           p.publish_date   ?? p.date   ?? undefined,
    reading_time:   p.reading_time   ?? undefined,
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normJournal(raw: any): JournalData {
  return {
    heading:  raw?.heading ?? 'Journal',
    total:    raw?.total   ?? 0,
    page:     raw?.page    ?? 1,
    per_page: raw?.per_page ?? raw?.total_pages ?? 12,
    items:    (raw?.items ?? []).map(normJournalSummary),
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normJournalPost(raw: any): JournalDetail {
  const base = normJournalSummary(raw)
  return {
    ...base,
    content: raw?.content ?? undefined,
    seo:     normSeo(raw?.seo),
  }
}

/* ── Contact ────────────────────────────────────────────────────────────── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normContact(raw: any): ContactData {
  const backendFields = raw?.form_fields ?? {}
  const formFields: ContactFormConfig = {
    has_phone:               'phone'          in backendFields,
    has_services_checkboxes: 'services'       in backendFields,
    has_date:                'preferred_date' in backendFields,
    has_budget:              'budget'         in backendFields,
    service_options:         raw?.service_options  ?? [],
    budget_options:          raw?.budget_options   ?? undefined,
    recaptcha_site_key:      raw?.recaptcha_site_key ?? undefined,
  }

  return {
    heading:         raw?.heading    ?? "Let's Talk",
    intro:           raw?.intro_text ?? raw?.intro ?? undefined,
    form_fields:     formFields,
    success_message: raw?.success_message ?? 'Thank you. We\'ll be in touch shortly.',
  }
}
