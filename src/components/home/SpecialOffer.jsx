import { ArrowRight, Gift } from 'lucide-react';
import Button from '../ui/Button.jsx';
import SafeImage from '../ui/SafeImage.jsx';
import Badge from '../ui/Badge.jsx';
import Reveal from '../ui/Reveal.jsx';
import { OFFER_IMAGE } from '../../data/content.js';

export default function SpecialOffer() {
  return (
    <section className="bg-blush py-16 lg:py-24" aria-labelledby="offer-heading">
      <div className="container-velora">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-ink/[0.07] bg-ink text-cream shadow-card">
            <div className="grid items-center gap-0 lg:grid-cols-2">
              <div className="order-2 p-9 sm:p-12 lg:order-1 lg:p-16">
                <span className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-cream/85">
                  <Gift size={13} /> Up to 20% off
                </span>

                <h2
                  id="offer-heading"
                  className="mt-6 font-serif text-[30px] leading-tight text-cream sm:text-[40px]"
                >
                  Your Skin Deserves a Little Extra Love
                </h2>
                <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-cream/70">
                  Discover our carefully curated skincare sets and save more while building the
                  perfect routine — beautifully boxed and ready to gift.
                </p>

                <Button to="/product/glow-ritual-skincare-set" variant="light" className="mt-9 gap-2">
                  Explore Beauty Sets <ArrowRight size={16} />
                </Button>
              </div>

              <div className="relative order-1 lg:order-2">
                <SafeImage
                  src={OFFER_IMAGE}
                  alt="Velora skincare gift set presented in recycled packaging with dried florals"
                  wrapperClassName="aspect-[5/4] lg:h-full lg:aspect-auto"
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute right-6 top-6">
                  <Badge tone="rose">Save 20%</Badge>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
