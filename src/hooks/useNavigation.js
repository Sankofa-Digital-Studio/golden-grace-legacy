// src/hooks/useNavigation.js
import { useEffect, useRef, useState } from 'react';
import { VIEWS } from '../views';

const VALID_VIEWS = new Set(Object.values(VIEWS));

export const useNavigation = (initialView, transitionMs = 250) => {
  // Sync initial view from URL hash if valid
  const getInitial = () => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace(/^#/, '');
      if (VALID_VIEWS.has(hash)) return hash;
    }
    return initialView;
  };

  const [view, setView] = useState(getInitial);
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

    // Push browser history state for native forward/back button support
    if (typeof window !== 'undefined' && window.history) {
      const newHash = nextView === VIEWS.HOME ? '' : `#${nextView}`;
      const url = `${window.location.pathname}${window.location.search}${newHash}`;
      window.history.pushState({ view: nextView }, '', url);
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

  // Browser Native Back / Forward Button Handling (popstate)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePopState = (e) => {
      const targetView = e.state?.view || (window.location.hash ? window.location.hash.replace(/^#/, '') : VIEWS.HOME);
      const validTarget = VALID_VIEWS.has(targetView) ? targetView : VIEWS.HOME;
      window.scrollTo(0, 0);
      setView(validTarget);
      setTransitioning(false);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // After view changes, perform any pending scroll intent
  useEffect(() => {
    if (!scrollTarget) return;

    const timer = setTimeout(() => {
      const el = document.getElementById(scrollTarget);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setScrollTarget(null);
    }, 150);

    return () => clearTimeout(timer);
  }, [view, scrollTarget]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return { view, navigate, transitioning };
};
