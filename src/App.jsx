import { Route, Routes } from 'react-router-dom'
import { StoreProvider } from './context/StoreContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Collections from './pages/Collections'
import Wishlist from './pages/Wishlist'
import Cart from './pages/Cart'
import About from './pages/About'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Account from './pages/Account'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <StoreProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </StoreProvider>
  )
}
