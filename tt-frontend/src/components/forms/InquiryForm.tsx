import { useState } from 'react'
import { postInquiry } from '@/lib/api/endpoints'
import { ApiError } from '@/types/api'
import type { ContactData } from '@/types/api'
import clsx from 'clsx'

interface InquiryFormProps {
  config?: ContactData
}

interface FormState {
  first_name: string
  last_name: string
  email: string
  phone: string
  subject: string
  services: string[]
  preferred_date: string
  budget: string
  message: string
  newsletter_opt_in: boolean
}

const EMPTY: FormState = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  subject: '',
  services: [],
  preferred_date: '',
  budget: '',
  message: '',
  newsletter_opt_in: false,
}

export function InquiryForm({ config }: InquiryFormProps) {
  const [form, setForm]           = useState<FormState>(EMPTY)
  const [fieldErrors, setErrors]  = useState<Record<string, string>>({})
  const [status, setStatus]       = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage]     = useState('')

  const fields = config?.form_fields
  const serviceOptions = fields?.service_options ?? []
  const successMsg = config?.success_message ?? 'Thank you. We\'ll be in touch shortly.'

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (fieldErrors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  function handleServiceToggle(service: string) {
    setForm(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service],
    }))
  }

  function validate(): boolean {
    const errors: Record<string, string> = {}
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'A valid email is required.'
    }
    if (!form.message.trim()) {
      errors.message = 'Please include a message.'
    }
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')

    try {
      const result = await postInquiry({
        ...form,
        _tt_hp: '',
      })
      setMessage(result.message || successMsg)
      setStatus('success')
      setForm(EMPTY)
    } catch (err) {
      if (err instanceof ApiError && err.fields) {
        setErrors(err.fields)
        setStatus('idle')
      } else if (err instanceof ApiError) {
        setMessage(err.message)
        setStatus('error')
      } else {
        setMessage('Something went wrong. Please try again.')
        setStatus('error')
      }
    }
  }

  if (status === 'success') {
    return (
      <div className="py-8 space-y-3" role="status" aria-live="polite">
        <p className="tt-caption text-tt-accent">Sent</p>
        <p className="tt-body-lead text-tt-ink">{message}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Inquiry form" className="space-y-6">
      {/* Honeypot */}
      <input type="text" name="_tt_hp" tabIndex={-1} aria-hidden="true" className="hidden" />

      {/* Name row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="first_name" className="tt-caption block mb-2">First Name <span className="text-tt-ink-light">(required)</span></label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            value={form.first_name}
            onChange={handleChange}
            className={clsx('tt-input', fieldErrors.first_name && 'error')}
            autoComplete="given-name"
          />
          {fieldErrors.first_name && <p role="alert" className="text-xs text-red-600 mt-1">{fieldErrors.first_name}</p>}
        </div>
        <div>
          <label htmlFor="last_name" className="tt-caption block mb-2">Last Name <span className="text-tt-ink-light">(required)</span></label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            value={form.last_name}
            onChange={handleChange}
            className={clsx('tt-input', fieldErrors.last_name && 'error')}
            autoComplete="family-name"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="tt-caption block mb-2">Email <span className="text-tt-ink-light">(required)</span></label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className={clsx('tt-input', fieldErrors.email && 'error')}
          autoComplete="email"
          aria-describedby={fieldErrors.email ? 'email-error' : undefined}
        />
        {fieldErrors.email && <p id="email-error" role="alert" className="text-xs text-red-600 mt-1">{fieldErrors.email}</p>}
      </div>

      {/* Newsletter opt-in */}
      <label className="flex items-center gap-3 cursor-pointer group">
        <input
          type="checkbox"
          name="newsletter_opt_in"
          checked={form.newsletter_opt_in}
          onChange={handleChange}
          className="w-4 h-4 accent-tt-accent"
        />
        <span className="tt-caption">Sign up for news and updates</span>
      </label>

      {/* Phone */}
      {fields?.has_phone && (
        <div>
          <label htmlFor="phone" className="tt-caption block mb-2">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className="tt-input"
            autoComplete="tel"
          />
        </div>
      )}

      {/* Services checkboxes */}
      {fields?.has_services_checkboxes && serviceOptions.length > 0 && (
        <div>
          <p className="tt-caption mb-3">What services are you interested in?</p>
          <div className="flex flex-wrap gap-3">
            {serviceOptions.map((s) => (
              <label key={s} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={form.services.includes(s)}
                  onChange={() => handleServiceToggle(s)}
                  className="w-4 h-4 accent-tt-accent"
                />
                <span className="tt-caption group-hover:text-tt-ink transition-colors">{s}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Preferred Date */}
      {fields?.has_date && (
        <div>
          <label htmlFor="preferred_date" className="tt-caption block mb-2">Preferred Date</label>
          <input
            id="preferred_date"
            name="preferred_date"
            type="date"
            value={form.preferred_date}
            onChange={handleChange}
            className="tt-input"
          />
        </div>
      )}

      {/* Budget — select if options provided by API, plain input otherwise */}
      {fields?.has_budget && (
        <div>
          <label htmlFor="budget" className="tt-caption block mb-2">Estimated Budget</label>
          {fields.budget_options && fields.budget_options.length > 0 ? (
            <select
              id="budget"
              name="budget"
              value={form.budget}
              onChange={handleChange}
              className="tt-input appearance-none bg-transparent cursor-pointer"
            >
              <option value="">Select a range…</option>
              {fields.budget_options.map(o => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          ) : (
            <input
              id="budget"
              name="budget"
              type="text"
              value={form.budget}
              onChange={handleChange}
              className="tt-input"
              placeholder="e.g. ₹50,000 – ₹1,00,000"
            />
          )}
        </div>
      )}

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="tt-caption block mb-2">Subject <span className="text-tt-ink-light">(required)</span></label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={form.subject}
          onChange={handleChange}
          className="tt-input"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="tt-caption block mb-2">Message <span className="text-tt-ink-light">(required)</span></label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          className={clsx('tt-input', fieldErrors.message && 'error')}
          rows={5}
          aria-describedby={fieldErrors.message ? 'message-error' : undefined}
        />
        {fieldErrors.message && <p id="message-error" role="alert" className="text-xs text-red-600 mt-1">{fieldErrors.message}</p>}
      </div>

      {/* Error banner */}
      {status === 'error' && (
        <div role="alert" className="p-4 border border-red-200 bg-red-50">
          <p className="text-sm text-red-700">{message}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="tt-button tt-button-accent"
      >
        {status === 'loading' ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Sending…
          </>
        ) : (
          'Submit'
        )}
      </button>
    </form>
  )
}
