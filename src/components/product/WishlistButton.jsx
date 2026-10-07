import { Heart } from 'lucide-react';
import { useStore } from '../../context/StoreContext.jsx';
import { classNames } from '../../lib/format.js';

export default function WishlistButton({ product, className = '', size = 16, showLabel = false }) {
  const { toggleWishlist, isWishlisted } = useStore();
  const active = isWishlisted(product.id);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
      }}
      aria-pressed={active}
      aria-label={active ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
      className={classNames(
        'inline-flex items-center gap-2 transition-all duration-300',
        showLabel
          ? 'rounded-md border border-ink/20 px-6 py-3 text-sm hover:border-burgundy hover:text-burgundy'
          : 'h-9 w-9 justify-center rounded-full border border-ink/10 bg-white/90 backdrop-blur-sm hover:border-burgundy hover:text-burgundy',
        active && !showLabel && 'border-burgundy text-burgundy',
        active && showLabel && 'border-burgundy text-burgundy',
        className,
      )}
    >
      <Heart
        size={size}
        strokeWidth={1.7}
        className={classNames('transition-transform duration-300', active && 'scale-110 fill-burgundy')}
      />
      {showLabel ? <span>{active ? 'Saved to wishlist' : 'Add to wishlist'}</span> : null}
    </button>
  );
}
