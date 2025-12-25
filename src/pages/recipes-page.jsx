import React from 'react';
import { ArrowRight } from 'lucide-react';

const RecipesPage = () => (
    <div className="pt-24 md:pt-32 pb-20 bg-[#0a0a0a] min-h-screen">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
            <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
                <span className="text-amber-500 tracking-[0.3em] text-xs lg:text-sm font-bold uppercase">Lifestyle</span>
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-serif text-white mt-4">Nourish & Glow</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
                {/* Recipe 1 */}
                <div className="bg-[#121212] rounded-xl overflow-hidden group hover:border-amber-500/50 border border-transparent transition-all">
                    <div className="h-48 md:h-56 lg:h-80 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1543363136-3fdb62e11be5?q=80&w=2080&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 golden-filter" alt="Honey Toast" />
                    </div>
                    <div className="p-6 lg:p-8">
                        <span className="text-amber-500 text-xs lg:text-sm font-bold uppercase mb-2 block">Culinary</span>
                        <h3 className="text-xl lg:text-2xl font-serif text-white mb-3">Golden Ricotta Toast</h3>
                        <p className="text-gray-400 text-sm lg:text-base mb-4">A simple yet decadent breakfast using our Sunflower Creamed Honey.</p>
                        <button className="flex items-center gap-2 text-white text-xs lg:text-sm uppercase tracking-widest hover:text-amber-400">Read Recipe <ArrowRight size={14} /></button>
                    </div>
                </div>

                {/* Skincare 1 */}
                <div className="bg-[#121212] rounded-xl overflow-hidden group hover:border-amber-500/50 border border-transparent transition-all">
                    <div className="h-48 md:h-56 lg:h-80 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=2074&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 golden-filter" alt="Honey Mask" />
                    </div>
                    <div className="p-6 lg:p-8">
                        <span className="text-amber-500 text-xs lg:text-sm font-bold uppercase mb-2 block">Skincare</span>
                        <h3 className="text-xl lg:text-2xl font-serif text-white mb-3">Raw Honey Face Mask</h3>
                        <p className="text-gray-400 text-sm lg:text-base mb-4">Hydrate and heal acne scars with this 2-ingredient natural remedy.</p>
                        <button className="flex items-center gap-2 text-white text-xs lg:text-sm uppercase tracking-widest hover:text-amber-400">Read Routine <ArrowRight size={14} /></button>
                    </div>
                </div>

                {/* Recipe 2 */}
                <div className="bg-[#121212] rounded-xl overflow-hidden group hover:border-amber-500/50 border border-transparent transition-all">
                    <div className="h-48 md:h-56 lg:h-80 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1517601278517-456741619dad?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 golden-filter" alt="Honey Tea" />
                    </div>
                    <div className="p-6 lg:p-8">
                        <span className="text-amber-500 text-xs lg:text-sm font-bold uppercase mb-2 block">Wellness</span>
                        <h3 className="text-xl lg:text-2xl font-serif text-white mb-3">Immunity Elixir</h3>
                        <p className="text-gray-400 text-sm lg:text-base mb-4">Our Infused Ginger & Lemon honey creates the ultimate flu-fighter tea.</p>
                        <button className="flex items-center gap-2 text-white text-xs lg:text-sm uppercase tracking-widest hover:text-amber-400">Read Recipe <ArrowRight size={14} /></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default RecipesPage;