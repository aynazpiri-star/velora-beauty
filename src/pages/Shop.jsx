import { useMemo, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import PageHero from '../components/ui/PageHero.jsx';
import FilterSidebar, { PRICE_BANDS } from '../components/shop/FilterSidebar.jsx';
import FilterDrawer from '../components/shop/FilterDrawer.jsx';
import ProductGrid from '../components/product/ProductGrid.jsx';
import { PRODUCTS } from '../data/products.js';

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'newest', label: 'Newest' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Best Rated' },
];

const EMPTY_FILTERS = {
  categories: [],
  prices: [],
  concerns: [],
  types: [],
  rating: null,
};

export default function Shop() {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [sort, setSort] = useState('featured');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const results = useMemo(() => {
    let list = PRODUCTS.filter((product) => {
      if (filters.categories.length && !filters.categories.includes(product.category)) return false;
      if (filters.prices.length) {
        const inBand = filters.prices.some((id) => PRICE_BANDS.find((b) => b.id === id)?.test(product));
        if (!inBand) return false;
      }
      if (filters.concerns.length && !filters.concerns.some((c) => product.concerns?.includes(c))) return false;
      if (filters.types.length && !filters.types.includes(product.type)) return false;
      if (filters.rating && product.rating < filters.rating) return false;
      return true;
    });

    switch (sort) {
      case 'newest':
        list = [...list].sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
        break;
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      default:
        list = [...list].sort(
          (a, b) => Number(b.featured) - Number(a.featured) || Number(b.bestSeller) - Number(a.bestSeller),
        );
    }
    return list;
  }, [filters, sort]);

  const activeCount =
    filters.categories.length +
    filters.prices.length +
    filters.concerns.length +
    filters.types.length +
    (filters.rating ? 1 : 0);

  return (
    <>
      <PageHero
        eyebrow="Shop all"
        title="The Velora Collection"
        description="Thoughtfully formulated skincare, beauty and body essentials — all cruelty free and made to be used every day."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Shop' }]}
      />

      <section className="bg-blush py-12 lg:py-16" aria-label="Product results">
        <div className="container-velora grid gap-10 lg:grid-cols-[17rem_1fr] lg:gap-12">
          <div className="hidden lg:block">
            <FilterSidebar
              products={PRODUCTS}
              filters={filters}
              onChange={setFilters}
              onClear={() => setFilters(EMPTY_FILTERS)}
              className="sticky top-28"
              idPrefix="desktop"
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/[0.08] pb-5">
              <p className="text-[13px] text-ink/60">
                Showing <span className="text-ink">{results.length}</span> of {PRODUCTS.length} products
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setDrawerOpen(true)}
                  className="inline-flex items-center gap-2 rounded-md border border-ink/15 px-4 py-2.5 text-[13px] transition-colors hover:border-burgundy hover:text-burgundy lg:hidden"
                >
                  <SlidersHorizontal size={15} />
                  Filters{activeCount ? ` (${activeCount})` : ''}
                </button>

                <label htmlFor="sort" className="sr-only">
                  Sort products
                </label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="rounded-md border border-ink/15 bg-white px-4 py-2.5 text-[13px] text-ink transition-colors focus:border-burgundy focus:outline-none"
                >
                  {SORTS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {activeCount ? (
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {[
                  ...filters.categories,
                  ...filters.concerns,
                  ...filters.types,
                  ...PRICE_BANDS.filter((b) => filters.prices.includes(b.id)).map((b) => b.label),
                  ...(filters.rating ? [`${filters.rating}+ rating`] : []),
                ].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full bg-white px-3.5 py-1.5 text-[12px] text-ink/70 ring-1 ring-ink/10"
                  >
                    {chip}
                  </span>
                ))}
                <button
                  type="button"
                  onClick={() => setFilters(EMPTY_FILTERS)}
                  className="text-[12px] text-burgundy underline-offset-4 hover:underline"
                >
                  Clear all
                </button>
              </div>
            ) : null}

            <ProductGrid products={results} className="mt-8" emptyMessage="No products match those filters" />
          </div>
        </div>
      </section>

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        products={PRODUCTS}
        filters={filters}
        onChange={setFilters}
        onClear={() => setFilters(EMPTY_FILTERS)}
        resultCount={results.length}
      />
    </>
  );
}
