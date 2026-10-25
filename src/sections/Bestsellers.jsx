import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import { IconArrowLeft } from '../components/Icons'

export default function Bestsellers() {
  const bestsellers = products.filter((product) => product.bestseller)

  return (
    <section className="bg-cream/40 py-14 lg:py-20">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">پرفروش‌ها</p>
            <h2 className="heading-lg mt-3">محبوب‌ترین جواهرات ما</h2>
            <p className="mt-2.5 text-[12px] text-muted sm:text-[12.5px]">
              قطعه‌هایی که بیشتر از همه انتخاب می‌شوند
            </p>
          </div>
          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 text-[11.5px] text-ink transition-colors hover:text-gold"
          >
            مشاهده همه
            <IconArrowLeft
              size={15}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
          </Link>
        </div>

        <div className="mt-9 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
