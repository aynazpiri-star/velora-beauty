import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products } from '../../data/products'
import QuickView from '../product/QuickView'
import ProductGrid from '../product/ProductGrid'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

/** The main catalogue section on the home page. */
export default function FeaturedPerfumes() {
  const [quickView, setQuickView] = useState(null)
  const featured = products.filter((product) => product.featured).slice(0, 8)

  return (
    <section className="bg-ivory py-16 sm:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="کالکشن AURA"
          title="رایحه‌های منتخب"
          subtitle="انتخاب‌هایی برای سلیقه‌های خاص"
          action={
            <Link
              to="/shop"
              className="link-underline inline-flex items-center gap-2 text-[12.5px] text-ocean"
            >
              مشاهده‌ی همه‌ی عطرها
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          }
        />

        <Reveal delay={80} className="mt-10">
          <ProductGrid products={featured} onQuickView={setQuickView} />
        </Reveal>
      </div>

      <QuickView product={quickView} onClose={() => setQuickView(null)} />
    </section>
  )
}
