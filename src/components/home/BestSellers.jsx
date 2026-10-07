import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../ui/SectionHeading.jsx';
import Reveal from '../ui/Reveal.jsx';
import ProductCarousel from '../product/ProductCarousel.jsx';
import { bestSellers } from '../../data/products.js';

export default function BestSellers() {
  return (
    <section className="bg-white py-16 lg:py-24" aria-labelledby="best-sellers-heading">
      <div className="container-velora">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Best sellers"
            title="Loved by Our Customers"
            subtitle="Top-rated products for your everyday beauty routine."
          />
          <Link to="/shop" className="link-underline shrink-0">
            Shop all products <ArrowRight size={16} />
          </Link>
        </Reveal>

        <Reveal className="mt-12">
          <ProductCarousel products={bestSellers()} />
        </Reveal>
      </div>
    </section>
  );
}
