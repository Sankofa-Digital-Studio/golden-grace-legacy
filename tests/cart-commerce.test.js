import test from 'node:test';
import assert from 'node:assert/strict';

test('cart commerce: subtotal, shipping, and free courier goal gradient', () => {
  const FREE_SHIPPING_THRESHOLD = 500;
  const STANDARD_SHIPPING = 75;

  const calculateCartSummary = (items) => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0 ? 0 : STANDARD_SHIPPING;
    const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
    const freeShippingPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
    const total = subtotal + shipping;

    return {
      subtotal,
      shipping,
      amountToFreeShipping,
      freeShippingPercent,
      total,
      hasFreeCourier: shipping === 0 && items.length > 0,
    };
  };

  // Case 1: Empty cart
  const emptySummary = calculateCartSummary([]);
  assert.equal(emptySummary.subtotal, 0);
  assert.equal(emptySummary.shipping, 0);
  assert.equal(emptySummary.total, 0);
  assert.equal(emptySummary.hasFreeCourier, false);

  // Case 2: Under threshold (e.g. 1 jar R145)
  const underThreshold = calculateCartSummary([
    { id: 'aloe', title: 'Aloe Ferox Reserve', price: 145, quantity: 1, selectedSize: '375g' },
  ]);
  assert.equal(underThreshold.subtotal, 145);
  assert.equal(underThreshold.shipping, 75);
  assert.equal(underThreshold.amountToFreeShipping, 355);
  assert.equal(underThreshold.freeShippingPercent, 29);
  assert.equal(underThreshold.total, 220);
  assert.equal(underThreshold.hasFreeCourier, false);

  // Case 3: Exactly at threshold (R500)
  const atThreshold = calculateCartSummary([
    { id: 'gift-suite', title: 'The Legacy Gift Suite', price: 250, quantity: 2, selectedSize: 'Set' },
  ]);
  assert.equal(atThreshold.subtotal, 500);
  assert.equal(atThreshold.shipping, 0);
  assert.equal(atThreshold.amountToFreeShipping, 0);
  assert.equal(atThreshold.freeShippingPercent, 100);
  assert.equal(atThreshold.total, 500);
  assert.equal(atThreshold.hasFreeCourier, true);

  // Case 4: Over threshold (R635)
  const overThreshold = calculateCartSummary([
    { id: 'aloe', title: 'Aloe Ferox Reserve', price: 145, quantity: 3, selectedSize: '500g' },
    { id: 'cosmos', title: 'Highland Cosmos', price: 200, quantity: 1, selectedSize: '500g' },
  ]);
  assert.equal(overThreshold.subtotal, 635);
  assert.equal(overThreshold.shipping, 0);
  assert.equal(overThreshold.total, 635);
  assert.equal(overThreshold.hasFreeCourier, true);
});

test('cart state: quantity modifications and removal logic', () => {
  const addItem = (cart, newItem) => {
    const existingIndex = cart.findIndex(
      (item) => item.id === newItem.id && item.selectedSize === newItem.selectedSize
    );
    if (existingIndex > -1) {
      return cart.map((item, idx) =>
        idx === existingIndex ? { ...item, quantity: item.quantity + (newItem.quantity || 1) } : item
      );
    }
    return [...cart, { ...newItem, quantity: newItem.quantity || 1 }];
  };

  const updateQuantity = (cart, id, selectedSize, newQty) => {
    if (newQty <= 0) {
      return cart.filter((item) => !(item.id === id && item.selectedSize === selectedSize));
    }
    return cart.map((item) =>
      item.id === id && item.selectedSize === selectedSize ? { ...item, quantity: newQty } : item
    );
  };

  let cart = [];
  cart = addItem(cart, { id: 'aloe', title: 'Aloe', price: 145, selectedSize: '500g' });
  assert.equal(cart.length, 1);
  assert.equal(cart[0].quantity, 1);

  // Add same item again -> increments quantity
  cart = addItem(cart, { id: 'aloe', title: 'Aloe', price: 145, selectedSize: '500g' });
  assert.equal(cart.length, 1);
  assert.equal(cart[0].quantity, 2);

  // Add same product in different size -> creates new line item
  cart = addItem(cart, { id: 'aloe', title: 'Aloe', price: 110, selectedSize: '375g' });
  assert.equal(cart.length, 2);

  // Decrement to 1
  cart = updateQuantity(cart, 'aloe', '500g', 1);
  assert.equal(cart.find((i) => i.selectedSize === '500g').quantity, 1);

  // Decrement to 0 -> removes item
  cart = updateQuantity(cart, 'aloe', '500g', 0);
  assert.equal(cart.length, 1);
  assert.equal(cart[0].selectedSize, '375g');
});
