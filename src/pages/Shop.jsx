import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import { categories, products } from '../data/products'
import { fa } from '../utils/format'

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const query = (params.get('q') || '').trim()
  const catParam = params.get('cat')
  const category = categories.includes(catParam) ? catParam : 'همه'

  const setCategory = (item) => {
    const next = new URLSearchParams(params)
    if (item === 'همه') next.delete('cat')
    else next.set('cat', item)
    setParams(next)
  }

  const visible = useMemo(() => {
    return products.filter((product) => {
      const inCategory = category === 'همه' || product.category === category
      const haystack = `${product.name} ${product.ref} ${product.category}`
      const matchesQuery =
        !query || haystack.toLowerCase().includes(query.toLowerCase())
      return inCategory && matchesQuery
    })
  }, [category, query])

  return (
    <div className="wrap">
      <div className="page-head">
        <span className="eyebrow">فروشگاه ولورا</span>
        <h1>{query ? `نتیجهٔ جستجو برای «${query}»` : 'همهٔ ساعت‌ها'}</h1>
        <p>
          هر ساعت ولورا با ضمانت اصالت، گارانتی پنج‌ساله و ارسال بیمه‌شده به دست
          شما می‌رسد.
        </p>
      </div>

      <div className="chips" aria-label="دسته‌بندی ساعت‌ها">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={category === item}
            className={`chip ${category === item ? 'is-active' : ''}`}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <p className="shop-count">{fa(visible.length)} قطعه</p>

      {visible.length === 0 ? (
        <p className="muted" style={{ paddingBottom: 60 }}>
          ساعتی با این مشخصات پیدا نشد. دستهٔ دیگری را امتحان کنید.
        </p>
      ) : (
        <div className="shop-grid">
          {visible.map((product, index) => (
            <Reveal key={product.id} delay={(index % 3) * 70}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}
