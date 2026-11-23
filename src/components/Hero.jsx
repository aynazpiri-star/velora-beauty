import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import { price } from '../utils/format'
import WatchArt from './WatchArt'
import { ArrowDown, ArrowLeft, PlusIcon } from './icons'

export default function Hero() {
  const { add } = useCart()
  const featured = products[0]
  const side = products[1]

  return (
    <section className="hero" aria-label="معرفی مجموعهٔ ولورا">
      <div className="hero__panel">
        <div className="hero__bg" aria-hidden="true" />
        <div className="hero__notch hero__notch--top" aria-hidden="true" />
        <div className="hero__notch hero__notch--bottom" aria-hidden="true" />

        <div className="hero__lang" aria-label="زبان">
          <span className="is-active">FA</span>
          <span>EN</span>
        </div>

        <div className="hero__copy">
          <span className="hero__eyebrow">مجموعهٔ ۲۰۲۶ — سری نوا</span>
          <h1 className="hero__title">
            <span className="solid">کرونوگراف</span>
            <span className="outline">طلایی</span>
          </h1>
          <p className="hero__price">از {price(featured.price)}</p>
          <Link className="hero__cta" to={`/product/${featured.id}`}>
            مشاهدهٔ ساعت
            <ArrowLeft />
          </Link>
        </div>

        <WatchArt className="hero__watch" />

        <Link
          className="hero__side"
          to={`/product/${side.id}`}
          aria-label={side.name}
        >
          <img src={side.image} alt={side.name} />
          <span className="hero__side-arrow">
            <ArrowLeft />
          </span>
        </Link>

        <Link className="hero__mini" to="/#story" aria-label="داستان آتلیهٔ ولورا">
          <img src="/images/p7.jpg" alt="آتلیهٔ ساعت‌سازی ولورا" />
          <span>پشت صحنهٔ آتلیه</span>
        </Link>

        <div className="hero__bottom">
          <Link className="hero__explore" to="/#collections">
            کاوش
            <ArrowDown />
          </Link>
          <button
            type="button"
            className="hero__add"
            onClick={() => add(featured)}
          >
            <PlusIcon />
            افزودن به سبد
          </button>
          <Link className="hero__circle" to="/shop" aria-label="مشاهدهٔ فروشگاه">
            <ArrowLeft />
          </Link>
        </div>
      </div>
    </section>
  )
}
