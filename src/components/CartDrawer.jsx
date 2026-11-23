import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { fa, price } from '../utils/format'
import { CloseIcon } from './icons'
import ProductVisual from './ProductVisual'

export default function CartDrawer() {
  const { items, count, subtotal, isOpen, closeCart, setQty, remove } = useCart()

  useEffect(() => {
    if (!isOpen) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') closeCart()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, closeCart])

  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? 'is-open' : ''}`}
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        className={`cart-drawer ${isOpen ? 'is-open' : ''}`}
        aria-label="سبد خرید"
        aria-hidden={!isOpen}
      >
        <div className="cart-drawer__head">
          <h3>
            سبد خرید <span>{fa(count)} کالا</span>
          </h3>
          <button
            type="button"
            className="icon-btn"
            onClick={closeCart}
            aria-label="بستن سبد"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="cart-drawer__body">
          {items.length === 0 ? (
            <div className="cart-empty">
              سبد خرید شما خالی است.
              <br />
              <Link to="/shop" onClick={closeCart}>
                مشاهدهٔ مجموعه
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item__media">
                  <ProductVisual product={item} />
                </div>
                <div>
                  <Link
                    to={`/product/${item.id}`}
                    className="cart-item__name"
                    onClick={closeCart}
                  >
                    {item.name}
                  </Link>
                  <span className="cart-item__price">{price(item.price)}</span>
                  <div className="cart-item__actions">
                    <div className="cart-item__qty">
                      <button
                        type="button"
                        onClick={() => setQty(item.id, item.qty - 1)}
                        aria-label="کاهش تعداد"
                      >
                        −
                      </button>
                      <output>{fa(item.qty)}</output>
                      <button
                        type="button"
                        onClick={() => setQty(item.id, item.qty + 1)}
                        aria-label="افزایش تعداد"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="cart-item__remove"
                      onClick={() => remove(item.id)}
                    >
                      حذف
                    </button>
                  </div>
                </div>
                <span className="cart-item__total">
                  {price(item.qty * item.price)}
                </span>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-drawer__foot">
            <div className="cart-total-row">
              <span>جمع سبد</span>
              <strong>{price(subtotal)}</strong>
            </div>
            <small>ارسال رایگان و بیمه‌شده برای سفارش‌های بالای ۱۰ میلیون تومان.</small>
            <Link to="/checkout" className="btn" onClick={closeCart}>
              ادامهٔ فرایند خرید
            </Link>
          </div>
        )}
      </aside>
    </>
  )
}
