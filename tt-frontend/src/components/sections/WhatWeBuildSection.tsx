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
  return (
    <section
      aria-label="What we build"
      style={{
        background: '#f5f0e8',
        padding: '8rem 5%',
      }}
    >
      <div style={{ maxWidth: '92rem', margin: '0 auto', width: '100%' }}>
        {/* Heading block */}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '-0.01em',
            color: '#1a1a1a',
            textAlign: 'center',
            margin: 0,
          }}
        >
          What We Build
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '16px',
            lineHeight: 1.8,
            color: '#6b5e52',
            maxWidth: '580px',
            margin: '1.25rem auto 0',
            textAlign: 'center',
          }}
        >
          Campaign-led visuals designed to shape perception, create emotional recall, and give brands a distinct visual identity.
        </p>

        {/* 3-column grid */}
        <div className="what-we-build-grid">
          {SERVICES.map((service) => (
            <div key={service.title}>
              <div style={{ aspectRatio: '3 / 4', width: '100%', background: '#c4b5a5' }}>
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
                  fontSize: '11px',
                  fontWeight: 400,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#1a1a1a',
                  margin: '1.5rem 0 0',
                }}
              >
                {service.title}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '14px',
                  lineHeight: 1.75,
                  color: '#7a6a5a',
                  margin: '0.75rem 0 0',
                }}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
