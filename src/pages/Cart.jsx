import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { formatPrice, toFa } from '../lib/format'
import { IconBag, IconClose, IconMinus, IconPlus } from '../components/Icons'

export default function Cart() {
  const { cartItems, cartCount, subtotal, setQty, removeFromCart } = useStore()

  return (
    <div className="container-site py-10 lg:py-14">
      <nav aria-label="مسیر" className="text-[10.5px] text-muted">
        <Link to="/" className="hover:text-gold">
          خانه
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">سبد خرید</span>
      </nav>

      <div className="mt-5 flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">سبد خرید</p>
          <h1 className="heading-lg mt-3">مرور سفارش</h1>
        </div>
        {cartCount > 0 && (
          <p className="text-[11.5px] text-muted">{toFa(cartCount)} قطعه</p>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-4 border border-line/70 bg-cream/40 py-16 text-center">
          <IconBag size={34} className="text-gold/70" />
          <p className="text-[13px] text-ink">سبد خرید شما خالی است</p>
          <p className="max-w-sm text-[11.5px] leading-7 text-muted">
            قطعه‌های مورد علاقه خود را به سبد اضافه کنید تا اینجا نمایش داده شوند.
          </p>
          <Link to="/shop" className="btn-outline mt-2">
            مشاهده فروشگاه
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_0.75fr] lg:gap-12">
          <div className="divide-y divide-line/70 border-y border-line/70">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 py-5 sm:gap-6">
                <Link to={`/product/${item.product.slug}`} className="shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-[92px] w-[108px] object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        to={`/product/${item.product.slug}`}
                        className="text-[12.5px] leading-6 text-ink hover:text-gold"
                      >
                        {item.product.name}
                      </Link>
                      <p className="mt-1 text-[10.5px] text-muted">{item.product.material}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="حذف از سبد"
                      className="text-muted transition-colors hover:text-ink"
                    >
                      <IconClose size={16} />
                    </button>
                  </div>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                    <div className="flex items-center border border-line">
                      <button
                        type="button"
                        onClick={() => setQty(item.id, item.qty - 1)}
                        aria-label="کاهش تعداد"
                        className="grid h-8 w-8 place-items-center text-ink transition-colors hover:bg-cream"
                      >
                        <IconMinus size={13} />
                      </button>
                      <span className="w-8 text-center text-[11.5px]">{toFa(item.qty)}</span>
                      <button
                        type="button"
                        onClick={() => setQty(item.id, item.qty + 1)}
                        aria-label="افزایش تعداد"
                        className="grid h-8 w-8 place-items-center text-ink transition-colors hover:bg-cream"
                      >
                        <IconPlus size={13} />
                      </button>
                    </div>
                    <span className="text-[12px] text-ink">
                      {formatPrice(item.product.price * item.qty)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit border border-line/80 bg-white p-6">
            <h2 className="text-[12.5px] tracking-[0.05em] text-ink">خلاصه سفارش</h2>
            <dl className="mt-5 space-y-3 text-[11.5px]">
              <div className="flex items-center justify-between">
                <dt className="text-muted">جمع قطعات</dt>
                <dd className="text-ink">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted">هزینه ارسال</dt>
                <dd className="text-ink">در مرحله بعد</dd>
              </div>
              <div className="flex items-center justify-between border-t border-line/70 pt-3 text-[13px]">
                <dt className="text-ink">مبلغ قابل پرداخت</dt>
                <dd className="text-ink">{formatPrice(subtotal)}</dd>
              </div>
            </dl>
            <button type="button" disabled className="btn-gold mt-6 w-full">
              تسویه حساب
            </button>
            <p className="mt-3 text-[10.5px] leading-6 text-muted">
              پرداخت آنلاین در این نسخه نمایشی فعال نیست؛ برای نهایی کردن سفارش با ما در تماس
              باشید.
            </p>
            <Link
              to="/shop"
              className="mt-4 block text-center text-[11px] text-ink underline-offset-4 hover:text-gold hover:underline"
            >
              ادامه خرید
            </Link>
          </aside>
        </div>
      )}
    </div>
  )
}
