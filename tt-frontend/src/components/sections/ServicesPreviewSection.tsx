import { Link } from 'react-router-dom'
import { MaskImage } from '@/lib/animations/MaskImage'
import { RevealText } from '@/lib/animations/RevealText'
import { StaggerGrid, StaggerItem } from '@/lib/animations/StaggerGrid'
import type { HomeData } from '@/types/api'
import { ArrowRight } from 'lucide-react'

const GRADIENTS = [
  'linear-gradient(145deg, #d4c9b8 0%, #c5b8a8 40%, #b8aa98 100%)',
  'linear-gradient(150deg, #2a2420 0%, #3d3630 50%, #4a4038 100%)',
  'linear-gradient(135deg, #e0d8cc 0%, #c8baa8 50%, #b0a090 100%)',
  'linear-gradient(160deg, #1a1916 0%, #2e2a26 55%, #3d3630 100%)',
  'linear-gradient(145deg, #c8bba8 0%, #9e8f7e 55%, #8b7d6e 100%)',
]

export function ServicesPreviewSection({ section }: { section: HomeData['services_preview'] }) {
  return (
    <section className="tt-screen-section" aria-label="Services preview">
      <div className="tt-wide">
        <div className="mb-12 tt-rule" />

        {/* Header */}
        <div className="mb-6 flex flex-col gap-5 md:mb-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-tt-accent" />
              <p className="tt-caption text-tt-accent-dark">02 / Services</p>
            </div>
            <RevealText as="h2" className="tt-heading-xl text-tt-ink">
              {section.heading}
            </RevealText>
          </div>
          <Link to="/services" className="tt-link hidden sm:inline-flex" aria-label="View all services">
            {section.link_label} <ArrowRight size={11} strokeWidth={2} />
          </Link>
        </div>

        {/*
          5 portrait poster cards in a responsive grid.
          Images are 500×800 covers with embedded text — no overlay, no duplicate headings.
          Desktop: 5 columns · Tablet: 3 columns · Mobile: 2 columns
        */}
        <StaggerGrid
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          staggerDelay={0.07}
        >
          {section.items.map((service, i) => (
            <StaggerItem key={service.slug}>
              <Link
                to={`/services/${service.slug}`}
                className="group block"
                aria-label={service.title}
              >
                <MaskImage delay={0.06 * i}>
                  <div className="relative overflow-hidden w-full aspect-5/8">
                    {service.image?.url ? (
                      <img
                        src={service.image.url}
                        alt={service.image.alt || service.title}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div
                        className="absolute inset-0"
                        style={{ background: GRADIENTS[i % GRADIENTS.length] }}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </MaskImage>
                <div className="mt-4 space-y-1.5">
                  <p className="tt-label text-tt-ink group-hover:opacity-60 transition-opacity duration-200">
                    {service.title}
                  </p>
                  {service.short_desc && (
                    <p className="tt-body text-[0.9rem] leading-relaxed line-clamp-2">
                      {service.short_desc}
                    </p>
                  )}
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGrid>

        <div className="mt-10 sm:hidden">
          <Link to="/services" className="tt-link">
            {section.link_label} <ArrowRight size={11} strokeWidth={2} />
          </Link>
        </div>

      </div>
    </section>
  )
}
