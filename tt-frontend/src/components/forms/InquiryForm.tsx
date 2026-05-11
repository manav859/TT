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
      className="mb-3 block text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-tt-ink-soft"
    >
      {label}
      {required && <span className="ml-2 text-tt-ink-light">(required)</span>}
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
    const { name, value, type } = event.target
    const checked =
      type === 'checkbox' ? (event.target as HTMLInputElement).checked : undefined

    setForm((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value,
    }))

    if (fieldErrors[name]) {
      setErrors((previous) => ({ ...previous, [name]: '' }))
    }
  }

  function handleServiceToggle(service: string) {
    setForm((previous) => ({
      ...previous,
      services: previous.services.includes(service)
        ? previous.services.filter((item) => item !== service)
        : [...previous.services, service],
    }))
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
        ...form,
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
      <div
        className="border border-tt-border/80 bg-white/[0.46] px-6 py-8 md:px-8 md:py-10"
        role="status"
        aria-live="polite"
      >
        <p className="tt-caption mb-3 text-tt-accent-dark">Sent</p>
        <p className="tt-body-lead text-tt-ink">{message}</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Inquiry form"
      className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2"
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
          className={clsx('tt-input min-h-[3.25rem]', fieldErrors.first_name && 'error')}
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
          className={clsx('tt-input min-h-[3.25rem]', fieldErrors.last_name && 'error')}
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
          className={clsx('tt-input min-h-[3.25rem]', fieldErrors.email && 'error')}
          autoComplete="email"
          aria-describedby={fieldErrors.email ? 'email-error' : undefined}
        />
        {fieldErrors.email && <ErrorText id="email-error" message={fieldErrors.email} />}
      </div>

      {fields?.has_phone && (
        <div>
          <FieldLabel htmlFor="phone" label="Phone" />
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className="tt-input min-h-[3.25rem]"
            autoComplete="tel"
          />
        </div>
      )}

      {fields?.has_services_checkboxes && serviceOptions.length > 0 && (
        <div className="md:col-span-2">
          <div className="mb-4">
            <p className="text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-tt-ink-soft">
              Services of Interest
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {serviceOptions.map((service) => {
              const checked = form.services.includes(service)

              return (
                <label
                  key={service}
                  className={clsx(
                    'flex min-h-[3.25rem] items-start gap-3 border px-4 py-3 transition-colors duration-200',
                    checked
                      ? 'border-tt-accent bg-[rgba(202,185,165,0.18)]'
                      : 'border-tt-border bg-white/[0.36] hover:border-tt-accent/70',
                  )}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleServiceToggle(service)}
                    className="mt-1 h-4 w-4 shrink-0 accent-tt-accent"
                  />
                  <span className="text-[0.94rem] leading-relaxed text-tt-ink-soft">{service}</span>
                </label>
              )
            })}
          </div>
        </div>
      )}

      {fields?.has_date && (
        <div>
          <FieldLabel htmlFor="preferred_date" label="Preferred Start Date" />
          <input
            id="preferred_date"
            name="preferred_date"
            type="date"
            value={form.preferred_date}
            onChange={handleChange}
            className="tt-input min-h-[3.25rem]"
          />
        </div>
      )}

      {fields?.has_budget && (
        <div>
          <FieldLabel htmlFor="budget" label="Estimated Budget" />
          {fields.budget_options && fields.budget_options.length > 0 ? (
            <select
              id="budget"
              name="budget"
              value={form.budget}
              onChange={handleChange}
              className="tt-input min-h-[3.25rem] cursor-pointer appearance-none"
            >
              <option value="">Select a range...</option>
              {fields.budget_options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              id="budget"
              name="budget"
              type="text"
              value={form.budget}
              onChange={handleChange}
              className="tt-input min-h-[3.25rem]"
              placeholder="Share your budget range"
            />
          )}
        </div>
      )}

      <div className="md:col-span-2">
        <FieldLabel htmlFor="subject" label="Subject" />
        <input
          id="subject"
          name="subject"
          type="text"
          value={form.subject}
          onChange={handleChange}
          className="tt-input min-h-[3.25rem]"
        />
      </div>

      <div className="md:col-span-2">
        <FieldLabel htmlFor="message" label="Tell Us More" required={isRequired('message')} />
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          className={clsx('tt-input min-h-[11rem]', fieldErrors.message && 'error')}
          rows={6}
          aria-describedby={fieldErrors.message ? 'message-error' : undefined}
        />
        {fieldErrors.message && <ErrorText id="message-error" message={fieldErrors.message} />}
      </div>

      <label className="md:col-span-2 flex items-start gap-3 border border-tt-border bg-white/[0.3] px-4 py-4 transition-colors duration-200 hover:border-tt-accent/70">
        <input
          type="checkbox"
          name="newsletter_opt_in"
          checked={form.newsletter_opt_in}
          onChange={handleChange}
          className="mt-1 h-4 w-4 shrink-0 accent-tt-accent"
        />
        <span className="text-[0.95rem] leading-relaxed text-tt-ink-soft">
          Keep me posted with occasional studio updates and project reveals.
        </span>
      </label>

      {status === 'error' && (
        <div role="alert" className="md:col-span-2 border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-700">{message}</p>
        </div>
      )}

      <div className="md:col-span-2 flex flex-col gap-4 border-t border-tt-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="tt-caption text-tt-ink-light">We usually respond within 24 to 48 hours.</p>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="tt-button tt-button-accent self-start"
        >
          {status === 'loading' ? (
            <>
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Sending...
            </>
          ) : (
            'Submit Inquiry'
          )}
        </button>
      </div>
    </form>
  )
}
