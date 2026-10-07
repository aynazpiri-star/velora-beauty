import { Instagram } from 'lucide-react';
import SafeImage from '../ui/SafeImage.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import Reveal from '../ui/Reveal.jsx';
import { INSTAGRAM_POSTS } from '../../data/content.js';

export default function InstagramSection() {
  return (
    <section className="bg-blush py-16 lg:py-24" aria-labelledby="social-heading">
      <div className="container-velora">
        <Reveal>
          <SectionHeading
            eyebrow="Follow your glow"
            title="Follow Your Glow"
            subtitle="Join our beauty community @velorabeauty"
          />
        </Reveal>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {INSTAGRAM_POSTS.map((post, i) => (
            <Reveal as="li" key={post.src} delay={i * 60}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer noopener"
                className="group relative block overflow-hidden rounded-xl2 border border-white/70 shadow-soft"
                aria-label={`View Velora post: ${post.alt}`}
              >
                <SafeImage
                  src={post.src}
                  alt={post.alt}
                  wrapperClassName="aspect-square"
                  className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-ink/0 text-cream opacity-0 transition-all duration-400 group-hover:bg-ink/35 group-hover:opacity-100">
                  <Instagram size={22} strokeWidth={1.6} />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
