import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getOrder } from '../lib/api.js';
import { faDate, faNum, toman } from '../lib/format.js';
import { IconArrowLeft, IconCheck } from '../components/Icons.jsx';
import './order.css';

const paymentLabels = {
  cod: 'پرداخت در محل',
  transfer: 'کارت به کارت',
};

export default function Order() {
  const { code } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    getOrder(code)
      .then((data) => {
        if (!alive) return;
        setOrder(data);
        setError('');
      })
      .catch((err) => {
        if (alive) setError(err.message);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [code]);

  if (loading) {
    return (
      <div className="page">
        <div className="shell order-state">در حال دریافت سفارش…</div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="page">
        <div className="shell order-state">
          <h1>سفارش پیدا نشد</h1>
          <p>{error || 'کد سفارش معتبر نیست.'}</p>
          <Link to="/shop" className="btn btn--dark">
            بازگشت به فروشگاه
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="shell order">
        <header className="order__head">
          <span className="order__check" aria-hidden="true">
            <IconCheck size={26} />
          </span>
          <p className="eyebrow">سفارش ثبت شد</p>
          <h1>ممنون از انتخاب شما</h1>
          <p className="order__code">
            کد سفارش: <strong>{order.code}</strong>
          </p>
          <p className="order__meta">
            {faDate(order.createdAt)} · {order.status}
          </p>
        </header>

        <div className="order__grid">
          <section className="order__card">
            <h2>اقلام سفارش</h2>
            <ul className="order__items">
              {order.lines.map((line) => (
                <li key={line.id}>
                  <span className="order__item">
                    {line.name}
                    <small>× {faNum(line.qty)}</small>
                  </span>
                  <span>{toman(line.lineTotal)}</span>
                </li>
              ))}
            </ul>

            <div className="order__totals">
              <div className="summary__row">
                <span>جمع کالاها</span>
                <strong>{toman(order.subtotal)}</strong>
              </div>
              {order.discount > 0 ? (
                <div className="summary__row summary__row--discount">
                  <span>تخفیف {order.couponCode ? `(${order.couponCode})` : ''}</span>
                  <strong>− {toman(order.discount)}</strong>
                </div>
              ) : null}
              <div className="summary__row">
                <span>ارسال</span>
                <strong>{order.shipping ? toman(order.shipping) : 'رایگان'}</strong>
              </div>
              <div className="summary__total">
                <span>مبلغ کل</span>
                <span>{toman(order.total)}</span>
              </div>
            </div>
          </section>

          <section className="order__card order__card--info">
            <h2>اطلاعات ارسال</h2>
            <dl>
              <div>
                <dt>گیرنده</dt>
                <dd>{order.customer.fullName}</dd>
              </div>
              <div>
                <dt>موبایل</dt>
                <dd>{faNum(order.customer.phone)}</dd>
              </div>
              <div>
                <dt>نشانی</dt>
                <dd>
                  {order.customer.city}، {order.customer.address}
                </dd>
              </div>
              {order.customer.postalCode ? (
                <div>
                  <dt>کد پستی</dt>
                  <dd>{faNum(order.customer.postalCode)}</dd>
                </div>
              ) : null}
              <div>
                <dt>پرداخت</dt>
                <dd>{paymentLabels[order.paymentMethod] || '—'}</dd>
              </div>
              {order.note ? (
                <div>
                  <dt>یادداشت</dt>
                  <dd>{order.note}</dd>
                </div>
              ) : null}
            </dl>

            <p className="order__note">
              همکاران ما برای هماهنگی ارسال با شما تماس می‌گیرند. این کد را نزد خود نگه دارید.
            </p>
          </section>
        </div>

        <Link to="/shop" className="btn btn--ghost order__back">
          ادامهٔ خرید
          <IconArrowLeft size={17} />
        </Link>
      </div>
    </div>
  );
}
