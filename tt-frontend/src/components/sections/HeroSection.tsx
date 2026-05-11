import { motion } from 'framer-motion'
import { MaskImage } from '@/lib/animations/MaskImage'
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference'
import type { HomeData } from '@/types/api'

/* Atmospheric editorial placeholder for null hero image */
const HERO_PLACEHOLDER = 'linear-gradient(160deg, #c5b8a8 0%, #b0a290 25%, #9e8f7e 55%, #7d6e5f 80%, #5a4e42 100%)'

export function HeroSection({ hero }: { hero: HomeData['hero'] }) {
  const reduced = useReducedMotionPreference()

  return (
    <section className="w-full" aria-label="Hero">
      {/* Brand text */}
      <div className="tt-wide pt-20 pb-14 text-center">
        <div className="overflow-hidden mb-3">
          <motion.h1
            className="tt-display tt-serif text-tt-ink"
            initial={reduced ? { opacity: 0 } : { y: '105%' }}
            animate={reduced ? { opacity: 1 } : { y: 0 }}
            transition={{ duration: reduced ? 0.35 : 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          >
            {hero.title}
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.p
            className="tt-caption tracking-[0.3em] text-tt-ink-light"
            initial={reduced ? { opacity: 0 } : { y: '100%' }}
            animate={reduced ? { opacity: 1 } : { y: 0 }}
            transition={{ duration: reduced ? 0.25 : 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          >
            {hero.subtitle}
          </motion.p>
        </div>
      </div>

      {/* Cinematic hero image */}
      <MaskImage delay={0.45} className="w-full">
        <div className="relative w-full overflow-hidden aspect-16/7">
          {hero.image?.url ? (
            <img
              src={hero.image.url}
              alt={hero.image.alt || 'Tusk Tales'}
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0" style={{ background: HERO_PLACEHOLDER }} />
          )}
        </div>
      </MaskImage>
    </section>
  )
}
