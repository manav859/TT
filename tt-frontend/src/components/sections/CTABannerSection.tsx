import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { RevealText } from '@/lib/animations/RevealText'
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference'
import type { HomeData } from '@/types/api'

const CTA_PLACEHOLDER = 'linear-gradient(160deg, #1a1916 0%, #2e2a26 35%, #3d3630 65%, #2a2420 100%)'

export function CTABannerSection({ banner }: { banner: HomeData['cta_banner'] }) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotionPreference()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-6%', '6%'])

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ minHeight: 'clamp(340px, 55vh, 580px)' }}
      aria-label="Call to action"
    >
      {/* Parallax background */}
      <motion.div className="absolute inset-0 scale-110" style={{ y }} aria-hidden="true">
        {banner.image?.url ? (
          <img
            src={banner.image.url}
            alt={banner.image.alt || ''}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0" style={{ background: CTA_PLACEHOLDER }} />
        )}
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-linear-to-t from-tt-ink/85 via-tt-ink/45 to-tt-ink/15" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 tt-wide flex flex-col justify-end h-full min-h-[clamp(340px,55vh,580px)] pb-16 gap-8">
        <RevealText as="h2" className="tt-heading-xl tt-serif text-white max-w-2xl" delay={0.1}>
          {banner.title}
        </RevealText>

        {banner.button_url && banner.button_label && (
          <Link
            to={banner.button_url}
            className="self-start inline-flex items-center gap-3 px-8 py-3 border border-white/60 text-white text-[11px] font-medium tracking-[0.14em] uppercase hover:bg-white hover:text-tt-ink transition-all duration-300"
          >
            {banner.button_label}
          </Link>
        )}
      </div>
    </section>
  )
}
