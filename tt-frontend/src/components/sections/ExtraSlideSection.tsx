import { ImageParticles } from './ImageParticles'

const SLIDE_IMAGE = '/images/Extra slide.webp'

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
