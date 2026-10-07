import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading.jsx';
import Rating from '../ui/Rating.jsx';
import Reveal from '../ui/Reveal.jsx';
import { TESTIMONIALS } from '../../data/content.js';
import { classNames } from '../../lib/format.js';

export default function Testimonials() {
  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const node = trackRef.current;
    if (!node) return;
    setAtStart(node.scrollLeft <= 4);
    setAtEnd(node.scrollLeft >= node.scrollWidth - node.clientWidth - 4);
  }, []);

  useEffect(() => {
    sync();
    const node = trackRef.current;
    if (!node) return undefined;
    node.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      node.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync]);

  const scrollBy = (dir) => {
    const node = trackRef.current;
    if (!node) return;
    node.scrollBy({ left: dir * Math.max(node.clientWidth * 0.8, 280), behavior: 'smooth' });
  };

  return (
    <section className="bg-white py-16 lg:py-24" aria-labelledby="testimonials-heading">
      <div className="container-velora">
        <Reveal>
          <SectionHeading
            eyebrow="Testimonials"
            title="What Our Customers Say"
            subtitle="Real people. Real routines. Real results."
          />
        </Reveal>

        <div className="mt-12">
          <div className="mb-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              disabled={atStart}
              aria-label="Previous testimonials"
              className={classNames(
                'inline-flex h-11 w-11 items-center justify-center rounded-full border bg-white transition-all',
                atStart ? 'border-ink/10 text-ink/30' : 'border-ink/15 hover:border-burgundy hover:text-burgundy',
              )}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              disabled={atEnd}
              aria-label="Next testimonials"
              className={classNames(
                'inline-flex h-11 w-11 items-center justify-center rounded-full border bg-white transition-all',
                atEnd ? 'border-ink/10 text-ink/30' : 'border-ink/15 hover:border-burgundy hover:text-burgundy',
              )}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <ul
            ref={trackRef}
            className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-2"
            aria-label="Customer testimonials"
          >
            {TESTIMONIALS.map((item) => (
              <li
                key={item.name}
                className="w-[86%] shrink-0 snap-start sm:w-[48%] lg:w-[31.5%]"
              >
                <figure className="flex h-full flex-col rounded-xl2 border border-ink/[0.07] bg-cream p-7 shadow-soft">
                  <Quote size={26} className="text-softpink" strokeWidth={1.4} />
                  <blockquote className="mt-5 flex-1 text-[14px] leading-relaxed text-ink/75">
                    “{item.quote}”
                  </blockquote>
                  <Rating value={item.rating} className="mt-5" />
                  <figcaption className="mt-5 flex items-center gap-4 border-t border-ink/[0.08] pt-5">
                    <img
                      src={item.avatar}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-serif text-[15px] text-ink">{item.name}</p>
                      <p className="text-[11px] uppercase tracking-[0.14em] text-ink/45">
                        {item.location}
                      </p>
                      <p className="mt-1 text-[12px] text-rose">Purchased {item.product}</p>
                    </div>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
