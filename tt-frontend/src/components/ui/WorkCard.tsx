import { Link } from 'react-router-dom'
import { MaskImage } from '@/lib/animations/MaskImage'
import type { WorkSummary } from '@/types/api'
import clsx from 'clsx'

type Ratio = '3/4' | '4/3' | '1/1'

const layoutRatio: Record<string, Ratio> = {
  portrait:  '3/4',
  landscape: '4/3',
  editorial: '1/1',
}

/* Warm editorial gradients — rotate per work id */
const GRADIENTS = [
  'linear-gradient(145deg, #d4c9b8 0%, #c5b8a8 40%, #b8aa98 100%)',
  'linear-gradient(160deg, #c8bba8 0%, #9e8f7e 55%, #8b7d6e 100%)',
  'linear-gradient(135deg, #e0d8cc 0%, #c8baa8 50%, #b0a090 100%)',
  'linear-gradient(150deg, #2a2420 0%, #3d3630 50%, #4a4038 100%)',
  'linear-gradient(140deg, #1a1916 0%, #2e2a26 55%, #3d3630 100%)',
]

const RATIO_CLASSES: Record<Ratio, string> = {
  '3/4': 'aspect-3/4',
  '4/3': 'aspect-4/3',
  '1/1': 'aspect-square',
}

export function WorkCard({ work, delay = 0 }: { work: WorkSummary; delay?: number }) {
  const ratio     = layoutRatio[work.layout ?? 'portrait']
  const gradient  = GRADIENTS[work.id % GRADIENTS.length]
  const ratioClass = RATIO_CLASSES[ratio]

  return (
    <Link
      to={`/works/${work.slug}`}
      className="group block"
      aria-label={`View work: ${work.title}`}
    >
      <MaskImage delay={delay}>
        {/* Clipping container — overflow-hidden clips the zoomed image */}
        <div className={clsx('relative overflow-hidden w-full', ratioClass)}>
          {work.featured_image?.url ? (
            <img
              src={work.featured_image.url}
              alt={work.featured_image.alt || work.title}
              loading="lazy"
              decoding="async"
              {...(work.featured_image.width  ? { width:  work.featured_image.width  } : {})}
              {...(work.featured_image.height ? { height: work.featured_image.height } : {})}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
            />
          ) : (
            <>
              <div className="absolute inset-0" style={{ background: gradient }} aria-hidden="true" />
              <div
                className="absolute inset-0 mix-blend-overlay opacity-[0.05]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  backgroundSize: '160px 160px',
                }}
              />
            </>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-tt-ink/0 group-hover:bg-tt-ink/10 pointer-events-none transition-colors duration-300" />
        </div>
      </MaskImage>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="tt-label text-tt-ink group-hover:opacity-60 transition-opacity duration-200">
            {work.title}
          </p>
          {work.caption && <p className="tt-body mt-1 text-[0.9rem] leading-relaxed">{work.caption}</p>}
        </div>
        <div className="text-right shrink-0 space-y-0.5">
          {work.category && <p className="tt-caption">{work.category}</p>}
          {work.year     && <p className="tt-caption">{work.year}</p>}
        </div>
      </div>
    </Link>
  )
}
