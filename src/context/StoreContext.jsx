import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { PRODUCTS } from '../data/products.js';

const StoreContext = createContext(null);

const CART_KEY = 'velora.cart.v1';
const WISH_KEY = 'velora.wishlist.v1';

export const FREE_SHIPPING_THRESHOLD = 75;
export const STANDARD_SHIPPING = 6;

export const COUPONS = {
  VELORA10: { code: 'VELORA10', type: 'percent', value: 10, label: '10% off your order' },
  GLOW20: { code: 'GLOW20', type: 'percent', value: 20, label: '20% off your order' },
  WELCOME15: { code: 'WELCOME15', type: 'percent', value: 15, label: '15% welcome offer' },
};

const read = (key, fallback) => {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => read(CART_KEY, []));
  const [wishlist, setWishlist] = useState(() => read(WISH_KEY, []));
  const [coupon, setCoupon] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickViewId, setQuickViewId] = useState(null);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    window.localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const pushToast = useCallback((message, tone = 'default') => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setToasts((prev) => [...prev, { id, message, tone }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToCart = useCallback(
    (product, qty = 1) => {
      setCart((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + qty } : item,
          );
        }
        return [...prev, { id: product.id, qty }];
      });
      pushToast(`${product.name} added to your bag`, 'success');
    },
    [pushToast],
  );

  const removeFromCart = useCallback(
    (id) => {
      setCart((prev) => prev.filter((item) => item.id !== id));
      pushToast('Item removed from your bag');
    },
    [pushToast],
  );

  const updateQty = useCallback((id, qty) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: Math.max(0, qty) } : item))
        .filter((item) => item.qty > 0),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback(
    (product) => {
      setWishlist((prev) => {
        const has = prev.includes(product.id);
        pushToast(has ? `${product.name} removed from wishlist` : `${product.name} saved to wishlist`);
        return has ? prev.filter((id) => id !== product.id) : [...prev, product.id];
      });
    },
    [pushToast],
  );

  const isWishlisted = useCallback((id) => wishlist.includes(id), [wishlist]);

  const applyCoupon = useCallback(
    (code) => {
      const found = COUPONS[String(code).trim().toUpperCase()];
      if (!found) {
        pushToast('That code is not valid', 'error');
        return false;
      }
      setCoupon(found);
      pushToast(`Coupon applied — ${found.label}`, 'success');
      return true;
    },
    [pushToast],
  );

  const clearCoupon = useCallback(() => setCoupon(null), []);

  const lines = useMemo(
    () =>
      cart
        .map((item) => {
          const product = PRODUCTS.find((p) => p.id === item.id);
          return product ? { ...item, product } : null;
        })
        .filter(Boolean),
    [cart],
  );

  const itemCount = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines]);

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.product.price * l.qty, 0),
    [lines],
  );

  const discount = useMemo(
    () => (coupon ? Math.round(subtotal * (coupon.value / 100) * 100) / 100 : 0),
    [coupon, subtotal],
  );

  const shipping = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal - discount >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
  }, [subtotal, discount]);

  const total = useMemo(
    () => Math.max(0, Math.round((subtotal - discount + shipping) * 100) / 100),
    [subtotal, discount, shipping],
  );

  const value = {
    cart: lines,
    itemCount,
    subtotal,
    discount,
    shipping,
    total,
    coupon,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    applyCoupon,
    clearCoupon,
    wishlist,
    toggleWishlist,
    isWishlisted,
    cartOpen,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
    searchOpen,
    openSearch: () => setSearchOpen(true),
    closeSearch: () => setSearchOpen(false),
    quickViewId,
    openQuickView: (id) => setQuickViewId(id),
    closeQuickView: () => setQuickViewId(null),
    toasts,
    pushToast,
    dismissToast,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}
