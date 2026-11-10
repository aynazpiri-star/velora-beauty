import { Link } from 'react-router-dom';
import { categories } from '../../../shared/catalog.js';
import Reveal from '../Reveal.jsx';
import { ArrowLeftIcon } from '../Icons.jsx';

const sizes = ['wide', 'tall', 'normal', 'normal', 'normal', 'banner'];

export default function CategoryGrid() {
  return (
    <section className="section categories">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <span className="eyebrow">دسته‌بندی‌ها</span>
            <h2 className="section-title">
              برای هر سبک، <em>یک انتخاب</em>
            </h2>
            <p className="section-sub">
              از کتانی‌های اسپرت تا کفش‌های رسمی دست‌دوز؛ مجموعه ما بر اساس سبک زندگی شما چیده شده است.
            </p>
          </div>
          <Link to="/categories" className="link-arrow">
            همه دسته‌بندی‌ها
            <ArrowLeftIcon size={17} />
          </Link>
        </Reveal>

        <div className="category-grid">
          {categories.map((category, index) => (
            <Reveal
              key={category.slug}
              delay={index * 70}
              className={`category-card category-card--${sizes[index]}`}
            >
              <Link to={`/shop?category=${category.slug}`}>
                <img src={category.image} alt={category.name} loading="lazy" />
                <span className="category-card__veil" />
                <span className="category-card__content">
                  <span className="category-card__tagline">{category.tagline}</span>
                  <span className="category-card__name">{category.name}</span>
                </span>
                <span className="category-card__arrow">
                  <ArrowLeftIcon size={18} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
