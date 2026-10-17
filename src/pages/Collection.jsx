import { useMemo, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import QuickView from '../components/product/QuickView'
import ProductGrid from '../components/product/ProductGrid'
import Button from '../components/ui/Button'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import { CATEGORIES, FAMILY_LABELS, IMG, collectionProducts } from '../data/products'
import { classNames } from '../lib/classNames'
import { toFaNumber } from '../lib/format'

export default function Collection() {
  const { slug } = useParams()
  const category = CATEGORIES.find((item) => item.slug === slug)
  const [familyFilter, setFamilyFilter] = useState('all')
  const [sort, setSort] = useState('featured')
  const [quickView, setQuickView] = useState(null)

  const base = useMemo(() => collectionProducts(slug), [slug])

  const results = useMemo(() => {
    const filtered = base.filter((p) => familyFilter === 'all' || p.family === familyFilter)
    if (sort === 'price-asc') return [...filtered].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') return [...filtered].sort((a, b) => b.price - a.price)
    return filtered
  }, [base, familyFilter, sort])

  if (!category) return <Navigate to="/collections" replace />

  const families = [...new Set(base.map((p) => p.family))]

  return (
    <>
      <PageHero
        eyebrow="کالکشن AURA"
        title={category.title}
        subtitle={category.subtitle}
        image={category.image}
        breadcrumb={[{ label: 'مجموعه‌ها', to: '/collections' }, { label: category.title }]}
      >
        <p className="tnum mt-6 text-[12.5px] text-champagne">
          {toFaNumber(base.length)} عطر در این مجموعه
        </p>
      </PageHero>

      <section className="bg-ivory py-12 sm:py-16">
        <div className="container-x">
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setFamilyFilter('all')}
              className={classNames(
                'rounded-full border px-4 py-2 text-[12px] transition',
                familyFilter === 'all'
                  ? 'border-ink bg-ink text-white'
                  : 'border-ivory-line bg-white text-ink hover:border-ink',
              )}
            >
              همه‌ی رایحه‌ها
            </button>
            {families.map((family) => (
              <button
                key={family}
                type="button"
                onClick={() => setFamilyFilter(family)}
                className={classNames(
                  'rounded-full border px-4 py-2 text-[12px] transition',
                  familyFilter === family
                    ? 'border-ink bg-ink text-white'
                    : 'border-ivory-line bg-white text-ink hover:border-ink',
                )}
              >
                {FAMILY_LABELS[family]}
              </button>
            ))}

            <label className="ms-auto flex items-center gap-2 rounded-full border border-ivory-line bg-white px-4 py-2 text-[12px]">
              <span className="text-ink-muted">ترتیب:</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="bg-transparent text-ink outline-none"
                aria-label="ترتیب نمایش"
              >
                <option value="featured">پیشنهاد AURA</option>
                <option value="price-asc">ارزان‌ترین</option>
                <option value="price-desc">گران‌ترین</option>
              </select>
            </label>
          </div>

          {results.length === 0 ? (
            <div className="rounded-[26px] border border-dashed border-ivory-line bg-white px-6 py-16 text-center">
              <h2 className="text-[16px] font-semibold text-ink">
                در این مجموعه با این فیلتر عطری نیست
              </h2>
              <p className="mx-auto mt-3 max-w-md text-[12.5px] leading-7 text-ink-muted">
                فیلتر رایحه را بردار یا کالکشن دیگری را ببین.
              </p>
              <Button variant="primary" className="mt-6" onClick={() => setFamilyFilter('all')}>
                نمایش همه‌ی این مجموعه
              </Button>
            </div>
          ) : (
            <Reveal>
              <ProductGrid products={results} onQuickView={setQuickView} />
            </Reveal>
          )}
        </div>
      </section>

      <QuickView product={quickView} onClose={() => setQuickView(null)} />
    </>
  )
}
