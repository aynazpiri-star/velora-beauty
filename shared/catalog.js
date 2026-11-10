/**
 * Velora catalog — shared by the storefront (Vite) and the API (order pricing).
 * Prices are in Toman.
 */

export const categories = [
  {
    slug: 'women',
    name: 'کفش زنانه',
    tagline: 'ظرافت در هر قدم',
    image: '/images/category-women.jpg',
  },
  {
    slug: 'men',
    name: 'کفش مردانه',
    tagline: 'ساختار، دوام، شیک‌بودن',
    image: '/images/category-men.jpg',
  },
  {
    slug: 'sneakers',
    name: 'کتانی و اسپرت',
    tagline: 'راحتی بی‌وقفه',
    image: '/images/category-sneakers.jpg',
  },
  {
    slug: 'formal',
    name: 'کفش رسمی',
    tagline: 'برای لحظه‌های مهم',
    image: '/images/category-formal.jpg',
  },
  {
    slug: 'everyday',
    name: 'کفش روزمره',
    tagline: 'همراه هر روز شما',
    image: '/images/category-everyday.jpg',
  },
  {
    slug: 'new',
    name: 'جدیدترین مدل‌ها',
    tagline: 'تازه از کارگاه‌ها',
    image: '/images/category-new.jpg',
  },
];

const MEN_SIZES = [
  { value: '40', stock: 3 },
  { value: '41', stock: 5 },
  { value: '42', stock: 6 },
  { value: '43', stock: 4 },
  { value: '44', stock: 2 },
  { value: '45', stock: 0 },
];

const WOMEN_SIZES = [
  { value: '35', stock: 2 },
  { value: '36', stock: 4 },
  { value: '37', stock: 6 },
  { value: '38', stock: 5 },
  { value: '39', stock: 3 },
  { value: '40', stock: 0 },
];

const UNI_SIZES = [
  { value: '38', stock: 2 },
  { value: '39', stock: 4 },
  { value: '40', stock: 6 },
  { value: '41', stock: 5 },
  { value: '42', stock: 4 },
  { value: '43', stock: 2 },
];

const SPEC_BASE = [
  { key: 'جنس رویه', value: 'مش تنفسی و لایه‌های چرمی' },
  { key: 'جنس زیره', value: 'فوم بازگشتی با لایه لاستیکی' },
  { key: 'وزن', value: '۲۸۰ گرم (سایز ۴۲)' },
  { key: 'مناسب برای', value: 'استفاده روزمره و پیاده‌روی' },
  { key: 'کشور سازنده', value: 'ویتنام' },
];

function product(entry) {
  return {
    sizes: UNI_SIZES,
    rating: 4.7,
    reviewCount: 64,
    specs: SPEC_BASE,
    images: [`/images/products/${entry.slug}.jpg`],
    ...entry,
  };
}

export const products = [
  product({
    id: 'airmax-270-crimson',
    slug: 'airmax-270-crimson',
    name: 'ایر مکس ۲۷۰',
    subtitle: 'دوی شهری، سبک و بی‌صدا',
    category: 'sneakers',
    brand: 'Velora Sport',
    price: 5890000,
    oldPrice: 7290000,
    badge: 'پرفروش',
    featured: true,
    bestSeller: true,
    isNew: false,
    rating: 4.9,
    reviewCount: 214,
    accent: '#ff2e63',
    accent2: '#7b2cff',
    colors: [
      { name: 'قرمز آتشین', hex: '#e4243f' },
      { name: 'مشکی دودی', hex: '#2b2b33' },
      { name: 'کرم شنی', hex: '#e8dcc8' },
    ],
    description:
      'ایر مکس ۲۷۰ برای کسانی ساخته شده که شهر را با ریتم خودشان طی می‌کنند. رویه مش تنفسی، لایه‌های چرمی مات و زیره ایر با بازگشت انرژی بالا، ترکیبی از راحتی تمام‌روز و ظاهری جسورانه است. خطوط موجی رویه، الهام‌گرفته از حرکت هوا، آن را به یکی از شناخته‌شده‌ترین سیلوئت‌های Velora تبدیل کرده است.',
  }),
  product({
    id: 'viper-lime',
    slug: 'viper-lime',
    name: 'وایپر لایم',
    subtitle: 'انرژی نئون برای دوی صبحگاهی',
    category: 'sneakers',
    brand: 'Velora Sport',
    price: 6450000,
    oldPrice: 8100000,
    badge: 'جدید',
    featured: true,
    isNew: true,
    rating: 4.8,
    reviewCount: 96,
    accent: '#b6f04a',
    accent2: '#1fd1a5',
    colors: [
      { name: 'لیمویی', hex: '#c7f03a' },
      { name: 'سفید یخی', hex: '#f2f2f0' },
      { name: 'مشکی', hex: '#1c1c1f' },
    ],
    description:
      'وایپر لایم همان کفشی است که صبح‌ها را روشن می‌کند. فوم نرم و سبک، پایداری در پنجه و رنگ نئون لیمویی که در نور روز می‌درخشد. برای دویدن‌های کوتاه شهری و استایل‌های اسپرت روزمره طراحی شده و در طول روز سبکی‌اش را فراموش می‌کنید.',
  }),
  product({
    id: 'lumen-knit',
    slug: 'lumen-knit',
    name: 'لومن بافت',
    subtitle: 'کشباف با تنفس کامل',
    category: 'sneakers',
    brand: 'Velora Knit',
    price: 4280000,
    oldPrice: 5350000,
    badge: 'تخفیف ویژه',
    isNew: true,
    featured: true,
    rating: 4.6,
    reviewCount: 78,
    accent: '#cbf25c',
    accent2: '#4ade80',
    colors: [
      { name: 'سبز لیمویی', hex: '#c8e94f' },
      { name: 'خاکستری', hex: '#8e8e96' },
      { name: 'سفید', hex: '#f4f4f2' },
    ],
    description:
      'لومن با رویه کشباف یک‌تکه، مثل جوراب روی پا می‌نشیند. بافت سبک و منعطف، تهویه کامل و زیره نرم، آن را به گزینه‌ای ایده‌آل برای سفر و پیاده‌روی‌های طولانی تبدیل می‌کند. بدون درزهای اضافه، بدون فشار روی پا.',
  }),
  product({
    id: 'puma-white-classic',
    slug: 'puma-white-classic',
    name: 'پوما کلاسیک سفید',
    subtitle: 'کلاسیک بی‌زمان خیابان',
    category: 'sneakers',
    brand: 'Velora Heritage',
    price: 3950000,
    featured: true,
    rating: 4.7,
    reviewCount: 143,
    accent: '#e7e7ea',
    accent2: '#8b8bff',
    colors: [
      { name: 'سفید', hex: '#f0f0ee' },
      { name: 'مشکی', hex: '#1f1f24' },
      { name: 'آبی نفتی', hex: '#2f4a6b' },
    ],
    sizes: MEN_SIZES,
    description:
      'یک سیلوئت ساده که هرگز از مد نمی‌افتد. رویه چرم صاف، خط‌های مینیمال و کفی نرم؛ پوما کلاسیک سفید با هر شلواری هماهنگ می‌شود و بعد از ماه‌ها استفاده هنوز تازه به نظر می‌رسد.',
  }),
  product({
    id: 'air-force-white',
    slug: 'air-force-white',
    name: 'ایر فورس وان',
    subtitle: 'آیکون سفید تمام‌چرم',
    category: 'sneakers',
    brand: 'Velora Court',
    price: 7150000,
    oldPrice: 8400000,
    badge: 'پرفروش',
    featured: true,
    bestSeller: true,
    rating: 4.9,
    reviewCount: 302,
    accent: '#f2f2f5',
    accent2: '#a0a6b8',
    colors: [
      { name: 'سفید', hex: '#f7f7f5' },
      { name: 'کرم', hex: '#e6ddca' },
      { name: 'مشکی', hex: '#212127' },
    ],
    sizes: MEN_SIZES,
    description:
      'ایر فورس وان از زمین بسکتبال به خیابان آمده و همان‌جا مانده است. رویه چرم ضخیم، دوخت مقاوم و کفی ایر در پاشنه؛ کفشی که با گذر زمان بهتر می‌شود. یکی از پرفروش‌ترین محصولات Velora در سه فصل گذشته.',
  }),
  product({
    id: 'jordan-retro-black',
    slug: 'jordan-retro-black',
    name: 'جردن رترو',
    subtitle: 'بسکتبال با حس نوستالژیک',
    category: 'sneakers',
    brand: 'Velora Court',
    price: 9300000,
    oldPrice: 10900000,
    badge: 'محبوب',
    bestSeller: true,
    rating: 4.8,
    reviewCount: 187,
    accent: '#ff3b3b',
    accent2: '#ff8a3d',
    colors: [
      { name: 'مشکی و قرمز', hex: '#2a2a2e' },
      { name: 'سفید و قرمز', hex: '#ececec' },
    ],
    sizes: MEN_SIZES,
    description:
      'جردن رترو ادای احترام به زمین‌های بسکتبال دهه نود است. ترکیب مشکی، سفید و قرمز، رویه ترکیبی چرم و کنف و زیره لاستیکی با چسبندگی بالا. برای کلکسیونرها و کسانی که به استایل ورزشی جدی نگاه می‌کنند.',
  }),
  product({
    id: 'air-force-blue',
    slug: 'air-force-blue',
    name: 'ایر فورس آبی',
    subtitle: 'سفید و آبی، ترکیب برنده',
    category: 'men',
    brand: 'Velora Court',
    price: 6850000,
    isNew: true,
    rating: 4.7,
    reviewCount: 64,
    accent: '#4c8bff',
    accent2: '#6a5bff',
    colors: [
      { name: 'آبی روشن', hex: '#4c8bff' },
      { name: 'سفید', hex: '#f2f2f0' },
    ],
    sizes: MEN_SIZES,
    description:
      'نسخه آبی ایر فورس برای روزهایی که می‌خواهید یک قدم جلوتر باشید. جزئیات آبی روی زمینه سفید، کفی نرم و دوخت مقاوم؛ مناسب استایل‌های اسپرت شهری.',
  }),
  product({
    id: 'court-high-red',
    slug: 'court-high-red',
    name: 'کورت های‌تاپ',
    subtitle: 'های‌تاپ برای زمین و خیابان',
    category: 'sneakers',
    brand: 'Velora Court',
    price: 5120000,
    oldPrice: 6400000,
    badge: 'تخفیف ۲۰٪',
    rating: 4.5,
    reviewCount: 52,
    accent: '#ff4d4d',
    accent2: '#2d6bff',
    colors: [
      { name: 'قرمز و مشکی', hex: '#d8333a' },
      { name: 'سفید', hex: '#eeeeeb' },
    ],
    description:
      'های‌تاپ کلاسیک با یقه بلند که مچ را محکم نگه می‌دارد. کف لاستیکی با آج عمیق، مناسب استفاده روزمره و بسکتبال خیابانی.',
  }),
  product({
    id: 'pastel-runner',
    slug: 'pastel-runner',
    name: 'پاستل رانر',
    subtitle: 'رنگ‌های نرم، دوی روزمره',
    category: 'women',
    brand: 'Velora Sport',
    price: 4650000,
    isNew: true,
    featured: true,
    rating: 4.6,
    reviewCount: 71,
    accent: '#ff9ac1',
    accent2: '#9dd0ff',
    colors: [
      { name: 'پاستل صورتی', hex: '#f0b7c8' },
      { name: 'پاستل آبی', hex: '#a9c8e8' },
      { name: 'سفید', hex: '#f6f4f1' },
    ],
    sizes: WOMEN_SIZES,
    description:
      'پاستل رانر کفشی است که با آن می‌توانید از باشگاه تا کافه بروید. رنگ‌های نرم و پودری، رویه سبک و زیره فومی با بالشتک پاشنه؛ ظاهری آرام با راحتی تمام‌روز.',
  }),
  product({
    id: 'suede-daily',
    slug: 'suede-daily',
    name: 'روزمره جیر تان',
    subtitle: 'جیر نرم و کف انعطاف‌پذیر',
    category: 'everyday',
    brand: 'Velora Everyday',
    price: 3780000,
    oldPrice: 4500000,
    rating: 4.5,
    reviewCount: 89,
    accent: '#d98652',
    accent2: '#ffb37b',
    colors: [
      { name: 'تان', hex: '#b98055' },
      { name: 'قهوه‌ای', hex: '#6f4b34' },
      { name: 'کرم', hex: '#e3d7c3' },
    ],
    sizes: MEN_SIZES,
    description:
      'جیر نرم با پرداخت مات، بندهای پارچه‌ای و کفی منعطف. روزمره جیر تان کفشی است که با شلوار جین و کتان به یک اندازه خوب به نظر می‌رسد و پس از ساعت‌ها راه رفتن هم پا را خسته نمی‌کند.',
  }),
  product({
    id: 'monk-formal',
    slug: 'monk-formal',
    name: 'آکسفورد مونک',
    subtitle: 'دوخت دست، چرم طبیعی',
    category: 'formal',
    brand: 'Velora Atelier',
    price: 8900000,
    featured: true,
    rating: 4.9,
    reviewCount: 47,
    accent: '#c08a4e',
    accent2: '#8a5a2b',
    colors: [
      { name: 'قهوه‌ای عسلی', hex: '#8a5a2b' },
      { name: 'مشکی', hex: '#1a1a1d' },
    ],
    sizes: MEN_SIZES,
    description:
      'آکسفورد مونک با بند دوتایی، از چرم طبیعی دباغی‌شده و دوخت دست ساخته شده است. زیره چرمی با پاشنه چسبی، مناسب مراسم رسمی و محیط‌های کاری. با گذشت زمان، چرم براق‌تر و نرم‌تر می‌شود.',
    specs: [
      { key: 'جنس رویه', value: 'چرم طبیعی گاوی' },
      { key: 'جنس زیره', value: 'چرم با پاشنه لاستیکی' },
      { key: 'دوخت', value: 'دست‌دوز (Goodyear)' },
      { key: 'مناسب برای', value: 'مراسم رسمی و محیط اداری' },
      { key: 'کشور سازنده', value: 'ایتالیا' },
    ],
  }),
  product({
    id: 'floral-pump',
    slug: 'floral-pump',
    name: 'پمپ گلدار آبی',
    subtitle: 'طرح گل، پاشنه ۸ سانتی',
    category: 'women',
    brand: 'Velora Atelier',
    price: 5400000,
    oldPrice: 6300000,
    badge: 'ویژه مهمانی',
    rating: 4.7,
    reviewCount: 58,
    accent: '#7c9cff',
    accent2: '#4a6bff',
    colors: [
      { name: 'آبی گلدار', hex: '#6f8ff0' },
      { name: 'سفید گلدار', hex: '#eceae4' },
    ],
    sizes: WOMEN_SIZES,
    description:
      'پمپ گلدار با چاپ دستی روی پارچه ساتن، پاشنه ۸ سانتی و فرم کشیده. برای مهمانی‌ها و مراسمی که می‌خواهید ست‌تان به‌یاد بماند. کفی داخلی چرمی، برای راحتی بیشتر.',
  }),
  product({
    id: 'stiletto-noir',
    slug: 'stiletto-noir',
    name: 'استیلتو نویر',
    subtitle: 'پاشنه باریک، خطوط کشیده',
    category: 'women',
    brand: 'Velora Atelier',
    price: 4980000,
    bestSeller: true,
    rating: 4.6,
    reviewCount: 121,
    accent: '#ff7ab6',
    accent2: '#b06bff',
    colors: [
      { name: 'مشکی', hex: '#16161a' },
      { name: 'نود', hex: '#d8b8a4' },
      { name: 'صورتی دودی', hex: '#d68ca6' },
    ],
    sizes: WOMEN_SIZES,
    description:
      'استیلتو نویر با پاشنه ۹ سانتی و پنجه باریک، سیلوئتی کشیده و زنانه می‌سازد. رویه جیر مات و کفی نرم‌شده، برای شب‌های طولانی راحت‌تر از آن است که فکر می‌کنید.',
  }),
  product({
    id: 'black-pump',
    slug: 'black-pump',
    name: 'پمپ کلاسیک مشکی',
    subtitle: 'مشکی، همیشه درست',
    category: 'women',
    brand: 'Velora Atelier',
    price: 4350000,
    oldPrice: 5100000,
    badge: 'تخفیف ویژه',
    rating: 4.8,
    reviewCount: 96,
    accent: '#e6c36a',
    accent2: '#7b4dff',
    colors: [
      { name: 'مشکی', hex: '#141418' },
      { name: 'زمردی', hex: '#1f5a4d' },
    ],
    sizes: WOMEN_SIZES,
    description:
      'پمپ مشکی کلاسیک با پاشنه ۷ سانتی؛ کفشی که با هر لباسی در کمد شما هماهنگ می‌شود. چرم صاف براق، داخل چرمی و فرم استاندارد.',
  }),
  product({
    id: 'leather-boot-women',
    slug: 'leather-boot-women',
    name: 'بوت چرمی زنانه',
    subtitle: 'بوت چرم با پاشنه پهن',
    category: 'women',
    brand: 'Velora Atelier',
    price: 6900000,
    isNew: true,
    rating: 4.7,
    reviewCount: 43,
    accent: '#c68b59',
    accent2: '#8b5e3c',
    colors: [
      { name: 'قهوه‌ای', hex: '#6b4a31' },
      { name: 'مشکی', hex: '#1b1b1f' },
    ],
    sizes: WOMEN_SIZES,
    description:
      'بوت چرم با پاشنه پهن و ساق کوتاه؛ پایدار روی زمین و گرم در روزهای سرد. زیپ کناری، داخل پارچه‌ای نرم و زیره ضدلغزش. ست کردنش با پالتو و شلوار پارچه‌ای عالی است.',
  }),
  product({
    id: 'teal-loafer',
    slug: 'teal-loafer',
    name: 'لوفر جیر فیروزه‌ای',
    subtitle: 'لوفر جیر با رنگ خاص',
    category: 'formal',
    brand: 'Velora Atelier',
    price: 4880000,
    oldPrice: 5600000,
    badge: 'رنگ محدود',
    featured: true,
    rating: 4.6,
    reviewCount: 37,
    accent: '#35d3c0',
    accent2: '#ff8fa3',
    colors: [
      { name: 'فیروزه‌ای', hex: '#2f9e91' },
      { name: 'سرمه‌ای', hex: '#233d63' },
    ],
    sizes: MEN_SIZES,
    description:
      'لوفری که با یک رنگ متفاوت، استایل را از معمولی جدا می‌کند. جیر فیروزه‌ای، بند ساده و کفی چرمی. ترکیبش با شلوار کتان روشن و پیراهن ساده بی‌نظیر است.',
  }),
  product({
    id: 'nb-olive',
    slug: 'nb-olive',
    name: 'نیوبالانس زیتونی',
    subtitle: 'راحتی تمام‌روز',
    category: 'everyday',
    brand: 'Velora Everyday',
    price: 5250000,
    bestSeller: true,
    rating: 4.7,
    reviewCount: 134,
    accent: '#a3b565',
    accent2: '#6e8b3d',
    colors: [
      { name: 'زیتونی', hex: '#77813f' },
      { name: 'خاکستری', hex: '#8f8f8f' },
    ],
    sizes: UNI_SIZES,
    description:
      'ترکیب جیر و مش با رنگ زیتونی آرام؛ کفی ضخیم و نرم که برای ایستادن‌های طولانی ساخته شده. اگر یک کفش برای هر روز می‌خواهید، این انتخاب سختی ندارد.',
  }),
  product({
    id: 'af1-tan',
    slug: 'af1-tan',
    name: 'ایر فورس تان',
    subtitle: 'تان گرم برای پاییز',
    category: 'everyday',
    brand: 'Velora Court',
    price: 6200000,
    oldPrice: 7000000,
    isNew: true,
    rating: 4.5,
    reviewCount: 51,
    accent: '#e0a85c',
    accent2: '#ffd36e',
    colors: [
      { name: 'تان', hex: '#c99a63' },
      { name: 'کرم', hex: '#e8dfcd' },
    ],
    sizes: MEN_SIZES,
    description:
      'رنگ تان گرم با رویه چرم مات و جزئیات کنتراست؛ مناسب فصل سرد و ست‌های خنثی. ساختار مقاوم، کفی نرم و اندازه استاندارد.',
  }),
  product({
    id: 'trail-boot',
    slug: 'trail-boot',
    name: 'بوت ترک براون',
    subtitle: 'بوت ترک با چرم ضدآب',
    category: 'everyday',
    brand: 'Velora Outdoor',
    price: 7450000,
    rating: 4.8,
    reviewCount: 72,
    accent: '#b4794a',
    accent2: '#6b4a2f',
    colors: [
      { name: 'براون', hex: '#7a5133' },
      { name: 'مشکی', hex: '#1d1d20' },
    ],
    sizes: MEN_SIZES,
    description:
      'بوت ترک با چرم ضدآب و زیره آج‌دار برای مسیرهای ناهموار. پدینگ مچ، بندهای مقاوم و دوخت دوبل. برای سفرهای پاییزی و زمستانی همراهش باشید.',
    specs: [
      { key: 'جنس رویه', value: 'چرم ضدآب' },
      { key: 'جنس زیره', value: 'لاستیک آج‌دار مقاوم' },
      { key: 'وزن', value: '۴۶۰ گرم (سایز ۴۲)' },
      { key: 'مناسب برای', value: 'مسیرهای ناهموار و سفر' },
      { key: 'کشور سازنده', value: 'پرتغال' },
    ],
  }),
  product({
    id: 'black-runner',
    slug: 'black-runner',
    name: 'رانر مشکی',
    subtitle: 'سبک، منعطف، بی‌صدا',
    category: 'men',
    brand: 'Velora Sport',
    price: 3290000,
    oldPrice: 3990000,
    badge: 'اقتصادی',
    rating: 4.4,
    reviewCount: 168,
    accent: '#8c8c95',
    accent2: '#c0c0cc',
    colors: [
      { name: 'مشکی', hex: '#1b1b1e' },
      { name: 'خاکستری', hex: '#77777e' },
    ],
    sizes: MEN_SIZES,
    description:
      'رانر مشکی سبک‌ترین کفش مجموعه روزمره Velora است. رویه مش یک‌لایه، زیره فومی منعطف و فرم ساده. برای پیاده‌روی، باشگاه و مسیرهای روزانه.',
  }),
];

export const productsById = Object.fromEntries(products.map((item) => [item.id, item]));
export const productsBySlug = Object.fromEntries(products.map((item) => [item.slug, item]));

export const shipping = {
  flatRate: 350000,
  freeThreshold: 8000000,
};

export const coupons = {
  VELORA10: { code: 'VELORA10', percent: 10, label: 'ده درصد تخفیف' },
  VELORA15: { code: 'VELORA15', percent: 15, label: 'پانزده درصد تخفیف' },
};

export const benefits = [
  {
    icon: 'shield',
    title: 'کیفیت تضمین‌شده',
    text: 'هر جفت کفش پیش از ارسال از نظر دوخت، زیره و اندازه بررسی می‌شود.',
  },
  {
    icon: 'truck',
    title: 'ارسال سریع',
    text: 'ارسال تهران در ۲۴ ساعت و شهرستان‌ها در ۲ تا ۴ روز کاری.',
  },
  {
    icon: 'lock',
    title: 'پرداخت امن',
    text: 'پرداخت درگاه امن یا هنگام تحویل، بدون ذخیره اطلاعات کارت.',
  },
  {
    icon: 'support',
    title: 'پشتیبانی مشتریان',
    text: 'پاسخ‌گویی تلفنی و پیام‌رسان، هر روز از ۹ صبح تا ۹ شب.',
  },
];

export const storeReviews = [
  {
    id: 'r1',
    name: 'نگار محمدی',
    city: 'تهران',
    rating: 5,
    text: 'بسته‌بندی فوق‌العاده بود، کفش دقیقاً مثل عکس‌ها. سایز ۳۷ کاملاً استاندارد بود و بعد از دو هفته استفاده هنوز نو است.',
  },
  {
    id: 'r2',
    name: 'سینا رضایی',
    city: 'اصفهان',
    rating: 5,
    text: 'ایر مکس رو گرفتم، سبک‌تر از چیزی بود که انتظار داشتم. ارسال دو روزه رسید و پشتیبانی هم سریع جواب داد.',
  },
  {
    id: 'r3',
    name: 'مریم کاظمی',
    city: 'شیراز',
    rating: 4,
    text: 'کیفیت چرم بوت خیلی خوبه. تنها نکته اینکه رنگش کمی تیره‌تر از تصویره، ولی در کل راضی‌ام.',
  },
  {
    id: 'r4',
    name: 'آرش نوری',
    city: 'تبریز',
    rating: 5,
    text: 'برای مراسم رسمی آکسفورد مونک رو خریدم. دوخت دستش واقعاً مشخصه. ارزش قیمتش رو داره.',
  },
  {
    id: 'r5',
    name: 'الهام صادقی',
    city: 'مشهد',
    rating: 5,
    text: 'استیلتو نویر رو برای عروسی خواهرم گرفتم، تمام شب پام بود و اذیت نشدم. سایز ۳۸ درست بود.',
  },
  {
    id: 'r6',
    name: 'بابک فتحی',
    city: 'رشت',
    rating: 4,
    text: 'بوت ترک رو برای سفر شمال خریدم، زیره‌اش روی گل و سنگ خوب جواب داد. فقط کاش رنگ مشکی هم موجود بود.',
  },
];

export const productReviews = {
  'airmax-270-crimson': [
    {
      id: 'p1',
      author: 'کاوه احمدی',
      rating: 5,
      date: '۱۴۰۴/۰۶/۱۲',
      text: 'راحتی‌اش عالیه، کل روز سر پام و اذیت نمی‌شم. زیره ایر واقعاً کار می‌کنه.',
    },
    {
      id: 'p2',
      author: 'سارا میرزایی',
      rating: 4,
      date: '۱۴۰۴/۰۵/۲۸',
      text: 'رنگ قرمز خیلی خوش‌رنگه. یک سایز بزرگ‌تر بگیرید بهتره.',
    },
  ],
  'air-force-white': [
    {
      id: 'p3',
      author: 'پویا کریمی',
      rating: 5,
      date: '۱۴۰۴/۰۶/۰۳',
      text: 'چرمش ضخیم و باکیفیته، بعد از دو ماه هیچ ترکی نداره.',
    },
    {
      id: 'p4',
      author: 'نیلوفر اکبری',
      rating: 5,
      date: '۱۴۰۴/۰۵/۱۹',
      text: 'سفیدش خیلی تمیزه و با همه چی ست می‌شه. بسته‌بندی هم مرتب بود.',
    },
  ],
  'monk-formal': [
    {
      id: 'p5',
      author: 'فرزاد حسینی',
      rating: 5,
      date: '۱۴۰۴/۰۴/۳۰',
      text: 'برای دفتر کار خریدم، دوختش بی‌نظیره. بعد از چند بار پوشیدن نرم‌تر شد.',
    },
  ],
};

export const findProduct = (id) => productsById[id];

export const calculateOrder = ({ items = [], couponCode = '', shippingMethod = 'standard' }) => {
  const lines = [];
  for (const item of items) {
    const found = productsById[item.id];
    if (!found) continue;
    const quantity = Math.max(1, Math.min(10, Number(item.qty) || 1));
    const unitPrice = found.price;
    lines.push({
      id: found.id,
      slug: found.slug,
      name: found.name,
      image: found.images[0],
      size: item.size || null,
      color: item.color || null,
      qty: quantity,
      unitPrice,
      lineTotal: unitPrice * quantity,
    });
  }

  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const coupon = couponCode ? coupons[String(couponCode).toUpperCase()] : null;
  const couponDiscount = coupon ? Math.round((subtotal * coupon.percent) / 100) : 0;
  const discountedSubtotal = subtotal - couponDiscount;

  let shippingCost = discountedSubtotal >= shipping.freeThreshold ? 0 : shipping.flatRate;
  if (shippingMethod === 'express') shippingCost += 250000;
  if (lines.length === 0) shippingCost = 0;

  return {
    lines,
    subtotal,
    coupon: coupon ? { code: coupon.code, percent: coupon.percent } : null,
    couponDiscount,
    shippingCost,
    total: discountedSubtotal + shippingCost,
  };
};
