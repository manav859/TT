interface LoadingStateProps {
  variant?: 'page' | 'card' | 'grid' | 'hero'
}

export function LoadingState({ variant = 'page' }: LoadingStateProps) {
  if (variant === 'hero') {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center gap-8" style={{ paddingTop: 'var(--height-nav)' }}>
        <div className="tt-skeleton h-12 w-64 rounded-none" />
        <div className="tt-skeleton h-4 w-40 rounded-none" />
        <div className="tt-skeleton w-full max-w-4xl aspect-video rounded-none mt-8" />
      </div>
    )
  }

  if (variant === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="tt-skeleton aspect-3/4 rounded-none" />
            <div className="tt-skeleton h-3 w-3/4 rounded-none" />
            <div className="tt-skeleton h-3 w-1/2 rounded-none" />
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div className="space-y-4 tt-wide tt-section">
        <div className="tt-skeleton aspect-4/3 rounded-none" />
        <div className="tt-skeleton h-4 w-3/4 rounded-none" />
        <div className="tt-skeleton h-3 w-full rounded-none" />
        <div className="tt-skeleton h-3 w-2/3 rounded-none" />
      </div>
    )
  }

  return (
    <div className="tt-container tt-section space-y-8">
      <div className="space-y-4">
        <div className="tt-skeleton h-10 w-1/3 rounded-none" />
        <div className="tt-skeleton h-4 w-2/3 rounded-none" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="tt-skeleton aspect-3/4 rounded-none" />
            <div className="tt-skeleton h-3 w-3/4 rounded-none" />
          </div>
        ))}
      </div>
    </div>
  )
}
