const SLIDE_IMAGE = '/images/Extra%20slide.png'
/* TODO: compress /images/Extra slide.png — currently 11.9 MB.
 * Re-export as JPEG (or WebP) at 1920px wide, quality 82 → target ≤ 400 KB. */

export function ExtraSlideSection() {
  return (
    <section
      aria-label="Portrait photography tagline"
      style={{
        display: 'block',
        width: '100%',
        margin: 0,
        padding: 0,
        fontSize: 0,
        lineHeight: 0,
      }}
    >
      <img
        src={SLIDE_IMAGE}
        alt="Portrait photographer seeking to capture identities, expressions, & auras of people."
        loading="eager"
        decoding="async"
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
          margin: 0,
          padding: 0,
          border: 0,
          verticalAlign: 'top',
        }}
      />
    </section>
  )
}
