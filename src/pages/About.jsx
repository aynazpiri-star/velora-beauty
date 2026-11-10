import { Link } from 'react-router-dom';
import { benefits } from '../../shared/catalog.js';
import Reveal from '../components/Reveal.jsx';
import { iconMap, ArrowLeftIcon } from '../components/Icons.jsx';
import './static.css';

export default function About() {
  return (
    <div className="page">
      <div className="container">
        <section className="about-hero">
          <Reveal className="about-hero__copy">
            <span className="eyebrow">درباره Velora</span>
            <h1 className="page-title">
              کفشی که <em>شخصیت</em> شما را کامل می‌کند
            </h1>
            <p className="about-lead">
              Velora در سال ۱۳۹۸ با یک ایده ساده شروع شد: کفش خوب نباید لوکس و دست‌نیافتنی باشد، اما
              نباید هم بی‌هویت و تکراری باشد. امروز مجموعه‌ای از کفش‌های اسپرت، رسمی و روزمره را
              برای شما انتخاب می‌کنیم که هم کیفیت ساخت بالایی دارند و هم در استایل شما جای می‌گیرند.
            </p>
            <p className="about-lead">
              هر مدل قبل از ورود به فروشگاه توسط تیم ما پوشیده و بررسی می‌شود: دوخت، زیره، اندازه و
              راحتی بعد از چند ساعت استفاده. اگر جفتی از این آزمون بیرون نیاید، وارد مجموعه نمی‌شود.
            </p>

            <div className="about-stats">
              <div>
                <b>۱۲٬۰۰۰+</b>
                <span>خرید موفق</span>
              </div>
              <div>
                <b>۴٫۹/۵</b>
                <span>رضایت مشتریان</span>
              </div>
              <div>
                <b>۸۶</b>
                <span>مدل در مجموعه</span>
              </div>
            </div>
          </Reveal>

          <Reveal className="about-hero__media" delay={120}>
            <img src="/images/about-editorial.jpg" alt="استایل Velora" />
            <span className="about-badge brand-word">Velora</span>
          </Reveal>
        </section>

        <section className="about-values">
          <div className="about-values__head">
            <span className="eyebrow">اصول ما</span>
            <h2 className="section-title">چهار قولی که می‌دهیم</h2>
          </div>
          <div className="about-values__grid">
            {benefits.map((benefit, index) => {
              const Icon = iconMap[benefit.icon];
              return (
                <Reveal key={benefit.title} delay={index * 70} className="about-value">
                  <span className="about-value__icon">{Icon ? <Icon size={22} /> : null}</span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </Reveal>
              );
            })}
          </div>
        </section>

        <Reveal className="about-cta">
          <h2>آماده‌اید قدم بعدی را بردارید؟</h2>
          <p>مجموعه این فصل را ببینید؛ ارسال رایگان برای سفارش‌های بالای ۸ میلیون تومان.</p>
          <Link to="/shop" className="btn btn--primary btn--lg">
            مشاهده مجموعه
            <ArrowLeftIcon size={18} />
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
