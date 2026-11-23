/**
 * Single source of truth for the VELORA catalogue.
 * Imported by both the storefront (Vite/React) and the API (Express),
 * so it must stay free of browser- and Node-only APIs.
 * All prices are in Toman and always plain numbers here — Persian digits
 * are a presentation concern handled by src/lib/format.js.
 */

export const collections = [
  {
    slug: 'classic',
    name: 'کلاسیک',
    tagline: 'خطوطی که هرگز از مد نمی‌افتند',
    image: '/images/products/heritage.jpg',
  },
  {
    slug: 'chronograph',
    name: 'کرونوگراف',
    tagline: 'اندازه‌گیریِ لحظه‌های مهم',
    image: '/images/products/atlas.jpg',
  },
  {
    slug: 'skeleton',
    name: 'اسکلتون',
    tagline: 'مکانیک، بی‌پرده',
    image: '/images/products/skeleton.jpg',
  },
  {
    slug: 'sport',
    name: 'اسپرت',
    tagline: 'همراهِ روزهای پرتحرک',
    image: '/images/products/ocean.jpg',
  },
  {
    slug: 'women',
    name: 'زنانه',
    tagline: 'ظرافتی که دیده می‌شود',
    image: '/images/products/luna.jpg',
  },
];

export const products = [
  {
    id: 'heritage-1957',
    slug: 'heritage-1957',
    name: 'هریتیج ۱۹۵۷',
    latin: 'Heritage 1957',
    collection: 'classic',
    price: 28900000,
    oldPrice: 32400000,
    badge: 'پرفروش',
    images: ['/images/hero-watch.jpg', '/images/products/heritage.jpg'],
    tagline: 'طلای گرم، چرمِ قهوه‌ای، بی‌زمانی.',
    description:
      'هریتیج ۱۹۵۷ ادای احترامی است به ساعت‌های جیبیِ دههٔ پنجاه؛ قاب طلاییِ برس‌خورده با صفحهٔ قهوه‌ایِ مات و بند چرم دست‌دوز. ساعتی که با کت‌وشلوار و با پیراهن سفید، یک اندازه زیباست.',
    specs: {
      movement: 'اتوماتیک سوئیسی، ۳۸ ساعت ذخیرهٔ انرژی',
      caseSize: '۴۰ میلی‌متر',
      case: 'فولاد با آبکاری طلای ۱۸ عیار',
      strap: 'چرم طبیعی گاوی، دست‌دوز',
      glass: 'کریستال سفایر ضدخش',
      water: 'مقاوم تا ۵ اتمسفر',
      warranty: '۲۴ ماه گارانتی بین‌المللی',
    },
    featured: true,
  },
  {
    id: 'noir-automatic',
    slug: 'noir-automatic',
    name: 'نویر اتوماتیک',
    latin: 'Noir Automatic',
    collection: 'classic',
    price: 34500000,
    badge: 'جدید',
    images: ['/images/products/noir.jpg'],
    tagline: 'سیاهیِ مطلق، در سکوت.',
    description:
      'قاب فولادیِ صیقلی و صفحهٔ مشکیِ عمیق؛ نویر اتوماتیک برای کسانی است که اطمینان را فریاد نمی‌زنند. موتور اتوماتیک با روتور تزئین‌شده، از پشتِ شیشهٔ سفایر دیده می‌شود.',
    specs: {
      movement: 'اتوماتیک، ۴۲ ساعت ذخیرهٔ انرژی',
      caseSize: '۴۱ میلی‌متر',
      case: 'فولاد ضدزنگ ۳۱۶L',
      strap: 'بند فلزی یکپارچه',
      glass: 'کریستال سفایر',
      water: 'مقاوم تا ۱۰ اتمسفر',
      warranty: '۲۴ ماه گارانتی بین‌المللی',
    },
    featured: true,
  },
  {
    id: 'atlas-chrono',
    slug: 'atlas-chrono',
    name: 'اطلس کرونوگراف',
    latin: 'Atlas Chronograph',
    collection: 'chronograph',
    price: 41200000,
    badge: 'پرفروش',
    images: ['/images/products/atlas.jpg'],
    tagline: 'سه شمارنده، یک هدف: دقت.',
    description:
      'اطلس با سه شمارندهٔ کرونوگراف و قاب مشکیِ مات، ساعتی برای کسانی است که زمان را جدی می‌گیرند. طراحی صنعتی و در همان حال، به‌شدت ظریف.',
    specs: {
      movement: 'کرونوگراف کوارتز، دقت ±۱۰ ثانیه در ماه',
      caseSize: '۴۲ میلی‌متر',
      case: 'فولاد با پوشش PVD مشکی',
      strap: 'بند چرمی با دوخت مشکی',
      glass: 'کریستال سفایر با پوشش ضدبازتاب',
      water: 'مقاوم تا ۱۰ اتمسفر',
      warranty: '۲۴ ماه گارانتی بین‌المللی',
    },
    featured: true,
  },
  {
    id: 'skeleton-lumen',
    slug: 'skeleton-lumen',
    name: 'اسکلتون لومن',
    latin: 'Skeleton Lumen',
    collection: 'skeleton',
    price: 52800000,
    badge: 'محدود',
    images: ['/images/products/skeleton.jpg'],
    tagline: 'قلبِ ساعت، بی‌واسطه.',
    description:
      'صفحهٔ اسکلتون‌شده اجازه می‌دهد ضربانِ موتور را ببینید. لومن در تیراژ محدود تولید شده و هر قطعه با شمارهٔ سریال حکاکی می‌شود.',
    specs: {
      movement: 'اتوماتیک اسکلتون، ۴۰ ساعت ذخیرهٔ انرژی',
      caseSize: '۴۳ میلی‌متر',
      case: 'فولاد با پوشش مشکی مات',
      strap: 'چرم مات با آستر نرم',
      glass: 'کریستال سفایر دوطرفه',
      water: 'مقاوم تا ۵ اتمسفر',
      warranty: '۳۶ ماه گارانتی بین‌المللی',
    },
    featured: true,
  },
  {
    id: 'ocean-sport',
    slug: 'ocean-sport',
    name: 'اوشن اسپرت',
    latin: 'Ocean Sport',
    collection: 'sport',
    price: 19400000,
    images: ['/images/products/ocean.jpg'],
    tagline: 'برای هر روز، برای هر مسیر.',
    description:
      'قاب آبیِ عمیق و بند سیلیکونیِ انعطاف‌پذیر؛ اوشن اسپرت سبک است، مقاوم است و با هر لباسی کنار می‌آید. انتخابِ درست برای روزهای شلوغ.',
    specs: {
      movement: 'کوارتز سوئیسی',
      caseSize: '۴۰ میلی‌متر',
      case: 'فولاد ضدزنگ',
      strap: 'سیلیکون ضدآب',
      glass: 'کریستال معدنی سخت‌شده',
      water: 'مقاوم تا ۱۰ اتمسفر',
      warranty: '۲۴ ماه گارانتی بین‌المللی',
    },
  },
  {
    id: 'luna-rosegold',
    slug: 'luna-rosegold',
    name: 'لونا رزگلد',
    latin: 'Luna Rose Gold',
    collection: 'women',
    price: 32600000,
    badge: 'جدید',
    images: ['/images/products/luna.jpg'],
    tagline: 'نوری که روی مچ می‌نشیند.',
    description:
      'لونا با قاب رزگلد و صفحهٔ صدفی، به‌اندازهٔ یک جواهر ظریف است. ابعاد کوچک‌تر و بند باریک، آن را به همراهیِ روزمرهٔ یک استایلِ زنانه تبدیل می‌کند.',
    specs: {
      movement: 'کوارتز سوئیسی',
      caseSize: '۳۲ میلی‌متر',
      case: 'فولاد با آبکاری رزگلد',
      strap: 'بند فلزی رزگلد',
      glass: 'کریستال سفایر',
      water: 'مقاوم تا ۵ اتمسفر',
      warranty: '۲۴ ماه گارانتی بین‌المللی',
    },
    featured: true,
  },
  {
    id: 'minimal-sand',
    slug: 'minimal-sand',
    name: 'مینیمال سند',
    latin: 'Minimal Sand',
    collection: 'classic',
    price: 16800000,
    images: ['/images/products/minimal.jpg'],
    tagline: 'کمترین چیز، بیشترین اثر.',
    description:
      'بدون عدد، بدون تزئین؛ فقط دو عقربه و یک صفحهٔ روشن. مینیمال سند برای کسانی ساخته شده که می‌دانند سادگی، سخت‌ترین شکلِ طراحی است.',
    specs: {
      movement: 'کوارتز سوئیسی',
      caseSize: '۳۸ میلی‌متر',
      case: 'فولاد ضدزنگ',
      strap: 'چرم ایتالیایی',
      glass: 'کریستال معدنی',
      water: 'مقاوم تا ۳ اتمسفر',
      warranty: '۱۸ ماه گارانتی',
    },
  },
  {
    id: 'royal-bronze',
    slug: 'royal-bronze',
    name: 'رویال برنز',
    latin: 'Royal Bronze',
    collection: 'chronograph',
    price: 68500000,
    badge: 'محدود',
    images: ['/images/products/royal.jpg'],
    tagline: 'وقتی برنز، طلا می‌شود.',
    description:
      'رویال برنز با قاب دو‌رنگ طلایی و فولادی و صفحهٔ سرمه‌ای، پرچم‌دارِ کالکشن است. هر قطعه در کارگاه ولورا مونتاژ و تنظیم می‌شود.',
    specs: {
      movement: 'کرونوگراف اتوماتیک، ۴۸ ساعت ذخیرهٔ انرژی',
      caseSize: '۴۲ میلی‌متر',
      case: 'فولاد و طلای ۱۸ عیار',
      strap: 'بند فلزی دو‌رنگ',
      glass: 'کریستال سفایر ضدخش',
      water: 'مقاوم تا ۱۰ اتمسفر',
      warranty: '۳۶ ماه گارانتی بین‌المللی',
    },
  },
  {
    id: 'titan-active',
    slug: 'titan-active',
    name: 'تیتان اکتیو',
    latin: 'Titan Active',
    collection: 'sport',
    price: 24700000,
    images: ['/images/products/titan.jpg'],
    tagline: 'سبک، اما بی‌رحم.',
    description:
      'بدنهٔ تیتانیومی، سبک‌تر از آنچه فکرش را می‌کنید و مقاوم‌تر از آنچه انتظار دارید. تیتان اکتیو برای کوه، شهر و هر چیزی میان این دو.',
    specs: {
      movement: 'کوارتز سوئیسی با تاریخ‌نما',
      caseSize: '۴۱ میلی‌متر',
      case: 'تیتانیوم درجهٔ ۵',
      strap: 'بند فلزی تیتانیوم',
      glass: 'کریستال سفایر',
      water: 'مقاوم تا ۲۰ اتمسفر',
      warranty: '۲۴ ماه گارانتی بین‌المللی',
    },
  },
  {
    id: 'pearl-moon',
    slug: 'pearl-moon',
    name: 'پرل مون',
    latin: 'Pearl Moon',
    collection: 'women',
    price: 37900000,
    badge: 'پرفروش',
    images: ['/images/products/pearl.jpg'],
    tagline: 'مهتاب، روی مچ.',
    description:
      'صفحهٔ مرواریدی و قابِ نازک، پرل مون را به قطعه‌ای برای مهمانی‌های شب تبدیل می‌کند. بند چرمیِ قهوه‌ای، گرمایِ لازم را به آن اضافه می‌کند.',
    specs: {
      movement: 'کوارتز سوئیسی',
      caseSize: '۳۴ میلی‌متر',
      case: 'فولاد با آبکاری طلای رز',
      strap: 'چرم بافت‌دار قهوه‌ای',
      glass: 'کریستال سفایر',
      water: 'مقاوم تا ۵ اتمسفر',
      warranty: '۲۴ ماه گارانتی بین‌المللی',
    },
  },
];

export const productsById = Object.fromEntries(products.map((product) => [product.id, product]));

export const shippingMethods = [
  { id: 'standard', name: 'ارسال استاندارد', detail: '۳ تا ۵ روز کاری — رایگان', price: 0 },
  { id: 'express', name: 'ارسال ویژه', detail: 'تحویل ۲۴ ساعته در تهران', price: 180000 },
  { id: 'pickup', name: 'تحویل حضوری', detail: 'بوتیک ولورا، خیابان ولیعصر', price: 0 },
];

export const coupons = {
  VELORA15: { code: 'VELORA15', percent: 15, label: '۱۵٪ تخفیف اولین خرید' },
  WELCOME10: { code: 'WELCOME10', percent: 10, label: '۱۰٪ تخفیف خوش‌آمدگویی' },
};

export function calculateOrder({ items = [], shippingMethod = 'standard', couponCode = '' } = {}) {
  const lines = [];
  let subtotal = 0;

  for (const item of Array.isArray(items) ? items : []) {
    const product = productsById[item?.id];
    if (!product) continue;
    const qty = Math.min(Math.max(Math.trunc(Number(item.qty)) || 1, 1), 5);
    const lineTotal = product.price * qty;
    subtotal += lineTotal;
    lines.push({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      qty,
      lineTotal,
      image: product.images[0],
    });
  }

  const coupon = coupons[String(couponCode || '').trim().toUpperCase()] || null;
  const discount = coupon ? Math.round((subtotal * coupon.percent) / 100) : 0;
  const method = shippingMethods.find((entry) => entry.id === shippingMethod) || shippingMethods[0];
  const shipping = method.price;
  const total = subtotal - discount + shipping;

  return {
    lines,
    subtotal,
    discount,
    couponCode: coupon ? coupon.code : '',
    shipping,
    shippingMethod: method.id,
    total,
  };
}
