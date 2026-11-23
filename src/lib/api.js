async function request(path, options = {}) {
  const response = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'ارتباط با سرور برقرار نشد. دوباره تلاش کنید.');
  }
  return data;
}

export const createOrder = (payload) =>
  request('/api/orders', { method: 'POST', body: JSON.stringify(payload) });

export const getOrder = (code) => request(`/api/orders/${encodeURIComponent(code)}`);

export const subscribe = (email) =>
  request('/api/newsletter', { method: 'POST', body: JSON.stringify({ email }) });

export const sendMessage = (payload) =>
  request('/api/contact', { method: 'POST', body: JSON.stringify(payload) });
