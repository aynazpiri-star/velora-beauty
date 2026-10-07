import ProductCard from './ProductCard.jsx';
import { classNames } from '../../lib/format.js';

export default function ProductGrid({ products, columns = 4, className = '', emptyMessage = 'No products found.' }) {
  const columnClasses = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  if (!products.length) {
    return (
      <div className="rounded-xl2 border border-dashed border-ink/15 bg-cream px-6 py-20 text-center">
        <p className="font-serif text-xl text-ink">{emptyMessage}</p>
        <p className="mt-3 text-sm text-ink/55">Try adjusting your filters to see more products.</p>
      </div>
    );
  }

  return (
    <div className={classNames('grid gap-5 sm:gap-6 lg:gap-7', columnClasses[columns] ?? columnClasses[4], className)}>
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} eager={index < 4} />
      ))}
    </div>
  );
}
