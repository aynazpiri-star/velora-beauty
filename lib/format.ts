export const formatNumber = (value: number) => new Intl.NumberFormat("fa-IR").format(value);

export const priceLabel = (value: number) => `${formatNumber(value)} تومان`;
