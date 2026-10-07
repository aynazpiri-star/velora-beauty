import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SafeImage from '../ui/SafeImage.jsx';
import Reveal from '../ui/Reveal.jsx';
import { currency } from '../../lib/format.js';
import { featuredCollection } from '../../data/products.js';

const RITUAL = ['Cleanse', 'Tone', 'Treat', 'Moisturise'];

export default function FeaturedCollection() {
  const products = featuredCollection();

  return (
    <section className="bg-cream py-16 lg:py-24" aria-labelledby="featured-heading">
      <div className="container-velora">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Featured collection</p>
          <h2 id="featured-heading" className="mt-5 font-serif text-[32px] leading-tight sm:text-[44px]">
            Your Everyday Glow
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink/70">
            Simple rituals. Powerful ingredients. Beautiful results.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <Reveal className="order-2 lg:order-1">
            <ol className="relative space-y-8 border-l border-ink/10 pl-8">
              {products.map((product, index) => (
                <li key={product.id} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[2.35rem] top-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-burgundy/30 bg-cream text-[10px] font-semibold text-burgundy"
                  >
                    {index + 1}
                  </span>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-rose">
                    {RITUAL[index] ?? product.type}
                  </p>
                  <h3 className="mt-2 font-serif text-[21px]">
                    <Link to={`/product/${product.slug}`} className="transition-colors hover:text-burgundy">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-2 max-w-md text-[13px] leading-relaxed text-ink/60">
                    {product.shortDescription}
                  </p>
                  <p className="mt-2 text-[13px] text-ink/80">{currency(product.price)}</p>
                </li>
              ))}
            </ol>

            <Link to="/shop" className="link-underline mt-10 inline-flex">
              Shop the Collection <ArrowRight size={16} />
            </Link>
          </Reveal>

          <Reveal delay={120} className="order-1 grid grid-cols-2 gap-4 lg:order-2">
            {products.slice(0, 4).map((product, i) => (
              <Link
                key={product.id}
                to={`/product/${product.slug}`}
                className={`group overflow-hidden rounded-xl2 border border-ink/[0.07] bg-white shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card ${
                  i % 2 === 1 ? 'translate-y-6' : ''
                }`}
              >
                <SafeImage
                  src={product.images[0]}
                  alt={product.name}
                  wrapperClassName="aspect-square"
                  className="h-full w-full object-cover zoom-img"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <p className="px-4 py-4 text-center font-serif text-[14px] transition-colors group-hover:text-burgundy">
                  {product.name}
                </p>
              </Link>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
