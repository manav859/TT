import { Link } from 'react-router-dom'
import { MaskImage } from '@/lib/animations/MaskImage'
import { RevealText } from '@/lib/animations/RevealText'
import { StaggerGrid, StaggerItem } from '@/lib/animations/StaggerGrid'
import type { HomeData } from '@/types/api'
import { ArrowRight } from 'lucide-react'

const PLACEHOLDERS = [
  'linear-gradient(145deg, #d4c9b8 0%, #c5b8a8 40%, #b8aa98 100%)',
  'linear-gradient(160deg, #c8bba8 0%, #9e8f7e 55%, #8b7d6e 100%)',
  'linear-gradient(135deg, #e0d8cc 0%, #c8baa8 50%, #b0a090 100%)',
]

export function SelectedWorksSection({ section }: { section: HomeData['selected_works'] }) {
  const items = section.items.slice(0, 3)

  return (
    <section
      className="w-full tt-section"
      style={{ backgroundColor: 'var(--color-tt-taupe)' }}
      aria-label="Selected works"
    >
      <div className="tt-wide">
        <div className="flex items-end justify-between mb-12">
          <RevealText as="h2" className="tt-heading-xl tt-serif text-tt-ink">
            {section.heading}
          </RevealText>
          <Link to="/works" className="tt-link hidden sm:inline-flex text-tt-ink border-tt-ink shrink-0" aria-label="View all works">
            {section.link_label}
            <ArrowRight size={11} strokeWidth={2} />
          </Link>
        </div>

        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5" staggerDelay={0.1}>
          {items.map((work, i) => (
            <StaggerItem key={work.slug}>
              <Link to={`/works/${work.slug}`} className="group block" aria-label={work.title}>
                <MaskImage delay={0.08 * i}>
                  <div className="relative overflow-hidden w-full aspect-3/4">
                    {work.featured_image?.url ? (
                      <img
                        src={work.featured_image.url}
                        alt={work.featured_image.alt || work.title}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                      />
                    ) : (
                      <div className="absolute inset-0" style={{ background: PLACEHOLDERS[i % PLACEHOLDERS.length] }} />
                    )}
                  </div>
                </MaskImage>
                <div className="mt-3 flex items-center justify-between">
                  <p className="tt-label text-tt-ink group-hover:opacity-60 transition-opacity duration-200">
                    {work.title}
                  </p>
                  {work.caption && <p className="tt-caption text-tt-ink/60">{work.caption}</p>}
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGrid>

        <div className="mt-10 sm:hidden">
          <Link to="/works" className="tt-link text-tt-ink border-tt-ink">
            {section.link_label} <ArrowRight size={11} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  )
}
