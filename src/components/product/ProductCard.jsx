import { Link } from 'react-router-dom'
import { Eye, Plus } from 'lucide-react'
import { FAMILY_LABELS } from '../../data/products'
import { useStore } from '../../context/StoreContext'
import { classNames } from '../../lib/classNames'
import { toFaNumber } from '../../lib/format'
import SafeImage from '../ui/SafeImage'
import WishlistButton from './WishlistButton'

/**
 * Catalogue card used in every product grid.
 * `compact` renders the tighter two-column mobile variant.
 */
export default function ProductCard({ product, onQuickView, className }) {
  const { addToCart } = useStore()

  return (
    <article
      className={classNames(
        'group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-ivory-line bg-white',
        'transition-all duration-500 hover:-translate-y-1 hover:border-champagne hover:shadow-card',
        className,
      )}
    >
      <div className="relative overflow-hidden bg-ivory-deep">
        <Link to={`/product/${product.slug}`} aria-label={`مشاهده جزئیات ${product.name}`}>
          <SafeImage
            src={product.image}
            alt={`${product.name} — ${product.tagline}`}
            wrapperClassName="aspect-[4/5] w-full"
            className="transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
          />
        </Link>

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <span className="pointer-events-auto flex flex-col items-start gap-1.5">
            {product.tags.includes('bestseller') && (
              <span className="rounded-full bg-ink/85 px-2.5 py-1 text-[10px] tracking-wide2 text-white backdrop-blur-sm">
                پرفروش
              </span>
            )}
            {product.oldPrice && (
              <span className="rounded-full bg-turquoise px-2.5 py-1 text-[10px] tracking-wide2 text-white">
                تخفیف
              </span>
            )}
          </span>
          <span className="pointer-events-auto">
            <WishlistButton productId={product.id} productName={product.name} />
          </span>
        </div>

        {/* Desktop quick actions */}
        <div className="absolute inset-x-3 bottom-3 hidden translate-y-3 gap-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:flex">
          <button
            type="button"
            onClick={() => onQuickView?.(product)}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-ink/10 bg-white/95 px-4 py-2.5 text-[11.5px] font-medium text-ink backdrop-blur-sm transition hover:border-ink hover:bg-ink hover:text-white"
          >
            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
            نمایش سریع
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <span className="eyebrow mb-2 text-turquoise-dark">{FAMILY_LABELS[product.family]}</span>

        <h3 className="text-[15px] font-semibold leading-6 text-ink">
          <Link to={`/product/${product.slug}`} className="transition hover:text-turquoise-dark">
            {product.name}
          </Link>
        </h3>
        <p className="mt-0.5 text-[11px] uppercase tracking-wide2 text-ink-muted/80">
          {product.nameEn}
        </p>

        <p className="mt-3 line-clamp-2 text-[12.5px] leading-6 text-ink-muted">{product.tagline}</p>

        <p className="mt-3 hidden text-[11.5px] leading-5 text-ink-muted/85 sm:block">
          {product.notes.join(' · ')}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            {product.oldPrice && (
              <s className="tnum block text-[11px] text-ink-muted/60">
                {toFaNumber(product.oldPrice)}
              </s>
            )}
            <span className="tnum text-[14.5px] font-semibold text-ocean">
              {toFaNumber(product.price)}
              <span className="ms-1 text-[11px] font-normal text-ink-muted">تومان</span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => addToCart(product.id)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-all duration-300 hover:bg-turquoise active:scale-95"
            aria-label={`افزودن ${product.name} به سبد خرید`}
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  )
}
