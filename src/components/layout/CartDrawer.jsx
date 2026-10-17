import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FREE_SHIPPING_THRESHOLD, useStore } from '../../context/StoreContext'
import { useEscape, useLockBodyScroll } from '../../hooks/useOverlay'
import { classNames } from '../../lib/classNames'
import { toFaNumber, toFaDigits } from '../../lib/format'
import Button from '../ui/Button'
import SafeImage from '../ui/SafeImage'

/** Slide-out cart summary. In RTL it enters from the inline-end edge. */
export default function CartDrawer() {
  const {
    cartOpen,
    setCartOpen,
    lines,
    cartCount,
    subtotal,
    shipping,
    total,
    updateQty,
    removeFromCart,
  } = useStore()

  useLockBodyScroll(cartOpen)
  useEscape(() => setCartOpen(false), cartOpen)

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  const progress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100))

  return (
    <div
      className={classNames(
        'fixed inset-0 z-[70]',
        cartOpen ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      aria-hidden={!cartOpen}
    >
      <div
        className={classNames(
          'absolute inset-0 bg-ocean-ink/70 backdrop-blur-sm transition-opacity duration-300',
          cartOpen ? 'opacity-100' : 'opacity-0',
        )}
        onClick={() => setCartOpen(false)}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="سبد خرید"
        className={classNames(
          'absolute inset-y-0 end-0 flex w-full max-w-[420px] flex-col bg-ivory shadow-2xl transition-transform duration-500 ease-out',
          // Pinned to the inline-end edge (the left in RTL): hides by moving -X.
          cartOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <header className="flex items-center justify-between border-b border-ivory-line px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-[18px] w-[18px] text-ocean" aria-hidden="true" />
            <h2 className="text-[15px] font-semibold text-ink">سبد خرید</h2>
            <span className="tnum rounded-full bg-ocean/10 px-2 py-0.5 text-[11px] text-ocean">
              {toFaDigits(cartCount)} کالا
            </span>
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            className="rounded-full p-2 text-ink transition hover:bg-ink/5"
            aria-label="بستن سبد خرید"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        {lines.length > 0 && (
          <div className="border-b border-ivory-line bg-white px-5 py-3">
            <p className="mb-2 text-[12px] text-ink-muted">
              {remaining > 0 ? (
                <>
                  <span className="tnum font-medium text-ink">{toFaNumber(remaining)} تومان</span> تا
                  ارسال رایگان
                </>
              ) : (
                <span className="font-medium text-turquoise-dark">ارسال این سفارش رایگان است ✦</span>
              )}
            </p>
            <span className="block h-1 w-full overflow-hidden rounded-full bg-ivory-line">
              <span
                className="block h-full rounded-full bg-gradient-to-l from-turquoise to-ocean transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </span>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-ocean">
                <ShoppingBag className="h-7 w-7" aria-hidden="true" />
              </span>
              <p className="text-[15px] font-medium text-ink">سبد خرید شما خالی است</p>
              <p className="max-w-[260px] text-[12.5px] leading-6 text-ink-muted">
                رایحه‌های منتخب AURA را ببینید و اولین عطر خود را انتخاب کنید.
              </p>
              <Button variant="ocean" size="sm" to="/shop" onClick={() => setCartOpen(false)}>
                مشاهده فروشگاه
              </Button>
            </div>
          ) : (
            <ul className="space-y-3">
              {lines.map(({ product, qty, total: lineTotal }) => (
                <li
                  key={product.id}
                  className="flex gap-3 rounded-2xl border border-ivory-line bg-white p-3"
                >
                  <SafeImage
                    src={product.image}
                    alt={product.name}
                    wrapperClassName="h-[92px] w-[74px] shrink-0 rounded-xl"
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link
                          to={`/product/${product.slug}`}
                          onClick={() => setCartOpen(false)}
                          className="block truncate text-[13.5px] font-semibold text-ink hover:text-turquoise-dark"
                        >
                          {product.name}
                        </Link>
                        <p className="mt-0.5 truncate text-[11px] text-ink-muted">
                          {product.size} · {product.concentration}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        className="rounded-full p-1.5 text-ink-muted transition hover:bg-ivory-deep hover:text-red-600"
                        aria-label={`حذف ${product.name} از سبد خرید`}
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                      <div className="flex items-center rounded-full border border-ivory-line">
                        <button
                          type="button"
                          onClick={() => updateQty(product.id, qty - 1)}
                          className="rounded-full p-1.5 text-ink transition hover:bg-ivory-deep disabled:opacity-40"
                          aria-label="کاهش تعداد"
                        >
                          <Minus className="h-3 w-3" aria-hidden="true" />
                        </button>
                        <span className="tnum w-7 text-center text-[12.5px] font-medium">
                          {toFaDigits(qty)}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(product.id, qty + 1)}
                          disabled={qty >= 20}
                          className="rounded-full p-1.5 text-ink transition hover:bg-ivory-deep disabled:opacity-40"
                          aria-label="افزودن تعداد"
                        >
                          <Plus className="h-3 w-3" aria-hidden="true" />
                        </button>
                      </div>
                      <span className="tnum text-[13px] font-semibold text-ink">
                        {toFaNumber(lineTotal)} تومان
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <footer className="border-t border-ivory-line bg-white px-5 py-4">
            <dl className="mb-4 space-y-2 text-[12.5px]">
              <div className="flex items-center justify-between">
                <dt className="text-ink-muted">جمع کالاها</dt>
                <dd className="tnum text-ink">{toFaNumber(subtotal)} تومان</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-ink-muted">هزینه ارسال</dt>
                <dd className="tnum text-ink">
                  {shipping === 0 ? 'رایگان' : `${toFaNumber(shipping)} تومان`}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-ivory-line pt-2 text-[14px] font-semibold">
                <dt className="text-ink">مبلغ قابل پرداخت</dt>
                <dd className="tnum text-ocean">{toFaNumber(total)} تومان</dd>
              </div>
            </dl>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" to="/cart" onClick={() => setCartOpen(false)}>
                مشاهده سبد
              </Button>
              <Button variant="primary" size="sm" to="/checkout" onClick={() => setCartOpen(false)}>
                تکمیل خرید
              </Button>
            </div>
          </footer>
        )}
      </aside>
    </div>
  )
}
