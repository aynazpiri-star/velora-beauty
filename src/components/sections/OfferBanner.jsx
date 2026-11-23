import { Link } from 'react-router-dom';
import Reveal from '../Reveal.jsx';

export default function OfferBanner() {
  return (
    <section className="section section--sand offer-section">
      <div className="shell">
        <Reveal>
          <div className="offer">
            <span className="offer__ghost" aria-hidden="true">
              ۱۵٪
            </span>
            <div className="offer__copy">
              <p className="eyebrow">پیشنهاد ویژه</p>
              <h2>اولین خرید، با ۱۵٪ تخفیف</h2>
              <p>
                کد <strong>VELORA15</strong> را در مرحلهٔ پرداخت وارد کنید و اولین ساعت خود را
                با تخفیف انتخاب کنید.
              </p>
              <Link to="/shop" className="btn btn--light">
                انتخاب ساعت
              </Link>
            </div>
            <div className="offer__media" aria-hidden="true">
              <img src="/images/editorial-leaf.jpg" alt="" loading="lazy" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
