import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../ui/SectionHeading.jsx';
import Reveal from '../ui/Reveal.jsx';
import ProductCarousel from '../product/ProductCarousel.jsx';
import { newArrivals } from '../../data/products.js';

export default function NewArrivals() {
  return (
    <section className="bg-white py-16 lg:py-24" aria-labelledby="new-arrivals-heading">
      <div className="container-velora">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Just in"
            title="New Beauty Favorites"
            subtitle="Freshly formulated additions to the Velora routine."
          />
          <Link to="/shop" className="link-underline shrink-0">
            View All Products <ArrowRight size={16} />
          </Link>
        </Reveal>

        <Reveal className="mt-12">
          <ProductCarousel products={newArrivals()} />
        </Reveal>
      </div>
    </section>
  );
}
