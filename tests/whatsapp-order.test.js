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

test('handles complimentary shipping accurately', () => {
  const freeShippingOrder = {
    cartItems: [{ title: 'Wildflower Blend', selectedSize: '500g', quantity: 1, price: 180 }],
    shipping: 0,
    total: 180,
  };
  const message = buildWhatsAppOrderMessage(freeShippingOrder);
  assert.match(message, /Shipping: Complimentary/);
  assert.match(message, /Estimated total: R180/);
});

test('correctly handles multi-item carts and special characters safely', () => {
  const multiOrder = {
    cartItems: [
      { title: 'Honey & Comb "Reserve"', selectedSize: '375g', quantity: 1, price: 210 },
      { title: 'Creamed Blossom', selectedSize: '250g', quantity: 3, price: 95 },
    ],
    shipping: 50,
    total: 545,
  };
  const url = buildWhatsAppOrderUrl({ number: '27662022100', ...multiOrder });
  const decoded = decodeURIComponent(url);
  assert.match(decoded, /1\. Honey & Comb "Reserve" — 375g × 1 \(R210\)/);
  assert.match(decoded, /2\. Creamed Blossom — 250g × 3 \(R285\)/);
  assert.match(decoded, /Estimated total: R545/);
});
