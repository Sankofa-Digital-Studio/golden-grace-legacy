import test from 'node:test';
import assert from 'node:assert/strict';
import { VIEWS } from '../src/views.js';
import { PRODUCTS, CERTS_DATA } from '../src/data/catalog.js';
import { buildWhatsAppOrderUrl } from '../src/utils/whatsapp-order.js';
import { shouldDisableAutoplay } from '../src/utils/media-gating.js';
import { WHATSAPP_NUMBER } from '../src/config/maintenance.js';

test('E2E simulated journey: First-time visitor discovery to WhatsApp order generation', () => {
  // Step 1: User lands on Storefront (VIEWS.HOME) on mobile device
  let currentView = VIEWS.HOME;
  let scrollTarget = null;
  const navigate = (nextView, opts = {}) => {
    currentView = nextView;
    scrollTarget = opts.scrollTo || null;
  };

  assert.equal(currentView, 'home');

  // Verify media gating kicks in for mobile user (viewport 390px)
  const isMobileAutoplayDisabled = shouldDisableAutoplay({
    innerWidth: 390,
    connection: { effectiveType: '4g', saveData: false },
  });
  assert.equal(isMobileAutoplayDisabled, true); // Protected mobile data

  // Step 2: User reads Hero, clicks "The Founder's Calling" -> scrolls to 'our-story'
  navigate(VIEWS.HOME, { scrollTo: 'our-story' });
  assert.equal(currentView, 'home');
  assert.equal(scrollTarget, 'our-story');

  // Step 3: User clicks TrustBar DALRRD cert to inspect legal provenance
  const dfsCert = CERTS_DATA.find((c) => c.id === 'agri');
  assert.ok(dfsCert);
  assert.equal(dfsCert.tag, 'Total Traceability');
  assert.ok(dfsCert.consumerBenefit.includes('single-origin raw South African honey'));

  // Step 4: User clicks "Shop Certified Harvest" in modal -> scrolls to 'collection'
  navigate(VIEWS.HOME, { scrollTo: 'collection' });
  assert.equal(scrollTarget, 'collection');

  // Step 5: User browses Collection and adds 2 x Aloe Ferox Reserve (500g) + 1 x Veld Wildflower Squeeze
  const aloeProduct = PRODUCTS.find((p) => p.id === 'premium-hex-aloe');
  const wildflowerProduct = PRODUCTS.find((p) => p.id === 'daily-squeeze-wild');

  assert.ok(aloeProduct);
  assert.ok(wildflowerProduct);

  const cart = [
    {
      id: aloeProduct.id,
      title: aloeProduct.title,
      price: aloeProduct.price,
      selectedSize: '500g',
      vessel: aloeProduct.vessel,
      quantity: 2,
    },
    {
      id: wildflowerProduct.id,
      title: wildflowerProduct.title,
      price: wildflowerProduct.price,
      selectedSize: '500g',
      vessel: wildflowerProduct.vessel,
      quantity: 1,
    },
  ];

  // Subtotal = (145 * 2) + (95 * 1) = 290 + 95 = 385
  const subtotal = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);
  assert.equal(subtotal, 385);

  // Under R500 threshold: Shipping is R75
  const shipping = subtotal >= 500 ? 0 : 75;
  assert.equal(shipping, 75);
  const total = subtotal + shipping;
  assert.equal(total, 460);

  // Step 6: User clicks "Order on WhatsApp" -> generates formatted wa.me payload
  const waUrl = buildWhatsAppOrderUrl({
    number: WHATSAPP_NUMBER,
    cartItems: cart,
    shipping,
    total,
  });

  assert.ok(waUrl.startsWith('https://wa.me/27794301648?text='));
  const decodedText = decodeURIComponent(waUrl.replace('https://wa.me/27794301648?text=', ''));

  assert.ok(decodedText.includes('Hi Golden Grace Honey'));
  assert.ok(decodedText.includes('Aloe Ferox Reserve — 500g × 2'));
  assert.ok(decodedText.includes('Veld Wildflower — 500g × 1'));
  assert.ok(decodedText.includes('Shipping: R75'));
  assert.ok(decodedText.includes('Estimated total: R460'));
  assert.ok(decodedText.includes('Please confirm availability'));

  // Step 7: User navigates to full Story page
  navigate(VIEWS.STORY);
  assert.equal(currentView, 'full-story');

  // Step 8: User uses backward navigation button on Story page
  navigate(VIEWS.HOME);
  assert.equal(currentView, 'home');

  // Step 9: User navigates to Education Hub
  navigate(VIEWS.EDUCATION);
  assert.equal(currentView, 'education');

  // Step 10: User uses backward navigation button on Education Hub
  navigate(VIEWS.HOME);
  assert.equal(currentView, 'home');

  // Step 11: User navigates to Bespoke Gifting page
  navigate(VIEWS.GIFTS);
  assert.equal(currentView, 'gifts');

  // Step 12: User uses backward navigation button on Gifting page
  navigate(VIEWS.HOME);
  assert.equal(currentView, 'home');
});
