import { IMG } from './products'

/**
 * Editorial copy, navigation and the business details shown in the UI.
 *
 * NOTE: contact details below are clearly-marked placeholders — replace them
 * with the real business information before going live. They are intentionally
 * kept in one object so they are easy to update.
 */

export const BRAND = {
  nameEn: 'AURA PARFUMS',
  nameFa: 'آورا پارفوم',
  tagline: 'رایحه‌ای به وسعت اقیانوس',
  about:
    'AURA یک خانه‌ی عطر است که در تلاقی طراوت اقیانوس و ظرافت عطرهای فرانسوی شکل گرفته. ما رایحه‌ها را برای لحظه‌هایی می‌سازیم که قرار است فراموش نشوند.',
  contact: {
    // Placeholders — replace with the real business details.
    phone: '۰۲۱ ۰۰۰۰ ۰۰۰۰',
    phoneHref: 'tel:+982100000000',
    email: 'hello@aura-parfums.example',
    emailHref: 'mailto:hello@aura-parfums.example',
    address: 'تهران، خیابان ولیعصر، پلاک ۰۰۰',
    hours: 'شنبه تا چهارشنبه، ۱۰:۰۰ تا ۱۹:۰۰',
  },
  socials: [
    { label: 'اینستاگرام', icon: 'instagram' },
    { label: 'تلگرام', icon: 'telegram' },
    { label: 'واتساپ', icon: 'whatsapp' },
    { label: 'یوتیوب', icon: 'youtube' },
  ],
}

export const NAV = [
  { label: 'صفحه اصلی', to: '/' },
  { label: 'عطرهای زنانه', to: '/collections/women' },
  { label: 'عطرهای مردانه', to: '/collections/men' },
  { label: 'عطرهای یونیسکس', to: '/collections/unisex' },
  { label: 'مجموعه‌ها', to: '/collections' },
  { label: 'درباره ما', to: '/about' },
  { label: 'تماس با ما', to: '/contact' },
]

export const FOOTER_COLUMNS = [
  {
    title: 'فروشگاه',
    links: [
      { label: 'همه عطرها', to: '/shop' },
      { label: 'عطرهای زنانه', to: '/collections/women' },
      { label: 'عطرهای مردانه', to: '/collections/men' },
      { label: 'ست‌های هدیه', to: '/gift-sets' },
    ],
  },
  {
    title: 'راهنمای خرید',
    links: [
      { label: 'روش ثبت سفارش', to: '/terms#order' },
      { label: 'روش‌های ارسال', to: '/terms#shipping' },
      { label: 'قوانین بازگشت کالا', to: '/terms#returns' },
    ],
  },
  {
    title: 'درباره ما',
    links: [
      { label: 'داستان AURA', to: '/about' },
      { label: 'تماس با ما', to: '/contact' },
      { label: 'پرسش‌های متداول', to: '/faq' },
    ],
  },
]

export const BENEFITS = [
  {
    icon: 'truck',
    title: 'ارسال سریع و مطمئن',
    text: 'ارسال به سراسر ایران در ۲ تا ۴ روز کاری',
  },
  {
    icon: 'shield',
    title: 'تضمین اصالت کالا',
    text: 'تمام عطرها با ضمانت اصالت عرضه می‌شوند',
  },
  {
    icon: 'gift',
    title: 'بسته‌بندی شیک و ویژه',
    text: 'جعبه‌ی AURA همراه با نمونه رایحه هدیه',
  },
  {
    icon: 'headset',
    title: 'پشتیبانی مشتریان',
    text: 'مشاوره رایحه‌شناسی پیش از خرید',
  },
]

/**
 * SAMPLE CONTENT — these are not real customer testimonials.
 * They exist so the section can be reviewed visually until a review system is
 * connected; the UI labels them accordingly.
 */
export const SAMPLE_REVIEWS = [
  {
    name: 'ن. رضایی',
    city: 'تهران',
    rating: 5,
    text: 'کیفیت بسته‌بندی و اصالت محصول عالی بود. رایحه دقیقاً همان چیزی بود که در توضیحات آمده.',
  },
  {
    name: 'س. محمدی',
    city: 'اصفهان',
    rating: 5,
    text: 'مشاوره‌ی انتخاب رایحه خیلی کمکم کرد. سفارش‌دهی ساده بود و ارسال سریع انجام شد.',
  },
  {
    name: 'م. کاظمی',
    city: 'شیراز',
    rating: 4,
    text: 'رایحه‌ها باکیفیت و ماندگارند. دوست داشتم تعداد نمونه‌های تست بیشتر باشد.',
  },
]

export const QUIZ_QUESTIONS = [
  {
    id: 'temperature',
    question: 'رایحه‌ی خنک را ترجیح می‌دهی یا گرم؟',
    options: [
      { value: 'cool', label: 'خنک و تازه', hint: 'مثل نسیم ساحل' },
      { value: 'warm', label: 'گرم و مخملی', hint: 'مثل عصر پاییزی' },
    ],
  },
  {
    id: 'family',
    question: 'کدام خانواده‌ی رایحه بیشتر به تو نزدیک است؟',
    options: [
      { value: 'aquatic', label: 'دریایی', hint: 'آبی، شور و پرانرژی' },
      { value: 'floral', label: 'گلی', hint: 'رز، یاسمین، آیریس' },
      { value: 'woody', label: 'چوبی', hint: 'صندل، سدر، وتیور' },
      { value: 'sweet', label: 'شیرین', hint: 'وانیل، عنبر، عود' },
    ],
  },
  {
    id: 'occasion',
    question: 'برای استفاده‌ی روزانه عطر می‌خواهی یا مناسبت‌های خاص؟',
    options: [
      { value: 'daily', label: 'روزانه', hint: 'سبک و همه‌جا خوش‌نشین' },
      { value: 'special', label: 'مناسبت‌های خاص', hint: 'پرحضور و به‌یادماندنی' },
    ],
  },
]

/** Simple, transparent scoring: only the catalogue answers shape the result. */
export const recommend = (answers, catalogue, count = 3) => {
  if (!answers.temperature || !answers.family || !answers.occasion) return []

  const scored = catalogue.map((product) => {
    let score = 0
    if (product.temperature === answers.temperature) score += 2
    if (product.family === answers.family) score += 3
    if (answers.occasion === 'daily' && product.tags.includes('daily')) score += 2
    if (answers.occasion === 'special' && product.occasion.includes('special')) score += 2
    return { product, score }
  })

  const best = scored.filter((s) => s.score >= 4).sort((a, b) => b.score - a.score)
  const pool = best.length ? best : [...scored].sort((a, b) => b.score - a.score)
  return pool.slice(0, count).map((s) => s.product)
}

export const FAQ_ITEMS = [
  {
    q: 'چطور سفارش را ثبت کنم؟',
    a: 'عطر مورد نظر را به سبد خرید اضافه کنید، سپس در صفحه‌ی سبد خرید روی «ادامه‌ی فرآیند خرید» بزنید و اطلاعات ارسال را وارد کنید. پس از ثبت، سفارش در سامانه‌ی ما ثبت می‌شود.',
  },
  {
    q: 'هزینه و زمان ارسال چقدر است؟',
    a: 'ارسال به سراسر ایران انجام می‌شود و برای سفارش‌های بالای ۳ میلیون تومان رایگان است. زمان تحویل معمولاً ۲ تا ۴ روز کاری است.',
  },
  {
    q: 'امکان مرجوع کردن کالا وجود دارد؟',
    a: 'در صورتی که بسته‌بندی عطر باز نشده باشد، تا ۳۰ روز پس از دریافت می‌توانید کالا را مرجوع کنید. هزینه‌ی ارسال مرجوعی در موارد ایراد کالا با ما است.',
  },
  {
    q: 'اصالت عطرها چگونه تضمین می‌شود؟',
    a: 'همه‌ی عطرهای AURA از مسیر تأمین رسمی تهیه می‌شوند و همراه با کارت اصالت AURA ارسال می‌گردند.',
  },
  {
    q: 'ست‌های تست چیست و چطور کار می‌کند؟',
    a: 'در ست‌های تست چند نمونه‌ی کوچک از رایحه‌های مختلف قرار دارد تا پیش از خرید بطری اصلی، رایحه را روی پوست خود تجربه کنید. هزینه‌ی ست تست قابل بازگشت به کیف اعتباری شماست.',
  },
  {
    q: 'چه کسی می‌تواند به من در انتخاب رایحه کمک کند؟',
    a: 'همکاران بخش مشاوره‌ی AURA در ساعات کاری پاسخ‌گو هستند. همچنین می‌توانید از آزمون «کدام رایحه به تو نزدیک‌تر است؟» در صفحه‌ی اصلی استفاده کنید.',
  },
  {
    q: 'پرداخت آنلاین فعال است؟',
    a: 'در نسخه‌ی نمایشی فعلی، درگاه پرداخت متصل نشده است. سفارش شما به‌صورت «درخواست سفارش» ثبت می‌شود و همکاران ما برای نهایی‌سازی پرداخت تماس می‌گیرند.',
  },
]

export const TERMS_SECTIONS = [
  {
    id: 'order',
    title: 'روش ثبت سفارش',
    body: [
      'برای ثبت سفارش، محصول مورد نظر را انتخاب کرده و به سبد خرید اضافه کنید. سپس در صفحه‌ی سبد خرید، تعداد و مشخصات سفارش را بررسی و روی «ادامه‌ی فرآیند خرید» کلیک کنید.',
      'اطلاعات گیرنده و آدرس ارسال را کامل وارد کنید و ثبت سفارش را نهایی کنید. پس از ثبت، شماره‌ی سفارش برای شما نمایش داده می‌شود.',
      'سفارش‌ها در ساعات کاری بررسی و برای ارسال آماده می‌شوند. در صورت نیاز به تغییری، تا پیش از ارسال با پشتیبانی تماس بگیرید.',
    ],
  },
  {
    id: 'shipping',
    title: 'روش‌های ارسال',
    body: [
      'ارسال به سراسر ایران از طریق پست پیشتاز و پیک درون‌شهری انجام می‌شود.',
      'برای سفارش‌های بالای ۳ میلیون تومان هزینه‌ی ارسال رایگان است. برای مبالغ کمتر، هزینه بر اساس تعرفه‌ی شرکت حمل در زمان ارسال محاسبه می‌شود.',
      'زمان تحویل معمولاً بین ۲ تا ۴ روز کاری است. عطرها با بسته‌بندی ویژه و ضدضربه ارسال می‌شوند.',
    ],
  },
  {
    id: 'returns',
    title: 'قوانین بازگشت کالا',
    body: [
      'کالای مرجوعی باید در بسته‌بندی اصلی و باز‌نشده باشد؛ به دلیل رعایت اصول بهداشتی، عطرهایی که سلفون آن‌ها باز شده باشد قابل مرجوع کردن نیستند.',
      'مهلت مرجوع کردن کالا ۳۰ روز پس از تاریخ دریافت است.',
      'در صورت وجود ایراد یا اشتباه در ارسال، هزینه‌ی ارسال مرجوعی با AURA است. در غیر این صورت هزینه‌ی ارسال بر عهده‌ی خریدار خواهد بود.',
    ],
  },
  {
    id: 'privacy',
    title: 'حریم خصوصی و اطلاعات کاربران',
    body: [
      'اطلاعات وارد‌شده در فرم‌های سایت تنها برای پردازش سفارش و اطلاع‌رسانی استفاده می‌شود.',
      'داده‌های سبد خرید و علاقه‌مندی‌ها در همین مرورگر و به‌صورت محلی ذخیره می‌شوند.',
      'در نسخه‌ی نمایشی، بخش خبرنامه به سرور متصل نیست و ایمیل‌ها جایی ذخیره نمی‌شوند.',
    ],
  },
]

export const IMAGES = IMG
