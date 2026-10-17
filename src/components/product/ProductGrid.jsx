import { classNames } from '../../lib/classNames'
import ProductCard from './ProductCard'

/** Responsive catalogue grid. Mobile shows two columns by default. */
export default function ProductGrid({ products, onQuickView, mobileOneColumn = false, className }) {
  return (
    <div
      className={classNames(
        'grid gap-4 sm:gap-5',
        mobileOneColumn ? 'grid-cols-1' : 'grid-cols-2',
        'md:grid-cols-3 lg:grid-cols-4',
        className,
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
      ))}
    </div>
  )
}
