import { useEffect, useRef } from 'react'

const WORKS = [
  {
    label: 'Editorial',
    title: 'Fashion Campaign',
    description: 'Editorial campaign visuals built around emotion, movement, and premium perception.',
    image: '/portfolio/works/anaya.jpg',
  },
  {
    label: 'Atmospheric',
    title: 'Lifestyle & Spatial',
    description: 'Visual narratives connecting interiors, atmosphere, and brand perception.',
    image: '/portfolio/works/heritage-objects.jpg',
  },
  {
    label: 'Cinematic',
    title: 'F&B Storytelling',
    description: 'Cinematic beverage visuals shaped through texture, light, and sensory atmosphere.',
    image: '/portfolio/works/the-splash.jpg',
  },
  {
    label: 'Object',
    title: 'Product Story',
    description: 'Quiet object photography built around craft, material, and stillness.',
    image: '/portfolio/works/still.jpg',
  },
] as const

/** Mouse-drag horizontal scrolling on desktop. Native touch scroll works as-is. */
function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let isDown = false
    let startX = 0
    let scrollStart = 0
    let moved = false

    const onDown = (e: MouseEvent) => {
      isDown = true
      moved = false
      startX = e.pageX - el.offsetLeft
      scrollStart = el.scrollLeft
      el.style.cursor = 'grabbing'
      el.style.userSelect = 'none'
    }
    const onUp = () => {
      isDown = false
      el.style.cursor = 'grab'
      el.style.userSelect = ''
    }
    const onMove = (e: MouseEvent) => {
      if (!isDown) return
      const x = e.pageX - el.offsetLeft
      const walk = (x - startX) * 1.2
      if (Math.abs(walk) > 4) moved = true
      el.scrollLeft = scrollStart - walk
    }
    /* Suppress click after a drag so item hovers/clicks don't misfire. */
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    el.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('mousemove', onMove)
    el.addEventListener('click', onClick, true)

    return () => {
      el.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('mousemove', onMove)
      el.removeEventListener('click', onClick, true)
    }
  }, [])

  return ref
}

export function OurWorkSection() {
  const trackRef = useDragScroll()

  return (
    <section
      aria-label="Our work"
      style={{
        background: '#1a1a1a',
        height: '100vh',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '5rem',
      }}
    >
      <header style={{ padding: '0 5%', marginBottom: '3rem' }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 5vw, 5rem)',
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '-0.01em',
            color: '#f5f0e8',
          }}
        >
          Our Work
        </h2>
      </header>

      <div
        ref={trackRef}
        className="our-work-track"
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '0',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          cursor: 'grab',
          flex: '0 0 auto',
          padding: '0 5%',
        }}
      >
        {WORKS.map((work) => (
          <article key={work.title} className="our-work-item">
            <img
              src={work.image}
              alt={work.title}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="our-work-image"
            />

            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, transparent 55%, rgba(0, 0, 0, 0.75) 100%)',
                pointerEvents: 'none',
              }}
            />

            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                padding: '2rem',
                color: '#ffffff',
                pointerEvents: 'none',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '0.5rem',
                }}
              >
                {work.label}
              </p>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.8rem',
                  fontWeight: 400,
                  lineHeight: 1.1,
                  color: '#ffffff',
                  margin: 0,
                }}
              >
                {work.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: 'rgba(255, 255, 255, 0.78)',
                  marginTop: '0.75rem',
                  maxWidth: '34rem',
                }}
              >
                {work.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
