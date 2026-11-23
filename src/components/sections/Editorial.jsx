import { Link } from 'react-router-dom';
import Reveal from '../Reveal.jsx';

export default function Editorial() {
  return (
    <section className="section section--cream editorial">
      <div className="shell editorial__grid">
        <Reveal className="editorial__media">
          <img src="/images/editorial-wrist.jpg" alt="ساعت ولورا روی مچ، در نور طبیعی" loading="lazy" />
          <span className="editorial__caption">کارگاه ولورا — تهران</span>
        </Reveal>

        <Reveal className="editorial__copy" delay={120}>
          <p className="eyebrow">صنعتگری</p>
          <h2>ساعت به‌مثابهٔ امضا</h2>
          <p className="editorial__lead">
            ما به ساعت‌هایی باور داریم که بی‌سروصدا حرف می‌زنند. هر قطعهٔ ولورا پیش از رسیدن به
            دست شما، ساعت‌ها در کارگاه تنظیم می‌شود؛ تا وقتی به مچ می‌بندید، فقط یک چیز حس کنید:
            درست بودن.
          </p>

          <dl className="editorial__stats">
            <div>
              <dt>۴۰</dt>
              <dd>ساعت ذخیرهٔ انرژی</dd>
            </div>
            <div>
              <dt>۳۶</dt>
              <dd>ماه گارانتی</dd>
            </div>
            <div>
              <dt>۱۰۰٪</dt>
              <dd>اصالت تضمین‌شده</dd>
            </div>
          </dl>

          <Link to="/about" className="link-underline">
            داستان ولورا
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
