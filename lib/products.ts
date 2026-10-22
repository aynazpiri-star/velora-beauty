export type CategorySlug =
  | "dresses"
  | "workwear"
  | "bags"
  | "shoes"
  | "accessories";

export const categories: { slug: CategorySlug; title: string }[] = [
  { slug: "dresses", title: "لباس مجلسی" },
  { slug: "workwear", title: "استایل اداری" },
  { slug: "bags", title: "کیف" },
  { slug: "shoes", title: "کفش" },
  { slug: "accessories", title: "اکسسوری‌ها" },
];

export type Product = {
  slug: string;
  name: string;
  subtitle: string;
  category: CategorySlug;
  price: number;
  oldPrice?: number;
  image: string;
  gallery: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  description: string;
  details: string[];
  rating: number;
  reviews: number;
  tags: ("new" | "bestseller" | "sale")[];
};

const clothingSizes = ["S", "M", "L", "XL"];
const shoeSizes = ["۳۶", "۳۷", "۳۸", "۳۹", "۴۰"];
const oneSize = ["تک‌سایز"];

export const products: Product[] = [
  {
    slug: "dress-mahtab",
    name: "پیراهن مجلسی ساتن مهتاب",
    subtitle: "ساتن گلدار با برش ایستاده",
    category: "dresses",
    price: 4850000,
    oldPrice: 5600000,
    image: "/images/products/dress-floral.jpg",
    gallery: [
      "/images/products/dress-floral.jpg",
      "/images/looks/gala.jpg",
      "/images/panels/evening.jpg",
    ],
    colors: [
      { name: "آبی نفتی", hex: "#243447" },
      { name: "مشکی", hex: "#161314" },
    ],
    sizes: clothingSizes,
    description:
      "پیراهن ساتن مهتاب با الگوی بلند و دوخت قلم‌دوزی‌شده، برای شب‌های خاص طراحی شده است. جنس ساتن سنگین آن روی بدن می‌نشیند و در نور، درخششی آرام و ابریشمی پیدا می‌کند.",
    details: [
      "جنس: ساتن ابریشمی با آستر نرم",
      "برش: بلند، ایستاده با چاک پشت",
      "شست‌وشو: خشک‌شویی توصیه می‌شود",
    ],
    rating: 4.8,
    reviews: 64,
    tags: ["bestseller", "sale"],
  },
  {
    slug: "dress-parniyan",
    name: "پیراهن مجلسی دانتل پرنیان",
    subtitle: "دانتل دست‌دوز با آستر شیری",
    category: "dresses",
    price: 5600000,
    image: "/images/products/dress-lace.jpg",
    gallery: [
      "/images/products/dress-lace.jpg",
      "/images/occasion/wedding.jpg",
      "/images/looks/gala.jpg",
    ],
    colors: [
      { name: "شیری", hex: "#efe6dc" },
      { name: "شامپاینی", hex: "#d9c3a9" },
    ],
    sizes: clothingSizes,
    description:
      "پرنیان از دانتل ظریف با گل‌های برجسته ساخته شده و آستر شیری آن، لایه‌ای از آرامش را زیر نقش‌های دانتل پنهان می‌کند. انتخابی نرم و باشکوه برای مراسم‌های رسمی.",
    details: [
      "جنس: دانتل فرانسوی با آستر ساتن",
      "برش: بلند با آستین کوتاه",
      "شست‌وشو: شست‌وشوی خشک",
    ],
    rating: 4.9,
    reviews: 38,
    tags: ["new"],
  },
  {
    slug: "dress-shabane",
    name: "پیراهن مجلسی شبانه",
    subtitle: "مشکی، مینیمال و برش‌خورده",
    category: "dresses",
    price: 3950000,
    image: "/images/products/dress-black.jpg",
    gallery: [
      "/images/products/dress-black.jpg",
      "/images/occasion/formal.jpg",
      "/images/looks/dinner.jpg",
    ],
    colors: [
      { name: "مشکی", hex: "#141011" },
      { name: "زغالی", hex: "#3b3436" },
    ],
    sizes: clothingSizes,
    description:
      "شبانه، ساده و بی‌زمان است؛ پیراهنی که با خطوط کشیده و پارچه‌ی مات خود، اندام را در نرم‌ترین حالت نشان می‌دهد. با یک جفت گوشواره طلا کامل می‌شود.",
    details: [
      "جنس: کرپ سنگین مات",
      "برش: بلند با دامن چین‌دار",
      "شست‌وشو: شست‌وشوی خشک",
    ],
    rating: 4.7,
    reviews: 51,
    tags: [],
  },
  {
    slug: "dress-aftab",
    name: "پیراهن ابریشمی آفتاب",
    subtitle: "نارنجی گرم برای بعدازظهرهای آفتابی",
    category: "dresses",
    price: 2980000,
    oldPrice: 3400000,
    image: "/images/products/dress-orange2.jpg",
    gallery: [
      "/images/products/dress-orange2.jpg",
      "/images/looks/weekend.jpg",
      "/images/occasion/party.jpg",
    ],
    colors: [
      { name: "نارنجی", hex: "#cf7b3f" },
      { name: "خاکی روشن", hex: "#c2b09a" },
    ],
    sizes: clothingSizes,
    description:
      "آفتاب با پارچه‌ی ابریشمی سبک و رنگ گرم نارنجی، برای روزهای روشن و مهمانی‌های نیمه‌شب طراحی شده است. برش آزاد آن حرکت را در هر قدم روان می‌کند.",
    details: [
      "جنس: ابریشم مصنوعی با بافت نرم",
      "برش: آزاد با کمربند پارچه‌ای",
      "شست‌وشو: شست‌وشوی ملایم با آب سرد",
    ],
    rating: 4.6,
    reviews: 29,
    tags: ["sale", "new"],
  },
  {
    slug: "dress-roza",
    name: "پیراهن خال‌خالی رزا",
    subtitle: "خال‌خالی کلاسیک با آستین بلند",
    category: "dresses",
    price: 3450000,
    image: "/images/products/dress-rose.jpg",
    gallery: [
      "/images/products/dress-rose.jpg",
      "/images/looks/weekend-brunch.jpg",
    ],
    colors: [
      { name: "قرمز خال‌خالی", hex: "#a32a32" },
      { name: "سرمه‌ای", hex: "#233247" },
    ],
    sizes: clothingSizes,
    description:
      "رزا بازیگوشی خال‌خالی را با آرامش پارچه‌ی ویسکوز ترکیب می‌کند؛ پیراهنی که هم برای ناهار روز تعطیل و هم برای مهمانی دوستانه کار می‌کند.",
    details: [
      "جنس: ویسکوز نرم",
      "برش: ساق‌پا با کمربند",
      "شست‌وشو: شست‌وشوی ملایم",
    ],
    rating: 4.5,
    reviews: 22,
    tags: [],
  },
  {
    slug: "dress-zomorrod",
    name: "پیراهن شب زمرد",
    subtitle: "پولک‌دوزی دستی با برش اریب",
    category: "dresses",
    price: 6200000,
    image: "/images/occasion/night.jpg",
    gallery: [
      "/images/occasion/night.jpg",
      "/images/editorial/bar.jpg",
      "/images/looks/gala.jpg",
    ],
    colors: [
      { name: "زمردی", hex: "#214f3c" },
      { name: "مشکی", hex: "#141011" },
    ],
    sizes: clothingSizes,
    description:
      "زمرد در نور کمترین هم می‌درخشد. پولک‌های دست‌دوز روی پارچه‌ی کش‌دار، خطی از درخشش را در طول بدن می‌کشند و برش اریب آن را نرم‌تر می‌کنند.",
    details: [
      "جنس: پارچه کش‌دار با پولک‌دوزی",
      "برش: اریب با یقه قایقی",
      "شست‌وشو: فقط خشک‌شویی",
    ],
    rating: 5,
    reviews: 41,
    tags: ["bestseller"],
  },
  {
    slug: "dress-morvarid",
    name: "پیراهن مجلسی مروارید",
    subtitle: "لایه‌های درخشان و شفاف",
    category: "dresses",
    price: 5100000,
    image: "/images/panels/evening.jpg",
    gallery: [
      "/images/panels/evening.jpg",
      "/images/hero/hero-3.jpg",
      "/images/occasion/cocktail.jpg",
    ],
    colors: [
      { name: "شامپاینی", hex: "#dcc7ad" },
      { name: "نقره‌ای", hex: "#c9c3c6" },
    ],
    sizes: clothingSizes,
    description:
      "مروارید از چند لایه پارچه‌ی درخشان ساخته شده که روی هم می‌افتند و بافتی شبیه به نور ایجاد می‌کنند. برای شب‌هایی که می‌خواهید در قاب دوربین بدرخشید.",
    details: [
      "جنس: تور درخشان با آستر ساتن",
      "برش: بلند با دنباله کوتاه",
      "شست‌وشو: خشک‌شویی توصیه می‌شود",
    ],
    rating: 4.8,
    reviews: 33,
    tags: ["new"],
  },
  {
    slug: "suit-vaghar",
    name: "کت و شلوار اداری وقار",
    subtitle: "دو تکه با خط‌های کشیده",
    category: "workwear",
    price: 4200000,
    image: "/images/products/suit-black.jpg",
    gallery: [
      "/images/products/suit-black.jpg",
      "/images/panels/work-alt.jpg",
      "/images/looks/office.jpg",
    ],
    colors: [
      { name: "مشکی", hex: "#1a1617" },
      { name: "خاکستری", hex: "#6d6a6c" },
    ],
    sizes: clothingSizes,
    description:
      "وقار، تعریف تازه‌ای از پوشش حرفه‌ای است؛ کت با یقه‌ی باریک و شلوار راسته، در جلسات صبح و شام کاری یکسان می‌درخشد.",
    details: [
      "جنس: کرپ اداری با کشسانی ملایم",
      "برش: راسته با آستر ساتن",
      "شست‌وشو: خشک‌شویی",
    ],
    rating: 4.7,
    reviews: 46,
    tags: ["bestseller"],
  },
  {
    slug: "blazer-parisa",
    name: "کت اداری پریسا",
    subtitle: "خاکستری با دکمه‌های صدفی",
    category: "workwear",
    price: 3300000,
    image: "/images/panels/work.jpg",
    gallery: [
      "/images/panels/work.jpg",
      "/images/looks/office.jpg",
      "/images/products/suit-black.jpg",
    ],
    colors: [
      { name: "خاکستری روشن", hex: "#b4afae" },
      { name: "کرم", hex: "#e3d6c7" },
    ],
    sizes: clothingSizes,
    description:
      "پریسا یک کت تک‌دکمه با شانه‌های نرم است که روی پیراهن ابریشمی یا تاپ ساده، به‌سرعت استایل را رسمی می‌کند.",
    details: [
      "جنس: مخلوط پشم و ویسکوز",
      "برش: تک‌دکمه با جیب دوخته",
      "شست‌وشو: خشک‌شویی",
    ],
    rating: 4.6,
    reviews: 31,
    tags: [],
  },
  {
    slug: "set-roshan",
    name: "ست سفید روشن",
    subtitle: "پیراهن و شلوار پارچه‌ای",
    category: "workwear",
    price: 2750000,
    image: "/images/products/white-set.jpg",
    gallery: [
      "/images/products/white-set.jpg",
      "/images/looks/weekend-brunch.jpg",
    ],
    colors: [
      { name: "سفید", hex: "#f4f0e8" },
      { name: "بادامی", hex: "#ddcbb9" },
    ],
    sizes: clothingSizes,
    description:
      "روشن، مجموعه‌ای سفید و سبک برای روزهای گرم کاری است. پارچه‌ی کتان آن نفس می‌کشد و خط‌های ساده‌اش همیشه مرتب می‌مانند.",
    details: [
      "جنس: کتان نرم",
      "برش: گشاد با کمربند پارچه‌ای",
      "شست‌وشو: شست‌وشوی ملایم",
    ],
    rating: 4.5,
    reviews: 18,
    tags: ["new"],
  },
  {
    slug: "trench-baran",
    name: "ترنچ‌کت باران",
    subtitle: "لایه‌ی همیشگی پاییز",
    category: "workwear",
    price: 3980000,
    image: "/images/products/trench.jpg",
    gallery: [
      "/images/products/trench.jpg",
      "/images/products/white-set.jpg",
    ],
    colors: [
      { name: "شتری", hex: "#b99a7c" },
      { name: "زیتونی", hex: "#6c6a4f" },
    ],
    sizes: clothingSizes,
    description:
      "باران، ترنچ‌کت بلند با کمربند پارچه‌ای است که روی هر استایلی می‌نشیند؛ از کت‌وشلوار اداری تا پیراهن ابریشمی.",
    details: [
      "جنس: گاباردین ضدآب ملایم",
      "برش: بلند با کمربند",
      "شست‌وشو: خشک‌شویی",
    ],
    rating: 4.7,
    reviews: 24,
    tags: [],
  },
  {
    slug: "top-makhmal",
    name: "تاپ ابریشمی مخمل",
    subtitle: "یقه‌ی گرد با آستین بلند",
    category: "workwear",
    price: 1850000,
    image: "/images/products/blazer-necklace.jpg",
    gallery: [
      "/images/products/blazer-necklace.jpg",
      "/images/panels/work.jpg",
    ],
    colors: [
      { name: "مشکی", hex: "#171314" },
      { name: "شرابی", hex: "#5b1d28" },
    ],
    sizes: clothingSizes,
    description:
      "تاپی ساده و در عین حال کامل؛ ابریشم مات آن زیر کت اداری یا همراه با دامن بلند، ظاهری آرام و گران‌قیمت می‌سازد.",
    details: [
      "جنس: ابریشم مات",
      "برش: کمی چسبان",
      "شست‌وشو: شست‌وشوی دستی",
    ],
    rating: 4.4,
    reviews: 15,
    tags: [],
  },
  {
    slug: "bag-venice",
    name: "کیف چرمی ونیز",
    subtitle: "کوئیلت با زنجیر طلایی",
    category: "bags",
    price: 3650000,
    image: "/images/accessories/bag-quilted.jpg",
    gallery: [
      "/images/accessories/bag-quilted.jpg",
      "/images/accessories/banner.jpg",
    ],
    colors: [
      { name: "کرم", hex: "#e6d8c8" },
      { name: "مشکی", hex: "#1a1617" },
    ],
    sizes: oneSize,
    description:
      "ونیز، کیف کوچک و ساختارمند با دوخت کوئیلت و زنجیر طلایی است؛ اندازه‌ای که برای شب‌های مهمانی و مهمانی‌های نیمه‌رسمی حساب‌شده است.",
    details: [
      "جنس: چرم بره با آستر پارچه‌ای",
      "جزئیات: زنجیر قابل تنظیم و جیب داخلی",
      "مراقبت: نگهداری در کیف پارچه‌ای همراه",
    ],
    rating: 4.9,
    reviews: 57,
    tags: ["bestseller"],
  },
  {
    slug: "bag-sorkh",
    name: "کیف چرمی سرخ",
    subtitle: "قرمز شرابی با دسته‌ی کوتاه",
    category: "bags",
    price: 2890000,
    image: "/images/accessories/bag-red.jpg",
    gallery: [
      "/images/accessories/bag-red.jpg",
      "/images/accessories/banner.jpg",
    ],
    colors: [
      { name: "قرمز شرابی", hex: "#8e1b26" },
      { name: "عسلی", hex: "#a56a35" },
    ],
    sizes: oneSize,
    description:
      "سرخ، نقطه‌ی رنگی است که استایل‌های تیره را زنده می‌کند. چرم مات و بدنه‌ی مستطیلی آن، ظاهری کلاسیک و بی‌زمان دارد.",
    details: [
      "جنس: چرم طبیعی مات",
      "جزئیات: دسته‌ی کوتاه و بند بلند جدا",
      "مراقبت: پاک‌کردن با پارچه‌ی نرم",
    ],
    rating: 4.7,
    reviews: 26,
    tags: [],
  },
  {
    slug: "bag-paris",
    name: "کیف ساختارمند پاریس",
    subtitle: "سفید صدفی با قفل طلایی",
    category: "bags",
    price: 2450000,
    image: "/images/accessories/bag-white.jpg",
    gallery: [
      "/images/accessories/bag-white.jpg",
      "/images/accessories/bag-quilted.jpg",
    ],
    colors: [
      { name: "سفید صدفی", hex: "#efe9e2" },
      { name: "شامپاینی", hex: "#d6bfa4" },
    ],
    sizes: oneSize,
    description:
      "پاریس کیف روزمره‌ای است که به‌سادگی رسمی می‌شود؛ بدنه‌ی ساختارمند و قفل طلایی آن، همراه همیشگی استایل‌های اداری و آخر هفته است.",
    details: [
      "جنس: چرم فشرده",
      "جزئیات: بند بلند قابل جداشدن",
      "مراقبت: دوری از رطوبت",
    ],
    rating: 4.5,
    reviews: 19,
    tags: ["new"],
  },
  {
    slug: "shoes-aramis",
    name: "کفش پاشنه‌دار آرامیس",
    subtitle: "پاشنه‌ی متوسط با بند نازک",
    category: "shoes",
    price: 2180000,
    image: "/images/accessories/heels-white.jpg",
    gallery: [
      "/images/accessories/heels-white.jpg",
      "/images/accessories/heels-stiletto.jpg",
    ],
    colors: [
      { name: "شیری", hex: "#eee5db" },
      { name: "نود", hex: "#d7bda9" },
    ],
    sizes: shoeSizes,
    description:
      "آرامیس با پاشنه‌ی شش سانتی و بند نازک، راحتی روز کاری را با ظرافت شبانه ترکیب می‌کند. رویه‌ی چرم نرم آن با پای شما هم‌فرم می‌شود.",
    details: [
      "جنس: چرم طبیعی با آستر چرم",
      "پاشنه: ۶ سانتی‌متر",
      "مراقبت: واکس چرم روشن",
    ],
    rating: 4.8,
    reviews: 44,
    tags: ["bestseller"],
  },
  {
    slug: "shoes-mona",
    name: "کفش مجلسی مونا",
    subtitle: "مشکی مات با پنجه‌ی گرد",
    category: "shoes",
    price: 2350000,
    image: "/images/accessories/heels-black.jpg",
    gallery: [
      "/images/accessories/heels-black.jpg",
      "/images/accessories/heels-stiletto.jpg",
    ],
    colors: [
      { name: "مشکی", hex: "#171314" },
      { name: "شرابی", hex: "#6b1c27" },
    ],
    sizes: shoeSizes,
    description:
      "مونا یک کفش مجلسی ساده و بی‌حاشیه است؛ پنجه‌ی گرد و پاشنه‌ی باریک آن، با هر پیراهن بلندی هماهنگ می‌شود.",
    details: [
      "جنس: جیر مصنوعی",
      "پاشنه: ۸ سانتی‌متر",
      "مراقبت: برس نرم جیر",
    ],
    rating: 4.6,
    reviews: 21,
    tags: [],
  },
  {
    slug: "shoes-luna",
    name: "کفش استیلتو لونا",
    subtitle: "سفید صدفی با پاشنه‌ی بلند",
    category: "shoes",
    price: 1980000,
    oldPrice: 2400000,
    image: "/images/accessories/heels-stiletto.jpg",
    gallery: [
      "/images/accessories/heels-stiletto.jpg",
      "/images/accessories/heels-white.jpg",
    ],
    colors: [
      { name: "سفید صدفی", hex: "#f1ebe4" },
      { name: "مشکی", hex: "#171314" },
    ],
    sizes: shoeSizes,
    description:
      "لونا برای لحظه‌های خاص ساخته شده است؛ پاشنه‌ی استیلتو و رویه‌ی صدفی آن در نور، بازتابی آرام و درخشان دارد.",
    details: [
      "جنس: چرم صدفی",
      "پاشنه: ۹ سانتی‌متر",
      "مراقبت: پارچه‌ی نرم و خشک",
    ],
    rating: 4.5,
    reviews: 17,
    tags: ["sale"],
  },
  {
    slug: "jewel-haleh",
    name: "گوشواره طلا هاله",
    subtitle: "حلقه‌ی پیچ‌خورده‌ی طلایی",
    category: "accessories",
    price: 4900000,
    image: "/images/accessories/earrings.jpg",
    gallery: [
      "/images/accessories/earrings.jpg",
      "/images/accessories/necklace.jpg",
    ],
    colors: [{ name: "طلای رزگلد", hex: "#d9ab81" }],
    sizes: oneSize,
    description:
      "هاله، حلقه‌ای پیچ‌خورده از طلای رزگلد است؛ ساده، سبک و درخشان، برای هر روز و برای شب‌های خاص.",
    details: [
      "جنس: طلای ۱۸ عیار",
      "اندازه: قطر ۳ سانتی‌متر",
      "مراقبت: نگهداری در جعبه‌ی جواهر",
    ],
    rating: 4.9,
    reviews: 35,
    tags: ["bestseller"],
  },
  {
    slug: "jewel-aftab",
    name: "دستبند طلا آفتاب",
    subtitle: "زنجیر ظریف با آویز",
    category: "accessories",
    price: 3750000,
    image: "/images/accessories/bracelets.jpg",
    gallery: [
      "/images/accessories/bracelets.jpg",
      "/images/accessories/necklace.jpg",
    ],
    colors: [{ name: "طلای زرد", hex: "#d9b475" }],
    sizes: oneSize,
    description:
      "آفتاب، دستبندی ظریف با سه آویز کوچک است که با هم، ریتمی آرام روی مچ می‌سازند. مناسب برای استفاده‌ی روزمره.",
    details: [
      "جنس: طلای ۱۴ عیار",
      "اندازه: قابل تنظیم",
      "مراقبت: دوری از عطر و آب",
    ],
    rating: 4.7,
    reviews: 23,
    tags: [],
  },
  {
    slug: "jewel-mahtab",
    name: "گردنبند طلا مهتاب",
    subtitle: "زنجیر بلند با آویز مروارید",
    category: "accessories",
    price: 5400000,
    image: "/images/accessories/necklace.jpg",
    gallery: [
      "/images/accessories/necklace.jpg",
      "/images/accessories/earrings.jpg",
    ],
    colors: [{ name: "طلای زرد", hex: "#d9b475" }],
    sizes: oneSize,
    description:
      "مهتاب زنجیری بلند و نرم است که آویز مرواریدش، روی یقه‌ی پیراهن‌های ساده می‌درخشد. جواهری برای هر روز.",
    details: [
      "جنس: طلای ۱۸ عیار با مروارید پرورشی",
      "اندازه: زنجیر ۴۵ سانتی‌متر",
      "مراقبت: نگهداری جداگانه",
    ],
    rating: 4.8,
    reviews: 28,
    tags: ["new"],
  },
  {
    slug: "perfume-shabane",
    name: "عطر شبانه",
    subtitle: "عود، وانیل و گل شب",
    category: "accessories",
    price: 2650000,
    image: "/images/accessories/perfume-gold.jpg",
    gallery: [
      "/images/accessories/perfume-gold.jpg",
      "/images/accessories/perfume-clear.jpg",
    ],
    colors: [{ name: "مشکی طلایی", hex: "#2a2224" }],
    sizes: ["۵۰ میلی‌لیتر", "۱۰۰ میلی‌لیتر"],
    description:
      "شبانه، عطری گرم و ماندگار با نت‌های عود، وانیل و گل شب است؛ رایحه‌ای که برای ساعت‌های بعد از غروب ساخته شده.",
    details: [
      "گروه بویایی: شرقی – چوبی",
      "ماندگاری: ۸ تا ۱۰ ساعت",
      "حجم: ۵۰ میلی‌لیتر",
    ],
    rating: 4.9,
    reviews: 62,
    tags: ["bestseller"],
  },
  {
    slug: "perfume-gol-sorkh",
    name: "عطر گل سرخ",
    subtitle: "رز، پیونی و مشک سفید",
    category: "accessories",
    price: 1950000,
    image: "/images/accessories/perfume-clear.jpg",
    gallery: [
      "/images/accessories/perfume-clear.jpg",
      "/images/accessories/perfume-gold.jpg",
    ],
    colors: [{ name: "شفاف", hex: "#e8d9d6" }],
    sizes: ["۵۰ میلی‌لیتر"],
    description:
      "گل سرخ، رایحه‌ای روشن و زنانه از رز تازه و پیونی است که با مشک سفید نرم می‌شود؛ مناسب روزهای بهار.",
    details: [
      "گروه بویایی: گلی – مشک",
      "ماندگاری: ۶ تا ۸ ساعت",
      "حجم: ۵۰ میلی‌لیتر",
    ],
    rating: 4.6,
    reviews: 40,
    tags: [],
  },
  {
    slug: "sunglasses-caspian",
    name: "عینک آفتابی کاسپین",
    subtitle: "قاب مشکی با لنز دودی",
    category: "accessories",
    price: 1780000,
    image: "/images/accessories/sunglasses.jpg",
    gallery: [
      "/images/accessories/sunglasses.jpg",
      "/images/accessories/sunglasses-gold.jpg",
    ],
    colors: [
      { name: "مشکی", hex: "#171314" },
      { name: "قهوه‌ای", hex: "#5a3d30" },
    ],
    sizes: oneSize,
    description:
      "کاسپین، عینکی با قاب ضخیم و لنز دودی است که به هر استایلی شخصیت می‌دهد؛ از ترنچ‌کت تا پیراهن ابریشمی.",
    details: [
      "جنس: استات با لنز UV400",
      "جزئیات: همراه با کیف و دستمال",
      "مراقبت: پاک‌کردن با دستمال نرم",
    ],
    rating: 4.5,
    reviews: 20,
    tags: [],
  },
  {
    slug: "sunglasses-avin",
    name: "عینک آفتابی آوین",
    subtitle: "قاب طلایی با لنز روشن",
    category: "accessories",
    price: 2050000,
    image: "/images/accessories/sunglasses-gold.jpg",
    gallery: [
      "/images/accessories/sunglasses-gold.jpg",
      "/images/accessories/sunglasses.jpg",
    ],
    colors: [{ name: "طلایی", hex: "#c9a877" }],
    sizes: oneSize,
    description:
      "آوین با قاب نازک طلایی و لنز روشن، انتخابی سبک برای روزهای آفتابی است؛ ظاهری آرام و در عین حال متمایز.",
    details: [
      "جنس: فلز با لنز UV400",
      "جزئیات: همراه با کیف محافظ",
      "مراقبت: دوری از حرارت",
    ],
    rating: 4.4,
    reviews: 14,
    tags: ["new"],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function categoryTitle(category: CategorySlug) {
  return categories.find((item) => item.slug === category)?.title ?? "";
}

export function filterProducts(options: {
  category?: string;
  query?: string;
  sale?: boolean;
  sort?: string;
}) {
  const { category = "all", query = "", sale = false, sort = "featured" } = options;

  let list = [...products];

  if (category !== "all") {
    if (category === "bag-shoes") {
      list = list.filter(
        (product) => product.category === "bags" || product.category === "shoes",
      );
    } else {
      list = list.filter((product) => product.category === category);
    }
  }

  if (sale) {
    list = list.filter((product) => product.tags.includes("sale"));
  }

  const needle = query.trim();
  if (needle) {
    list = list.filter((product) =>
      `${product.name} ${product.subtitle} ${categoryTitle(product.category)}`.includes(
        needle,
      ),
    );
  }

  if (sort === "price-asc") {
    list.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    list.sort((a, b) => b.price - a.price);
  } else if (sort === "new") {
    list.sort(
      (a, b) => Number(b.tags.includes("new")) - Number(a.tags.includes("new")),
    );
  } else {
    list.sort(
      (a, b) =>
        Number(b.tags.includes("bestseller")) - Number(a.tags.includes("bestseller")),
    );
  }

  return list;
}

export function bestsellers(limit = 4) {
  return products.filter((product) => product.tags.includes("bestseller")).slice(0, limit);
}

export function relatedProducts(product: Product, limit = 4) {
  const sameCategory = products.filter(
    (item) => item.category === product.category && item.slug !== product.slug,
  );
  const fill = products.filter(
    (item) => item.category !== product.category && item.slug !== product.slug,
  );
  return [...sameCategory, ...fill].slice(0, limit);
}
