import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { CATEGORIES, FAMILY_LABELS, products } from '../../data/products'
import { useStore } from '../../context/StoreContext'
import { useEscape, useLockBodyScroll } from '../../hooks/useOverlay'
import { classNames } from '../../lib/classNames'
import { toFaNumber } from '../../lib/format'
import SafeImage from '../ui/SafeImage'

const matchProduct = (product, term) => {
  const haystack = [
    product.name,
    product.nameEn,
    product.tagline,
    FAMILY_LABELS[product.family] ?? '',
    ...product.notes,
  ]
    .join(' ')
    .toLowerCase()
  return haystack.includes(term)
}

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore()
  const [term, setTerm] = useState('')
  const inputRef = useRef(null)

  useLockBodyScroll(searchOpen)
  useEscape(() => setSearchOpen(false), searchOpen)

  useEffect(() => {
    if (searchOpen) {
      const timer = window.setTimeout(() => inputRef.current?.focus(), 120)
      return () => window.clearTimeout(timer)
    }
    setTerm('')
  }, [searchOpen])

  const normalized = term.trim().toLowerCase()
  const results = useMemo(
    () => (normalized.length < 2 ? [] : products.filter((p) => matchProduct(p, normalized)).slice(0, 6)),
    [normalized],
  )

  return (
    <div
      className={classNames(
        'fixed inset-0 z-[75]',
        searchOpen ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      aria-hidden={!searchOpen}
    >
      <div
        className={classNames(
          'absolute inset-0 bg-ocean-ink/75 backdrop-blur-md transition-opacity duration-300',
          searchOpen ? 'opacity-100' : 'opacity-0',
        )}
        onClick={() => setSearchOpen(false)}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="جست‌وجو در فروشگاه"
        className={classNames(
          'absolute inset-x-0 top-0 max-h-[88vh] overflow-y-auto bg-ivory shadow-2xl transition-transform duration-500 ease-out',
          searchOpen ? 'translate-y-0' : '-translate-y-full',
        )}
      >
        <div className="container-x py-6">
          <div className="flex items-center gap-4">
            <label className="flex flex-1 items-center gap-3 rounded-full border border-ivory-line bg-white px-4 py-3">
              <Search className="h-4 w-4 shrink-0 text-ocean" aria-hidden="true" />
              <input
                ref={inputRef}
                value={term}
                onChange={(event) => setTerm(event.target.value)}
                type="search"
                placeholder="نام عطر، نت رایحه یا خانواده‌ی بویایی…"
                aria-label="عبارت جست‌وجو"
                className="w-full bg-transparent text-[14px] text-ink outline-none placeholder:text-ink-muted/70"
              />
            </label>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="rounded-full p-2.5 text-ink transition hover:bg-ink/5"
              aria-label="بستن جست‌وجو"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {normalized.length >= 2 ? (
            <div className="mt-6">
              <p className="eyebrow mb-3 text-ink-muted">
                {results.length > 0 ? `${toFaNumber(results.length)} نتیجه` : 'نتیجه‌ای یافت نشد'}
              </p>

              {results.length === 0 ? (
                <div className="rounded-2xl border border-ivory-line bg-white p-8 text-center">
                  <p className="text-[14px] font-medium text-ink">
                    برای «{term}» عطری پیدا نشد
                  </p>
                  <p className="mt-2 text-[12.5px] leading-6 text-ink-muted">
                    می‌توانید نام خانوادگی رایحه (مثل «گلی» یا «چوبی») یا یکی از نت‌ها را جست‌وجو کنید.
                  </p>
                </div>
              ) : (
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {results.map((product) => (
                    <li key={product.id}>
                      <Link
                        to={`/product/${product.slug}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-3 rounded-2xl border border-ivory-line bg-white p-3 transition hover:border-turquoise hover:shadow-soft"
                      >
                        <SafeImage
                          src={product.image}
                          alt={product.name}
                          wrapperClassName="h-[68px] w-[56px] shrink-0 rounded-xl"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[13.5px] font-semibold text-ink">
                            {product.name}
                          </span>
                          <span className="block truncate text-[11px] text-ink-muted">
                            {product.nameEn} · {FAMILY_LABELS[product.family]}
                          </span>
                          <span className="tnum mt-1 block text-[12px] text-ocean">
                            {toFaNumber(product.price)} تومان
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="eyebrow mb-3 text-ink-muted">دسته‌بندی‌های محبوب</p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((category) => (
                    <Link
                      key={category.slug}
                      to={category.slug === 'gift' ? '/gift-sets' : `/collections/${category.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="rounded-full border border-ivory-line bg-white px-4 py-2 text-[12px] text-ink transition hover:border-turquoise hover:text-turquoise-dark"
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="eyebrow mb-3 text-ink-muted">جست‌وجوهای پیشنهادی</p>
                <div className="flex flex-wrap gap-2">
                  {['دریایی', 'گلی', 'چوبی', 'شیرین', 'ادوپرفیوم', 'ست تست'].map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => setTerm(suggestion)}
                      className="rounded-full bg-ivory-deep px-4 py-2 text-[12px] text-ink transition hover:bg-champagne/60"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
