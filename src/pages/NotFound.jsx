import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import ProductGrid from '../components/product/ProductGrid.jsx';
import { bestSellers } from '../data/products.js';

export default function NotFound() {
  return (
    <>
      <section className="bg-cream py-20 lg:py-28" aria-labelledby="not-found-heading">
        <div className="container-velora text-center">
          <p className="eyebrow justify-center">Error 404</p>
          <h1
            id="not-found-heading"
            className="mx-auto mt-6 max-w-2xl font-serif text-[38px] leading-tight sm:text-[52px]"
          >
            We could not find that page
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-ink/65">
            The link may be out of date, or the product may have moved. Let us help you find your way
            back to the glow.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Button to="/">Back to home</Button>
            <Button to="/shop" variant="outline">
              Browse the shop
            </Button>
          </div>

          <Link to="/contact" className="link-underline mt-8 inline-flex">
            Contact our team <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <section className="bg-blush py-16 lg:py-20" aria-label="Popular products">
        <div className="container-velora">
          <SectionHeading
            eyebrow="While you are here"
            title="Customer Favourites"
            subtitle="The formulas our community reaches for every day."
          />
          <ProductGrid products={bestSellers().slice(0, 4)} className="mt-10" />
        </div>
      </section>
    </>
  );
}
