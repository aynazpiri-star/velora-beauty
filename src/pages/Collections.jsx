import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHero from '../components/ui/PageHero.jsx';
import SafeImage from '../components/ui/SafeImage.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { CATEGORIES, PRODUCTS } from '../data/products.js';

export default function Collections() {
  return (
    <>
      <PageHero
        eyebrow="Collections"
        title="Curated Beauty Rituals"
        description="Six collections, one philosophy — simple formulas that make beautiful skin feel effortless."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Collections' }]}
        align="center"
      />

      <section className="bg-blush py-16 lg:py-24" aria-label="All collections">
        <div className="container-velora grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {CATEGORIES.map((category, i) => {
            const count = PRODUCTS.filter((p) => p.category === category.slug).length;
            return (
              <Reveal key={category.slug} delay={i * 70}>
                <Link
                  to={`/collections/${category.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl2 border border-ink/[0.07] bg-white shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card"
                >
                  <SafeImage
                    src={category.image}
                    alt={`${category.name} collection`}
                    wrapperClassName="aspect-[4/3]"
                    className="h-full w-full object-cover transition-transform duration-[1100ms] group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between gap-4">
                      <h2 className="font-serif text-[22px] transition-colors group-hover:text-burgundy">
                        {category.name}
                      </h2>
                      <span className="text-[11px] uppercase tracking-[0.16em] text-ink/45">
                        {count} products
                      </span>
                    </div>
                    <p className="mt-3 flex-1 text-[13px] leading-relaxed text-ink/60">
                      {category.description}
                    </p>
                    <span className="link-underline mt-5 text-[13px]">
                      Explore collection <ArrowRight size={15} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
