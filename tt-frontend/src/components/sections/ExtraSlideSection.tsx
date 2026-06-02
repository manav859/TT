import { ImageParticles } from './ImageParticles'

const SLIDE_IMAGE = '/images/Extra slide.jpeg'
/* TODO: compress /images/Extra slide.png — currently 11.9 MB.
 * Re-export as JPEG (or WebP) at 1920px wide, quality 82 → target ≤ 400 KB. */

export function ExtraSlideSection() {
  return (
    <section
      className="tt-extra-slide"
      aria-label="Portrait photography tagline"
    >
      <img
        src={SLIDE_IMAGE}
        alt="Portrait photographer seeking to capture identities, expressions, & auras of people."
        loading="eager"
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
