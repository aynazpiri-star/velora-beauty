import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SafeImage from '../ui/SafeImage.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import Reveal from '../ui/Reveal.jsx';
import { ROUTINE_STEPS } from '../../data/content.js';
import { getProduct } from '../../data/products.js';
import { classNames } from '../../lib/format.js';

export default function RoutineSection() {
  const [active, setActive] = useState(0);
  const step = ROUTINE_STEPS[active];
  const product = getProduct(step.productSlug);
  const image = product?.images[0];
  const [broken, setBroken] = useState(false);

  return (
    <section className="bg-cream py-16 lg:py-24" aria-labelledby="routine-heading">
      <div className="container-velora">
        <Reveal>
          <SectionHeading
            eyebrow="The Velora ritual"
            title="Build Your Perfect Routine"
            subtitle="Four considered steps, morning and evening — the simple framework behind healthy-looking skin."
          />
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <ol className="space-y-2">
              {ROUTINE_STEPS.map((item, index) => {
                const isActive = index === active;
                return (
                  <li key={item.step}>
                    <button
                      type="button"
                      onClick={() => {
                        setActive(index);
                        setBroken(false);
                      }}
                      aria-expanded={isActive}
                      className={classNames(
                        'w-full rounded-xl2 border px-6 py-5 text-left transition-all duration-400',
                        isActive
                          ? 'border-burgundy/30 bg-white shadow-soft'
                          : 'border-ink/[0.07] bg-white/50 hover:border-burgundy/25 hover:bg-white',
                      )}
                    >
                      <div className="flex items-center gap-5">
                        <span
                          className={classNames(
                            'font-serif text-[26px] leading-none transition-colors',
                            isActive ? 'text-burgundy' : 'text-ink/25',
                          )}
                        >
                          {item.step}
                        </span>
                        <div className="flex-1">
                          <h3 className="font-serif text-[19px]">{item.title}</h3>
                          <p
                            className={classNames(
                              'grid overflow-hidden text-[13px] leading-relaxed text-ink/60 transition-all duration-500',
                              isActive ? 'mt-2 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                            )}
                          >
                            <span className="overflow-hidden">{item.text}</span>
                          </p>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ol>

            <Link to="/shop" className="link-underline mt-8 inline-flex">
              Find Your Routine <ArrowRight size={16} />
            </Link>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative overflow-hidden rounded-xl2 border border-ink/[0.07] bg-white shadow-card">
              <SafeImage
                src={image}
                alt={product?.name ?? step.title}
                wrapperClassName="aspect-[5/4]"
                className="h-full w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {product ? (
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink/[0.07] px-6 py-5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-rose">
                      Step {step.step} · {product.type}
                    </p>
                    <h3 className="mt-1.5 font-serif text-[19px]">{product.name}</h3>
                  </div>
                  <Link to={`/product/${product.slug}`} className="link-underline text-[13px]">
                    View product <ArrowRight size={14} />
                  </Link>
                </div>
              ) : null}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
