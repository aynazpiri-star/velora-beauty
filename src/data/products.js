/**
 * The AURA PARFUMS catalogue.
 *
 * Everything the storefront renders comes from this file — adding or editing a
 * fragrance only requires touching this list (plus `CATEGORIES`).
 *
 * Photography ships with the site (`public/images/…`) instead of being hotlinked
 * from a stock CDN: some networks block those hosts outright, which is why the
 * storefront could render without a single photo. Every photograph used here was
 * reviewed at ~600px for visible third-party branding and the branded ones were
 * rejected, so no competing label appears in the storefront.
 */

const shot = (name) => `/images/products/${name}.jpg`
const scene = (name) => `/images/scenes/${name}.jpg`

export const IMG = {
  oceanHero: '/images/hero-ocean.jpg',
  heroBottle: '/images/hero-bottle.jpg',
  // Home hero: the ocean campaign photograph (surf on coastal rocks with the
  // sapphire Scuba bottle and the oversized AURA wordmark). See AGENTS.md.
  scubaHero: '/images/hero-scuba.jpg',
  oceanDusk: scene('ocean-dusk'),
  oceanRocks: scene('ocean-rocks'),
  seaTexture: scene('sea-texture'),
  brandIntro: scene('brand-intro'),
  boutique: scene('boutique'),
  discovery: scene('discovery'),
  giftBoxes: scene('gift-boxes'),
  velvetBox: scene('velvet-box'),
  pouring: scene('pouring'),
}

export const CATEGORIES = [
  {
    slug: 'women',
    title: 'عطرهای زنانه',
    subtitle: 'ظرافت، گل‌ها و ماندگاری',
    image: shot('rose-eternelle'),
  },
  {
    slug: 'men',
    title: 'عطرهای مردانه',
    subtitle: 'قدرت، چوب و اعتماد',
    image: shot('bleu-marine'),
  },
  {
    slug: 'unisex',
    title: 'عطرهای یونیسکس',
    subtitle: 'برای هر دو سلیقه',
    image: shot('iris-celeste'),
  },
  {
    slug: 'daily',
    title: 'عطرهای روزانه',
    subtitle: 'سبک، خوش‌نشین و بی‌ادعا',
    image: shot('citrus-noir'),
  },
  {
    slug: 'luxury',
    title: 'عطرهای خاص و لوکس',
    subtitle: 'کالکشن ممتاز AURA',
    image: shot('oud-royal'),
  },
  {
    slug: 'gift',
    title: 'ست‌های هدیه',
    subtitle: 'هدیه‌ای به‌یادماندنی',
    image: scene('gift-boxes'),
  },
]

/** `family` drives the quiz + the “خانواده رایحه” badge. */
export const FAMILY_LABELS = {
  aquatic: 'آبی و دریایی',
  floral: 'گلی',
  woody: 'چوبی',
  sweet: 'شیرین و شرقی',
  citrus: 'مرکباتی',
  musk: 'مشکی و پودری',
}

export const products = [
  {
    id: 'scuba-blue',
    slug: 'scuba-blue',
    name: 'آبی اسکیوبا',
    nameEn: 'Scuba Blue',
    family: 'aquatic',
    gender: 'men',
    tags: ['daily', 'luxury', 'bestseller'],
    temperature: 'cool',
    occasion: ['daily', 'special'],
    notes: ['نت آبی', 'برگاموت', 'مشک سفید'],
    size: '۱۰۰ میلی‌لیتر',
    concentration: 'ادوپرفیوم',
    tagline: 'رایحه‌ای دریایی، خنک و پرانرژی',
    description:
      'اسکیوبا با نت‌های آبی و خنک خود، تجربه‌ای از شیرجه زدن در آب‌های عمیق را با خود می‌آورد. طراوت مرکبات بالای رایحه با پایه‌ای از مشک سفید ترکیب شده تا ماندگاری و رنگی مردانه و مدرن بسازد.',
    price: 3490000,
    oldPrice: 4100000,
    image: shot('scuba-blue'),
    gallery: [...['scuba-blue', 'bleu-marine'].map(shot), scene('sea-texture')],
    featured: true,
  },
  {
    id: 'rose-eternelle',
    slug: 'rose-eternelle',
    name: 'رز اترنل',
    nameEn: 'Rose Éternelle',
    family: 'floral',
    gender: 'women',
    tags: ['luxury', 'bestseller'],
    temperature: 'warm',
    occasion: ['special'],
    notes: ['رز دمشقی', 'پیونی', 'مشک'],
    size: '۱۰۰ میلی‌لیتر',
    concentration: 'ادوپرفیوم',
    tagline: 'ترکیبی لطیف از گل رز و مشک',
    description:
      'رز دمشقی در قلب این رایحه می‌تپد و با پیونی و مشک، لطافتی مخملی می‌سازد. رز اترنل برای لحظه‌هایی است که می‌خواهید حضوری آرام اما فراموش‌نشدنی داشته باشید.',
    price: 2890000,
    image: shot('rose-eternelle'),
    gallery: [...['rose-eternelle', 'lumiere-blanche'].map(shot), scene('boutique')],
    featured: true,
  },
  {
    id: 'santal-dore',
    slug: 'santal-dore',
    name: 'سانتال دوره',
    nameEn: 'Santal Doré',
    family: 'woody',
    gender: 'unisex',
    tags: ['daily', 'luxury', 'bestseller'],
    temperature: 'warm',
    occasion: ['daily', 'special'],
    notes: ['چوب صندل', 'وانیل', 'عنبر'],
    size: '۱۰۰ میلی‌لیتر',
    concentration: 'ادوپرفیوم',
    tagline: 'گرمای چوب صندل با حسی عمیق و آرام',
    description:
      'چوب صندل با گرمایی طبیعی و پوششی نرم، ستون این رایحه است. وانیل و عنبر عمق آن را کامل می‌کنند تا سانتال دوره، همراهی آرام برای روزهای طولانی باشد.',
    price: 3150000,
    image: shot('santal-dore'),
    gallery: [...['santal-dore', 'ambre-solaire'].map(shot), scene('boutique')],
    featured: true,
  },
  {
    id: 'citrus-noir',
    slug: 'citrus-noir',
    name: 'سیتروس نوآر',
    nameEn: 'Citrus Noir',
    family: 'citrus',
    gender: 'men',
    tags: ['daily'],
    temperature: 'cool',
    occasion: ['daily'],
    notes: ['لیمو', 'نارنگی', 'وتیور'],
    size: '۱۰۰ میلی‌لیتر',
    concentration: 'ادوتویلت',
    tagline: 'طراوت مرکبات با پایانی شیک و مدرن',
    description:
      'شروعی درخشان از لیمو و نارنگی که به سرعت جای خود را به وتیور خشک و شیک می‌دهد. سیتروس نوآر عطری است برای شروع پرانرژی روز.',
    price: 2650000,
    image: shot('citrus-noir'),
    gallery: [...['citrus-noir', 'neroli-blanc'].map(shot), scene('sea-texture')],
    featured: true,
  },
  {
    id: 'oud-royal',
    slug: 'oud-royal',
    name: 'عود رویال',
    nameEn: 'Oud Royal',
    family: 'sweet',
    gender: 'unisex',
    tags: ['luxury', 'bestseller'],
    temperature: 'warm',
    occasion: ['special'],
    notes: ['عود', 'زعفران', 'چرم'],
    size: '۱۰۰ میلی‌لیتر',
    concentration: 'اکستره دوپارفوم',
    tagline: 'رایحه‌ای عمیق، گرم و باشکوه',
    description:
      'عود، چرم و زعفران در عود رویال به هم می‌رسند تا رایحه‌ای اشرافی و پرحضور بسازند. انتخابی برای شب‌هایی که می‌خواهید به‌یاد بمانید.',
    price: 4890000,
    image: shot('oud-royal'),
    gallery: [...['oud-royal', 'musc-de-lune'].map(shot), scene('ocean-dusk')],
    featured: true,
  },
  {
    id: 'lumiere-blanche',
    slug: 'lumiere-blanche',
    name: 'لومیر بلانش',
    nameEn: 'Lumière Blanche',
    family: 'musk',
    gender: 'women',
    tags: ['daily', 'bestseller'],
    temperature: 'warm',
    occasion: ['daily', 'special'],
    notes: ['مشک سفید', 'یاسمین', 'آمبرت'],
    size: '۱۰۰ میلی‌لیتر',
    concentration: 'ادوپرفیوم',
    tagline: 'رایحه‌ای لطیف، روشن و دلنشین',
    description:
      'لومیر بلانش با مشک سفید و یاسمین، رایحه‌ای تمیز و نورانی می‌سازد؛ مثل ملافه‌های تازه در صبحی روشن. رایحه‌ای بی‌زمان که همه‌جا می‌نشیند.',
    price: 2750000,
    image: shot('lumiere-blanche'),
    gallery: [...['lumiere-blanche', 'rose-eternelle'].map(shot), scene('boutique')],
    featured: true,
  },
  {
    id: 'bleu-marine',
    slug: 'bleu-marine',
    name: 'بلو مارین',
    nameEn: 'Bleu Marine',
    family: 'aquatic',
    gender: 'men',
    tags: ['daily', 'gift'],
    temperature: 'cool',
    occasion: ['daily'],
    notes: ['نعناع آبی', 'اسطوخودوس', 'کهربا'],
    size: '۱۰۰ میلی‌لیتر',
    concentration: 'ادوتویلت',
    tagline: 'اقیانوس خروشان در قابی مدرن',
    description:
      'خنکی نعناع آبی با اسطوخودوس و کهربا به تعادلی مدرن می‌رسد. بلو مارین رایحه‌ای است برای شروع‌های پرانرژی و روزهای گرم.',
    price: 3050000,
    image: shot('bleu-marine'),
    gallery: [...['bleu-marine', 'scuba-blue'].map(shot), scene('ocean-rocks')],
    featured: true,
  },
  {
    id: 'iris-celeste',
    slug: 'iris-celeste',
    name: 'آیریس سلست',
    nameEn: 'Iris Céleste',
    family: 'floral',
    gender: 'women',
    tags: ['luxury'],
    temperature: 'cool',
    occasion: ['special'],
    notes: ['آیریس', 'بنفشه', 'مشک'],
    size: '۱۰۰ میلی‌لیتر',
    concentration: 'ادوپرفیوم',
    tagline: 'ظریف و پودری با نَفَسی از آسمان',
    description:
      'آیریس، رایحه‌ای پودری و اشرافی است که با بنفشه نرم می‌شود. آیریس سلست برای سلیقه‌های مینیمال و دوست‌داران رایحه‌های پودری ساخته شده.',
    price: 3390000,
    image: shot('iris-celeste'),
    gallery: [...['iris-celeste', 'musc-de-lune'].map(shot), scene('boutique')],
  },
  {
    id: 'vanille-ambree',
    slug: 'vanille-ambree',
    name: 'وانیل آمبره',
    nameEn: 'Vanille Ambrée',
    family: 'sweet',
    gender: 'unisex',
    tags: ['daily', 'gift'],
    temperature: 'warm',
    occasion: ['daily', 'special'],
    notes: ['وانیل', 'عنبر', 'تونکا'],
    size: '۱۰۰ میلی‌لیتر',
    concentration: 'ادوپرفیوم',
    tagline: 'شیرینی گرم وانیل با گرمای عنبر',
    description:
      'وانیل ماداگاسکار با عنبر و تونکا، رایحه‌ای گرم و دلچسب می‌سازد. وانیل آمبره برای عصرهای سرد و لحظه‌های آرام است.',
    price: 3290000,
    image: shot('vanille-ambree'),
    gallery: [...['vanille-ambree', 'ambre-solaire'].map(shot), scene('brand-intro')],
    featured: true,
  },
  {
    id: 'neroli-blanc',
    slug: 'neroli-blanc',
    name: 'نرولی بلان',
    nameEn: 'Néroli Blanc',
    family: 'citrus',
    gender: 'unisex',
    tags: ['daily', 'gift'],
    temperature: 'cool',
    occasion: ['daily'],
    notes: ['نرولی', 'برگاموت', 'مشک'],
    size: '۱۰۰ میلی‌لیتر',
    concentration: 'ادوتویلت',
    tagline: 'شکوفه نارنج با تازگی سفید',
    description:
      'نرولی، شکوفه نارنجی که در آب مقطر خیس خورده؛ روشن، تمیز و شاداب. نرولی بلان انتخاب بی‌خطر و دلنشینی برای هر روز است.',
    price: 2950000,
    image: shot('neroli-blanc'),
    gallery: [...['neroli-blanc', 'citrus-noir'].map(shot), scene('sea-texture')],
  },
  {
    id: 'bois-de-santal',
    slug: 'bois-de-santal',
    name: 'بوآ دو سانتال',
    nameEn: 'Bois de Santal',
    family: 'woody',
    gender: 'men',
    tags: ['daily', 'gift'],
    temperature: 'warm',
    occasion: ['daily'],
    notes: ['چوب صندل', 'سدر', 'مشک'],
    size: '۱۰۰ میلی‌لیتر',
    concentration: 'ادوپرفیوم',
    tagline: 'چوبی گرم و آرام برای هر روز',
    description:
      'ترکیبی خشک و نجیب از سدر و چوب صندل که با مشک نرم می‌شود. بوآ دو سانتال رایحه‌ای چوبی است که در محل کار هم آزاردهنده نیست.',
    price: 2780000,
    image: shot('bois-de-santal'),
    gallery: [...['bois-de-santal', 'santal-dore'].map(shot), scene('ocean-rocks')],
  },
  {
    id: 'musc-de-lune',
    slug: 'musc-de-lune',
    name: 'موسک دو لون',
    nameEn: 'Musc de Lune',
    family: 'musk',
    gender: 'women',
    tags: ['luxury', 'gift'],
    temperature: 'warm',
    occasion: ['special'],
    notes: ['مشک', 'آمبروکسان', 'پیونی'],
    size: '۱۰۰ میلی‌لیتر',
    concentration: 'ادوپرفیوم',
    tagline: 'مشکی مخملی و اسرارآمیز',
    description:
      'موسک دو لون رایحه‌ای صمیمی و مخملی است؛ مشکی که به پوست می‌چسبد و در طول شب پایدار می‌ماند. برای لحظه‌های خصوصی و شب‌های خاص.',
    price: 2680000,
    image: shot('musc-de-lune'),
    gallery: [...['musc-de-lune', 'oud-royal'].map(shot), scene('ocean-dusk')],
  },
  {
    id: 'fleur-de-sel',
    slug: 'fleur-de-sel',
    name: 'فلور دو سل',
    nameEn: 'Fleur de Sel',
    family: 'aquatic',
    gender: 'unisex',
    tags: ['daily', 'gift'],
    temperature: 'cool',
    occasion: ['daily'],
    notes: ['نت آبی', 'نمک دریا', 'مشک'],
    size: '۱۰۰ میلی‌لیتر',
    concentration: 'ادوتویلت',
    tagline: 'نمک دریا، هوا و روشنی',
    description:
      'فلور دو سل، بوی هوا در ساحل در صبح زود است؛ شور، تازه و بی‌پیرایه. رایحه‌ای روشن که برای روزهای گرم ساخته شده.',
    price: 2890000,
    image: shot('fleur-de-sel'),
    gallery: [...['fleur-de-sel', 'citrus-noir'].map(shot), scene('sea-texture')],
  },
  {
    id: 'ambre-solaire',
    slug: 'ambre-solaire',
    name: 'آمبر سولر',
    nameEn: 'Ambre Solaire',
    family: 'sweet',
    gender: 'men',
    tags: ['luxury', 'gift'],
    temperature: 'warm',
    occasion: ['special', 'daily'],
    notes: ['پرتقال خونی', 'عنبر', 'بنزوئین'],
    size: '۱۰۰ میلی‌لیتر',
    concentration: 'ادوپرفیوم',
    tagline: 'طلوعی از عنبر و مرکبات',
    description:
      'پرتقال خونی در ابتدا می‌درخشد و سپس عنبر و بنزوئین گرمای خود را باز می‌کنند. آمبر سولر، آفتاب در قالب یک رایحه است.',
    price: 3190000,
    image: shot('ambre-solaire'),
    gallery: [...['ambre-solaire', 'vanille-ambree'].map(shot), scene('brand-intro')],
  },
]

export const getProduct = (slug) => products.find((p) => p.slug === slug)

export const collectionProducts = (slug) => {
  switch (slug) {
    case 'women':
      return products.filter((p) => p.gender === 'women')
    case 'men':
      return products.filter((p) => p.gender === 'men')
    case 'unisex':
      return products.filter((p) => p.gender === 'unisex')
    case 'daily':
    case 'luxury':
    case 'gift':
      return products.filter((p) => p.tags.includes(slug))
    case 'all':
      return products
    default:
      return []
  }
}

export const relatedProducts = (product, count = 4) =>
  products
    .filter((p) => p.id !== product.id)
    .sort((a, b) => {
      const score = (x) =>
        (x.family === product.family ? 2 : 0) + (x.gender === product.gender ? 1 : 0)
      return score(b) - score(a)
    })
    .slice(0, count)
