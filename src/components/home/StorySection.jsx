import { ArrowRight, Droplet, Heart, Recycle } from 'lucide-react';
import Button from '../ui/Button.jsx';
import SafeImage from '../ui/SafeImage.jsx';
import Reveal from '../ui/Reveal.jsx';
import { STORY_IMAGE, VALUES } from '../../data/content.js';

const ICONS = { droplet: Droplet, heart: Heart, recycle: Recycle };

export default function StorySection() {
  return (
    <section className="bg-blush py-16 lg:py-24" aria-labelledby="story-heading">
      <div className="container-velora grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative">
            <div className="overflow-hidden rounded-xl2 border border-white/70 shadow-card">
              <SafeImage
                src={STORY_IMAGE}
                alt="Velora skincare products styled with fresh flowers and botanical ingredients"
                wrapperClassName="aspect-[4/5]"
                className="h-full w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 46vw"
              />
            </div>
            <div className="absolute -bottom-6 right-4 rounded-xl2 border border-ink/[0.07] bg-white/95 px-6 py-5 shadow-card backdrop-blur-sm sm:right-8">
              <p className="font-serif text-[26px] leading-none text-burgundy">10+</p>
              <p className="mt-1.5 text-[11px] uppercase tracking-[0.16em] text-ink/50">
                Years of formulation
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <p className="eyebrow">Our story</p>
          <h2 id="story-heading" className="mt-5 font-serif text-[32px] leading-tight sm:text-[42px]">
            Beauty With Purpose
          </h2>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink/70">
            At Velora, we believe beautiful skin begins with thoughtful care. Our formulas combine
            carefully selected ingredients with modern skincare science to create simple, effective
            and enjoyable beauty rituals.
          </p>

          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {VALUES.map((value) => {
              const Icon = ICONS[value.icon] ?? Droplet;
              return (
                <li key={value.title}>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-burgundy/25 text-burgundy">
                    <Icon size={18} strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-4 font-serif text-[16px]">{value.title}</h3>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-ink/55">{value.text}</p>
                </li>
              );
            })}
          </ul>

          <Button to="/about" variant="outline" className="mt-10 gap-2">
            Learn More <ArrowRight size={16} />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
