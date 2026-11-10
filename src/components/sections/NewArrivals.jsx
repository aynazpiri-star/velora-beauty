import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard.jsx';
import Reveal from '../Reveal.jsx';
import { ArrowLeftIcon } from '../Icons.jsx';

export default function NewArrivals({ products }) {
  const [lead, ...rest] = products;

  return (
    <section className="section arrivals">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <span className="eyebrow">تازه رسیده</span>
            <h2 className="section-title">
              جدیدترین <em>مدل‌ها</em>
            </h2>
            <p className="section-sub">هر هفته چند مدل تازه به مجموعه اضافه می‌شود؛ اولین نفر باشید.</p>
          </div>
          <Link to="/new" className="link-arrow">
            همه تازه‌ها
            <ArrowLeftIcon size={17} />
          </Link>
        </Reveal>

        <div className="arrivals__grid">
          {lead && (
            <Reveal className="arrivals__lead">
              <Link to={`/product/${lead.slug}`} className="arrival-feature">
                <img src={lead.images[0]} alt={lead.name} loading="lazy" />
                <span className="arrival-feature__veil" />
                <span className="arrival-feature__content">
                  <span className="badge badge--accent">جدید</span>
                  <span className="arrival-feature__name">{lead.name}</span>
                  <span className="arrival-feature__sub">{lead.subtitle}</span>
                  <span className="arrival-feature__cta">
                    مشاهده محصول
                    <ArrowLeftIcon size={15} />
                  </span>
                </span>
              </Link>
            </Reveal>
          )}

          <div className="arrivals__list">
            {rest.map((product, index) => (
              <Reveal key={product.id} delay={index * 70}>
                <ProductCard product={product} compact />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
