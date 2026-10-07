import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Collections from './pages/Collections.jsx';
import Collection from './pages/Collection.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Account from './pages/Account.jsx';
import Checkout from './pages/Checkout.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Journal from './pages/Journal.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/collections/:slug" element={<Collection />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/account" element={<Account />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
