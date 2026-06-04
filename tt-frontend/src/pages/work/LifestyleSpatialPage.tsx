import { WorkPageLayout } from '@/components/layout/WorkPageLayout'
import SmoothImage from '@/components/SmoothImage'

const PURPOSE_IN_SPACE_IMAGE = '/images/Tusk tales (21).jpg.webp'
const LIGHT_PERCEPTION_IMAGE = '/images/lifestyle-spatial.webp'
const SPATIAL_NARRATIVE_IMAGE = '/images/Tusk tales (15).jpg.webp'

const headingStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: 'clamp(1.4rem, 1.9vw, 1.85rem)',
  fontWeight: 400,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: '#8a7a6a',
  margin: 0,
}

const subtitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '13px',
  letterSpacing: '0.05em',
  color: '#a89888',
  margin: '0.5rem 0 0',
}

const bodyStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: '17px',
  lineHeight: 1.85,
  color: '#6b5e52',
  textAlign: 'justify',
  margin: 0,
}

const bodyBlockStyle: React.CSSProperties = {
  marginTop: '1.75rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
}

const mediaStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  height: 'auto',
  aspectRatio: '3 / 4',
  objectFit: 'cover',
  background: '#e5ddd0',
}

export function LifestyleSpatialPage() {
  return (
    <WorkPageLayout background="#ffffff">
      {/* Page title — left-aligned, large, muted taupe */}
      <h1
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          fontWeight: 400,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#b8a898',
          textAlign: 'center',
          padding: '1rem 6% 0',
          margin: 0,
        }}
      >
        Lifestyle &amp; Spatial Identity
      </h1>

      {/* ── Section 1 — PURPOSE IN SPACE ─────────────── */}
      <section
        className="work-split"
        style={{ marginTop: '4rem', padding: '0 6%' }}
        aria-labelledby="ls-purpose"
      >
        <div className="work-split-copy">
          <h2 id="ls-purpose" style={headingStyle}>Brand in motion</h2>
          <p style={subtitleStyle}>
            A visual study of space, movement, and atmosphere.
          </p>
          <div style={bodyBlockStyle}>
            <p style={bodyStyle}>
              The image was composed to show the café not as a static interior,
              but as a working brand environment alive with people, light, and
              service.
            </p>
            <p style={bodyStyle}>
              The blurred movement adds energy, while the structured counter,
              warm tones, and greenery create a sense of comfort, identity, and
              recall.
            </p>
          </div>
        </div>

        <SmoothImage
          className="work-split-media"
          src={PURPOSE_IN_SPACE_IMAGE}
          alt="Brand in motion"
          eager
          style={mediaStyle}
        />
      </section>

      {/* ── Section 2 — LIGHT & PERCEPTION ──────────── */}
      <section
        className="work-split"
        style={{ marginTop: '6rem', padding: '0 6%' }}
        aria-labelledby="ls-light"
      >
        <SmoothImage
          className="work-split-media"
          src={LIGHT_PERCEPTION_IMAGE}
          alt="Intimacy in experience"
          style={mediaStyle}
        />

        <div className="work-split-copy">
          <h2 id="ls-light" style={headingStyle}>Intimacy in experience</h2>
          <p style={subtitleStyle}>
            A frame shaped by stillness, comfort, and everyday ritual.
          </p>
          <div style={bodyBlockStyle}>
            <p style={bodyStyle}>
              The frame was composed to express the emotional side of the
              environment, not through architecture alone, but through the way
              the space is lived in. The soft reflections, muted palette, and
              quiet interaction create a sense of calm, making the brand feel
              thoughtful, welcoming, and deeply human.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 3 — SPATIAL NARRATIVE ───────────── */}
      <section
        className="work-split"
        style={{ marginTop: '6rem', padding: '0 6% 8rem' }}
        aria-labelledby="ls-narrative"
      >
        <div className="work-split-copy">
          <h2 id="ls-narrative" style={headingStyle}>The art of preparation</h2>
          <p style={subtitleStyle}>
            Warmth, texture, and process captured in a single frame.
          </p>
          <div style={bodyBlockStyle}>
            <p style={bodyStyle}>
              The image focuses on the making, not just the outcome, where
              steam, light, and material detail come together to express care
              and craftsmanship. The machine's metallic texture, the cup's
              rising warmth, and the close framing turn an everyday coffee
              moment into a brand experience that feels intentional, sensory,
              and memorable.
            </p>
          </div>
        </div>

        <SmoothImage
          className="work-split-media"
          src={SPATIAL_NARRATIVE_IMAGE}
          alt="The art of preparation"
          style={mediaStyle}
        />
      </section>
    </WorkPageLayout>
  )
}
