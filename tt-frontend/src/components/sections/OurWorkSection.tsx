const WORKS = [
  {
    title: 'FASHION CAMPAIGN',
    description: 'Editorial campaign visuals built around emotion, movement, and premium perception.',
    image: '/images/Cover_fashion.jpeg',
    placeholder: '#2a2520',
  },
  {
    title: 'LIFESTYLE & SPATIAL IDENTITY',
    description: 'Visual narratives connecting interiors, atmosphere, and brand perception.',
    image: '/images/lifestyle-spatial.jpeg',
    placeholder: '#252018',
  },
  {
    title: 'F&B STORYTELLING',
    description: 'Cinematic beverage visuals shaped through texture, light, and sensory atmosphere.',
    image: '/images/fb-storytelling.jpeg',
    placeholder: '#1e1a17',
  },
] as const

export function OurWorkSection() {
  return (
    <section
      id="our-work"
      aria-label="Our work"
      style={{
        background: '#c4b5a5',
        padding: '5rem 4% 6rem',
        scrollMarginTop: 'var(--height-nav)',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 400,
          lineHeight: 1,
          letterSpacing: '-0.01em',
          color: '#8c7556',
          marginBottom: '3rem',
          textAlign: 'center',
        }}
      >
        Our Work
      </h2>

      <div className="our-work-carousel">
        {WORKS.map((work) => (
          <article
            key={work.title}
            className="our-work-item"
            style={{ background: work.placeholder }}
          >
            <img
              src={work.image}
              alt={work.title}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="our-work-image"
            />

            <div className="our-work-overlay">
              <h3 className="our-work-title">{work.title}</h3>
              <p className="our-work-description">{work.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
