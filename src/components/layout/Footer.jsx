import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone, Youtube, Music2, Send } from 'lucide-react';
import Logo from '../ui/Logo.jsx';
import { FOOTER_LINKS } from '../../data/content.js';
import { CATEGORIES } from '../../data/products.js';

const SOCIALS = [
  { label: 'Instagram', Icon: Instagram, href: 'https://instagram.com' },
  { label: 'Pinterest', Icon: Send, href: 'https://pinterest.com' },
  { label: 'TikTok', Icon: Music2, href: 'https://tiktok.com' },
  { label: 'YouTube', Icon: Youtube, href: 'https://youtube.com' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-ink text-cream">
      <div className="container-velora py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream/65">
              Natural beauty. Thoughtful care. Premium formulas designed for healthy, radiant skin
              and a routine you look forward to.
            </p>
            <ul className="mt-7 flex items-center gap-3">
              {SOCIALS.map(({ label, Icon, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`VELORA on ${label}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition-colors hover:border-burgundy hover:bg-burgundy hover:text-cream"
                  >
                    <Icon size={17} strokeWidth={1.6} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-labelledby="footer-quick">
            <h2 id="footer-quick" className="font-serif text-lg text-cream">
              Quick Links
            </h2>
            <ul className="mt-5 space-y-3">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-cream/65 transition-colors hover:text-cream">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-care">
            <h2 id="footer-care" className="font-serif text-lg text-cream">
              Customer Care
            </h2>
            <ul className="mt-5 space-y-3">
              {FOOTER_LINKS.customerCare.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-cream/65 transition-colors hover:text-cream">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-serif text-lg text-cream">Contact</h2>
            <ul className="mt-5 space-y-3 text-sm text-cream/65">
              <li className="flex items-center gap-3">
                <Mail size={15} strokeWidth={1.6} className="text-rose" />
                <a href="mailto:hello@velora-beauty.com" className="transition-colors hover:text-cream">
                  hello@velora-beauty.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} strokeWidth={1.6} className="text-rose" />
                <a href="tel:+10000000000" className="transition-colors hover:text-cream">
                  +1 (000) 000-0000
                </a>
              </li>
            </ul>

            <h3 className="mt-8 font-serif text-lg text-cream">Stay Connected</h3>
            {subscribed ? (
              <p className="mt-4 text-sm text-rose">
                Thank you — welcome to the Velora community.
              </p>
            ) : (
              <form onSubmit={onSubmit} className="mt-4">
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <div className="flex items-center gap-2 border-b border-cream/25 pb-2 focus-within:border-rose">
                  <input
                    id="footer-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full bg-transparent text-sm text-cream placeholder:text-cream/40 focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to the newsletter"
                    className="text-cream/70 transition-colors hover:text-rose"
                  >
                    <Send size={17} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-cream/12 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {CATEGORIES.map((cat) => (
              <li key={cat.slug}>
                <Link
                  to={`/collections/${cat.slug}`}
                  className="text-[12px] uppercase tracking-[0.16em] text-cream/45 transition-colors hover:text-cream"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-[12px] text-cream/45">
            © 2026 Velora Beauty. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
