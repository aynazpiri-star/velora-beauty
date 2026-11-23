import { useState } from 'react';
import { subscribe } from '../../lib/api.js';
import { IconArrowLeft } from '../Icons.jsx';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle');
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    setState('loading');
    setError('');
    try {
      await subscribe(email);
      setState('done');
      setEmail('');
    } catch (err) {
      setState('idle');
      setError(err.message);
    }
  };

  return (
    <section className="section section--cream newsletter">
      <div className="shell newsletter__inner">
        <div className="newsletter__copy">
          <p className="eyebrow">خبرنامه</p>
          <h2>اول از همه بدانید</h2>
          <p>
            از کالکشن‌های تازه و ساعت‌های محدود باخبر شوید. بدون تبلیغات اضافه، ماهی یک نامه.
          </p>
        </div>

        {state === 'done' ? (
          <p className="newsletter__done">ممنون! ایمیل شما ثبت شد.</p>
        ) : (
          <form className="newsletter__form" onSubmit={submit}>
            <label htmlFor="newsletter-email" className="visually-hidden">
              ایمیل
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="ایمیل شما"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={state === 'loading'}
            />
            <button type="submit" className="newsletter__submit" disabled={state === 'loading'}>
              {state === 'loading' ? 'در حال ثبت…' : 'عضویت'}
              <IconArrowLeft size={16} />
            </button>
          </form>
        )}

        {error ? <p className="form-error newsletter__error">{error}</p> : null}
      </div>
    </section>
  );
}
