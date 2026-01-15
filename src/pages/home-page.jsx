import React from 'react';
import Hero from '../sections/hero';
import TrustBar from '../sections/trust-bar';
import Authenticity from '../sections/authenticity';
import Sensory from '../sections/sensory';
import ContentBreak from '../sections/content-break';
import Story from '../sections/story';
import Collection from '../sections/collection';
import FeaturedGifts from '../sections/featured-gifts';
import FeaturedEducation from '../sections/featured-education';
import FeaturedRecipes from '../sections/featured-recipes';
import FeaturedReviews from '../sections/featured-reviews';
import Founder from '../sections/founder';
import useAnalytics from '../hooks/useAnalytics';
import useSEO from '../hooks/useSEO';
import Journey from '../sections/journey';
import Archive from '../sections/archive';

const HomePage = ({ navigate, onAddToCart, onImageClick, onBulkEnquire, onScheduleClick }) => {
  useSEO('Home', 'Pure South African Honey, ethically sourced from the Free State.');
  useAnalytics('Home Page');
  return (
    <>
      <Hero navigate={navigate} />

      <TrustBar />
      <Journey />
      <Sensory />
      <Authenticity onNavigate={navigate} />
      
      <Archive />
      <ContentBreak /> 
      <Story />

      <Collection
        onAddToCart={onAddToCart}
        onImageClick={onImageClick}
        onBulkEnquire={onBulkEnquire}
      />
      <FeaturedGifts navigate={navigate} />
      <FeaturedEducation navigate={navigate} onScheduleClick={onScheduleClick} />
      <FeaturedRecipes navigate={navigate} />
      <FeaturedReviews navigate={navigate} />
      <Founder />
    </>
  );
};
export default HomePage;
