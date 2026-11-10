const FA_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export const toFa = (value) => String(value ?? '').replace(/\d/g, (digit) => FA_DIGITS[Number(digit)]);

export const toEn = (value) =>
  String(value ?? '').replace(/[۰-۹]/g, (digit) => String(FA_DIGITS.indexOf(digit)));

export const formatNumber = (value) => {
  const number = Number(value) || 0;
  const grouped = number.toLocaleString('en-US').replace(/,/g, '٬');
  return toFa(grouped);
};

export const formatPrice = (value) => `${formatNumber(value)} تومان`;

export const discountPercent = (price, oldPrice) => {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round((1 - price / oldPrice) * 100);
};

export const formatDate = (iso) => {
  try {
    return new Intl.DateTimeFormat('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' }).format(
      new Date(iso),
    );
  } catch {
    return toFa(iso);
  }
};

export const ratingLabel = (rating) => toFa(Number(rating || 0).toFixed(1)).replace('.', '٫');
