import { Link } from 'react-router-dom';
import { useStore } from '../lib/store.jsx';
import { faNum, toman } from '../lib/format.js';
import { IconArrowLeft, IconMinus, IconPlus, IconTrash } from '../components/Icons.jsx';
import '../styles/commerce.css';
import './cart.css';

export default function Cart() {
  const { detailed, subtotal, count, setQty, remove } = useStore();

  if (detailed.length === 0) {
    return (
      <div className="page">
        <div className="shell cart-empty">
          <p className="eyebrow">سبد خرید</p>
          <h1>سبد شما خالی است</h1>
          <p>هنوز ساعتی انتخاب نکرده‌اید. از کالکشن‌های ولورا شروع کنید.</p>
          <Link to="/shop" className="btn btn--dark">
            مشاهدهٔ ساعت‌ها
            <IconArrowLeft size={17} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="shell">
        <header className="page-head">
          <p className="eyebrow">سبد خرید</p>
          <h1>سبد خرید شما</h1>
          <p>{faNum(count)} قطعه</p>
        </header>

        <div className="cart-page">
          <div className="cart-page__lines">
            {detailed.map((item) => (
              <article className="cart-item" key={item.id}>
                <Link to={`/product/${item.slug}`} className="cart-item__media">
                  <img src={item.images[0]} alt={item.name} />
                </Link>

                <div className="cart-item__body">
                  <div className="cart-item__head">
                    <div>
                      <Link to={`/product/${item.slug}`} className="cart-item__name">
                        {item.name}
                      </Link>
                      <p className="cart-item__unit">{toman(item.price)}</p>
                    </div>
                    <button
                      type="button"
                      className="cart-item__remove"
                      onClick={() => remove(item.id)}
                      aria-label={`حذف ${item.name}`}
                    >
                      <IconTrash size={17} />
                    </button>
                  </div>

                  <div className="cart-item__foot">
                    <div className="qty-stepper">
                      <button type="button" onClick={() => setQty(item.id, item.qty - 1)} aria-label="کاهش تعداد">
                        <IconMinus size={14} />
                      </button>
                      <span>{faNum(item.qty)}</span>
                      <button type="button" onClick={() => setQty(item.id, item.qty + 1)} aria-label="افزایش تعداد">
                        <IconPlus size={14} />
                      </button>
                    </div>
                    <strong className="cart-item__total">{toman(item.lineTotal)}</strong>
                  </div>
                </div>
              </article>
            ))}

            <Link to="/shop" className="link-underline cart-page__continue">
              ادامهٔ خرید
            </Link>
          </div>

          <aside className="summary" aria-label="خلاصهٔ سفارش">
            <h2>خلاصهٔ سفارش</h2>
            <div className="summary__row">
              <span>جمع کالاها</span>
              <strong>{toman(subtotal)}</strong>
            </div>
            <div className="summary__row">
              <span>ارسال استاندارد</span>
              <strong>رایگان</strong>
            </div>
            <div className="summary__total">
              <span>مبلغ قابل پرداخت</span>
              <span>{toman(subtotal)}</span>
            </div>
            <Link to="/checkout" className="btn btn--dark summary__cta">
              تکمیل خرید
              <IconArrowLeft size={17} />
            </Link>
            <p className="summary__note">
              ارسال بیمه‌شده و رایگان. امکان بازگشت کالا تا ۷ روز پس از تحویل.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
