import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Tag, Trash2, Truck, X } from 'lucide-react';
import SafeImage from '../ui/SafeImage.jsx';
import Badge from '../ui/Badge.jsx';
import { useStore, FREE_SHIPPING_THRESHOLD } from '../../context/StoreContext.jsx';
import { classNames, currency } from '../../lib/format.js';
import { useLockBodyScroll, useOnEscape } from '../../hooks/useOverlay.js';

export default function CartDrawer() {
  const {
    cart,
    cartOpen,
    closeCart,
    updateQty,
    removeFromCart,
    subtotal,
    discount,
    shipping,
    total,
    coupon,
    applyCoupon,
    clearCoupon,
    itemCount,
  } = useStore();
  const [code, setCode] = useState('');

  useLockBodyScroll(cartOpen);
  useOnEscape(cartOpen, closeCart);

  if (!cartOpen) return null;

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - (subtotal - discount));
  const progress = Math.min(100, ((subtotal - discount) / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label="Shopping bag">
      <button
        type="button"
        aria-label="Close shopping bag"
        onClick={closeCart}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/45 backdrop-blur-[2px] animate-fade-in"
      />

      <aside className="absolute right-0 top-0 flex h-full w-full flex-col bg-cream shadow-card animate-slide-in-right sm:w-[26.5rem]">
        <header className="flex items-center justify-between border-b border-ink/[0.08] px-6 py-5">
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} strokeWidth={1.7} className="text-burgundy" />
            <h2 className="font-serif text-xl">Your bag</h2>
            <Badge tone="soft">{itemCount}</Badge>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close shopping bag"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 transition-colors hover:bg-ink hover:text-cream"
          >
            <X size={17} />
          </button>
        </header>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-softpink/60 text-burgundy">
              <ShoppingBag size={26} strokeWidth={1.5} />
            </span>
            <h3 className="font-serif text-2xl">Your bag is empty</h3>
            <p className="text-sm text-ink/60">
              Discover the formulas our customers reach for every single day.
            </p>
            <Link to="/shop" onClick={closeCart} className="btn-primary">
              Start shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="border-b border-ink/[0.08] px-6 py-4">
              {remaining > 0 ? (
                <p className="text-[12px] text-ink/65">
                  <Truck size={13} className="mr-2 inline text-burgundy" />
                  {currency(remaining)} away from free shipping
                </p>
              ) : (
                <p className="text-[12px] text-burgundy">
                  <Truck size={13} className="mr-2 inline" />
                  Free shipping unlocked
                </p>
              )}
              <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-ink/10">
                <div
                  className="h-full rounded-full bg-burgundy transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <ul className="flex-1 overflow-y-auto px-6 py-5">
              {cart.map(({ id, qty, product }) => (
                <li key={id} className="flex gap-4 border-b border-ink/[0.07] py-5 last:border-0">
                  <Link to={`/product/${product.slug}`} onClick={closeCart} className="shrink-0">
                    <SafeImage
                      src={product.images[0]}
                      alt={product.name}
                      wrapperClassName="h-24 w-20 rounded-md"
                      className="h-full w-full object-cover"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif text-[15px] leading-snug">
                        <Link to={`/product/${product.slug}`} onClick={closeCart} className="hover:text-burgundy">
                          {product.name}
                        </Link>
                      </h3>
                      <button
                        type="button"
                        onClick={() => removeFromCart(id)}
                        aria-label={`Remove ${product.name}`}
                        className="text-ink/35 transition-colors hover:text-burgundy"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <p className="mt-1 text-[12px] text-ink/50">{product.size}</p>

                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="inline-flex items-center rounded-md border border-ink/15">
                        <button
                          type="button"
                          onClick={() => updateQty(id, qty - 1)}
                          aria-label={`Decrease quantity of ${product.name}`}
                          className="inline-flex h-8 w-8 items-center justify-center text-ink/70 hover:text-burgundy"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-6 text-center text-[13px]">{qty}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(id, qty + 1)}
                          aria-label={`Increase quantity of ${product.name}`}
                          className="inline-flex h-8 w-8 items-center justify-center text-ink/70 hover:text-burgundy"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <span className="font-serif text-[15px]">{currency(product.price * qty)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-ink/[0.08] px-6 py-5">
              {coupon ? (
                <div className="mb-4 flex items-center justify-between rounded-md bg-softpink/50 px-3 py-2 text-[12px]">
                  <span className="flex items-center gap-2 text-ink/80">
                    <Tag size={13} className="text-burgundy" /> {coupon.code} — {coupon.label}
                  </span>
                  <button
                    type="button"
                    onClick={clearCoupon}
                    className="text-ink/50 transition-colors hover:text-burgundy"
                    aria-label="Remove coupon"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <form
                  className="mb-4 flex gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (applyCoupon(code)) setCode('');
                  }}
                >
                  <label htmlFor="cart-coupon" className="sr-only">
                    Coupon code
                  </label>
                  <input
                    id="cart-coupon"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Coupon code"
                    className="field py-2.5 text-[13px]"
                  />
                  <button type="submit" className="btn-outline shrink-0 px-4 py-2 text-[12px]">
                    Apply
                  </button>
                </form>
              )}

              <dl className="space-y-2 text-[13px]">
                <div className="flex justify-between">
                  <dt className="text-ink/60">Subtotal</dt>
                  <dd>{currency(subtotal)}</dd>
                </div>
                {discount > 0 ? (
                  <div className="flex justify-between text-burgundy">
                    <dt>Discount</dt>
                    <dd>−{currency(discount)}</dd>
                  </div>
                ) : null}
                <div className="flex justify-between">
                  <dt className="text-ink/60">Shipping</dt>
                  <dd>{shipping === 0 ? 'Free' : currency(shipping)}</dd>
                </div>
                <div className="flex justify-between border-t border-ink/10 pt-3 font-serif text-[17px]">
                  <dt>Total</dt>
                  <dd>{currency(total)}</dd>
                </div>
              </dl>

              <div className="mt-5 flex flex-col gap-3">
                <Link to="/checkout" onClick={closeCart} className={classNames('btn-primary w-full')}>
                  Proceed to checkout
                </Link>
                <button type="button" onClick={closeCart} className="btn-ghost w-full underline-offset-4 hover:underline">
                  Continue shopping
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
