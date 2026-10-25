import { Link } from 'react-router-dom'
import { categories } from '../data/categories'

export default function Categories() {
  return (
    <section className="py-14 lg:py-20">
      <div className="container-site">
        <div className="text-center">
          <p className="eyebrow">خرید بر اساس دسته‌بندی</p>
          <h2 className="heading-lg mt-3">قطعه‌ای برای سلیقه شما</h2>
          <p className="mt-3 text-[12px] text-muted sm:text-[12.5px]">
            مجموعه‌های منتخب برای هر مناسبت
          </p>
        </div>

        <div className="mt-10 flex snap-x gap-5 overflow-x-auto pb-3 lg:grid lg:grid-cols-7 lg:gap-6 lg:overflow-visible lg:pb-0">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/shop?category=${category.slug}`}
              className="group flex shrink-0 snap-start flex-col items-center gap-3"
            >
              <span className="block h-[104px] w-[104px] overflow-hidden rounded-full bg-cream ring-1 ring-line/80 transition-all duration-500 ease-smooth group-hover:ring-gold/70 sm:h-[118px] sm:w-[118px] lg:h-[128px] lg:w-[128px]">
                <img
                  src={category.image}
                  alt={category.label}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.06]"
                />
              </span>
              <span className="text-[11.5px] text-ink transition-colors group-hover:text-gold sm:text-[12px]">
                {category.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
