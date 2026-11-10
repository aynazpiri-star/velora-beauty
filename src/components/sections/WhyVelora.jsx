import { Link } from 'react-router-dom';
import { benefits } from '../../../shared/catalog.js';
import { iconMap, ArrowLeftIcon } from '../Icons.jsx';
import Reveal from '../Reveal.jsx';

export default function WhyVelora() {
  return (
    <section className="section why">
      <div className="container">
        <Reveal className="section-head why__head">
          <div>
            <span className="eyebrow">چرا Velora؟</span>
            <h2 className="section-title">
              تجربه‌ای که به آن <em>اعتماد</em> می‌کنید
            </h2>
          </div>
          <Link to="/about" className="link-arrow">
            داستان ولورا
            <ArrowLeftIcon size={17} />
          </Link>
        </Reveal>

        <div className="why__grid">
          {benefits.map((benefit, index) => {
            const Icon = iconMap[benefit.icon];
            return (
              <Reveal key={benefit.title} delay={index * 80} className="why__card">
                <span className="why__icon">{Icon ? <Icon size={24} /> : null}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
                <span className="why__index">{['۰۱', '۰۲', '۰۳', '۰۴'][index]}</span>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
