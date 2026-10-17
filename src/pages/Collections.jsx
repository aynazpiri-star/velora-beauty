import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import SafeImage from '../components/ui/SafeImage'
import { CATEGORIES, IMG, collectionProducts } from '../data/products'
import { toFaNumber } from '../lib/format'

export default function Collections() {
  return (
    <>
      <PageHero
        eyebrow="کالکشن‌ها"
        title="دسته‌بندی عطرها"
        subtitle="AURA را بر اساس سلیقه، فصل یا موقعیت انتخاب کن. هر مجموعه، یک حال‌وهوای متفاوت دارد."
        image={IMG.oceanRocks}
        breadcrumb={[{ label: 'مجموعه‌ها' }]}
      />

      <section className="bg-ivory py-14 sm:py-20">
        <div className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category, index) => {
            const count = collectionProducts(category.slug).length
            const to = category.slug === 'gift' ? '/gift-sets' : `/collections/${category.slug}`
            return (
              <Reveal key={category.slug} delay={index * 60}>
                <Link
                  to={to}
                  className="group relative block overflow-hidden rounded-[24px] border border-ivory-line bg-white"
                >
                  <SafeImage
                    src={category.image}
                    alt={category.title}
                    wrapperClassName="aspect-[5/4] w-full"
                    className="transition-transform duration-[900ms] ease-out group-hover:scale-105"
                  />
                  <div className="flex items-center justify-between gap-4 p-5">
                    <div>
                      <h2 className="text-[15px] font-semibold text-ink">{category.title}</h2>
                      <p className="mt-1 text-[11.5px] text-ink-muted">{category.subtitle}</p>
                      <p className="tnum mt-2 text-[11px] text-turquoise-dark">
                        {toFaNumber(count)} عطر
                      </p>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-300 group-hover:border-turquoise group-hover:bg-turquoise group-hover:text-white">
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>
    </>
  )
}
