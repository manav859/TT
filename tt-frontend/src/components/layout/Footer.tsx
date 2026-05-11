import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useBootstrap } from '@/hooks/useBootstrap'
import { NewsletterForm } from '@/components/forms/NewsletterForm'
import { SocialIcon } from '@/components/ui/SocialIcon'

export function Footer() {
  const { data: bootstrap } = useBootstrap()
  const footer = bootstrap?.footer
  const identity = bootstrap?.identity
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-12% 0px' })
  const year = new Date().getFullYear()

  const copyright =
    footer?.copyright?.replace('{year}', String(year)) ?? `Copyright ${year} Tusk Tales`

  const socialEntries = Object.entries(identity?.social ?? {}).filter(([, value]) => Boolean(value)) as [
    'instagram' | 'facebook' | 'twitter',
    string,
  ][]

  const logoText = identity?.logo_text ?? 'TUSK TALES'
  const logoParts = logoText.split(' ')
  const navItems = footer?.nav?.filter((item) => item.url !== '/contact') ?? []
  const credit = footer?.credit ?? 'Built with intention.'
  const socialLabels: Record<'instagram' | 'facebook' | 'twitter', string> = {
    instagram: 'Instagram',
    facebook: 'Facebook',
    twitter: 'Twitter',
  }

  return (
    <motion.footer
      ref={ref}
      aria-label="Footer"
      className="mt-auto bg-[rgba(246,242,235,0.82)]"
      initial={{ opacity: 0, y: 42, filter: 'blur(10px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="tt-wide py-16 md:py-20">
        <div className="tt-rule" />

        <div className="grid grid-cols-1 gap-12 pt-10 lg:grid-cols-[1.05fr_0.95fr_0.82fr] lg:gap-16">
          <div className="min-w-0 space-y-5">
            <p className="tt-caption text-tt-accent-dark">Tusk Tales</p>

            {identity?.logo_image?.url ? (
              <img
                src={identity.logo_image.url}
                alt={identity.logo_image.alt || logoText}
                className="h-12 w-auto md:h-14"
              />
            ) : (
              <span className="tt-logo-wordmark">
                <strong>{logoParts[0]}</strong>
                <span>{logoParts.slice(1).join(' ') || 'Tales'}</span>
              </span>
            )}

            {identity?.tagline && (
              <p className="tt-body-lead max-w-sm text-tt-ink">{identity.tagline}</p>
            )}
            {identity?.description && (
              <p className="tt-body max-w-md">{identity.description}</p>
            )}
          </div>

          <div className="min-w-0 space-y-5">
            <div className="space-y-3">
              <p className="tt-caption text-tt-accent-dark">
                {footer?.newsletter_heading ?? 'Stay in the frame.'}
              </p>
              {footer?.newsletter_text && (
                <p className="tt-body max-w-md">{footer.newsletter_text}</p>
              )}
            </div>

            <NewsletterForm />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
            <div className="space-y-4">
              <p className="tt-caption">Navigate</p>
              <nav aria-label="Footer navigation" className="grid grid-cols-1 gap-3">
                {navItems.map((item) => (
                  <Link
                    key={item.url}
                    to={item.url}
                    className="text-[0.98rem] leading-relaxed text-tt-ink-soft transition-colors duration-200 hover:text-tt-ink"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="space-y-4">
              <p className="tt-caption">Connect</p>
              <div className="grid gap-3">
                <Link
                  to="/contact"
                  className="text-[0.98rem] leading-relaxed text-tt-ink-soft transition-colors duration-200 hover:text-tt-ink"
                >
                  Start a Conversation
                </Link>

                {socialEntries.map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={socialLabels[key]}
                    className="inline-flex items-center gap-3 text-[0.98rem] leading-relaxed text-tt-ink-soft transition-colors duration-200 hover:text-tt-ink"
                  >
                    <SocialIcon name={key} size={16} />
                    <span>{socialLabels[key]}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-tt-border pt-5 text-[0.8rem] uppercase tracking-[0.15em] text-tt-ink-light sm:flex-row sm:items-center sm:justify-between">
          <p>{copyright}</p>
          <p>{credit}</p>
        </div>
      </div>
    </motion.footer>
  )
}
