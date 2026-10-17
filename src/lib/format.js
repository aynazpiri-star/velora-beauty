/**
 * Formatting helpers for Persian (Farsi) presentation.
 */

const FA_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

/** Converts every latin digit in a string to its Persian counterpart. */
export const toFaDigits = (value) =>
  String(value).replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)])

/** 3490000 -> «۳٬۴۹۰٬۰۰۰» */
export const toFaNumber = (value) => toFaDigits(Number(value).toLocaleString('en-US')).replace(/,/g, '٬')

/** 3490000 -> «۳٬۴۹۰٬۰۰۰ تومان» */
export const toman = (value) => `${toFaNumber(value)} تومان`

/** 15 -> «۱۵٪» */
export const toFaPercent = (value) => `${toFaDigits(value)}٪`

/** Persian-aware slug/id helpers used by routing. */
export const normalize = (value) => String(value ?? '').trim().toLowerCase()
