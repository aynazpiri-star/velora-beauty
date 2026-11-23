import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../lib/store.jsx';
import { faNum, toman } from '../lib/format.js';
import { IconClose, IconMinus, IconPlus, IconTrash } from './Icons.jsx';
import './cart-drawer.css';

export default function CartDrawer() {
  const { cartOpen, closeCart, detailed, subtotal, count, setQty, remove } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    closeCart();
  }, [location.pathname, closeCart]);

  useEffect(() => {
    if (!cartOpen) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') closeCart();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [cartOpen, closeCart]);

  const go = (path) => {
    closeCart();
    navigate(path);
  };

  return (
    <div className={`cart-drawer ${cartOpen ? 'is-open' : ''}`} aria-hidden={!cartOpen}>
      <button
        type="button"
        className="cart-drawer__backdrop"
        onClick={closeCart}
        tabIndex={cartOpen ? 0 : -1}
        aria-label="بستن سبد خرید"
      />

      <aside className="cart-drawer__panel" role="dialog" aria-modal="true" aria-label="سبد خرید">
        <header className="cart-drawer__head">
          <div>
            <h2>سبد خرید</h2>
            <p>{faNum(count)} قطعه</p>
          </div>
          <button type="button" className="icon-close" onClick={closeCart} aria-label="بستن سبد خرید">
            <IconClose size={20} />
          </button>
        </header>

        {detailed.length === 0 ? (
          <div className="cart-drawer__empty">
            <p>سبد خرید شما خالی است.</p>
            <button type="button" className="btn btn--dark" onClick={() => go('/shop')}>
              مشاهدهٔ ساعت‌ها
            </button>
          </div>
        ) : (
          <>
            <ul className="cart-drawer__list">
              {detailed.map((item) => (
                <li key={item.id} className="cart-line">
                  <Link to={`/product/${item.slug}`} className="cart-line__media" onClick={closeCart}>
                    <img src={item.images[0]} alt={item.name} />
                  </Link>
                  <div className="cart-line__body">
                    <div className="cart-line__top">
                      <Link to={`/product/${item.slug}`} onClick={closeCart} className="cart-line__name">
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        className="cart-line__remove"
                        onClick={() => remove(item.id)}
                        aria-label={`حذف ${item.name} از سبد`}
                      >
                        <IconTrash size={16} />
                      </button>
                    </div>
                    <p className="cart-line__price">{toman(item.lineTotal)}</p>
                    <div className="qty-stepper qty-stepper--sm">
                      <button
                        type="button"
                        onClick={() => setQty(item.id, item.qty - 1)}
                        aria-label="کاهش تعداد"
                      >
                        <IconMinus size={13} />
                      </button>
                      <span>{faNum(item.qty)}</span>
                      <button
                        type="button"
                        onClick={() => setQty(item.id, item.qty + 1)}
                        aria-label="افزایش تعداد"
                      >
                        <IconPlus size={13} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="cart-drawer__foot">
              <div className="cart-drawer__sum">
                <span>جمع سبد</span>
                <strong>{toman(subtotal)}</strong>
              </div>
              <p className="cart-drawer__note">ارسال استاندارد رایگان است.</p>
              <button type="button" className="btn btn--dark cart-drawer__cta" onClick={() => go('/checkout')}>
                تکمیل خرید
              </button>
              <button type="button" className="cart-drawer__link" onClick={() => go('/cart')}>
                مشاهدهٔ کامل سبد
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
