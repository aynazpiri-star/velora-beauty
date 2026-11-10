import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { api } from '../lib/api.js';
import { formatPrice, toFa } from '../lib/format.js';
import { CheckIcon, TruckIcon } from '../components/Icons.jsx';
import './order.css';

const shippingLabel = { standard: 'ارسال استاندارد', express: 'ارسال سریع' };
const paymentLabel = { cod: 'پرداخت در محل', transfer: 'کارت به کارت' };

export default function Order() {
  const { code } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.order || null);
  const [status, setStatus] = useState(location.state?.order ? 'ready' : 'loading');

  useEffect(() => {
    if (order) return undefined;
    let alive = true;
    api
      .getOrder(code)
      .then((data) => {
        if (!alive) return;
        setOrder(data);
        setStatus('ready');
      })
      .catch(() => alive && setStatus('error'));
    return () => {
      alive = false;
    };
  }, [code, order]);

  if (status === 'loading') {
    return (
      <div className="page">
        <div className="container">
          <p className="muted">در حال دریافت اطلاعات سفارش…</p>
        </div>
      </div>
    );
  }

  if (status === 'error' || !order) {
    return (
      <div className="page">
        <div className="container">
          <div className="empty-state">
            <h3>سفارش پیدا نشد</h3>
            <p>کد پیگیری را بررسی کنید یا با پشتیبانی تماس بگیرید.</p>
            <Link to="/account" className="btn btn--primary">
              پیگیری سفارش
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page order-page">
      <div className="container">
        <div className="order-card">
          <div className="order-success">
            <span className="order-success__icon">
              <CheckIcon size={30} />
            </span>
            <h1>سفارش شما ثبت شد</h1>
            <p>
              ممنون از خرید شما! جزئیات سفارش به شماره <b dir="ltr">{toFa(order.customer.phone)}</b> پیامک شد.
            </p>
            <div className="order-code">
              <span>کد پیگیری</span>
              <b className="brand-word">{order.code}</b>
            </div>
          </div>

          <div className="order-meta">
            <div>
              <span className="tiny">وضعیت</span>
              <b>{order.status}</b>
            </div>
            <div>
              <span className="tiny">شیوه ارسال</span>
              <b>{shippingLabel[order.shippingMethod] || order.shippingMethod}</b>
            </div>
            <div>
              <span className="tiny">پرداخت</span>
              <b>{paymentLabel[order.paymentMethod] || order.paymentMethod}</b>
            </div>
          </div>

          <div className="order-block">
            <h2>اقلام سفارش</h2>
            <ul className="order-items">
              {order.items.map((item) => (
                <li key={`${item.id}-${item.size}-${item.color}`}>
                  <img src={item.image} alt="" />
                  <div>
                    <b>{item.name}</b>
                    <span className="tiny">
                      {item.color} {item.size && `· سایز ${toFa(item.size)}`} · {toFa(item.qty)} عدد
                    </span>
                  </div>
                  <span className="price">{formatPrice(item.lineTotal)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-columns">
            <div className="order-block">
              <h2>اطلاعات ارسال</h2>
              <p className="order-address">
                {order.customer.fullName}
                <br />
                {order.customer.city} — {order.customer.address}
                <br />
                <span dir="ltr">{toFa(order.customer.phone)}</span>
              </p>
              {order.note && <p className="tiny">یادداشت: {order.note}</p>}
            </div>

            <div className="order-block">
              <h2>مبلغ</h2>
              <dl className="order-totals">
                <div>
                  <dt>جمع کالاها</dt>
                  <dd>{formatPrice(order.subtotal)}</dd>
                </div>
                {order.couponDiscount > 0 && (
                  <div>
                    <dt>تخفیف</dt>
                    <dd>− {formatPrice(order.couponDiscount)}</dd>
                  </div>
                )}
                <div>
                  <dt>ارسال</dt>
                  <dd>{order.shippingCost === 0 ? 'رایگان' : formatPrice(order.shippingCost)}</dd>
                </div>
                <div className="order-totals__total">
                  <dt>پرداخت‌شده</dt>
                  <dd>{formatPrice(order.total)}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="order-foot">
            <span className="tiny">
              <TruckIcon size={15} /> ارسال سفارش ظرف ۲۴ ساعت آینده آغاز می‌شود.
            </span>
            <div className="order-foot__actions">
              <Link to="/shop" className="btn btn--ghost btn--sm">
                ادامه خرید
              </Link>
              <Link to="/account" className="btn btn--primary btn--sm">
                پیگیری سفارش
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
