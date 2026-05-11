import { useState } from 'react'
import { postNewsletter } from '@/lib/api/endpoints'
import { useBootstrap } from '@/hooks/useBootstrap'
import { ApiError } from '@/types/api'

export function NewsletterForm() {
  const { data: bootstrap } = useBootstrap()
  const successMsg = bootstrap?.footer?.newsletter_success ?? "You're subscribed."

  const [email, setEmail]   = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed) return

    setStatus('loading')
    try {
      const result = await postNewsletter({ email: trimmed, _tt_hp: '' })
      /* Backend may return 200 (already subscribed) or 201 (new) — both are success */
      setMessage(result.message || successMsg)
      setStatus('success')
      setEmail('')
    } catch (err) {
      if (err instanceof ApiError) {
        /* 422 from invalid email */
        setMessage(err.message || 'Please enter a valid email address.')
      } else {
        setMessage('Something went wrong. Please try again.')
      }
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className="tt-caption text-tt-accent-dark" role="status" aria-live="polite">
        {message}
      </p>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex flex-col gap-3 sm:flex-row sm:items-start"
      noValidate
      aria-label="Newsletter signup"
    >
      {/* Honeypot — hidden from users, present for backend spam check */}
      <input type="text" name="_tt_hp" tabIndex={-1} aria-hidden="true" className="hidden" />

      <input
        type="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); setStatus('idle') }}
        placeholder="Email Address"
        required
        aria-label="Email address for newsletter"
        aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
        className="tt-input min-w-0 flex-1"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="tt-button tt-button-accent shrink-0 sm:min-w-[10rem]"
      >
        {status === 'loading' ? (
          <span className="inline-block w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" aria-label="Sending" />
        ) : (
          'Sign Up'
        )}
      </button>

      {status === 'error' && (
        <p id="newsletter-error" role="alert" aria-live="assertive" className="text-xs text-red-600 sm:absolute sm:-bottom-5 sm:left-0">
          {message}
        </p>
      )}
    </form>
  )
}
