import { Link } from 'react-router-dom'

interface WorkPageLayoutProps {
  children: React.ReactNode
  /** Where the back link points. Defaults to the Our Work section on home. */
  back?: string
  /** Override page bg if needed. */
  background?: string
}

const HALF_LOGO = '/logo/sub-logo-black.png'

/**
 * Shared shell for /work/* detail pages.
 * - Warm off-white bg
 * - Two faint half-logo watermarks: top-left and bottom-right
 * - Back link below the navbar
 * - Content slot at z-index: 1
 */
export function WorkPageLayout({
  children,
  back = '/#our-work',
  background = '#f5f0e8',
}: WorkPageLayoutProps) {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        background,
        overflow: 'hidden',
      }}
    >
      {/* Top-left half logo (clipped by parent overflow:hidden) */}
      <img
        src={HALF_LOGO}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-2rem',
          left: '-3rem',
          height: '22vw',
          width: 'auto',
          opacity: 0.08,
          pointerEvents: 'none',
          zIndex: 0,
          userSelect: 'none',
        }}
      />

      {/* Bottom-right half logo */}
      <img
        src={HALF_LOGO}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-2rem',
          right: '-3rem',
          height: '22vw',
          width: 'auto',
          opacity: 0.08,
          pointerEvents: 'none',
          zIndex: 0,
          userSelect: 'none',
        }}
      />

      {/* Page content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1.25rem, 5%, 3rem) clamp(3rem, 6vw, 5rem)',
        }}
      >
        <Link
          to={back}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '12px',
            fontWeight: 400,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#888',
            transition: 'color 200ms ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#1a1a1a')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#888')}
        >
          <span aria-hidden="true" style={{ fontSize: '14px', lineHeight: 1 }}>←</span>
          Back
        </Link>

        <div style={{ marginTop: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
          {children}
        </div>
      </div>
    </div>
  )
}
