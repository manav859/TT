import { PageSEO } from '@/components/seo/PageSEO'

export function JournalPage() {
  return (
    <>
      <PageSEO pageTitle="Journal" />

      <div className="tt-wide tt-page-shell">
        <div className="mb-10 tt-rule" />

        <div className="max-w-3xl space-y-5">
          <p className="tt-caption text-tt-accent-dark">Journal</p>
          <h1 className="tt-display text-tt-ink">Journal</h1>
          <p className="tt-body text-tt-ink-soft">
            TODO: The Journal is temporarily offline while the frontend is being rebuilt.
          </p>
        </div>
      </div>
    </>
  )
}
