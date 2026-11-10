import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard.jsx';
import Reveal from '../Reveal.jsx';
import { ArrowLeftIcon } from '../Icons.jsx';

export default function ProductGrid({
  eyebrow,
  title,
  sub,
  products,
  action = { label: 'مشاهده همه محصولات', to: '/shop' },
  columns = 4,
  ranked = false,
}) {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-head">
          <div>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <h2 className="section-title">{title}</h2>
            {sub && <p className="section-sub">{sub}</p>}
          </div>
          {action && (
            <Link to={action.to} className="link-arrow">
              {action.label}
              <ArrowLeftIcon size={17} />
            </Link>
          )}
        </Reveal>

        <div className={`product-grid product-grid--${columns}`}>
          {products.map((product, index) => (
            <Reveal key={product.id} delay={index * 80} className="product-grid__item">
              {ranked && <span className="rank-badge">{['۱', '۲', '۳', '۴'][index] || ''}</span>}
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
