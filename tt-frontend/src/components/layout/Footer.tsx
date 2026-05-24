import { useLocation } from 'react-router-dom'
import { useBootstrap } from '@/hooks/useBootstrap'

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function GmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

const CONTACT_PHONE_HREF = 'tel:9898129808'
const CONTACT_EMAIL = 'support@tusktales.in'

const FALLBACK_SOCIALS = {
  instagram: 'https://www.instagram.com/tusk_tales_/',
  email: `mailto:${CONTACT_EMAIL}`,
  phone: CONTACT_PHONE_HREF,
} as const

export function Footer() {
  const { data: bootstrap } = useBootstrap()
  const social = bootstrap?.identity?.social
  const { pathname } = useLocation()

  /* The Let's-talk footer duplicates intent on the contact page. */
  if (pathname === '/contact') return null

  const socialLinks = [
    {
      label: 'Instagram',
      href: social?.instagram || FALLBACK_SOCIALS.instagram,
      icon: InstagramIcon,
      external: true,
    },
    {
      label: 'Email',
      href: FALLBACK_SOCIALS.email,
      icon: GmailIcon,
      external: false,
    },
    {
      label: 'Phone',
      href: FALLBACK_SOCIALS.phone,
      icon: PhoneIcon,
      external: false,
    },
  ] as const

  return (
    <footer className="tt-lets-talk-footer" aria-label="Let's talk">
      <h2 className="tt-lets-talk-heading">Let&apos;s talk.</h2>
      <p className="tt-lets-talk-subtitle">
        We understand your branding problems. Give us a call or connect with us on socials.
      </p>

      <div className="tt-lets-talk-socials" aria-label="Social links">
        {socialLinks.map(({ label, href, icon: Icon, external }) => (
          <a
            key={label}
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            aria-label={label}
            className="tt-lets-talk-social"
          >
            <Icon />
          </a>
        ))}
      </div>

      <div className="flex justify-center">
        <a href="/contact" className="tt-lets-talk-contact" aria-label="Go to contact page">
          Contact
        </a>
      </div>
    </footer>
  )
}
