import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { categories, products } from '../../shared/catalog.js';
import ProductCard from '../components/ProductCard.jsx';
import Reveal from '../components/Reveal.jsx';
import { SearchIcon, SlidersIcon } from '../components/Icons.jsx';
import { toFa } from '../lib/format.js';
import './shop.css';

const SORTS = [
  { value: 'featured', label: 'پیشنهاد ولورا' },
  { value: 'newest', label: 'جدیدترین' },
  { value: 'price-asc', label: 'ارزان‌ترین' },
  { value: 'price-desc', label: 'گران‌ترین' },
  { value: 'discount', label: 'بیشترین تخفیف' },
];

const discountOf = (product) =>
  product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;

export default function Shop({ mode = 'all', title, subtitle }) {
  const [params, setParams] = useSearchParams();
  const [term, setTerm] = useState(params.get('q') || '');

  const categorySlug = params.get('category') || '';
  const sort = params.get('sort') || 'featured';

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const list = useMemo(() => {
    let result = products;
    if (mode === 'new') result = result.filter((item) => item.isNew);
    if (mode === 'best') result = result.filter((item) => item.bestSeller);

    if (categorySlug === 'new') result = result.filter((item) => item.isNew);
    else if (categorySlug) result = result.filter((item) => item.category === categorySlug);

    const query = term.trim().toLowerCase();
    if (query) {
      result = result.filter((item) =>
        `${item.name} ${item.subtitle} ${item.brand}`.toLowerCase().includes(query),
      );
    }

    const sorted = [...result];
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    if (sort === 'discount') sorted.sort((a, b) => discountOf(b) - discountOf(a));
    if (sort === 'newest') sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    return sorted;
  }, [mode, categorySlug, sort, term]);

  const activeCategory = categories.find((item) => item.slug === categorySlug);

  return (
    <div className="page shop-page">
      <div className="container">
        <header className="page-head shop-head">
          <div>
            <span className="eyebrow">{mode === 'new' ? 'تازه‌ها' : mode === 'best' ? 'محبوب‌ترین‌ها' : 'فروشگاه'}</span>
            <h1 className="page-title">{title || activeCategory?.name || 'همه محصولات'}</h1>
            <p className="section-sub">
              {subtitle || activeCategory?.tagline || 'مجموعه کامل کفش‌های Velora با امکان فیلتر بر اساس دسته‌بندی.'}
            </p>
          </div>
          <span className="shop-count">{toFa(list.length)} محصول</span>
        </header>

        <div className="shop-toolbar">
          <div className="chip-row" role="group" aria-label="فیلتر دسته‌بندی">
            <button
              type="button"
              className={`chip ${!categorySlug ? 'is-active' : ''}`}
              onClick={() => update('category', '')}
            >
              همه
            </button>
            {categories.map((category) => (
              <button
                key={category.slug}
                type="button"
                className={`chip ${categorySlug === category.slug ? 'is-active' : ''}`}
                onClick={() => update('category', category.slug)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="shop-controls">
            <label className="shop-search">
              <SearchIcon size={17} />
              <input
                value={term}
                onChange={(event) => setTerm(event.target.value)}
                placeholder="جستجو در محصولات…"
                aria-label="جستجو در محصولات"
              />
            </label>

            <label className="shop-sort">
              <SlidersIcon size={17} />
              <select value={sort} onChange={(event) => update('sort', event.target.value)} aria-label="مرتب‌سازی">
                {SORTS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {list.length === 0 ? (
          <div className="empty-state">
            <h3>محصولی با این مشخصات پیدا نشد</h3>
            <p>فیلترها را تغییر دهید یا عبارت دیگری جستجو کنید.</p>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => {
                setTerm('');
                setParams(new URLSearchParams(), { replace: true });
              }}
            >
              حذف همه فیلترها
            </button>
          </div>
        ) : (
          <div className="shop-grid">
            {list.map((product, index) => (
              <Reveal key={product.id} delay={Math.min(index, 8) * 55}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
