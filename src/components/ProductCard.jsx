import { Link } from 'react-router-dom';
import { collections } from '../../shared/catalog.js';
import { useStore } from '../lib/store.jsx';
import { toman } from '../lib/format.js';
import { IconPlus } from './Icons.jsx';
import './product-card.css';

const collectionNames = Object.fromEntries(collections.map((entry) => [entry.slug, entry.name]));

export default function ProductCard({ product }) {
  const { add } = useStore();

  return (
    <article className="product-card">
      <Link to={`/product/${product.slug}`} className="product-card__media">
        <img src={product.images[0]} alt={`ساعت ${product.name}`} loading="lazy" />
        {product.badge ? <span className="product-card__badge">{product.badge}</span> : null}
        <span className="product-card__view">مشاهده</span>
      </Link>

      <div className="product-card__body">
        <div className="product-card__text">
          <p className="product-card__collection">{collectionNames[product.collection]}</p>
          <h3 className="product-card__name">
            <Link to={`/product/${product.slug}`}>{product.name}</Link>
          </h3>
        </div>
        <button
          type="button"
          className="product-card__add"
          onClick={() => add(product.id)}
          aria-label={`افزودن ${product.name} به سبد خرید`}
        >
          <IconPlus size={16} />
        </button>
      </div>

      <p className="product-card__prices">
        <span className="product-card__price">{toman(product.price)}</span>
        {product.oldPrice ? (
          <span className="product-card__old">{toman(product.oldPrice)}</span>
        ) : null}
      </p>
    </article>
  );
}
