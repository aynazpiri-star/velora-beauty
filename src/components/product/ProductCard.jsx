import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, ShoppingBag } from 'lucide-react';
import SafeImage from '../ui/SafeImage.jsx';
import Rating from '../ui/Rating.jsx';
import Badge from '../ui/Badge.jsx';
import WishlistButton from './WishlistButton.jsx';
import { useStore } from '../../context/StoreContext.jsx';
import { categoryName } from '../../data/products.js';
import { classNames, currency } from '../../lib/format.js';

export default function ProductCard({ product, className = '', eager = false }) {
  const { addToCart, openQuickView, pushToast } = useStore();
  const [adding, setAdding] = useState(false);

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAdd = () => {
    addToCart(product, 1);
    setAdding(true);
    window.setTimeout(() => setAdding(false), 380);
  };

  return (
    <article
      className={classNames(
        'group relative flex h-full flex-col overflow-hidden rounded-xl2 border border-ink/[0.06] bg-white shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card',
        className,
      )}
    >
      <div className="relative">
        <Link to={`/product/${product.slug}`} aria-label={product.name} className="block">
          <SafeImage
            src={product.images[0]}
            alt={product.name}
            eager={eager}
            wrapperClassName="aspect-[4/5]"
            className="h-full w-full object-cover zoom-img"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>

        <div className="pointer-events-none absolute left-4 top-4 flex flex-col gap-2">
          {discount > 0 ? <Badge tone="rose">Save {discount}%</Badge> : null}
          {product.newArrival && !discount ? <Badge tone="light">New</Badge> : null}
        </div>

        <div className="absolute right-4 top-4">
          <WishlistButton product={product} />
        </div>

        <div className="absolute inset-x-4 bottom-4 flex translate-y-3 justify-center opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => openQuickView(product.id)}
            className="inline-flex items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.14em] text-ink shadow-soft backdrop-blur-sm transition-colors hover:bg-ink hover:text-cream"
          >
            <Eye size={14} strokeWidth={1.7} /> Quick view
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-rose">
          {categoryName(product.category)}
        </p>

        <h3 className="mt-2 font-serif text-[17px] leading-snug">
          <Link to={`/product/${product.slug}`} className="transition-colors hover:text-burgundy">
            {product.name}
          </Link>
        </h3>

        <Rating value={product.rating} reviewCount={product.reviewCount} className="mt-2.5" />

        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-serif text-[19px] text-ink">{currency(product.price)}</span>
          {product.oldPrice ? (
            <span className="text-[13px] text-ink/40 line-through">{currency(product.oldPrice)}</span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className={classNames(
            'mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md border px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] transition-all duration-300',
            adding
              ? 'border-burgundy bg-burgundy text-cream animate-pop'
              : 'border-ink/15 bg-transparent text-ink hover:border-burgundy hover:bg-burgundy hover:text-cream',
          )}
        >
          <ShoppingBag size={15} strokeWidth={1.7} />
          {adding ? 'Added' : 'Add to cart'}
        </button>

        <button
          type="button"
          className="mt-3 self-start text-[12px] text-ink/45 transition-colors hover:text-burgundy sm:hidden"
          onClick={() => {
            openQuickView(product.id);
            pushToast('Quick view opened');
          }}
        >
          Quick view
        </button>
      </div>
    </article>
  );
}
