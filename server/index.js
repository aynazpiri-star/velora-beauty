import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { calculateOrder, coupons, productsById } from '../shared/catalog.js';

const app = express();
const PORT = Number(process.env.PORT || 8000);
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), '.data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

app.use(express.json({ limit: '256kb' }));

/* ------------------------------------------------------------------ storage */

const emptyDb = { orders: [], reviews: {}, newsletter: [], messages: [] };

function readDb() {
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return { ...emptyDb, ...JSON.parse(raw) };
  } catch {
    return { ...emptyDb };
  }
}

let db = readDb();

function writeDb() {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
  } catch (error) {
    console.error('velora: failed to persist data', error.message);
  }
}

const isEmail = (value) => typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
const clean = (value, max = 300) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

function orderCode() {
  return `VLR-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
}

/* --------------------------------------------------------------------- api */

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'velora-api' });
});

app.post('/api/orders', (req, res) => {
  const { items, customer = {}, shippingMethod = 'standard', couponCode = '', paymentMethod = 'cod', note = '' } = req.body || {};

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'سبد خرید خالی است.' });
  }
  if (!clean(customer.fullName) || !clean(customer.phone) || !clean(customer.address) || !clean(customer.city)) {
    return res.status(400).json({ message: 'اطلاعات ارسال ناقص است.' });
  }
  if (!/^09\d{9}$/.test(customer.phone.replace(/\s/g, ''))) {
    return res.status(400).json({ message: 'شماره موبایل معتبر نیست.' });
  }

  const totals = calculateOrder({ items, couponCode, shippingMethod });
  if (totals.lines.length === 0) {
    return res.status(400).json({ message: 'محصولات سبد خرید معتبر نیستند.' });
  }

  const order = {
    code: orderCode(),
    createdAt: new Date().toISOString(),
    status: 'ثبت شده',
    items: totals.lines,
    subtotal: totals.subtotal,
    couponDiscount: totals.couponDiscount,
    shippingCost: totals.shippingCost,
    total: totals.total,
    coupon: totals.coupon,
    shippingMethod,
    paymentMethod,
    note: clean(note, 500),
    customer: {
      fullName: clean(customer.fullName, 120),
      phone: clean(customer.phone, 20),
      email: clean(customer.email, 120),
      city: clean(customer.city, 80),
      address: clean(customer.address, 400),
      postalCode: clean(customer.postalCode, 20),
    },
  };

  db.orders.unshift(order);
  writeDb();
  res.status(201).json(order);
});

app.get('/api/orders/:code', (req, res) => {
  const order = db.orders.find((item) => item.code === req.params.code.toUpperCase());
  if (!order) return res.status(404).json({ message: 'سفارش پیدا نشد.' });
  res.json(order);
});

app.post('/api/coupon', (req, res) => {
  const code = clean(req.body?.code, 20).toUpperCase();
  const coupon = coupons[code];
  if (!coupon) return res.status(404).json({ message: 'این کد تخفیف معتبر نیست.' });
  res.json(coupon);
});

app.get('/api/products/:id/reviews', (req, res) => {
  res.json(db.reviews[req.params.id] || []);
});

app.post('/api/products/:id/reviews', (req, res) => {
  const { id } = req.params;
  if (!productsById[id]) return res.status(404).json({ message: 'محصول پیدا نشد.' });

  const author = clean(req.body?.author, 60);
  const text = clean(req.body?.text, 600);
  const rating = Math.min(5, Math.max(1, Number(req.body?.rating) || 0));

  if (!author || !text || !rating) {
    return res.status(400).json({ message: 'نام، امتیاز و متن نظر لازم است.' });
  }

  const review = {
    id: crypto.randomUUID(),
    author,
    rating,
    text,
    date: new Date().toISOString(),
    published: true,
  };

  db.reviews[id] = [review, ...(db.reviews[id] || [])];
  writeDb();
  res.status(201).json(review);
});

app.post('/api/newsletter', (req, res) => {
  const email = clean(req.body?.email, 160);
  if (!isEmail(email)) return res.status(400).json({ message: 'ایمیل معتبر نیست.' });
  if (!db.newsletter.includes(email.toLowerCase())) {
    db.newsletter.push(email.toLowerCase());
    writeDb();
  }
  res.status(201).json({ ok: true });
});

app.post('/api/contact', (req, res) => {
  const name = clean(req.body?.name, 80);
  const email = clean(req.body?.email, 160);
  const message = clean(req.body?.message, 1200);
  if (!name || !message || !isEmail(email)) {
    return res.status(400).json({ message: 'نام، ایمیل و متن پیام را کامل کنید.' });
  }
  db.messages.unshift({ id: crypto.randomUUID(), name, email, message, createdAt: new Date().toISOString() });
  writeDb();
  res.status(201).json({ ok: true });
});

app.use('/api', (_req, res) => res.status(404).json({ message: 'مسیر پیدا نشد.' }));

// eslint-disable-next-line no-unused-vars
app.use((error, _req, res, _next) => {
  console.error('velora: unhandled error', error);
  res.status(500).json({ message: 'خطای غیرمنتظره در سرور.' });
});

app.listen(PORT, '0.0.0.0', () => {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  console.log(`velora-api listening on 0.0.0.0:${PORT}`);
});
