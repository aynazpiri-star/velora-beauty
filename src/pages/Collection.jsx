import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowRight, SlidersHorizontal } from 'lucide-react';
import PageHero from '../components/ui/PageHero.jsx';
import FilterSidebar, { PRICE_BANDS } from '../components/shop/FilterSidebar.jsx';
import FilterDrawer from '../components/shop/FilterDrawer.jsx';
import ProductGrid from '../components/product/ProductGrid.jsx';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';
import SafeImage from '../components/ui/SafeImage.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { CATEGORIES, PRODUCTS, getByCategory } from '../data/products.js';
import { PROMO_MAKEUP_IMAGE, PROMO_SKINCARE_IMAGE, OFFER_IMAGE, ABOUT_IMAGES } from '../data/content.js';
import NotFound from './NotFound.jsx';

const EDITORIAL = {
  skincare: {
    image: PROMO_SKINCARE_IMAGE,
    alt: 'Woman with radiant skin after her skincare routine',
    eyebrow: 'Editorial',
    title: 'The quiet power of a consistent routine',
    text: 'Two minutes in the morning, two at night. Consistency — not complexity — is what makes skin look its best.',
  },
  makeup: {
    image: PROMO_MAKEUP_IMAGE,
    alt: 'Makeup essentials arranged on soft pink fabric',
    eyebrow: 'Editorial',
    title: 'Colour that still looks like you',
    text: 'Buildable, breathable finishes designed to enhance rather than cover your natural features.',
  },
  haircare: {
    image: ABOUT_IMAGES.lab,
    alt: 'Hair care products styled in a warm, minimal setting',
    eyebrow: 'Editorial',
    title: 'Softness starts at the scalp',
    text: 'Gentle, sulphate-free cleansing and weightless oils that leave hair strong, shiny and easy to manage.',
  },
  bodycare: {
    image: OFFER_IMAGE,
    alt: 'Body care products styled with dried florals',
    eyebrow: 'Editorial',
    title: 'Turn the everyday into a ritual',
    text: 'Butters, scrubs and lotions that make the last five minutes of your shower the best part of the day.',
  },
  fragrance: {
    image: 'https://images.pexels.com/photos/15096784/pexels-photo-15096784.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Elegant perfume bottle on a warm wooden surface',
    eyebrow: 'Editorial',
    title: 'A scent that stays close',
    text: 'Layered florals, warm woods and clean musk — designed to feel like skin, not perfume.',
  },
  wellness: {
    image: ABOUT_IMAGES.community,
    alt: 'Calm skincare moment in soft natural light',
    eyebrow: 'Editorial',
    title: 'Slow down, then glow',
    text: 'Restorative essentials that support calm skin and a calmer mind, morning and night.',
  },
};

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Best Rated' },
];

export default function Collection() {
  const { slug } = useParams();
  const category = CATEGORIES.find((c) => c.slug === slug);

  const [filters, setFilters] = useState({
    categories: [],
    prices: [],
    concerns: [],
    types: [],
    rating: null,
  });
  const [sort, setSort] = useState('featured');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const base = useMemo(() => getByCategory(slug), [slug]);

  const results = useMemo(() => {
    let list = base.filter((product) => {
      if (filters.prices.length) {
        const inBand = filters.prices.some((id) => PRICE_BANDS.find((b) => b.id === id)?.test(product));
        if (!inBand) return false;
      }
      if (filters.concerns.length && !filters.concerns.some((c) => product.concerns?.includes(c))) return false;
      if (filters.types.length && !filters.types.includes(product.type)) return false;
      if (filters.rating && product.rating < filters.rating) return false;
      return true;
    });

    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [base, filters, sort]);

  if (!category) return <NotFound />;

  const editorial = EDITORIAL[category.slug];

  return (
    <>
      <PageHero
        eyebrow={`${category.name} collection`}
        title={category.name}
        description={category.description}
        image={category.image}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Collections', to: '/collections' },
          { label: category.name },
        ]}
      />

      <section className="bg-blush py-12 lg:py-16" aria-label={`${category.name} products`}>
        <div className="container-velora grid gap-10 lg:grid-cols-[17rem_1fr] lg:gap-12">
          <div className="hidden lg:block">
            <FilterSidebar
              products={base}
              filters={filters}
              onChange={setFilters}
              onClear={() => setFilters({ categories: [], prices: [], concerns: [], types: [], rating: null })}
              className="sticky top-28"
              idPrefix="desktop"
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/[0.08] pb-5">
              <p className="text-[13px] text-ink/60">
                <span className="text-ink">{results.length}</span> products
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setDrawerOpen(true)}
                  className="inline-flex items-center gap-2 rounded-md border border-ink/15 px-4 py-2.5 text-[13px] transition-colors hover:border-burgundy hover:text-burgundy lg:hidden"
                >
                  <SlidersHorizontal size={15} />
                  Filters
                </button>
                <label htmlFor="collection-sort" className="sr-only">
                  Sort products
                </label>
                <select
                  id="collection-sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="rounded-md border border-ink/15 bg-white px-4 py-2.5 text-[13px] focus:border-burgundy focus:outline-none"
                >
                  {SORTS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <ProductGrid products={results} className="mt-8" emptyMessage="No products match those filters" />
          </div>
        </div>
      </section>

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        products={base}
        filters={filters}
        onChange={setFilters}
        onClear={() => setFilters({ categories: [], prices: [], concerns: [], types: [], rating: null })}
        resultCount={results.length}
      />

      <section className="bg-cream py-16 lg:py-20" aria-label="Editorial">
        <div className="container-velora">
          <Reveal>
            <div className="grid items-center gap-10 overflow-hidden rounded-[2rem] border border-ink/[0.07] bg-white shadow-soft lg:grid-cols-2 lg:gap-0">
              <SafeImage
                src={editorial.image}
                alt={editorial.alt}
                wrapperClassName="aspect-[4/3] lg:h-full lg:aspect-auto"
                className="h-full w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="p-8 lg:p-14">
                <Badge tone="soft">{editorial.eyebrow}</Badge>
                <h2 className="mt-5 font-serif text-[28px] leading-tight sm:text-[34px]">
                  {editorial.title}
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-ink/70">{editorial.text}</p>
                <Button to="/shop" variant="outline" className="mt-8 gap-2">
                  Shop all {category.name.toLowerCase()} <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
