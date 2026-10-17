import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft, Minus, Package, Plus, RefreshCw, ShieldCheck, Truck } from 'lucide-react'
import QuickView from '../components/product/QuickView'
import ProductGrid from '../components/product/ProductGrid'
import WishlistButton from '../components/product/WishlistButton'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import SafeImage from '../components/ui/SafeImage'
import { useStore } from '../context/StoreContext'
import { FAMILY_LABELS, IMG, getProduct, relatedProducts } from '../data/products'
import { classNames } from '../lib/classNames'
import { toFaDigits, toFaNumber } from '../lib/format'

const SERVICE_NOTES = [
  { icon: Truck, title: 'ارسال سریع', text: '۲ تا ۴ روز کاری' },
  { icon: ShieldCheck, title: 'تضمین اصالت', text: 'کارت اصالت AURA' },
  { icon: RefreshCw, title: 'بازگشت کالا', text: 'تا ۳۰ روز' },
]

const TABS = [
  { id: 'description', label: 'توضیحات' },
  { id: 'notes', label: 'نت‌های رایحه' },
  { id: 'shipping', label: 'ارسال و بازگشت' },
]

export default function ProductDetail() {
  const { slug } = useParams()
  const product = getProduct(slug)
  const { addToCart } = useStore()
  const [qty, setQty] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [tab, setTab] = useState('description')
  const [quickView, setQuickView] = useState(null)

  const related = useMemo(() => (product ? relatedProducts(product, 4) : []), [product])

  if (!product) {
    return (
      <section className="bg-ivory pb-24 pt-40">
        <div className="container-x text-center">
          <p className="eyebrow mb-3 text-turquoise-dark">۴۰۴</p>
          <h1 className="text-[24px] font-semibold text-ink sm:text-[32px]">این عطر پیدا نشد</h1>
          <p className="mx-auto mt-4 max-w-md text-[13px] leading-7 text-ink-muted">
            ممکن است نشانی تغییر کرده باشد یا این محصول از کالکشن حذف شده باشد.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button variant="primary" to="/shop">
              مشاهده‌ی فروشگاه
            </Button>
            <Button variant="outline" to="/">
              صفحه اصلی
            </Button>
          </div>
        </div>
      </section>
    )
  }

  const gallery = product.gallery?.length ? product.gallery : [product.image]

  return (
    <>
      <section className="bg-ivory pb-16 pt-28 sm:pb-20 sm:pt-36">
        <div className="container-x">
          <nav aria-label="مسیر صفحه" className="mb-8 flex flex-wrap items-center gap-2 text-[11.5px] text-ink-muted">
            <Link to="/" className="transition hover:text-ink">
              صفحه اصلی
            </Link>
            <ChevronLeft className="h-3 w-3" aria-hidden="true" />
            <Link to="/shop" className="transition hover:text-ink">
              فروشگاه عطر
            </Link>
            <ChevronLeft className="h-3 w-3" aria-hidden="true" />
            <Link
              to={`/collections/${product.gender}`}
              className="transition hover:text-ink"
            >
              {product.gender === 'women'
                ? 'عطرهای زنانه'
                : product.gender === 'men'
                  ? 'عطرهای مردانه'
                  : 'عطرهای یونیسکس'}
            </Link>
            <ChevronLeft className="h-3 w-3" aria-hidden="true" />
            <span className="text-ink">{product.name}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Gallery */}
            <Reveal className="flex flex-col gap-3 sm:flex-row-reverse sm:items-start">
              <SafeImage
                src={gallery[activeImage]}
                alt={`${product.name} — تصویر ${toFaDigits(activeImage + 1)}`}
                loading="eager"
                wrapperClassName="aspect-[4/5] w-full rounded-[26px] shadow-soft"
              />
              {gallery.length > 1 && (
                <ul className="flex gap-3 sm:w-24 sm:flex-col">
                  {gallery.map((image, index) => (
                    <li key={image}>
                      <button
                        type="button"
                        onClick={() => setActiveImage(index)}
                        aria-label={`نمایش تصویر ${toFaDigits(index + 1)}`}
                        aria-current={activeImage === index}
                        className={classNames(
                          'block overflow-hidden rounded-2xl border-2 transition',
                          activeImage === index
                            ? 'border-turquoise'
                            : 'border-transparent opacity-70 hover:opacity-100',
                        )}
                      >
                        <SafeImage
                          src={image}
                          alt=""
                          wrapperClassName="aspect-square w-16 sm:w-full"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>

            {/* Buy box */}
            <Reveal delay={120} className="flex flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="eyebrow text-turquoise-dark">{FAMILY_LABELS[product.family]}</span>
                  <h1 className="mt-3 text-[26px] font-semibold leading-9 text-ink sm:text-[34px]">
                    {product.name}
                  </h1>
                  <p className="mt-1 text-[12px] uppercase tracking-wide2 text-ink-muted/80">
                    {product.nameEn}
                  </p>
                </div>
                <WishlistButton productId={product.id} productName={product.name} tone="dark" />
              </div>

              <p className="mt-5 text-[14px] leading-8 text-ink-muted">{product.tagline}</p>

              <div className="mt-7 flex items-end gap-4">
                <p className="tnum text-[26px] font-semibold text-ocean">
                  {toFaNumber(product.price)}
                  <span className="ms-2 text-[13px] font-normal text-ink-muted">تومان</span>
                </p>
                {product.oldPrice && (
                  <s className="tnum pb-1 text-[14px] text-ink-muted/60">
                    {toFaNumber(product.oldPrice)}
                  </s>
                )}
              </div>

              <dl className="mt-7 grid gap-3 border-y border-ivory-line py-6 text-[12.5px] sm:grid-cols-2">
                <div>
                  <dt className="text-ink-muted">حجم</dt>
                  <dd className="mt-1 text-ink">{product.size}</dd>
                </div>
                <div>
                  <dt className="text-ink-muted">غلظت</dt>
                  <dd className="mt-1 text-ink">{product.concentration}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-ink-muted">نت‌های رایحه</dt>
                  <dd className="mt-1 text-ink">{product.notes.join(' · ')}</dd>
                </div>
              </dl>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <div className="flex items-center rounded-full border border-ivory-line bg-white">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={qty <= 1}
                    className="rounded-full p-3 text-ink transition hover:bg-ivory-deep disabled:opacity-40"
                    aria-label="کاهش تعداد"
                  >
                    <Minus className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <span className="tnum w-10 text-center text-[14px] font-medium">
                    {toFaDigits(qty)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.min(20, q + 1))}
                    className="rounded-full p-3 text-ink transition hover:bg-ivory-deep disabled:opacity-40"
                    disabled={qty >= 20}
                    aria-label="افزودن تعداد"
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1 min-w-[180px]"
                  onClick={() => addToCart(product.id, qty)}
                >
                  افزودن به سبد خرید
                </Button>
              </div>

              <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                {SERVICE_NOTES.map((note) => (
                  <li
                    key={note.title}
                    className="flex items-center gap-3 rounded-2xl border border-ivory-line bg-white px-4 py-3"
                  >
                    <note.icon className="h-4 w-4 shrink-0 text-ocean" aria-hidden="true" />
                    <span>
                      <span className="block text-[12px] font-medium text-ink">{note.title}</span>
                      <span className="block text-[10.5px] text-ink-muted">{note.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="bg-ivory-deep py-14 sm:py-20">
        <div className="container-x">
          <div
            role="tablist"
            aria-label="اطلاعات محصول"
            className="flex flex-wrap gap-2 border-b border-ivory-line pb-4"
          >
            {TABS.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={tab === item.id}
                onClick={() => setTab(item.id)}
                className={classNames(
                  'rounded-full px-5 py-2.5 text-[12.5px] transition',
                  tab === item.id
                    ? 'bg-ink text-white'
                    : 'bg-white text-ink hover:bg-champagne/40',
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-8 max-w-3xl">
            {tab === 'description' && (
              <div>
                <h2 className="text-[16px] font-semibold text-ink">درباره‌ی {product.name}</h2>
                <p className="mt-4 text-[13.5px] leading-8 text-ink-muted">{product.description}</p>
                <p className="mt-4 text-[13.5px] leading-8 text-ink-muted">
                  این رایحه از خانواده‌ی «{FAMILY_LABELS[product.family]}» است و برای استفاده‌ی
                  {' '}
                  {product.occasion.includes('daily') ? 'روزانه' : 'مناسبت‌های خاص'}
                  {' '}
                  پیشنهاد می‌شود.
                </p>
              </div>
            )}

            {tab === 'notes' && (
              <div>
                <h2 className="text-[16px] font-semibold text-ink">هرم بویایی</h2>
                <ol className="mt-5 space-y-3">
                  {product.notes.map((note, index) => (
                    <li
                      key={note}
                      className="flex items-center gap-4 rounded-2xl border border-ivory-line bg-white px-5 py-4"
                    >
                      <span className="tnum flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ocean/10 text-[12px] text-ocean">
                        {toFaDigits(index + 1)}
                      </span>
                      <span className="text-[13px] text-ink">{note}</span>
                      <span className="ms-auto text-[11px] text-ink-muted">
                        {index === 0 ? 'نت آغازین' : index === 1 ? 'نت میانی' : 'نت پایه'}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {tab === 'shipping' && (
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <Package className="mt-1 h-4 w-4 shrink-0 text-ocean" aria-hidden="true" />
                  <p className="text-[13px] leading-8 text-ink-muted">
                    عطرها در بسته‌بندی ضدضربه‌ی AURA، همراه با نمونه‌ی رایحه و کارت اصالت ارسال
                    می‌شوند.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="mt-1 h-4 w-4 shrink-0 text-ocean" aria-hidden="true" />
                  <p className="text-[13px] leading-8 text-ink-muted">
                    ارسال به سراسر ایران در ۲ تا ۴ روز کاری. برای سفارش‌های بالای ۳ میلیون تومان
                    ارسال رایگان است.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <RefreshCw className="mt-1 h-4 w-4 shrink-0 text-ocean" aria-hidden="true" />
                  <p className="text-[13px] leading-8 text-ink-muted">
                    تا ۳۰ روز پس از دریافت، در صورت باز‌نبودن بسته‌بندی امکان بازگشت کالا وجود دارد.
                  </p>
                </div>
                <Link to="/terms" className="link-underline inline-block text-[12.5px] text-ocean">
                  مطالعه‌ی قوانین کامل
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-ivory py-14 sm:py-20">
          <div className="container-x">
            <div className="mb-8">
              <p className="eyebrow mb-3 flex items-center gap-3 text-turquoise-dark">
                <span className="h-px w-8 bg-turquoise-dark" />
                پیشنهاد AURA
              </p>
              <h2 className="text-[24px] font-semibold text-ink sm:text-[30px]">عطرهای مشابه</h2>
            </div>
            <Reveal>
              <ProductGrid products={related} onQuickView={setQuickView} />
            </Reveal>
          </div>
        </section>
      )}

      <QuickView product={quickView} onClose={() => setQuickView(null)} />
    </>
  )
}
