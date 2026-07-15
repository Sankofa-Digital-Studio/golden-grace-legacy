import test from 'node:test';
import assert from 'node:assert/strict';
import { buildWhatsAppOrderMessage, buildWhatsAppOrderUrl } from '../src/utils/whatsapp-order.js';

const order = {
  cartItems: [{ title: 'Aloe Reserve', selectedSize: '375g', quantity: 2, price: 145 }],
  shipping: 75,
  total: 365,
};

test('builds an itemised WhatsApp order message', () => {
  const message = buildWhatsAppOrderMessage(order);
  assert.match(message, /Aloe Reserve — 375g × 2 \(R290\)/);
  assert.match(message, /Shipping: R75/);
  assert.match(message, /Estimated total: R365/);
  assert.match(message, /confirm availability/);
});

test('encodes the order and destination number in a wa.me URL', () => {
  const url = buildWhatsAppOrderUrl({ number: '27123456789', ...order });
  assert.equal(new URL(url).hostname, 'wa.me');
  assert.equal(new URL(url).pathname, '/27123456789');
  assert.match(decodeURIComponent(url), /Aloe Reserve/);
});
