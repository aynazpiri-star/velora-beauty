import { ArrowRight, Droplet, Heart, Leaf, Recycle, Sparkles } from 'lucide-react';
import PageHero from '../components/ui/PageHero.jsx';
import SafeImage from '../components/ui/SafeImage.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Button from '../components/ui/Button.jsx';
import Testimonials from '../components/home/Testimonials.jsx';
import Newsletter from '../components/home/Newsletter.jsx';
import { ABOUT_IMAGES, VALUES } from '../data/content.js';

const ICONS = { droplet: Droplet, heart: Heart, recycle: Recycle };

const PRINCIPLES = [
  {
    icon: Leaf,
    title: 'Thoughtful formulation',
    text: 'Every formula starts with a short, considered ingredient list — nothing added for the sake of a label.',
  },
  {
    icon: Droplet,
    title: 'Skin-first science',
    text: 'We pair clinically studied actives with soothing botanicals so results never come at the cost of comfort.',
  },
  {
    icon: Sparkles,
    title: 'Made to be used',
    text: 'Textures that feel beautiful on the skin, so the routine you build is one you actually keep.',
  },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Velora"
        title="Beauty With Purpose"
        description="Velora was created for people who want skincare that feels considered — effective formulas, elegant textures and a routine that fits into real life."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
        image={ABOUT_IMAGES.story}
      />

      <section className="bg-blush py-16 lg:py-24" aria-labelledby="mission-heading">
        <div className="container-velora grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow">Our mission</p>
            <h2 id="mission-heading" className="mt-5 font-serif text-[30px] leading-tight sm:text-[40px]">
              Beautiful skin begins with thoughtful care
            </h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink/70">
              <p>
                Velora began with a simple frustration: skincare had become complicated. Too many
                steps, too many promises, and an ingredient list that read like a chemistry exam.
              </p>
              <p>
                So we built the opposite. A tight collection of essentials — a cleanser, a toner, a
                serum, a cream — each formulated to do one job exceptionally well, and to layer
                beautifully with the others.
              </p>
              <p>
                Everything we make is dermatologist tested, cruelty free and designed to be used
                every single day. No theatrics. Just skin that looks healthy, calm and unmistakably
                yours.
              </p>
            </div>

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
          </Reveal>

          <Reveal delay={120} className="grid gap-5 self-start sm:grid-cols-2">
            <SafeImage
              src={ABOUT_IMAGES.lab}
              alt="Velora skincare products arranged for a formulation shoot"
              wrapperClassName="aspect-[4/5] rounded-xl2 border border-white/70 shadow-soft sm:mt-10"
              className="h-full w-full object-cover"
              sizes="(max-width: 640px) 100vw, 25vw"
            />
            <SafeImage
              src={ABOUT_IMAGES.gift}
              alt="Velora skincare set in recycled packaging with dried flowers"
              wrapperClassName="aspect-[4/5] rounded-xl2 border border-white/70 shadow-soft"
              className="h-full w-full object-cover"
              sizes="(max-width: 640px) 100vw, 25vw"
            />
            <SafeImage
              src={ABOUT_IMAGES.community}
              alt="A calm skincare moment in soft natural light"
              wrapperClassName="aspect-[4/5] rounded-xl2 border border-white/70 shadow-soft sm:col-span-2 sm:aspect-[16/9]"
              className="h-full w-full object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-16 lg:py-24" aria-labelledby="philosophy-heading">
        <div className="container-velora">
          <Reveal>
            <SectionHeading
              eyebrow="Philosophy"
              title="How we formulate"
              subtitle="Three principles guide every product that carries the Velora name."
            />
          </Reveal>
          <ul className="mt-14 grid gap-6 lg:grid-cols-3">
            {PRINCIPLES.map((principle, i) => (
              <Reveal as="li" key={principle.title} delay={i * 90}>
                <div className="flex h-full flex-col rounded-xl2 border border-ink/[0.07] bg-white p-8 shadow-soft">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blush text-burgundy">
                    <principle.icon size={20} strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-6 font-serif text-[20px]">{principle.title}</h3>
                  <p className="mt-3 flex-1 text-[14px] leading-relaxed text-ink/65">{principle.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-blush py-16 lg:py-24" aria-labelledby="commitment-heading">
        <div className="container-velora grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <SafeImage
              src={ABOUT_IMAGES.community}
              alt="Woman enjoying her Velora skincare routine"
              wrapperClassName="aspect-[4/5] rounded-xl2 border border-white/70 shadow-card"
              className="h-full w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 46vw"
            />
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow">Our commitment</p>
            <h2 id="commitment-heading" className="mt-5 font-serif text-[30px] leading-tight sm:text-[40px]">
              Kind to skin, kinder to the planet
            </h2>
            <ul className="mt-8 space-y-6">
              {[
                {
                  title: 'Cruelty free, always',
                  text: 'We never test on animals and we do not work with suppliers who do.',
                },
                {
                  title: 'Recyclable packaging',
                  text: 'Glass flacons, aluminium closures and plastic-free shipping — designed to be refilled, not binned.',
                },
                {
                  title: 'Responsible sourcing',
                  text: 'Botanical ingredients are traceable to growers who share our standards for soil, water and people.',
                },
                {
                  title: 'Ingredients you can read',
                  text: 'Full INCI lists on every product page, with no unnecessary harsh chemicals.',
                },
              ].map((item) => (
                <li key={item.title} className="border-l border-burgundy/25 pl-6">
                  <h3 className="font-serif text-[18px]">{item.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-ink/65">{item.text}</p>
                </li>
              ))}
            </ul>
            <Button to="/shop" className="mt-10 gap-2">
              Shop the collection <ArrowRight size={16} />
            </Button>
          </Reveal>
        </div>
      </section>

      <Testimonials />
      <Newsletter />
    </>
  );
}
