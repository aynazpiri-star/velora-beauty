import { Link } from 'react-router-dom'
import StarRating from './StarRating'
import { IconHeart } from './Icons'
import { useStore } from '../context/StoreContext'
import { formatPrice } from '../lib/format'

const swatches = ['#C9A227', '#C89A80', '#C9CDD2']

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWished } = useStore()
  const wished = isWished(product.id)

  return (
    <article className="group flex h-full flex-col border border-line/80 bg-white transition-shadow duration-500 hover:shadow-[0_18px_45px_-30px_rgba(60,45,30,0.45)]">
      <div className="relative">
        <Link to={`/product/${product.slug}`} aria-label={product.name}>
          <div className="aspect-[157/113] w-full overflow-hidden bg-cream">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.04]"
            />
          </div>
        </Link>
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={wished ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
          aria-pressed={wished}
          className={`absolute end-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-ink transition-colors hover:text-gold ${
            wished ? 'text-gold' : ''
          }`}
        >
          <IconHeart size={17} filled={wished} />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-4">
        <h3 className="text-[13.5px] font-medium leading-6 text-ink">
          <Link to={`/product/${product.slug}`} className="hover:text-gold">
            {product.name}
          </Link>
        </h3>
        <StarRating value={product.rating} count={product.reviews} className="mt-1.5" />
        <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-[13px] font-medium text-ink">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-[11px] text-muted line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>
        <div className="mt-2 flex items-center gap-1.5">
          {swatches.map((color) => (
            <span
              key={color}
              className="h-[9px] w-[9px] rounded-full border border-line"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => addToCart(product.id)}
          className="mt-4 w-full bg-gold py-2.5 text-[10.5px] tracking-[0.12em] text-white transition-colors duration-300 hover:bg-goldDeep"
        >
          افزودن به سبد خرید
        </button>
      </div>
    </article>
  )
}
