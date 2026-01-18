import React from 'react';
import Hero from './sections/hero';
import TrustBar from './sections/trust-bar';
import Authenticity from './sections/authenticity';
import Sensory from './sections/sensory';
import ContentBreak from './sections/content-break';
import Story from './sections/story';
import Collection from './sections/collection';
import useAnalytics from '../../hooks/useAnalytics';
import useSEO from '../../hooks/useSEO';
import Journey from './sections/journey';
import Archive from './sections/archive';
import TestimonyRibbon from './sections/testimony-ribbon';

const HomePage = ({
  onNavigate,
  onAddToCart,
  onImageClick,
  onBulkEnquire,
}) => {
  useSEO('Home', 'Pure South African Honey, ethically sourced from the Free State.');
  useAnalytics('Home Page');

  return (
    <main className="bg-[#050505] overflow-x-hidden">
      {/* 1. THE HOOK */}
      <Hero navigate={onNavigate} />
      
      {/* 2. THE AUTHORITY */}
      <TrustBar />

      {/* 3. THE HEART: Story Teaser (Now precedes Journey to build emotional buy-in) */}
      <Story onNavigate={onNavigate} />

      {/* 4. THE PROCESS: Technical Movement */}
      <Journey />

      {/* 5. THE SOCIAL PROOF: Moving Ribbon */}
      <TestimonyRibbon />

      {/* 6. THE IMMERSION: Sensory Interaction */}
      <Sensory />

      {/* 7. THE TRUTH: Scientific Deep Dive */}
      <Authenticity onNavigate={onNavigate} />

      {/* 8. THE SIGHT: Visual Evidence */}
      <Archive />

      {/* 9. THE PIVOT: Atmospheric Palette Cleanser */}
      <ContentBreak />

      {/* 10. THE TREASURE: Boutique Reveal (The Sale) */}
      <Collection
        onAddToCart={onAddToCart}
        onImageClick={onImageClick}
        onBulkEnquire={onBulkEnquire}
      />
    </main>
  );
};
export default HomePage;
