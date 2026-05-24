import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference'

const ABOUT_IMAGE = '/images/About_image.png'
const ABOUT_TAGLINE = '/logo/Tagline.png'
/* TODO: compress /images/About_image.png — currently 7.8 MB.
 * Re-export as JPEG at 1600px wide, quality 82 → target ≤ 300 KB. */

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
      id="about"
      className="tt-home-about"
      aria-label="About"
      style={{ scrollMarginTop: 'var(--height-nav)' }}
    >
      <div className="tt-wide tt-home-about-shell">
        <div className="tt-home-about-grid">
          <div className="tt-home-about-copy">
            <motion.h2
              {...enter(0.08)}
              viewport={{ once: true, margin: '-10% 0px' }}
              className="tt-home-about-title"
            >
              About
            </motion.h2>

            <motion.p
              {...enter(0.18)}
              viewport={{ once: true, margin: '-10% 0px' }}
              className="tt-home-about-text"
            >
              Some brands have a great story. Most just haven&apos;t found the right way to show it yet.
            </motion.p>

            <motion.p
              {...enter(0.26)}
              viewport={{ once: true, margin: '-10% 0px' }}
              className="tt-home-about-text"
            >
              That&apos;s the gap we work in, translating what a brand truly stands for into visuals that people actually feel. If you want a creative partner who&apos;ll push your brand further than you expected.
            </motion.p>

            <motion.div
              {...enter(0.34)}
              viewport={{ once: true, margin: '-10% 0px' }}
              className="tt-home-about-cta-wrap"
            >
              <Link to="/contact" className="tt-home-about-cta">
                Let&apos;s Talk
              </Link>
            </motion.div>
          </div>

          <div className="tt-home-about-media">
            <div className="tt-home-about-image-heading">
              <img
                src={ABOUT_TAGLINE}
                alt="Purpose in every frame"
                loading="lazy"
                decoding="async"
                className="tt-home-about-image-heading-mark"
              />
            </div>
            <motion.div
              {...enter(0.1)}
              viewport={{ once: true, margin: '-10% 0px' }}
              className="tt-home-about-image-wrap"
            >
              <img
                src={ABOUT_IMAGE}
                alt="Purpose in every frame"
                loading="lazy"
                decoding="async"
                className="tt-home-about-image"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
