import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react'
import Button from '../components/ui/Button'
import SafeImage from '../components/ui/SafeImage'
import { FREE_SHIPPING_THRESHOLD, useStore } from '../context/StoreContext'
import { classNames } from '../lib/classNames'
import { toFaDigits, toFaNumber } from '../lib/format'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_PATTERN = /^0\d{10}$/

const FIELDS = [
  { id: 'firstName', label: 'نام', required: true, autoComplete: 'given-name' },
  { id: 'lastName', label: 'نام خانوادگی', required: true, autoComplete: 'family-name' },
  { id: 'phone', label: 'شماره موبایل', required: true, ltr: true, placeholder: '۰۹۱۲۰۰۰۰۰۰۰' },
  { id: 'email', label: 'ایمیل', required: true, ltr: true, type: 'email', placeholder: 'name@example.com' },
  { id: 'city', label: 'شهر', required: true },
  { id: 'postal', label: 'کد پستی (اختیاری)', ltr: true },
]

/**
 * Demo checkout — no payment gateway is configured for this project, so the
 * flow records an order request locally and says so plainly.
 */
export default function Checkout() {
  const { lines, subtotal, shipping, total, placeOrder, lastOrder, cartCount } = useStore()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    city: '',
    postal: '',
    address: '',
    note: '',
  })
  const [errors, setErrors] = useState({})
  const [order, setOrder] = useState(null)

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const submit = (event) => {
    event.preventDefault()
    const next = {}

    FIELDS.filter((field) => field.required).forEach((field) => {
      if (!form[field.id].trim()) next[field.id] = `${field.label} را وارد کنید.`
    })
    if (form.phone.trim() && !PHONE_PATTERN.test(form.phone.trim().replace(/[^\d]/g, '')))
      next.phone = 'شماره موبایل باید ۱۱ رقم و با ۰ شروع شود.'
    if (form.email.trim() && !EMAIL_PATTERN.test(form.email.trim()))
      next.email = 'قالب ایمیل درست نیست.'
    if (!form.address.trim()) next.address = 'نشانی کامل پستی را وارد کنید.'

    setErrors(next)
    if (Object.keys(next).length > 0) return

    const record = placeOrder({
      customer: {
        name: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        city: form.city.trim(),
        postal: form.postal.trim(),
        address: form.address.trim(),
        note: form.note.trim(),
      },
      items: lines.map((line) => ({
        id: line.product.id,
        name: line.product.name,
        qty: line.qty,
        price: line.product.price,
      })),
      subtotal,
      shipping,
      total,
    })
    setOrder(record)
  }

  const fieldClass = (invalid) =>
    classNames(
      'w-full rounded-2xl border bg-white px-4 py-3 text-[13px] text-ink outline-none transition placeholder:text-ink-muted/60',
      invalid ? 'border-red-400' : 'border-ivory-line focus:border-turquoise',
    )

  /* ---------- Success state ---------- */
  if (order) {
    return (
      <section className="bg-ivory px-5 pb-24 pt-36">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-[26px] border border-ivory-line bg-white p-8 text-center sm:p-12">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-turquoise/12 text-turquoise-dark">
              <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
            </span>
            <h1 className="mt-6 text-[22px] font-semibold text-ink sm:text-[28px]">
              درخواست سفارش شما ثبت شد
            </h1>
            <p className="mt-4 text-[13px] leading-8 text-ink-muted">
              شماره پیگیری سفارش شما:
              <span className="tnum mx-2 font-semibold text-ocean" dir="ltr">
                {order.id}
              </span>
            </p>

            <div className="mt-6 rounded-2xl bg-ivory px-5 py-4 text-start text-[12px] leading-7 text-ink-muted">
              <p className="mb-1 font-medium text-ink">توجه</p>
              در این نسخه‌ی نمایشی درگاه پرداخت متصل نیست و مبلغی از حساب شما کسر نشده است. سفارش
              به‌صورت «درخواست» ثبت شد و پس از اتصال درگاه، همکاران AURA برای نهایی‌سازی پرداخت با شما
              تماس می‌گیرند.
            </div>

            <dl className="mt-6 space-y-2 text-start text-[12.5px]">
              <div className="flex items-center justify-between border-b border-ivory-line pb-2">
                <dt className="text-ink-muted">مبلغ سفارش</dt>
                <dd className="tnum text-ink">{toFaNumber(order.total)} تومان</dd>
              </div>
              <div className="flex items-center justify-between border-b border-ivory-line pb-2">
                <dt className="text-ink-muted">گیرنده</dt>
                <dd className="text-ink">{order.customer.name}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-ink-muted">شهر</dt>
                <dd className="text-ink">{order.customer.city}</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button variant="primary" to="/shop">
                ادامه‌ی خرید
              </Button>
              <Button variant="outline" to="/account">
                پیگیری سفارش‌ها
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  /* ---------- Empty cart guard ---------- */
  if (lines.length === 0) {
    return (
      <section className="bg-ivory px-5 pb-24 pt-36">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-[22px] font-semibold text-ink sm:text-[28px]">
            برای پرداخت، سبد خرید نباید خالی باشد
          </h1>
          <p className="mt-4 text-[13px] leading-8 text-ink-muted">
            ابتدا یک عطر انتخاب کنید، سپس به این صفحه برگردید.
          </p>
          {lastOrder && (
            <p className="tnum mt-4 text-[12px] text-ink-muted">
              آخرین درخواست سفارش شما:{' '}
              <span className="font-medium text-ocean" dir="ltr">
                {lastOrder.id}
              </span>
            </p>
          )}
          <Button variant="primary" className="mt-8" to="/shop">
            مشاهده‌ی فروشگاه
          </Button>
        </div>
      </section>
    )
  }

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)

  return (
    <section className="bg-ivory pb-20 pt-28 sm:pt-36">
      <div className="container-x">
        <nav aria-label="مسیر صفحه" className="mb-6 flex items-center gap-2 text-[11.5px] text-ink-muted">
          <Link to="/cart" className="transition hover:text-ink">
            سبد خرید
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-ink">پرداخت</span>
        </nav>

        <h1 className="text-[24px] font-semibold text-ink sm:text-[32px]">تکمیل خرید</h1>
        <p className="mt-3 max-w-2xl text-[12.5px] leading-7 text-ink-muted">
          اطلاعات گیرنده را وارد کنید. در این نسخه‌ی نمایشی پرداخت آنلاین فعال نیست و سفارش به‌صورت
          درخواست ثبت می‌شود.
        </p>

        <form onSubmit={submit} noValidate className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
          <div className="space-y-6">
            <div className="rounded-[22px] border border-ivory-line bg-white p-6">
              <h2 className="mb-5 text-[15px] font-semibold text-ink">اطلاعات گیرنده</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {FIELDS.map((field) => (
                  <label key={field.id} className="block">
                    <span className="mb-2 block text-[12px] text-ink">{field.label}</span>
                    <input
                      type={field.type ?? 'text'}
                      dir={field.ltr ? 'ltr' : undefined}
                      autoComplete={field.autoComplete}
                      value={form[field.id]}
                      onChange={update(field.id)}
                      placeholder={field.placeholder}
                      aria-invalid={Boolean(errors[field.id])}
                      className={fieldClass(Boolean(errors[field.id]))}
                    />
                    {errors[field.id] && (
                      <span className="mt-1.5 flex items-center gap-1 text-[11px] text-red-600">
                        <AlertCircle className="h-3 w-3" aria-hidden="true" />
                        {errors[field.id]}
                      </span>
                    )}
                  </label>
                ))}
              </div>

              <label className="mt-4 block">
                <span className="mb-2 block text-[12px] text-ink">نشانی کامل پستی</span>
                <textarea
                  rows={3}
                  value={form.address}
                  onChange={update('address')}
                  aria-invalid={Boolean(errors.address)}
                  className={classNames(fieldClass(Boolean(errors.address)), 'resize-none')}
                  placeholder="خیابان، کوچه، پلاک، واحد"
                />
                {errors.address && (
                  <span className="mt-1.5 flex items-center gap-1 text-[11px] text-red-600">
                    <AlertCircle className="h-3 w-3" aria-hidden="true" />
                    {errors.address}
                  </span>
                )}
              </label>

              <label className="mt-4 block">
                <span className="mb-2 block text-[12px] text-ink">توضیح سفارش (اختیاری)</span>
                <input
                  type="text"
                  value={form.note}
                  onChange={update('note')}
                  className={fieldClass(false)}
                  placeholder="مثلاً: بسته‌بندی هدیه"
                />
              </label>
            </div>

            <div className="rounded-[22px] border border-ivory-line bg-white p-6">
              <h2 className="mb-4 text-[15px] font-semibold text-ink">روش پرداخت</h2>
              <div className="flex items-start gap-3 rounded-2xl border border-champagne-deep/40 bg-champagne-pale px-5 py-4">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-champagne-deep" aria-hidden="true" />
                <p className="text-[12px] leading-7 text-ink">
                  <span className="font-medium">ثبت درخواست سفارش (نمایشی)</span>
                  <br />
                  درگاه پرداخت در این نسخه متصل نشده است؛ سفارش شما پس از ثبت، توسط تیم AURA بررسی و
                  برای پرداخت نهایی هماهنگ می‌شود.
                </p>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[22px] border border-ivory-line bg-white p-6">
              <h2 className="text-[15px] font-semibold text-ink">
                سفارش شما ({toFaDigits(cartCount)} کالا)
              </h2>

              <ul className="mt-5 space-y-3">
                {lines.map(({ product, qty, total: lineTotal }) => (
                  <li key={product.id} className="flex items-center gap-3">
                    <SafeImage
                      src={product.image}
                      alt={product.name}
                      wrapperClassName="h-[58px] w-[48px] shrink-0 rounded-xl"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[12.5px] font-medium text-ink">
                        {product.name}
                      </span>
                      <span className="tnum block text-[11px] text-ink-muted">
                        {toFaDigits(qty)} × {toFaNumber(product.price)}
                      </span>
                    </span>
                    <span className="tnum shrink-0 text-[12.5px] text-ink">
                      {toFaNumber(lineTotal)}
                    </span>
                  </li>
                ))}
              </ul>

              <dl className="mt-6 space-y-3 border-t border-ivory-line pt-5 text-[12.5px]">
                <div className="flex items-center justify-between">
                  <dt className="text-ink-muted">جمع کالاها</dt>
                  <dd className="tnum text-ink">{toFaNumber(subtotal)} تومان</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-ink-muted">هزینه ارسال</dt>
                  <dd className="tnum text-ink">
                    {shipping === 0 ? 'رایگان' : `${toFaNumber(shipping)} تومان`}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-ivory-line pt-3 text-[15px] font-semibold">
                  <dt className="text-ink">مبلغ کل</dt>
                  <dd className="tnum text-ocean">{toFaNumber(total)} تومان</dd>
                </div>
              </dl>

              {remaining > 0 && (
                <p className="tnum mt-4 text-[11.5px] leading-6 text-ink-muted">
                  {toFaNumber(remaining)} تومان تا ارسال رایگان.
                </p>
              )}

              <Button type="submit" variant="primary" size="lg" className="mt-6 w-full">
                ثبت درخواست سفارش
              </Button>

              <Button variant="outline" size="sm" to="/cart" className="mt-3 w-full">
                بازگشت به سبد خرید
              </Button>
            </div>
          </aside>
        </form>
      </div>
    </section>
  )
}
