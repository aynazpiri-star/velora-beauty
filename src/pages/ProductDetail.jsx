import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ChevronRight,
  Heart,
  Minus,
  Package,
  Plus,
  RefreshCcw,
  ShoppingBag,
  Truck,
  ZoomIn,
} from 'lucide-react';
import PageHero from '../components/ui/PageHero.jsx';
import SafeImage from '../components/ui/SafeImage.jsx';
import Rating from '../components/ui/Rating.jsx';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import WishlistButton from '../components/product/WishlistButton.jsx';
import ProductGrid from '../components/product/ProductGrid.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import { getProduct, relatedProducts, categoryName } from '../data/products.js';
import { FAQS } from '../data/content.js';
import { useStore } from '../context/StoreContext.jsx';
import { classNames, currency } from '../lib/format.js';
import NotFound from './NotFound.jsx';

const REVIEW_POOL = [
  { name: 'Isabelle R.', date: '3 weeks ago', text: 'Beautiful texture and it absorbs quickly. My skin looks calmer and more even after a month of daily use.' },
  { name: 'Hannah W.', date: '1 month ago', text: 'Exactly as described. No irritation at all and it layers well with the rest of my routine.' },
  { name: 'Mei L.', date: '2 months ago', text: 'The packaging feels premium and a little goes a long way. I would happily repurchase.' },
  { name: 'Grace O.', date: '2 months ago', text: 'I have sensitive skin and this has become my favourite step. Soft, gentle and effective.' },
];

const TABS = ['Description', 'Ingredients', 'How to Use', 'Benefits', 'Reviews', 'FAQ'];

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProduct(slug);
  const navigate = useNavigate();
  const { addToCart, openCart, pushToast } = useStore();

  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('Description');
  const [zoom, setZoom] = useState(false);

  const related = useMemo(() => (product ? relatedProducts(product) : []), [product]);

  if (!product) return <NotFound />;

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const buyNow = () => {
    addToCart(product, qty);
    navigate('/checkout');
  };

  return (
    <>
      <div className="border-b border-ink/[0.07] bg-cream">
        <div className="container-velora py-5">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[12px] text-ink/50">
              <li className="flex items-center gap-2">
                <Link to="/" className="hover:text-burgundy">
                  Home
                </Link>
                <ChevronRight size={13} />
              </li>
              <li className="flex items-center gap-2">
                <Link to="/shop" className="hover:text-burgundy">
                  Shop
                </Link>
                <ChevronRight size={13} />
              </li>
              <li className="flex items-center gap-2">
                <Link to={`/collections/${product.category}`} className="hover:text-burgundy">
                  {categoryName(product.category)}
                </Link>
                <ChevronRight size={13} />
              </li>
              <li>
                <span aria-current="page" className="text-ink/75">
                  {product.name}
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <section className="bg-blush py-12 lg:py-16" aria-label="Product details">
        <div className="container-velora grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="relative overflow-hidden rounded-xl2 border border-white/70 bg-white shadow-soft">
              <button
                type="button"
                onClick={() => setZoom((z) => !z)}
                aria-label={zoom ? 'Zoom out' : 'Zoom in on product image'}
                className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white/90 backdrop-blur-sm transition-colors hover:bg-ink hover:text-cream"
              >
                <ZoomIn size={16} />
              </button>
              <SafeImage
                src={product.images[activeImage] ?? product.images[0]}
                alt={`${product.name} — image ${activeImage + 1}`}
                eager
                wrapperClassName="aspect-square"
                className={classNames(
                  'h-full w-full object-cover transition-transform duration-[900ms]',
                  zoom && 'scale-[1.35]',
                )}
                sizes="(max-width: 1024px) 100vw, 46vw"
              />
            </div>

            <ul className="mt-4 grid grid-cols-4 gap-3">
              {product.images.map((img, i) => (
                <li key={img}>
                  <button
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`Show image ${i + 1}`}
                    aria-pressed={i === activeImage}
                    className={classNames(
                      'block w-full overflow-hidden rounded-md border transition-all',
                      i === activeImage ? 'border-burgundy' : 'border-ink/10 hover:border-ink/25',
                    )}
                  >
                    <SafeImage
                      src={img}
                      alt=""
                      wrapperClassName="aspect-square"
                      className="h-full w-full object-cover"
                      sizes="120px"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow">{categoryName(product.category)}</p>
              {discount ? <Badge tone="rose">Save {discount}%</Badge> : null}
              {product.newArrival && !discount ? <Badge tone="soft">New arrival</Badge> : null}
            </div>

            <h1 className="mt-4 font-serif text-[32px] leading-tight sm:text-[40px]">{product.name}</h1>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <Rating value={product.rating} reviewCount={product.reviewCount} size={15} showValue />
              <span className="text-[12px] text-ink/50">{product.size}</span>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-serif text-[32px]">{currency(product.price)}</span>
              {product.oldPrice ? (
                <span className="text-[16px] text-ink/40 line-through">{currency(product.oldPrice)}</span>
              ) : null}
            </div>

            <p className="mt-6 text-[15px] leading-relaxed text-ink/70">{product.shortDescription}</p>

            <dl className="mt-7 grid gap-3 border-y border-ink/[0.08] py-6 text-[13px] sm:grid-cols-2">
              <div>
                <dt className="text-ink/45">Skin type</dt>
                <dd className="mt-1 text-ink/85">{product.skinType?.join(', ') || 'All skin types'}</dd>
              </div>
              <div>
                <dt className="text-ink/45">Product type</dt>
                <dd className="mt-1 text-ink/85">{product.type}</dd>
              </div>
              {product.concerns?.length ? (
                <div className="sm:col-span-2">
                  <dt className="text-ink/45">Targets</dt>
                  <dd className="mt-1 text-ink/85">{product.concerns.join(' · ')}</dd>
                </div>
              ) : null}
            </dl>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center rounded-md border border-ink/15 bg-white">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="inline-flex h-12 w-12 items-center justify-center text-ink/70 transition-colors hover:text-burgundy"
                >
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center text-sm" aria-live="polite">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="inline-flex h-12 w-12 items-center justify-center text-ink/70 transition-colors hover:text-burgundy"
                >
                  <Plus size={16} />
                </button>
              </div>

              <Button
                onClick={() => {
                  addToCart(product, qty);
                  openCart();
                }}
                className="flex-1 py-3.5 sm:flex-none sm:px-9"
              >
                <ShoppingBag size={16} strokeWidth={1.8} /> Add to cart
              </Button>

              <Button variant="ink" onClick={buyNow} className="flex-1 py-3.5 sm:flex-none sm:px-9">
                Buy now
              </Button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <WishlistButton
                product={product}
                showLabel
                className="px-6 py-3 text-[13px]"
              />
              <button
                type="button"
                onClick={() => pushToast('Product link copied to your clipboard')}
                className="inline-flex items-center gap-2 rounded-md border border-ink/20 px-6 py-3 text-[13px] transition-colors hover:border-burgundy hover:text-burgundy"
              >
                <Heart size={15} strokeWidth={1.7} /> Share
              </button>
            </div>

            <ul className="mt-8 space-y-3 rounded-xl2 border border-ink/[0.07] bg-white p-5 text-[13px]">
              <li className="flex items-center gap-3 text-ink/70">
                <Truck size={16} className="text-burgundy" strokeWidth={1.6} />
                Free standard shipping on orders over $75
              </li>
              <li className="flex items-center gap-3 text-ink/70">
                <RefreshCcw size={16} className="text-burgundy" strokeWidth={1.6} />
                30-day returns on unopened products
              </li>
              <li className="flex items-center gap-3 text-ink/70">
                <Package size={16} className="text-burgundy" strokeWidth={1.6} />
                Dispatched within 24 hours, plastic-free packaging
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-20" aria-label="Product information">
        <div className="container-velora">
          <div className="no-scrollbar flex gap-1 overflow-x-auto border-b border-ink/[0.08]">
            {TABS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTab(item)}
                aria-selected={tab === item}
                role="tab"
                className={classNames(
                  'relative shrink-0 px-5 py-4 text-[13px] font-medium transition-colors',
                  tab === item ? 'text-burgundy' : 'text-ink/60 hover:text-ink',
                )}
              >
                {item}
                {tab === item ? <span className="absolute inset-x-4 bottom-0 h-px bg-burgundy" /> : null}
              </button>
            ))}
          </div>

          <div className="mt-10 max-w-3xl" role="tabpanel">
            {tab === 'Description' ? (
              <p className="text-[15px] leading-relaxed text-ink/75">{product.description}</p>
            ) : null}

            {tab === 'Ingredients' ? (
              <ul className="grid gap-3 sm:grid-cols-2">
                {product.ingredients?.map((ing) => (
                  <li
                    key={ing}
                    className="rounded-md border border-ink/[0.07] bg-cream px-4 py-3 text-[13px] text-ink/75"
                  >
                    {ing}
                  </li>
                ))}
              </ul>
            ) : null}

            {tab === 'How to Use' ? (
              <ol className="space-y-4">
                {product.howToUse?.map((stepText, i) => (
                  <li key={stepText} className="flex gap-4 text-[14px] leading-relaxed text-ink/75">
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-softpink/60 font-serif text-[13px] text-burgundy">
                      {i + 1}
                    </span>
                    {stepText}
                  </li>
                ))}
              </ol>
            ) : null}

            {tab === 'Benefits' ? (
              <ul className="grid gap-3 sm:grid-cols-2">
                {product.benefits?.map((benefit) => (
                  <li
                    key={benefit}
                    className="rounded-md border border-ink/[0.07] bg-cream px-4 py-3 text-[13px] text-ink/75"
                  >
                    {benefit}
                  </li>
                ))}
              </ul>
            ) : null}

            {tab === 'Reviews' ? (
              <div>
                <div className="flex flex-wrap items-center gap-6 rounded-xl2 border border-ink/[0.07] bg-cream p-6">
                  <div>
                    <p className="font-serif text-[40px] leading-none">{product.rating.toFixed(1)}</p>
                    <Rating value={product.rating} className="mt-2" />
                    <p className="mt-2 text-[12px] text-ink/55">
                      Based on {product.reviewCount} verified reviews
                    </p>
                  </div>
                </div>

                <ul className="mt-8 space-y-6">
                  {REVIEW_POOL.map((review) => (
                    <li key={review.name} className="border-b border-ink/[0.07] pb-6 last:border-0">
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-serif text-[15px]">{review.name}</p>
                        <p className="text-[12px] text-ink/45">{review.date}</p>
                      </div>
                      <Rating value={5} className="mt-2" />
                      <p className="mt-3 text-[14px] leading-relaxed text-ink/75">{review.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {tab === 'FAQ' ? (
              <div className="divide-y divide-ink/[0.08]">
                {FAQS.map((faq) => (
                  <details key={faq.q} className="group py-5">
                    <summary className="flex cursor-pointer items-center justify-between gap-4 font-serif text-[16px]">
                      {faq.q}
                      <span className="text-burgundy transition-transform group-open:rotate-45">＋</span>
                    </summary>
                    <p className="mt-3 text-[14px] leading-relaxed text-ink/70">{faq.a}</p>
                  </details>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="bg-blush py-16 lg:py-20" aria-labelledby="related-heading">
          <div className="container-velora">
            <SectionHeading align="left" eyebrow="You may also like" title="Complete Your Routine" />
            <ProductGrid products={related} className="mt-10" />
          </div>
        </section>
      ) : null}

      <PageHero
        eyebrow="Velora promise"
        title="Beauty that respects your skin"
        description="Every formula is dermatologist tested, cruelty free and made without unnecessary harsh chemicals."
        align="center"
      />
    </>
  );
}
