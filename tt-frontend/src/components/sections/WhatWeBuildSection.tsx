/* TODO: compress these cover JPGs — each is 6-8 MB, way over the 300 KB
 * target for a 1600px-wide hero card. Re-export at quality 82 in any image
 * editor (or run through TinyPNG / squoosh.app):
 *   - Cover_CAMPAIGN SHOOTS.jpg.jpeg     6.4 MB
 *   - Cover_CREATIVE DIRECTION.JPG.jpeg  8.3 MB
 *   - Cover_BRAND STORYTELLING.jpg.jpeg  6.6 MB
 */
const SERVICES = [
  {
    title: 'Campaign Shoots',
    description: 'Editorial campaigns shaped through mood and storytelling.',
    image: '/images/Cover_CAMPAIGN%20SHOOTS.jpg.jpeg',
  },
  {
    title: 'Creative Direction',
    description: 'Visual language, styling, and narrative thinking.',
    image: '/images/Cover_CREATIVE%20DIRECTION.JPG.jpeg',
  },
  {
    title: 'Brand Storytelling',
    description: 'Atmospheric visuals designed for recognition and recall.',
    image: '/images/Cover_BRAND%20STORYTELLING.jpg.jpeg',
  },
] as const

const KHAKI = '#8c7556'

export function WhatWeBuildSection() {
  return (
    <section
      id="what-we-build"
      aria-label="What we build"
      style={{
        background: '#ffffff',
        padding: '8rem 5%',
        scrollMarginTop: 'var(--height-nav)',
      }}
    >
      <div style={{ maxWidth: '92rem', margin: '0 auto', width: '100%' }}>
        {/* Heading block */}
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '-0.01em',
            color: KHAKI,
            textAlign: 'center',
            margin: 0,
          }}
        >
          What We Build
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '16px',
            lineHeight: 1.8,
            color: KHAKI,
            margin: '1.25rem 0 0',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          Campaign-led visuals designed to shape perception, create emotional recall, and give brands a distinct visual identity.
        </p>

        {/* 3-column grid */}
        <div className="what-we-build-grid">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              style={{
                textAlign: 'left',
                containerType: 'inline-size',
                minWidth: 0,
              }}
            >
              <div
                style={{
                  aspectRatio: '3 / 4',
                  width: '100%',
                  background: '#ece4d6',
                  overflow: 'hidden',
                }}
              >
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
                  fontFamily: 'var(--font-serif)',
                  /* cqi = % of column width, so title scales with image.
                     Tuned so the longest 18-char title fits inside the
                     column on one line at typical viewports; wraps
                     gracefully on narrow screens. */
                  fontSize: 'clamp(1.1rem, 5.2cqi, 1.85rem)',
                  fontWeight: 400,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: KHAKI,
                  margin: '1.5rem 0 0',
                }}
              >
                {service.title}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  lineHeight: 1.65,
                  color: KHAKI,
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
