"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getProduct, type Product } from "@/lib/products";

export type CartLine = {
  slug: string;
  size: string;
  color: string;
  qty: number;
};

export type CartEntry = CartLine & { product: Product; key: string };

type StoreValue = {
  cart: CartLine[];
  entries: CartEntry[];
  count: number;
  subtotal: number;
  wishlist: string[];
  hydrated: boolean;
  addToCart: (product: Product, options?: { size?: string; color?: string; qty?: number }) => void;
  updateQty: (key: string, qty: number) => void;
  removeLine: (key: string) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isWished: (slug: string) => boolean;
  notify: (message: string) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

const CART_KEY = "velora-cart";
const WISH_KEY = "velora-wishlist";

const lineKey = (line: CartLine) => `${line.slug}|${line.size}|${line.color}`;

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_KEY);
      if (storedCart) setCart(JSON.parse(storedCart));
      const storedWish = localStorage.getItem(WISH_KEY);
      if (storedWish) setWishlist(JSON.parse(storedWish));
    } catch {
      // ignore unreadable storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const notify = useCallback((message: string) => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current, { id, message }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3200);
  }, []);

  const addToCart = useCallback<StoreValue["addToCart"]>(
    (product, options) => {
      const size = options?.size ?? product.sizes[0];
      const color = options?.color ?? product.colors[0].name;
      const qty = options?.qty ?? 1;
      const line: CartLine = { slug: product.slug, size, color, qty };

      setCart((current) => {
        const key = lineKey(line);
        const existing = current.find((item) => lineKey(item) === key);
        if (existing) {
          return current.map((item) =>
            lineKey(item) === key ? { ...item, qty: Math.min(item.qty + qty, 99) } : item,
          );
        }
        return [...current, line];
      });
      notify(`«${product.name}» به سبد خرید اضافه شد`);
    },
    [notify],
  );

  const updateQty = useCallback((key: string, qty: number) => {
    setCart((current) =>
      current.map((item) =>
        lineKey(item) === key ? { ...item, qty: Math.max(1, Math.min(qty, 99)) } : item,
      ),
    );
  }, []);

  const removeLine = useCallback((key: string) => {
    setCart((current) => current.filter((item) => lineKey(item) !== key));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback<StoreValue["toggleWishlist"]>(
    (product) => {
      setWishlist((current) => {
        const exists = current.includes(product.slug);
        notify(
          exists
            ? `«${product.name}» از علاقه‌مندی‌ها حذف شد`
            : `«${product.name}» به علاقه‌مندی‌ها اضافه شد`,
        );
        return exists
          ? current.filter((slug) => slug !== product.slug)
          : [...current, product.slug];
      });
    },
    [notify],
  );

  const isWished = useCallback((slug: string) => wishlist.includes(slug), [wishlist]);

  const entries = useMemo<CartEntry[]>(() => {
    return cart
      .map((line) => {
        const product = getProduct(line.slug);
        if (!product) return null;
        return { ...line, product, key: lineKey(line) };
      })
      .filter((entry): entry is CartEntry => entry !== null);
  }, [cart]);

  const count = useMemo(() => cart.reduce((total, line) => total + line.qty, 0), [cart]);
  const subtotal = useMemo(
    () => entries.reduce((total, entry) => total + entry.product.price * entry.qty, 0),
    [entries],
  );

  const value: StoreValue = {
    cart,
    entries,
    count,
    subtotal,
    wishlist,
    hydrated,
    addToCart,
    updateQty,
    removeLine,
    clearCart,
    toggleWishlist,
    isWished,
    notify,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex flex-col items-center gap-2 px-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className="animate-toast-in rounded-[3px] bg-wine px-5 py-3 text-center text-[13px] text-ivory shadow-[0_18px_40px_-18px_rgba(54,18,22,0.8)]"
          >
            {toast.message}
          </div>
        ))}
      </div>
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used inside StoreProvider");
  }
  return context;
}
