import test from 'node:test';
import assert from 'node:assert/strict';

test('seo logic: formats title with sovereign brand identity', () => {
  const formatTitle = (pageTitle) => {
    const base = 'Golden Grace Legacy & Honey';
    return pageTitle ? `${pageTitle} | ${base}` : base;
  };

  assert.equal(formatTitle('Home'), 'Home | Golden Grace Legacy & Honey');
  assert.equal(formatTitle('Our Story'), 'Our Story | Golden Grace Legacy & Honey');
  assert.equal(formatTitle('Education Hub'), 'Education Hub | Golden Grace Legacy & Honey');
  assert.equal(formatTitle(''), 'Golden Grace Legacy & Honey');
  assert.equal(formatTitle(null), 'Golden Grace Legacy & Honey');
});

test('seo logic: meta description fallbacks', () => {
  const DEFAULT_DESCRIPTION =
    'Pure, unheated single-origin raw honey from Virginia, Free State. Stewarded by Golden Grace Legacy. Free State Apiary Registry DFS194.';

  const resolveDescription = (customDesc) => {
    return customDesc && customDesc.trim().length > 0 ? customDesc : DEFAULT_DESCRIPTION;
  };

  assert.equal(
    resolveDescription('Bespoke corporate honey suites and celebration hampers.'),
    'Bespoke corporate honey suites and celebration hampers.'
  );
  assert.equal(resolveDescription(''), DEFAULT_DESCRIPTION);
  assert.equal(resolveDescription('   '), DEFAULT_DESCRIPTION);
  assert.equal(resolveDescription(null), DEFAULT_DESCRIPTION);
});

test('analytics logic: event payload structure', () => {
  const createEventPayload = (eventName, properties = {}) => ({
    event: eventName,
    properties: {
      timestamp: new Date().toISOString(),
      platform: 'web',
      locale: 'en-ZA',
      ...properties,
    },
  });

  const payload = createEventPayload('product_added_to_cart', {
    productId: 'premium-hex-aloe',
    price: 145,
    size: '500g',
  });

  assert.equal(payload.event, 'product_added_to_cart');
  assert.equal(payload.properties.productId, 'premium-hex-aloe');
  assert.equal(payload.properties.price, 145);
  assert.equal(payload.properties.size, '500g');
  assert.equal(payload.properties.locale, 'en-ZA');
  assert.ok(payload.properties.timestamp);
});
