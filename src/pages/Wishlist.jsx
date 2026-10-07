import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import PageHero from '../components/ui/PageHero.jsx';
import SafeImage from '../components/ui/SafeImage.jsx';
import Rating from '../components/ui/Rating.jsx';
import Button from '../components/ui/Button.jsx';
import ProductGrid from '../components/product/ProductGrid.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import { useStore } from '../context/StoreContext.jsx';
import { PRODUCTS, categoryName, bestSellers } from '../data/products.js';
import { currency } from '../lib/format.js';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, openCart } = useStore();
  const saved = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <>
      <PageHero
        eyebrow="Wishlist"
        title="Your Saved Favourites"
        description="Everything you have hearted, kept in one place until you are ready."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Wishlist' }]}
      />

      <section className="bg-blush py-14 lg:py-20" aria-label="Saved products">
        <div className="container-velora">
          {saved.length === 0 ? (
            <div className="mx-auto max-w-lg rounded-xl2 border border-dashed border-ink/15 bg-cream px-8 py-16 text-center">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-softpink/60 text-burgundy">
                <Heart size={26} strokeWidth={1.5} />
              </span>
              <h2 className="mt-6 font-serif text-2xl">Your wishlist is empty</h2>
              <p className="mt-3 text-sm text-ink/60">
                Tap the heart on any product to save it here for later.
              </p>
              <Button to="/shop" className="mt-7">
                Browse products
              </Button>
            </div>
          ) : (
            <>
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {saved.map((product) => (
                  <li
                    key={product.id}
                    className="flex gap-5 rounded-xl2 border border-ink/[0.07] bg-white p-5 shadow-soft"
                  >
                    <Link to={`/product/${product.slug}`} className="shrink-0">
                      <SafeImage
                        src={product.images[0]}
                        alt={product.name}
                        wrapperClassName="h-32 w-24 rounded-md"
                        className="h-full w-full object-cover"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-rose">
                        {categoryName(product.category)}
                      </p>
                      <h3 className="mt-1.5 font-serif text-[16px] leading-snug">
                        <Link to={`/product/${product.slug}`} className="hover:text-burgundy">
                          {product.name}
                        </Link>
                      </h3>
                      <Rating value={product.rating} reviewCount={product.reviewCount} className="mt-2" />
                      <p className="mt-2 font-serif text-[17px]">{currency(product.price)}</p>

                      <div className="mt-auto flex flex-wrap items-center gap-3 pt-4">
                        <button
                          type="button"
                          onClick={() => {
                            addToCart(product, 1);
                            toggleWishlist(product);
                            openCart();
                          }}
                          className="inline-flex items-center gap-2 rounded-md bg-burgundy px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-cream transition-colors hover:bg-ink"
                        >
                          <ShoppingBag size={14} /> Move to cart
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleWishlist(product)}
                          className="text-[12px] text-ink/50 transition-colors hover:text-burgundy"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button to="/shop" variant="outline">
                  Continue shopping
                </Button>
                <Button onClick={openCart} variant="ghost" className="underline-offset-4 hover:underline">
                  View your bag
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20" aria-label="Recommended products">
        <div className="container-velora">
          <SectionHeading
            align="left"
            eyebrow="Recommended"
            title="You Might Also Love"
            subtitle="Customer favourites that pair beautifully with your saved items."
          />
          <ProductGrid products={bestSellers().slice(0, 4)} className="mt-10" />
        </div>
      </section>
    </>
  );
}
