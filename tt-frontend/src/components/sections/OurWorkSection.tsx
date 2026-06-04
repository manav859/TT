import { Link } from 'react-router-dom'
import SmoothImage from '@/components/SmoothImage'

/* TODO: compress these cover JPEGs — target ≤ 300 KB each (1600px wide, q82):
 *   - Cover_fashion.jpeg        924 KB
 *   - lifestyle-spatial.jpeg    1.2 MB
 *   - fb-storytelling.jpeg      1.6 MB
 */
const WORKS = [
  {
    title: 'FASHION CAMPAIGN',
    description: 'Editorial campaign visuals built around emotion, movement, and premium perception.',
    image: '/images/Cover_fashion.jpeg',
    placeholder: '#2a2520',
    to: '/work/fashion-campaign',
  },
  {
    title: 'LIFESTYLE & SPATIAL IDENTITY',
    description: 'Visual narratives connecting interiors, atmosphere, and brand perception.',
    image: '/images/lifestyle-spatial.jpeg',
    placeholder: '#252018',
    to: '/work/lifestyle-spatial',
  },
  {
    title: 'F&B STORYTELLING',
    description: 'Cinematic beverage visuals shaped through texture, light, and sensory atmosphere.',
    image: '/images/fb-storytelling.jpeg',
    placeholder: '#1e1a17',
    to: '/work/fb-storytelling',
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
          <Link
            key={work.title}
            to={work.to}
            className="our-work-item"
            style={{ background: work.placeholder }}
            aria-label={work.title}
          >
            <SmoothImage
              src={work.image}
              alt={work.title}
              draggable={false}
              className="our-work-image"
              /* Keep the CSS hover-zoom transition alongside the fade. */
              style={{ transition: 'opacity 0.6s ease, transform 0.8s ease' }}
            />

            <div className="our-work-overlay">
              <h3 className="our-work-title">{work.title}</h3>
              <p className="our-work-description">{work.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
