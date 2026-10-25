import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import CartDrawer from './CartDrawer'
import SearchOverlay from './SearchOverlay'
import { useStore } from '../context/StoreContext'
import { IconCheck } from './Icons'

export default function Layout() {
  const { toast } = useStore()
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
      <div
        aria-live="polite"
        className={`pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex justify-center px-4 transition-all duration-300 ${
          toast ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
        }`}
      >
        {toast && (
          <div className="flex items-center gap-2 bg-ink px-5 py-3 text-[11.5px] text-ivory shadow-lg">
            <IconCheck size={15} className="text-[#C9AE86]" />
            <span>{toast}</span>
          </div>
        )}
      </div>
    </div>
  )
}
