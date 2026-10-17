import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { products } from '../data/products'

const StoreContext = createContext(null)

const CART_KEY = 'aura.cart.v1'
const WISHLIST_KEY = 'aura.wishlist.v1'
const ORDER_KEY = 'aura.lastOrder.v1'

/** Free-shipping threshold: 3,000,000 تومان. */
export const FREE_SHIPPING_THRESHOLD = 3000000
export const SHIPPING_FEE = 89000

const safeRead = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

const safeWrite = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage may be unavailable (private mode) — the app still works in memory */
  }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => safeRead(CART_KEY, []))
  const [wishlist, setWishlist] = useState(() => safeRead(WISHLIST_KEY, []))
  const [lastOrder, setLastOrder] = useState(() => safeRead(ORDER_KEY, null))
  const [toasts, setToasts] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const toastId = useRef(0)

  useEffect(() => safeWrite(CART_KEY, cart), [cart])
  useEffect(() => safeWrite(WISHLIST_KEY, wishlist), [wishlist])
  useEffect(() => safeWrite(ORDER_KEY, lastOrder), [lastOrder])

  const dismissToast = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id))
  }, [])

  const notify = useCallback(
    (message, tone = 'success') => {
      const id = ++toastId.current
      setToasts((list) => [...list, { id, message, tone }])
      window.setTimeout(() => dismissToast(id), 3200)
    },
    [dismissToast],
  )

  const addToCart = useCallback(
    (productId, quantity = 1) => {
      const product = products.find((p) => p.id === productId)
      if (!product) return
      setCart((list) => {
        const existing = list.find((line) => line.id === productId)
        if (existing) {
          return list.map((line) =>
            line.id === productId ? { ...line, qty: Math.min(line.qty + quantity, 20) } : line,
          )
        }
        return [...list, { id: productId, qty: quantity }]
      })
      notify(`«${product.name}» به سبد خرید اضافه شد`)
    },
    [notify],
  )

  const removeFromCart = useCallback(
    (productId) => {
      const product = products.find((p) => p.id === productId)
      setCart((list) => list.filter((line) => line.id !== productId))
      if (product) notify(`«${product.name}» از سبد خرید حذف شد`, 'info')
    },
    [notify],
  )

  const updateQty = useCallback((productId, quantity) => {
    setCart((list) =>
      list
        .map((line) =>
          line.id === productId ? { ...line, qty: Math.max(0, Math.min(quantity, 20)) } : line,
        )
        .filter((line) => line.qty > 0),
    )
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const toggleWishlist = useCallback(
    (productId) => {
      const product = products.find((p) => p.id === productId)
      setWishlist((list) => {
        const has = list.includes(productId)
        if (product) {
          notify(
            has ? `«${product.name}» از علاقه‌مندی‌ها حذف شد` : `«${product.name}» به علاقه‌مندی‌ها اضافه شد`,
            has ? 'info' : 'success',
          )
        }
        return has ? list.filter((id) => id !== productId) : [...list, productId]
      })
    },
    [notify],
  )

  const isWishlisted = useCallback((productId) => wishlist.includes(productId), [wishlist])

  const placeOrder = useCallback((order) => {
    const record = { ...order, id: `AURA-${String(Date.now()).slice(-6)}`, createdAt: Date.now() }
    setLastOrder(record)
    setCart([])
    return record
  }, [])

  const lines = useMemo(
    () =>
      cart
        .map((line) => {
          const product = products.find((p) => p.id === line.id)
          return product ? { ...line, product, total: product.price * line.qty } : null
        })
        .filter(Boolean),
    [cart],
  )

  const cartCount = useMemo(() => cart.reduce((sum, line) => sum + line.qty, 0), [cart])
  const subtotal = useMemo(() => lines.reduce((sum, line) => sum + line.total, 0), [lines])
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  const total = subtotal + shipping

  const value = useMemo(
    () => ({
      cart,
      lines,
      cartCount,
      subtotal,
      shipping,
      total,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      wishlist,
      toggleWishlist,
      isWishlisted,
      lastOrder,
      placeOrder,
      toasts,
      notify,
      dismissToast,
      cartOpen,
      setCartOpen,
      searchOpen,
      setSearchOpen,
      menuOpen,
      setMenuOpen,
    }),
    [
      cart,
      lines,
      cartCount,
      subtotal,
      shipping,
      total,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      wishlist,
      toggleWishlist,
      isWishlisted,
      lastOrder,
      placeOrder,
      toasts,
      notify,
      dismissToast,
      cartOpen,
      searchOpen,
      menuOpen,
    ],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) throw new Error('useStore must be used inside <StoreProvider>')
  return context
}
