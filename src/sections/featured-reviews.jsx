import React, { useState, useEffect } from 'react';
import { Star, ArrowRight } from 'lucide-react';

const FeaturedReviews = ({ navigate }) => {
    const [currentReview, setCurrentReview] = useState(0);
    const reviews = [
        { name: "Sarah J.", text: "The Blue Gum variety is now a staple in my tea. Absolutely delicious." },
        { name: "Lerato K.", text: "The skincare benefits of their raw honeycomb are undeniable." },
        { name: "David M.", text: "Authentic, raw, and pure. Exactly what I was looking for." }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentReview((prev) => (prev + 1) % reviews.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-20 bg-[#0a0a0a]">
            <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 text-center">
                <span className="text-amber-500 tracking-[0.3em] text-xs font-bold uppercase">Community</span>
                <h3 className="text-2xl md:text-4xl font-serif text-white mt-2 mb-10">Love from the Hive</h3>
                
                <div className="relative max-w-3xl mx-auto min-h-[160px] flex items-center justify-center">
                    {reviews.map((review, i) => (
                        <div 
                            key={i} 
                            className={`absolute inset-0 transition-opacity duration-1000 flex flex-col items-center justify-center ${i === currentReview ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        >
                             <div className="flex text-amber-400 mb-4"><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/></div>
                             <p className="text-xl md:text-2xl font-serif text-white italic mb-4">"{review.text}"</p>
                             <p className="text-amber-500 text-sm font-bold uppercase tracking-widest">- {review.name}</p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center gap-2 mt-8 mb-8">
                    {reviews.map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === currentReview ? 'bg-amber-500' : 'bg-white/10'}`}></div>
                    ))}
                </div>

                <button 
                    onClick={() => navigate('reviews')}
                    className="text-white/50 hover:text-white transition-colors text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                >
                    Read All Reviews <ArrowRight size={14} />
                </button>
            </div>
        </section>
    );
};

export default FeaturedReviews;