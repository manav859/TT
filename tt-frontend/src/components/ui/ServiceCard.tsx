import { Link } from 'react-router-dom'
import { MaskImage } from '@/lib/animations/MaskImage'
import type { ServiceSummary } from '@/types/api'

const GRADIENTS = [
  'linear-gradient(145deg, #d4c9b8 0%, #c5b8a8 40%, #b8aa98 100%)',
  'linear-gradient(150deg, #2a2420 0%, #3d3630 50%, #4a4038 100%)',
  'linear-gradient(140deg, #1a1916 0%, #2e2a26 55%, #3d3630 100%)',
  'linear-gradient(135deg, #e0d8cc 0%, #c8baa8 50%, #b0a090 100%)',
  'linear-gradient(160deg, #c8bba8 0%, #9e8f7e 55%, #8b7d6e 100%)',
]

export function ServiceCard({ service, delay = 0 }: { service: ServiceSummary; delay?: number }) {
  const gradient = GRADIENTS[service.id % GRADIENTS.length]

  return (
    <Link
      to={`/services/${service.slug}`}
      className="group block"
      aria-label={`View service: ${service.title}`}
    >
      <MaskImage delay={delay}>
        {/*
          Services use 500×800 poster covers (5:8 ratio) that contain
          embedded typography — show full poster, no overlay text.
        */}
        <div className="relative overflow-hidden w-full aspect-5/8">
          {service.image?.url ? (
            <img
              src={service.image.url}
              alt={service.image.alt || service.title}
              loading="lazy"
              decoding="async"
              {...(service.image.width  ? { width:  service.image.width  } : {})}
              {...(service.image.height ? { height: service.image.height } : {})}
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0" style={{ background: gradient }} aria-hidden="true" />
          )}
        </div>
      </MaskImage>

      <div className="mt-4 space-y-1.5">
        <h3 className="tt-label text-tt-ink group-hover:opacity-60 transition-opacity duration-200">
          {service.title}
        </h3>
        {service.short_desc && (
          <p className="tt-body text-[0.9rem] leading-relaxed line-clamp-2">
            {service.short_desc}
          </p>
        )}
      </div>
    </Link>
  )
}
