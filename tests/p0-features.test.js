import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildPostCheckoutWhatsAppUrl,
  openPaystackCheckout,
  loadPaystackScript,
} from '../src/utils/paystack.js';
import { PRODUCTS } from '../src/data/catalog.js';

test('P0 Task 1 & 5: Paystack post-checkout WhatsApp URL builder with email and items', () => {
  const url = buildPostCheckoutWhatsAppUrl({
    orderRef: 'GG-1718000000-123',
    total: 240,
    items: [
      { id: 'bundle-discovery-duo', title: 'The Terroir Discovery Duo', selectedSize: '375g + 500g', quantity: 1 },
    ],
    email: 'thosontula@gmail.com',
  });

  assert.ok(url.startsWith('https://wa.me/27794301648?text='));
  assert.ok(url.includes('GG-1718000000-123'));
  assert.ok(url.includes('PAID%20VIA%20PAYSTACK'));
  assert.ok(url.includes('thosontula%40gmail.com'));
});

test('P0 Task 1 & 5: Paystack post-checkout WhatsApp URL builder without email and default empty items', () => {
  const url = buildPostCheckoutWhatsAppUrl({
    orderRef: 'GG-999',
    total: 145,
  });

  assert.ok(url.includes('GG-999'));
  assert.ok(!url.includes('Account:'));
});

test('P0 Task 1: Paystack script loader returns false in headless SSR environment', async () => {
  const loaded = await loadPaystackScript();
  assert.equal(loaded, false);
});

test('P0 Task 1: Paystack simulated checkout fallback in Node/dev environment (success path)', async () => {
  let paymentResult = null;

  await openPaystackCheckout({
    email: 'buyer@goldengracelegacy.co.za',
    amountInRands: 385,
    items: [{ id: 'premium-hex-aloe', title: 'Aloe Ferox Reserve', quantity: 2, price: 145 }],
    onSuccess: (res) => {
      paymentResult = res;
    },
  });

  assert.ok(paymentResult, 'Payment result should not be null');
  assert.equal(paymentResult.status, 'success');
  assert.equal(paymentResult.amount, 385);
  assert.ok(paymentResult.reference.startsWith('GG-'));
});

test('P0 Task 1: Paystack simulated checkout fallback when window.confirm returns false', async () => {
  let cancelled = false;
  // Mock window.confirm
  global.window = {
    confirm: () => false,
  };

  try {
    await openPaystackCheckout({
      email: 'canceller@goldengracelegacy.co.za',
      amountInRands: 145,
      items: [],
      onSuccess: () => {},
      onClose: () => {
        cancelled = true;
      },
    });
    assert.equal(cancelled, true);
  } finally {
    delete global.window;
  }
});

test('P0 Task 1: Paystack script loader when window.PaystackPop already exists', async () => {
  global.window = {
    PaystackPop: {},
  };

  try {
    const result = await loadPaystackScript();
    assert.equal(result, true);
  } finally {
    delete global.window;
  }
});

test('P0 Task 1: Paystack script loader DOM insertion and onload trigger', async () => {
  let appended = false;
  global.window = {};
  global.document = {
    createElement: () => ({
      set onload(fn) {
        this._onload = fn;
      },
      get onload() {
        return this._onload;
      },
      set onerror(fn) {
        this._onerror = fn;
      },
    }),
    body: {
      appendChild: (el) => {
        appended = true;
        el._onload?.();
      },
    },
  };

  try {
    const result = await loadPaystackScript();
    assert.equal(result, true);
    assert.equal(appended, true);
  } finally {
    delete global.window;
    delete global.document;
  }
});

test('P0 Task 1: Paystack script loader onerror fallback', async () => {
  global.window = {};
  global.document = {
    createElement: () => ({
      set onload(fn) {
        this._onload = fn;
      },
      set onerror(fn) {
        this._onerror = fn;
      },
      get onerror() {
        return this._onerror;
      },
    }),
    body: {
      appendChild: (el) => {
        el._onerror?.();
      },
    },
  };

  try {
    const result = await loadPaystackScript();
    assert.equal(result, false);
  } finally {
    delete global.window;
    delete global.document;
  }
});

test('P0 Task 1: Paystack real iframe popup setup and callback handling', async () => {
  let iframeOpened = false;
  let successReported = null;
  let closeReported = false;

  let capturedCallback = null;
  let capturedClose = null;

  global.window = {
    PaystackPop: {
      setup: (config) => {
        capturedCallback = config.callback;
        capturedClose = config.onClose;
        return {
          openIframe: () => {
            iframeOpened = true;
          },
        };
      },
    },
  };

  // Mock custom public key
  const originalEnv = process.env.VITE_PAYSTACK_PUBLIC_KEY;
  process.env.VITE_PAYSTACK_PUBLIC_KEY = 'pk_live_custom_sample';

  try {
    await openPaystackCheckout({
      email: 'patron@goldengracelegacy.co.za',
      amountInRands: 240,
      phone: '0791234567',
      items: [{ id: 'bundle-discovery-duo', title: 'The Terroir Discovery Duo', quantity: 1, selectedSize: '375g', price: 240 }],
      onSuccess: (res) => {
        successReported = res;
      },
      onClose: () => {
        closeReported = true;
      },
    });

    assert.equal(iframeOpened, true);
    capturedCallback?.({ reference: 'GG-LIVE-1234' });
    assert.equal(successReported?.reference, 'GG-LIVE-1234');
    assert.equal(successReported?.status, 'success');

    capturedClose?.();
    assert.equal(closeReported, true);
  } finally {
    delete global.window;
    process.env.VITE_PAYSTACK_PUBLIC_KEY = originalEnv;
  }
});

test('P0 Task 6: Free State Terroir Sampling Duo Starter Bundle schema and pricing', () => {
  const duo = PRODUCTS.find((p) => p.id === 'bundle-discovery-duo');
  assert.ok(duo, 'Discovery Duo must exist in catalog');
  assert.equal(duo.price, 240, 'Discovery Duo must be priced at R240');
  assert.equal(duo.originalPrice, 280, 'Discovery Duo should show R280 original price saving');
  assert.equal(duo.tag, 'Starter Bundle');
  assert.ok(duo.sizes.includes('375g + 500g'));
  assert.equal(duo.category, 'The Gift');
  assert.ok(duo.img, 'Image must be defined');
});

test('P0 Task 4: Dynamic batch scarcity metrics on products', () => {
  const aloe = PRODUCTS.find((p) => p.id === 'premium-hex-aloe');
  assert.ok(aloe);
  assert.equal(typeof aloe.remainingJars, 'number');
  assert.equal(typeof aloe.totalBatchJars, 'number');
  assert.ok(aloe.remainingJars <= aloe.totalBatchJars);
  assert.ok(aloe.harvestSeason);

  const cosmos = PRODUCTS.find((p) => p.id === 'premium-hex-cosmos');
  assert.ok(cosmos);
  assert.equal(cosmos.remainingJars, 19);
  assert.equal(cosmos.tag, 'Limited Harvest');
});
