import { useState } from 'react'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { classNames } from '../../lib/classNames'
import Reveal from '../ui/Reveal'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/**
 * Newsletter form. There is no newsletter backend in this project, so the form
 * validates properly and says plainly that nothing was submitted anywhere.
 */
export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({ tone: null, message: '' })

  const submit = (event) => {
    event.preventDefault()
    const value = email.trim()

    if (!value) {
      setStatus({ tone: 'error', message: 'لطفاً ایمیل خود را وارد کنید.' })
      return
    }
    if (!EMAIL_PATTERN.test(value)) {
      setStatus({ tone: 'error', message: 'قالب ایمیل درست نیست؛ نمونه‌ی صحیح: name@example.com' })
      return
    }

    setStatus({
      tone: 'success',
      message: 'ایمیل شما معتبر است، اما در این نسخه‌ی نمایشی خبرنامه به سرور متصل نیست و ایمیلی ارسال یا ذخیره نشده است.',
    })
    setEmail('')
  }

  return (
    <section className="relative isolate overflow-hidden bg-ocean-deep py-16 sm:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-champagne/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute -end-20 top-1/3 h-64 w-64 rounded-full bg-turquoise/20 blur-3xl"
      />

      <Reveal className="container-x relative grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow mb-4 flex items-center gap-3 text-champagne">
            <span className="h-px w-8 bg-champagne" />
            خبرنامه
          </p>
          <h2 className="text-[26px] font-semibold leading-[1.4] text-white sm:text-[34px]">
            با دنیای AURA همراه شو
          </h2>
          <p className="mt-4 max-w-lg text-[13.5px] leading-8 text-white/70">
            از جدیدترین رایحه‌ها، کالکشن‌ها و پیشنهادهای ویژه باخبر شو.
          </p>
        </div>

        <form onSubmit={submit} noValidate className="w-full">
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="flex-1">
              <span className="sr-only">ایمیل</span>
              <input
                type="email"
                dir="ltr"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  if (status.tone) setStatus({ tone: null, message: '' })
                }}
                placeholder="ایمیل خود را وارد کنید"
                aria-invalid={status.tone === 'error'}
                className={classNames(
                  'w-full rounded-full border bg-white/10 px-5 py-4 text-[13px] text-white outline-none transition',
                  'placeholder:text-end placeholder:text-white/45',
                  status.tone === 'error'
                    ? 'border-red-400/70'
                    : 'border-white/20 focus:border-champagne',
                )}
              />
            </label>
            <button
              type="submit"
              className="shrink-0 rounded-full bg-champagne px-8 py-4 text-[12.5px] font-medium uppercase tracking-wide2 text-ocean-ink transition-all duration-300 hover:bg-white active:scale-[0.98]"
            >
              عضویت در خبرنامه
            </button>
          </div>

          {status.tone && (
            <p
              role={status.tone === 'error' ? 'alert' : 'status'}
              className={classNames(
                'mt-4 flex items-start gap-2 rounded-2xl px-4 py-3 text-[12px] leading-6',
                status.tone === 'error'
                  ? 'bg-red-500/12 text-red-100'
                  : 'bg-turquoise/15 text-white',
              )}
            >
              {status.tone === 'error' ? (
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              ) : (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-turquoise-light" aria-hidden="true" />
              )}
              {status.message}
            </p>
          )}

          <p className="mt-4 text-[11px] leading-5 text-white/40">
            با عضویت، با سیاست حریم خصوصی AURA موافقت می‌کنید.
          </p>
        </form>
      </Reveal>
    </section>
  )
}
