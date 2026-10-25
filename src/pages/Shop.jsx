import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { categories } from '../data/categories'
import { products } from '../data/products'
import { toFa } from '../lib/format'

const sorts = [
  { value: 'featured', label: 'پیشنهاد ما' },
  { value: 'price-asc', label: 'ارزان‌ترین' },
  { value: 'price-desc', label: 'گران‌ترین' },
]

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const activeCategory = params.get('category') ?? 'all'
  const [sort, setSort] = useState('featured')

  const visible = useMemo(() => {
    const filtered =
      activeCategory === 'all'
        ? products
        : products.filter((product) => product.category === activeCategory)
    if (sort === 'price-asc') return [...filtered].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') return [...filtered].sort((a, b) => b.price - a.price)
    return filtered
  }, [activeCategory, sort])

  const activeLabel =
    activeCategory === 'all'
      ? 'همه جواهرات'
      : categories.find((c) => c.slug === activeCategory)?.label ?? 'همه جواهرات'

  return (
    <div className="container-site py-10 lg:py-14">
      <nav aria-label="مسیر" className="text-[10.5px] text-muted">
        <Link to="/" className="hover:text-gold">
          خانه
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">فروشگاه</span>
      </nav>

      <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">فروشگاه</p>
          <h1 className="heading-lg mt-3">{activeLabel}</h1>
          <p className="mt-2 text-[11.5px] text-muted">
            {toFa(visible.length)} قطعه در دسترس
          </p>
        </div>

        <label className="flex items-center gap-2 text-[11px] text-muted">
          مرتب‌سازی
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="border border-line bg-white px-3 py-2 text-[11.5px] text-ink outline-none focus:border-gold"
          >
            {sorts.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-7 flex flex-wrap gap-2 border-y border-line/70 py-4">
        <button
          type="button"
          onClick={() => setParams({})}
          className={`border px-4 py-1.5 text-[11px] transition-colors ${
            activeCategory === 'all'
              ? 'border-gold bg-gold text-white'
              : 'border-line text-ink hover:border-gold hover:text-gold'
          }`}
        >
          همه
        </button>
        {categories.map((category) => (
          <button
            key={category.slug}
            type="button"
            onClick={() => setParams({ category: category.slug })}
            className={`border px-4 py-1.5 text-[11px] transition-colors ${
              activeCategory === category.slug
                ? 'border-gold bg-gold text-white'
                : 'border-line text-ink hover:border-gold hover:text-gold'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-[13px] text-ink">قطعه‌ای در این دسته‌بندی موجود نیست.</p>
          <button
            type="button"
            onClick={() => setParams({})}
            className="btn-outline mt-5"
          >
            مشاهده همه جواهرات
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
