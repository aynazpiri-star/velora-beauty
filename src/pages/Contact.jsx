import { useState } from 'react'
import { Link } from 'react-router-dom'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const update = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
    if (error) setError('')
  }

  const submit = (event) => {
    event.preventDefault()
    if (!form.name.trim() || !form.message.trim()) {
      setError('لطفاً نام و پیام خود را وارد کنید.')
      return
    }
    if (!emailPattern.test(form.email.trim())) {
      setError('ایمیل وارد‌شده معتبر نیست.')
      return
    }
    setError('')
    setSent(true)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="container-site py-10 lg:py-14">
      <nav aria-label="مسیر" className="text-[10.5px] text-muted">
        <Link to="/" className="hover:text-gold">
          خانه
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">تماس با ما</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow">تماس با ما</p>
          <h1 className="heading-lg mt-3">در کنار شما هستیم</h1>
          <p className="mt-4 max-w-md text-[12.5px] leading-8 text-muted">
            برای مشاوره خرید، پیگیری سفارش یا هر پرسشی درباره قطعه‌ها با ما در تماس باشید.
            اطلاعات تماس این صفحه نمونه است و باید با اطلاعات واقعی فروشگاه جایگزین شود.
          </p>

          <dl className="mt-8 space-y-4 text-[11.5px]">
            {[
              ['تلفن', '۰۲۱-۰۰۰۰۰۰۰۰ (نمونه)'],
              ['ایمیل', 'hello@aurelia.example (نمونه)'],
              ['ساعت پاسخ‌گویی', 'شنبه تا پنجشنبه، ۱۰ تا ۱۸'],
            ].map(([label, value]) => (
              <div key={label} className="flex gap-4 border-b border-line/70 pb-3">
                <dt className="w-28 shrink-0 text-muted">{label}</dt>
                <dd className="text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="border border-line/80 bg-white p-6 sm:p-8">
          <h2 className="text-[13px] tracking-[0.04em] text-ink">ارسال پیام</h2>
          {sent ? (
            <p role="status" className="mt-5 text-[12px] leading-7 text-ink">
              پیام شما ثبت شد. در این نسخه نمایشی پیام‌ها ارسال نمی‌شوند و این فقط تأیید فرم است.
            </p>
          ) : (
            <form onSubmit={submit} noValidate className="mt-5 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-[10.5px] text-muted">نام</span>
                <input
                  value={form.name}
                  onChange={update('name')}
                  className="h-11 w-full border border-line bg-ivory px-3 text-[12px] outline-none focus:border-gold"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[10.5px] text-muted">ایمیل</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  className="h-11 w-full border border-line bg-ivory px-3 text-[12px] outline-none focus:border-gold"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[10.5px] text-muted">پیام</span>
                <textarea
                  value={form.message}
                  onChange={update('message')}
                  rows={4}
                  className="w-full border border-line bg-ivory px-3 py-2.5 text-[12px] outline-none focus:border-gold"
                />
              </label>
              {error && (
                <p role="alert" className="text-[10.5px] text-[#9B4A34]">
                  {error}
                </p>
              )}
              <button type="submit" className="btn-gold w-full">
                ارسال پیام
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
