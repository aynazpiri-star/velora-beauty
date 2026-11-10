import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { products } from '../../shared/catalog.js';
import { useShop } from '../lib/store.jsx';
import { formatPrice, toFa } from '../lib/format.js';
import { BagIcon, CloseIcon, MenuIcon, SearchIcon, UserIcon } from './Icons.jsx';
import './header.css';

const NAV = [
  { to: '/', label: 'صفحه اصلی', end: true },
  { to: '/shop', label: 'فروشگاه' },
  { to: '/categories', label: 'دسته‌بندی‌ها' },
  { to: '/new', label: 'جدیدترین محصولات' },
  { to: '/bestsellers', label: 'پرفروش‌ترین‌ها' },
  { to: '/about', label: 'درباره ما' },
  { to: '/contact', label: 'تماس با ما' },
];

export default function Header() {
  const { count, openCart } = useShop();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchInput = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key !== 'Escape') return;
      setSearchOpen(false);
      setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    if (searchOpen) {
      const timer = setTimeout(() => searchInput.current?.focus(), 60);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [searchOpen]);

  const results = useMemo(() => {
    const term = query.trim();
    if (term.length < 2) return [];
    return products
      .filter((product) =>
        `${product.name} ${product.subtitle} ${product.brand}`.toLowerCase().includes(term.toLowerCase()),
      )
      .slice(0, 5);
  }, [query]);

  const submitSearch = (event) => {
    event.preventDefault();
    const term = query.trim();
    setSearchOpen(false);
    navigate(term ? `/shop?q=${encodeURIComponent(term)}` : '/shop');
  };

  return (
    <>
      <div className="announce">
        <span>ارسال رایگان برای سفارش‌های بالای ۸٬۰۰۰٬۰۰۰ تومان</span>
        <span className="announce__sep" aria-hidden="true">
          ●
        </span>
        <span>
          کد تخفیف اولین خرید: <b className="brand-word">VELORA10</b>
        </span>
      </div>

      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="header-inner">
          <Link to="/" className="logo" aria-label="Velora — صفحه اصلی">
            <span className="logo__mark brand-word">Velora</span>
            <span className="logo__dot" aria-hidden="true" />
          </Link>

          <nav className="desktop-nav" aria-label="ناوبری اصلی">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="icon-btn"
              onClick={() => {
                setSearchOpen((open) => !open);
                setMenuOpen(false);
              }}
              aria-label="جستجوی محصول"
              aria-expanded={searchOpen}
            >
              <SearchIcon size={21} />
            </button>

            <Link to="/account" className="icon-btn icon-btn--account" aria-label="حساب کاربری">
              <UserIcon size={21} />
            </Link>

            <button type="button" className="icon-btn cart-btn" onClick={openCart} aria-label="سبد خرید">
              <BagIcon size={21} />
              {count > 0 && <span className="cart-count">{toFa(count)}</span>}
            </button>

            <button
              type="button"
              className="icon-btn menu-btn"
              onClick={() => setMenuOpen(true)}
              aria-label="منوی موبایل"
            >
              <MenuIcon size={22} />
            </button>
          </div>
        </div>

        <div className={`search-panel ${searchOpen ? 'is-open' : ''}`}>
          <div className="container">
            <form className="search-form" onSubmit={submitSearch} role="search">
              <SearchIcon size={20} />
              <input
                ref={searchInput}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="نام محصول، برند یا دسته‌بندی را بنویسید…"
                aria-label="عبارت جستجو"
              />
              <button type="submit" className="btn btn--primary btn--sm">
                جستجو
              </button>
              <button type="button" className="icon-btn" onClick={() => setSearchOpen(false)} aria-label="بستن جستجو">
                <CloseIcon size={18} />
              </button>
            </form>

            {results.length > 0 && (
              <ul className="search-results">
                {results.map((product) => (
                  <li key={product.id}>
                    <Link
                      to={`/product/${product.slug}`}
                      onClick={() => {
                        setSearchOpen(false);
                        setQuery('');
                      }}
                    >
                      <img src={product.images[0]} alt="" loading="lazy" />
                      <span>
                        <b>{product.name}</b>
                        <em>{product.subtitle}</em>
                      </span>
                      <span className="search-results__price">{formatPrice(product.price)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {query.trim().length >= 2 && results.length === 0 && (
              <p className="search-empty">نتیجه‌ای برای «{query.trim()}» پیدا نشد.</p>
            )}
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu__top">
          <span className="logo__mark brand-word">Velora</span>
          <button type="button" className="icon-btn" onClick={() => setMenuOpen(false)} aria-label="بستن منو">
            <CloseIcon size={22} />
          </button>
        </div>
        <nav className="mobile-menu__nav" aria-label="ناوبری موبایل">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? 'is-active' : '')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="mobile-menu__foot">
          <button
            type="button"
            className="btn btn--ghost btn--block"
            onClick={() => {
              setMenuOpen(false);
              setSearchOpen(true);
            }}
          >
            <SearchIcon size={18} /> جستجو
          </button>
          <button
            type="button"
            className="btn btn--primary btn--block"
            onClick={() => {
              setMenuOpen(false);
              openCart();
            }}
          >
            <BagIcon size={18} /> سبد خرید ({toFa(count)})
          </button>
        </div>
      </div>
      {menuOpen && <button type="button" className="menu-scrim" aria-label="بستن" onClick={() => setMenuOpen(false)} />}
    </>
  );
}
