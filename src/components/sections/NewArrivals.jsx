import { Link } from 'react-router-dom';
import { products } from '../../../shared/catalog.js';
import ProductCard from '../ProductCard.jsx';
import Reveal from '../Reveal.jsx';

export default function NewArrivals() {
  const featured = products.filter((product) => product.featured).slice(0, 4);

  return (
    <section className="section section--cream arrivals">
      <div className="shell">
        <div className="section-head">
          <div>
            <p className="eyebrow">تازه‌ها</p>
            <h2>تازه‌های ولورا</h2>
          </div>
          <Link to="/shop" className="link-underline">
            همهٔ ساعت‌ها
          </Link>
        </div>

        <div className="arrivals__grid">
          {featured.map((product, index) => (
            <Reveal key={product.id} delay={index * 80}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
