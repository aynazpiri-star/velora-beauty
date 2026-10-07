import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import Logo from '../ui/Logo.jsx';
import { NAV_LINKS } from '../../data/content.js';
import { CATEGORIES } from '../../data/products.js';
import { useStore } from '../../context/StoreContext.jsx';
import { classNames } from '../../lib/format.js';
import { useLockBodyScroll, useOnEscape } from '../../hooks/useOverlay.js';

function CountBadge({ count }) {
  if (!count) return null;
  return (
    <span className="absolute -right-1.5 -top-1.5 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-burgundy px-1 text-[10px] font-semibold text-cream">
      {count > 99 ? '99+' : count}
    </span>
  );
}

const iconButton =
  'relative inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-all duration-300 hover:bg-softpink/60 hover:text-burgundy';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, wishlist, openCart, openSearch } = useStore();
  const location = useLocation();

  useLockBodyScroll(menuOpen);
  useOnEscape(menuOpen, () => setMenuOpen(false));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-cream"
      >
        Skip to content
      </a>

      <header
        className={classNames(
          'sticky top-0 z-50 w-full border-b transition-all duration-500',
          scrolled
            ? 'border-ink/[0.08] bg-cream/95 py-2 shadow-[0_10px_30px_-24px_rgba(36,32,36,0.5)] backdrop-blur-md'
            : 'border-transparent bg-cream py-4',
        )}
      >
        <div className="container-velora flex items-center justify-between gap-4">
          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      classNames(
                        'group relative block py-1 text-[13px] font-medium tracking-[0.06em] transition-colors',
                        isActive ? 'text-burgundy' : 'text-ink/75 hover:text-burgundy',
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.label}
                        <span
                          className={classNames(
                            'absolute -bottom-0.5 left-0 h-px bg-burgundy transition-all duration-300',
                            isActive ? 'w-full' : 'w-0 group-hover:w-full',
                          )}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-0.5 sm:gap-1">
            <button type="button" onClick={openSearch} className={iconButton} aria-label="Search products">
              <Search size={19} strokeWidth={1.6} />
            </button>

            <Link to="/account" className={classNames(iconButton, 'hidden sm:inline-flex')} aria-label="Your account">
              <User size={19} strokeWidth={1.6} />
            </Link>

            <Link to="/wishlist" className={iconButton} aria-label={`Wishlist, ${wishlist.length} items`}>
              <Heart size={19} strokeWidth={1.6} />
              <CountBadge count={wishlist.length} />
            </Link>

            <button
              type="button"
              onClick={openCart}
              className={iconButton}
              aria-label={`Shopping bag, ${itemCount} items`}
            >
              <ShoppingBag size={19} strokeWidth={1.6} />
              <CountBadge count={itemCount} />
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className={classNames(iconButton, 'lg:hidden')}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu size={20} strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-ink/40 backdrop-blur-[2px] animate-fade-in"
          />
          <div
            className="absolute right-0 top-0 flex h-full w-[min(88vw,22rem)] flex-col overflow-y-auto bg-cream px-6 py-6 shadow-card animate-slide-in-right"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-10">
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        classNames(
                          'block border-b border-ink/[0.07] py-4 font-serif text-[22px] transition-colors',
                          isActive ? 'text-burgundy' : 'text-ink hover:text-burgundy',
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <p className="mt-8 eyebrow">Shop by category</p>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/collections/${cat.slug}`}
                    className="block rounded-md border border-ink/10 px-3 py-2.5 text-[13px] text-ink/80 transition-colors hover:border-burgundy hover:text-burgundy"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-8">
              <Link to="/account" className="link-underline">
                <User size={15} /> Your account
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
