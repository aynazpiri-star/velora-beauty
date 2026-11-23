import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { collections, products } from '../../shared/catalog.js';
import { useStore } from '../lib/store.jsx';
import { faNum, toman } from '../lib/format.js';
import { IconArrowLeft, IconCheck, IconMinus, IconPlus, IconShield, IconTruck } from '../components/Icons.jsx';
import ProductCard from '../components/ProductCard.jsx';
import './product.css';

const specLabels = {
  movement: 'موتور',
  caseSize: 'قطر بدنه',
  case: 'جنس بدنه',
  strap: 'بند',
  glass: 'شیشه',
  water: 'ضدآب',
  warranty: 'گارانتی',
};

export default function Product() {
  const { slug } = useParams();
  const { add, openCart } = useStore();
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const product = products.find((item) => item.slug === slug);

  const related = useMemo(() => {
    if (!product) return [];
    const same = products.filter((item) => item.id !== product.id && item.collection === product.collection);
    const rest = products.filter((item) => item.id !== product.id && item.collection !== product.collection);
    return [...same, ...rest].slice(0, 3);
  }, [product]);

  if (!product) {
    return (
      <div className="page">
        <div className="shell product-missing">
          <h1>این ساعت پیدا نشد</h1>
          <Link to="/shop" className="btn btn--dark">
            بازگشت به فروشگاه
          </Link>
        </div>
      </div>
    );
  }

  const collection = collections.find((item) => item.slug === product.collection);

  const addToCart = () => {
    add(product.id, qty);
    openCart();
  };

  return (
    <div className="page product-page">
      <div className="shell">
        <nav className="breadcrumb" aria-label="مسیر صفحه">
          <Link to="/">خانه</Link>
          <span aria-hidden="true">/</span>
          <Link to="/shop">فروشگاه</Link>
          <span aria-hidden="true">/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product">
          <div className="product__gallery">
            <div className="product__main">
              <img src={product.images[activeImage] || product.images[0]} alt={`ساعت ${product.name}`} />
              {product.badge ? <span className="product__badge">{product.badge}</span> : null}
            </div>
            {product.images.length > 1 ? (
              <div className="product__thumbs">
                {product.images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    className={`product__thumb ${index === activeImage ? 'is-active' : ''}`}
                    onClick={() => setActiveImage(index)}
                    aria-label={`تصویر ${index + 1}`}
                  >
                    <img src={image} alt="" />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="product__info">
            <Link to={`/shop?collection=${product.collection}`} className="product__collection">
              کالکشن {collection?.name}
            </Link>
            <h1>{product.name}</h1>
            <p className="product__latin">{product.latin}</p>
            <p className="product__tagline">{product.tagline}</p>

            <div className="product__price">
              <strong>{toman(product.price)}</strong>
              {product.oldPrice ? <span>{toman(product.oldPrice)}</span> : null}
            </div>

            <p className="product__desc">{product.description}</p>

            <div className="product__buy">
              <div className="qty-stepper">
                <button type="button" onClick={() => setQty((value) => Math.max(1, value - 1))} aria-label="کاهش تعداد">
                  <IconMinus size={14} />
                </button>
                <span>{faNum(qty)}</span>
                <button type="button" onClick={() => setQty((value) => Math.min(5, value + 1))} aria-label="افزایش تعداد">
                  <IconPlus size={14} />
                </button>
              </div>
              <button type="button" className="btn btn--dark product__cta" onClick={addToCart}>
                افزودن به سبد
                <IconArrowLeft size={17} />
              </button>
            </div>

            <ul className="product__perks">
              <li>
                <IconTruck size={18} />
                ارسال بیمه‌شده و رایگان
              </li>
              <li>
                <IconShield size={18} />
                {product.specs.warranty}
              </li>
              <li>
                <IconCheck size={18} />
                اصالت تضمین‌شده با کارت سریال
              </li>
            </ul>

            <div className="product__specs">
              <h2>مشخصات</h2>
              <dl>
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key}>
                    <dt>{specLabels[key] || key}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {related.length > 0 ? (
          <section className="product__related">
            <div className="section-head">
              <h2>شاید بپسندید</h2>
              <Link to="/shop" className="link-underline">
                همهٔ ساعت‌ها
              </Link>
            </div>
            <div className="product__related-grid">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
