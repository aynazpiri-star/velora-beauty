import { useState } from 'react';
import { api } from '../../lib/api.js';
import { MailIcon, SparkleIcon } from '../Icons.jsx';
import Reveal from '../Reveal.jsx';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const submit = async (event) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setStatus({ state: 'error', message: 'یک ایمیل معتبر وارد کنید.' });
      return;
    }
    setStatus({ state: 'loading', message: '' });
    try {
      await api.subscribe(email.trim());
      setStatus({ state: 'success', message: 'ثبت شد! کد تخفیف و تازه‌ها را برایتان می‌فرستیم.' });
      setEmail('');
    } catch (error) {
      setStatus({ state: 'error', message: error.message || 'ثبت نشد، دوباره تلاش کنید.' });
    }
  };

  return (
    <section className="section newsletter-section">
      <div className="container">
        <Reveal className="newsletter">
          <div className="newsletter__glow" aria-hidden="true" />
          <div className="newsletter__content">
            <span className="eyebrow">خبرنامه ولورا</span>
            <h2 className="section-title">
              اول از همه <em>باخبر شوید</em>
            </h2>
            <p className="section-sub">
              تخفیف‌های فصل، ورود مجموعه‌های جدید و راهنمای انتخاب سایز — حداکثر دو ایمیل در ماه، بدون
              تبلیغ اضافه.
            </p>
          </div>

          <form className="newsletter__form" onSubmit={submit}>
            <label className="newsletter__field">
              <MailIcon size={18} />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="ایمیل خود را وارد کنید"
                aria-label="ایمیل برای عضویت در خبرنامه"
                dir="ltr"
              />
            </label>
            <button type="submit" className="btn btn--primary" disabled={status.state === 'loading'}>
              {status.state === 'loading' ? 'در حال ثبت…' : 'عضویت در خبرنامه'}
              <SparkleIcon size={17} />
            </button>
            {status.message && (
              <p className={`newsletter__message ${status.state === 'error' ? 'is-error' : ''}`} role="status">
                {status.message}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
