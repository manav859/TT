const SLIDE_IMAGE = '/images/Extra%20slide.png'

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
