import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { productsBySlug } from '../../shared/catalog.js';
import { discountPercent, formatPrice, toFa } from '../lib/format.js';
import { useShop } from '../lib/store.jsx';
import { ArrowLeftIcon, BagIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons.jsx';
import './hero.css';

const SLIDES = ['airmax-270-crimson', 'viper-lime', 'stiletto-noir', 'air-force-blue'];

const hexLuminance = (hex) => {
  const value = hex.replace('#', '');
  const rgb = [0, 2, 4].map((offset) => parseInt(value.slice(offset, offset + 2), 16) / 255);
  const [r, g, b] = rgb.map((channel) =>
    channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export default function Hero() {
  const slides = useMemo(() => SLIDES.map((slug) => productsBySlug[slug]).filter(Boolean), []);
  const [index, setIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef(null);
  const { addToCart, openCart } = useShop();

  const product = slides[index];
  const onAccent = hexLuminance(product.accent2) > 0.62 ? '#0b0b0e' : '#ffffff';

  const go = useCallback(
    (direction) => {
      setIndex((current) => (current + direction + slides.length) % slides.length);
      setColorIndex(0);
    },
    [slides.length],
  );

  useEffect(() => {
    if (paused) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = setTimeout(() => go(1), 7600);
    return () => clearTimeout(timer);
  }, [index, paused, go]);

  const onTouchStart = (event) => {
    touchStart.current = event.touches[0].clientX;
  };

  const onTouchEnd = (event) => {
    if (touchStart.current == null) return;
    const delta = event.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(delta) > 46) go(delta > 0 ? -1 : 1);
    touchStart.current = null;
  };

  const selectedColor = product.colors[colorIndex] || product.colors[0];
  const off = discountPercent(product.price, product.oldPrice);

  return (
    <section
      className="hero"
      style={{ '--accent': product.accent, '--accent-2': product.accent2, '--on-accent': onAccent }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="محصولات منتخب Velora"
    >
      <div className="hero-glow" aria-hidden="true">
        <span className="blob blob--1" />
        <span className="blob blob--2" />
        <span className="blob blob--3" />
        <span className="hero-grid-lines" />
      </div>

      <div className="container hero-grid" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="hero-copy">
          <span className="hero-eyebrow">
            <span className="hero-eyebrow__dot" />
            مجموعهٔ ۱۴۰۴ — کالکشن زمستانه
          </span>
          <h1 className="hero-title">
            هر قدم،
            <br />
            یک <span className="hero-title__accent">بیانیه</span>
          </h1>
          <p className="hero-lead">
            در <strong className="brand-word">Velora</strong> کفش را نه فقط یک وسیله، بلکه بخشی از
            شخصیت شما می‌دانیم. مجموعه‌ای منتخب از کفش‌های دست‌ساز، اسپرت و رسمی با ضمانت اصالت،
            ارسال سریع و امتحان هفت‌روزه.
          </p>

          <div className="hero-actions">
            <Link to="/shop" className="btn btn--primary btn--lg">
              مشاهده محصولات
              <ArrowLeftIcon size={18} />
            </Link>
            <Link to="/new" className="btn btn--ghost btn--lg">
              خرید جدیدترین‌ها
            </Link>
          </div>

          <ul className="hero-trust">
            <li>
              <b>۱۲ هزار+</b>
              <span>خرید موفق</span>
            </li>
            <li>
              <b>۴٫۹ از ۵</b>
              <span>امتیاز مشتریان</span>
            </li>
            <li>
              <b>۷ روز</b>
              <span>امتحان و بازگشت</span>
            </li>
          </ul>
        </div>

        <div className="hero-stage">
          <span className="hero-watermark brand-word" aria-hidden="true">
            VELORA
          </span>
          <div className="stage-orbit" aria-hidden="true" />
          <div className="stage-plate" key={`plate-${product.id}`}>
            <img src={product.images[0]} alt={product.name} />
            <span className="stage-shade" aria-hidden="true" />
          </div>

          <div className="stage-dock" key={`dock-${product.id}`}>
            <div className="stage-dock__head">
              <div>
                <span className="stage-dock__brand">{product.brand}</span>
                <h2>{product.name}</h2>
              </div>
              {off > 0 && <span className="badge badge--accent">{toFa(off)}٪ تخفیف</span>}
            </div>

            <div className="stage-dock__row">
              <div className="stage-price">
                <span className="price">{formatPrice(product.price)}</span>
                {product.oldPrice && <span className="price--old">{formatPrice(product.oldPrice)}</span>}
              </div>

              <div className="swatches swatches--sm" role="group" aria-label="انتخاب رنگ">
                {product.colors.map((color, position) => (
                  <button
                    key={color.name}
                    type="button"
                    className={`swatch ${position === colorIndex ? 'is-active' : ''}`}
                    style={{ '--swatch': color.hex }}
                    onClick={() => setColorIndex(position)}
                    aria-label={color.name}
                    aria-pressed={position === colorIndex}
                    title={color.name}
                  />
                ))}
              </div>

              <div className="stage-dock__actions">
                <button
                  type="button"
                  className="dock-buy"
                  onClick={() => {
                    const size = product.sizes.find((item) => item.stock > 0)?.value;
                    addToCart({ product, size, color: selectedColor.name, qty: 1 });
                    openCart();
                  }}
                  aria-label={`خرید ${product.name}`}
                >
                  <BagIcon size={17} />
                  خرید
                </button>
                <Link to={`/product/${product.slug}`} className="dock-link" aria-label="جزئیات محصول">
                  <ArrowLeftIcon size={17} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-rail">
          <span className="hero-rail__label">کالکشن</span>
          {slides.map((slide, position) => (
            <button
              key={slide.id}
              type="button"
              className={`rail-thumb ${position === index ? 'is-active' : ''}`}
              onClick={() => {
                setIndex(position);
                setColorIndex(0);
              }}
              aria-label={slide.name}
              aria-current={position === index}
            >
              <img src={slide.images[0]} alt="" loading="lazy" />
              <span className="rail-thumb__index">{toFa(position + 1)}</span>
            </button>
          ))}
          <span className="hero-rail__count">
            {toFa(index + 1)} از {toFa(slides.length)}
          </span>
        </div>
      </div>

      <div className="container hero-footer">
        <div className="hero-progress" key={`progress-${product.id}`}>
          <span className="hero-progress__bar" />
        </div>
        <div className="hero-arrows">
          <button type="button" className="round-btn" onClick={() => go(-1)} aria-label="محصول قبلی">
            <ChevronRightIcon size={20} />
          </button>
          <button type="button" className="round-btn" onClick={() => go(1)} aria-label="محصول بعدی">
            <ChevronLeftIcon size={20} />
          </button>
        </div>
        <div className="hero-scroll-hint">
          <span className="hero-scroll-hint__line" />
          برای دیدن مجموعه اسکرول کنید
        </div>
      </div>
    </section>
  );
}
