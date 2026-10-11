import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Button from './Button'
import Logo from './Logo'

/** لینک‌های فهرست موبایل و دسکتاپ؛ فهرست در src/data/site.js متمرکز است. */
export const NAV_ITEMS = [
  { label: 'خانه', to: '/' },
  { label: 'درباره ما', to: '/about' },
  { label: 'خدمات', to: '/services' },
  { label: 'پروژه‌ها', to: '/projects' },
  { label: 'مجله معماری', to: '/journal' },
  { label: 'تماس با ما', to: '/contact' },
]

function navClasses(active) {
  return [
    'group relative py-2 text-sm transition-colors duration-300',
    active ? 'text-gold' : 'text-white/80 hover:text-white',
  ].join(' ')
}

function Underline({ active }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute bottom-0 h-px bg-gold transition-all duration-300 ${
        active ? 'w-full' : 'w-0 group-hover:w-full'
      }`}
      style={{ insetInlineStart: 0 }}
    />
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // با تغییر مسیر، فهرست موبایل بسته می‌شود.
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/10 bg-ink/95 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="shell flex h-20 items-center justify-between gap-6 lg:h-24">
        <Link to="/" aria-label="آرکا سازه — صفحه اصلی" className="shrink-0">
          <Logo tone="light" compact={scrolled} />
        </Link>

        <nav aria-label="ناوبری اصلی" className="hidden items-center gap-9 lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => navClasses(isActive)}
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <Underline active={isActive} />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button to="/consultation" size="sm">
            دریافت مشاوره
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-gold hover:text-gold lg:hidden"
          aria-label="باز کردن فهرست"
          aria-expanded={menuOpen}
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <MobileNavigation open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  )
}

/** فهرست کشویی موبایل با چیدمان راست‌به‌چپ. */
function MobileNavigation({ open, onClose }) {
  return (
    <div className="lg:hidden" aria-hidden={!open}>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-ink/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="فهرست ناوبری"
        className={`blueprint fixed inset-y-0 z-50 flex w-[86%] max-w-sm flex-col bg-ink transition-transform duration-500 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ insetInlineStart: 0 }}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <Logo tone="light" compact />
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن فهرست"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-gold hover:text-gold"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="ناوبری موبایل" className="flex-1 overflow-y-auto px-6 py-8">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  onClick={onClose}
                  tabIndex={open ? 0 : -1}
                  className={({ isActive }) =>
                    `flex items-center justify-between border-b border-white/[0.07] py-4 text-lg transition-colors ${
                      isActive ? 'text-gold' : 'text-white/85 hover:text-gold'
                    }`
                  }
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-gold/60">←</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button to="/consultation" onClick={onClose} tabIndex={open ? 0 : -1} className="w-full">
              دریافت مشاوره
            </Button>
          </div>
        </nav>

        <div className="border-t border-white/10 px-6 py-6 text-sm text-white/60">
          <p>ارومیه، آذربایجان غربی، ایران</p>
          <a href="tel:+984432222222" className="mt-2 block text-gold" tabIndex={open ? 0 : -1}>
            <span className="bidi-ltr">۰۴۴-۳۲۲۲۲۲۲۲</span>
          </a>
        </div>
      </div>
    </div>
  )
}
