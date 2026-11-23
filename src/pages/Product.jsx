import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import ProductVisual from '../components/ProductVisual'
import Reveal from '../components/Reveal'
import { getProduct, products } from '../data/products'
import { useCart } from '../context/CartContext'
import { fa, price } from '../utils/format'

export default function Product() {
  const { id } = useParams()
  const product = getProduct(id)
  const { add } = useCart()
  const [qty, setQty] = useState(1)

  if (!product) {
    return (
      <div className="wrap page-head">
        <span className="eyebrow">ولورا</span>
        <h1>این ساعت پیدا نشد</h1>
        <p>
          ممکن است این قطعه از مجموعه خارج شده باشد.{' '}
          <Link to="/shop" style={{ borderBottom: '1px solid currentColor' }}>
            بازگشت به فروشگاه
          </Link>
        </p>
      </div>
    )
  }

  const related = products.filter((item) => item.id !== product.id).slice(0, 3)

  return (
    <div className="wrap">
      <div className="pdp">
        <div className="pdp__media">
          <ProductVisual product={product} />
        </div>

        <div className="pdp__info">
          <nav className="crumbs" aria-label="مسیر صفحه">
            <Link to="/">خانه</Link>
            <span>/</span>
            <Link to="/shop">فروشگاه</Link>
            <span>/</span>
            <span>{product.name}</span>
          </nav>

          <h1>{product.name}</h1>
          <span className="pdp__ref">
            {product.category} · {product.ref}
          </span>
          <p className="pdp__price">{price(product.price)}</p>
          <p className="pdp__desc">{product.description}</p>

          <dl className="pdp__specs">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key}>
                <dt>{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <div className="pdp__buy">
            <div className="qty">
              <button
                type="button"
                onClick={() => setQty((value) => Math.max(1, value - 1))}
                aria-label="کاهش تعداد"
              >
                −
              </button>
              <output>{fa(qty)}</output>
              <button
                type="button"
                onClick={() => setQty((value) => value + 1)}
                aria-label="افزایش تعداد"
              >
                +
              </button>
            </div>
            <button
              type="button"
              className="btn"
              onClick={() => add(product, qty)}
            >
              افزودن به سبد خرید
            </button>
          </div>

          <div className="pdp__note">
            <span>ارسال رایگان و بیمه‌شده</span>
            <span>گارانتی پنج‌سالهٔ ولورا</span>
            <span>بازگشت تا ۱۴ روز</span>
          </div>
        </div>
      </div>

      <section className="section" style={{ paddingTop: 0 }}>
        <Reveal className="section-head">
          <div className="section-head__text">
            <span className="eyebrow">پیشنهاد ولورا</span>
            <h2 className="section-title">هم‌نشین‌های این ساعت</h2>
          </div>
        </Reveal>
        <div className="shop-grid">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  )
}
