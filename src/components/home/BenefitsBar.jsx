import { Leaf, Rabbit, ShieldCheck, Truck } from 'lucide-react';
import { BENEFITS } from '../../data/content.js';
import Reveal from '../ui/Reveal.jsx';

const ICONS = { leaf: Leaf, truck: Truck, shield: ShieldCheck, rabbit: Rabbit };

export default function BenefitsBar() {
  return (
    <section className="border-y border-ink/[0.07] bg-cream" aria-label="Why shop with Velora">
      <div className="container-velora">
        <ul className="no-scrollbar flex snap-x gap-6 overflow-x-auto py-8 sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-visible lg:grid-cols-4">
          {BENEFITS.map((benefit, i) => {
            const Icon = ICONS[benefit.icon] ?? Leaf;
            return (
              <Reveal
                as="li"
                key={benefit.title}
                delay={i * 80}
                className="flex w-[70%] shrink-0 snap-start items-center gap-4 sm:w-auto"
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-burgundy/20 bg-blush text-burgundy">
                  <Icon size={20} strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="font-serif text-[16px] leading-tight">{benefit.title}</h3>
                  <p className="mt-1 text-[12px] text-ink/55">{benefit.text}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
