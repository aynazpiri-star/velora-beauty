import { Link } from 'react-router-dom';
import { collections } from '../../../shared/catalog.js';
import Reveal from '../Reveal.jsx';
import { IconArrowLeft } from '../Icons.jsx';

export default function Collections() {
  return (
    <section className="section section--sand collections" id="collections">
      <div className="shell">
        <div className="section-head">
          <div>
            <p className="eyebrow">کالکشن‌ها</p>
            <h2>برای هر سلیقه، یک امضا</h2>
          </div>
          <p>
            از کلاسیک‌های بی‌زمان تا اسکلتون‌های مکانیکی؛ هر کالکشن ولورا با وسواس انتخاب شده است.
          </p>
        </div>

        <div className="collections__grid">
          {collections.map((collection, index) => (
            <Reveal key={collection.slug} delay={index * 70}>
              <Link to={`/shop?collection=${collection.slug}`} className="collection-card">
                <img src={collection.image} alt={`کالکشن ${collection.name}`} loading="lazy" />
                <span className="collection-card__shade" aria-hidden="true" />
                <span className="collection-card__body">
                  <span className="collection-card__index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="collection-card__text">
                    <h3>{collection.name}</h3>
                    <p>{collection.tagline}</p>
                  </span>
                  <span className="collection-card__arrow" aria-hidden="true">
                    <IconArrowLeft size={16} />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
