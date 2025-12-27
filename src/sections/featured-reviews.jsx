import React, { useState, useEffect } from 'react';
import { Star, ArrowRight } from 'lucide-react';

const FeaturedReviews = ({ navigate }) => (
    <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 text-center">
            <span className="text-amber-500 tracking-[0.3em] text-xs font-bold uppercase">Community</span>
            <h3 className="text-2xl md:text-4xl font-serif text-white mt-2 mb-10">Love from the Hive</h3>
            <div className="flex justify-center gap-2 mt-8 mb-8"><div className="w-2 h-2 rounded-full bg-amber-500"></div><div className="w-2 h-2 rounded-full bg-white/10"></div><div className="w-2 h-2 rounded-full bg-white/10"></div></div>
            <button onClick={() => navigate('reviews')} className="text-white/50 hover:text-white transition-colors text-xs uppercase tracking-widest flex items-center justify-center gap-2">Read All Reviews <ArrowRight size={14} /></button>
        </div>
    </section>
);

export default FeaturedReviews;