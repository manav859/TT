import { WorkPageLayout } from '@/components/layout/WorkPageLayout'

const STILL_IMAGE = '/images/Cover_fashion.jpeg'
const SHAPED_BY_LIGHT_IMAGE = '/images/DSC00056.jpg.jpeg'
const DUAL_PERSPECTIVE_IMAGE = '/images/DSC09941.jpg'

/* TODO: compress these oversized assets — current sizes are extreme.
 * Recommended max sizes (preserve visual quality):
 *   - /images/IMG_0122 - Trim.mp4   27 MB → target  ≤ 5 MB (HandBrake H.264 web-optimized)
 *   - /images/Cover_fashion.jpeg   1.1 MB → target ≤ 300 KB (export at 1600px wide, quality 80)
 *   - /images/DSC09941.jpg         2.9 MB → target ≤ 300 KB
 */

const headingStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: 'clamp(1.5rem, 2vw, 1.95rem)',
  fontWeight: 400,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: '#ffffff',
  margin: 0,
}

const subtitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '13px',
  letterSpacing: '0.06em',
  color: '#ffffff',
  margin: '0.5rem 0 0',
}

const bodyStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: '18px',
  lineHeight: 1.85,
  color: '#ffffff',
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

export function FashionCampaignPage() {
  return (
    <WorkPageLayout background="#C4B5A5">
      {/* Page title */}
      <h1
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 400,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#ffffff',
          textAlign: 'center',
          paddingTop: '1rem',
          margin: 0,
        }}
      >
        Fashion Campaign
      </h1>

      {/* ── Section 1 — STILL ───────────────────────── */}
      <section
        className="work-split"
        style={{ marginTop: '4rem', padding: '0 6%' }}
        aria-labelledby="fc-still"
      >
        <div className="work-split-copy">
          <h2 id="fc-still" style={headingStyle}>Cinematic femininity</h2>
          <p style={subtitleStyle}>
            Where fabric, light, and mood form a striking visual language.
          </p>
          <div style={bodyBlockStyle}>
            <p style={bodyStyle}>
              The frame explores fashion through atmosphere rather than
              expression alone, using darkness, selective light, and fluid drape
              to create a moment that feels intimate and elevated.
            </p>
            <p style={bodyStyle}>
              From the multicoloured sari and tassel detailing to the warm glow
              of the background, every element contributes to a campaign that
              feels graceful, refined, and visually distinct.
            </p>
          </div>
        </div>

        <img
          className="work-split-media"
          src={STILL_IMAGE}
          alt="Fashion campaign still"
          loading="eager"
          decoding="async"
          style={{
            ...mediaStyle,
            backgroundColor: '#1a1a1a',
          }}
        />
      </section>

      {/* ── Section 2 — SHAPED BY LIGHT ──────────────── */}
      <section
        className="work-split"
        style={{ marginTop: '6rem', padding: '0 6%' }}
        aria-labelledby="fc-light"
      >
        <img
          className="work-split-media"
          src={SHAPED_BY_LIGHT_IMAGE}
          alt="Modern heritage"
          loading="lazy"
          decoding="async"
          style={mediaStyle}
        />

        <div className="work-split-copy">
          <h2 id="fc-light" style={headingStyle}>Modern heritage</h2>
          <p style={subtitleStyle}>
            A study of silhouette, reflection, and contemporary identity.
          </p>
          <div style={bodyBlockStyle}>
            <p style={bodyStyle}>
              The image explores the relationship between fashion and
              environment, placing contemporary styling within an organic
              landscape to create a sense of balance, presence, and
              individuality.
            </p>
            <p style={bodyStyle}>
              From the relaxed posture and tonal restraint to the interplay of
              reflection and greenery, every element contributes to a campaign
              that feels refined, expressive, and visually strong.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 3 — DUAL PERSPECTIVE ────────────── */}
      <section
        className="work-split"
        style={{ marginTop: '6rem', padding: '0 6% 8rem' }}
        aria-labelledby="fc-dual"
      >
        <div className="work-split-copy">
          <h2 id="fc-dual" style={headingStyle}>Dual perspective</h2>
          <p style={subtitleStyle}>
            Stillness and movement existing within the same atmosphere.
          </p>
          <div style={bodyBlockStyle}>
            <p style={bodyStyle}>
              The campaign focuses on how the environment and styling together
              shape emotional perception within a frame.
            </p>
            <p style={bodyStyle}>
              The result is imagery designed not only to present fashion, but
              to create lasting visual memory.
            </p>
          </div>
        </div>

        <img
          className="work-split-media"
          src={DUAL_PERSPECTIVE_IMAGE}
          alt="Dual perspective"
          loading="lazy"
          decoding="async"
          style={mediaStyle}
        />
      </section>
    </WorkPageLayout>
  )
}
