import { Link } from 'react-router-dom'
import { useBootstrap } from '@/hooks/useBootstrap'
import { NewsletterForm } from '@/components/forms/NewsletterForm'
import { SocialIcon } from '@/components/ui/SocialIcon'

export function Footer() {
  const { data: bootstrap } = useBootstrap()
  const footer = bootstrap?.footer
  const social = bootstrap?.identity?.social ?? {}
  const year   = new Date().getFullYear()

  const copyright = footer?.copyright?.replace('{year}', String(year)) ?? `© ${year} Tusk Tales`

  const socialEntries = Object.entries(social).filter(([, v]) => Boolean(v)) as [
    'instagram' | 'facebook' | 'twitter', string
  ][]

  return (
    <footer className="bg-tt-off-white border-t border-tt-border" aria-label="Footer">
      <div className="tt-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">

          {/* Newsletter */}
          <div className="space-y-4">
            <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-tt-ink">
              {footer?.newsletter_heading ?? 'Subscribe'}
            </p>
            {footer?.newsletter_text && (
              <p className="text-sm text-tt-ink-light leading-relaxed">{footer.newsletter_text}</p>
            )}
            <div className="relative pt-2">
              <NewsletterForm />
            </div>
          </div>

          {/* Nav + Social */}
          <div className="flex flex-col justify-between gap-8">
            {footer?.nav && footer.nav.length > 0 && (
              <nav aria-label="Footer navigation" className="flex flex-col gap-3 md:items-end">
                {footer.nav.map((item) => (
                  <Link
                    key={item.url}
                    to={item.url}
                    className="text-[11px] font-medium tracking-[0.14em] uppercase text-tt-ink-light hover:text-tt-ink transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            )}

            {socialEntries.length > 0 && (
              <div className="flex items-center gap-5 md:justify-end">
                {socialEntries.map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={key}
                    className="text-tt-ink-light hover:text-tt-ink transition-colors duration-200"
                  >
                    <SocialIcon name={key} size={16} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-tt-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-[11px] font-normal tracking-[0.12em] uppercase text-tt-ink-light">{copyright}</p>
          {footer?.credit && (
            <p className="text-[11px] font-normal tracking-[0.12em] uppercase text-tt-ink-light">{footer.credit}</p>
          )}
        </div>
      </div>
    </footer>
  )
}
