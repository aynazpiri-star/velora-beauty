import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { fa } from '../utils/format'
import { CartIcon, CloseIcon, MenuIcon, SearchIcon } from './icons'

const links = [
  { to: '/', label: 'خانه' },
  { to: '/shop', label: 'فروشگاه' },
  { to: '/#collections', label: 'مجموعه‌ها' },
  { to: '/#story', label: 'داستان ولورا' },
]

export default function Header() {
  const { count, openCart } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
  }, [location.pathname, location.hash])

  const submitSearch = (event) => {
    event.preventDefault()
    const value = query.trim()
    navigate(value ? `/shop?q=${encodeURIComponent(value)}` : '/shop')
    setSearchOpen(false)
  }

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link to="/" className="brand" aria-label="ولورا — خانه">
          VELORA
        </Link>

        <nav className="main-nav" aria-label="ناوبری اصلی">
          {links.map((link) =>
            link.to.startsWith('/#') ? (
              <Link key={link.label} to={link.to}>
                {link.label}
              </Link>
            ) : (
              <NavLink
                key={link.label}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => (isActive ? 'is-active' : '')}
              >
                {link.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="icon-btn"
            aria-label="جستجو"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((open) => !open)}
          >
            {searchOpen ? <CloseIcon /> : <SearchIcon />}
          </button>

          <button
            type="button"
            className="icon-btn cart-btn"
            onClick={openCart}
            aria-label={`سبد خرید، ${fa(count)} کالا`}
          >
            <CartIcon />
            <span className="cart-btn__label">سبد</span>
            <span className="cart-count">{fa(count)}</span>
          </button>

          <button
            type="button"
            className="icon-btn menu-toggle"
            aria-label="منو"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="search-bar">
          <form className="wrap search-bar__inner" onSubmit={submitSearch}>
            <SearchIcon />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="نام ساعت یا کد محصول را جستجو کنید…"
              aria-label="جستجوی محصول"
              autoFocus
            />
            <button type="submit">جستجو</button>
          </form>
        </div>
      )}

      <div className={`mobile-nav ${menuOpen ? 'is-open' : ''}`}>
        <div className="mobile-nav__inner">
          <nav className="wrap" aria-label="ناوبری موبایل">
            {links.map((link) => (
              <Link key={link.label} to={link.to}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
