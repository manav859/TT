import type { HomeData } from '@/types/api'
import { ImageParticles } from './ImageParticles'

const HERO_LOGO = '/logo/logo- black-01 (1).png'
const HERO_IMAGE = '/images/Tusk tales (79).jpg.jpeg'
/* Hero is 764 KB — within the ≤800 KB above-the-fold budget, but near the
 * ceiling. If swapped, keep it eager + preloaded (see index.html) and re-export
 * as WebP at ~1920px to claw back headroom. */

export function HeroSection({ hero }: { hero: HomeData['hero'] }) {
  return (
    <section className="tt-home-hero" aria-label="Hero">
      <div className="tt-home-hero-brand">
        <img
          src={HERO_LOGO}
          alt="Tusk Tales Purpose in every frame"
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          className="tt-home-hero-logo"
        />
      </div>

      <div className="tt-home-hero-image-wrap">
        <img
          src={HERO_IMAGE}
          alt={hero.image?.alt || 'Tusk Tales hero'}
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          className="tt-home-hero-image"
        />
        <ImageParticles />
      </div>
    </section>
  )
}
