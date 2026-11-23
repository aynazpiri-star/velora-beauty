const items = [
  'ساخت سوئیس',
  'گارانتی بین‌المللی',
  'ارسال بیمه‌شده',
  'اصالت تضمین‌شده',
  'تنظیم دقیق در بوتیک',
];

export default function Marquee() {
  const row = [...items, ...items];

  return (
    <div className="marquee" aria-label="خدمات ولورا">
      <div className="marquee__track">
        {row.map((item, index) => (
          <span className="marquee__item" key={`${item}-${index}`}>
            {item}
            <span className="marquee__dot" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
