export const brand = {
  name: "ولورا",
  latin: "VELORA",
  tagline: "بوتیک لباس و استایل زنانه",
  description:
    "ولورا از سال ۱۳۹۴ با تمرکز بر پارچه‌های اصیل و برش‌های ماندگار، استایل زنانه‌ای را روایت می‌کند که برای لحظه‌های خاص و روزهای واقعی طراحی شده است.",
};

export const announcements = [
  "ارسال رایگان برای سفارش‌های بالای ۵٬۰۰۰٬۰۰۰ تومان",
  "کد تخفیف اولین خرید: VELORA10",
  "۷ روز ضمانت بازگشت کالا",
];

export const navLinks = [
  { label: "جدیدترین‌ها", href: "/shop?sort=new" },
  { label: "لباس مجلسی", href: "/shop?category=dresses" },
  { label: "استایل اداری", href: "/shop?category=workwear" },
  { label: "کیف و کفش", href: "/shop?category=bag-shoes" },
  { label: "اکسسوری‌ها", href: "/shop?category=accessories" },
  { label: "حراج", href: "/shop?sale=1" },
];

export type HeroSlide = {
  image: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  href: string;
};

export const heroSlides: HeroSlide[] = [
  {
    image: "/images/hero/hero-1.jpg",
    eyebrow: "کالکشن پاییز و زمستان",
    title: "لحظه‌هایی برای درخشیدن",
    body: "مجموعه‌ی شب ولورا؛ ساتن، دانتل و پولک‌هایی که در نور غروب آرام می‌درخشند.",
    cta: "مشاهده مجموعه",
    href: "/shop?category=dresses",
  },
  {
    image: "/images/hero/hero-2.jpg",
    eyebrow: "شب‌های مهمانی",
    title: "درخششی به رنگ شرابی",
    body: "پیراهن‌های بلند با برش‌های نرم، برای شب‌هایی که در خاطر می‌مانند.",
    cta: "خرید لباس مجلسی",
    href: "/shop?category=dresses",
  },
  {
    image: "/images/hero/hero-3.jpg",
    eyebrow: "استایل روزمره",
    title: "ظرافتی که هر روز تکرار می‌شود",
    body: "لایه‌های نرم و رنگ‌های خنثی برای روزهای اداری و آخر هفته‌های آرام.",
    cta: "مشاهده استایل اداری",
    href: "/shop?category=workwear",
  },
];

export const occasions = [
  { title: "استایل مهمانی", image: "/images/occasion/party.jpg", href: "/shop?category=dresses" },
  { title: "لباس عروسی", image: "/images/occasion/wedding.jpg", href: "/shop?category=dresses" },
  { title: "مهمانی کوکتل", image: "/images/occasion/cocktail.jpg", href: "/shop?category=dresses" },
  { title: "استایل رسمی", image: "/images/occasion/formal.jpg", href: "/shop?category=dresses" },
  { title: "استایل شب", image: "/images/occasion/night.jpg", href: "/shop?category=dresses" },
];

export const stylingLooks = [
  {
    title: "قرار شام",
    caption: "پیراهن ابریشمی با کیف کوچک و گوشواره‌ی طلایی",
    image: "/images/looks/dinner.jpg",
    items: [
      { label: "کیف ونیز", image: "/images/accessories/bag-quilted.jpg" },
      { label: "گوشواره هاله", image: "/images/accessories/earrings.jpg" },
      { label: "کفش مونا", image: "/images/accessories/heels-black.jpg" },
    ],
  },
  {
    title: "استایل اداری",
    caption: "کت ساختارمند، کیف روشن و گردنبند ظریف",
    image: "/images/looks/office.jpg",
    items: [
      { label: "کیف پاریس", image: "/images/accessories/bag-white.jpg" },
      { label: "گردنبند مهتاب", image: "/images/accessories/necklace.jpg" },
      { label: "کفش آرامیس", image: "/images/accessories/heels-white.jpg" },
    ],
  },
  {
    title: "استایل روزمره",
    caption: "پارچه‌های خنثی با عینک و کیف شرابی",
    image: "/images/looks/weekend-brunch.jpg",
    items: [
      { label: "عینک کاسپین", image: "/images/accessories/sunglasses.jpg" },
      { label: "کیف سرخ", image: "/images/accessories/bag-red.jpg" },
      { label: "کفش لونا", image: "/images/accessories/heels-stiletto.jpg" },
    ],
  },
  {
    title: "مهمانی شب",
    caption: "پیراهن پولک‌دوزی با کفش صدفی و کیف کوئیلت",
    image: "/images/looks/gala.jpg",
    items: [
      { label: "کیف ونیز", image: "/images/accessories/bag-quilted.jpg" },
      { label: "گوشواره هاله", image: "/images/accessories/earrings.jpg" },
      { label: "کفش لونا", image: "/images/accessories/heels-stiletto.jpg" },
    ],
  },
];

export const testimonials = [
  {
    name: "سارا محمدی",
    city: "تهران",
    initials: "س‌م",
    text: "پیراهن مهتاب را برای مهمانی خواهرم خریدم؛ پارچه دقیقاً همان‌طور که در عکس بود و دوختش بی‌نقص. حس می‌کنم سال‌ها می‌توانم بپوشمش.",
    rating: 5,
  },
  {
    name: "نگار کریمی",
    city: "اصفهان",
    initials: "ن‌ک",
    text: "بسته‌بندی خیلی شیک بود و سفارش دو روزه رسید. کت پریسا اندازه‌ی دقیقی داشت و با راهنمای سایز هیچ مشکلی نداشتم.",
    rating: 5,
  },
  {
    name: "مریم رضایی",
    city: "شیراز",
    initials: "م‌ر",
    text: "کیف ونیز همراه همیشگی من شده؛ چرمش نرم است و زنجیر طلایی‌اش با همه‌ی استایل‌ها هماهنگ می‌شود.",
    rating: 5,
  },
  {
    name: "الهام تقوی",
    city: "تبریز",
    initials: "ا‌ت",
    text: "پشتیبانی خیلی خوب راهنمایی‌ام کرد برای انتخاب سایز. عطر شبانه هم ماندگاری فوق‌العاده‌ای دارد.",
    rating: 5,
  },
];

export const footerColumns = [
  {
    title: "فروشگاه",
    links: [
      { label: "جدیدترین‌ها", href: "/shop?sort=new" },
      { label: "لباس مجلسی", href: "/shop?category=dresses" },
      { label: "استایل اداری", href: "/shop?category=workwear" },
      { label: "کیف و کفش", href: "/shop?category=bag-shoes" },
      { label: "حراج", href: "/shop?sale=1" },
    ],
  },
  {
    title: "خدمات مشتریان",
    links: [
      { label: "پیگیری سفارش", href: "/help#orders" },
      { label: "راهنمای سایز", href: "/help#size" },
      { label: "شرایط بازگشت کالا", href: "/help#returns" },
      { label: "سؤالات متداول", href: "/help#faq" },
    ],
  },
  {
    title: "درباره ولورا",
    links: [
      { label: "داستان ما", href: "/help#about" },
      { label: "تماس با ما", href: "/help#contact" },
      { label: "ارسال و تحویل", href: "/help#shipping" },
      { label: "حریم خصوصی", href: "/help#privacy" },
    ],
  },
];

export const contactInfo = {
  phone: "۰۲۱–۸۸۷۷۶۶۵۵",
  email: "hello@velora.example",
  address: "تهران، خیابان ولیعصر، بالاتر از پارک ساعی، پلاک ۱۲۴",
  hours: "شنبه تا پنجشنبه، ۱۰ تا ۱۹",
};
