import { Link } from 'react-router-dom';
import './static.css';

export default function NotFound() {
  return (
    <div className="page">
      <div className="shell notfound">
        <p className="notfound__code">۴۰۴</p>
        <h1>این صفحه پیدا نشد</h1>
        <p>شاید ساعت مورد نظر شما در کالکشن دیگری باشد.</p>
        <Link to="/shop" className="btn btn--dark">
          بازگشت به فروشگاه
        </Link>
      </div>
    </div>
  );
}
