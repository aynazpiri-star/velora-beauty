import { Link } from 'react-router-dom'
import { categories } from '../data/categories'
import { products } from '../data/products'
import { toFa } from '../lib/format'

export default function Collections() {
  return (
    <div className="container-site py-10 lg:py-14">
      <nav aria-label="مسیر" className="text-[10.5px] text-muted">
        <Link to="/" className="hover:text-gold">
          خانه
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">مجموعه‌ها</span>
      </nav>

      <div className="mt-5 max-w-xl">
        <p className="eyebrow">مجموعه‌ها</p>
        <h1 className="heading-lg mt-3">مجموعه‌های AURELIA</h1>
        <p className="mt-3 text-[12px] leading-7 text-muted">
          هر مجموعه با نگاهی به یک مناسبت یا سلیقه شکل گرفته است؛ از حلقه‌های عروس تا قطعه‌های
          ساده روزمره.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {categories.map((category) => {
          const count = products.filter((p) => p.category === category.slug).length
          return (
            <Link
              key={category.slug}
              to={`/shop?category=${category.slug}`}
              className="group relative flex items-center gap-5 border border-line/80 bg-white p-4 transition-shadow duration-500 hover:shadow-[0_18px_45px_-30px_rgba(60,45,30,0.45)]"
            >
              <span className="block h-20 w-20 shrink-0 overflow-hidden rounded-full bg-cream">
                <img
                  src={category.image}
                  alt={category.label}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                />
              </span>
              <span>
                <span className="block text-[13px] text-ink group-hover:text-gold">
                  {category.label}
                </span>
                <span className="mt-1 block text-[10.5px] text-muted">
                  {toFa(count)} قطعه
                </span>
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
