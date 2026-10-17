import { useState } from 'react'
import { AlertCircle, CheckCircle2, Clock, Mail, MapPin, Phone } from 'lucide-react'
import Button from '../components/ui/Button'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import { BRAND } from '../data/content'
import { IMG } from '../data/products'
import { classNames } from '../lib/classNames'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const CONTACT_CARDS = [
  { icon: Phone, label: 'تلفن', value: BRAND.contact.phone, href: BRAND.contact.phoneHref, ltr: true },
  { icon: Mail, label: 'ایمیل', value: BRAND.contact.email, href: BRAND.contact.emailHref, ltr: true },
  { icon: MapPin, label: 'نشانی', value: BRAND.contact.address },
  { icon: Clock, label: 'ساعات پاسخ‌گویی', value: BRAND.contact.hours },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const submit = (event) => {
    event.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'نام خود را وارد کنید.'
    if (!form.email.trim()) next.email = 'ایمیل خود را وارد کنید.'
    else if (!EMAIL_PATTERN.test(form.email.trim())) next.email = 'قالب ایمیل درست نیست.'
    if (!form.message.trim()) next.message = 'متن پیام را بنویسید.'

    setErrors(next)
    if (Object.keys(next).length === 0) {
      setSent(true)
      setForm({ name: '', email: '', subject: '', message: '' })
    }
  }

  const fieldClass = (invalid) =>
    classNames(
      'w-full rounded-2xl border bg-white px-4 py-3 text-[13px] text-ink outline-none transition placeholder:text-ink-muted/60',
      invalid ? 'border-red-400' : 'border-ivory-line focus:border-turquoise',
    )

  return (
    <>
      <PageHero
        eyebrow="تماس با ما"
        title="با AURA در تماس باش"
        subtitle="پرسشی درباره‌ی رایحه‌ها، سفارش‌ها یا همکاری داری؟ تیم ما در ساعات کاری پاسخ‌گوی توست."
        image={IMG.boutique}
        breadcrumb={[{ label: 'تماس با ما' }]}
      />

      <section className="bg-ivory py-14 sm:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal>
            <h2 className="text-[22px] font-semibold text-ink sm:text-[26px]">راه‌های ارتباطی</h2>
            <p className="mt-4 text-[13px] leading-8 text-ink-muted">
              برای پیگیری سریع‌تر سفارش، شماره‌ی سفارش را در متن پیام بنویس.
            </p>

            <ul className="mt-8 space-y-3">
              {CONTACT_CARDS.map((card) => (
                <li
                  key={card.label}
                  className="flex items-start gap-4 rounded-2xl border border-ivory-line bg-white p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ivory text-ocean">
                    <card.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] tracking-wide2 text-ink-muted">
                      {card.label}
                    </span>
                    {card.href ? (
                      <a
                        href={card.href}
                        dir={card.ltr ? 'ltr' : undefined}
                        className="mt-1 block break-words text-[13px] text-ink transition hover:text-turquoise-dark"
                      >
                        {card.value}
                      </a>
                    ) : (
                      <span className="mt-1 block text-[13px] leading-7 text-ink">{card.value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-4 text-[11px] leading-5 text-ink-muted/80">
              اطلاعات تماس در این نسخه نمونه است و پیش از راه‌اندازی نهایی با اطلاعات واقعی
              جایگزین می‌شود.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-[26px] border border-ivory-line bg-white p-6 sm:p-8">
              <h2 className="text-[18px] font-semibold text-ink">فرم تماس</h2>
              <p className="mt-2 text-[12.5px] leading-7 text-ink-muted">
                این فرم اعتبارسنجی می‌شود، اما در نسخه‌ی نمایشی به سرور متصل نیست و پیام جایی ارسال
                نمی‌شود.
              </p>

              {sent && (
                <p
                  role="status"
                  className="mt-6 flex items-start gap-2 rounded-2xl bg-turquoise/12 px-4 py-3 text-[12px] leading-6 text-ocean"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-turquoise-dark" aria-hidden="true" />
                  اطلاعات فرم معتبر بود. در این نسخه‌ی نمایشی پیام ارسال نشده است؛ برای تماس واقعی از
                  شماره‌ی تلفن یا ایمیل بالا استفاده کنید.
                </p>
              )}

              <form onSubmit={submit} noValidate className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-[12px] text-ink">نام و نام خانوادگی</span>
                    <input
                      type="text"
                      value={form.name}
                      onChange={update('name')}
                      aria-invalid={Boolean(errors.name)}
                      className={fieldClass(Boolean(errors.name))}
                      placeholder="مثلاً: سارا احمدی"
                    />
                    {errors.name && (
                      <span className="mt-1.5 flex items-center gap-1 text-[11px] text-red-600">
                        <AlertCircle className="h-3 w-3" aria-hidden="true" />
                        {errors.name}
                      </span>
                    )}
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-[12px] text-ink">ایمیل</span>
                    <input
                      type="email"
                      dir="ltr"
                      value={form.email}
                      onChange={update('email')}
                      aria-invalid={Boolean(errors.email)}
                      className={fieldClass(Boolean(errors.email))}
                      placeholder="name@example.com"
                    />
                    {errors.email && (
                      <span className="mt-1.5 flex items-center gap-1 text-[11px] text-red-600">
                        <AlertCircle className="h-3 w-3" aria-hidden="true" />
                        {errors.email}
                      </span>
                    )}
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-[12px] text-ink">موضوع (اختیاری)</span>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={update('subject')}
                    className={fieldClass(false)}
                    placeholder="مثلاً: پیگیری سفارش"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-[12px] text-ink">متن پیام</span>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={update('message')}
                    aria-invalid={Boolean(errors.message)}
                    className={classNames(fieldClass(Boolean(errors.message)), 'resize-none')}
                    placeholder="پیام خود را بنویسید…"
                  />
                  {errors.message && (
                    <span className="mt-1.5 flex items-center gap-1 text-[11px] text-red-600">
                      <AlertCircle className="h-3 w-3" aria-hidden="true" />
                      {errors.message}
                    </span>
                  )}
                </label>

                <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
                  ارسال پیام
                </Button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
