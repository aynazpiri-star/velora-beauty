import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '../ui/Button.jsx';
import SafeImage from '../ui/SafeImage.jsx';
import Rating from '../ui/Rating.jsx';
import { HERO_IMAGE } from '../../data/content.js';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-blush" aria-labelledby="hero-heading">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-40 h-[36rem] w-[36rem] rounded-full bg-softpink/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-24 h-[28rem] w-[28rem] rounded-full bg-cream blur-3xl"
      />

      <div className="container-velora relative grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
        <div className="animate-fade-up">
          <p className="eyebrow">Pure Beauty • Real Results</p>

          <h1
            id="hero-heading"
            className="mt-6 font-serif text-[40px] leading-[1.08] tracking-[-0.01em] sm:text-[54px] lg:text-[64px]"
          >
            Glow Naturally,
            <br />
            <span className="italic text-burgundy">Feel Beautiful</span>
          </h1>

          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink/70 sm:text-base">
            Premium skincare crafted with carefully selected ingredients to help your skin look
            healthy, radiant and naturally beautiful — every single day.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button to="/shop" className="px-8 py-3.5">
              Shop Now
            </Button>
            <Button to="/collections" variant="ghost" className="gap-2 px-2 text-ink hover:text-burgundy">
              Explore Collection <ArrowRight size={16} />
            </Button>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-ink/10 pt-8">
            {[
              { value: '12k+', label: 'Happy customers' },
              { value: '4.9', label: 'Average rating' },
              { value: '100%', label: 'Cruelty free' },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-serif text-[26px] text-ink">{stat.value}</dd>
                <dd className="mt-1 text-[11px] uppercase tracking-[0.16em] text-ink/50">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative animate-fade-up" style={{ animationDelay: '120ms' }}>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-cream shadow-card">
            <SafeImage
              src={HERO_IMAGE}
              alt="Velora skincare collection arranged with natural stones and botanicals"
              eager
              wrapperClassName="aspect-[4/5] sm:aspect-[5/5]"
              className="h-full w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 48vw"
            />
          </div>

          <div className="absolute -bottom-6 left-4 w-[15rem] rounded-xl2 border border-ink/[0.07] bg-white/95 p-5 shadow-card backdrop-blur-sm sm:left-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-softpink/60 text-burgundy">
                <Sparkles size={16} strokeWidth={1.7} />
              </span>
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-ink/50">Bestseller</p>
                <p className="font-serif text-[15px]">Radiance Vitamin C Serum</p>
              </div>
            </div>
            <Rating value={4.9} reviewCount={128} className="mt-3" />
          </div>

          <div className="absolute -right-2 top-6 hidden rounded-xl2 border border-ink/[0.07] bg-white/95 px-5 py-4 shadow-card backdrop-blur-sm sm:block">
            <p className="text-[11px] uppercase tracking-[0.16em] text-ink/50">Natural</p>
            <p className="font-serif text-[15px]">98% botanicals</p>
          </div>
        </div>
      </div>
    </section>
  );
}
