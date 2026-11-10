import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page">
      <div className="container">
        <div className="empty-state">
          <h3>این صفحه پیدا نشد</h3>
          <p>ممکن است آدرس تغییر کرده باشد. از خانه یا فروشگاه شروع کنید.</p>
          <Link to="/" className="btn btn--primary">
            بازگشت به خانه
          </Link>
        </div>
      </div>
    </div>
  );
}
