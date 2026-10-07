import { useState } from 'react';
import { Check, Clock, Instagram, Mail, MapPin, Phone, Send } from 'lucide-react';
import PageHero from '../components/ui/PageHero.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { FAQS } from '../data/content.js';

const DETAILS = [
  { Icon: Mail, label: 'Email', value: 'hello@velora-beauty.com', href: 'mailto:hello@velora-beauty.com' },
  { Icon: Phone, label: 'Phone', value: '+1 (000) 000-0000', href: 'tel:+10000000000' },
  { Icon: MapPin, label: 'Studio', value: '18 Bloom Street, London EC2A 4NE' },
  { Icon: Clock, label: 'Opening hours', value: 'Mon–Fri, 9:00–18:00 GMT' },
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    e.target.reset();
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We Would Love to Hear From You"
        description="Questions about a formula, your order or which routine suits your skin? Our team replies within one working day."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
      />

      <section className="bg-blush py-14 lg:py-20" aria-label="Contact form">
        <div className="container-velora grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-14">
          <Reveal>
            <ul className="space-y-6">
              {DETAILS.map(({ Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-burgundy/25 text-burgundy">
                    <Icon size={17} strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-ink/45">{label}</p>
                    {href ? (
                      <a href={href} className="mt-1 block text-[15px] transition-colors hover:text-burgundy">
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 text-[15px] text-ink/85">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-9 rounded-xl2 border border-ink/[0.07] bg-white p-6 shadow-soft">
              <p className="eyebrow">Social</p>
              <div className="mt-4 flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="VELORA on Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/12 text-ink/70 transition-colors hover:border-burgundy hover:text-burgundy"
                >
                  <Instagram size={17} strokeWidth={1.6} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="VELORA on TikTok"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/12 text-ink/70 transition-colors hover:border-burgundy hover:text-burgundy"
                >
                  <Send size={17} strokeWidth={1.6} />
                </a>
                <span className="text-[13px] text-ink/55">@velorabeauty</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-xl2 border border-ink/[0.07] bg-white p-7 shadow-soft lg:p-9">
              <h2 className="font-serif text-[24px]">Send us a message</h2>

              {sent ? (
                <p className="mt-6 flex items-center gap-3 rounded-md bg-blush px-5 py-4 text-[14px] text-ink/80">
                  <Check size={17} className="text-burgundy" />
                  Thank you — your message has been sent. We will reply within one working day.
                </p>
              ) : null}

              <form onSubmit={onSubmit} className="mt-7 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-[13px] text-ink/70">
                    Full name
                  </label>
                  <input id="contact-name" required placeholder="Amelia Hart" className="field" />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-[13px] text-ink/70">
                    Email address
                  </label>
                  <input id="contact-email" type="email" required placeholder="you@example.com" className="field" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="contact-subject" className="mb-2 block text-[13px] text-ink/70">
                    Subject
                  </label>
                  <input id="contact-subject" required placeholder="Which routine suits my skin?" className="field" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="contact-message" className="mb-2 block text-[13px] text-ink/70">
                    Message
                  </label>
                  <textarea id="contact-message" required rows={6} placeholder="Tell us how we can help…" className="field" />
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" className="btn-primary px-9 py-3.5">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-16 lg:py-20" aria-labelledby="contact-faq-heading">
        <div className="container-velora grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">FAQ</p>
            <h2 id="contact-faq-heading" className="mt-5 font-serif text-[28px] leading-tight sm:text-[36px]">
              Answers to the questions we hear most
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-ink/65">
              Still unsure? Our team is happy to help you build a routine that suits your skin.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="divide-y divide-ink/[0.08] rounded-xl2 border border-ink/[0.07] bg-white px-6 shadow-soft">
              {FAQS.slice(0, 4).map((faq) => (
                <details key={faq.q} className="group py-5">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-serif text-[16px]">
                    {faq.q}
                    <span className="text-burgundy transition-transform group-open:rotate-45">＋</span>
                  </summary>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink/70">{faq.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
