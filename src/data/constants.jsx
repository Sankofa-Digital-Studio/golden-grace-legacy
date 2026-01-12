import { Droplet, Beaker, Flame } from 'lucide-react';
import React from 'react';

export const HONEY_TESTS = [
  {
    title: 'The Thumb Test',
    icon: <Droplet size={32} className="text-amber-500" />,
    instruction: 'Put a drop on your thumb.',
    result: "If it spreads or drips, it's not pure. Real honey stays intact as a solid bead.",
  },
  {
    title: 'The Water Test',
    icon: <Beaker size={32} className="text-amber-500" />,
    instruction: 'Pour honey into a glass of water.',
    result: 'Pure honey settles at the bottom like a lump. Fake honey dissolves immediately.',
  },
  {
    title: 'The Heat Test',
    icon: <Flame size={32} className="text-amber-500" />,
    instruction: 'Heat the honey slightly.',
    result: 'Pure honey caramelizes quickly. Fake honey creates bubbles and never caramelizes.',
  },
];

export const HERO_IMAGES = [
  '/images/hero-bg-slide-1.webp',
  '/images/hero-bg-slide-2.webp',
  '/images/hero-bg-slide-3.webp',
  '/images/hero-bg-slide-4.webp',
];
export const DICTIONARY_TERMS = [
  {
    term: 'Irradiated',
    phonetic: '/ɪˈreɪ.di.eɪ.tɪd/',
    definition:
      'A process where commercial honey is exposed to radiation to kill natural yeasts and bacteria.',
    truth:
      "Why do others do it? To prevent fermentation and stop the honey from crystallizing on the shelf. The Cost? It kills the live enzymes, probiotics, and 'life' inside the honey, turning a superfood into just sugar syrup.",
    ourStandard: 'NON-IRRADIATED. Our honey is alive, active, and potent.',
  },
  {
    term: 'Pasteurization',
    phonetic: '/ˌpæs.tʃər.aɪˈzeɪ.ʃən/',
    definition:
      'Heating honey to high temperatures (usually above 70°C) to melt micro-crystals and filter it faster.',
    truth:
      'Why do others do it? It makes bottling faster and keeps honey liquid forever. The Cost? It destroys heat-sensitive antioxidants and delicate floral aromas, leaving a flat, generic sweetness.',
    ourStandard: 'COLD EXTRACTED. We never heat our honey above hive temperature (35°C).',
  },
  {
    term: 'Ultra-Filtration',
    phonetic: '/ˈʌl.trə fɪlˈtreɪ.ʃən/',
    definition: 'Forcing honey through high-pressure microscopic filters to remove all particles.',
    truth:
      'Why do others do it? To remove all pollen so the origin of the honey cannot be traced (often to hide cheap imports). The Cost? Pollen is the protein and allergy-fighting power of honey. Without it, you miss the health benefits.',
    ourStandard: 'MACRO-FILTERED. We only strain out beeswax and wings. The pollen remains.',
  },
  {
    term: 'Crystallization',
    phonetic: '/ˌkrɪs.təl.aɪˈzeɪ.ʃən/',
    definition:
      'A natural process where raw honey turns from liquid to semi-solid (creamy or gritty) over time.',
    truth:
      "The Myth: Many think this means the honey has gone 'bad' or is mixed with sugar. The Truth: Only real, raw honey crystallizes! It is the ultimate proof of purity.",
    ourStandard:
      'EMBRACED. If your Golden Grace honey crystallizes, simply place the jar in warm water to liquefy it again.',
  },
  {
    term: 'Forage',
    phonetic: '/ˈfɒr.ɪdʒ/',
    definition: 'The specific plants and flowers bees visit to collect nectar.',
    truth:
      'Commercial honey is often a blend of random sources. Single-origin honey tastes like the landscape it came from (The Terroir).',
    ourStandard:
      'FREE STATE WILDFLOWERS. Our bees forage on indigenous aloes, cosmos, and sunflowers, creating a distinct, complex flavor profile.',
  },
  {
    term: 'Badger Friendly',
    phonetic: '/ˈbædʒ.ər frend.li/',
    definition:
      'Beekeeping methods that protect hives without harming the Honey Badger (Mellivora capensis).',
    truth:
      'Badgers love honey. Some farmers trap or kill them to protect hives. We use raised stands and badger-proof protection that keeps both the bees and the badgers safe.',
    ourStandard: "ETHICAL COEXISTENCE. We protect nature's balance.",
  },
];

export const LESOTHO_SELLERS = [
  { name: 'Maseru Central', location: 'Kingsway Rd' },
  { name: 'Leribe Hub', location: 'Hlotse Market' },
  { name: 'Mafeteng Depo', location: 'Main rank' },
];
export default LESOTHO_SELLERS

export const PRODUCTS = [
  {
    id: 1,
    name: 'Golden Dawn (Raw Honey)',
    size: '500g',
    container: 'Glass Jar',
    price: 150,
    images: [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=2080&auto=format&fit=crop', // Standalone
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?q=80&w=1740&auto=format&fit=crop', // Marketing
      'https://images.unsplash.com/photo-1481391032119-d89fee407e44?q=80&w=1965&auto=format&fit=crop', // Detail
    ],
  },
  {
    id: 2,
    name: 'Royal Dipper Set',
    size: 'Set of 2',
    container: 'Olive Wood',
    price: 85,
    images: [
      'https://images.unsplash.com/photo-1627915598284-75464f9f706f?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1621264875323-2895f32a688b?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589408434680-337cc372861c?q=80&w=1964&auto=format&fit=crop',
    ],
  },
  {
    id: 3,
    name: 'Harvest Reserve',
    size: '1kg',
    container: 'Ceramic Pot',
    price: 280,
    images: [
      'https://images.unsplash.com/photo-1565153907700-146601684c30?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534068590799-09895a701e3e?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1471943311424-646960669fbc?q=80&w=1974&auto=format&fit=crop',
    ],
  },
];

export const VIDEO_SOURCE =
  'https://videos.pexels.com/video-files/7234973/7234973-uhd_2560_1440_30fps.mp4';
