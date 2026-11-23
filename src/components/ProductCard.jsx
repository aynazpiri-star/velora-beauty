import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { price } from '../utils/format'
import ProductVisual from './ProductVisual'

export default function ProductCard({ product }) {
  const { add } = useCart()

  return (
    <article className="p-card">
      <div className="p-card__media">
        <Link to={`/product/${product.id}`} aria-label={product.name}>
          <ProductVisual product={product} />
        </Link>
        {product.tag && <span className="p-card__tag">{product.tag}</span>}
        <button
          type="button"
          className="p-card__add"
          onClick={() => add(product)}
        >
          افزودن به سبد
        </button>
      </div>

      <div className="p-card__body">
        <div>
          <Link to={`/product/${product.id}`} className="p-card__name">
            {product.name}
          </Link>
          <span className="p-card__ref">
            {product.category} · {product.ref}
          </span>
        </div>
        <span className="p-card__price">{price(product.price)}</span>
      </div>
    </article>
  )
}
