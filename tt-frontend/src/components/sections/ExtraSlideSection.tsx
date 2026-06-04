import { ImageParticles } from './ImageParticles'

const SLIDE_IMAGE = '/images/Extra slide.jpeg'
/* TODO: compress /images/Extra slide.jpeg — currently 624 KB (full-bleed).
 * Re-export as WebP at 1920px wide, quality 80 → target ≤ 400 KB.
 * (The 11.9 MB /images/Extra slide.png source is unused — safe to delete.) */

export function ExtraSlideSection() {
  return (
    <section
      className="tt-extra-slide"
      aria-label="Portrait photography tagline"
    >
      <img
        src={SLIDE_IMAGE}
        alt="Portrait photographer seeking to capture identities, expressions, & auras of people."
        loading="lazy"
        decoding="async"
        className="tt-extra-slide-image"
      />
      <ImageParticles />
      <div className="tt-extra-slide-copy">
        We build visual identities people remember before they understand.
      </div>
    </section>
  )
}
