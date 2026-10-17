import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CATEGORIES } from '../../data/products'
import Reveal from '../ui/Reveal'
import SafeImage from '../ui/SafeImage'
import SectionHeading from '../ui/SectionHeading'

/** Six fragrance categories — horizontal scroller on mobile, grid on desktop. */
export default function CategorySection() {
  return (
    <section className="bg-ivory-deep py-16 sm:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="خرید بر اساس سلیقه"
          title="دسته‌بندی رایحه‌ها"
          subtitle="از رایحه‌های دریایی و خنک تا چوبی و شرقی؛ مسیر خودت را انتخاب کن."
          action={
            <Link
              to="/collections"
              className="link-underline inline-flex items-center gap-2 text-[12.5px] text-ocean"
            >
              مشاهده‌ی همه‌ی مجموعه‌ها
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          }
        />

        <ul className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-6">
          {CATEGORIES.map((category, index) => {
            const to = category.slug === 'gift' ? '/gift-sets' : `/collections/${category.slug}`
            return (
              <Reveal
                key={category.slug}
                delay={index * 60}
                as="li"
                className="w-[190px] shrink-0 snap-start sm:w-auto"
              >
                <Link
                  to={to}
                  className="group relative block h-full overflow-hidden rounded-[22px] bg-ocean-ink"
                >
                  <SafeImage
                    src={category.image}
                    alt={category.title}
                    wrapperClassName="aspect-[4/5] w-full"
                    className="opacity-85 transition-all duration-[900ms] ease-out group-hover:scale-110 group-hover:opacity-100"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ocean-ink/92 via-ocean-ink/25 to-transparent"
                  />
                  <span className="absolute inset-x-4 bottom-4 block">
                    <span className="block text-[14px] font-semibold text-white">
                      {category.title}
                    </span>
                    <span className="mt-1 block text-[11px] leading-5 text-white/65">
                      {category.subtitle}
                    </span>
                    <span className="mt-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 group-hover:border-champagne group-hover:bg-champagne group-hover:text-ocean-ink">
                      <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
