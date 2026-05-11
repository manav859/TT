import { Link } from 'react-router-dom'
import { PageSEO } from '@/components/seo/PageSEO'
import { RevealText } from '@/lib/animations/RevealText'

export function NotFoundPage() {
  return (
    <>
      <PageSEO pageTitle="Not Found" noindex />

      <div className="tt-section min-h-[60vh] flex items-center">
        <div className="tt-wide">
          <p className="tt-caption mb-6">404</p>
          <RevealText as="h1" className="tt-display tt-serif text-tt-ink mb-8">
            Page not found.
          </RevealText>
          <p className="tt-body max-w-sm mb-10">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/" className="tt-button">
              Return home
            </Link>
            <Link to="/works" className="tt-link">
              View works
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
