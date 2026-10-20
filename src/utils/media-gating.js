/**
 * Evaluates whether heavy background media autoplay (such as the 25MB harvest loop)
 * should be suppressed to conserve cellular data, battery, and respect user accessibility preferences.
 *
 * @param {Window|null} win - Window object (defaults to global window if available)
 * @param {Navigator|null} nav - Navigator object (defaults to global navigator if available)
 * @returns {boolean} True if autoplay should be disabled, false if eligible
 */
export const shouldDisableAutoplay = (
  win = typeof window !== 'undefined' ? window : null,
  nav = typeof navigator !== 'undefined' ? navigator : null
) => {
  // 1. SSR / Non-browser environment guard: safe default
  if (!win) return true;

  // 2. Viewport budget constraint: Mobile devices smaller than tablet (< 768px) must never autoplay video
  if (typeof win.innerWidth === 'number' && win.innerWidth < 768) {
    return true;
  }

  // 3. User accessibility preference: Respect prefers-reduced-motion
  if (
    typeof win.matchMedia === 'function' &&
    win.matchMedia('(prefers-reduced-motion: reduce)')?.matches
  ) {
    return true;
  }

  // 4. Network Information API constraint: Data Saver or 2G/3G cellular connection
  if (nav) {
    const connection =
      nav.connection ||
      nav.mozConnection ||
      nav.webkitConnection;

    if (connection) {
      if (connection.saveData === true) return true;
      const slowTypes = ['slow-2g', '2g', '3g'];
      if (slowTypes.includes(connection.effectiveType)) return true;
    }
  }

  return false;
};
