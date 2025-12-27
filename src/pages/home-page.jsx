import React from 'react';
import Hero from '../sections/hero';
import TrustBar from '../sections/trust-bar';
import Sensory from '../sections/sensory';
import ContentBreak from '../sections/content-break';
import Story from '../sections/story';
import Collection from '../sections/collection';
import FeaturedGifts from '../sections/featured-gifts';
import FeaturedEducation from '../sections/featured-education';
import FeaturedRecipes from '../sections/featured-recipes';
import FeaturedReviews from '../sections/featured-reviews';
import Founder from '../sections/founder';

const HomePage = ({ navigate, onAddToCart, onImageClick, onBulkEnquire, onScheduleClick }) => (
  <>
    <Hero navigate={navigate} />
    <TrustBar />
    <Sensory />
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
export default HomePage;
