import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { findProduct } from '../data/products'

const StoreContext = createContext(null)

const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable */
  }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => read('aurelia:cart', []))
  const [wishlist, setWishlist] = useState(() => read('aurelia:wishlist', []))
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)

  useEffect(() => write('aurelia:cart', cart), [cart])
  useEffect(() => write('aurelia:wishlist', wishlist), [wishlist])

  useEffect(() => () => clearTimeout(toastTimer.current), [])

  const notify = (message) => {
    setToast(message)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2600)
  }

  const addToCart = (id, qty = 1, { open = false } = {}) => {
    const product = findProduct(id)
    if (!product) return
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id)
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, qty: item.qty + qty } : item,
        )
      }
      return [...prev, { id, qty }]
    })
    notify(`«${product.name}» به سبد خرید اضافه شد`)
    if (open) setCartOpen(true)
  }

  const setQty = (id, qty) => {
    if (qty < 1) {
      setCart((prev) => prev.filter((item) => item.id !== id))
      return
    }
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, qty } : item)))
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
    notify('قطعه از سبد خرید حذف شد')
  }

  const toggleWishlist = (id) => {
    const product = findProduct(id)
    setWishlist((prev) => {
      if (prev.includes(id)) {
        notify(`«${product?.name ?? 'قطعه'}» از علاقه‌مندی‌ها حذف شد`)
        return prev.filter((item) => item !== id)
      }
      notify(`«${product?.name ?? 'قطعه'}» به علاقه‌مندی‌ها اضافه شد`)
      return [...prev, id]
    })
  }

  const cartItems = useMemo(
    () =>
      cart
        .map((item) => ({ ...item, product: findProduct(item.id) }))
        .filter((item) => Boolean(item.product)),
    [cart],
  )

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.qty, 0),
    [cartItems],
  )

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0),
    [cartItems],
  )

  const value = {
    cart,
    cartItems,
    cartCount,
    subtotal,
    addToCart,
    setQty,
    removeFromCart,
    wishlist,
    toggleWishlist,
    isWished: (id) => wishlist.includes(id),
    cartOpen,
    setCartOpen,
    searchOpen,
    setSearchOpen,
    toast,
    notify,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = () => {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}
