import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { RevealText } from '@/lib/animations/RevealText'
import { MaskImage } from '@/lib/animations/MaskImage'
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference'
import type { HomeData } from '@/types/api'

export function CTABannerSection({ banner }: { banner: HomeData['cta_banner'] }) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotionPreference()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ['0%', '0%'] : ['-5%', '5%'],
  )

  return (
    <section ref={ref} className="tt-section-loose" aria-label="Start a project">
      <div className="tt-wide">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="flex flex-col justify-between gap-10 lg:gap-14">
            <div className="tt-stack-md">
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-tt-accent" />
                <p className="tt-caption text-tt-accent-dark">Start Project</p>
              </div>

              <RevealText as="h2" className="tt-heading-xl text-tt-ink">
                {banner.title || "Let's build something worth feeling."}
              </RevealText>

              {banner.subtitle && (
                <motion.p
                  className="tt-body-lead max-w-xl"
                  initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-12% 0px' }}
                  transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  {banner.subtitle}
                </motion.p>
              )}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {banner.button_url && banner.button_label && (
                <Link to={banner.button_url} className="tt-button tt-button-accent self-start">
                  {banner.button_label}
                  <ArrowRight size={14} strokeWidth={1.8} />
                </Link>
              )}

              <p className="tt-caption text-tt-ink-light">Selected commissions, thoughtful timelines.</p>
            </div>
          </div>

          <MaskImage className="h-full">
            <div className="relative min-h-[20rem] overflow-hidden bg-tt-off-white-strong md:min-h-[26rem]">
              <motion.div className="absolute inset-0 scale-105" style={{ y: imageY }}>
                {banner.image?.url ? (
                  <img
                    src={banner.image.url}
                    alt={banner.image.alt || banner.title || 'Start a project'}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="tt-placeholder-editorial absolute inset-0" />
                )}
              </motion.div>

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(35,29,24,0.28)_100%)]" />

              <div className="absolute left-5 top-5 right-5 flex items-center justify-between text-tt-white/80">
                <p className="tt-caption text-inherit">01</p>
                <p className="tt-caption text-inherit">Tusk Tales</p>
              </div>

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                <span className="h-px flex-1 bg-white/[0.45]" />
                <p className="tt-caption text-white/80">Editorial direction</p>
              </div>
            </div>
          </MaskImage>
        </div>
      </div>
    </section>
  )
}
