import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { coupons, shippingMethods } from '../../shared/catalog.js';
import { useStore } from '../lib/store.jsx';
import { createOrder } from '../lib/api.js';
import { faNum, toman } from '../lib/format.js';
import { IconArrowLeft } from '../components/Icons.jsx';
import '../styles/commerce.css';
import './checkout.css';

const paymentOptions = [
  { id: 'cod', title: 'پرداخت در محل', text: 'هنگام تحویل سفارش، مبلغ را پرداخت کنید.' },
  { id: 'transfer', title: 'کارت به کارت', text: 'پس از ثبت سفارش، اطلاعات کارت برای شما ارسال می‌شود.' },
];

const emptyForm = {
  fullName: '',
  phone: '',
  city: '',
  address: '',
  postalCode: '',
  email: '',
  note: '',
};

export default function Checkout() {
  const { detailed, items, subtotal, clear } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [shipping, setShipping] = useState('standard');
  const [payment, setPayment] = useState('cod');
  const [couponInput, setCouponInput] = useState('');
  const [coupon, setCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const shippingPrice = shippingMethods.find((method) => method.id === shipping)?.price || 0;
  const discount = coupon ? Math.round((subtotal * coupon.percent) / 100) : 0;
  const total = subtotal - discount + shippingPrice;

  if (detailed.length === 0) {
    return (
      <div className="page">
        <div className="shell cart-empty">
          <p className="eyebrow">پرداخت</p>
          <h1>سبد خرید خالی است</h1>
          <p>برای تکمیل خرید، ابتدا یک ساعت انتخاب کنید.</p>
          <Link to="/shop" className="btn btn--dark">
            مشاهدهٔ ساعت‌ها
          </Link>
        </div>
      </div>
    );
  }

  const update = (key) => (event) => setForm((previous) => ({ ...previous, [key]: event.target.value }));

  const applyCoupon = () => {
    const found = coupons[couponInput.trim().toUpperCase()];
    if (!found) {
      setCoupon(null);
      setCouponError('این کد تخفیف معتبر نیست.');
      return;
    }
    setCoupon(found);
    setCouponError('');
  };

  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const order = await createOrder({
        items,
        customer: form,
        shippingMethod: shipping,
        couponCode: coupon?.code || '',
        paymentMethod: payment,
        note: form.note,
      });
      clear();
      navigate(`/order/${order.code}`);
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <div className="page">
      <div className="shell">
        <header className="page-head">
          <p className="eyebrow">پرداخت</p>
          <h1>تکمیل خرید</h1>
          <p>اطلاعات ارسال را کامل کنید؛ سفارش شما با دقت بسته‌بندی می‌شود.</p>
        </header>

        <form className="checkout" onSubmit={submit}>
          <div className="checkout__main">
            <section className="checkout__block">
              <h2>
                <span>۰۱</span> اطلاعات گیرنده
              </h2>
              <div className="checkout__fields">
                <div className="field">
                  <label htmlFor="fullName">نام و نام خانوادگی</label>
                  <input
                    id="fullName"
                    required
                    autoComplete="name"
                    value={form.fullName}
                    onChange={update('fullName')}
                  />
                </div>
                <div className="field">
                  <label htmlFor="phone">شمارهٔ موبایل</label>
                  <input
                    id="phone"
                    required
                    inputMode="tel"
                    placeholder="۰۹۱۲…"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={update('phone')}
                  />
                </div>
                <div className="field">
                  <label htmlFor="city">شهر</label>
                  <input
                    id="city"
                    required
                    autoComplete="address-level2"
                    value={form.city}
                    onChange={update('city')}
                  />
                </div>
                <div className="field">
                  <label htmlFor="postalCode">کد پستی (اختیاری)</label>
                  <input
                    id="postalCode"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    value={form.postalCode}
                    onChange={update('postalCode')}
                  />
                </div>
                <div className="field field--wide">
                  <label htmlFor="address">نشانی کامل</label>
                  <input
                    id="address"
                    required
                    autoComplete="street-address"
                    value={form.address}
                    onChange={update('address')}
                  />
                </div>
                <div className="field field--wide">
                  <label htmlFor="email">ایمیل (اختیاری)</label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={update('email')}
                  />
                </div>
              </div>
            </section>

            <section className="checkout__block">
              <h2>
                <span>۰۲</span> روش ارسال
              </h2>
              <div className="option-list">
                {shippingMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`option ${shipping === method.id ? 'is-active' : ''}`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      value={method.id}
                      checked={shipping === method.id}
                      onChange={() => setShipping(method.id)}
                    />
                    <span className="option__dot" aria-hidden="true" />
                    <span className="option__body">
                      <strong>{method.name}</strong>
                      <small>{method.detail}</small>
                    </span>
                    <span className="option__price">{method.price ? toman(method.price) : 'رایگان'}</span>
                  </label>
                ))}
              </div>
            </section>

            <section className="checkout__block">
              <h2>
                <span>۰۳</span> روش پرداخت
              </h2>
              <div className="option-list">
                {paymentOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`option ${payment === option.id ? 'is-active' : ''}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={option.id}
                      checked={payment === option.id}
                      onChange={() => setPayment(option.id)}
                    />
                    <span className="option__dot" aria-hidden="true" />
                    <span className="option__body">
                      <strong>{option.title}</strong>
                      <small>{option.text}</small>
                    </span>
                  </label>
                ))}
              </div>
            </section>

            <section className="checkout__block">
              <h2>
                <span>۰۴</span> یادداشت سفارش
              </h2>
              <div className="field">
                <label htmlFor="note">توضیحات (اختیاری)</label>
                <textarea
                  id="note"
                  rows="3"
                  placeholder="مثلاً: ساعت را برای هدیه بسته‌بندی کنید."
                  value={form.note}
                  onChange={update('note')}
                />
              </div>
            </section>
          </div>

          <aside className="summary checkout__summary" aria-label="خلاصهٔ سفارش">
            <h2>سفارش شما</h2>

            <ul className="checkout__items">
              {detailed.map((item) => (
                <li key={item.id}>
                  <span className="checkout__item-name">
                    {item.name}
                    <small>× {faNum(item.qty)}</small>
                  </span>
                  <span>{toman(item.lineTotal)}</span>
                </li>
              ))}
            </ul>

            <div className="summary__coupon">
              <label htmlFor="coupon" className="visually-hidden">
                کد تخفیف
              </label>
              <input
                id="coupon"
                placeholder="کد تخفیف"
                value={couponInput}
                onChange={(event) => setCouponInput(event.target.value)}
              />
              <button type="button" onClick={applyCoupon} disabled={!couponInput.trim()}>
                اعمال
              </button>
            </div>
            {coupon ? <p className="summary__coupon-ok">{coupon.label} اعمال شد.</p> : null}
            {couponError ? <p className="summary__coupon-error">{couponError}</p> : null}

            <div className="summary__row">
              <span>جمع کالاها</span>
              <strong>{toman(subtotal)}</strong>
            </div>
            {discount > 0 ? (
              <div className="summary__row summary__row--discount">
                <span>تخفیف</span>
                <strong>− {toman(discount)}</strong>
              </div>
            ) : null}
            <div className="summary__row">
              <span>ارسال</span>
              <strong>{shippingPrice ? toman(shippingPrice) : 'رایگان'}</strong>
            </div>
            <div className="summary__total">
              <span>مبلغ قابل پرداخت</span>
              <span>{toman(total)}</span>
            </div>

            {error ? <p className="form-error checkout__error">{error}</p> : null}

            <button type="submit" className="btn btn--dark summary__cta" disabled={submitting}>
              {submitting ? 'در حال ثبت…' : 'ثبت سفارش'}
              <IconArrowLeft size={17} />
            </button>
            <p className="summary__note">
              با ثبت سفارش، شرایط بازگشت کالا و قوانین ولورا را می‌پذیرید.
            </p>
          </aside>
        </form>
      </div>
    </div>
  );
}
