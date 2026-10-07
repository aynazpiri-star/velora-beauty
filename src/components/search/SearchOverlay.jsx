import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import SafeImage from '../ui/SafeImage.jsx';
import { useStore } from '../../context/StoreContext.jsx';
import { CATEGORIES, PRODUCTS, categoryName } from '../../data/products.js';
import { currency } from '../../lib/format.js';
import { useLockBodyScroll, useOnEscape } from '../../hooks/useOverlay.js';

const POPULAR = ['Vitamin C', 'Hydrating', 'Rose', 'Fragrance', 'Body care'];

const searchIndex = PRODUCTS.map((p) => ({
  product: p,
  haystack: [
    p.name,
    p.category,
    categoryName(p.category),
    p.type,
    p.shortDescription,
    ...(p.ingredients ?? []),
    ...(p.concerns ?? []),
    ...(p.skinType ?? []),
  ]
    .join(' ')
    .toLowerCase(),
}));

export default function SearchOverlay() {
  const { searchOpen, closeSearch } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useLockBodyScroll(searchOpen);
  useOnEscape(searchOpen, closeSearch);

  useEffect(() => {
    if (searchOpen) {
      setQuery('');
      window.setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [searchOpen]);

  const trimmed = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!trimmed) return [];
    return searchIndex
      .filter((entry) => entry.haystack.includes(trimmed))
      .map((entry) => entry.product)
      .slice(0, 8);
  }, [trimmed]);

  const suggestions = useMemo(() => {
    if (!trimmed) return [];
    const names = new Set();
    results.forEach((p) => {
      names.add(p.name);
      names.add(categoryName(p.category));
      p.ingredients?.forEach((i) => {
        if (i.toLowerCase().includes(trimmed)) names.add(i);
      });
    });
    return [...names].slice(0, 5);
  }, [results, trimmed]);

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-[85]" role="dialog" aria-modal="true" aria-label="Search products">
      <button
        type="button"
        aria-label="Close search"
        onClick={closeSearch}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/50 backdrop-blur-sm animate-fade-in"
      />

      <div className="relative max-h-[92vh] overflow-y-auto bg-cream shadow-card animate-fade-up">
        <div className="container-velora py-8 sm:py-12">
          <div className="flex items-center gap-4 border-b border-ink/15 pb-5 focus-within:border-burgundy">
            <Search size={22} className="shrink-0 text-burgundy" strokeWidth={1.6} />
            <label htmlFor="site-search" className="sr-only">
              Search products
            </label>
            <input
              ref={inputRef}
              id="site-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, ingredients or concerns…"
              className="w-full bg-transparent font-serif text-[22px] text-ink placeholder:text-ink/35 focus:outline-none sm:text-[30px]"
            />
            <button
              type="button"
              onClick={closeSearch}
              aria-label="Close search"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/12 transition-colors hover:bg-ink hover:text-cream"
            >
              <X size={18} />
            </button>
          </div>

          {!trimmed ? (
            <div className="mt-8">
              <p className="eyebrow">Popular searches</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {POPULAR.map((term) => (
                  <li key={term}>
                    <button
                      type="button"
                      onClick={() => setQuery(term)}
                      className="rounded-full border border-ink/15 px-4 py-2 text-[13px] text-ink/75 transition-colors hover:border-burgundy hover:text-burgundy"
                    >
                      {term}
                    </button>
                  </li>
                ))}
              </ul>

              <p className="eyebrow mt-10">Browse categories</p>
              <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {CATEGORIES.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      to={`/collections/${cat.slug}`}
                      onClick={closeSearch}
                      className="flex items-center gap-3 rounded-md border border-ink/10 bg-white px-3 py-3 text-[13px] transition-all hover:border-burgundy hover:text-burgundy"
                    >
                      <SafeImage
                        src={cat.image}
                        alt=""
                        wrapperClassName="h-10 w-10 shrink-0 rounded-full"
                        className="h-full w-full object-cover"
                      />
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="mt-8">
              {suggestions.length ? (
                <ul className="flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <li key={s}>
                      <button
                        type="button"
                        onClick={() => setQuery(s)}
                        className="rounded-full bg-softpink/50 px-4 py-1.5 text-[12px] text-ink/80 transition-colors hover:bg-softpink"
                      >
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}

              <p className="mt-6 text-[12px] uppercase tracking-[0.16em] text-ink/50">
                {results.length} {results.length === 1 ? 'result' : 'results'} for “{query.trim()}”
              </p>

              {results.length ? (
                <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {results.map((product) => (
                    <li key={product.id}>
                      <Link
                        to={`/product/${product.slug}`}
                        onClick={closeSearch}
                        className="group flex gap-4 rounded-xl2 border border-ink/[0.07] bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft"
                      >
                        <SafeImage
                          src={product.images[0]}
                          alt={product.name}
                          wrapperClassName="h-20 w-16 shrink-0 rounded-md"
                          className="h-full w-full object-cover"
                        />
                        <div className="min-w-0">
                          <p className="text-[10px] uppercase tracking-[0.18em] text-rose">
                            {categoryName(product.category)}
                          </p>
                          <h3 className="mt-1 truncate font-serif text-[15px] group-hover:text-burgundy">
                            {product.name}
                          </h3>
                          <p className="mt-1 text-[13px] text-ink/70">{currency(product.price)}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-10 rounded-xl2 border border-dashed border-ink/15 bg-white px-6 py-14 text-center">
                  <h3 className="font-serif text-xl">No matches found</h3>
                  <p className="mt-2 text-sm text-ink/60">
                    Try a different ingredient, category or skin concern.
                  </p>
                </div>
              )}

              <div className="mt-8">
                <Link to="/shop" onClick={closeSearch} className="link-underline">
                  Browse the full shop →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
