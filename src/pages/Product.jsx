import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { productReviews, products, productsBySlug } from '../../shared/catalog.js';
import { api } from '../lib/api.js';
import { useShop } from '../lib/store.jsx';
import { discountPercent, formatPrice, ratingLabel, toFa } from '../lib/format.js';
import { BagIcon, CheckIcon, HeartIcon, MinusIcon, PlusIcon, ReturnIcon, StarIcon, TruckIcon } from '../components/Icons.jsx';
import ProductGrid from '../components/sections/ProductGrid.jsx';
import Reveal from '../components/Reveal.jsx';
import './product.css';

const VIEWS = [
  { label: 'نمای کامل', position: '50% 50%', scale: 1 },
  { label: 'جزئیات رویه', position: '50% 25%', scale: 1.65 },
  { label: 'جزئیات زیره', position: '50% 80%', scale: 1.55 },
];

const TABS = [
  { key: 'desc', label: 'توضیحات' },
  { key: 'specs', label: 'مشخصات' },
  { key: 'reviews', label: 'نظرات' },
];

export default function Product() {
  const { slug } = useParams();
  const product = productsBySlug[slug];
  const { addToCart, toggleFavorite, isFavorite, openCart } = useShop();

  const [colorIndex, setColorIndex] = useState(0);
  const [size, setSize] = useState('');
  const [qty, setQty] = useState(1);
  const [view, setView] = useState(0);
  const [tab, setTab] = useState('desc');
  const [apiReviews, setApiReviews] = useState([]);
  const [form, setForm] = useState({ author: '', rating: 5, text: '' });
  const [formState, setFormState] = useState({ state: 'idle', message: '' });

  useEffect(() => {
    setColorIndex(0);
    setQty(1);
    setView(0);
    setTab('desc');
    setApiReviews([]);
    setSize(product ? product.sizes.find((item) => item.stock > 0)?.value || '' : '');
  }, [product]);

  useEffect(() => {
    if (!product) return undefined;
    const controller = new AbortController();
    api
      .getReviews(product.id, controller.signal)
      .then((data) => setApiReviews(Array.isArray(data) ? data : []))
      .catch(() => {});
    return () => controller.abort();
  }, [product]);

  const seededReviews = product ? productReviews[product.id] || [] : [];
  const reviews = useMemo(
    () => [
      ...apiReviews.map((review) => ({
        id: review.id,
        author: review.author,
        rating: review.rating,
        text: review.text,
        date: new Date(review.date).toLocaleDateString('fa-IR'),
      })),
      ...seededReviews,
    ],
    [apiReviews, seededReviews],
  );

  if (!product) {
    return (
      <div className="page">
        <div className="container">
          <div className="empty-state">
            <h3>این محصول پیدا نشد</h3>
            <p>ممکن است آدرس اشتباه باشد یا محصول از مجموعه خارج شده باشد.</p>
            <Link to="/shop" className="btn btn--primary">
              بازگشت به فروشگاه
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const off = discountPercent(product.price, product.oldPrice);
  const selectedColor = product.colors[colorIndex];
  const selectedSize = product.sizes.find((item) => item.value === size);
  const favorite = isFavorite(product.id);
  const related = products
    .filter((item) => item.id !== product.id && (item.category === product.category || item.featured))
    .slice(0, 4);

  const add = () => {
    addToCart({ product, size, color: selectedColor.name, qty });
    openCart();
  };

  const submitReview = async (event) => {
    event.preventDefault();
    if (!form.author.trim() || !form.text.trim()) {
      setFormState({ state: 'error', message: 'نام و متن نظر را کامل کنید.' });
      return;
    }
    setFormState({ state: 'loading', message: '' });
    try {
      const created = await api.addReview(product.id, form);
      setApiReviews((current) => [created, ...current]);
      setForm({ author: '', rating: 5, text: '' });
      setFormState({ state: 'success', message: 'نظر شما ثبت شد. ممنون از همراهی!' });
    } catch (error) {
      setFormState({ state: 'error', message: error.message });
    }
  };

  return (
    <div
      className="page product-page"
      style={{ '--accent': product.accent, '--accent-2': product.accent2 }}
    >
      <div className="container">
        <nav className="breadcrumb" aria-label="مسیر صفحه">
          <Link to="/">خانه</Link>
          <span className="sep">/</span>
          <Link to={`/shop?category=${product.category}`}>فروشگاه</Link>
          <span className="sep">/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-layout">
          <Reveal className="product-info">
            <div className="product-info__top">
              <span className="product-brand">{product.brand}</span>
              <button
                type="button"
                className={`product-fav ${favorite ? 'is-on' : ''}`}
                onClick={() => toggleFavorite(product)}
                aria-pressed={favorite}
              >
                <HeartIcon size={18} filled={favorite} />
                {favorite ? 'در علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
              </button>
            </div>

            <h1 className="product-title">{product.name}</h1>
            <p className="product-sub">{product.subtitle}</p>

            <div className="product-rating">
              <span className="stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon key={index} size={15} filled={index < Math.round(product.rating)} />
                ))}
              </span>
              <b>{ratingLabel(product.rating)}</b>
              <button type="button" className="linkish" onClick={() => setTab('reviews')}>
                ({toFa(product.reviewCount + apiReviews.length)} نظر)
              </button>
            </div>

            <div className="product-price">
              <span className="price price--big">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <>
                  <span className="price--old">{formatPrice(product.oldPrice)}</span>
                  <span className="badge badge--accent">{toFa(off)}٪ تخفیف</span>
                </>
              )}
            </div>
            {product.oldPrice && (
              <p className="product-save">
                شما {formatPrice(product.oldPrice - product.price)} صرفه‌جویی می‌کنید.
              </p>
            )}

            <div className="option-group">
              <div className="option-group__head">
                <span>رنگ</span>
                <b>{selectedColor.name}</b>
              </div>
              <div className="swatches">
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
            </div>

            <div className="option-group">
              <div className="option-group__head">
                <span>سایز</span>
                <span className="tiny">
                  {selectedSize
                    ? selectedSize.stock > 0
                      ? selectedSize.stock <= 2
                        ? `تنها ${toFa(selectedSize.stock)} عدد در انبار`
                        : 'موجود در انبار'
                      : 'این سایز ناموجود است'
                    : 'یک سایز انتخاب کنید'}
                </span>
              </div>
              <div className="size-grid">
                {product.sizes.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    className={`size-btn ${size === item.value ? 'is-active' : ''} ${
                      item.stock === 0 ? 'is-disabled' : ''
                    }`}
                    onClick={() => item.stock > 0 && setSize(item.value)}
                    disabled={item.stock === 0}
                  >
                    {toFa(item.value)}
                  </button>
                ))}
              </div>
            </div>

            <div className="product-buy">
              <div className="qty qty--lg">
                <button type="button" onClick={() => setQty((value) => Math.max(1, value - 1))} aria-label="کاهش تعداد">
                  <MinusIcon size={15} />
                </button>
                <span>{toFa(qty)}</span>
                <button type="button" onClick={() => setQty((value) => Math.min(10, value + 1))} aria-label="افزایش تعداد">
                  <PlusIcon size={15} />
                </button>
              </div>

              <button type="button" className="btn btn--primary btn--lg product-add" onClick={add}>
                <BagIcon size={19} />
                افزودن به سبد خرید
              </button>
            </div>

            <ul className="product-perks">
              <li>
                <TruckIcon size={18} />
                ارسال تهران ۲۴ ساعته و شهرستان ۲ تا ۴ روز کاری
              </li>
              <li>
                <ReturnIcon size={18} />
                بازگشت یا تعویض سایز تا ۷ روز پس از تحویل
              </li>
              <li>
                <CheckIcon size={18} />
                ضمانت اصالت و بررسی کیفی پیش از ارسال
              </li>
            </ul>
          </Reveal>

          <Reveal className="product-gallery">
            <div className="gallery-main">
              <span className="gallery-glow" aria-hidden="true" />
              {off > 0 && <span className="badge badge--accent gallery-badge">{toFa(off)}٪ تخفیف</span>}
              <img
                src={product.images[0]}
                alt={`${product.name} — ${VIEWS[view].label}`}
                style={{
                  objectPosition: VIEWS[view].position,
                  transform: `scale(${VIEWS[view].scale})`,
                }}
              />
            </div>
            <div className="gallery-thumbs">
              {VIEWS.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  className={`gallery-thumb ${index === view ? 'is-active' : ''}`}
                  onClick={() => setView(index)}
                  aria-label={item.label}
                  aria-pressed={index === view}
                >
                  <img
                    src={product.images[0]}
                    alt=""
                    style={{ objectPosition: item.position, transform: `scale(${item.scale})` }}
                  />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <section className="product-tabs">
          <div className="tabs" role="tablist">
            {TABS.map((item) => (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={tab === item.key}
                className={`tab ${tab === item.key ? 'is-active' : ''}`}
                onClick={() => setTab(item.key)}
              >
                {item.label}
                {item.key === 'reviews' && <span className="tab__count">{toFa(reviews.length)}</span>}
              </button>
            ))}
          </div>

          {tab === 'desc' && (
            <div className="tab-panel">
              <p className="product-desc">{product.description}</p>
              <ul className="desc-points">
                <li>مناسب استفاده روزمره، باشگاه و مسیرهای شهری</li>
                <li>کفی قابل تعویض و رویه با تهویه بالا</li>
                <li>بسته‌بندی محافظ همراه جعبه اختصاصی Velora</li>
              </ul>
            </div>
          )}

          {tab === 'specs' && (
            <div className="tab-panel">
              <dl className="spec-table">
                {product.specs.map((spec) => (
                  <div key={spec.key}>
                    <dt>{spec.key}</dt>
                    <dd>{spec.value}</dd>
                  </div>
                ))}
                <div>
                  <dt>رنگ‌های موجود</dt>
                  <dd>{product.colors.map((color) => color.name).join(' / ')}</dd>
                </div>
                <div>
                  <dt>سایزهای موجود</dt>
                  <dd>{product.sizes.filter((item) => item.stock > 0).map((item) => toFa(item.value)).join(' / ')}</dd>
                </div>
              </dl>
            </div>
          )}

          {tab === 'reviews' && (
            <div className="tab-panel reviews-panel">
              <div className="reviews-list">
                {reviews.length === 0 && <p className="muted">هنوز نظری برای این محصول ثبت نشده است.</p>}
                {reviews.map((review) => (
                  <article key={review.id} className="review-item">
                    <div className="review-item__head">
                      <span className="review-item__avatar">{review.author.charAt(0)}</span>
                      <div>
                        <b>{review.author}</b>
                        <span className="tiny">{review.date}</span>
                      </div>
                      <span className="stars stars--sm">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <StarIcon key={index} size={13} filled={index < review.rating} />
                        ))}
                      </span>
                    </div>
                    <p>{review.text}</p>
                  </article>
                ))}
              </div>

              <form className="review-form" onSubmit={submitReview}>
                <h3>نظر خود را بنویسید</h3>
                <div className="review-form__row">
                  <label className="field">
                    <span>نام شما</span>
                    <input
                      className="input"
                      value={form.author}
                      onChange={(event) => setForm({ ...form, author: event.target.value })}
                      placeholder="مثلاً سارا محمدی"
                    />
                  </label>
                  <div className="field">
                    <span>امتیاز شما</span>
                    <div className="rating-input">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setForm({ ...form, rating: value })}
                          aria-label={`${value} ستاره`}
                          className={value <= form.rating ? 'is-on' : ''}
                        >
                          <StarIcon size={19} filled={value <= form.rating} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <label className="field">
                  <span>متن نظر</span>
                  <textarea
                    className="textarea"
                    value={form.text}
                    onChange={(event) => setForm({ ...form, text: event.target.value })}
                    placeholder="تجربه‌تان از این محصول را بنویسید…"
                  />
                </label>
                <div className="review-form__foot">
                  <button type="submit" className="btn btn--primary btn--sm" disabled={formState.state === 'loading'}>
                    {formState.state === 'loading' ? 'در حال ثبت…' : 'ثبت نظر'}
                  </button>
                  {formState.message && (
                    <span className={`tiny ${formState.state === 'error' ? 'form-error' : 'form-ok'}`}>
                      {formState.message}
                    </span>
                  )}
                </div>
              </form>
            </div>
          )}
        </section>
      </div>

      <ProductGrid
        eyebrow="پیشنهاد ما"
        title={
          <>
            محصولات <em>مشابه</em>
          </>
        }
        products={related}
        action={{ label: 'همه محصولات', to: '/shop' }}
      />
    </div>
  );
}
