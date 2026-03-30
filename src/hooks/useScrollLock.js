import { useEffect } from 'react';

let lockCount = 0;
let originalOverflow = null;

const lockScroll = () => {
  if (lockCount === 0) {
    originalOverflow = {
      body: document.body.style.overflow,
      html: document.documentElement.style.overflow,
    };
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }
  lockCount += 1;
};

const unlockScroll = () => {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0 && originalOverflow) {
    document.body.style.overflow = originalOverflow.body;
    document.documentElement.style.overflow = originalOverflow.html;
    originalOverflow = null;
  }
};

export const useScrollLock = (active = true) => {
  useEffect(() => {
    if (!active) return;
    lockScroll();
    return () => unlockScroll();
  }, [active]);
};
