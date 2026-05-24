const HALF_LOGO = '/logo/sub-logo-black.png'

/**
 * Two faint half-logo decorations: top-left and bottom-right.
 * Drop this inside any positioned + overflow:hidden parent.
 * Content that needs to sit above these should be z-index: 1+.
 */
export function HalfLogoWatermarks() {
  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    height: '22vw',
    width: 'auto',
    opacity: 0.08,
    pointerEvents: 'none',
    zIndex: 0,
    userSelect: 'none',
  }

  return (
    <>
      <img
        src={HALF_LOGO}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        style={{ ...baseStyle, top: '-2rem', left: '-3rem' }}
      />
      <img
        src={HALF_LOGO}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        style={{ ...baseStyle, bottom: '-2rem', right: '-3rem' }}
      />
    </>
  )
}
