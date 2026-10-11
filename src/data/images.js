// تصاویر پروژه‌ها و مقالات. برای جایگزینی هر تصویر، تنها شناسه یا آدرس آن را تغییر دهید.
const BASE = 'https://images.unsplash.com/photo-'

export function photo(id, width = 1400) {
  return `${BASE}${id}?auto=format&fit=crop&w=${width}&q=80`
}

export const media = {
  // تصویر اصلی بخش قهرمان (ویلای مدرن، غروب و نور گرم داخلی)
  hero: '1600585154340-be6161a56a0c',
  heroSecondary: '1494526585095-c41746248156',
  blueprint: '1503387762-592deb58ef4e',
  construction: '1541888946425-d81bb19240f5',
  modelHouse: '1626178793926-22b28830aa30',
  facadeDetail: '1518005020951-eccb494ad742',
}
