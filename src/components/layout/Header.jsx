import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, Search, ShoppingBag, User } from 'lucide-react'
import { useStore } from '../../context/StoreContext'
import { classNames } from '../../lib/classNames'
import { toFaDigits } from '../../lib/format'
import Logo from '../ui/Logo'

/**
 * Three-zone header: menu (start), brand (centre), utilities (end).
 *
 * The zones are a real `1fr auto 1fr` grid — never absolutely positioned — so the
 * centred logo can never be overlapped by the side columns: the outer tracks split
 * whatever space is left next to the brand and the side rows align themselves to
 * their own edge. Navigation lives in the menu drawer at every width, which is why
 * `MobileMenu` is no longer hidden on desktop.
 */
export default function Header() {
  const { cartCount, setCartOpen, setSearchOpen, setMenuOpen } = useStore()
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setScrolled(window.scrollY > 36)
  }, [pathname])

  const solid = scrolled

  const iconTone = solid ? 'text-ink hover:bg-ink/5' : 'text-white hover:bg-white/10'

  return (
    <header
      className={classNames(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        solid
          ? 'border-b border-ivory-line bg-ivory/95 py-2 backdrop-blur-md shadow-[0_10px_40px_-30px_rgba(6,59,85,0.6)]'
          : 'border-b border-white/10 bg-gradient-to-b from-ocean-ink/55 to-transparent py-2.5',
      )}
    >
      <div className="container-x grid h-12 grid-cols-[1fr_auto_1fr] items-center gap-2 sm:h-14 sm:gap-4 lg:h-[68px] lg:gap-8">
        {/* Start (right in RTL): the menu — the only navigation trigger at any width */}
        <div className="flex min-w-0 items-center justify-start">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className={classNames('rounded-full p-2 transition', iconTone)}
            aria-label="باز کردن منو"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Centre: brand — its own column, so it never collides with the sides */}
        <Logo tone={solid ? 'ink' : 'light'} className="justify-self-center" />

        {/* End (left in RTL): utilities */}
        <div className="flex min-w-0 items-center justify-end gap-0.5 sm:gap-1.5">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className={classNames('rounded-full p-2 transition', iconTone)}
            aria-label="جست‌وجوی محصولات"
          >
            <Search className="h-[18px] w-[18px]" aria-hidden="true" />
          </button>

          <Link
            to="/account"
            className={classNames('hidden rounded-full p-2 transition sm:block', iconTone)}
            aria-label="حساب کاربری"
          >
            <User className="h-[18px] w-[18px]" aria-hidden="true" />
          </Link>

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className={classNames('relative rounded-full p-2 transition', iconTone)}
            aria-label={`سبد خرید، ${toFaDigits(cartCount)} کالا`}
          >
            <ShoppingBag className="h-[18px] w-[18px]" aria-hidden="true" />
            {cartCount > 0 && (
              <span className="tnum absolute -top-0.5 end-0 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-turquoise px-1 text-[10px] font-semibold text-white">
                {toFaDigits(cartCount)}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
