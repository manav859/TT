import { Link } from 'react-router-dom'
import { MaskImage } from '@/lib/animations/MaskImage'
import type { JournalSummary } from '@/types/api'

const GRADIENTS = [
  'linear-gradient(145deg, #d4c9b8 0%, #c5b8a8 40%, #b8aa98 100%)',
  'linear-gradient(135deg, #e0d8cc 0%, #c8baa8 50%, #b0a090 100%)',
  'linear-gradient(160deg, #c8bba8 0%, #9e8f7e 55%, #8b7d6e 100%)',
]

function formatDate(d?: string) {
  if (!d) return ''
  try {
    return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  } catch { return d }
}

export function JournalCard({ post, delay = 0 }: { post: JournalSummary; delay?: number }) {
  const gradient = GRADIENTS[(post.title.charCodeAt(0) ?? 0) % GRADIENTS.length]

  return (
    <Link to={`/journal/${post.slug}`} className="group block" aria-label={`Read: ${post.title}`}>
      <MaskImage delay={delay}>
        <div className="relative overflow-hidden w-full aspect-3/2">
          {post.featured_image?.url ? (
            <img
              src={post.featured_image.url}
              alt={post.featured_image.alt || post.title}
              loading="lazy"
              decoding="async"
              {...(post.featured_image.width  ? { width:  post.featured_image.width  } : {})}
              {...(post.featured_image.height ? { height: post.featured_image.height } : {})}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
            />
          ) : (
            <div className="absolute inset-0" style={{ background: gradient }} aria-hidden="true" />
          )}
        </div>
      </MaskImage>

      <div className="mt-4 space-y-2">
        {post.category && <p className="tt-caption">{post.category}</p>}
        <h3 className="text-sm font-medium text-tt-ink group-hover:opacity-60 transition-opacity duration-200 leading-snug tracking-wide">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="tt-body text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
        )}
        <div className="flex items-center gap-3 pt-1">
          {post.date && <span className="tt-caption">{formatDate(post.date)}</span>}
          {post.reading_time && <span className="tt-caption">{post.reading_time} min read</span>}
        </div>
      </div>
    </Link>
  )
}
