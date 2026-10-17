import { Heart } from 'lucide-react'
import { useStore } from '../../context/StoreContext'
import { classNames } from '../../lib/classNames'

/** Round heart toggle — reads/writes the shared wishlist state. */
export default function WishlistButton({ productId, productName, tone = 'light', className }) {
  const { isWishlisted, toggleWishlist } = useStore()
  const active = isWishlisted(productId)

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        toggleWishlist(productId)
      }}
      aria-pressed={active}
      aria-label={active ? `حذف ${productName} از علاقه‌مندی‌ها` : `افزودن ${productName} به علاقه‌مندی‌ها`}
      className={classNames(
        'flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-300',
        active
          ? 'border-transparent bg-turquoise text-white'
          : tone === 'light'
            ? 'border-white/40 bg-white/80 text-ink hover:border-turquoise hover:text-turquoise-dark'
            : 'border-ink/15 bg-white text-ink hover:border-turquoise hover:text-turquoise-dark',
        className,
      )}
    >
      <Heart className={classNames('h-4 w-4', active && 'fill-current')} aria-hidden="true" />
    </button>
  )
}
