import React from 'react';

const FeaturedRecipes = ({ navigate }) => (
  <section className="py-16 bg-[#121212] border-t border-white/5">
    <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 text-center">
      <span className="text-amber-500 tracking-[0.3em] text-xs font-bold uppercase">Lifestyle</span>
      <h3 className="text-2xl md:text-4xl font-serif text-white mt-2 mb-6">Nourish & Glow</h3>
      <p className="text-gray-400 max-w-2xl mx-auto mb-8">
        Discover how our raw honey enhances everything from your morning toast to your skincare
        routine.
      </p>
      <button
        onClick={() => navigate('recipes')}
        className="border border-white/20 text-white px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-black transition-colors"
      >
        View Recipes
      </button>
    </div>
  </section>
);

export default FeaturedRecipes;
