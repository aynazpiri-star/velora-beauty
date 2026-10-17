import { useState } from 'react'
import { Gift, Package, Sparkles } from 'lucide-react'
import QuickView from '../components/product/QuickView'
import ProductGrid from '../components/product/ProductGrid'
import Button from '../components/ui/Button'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import { IMG, collectionProducts } from '../data/products'

const HIGHLIGHTS = [
  {
    icon: Package,
    title: 'بسته‌بندی ویژه‌ی هدیه',
    text: 'جعبه‌ی سخت AURA با روبان ساتن و کاغذ کالای داخلی.',
  },
  {
    icon: Gift,
    title: 'کارت پیام اختصاصی',
    text: 'متن دلخواه شما روی کارت AURA چاپ و همراه سفارش ارسال می‌شود.',
  },
  {
    icon: Sparkles,
    title: 'نمونه رایحه هدیه',
    text: 'با هر ست هدیه، یک نمونه‌ی ۲ میلی‌لیتری مهمان شماست.',
  },
]

export default function GiftSets() {
  const [quickView, setQuickView] = useState(null)
  const giftProducts = collectionProducts('gift')

  return (
    <>
      <PageHero
        eyebrow="هدیه‌ی AURA"
        title="ست‌های هدیه و ست‌های تست"
        subtitle="رایحه، شخصی‌ترین هدیه است. با ست‌های AURA یک تجربه‌ی کامل از عطر را هدیه بده."
        image={IMG.velvetBox}
        breadcrumb={[{ label: 'ست‌های هدیه' }]}
      />

      <section className="bg-ivory py-14 sm:py-20">
        <div className="container-x grid gap-6 sm:grid-cols-3">
          {HIGHLIGHTS.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 70}
              className="rounded-[22px] border border-ivory-line bg-white p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ivory text-ocean">
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-[14px] font-semibold text-ink">{item.title}</h2>
              <p className="mt-2 text-[12px] leading-7 text-ink-muted">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ivory pb-16 sm:pb-24">
        <div className="container-x">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-3 flex items-center gap-3 text-turquoise-dark">
                <span className="h-px w-8 bg-turquoise-dark" />
                قابل هدیه دادن
              </p>
              <h2 className="text-[24px] font-semibold text-ink sm:text-[30px]">
                انتخاب‌های مناسب هدیه
              </h2>
            </div>
            <Button variant="outline" to="/shop" size="sm">
              مشاهده‌ی همه‌ی عطرها
            </Button>
          </div>

          {giftProducts.length === 0 ? (
            <div className="rounded-[26px] border border-dashed border-ivory-line bg-white px-6 py-16 text-center">
              <h3 className="text-[15px] font-semibold text-ink">هنوز ست هدیه‌ای ثبت نشده است</h3>
              <p className="mx-auto mt-3 max-w-md text-[12.5px] leading-7 text-ink-muted">
                به‌زودی ست‌های هدیه‌ی AURA به این بخش اضافه می‌شوند. تا آن زمان می‌توانید از میان
                عطرهای تک‌نفره انتخاب کنید.
              </p>
              <Button variant="primary" className="mt-6" to="/shop">
                مشاهده‌ی فروشگاه
              </Button>
            </div>
          ) : (
            <Reveal>
              <ProductGrid products={giftProducts} onQuickView={setQuickView} />
            </Reveal>
          )}
        </div>
      </section>

      <QuickView product={quickView} onClose={() => setQuickView(null)} />
    </>
  )
}
