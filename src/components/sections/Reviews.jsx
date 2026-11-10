import { useState } from 'react';
import { storeReviews } from '../../../shared/catalog.js';
import { toFa } from '../../lib/format.js';
import { ArrowLeftIcon, StarIcon } from '../Icons.jsx';
import Reveal from '../Reveal.jsx';
import './reviews.css';

const initials = (name) => name.trim().charAt(0);

export default function Reviews() {
  const [start, setStart] = useState(0);
  const visible = [0, 1, 2].map((offset) => storeReviews[(start + offset) % storeReviews.length]);

  const move = (direction) =>
    setStart((current) => (current + direction + storeReviews.length) % storeReviews.length);

  return (
    <section className="section reviews">
      <div className="container">
        <div className="reviews__layout">
          <Reveal className="reviews__intro">
            <span className="eyebrow">نظر مشتریان</span>
            <h2 className="section-title">
              آنچه درباره ما <em>می‌گویند</em>
            </h2>
            <div className="reviews__score">
              <strong>۴٫۹</strong>
              <div>
                <span className="reviews__stars">
                  {[0, 1, 2, 3, 4].map((item) => (
                    <StarIcon key={item} size={15} />
                  ))}
                </span>
                <span className="tiny">از {toFa(1240)} نظر ثبت‌شده</span>
              </div>
            </div>
            <p className="reviews__note">
              نظرات ثبت‌شده توسط مشتریانی است که خریدشان تکمیل شده. میانگین رضایت در سه ماه گذشته ۴٫۹ از ۵
              بوده است.
            </p>
            <div className="reviews__nav">
              <button type="button" className="round-btn" onClick={() => move(-1)} aria-label="نظر بعدی">
                <ArrowLeftIcon size={18} />
              </button>
              <button
                type="button"
                className="round-btn"
                onClick={() => move(1)}
                aria-label="نظر قبلی"
                style={{ transform: 'scaleX(-1)' }}
              >
                <ArrowLeftIcon size={18} />
              </button>
            </div>
          </Reveal>

          <div className="reviews__cards">
            {visible.map((review) => (
              <Reveal key={review.id} className="review-card">
                <span className="review-card__quote">”</span>
                <span className="review-card__stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <StarIcon key={index} size={14} filled={index < review.rating} />
                  ))}
                </span>
                <p>{review.text}</p>
                <div className="review-card__person">
                  <span className="review-card__avatar">{initials(review.name)}</span>
                  <span>
                    <b>{review.name}</b>
                    <em>{review.city}</em>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
