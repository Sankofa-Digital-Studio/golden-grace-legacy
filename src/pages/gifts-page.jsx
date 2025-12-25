import React from 'react';
import { Award, Gift } from 'lucide-react';

const GiftsPage = ({ onBuildBox, onRequestCatalogue }) => (
    <div className="pt-24 md:pt-32 pb-20 bg-[#0a0a0a] min-h-screen">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 text-center">
            <div className="mb-12 md:mb-16 animate-fade-in-up">
                <span className="text-amber-500 tracking-[0.3em] text-xs lg:text-sm font-bold uppercase">Bespoke Gifting</span>
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-serif text-white mt-4">The Art of Giving</h1>
                <p className="text-gray-400 mt-4 md:mt-6 max-w-md md:max-w-2xl lg:max-w-4xl lg:text-xl mx-auto px-4">Curated hampers and personalized honey suites for corporate clients and special occasions.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-16">
                {/* Corporate Card */}
                <div className="relative group overflow-hidden rounded-xl h-[400px] md:h-[500px] lg:h-[600px]">
                    <img src="https://images.unsplash.com/photo-1549488352-843258fb82fd?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 golden-filter" alt="Corporate Gifts" />
                    <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center p-8 text-center hover:bg-black/50 transition-colors">
                        <Award className="text-amber-500 mb-4" size={48} />
                        <h3 className="text-2xl md:text-3xl lg:text-5xl font-serif text-white mb-4">Corporate Suites</h3>
                        <p className="text-gray-300 mb-8 max-w-sm lg:max-w-lg lg:text-lg text-sm md:text-base">Impress clients with B-BBEE compliant, locally sourced luxury. Custom branding available.</p>
                        <button 
                            onClick={onRequestCatalogue}
                            className="bg-white text-black px-6 md:px-8 py-3 uppercase tracking-widest text-xs lg:text-sm font-bold hover:bg-amber-500 transition-colors"
                        >
                            Request Catalogue
                        </button>
                    </div>
                </div>
                {/* Personal Card */}
                <div className="relative group overflow-hidden rounded-xl h-[400px] md:h-[500px] lg:h-[600px]">
                    <img src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1974&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 golden-filter" alt="Personal Gifts" />
                    <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center p-8 text-center hover:bg-black/50 transition-colors">
                        <Gift className="text-amber-500 mb-4" size={48} />
                        <h3 className="text-2xl md:text-3xl lg:text-5xl font-serif text-white mb-4">Celebration Hampers</h3>
                        <p className="text-gray-300 mb-8 max-w-sm lg:max-w-lg lg:text-lg text-sm md:text-base">Weddings, birthdays, or just because. Curate a box of sweetness.</p>
                        <button 
                            onClick={onBuildBox}
                            className="bg-white text-black px-6 md:px-8 py-3 uppercase tracking-widest text-xs lg:text-sm font-bold hover:bg-amber-500 transition-colors"
                        >
                            Build Your Box
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default GiftsPage;