import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { productsById } from '../../shared/catalog.js';

const ShopContext = createContext(null);

const CART_KEY = 'velora.cart.v1';
const FAV_KEY = 'velora.favorites.v1';

const readStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const lineKey = (id, size, color) => `${id}|${size || '-'}|${color || '-'}`;

export function ShopProvider({ children }) {
  const [items, setItems] = useState(() => readStorage(CART_KEY, []));
  const [favorites, setFavorites] = useState(() => readStorage(FAV_KEY, []));
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable — keep the session-only cart */
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
    } catch {
      /* ignore */
    }
  }, [favorites]);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const notify = useCallback((message, tone = 'success') => {
    clearTimeout(toastTimer.current);
    setToast({ message, tone, id: Date.now() });
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  const addToCart = useCallback(
    ({ product, size, color, qty = 1 }, { silent = false } = {}) => {
      const key = lineKey(product.id, size, color);
      setItems((current) => {
        const existing = current.find((item) => item.key === key);
        if (existing) {
          return current.map((item) =>
            item.key === key ? { ...item, qty: Math.min(10, item.qty + qty) } : item,
          );
        }
        return [...current, { key, id: product.id, size, color, qty: Math.min(10, qty) }];
      });
      if (!silent) notify(`«${product.name}» به سبد خرید اضافه شد.`);
    },
    [notify],
  );

  const updateQty = useCallback((key, qty) => {
    setItems((current) =>
      qty <= 0
        ? current.filter((item) => item.key !== key)
        : current.map((item) => (item.key === key ? { ...item, qty: Math.min(10, qty) } : item)),
    );
  }, []);

  const removeItem = useCallback((key) => {
    setItems((current) => current.filter((item) => item.key !== key));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const toggleFavorite = useCallback(
    (product) => {
      setFavorites((current) => {
        const exists = current.includes(product.id);
        notify(exists ? `«${product.name}» از علاقه‌مندی‌ها حذف شد.` : `«${product.name}» به علاقه‌مندی‌ها اضافه شد.`);
        return exists ? current.filter((id) => id !== product.id) : [...current, product.id];
      });
    },
    [notify],
  );

  const lines = useMemo(
    () =>
      items
        .map((item) => {
          const product = productsById[item.id];
          if (!product) return null;
          return { ...item, product, lineTotal: product.price * item.qty };
        })
        .filter(Boolean),
    [items],
  );

  const count = useMemo(() => items.reduce((sum, item) => sum + item.qty, 0), [items]);
  const subtotal = useMemo(() => lines.reduce((sum, line) => sum + line.lineTotal, 0), [lines]);

  const value = useMemo(
    () => ({
      items,
      lines,
      count,
      subtotal,
      favorites,
      isFavorite: (id) => favorites.includes(id),
      addToCart,
      updateQty,
      removeItem,
      clearCart,
      toggleFavorite,
      cartOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      toast,
      notify,
    }),
    [
      items,
      lines,
      count,
      subtotal,
      favorites,
      addToCart,
      updateQty,
      removeItem,
      clearCart,
      toggleFavorite,
      cartOpen,
      toast,
      notify,
    ],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used inside ShopProvider');
  return context;
}
