import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { calculateOrder, productsById } from '../shared/catalog.js';

const app = express();
const PORT = Number(process.env.PORT || 8000);
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), '.data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

app.use(express.json({ limit: '256kb' }));

/* ------------------------------------------------------------------ storage */

const emptyDb = { orders: [], messages: [], subscribers: [] };

function readDb() {
  try {
    return { ...emptyDb, ...JSON.parse(fs.readFileSync(DB_FILE, 'utf8')) };
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
const clean = (value, max = 400) => (typeof value === 'string' ? value.trim().slice(0, max) : '');
const orderCode = () => `VLR-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;

/* --------------------------------------------------------------------- api */

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'velora-api' });
});

app.post('/api/orders', (req, res) => {
  const { items, customer = {}, shippingMethod = 'standard', couponCode = '', paymentMethod = 'cod', note = '' } = req.body || {};

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'سبد خرید خالی است.' });
  }
  if (!clean(customer.fullName) || !clean(customer.phone) || !clean(customer.city) || !clean(customer.address)) {
    return res.status(400).json({ message: 'اطلاعات ارسال کامل نیست.' });
  }
  if (!/^09\d{9}$/.test(customer.phone.replace(/\s/g, ''))) {
    return res.status(400).json({ message: 'شمارهٔ موبایل معتبر نیست.' });
  }

  const totals = calculateOrder({ items, shippingMethod, couponCode });
  if (totals.lines.length === 0) {
    return res.status(400).json({ message: 'محصولات سبد خرید معتبر نیستند.' });
  }

  const order = {
    code: orderCode(),
    createdAt: new Date().toISOString(),
    status: 'در انتظار تأیید',
    customer: {
      fullName: clean(customer.fullName, 120),
      phone: clean(customer.phone, 20).replace(/\s/g, ''),
      city: clean(customer.city, 80),
      address: clean(customer.address, 500),
      postalCode: clean(customer.postalCode, 20),
      email: isEmail(customer.email) ? customer.email.trim() : '',
    },
    paymentMethod: paymentMethod === 'transfer' ? 'transfer' : 'cod',
    note: clean(note, 500),
    ...totals,
  };

  db.orders.unshift(order);
  writeDb();
  res.status(201).json(order);
});

app.get('/api/orders/:code', (req, res) => {
  const order = db.orders.find((entry) => entry.code === req.params.code.toUpperCase());
  if (!order) return res.status(404).json({ message: 'سفارش پیدا نشد.' });
  res.json(order);
});

app.post('/api/newsletter', (req, res) => {
  const email = clean(req.body?.email, 160);
  if (!isEmail(email)) return res.status(400).json({ message: 'ایمیل معتبر نیست.' });
  if (!db.subscribers.some((entry) => entry.email === email)) {
    db.subscribers.push({ email, createdAt: new Date().toISOString() });
    writeDb();
  }
  res.status(201).json({ ok: true });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {};
  if (!clean(name, 120) || !isEmail(email) || !clean(message, 1000)) {
    return res.status(400).json({ message: 'همهٔ فیلدها را کامل کنید.' });
  }
  db.messages.push({
    name: clean(name, 120),
    email: clean(email, 160),
    message: clean(message, 1000),
    createdAt: new Date().toISOString(),
  });
  writeDb();
  res.status(201).json({ ok: true });
});

// Keep a tiny in-memory catalogue endpoint so the API is useful on its own.
app.get('/api/products', (_req, res) => {
  res.json(Object.values(productsById));
});

app.use((_req, res) => res.status(404).json({ message: 'مسیر پیدا نشد.' }));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`velora api listening on ${PORT}`);
});
