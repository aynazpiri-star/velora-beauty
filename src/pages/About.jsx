import { Link } from 'react-router-dom';
import { IconArrowLeft } from '../components/Icons.jsx';
import Reveal from '../components/Reveal.jsx';
import './static.css';

export default function About() {
  return (
    <div className="page about">
      <div className="shell">
        <header className="about__head">
          <p className="eyebrow">دربارهٔ ولورا</p>
          <h1>
            زمان را
            <br />
            به سبک خودت بساز.
          </h1>
          <p className="about__lead">
            ولورا یک بوتیک ساعت است؛ جایی که وسواسِ انتخاب، با آرامشِ طراحی دیدار می‌کند. ما به
            ساعت‌هایی باور داریم که بی‌سروصدا حرف می‌زنند و سال‌ها همراه می‌مانند.
          </p>
        </header>

        <div className="about__split">
          <Reveal className="about__media">
            <img src="/images/editorial-table.jpg" alt="ساعت ولورا روی میز کارگاه" loading="lazy" />
          </Reveal>
          <Reveal className="about__story" delay={100}>
            <h2>از یک وسواس ساده شروع شد</h2>
            <p>
              سال ۱۳۹۴، با یک ویترین کوچک در تهران آغاز کردیم؛ با این باور که خریدِ ساعت نباید
              شبیه خریدِ کالا باشد. باید شبیه انتخابِ یک همراه باشد. امروز هم همان وسواس را داریم:
              هر قطعه پیش از ورود به بوتیک، از نظر موتور، تنظیم و اصالت بررسی می‌شود.
            </p>
            <p>
              کالکشن‌های ما محدود و سنجیده‌اند. ترجیح می‌دهیم ده ساعتِ درست داشته باشیم تا صد
              ساعتِ معمولی. این انتخاب، همان چیزی است که ولورا را متفاوت می‌کند.
            </p>
            <Link to="/shop" className="link-underline">
              مشاهدهٔ کالکشن‌ها
            </Link>
          </Reveal>
        </div>

        <div className="about__values">
          <div className="about__value">
            <span>۰۱</span>
            <h3>انتخابِ سنجیده</h3>
            <p>هر کالکشن محدود است؛ فقط ساعت‌هایی که خودمان می‌پوشیم.</p>
          </div>
          <div className="about__value">
            <span>۰۲</span>
            <h3>اصالت، بدون استثنا</h3>
            <p>هر قطعه با کارت اصالت، شمارهٔ سریال و گارانتی رسمی ارائه می‌شود.</p>
          </div>
          <div className="about__value">
            <span>۰۳</span>
            <h3>همراهیِ بلندمدت</h3>
            <p>تنظیم، تعویض بند و سرویس دوره‌ای، بخشی از خرید شماست.</p>
          </div>
        </div>

        <div className="about__banner">
          <img src="/images/editorial-leaf.jpg" alt="ساعت ولورا در نور طبیعی" loading="lazy" />
          <div className="about__banner-copy">
            <p className="eyebrow">بوتیک ولورا</p>
            <h2>منتظر دیدار شما هستیم</h2>
            <Link to="/contact" className="btn btn--light">
              آدرس و ساعت کاری
              <IconArrowLeft size={17} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
