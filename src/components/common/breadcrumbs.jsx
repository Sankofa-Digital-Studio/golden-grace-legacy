import React from 'react';
import { Hexagon, Home } from 'lucide-react';

const Breadcrumbs = ({ currentPage, onNavigate }) => {
  // Map page IDs to readable names
  const pageNames = {
    home: 'Home',
    collection: 'The Reserve',
    gifts: 'Gifting',
    education: 'Bee Smart',
    recipes: 'Lifestyle',
    reviews: 'Hive Mind',
  };

  if (currentPage === 'home') return null;

  return (
    <div className="w-full bg-[#0a0a0a] border-b border-white/5 py-3 px-4 md:px-8 lg:px-12 flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest text-gray-500 sticky top-[72px] z-30 backdrop-blur-md">
      <button
        onClick={() => onNavigate('home')}
        className="hover:text-amber-500 transition-colors flex items-center gap-1"
      >
        <Home size={12} /> Home
      </button>
      <Hexagon size={8} className="text-amber-500 fill-amber-500" />
      <span className="text-amber-500 font-bold">{pageNames[currentPage] || currentPage}</span>
    </div>
  );
};

export default Breadcrumbs;
