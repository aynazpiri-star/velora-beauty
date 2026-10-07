import { ArrowRight } from 'lucide-react';
import SafeImage from '../ui/SafeImage.jsx';
import Reveal from '../ui/Reveal.jsx';
import { PROMO_MAKEUP_IMAGE, PROMO_SKINCARE_IMAGE } from '../../data/content.js';

function PromoBanner({ eyebrow, title, text, cta, to, image, alt, reversed = false }) {
  return (
    <article className="group relative overflow-hidden rounded-xl2 border border-ink/[0.07] bg-cream shadow-soft">
      <div className={reversed ? 'lg:flex lg:flex-row-reverse' : 'lg:flex'}>
        <div className="lg:w-1/2">
          <SafeImage
            src={image}
            alt={alt}
            wrapperClassName="aspect-[4/3] lg:h-full lg:aspect-auto"
            className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col justify-center gap-4 p-8 lg:w-1/2 lg:p-12">
          <p className="eyebrow">{eyebrow}</p>
          <h3 className="font-serif text-[26px] leading-tight sm:text-[32px]">
            {title.split('\n').map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h3>
          <p className="text-sm text-ink/60">{text}</p>
          <a
            href={to}
            className="link-underline mt-2 w-fit text-[13px] font-semibold uppercase tracking-[0.14em]"
          >
            {cta} <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function PromoSplit() {
  return (
    <section className="bg-cream py-16 lg:py-24" aria-label="Featured offers">
      <div className="container-velora grid gap-6 lg:grid-cols-2 lg:gap-8">
        <Reveal>
          <PromoBanner
            eyebrow="Skincare essentials"
            title={'Healthy Skin\nStarts Here'}
            text="Gentle. Effective. Natural."
            cta="Shop Skincare"
            to="/collections/skincare"
            image={PROMO_SKINCARE_IMAGE}
            alt="Woman with healthy, glowing skin after her Velora skincare routine"
          />
        </Reveal>
        <Reveal delay={120}>
          <PromoBanner
            eyebrow="Limited time offer"
            title={'Beauty\nMust-Haves'}
            text="Discover your new everyday favourites."
            cta="Shop Makeup"
            to="/collections/makeup"
            image={PROMO_MAKEUP_IMAGE}
            alt="Flat lay of makeup essentials on soft pink fabric"
            reversed
          />
        </Reveal>
      </div>
    </section>
  );
}
