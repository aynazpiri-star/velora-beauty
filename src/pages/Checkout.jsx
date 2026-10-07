import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, CreditCard, Lock, ShieldCheck, Truck } from 'lucide-react';
import PageHero from '../components/ui/PageHero.jsx';
import SafeImage from '../components/ui/SafeImage.jsx';
import Button from '../components/ui/Button.jsx';
import { useStore } from '../context/StoreContext.jsx';
import { classNames, currency } from '../lib/format.js';

const DELIVERY = [
  { id: 'standard', label: 'Standard delivery', detail: '3–5 business days', price: 6 },
  { id: 'express', label: 'Express delivery', detail: '1–2 business days', price: 14 },
  { id: 'pickup', label: 'Collect in store', detail: 'Ready tomorrow, London', price: 0 },
];

const PAYMENTS = [
  { id: 'card', label: 'Credit or debit card', detail: 'Visa, Mastercard, Amex' },
  { id: 'wallet', label: 'Digital wallet', detail: 'Apple Pay or Google Pay' },
  { id: 'later', label: 'Pay in 3 instalments', detail: 'Interest free, no fees' },
];

export default function Checkout() {
  const { cart, subtotal, discount, coupon, shipping, total, clearCart, itemCount } = useStore();
  const [delivery, setDelivery] = useState('standard');
  const [payment, setPayment] = useState('card');
  const [placed, setPlaced] = useState(null);

  const deliveryOption = DELIVERY.find((d) => d.id === delivery) ?? DELIVERY[0];
  const deliveryCost = cart.length ? (subtotal - discount >= 75 ? 0 : deliveryOption.price) : 0;
  const orderTotal = Math.max(0, Math.round((subtotal - discount + deliveryCost) * 100) / 100);

  const placeOrder = (e) => {
    e.preventDefault();
    const reference = `VLR-${Math.floor(10000 + Math.random() * 89999)}`;
    setPlaced({ reference, total: orderTotal });
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (placed) {
    return (
      <>
        <PageHero
          eyebrow="Order confirmed"
          title="Thank you for your order"
          description={`Your order ${placed.reference} has been placed successfully. A confirmation email is on its way.`}
          breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Checkout' }]}
          align="center"
        />
        <section className="bg-blush py-16">
          <div className="container-velora mx-auto max-w-xl">
            <div className="rounded-xl2 border border-ink/[0.07] bg-white p-8 text-center shadow-soft">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-softpink/60 text-burgundy">
                <Check size={28} strokeWidth={1.8} />
              </span>
              <h2 className="mt-6 font-serif text-[24px]">Order {placed.reference}</h2>
              <p className="mt-3 text-[14px] text-ink/65">
                Total paid {currency(placed.total)}. This demo storefront does not process real
                payments — no card was charged.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button to="/shop">Continue shopping</Button>
                <Button to="/account" variant="outline">
                  View your orders
                </Button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (!cart.length) {
    return (
      <>
        <PageHero
          eyebrow="Checkout"
          title="Your bag is empty"
          description="Add a few favourites to your bag and come back to complete your order."
          breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Checkout' }]}
        />
        <section className="bg-blush py-16">
          <div className="container-velora flex justify-center">
            <Button to="/shop">Start shopping</Button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Checkout"
        title="Complete Your Order"
        description="This is a demonstration checkout — no real payment is processed and no card details are stored."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Checkout' }]}
      />

      <section className="bg-blush py-14 lg:py-20" aria-label="Checkout form">
        <div className="container-velora grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
          <form onSubmit={placeOrder} className="space-y-8">
            <fieldset className="rounded-xl2 border border-ink/[0.07] bg-white p-7 shadow-soft">
              <legend className="px-1 font-serif text-[20px]">Contact information</legend>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="co-email" className="mb-2 block text-[13px] text-ink/70">
                    Email address
                  </label>
                  <input id="co-email" type="email" required placeholder="you@example.com" className="field" />
                </div>
                <div>
                  <label htmlFor="co-phone" className="mb-2 block text-[13px] text-ink/70">
                    Phone number
                  </label>
                  <input id="co-phone" type="tel" required placeholder="+1 (000) 000-0000" className="field" />
                </div>
              </div>
            </fieldset>

            <fieldset className="rounded-xl2 border border-ink/[0.07] bg-white p-7 shadow-soft">
              <legend className="px-1 font-serif text-[20px]">Shipping address</legend>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="co-name" className="mb-2 block text-[13px] text-ink/70">
                    Full name
                  </label>
                  <input id="co-name" required placeholder="Amelia Hart" className="field" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="co-line1" className="mb-2 block text-[13px] text-ink/70">
                    Address
                  </label>
                  <input id="co-line1" required placeholder="42 Rosewood Avenue" className="field" />
                </div>
                <div>
                  <label htmlFor="co-city" className="mb-2 block text-[13px] text-ink/70">
                    City
                  </label>
                  <input id="co-city" required placeholder="London" className="field" />
                </div>
                <div>
                  <label htmlFor="co-postcode" className="mb-2 block text-[13px] text-ink/70">
                    Postcode
                  </label>
                  <input id="co-postcode" required placeholder="SW1A 1AA" className="field" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="co-country" className="mb-2 block text-[13px] text-ink/70">
                    Country
                  </label>
                  <input id="co-country" required defaultValue="United Kingdom" className="field" />
                </div>
              </div>
            </fieldset>

            <fieldset className="rounded-xl2 border border-ink/[0.07] bg-white p-7 shadow-soft">
              <legend className="px-1 font-serif text-[20px]">Delivery method</legend>
              <div className="mt-5 space-y-3">
                {DELIVERY.map((option) => (
                  <label
                    key={option.id}
                    className={classNames(
                      'flex cursor-pointer items-center justify-between gap-4 rounded-md border px-5 py-4 transition-colors',
                      delivery === option.id ? 'border-burgundy bg-blush' : 'border-ink/12 hover:border-ink/25',
                    )}
                  >
                    <span className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="delivery"
                        checked={delivery === option.id}
                        onChange={() => setDelivery(option.id)}
                        className="h-4 w-4 accent-[#9B4560]"
                      />
                      <span>
                        <span className="block text-[14px]">{option.label}</span>
                        <span className="mt-0.5 block text-[12px] text-ink/55">{option.detail}</span>
                      </span>
                    </span>
                    <span className="text-[13px]">{option.price === 0 ? 'Free' : currency(option.price)}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="rounded-xl2 border border-ink/[0.07] bg-white p-7 shadow-soft">
              <legend className="px-1 font-serif text-[20px]">Payment method</legend>
              <div className="mt-5 space-y-3">
                {PAYMENTS.map((option) => (
                  <label
                    key={option.id}
                    className={classNames(
                      'flex cursor-pointer items-center gap-4 rounded-md border px-5 py-4 transition-colors',
                      payment === option.id ? 'border-burgundy bg-blush' : 'border-ink/12 hover:border-ink/25',
                    )}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={payment === option.id}
                      onChange={() => setPayment(option.id)}
                      className="h-4 w-4 accent-[#9B4560]"
                    />
                    <span>
                      <span className="block text-[14px]">{option.label}</span>
                      <span className="mt-0.5 block text-[12px] text-ink/55">{option.detail}</span>
                    </span>
                  </label>
                ))}
              </div>

              {payment === 'card' ? (
                <div className="mt-6 grid gap-5 rounded-md bg-blush p-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="co-card" className="mb-2 block text-[13px] text-ink/70">
                      Card number
                    </label>
                    <input
                      id="co-card"
                      inputMode="numeric"
                      placeholder="4242 4242 4242 4242"
                      className="field"
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <label htmlFor="co-expiry" className="mb-2 block text-[13px] text-ink/70">
                      Expiry
                    </label>
                    <input id="co-expiry" placeholder="MM / YY" className="field" autoComplete="off" />
                  </div>
                  <div>
                    <label htmlFor="co-cvc" className="mb-2 block text-[13px] text-ink/70">
                      CVC
                    </label>
                    <input id="co-cvc" placeholder="123" className="field" autoComplete="off" />
                  </div>
                  <p className="flex items-center gap-2 text-[12px] text-ink/50 sm:col-span-2">
                    <Lock size={13} /> Demo only — please do not enter real card details.
                  </p>
                </div>
              ) : null}
            </fieldset>

            <button type="submit" className="btn-primary w-full py-4 text-[13px] uppercase tracking-[0.14em]">
              Place order — {currency(orderTotal)}
            </button>
          </form>

          <aside className="lg:sticky lg:top-28 lg:self-start" aria-label="Order summary">
            <div className="rounded-xl2 border border-ink/[0.07] bg-white p-7 shadow-soft">
              <h2 className="font-serif text-[20px]">Order summary</h2>
              <p className="mt-1 text-[12px] text-ink/55">{itemCount} items in your bag</p>

              <ul className="mt-6 space-y-5">
                {cart.map(({ id, qty, product }) => (
                  <li key={id} className="flex gap-4">
                    <SafeImage
                      src={product.images[0]}
                      alt={product.name}
                      wrapperClassName="h-20 w-16 shrink-0 rounded-md"
                      className="h-full w-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-serif text-[14px] leading-snug">{product.name}</p>
                      <p className="mt-1 text-[12px] text-ink/50">Qty {qty}</p>
                    </div>
                    <span className="text-[13px]">{currency(product.price * qty)}</span>
                  </li>
                ))}
              </ul>

              <dl className="mt-7 space-y-2 border-t border-ink/10 pt-5 text-[13px]">
                <div className="flex justify-between">
                  <dt className="text-ink/60">Subtotal</dt>
                  <dd>{currency(subtotal)}</dd>
                </div>
                {discount > 0 ? (
                  <div className="flex justify-between text-burgundy">
                    <dt>Discount{coupon ? ` (${coupon.code})` : ''}</dt>
                    <dd>−{currency(discount)}</dd>
                  </div>
                ) : null}
                <div className="flex justify-between">
                  <dt className="text-ink/60">Shipping</dt>
                  <dd>{deliveryCost === 0 ? 'Free' : currency(deliveryCost)}</dd>
                </div>
                <div className="flex justify-between border-t border-ink/10 pt-4 font-serif text-[19px]">
                  <dt>Total</dt>
                  <dd>{currency(orderTotal)}</dd>
                </div>
              </dl>

              <ul className="mt-7 space-y-3 text-[12px] text-ink/60">
                <li className="flex items-center gap-3">
                  <Truck size={15} className="text-burgundy" strokeWidth={1.6} /> Free shipping over $75
                </li>
                <li className="flex items-center gap-3">
                  <ShieldCheck size={15} className="text-burgundy" strokeWidth={1.6} /> Secure, encrypted checkout
                </li>
                <li className="flex items-center gap-3">
                  <CreditCard size={15} className="text-burgundy" strokeWidth={1.6} /> Demo payment — no charge
                </li>
              </ul>

              <Link to="/shop" className="link-underline mt-7 inline-flex text-[13px]">
                Continue shopping
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
