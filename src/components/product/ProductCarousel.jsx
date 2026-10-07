import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard.jsx';
import { classNames } from '../../lib/format.js';

export default function ProductCarousel({ products, className = '' }) {
  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const node = trackRef.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    setAtStart(node.scrollLeft <= 4);
    setAtEnd(node.scrollLeft >= max - 4);
  }, []);

  useEffect(() => {
    sync();
    const node = trackRef.current;
    if (!node) return undefined;
    node.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      node.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync, products.length]);

  const scrollBy = (direction) => {
    const node = trackRef.current;
    if (!node) return;
    const step = Math.max(node.clientWidth * 0.8, 260);
    node.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  const navButton =
    'inline-flex h-11 w-11 items-center justify-center rounded-full border bg-white text-ink transition-all duration-300';

  return (
    <div className={classNames('relative', className)}>
      <div className="mb-8 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          disabled={atStart}
          aria-label="Previous products"
          className={classNames(
            navButton,
            atStart ? 'border-ink/10 text-ink/30' : 'border-ink/15 hover:border-burgundy hover:text-burgundy',
          )}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          disabled={atEnd}
          aria-label="Next products"
          className={classNames(
            navButton,
            atEnd ? 'border-ink/10 text-ink/30' : 'border-ink/15 hover:border-burgundy hover:text-burgundy',
          )}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <ul
        ref={trackRef}
        className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-2"
        aria-label="Product carousel"
      >
        {products.map((product) => (
          <li
            key={product.id}
            className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[31%] xl:w-[23.5%]"
          >
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
