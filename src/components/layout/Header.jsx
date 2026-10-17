import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, Search, ShoppingBag, User } from 'lucide-react'
import { NAV } from '../../data/content'
import { useStore } from '../../context/StoreContext'
import { classNames } from '../../lib/classNames'
import { toFaDigits } from '../../lib/format'
import Logo from '../ui/Logo'

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

  return (
    <header
      className={classNames(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        solid
          ? 'border-b border-ivory-line bg-ivory/95 py-2.5 backdrop-blur-md shadow-[0_10px_40px_-30px_rgba(6,59,85,0.6)]'
          : 'border-b border-white/10 bg-gradient-to-b from-ocean-ink/55 to-transparent py-4',
      )}
    >
      <div className="container-x flex items-center justify-between gap-4">
        {/* Start (right in RTL): mobile trigger + desktop navigation */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className={classNames(
              'rounded-full p-2 transition lg:hidden',
              solid ? 'text-ink hover:bg-ink/5' : 'text-white hover:bg-white/10',
            )}
            aria-label="باز کردن منو"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>

          <nav aria-label="فهرست اصلی" className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  classNames(
                    'link-underline text-[12.5px] font-medium tracking-wide2 transition-colors',
                    solid
                      ? isActive
                        ? 'text-turquoise-dark'
                        : 'text-ink hover:text-turquoise-dark'
                      : isActive
                        ? 'text-champagne'
                        : 'text-white/90 hover:text-champagne',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <Logo tone={solid ? 'ink' : 'light'} className="lg:absolute lg:left-1/2 lg:-translate-x-1/2" />

        {/* End (left in RTL): utilities */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className={classNames(
              'rounded-full p-2 transition',
              solid ? 'text-ink hover:bg-ink/5' : 'text-white hover:bg-white/10',
            )}
            aria-label="جست‌وجوی محصولات"
          >
            <Search className="h-[18px] w-[18px]" aria-hidden="true" />
          </button>

          <Link
            to="/account"
            className={classNames(
              'hidden rounded-full p-2 transition sm:block',
              solid ? 'text-ink hover:bg-ink/5' : 'text-white hover:bg-white/10',
            )}
            aria-label="حساب کاربری"
          >
            <User className="h-[18px] w-[18px]" aria-hidden="true" />
          </Link>

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className={classNames(
              'relative rounded-full p-2 transition',
              solid ? 'text-ink hover:bg-ink/5' : 'text-white hover:bg-white/10',
            )}
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
