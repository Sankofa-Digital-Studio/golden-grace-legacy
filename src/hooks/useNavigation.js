// src/hooks/useNavigation.js
import { useCallback, useEffect, useRef, useState } from 'react';

export const useNavigation = (initialView, transitionMs = 800) => {
  const [view, setView] = useState(initialView);
  const [transitioning, setTransitioning] = useState(false);

  const [scrollTarget, setScrollTarget] = useState(null);
  const scrollTargetRef = useRef(null);

  const timeoutRef = useRef(null);

  useEffect(() => {
    scrollTargetRef.current = scrollTarget;
  }, [scrollTarget]);

  const navigate = useCallback(
    (nextView, opts = {}) => {
      const nextScrollTarget = opts.scrollTo ?? null;

      // Same view: only set scroll intent if it changed
      if (nextView === view) {
        if (nextScrollTarget && scrollTargetRef.current !== nextScrollTarget) {
          setScrollTarget(nextScrollTarget);
        }
        return;
      }

      setTransitioning(true);

      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);

      timeoutRef.current = window.setTimeout(() => {
        window.scrollTo(0, 0);

        setView((prev) => (prev === nextView ? prev : nextView));
        setScrollTarget(nextScrollTarget);

        setTransitioning(false);
      }, transitionMs);
    },
    [transitionMs, view]
  );

  useEffect(() => {
    const target = scrollTargetRef.current;
    if (!target) return;

    requestAnimationFrame(() => {
      const el = document.getElementById(target);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setScrollTarget(null);
    });
  }, [view]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return { view, navigate, transitioning };
};
