/** تبدیل ارقام فارسی و عربی به لاتین برای اعتبارسنجی و ارسال داده. */
export function toLatinDigits(value = '') {
  return String(value)
    .replace(/[۰-۹]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)))
}

/** تبدیل ارقام لاتین به فارسی برای نمایش. */
export function toPersianDigits(value = '') {
  return String(value).replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)])
}
