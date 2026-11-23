import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { collections, products } from '../../shared/catalog.js';
import ProductCard from '../components/ProductCard.jsx';
import Reveal from '../components/Reveal.jsx';
import { faNum } from '../lib/format.js';
import './shop.css';

const sorts = [
  { id: 'featured', label: 'پیشنهادی' },
  { id: 'price-asc', label: 'ارزان‌ترین' },
  { id: 'price-desc', label: 'گران‌ترین' },
  { id: 'newest', label: 'تازه‌ها' },
];

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const activeCollection = params.get('collection') || 'all';
  const sort = params.get('sort') || 'featured';
  const query = params.get('q') || '';

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    if (!value || value === 'all') next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const visible = useMemo(() => {
    let list = [...products];

    if (activeCollection !== 'all') {
      list = list.filter((product) => product.collection === activeCollection);
    }

    if (query) {
      const needle = query.trim().toLowerCase();
      list = list.filter((product) =>
        `${product.name} ${product.latin} ${product.tagline} ${product.description}`
          .toLowerCase()
          .includes(needle)
      );
    }

    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'newest') list.reverse();
    else list.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));

    return list;
  }, [activeCollection, sort, query]);

  const activeName =
    collections.find((collection) => collection.slug === activeCollection)?.name || 'همهٔ ساعت‌ها';

  return (
    <div className="page shop">
      <div className="shell">
        <header className="shop__head">
          <p className="eyebrow">فروشگاه</p>
          <h1>{query ? `نتیجهٔ جستجو برای «${query}»` : activeName}</h1>
          <p className="shop__count">{faNum(visible.length)} ساعت</p>
        </header>

        <div className="shop__toolbar">
          <div className="shop__filters" role="group" aria-label="فیلتر کالکشن">
            <button
              type="button"
              className={`chip ${activeCollection === 'all' ? 'is-active' : ''}`}
              onClick={() => update('collection', 'all')}
            >
              همه
            </button>
            {collections.map((collection) => (
              <button
                key={collection.slug}
                type="button"
                className={`chip ${activeCollection === collection.slug ? 'is-active' : ''}`}
                onClick={() => update('collection', collection.slug)}
              >
                {collection.name}
              </button>
            ))}
          </div>

          <div className="shop__sort">
            <label htmlFor="sort">مرتب‌سازی</label>
            <select id="sort" value={sort} onChange={(event) => update('sort', event.target.value)}>
              {sorts.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="shop__empty">
            <p>ساعتی با این مشخصات پیدا نشد.</p>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setParams(new URLSearchParams(), { replace: true })}
            >
              نمایش همهٔ ساعت‌ها
            </button>
          </div>
        ) : (
          <div className="shop__grid">
            {visible.map((product, index) => (
              <Reveal key={product.id} delay={(index % 3) * 70}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
