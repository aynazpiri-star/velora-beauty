import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SafeImage from '../ui/SafeImage.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import Reveal from '../ui/Reveal.jsx';
import { CATEGORIES } from '../../data/products.js';

export function CategoryCard({ category }) {
  return (
    <Link
      to={`/collections/${category.slug}`}
      className="group flex flex-col items-center text-center"
      aria-label={`Shop ${category.name}`}
    >
      <div className="relative h-32 w-32 overflow-hidden rounded-full border border-white/70 shadow-soft transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-card sm:h-36 sm:w-36">
        <SafeImage
          src={category.image}
          alt={category.name}
          wrapperClassName="h-full w-full rounded-full"
          className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
          sizes="144px"
        />
        <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-ink/5" />
      </div>
      <h3 className="mt-5 font-serif text-[18px] transition-colors group-hover:text-burgundy">
        {category.name}
      </h3>
      <p className="mt-1.5 max-w-[11rem] text-[12px] leading-relaxed text-ink/55">{category.tagline}</p>
    </Link>
  );
}

export default function CategorySection() {
  return (
    <section className="bg-blush py-16 lg:py-24" aria-labelledby="categories-heading">
      <div className="container-velora">
        <Reveal>
          <SectionHeading
            eyebrow="Shop by category"
            title="Beauty for Every You"
            subtitle="Discover skincare and beauty essentials created to make your daily routine feel special."
          />
        </Reveal>

        <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((category, i) => (
            <Reveal as="li" key={category.slug} delay={i * 70} className="flex justify-center">
              <CategoryCard category={category} />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-14 flex justify-center">
          <Link to="/collections" className="btn-outline gap-2">
            View All Collections <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
