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
      {/* 1. THE HOOK: Dual Intent (Shop Golden Grace Honey & The Legacy) */}
      <Hero navigate={onNavigate} />
      
      {/* 2. THE AUTHORITY: Purity Standards & Free State Provenance */}
      <TrustBar />

      {/* 3. THE HARVEST: The Honey Shop (Immediate turning point to purchase) */}
      <Collection
        onAddToCart={onAddToCart}
        onImageClick={onImageClick}
        onBulkEnquire={onBulkEnquire}
      />

      {/* 4. THE HEART: The Legacy Teaser (Founder testimony, women-led collective) */}
      <Story onNavigate={onNavigate} />

      {/* 5. THE PROCESS: Technical Movement */}
      <Journey />

      {/* 6. THE SOCIAL PROOF: Moving Ribbon */}
      <TestimonyRibbon />

      {/* 7. THE IMMERSION: Sensory Interaction */}
      <Sensory />

      {/* 8. THE TRUTH: Scientific Deep Dive */}
      <Authenticity onNavigate={onNavigate} />

      {/* 9. THE SIGHT: Visual Evidence */}
      <Archive />

      {/* 10. THE PIVOT: Atmospheric Palette Cleanser */}
      <ContentBreak onNavigate={onNavigate} />
    </main>
  );
};
export default HomePage;
