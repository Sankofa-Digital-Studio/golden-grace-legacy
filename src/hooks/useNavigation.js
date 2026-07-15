// src/hooks/useNavigation.js
import { useEffect, useRef, useState } from 'react';

export const useNavigation = (initialView, transitionMs = 800) => {
  const [view, setView] = useState(initialView);
  const [transitioning, setTransitioning] = useState(false);
  const [scrollTarget, setScrollTarget] = useState(null);
  const timeoutRef = useRef(null);

  const navigate = (nextView, opts = {}) => {
    const nextScrollTarget = opts.scrollTo ?? null;

    // Same view: just scroll if requested
    if (nextView === view) {
      if (nextScrollTarget) {
        const element = document.getElementById(nextScrollTarget);
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    if (transitionMs <= 0) {
      window.scrollTo(0, 0);
      setView(nextView);
      setScrollTarget(nextScrollTarget);
      return;
    }

    setTransitioning(true);

    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);

    timeoutRef.current = window.setTimeout(() => {
      window.scrollTo(0, 0);
      setView(nextView);
      setScrollTarget(nextScrollTarget);
      setTransitioning(false);
    }, transitionMs);
  };

  // After view changes, perform any pending scroll intent
  useEffect(() => {
    if (!scrollTarget) return;

    const el = document.getElementById(scrollTarget);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setScrollTarget(null);
  }, [view, scrollTarget]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return { view, navigate, transitioning };
};
