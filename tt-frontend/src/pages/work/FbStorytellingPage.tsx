import { WorkPageLayout } from '@/components/layout/WorkPageLayout'

const LIGHT_SHADOW_PRODUCT_IMAGE = '/images/tusk-tales-4.jpg'
const VISUAL_FLAVOR_IMAGE        = '/images/5.png'
const CINEMATIC_IMAGE            = '/images/fb-storytelling.jpeg'

const headingStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: 'clamp(1.4rem, 1.9vw, 1.85rem)',
  fontWeight: 400,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: '#2a201a',
  margin: 0,
}

const subtitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '13px',
  letterSpacing: '0.05em',
  color: '#7a6a5a',
  margin: '0.5rem 0 0',
}

const bodyStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: '17px',
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

export function FbStorytellingPage() {
  return (
    <WorkPageLayout background="#C4B5A5">
      {/* Page title — centered, dark, tracked */}
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
        F&amp;B Storytelling
      </h1>

      {/* ── Section 1 — LIGHT, SHADOW & PRODUCT ──────── */}
      <section
        className="work-split"
        style={{ marginTop: '4rem', padding: '0 6%' }}
        aria-labelledby="fb-light"
      >
        <div>
          <h2 id="fb-light" style={headingStyle}>Light, shadow &amp; product</h2>
          <p style={subtitleStyle}>
            A product frame built through shadow, depth, and atmosphere.
          </p>
          <div style={bodyBlockStyle}>
            <p style={bodyStyle}>
              The dark spatial tones, reflective surfaces, and controlled
              lighting create a composition that feels immersive rather than
              commercial. The intention was to make the product feel
              discovered, not displayed.
            </p>
          </div>
        </div>

        <img
          src={LIGHT_SHADOW_PRODUCT_IMAGE}
          alt="Light, shadow and product"
          loading="lazy"
          decoding="async"
          style={mediaStyle}
        />
      </section>

      {/* ── Section 2 — VISUAL FLAVOR ────────────────── */}
      <section
        className="work-split"
        style={{ marginTop: '6rem', padding: '0 6%' }}
        aria-labelledby="fb-flavor"
      >
        <img
          src={VISUAL_FLAVOR_IMAGE}
          alt="Visual flavor"
          loading="lazy"
          decoding="async"
          style={mediaStyle}
        />

        <div>
          <h2 id="fb-flavor" style={headingStyle}>Visual flavor</h2>
          <p style={subtitleStyle}>
            A composition designed to feel warm, grounded, and sensory.
          </p>
          <div style={bodyBlockStyle}>
            <p style={bodyStyle}>
              The visual explores how color, placement, and texture can shape
              the way a dining experience is remembered.
            </p>
            <p style={bodyStyle}>
              Every frame was built to create perception before promotion.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 3 — DESIGNED TO FEEL CINEMATIC ──── */}
      <section
        className="work-split"
        style={{ marginTop: '6rem', padding: '0 6% 8rem' }}
        aria-labelledby="fb-cinematic"
      >
        <div>
          <h2 id="fb-cinematic" style={headingStyle}>Designed to feel cinematic</h2>
          <p style={subtitleStyle}>
            An editorial beverage frame shaped through light and restraint.
          </p>
          <div style={bodyBlockStyle}>
            <p style={bodyStyle}>
              The composition avoids excess and instead focuses on precision,
              atmosphere, and controlled detail to create a premium visual
              language.
            </p>
            <p style={bodyStyle}>
              The result feels minimal, immersive, and intentionally crafted
              for perception rather than direct promotion.
            </p>
          </div>
        </div>

        <img
          src={CINEMATIC_IMAGE}
          alt="Designed to feel cinematic"
          loading="lazy"
          decoding="async"
          style={mediaStyle}
        />
      </section>
    </WorkPageLayout>
  )
}
