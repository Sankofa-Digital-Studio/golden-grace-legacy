import test from 'node:test';
import assert from 'node:assert/strict';
import { VIEWS } from '../src/views.js';
import {
  MAINTENANCE_MODE,
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY,
  PRIMARY_DOMAIN,
  BRAND_DOMAINS,
  INFO_EMAIL,
  GRACE_EMAIL,
} from '../src/config/maintenance.js';

test('views: exports valid application routes', () => {
  assert.equal(VIEWS.HOME, 'home');
  assert.equal(VIEWS.STORY, 'full-story');
  assert.equal(VIEWS.EDUCATION, 'education');
  assert.equal(VIEWS.GIFTS, 'gifts');

  const values = Object.values(VIEWS);
  assert.equal(values.length, 4);
  assert.ok(values.includes('home'));
  assert.ok(values.includes('full-story'));
  assert.ok(values.includes('education'));
  assert.ok(values.includes('gifts'));
});

test('config: maintenance and contact configuration integrity', () => {
  // Maintenance must be false for production launch
  assert.equal(MAINTENANCE_MODE, false);

  // WhatsApp concierge format (South African international format, no spaces, no plus)
  assert.match(WHATSAPP_NUMBER, /^27\d{9}$/);
  assert.ok(WHATSAPP_DISPLAY.includes('+27'));

  // Official domains
  assert.equal(PRIMARY_DOMAIN, 'goldenlegacy.co.za');
  assert.ok(BRAND_DOMAINS.includes('goldenlegacy.co.za'));
  assert.ok(BRAND_DOMAINS.includes('goldengracelegacy.co.za'));

  // Official email addresses
  assert.match(INFO_EMAIL, /@goldengracelegacy\.co\.za$/);
  assert.match(GRACE_EMAIL, /@goldengracelegacy\.co\.za$/);
});
