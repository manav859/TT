import { motion } from 'framer-motion'
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference'
import type { HomeData } from '@/types/api'

export function HeroSection({ hero }: { hero: HomeData['hero'] }) {
  const reduced = useReducedMotionPreference()

  return (
    <section
      aria-label="Hero"
      className="relative overflow-hidden"
      style={{
        width: '100vw',
        height: '100vh',
        minHeight: '100vh',
        marginTop: 'calc(-1 * var(--height-nav))',
        background: '#111111',
      }}
    >
      {hero.image?.url && (
        <motion.img
          src={hero.image.url}
          alt={hero.image.alt || 'Tusk Tales'}
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          className="absolute inset-0 h-full w-full"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          transition={{ duration: reduced ? 0.35 : 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
      )}

      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: 'rgba(0, 0, 0, 0.25)' }}
      />

      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        style={{ color: '#ffffff' }}
      >
        <div className="overflow-hidden">
          <motion.h1
            initial={reduced ? { opacity: 0 } : { y: '105%' }}
            animate={reduced ? { opacity: 1 } : { y: 0 }}
            transition={{ duration: reduced ? 0.35 : 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(5rem, 12vw, 11rem)',
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: '-0.01em',
              color: '#ffffff',
            }}
          >
            {hero.title}
          </motion.h1>
        </div>

        <div className="overflow-hidden" style={{ marginTop: '1.5rem' }}>
          <motion.p
            initial={reduced ? { opacity: 0 } : { y: '100%' }}
            animate={reduced ? { opacity: 1 } : { y: 0 }}
            transition={{ duration: reduced ? 0.25 : 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
              fontWeight: 400,
              letterSpacing: '0.3em',
              color: 'rgba(255, 255, 255, 0.85)',
              textTransform: 'uppercase',
            }}
          >
            {hero.subtitle}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
