import { Link } from 'react-router-dom';
import { productsById } from '../../shared/catalog.js';
import { useStore } from '../lib/store.jsx';
import { toman } from '../lib/format.js';
import { IconArrowDown, IconArrowLeft } from './Icons.jsx';
import './hero.css';

const heroProduct = productsById['heritage-1957'];
const sideProduct = productsById['noir-automatic'];

export default function Hero() {
  const { add, openCart } = useStore();

  const addToCart = () => {
    add(heroProduct.id);
    openCart();
  };

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__panel">
        <span className="hero__notch hero__notch--top" aria-hidden="true" />
        <span className="hero__notch hero__notch--bottom" aria-hidden="true" />

        <div className="hero__grid">
          <div className="hero__copy">
            <p className="hero__eyebrow">
              <span className="hero__eyebrow-line" aria-hidden="true" />
              کالکشن ۱۴۰۴
            </p>

            <h1 className="hero__title" id="hero-title">
              <span className="hero__title-solid">هریتیج</span>
              <span className="hero__title-outline">طلایی</span>
            </h1>

            <p className="hero__price">{toman(heroProduct.price)}</p>
            <p className="hero__desc">
              قاب طلاییِ برس‌خورده، صفحهٔ قهوه‌ایِ مات و بند چرمِ دست‌دوز؛ ساعتی که با گذرِ زمان
              بهتر می‌شود.
            </p>

            <div className="hero__actions">
              <button type="button" className="hero__cta" onClick={addToCart}>
                افزودن به سبد
                <span className="hero__cta-icon" aria-hidden="true">
                  <IconArrowLeft size={18} />
                </span>
              </button>
              <Link to={`/product/${heroProduct.slug}`} className="hero__link">
                مشاهدهٔ جزئیات
              </Link>
            </div>
          </div>

          <figure className="hero__product">
            <img
              src={heroProduct.images[0]}
              alt="ساعت مچی هریتیج ۱۹۵۷ ولورا با قاب طلایی و بند چرمی قهوه‌ای"
            />
          </figure>

          <aside className="hero__side" aria-label="ساعت پیشنهادی">
            <Link to={`/product/${sideProduct.slug}`} className="hero__thumb">
              <img src={sideProduct.images[0]} alt={sideProduct.name} />
              <span className="hero__thumb-label">{sideProduct.name}</span>
            </Link>
            <Link
              to={`/product/${sideProduct.slug}`}
              className="hero__side-arrow"
              aria-label={`مشاهدهٔ ${sideProduct.name}`}
            >
              <IconArrowLeft size={16} />
            </Link>
          </aside>
        </div>

        <div className="hero__foot">
          <div className="hero__explore-group">
            <a href="#collections" className="hero__explore">
              <span>کاوش</span>
              <span className="hero__explore-icon" aria-hidden="true">
                <IconArrowDown size={15} />
              </span>
            </a>
            <Link to={`/product/${heroProduct.slug}`} className="hero__clip" aria-label="ویدئوی کالکشن">
              <img src="/images/editorial-close.jpg" alt="" />
              <span className="hero__clip-dot" aria-hidden="true" />
            </Link>
          </div>

          <div className="hero__lang" aria-label="زبان">
            <span>EN</span>
            <span className="hero__lang-sep" aria-hidden="true">
              /
            </span>
            <span className="is-active">FA</span>
          </div>
        </div>
      </div>
    </section>
  );
}
