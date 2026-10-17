import { useMemo, useState } from 'react'
import { ArrowLeft, SlidersHorizontal, X } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import QuickView from '../components/product/QuickView'
import ProductGrid from '../components/product/ProductGrid'
import Button from '../components/ui/Button'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import { FAMILY_LABELS, IMG, collectionProducts, products } from '../data/products'
import { classNames } from '../lib/classNames'
import { toFaNumber } from '../lib/format'

const SCOPES = [
  { value: 'all', label: 'همه عطرها' },
  { value: 'women', label: 'زنانه' },
  { value: 'men', label: 'مردانه' },
  { value: 'unisex', label: 'یونیسکس' },
  { value: 'daily', label: 'روزانه' },
  { value: 'luxury', label: 'خاص و لوکس' },
  { value: 'gift', label: 'هدیه' },
]

const SORTS = [
  { value: 'featured', label: 'پیشنهاد AURA' },
  { value: 'price-asc', label: 'ارزان‌ترین' },
  { value: 'price-desc', label: 'گران‌ترین' },
  { value: 'name', label: 'ترتیب حروف' },
]

const PRICE_BANDS = [
  { value: 'all', label: 'همه‌ی قیمت‌ها', test: () => true },
  { value: 'under-3', label: 'زیر ۳ میلیون', test: (p) => p.price < 3000000 },
  { value: '3-3.5', label: '۳ تا ۳٫۵ میلیون', test: (p) => p.price >= 3000000 && p.price < 3500000 },
  { value: 'over-3.5', label: 'بالای ۳٫۵ میلیون', test: (p) => p.price >= 3500000 },
]

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const [term, setTerm] = useState(params.get('q') ?? '')
  const [scope, setScope] = useState(params.get('collection') ?? 'all')
  const [family, setFamily] = useState('all')
  const [band, setBand] = useState('all')
  const [sort, setSort] = useState('featured')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [quickView, setQuickView] = useState(null)

  const results = useMemo(() => {
    const normalized = term.trim().toLowerCase()
    const base = collectionProducts(scope)

    const filtered = base.filter((product) => {
      if (family !== 'all' && product.family !== family) return false
      const priceBand = PRICE_BANDS.find((b) => b.value === band) ?? PRICE_BANDS[0]
      if (!priceBand.test(product)) return false
      if (!normalized) return true
      return [product.name, product.nameEn, product.tagline, ...product.notes]
        .join(' ')
        .toLowerCase()
        .includes(normalized)
    })

    switch (sort) {
      case 'price-asc':
        return [...filtered].sort((a, b) => a.price - b.price)
      case 'price-desc':
        return [...filtered].sort((a, b) => b.price - a.price)
      case 'name':
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name, 'fa'))
      default:
        return [...filtered].sort(
          (a, b) => Number(b.tags.includes('bestseller')) - Number(a.tags.includes('bestseller')),
        )
    }
  }, [term, scope, family, band, sort])

  const resetFilters = () => {
    setTerm('')
    setScope('all')
    setFamily('all')
    setBand('all')
    setSort('featured')
    setParams({})
  }

  const activeCount =
    (scope !== 'all' ? 1 : 0) + (family !== 'all' ? 1 : 0) + (band !== 'all' ? 1 : 0) + (term ? 1 : 0)

  const filterPanel = (
    <div className="space-y-8">
      <fieldset>
        <legend className="eyebrow mb-4 text-ink-muted">دسته‌بندی</legend>
        <ul className="space-y-2">
          {SCOPES.map((item) => (
            <li key={item.value}>
              <label className="flex cursor-pointer items-center gap-3 text-[13px] text-ink">
                <input
                  type="radio"
                  name="scope"
                  checked={scope === item.value}
                  onChange={() => setScope(item.value)}
                  className="h-4 w-4 accent-turquoise"
                />
                {item.label}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset>
        <legend className="eyebrow mb-4 text-ink-muted">خانواده‌ی رایحه</legend>
        <ul className="space-y-2">
          <li>
            <label className="flex cursor-pointer items-center gap-3 text-[13px] text-ink">
              <input
                type="radio"
                name="family"
                checked={family === 'all'}
                onChange={() => setFamily('all')}
                className="h-4 w-4 accent-turquoise"
              />
              همه‌ی رایحه‌ها
            </label>
          </li>
          {Object.entries(FAMILY_LABELS).map(([value, label]) => (
            <li key={value}>
              <label className="flex cursor-pointer items-center gap-3 text-[13px] text-ink">
                <input
                  type="radio"
                  name="family"
                  checked={family === value}
                  onChange={() => setFamily(value)}
                  className="h-4 w-4 accent-turquoise"
                />
                {label}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset>
        <legend className="eyebrow mb-4 text-ink-muted">محدوده‌ی قیمت</legend>
        <ul className="space-y-2">
          {PRICE_BANDS.map((item) => (
            <li key={item.value}>
              <label className="flex cursor-pointer items-center gap-3 text-[13px] text-ink">
                <input
                  type="radio"
                  name="band"
                  checked={band === item.value}
                  onChange={() => setBand(item.value)}
                  className="h-4 w-4 accent-turquoise"
                />
                {item.label}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      {activeCount > 0 && (
        <button
          type="button"
          onClick={resetFilters}
          className="inline-flex items-center gap-2 text-[12.5px] text-ocean underline decoration-dotted underline-offset-4"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
          حذف همه‌ی فیلترها
        </button>
      )}
    </div>
  )

  return (
    <>
      <PageHero
        eyebrow="فروشگاه AURA"
        title="فروشگاه عطر"
        subtitle="کالکشن کامل AURA PARFUMS — با فیلترها، رایحه‌ی مناسب خودت را سریع‌تر پیدا کن."
        image={IMG.seaTexture}
        breadcrumb={[{ label: 'فروشگاه عطر' }]}
      />

      <section className="bg-ivory py-12 sm:py-16">
        <div className="container-x">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <label className="flex items-center gap-3 rounded-full border border-ivory-line bg-white px-5 py-3 lg:max-w-sm">
              <input
                type="search"
                value={term}
                onChange={(event) => {
                  setTerm(event.target.value)
                  setParams(event.target.value ? { q: event.target.value } : {})
                }}
                placeholder="جست‌وجو در فروشگاه…"
                aria-label="جست‌وجو در فروشگاه"
                className="w-full bg-transparent text-[13px] text-ink outline-none placeholder:text-ink-muted/70"
              />
            </label>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setFiltersOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-3 text-[12.5px] text-ink transition hover:border-ink lg:hidden"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
                فیلترها
                {activeCount > 0 && (
                  <span className="tnum rounded-full bg-turquoise px-1.5 text-[10px] text-white">
                    {toFaNumber(activeCount)}
                  </span>
                )}
              </button>

              <label className="flex items-center gap-2 rounded-full border border-ink/15 px-4 py-3 text-[12.5px]">
                <span className="text-ink-muted">ترتیب:</span>
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  className="bg-transparent text-ink outline-none"
                  aria-label="ترتیب نمایش محصولات"
                >
                  {SORTS.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
            <aside className="hidden lg:block">
              <div className="sticky top-28 rounded-[22px] border border-ivory-line bg-white p-6">
                {filterPanel}
              </div>
            </aside>

            <div>
              <p className="mb-6 text-[12.5px] text-ink-muted">
                <span className="tnum font-medium text-ink">{toFaNumber(results.length)}</span> عطر
                یافت شد
              </p>

              {results.length === 0 ? (
                <div className="rounded-[26px] border border-dashed border-ivory-line bg-white px-6 py-16 text-center">
                  <h2 className="text-[16px] font-semibold text-ink">عطری با این فیلترها پیدا نشد</h2>
                  <p className="mx-auto mt-3 max-w-md text-[12.5px] leading-7 text-ink-muted">
                    فیلترها را ساده‌تر کن یا همه‌ی عطرها را ببین تا رایحه‌ی مناسب را پیدا کنی.
                  </p>
                  <Button variant="primary" className="mt-6" onClick={resetFilters}>
                    نمایش همه‌ی عطرها
                  </Button>
                </div>
              ) : (
                <Reveal>
                  <ProductGrid products={results} onQuickView={setQuickView} />
                </Reveal>
              )}

              <div className="mt-12 rounded-[22px] border border-ivory-line bg-white p-6 sm:p-8">
                <p className="eyebrow mb-2 text-turquoise-dark">کمک می‌خواهی؟</p>
                <h2 className="text-[16px] font-semibold text-ink">
                  مطمئن نیستی کدام رایحه مناسب توست؟
                </h2>
                <p className="mt-2 max-w-xl text-[12.5px] leading-7 text-ink-muted">
                  آزمون کوتاه رایحه‌شناسی AURA را انجام بده یا ست تست را امتحان کن.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button variant="ocean" to="/" size="sm">
                    آزمون رایحه‌شناسی
                  </Button>
                  <Link
                    to="/gift-sets"
                    className="link-underline inline-flex items-center gap-2 self-center text-[12.5px] text-ocean"
                  >
                    ست‌های تست و هدیه
                    <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile filter drawer */}
      <div
        className={classNames('fixed inset-0 z-[72] lg:hidden', filtersOpen ? 'pointer-events-auto' : 'pointer-events-none')}
        aria-hidden={!filtersOpen}
      >
        <div
          className={classNames(
            'absolute inset-0 bg-ocean-ink/70 backdrop-blur-sm transition-opacity',
            filtersOpen ? 'opacity-100' : 'opacity-0',
          )}
          onClick={() => setFiltersOpen(false)}
        />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="فیلترهای فروشگاه"
          className={classNames(
            'absolute inset-y-0 end-0 w-[88%] max-w-[360px] overflow-y-auto bg-ivory p-6 transition-transform duration-500',
            filtersOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-[15px] font-semibold text-ink">فیلترها</h2>
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              className="rounded-full p-2 text-ink transition hover:bg-ink/5"
              aria-label="بستن فیلترها"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          {filterPanel}
          <Button
            variant="primary"
            className="mt-8 w-full"
            onClick={() => setFiltersOpen(false)}
          >
            نمایش {toFaNumber(results.length)} عطر
          </Button>
        </aside>
      </div>

      <QuickView product={quickView} onClose={() => setQuickView(null)} />
    </>
  )
}
