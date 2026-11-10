import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ShopProvider } from './lib/store.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import Toast from './components/Toast.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import Categories from './pages/Categories.jsx';
import Product from './pages/Product.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Order from './pages/Order.jsx';
import Account from './pages/Account.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route
              path="/new"
              element={<Shop mode="new" title="جدیدترین محصولات" subtitle="تازه‌ترین مدل‌هایی که این هفته به مجموعه اضافه شده‌اند." />}
            />
            <Route
              path="/bestsellers"
              element={<Shop mode="best" title="پرفروش‌ترین‌ها" subtitle="محبوب‌ترین انتخاب‌های مشتریان Velora در ماه گذشته." />}
            />
            <Route path="/categories" element={<Categories />} />
            <Route path="/product/:slug" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order/:code" element={<Order />} />
            <Route path="/account" element={<Account />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <CartDrawer />
        <Toast />
      </BrowserRouter>
    </ShopProvider>
  );
}
