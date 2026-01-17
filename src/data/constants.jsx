import React, { useState, useEffect, useRef } from 'react';
import {
  Droplet,
  Beaker,
  Flame,
  Sun,
  Wind,
  Users,
  Search,
  History,
  Globe,
  HomeIcon,
  Sparkles,
  ShieldCheck,
  Heart,
  Microscope,
  Flower2, 
  FileCheck, Award
} from 'lucide-react';

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
  '/images/hero/hero-bg-slide-1.webp',
  '/images/hero/hero-bg-slide-2.webp',
  '/images/hero/hero-bg-slide-3.webp',
  '/images/hero/hero-bg-slide-4.webp',
];

export const LESOTHO_SELLERS = [
  { name: 'Maseru Central', location: 'Kingsway Rd' },
  { name: 'Leribe Hub', location: 'Hlotse Market' },
  { name: 'Mafeteng Depo', location: 'Main rank' },
];
export default LESOTHO_SELLERS;

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
  "/videos/intro.mp4"

export const VIDEO_CHAPTERS = [
  { id: 'scouting', time: 0, title: 'The Search', desc: 'Locating the hive in the Free State brush.' },
  { id: 'work', time: 15, title: 'The Labour', desc: 'Traditional methods of access.' },
  { id: 'resonance', time: 45, title: 'The Presence', desc: 'The smoke and the hive frequency.' },
  { id: 'discovery', time: 90, title: 'The Harvest', desc: 'Revealing the pure liquid gold.' }
];

export const seasons = [
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

export const HARVEST_IMAGES = Array.from({ length: 25 }).map((_, i) => ({
  id: i + 1,
  path: `/images/harvest/harvest-${i + 1}.webp`,
  alt: `Golden Grace Raw Harvest Frame ${i + 1} - Welkom, Free State`,
  title:
    [
      'The Golden Dawn',
      'Hive Architecture',
      'Worker Bee Focus',
      'Macro Capping',
      'The Extraction',
      'Pollen Rich Frames',
      'Beekeeper Hands',
      "Nature's Geometry",
      'Liquid Gold Flow',
      'Sunlight Through Honey',
      'The Smoker',
      'Protective Gear',
      'Wildflower Forage',
      'Aloe Nectar',
      'Cosmos Field',
      'The Hive Stand',
      'Macro Comb',
      'Propolis Seal',
      "The Queen's Chamber",
      'Strained Purity',
      'Jarring the Grace',
      'Quality Seal',
      'Farm Morning',
      'Welkom Landscape',
      'The Legacy',
    ][i] || 'Harvest Detail',
  category: i < 5 ? 'Forage' : i < 15 ? 'Extraction' : 'Final Product',
}));

export const JOURNEY_IMAGES = Array.from({ length: 3 }).map((_, i) => ({
  id: i + 1,
  path: `/images/journey/journey-${i + 1}.webp`,
  alt: `Golden Grace Raw Harvest Frame ${i + 1} - Welkom, Free State`,
  title: ['The Golden Dawn', 'Hive Architecture', 'Worker Bee Focus'][i] || 'Harvest Detail',
  category: i < 1 ? 'Forage' : i < 2 ? 'Extraction' : 'Final Product',
}));

export const GLOSSARY_TERMS = [
  {
    term: 'Non-Irradiated',
    definition:
      'Most commercial honey is radiated to kill bacteria but kills the life inside. Ours is active, alive, and full of natural goodness.',
    img: HARVEST_IMAGES[19].path, // Strained Purity
  },
  {
    term: 'Cold Strained',
    definition:
      'We use macro-filtration to remove wax wings but leave the healthy pollen intact, ensuring maximum health benefits.',
    img: HARVEST_IMAGES[8].path, // Flow detail
  },
];

export const JOURNEY_STEPS = [
  {
    id: 'forage',
    title: 'The Forage',
    subtitle: 'Free State Wildflowers',
    description:
      'Our bees roam the indigenous landscapes of the Free State, gathering nectar from Aloe and Cosmos. This is where the unique flavor profile of Golden Grace begins.',
    img: JOURNEY_IMAGES[0].path, // Path to 'Wildflower Forage'
    icon: <Sun className="text-amber-500" />,
  },
  {
    id: 'architecture',
    title: 'The Architecture',
    subtitle: 'Hexagonal Perfection',
    description:
      "Inside the hive, bees build perfect geometry. We respect their work, ensuring we only harvest the surplus while maintaining the hive's structural integrity.",
    img: JOURNEY_IMAGES[1].path, // Path to 'Hive Architecture'
    icon: <Wind className="text-amber-400" />,
  },
  {
    id: 'extraction',
    title: 'The Extraction',
    subtitle: 'Hands of Heritage',
    description:
      'Cold-strained and hand-pulled. We never heat our honey above hive temperature, preserving the live enzymes and probiotics that define raw honey.',
    img: JOURNEY_IMAGES[2].path, // Path to 'Beekeeper Hands'
    icon: <Users className="text-amber-600" />,
  },
];

export const JOURNEY_TECHNICAL_DATA = {
  forage: {
    labData: 'Nectar Concentration: 82% | Pollen Diversity Index: High',
    lore: 'Sector: Welkom North. Primary Flora: Indigenous Aloe Ferox and Seasonal Cosmos.',
    stats: 'Bees traveled approx. 4,200km per harvest cycle.',
    integrityMetric: "Pollen integrity verified via macro-mesh filtration."
  },
  architecture: {
    labData: 'Cell Precision: 120-degree Hexagonal Symmetry | Moisture Content: 17.2%',
    lore: 'Naturally sealed with Propolis (Bee Glue) to ensure a sterile environment.',
    stats: 'Density: 0.2g Beeswax per cubic centimeter.',
    integrityMetric: "Geometric precision maintains enzyme stability."
  },
  extraction: {
    labData: 'Thermal Guard: Constant 32°C (Never heated) | Enzyme Count: Bio-active',
    lore: 'Manual centrifugal extraction preserves the molecular structure of the gold.',
    stats: 'Filtering: 200-micron macro-mesh (Pollen preserved).',
     integrityMetric: "Non-irradiated certification: Active Live Enzymes."
  },
};

export const INTERESTING_FACTS = [
  {
    page: 'p. 5',
    category: 'Beekeeping History of SA',
    title: 'The First Keepers',
    content:
      'First established by the San Bushmen who used the bees and honey in their rock art. It was easier to find their nesting grounds through the shimmer of their wings with the cast light of the setting sun.',
    icon: <History className="text-amber-500" />,
    img: '/images/harvest/harvest-25.webp',
  },
  {
    page: 'p. 9',
    category: 'Bees & Environment',
    title: "Africa's Hidden Diversity",
    content:
      'As people we only know of one bee species which is the common honeybee. However, in Africa there is an estimation of at least 3,000 bee species and 200,000 worldwide.',
    icon: <Globe className="text-amber-500" />,
    img: '/images/harvest/harvest-15.webp',
  },
  {
    page: 'p. 17',
    category: 'The Honeybee Nest',
    title: 'Migration & Decoys',
    content:
      'Nesting sites for bees are scarce in certain regions hence they migrate in swarms to resource-rich areas. Beekeepers attract swarms with decoy hives to help increase their stocks.',
    icon: <HomeIcon className="text-amber-500" />,
    img: '/images/harvest/harvest-2.webp',
  },
  {
    page: 'p. 27',
    category: 'Behaviors',
    title: 'The Grooming Dance',
    content:
      'Bees have an agitated urge to stomp their little legs and rhythmically swing their bodies. This is a cry for help; signaling to the bee next to it that it needs help getting clean with mandibles and antennae.',
    icon: <Sparkles className="text-amber-500" />,
    img: '/images/harvest/harvest-3.webp',
  },
  {
    page: 'p. 30',
    category: 'Protection',
    title: 'The Bump of Warning',
    content:
      'Guards get alerted by movements, odour, and appearance. They do not attack immediately; instead, they bump into the intruder to notify them they are in the wrong place. If ignored, they guard (attack).',
    icon: <ShieldCheck className="text-amber-500" />,
    img: '/images/harvest/harvest-12.webp',
  },
];

export const LEXICON_DATA = [
  {
    category: 'Ethics',
    icon: <Heart size={16} />,
    terms: [
      {
        term: 'Badger Friendly',
        phonetic: '/ˈbædʒ.ər ˈfrɛnd.li/',
        definition:
          'A standard ensuring apiaries are protected from honey badgers without harming the animals.',
        truth:
          'Industrial farms often use lethal traps or electric fences that injure local wildlife to protect their bottom line.',
        ourStandard:
          'NON-LETHAL PROTECTION. We use elevated stands and badger-proof fencing to coexist with nature’s predators.',
      },

      {
        term: 'Cell Precision',
        phonetic: '/sɛl prɪˈsɪʒ.ən/',
        definition:
          'The biological phenomenon where bees construct hexagonal cells with perfect 120-degree angles.',
        truth:
          'Machine-made plastic foundations force bees to build faster, which can stress the colony and weaken the hive.',
        ourStandard:
          'NATURAL COMB. We respect the bees as master architects, allowing them to exhibit their biological genius.',
      },
    ],
  },
  {
    category: 'Biology',
    icon: <Microscope size={16} />,
    terms: [
      {
        term: 'Propolis',
        phonetic: '/ˈproʊ.pə.lɪs/',
        definition:
          'A resinous "bee glue" used to seal hive gaps, possessing potent anti-bacterial properties.',
        truth:
          'Most brands filter this out to achieve "clarity." However, propolis is the source of many of honey\'s medicinal properties.',
        ourStandard:
          'WHOLE HARVEST. We keep the micro-bits of propolis and pollen for your health.',
      },
      {
        term: 'Bio-active Enzymes',
        phonetic: '/ˌbaɪ.oʊˈæk.tɪv ˈɛn.zaɪmz/',
        definition: 'Proteins produced by bees that give raw honey its healing properties.',
        truth:
          'Boiling or irradiating honey destroys these delicate proteins, making the product nutritionally inert.',
        ourStandard: 'FULLY ACTIVE. Verified through cold-processing to ensure maximum potency.',
      },
      {
        term: 'Pollen Diversity Index',
        phonetic: '/ˈpɒl.ən daɪˈvɜː.sə.ti ˈɪn.dɛks/',
        definition: 'A measurement of the variety of pollen species present in a honey sample.',
        truth:
          'Mono-crop honey indicates a lack of nutritional diversity for the bees and the consumer.',
        ourStandard:
          'HIGH DIVERSITY. Our index reflects the rich floral tapestry of the Free State plains.',
      },
    ],
  },
  {
    category: 'Purity',
    icon: <ShieldCheck size={16} />,
    terms: [
      {
        term: 'Ultra-Filtration',
        phonetic: '/ˈʌl.trə fɪlˈtreɪ.ʃən/',
        definition: 'Processing honey through extremely fine filters under high pressure.',
        truth:
          'This is done to remove all pollen so the honey cannot be traced to its origin and stays liquid longer for retail convenience.',
        ourStandard:
          'MACRO-MESH ONLY. We leave the pollen exactly where nature intended—inside the jar.',
      },
      {
        term: 'Pasteurization',
        phonetic: '/ˌpæs.tʃər.aɪˈzeɪ.ʃən/',
        definition:
          'Heating honey to high temperatures (usually 70°C+) to kill yeast and smooth the texture.',
        truth:
          "High heat 'kills' the honey, destroying every healthy enzyme and probiotic that makes it a superfood.",
        ourStandard:
          'ZERO HEAT. Our harvest never exceeds the natural temperature of the hive (35°C).',
      },
      {
        term: 'Irradiated',
        phonetic: '/ɪˈreɪ.di.eɪ.tɪd/',
        definition:
          'A process where commercial honey is exposed to radiation to kill bacteria and prevent fermentation.',
        truth:
          "While it stops crystallization, it strips the honey of its 'living' qualities, turning medicine into sugar syrup.",
        ourStandard: 'NON-IRRADIATED. 100% Raw, active, and potent.',
      },
    ],
  },
  {
    category: 'The Harvest',
    icon: <Search size={16} />,
    terms: [
      {
        term: 'Forage',
        phonetic: '/ˈfɒr.ɪdʒ/',
        definition: 'The specific plants and flowers bees visit to collect nectar.',
        truth:
          'Commercial honey is often a blend of random, unknown sources. Single-origin honey is the only way to taste the landscape.',
        ourStandard:
          'FREE STATE WILDFLOWERS. Our bees forage on indigenous aloes, cosmos, sunflowers, and various wildflowers.',
      },
      {
        term: 'Nectar Concentration',
        phonetic: '/ˈnɛk.tər ˌkɒn.sənˈtreɪ.ʃən/',
        definition:
          'The percentage of sugar versus water in foraged nectar, dehydrated by bees to below 18%.',
        truth:
          "Commercial producers often harvest 'wet' honey early and mechanically dehydrate it, which affects flavor and enzyme stability.",
        ourStandard:
          'NATURALLY RIPENED. We only harvest frames that the bees have sealed themselves.',
      },
      {
        term: 'Cold-Strained',
        phonetic: '/koʊld streɪnd/',
        definition: 'Gravity-fed filtration that maintains hive temperatures.',
        truth:
          'Industry standards use pressure-heating to move honey faster, destroying the molecular bond of the nectar.',
        ourStandard: 'COLD-PULLED. We never heat our harvest above 35°C.',
      },
    ],
  },
];
export const certs = [
    {
      id: 'agri',
      icon: <ShieldCheck className="text-amber-500 group-hover:text-black transition-colors" size={20} />,
      label: "Dept. Agriculture",
      sub: "Reg: DFS194",
      title: "Department of Agriculture Registration",
      accent: "bg-amber-500/10 border-amber-500/20 group-hover:bg-amber-500"
    },
    {
      id: 'coa',
      icon: <FileCheck className="text-amber-500 group-hover:text-black transition-colors" size={20} />,
      label: "CoA Compliant",
      sub: "Hygiene Standards",
      title: "Certificate of Analysis (CoA) Compliant",
      accent: "bg-amber-500/10 border-amber-500/20 group-hover:bg-amber-500"
    },
    {
      id: 'bee',
      icon: <Award className="text-amber-500 group-hover:text-black transition-colors" size={20} />,
      label: "B-BBEE Compliant",
      sub: "Women-Led",
      title: "B-BBEE Level 1 Compliant Enterprise",
      accent: "bg-amber-500/10 border-amber-500/20 group-hover:bg-amber-500"
    }, {
      id: 'source',
      icon: <Heart className="text-amber-500 group-hover:text-black transition-colors" size={20} />,
      label: "Ethically Sourced",
      sub: "Guardian Beekeeping",
      title: "Ethically Sourced Honey from Guardian Beekeeping",
      accent: "bg-amber-500/10 border-amber-500/20 group-hover:bg-amber-500"
    }
  ];
export const FORAGER_MESSAGES = [
  'Scouting the Free State flora...',
  'Foraging for indigenous nectar...',
  'Returning to the golden hive...',
  'Capping the surplus perfection...',
  'Preparing your harvest...',
];

export const flavorData = [
  { label: 'Sweet', value: 85 },
  { label: 'Floral', value: 70 },
  { label: 'Medicinal', value: 45 },
  { label: 'Citrus', value: 30 },
  { label: 'Earthy', value: 55 },
];

export const FLORAL_PROFILES = [
  {
    id: 'aloe',
    name: "Aloe Ferox",
    location: "Welkom Central",
    desc: "Robust and medicinal with a deep amber resonance.",
    icon: <Sun size={14} />,
    // Radar points: Sweet, Floral, Medicinal, Citrus, Earthy
    points: "50,25 80,40 85,70 30,75 40,40" 
  },
  {
    id: 'cosmos',
    name: "Highland Cosmos",
    location: "Free State Plains",
    desc: "Light, airy, and delicately sweet with floral whispers.",
    icon: <Wind size={14} />,
    points: "85,20 90,30 40,60 50,70 30,30"
  },
  {
    id: 'wildflower',
    name: "Veld Wildflower",
    location: "Northern Belt",
    desc: "Complex, earthy, and unpredictable—the true taste of the wild.",
    icon: <Flower2 size={14} />,
    points: "60,30 70,50 50,55 75,80 85,60"
  }
];
