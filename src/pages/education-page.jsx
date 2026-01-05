import React from 'react';
import { ThermometerSun, TrendingUp, Calendar, HelpCircle, Check, XCircle } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import useAnalytics from '../hooks/useAnalytics';

const EducationPage = ({ onScheduleClick }) => {
  useSEO(
    'Bee Smart - Education',
    'Learn about the African Honey Bee and sustainable beekeeping in the Free State.'
  );
  useAnalytics('Education Page');

  const seasons = [
    {
      season: 'Spring (Aug-Oct)',
      activity: 'Swarming Season',
      desc: 'Colonies expand rapidly with the blooming of Aloes and fruit trees.',
    },
    {
      season: 'Summer (Nov-Feb)',
      activity: 'Honey Flow',
      desc: 'Peak nectar collection from Sunflowers and Cosmos. The main harvest begins.',
    },
    {
      season: 'Autumn (Mar-May)',
      activity: 'Preparation',
      desc: 'Bees store reserves for winter. We ensure hives are insulated and safe.',
    },
    {
      season: 'Winter (Jun-Jul)',
      activity: 'Dormancy',
      desc: 'The colony clusters for warmth. Minimal activity to conserve energy.',
    },
  ];

  return (
    <div className="pt-32 pb-20 bg-[#050505] min-h-screen">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-amber-500 tracking-[0.3em] text-xs lg:text-sm font-bold uppercase">
            Academy
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-white mt-4 mb-6">
            Guardians of the Hive
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-sm md:text-lg">
            Discover the fascinating world of the African Honey Bee (Apis mellifera scutellata) and
            our commitment to sustainable practices in the Free State.
          </p>
        </div>

        {/* Content Block 1: The Bee */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative aspect-square md:aspect-video lg:h-[400px] w-full rounded-xl overflow-hidden border border-white/10">
            <img
              src="/images/20.jpeg"
              alt="African Honey Bee"
              className="w-full h-full object-cover golden-filter"
            />
            <div className="absolute bottom-4 left-4 right-4 md:right-auto bg-black/60 backdrop-blur-md px-4 py-2 rounded border border-white/10">
              <p className="text-amber-500 text-xs font-bold uppercase">Species Focus</p>
              <p className="text-white text-sm italic">Apis mellifera scutellata</p>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-serif text-white">Resilient & Productive</h3>
            <p className="text-gray-400 leading-relaxed">
              Native to central and southern Africa, our bees are known for their high energy and
              vigorous defense of the hive. Unlike their European counterparts, they are better
              adapted to our harsh climate, resisting pests like the Varroa mite naturally without
              chemical intervention.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <ThermometerSun className="text-amber-500 mb-2" />
                <h4 className="text-white font-bold text-sm">Heat Tolerant</h4>
                <p className="text-gray-500 text-xs">Thrives in Free State summers.</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <TrendingUp className="text-amber-500 mb-2" />
                <h4 className="text-white font-bold text-sm">High Yield</h4>
                <p className="text-gray-500 text-xs">Superior nectar gathering.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Feature: Seasonal Timeline */}
        <div className="mb-24">
          <h3 className="text-3xl font-serif text-white text-center mb-10">
            The Beekeeper's Calendar
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {seasons.map((s, i) => (
              <div
                key={i}
                className="bg-[#121212] border border-white/5 p-6 rounded-lg hover:border-amber-500/50 transition-all group cursor-default"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-amber-500 text-xs font-bold uppercase tracking-wider">
                    {s.season}
                  </span>
                  <Calendar
                    size={16}
                    className="text-gray-600 group-hover:text-amber-500 transition-colors"
                  />
                </div>
                <h4 className="text-white font-serif text-xl mb-2">{s.activity}</h4>
                <p className="text-gray-400 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quiz Section (Interactive) */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
          <HelpCircle className="text-amber-500 w-12 h-12 mx-auto mb-6" />
          <h3 className="text-2xl md:text-4xl font-serif text-white mb-4">Bee Smart Trivia</h3>
          <p className="text-gray-400 mb-8">True or False: Crystallized honey has gone bad?</p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => alert('Incorrect! Crystallization is a natural process of raw honey.')}
              className="px-8 py-3 border border-white/20 text-white hover:bg-red-500/20 hover:border-red-500 transition-all rounded uppercase text-xs font-bold flex items-center gap-2"
            >
              <XCircle size={16} /> True
            </button>
            <button
              onClick={() =>
                alert("Correct! It's actually a sign of purity. Warm it up to liquefy.")
              }
              className="px-8 py-3 border border-white/20 text-white hover:bg-green-500/20 hover:border-green-500 transition-all rounded uppercase text-xs font-bold flex items-center gap-2"
            >
              <Check size={16} /> False
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationPage;
