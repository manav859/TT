/* ─── Envelope ────────────────────────────────────────────────────────── */
export interface ApiEnvelope<T> {
  success: true
  data: T
  meta: {
    cached: boolean
    version: string
  }
}

export interface ApiErrorShape {
  success: false
  code: string
  message: string
  data?: {
    status?: number
    fields?: Record<string, string>
  }
}

export class ApiError extends Error {
  code: string
  status: number
  fields?: Record<string, string>

  constructor(message: string, code: string, status: number, fields?: Record<string, string>) {
    super(message)
    this.name = 'ApiError'
    this.code = code
    this.status = status
    this.fields = fields
  }
}

/* ─── Shared ──────────────────────────────────────────────────────────── */
export interface ImageAsset {
  id?: number
  url: string
  alt: string
  width?: number
  height?: number
}

export interface SEOData {
  title?: string
  description?: string
  og_image?: string
}

export interface SocialLinks {
  instagram?: string
  facebook?: string
  twitter?: string
}

/* ─── Bootstrap ───────────────────────────────────────────────────────── */
export interface NavItem {
  label: string
  url: string
  new_tab?: boolean
}

export interface FooterData {
  newsletter_heading: string
  newsletter_text: string
  newsletter_success?: string
  nav: NavItem[]
  copyright: string
  credit?: string
}

export interface GlobalSEO {
  title_template: string
  default_description: string
  default_og_image?: string
  schema?: {
    type: 'Organization' | 'Person'
    name: string
    url: string
    logo?: string
  }
}

export interface SiteIdentity {
  logo_text: string
  logo_image?: ImageAsset | null
  tagline: string
  description?: string
  favicon?: string
  social: SocialLinks
}

export interface BootstrapData {
  identity: SiteIdentity
  navigation: NavItem[]
  footer: FooterData
  seo: GlobalSEO
}

/* ─── Home ────────────────────────────────────────────────────────────── */
export interface HomeWorkPreview {
  title: string
  slug: string
  featured_image: ImageAsset | null
  caption?: string
  category?: string
}

export interface HomeServicePreview {
  title: string
  slug: string
  image: ImageAsset | null
  short_desc?: string
}

export interface HomeJournalPreview {
  title: string
  slug: string
  featured_image: ImageAsset | null
  excerpt?: string
}

export interface HomeData {
  hero: {
    title: string
    subtitle: string
    image: ImageAsset | null
  }
  selected_works: {
    heading: string
    link_label: string
    items: HomeWorkPreview[]
  }
  services_preview: {
    heading: string
    link_label: string
    items: HomeServicePreview[]
  }
  journal_preview: {
    heading: string
    link_label: string
    items: HomeJournalPreview[]
  }
  cta_banner: {
    title: string
    subtitle?: string
    image: ImageAsset | null
    button_label?: string | null
    button_url?: string | null
  }
  seo?: SEOData
}

/* ─── Works ───────────────────────────────────────────────────────────── */
export type WorkLayout = 'portrait' | 'landscape' | 'editorial'

export interface WorkSummary {
  id: number
  title: string
  slug: string
  featured_image: ImageAsset | null
  category?: string
  caption?: string
  layout?: WorkLayout
  year?: string
  client?: string
  location?: string
}

export interface WorkDetail extends WorkSummary {
  gallery: ImageAsset[]
  description?: string
  seo?: SEOData
}

export interface WorksData {
  heading: string
  intro?: string
  items: WorkSummary[]
}

/* ─── Services ────────────────────────────────────────────────────────── */
export interface ServiceSummary {
  id: number
  title: string
  slug: string
  image: ImageAsset | null
  short_desc?: string
}

export interface ServiceDetail extends ServiceSummary {
  description?: string
  details?: Array<{ label: string; value: string }>
  deliverables?: string[]
  process?: string[]
  best_for?: string[]
  starting_price?: string
  duration?: string
  inquiry_option?: boolean
  seo?: SEOData
}

export interface ServicesData {
  heading: string
  intro?: string
  items: ServiceSummary[]
}

/* ─── About ───────────────────────────────────────────────────────────── */
export interface AboutData {
  heading: string
  intro: string
  body?: string
  main_image: ImageAsset | null
  secondary_images?: ImageAsset[]
  values?: Array<{ heading: string; text: string }>
  cta_text?: string
  seo?: SEOData
}

/* ─── Journal ─────────────────────────────────────────────────────────── */
export interface JournalSummary {
  title: string
  slug: string
  featured_image: ImageAsset | null
  excerpt?: string
  category?: string
  author?: string
  date?: string
  reading_time?: number
}

export interface JournalDetail extends JournalSummary {
  content?: string
  seo?: SEOData
}

export interface JournalData {
  heading: string
  total: number
  page: number
  per_page: number
  items: JournalSummary[]
}

/* ─── Contact ─────────────────────────────────────────────────────────── */
export interface ContactFormConfig {
  has_phone: boolean
  has_services_checkboxes: boolean
  has_date: boolean
  has_budget: boolean
  service_options: string[]
  budget_options?: string[]
  recaptcha_site_key?: string
}

export interface ContactData {
  heading: string
  intro?: string
  form_fields: ContactFormConfig
  required_fields?: string[]
  success_message: string
}

/* ─── Form Payloads ───────────────────────────────────────────────────── */
export interface InquiryPayload {
  first_name: string
  last_name: string
  email: string
  phone?: string
  subject?: string
  services?: string[]
  preferred_date?: string
  budget?: string
  message: string
  newsletter_opt_in?: boolean
  _tt_hp: string
  _tt_nonce?: string
  recaptcha_token?: string
}

export interface NewsletterPayload {
  email: string
  _tt_hp: string
  _tt_nonce?: string
}

export interface SubmitResult {
  message: string
}
