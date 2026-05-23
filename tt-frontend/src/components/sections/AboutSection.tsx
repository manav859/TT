import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference'

export function AboutSection() {
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
      aria-label="About"
      style={{
        background: '#C4B5A5',
        padding: '7rem 5%',
      }}
    >
      <div
        className="mx-auto grid w-full max-w-[92rem] grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-20"
      >
        {/* Left — Text */}
        <div>
          <motion.p
            {...enter(0)}
            viewport={{ once: true, margin: '-10% 0px' }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              letterSpacing: '0.15em',
              color: '#7a6a5a',
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
            }}
          >
            About Us
          </motion.p>

          <motion.h2
            {...enter(0.08)}
            viewport={{ once: true, margin: '-10% 0px' }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: '-0.01em',
              color: '#1a1a1a',
            }}
          >
            About
          </motion.h2>

          <motion.p
            {...enter(0.18)}
            viewport={{ once: true, margin: '-10% 0px' }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: '17px',
              lineHeight: 1.9,
              color: '#3a3028',
              marginTop: '2rem',
              maxWidth: '34rem',
            }}
          >
            Some brands have a great story. Most just haven't found the right way to show it yet.
          </motion.p>

          <motion.p
            {...enter(0.26)}
            viewport={{ once: true, margin: '-10% 0px' }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: '17px',
              lineHeight: 1.9,
              color: '#3a3028',
              marginTop: '1.25rem',
              maxWidth: '34rem',
            }}
          >
            That's the gap we work in — translating what a brand truly stands for into visuals people actually feel.
          </motion.p>

          <motion.div
            {...enter(0.34)}
            viewport={{ once: true, margin: '-10% 0px' }}
            style={{ marginTop: '2.5rem' }}
          >
            <Link
              to="/contact"
              style={{
                display: 'inline-block',
                background: '#3a2e26',
                color: '#f5f0e8',
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: 400,
                letterSpacing: '0.1em',
                padding: '14px 36px',
                borderRadius: '2px',
                textTransform: 'uppercase',
              }}
            >
              Let's talk
            </Link>
          </motion.div>
        </div>

        {/* Right — Image */}
        <motion.div
          {...enter(0.1)}
          viewport={{ once: true, margin: '-10% 0px' }}
          style={{ aspectRatio: '4 / 5', overflow: 'hidden' }}
        >
          <img
            src="/portfolio/about.jpg"
            alt="Tusk Tales studio"
            loading="lazy"
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}
