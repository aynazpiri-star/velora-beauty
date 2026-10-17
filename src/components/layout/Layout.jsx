import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import CartDrawer from './CartDrawer'
import Footer from './Footer'
import Header from './Header'
import MobileMenu from './MobileMenu'
import SearchOverlay from './SearchOverlay'
import ToastViewport from '../ui/ToastViewport'

/** Resets scroll position on route change (except when jumping to an anchor). */
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])
  return null
}

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileMenu />
      <SearchOverlay />
      <CartDrawer />
      <ToastViewport />
    </div>
  )
}
