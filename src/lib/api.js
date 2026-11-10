const BASE = '/api';

async function request(path, { method = 'GET', body, signal } = {}) {
  const response = await fetch(`${BASE}${path}`, {
    method,
    signal,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const error = new Error(payload?.message || 'ارتباط با سرور برقرار نشد.');
    error.status = response.status;
    throw error;
  }

  return payload;
}

export const api = {
  createOrder: (payload) => request('/orders', { method: 'POST', body: payload }),
  getOrder: (code) => request(`/orders/${encodeURIComponent(code)}`),
  validateCoupon: (code) => request('/coupon', { method: 'POST', body: { code } }),
  getReviews: (productId, signal) => request(`/products/${productId}/reviews`, { signal }),
  addReview: (productId, payload) =>
    request(`/products/${productId}/reviews`, { method: 'POST', body: payload }),
  subscribe: (email) => request('/newsletter', { method: 'POST', body: { email } }),
  contact: (payload) => request('/contact', { method: 'POST', body: payload }),
};
