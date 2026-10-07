import { useState } from 'react';
import { Check, Mail } from 'lucide-react';
import Reveal from '../ui/Reveal.jsx';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  };

  return (
    <section className="bg-cream pb-16 lg:pb-24" aria-labelledby="newsletter-heading">
      <div className="container-velora">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-burgundy px-8 py-14 text-cream shadow-card sm:px-14 lg:px-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-rose/40 blur-3xl"
            />
            <div className="relative grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
              <div>
                <h2
                  id="newsletter-heading"
                  className="font-serif text-[30px] leading-tight text-cream sm:text-[38px]"
                >
                  Join Our Beauty Community
                </h2>
                <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-cream/75">
                  Get skincare tips, beauty inspiration and exclusive offers delivered to your inbox.
                </p>
              </div>

              <div>
                {done ? (
                  <p className="flex items-center gap-3 rounded-md bg-cream/10 px-5 py-4 text-sm text-cream">
                    <Check size={17} className="text-softpink" />
                    Thank you — please check your inbox to confirm.
                  </p>
                ) : (
                  <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email address
                    </label>
                    <div className="relative flex-1">
                      <Mail
                        size={17}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/35"
                      />
                      <input
                        id="newsletter-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full rounded-md border border-transparent bg-cream py-3.5 pl-11 pr-4 text-sm text-ink placeholder:text-ink/40 focus:border-cream focus:outline-none"
                      />
                    </div>
                    <button type="submit" className="btn bg-ink px-8 py-3.5 text-cream hover:bg-ink/85">
                      Subscribe
                    </button>
                  </form>
                )}

                <p className="mt-4 text-[12px] text-cream/60">
                  We respect your inbox. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
