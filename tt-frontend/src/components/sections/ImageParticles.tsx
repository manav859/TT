import { useEffect, useRef, useState } from 'react'

const COUNT = 70
const GLOW_SIZE = 14 /* sprite half-extent in px — bigger = softer aura */

/**
 * Drifting firefly field — warm amber glow sprites with per-particle
 * pulse. Sits absolutely-positioned over its parent (which must be
 * position: relative). Skipped entirely under prefers-reduced-motion.
 */
export function ImageParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mql.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.max(1, window.devicePixelRatio || 1)
    let width = 0
    let height = 0

    function sizeCanvas() {
      if (!canvas || !ctx) return
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    sizeCanvas()

    /* Pre-render the firefly glow sprite once. Drawing a radial gradient
       per particle per frame is far slower than drawImage from a cached
       canvas. */
    const sprite = document.createElement('canvas')
    sprite.width = GLOW_SIZE * 2
    sprite.height = GLOW_SIZE * 2
    const sctx = sprite.getContext('2d')!
    const grad = sctx.createRadialGradient(GLOW_SIZE, GLOW_SIZE, 0, GLOW_SIZE, GLOW_SIZE, GLOW_SIZE)
    grad.addColorStop(0.00, 'rgba(255, 255, 255, 0.95)') /* clean white core */
    grad.addColorStop(0.22, 'rgba(255, 248, 230, 0.55)') /* soft cream */
    grad.addColorStop(0.55, 'rgba(255, 225, 170, 0.12)') /* faint warm halo */
    grad.addColorStop(1.00, 'rgba(255, 210, 140, 0)')    /* fades to nothing */
    sctx.fillStyle = grad
    sctx.fillRect(0, 0, GLOW_SIZE * 2, GLOW_SIZE * 2)

    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.16,
      offset: Math.random() * Math.PI * 2,    /* horizontal sway phase */
      pulse: Math.random() * Math.PI * 2,     /* brightness pulse phase */
      pulseSpeed: 0.012 + Math.random() * 0.018, /* slow, gentle breathing */
      scale: 0.6 + Math.random() * 0.5,       /* size variation */
    }))

    let frame = 0
    let rafId = 0
    let stopped = false

    function tick() {
      if (stopped || !ctx) return
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        p.x += p.vx + Math.sin(frame * 0.01 + p.offset) * 0.2
        p.y += p.vy

        if (p.x < 0) p.x = width
        else if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        else if (p.y > height) p.y = 0

        /* Gentle breathing brightness — stays mostly in the mid range,
           never goes fully dark or fully bright. */
        const raw = 0.5 + 0.5 * Math.sin(frame * p.pulseSpeed + p.pulse)
        ctx.globalAlpha = 0.45 + raw * 0.4

        const half = GLOW_SIZE * p.scale
        ctx.drawImage(sprite, p.x - half, p.y - half, half * 2, half * 2)
      }

      ctx.globalAlpha = 1

      frame++
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    const onResize = () => {
      const prevW = width
      const prevH = height
      sizeCanvas()
      if (prevH === 0 && height > 0) {
        for (const p of particles) {
          p.x = Math.random() * width
          p.y = Math.random() * height
        }
      } else if (prevW > 0 && prevH > 0 && (prevW !== width || prevH !== height)) {
        for (const p of particles) {
          p.x = (p.x / prevW) * width
          p.y = (p.y / prevH) * height
        }
      }
    }
    window.addEventListener('resize', onResize)

    const ro = new ResizeObserver(onResize)
    ro.observe(canvas)

    return () => {
      stopped = true
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      ro.disconnect()
    }
  }, [reduced])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  )
}
