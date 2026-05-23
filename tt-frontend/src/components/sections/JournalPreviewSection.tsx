import { Link } from 'react-router-dom'
import { RevealText } from '@/lib/animations/RevealText'
import { StaggerGrid, StaggerItem } from '@/lib/animations/StaggerGrid'
import { JournalCard } from '@/components/ui/JournalCard'
import type { HomeData } from '@/types/api'
import { ArrowRight } from 'lucide-react'

interface JournalPreviewProps {
  section: HomeData['journal_preview']
}

export function JournalPreviewSection({ section }: JournalPreviewProps) {
  return (
    <section className="tt-screen-section" aria-label="Journal preview">
      <div className="tt-wide">
        <div className="mb-12 tt-rule" />
        <div className="mb-6 flex flex-col gap-5 md:mb-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-tt-accent" />
              <p className="tt-caption text-tt-accent-dark">03 / Journal</p>
            </div>
            <RevealText as="h2" className="tt-heading-xl text-tt-ink">
              {section.heading}
            </RevealText>
          </div>
          <Link to="/journal" className="tt-link hidden sm:inline-flex" aria-label="Read all posts">
            {section.link_label}
            <ArrowRight size={12} strokeWidth={2} />
          </Link>
        </div>

        <StaggerGrid
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          staggerDelay={0.1}
        >
          {section.items.map((post, i) => (
            <StaggerItem key={post.slug}>
              <JournalCard post={post} delay={0.08 * i} />
            </StaggerItem>
          ))}
        </StaggerGrid>

        <div className="mt-8 sm:hidden">
          <Link to="/journal" className="tt-link">
            {section.link_label} <ArrowRight size={12} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  )
}
