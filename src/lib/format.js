export const toFa = (value) => String(value).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d])

export const formatPrice = (amount) =>
  `${Number(amount).toLocaleString('fa-IR')} تومان`

export const formatNumber = (amount) => Number(amount).toLocaleString('fa-IR')
