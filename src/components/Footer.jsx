import { Link } from 'react-router-dom';
import { collections } from '../../shared/catalog.js';
import './footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Link to="/" className="brand">
              VELORA
            </Link>
            <p>
              بوتیک ساعت‌های لوکس؛ ساخته‌شده برای لحظه‌هایی که می‌مانند. انتخابِ سنجیده، نه
              انتخابِ زیاد.
            </p>
            <a className="site-footer__mail" href="mailto:hello@velora.studio">
              hello@velora.studio
            </a>
          </div>

          <nav className="site-footer__col" aria-label="فروشگاه">
            <h3>فروشگاه</h3>
            <Link to="/shop">همهٔ ساعت‌ها</Link>
            {collections.slice(0, 4).map((collection) => (
              <Link key={collection.slug} to={`/shop?collection=${collection.slug}`}>
                {collection.name}
              </Link>
            ))}
          </nav>

          <div className="site-footer__col">
            <h3>ولورا</h3>
            <Link to="/about">دربارهٔ ما</Link>
            <Link to="/contact">تماس با ما</Link>
            <Link to="/shop?sort=newest">تازه‌ها</Link>
            <Link to="/cart">سبد خرید</Link>
          </div>

          <div className="site-footer__col site-footer__col--wide">
            <h3>بوتیک</h3>
            <p>تهران، خیابان ولیعصر، نبش کوچهٔ بهار، پلاک ۱۲</p>
            <p>شنبه تا پنجشنبه، ۱۰ تا ۲۰</p>
            <a href="tel:+982100000000">۰۲۱ ۰۰۰ ۰۰ ۰۰۰</a>
          </div>
        </div>

        <div className="site-footer__word" aria-hidden="true">
          VELORA
        </div>

        <div className="site-footer__bottom">
          <span>© ۱۴۰۴ ولورا — تمام حقوق محفوظ است.</span>
          <span>ساخته‌شده با دقت، در تهران</span>
        </div>
      </div>
    </footer>
  );
}
