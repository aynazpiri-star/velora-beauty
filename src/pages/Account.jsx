import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { toFa } from '../lib/format'

export default function Account() {
  const { wishlist, cartCount } = useStore()

  return (
    <div className="container-site py-10 lg:py-14">
      <nav aria-label="مسیر" className="text-[10.5px] text-muted">
        <Link to="/" className="hover:text-gold">
          خانه
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">حساب کاربری</span>
      </nav>

      <div className="mt-6 max-w-lg">
        <p className="eyebrow">حساب کاربری</p>
        <h1 className="heading-lg mt-3">خوش آمدید</h1>
        <p className="mt-4 text-[12.5px] leading-8 text-muted">
          ورود و ثبت‌نام کاربران در این نسخه نمایشی فعال نیست. سبد خرید و علاقه‌مندی‌های شما در
          همین مرورگر ذخیره می‌شوند.
        </p>

        <dl className="mt-7 divide-y divide-line/70 border-y border-line/70 text-[11.5px]">
          <div className="flex items-center justify-between py-3">
            <dt className="text-muted">قطعه‌های سبد خرید</dt>
            <dd className="text-ink">{toFa(cartCount)}</dd>
          </div>
          <div className="flex items-center justify-between py-3">
            <dt className="text-muted">علاقه‌مندی‌ها</dt>
            <dd className="text-ink">{toFa(wishlist.length)}</dd>
          </div>
        </dl>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link to="/cart" className="btn-gold">
            مشاهده سبد خرید
          </Link>
          <Link to="/wishlist" className="btn-outline">
            علاقه‌مندی‌ها
          </Link>
        </div>
      </div>
    </div>
  )
}
