const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';

export function faNum(value) {
  return String(value ?? '')
    .replace(/[0-9]/g, (digit) => PERSIAN_DIGITS[Number(digit)])
    .replace(/,/g, '٬');
}

export function price(value) {
  return faNum(Number(value || 0).toLocaleString('en-US'));
}

export function toman(value) {
  return `${price(value)} تومان`;
}

export function faDate(iso) {
  try {
    return new Intl.DateTimeFormat('fa-IR', { dateStyle: 'long' }).format(new Date(iso));
  } catch {
    return '';
  }
}
