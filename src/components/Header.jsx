import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../lib/store.jsx';
import { faNum } from '../lib/format.js';
import { IconArrowLeft, IconBag, IconClose, IconMenu, IconSearch } from './Icons.jsx';
import './header.css';

const links = [
  { to: '/shop', label: 'فروشگاه' },
  { to: '/#collections', label: 'کالکشن‌ها' },
  { to: '/about', label: 'دربارهٔ ولورا' },
  { to: '/contact', label: 'تماس' },
];

export default function Header() {
  const { count, openCart } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [term, setTerm] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen, searchOpen]);

  const overHero = location.pathname === '/' && !scrolled;

  const submitSearch = (event) => {
    event.preventDefault();
    const query = term.trim();
    setSearchOpen(false);
    setTerm('');
    navigate(query ? `/shop?q=${encodeURIComponent(query)}` : '/shop');
  };

  return (
    <>
      <header
        className={[
          'site-header',
          overHero ? 'site-header--over' : '',
          scrolled ? 'site-header--scrolled' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="site-header__inner">
          <div className="site-header__start">
            <Link to="/" className="brand" aria-label="ولورا — صفحهٔ اصلی">
              VELORA
            </Link>
            <nav className="site-nav" aria-label="ناوبری اصلی">
              {links.map((link) => (
                <NavLink key={link.to} to={link.to} className="site-nav__link">
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="site-header__end">
            <button
              type="button"
              className="header-action header-action--icon"
              onClick={() => setSearchOpen(true)}
              aria-label="جستجو"
            >
              <IconSearch size={19} />
            </button>
            <button type="button" className="header-action" onClick={openCart}>
              <IconBag size={19} />
              <span className="header-action__label">سبد خرید</span>
              <span className="header-action__count">({faNum(count)})</span>
            </button>
            <button
              type="button"
              className="header-action header-action--menu"
              onClick={() => setMenuOpen(true)}
              aria-label="باز کردن منو"
            >
              <IconMenu size={22} />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu__top">
          <span className="brand brand--dark">VELORA</span>
          <button type="button" className="icon-close" onClick={() => setMenuOpen(false)} aria-label="بستن منو">
            <IconClose size={22} />
          </button>
        </div>
        <nav className="mobile-menu__nav" aria-label="ناوبری موبایل">
          {links.map((link, index) => (
            <Link key={link.to} to={link.to} className="mobile-menu__link">
              <span>{link.label}</span>
              <span className="mobile-menu__index">{faNum(index + 1)}</span>
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="mobile-menu__cart"
          onClick={() => {
            setMenuOpen(false);
            openCart();
          }}
        >
          <span>سبد خرید</span>
          <span>({faNum(count)})</span>
          <IconArrowLeft size={18} />
        </button>
        <p className="mobile-menu__note">بوتیک ولورا، تهران، خیابان ولیعصر</p>
      </div>

      <div className={`search-layer ${searchOpen ? 'is-open' : ''}`} aria-hidden={!searchOpen}>
        <button
          type="button"
          className="search-layer__backdrop"
          onClick={() => setSearchOpen(false)}
          aria-label="بستن جستجو"
        />
        <div className="search-layer__panel">
          <form onSubmit={submitSearch} className="search-layer__form">
            <IconSearch size={22} />
            <input
              type="search"
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="نام ساعت، کالکشن یا رنگ…"
              aria-label="جستجوی محصولات"
              autoFocus={searchOpen}
            />
            <button type="button" className="icon-close" onClick={() => setSearchOpen(false)} aria-label="بستن">
              <IconClose size={20} />
            </button>
          </form>
          <p className="search-layer__hint">برای دیدن همهٔ ساعت‌ها، جستجو را خالی بگذارید.</p>
        </div>
      </div>
    </>
  );
}
