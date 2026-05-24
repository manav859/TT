import { useState } from 'react'

interface FormState {
  first_name: string
  last_name: string
  email: string
  phone: string
  newsletter: boolean
  subject: string
  message: string
}

const EMPTY: FormState = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  newsletter: false,
  subject: '',
  message: '',
}

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

export function InquiryForm() {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value, type } = event.target
    const finalValue = type === 'checkbox' ? (event.target as HTMLInputElement).checked : value
    setForm((previous) => ({ ...previous, [name]: finalValue }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined
    if (!accessKey) {
      setStatus('error')
      setMessage(
        'Contact form is not configured yet. Please email us directly at support@tusktales.in.',
      )
      return
    }

    const fullName = `${form.first_name} ${form.last_name}`.trim()
    const payload = {
      access_key: accessKey,
      from_name: 'Tusk Tales — Website Inquiry',
      subject: form.subject?.trim()
        ? `Tusk Tales: ${form.subject.trim()}`
        : `New inquiry from ${fullName || 'website visitor'}`,
      name: fullName,
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      phone: form.phone,
      newsletter_opt_in: form.newsletter ? 'Yes' : 'No',
      message: form.message,
      /* Honeypot — bots fill this; real users won't. Web3Forms rejects if filled. */
      botcheck: (event.currentTarget.elements.namedItem('botcheck') as HTMLInputElement | null)?.value ?? '',
    }

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = (await res.json()) as { success?: boolean; message?: string }
      if (!res.ok || !data.success) {
        throw new Error(data.message || `Submission failed (HTTP ${res.status})`)
      }
      setStatus('success')
      setMessage('Thank you. We will be in touch shortly.')
      setForm(EMPTY)
    } catch (err) {
      setStatus('error')
      setMessage(
        err instanceof Error
          ? `Couldn't send your message: ${err.message}`
          : 'Something went wrong. Please try again or email support@tusktales.in.',
      )
    }
  }

  if (status === 'success') {
    return (
      <div role="status" aria-live="polite" className="py-10">
        <p className="text-[#333] text-lg">{message}</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 font-sans w-full max-w-2xl"
    >
      {/* Honeypot — visually hidden, bots auto-fill input fields */}
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />

      <div className="flex flex-col gap-2">
        <span className="text-[14px] text-[#333]">Name</span>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 flex flex-col gap-1.5">
            <label htmlFor="first_name" className="text-[13px] text-[#333]">
              First Name <span className="text-[#888] ml-1">(required)</span>
            </label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              required
              value={form.first_name}
              onChange={handleChange}
              className="w-full bg-[#e0d5be] border border-[#cabea2] rounded-md px-3 py-2 text-[14px] text-[#3e3c38] focus:outline-none focus:ring-2 focus:ring-[#c4a993] focus:border-transparent"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1.5">
            <label htmlFor="last_name" className="text-[13px] text-[#333]">
              Last Name <span className="text-[#888] ml-1">(required)</span>
            </label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              required
              value={form.last_name}
              onChange={handleChange}
              className="w-full bg-[#e0d5be] border border-[#cabea2] rounded-md px-3 py-2 text-[14px] text-[#3e3c38] focus:outline-none focus:ring-2 focus:ring-[#c4a993] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-[13px] text-[#333]">
          Email <span className="text-[#888] ml-1">(required)</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          className="w-full bg-[#e0d5be] border border-[#cabea2] rounded-md px-3 py-2 text-[14px] text-[#3e3c38] focus:outline-none focus:ring-2 focus:ring-[#c4a993] focus:border-transparent"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className="text-[13px] text-[#333]">
          Phone <span className="text-[#888] ml-1">(required)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          value={form.phone}
          onChange={handleChange}
          autoComplete="tel"
          className="w-full bg-[#e0d5be] border border-[#cabea2] rounded-md px-3 py-2 text-[14px] text-[#3e3c38] focus:outline-none focus:ring-2 focus:ring-[#c4a993] focus:border-transparent"
        />
      </div>

      <div className="flex items-center gap-2.5">
        <input
          id="newsletter"
          name="newsletter"
          type="checkbox"
          checked={form.newsletter}
          onChange={handleChange}
          className="w-4 h-4 accent-[#c4a993] border-gray-300 rounded cursor-pointer"
        />
        <label htmlFor="newsletter" className="text-[13.5px] text-[#555] cursor-pointer">
          Sign up for news and updates
        </label>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="subject" className="text-[13px] text-[#333]">
          Subject <span className="text-[#888] ml-1">(required)</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          value={form.subject}
          onChange={handleChange}
          className="w-full bg-[#e0d5be] border border-[#cabea2] rounded-md px-3 py-2 text-[14px] text-[#3e3c38] focus:outline-none focus:ring-2 focus:ring-[#c4a993] focus:border-transparent"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-[13px] text-[#333]">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={2}
          value={form.message}
          onChange={handleChange}
          className="w-full bg-[#e0d5be] border border-[#cabea2] rounded-md px-3 py-2 text-[14px] text-[#3e3c38] focus:outline-none focus:ring-2 focus:ring-[#c4a993] focus:border-transparent resize-y"
        />
      </div>

      {status === 'error' && message && (
        <p role="alert" className="text-[13px] text-[#a8463a]">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-2 inline-flex items-center justify-center min-w-[120px] bg-[#c4a993] text-white px-8 py-2 rounded-lg text-[14px] font-normal hover:bg-[#b39780] transition-colors duration-200 self-start disabled:opacity-70"
      >
        {status === 'loading' ? 'Submitting…' : 'Submit'}
      </button>
    </form>
  )
}
