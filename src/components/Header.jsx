import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import AnnouncementBar from './AnnouncementBar'
import { useStore } from '../context/StoreContext'
import {
  IconBag,
  IconClose,
  IconHeart,
  IconMenu,
  IconSearch,
  IconUser,
} from './Icons'
import { toFa } from '../lib/format'

const navLinks = [
  { to: '/', label: 'خانه', end: true },
  { to: '/shop', label: 'فروشگاه' },
  { to: '/collections', label: 'مجموعه‌ها' },
  { to: '/about', label: 'درباره ما' },
  { to: '/blog', label: 'وبلاگ' },
  { to: '/contact', label: 'تماس با ما' },
]

function Logo({ onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="flex flex-col items-center leading-none text-ink"
      aria-label="AURELIA — خانه"
    >
      <span className="brand-word text-[19px] font-normal tracking-[0.34em] sm:text-[22px]">
        AURELIA
      </span>
      <span className="mt-1.5 text-[7.5px] tracking-[0.42em] text-muted sm:text-[8px]">
        FINE JEWELRY
      </span>
    </Link>
  )
}

export default function Header() {
  const { cartCount, wishlist, setCartOpen, setSearchOpen } = useStore()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const iconBtn =
    'relative grid h-9 w-9 place-items-center text-ink transition-colors hover:text-gold'

  return (
    <header className="sticky top-0 z-40">
      <AnnouncementBar />
      <div className="border-b border-line/80 bg-ivory/95 backdrop-blur">
        <div className="container-site grid h-[68px] grid-cols-[1fr_auto_1fr] items-center lg:h-[82px]">
          {/* navigation — right side in RTL */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `text-[12px] tracking-[0.03em] transition-colors hover:text-gold ${
                    isActive ? 'text-gold' : 'text-ink/85'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className={`${iconBtn} lg:hidden`}
            aria-label="باز کردن منو"
          >
            <IconMenu size={22} />
          </button>

          <div className="justify-self-center">
            <Logo />
          </div>

          <div className="flex items-center justify-end gap-0.5 sm:gap-1.5">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className={iconBtn}
              aria-label="جستجو"
            >
              <IconSearch size={19} />
            </button>
            <Link to="/wishlist" className={`${iconBtn} hidden sm:grid`} aria-label="علاقه‌مندی‌ها">
              <IconHeart size={19} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 end-0 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[9px] leading-none text-white">
                  {toFa(wishlist.length)}
                </span>
              )}
            </Link>
            <Link to="/account" className={`${iconBtn} hidden sm:grid`} aria-label="حساب کاربری">
              <IconUser size={19} />
            </Link>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className={iconBtn}
              aria-label="سبد خرید"
            >
              <IconBag size={19} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 end-0 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[9px] leading-none text-white">
                  {toFa(cartCount)}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${menuOpen ? '' : 'pointer-events-none'}`}
        aria-hidden={!menuOpen}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-ink/30 transition-opacity duration-300 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute inset-y-0 start-0 flex w-[82%] max-w-xs flex-col bg-ivory px-6 py-5 shadow-2xl transition-transform duration-500 ease-smooth ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between">
            <Logo onClick={() => setMenuOpen(false)} />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="بستن منو"
              className="grid h-9 w-9 place-items-center text-ink"
            >
              <IconClose size={20} />
            </button>
          </div>
          <nav className="mt-8 flex flex-col divide-y divide-line/70 border-y border-line/70">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `py-3.5 text-[13px] transition-colors ${
                    isActive ? 'text-gold' : 'text-ink'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3 text-[12.5px] text-ink">
            <Link to="/wishlist">علاقه‌مندی‌ها ({toFa(wishlist.length)})</Link>
            <Link to="/account">حساب کاربری</Link>
          </div>
          <p className="mt-auto pt-8 text-[10.5px] leading-6 text-muted">
            AURELIA — جواهرات ظریف، ساخته‌شده برای لحظه‌های ماندگار.
          </p>
        </div>
      </div>
    </header>
  )
}
