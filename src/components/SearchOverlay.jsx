import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { products } from '../data/products'
import { formatPrice } from '../lib/format'
import { IconClose, IconSearch } from './Icons'

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore()
  const [term, setTerm] = useState('')
  const inputRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    setSearchOpen(false)
    setTerm('')
  }, [pathname, setSearchOpen])

  useEffect(() => {
    if (!searchOpen) return
    const timer = setTimeout(() => inputRef.current?.focus(), 80)
    const onKey = (event) => {
      if (event.key === 'Escape') setSearchOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      clearTimeout(timer)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [searchOpen, setSearchOpen])

  const results = useMemo(() => {
    const q = term.trim()
    if (!q) return []
    return products.filter((p) =>
      [p.name, p.latin, p.material].join(' ').toLowerCase().includes(q.toLowerCase()),
    )
  }, [term])

  if (!searchOpen) return null

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-ink/35" onClick={() => setSearchOpen(false)} />
      <div className="relative mx-auto w-full max-w-site px-4 pt-6 sm:pt-10">
        <div className="animate-fade-up bg-ivory p-5 shadow-2xl sm:p-7">
          <div className="flex items-center justify-between">
            <h2 className="text-[13px] tracking-[0.05em] text-ink">جست‌وجو در جواهرات</h2>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              aria-label="بستن جست‌وجو"
              className="text-muted transition-colors hover:text-ink"
            >
              <IconClose size={20} />
            </button>
          </div>

          <div className="mt-4 flex items-center gap-3 border-b border-line pb-3">
            <IconSearch size={19} className="text-muted" />
            <input
              ref={inputRef}
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="نام قطعه، دسته‌بندی یا جنس…"
              className="w-full bg-transparent text-[13px] text-ink outline-none placeholder:text-muted/80"
              aria-label="عبارت جست‌وجو"
            />
          </div>

          <div className="mt-4 max-h-[52vh] overflow-y-auto">
            {!term.trim() && (
              <p className="py-6 text-center text-[12px] text-muted">
                برای دیدن نتیجه، نام قطعه یا دسته‌بندی را بنویسید.
              </p>
            )}
            {term.trim() && results.length === 0 && (
              <p className="py-6 text-center text-[12px] text-muted">
                قطعه‌ای با این عبارت پیدا نشد.
              </p>
            )}
            {results.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.slug}`}
                onClick={() => setSearchOpen(false)}
                className="flex items-center gap-4 border-b border-line/60 py-3 transition-colors hover:bg-cream/60"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-14 w-16 object-cover"
                  loading="lazy"
                />
                <div className="flex-1">
                  <p className="text-[12.5px] text-ink">{product.name}</p>
                  <p className="mt-1 text-[10.5px] text-muted">{product.latin}</p>
                </div>
                <span className="text-[11.5px] text-ink">{formatPrice(product.price)}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
