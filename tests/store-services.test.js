import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  isValidSAPhone,
  isValidEmail,
  validateOrderItem,
  validateOrderPayload,
  validateWaitlistPayload,
  validateCorporateInquiryPayload,
  generateOrderReference,
} from '../src/services/contracts.js';
import { StoreApiService, storeApi } from '../src/services/store-api.js';

describe('Store Contracts & Validation Schemas', () => {
  it('validates South African mobile numbers correctly', () => {
    // Valid formats
    assert.equal(isValidSAPhone('0821234567'), true);
    assert.equal(isValidSAPhone('+27821234567'), true);
    assert.equal(isValidSAPhone('27821234567'), true);
    assert.equal(isValidSAPhone('071 234 5678'), true);
    assert.equal(isValidSAPhone('+27 (83) 987-6543'), true);
    assert.equal(isValidSAPhone('0651112233'), true);

    // Invalid formats
    assert.equal(isValidSAPhone(''), false);
    assert.equal(isValidSAPhone(null), false);
    assert.equal(isValidSAPhone(undefined), false);
    assert.equal(isValidSAPhone('0112345678'), false); // Landline prefix 01
    assert.equal(isValidSAPhone('12345'), false);
    assert.equal(isValidSAPhone('+12025550199'), false); // US number
    assert.equal(isValidSAPhone(123456789), false);
  });

  it('validates email addresses properly', () => {
    assert.equal(isValidEmail('info@goldengracelegacy.co.za'), true);
    assert.equal(isValidEmail('grace@goldengracelegacy.co.za'), true);
    assert.equal(isValidEmail('customer.name+tag@domain.com'), true);

    assert.equal(isValidEmail(''), false);
    assert.equal(isValidEmail(null), false);
    assert.equal(isValidEmail('not-an-email'), false);
    assert.equal(isValidEmail('missing@domain'), false);
    assert.equal(isValidEmail('@nodomain.com'), false);
    assert.equal(isValidEmail(123), false);
  });

  it('validates order items according to contract', () => {
    // Null/undefined object
    assert.equal(validateOrderItem(null).valid, false);
    assert.equal(validateOrderItem(123).valid, false);

    // Missing fields
    const invalidItem = {
      productId: '',
      title: '',
      price: -10,
      quantity: 0,
      size: '',
    };
    const check1 = validateOrderItem(invalidItem);
    assert.equal(check1.valid, false);
    assert.equal(check1.errors.length >= 4, true);

    // Valid item
    const validItem = {
      productId: 'premium-hex-aloe',
      title: 'Aloe Ferox Reserve',
      price: 145,
      quantity: 2,
      size: '375g',
    };
    const check2 = validateOrderItem(validItem);
    assert.equal(check2.valid, true);
    assert.equal(check2.errors.length, 0);
  });

  it('validates order creation payload', () => {
    // Invalid object
    assert.equal(validateOrderPayload(null).valid, false);

    // Invalid email & empty items
    const invalidOrder = {
      email: 'notanemail',
      customerPhone: '0111234567', // invalid mobile
      items: [],
      total: -50,
    };
    const check1 = validateOrderPayload(invalidOrder);
    assert.equal(check1.valid, false);
    assert.equal(check1.errors.length >= 3, true);

    // Invalid item within array
    const orderWithBadItem = {
      email: 'customer@example.co.za',
      customerPhone: '0821234567',
      items: [{ productId: 'test', title: '' }],
      total: 100,
    };
    assert.equal(validateOrderPayload(orderWithBadItem).valid, false);

    // Valid order payload
    const validOrder = {
      email: 'customer@example.co.za',
      customerPhone: '0821234567',
      items: [
        {
          productId: 'premium-hex-aloe',
          title: 'Aloe Ferox Reserve',
          price: 145,
          quantity: 1,
          size: '375g',
        },
      ],
      total: 145,
    };
    const check2 = validateOrderPayload(validOrder);
    assert.equal(check2.valid, true);
    assert.equal(check2.errors.length, 0);
  });

  it('validates waitlist pre-order leads', () => {
    assert.equal(validateWaitlistPayload(null).valid, false);

    const invalid = {
      productId: '',
      email: 'bademail',
      phone: '12345',
    };
    const check1 = validateWaitlistPayload(invalid);
    assert.equal(check1.valid, false);

    const valid = {
      productId: 'premium-hex-cosmos',
      email: 'lead@domain.co.za',
      phone: '0821234567',
    };
    const check2 = validateWaitlistPayload(valid);
    assert.equal(check2.valid, true);
  });

  it('validates corporate gifting inquiry requests', () => {
    assert.equal(validateCorporateInquiryPayload(null).valid, false);

    const invalid = {
      companyName: '',
      contactName: '',
      email: 'invalid',
      phone: '000',
      estimatedUnits: 0,
    };
    const check1 = validateCorporateInquiryPayload(invalid);
    assert.equal(check1.valid, false);
    assert.equal(check1.errors.length >= 4, true);

    const valid = {
      companyName: 'Anglo Gold Ashanti Welkom',
      contactName: 'Lerato Khumalo',
      email: 'lerato@anglogold.co.za',
      phone: '0831234567',
      estimatedUnits: 50,
      tier: 'executive_suites',
    };
    const check2 = validateCorporateInquiryPayload(valid);
    assert.equal(check2.valid, true);
  });

  it('generates predictable and unique sovereign order references', () => {
    const customDate = new Date(Date.UTC(2026, 9, 27)); // Oct 27, 2026
    const ref = generateOrderReference(customDate, 4821);
    assert.equal(ref, 'GG-20261027-4821');

    const dynamicRef = generateOrderReference();
    assert.match(dynamicRef, /^GG-\d{8}-\d{4}$/);
  });
});

describe('StoreApiService Universal Client', () => {
  it('retrieves all products and filters by category', async () => {
    const service = new StoreApiService();
    const allProducts = await service.getProducts();
    assert.equal(Array.isArray(allProducts), true);
    assert.equal(allProducts.length >= 4, true);

    const jars = await service.getProducts({ category: 'The Jars' });
    assert.equal(jars.length >= 2, true);
    jars.forEach((item) => assert.equal(item.category, 'The Jars'));

    const allExplicit = await service.getProducts({ category: 'all' });
    assert.equal(allExplicit.length, allProducts.length);
  });

  it('finds single product by ID or returns null for invalid ID', async () => {
    const service = new StoreApiService();
    const aloe = await service.getProductById('premium-hex-aloe');
    assert.notEqual(aloe, null);
    assert.equal(aloe.title, 'Aloe Ferox Reserve');

    const missing = await service.getProductById('non-existent-product');
    assert.equal(missing, null);
  });

  it('computes real-time batch scarcity metrics and low-stock alarms', async () => {
    const service = new StoreApiService();
    const scarcity = await service.getBatchScarcity('premium-hex-cosmos');
    assert.notEqual(scarcity, null);
    assert.equal(typeof scarcity.remainingJars, 'number');
    assert.equal(typeof scarcity.totalBatchJars, 'number');
    assert.equal(typeof scarcity.percentDepleted, 'number');
    assert.equal(scarcity.percentDepleted >= 0, true);
    assert.equal(scarcity.isLowStock, true); // 19 jars <= 20 threshold

    const nonExistent = await service.getBatchScarcity('non-existent-product');
    assert.equal(nonExistent, null);
  });

  it('processes orders and decrements batch inventory', async () => {
    const service = new StoreApiService();
    const productBefore = await service.getProductById('premium-hex-aloe');
    const initialRemaining = productBefore.remainingJars;

    // Fail case
    const failedResult = await service.createOrder({ invalid: true });
    assert.equal(failedResult.success, false);

    // Success case
    const orderResult = await service.createOrder({
      email: 'client@domain.co.za',
      customerPhone: '0821234567',
      items: [
        {
          productId: 'premium-hex-aloe',
          title: 'Aloe Ferox Reserve',
          price: 145,
          quantity: 2,
          size: '375g',
        },
      ],
      total: 290,
    });

    assert.equal(orderResult.success, true);
    assert.match(orderResult.orderReference, /^GG-\d{8}-\d{4}$/);

    // Verify inventory decremented
    const productAfter = await service.getProductById('premium-hex-aloe');
    assert.equal(productAfter.remainingJars, initialRemaining - 2);
  });

  it('submits waitlist leads for seasonal blooms', async () => {
    const service = new StoreApiService();
    const fail = await service.submitWaitlistLead({});
    assert.equal(fail.success, false);

    const success = await service.submitWaitlistLead({
      productId: 'premium-hex-cosmos',
      email: 'cosmos@reserve.co.za',
    });
    assert.equal(success.success, true);
  });

  it('submits corporate bespoke gifting inquiries', async () => {
    const service = new StoreApiService();
    const fail = await service.submitCorporateInquiry({});
    assert.equal(fail.success, false);

    const success = await service.submitCorporateInquiry({
      companyName: 'Standard Bank Wealth',
      contactName: 'Nandi Sithole',
      email: 'nandi@standardbank.co.za',
      phone: '0823334444',
      estimatedUnits: 120,
    });
    assert.equal(success.success, true);
    assert.match(success.inquiryReference, /^CORP-\d{4}-\d{4}$/);
  });

  it('exports singleton storeApi instance', () => {
    assert.notEqual(storeApi, null);
    assert.equal(typeof storeApi.getProducts, 'function');
  });

  it('persists orders, waitlist leads, and corporate inquiries to localStorage in browser environments', async () => {
    const originalWindow = globalThis.window;
    const store = new Map();
    globalThis.window = {
      localStorage: {
        getItem: (k) => store.get(k) || null,
        setItem: (k, v) => store.set(k, v),
      },
    };

    try {
      const service = new StoreApiService();
      const orderRes = await service.createOrder({
        email: 'mock@browser.co.za',
        customerPhone: '0829998888',
        items: [
          {
            productId: 'daily-squeeze-wild',
            title: 'Veld Wildflower',
            price: 95,
            quantity: 1,
            size: '500g',
          },
        ],
        total: 95,
      });
      assert.equal(orderRes.success, true);
      assert.equal(store.has('gg_local_orders'), true);

      const waitlistRes = await service.submitWaitlistLead({
        productId: 'premium-hex-cosmos',
        email: 'waitlist@browser.co.za',
      });
      assert.equal(waitlistRes.success, true);
      assert.equal(store.has('gg_waitlist_leads'), true);

      const corpRes = await service.submitCorporateInquiry({
        companyName: 'Browser Corp',
        contactName: 'Jane Doe',
        email: 'jane@browsercorp.co.za',
        phone: '0831112222',
        estimatedUnits: 30,
      });
      assert.equal(corpRes.success, true);
      assert.equal(store.has('gg_corporate_inquiries'), true);
    } finally {
      globalThis.window = originalWindow;
    }
  });
});
