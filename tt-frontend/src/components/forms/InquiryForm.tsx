import { useMemo, useState } from 'react'
import clsx from 'clsx'
import { postInquiry } from '@/lib/api/endpoints'
import { ApiError } from '@/types/api'
import type { ContactData } from '@/types/api'

interface InquiryFormProps {
  config?: ContactData
}

interface FormState {
  first_name: string
  last_name: string
  email: string
  phone: string
  service: string
  message: string
}

const EMPTY: FormState = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
}

function FieldLabel({
  htmlFor,
  label,
  required,
}: {
  htmlFor?: string
  label: string
  required?: boolean
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-3 flex items-baseline gap-2 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-tt-ink-soft"
    >
      <span>{label}</span>
      {required && <span aria-hidden="true" className="text-tt-accent-dark">*</span>}
    </label>
  )
}

function ErrorText({ id, message }: { id?: string; message: string }) {
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-red-600">
      {message}
    </p>
  )
}

export function InquiryForm({ config }: InquiryFormProps) {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [fieldErrors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const fields = config?.form_fields
  const serviceOptions = fields?.service_options ?? []
  const successMsg = config?.success_message ?? "Thank you. We'll be in touch shortly."

  const requiredFields = useMemo(
    () => new Set(config?.required_fields ?? ['email', 'message']),
    [config?.required_fields],
  )

  function isRequired(field: keyof FormState) {
    return requiredFields.has(field)
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))

    if (fieldErrors[name]) {
      setErrors((previous) => ({ ...previous, [name]: '' }))
    }
  }

  function validate(): boolean {
    const errors: Record<string, string> = {}

    if (isRequired('first_name') && !form.first_name.trim()) {
      errors.first_name = 'First name is required.'
    }

    if (isRequired('last_name') && !form.last_name.trim()) {
      errors.last_name = 'Last name is required.'
    }

    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'A valid email is required.'
    }

    if (isRequired('message') && !form.message.trim()) {
      errors.message = 'Please include a message.'
    }

    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!validate()) return

    setStatus('loading')

    try {
      const result = await postInquiry({
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        services: form.service ? [form.service] : [],
        _tt_hp: '',
      })
      setMessage(result.message || successMsg)
      setStatus('success')
      setForm(EMPTY)
    } catch (error) {
      if (error instanceof ApiError && error.fields) {
        setErrors(error.fields)
        setStatus('idle')
      } else if (error instanceof ApiError) {
        setMessage(error.message)
        setStatus('error')
      } else {
        setMessage('Something went wrong. Please try again.')
        setStatus('error')
      }
    }
  }

  if (status === 'success') {
    return (
      <div role="status" aria-live="polite" className="py-10">
        <p className="tt-caption mb-4 text-tt-accent-dark">Sent</p>
        <p className="tt-body-lead text-tt-ink">{message}</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Inquiry form"
      className="grid grid-cols-1 gap-x-10 gap-y-9 md:grid-cols-2 md:gap-y-10"
    >
      <input type="text" name="_tt_hp" tabIndex={-1} aria-hidden="true" className="hidden" />

      <div>
        <FieldLabel htmlFor="first_name" label="First Name" required={isRequired('first_name')} />
        <input
          id="first_name"
          name="first_name"
          type="text"
          value={form.first_name}
          onChange={handleChange}
          className={clsx('tt-input', fieldErrors.first_name && 'error')}
          autoComplete="given-name"
        />
        {fieldErrors.first_name && <ErrorText message={fieldErrors.first_name} />}
      </div>

      <div>
        <FieldLabel htmlFor="last_name" label="Last Name" required={isRequired('last_name')} />
        <input
          id="last_name"
          name="last_name"
          type="text"
          value={form.last_name}
          onChange={handleChange}
          className={clsx('tt-input', fieldErrors.last_name && 'error')}
          autoComplete="family-name"
        />
        {fieldErrors.last_name && <ErrorText message={fieldErrors.last_name} />}
      </div>

      <div>
        <FieldLabel htmlFor="email" label="Email" required />
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
        {fieldErrors.email && <ErrorText id="email-error" message={fieldErrors.email} />}
      </div>

      <div>
        <FieldLabel htmlFor="phone" label="Phone" />
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

      {serviceOptions.length > 0 && (
        <div className="md:col-span-2">
          <FieldLabel htmlFor="service" label="Service of Interest" />
          <select
            id="service"
            name="service"
            value={form.service}
            onChange={handleChange}
            className="tt-input cursor-pointer appearance-none bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2012%208%22%20fill=%22none%22%20stroke=%22%238c6b3b%22%20stroke-width=%221.4%22><path%20d=%22M1%201.5L6%206.5L11%201.5%22/></svg>')] bg-position-[right_0.25rem_center] bg-no-repeat pr-8"
          >
            <option value="">Select a service…</option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="md:col-span-2">
        <FieldLabel htmlFor="message" label="Tell Us More" required={isRequired('message')} />
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          className={clsx('tt-input min-h-36', fieldErrors.message && 'error')}
          rows={5}
          placeholder="A brand, an idea, or a feeling you want to build…"
          aria-describedby={fieldErrors.message ? 'message-error' : undefined}
        />
        {fieldErrors.message && <ErrorText id="message-error" message={fieldErrors.message} />}
      </div>

      {status === 'error' && (
        <div role="alert" className="md:col-span-2 border border-red-200 bg-red-50/70 px-4 py-3">
          <p className="text-sm text-red-700">{message}</p>
        </div>
      )}

      <div className="md:col-span-2 mt-2 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="tt-caption text-tt-ink-light">We usually respond within 24–48 hours.</p>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="tt-button tt-button-accent self-start"
        >
          {status === 'loading' ? (
            <>
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Sending…
            </>
          ) : (
            'Send Inquiry'
          )}
        </button>
      </div>
    </form>
  )
}
