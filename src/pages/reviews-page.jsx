import React from 'react';
import { Star, Quote, CheckCircle  } from 'lucide-react';

const ReviewsPage = ({ onWriteReview }) => {
  const reviews = [
    { id: 1, name: "Sarah J.", role: "Verified Buyer", rating: 5, text: "The Blue Gum variety is now a staple in my tea. Absolutely delicious and you can taste the purity.", date: "2 days ago" },
    { id: 2, name: "Chef Michael", role: "Culinary Expert", rating: 5, text: "I use Golden Grace in my glaze for duck. The consistency is unmatched by commercial brands.", date: "1 week ago" },
    { id: 3, name: "Lerato K.", role: "Wellness Coach", rating: 5, text: "I recommend the raw honeycomb to all my clients for skincare. It's liquid gold.", date: "2 weeks ago" },
    { id: 4, name: "David M.", role: "Verified Buyer", rating: 4, text: "Great taste, but I wish the delivery was faster to Cape Town. Worth the wait though!", date: "3 weeks ago" },
    { id: 5, name: "Priya S.", role: "Verified Buyer", rating: 5, text: "The infused ginger honey saved me this winter. A daily spoonful kept the flu away.", date: "1 month ago" },
    { id: 6, name: "Thabo N.", role: "Beekeeping Student", rating: 5, text: "Attended their workshop in Welkom. Grace is an inspiring teacher and mentor.", date: "1 month ago" },
  ];

  return (
    <div className="pt-32 pb-20 bg-[#050505] min-h-screen px-4 md:px-8 lg:px-12">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in-up">
            <span className="text-amber-500 tracking-[0.3em] text-xs font-bold uppercase">Community</span>
            <h1 className="text-4xl md:text-6xl font-serif text-white mt-4 mb-6">Voices from the Hive</h1>
            <div className="flex justify-center items-center gap-4 text-gray-400">
                <div className="flex items-center gap-1 text-amber-400">
                    <Star size={20} fill="currentColor" />
                    <span className="text-white font-bold text-lg animate-pulse">4.9</span>
                </div>
                <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                <span>Based on 120+ Reviews</span>
            </div>
        </div>

        {/* Masonry-Style Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 max-w-7xl mx-auto">
            {reviews.map((review, i) => (
                <div key={review.id} className="break-inside-avoid bg-zinc-900/40 backdrop-blur-md border border-white/5 p-8 rounded-xl hover:border-amber-500/30 hover:bg-zinc-900/60 transition-all duration-500 group relative overflow-hidden shadow-lg" style={{ animationDelay: `${i * 100}ms` }}>
                    {/* Decorative Quote Icon */}
                    <Quote className="absolute top-4 right-4 text-white/5 w-12 h-12 -rotate-12" />
                    
                    <div className="flex justify-between items-start mb-6 relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500 font-serif font-bold border border-amber-500/20">
                                {review.name[0]}
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-sm">{review.name}</h4>
                                <p className="text-gray-500 text-[10px] uppercase tracking-wider">{review.role}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex text-amber-400 mb-4 gap-1 relative z-10">
                        {[...Array(5)].map((_, starI) => (
                            <Star key={starI} size={14} fill={starI < review.rating ? "currentColor" : "none"} className={starI >= review.rating ? "text-gray-700" : ""} />
                        ))}
                    </div>
                    
                    <p className="text-gray-200 text-sm leading-relaxed mb-6 font-light italic relative z-10">"{review.text}"</p>
                    
                    <div className="flex items-center justify-between border-t border-white/5 pt-4">
                        <div className="flex items-center gap-2 text-[10px] text-amber-500 font-medium">
                            <CheckCircle size={12} /> Verified Purchase
                        </div>
                        <span className="text-gray-600 text-[10px]">{review.date}</span>
                    </div>
                </div>
            ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
            <p className="text-gray-400 mb-6">Have you tasted our honey? Share your story.</p>
            <button 
                onClick={onWriteReview}
                className="border border-white/20 text-white px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-black transition-colors"
            >
                Write a Review
            </button>
        </div>
    </div>
  );
};

export default ReviewsPage;