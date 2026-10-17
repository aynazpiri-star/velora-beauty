import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Minus, Plus, X } from 'lucide-react'
import { FAMILY_LABELS } from '../../data/products'
import { useStore } from '../../context/StoreContext'
import { useEscape, useLockBodyScroll } from '../../hooks/useOverlay'
import { classNames } from '../../lib/classNames'
import { toFaDigits, toFaNumber } from '../../lib/format'
import Button from '../ui/Button'
import SafeImage from '../ui/SafeImage'

/** Lightweight quick-view dialog: image, notes, price, quantity, add-to-cart. */
export default function QuickView({ product, onClose }) {
  const { addToCart } = useStore()
  const [qty, setQty] = useState(1)

  useLockBodyScroll(Boolean(product))
  useEscape(() => onClose(), Boolean(product))

  if (!product) return null

  return (
    <div className="fixed inset-0 z-[78] flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-ocean-ink/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`نمایش سریع ${product.name}`}
        className={classNames(
          'relative z-10 max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-[26px] bg-ivory shadow-2xl',
          'sm:rounded-[26px] animate-rise',
        )}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute end-4 top-4 z-10 rounded-full bg-white/90 p-2 text-ink shadow-soft transition hover:bg-white"
          aria-label="بستن نمایش سریع"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="grid gap-0 sm:grid-cols-2">
          <SafeImage
            src={product.image}
            alt={product.name}
            wrapperClassName="aspect-[4/5] w-full sm:rounded-s-[26px]"
          />

          <div className="flex flex-col p-6 sm:p-8">
            <span className="eyebrow text-turquoise-dark">{FAMILY_LABELS[product.family]}</span>
            <h2 className="mt-3 text-[22px] font-semibold leading-8 text-ink">{product.name}</h2>
            <p className="mt-1 text-[11px] uppercase tracking-wide2 text-ink-muted/80">
              {product.nameEn}
            </p>

            <p className="mt-4 text-[13px] leading-7 text-ink-muted">{product.tagline}</p>

            <dl className="mt-5 space-y-2 text-[12.5px]">
              <div className="flex gap-2">
                <dt className="text-ink-muted">نت‌های رایحه:</dt>
                <dd className="text-ink">{product.notes.join(' · ')}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-ink-muted">حجم و غلظت:</dt>
                <dd className="text-ink">
                  {product.size} · {product.concentration}
                </dd>
              </div>
            </dl>

            <p className="tnum mt-6 text-[20px] font-semibold text-ocean">
              {toFaNumber(product.price)}
              <span className="ms-2 text-[12px] font-normal text-ink-muted">تومان</span>
            </p>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center rounded-full border border-ivory-line bg-white">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="rounded-full p-2.5 text-ink transition hover:bg-ivory-deep disabled:opacity-40"
                  disabled={qty <= 1}
                  aria-label="کاهش تعداد"
                >
                  <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
                <span className="tnum w-8 text-center text-[13px] font-medium">{toFaDigits(qty)}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(20, q + 1))}
                  className="rounded-full p-2.5 text-ink transition hover:bg-ivory-deep"
                  aria-label="افزودن تعداد"
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>

              <Button
                variant="primary"
                className="flex-1"
                onClick={() => {
                  addToCart(product.id, qty)
                  onClose()
                }}
              >
                افزودن به سبد خرید
              </Button>
            </div>

            <Link
              to={`/product/${product.slug}`}
              onClick={onClose}
              className="link-underline mt-5 inline-flex items-center gap-2 self-start text-[12.5px] text-ocean"
            >
              مشاهده‌ی صفحه‌ی کامل محصول
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
