interface ErrorStateProps {
  message?: string
  onRetry?: () => void
  notFound?: boolean
}

export function ErrorState({ message, onRetry, notFound }: ErrorStateProps) {
  return (
    <div className="tt-container tt-section flex flex-col items-start gap-6" role="alert">
      <p className="tt-caption">{notFound ? 'Not Found' : 'Something went wrong'}</p>
      <h2 className="tt-heading-lg tt-serif text-tt-ink">
        {notFound ? 'We couldn\'t find that.' : 'An error occurred.'}
      </h2>
      {message && (
        <p className="tt-body max-w-prose">{message}</p>
      )}
      {!notFound && (
        <p className="tt-body max-w-prose">
          The content may be unavailable. Try again, or return to the home page.
        </p>
      )}
      <div className="flex gap-4">
        {onRetry && (
          <button onClick={onRetry} className="tt-button tt-button-ghost">
            Try again
          </button>
        )}
        <a href="/" className="tt-link">
          Go home
        </a>
      </div>
    </div>
  )
}
