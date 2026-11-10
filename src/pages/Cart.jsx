import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { shipping } from '../../shared/catalog.js';
import { useShop } from '../lib/store.jsx';
import { api } from '../lib/api.js';
import { formatPrice, toFa } from '../lib/format.js';
import { ArrowLeftIcon, BagIcon, MinusIcon, PlusIcon, TagIcon, TrashIcon } from '../components/Icons.jsx';
import './cart.css';

const COUPON_KEY = 'velora.coupon';

export default function Cart() {
  const { lines, subtotal, updateQty, removeItem, count } = useShop();
  const [code, setCode] = useState('');
  const [coupon, setCoupon] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(COUPON_KEY) || 'null');
    } catch {
      return null;
    }
  });
  const [message, setMessage] = useState({ tone: '', text: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      if (coupon) localStorage.setItem(COUPON_KEY, JSON.stringify(coupon));
      else localStorage.removeItem(COUPON_KEY);
    } catch {
      /* ignore */
    }
  }, [coupon]);

  const discount = coupon ? Math.round((subtotal * coupon.percent) / 100) : 0;
  const afterDiscount = subtotal - discount;
  const shippingCost = lines.length === 0 ? 0 : afterDiscount >= shipping.freeThreshold ? 0 : shipping.flatRate;

  const applyCoupon = async (event) => {
    event.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    try {
      const result = await api.validateCoupon(code.trim());
      setCoupon({ code: result.code, percent: result.percent });
      setMessage({ tone: 'ok', text: `کد تخفیف «${result.code}» اعمال شد.` });
      setCode('');
    } catch (error) {
      setMessage({ tone: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  if (lines.length === 0) {
    return (
      <div className="page">
        <div className="container">
          <header className="page-head">
            <span className="eyebrow">سبد خرید</span>
            <h1 className="page-title">سبد خرید شما</h1>
          </header>
          <div className="empty-state">
            <span className="cart-empty__icon">
              <BagIcon size={30} />
            </span>
            <h3>سبد خرید خالی است</h3>
            <p>هنوز محصولی انتخاب نکرده‌اید. نگاهی به مجموعه تازه‌ها بیندازید.</p>
            <Link to="/shop" className="btn btn--primary">
              شروع خرید
              <ArrowLeftIcon size={17} />
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
          <span className="eyebrow">سبد خرید</span>
          <h1 className="page-title">سبد خرید شما ({toFa(count)} کالا)</h1>
        </header>

        <div className="cart-layout">
          <div className="cart-list">
            {lines.map((line) => (
              <article key={line.key} className="cart-line">
                <Link to={`/product/${line.product.slug}`} className="cart-line__media">
                  <img src={line.product.images[0]} alt={line.product.name} />
                </Link>

                <div className="cart-line__body">
                  <Link to={`/product/${line.product.slug}`} className="cart-line__name">
                    {line.product.name}
                  </Link>
                  <p className="tiny">{line.product.subtitle}</p>
                  <div className="cart-line__meta">
                    <span>
                      رنگ: <b>{line.color}</b>
                    </span>
                    {line.size && (
                      <span>
                        سایز: <b>{toFa(line.size)}</b>
                      </span>
                    )}
                  </div>

                  <div className="cart-line__foot">
                    <div className="qty">
                      <button type="button" onClick={() => updateQty(line.key, line.qty - 1)} aria-label="کاهش تعداد">
                        <MinusIcon size={13} />
                      </button>
                      <span>{toFa(line.qty)}</span>
                      <button type="button" onClick={() => updateQty(line.key, line.qty + 1)} aria-label="افزایش تعداد">
                        <PlusIcon size={13} />
                      </button>
                    </div>
                    <span className="price">{formatPrice(line.lineTotal)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="cart-line__remove"
                  onClick={() => removeItem(line.key)}
                  aria-label="حذف محصول"
                >
                  <TrashIcon size={17} />
                </button>
              </article>
            ))}

            <Link to="/shop" className="cart-continue">
              <ArrowLeftIcon size={16} />
              ادامه خرید
            </Link>
          </div>

          <aside className="cart-summary">
            <h2>خلاصه سفارش</h2>

            <form className="coupon" onSubmit={applyCoupon}>
              <label className="coupon__field">
                <TagIcon size={17} />
                <input
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  placeholder="کد تخفیف"
                  aria-label="کد تخفیف"
                  dir="ltr"
                />
              </label>
              <button type="submit" className="btn btn--ghost btn--sm" disabled={loading}>
                {loading ? '…' : 'اعمال'}
              </button>
            </form>

            {message.text && (
              <p className={`coupon-msg ${message.tone === 'error' ? 'is-error' : 'is-ok'}`}>{message.text}</p>
            )}

            {coupon && (
              <div className="coupon-applied">
                <span>
                  کد <b className="brand-word">{coupon.code}</b> ({toFa(coupon.percent)}٪)
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setCoupon(null);
                    setMessage({ tone: '', text: '' });
                  }}
                >
                  حذف
                </button>
              </div>
            )}

            <dl className="summary-rows">
              <div>
                <dt>جمع کالاها</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              {discount > 0 && (
                <div className="is-discount">
                  <dt>تخفیف</dt>
                  <dd>− {formatPrice(discount)}</dd>
                </div>
              )}
              <div>
                <dt>هزینه ارسال</dt>
                <dd>{shippingCost === 0 ? 'رایگان' : formatPrice(shippingCost)}</dd>
              </div>
              <div className="summary-total">
                <dt>مبلغ قابل پرداخت</dt>
                <dd>{formatPrice(afterDiscount + shippingCost)}</dd>
              </div>
            </dl>

            <Link to="/checkout" className="btn btn--primary btn--block">
              ادامه و تسویه حساب
              <ArrowLeftIcon size={17} />
            </Link>

            <p className="tiny cart-summary__note">
              ارسال رایگان برای سفارش‌های بالای {formatPrice(shipping.freeThreshold)}.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
