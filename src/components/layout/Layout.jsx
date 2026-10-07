import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import CartDrawer from '../cart/CartDrawer.jsx';
import SearchOverlay from '../search/SearchOverlay.jsx';
import ProductQuickView from '../product/ProductQuickView.jsx';
import ToastViewport from '../ui/ToastViewport.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-blush">
      <ScrollToTop />
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
      <ProductQuickView />
      <ToastViewport />
    </div>
  );
}
