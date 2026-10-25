import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { formatPrice, toFa } from '../lib/format'
import { IconBag, IconClose, IconMinus, IconPlus } from './Icons'

export default function CartDrawer() {
  const { cartOpen, setCartOpen, cartItems, cartCount, subtotal, setQty, removeFromCart } =
    useStore()

  useEffect(() => {
    if (!cartOpen) return
    const onKey = (event) => {
      if (event.key === 'Escape') setCartOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [cartOpen, setCartOpen])

  return (
    <div className={`fixed inset-0 z-[60] ${cartOpen ? '' : 'pointer-events-none'}`}>
      <div
        onClick={() => setCartOpen(false)}
        className={`absolute inset-0 bg-ink/35 transition-opacity duration-300 ${
          cartOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <aside
        className={`absolute inset-y-0 start-0 flex w-full max-w-md flex-col bg-ivory shadow-2xl transition-transform duration-500 ease-smooth ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!cartOpen}
        aria-label="سبد خرید"
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 className="text-[13px] tracking-[0.05em]">
            سبد خرید {cartCount > 0 && `(${toFa(cartCount)})`}
          </h2>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            aria-label="بستن سبد خرید"
            className="text-muted transition-colors hover:text-ink"
          >
            <IconClose size={20} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-10 text-center">
            <IconBag size={38} className="text-gold/70" />
            <p className="text-[13px] text-ink">سبد خرید شما خالی است</p>
            <p className="text-[11.5px] leading-6 text-muted">
              قطعه‌ای را انتخاب کنید و به این مجموعه اضافه کنید.
            </p>
            <Link to="/shop" onClick={() => setCartOpen(false)} className="btn-outline mt-2">
              مشاهده فروشگاه
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-line/70 py-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-[74px] w-[86px] object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        to={`/product/${item.product.slug}`}
                        onClick={() => setCartOpen(false)}
                        className="text-[12.5px] leading-6 text-ink hover:text-gold"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="حذف از سبد"
                        className="mt-1 text-muted transition-colors hover:text-ink"
                      >
                        <IconClose size={15} />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center border border-line">
                        <button
                          type="button"
                          onClick={() => setQty(item.id, item.qty - 1)}
                          aria-label="کاهش تعداد"
                          className="grid h-7 w-7 place-items-center text-ink transition-colors hover:bg-cream"
                        >
                          <IconMinus size={13} />
                        </button>
                        <span className="w-7 text-center text-[11.5px]">{toFa(item.qty)}</span>
                        <button
                          type="button"
                          onClick={() => setQty(item.id, item.qty + 1)}
                          aria-label="افزایش تعداد"
                          className="grid h-7 w-7 place-items-center text-ink transition-colors hover:bg-cream"
                        >
                          <IconPlus size={13} />
                        </button>
                      </div>
                      <span className="text-[11.5px] text-ink">
                        {formatPrice(item.product.price * item.qty)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-line px-6 py-5">
              <div className="flex items-center justify-between text-[12.5px]">
                <span className="text-muted">جمع قطعات</span>
                <span className="text-ink">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-2 text-[10.5px] leading-6 text-muted">
                هزینه ارسال در مرحله بعد محاسبه می‌شود. این نسخه نمایشی است و پرداخت آنلاین در آن
                فعال نیست.
              </p>
              <Link
                to="/cart"
                onClick={() => setCartOpen(false)}
                className="mt-4 block w-full bg-gold py-3 text-center text-[11px] tracking-[0.14em] text-white transition-colors hover:bg-goldDeep"
              >
                ادامه فرآیند خرید
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
