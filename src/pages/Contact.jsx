import { useState } from 'react';
import { api } from '../lib/api.js';
import Reveal from '../components/Reveal.jsx';
import { MailIcon, MapPinIcon, PhoneIcon, ClockIcon } from '../components/Icons.jsx';
import './static.css';

const CONTACTS = [
  {
    icon: PhoneIcon,
    title: 'تلفن پشتیبانی',
    value: '۰۲۱ ۰۰۰ ۰۰ ۰۰',
    hint: 'هر روز ۹ صبح تا ۹ شب',
  },
  {
    icon: MailIcon,
    title: 'ایمیل',
    value: 'hello@velora.store',
    hint: 'پاسخ‌گویی حداکثر ۲۴ ساعته',
  },
  {
    icon: MapPinIcon,
    title: 'فروشگاه',
    value: 'تهران، ولی‌عصر، پلاک ۱۲۴۸',
    hint: 'طبقه دوم، واحد ۳',
  },
  {
    icon: ClockIcon,
    title: 'ساعات کاری',
    value: 'شنبه تا پنجشنبه ۱۰ تا ۲۰',
    hint: 'جمعه‌ها تعطیل',
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [state, setState] = useState({ state: 'idle', message: '' });

  const submit = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.message.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      setState({ state: 'error', message: 'نام، ایمیل معتبر و متن پیام را کامل کنید.' });
      return;
    }
    setState({ state: 'loading', message: '' });
    try {
      await api.contact(form);
      setState({ state: 'success', message: 'پیام شما ثبت شد. همکاران ما به‌زودی پاسخ می‌دهند.' });
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      setState({ state: 'error', message: error.message });
    }
  };

  return (
    <div className="page">
      <div className="container">
        <header className="page-head">
          <span className="eyebrow">تماس با ما</span>
          <h1 className="page-title">سوالی دارید؟ در خدمتیم</h1>
          <p className="section-sub">
            برای مشاوره سایز، پیگیری سفارش یا هر سوال دیگری از راه‌های زیر با ما در ارتباط باشید.
          </p>
        </header>

        <div className="contact-grid">
          <div className="contact-cards">
            {CONTACTS.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * 60} className="contact-card">
                  <span className="contact-card__icon">
                    <Icon size={19} />
                  </span>
                  <div>
                    <span className="tiny">{item.title}</span>
                    <b>{item.value}</b>
                    <em>{item.hint}</em>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="contact-form-wrap" delay={80}>
            <h2>ارسال پیام</h2>
            <form className="contact-form" onSubmit={submit}>
              <label className="field">
                <span>نام شما</span>
                <input
                  className="input"
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  placeholder="نام و نام خانوادگی"
                />
              </label>
              <label className="field">
                <span>ایمیل</span>
                <input
                  className="input"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  placeholder="you@example.com"
                  dir="ltr"
                  inputMode="email"
                />
              </label>
              <label className="field">
                <span>پیام</span>
                <textarea
                  className="textarea"
                  value={form.message}
                  onChange={(event) => setForm({ ...form, message: event.target.value })}
                  placeholder="چطور می‌توانیم کمک کنیم؟"
                />
              </label>
              <div className="contact-form__foot">
                <button type="submit" className="btn btn--primary" disabled={state.state === 'loading'}>
                  {state.state === 'loading' ? 'در حال ارسال…' : 'ارسال پیام'}
                </button>
                {state.message && (
                  <span className={`tiny ${state.state === 'error' ? 'form-error' : 'form-ok'}`}>
                    {state.message}
                  </span>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
