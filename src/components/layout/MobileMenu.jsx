import { Link } from 'react-router-dom'
import { ChevronLeft, Mail, Phone, X } from 'lucide-react'
import { BRAND, NAV } from '../../data/content'
import { CATEGORIES } from '../../data/products'
import { useStore } from '../../context/StoreContext'
import { useEscape, useLockBodyScroll } from '../../hooks/useOverlay'
import { classNames } from '../../lib/classNames'
import Logo from '../ui/Logo'

const SECONDARY = [
  { label: 'فروشگاه عطر', to: '/shop' },
  { label: 'ست‌های هدیه', to: '/gift-sets' },
  { label: 'علاقه‌مندی‌ها', to: '/wishlist' },
  { label: 'سبد خرید', to: '/cart' },
  { label: 'پرسش‌های متداول', to: '/faq' },
  { label: 'قوانین و شرایط', to: '/terms' },
]

export default function MobileMenu() {
  const { menuOpen, setMenuOpen } = useStore()
  useLockBodyScroll(menuOpen)
  useEscape(() => setMenuOpen(false), menuOpen)

  return (
    <div
      className={classNames(
        // Available at every width: the header keeps only the three zones
        // (menu · brand · utilities), so this drawer carries the navigation.
        'fixed inset-0 z-[70]',
        menuOpen ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      aria-hidden={!menuOpen}
    >
      <div
        className={classNames(
          'absolute inset-0 bg-ocean-ink/70 backdrop-blur-sm transition-opacity duration-300',
          menuOpen ? 'opacity-100' : 'opacity-0',
        )}
        onClick={() => setMenuOpen(false)}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="منوی موبایل"
        className={classNames(
          'absolute inset-y-0 start-0 flex w-[86%] max-w-[380px] flex-col bg-ivory shadow-2xl transition-transform duration-500 ease-out',
          // The panel is pinned to the inline-start edge (the right in RTL), so it
          // hides by moving in the +X direction — `translate-x` stays physical.
          menuOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b border-ivory-line px-5 py-4">
          <Logo onClick={() => setMenuOpen(false)} />
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="rounded-full p-2 text-ink transition hover:bg-ink/5"
            aria-label="بستن منو"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6">
          <p className="eyebrow mb-3 text-turquoise-dark">دسته‌بندی‌ها</p>
          <ul className="mb-8 space-y-1">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-medium text-ink transition hover:bg-ivory-deep"
                >
                  {item.label}
                  <ChevronLeft className="h-4 w-4 text-ink-muted" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>

          <p className="eyebrow mb-3 text-turquoise-dark">خرید بر اساس سلیقه</p>
          <div className="mb-8 grid grid-cols-2 gap-2">
            {CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                to={category.slug === 'gift' ? '/gift-sets' : `/collections/${category.slug}`}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl border border-ivory-line bg-white px-3 py-3 text-[12.5px] font-medium text-ink transition hover:border-turquoise hover:text-turquoise-dark"
              >
                {category.title}
              </Link>
            ))}
          </div>

          <p className="eyebrow mb-3 text-turquoise-dark">دسترسی سریع</p>
          <ul className="mb-8 space-y-1">
            {SECONDARY.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-3 py-2.5 text-[13.5px] text-ink-muted transition hover:bg-ivory-deep hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="rounded-2xl bg-white p-4 text-[12.5px] leading-7 text-ink-muted">
            <p className="mb-2 flex items-center gap-2 text-ink">
              <Phone className="h-3.5 w-3.5 text-turquoise-dark" aria-hidden="true" />
              <span dir="ltr">{BRAND.contact.phone}</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-turquoise-dark" aria-hidden="true" />
              <span dir="ltr">{BRAND.contact.email}</span>
            </p>
          </div>
        </div>
      </aside>
    </div>
  )
}
