import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useStore } from '../context/StoreContext'
import { findProduct } from '../data/products'
import { toFa } from '../lib/format'
import { IconHeart } from '../components/Icons'

export default function Wishlist() {
  const { wishlist } = useStore()
  const items = wishlist.map((id) => findProduct(id)).filter(Boolean)

  return (
    <div className="container-site py-10 lg:py-14">
      <nav aria-label="مسیر" className="text-[10.5px] text-muted">
        <Link to="/" className="hover:text-gold">
          خانه
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">علاقه‌مندی‌ها</span>
      </nav>

      <div className="mt-5">
        <p className="eyebrow">علاقه‌مندی‌ها</p>
        <h1 className="heading-lg mt-3">قطعه‌های نشان‌شده</h1>
        <p className="mt-2 text-[11.5px] text-muted">{toFa(items.length)} قطعه ذخیره شده</p>
      </div>

      {items.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-4 border border-line/70 bg-cream/40 py-16 text-center">
          <IconHeart size={34} className="text-gold/70" />
          <p className="text-[13px] text-ink">هنوز قطعه‌ای را نشان نکرده‌اید</p>
          <p className="max-w-sm text-[11.5px] leading-7 text-muted">
            با انتخاب آیکون قلب روی هر محصول، آن را برای بعد ذخیره کنید.
          </p>
          <Link to="/shop" className="btn-outline mt-2">
            مشاهده جواهرات
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
