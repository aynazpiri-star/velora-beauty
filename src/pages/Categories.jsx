import { Link } from 'react-router-dom';
import { categories, products } from '../../shared/catalog.js';
import Reveal from '../components/Reveal.jsx';
import { toFa } from '../lib/format.js';
import './shop.css';

export default function Categories() {
  const countFor = (slug) =>
    slug === 'new'
      ? products.filter((item) => item.isNew).length
      : products.filter((item) => item.category === slug).length;

  return (
    <div className="page">
      <div className="container">
        <header className="page-head">
          <span className="eyebrow">دسته‌بندی‌ها</span>
          <h1 className="page-title">مجموعه‌ها را کشف کنید</h1>
          <p className="section-sub">
            شش دسته‌بندی اصلی Velora؛ از کفش‌های روزمره تا مدل‌های رسمی دست‌دوز.
          </p>
        </header>

        <div className="categories-page__grid">
          {categories.map((category, index) => (
            <Reveal key={category.slug} delay={index * 60}>
              <Link to={`/shop?category=${category.slug}`} className="cat-tile">
                <img src={category.image} alt={category.name} loading="lazy" />
                <span className="cat-tile__body">
                  <b>{category.name}</b>
                  <span>{category.tagline}</span>
                  <span className="cat-tile__count">{toFa(countFor(category.slug))} محصول</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
