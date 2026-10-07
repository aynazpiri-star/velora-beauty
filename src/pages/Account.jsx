import { useState } from 'react';
import { Heart, Home, LogOut, MapPin, Package, Settings, ShoppingBag, User } from 'lucide-react';
import PageHero from '../components/ui/PageHero.jsx';
import Button from '../components/ui/Button.jsx';
import { useStore } from '../context/StoreContext.jsx';
import { DEMO_ADDRESSES, DEMO_ORDERS } from '../data/content.js';
import { classNames, currency } from '../lib/format.js';

const TABS = [
  { id: 'profile', label: 'Profile', Icon: User },
  { id: 'orders', label: 'Orders', Icon: Package },
  { id: 'wishlist', label: 'Wishlist', Icon: Heart },
  { id: 'addresses', label: 'Addresses', Icon: MapPin },
  { id: 'settings', label: 'Settings', Icon: Settings },
];

const CUSTOMER = {
  name: 'Amelia Hart',
  email: 'amelia.hart@example.com',
  memberSince: 'March 2024',
  points: 1240,
};

export default function Account() {
  const [tab, setTab] = useState('profile');
  const { wishlist, pushToast, openCart } = useStore();

  return (
    <>
      <PageHero
        eyebrow="Account"
        title={`Welcome back, ${CUSTOMER.name.split(' ')[0]}`}
        description="Manage your details, follow your orders and keep track of everything you love."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Account' }]}
      />

      <section className="bg-blush py-14 lg:py-20" aria-label="Account details">
        <div className="container-velora grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-12">
          <nav aria-label="Account sections">
            <ul className="no-scrollbar flex gap-2 overflow-x-auto lg:flex-col lg:gap-1 lg:overflow-visible">
              {TABS.map(({ id, label, Icon }) => (
                <li key={id} className="shrink-0 lg:w-full">
                  <button
                    type="button"
                    onClick={() => setTab(id)}
                    aria-current={tab === id ? 'true' : undefined}
                    className={classNames(
                      'flex w-full items-center gap-3 rounded-md px-4 py-3 text-[13px] transition-colors',
                      tab === id
                        ? 'bg-burgundy text-cream'
                        : 'bg-white text-ink/70 hover:bg-white/70 hover:text-burgundy lg:bg-transparent',
                    )}
                  >
                    <Icon size={16} strokeWidth={1.6} />
                    {label}
                  </button>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => pushToast('This is a demo account — sign out is disabled')}
              className="mt-6 hidden w-full items-center gap-3 rounded-md px-4 py-3 text-[13px] text-ink/50 transition-colors hover:text-burgundy lg:flex"
            >
              <LogOut size={16} strokeWidth={1.6} /> Sign out
            </button>
          </nav>

          <div className="rounded-xl2 border border-ink/[0.07] bg-white p-7 shadow-soft lg:p-9">
            {tab === 'profile' ? (
              <div>
                <h2 className="font-serif text-[24px]">Profile</h2>
                <p className="mt-2 text-[13px] text-ink/55">
                  Demo account details for this storefront preview.
                </p>

                <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.16em] text-ink/45">Full name</dt>
                    <dd className="mt-2 text-[15px]">{CUSTOMER.name}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.16em] text-ink/45">Email</dt>
                    <dd className="mt-2 text-[15px]">{CUSTOMER.email}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.16em] text-ink/45">Member since</dt>
                    <dd className="mt-2 text-[15px]">{CUSTOMER.memberSince}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.16em] text-ink/45">Glow points</dt>
                    <dd className="mt-2 text-[15px]">{CUSTOMER.points} pts</dd>
                  </div>
                </dl>

                <div className="mt-9 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl2 bg-blush p-5">
                    <p className="font-serif text-[26px]">3</p>
                    <p className="mt-1 text-[12px] text-ink/55">Orders placed</p>
                  </div>
                  <div className="rounded-xl2 bg-blush p-5">
                    <p className="font-serif text-[26px]">{wishlist.length}</p>
                    <p className="mt-1 text-[12px] text-ink/55">Saved products</p>
                  </div>
                  <div className="rounded-xl2 bg-blush p-5">
                    <p className="font-serif text-[26px]">2</p>
                    <p className="mt-1 text-[12px] text-ink/55">Saved addresses</p>
                  </div>
                </div>
              </div>
            ) : null}

            {tab === 'orders' ? (
              <div>
                <h2 className="font-serif text-[24px]">Orders</h2>
                <ul className="mt-7 space-y-5">
                  {DEMO_ORDERS.map((order) => (
                    <li
                      key={order.id}
                      className="flex flex-wrap items-center justify-between gap-4 rounded-xl2 border border-ink/[0.07] bg-blush px-5 py-5"
                    >
                      <div>
                        <p className="font-serif text-[17px]">{order.id}</p>
                        <p className="mt-1 text-[12px] text-ink/55">{order.date}</p>
                        <p className="mt-2 text-[13px] text-ink/70">{order.items.join(' · ')}</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-burgundy">
                          {order.status}
                        </span>
                        <p className="mt-2 font-serif text-[17px]">{currency(order.total)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" to="/shop" className="mt-8 gap-2">
                  <ShoppingBag size={15} /> Shop again
                </Button>
              </div>
            ) : null}

            {tab === 'wishlist' ? (
              <div>
                <h2 className="font-serif text-[24px]">Wishlist</h2>
                <p className="mt-3 text-[13px] text-ink/60">
                  You currently have {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved.
                </p>
                <Button to="/wishlist" className="mt-6">
                  View wishlist
                </Button>
              </div>
            ) : null}

            {tab === 'addresses' ? (
              <div>
                <h2 className="font-serif text-[24px]">Addresses</h2>
                <ul className="mt-7 grid gap-5 sm:grid-cols-2">
                  {DEMO_ADDRESSES.map((address) => (
                    <li key={address.label} className="rounded-xl2 border border-ink/[0.07] bg-blush p-6">
                      <div className="flex items-center justify-between">
                        <p className="inline-flex items-center gap-2 font-serif text-[17px]">
                          <Home size={15} strokeWidth={1.6} className="text-burgundy" />
                          {address.label}
                        </p>
                        {address.default ? (
                          <span className="rounded-full bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-burgundy">
                            Default
                          </span>
                        ) : null}
                      </div>
                      <address className="mt-4 text-[13px] not-italic leading-relaxed text-ink/70">
                        {address.name}
                        <br />
                        {address.line1}
                        <br />
                        {address.city} {address.postcode}
                        <br />
                        {address.country}
                      </address>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {tab === 'settings' ? (
              <div>
                <h2 className="font-serif text-[24px]">Settings</h2>
                <form
                  className="mt-7 grid max-w-xl gap-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    pushToast('Preferences saved');
                  }}
                >
                  <div>
                    <label htmlFor="settings-name" className="mb-2 block text-[13px] text-ink/70">
                      Display name
                    </label>
                    <input id="settings-name" defaultValue={CUSTOMER.name} className="field" />
                  </div>
                  <div>
                    <label htmlFor="settings-email" className="mb-2 block text-[13px] text-ink/70">
                      Email address
                    </label>
                    <input id="settings-email" type="email" defaultValue={CUSTOMER.email} className="field" />
                  </div>
                  <fieldset className="space-y-3">
                    <legend className="mb-2 text-[13px] text-ink/70">Email preferences</legend>
                    {['Order updates', 'New product launches', 'Skincare tips and journal'].map((label, i) => (
                      <label key={label} className="flex items-center gap-3 text-[13px] text-ink/75">
                        <input
                          type="checkbox"
                          defaultChecked={i !== 2}
                          className="h-4 w-4 accent-[#9B4560]"
                        />
                        {label}
                      </label>
                    ))}
                  </fieldset>
                  <Button type="submit" className="w-fit">
                    Save changes
                  </Button>
                </form>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="bg-cream py-12">
        <div className="container-velora flex flex-wrap items-center justify-between gap-5">
          <p className="text-[13px] text-ink/60">
            Your bag is waiting — {wishlist.length} saved items are ready when you are.
          </p>
          <Button variant="outline" onClick={openCart}>
            Open your bag
          </Button>
        </div>
      </section>
    </>
  );
}
