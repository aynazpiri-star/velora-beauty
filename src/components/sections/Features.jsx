import { IconShield, IconSparkle, IconTruck, IconWatch } from '../Icons.jsx';

const features = [
  {
    icon: IconTruck,
    title: 'ارسال بیمه‌شده',
    text: 'بسته‌بندی امن و ارسال بیمه‌شده به سراسر ایران.',
  },
  {
    icon: IconShield,
    title: 'گارانتی بین‌المللی',
    text: 'تا ۳۶ ماه گارانتی رسمی و خدمات پس از فروش.',
  },
  {
    icon: IconWatch,
    title: 'تنظیم در بوتیک',
    text: 'تنظیم دقیق زمان و اندازهٔ بند، پیش از ارسال.',
  },
  {
    icon: IconSparkle,
    title: 'اصالت تضمین‌شده',
    text: 'هر قطعه با کارت اصالت و شمارهٔ سریال.',
  },
];

export default function Features() {
  return (
    <section className="section section--cream features">
      <div className="shell">
        <div className="features__grid">
          {features.map(({ icon: Icon, title, text }) => (
            <div className="feature" key={title}>
              <span className="feature__icon">
                <Icon size={22} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
