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
  const items = section.items.slice(0, 4)

  return (
    <section
      className="w-full tt-screen-section"
      style={{ backgroundColor: 'var(--color-tt-off-white-strong)' }}
      aria-label="Selected works"
    >
      <div className="tt-wide">
        <div className="mb-12 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-tt-accent" />
              <p className="tt-caption text-tt-accent-dark">01 / Works</p>
            </div>
            <RevealText as="h2" className="tt-heading-xl text-tt-ink">
              {section.heading}
            </RevealText>
          </div>
          <Link to="/works" className="tt-link hidden sm:inline-flex text-tt-ink border-tt-ink shrink-0" aria-label="View all works">
            {section.link_label}
            <ArrowRight size={11} strokeWidth={2} />
          </Link>
        </div>

        <StaggerGrid className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4" staggerDelay={0.1}>
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
                <div className="mt-4 space-y-1.5">
                  <div className="min-h-[2.8rem]">
                    <p className="tt-label leading-[1.45] text-tt-ink transition-opacity duration-200 group-hover:opacity-60">
                      {work.title}
                    </p>
                  </div>
                  {work.category && <p className="tt-caption text-tt-ink/[0.55]">{work.category}</p>}
                  {work.caption && <p className="tt-body text-[0.9rem] leading-relaxed">{work.caption}</p>}
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
