import { WorkPageLayout } from '@/components/layout/WorkPageLayout'

export function FbStorytellingPage() {
  return (
    <WorkPageLayout>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '11px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#9a8878',
          margin: 0,
        }}
      >
        F&amp;B
      </p>

      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 7vw, 6rem)',
          fontWeight: 400,
          lineHeight: 1,
          letterSpacing: '-0.01em',
          color: '#1a1a1a',
          margin: '0.75rem 0 0',
        }}
      >
        F&amp;B Storytelling
      </h1>

      {/* TODO: design content for F&B Storytelling page */}
      <p
        style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: '16px',
          lineHeight: 1.7,
          color: '#7a6a5a',
          margin: '2rem 0 0',
          maxWidth: '40rem',
        }}
      >
        Cinematic beverage visuals shaped through texture, light, and sensory atmosphere.
      </p>
    </WorkPageLayout>
  )
}
