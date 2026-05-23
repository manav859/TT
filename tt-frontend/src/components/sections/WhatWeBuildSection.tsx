import { motion } from 'framer-motion'
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference'

const SERVICES = [
  {
    title: 'Campaign Shoots',
    description: 'Editorial campaigns shaped through mood and storytelling.',
    image: '/portfolio/services/campaign-shoots.jpg',
  },
  {
    title: 'Creative Direction',
    description: 'Visual language, styling, and narrative thinking.',
    image: '/portfolio/works/heritage-objects.jpg',
  },
  {
    title: 'Brand Storytelling',
    description: 'Atmospheric visuals designed for recognition and recall.',
    image: '/portfolio/services/cinematic-content.jpg',
  },
] as const

export function WhatWeBuildSection() {
  const reduced = useReducedMotionPreference()

  const enter = (delay = 0) =>
    reduced
      ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.35, delay } }
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
        }

  return (
    <section
      aria-label="What we build"
      className="tt-screen-section"
      style={{
        background: '#f5f0e8',
        padding: '0 5%',
      }}
    >
      <div className="mx-auto w-full max-w-[92rem]">
        {/* Header */}
        <div className="text-center">
          <motion.h2
            {...enter(0)}
            viewport={{ once: true, margin: '-10% 0px' }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: '-0.01em',
              color: '#1a1a1a',
            }}
          >
            What We Build
          </motion.h2>

          <motion.p
            {...enter(0.1)}
            viewport={{ once: true, margin: '-10% 0px' }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '16px',
              lineHeight: 1.8,
              color: '#6b5e52',
              maxWidth: '600px',
              margin: '1rem auto 0',
            }}
          >
            Campaign-led visuals designed to shape perception, create emotional recall, and give brands a distinct visual identity.
          </motion.p>
        </div>

        {/* 3-column grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: '2.5rem', marginTop: 'clamp(2.5rem, 5vw, 5rem)' }}
        >
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              {...enter(0.15 + i * 0.08)}
              viewport={{ once: true, margin: '-10% 0px' }}
            >
              <div style={{ aspectRatio: '3 / 4', overflow: 'hidden' }}>
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  fontWeight: 400,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#1a1a1a',
                  marginTop: '1.25rem',
                }}
              >
                {service.title}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '14px',
                  lineHeight: 1.7,
                  color: '#7a6a5a',
                  marginTop: '0.5rem',
                }}
              >
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
