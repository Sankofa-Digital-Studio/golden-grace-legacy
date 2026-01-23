import { useState } from 'react';

export const useNavigation = (initial = 'home') => {
  const [view, setView] = useState(initial);
  const [transitioning, setTransitioning] = useState(false);

  const navigate = (next) => {
    if (next === view) return;

    setTransitioning(true);
    setTimeout(() => {
      window.scrollTo(0, 0);
      setView(next);
      setTransitioning(false);
    }, 800);
  };

  return { view, navigate, transitioning };
};
