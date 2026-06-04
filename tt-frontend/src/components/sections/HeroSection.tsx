import type { HomeData } from '@/types/api'
import { ImageParticles } from './ImageParticles'

const HERO_LOGO = '/logo/logo- black-01 (1).png'
const HERO_IMAGE = '/images/Tusk tales (79).jpg.webp'

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
