import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import { products } from '../data/products'
import { price } from '../utils/format'
import { ArrowLeft } from '../components/icons'

const collections = [
  { title: 'کلاسیک', image: '/images/p3.jpg' },
  { title: 'اسکلتون', image: '/images/p1.jpg' },
  { title: 'اسپرت', image: '/images/p4.jpg' },
]

const fromPrice = (category) =>
  Math.min(
    ...products.filter((item) => item.category === category).map((item) => item.price),
  )

export default function Home() {
  return (
    <>
      <Hero />

      <div className="trust-strip" aria-label="خدمات ولورا">
        <span>ارسال رایگان و بیمه‌شده</span>
        <span>ضمانت اصالت کالا</span>
        <span>گارانتی پنج‌ساله</span>
        <span>بازگشت تا ۱۴ روز</span>
      </div>

      <section className="section" id="collection">
        <div className="wrap">
          <Reveal className="section-head">
            <div className="section-head__text">
              <span className="eyebrow">منتخب فصل</span>
              <h2 className="section-title">ساعت‌هایی برای ماندن</h2>
              <p>
                گزیده‌ای از مجموعهٔ پاییز ولورا؛ قطعاتی که با وسواس انتخاب شده‌اند
                تا سال‌ها همراه شما بمانند.
              </p>
            </div>
            <Link to="/shop" className="link-arrow">
              همهٔ ساعت‌ها
              <ArrowLeft />
            </Link>
          </Reveal>

          <div className="product-grid">
            {products.slice(0, 4).map((product, index) => (
              <Reveal key={product.id} delay={index * 70}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="collections">
        <div className="wrap">
          <Reveal className="section-head">
            <div className="section-head__text">
              <span className="eyebrow">مجموعه‌ها</span>
              <h2 className="section-title">سه زبان برای زمان</h2>
            </div>
          </Reveal>

          <div className="cat-grid">
            {collections.map((collection, index) => (
              <Reveal key={collection.title} delay={index * 90}>
                <Link
                  to={`/shop?cat=${encodeURIComponent(collection.title)}`}
                  className="cat-card"
                >
                  <img src={collection.image} alt={collection.title} loading="lazy" />
                  <div className="cat-card__body">
                    <div>
                      <h3>{collection.title}</h3>
                      <span>از {price(fromPrice(collection.title))}</span>
                    </div>
                    <span className="cat-card__arrow">
                      <ArrowLeft />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="story">
        <div className="wrap">
          <div className="editorial">
            <Reveal className="editorial__media">
              <img
                src="/images/story.jpg"
                alt="ساعت ولورا در نور غروب"
                loading="lazy"
              />
              <span className="editorial__badge">کمپین ولورا — سری نوا</span>
            </Reveal>

            <Reveal className="editorial__copy" delay={120}>
              <span className="eyebrow">داستان ولورا</span>
              <h2 className="section-title">دقت، میراث ماست</h2>
              <p>
                از سال ۱۹۲۴، در کارگاهی کوچک، ساعت‌هایی ساخته می‌شوند که به جای
                شتاب، به ماندگاری فکر می‌کنند. هر قطعهٔ ولورا پیش از رسیدن به مچ
                شما، بیش از چهل مرحلهٔ بازبینی دستی را پشت سر می‌گذارد.
              </p>
              <div className="stats">
                <div>
                  <strong>۱۹۲۴</strong>
                  <span>آغاز کارگاه</span>
                </div>
                <div>
                  <strong>۱۲۰</strong>
                  <span>قطعه در هر مجموعه</span>
                </div>
                <div>
                  <strong>۵ سال</strong>
                  <span>گارانتی بین‌المللی</span>
                </div>
              </div>
              <Link to="/shop" className="link-arrow">
                آشنایی با ولورا
                <ArrowLeft />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="quote-band">
        <div className="quote-band__inner">
          <span className="eyebrow">از دفتر آتلیه</span>
          <blockquote>
            ساعت، تنها زمان را نشان نمی‌دهد؛
            <br />
            <em>شخصیت</em> شما را روایت می‌کند.
          </blockquote>
          <cite>— آتلیهٔ ولورا، تهران</cite>
        </div>
      </section>
    </>
  )
}
