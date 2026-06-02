import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    if (!accessKey) {
      setStatus('error')
      return
    }

    setStatus('loading')

    const formData = new FormData(e.currentTarget)
    formData.append('access_key', accessKey)
    formData.append('botcheck', '')

    try {
      const res = await fetch(
        'https://api.web3forms.com/submit',
        { method: 'POST', body: formData }
      )
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        ;(e.target as HTMLFormElement).reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      {/* Honeypot spam protection */}
      <input
        type="checkbox"
        name="botcheck"
        style={{ display: 'none' }}
      />

      <input
        type="text"
        name="name"
        placeholder="Name"
        aria-label="Name"
        autoComplete="name"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        aria-label="Email"
        autoComplete="email"
        required
      />

      <textarea
        name="message"
        placeholder="Message"
        aria-label="Message"
        rows={5}
        required
      />

      <button
        type="submit"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'SENDING...' : 'SEND'}
      </button>

      {status === 'success' && (
        <p className="form-success">
          Message sent. We'll be in touch.
        </p>
      )}
      {status === 'error' && (
        <p className="form-error">
          Something went wrong. Please check the form configuration and try again.
        </p>
      )}

    </form>
  )
}
