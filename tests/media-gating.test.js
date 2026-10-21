import test from 'node:test';
import assert from 'node:assert/strict';
import { shouldDisableAutoplay } from '../src/utils/media-gating.js';

test('shouldDisableAutoplay: enables autoplay on desktop viewport with high-speed connection', () => {
  const fakeWin = {
    innerWidth: 1280,
    matchMedia: () => ({ matches: false }),
  };
  const fakeNav = {
    connection: {
      saveData: false,
      effectiveType: '4g',
    },
  };
  assert.equal(shouldDisableAutoplay(fakeWin, fakeNav), false);
});

test('shouldDisableAutoplay: disables autoplay on mobile viewport (< 768px)', () => {
  const mobileWin = {
    innerWidth: 390,
    matchMedia: () => ({ matches: false }),
  };
  const fakeNav = {
    connection: { saveData: false, effectiveType: '4g' },
  };
  assert.equal(shouldDisableAutoplay(mobileWin, fakeNav), true);
});

test('shouldDisableAutoplay: disables autoplay when prefers-reduced-motion is active', () => {
  const desktopWin = {
    innerWidth: 1440,
    matchMedia: (query) => ({
      matches: query.includes('prefers-reduced-motion: reduce'),
    }),
  };
  assert.equal(shouldDisableAutoplay(desktopWin, null), true);
});

test('shouldDisableAutoplay: disables autoplay when Data-Saver mode is enabled', () => {
  const desktopWin = {
    innerWidth: 1920,
    matchMedia: () => ({ matches: false }),
  };
  const dataSaverNav = {
    connection: { saveData: true, effectiveType: '4g' },
  };
  assert.equal(shouldDisableAutoplay(desktopWin, dataSaverNav), true);
});

test('shouldDisableAutoplay: disables autoplay on slow cellular connections (2g / 3g)', () => {
  const desktopWin = {
    innerWidth: 1024,
    matchMedia: () => ({ matches: false }),
  };
  for (const slowType of ['slow-2g', '2g', '3g']) {
    const slowNav = {
      connection: { saveData: false, effectiveType: slowType },
    };
    assert.equal(
      shouldDisableAutoplay(desktopWin, slowNav),
      true,
      `Failed to disable autoplay for ${slowType}`
    );
  }
});

test('shouldDisableAutoplay: handles mozConnection and webkitConnection fallbacks', () => {
  const desktopWin = {
    innerWidth: 1024,
    matchMedia: () => ({ matches: false }),
  };
  // mozConnection
  const mozNav = { mozConnection: { saveData: true } };
  assert.equal(shouldDisableAutoplay(desktopWin, mozNav), true);

  // webkitConnection
  const webkitNav = { webkitConnection: { effectiveType: '2g', saveData: false } };
  assert.equal(shouldDisableAutoplay(desktopWin, webkitNav), true);

  // nav with empty connection object
  const emptyNav = { connection: {} };
  assert.equal(shouldDisableAutoplay(desktopWin, emptyNav), false);

  // nav without any connection property
  const noConnNav = {};
  assert.equal(shouldDisableAutoplay(desktopWin, noConnNav), false);
});

test('shouldDisableAutoplay: handles missing matchMedia and edge-case innerWidth gracefully', () => {
  const noMatchMediaWin = {
    innerWidth: 1024,
  };
  assert.equal(shouldDisableAutoplay(noMatchMediaWin, null), false);

  const noInnerWidthWin = {
    matchMedia: () => ({ matches: false }),
  };
  assert.equal(shouldDisableAutoplay(noInnerWidthWin, null), false);
});

test('shouldDisableAutoplay: safely defaults to true during SSR (no window)', () => {
  assert.equal(shouldDisableAutoplay(null, null), true);
});
