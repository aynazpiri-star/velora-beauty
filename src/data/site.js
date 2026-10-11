// تمام اطلاعات پایه سایت در همین فایل متمرکز شده است.
// برای انتشار نهایی، اطلاعات نمونه را با اطلاعات واقعی شرکت جایگزین کنید.

export const brand = {
  name: 'آرکا سازه',
  latinName: 'ARKA SAZEH',
  tagline: 'معماری ماندگار، ساخت آینده',
  shortDescription: 'همراه شما از نخستین ایده تا ساخت فضاهایی ماندگار.',
  established: '۱۳۸۹',
}

// اطلاعات تماس نمونه — پیش از انتشار عمومی جایگزین شود.
export const contact = {
  phone: '۰۴۴-۳۲۲۲۲۲۲۲',
  phoneHref: '+984432222222',
  mobile: '۰۹۱۲-۳۴۵-۶۷۸۹',
  mobileHref: '+989123456789',
  email: 'info@arkasaze.ir',
  emailHref: 'mailto:info@arkasaze.ir',
  address: 'ارومیه، آذربایجان غربی، ایران',
  addressDetail: 'بلوار شهید باکری، ساختمان آرکا، طبقه سوم',
  hours: 'شنبه تا چهارشنبه، ۹:۰۰ تا ۱۸:۰۰',
}

export const socials = [
  { key: 'instagram', label: 'اینستاگرام', href: 'https://instagram.com/' },
  { key: 'telegram', label: 'تلگرام', href: 'https://telegram.org/' },
  { key: 'linkedin', label: 'لینکدین', href: 'https://linkedin.com/' },
]

// لینک‌های ناوبری سربرگ؛ anchor مربوط به صفحات خانه است.
export const navLinks = [
  { label: 'خانه', to: '/', anchor: 'top' },
  { label: 'درباره ما', to: '/about' },
  { label: 'خدمات', to: '/services' },
  { label: 'پروژه‌ها', to: '/projects' },
  { label: 'مجله معماری', to: '/journal' },
  { label: 'تماس با ما', to: '/contact' },
]

export const projectTypes = [
  'ساخت‌وساز مسکونی',
  'ساخت‌وساز تجاری',
  'طراحی معماری',
  'طراحی داخلی',
  'بازسازی',
  'سرمایه‌گذاری ملکی',
  'سایر موارد',
]

export const budgetRanges = [
  'تا ۵ میلیارد تومان',
  '۵ تا ۱۵ میلیارد تومان',
  '۱۵ تا ۴۰ میلیارد تومان',
  'بیش از ۴۰ میلیارد تومان',
  'هنوز مشخص نیست',
]
