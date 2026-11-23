import { useState } from 'react';
import { sendMessage } from '../lib/api.js';
import { IconInstagram, IconMail, IconPhone, IconPin } from '../components/Icons.jsx';
import './static.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [state, setState] = useState('idle');
  const [error, setError] = useState('');

  const update = (key) => (event) => setForm((previous) => ({ ...previous, [key]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setState('loading');
    setError('');
    try {
      await sendMessage(form);
      setState('done');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setState('idle');
      setError(err.message);
    }
  };

  return (
    <div className="page contact">
      <div className="shell">
        <header className="contact__head">
          <p className="eyebrow">تماس</p>
          <h1>با ولورا حرف بزنید</h1>
          <p>
            برای مشاورهٔ خرید، انتخاب هدیه یا هماهنگی بازدید از بوتیک، ما کنار شما هستیم.
          </p>
        </header>

        <div className="contact__grid">
          <div className="contact__info">
            <div className="contact__item">
              <IconPin size={20} />
              <div>
                <h3>بوتیک</h3>
                <p>تهران، خیابان ولیعصر، نبش کوچهٔ بهار، پلاک ۱۲</p>
              </div>
            </div>
            <div className="contact__item">
              <IconPhone size={20} />
              <div>
                <h3>تلفن</h3>
                <a href="tel:+982100000000">۰۲۱ ۰۰۰ ۰۰ ۰۰۰</a>
                <p>شنبه تا پنجشنبه، ۱۰ تا ۲۰</p>
              </div>
            </div>
            <div className="contact__item">
              <IconMail size={20} />
              <div>
                <h3>ایمیل</h3>
                <a href="mailto:hello@velora.studio">hello@velora.studio</a>
              </div>
            </div>
            <div className="contact__item">
              <IconInstagram size={20} />
              <div>
                <h3>اینستاگرام</h3>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                  @velora.watch
                </a>
              </div>
            </div>
          </div>

          {state === 'done' ? (
            <div className="contact__done">
              <h2>پیام شما دریافت شد</h2>
              <p>در اولین فرصت کاری پاسخ می‌دهیم. ممنون که با ولورا همراهید.</p>
              <button type="button" className="btn btn--ghost" onClick={() => setState('idle')}>
                ارسال پیام دیگر
              </button>
            </div>
          ) : (
            <form className="contact__form" onSubmit={submit}>
              <div className="field">
                <label htmlFor="name">نام و نام خانوادگی</label>
                <input id="name" required value={form.name} onChange={update('name')} />
              </div>
              <div className="field">
                <label htmlFor="email">ایمیل</label>
                <input id="email" type="email" required value={form.email} onChange={update('email')} />
              </div>
              <div className="field">
                <label htmlFor="message">پیام</label>
                <textarea
                  id="message"
                  rows="5"
                  required
                  value={form.message}
                  onChange={update('message')}
                />
              </div>
              {error ? <p className="form-error">{error}</p> : null}
              <button type="submit" className="btn btn--dark" disabled={state === 'loading'}>
                {state === 'loading' ? 'در حال ارسال…' : 'ارسال پیام'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
