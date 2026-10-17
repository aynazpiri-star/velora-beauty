import { Link } from 'react-router-dom'
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import SafeImage from '../components/ui/SafeImage'
import { FREE_SHIPPING_THRESHOLD, useStore } from '../context/StoreContext'
import { FAMILY_LABELS } from '../data/products'
import { toFaDigits, toFaNumber } from '../lib/format'

export default function Cart() {
  const { lines, cartCount, subtotal, shipping, total, updateQty, removeFromCart, clearCart } =
    useStore()

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)

  if (lines.length === 0) {
    return (
      <section className="bg-ivory px-5 pb-24 pt-36">
        <div className="mx-auto max-w-lg text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-ocean shadow-soft">
            <ShoppingBag className="h-7 w-7" aria-hidden="true" />
          </span>
          <h1 className="mt-6 text-[22px] font-semibold text-ink sm:text-[28px]">
            سبد خرید شما خالی است
          </h1>
          <p className="mt-4 text-[13px] leading-8 text-ink-muted">
            هنوز رایحه‌ای انتخاب نکرده‌اید. مجموعه‌ی AURA را ببینید و اولین عطر خود را برگزینید.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button variant="primary" to="/shop">
              مشاهده‌ی فروشگاه
            </Button>
            <Button variant="outline" to="/collections">
              مجموعه‌ها
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-ivory pb-20 pt-28 sm:pt-36">
      <div className="container-x">
        <nav aria-label="مسیر صفحه" className="mb-6 flex items-center gap-2 text-[11.5px] text-ink-muted">
          <Link to="/" className="transition hover:text-ink">
            صفحه اصلی
          </Link>
          <ArrowLeft className="h-3 w-3 rotate-180" aria-hidden="true" />
          <span className="text-ink">سبد خرید</span>
        </nav>

        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h1 className="text-[24px] font-semibold text-ink sm:text-[32px]">سبد خرید</h1>
          <p className="tnum text-[12.5px] text-ink-muted">
            {toFaDigits(cartCount)} کالا در سبد شما
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
          <Reveal>
            <ul className="space-y-3">
              {lines.map(({ product, qty, total: lineTotal }) => (
                <li
                  key={product.id}
                  className="flex flex-col gap-4 rounded-[22px] border border-ivory-line bg-white p-4 sm:flex-row sm:items-center"
                >
                  <SafeImage
                    src={product.image}
                    alt={product.name}
                    wrapperClassName="h-[130px] w-full shrink-0 rounded-2xl sm:h-[120px] sm:w-[100px]"
                  />

                  <div className="flex min-w-0 flex-1 flex-col">
                    <Link
                      to={`/product/${product.slug}`}
                      className="text-[14.5px] font-semibold text-ink transition hover:text-turquoise-dark"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-1 text-[11.5px] text-ink-muted">
                      {product.nameEn} · {FAMILY_LABELS[product.family]}
                    </p>
                    <p className="mt-1 text-[11.5px] text-ink-muted">
                      {product.size} · {product.concentration}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      <div className="flex items-center rounded-full border border-ivory-line">
                        <button
                          type="button"
                          onClick={() => updateQty(product.id, qty - 1)}
                          className="rounded-full p-2 text-ink transition hover:bg-ivory-deep"
                          aria-label={`کاهش تعداد ${product.name}`}
                        >
                          <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                        <span className="tnum w-9 text-center text-[13px] font-medium">
                          {toFaDigits(qty)}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(product.id, qty + 1)}
                          disabled={qty >= 20}
                          className="rounded-full p-2 text-ink transition hover:bg-ivory-deep disabled:opacity-40"
                          aria-label={`افزودن تعداد ${product.name}`}
                        >
                          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        className="inline-flex items-center gap-1.5 text-[11.5px] text-ink-muted transition hover:text-red-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                        حذف
                      </button>
                    </div>
                  </div>

                  <div className="shrink-0 text-end">
                    <span className="tnum block text-[15px] font-semibold text-ocean">
                      {toFaNumber(lineTotal)}
                    </span>
                    <span className="text-[11px] text-ink-muted">تومان</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <Button variant="outline" size="sm" to="/shop">
                ادامه‌ی خرید
              </Button>
              <button
                type="button"
                onClick={clearCart}
                className="text-[11.5px] text-ink-muted underline decoration-dotted underline-offset-4 transition hover:text-red-600"
              >
                خالی کردن سبد خرید
              </button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="sticky top-28 rounded-[22px] border border-ivory-line bg-white p-6">
              <h2 className="text-[15px] font-semibold text-ink">خلاصه‌ی سفارش</h2>

              <dl className="mt-5 space-y-3 text-[12.5px]">
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
                <div className="flex items-center justify-between border-t border-ivory-line pt-3 text-[15px] font-semibold">
                  <dt className="text-ink">مبلغ قابل پرداخت</dt>
                  <dd className="tnum text-ocean">{toFaNumber(total)} تومان</dd>
                </div>
              </dl>

              {remaining > 0 && (
                <p className="tnum mt-4 rounded-2xl bg-ivory px-4 py-3 text-[11.5px] leading-6 text-ink-muted">
                  با {toFaNumber(remaining)} تومان خرید بیشتر، ارسال سفارش شما رایگان می‌شود.
                </p>
              )}

              <Button variant="primary" size="lg" to="/checkout" className="mt-6 w-full">
                ادامه‌ی فرآیند خرید
              </Button>

              <p className="mt-4 text-[11px] leading-5 text-ink-muted/80">
                در نسخه‌ی نمایشی درگاه پرداخت متصل نیست؛ سفارش به‌صورت درخواست ثبت می‌شود.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
