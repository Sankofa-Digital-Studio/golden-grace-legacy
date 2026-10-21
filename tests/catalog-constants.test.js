import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PRODUCTS,
  CATEGORY_IDS,
  CERTS_DATA,
  HONEY_TESTS_DATA,
  shortTestimonies,
  HERO_IMAGES,
  CONTACT_INFO,
  HARVEST_IMAGES,
  JOURNEY_IMAGES,
  JOURNEY_TECHNICAL_DATA,
  seasons,
  VIDEO_CHAPTERS,
  FORAGER_MESSAGES,
  flavorData,
} from '../src/data/catalog.js';

test('catalog: products schema and pricing validity', () => {
  assert.ok(Array.isArray(PRODUCTS));
  assert.ok(PRODUCTS.length >= 4);

  for (const product of PRODUCTS) {
    assert.ok(product.id, `Product missing id: ${JSON.stringify(product)}`);
    assert.ok(product.title, `Product missing title: ${product.id}`);
    assert.ok(typeof product.price === 'number' && product.price > 0, `Invalid price for ${product.id}`);
    assert.ok(Array.isArray(product.sizes) && product.sizes.length > 0, `Sizes missing for ${product.id}`);
    assert.ok(product.flora, `Flora missing for ${product.id}`);
    assert.ok(product.batch, `Batch identifier missing for ${product.id}`);
    assert.ok(product.vessel, `Vessel missing for ${product.id}`);
    assert.ok(product.img, `Image path missing for ${product.id}`);
    assert.ok(product.tasteNotes, `Taste notes missing for ${product.id}`);
  }
});

test('catalog: categories correctly categorize products', () => {
  assert.ok(Array.isArray(CATEGORY_IDS));
  assert.ok(CATEGORY_IDS.includes('all'));
  assert.ok(CATEGORY_IDS.includes('The Jars'));
  assert.ok(CATEGORY_IDS.includes('The Squeeze'));
  assert.ok(CATEGORY_IDS.includes('The Gift'));

  for (const product of PRODUCTS) {
    assert.ok(
      CATEGORY_IDS.includes(product.category),
      `Product ${product.id} has unmapped category: ${product.category}`
    );
  }
});

test('certifications: regulatory codes and consumer transparency', () => {
  assert.ok(Array.isArray(CERTS_DATA));
  assert.equal(CERTS_DATA.length, 5);

  const certIds = CERTS_DATA.map((c) => c.id);
  assert.ok(certIds.includes('agri'));
  assert.ok(certIds.includes('coa'));
  assert.ok(certIds.includes('bee'));
  assert.ok(certIds.includes('source'));
  assert.ok(certIds.includes('haacap'));

  for (const cert of CERTS_DATA) {
    assert.ok(cert.headline, `Missing headline on cert: ${cert.id}`);
    assert.ok(cert.consumerBenefit, `Missing consumerBenefit on cert: ${cert.id}`);
    assert.ok(cert.legacyStory, `Missing legacyStory on cert: ${cert.id}`);
  }

  // Verify DFS194 DALRRD registration is explicitly declared
  const agriCert = CERTS_DATA.find((c) => c.id === 'agri');
  assert.ok(agriCert.headline.includes('DFS194'));
});

test('authenticity: 3 empirical honey tests exist with clear instructions', () => {
  assert.ok(Array.isArray(HONEY_TESTS_DATA));
  assert.equal(HONEY_TESTS_DATA.length, 3);

  const titles = HONEY_TESTS_DATA.map((t) => t.title);
  assert.ok(titles.includes('The Thumb Test'));
  assert.ok(titles.includes('The Water Test'));
  assert.ok(titles.includes('The Heat Test'));

  for (const testItem of HONEY_TESTS_DATA) {
    assert.ok(testItem.instruction);
    assert.ok(testItem.result);
  }
});

test('harvest imagery and journey technical data categories', () => {
  assert.equal(HARVEST_IMAGES.length, 25);
  const categories = new Set(HARVEST_IMAGES.map((img) => img.category));
  assert.ok(categories.has('Forage'));
  assert.ok(categories.has('Extraction'));
  assert.ok(categories.has('Final Product'));

  assert.equal(JOURNEY_IMAGES.length, 3);
  const journeyCats = new Set(JOURNEY_IMAGES.map((j) => j.category));
  assert.ok(journeyCats.has('Forage'));
  assert.ok(journeyCats.has('Extraction'));
  assert.ok(journeyCats.has('Final Product'));

  assert.ok(JOURNEY_TECHNICAL_DATA.forage);
  assert.ok(JOURNEY_TECHNICAL_DATA.architecture);
  assert.ok(JOURNEY_TECHNICAL_DATA.extraction);

  assert.equal(seasons.length, 4);
  assert.equal(VIDEO_CHAPTERS.length, 4);
  assert.equal(FORAGER_MESSAGES.length, 5);
  assert.equal(flavorData.length, 5);
});

test('media & testimonies: hero imagery and social proof verification', () => {
  assert.ok(Array.isArray(shortTestimonies) && shortTestimonies.length >= 4);
  assert.ok(Array.isArray(HERO_IMAGES) && HERO_IMAGES.length === 4);
  assert.equal(CONTACT_INFO.domain, 'goldenlegacy.co.za');
});
