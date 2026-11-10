import { Link } from 'react-router-dom';
import { useShop } from '../lib/store.jsx';
import { discountPercent, formatPrice, ratingLabel, toFa } from '../lib/format.js';
import { BagIcon, HeartIcon, StarIcon } from './Icons.jsx';
import './product-card.css';

export default function ProductCard({ product, compact = false }) {
  const { addToCart, toggleFavorite, isFavorite, openCart } = useShop();
  const off = discountPercent(product.price, product.oldPrice);
  const favorite = isFavorite(product.id);

  const quickAdd = () => {
    const size = product.sizes.find((item) => item.stock > 0)?.value;
    addToCart({ product, size, color: product.colors[0]?.name, qty: 1 });
    openCart();
  };

  return (
    <article className={`p-card ${compact ? 'p-card--compact' : ''}`}>
      <div className="p-card__media">
        <Link to={`/product/${product.slug}`} className="p-card__image-link" aria-label={product.name}>
          <img src={product.images[0]} alt={product.name} loading="lazy" />
        </Link>

        <div className="p-card__badges">
          {off > 0 && <span className="badge badge--accent">{toFa(off)}٪</span>}
          {product.isNew && off === 0 && <span className="badge badge--dark">جدید</span>}
          {product.badge && !product.isNew && !off && <span className="badge badge--dark">{product.badge}</span>}
        </div>

        <button
          type="button"
          className={`p-card__fav ${favorite ? 'is-on' : ''}`}
          onClick={() => toggleFavorite(product)}
          aria-label={favorite ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
          aria-pressed={favorite}
        >
          <HeartIcon size={18} filled={favorite} />
        </button>

        <div className="p-card__hover">
          <button type="button" className="p-card__add" onClick={quickAdd}>
            <BagIcon size={17} />
            افزودن به سبد
          </button>
          <Link to={`/product/${product.slug}`} className="p-card__details">
            مشاهده جزئیات
          </Link>
        </div>
      </div>

      <div className="p-card__body">
        <div className="p-card__meta">
          <span className="p-card__brand">{product.brand}</span>
          <span className="p-card__rating">
            <StarIcon size={13} />
            {ratingLabel(product.rating)}
            <em>({toFa(product.reviewCount)})</em>
          </span>
        </div>

        <h3 className="p-card__name">
          <Link to={`/product/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="p-card__sub">{product.subtitle}</p>

        <div className="p-card__foot">
          <div className="p-card__price">
            <span className="price">{formatPrice(product.price)}</span>
            {product.oldPrice && <span className="price--old">{formatPrice(product.oldPrice)}</span>}
          </div>
          <div className="p-card__colors" aria-hidden="true">
            {product.colors.slice(0, 3).map((color) => (
              <span key={color.name} style={{ '--swatch': color.hex }} className="p-card__color" />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
