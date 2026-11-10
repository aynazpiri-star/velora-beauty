import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toFa } from '../../lib/format.js';
import { ArrowLeftIcon, SparkleIcon, TagIcon } from '../Icons.jsx';
import Reveal from '../Reveal.jsx';

const nextFridayEnd = () => {
  const now = new Date();
  const target = new Date(now);
  const day = now.getDay(); // 5 = Friday
  const diff = (5 - day + 7) % 7;
  target.setDate(now.getDate() + diff);
  target.setHours(23, 59, 59, 999);
  if (target.getTime() <= now.getTime()) target.setDate(target.getDate() + 7);
  return target;
};

const pad = (value) => String(value).padStart(2, '0');

export default function OffersBanner() {
  const [target] = useState(nextFridayEnd);
  const [left, setLeft] = useState(() => Math.max(0, target - Date.now()));

  useEffect(() => {
    const timer = setInterval(() => setLeft(Math.max(0, target - Date.now())), 1000);
    return () => clearInterval(timer);
  }, [target]);

  const seconds = Math.floor(left / 1000);
  const parts = {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };

  return (
    <section className="section offers-section">
      <div className="container">
        <Reveal className="offers">
          <div className="offers__glow" aria-hidden="true" />
          <div className="offers__content">
            <span className="offers__eyebrow">
              <SparkleIcon size={15} /> جشنواره پایان فصل
            </span>
            <h2>
              تا <span>۴۰٪ تخفیف</span>
              <br />
              روی منتخب کفش‌های پاییز
            </h2>
            <p>
              روی بیش از ۳۰ مدل منتخب، شامل کتانی‌های اسپرت و کفش‌های رسمی. کد تخفیف اضافه:
              <b className="brand-word"> VELORA15</b>
            </p>

            <div className="countdown" aria-label="زمان باقی‌مانده تا پایان جشنواره">
              {[
                ['روز', parts.days],
                ['ساعت', parts.hours],
                ['دقیقه', parts.minutes],
                ['ثانیه', parts.seconds],
              ].map(([label, value]) => (
                <div className="countdown__cell" key={label}>
                  <span className="countdown__value">{toFa(pad(value))}</span>
                  <span className="countdown__label">{label}</span>
                </div>
              ))}
            </div>

            <div className="offers__actions">
              <Link to="/shop?sort=discount" className="btn btn--light">
                <TagIcon size={18} />
                خرید با تخفیف
              </Link>
              <Link to="/shop" className="offers__link">
                دیدن همه محصولات
                <ArrowLeftIcon size={16} />
              </Link>
            </div>
          </div>

          <div className="offers__media">
            <span className="offers__discount">۴۰٪</span>
            <img src="/images/offer-1.jpg" alt="کفش تخفیف‌دار Velora" loading="lazy" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
