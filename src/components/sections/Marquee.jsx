const ITEMS = [
  'ضمانت اصالت کالا',
  'ارسال ۲۴ ساعته تهران',
  'بازگشت ۷ روزه',
  'پشتیبانی ۹ صبح تا ۹ شب',
  'دوخت دست',
  'چرم طبیعی',
  'بسته‌بندی هدیه',
];

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map((copy) => (
          <div className="marquee__group" key={copy}>
            {ITEMS.map((item) => (
              <span key={`${copy}-${item}`} className="marquee__item">
                {item}
                <span className="marquee__star">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
