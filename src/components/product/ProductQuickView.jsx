import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import Modal from '../ui/Modal.jsx';
import SafeImage from '../ui/SafeImage.jsx';
import Rating from '../ui/Rating.jsx';
import Button from '../ui/Button.jsx';
import WishlistButton from './WishlistButton.jsx';
import { useStore } from '../../context/StoreContext.jsx';
import { PRODUCTS, categoryName } from '../../data/products.js';
import { currency } from '../../lib/format.js';

export default function ProductQuickView() {
  const { quickViewId, closeQuickView, addToCart, openCart } = useStore();
  const [qty, setQty] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);

  const product = useMemo(
    () => PRODUCTS.find((p) => p.id === quickViewId) ?? null,
    [quickViewId],
  );

  if (!product) return null;

  const activeImage = product.images[imageIndex] ?? product.images[0];

  return (
    <Modal open onClose={closeQuickView} title={product.name}>
      <div className="grid gap-0 md:grid-cols-2">
        <div className="bg-sand">
          <SafeImage
            src={activeImage}
            alt={product.name}
            eager
            wrapperClassName="aspect-square"
            className="h-full w-full object-cover"
          />
          {product.images.length > 1 ? (
            <div className="flex gap-2 p-4">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setImageIndex(i)}
                  aria-label={`View image ${i + 1}`}
                  aria-pressed={i === imageIndex}
                  className={`h-14 w-14 overflow-hidden rounded-md border ${
                    i === imageIndex ? 'border-burgundy' : 'border-ink/10'
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="p-6 sm:p-8">
          <p className="eyebrow">{categoryName(product.category)}</p>
          <h3 className="mt-3 font-serif text-[26px] leading-tight">{product.name}</h3>
          <Rating value={product.rating} reviewCount={product.reviewCount} className="mt-3" />

          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-serif text-[24px]">{currency(product.price)}</span>
            {product.oldPrice ? (
              <span className="text-sm text-ink/40 line-through">{currency(product.oldPrice)}</span>
            ) : null}
            <span className="text-[12px] text-ink/50">{product.size}</span>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-ink/70">{product.shortDescription}</p>

          {product.skinType?.length ? (
            <dl className="mt-5 grid grid-cols-[7rem_1fr] gap-y-2 text-[13px]">
              <dt className="text-ink/50">Skin type</dt>
              <dd className="text-ink/80">{product.skinType.join(', ')}</dd>
            </dl>
          ) : null}

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center rounded-md border border-ink/15">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="inline-flex h-11 w-11 items-center justify-center text-ink/70 transition-colors hover:text-burgundy"
              >
                <Minus size={15} />
              </button>
              <span className="w-8 text-center text-sm" aria-live="polite">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
                className="inline-flex h-11 w-11 items-center justify-center text-ink/70 transition-colors hover:text-burgundy"
              >
                <Plus size={15} />
              </button>
            </div>

            <Button
              onClick={() => {
                addToCart(product, qty);
                closeQuickView();
                openCart();
              }}
            >
              <ShoppingBag size={16} strokeWidth={1.8} /> Add to cart
            </Button>

            <WishlistButton product={product} className="h-11 w-11" size={17} />
          </div>

          <Link
            to={`/product/${product.slug}`}
            onClick={closeQuickView}
            className="link-underline mt-6 inline-flex"
          >
            View full details →
          </Link>
        </div>
      </div>
    </Modal>
  );
}
