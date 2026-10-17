import { Heart, ShoppingBag, Trash2 } from 'lucide-react'
import { useState } from 'react'
import QuickView from '../components/product/QuickView'
import ProductGrid from '../components/product/ProductGrid'
import Button from '../components/ui/Button'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import { useStore } from '../context/StoreContext'
import { IMG, products } from '../data/products'
import { toFaDigits } from '../lib/format'

export default function Wishlist() {
  const { wishlist, addToCart, toggleWishlist } = useStore()
  const [quickView, setQuickView] = useState(null)

  const saved = products.filter((product) => wishlist.includes(product.id))

  return (
    <>
      <PageHero
        eyebrow="نشان‌شده‌ها"
        title="علاقه‌مندی‌های من"
        subtitle="رایحه‌هایی که نشان کرده‌اید اینجا نگه داشته می‌شوند تا بعداً راحت‌تر انتخاب کنید."
        image={IMG.oceanRocks}
        breadcrumb={[{ label: 'علاقه‌مندی‌ها' }]}
      />

      <section className="bg-ivory py-14 sm:py-20">
        <div className="container-x">
          {saved.length === 0 ? (
            <div className="mx-auto max-w-lg rounded-[26px] border border-dashed border-ivory-line bg-white px-6 py-16 text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ivory text-ocean">
                <Heart className="h-7 w-7" aria-hidden="true" />
              </span>
              <h2 className="mt-6 text-[18px] font-semibold text-ink">
                هنوز رایحه‌ای را نشان نکرده‌اید
              </h2>
              <p className="mt-4 text-[12.5px] leading-7 text-ink-muted">
                با زدن آیکن قلب روی هر عطر، آن را به این فهرست اضافه کنید. این فهرست در همین مرورگر
                ذخیره می‌شود.
              </p>
              <Button variant="primary" className="mt-7" to="/shop">
                مشاهده‌ی فروشگاه
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <p className="tnum text-[12.5px] text-ink-muted">
                  <span className="font-medium text-ink">{toFaDigits(saved.length)}</span> عطر در
                  فهرست علاقه‌مندی‌ها
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => saved.forEach((product) => addToCart(product.id))}
                  >
                    <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
                    افزودن همه به سبد خرید
                  </Button>
                  <button
                    type="button"
                    onClick={() => saved.forEach((product) => toggleWishlist(product.id))}
                    className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-4 py-2 text-[11.5px] text-ink transition hover:border-red-300 hover:text-red-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    پاک کردن فهرست
                  </button>
                </div>
              </div>

              <Reveal>
                <ProductGrid products={saved} onQuickView={setQuickView} />
              </Reveal>
            </>
          )}
        </div>
      </section>

      <QuickView product={quickView} onClose={() => setQuickView(null)} />
    </>
  )
}
