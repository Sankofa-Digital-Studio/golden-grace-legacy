import test from 'node:test';
import assert from 'node:assert/strict';
import { VIEWS } from '../src/views.js';

test('navigation logic: valid views validation', () => {
  const validViews = new Set(Object.values(VIEWS));
  assert.equal(validViews.has('home'), true);
  assert.equal(validViews.has('full-story'), true);
  assert.equal(validViews.has('education'), true);
  assert.equal(validViews.has('gifts'), true);
  assert.equal(validViews.has('non-existent'), false);
  assert.equal(validViews.has(''), false);
});

test('navigation logic: URL hash parser and fallback simulation', () => {
  const validViews = new Set(Object.values(VIEWS));

  const parseHash = (hashString, defaultView = VIEWS.HOME) => {
    if (!hashString) return defaultView;
    const cleaned = hashString.replace(/^#/, '');
    return validViews.has(cleaned) ? cleaned : defaultView;
  };

  assert.equal(parseHash('#full-story'), VIEWS.STORY);
  assert.equal(parseHash('#education'), VIEWS.EDUCATION);
  assert.equal(parseHash('#gifts'), VIEWS.GIFTS);
  assert.equal(parseHash('#home'), VIEWS.HOME);
  assert.equal(parseHash('#unknown-path'), VIEWS.HOME);
  assert.equal(parseHash(''), VIEWS.HOME);
  assert.equal(parseHash(null), VIEWS.HOME);
});

test('navigation logic: transition duration gating', () => {
  const shouldTransition = (targetView, currentView, transitionMs) => {
    if (targetView === currentView) return false;
    return transitionMs > 0;
  };

  assert.equal(shouldTransition('full-story', 'home', 250), true);
  assert.equal(shouldTransition('home', 'home', 250), false);
  assert.equal(shouldTransition('education', 'home', 0), false);
  assert.equal(shouldTransition('gifts', 'home', -10), false);
});

test('navigation logic: history URL generator', () => {
  const generateUrl = (pathname, search, nextView) => {
    const hash = nextView === VIEWS.HOME ? '' : `#${nextView}`;
    return `${pathname}${search}${hash}`;
  };

  assert.equal(generateUrl('/', '', VIEWS.HOME), '/');
  assert.equal(generateUrl('/', '', VIEWS.STORY), '/#full-story');
  assert.equal(generateUrl('/store', '?ref=insta', VIEWS.GIFTS), '/store?ref=insta#gifts');
});
