import { Link } from 'react-router-dom';
import { categories } from '../../shared/catalog.js';
import { InstagramIcon, MailIcon, MapPinIcon, PhoneIcon, TelegramIcon, WhatsappIcon } from './Icons.jsx';
import './footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-brand__logo">
              <span className="brand-word">Velora</span>
              <span className="logo__dot" aria-hidden="true" />
            </Link>
            <p>
              بوتیک آنلاین کفش ولورا؛ مجموعه‌ای منتخب از کفش‌های اسپرت، رسمی و روزمره برای کسانی که به
              جزئیات اهمیت می‌دهند. هر جفت کفش پیش از ارسال بررسی می‌شود.
            </p>
            <div className="footer-socials">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="اینستاگرام">
                <InstagramIcon size={19} />
              </a>
              <a href="https://t.me" target="_blank" rel="noreferrer" aria-label="تلگرام">
                <TelegramIcon size={19} />
              </a>
              <a href="https://wa.me" target="_blank" rel="noreferrer" aria-label="واتس‌اپ">
                <WhatsappIcon size={19} />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>فروشگاه</h4>
            <ul>
              <li>
                <Link to="/shop">همه محصولات</Link>
              </li>
              <li>
                <Link to="/new">جدیدترین محصولات</Link>
              </li>
              <li>
                <Link to="/bestsellers">پرفروش‌ترین‌ها</Link>
              </li>
              <li>
                <Link to="/shop?sort=discount">تخفیف‌دارها</Link>
              </li>
              <li>
                <Link to="/account">پیگیری سفارش</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>دسته‌بندی‌ها</h4>
            <ul>
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link to={`/shop?category=${category.slug}`}>{category.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col footer-col--contact">
            <h4>ارتباط با ما</h4>
            <ul>
              <li>
                <MapPinIcon size={16} />
                <span>تهران، خیابان ولی‌عصر، پلاک ۱۲۴۸، طبقه دوم</span>
              </li>
              <li>
                <PhoneIcon size={16} />
                <a href="tel:+982100000000">۰۲۱ ۰۰۰ ۰۰ ۰۰</a>
              </li>
              <li>
                <MailIcon size={16} />
                <a href="mailto:hello@velora.store">hello@velora.store</a>
              </li>
            </ul>
            <p className="footer-hours">هر روز از ۹ صبح تا ۹ شب</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© ۱۴۰۴ Velora — تمام حقوق محفوظ است.</p>
          <div className="footer-payments">
            <span>پرداخت امن</span>
            <span className="pay-chip">شتاب</span>
            <span className="pay-chip">پرداخت در محل</span>
          </div>
          <Link to="/contact" className="footer-bottom__link">
            قوانین و بازگشت کالا
          </Link>
        </div>
      </div>
    </footer>
  );
}
