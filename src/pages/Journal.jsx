import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHero from '../components/ui/PageHero.jsx';
import SafeImage from '../components/ui/SafeImage.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Badge from '../components/ui/Badge.jsx';
import Newsletter from '../components/home/Newsletter.jsx';
import { ABOUT_IMAGES, OFFER_IMAGE, PROMO_SKINCARE_IMAGE } from '../data/content.js';

const POSTS = [
  {
    title: 'How to build a routine your skin actually likes',
    category: 'Routines',
    date: '2 October 2026',
    read: '6 min read',
    excerpt:
      'Four steps, twice a day. Here is why simplicity beats a twelve-step shelf, and how to know when to add something new.',
    image: ABOUT_IMAGES.story,
    alt: 'Natural skincare products beside eucalyptus leaves',
    featured: true,
  },
  {
    title: 'Vitamin C: what it does and how to use it well',
    category: 'Ingredients',
    date: '24 September 2026',
    read: '5 min read',
    excerpt:
      'The most studied brightening active in skincare — and the simple rules that keep it stable, gentle and effective.',
    image: 'https://images.pexels.com/photos/8101511/pexels-photo-8101511.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Three serum bottles arranged on linen',
  },
  {
    title: 'Why ceramides belong in every winter routine',
    category: 'Ingredients',
    date: '15 September 2026',
    read: '4 min read',
    excerpt:
      'When the air turns cold, your barrier needs support. Here is how ceramides keep skin comfortable and calm.',
    image: 'https://images.pexels.com/photos/10221858/pexels-photo-10221858.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Hands opening a jar of face cream',
  },
  {
    title: 'The five-minute evening ritual',
    category: 'Wellness',
    date: '3 September 2026',
    read: '3 min read',
    excerpt:
      'A short, restorative routine for the nights you are tired — and why it still makes a difference in the morning.',
    image: PROMO_SKINCARE_IMAGE,
    alt: 'Woman with glowing skin after her evening routine',
  },
  {
    title: 'Fragrance layering, the Velora way',
    category: 'Fragrance',
    date: '21 August 2026',
    read: '4 min read',
    excerpt:
      'Start with body care, finish with eau de parfum. A simple method for a scent that lasts through the day.',
    image: OFFER_IMAGE,
    alt: 'Skincare and fragrance set styled with dried flowers',
  },
];

export default function Journal() {
  const [featured, ...rest] = POSTS;

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Notes on Skin, Beauty and Slow Rituals"
        description="Ingredient explainers, routine guides and the small habits behind healthy-looking skin."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Journal' }]}
        align="center"
      />

      <section className="bg-blush py-16 lg:py-20" aria-label="Journal articles">
        <div className="container-velora">
          <Reveal>
            <article className="grid overflow-hidden rounded-[2rem] border border-ink/[0.07] bg-white shadow-soft lg:grid-cols-2">
              <SafeImage
                src={featured.image}
                alt={featured.alt}
                wrapperClassName="aspect-[4/3] lg:h-full lg:aspect-auto"
                className="h-full w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="flex flex-col justify-center p-8 lg:p-14">
                <Badge tone="soft">{featured.category}</Badge>
                <h2 className="mt-5 font-serif text-[28px] leading-tight sm:text-[36px]">
                  {featured.title}
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-ink/70">{featured.excerpt}</p>
                <p className="mt-6 text-[12px] uppercase tracking-[0.16em] text-ink/45">
                  {featured.date} · {featured.read}
                </p>
                <span className="link-underline mt-6 w-fit">
                  Read the article <ArrowRight size={15} />
                </span>
              </div>
            </article>
          </Reveal>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {rest.map((post, i) => (
              <Reveal as="li" key={post.title} delay={i * 70}>
                <article className="group flex h-full flex-col overflow-hidden rounded-xl2 border border-ink/[0.07] bg-white shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card">
                  <SafeImage
                    src={post.image}
                    alt={post.alt}
                    wrapperClassName="aspect-[4/3]"
                    className="h-full w-full object-cover transition-transform duration-[1000ms] group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-rose">
                      {post.category}
                    </p>
                    <h3 className="mt-3 flex-1 font-serif text-[18px] leading-snug transition-colors group-hover:text-burgundy">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-[13px] leading-relaxed text-ink/60">{post.excerpt}</p>
                    <p className="mt-5 text-[11px] uppercase tracking-[0.14em] text-ink/45">
                      {post.date} · {post.read}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-12 flex justify-center">
            <Link to="/shop" className="link-underline">
              Shop the products in these stories <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
