import { WorkPageLayout } from '@/components/layout/WorkPageLayout'

const STILL_VIDEO = '/images/IMG_0122%20-%20Trim.mp4'
const SHAPED_BY_LIGHT_IMAGE = '/images/Cover_fashion.jpeg'
const DUAL_PERSPECTIVE_IMAGE = '/images/DSC09941.jpg'

const headingStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: 'clamp(1.5rem, 2vw, 1.95rem)',
  fontWeight: 400,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: '#2a201a',
  margin: 0,
}

const subtitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '13px',
  letterSpacing: '0.06em',
  color: '#7a6a5a',
  margin: '0.5rem 0 0',
}

const bodyStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: '18px',
  lineHeight: 1.85,
  color: '#2a201a',
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
          color: '#2a201a',
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
        <div>
          <h2 id="fc-still" style={headingStyle}>Still</h2>
          <p style={subtitleStyle}>
            Model locked centre, everything else motion-blurred
          </p>
          <div style={bodyBlockStyle}>
            <p style={bodyStyle}>
              A slow-shutter concept where the world blurs and the brand holds
              steady. Built on a single idea: in a crowded market, Barekee
              stands clear.
            </p>
          </div>
        </div>

        <video
          src={STILL_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          /* Click to toggle audio. Browsers block autoplay with sound, so
             starts muted; user opts in by clicking. */
          onClick={(e) => {
            const v = e.currentTarget
            v.muted = !v.muted
          }}
          title="Click to toggle audio"
          style={{
            ...mediaStyle,
            cursor: 'pointer',
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
          src={SHAPED_BY_LIGHT_IMAGE}
          alt="Shaped by light"
          loading="lazy"
          decoding="async"
          style={mediaStyle}
        />

        <div>
          <h2 id="fc-light" style={headingStyle}>Shaped by light</h2>
          <p style={subtitleStyle}>
            Built around stillness, silhouette, and spatial tension.
          </p>
          <div style={bodyBlockStyle}>
            <p style={bodyStyle}>
              The visual language relies on softness, shadow, and spatial
              storytelling to create emotional depth within the frame.
            </p>
            <p style={bodyStyle}>
              Rather than forcing attention, the campaign allows the viewer to
              discover mood, texture, and presence naturally.
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
        <div>
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
