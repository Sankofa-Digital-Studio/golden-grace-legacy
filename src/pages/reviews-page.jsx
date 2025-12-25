import React from 'react';
import { Star } from 'lucide-react';

const ReviewsPage = () => (
    <div className="pt-24 md:pt-32 pb-20 bg-[#0a0a0a] min-h-screen">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
            <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
                <span className="text-amber-500 tracking-[0.3em] text-xs lg:text-sm font-bold uppercase">Social Proof</span>
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-serif text-white mt-4">Love from the Hive</h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
                {[
                    { name: "Sarah J.", role: "Verified Buyer", text: "I've never tasted honey this rich before. The Blue Gum variety is now a staple in my tea.", rating: 5 },
                    { name: "David M.", role: "Chef", text: "As a chef, quality ingredients are everything. Golden Grace brings that authentic farm-to-table taste.", rating: 5 },
                    { name: "Lerato K.", role: "Wellness Coach", text: "The skincare benefits of their raw honeycomb are undeniable. My skin is glowing!", rating: 5 },
                    { name: "Michael B.", role: "Corporate Client", text: "We ordered 50 gift sets for our year-end function. The packaging was exquisite.", rating: 5 },
                    { name: "Priya S.", role: "Verified Buyer", text: "Finally, honey that isn't just sugar syrup. You can taste the wildflowers.", rating: 4 },
                    { name: "Thabo N.", role: "Beekeeping Student", text: "The workshop gave me the confidence to start my own hive. Grace is an amazing teacher.", rating: 5 }
                ].map((review, i) => (
                    <div key={i} className="bg-[#121212] p-6 md:p-8 lg:p-10 rounded-lg border border-white/5 hover:border-amber-500/30 transition-colors">
                        <div className="flex text-amber-400 mb-4">
                            {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                        </div>
                        <p className="text-gray-300 italic mb-6 leading-relaxed text-sm md:text-base lg:text-lg">"{review.text}"</p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white font-serif">
                                {review.name[0]}
                            </div>
                            <div>
                                <p className="text-white text-sm font-bold">{review.name}</p>
                                <p className="text-gray-500 text-xs">{review.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default ReviewsPage;