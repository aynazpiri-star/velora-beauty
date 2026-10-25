import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import StarRating from '../components/StarRating'
import ProductCard from '../components/ProductCard'
import { useStore } from '../context/StoreContext'
import { categoryLabel } from '../data/categories'
import { findProduct, products } from '../data/products'
import { formatPrice, toFa } from '../lib/format'
import { IconHeart, IconMinus, IconPlus } from '../components/Icons'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = findProduct(slug)
  const { addToCart, toggleWishlist, isWished } = useStore()
  const [qty, setQty] = useState(1)

  if (!product) {
    return (
      <div className="container-site py-24 text-center">
        <h1 className="heading-md">این قطعه پیدا نشد</h1>
        <p className="mt-3 text-[12px] text-muted">
          ممکن است این محصول از مجموعه حذف شده باشد.
        </p>
        <Link to="/shop" className="btn-outline mt-6">
          بازگشت به فروشگاه
        </Link>
      </div>
    )
  }

  const related = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .concat(products.filter((item) => item.id !== product.id))
    .slice(0, 4)

  const wished = isWished(product.id)

  return (
    <div className="container-site py-8 lg:py-12">
      <nav aria-label="مسیر" className="text-[10.5px] text-muted">
        <Link to="/" className="hover:text-gold">
          خانه
        </Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-gold">
          فروشگاه
        </Link>
        <span className="mx-2">/</span>
        <Link to={`/shop?category=${product.category}`} className="hover:text-gold">
          {categoryLabel(product.category)}
        </Link>
      </nav>

      <div className="mt-6 grid gap-9 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div className="bg-cream">
          <img
            src={product.image}
            alt={product.name}
            className="aspect-[157/113] w-full object-cover lg:aspect-[4/3]"
          />
        </div>

        <div className="lg:py-2">
          <p className="eyebrow">{categoryLabel(product.category)}</p>
          <h1 className="mt-3 text-[26px] font-light leading-[1.4] text-ink sm:text-[30px]">
            {product.name}
          </h1>
          <p className="mt-1.5 text-[11px] tracking-[0.12em] text-muted">{product.latin}</p>

          <StarRating value={product.rating} count={product.reviews} className="mt-4" />

          <div className="mt-5 flex flex-wrap items-baseline gap-3">
            <span className="text-[19px] text-ink">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-[12px] text-muted line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <p className="mt-5 max-w-lg text-[12.5px] leading-8 text-muted">
            {product.description}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="flex items-center border border-line">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="کاهش تعداد"
                className="grid h-11 w-11 place-items-center text-ink transition-colors hover:bg-cream"
              >
                <IconMinus size={15} />
              </button>
              <span className="w-10 text-center text-[12.5px]">{toFa(qty)}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                aria-label="افزایش تعداد"
                className="grid h-11 w-11 place-items-center text-ink transition-colors hover:bg-cream"
              >
                <IconPlus size={15} />
              </button>
            </div>
            <button
              type="button"
              onClick={() => addToCart(product.id, qty, { open: true })}
              className="btn-gold h-11 flex-1 sm:flex-none sm:px-10"
            >
              افزودن به سبد خرید
            </button>
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              aria-pressed={wished}
              className={`grid h-11 w-11 place-items-center border transition-colors ${
                wished
                  ? 'border-gold text-gold'
                  : 'border-line text-ink hover:border-gold hover:text-gold'
              }`}
              aria-label={wished ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
            >
              <IconHeart size={18} filled={wished} />
            </button>
          </div>

          <dl className="mt-8 divide-y divide-line/70 border-y border-line/70 text-[11.5px]">
            {[
              ['جنس', product.material],
              ['بسته‌بندی', 'جعبه لوکس AURELIA به همراه کارت اصالت'],
              ['ارسال', 'ارسال رایگان برای سفارش‌های واجد شرایط'],
              ['بازگشت', 'امکان بازگشت تا ۳۰ روز پس از خرید'],
            ].map(([label, value]) => (
              <div key={label} className="flex gap-4 py-3">
                <dt className="w-20 shrink-0 text-muted">{label}</dt>
                <dd className="text-ink">{value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-5 text-[10.5px] leading-6 text-muted">
            قیمت‌ها و موجودی در این نسخه نمایشی است و پرداخت آنلاین فعال نیست.
          </p>
        </div>
      </div>

      <section className="mt-16 lg:mt-20">
        <div className="flex items-end justify-between">
          <h2 className="heading-md">شاید این قطعه‌ها را هم بپسندید</h2>
          <Link to="/shop" className="text-[11.5px] text-ink hover:text-gold">
            مشاهده همه
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  )
}
