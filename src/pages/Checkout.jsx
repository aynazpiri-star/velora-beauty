import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { calculateOrder } from '../../shared/catalog.js';
import { useShop } from '../lib/store.jsx';
import { api } from '../lib/api.js';
import { formatPrice, toEn, toFa } from '../lib/format.js';
import { ArrowLeftIcon, CheckIcon, ClockIcon, LockIcon, TagIcon, TruckIcon } from '../components/Icons.jsx';
import './checkout.css';

const STEPS = ['اطلاعات ارسال', 'شیوه ارسال', 'پرداخت'];

const readCoupon = () => {
  try {
    return JSON.parse(localStorage.getItem('velora.coupon') || 'null');
  } catch {
    return null;
  }
};

export default function Checkout() {
  const { lines, count, clearCart } = useShop();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    postalCode: '',
  });
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const coupon = useMemo(readCoupon, []);
  const totals = useMemo(
    () =>
      calculateOrder({
        items: lines.map((line) => ({ id: line.product.id, size: line.size, color: line.color, qty: line.qty })),
        couponCode: coupon?.code || '',
        shippingMethod,
      }),
    [lines, coupon, shippingMethod],
  );

  const set = (key) => (event) => setForm({ ...form, [key]: event.target.value });

  const validateDetails = () => {
    const next = {};
    if (form.fullName.trim().length < 3) next.fullName = 'نام و نام خانوادگی را کامل وارد کنید.';
    const phone = toEn(form.phone).replace(/\s|-/g, '');
    if (!/^09\d{9}$/.test(phone)) next.phone = 'شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود.';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) next.email = 'ایمیل معتبر نیست.';
    if (!form.city.trim()) next.city = 'نام شهر را وارد کنید.';
    if (form.address.trim().length < 10) next.address = 'نشانی را کامل‌تر وارد کنید.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const nextStep = () => {
    if (step === 1 && !validateDetails()) return;
    setStep((current) => Math.min(3, current + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!validateDetails()) {
      setStep(1);
      return;
    }
    setSubmitting(true);
    setServerError('');
    try {
      const order = await api.createOrder({
        items: lines.map((line) => ({
          id: line.product.id,
          size: line.size,
          color: line.color,
          qty: line.qty,
        })),
        customer: { ...form, phone: toEn(form.phone).replace(/\s|-/g, '') },
        shippingMethod,
        paymentMethod,
        couponCode: coupon?.code || '',
        note,
      });
      try {
        localStorage.removeItem('velora.coupon');
      } catch {
        /* ignore */
      }
      clearCart();
      navigate(`/order/${order.code}`, { state: { order }, replace: true });
    } catch (error) {
      setServerError(error.message || 'ثبت سفارش انجام نشد. دوباره تلاش کنید.');
      setSubmitting(false);
    }
  };

  if (lines.length === 0) {
    return (
      <div className="page">
        <div className="container">
          <div className="empty-state">
            <h3>سبد خرید خالی است</h3>
            <p>برای ادامه فرایند خرید ابتدا محصولی انتخاب کنید.</p>
            <Link to="/shop" className="btn btn--primary">
              مشاهده محصولات
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <header className="page-head">
          <span className="eyebrow">تسویه حساب</span>
          <h1 className="page-title">تکمیل سفارش</h1>
        </header>

        <ol className="stepper">
          {STEPS.map((label, index) => {
            const number = index + 1;
            return (
              <li key={label} className={`stepper__item ${step === number ? 'is-active' : ''} ${step > number ? 'is-done' : ''}`}>
                <span className="stepper__dot">{step > number ? <CheckIcon size={14} /> : toFa(number)}</span>
                <span className="stepper__label">{label}</span>
              </li>
            );
          })}
        </ol>

        <form className="checkout-layout" onSubmit={submit}>
          <div className="checkout-main">
            {step === 1 && (
              <section className="checkout-card">
                <h2>اطلاعات گیرنده</h2>
                <div className="form-grid">
                  <label className="field">
                    <span>نام و نام خانوادگی *</span>
                    <input
                      className={`input ${errors.fullName ? 'input--error' : ''}`}
                      value={form.fullName}
                      onChange={set('fullName')}
                      placeholder="مثلاً نگار محمدی"
                    />
                    {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                  </label>

                  <label className="field">
                    <span>شماره موبایل *</span>
                    <input
                      className={`input ${errors.phone ? 'input--error' : ''}`}
                      value={form.phone}
                      onChange={set('phone')}
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      inputMode="tel"
                      dir="ltr"
                    />
                    {errors.phone && <span className="field-error">{errors.phone}</span>}
                  </label>

                  <label className="field">
                    <span>ایمیل (اختیاری)</span>
                    <input
                      className={`input ${errors.email ? 'input--error' : ''}`}
                      value={form.email}
                      onChange={set('email')}
                      placeholder="you@example.com"
                      inputMode="email"
                      dir="ltr"
                    />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </label>

                  <label className="field">
                    <span>شهر *</span>
                    <input
                      className={`input ${errors.city ? 'input--error' : ''}`}
                      value={form.city}
                      onChange={set('city')}
                      placeholder="تهران"
                    />
                    {errors.city && <span className="field-error">{errors.city}</span>}
                  </label>

                  <label className="field form-grid__full">
                    <span>نشانی کامل *</span>
                    <textarea
                      className={`textarea ${errors.address ? 'input--error' : ''}`}
                      value={form.address}
                      onChange={set('address')}
                      placeholder="خیابان، کوچه، پلاک، واحد"
                    />
                    {errors.address && <span className="field-error">{errors.address}</span>}
                  </label>

                  <label className="field">
                    <span>کد پستی (اختیاری)</span>
                    <input
                      className="input"
                      value={form.postalCode}
                      onChange={set('postalCode')}
                      placeholder="۱۲۳۴۵۶۷۸۹۰"
                      inputMode="numeric"
                      dir="ltr"
                    />
                  </label>
                </div>

                <div className="checkout-actions">
                  <Link to="/cart" className="btn btn--ghost">
                    بازگشت به سبد
                  </Link>
                  <button type="button" className="btn btn--primary" onClick={nextStep}>
                    ادامه
                    <ArrowLeftIcon size={17} />
                  </button>
                </div>
              </section>
            )}

            {step === 2 && (
              <section className="checkout-card">
                <h2>شیوه ارسال</h2>
                <div className="option-cards">
                  <label className={`option-card ${shippingMethod === 'standard' ? 'is-active' : ''}`}>
                    <input
                      type="radio"
                      name="shipping"
                      value="standard"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                    />
                    <span className="option-card__icon">
                      <TruckIcon size={20} />
                    </span>
                    <span className="option-card__body">
                      <b>ارسال استاندارد</b>
                      <em>تهران ۲۴ ساعته · شهرستان ۲ تا ۴ روز کاری</em>
                    </span>
                    <span className="option-card__price">
                      {totals.subtotal - totals.couponDiscount >= 8000000 ? 'رایگان' : formatPrice(350000)}
                    </span>
                  </label>

                  <label className={`option-card ${shippingMethod === 'express' ? 'is-active' : ''}`}>
                    <input
                      type="radio"
                      name="shipping"
                      value="express"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                    />
                    <span className="option-card__icon">
                      <ClockIcon size={20} />
                    </span>
                    <span className="option-card__body">
                      <b>ارسال سریع</b>
                      <em>تحویل در همان روز برای سفارش‌های ثبت‌شده تا ساعت ۱۲</em>
                    </span>
                    <span className="option-card__price">
                      + {formatPrice(250000)}
                    </span>
                  </label>
                </div>

                <label className="field checkout-note">
                  <span>یادداشت برای تحویل (اختیاری)</span>
                  <textarea
                    className="textarea"
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    placeholder="مثلاً بعد از ساعت ۱۷ تماس بگیرید."
                  />
                </label>

                <div className="checkout-actions">
                  <button type="button" className="btn btn--ghost" onClick={() => setStep(1)}>
                    مرحله قبل
                  </button>
                  <button type="button" className="btn btn--primary" onClick={nextStep}>
                    ادامه
                    <ArrowLeftIcon size={17} />
                  </button>
                </div>
              </section>
            )}

            {step === 3 && (
              <section className="checkout-card">
                <h2>پرداخت</h2>
                <div className="option-cards">
                  <label className={`option-card ${paymentMethod === 'cod' ? 'is-active' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                    />
                    <span className="option-card__icon">
                      <CheckIcon size={20} />
                    </span>
                    <span className="option-card__body">
                      <b>پرداخت در محل</b>
                      <em>هنگام تحویل، نقدی یا با کارت‌خوان پیک</em>
                    </span>
                  </label>

                  <label className={`option-card ${paymentMethod === 'transfer' ? 'is-active' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="transfer"
                      checked={paymentMethod === 'transfer'}
                      onChange={() => setPaymentMethod('transfer')}
                    />
                    <span className="option-card__icon">
                      <LockIcon size={20} />
                    </span>
                    <span className="option-card__body">
                      <b>کارت به کارت</b>
                      <em>شماره کارت پس از ثبت سفارش برای شما ارسال می‌شود</em>
                    </span>
                  </label>
                </div>

                <div className="checkout-review">
                  <h3>مرور اطلاعات</h3>
                  <dl>
                    <div>
                      <dt>گیرنده</dt>
                      <dd>{form.fullName || '—'}</dd>
                    </div>
                    <div>
                      <dt>موبایل</dt>
                      <dd dir="ltr">{toFa(form.phone) || '—'}</dd>
                    </div>
                    <div>
                      <dt>نشانی</dt>
                      <dd>
                        {form.city} — {form.address || '—'}
                      </dd>
                    </div>
                    <div>
                      <dt>شیوه ارسال</dt>
                      <dd>{shippingMethod === 'express' ? 'ارسال سریع' : 'ارسال استاندارد'}</dd>
                    </div>
                  </dl>
                </div>

                {serverError && <p className="checkout-error">{serverError}</p>}

                <div className="checkout-actions">
                  <button type="button" className="btn btn--ghost" onClick={() => setStep(2)}>
                    مرحله قبل
                  </button>
                  <button type="submit" className="btn btn--primary btn--lg" disabled={submitting}>
                    {submitting ? 'در حال ثبت سفارش…' : `ثبت سفارش · ${formatPrice(totals.total)}`}
                  </button>
                </div>
              </section>
            )}
          </div>

          <aside className="checkout-summary">
            <h2>سفارش شما ({toFa(count)} کالا)</h2>
            <ul className="checkout-items">
              {lines.map((line) => (
                <li key={line.key}>
                  <img src={line.product.images[0]} alt="" />
                  <div>
                    <b>{line.product.name}</b>
                    <span className="tiny">
                      {line.color} {line.size && `· ${toFa(line.size)}`} · {toFa(line.qty)} عدد
                    </span>
                  </div>
                  <span className="price">{formatPrice(line.lineTotal)}</span>
                </li>
              ))}
            </ul>

            <dl className="summary-rows">
              <div>
                <dt>جمع کالاها</dt>
                <dd>{formatPrice(totals.subtotal)}</dd>
              </div>
              {totals.couponDiscount > 0 && (
                <div className="is-discount">
                  <dt>
                    تخفیف {totals.coupon?.code && <TagIcon size={13} />}
                  </dt>
                  <dd>− {formatPrice(totals.couponDiscount)}</dd>
                </div>
              )}
              <div>
                <dt>هزینه ارسال</dt>
                <dd>{totals.shippingCost === 0 ? 'رایگان' : formatPrice(totals.shippingCost)}</dd>
              </div>
              <div className="summary-total">
                <dt>مبلغ قابل پرداخت</dt>
                <dd>{formatPrice(totals.total)}</dd>
              </div>
            </dl>

            <p className="tiny checkout-summary__note">
              <LockIcon size={14} /> اطلاعات شما فقط برای ارسال سفارش استفاده می‌شود.
            </p>
          </aside>
        </form>
      </div>
    </div>
  );
}
