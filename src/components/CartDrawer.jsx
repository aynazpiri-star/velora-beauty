import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../lib/store.jsx';
import { formatPrice, toFa } from '../lib/format.js';
import { BagIcon, CloseIcon, MinusIcon, PlusIcon, TrashIcon } from './Icons.jsx';
import './cart-drawer.css';

export default function CartDrawer() {
  const { cartOpen, closeCart, lines, subtotal, updateQty, removeItem, count } = useShop();

  useEffect(() => {
    if (!cartOpen) return undefined;
    const onKey = (event) => event.key === 'Escape' && closeCart();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [cartOpen, closeCart]);

  return (
    <>
      <div
        className={`drawer-scrim ${cartOpen ? 'is-open' : ''}`}
        onClick={closeCart}
        role="presentation"
      />
      <aside
        className={`cart-drawer ${cartOpen ? 'is-open' : ''}`}
        aria-hidden={!cartOpen}
        aria-label="سبد خرید"
      >
        <header className="cart-drawer__head">
          <div>
            <span className="tiny">سبد خرید شما</span>
            <h2>
              {count > 0 ? `${toFa(count)} کالا` : 'سبد خرید'}
            </h2>
          </div>
          <button type="button" className="icon-btn" onClick={closeCart} aria-label="بستن سبد خرید">
            <CloseIcon size={20} />
          </button>
        </header>

        <div className="cart-drawer__body">
          {lines.length === 0 ? (
            <div className="cart-drawer__empty">
              <span className="cart-drawer__empty-icon">
                <BagIcon size={26} />
              </span>
              <h3>سبد خرید خالی است</h3>
              <p>محصولات مورد علاقه‌تان را انتخاب کنید و اینجا ببینید.</p>
              <Link to="/shop" className="btn btn--primary btn--sm" onClick={closeCart}>
                رفتن به فروشگاه
              </Link>
            </div>
          ) : (
            <ul className="drawer-lines">
              {lines.map((line) => (
                <li key={line.key} className="drawer-line">
                  <Link to={`/product/${line.product.slug}`} onClick={closeCart}>
                    <img src={line.product.images[0]} alt={line.product.name} />
                  </Link>
                  <div className="drawer-line__info">
                    <Link to={`/product/${line.product.slug}`} onClick={closeCart} className="drawer-line__name">
                      {line.product.name}
                    </Link>
                    <span className="tiny">
                      {line.color} {line.size && `· سایز ${toFa(line.size)}`}
                    </span>
                    <div className="drawer-line__row">
                      <div className="qty">
                        <button
                          type="button"
                          onClick={() => updateQty(line.key, line.qty - 1)}
                          aria-label="کاهش تعداد"
                        >
                          <MinusIcon size={13} />
                        </button>
                        <span>{toFa(line.qty)}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(line.key, line.qty + 1)}
                          aria-label="افزایش تعداد"
                        >
                          <PlusIcon size={13} />
                        </button>
                      </div>
                      <span className="price">{formatPrice(line.lineTotal)}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="drawer-line__remove"
                    onClick={() => removeItem(line.key)}
                    aria-label="حذف از سبد"
                  >
                    <TrashIcon size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <footer className="cart-drawer__foot">
            <div className="drawer-total">
              <span>جمع سبد</span>
              <span className="price">{formatPrice(subtotal)}</span>
            </div>
            <p className="tiny">هزینه ارسال در مرحله پرداخت محاسبه می‌شود.</p>
            <div className="drawer-actions">
              <Link to="/cart" className="btn btn--ghost btn--sm" onClick={closeCart}>
                مشاهده سبد
              </Link>
              <Link to="/checkout" className="btn btn--primary btn--sm" onClick={closeCart}>
                تسویه حساب
              </Link>
            </div>
          </footer>
        )}
      </aside>
    </>
  );
}
