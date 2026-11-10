import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productsById } from '../../shared/catalog.js';
import { useShop } from '../lib/store.jsx';
import ProductCard from '../components/ProductCard.jsx';
import Reveal from '../components/Reveal.jsx';
import { HeartIcon, SearchIcon } from '../components/Icons.jsx';
import { toEn } from '../lib/format.js';
import './static.css';

export default function Account() {
  const { favorites } = useShop();
  const navigate = useNavigate();
  const [code, setCode] = useState('');

  const favoriteProducts = favorites.map((id) => productsById[id]).filter(Boolean);

  const track = (event) => {
    event.preventDefault();
    const value = toEn(code).trim().toUpperCase();
    if (value) navigate(`/order/${value}`);
  };

  return (
    <div className="page">
      <div className="container">
        <header className="page-head">
          <span className="eyebrow">حساب کاربری</span>
          <h1 className="page-title">علاقه‌مندی‌ها و پیگیری سفارش</h1>
          <p className="section-sub">
            نیازی به ورود نیست؛ علاقه‌مندی‌ها روی همین مرورگر ذخیره می‌شوند و سفارش را با کد پیگیری
            می‌بینید.
          </p>
        </header>

        <div className="account-grid">
          <section className="account-panel">
            <h2>
              <SearchIcon size={18} /> پیگیری سفارش
            </h2>
            <p className="tiny">کد پیگیری سفارش (مثل VLR-A1B2C3) را وارد کنید.</p>
            <form className="track-form" onSubmit={track}>
              <input
                className="input"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="VLR-A1B2C3"
                dir="ltr"
                aria-label="کد پیگیری سفارش"
              />
              <button type="submit" className="btn btn--primary btn--sm">
                پیگیری
              </button>
            </form>
          </section>

          <section className="account-panel account-panel--wide">
            <h2>
              <HeartIcon size={18} /> علاقه‌مندی‌ها ({favoriteProducts.length})
            </h2>
            {favoriteProducts.length === 0 ? (
              <p className="tiny">
                هنوز محصولی را نشان نکرده‌اید. با زدن آیکون قلب روی هر محصول، اینجا ذخیره می‌شود.{' '}
                <Link to="/shop" className="link-inline">
                  رفتن به فروشگاه
                </Link>
              </p>
            ) : (
              <div className="account-favs">
                {favoriteProducts.map((product, index) => (
                  <Reveal key={product.id} delay={index * 60}>
                    <ProductCard product={product} compact />
                  </Reveal>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
