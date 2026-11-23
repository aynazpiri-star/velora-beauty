import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import ProductVisual from '../components/ProductVisual'
import { fa, price } from '../utils/format'

const initialForm = {
  name: '',
  phone: '',
  email: '',
  city: '',
  address: '',
  postal: '',
  note: '',
}

export default function Checkout() {
  const { items, subtotal, clear } = useCart()
  const [form, setForm] = useState(initialForm)
  const [order, setOrder] = useState(null)
  const navigate = useNavigate()

  const shipping = 0
  const total = subtotal + shipping

  const update = (key) => (event) =>
    setForm((current) => ({ ...current, [key]: event.target.value }))

  const submit = (event) => {
    event.preventDefault()
    if (!items.length) return
    const code = `VL-${Math.floor(10000 + Math.random() * 89999)}`
    setOrder({ code, name: form.name, total })
    clear()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (order) {
    return (
      <div className="wrap">
        <div className="checkout-success">
          <span className="eyebrow">سفارش ثبت شد</span>
          <h1>
            سپاسگزاریم{order.name ? `، ${order.name}` : ''}؛ سفارش شما پذیرفته شد.
          </h1>
          <p>
            شمارهٔ سفارش: <strong>{order.code}</strong>
            <br />
            مبلغ: {price(order.total)}
            <br />
            کارشناس ولورا در نخستین فرصت برای هماهنگی پرداخت و زمان ارسال با شما
            تماس می‌گیرد.
          </p>
          <Link to="/shop" className="btn">
            بازگشت به فروشگاه
          </Link>
        </div>
      </div>
    )
  }

  if (!items.length) {
    return (
      <div className="wrap">
        <div className="checkout-success">
          <span className="eyebrow">سبد خرید</span>
          <h1>سبد شما هنوز خالی است</h1>
          <p>برای ادامهٔ خرید، نگاهی به مجموعهٔ ولورا بیندازید.</p>
          <Link to="/shop" className="btn">
            مشاهدهٔ مجموعه
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="wrap">
      <div className="page-head">
        <span className="eyebrow">تسویه حساب</span>
        <h1>اطلاعات ارسال</h1>
        <p>
          سفارش شما پس از ثبت، توسط کارشناس ولورا بررسی و برای هماهنگی پرداخت با
          شما تماس گرفته می‌شود.
        </p>
      </div>

      <div className="checkout">
        <form onSubmit={submit}>
          <div className="form-block" style={{ marginTop: 0 }}>
            <h2>مشخصات گیرنده</h2>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="name">نام و نام خانوادگی</label>
                <input
                  id="name"
                  value={form.name}
                  onChange={update('name')}
                  required
                  autoComplete="name"
                />
              </div>
              <div className="field">
                <label htmlFor="phone">شمارهٔ تماس</label>
                <input
                  id="phone"
                  value={form.phone}
                  onChange={update('phone')}
                  inputMode="tel"
                  required
                  autoComplete="tel"
                  placeholder="۰۹۱۲…"
                />
              </div>
              <div className="field field--full">
                <label htmlFor="email">ایمیل (اختیاری)</label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  autoComplete="email"
                />
              </div>
            </div>
          </div>

          <div className="form-block">
            <h2>نشانی تحویل</h2>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="city">شهر</label>
                <input
                  id="city"
                  value={form.city}
                  onChange={update('city')}
                  required
                  autoComplete="address-level2"
                />
              </div>
              <div className="field">
                <label htmlFor="postal">کد پستی</label>
                <input
                  id="postal"
                  value={form.postal}
                  onChange={update('postal')}
                  inputMode="numeric"
                  autoComplete="postal-code"
                />
              </div>
              <div className="field field--full">
                <label htmlFor="address">نشانی کامل</label>
                <textarea
                  id="address"
                  value={form.address}
                  onChange={update('address')}
                  required
                  autoComplete="street-address"
                />
              </div>
              <div className="field field--full">
                <label htmlFor="note">یادداشت سفارش (اختیاری)</label>
                <textarea
                  id="note"
                  value={form.note}
                  onChange={update('note')}
                  style={{ height: 74 }}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn checkout__submit">
            ثبت سفارش
          </button>
        </form>

        <aside className="summary">
          <h2>خلاصهٔ سفارش</h2>
          {items.map((item) => (
            <div className="summary__item" key={item.id}>
              <ProductVisual product={item} />
              <span>{item.name}</span>
              <em>× {fa(item.qty)}</em>
            </div>
          ))}
          <div className="summary__rows">
            <div>
              <span>جمع کالاها</span>
              <span>{price(subtotal)}</span>
            </div>
            <div>
              <span>ارسال</span>
              <span>رایگان</span>
            </div>
            <div className="total">
              <span>مبلغ قابل پرداخت</span>
              <span>{price(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
