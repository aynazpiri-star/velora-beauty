import { useState } from 'react'
import { AlertCircle, CheckCircle2, ChevronDown, Loader2 } from 'lucide-react'
import Button from './Button'
import Reveal from './Reveal'
import { budgetRanges, projectTypes } from '../data/site'
import { ConsultationError, isDemoMode, submitConsultation, validateConsultation } from '../lib/consultation'

const initialForm = {
  name: '',
  phone: '',
  email: '',
  projectType: '',
  budget: '',
  description: '',
}

const inputClass =
  'w-full border border-ink/15 bg-cream px-4 py-3.5 text-sm text-ink transition-colors duration-300 placeholder:text-charcoal-muted/70 focus:border-gold focus:outline-none'

/** فرم درخواست مشاوره با اعتبارسنجی، وضعیت بارگذاری و بازخورد موفقیت/خطا. */
export default function ContactForm({ compact = false }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [submitError, setSubmitError] = useState('')
  const [succeededInDemo, setSucceededInDemo] = useState(false)

  const update = (field) => (event) => {
    const { value } = event.target
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => {
      if (!current[field]) return current
      const next = { ...current }
      delete next[field]
      return next
    })
  }

  const handleBlur = (field) => () => {
    const fieldErrors = validateConsultation(form)
    setErrors((current) => {
      const next = { ...current }
      if (fieldErrors[field]) next[field] = fieldErrors[field]
      else delete next[field]
      return next
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitError('')

    const fieldErrors = validateConsultation(form)
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      setStatus('idle')
      return
    }

    setStatus('loading')

    try {
      const result = await submitConsultation(form)
      setSucceededInDemo(Boolean(result.demo))
      setStatus('success')
      setForm(initialForm)
      setErrors({})
    } catch (error) {
      setStatus('error')
      setSubmitError(
        error instanceof ConsultationError
          ? error.message
          : 'ثبت درخواست انجام نشد. لطفاً دوباره تلاش کنید.',
      )
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="border border-gold/40 bg-cream p-8 text-center lg:p-10"
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-gold" aria-hidden="true" />
        <h3 className="mt-5 text-xl">درخواست شما ثبت شد</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-charcoal-muted">
          {succeededInDemo
            ? 'این فرم در حالت نمایشی اجرا می‌شود؛ اطلاعات در همین مرورگر نگهداری شد و به سرویس واقعی ارسال نشد. برای فعال‌سازی ارسال واقعی، نشانی سرویس دریافت درخواست را در تنظیمات پروژه وارد کنید.'
            : 'کارشناسان آرکا سازه در نخستین فرصت با شما تماس می‌گیرند.'}
        </p>
        <div className="mt-7">
          <Button variant="outlineLight" onClick={() => setStatus('idle')}>
            ثبت درخواست جدید
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="نام و نام خانوادگی" required error={errors.name} htmlFor="name">
          <input
            id="name"
            name="name"
            className={inputClass}
            value={form.name}
            onChange={update('name')}
            onBlur={handleBlur('name')}
            placeholder="مثال: سارا محمدی"
            autoComplete="name"
          />
        </Field>

        <Field label="شماره تماس" required error={errors.phone} htmlFor="phone">
          <input
            id="phone"
            name="phone"
            className={`${inputClass} bidi-ltr text-start`}
            value={form.phone}
            onChange={update('phone')}
            onBlur={handleBlur('phone')}
            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
            inputMode="tel"
            autoComplete="tel"
          />
        </Field>

        <Field label="ایمیل (اختیاری)" error={errors.email} htmlFor="email">
          <input
            id="email"
            name="email"
            className={`${inputClass} bidi-ltr text-start`}
            value={form.email}
            onChange={update('email')}
            onBlur={handleBlur('email')}
            placeholder="you@example.com"
            inputMode="email"
            autoComplete="email"
          />
        </Field>

        <Field label="نوع پروژه" required error={errors.projectType} htmlFor="projectType">
          <Select
            id="projectType"
            value={form.projectType}
            onChange={update('projectType')}
            onBlur={handleBlur('projectType')}
            placeholder="انتخاب کنید"
            options={projectTypes}
          />
        </Field>

        {!compact && (
          <Field label="محدوده بودجه" htmlFor="budget" className="sm:col-span-2">
            <Select
              id="budget"
              value={form.budget}
              onChange={update('budget')}
              placeholder="انتخاب کنید (اختیاری)"
              options={budgetRanges}
            />
          </Field>
        )}
      </div>

      <Field label="توضیحات پروژه" required error={errors.description} htmlFor="description">
        <textarea
          id="description"
          name="description"
          rows={compact ? 3 : 5}
          className={`${inputClass} resize-none leading-7`}
          value={form.description}
          onChange={update('description')}
          onBlur={handleBlur('description')}
          placeholder="کوتاه درباره زمین، متراژ، کاربری و زمان‌بندی مورد نظر شما بنویسید."
        />
      </Field>

      {status === 'error' && submitError && (
        <p
          role="alert"
          className="flex items-start gap-3 border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {submitError}
        </p>
      )}

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={status === 'loading'} className="sm:min-w-[16rem]">
          {status === 'loading' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              در حال ارسال…
            </>
          ) : (
            'ثبت درخواست مشاوره'
          )}
        </Button>

        {isDemoMode && (
          <Reveal>
            <p className="text-xs leading-6 text-charcoal-muted">
              این فرم در حالت نمایشی است؛ اطلاعات فقط در مرورگر شما نگهداری می‌شود.
            </p>
          </Reveal>
        )}
      </div>
    </form>
  )
}

function Field({ label, htmlFor, required = false, error, className = '', children }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 block text-sm text-ink">
        {label}
        {required && <span className="ms-1 text-gold">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-2 flex items-center gap-2 text-xs text-red-600">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

function Select({ id, value, onChange, onBlur, options, placeholder }) {
  return (
    <div className="relative">
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`${inputClass} appearance-none pe-10`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-gold"
        style={{ insetInlineEnd: '1rem' }}
        aria-hidden="true"
      />
    </div>
  )
}
