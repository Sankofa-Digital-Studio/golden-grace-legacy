import test from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS } from '../src/data/catalog.js';
import { SHOP_PRODUCTS, resolveProductOption, matchesCategory } from '../src/data/shop-products.js';
import { buildWhatsAppOrderMessage } from '../src/utils/whatsapp-order.js';

test('one card represents every pure honey size with its original price and SKU', () => {
  const card = SHOP_PRODUCTS.find((p) => p.id === 'pure-honey');
  const originals = PRODUCTS.filter((p) => p.id.startsWith('pure-honey-'));
  assert.equal(SHOP_PRODUCTS.filter((p) => p.title === 'Pure Honey').length, 1);
  assert.equal(card.sizes.length, originals.length);
  for (const original of originals) {
    const selected = resolveProductOption(card, original.sizes[0]);
    assert.equal(selected.id, original.id);
    assert.equal(selected.price, original.price);
    assert.equal(selected.vessel, original.vessel);
    assert.equal(selected.selectedSize, original.sizes[0]);
  }
  assert.equal(resolveProductOption(card, '500g').price, 130);
  assert.equal(resolveProductOption(card, '1kg').price, 220);
  assert.ok(matchesCategory(card, 'The Squeeze'));
});

test('creamed and vitality sizes are grouped and all group sizes are unique', () => {
  for (const id of ['creamed-honey', 'vitality-blend']) {
    assert.equal(SHOP_PRODUCTS.filter((p) => p.id === id).length, 1);
  }
  for (const card of SHOP_PRODUCTS.filter((p) => p.options)) {
    assert.equal(new Set(card.sizes).size, card.sizes.length, card.id);
  }
  assert.equal(new Set(SHOP_PRODUCTS.map((p) => p.id)).size, SHOP_PRODUCTS.length);
});

test('specific cinnamon pricing wins over generic infusion price and flavours stay separate', () => {
  const cinnamon = SHOP_PRODUCTS.find((p) => p.id === 'cinnamon-infused');
  const garlic = SHOP_PRODUCTS.find((p) => p.id === 'garlic-infused');
  assert.equal(resolveProductOption(cinnamon, '175g').price, 95);
  assert.equal(resolveProductOption(garlic, '175g').price, 85);
  assert.notEqual(resolveProductOption(cinnamon, '40g').id, resolveProductOption(garlic, '40g').id);
  assert.throws(() => resolveProductOption(cinnamon, '999g'), RangeError);
});

test('selected prices survive order serialization and distinct sizes retain distinct IDs', () => {
  const card = SHOP_PRODUCTS.find((p) => p.id === 'pure-honey');
  const small = { ...resolveProductOption(card, '500g'), quantity: 2 };
  const large = { ...resolveProductOption(card, '1kg'), quantity: 1 };
  assert.notEqual(small.id, large.id);
  assert.equal(small.price * small.quantity + large.price, 480);
  assert.equal(small.selectedSize, '500g');
  assert.equal(large.selectedSize, '1kg');
  const message = buildWhatsAppOrderMessage({ cartItems: [small, large], shipping: 0, total: 480 });
  assert.match(message, /500g.*R260/);
  assert.match(message, /1kg.*R220/);
  assert.match(message, /R480/);
});
