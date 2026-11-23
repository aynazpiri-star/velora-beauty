import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { productsById } from '../../shared/catalog.js';

const CART_KEY = 'velora.cart.v1';
const MAX_QTY = 5;

const StoreContext = createContext(null);

function readCart() {
  try {
    const raw = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    if (!Array.isArray(raw)) return [];
    return raw
      .filter((item) => productsById[item?.id])
      .map((item) => ({ id: item.id, qty: Math.min(Math.max(Math.trunc(item.qty) || 1, 1), MAX_QTY) }));
  } catch {
    return [];
  }
}

export function StoreProvider({ children }) {
  const [items, setItems] = useState(readCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
      /* storage can be unavailable in private mode — the cart still works in memory */
    }
  }, [items]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(timer);
  }, [toast]);

  const notify = useCallback((message) => setToast({ id: Date.now(), message }), []);

  const add = useCallback(
    (id, qty = 1) => {
      if (!productsById[id]) return;
      setItems((previous) => {
        const existing = previous.find((item) => item.id === id);
        if (existing) {
          return previous.map((item) =>
            item.id === id ? { ...item, qty: Math.min(item.qty + qty, MAX_QTY) } : item
          );
        }
        return [...previous, { id, qty: Math.min(Math.max(qty, 1), MAX_QTY) }];
      });
      notify('به سبد خرید اضافه شد');
    },
    [notify]
  );

  const setQty = useCallback((id, qty) => {
    setItems((previous) =>
      qty <= 0
        ? previous.filter((item) => item.id !== id)
        : previous.map((item) =>
            item.id === id ? { ...item, qty: Math.min(Math.max(qty, 1), MAX_QTY) } : item
          )
    );
  }, []);

  const remove = useCallback((id) => {
    setItems((previous) => previous.filter((item) => item.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  const detailed = useMemo(
    () =>
      items
        .map((item) => {
          const product = productsById[item.id];
          return product ? { ...product, qty: item.qty, lineTotal: product.price * item.qty } : null;
        })
        .filter(Boolean),
    [items]
  );

  const count = useMemo(() => items.reduce((sum, item) => sum + item.qty, 0), [items]);
  const subtotal = useMemo(
    () => detailed.reduce((sum, item) => sum + item.lineTotal, 0),
    [detailed]
  );

  const value = useMemo(
    () => ({
      items,
      detailed,
      count,
      subtotal,
      add,
      setQty,
      remove,
      clear,
      cartOpen,
      openCart,
      closeCart,
      toast,
      notify,
    }),
    [
      items,
      detailed,
      count,
      subtotal,
      add,
      setQty,
      remove,
      clear,
      openCart,
      closeCart,
      cartOpen,
      toast,
      notify,
    ]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used inside StoreProvider');
  return context;
}
