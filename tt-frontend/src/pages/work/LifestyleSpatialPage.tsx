import { WorkPageLayout } from '@/components/layout/WorkPageLayout'

const PURPOSE_IN_SPACE_IMAGE = '/images/2.jpeg'
const LIGHT_PERCEPTION_IMAGE = '/images/3.jpeg'
const SPATIAL_NARRATIVE_IMAGE = '/images/lifestyle-spatial.jpeg'

/* TODO: compress oversized images — target ≤ 300 KB each (1600px wide, q82):
 *   - /images/3.jpeg                 6.7 MB
 *   - /images/lifestyle-spatial.jpeg 6.3 MB
 *   - /images/2.jpeg                 296 KB (already OK)
 */

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
  aspectRatio: '3 / 4',
  objectFit: 'cover',
}

export function LifestyleSpatialPage() {
  return (
    <WorkPageLayout background="#f5f0e8">
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
          <h2 id="ls-purpose" style={headingStyle}>Purpose in space</h2>
          <p style={subtitleStyle}>
            Light, texture, and space existing in quiet tension.
          </p>
          <div style={bodyBlockStyle}>
            <p style={bodyStyle}>
              The frame was designed to blur the line between environment and
              identity, allowing texture, depth, and mood to shape perception
              naturally.
            </p>
            <p style={bodyStyle}>
              Every visual element contributes to a world that feels
              intentional, immersive, and memorable.
            </p>
          </div>
        </div>

        <img
          className="work-split-media"
          src={PURPOSE_IN_SPACE_IMAGE}
          alt="Purpose in space"
          loading="lazy"
          decoding="async"
          style={mediaStyle}
        />
      </section>

      {/* ── Section 2 — LIGHT & PERCEPTION ──────────── */}
      <section
        className="work-split"
        style={{ marginTop: '6rem', padding: '0 6%' }}
        aria-labelledby="ls-light"
      >
        <img
          className="work-split-media"
          src={LIGHT_PERCEPTION_IMAGE}
          alt="Light and perception"
          loading="lazy"
          decoding="async"
          style={mediaStyle}
        />

        <div className="work-split-copy">
          <h2 id="ls-light" style={headingStyle}>Light &amp; perception</h2>
          <p style={subtitleStyle}>
            Warmth, shadow, and form existing in quiet balance.
          </p>
          <div style={bodyBlockStyle}>
            <p style={bodyStyle}>
              The interplay between light, texture, and gesture creates a
              cinematic stillness that feels immersive and intentional.
            </p>
            <p style={bodyStyle}>
              The composition focuses on how atmosphere can carry memory long
              after the visual disappears.
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
          <h2 id="ls-narrative" style={headingStyle}>Spatial narrative</h2>
          <p style={subtitleStyle}>
            An environment designed to feel immersive rather than decorative.
          </p>
          <div style={bodyBlockStyle}>
            <p style={bodyStyle}>
              The frame relies on layered depth, suspended form, and controlled
              lighting to create an atmosphere that feels emotionally immersive
              rather than staged.
            </p>
            <p style={bodyStyle}>
              The visual language remains minimal, cinematic, and
              perception-led.
            </p>
          </div>
        </div>

        <img
          className="work-split-media"
          src={SPATIAL_NARRATIVE_IMAGE}
          alt="Spatial narrative"
          loading="lazy"
          decoding="async"
          style={mediaStyle}
        />
      </section>
    </WorkPageLayout>
  )
}
