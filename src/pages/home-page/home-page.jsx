import React, { useCallback } from 'react';
import Hero from './sections/hero';
import TrustBar from './sections/trust-bar';
import Authenticity from './sections/authenticity';
import Sensory from './sections/sensory';
import ContentBreak from './sections/content-break';
import Story from './sections/story';
import Collection from './sections/collection';
import Journey from './sections/journey';
import Archive from './sections/archive';
import TestimonyRibbon from './sections/testimony-ribbon';

import useAnalytics from '../../hooks/useAnalytics';
import useSEO from '../../hooks/useSEO';

import { VIEWS } from '../../views';

const HomePage = ({ onNavigate, onAddToCart, onImageClick, onBulkEnquire }) => {
  useSEO(VIEWS.HOME, 'Pure South African Honey, ethically sourced from the Free State.');
  useAnalytics('Home Page');

  const goToReserve = useCallback(() => {
    onNavigate?.(VIEWS.HOME, { scrollTo: 'collection' });
  }, [onNavigate]);

  const goToStory = useCallback(() => {
    onNavigate?.(VIEWS.HOME, { scrollTo: 'our-story' });
  }, [onNavigate]);

    return (
    <main className="bg-[#050505] overflow-x-hidden">
      {/* 1. THE HOOK */}
      <Hero onReserve={goToReserve} onStory={goToStory} />

      {/* 2. THE AUTHORITY */}
      <TrustBar />

      {/* 3. THE HEART */}
      <Story onNavigate={onNavigate} />

      {/* 4. THE PROCESS */}
      <Journey />

      {/* 5. THE SOCIAL PROOF */}
      <TestimonyRibbon />

      {/* 6. THE IMMERSION */}
      <Sensory />

      {/* 7. THE TRUTH */}
      <Authenticity onNavigate={onNavigate} />

      {/* 8. THE SIGHT */}
      <Archive />

      {/* 9. THE PIVOT */}
      <ContentBreak />

      {/* 10. THE TREASURE */}
      <Collection onAddToCart={onAddToCart} onImageClick={onImageClick} onBulkEnquire={onBulkEnquire} />
    </main>
  );
};

export default HomePage;
