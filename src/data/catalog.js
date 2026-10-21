// src/data/catalog.js
// Pure data contracts for Golden Grace Legacy & Honey
// Clean, tree-shakeable, and 100% Node.js / SSR / Edge compatible.

export const LESOTHO_SELLERS = [
  { name: 'Maseru Central', location: 'Kingsway Rd' },
  { name: 'Leribe Hub', location: 'Hlotse Market' },
  { name: 'Mafeteng Depo', location: 'Main rank' },
];

export const HERO_IMAGES = [
  '/images/hero/hero-bg-slide-1.webp',
  '/images/hero/hero-bg-slide-2.webp',
  '/images/hero/hero-bg-slide-3.webp',
  '/images/hero/hero-bg-slide-4.webp',
];

export const PRODUCTS = [
  {
    id: 'premium-hex-aloe',
    category: 'The Jars',
    title: 'Aloe Ferox Reserve',
    flora: 'Welkom Central Aloe',
    batch: 'Batch 2026/FS-01',
    batchNumber: '2026/FS-01',
    remainingJars: 34,
    totalBatchJars: 250,
    harvestSeason: 'Winter Bloom',
    tasteNotes: 'Deep amber, rich woody resonance, medicinal finish',
    scarcity: 'Limited Winter Bloom • 34 Jars Remaining',
    price: 145,
    sizes: ['375g', '500g'],
    vessel: 'Hexagonal Glass',
    img: '/images/products/aloe-jar.webp',
    tag: 'Best Seller',
  },
  {
    id: 'daily-squeeze-wild',
    category: 'The Squeeze',
    title: 'Veld Wildflower',
    flora: 'Northern Belt Multi-Floral',
    batch: 'Batch 2026/FS-02',
    batchNumber: '2026/FS-02',
    remainingJars: 86,
    totalBatchJars: 300,
    harvestSeason: 'Summer Veld',
    tasteNotes: 'Earthy, complex wildflowers, smooth liquid gold',
    scarcity: 'Daily Raw Essential • Fresh Veld Pull',
    price: 95,
    sizes: ['500g'],
    vessel: 'BPA-Free Squeeze',
    img: '/images/products/wildflower-squeeze.webp',
    tag: 'Daily Essential',
  },
  {
    id: 'premium-hex-cosmos',
    category: 'The Jars',
    title: 'Highland Cosmos',
    flora: 'Free State Plains',
    batch: 'Batch 2026/FS-03',
    batchNumber: '2026/FS-03',
    remainingJars: 19,
    totalBatchJars: 150,
    harvestSeason: 'Late Summer Harvest',
    tasteNotes: 'Delicate floral whispers, airy sweetness, bright finish',
    scarcity: 'Late Summer Harvest • Strictly Limited (19 Jars Left)',
    price: 155,
    sizes: ['375g'],
    vessel: 'Hexagonal Glass',
    img: '/images/products/cosmos-jar.webp',
    tag: 'Limited Harvest',
  },
  {
    id: 'bundle-discovery-duo',
    category: 'The Gift',
    title: 'The Terroir Discovery Duo',
    flora: 'Welkom Aloe & Northern Veld',
    batch: 'Duo Batch #2026-D1',
    batchNumber: '2026/FS-D1',
    remainingJars: 48,
    totalBatchJars: 200,
    harvestSeason: 'Spring Bloom',
    tasteNotes: 'Rich woody medicinal resonance + smooth golden wildflower floral finish',
    scarcity: 'Starter Reserve • Specially Priced at R240',
    price: 240,
    originalPrice: 280,
    sizes: ['375g + 500g'],
    vessel: 'Hexagonal Jar + Squeeze',
    img: '/images/featured-gift-intro.webp',
    tag: 'Starter Bundle',
  },
  {
    id: 'gift-trio',
    category: 'The Gift',
    title: 'The Trinity Set',
    flora: 'Aloe, Cosmos & Wildflower',
    batch: 'Curated Set #2026',
    batchNumber: 'Curated-2026',
    remainingJars: 22,
    totalBatchJars: 100,
    harvestSeason: 'Artisanal Reserve',
    tasteNotes: 'The complete Free State tasting flight (3 single-origins)',
    scarcity: 'Artisanal Gift Curation • Hand-Packed',
    price: 420,
    sizes: ['3 x 150g'],
    vessel: 'Miniature Glass Set',
    img: '/images/products/trio-set.webp',
    tag: 'Gift Choice',
  },
];

export const CATEGORY_IDS = ['all', 'The Jars', 'The Squeeze', 'The Gift'];

export const VIDEO_SOURCE = '/videos/intro.mp4';

export const VIDEO_CHAPTERS = [
  { id: 'scouting', time: 0, title: 'The Search', desc: 'Locating the hive in the Free State brush.' },
  { id: 'work', time: 15, title: 'The Labour', desc: 'Traditional methods of access.' },
  { id: 'resonance', time: 45, title: 'The Presence', desc: 'The smoke and the hive frequency.' },
  { id: 'discovery', time: 90, title: 'The Harvest', desc: 'Revealing the pure liquid gold.' },
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

export const JOURNEY_TECHNICAL_DATA = {
  forage: {
    labData: 'Nectar Concentration: 82% | Pollen Diversity Index: High',
    lore: 'Sector: Welkom North. Primary Flora: Indigenous Aloe Ferox and Seasonal Cosmos.',
    stats: 'Bees traveled approx. 4,200km per harvest cycle.',
    integrityMetric: 'Pollen integrity verified via macro-mesh filtration.',
  },
  architecture: {
    labData: 'Cell Precision: 120-degree Hexagonal Symmetry | Moisture Content: 17.2%',
    lore: 'Naturally sealed with Propolis (Bee Glue) to ensure a sterile environment.',
    stats: 'Density: 0.2g Beeswax per cubic centimeter.',
    integrityMetric: 'Geometric precision maintains enzyme stability.',
  },
  extraction: {
    labData: 'Thermal Guard: Constant 32°C (Never heated) | Enzyme Count: Bio-active',
    lore: 'Manual centrifugal extraction preserves the molecular structure of the gold.',
    stats: 'Filtering: 200-micron macro-mesh (Pollen preserved).',
    integrityMetric: 'Non-irradiated certification: Active Live Enzymes.',
  },
};

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

export const shortTestimonies = [
  'The taste of the Free State veld in a jar.',
  "Uncompromising purity. My family's daily blessing.",
  'Finally, honey that feels alive and active.',
  'You can taste the integrity in every drop.',
  'A beautiful testimony of what He provides.',
];

export const CONTACT_INFO = {
  domain: 'goldenlegacy.co.za',
  domains: ['goldenlegacy.co.za', 'goldengracelegacy.co.za'],
  infoEmail: 'info@goldengracelegacy.co.za',
  founderEmail: 'grace@goldengracelegacy.co.za',
  whatsappNumber: '27794301648',
  whatsappDisplay: '+27 79 430 1648',
  location: 'Virginia, Free State, South Africa',
};

export const HONEY_TESTS_DATA = [
  {
    title: 'The Thumb Test',
    instruction: 'Put a drop on your thumb.',
    result: "If it spreads or drips, it's not pure. Real honey stays intact as a solid bead.",
  },
  {
    title: 'The Water Test',
    instruction: 'Pour honey into a glass of water.',
    result: 'Pure honey settles at the bottom like a lump. Fake honey dissolves immediately.',
  },
  {
    title: 'The Heat Test',
    instruction: 'Heat the honey slightly.',
    result: 'Pure honey caramelizes quickly. Fake honey creates bubbles and never caramelizes.',
  },
];

export const CERTS_DATA = [
  {
    id: 'agri',
    label: 'Dept. Agriculture',
    sub: 'Reg: DFS194',
    title: 'Department of Agriculture Registration',
    headline: 'DALRRD Apiary Registration (DFS194)',
    tag: 'Total Traceability',
    consumerBenefit:
      'Guarantees 100% single-origin raw South African honey. Traceable to registered apiaries with zero imported syrup adulteration.',
    legacyStory:
      'Golden Grace maintains legal registration with DALRRD, ensuring verified hive locations and protected foraging zones across Virginia, Free State.',
    accent: 'bg-amber-500/10 border-amber-500/20 group-hover:bg-amber-500',
  },
  {
    id: 'coa',
    label: 'CoA Compliant',
    sub: 'Hygiene Standards',
    title: 'Certificate of Analysis (CoA) Compliant',
    headline: 'Certificate of Analysis & R638 Hygiene',
    tag: 'Laboratory Verified',
    consumerBenefit:
      'Every harvest batch is laboratory tested: moisture strictly under 18%, active diastase enzymes intact, and zero antibiotic or heavy metal residues.',
    legacyStory:
      'Bottled under Regulation R638 food safety standards in our Virginia facility, preserving pure biological potency without industrial pasteurization.',
    accent: 'bg-amber-500/10 border-amber-500/20 group-hover:bg-amber-500',
  },
  {
    id: 'bee',
    label: 'B-BBEE Compliant',
    sub: 'Women-Led',
    title: 'B-BBEE Level 1 Compliant Enterprise',
    headline: 'Women-Led Apiculture Enterprise',
    tag: 'Community Upliftment',
    consumerBenefit:
      'Your purchase directly funds fair wages, technical beekeeping equipment, and economic sovereignty in rural Free State communities.',
    legacyStory:
      "Golden Grace Legacy champions the 'Queen Bee Initiative'—training and employing local women in traditional, sustainable apiculture.",
    accent: 'bg-amber-500/10 border-amber-500/20 group-hover:bg-amber-500',
  },
  {
    id: 'source',
    label: 'Ethically Sourced',
    sub: 'Guardian Beekeeping',
    title: 'Ethically Sourced Honey from Guardian Beekeeping',
    headline: 'Guardian Beekeeping & Ethical Harvest',
    tag: 'Bee Welfare First',
    consumerBenefit:
      'Zero sugar feeding. Our bees forage solely on indigenous veld nectar, producing superior medicinal depth and intense floral aromatics.',
    legacyStory:
      'We practice guardian beekeeping: we only harvest genuine surplus honey, never taking winter reserves or disturbing the brood sanctuary.',
    accent: 'bg-amber-500/10 border-amber-500/20 group-hover:bg-amber-500',
  },
  {
    id: 'haacap',
    label: 'Accredited Food & Safety',
    sub: 'HACCP SANS 10330:2021',
    title: 'HACCP Principles and Application',
    headline: 'HACCP & SANS 10330:2021 Certified',
    tag: 'Food Safety System',
    consumerBenefit:
      'Rigorous preventative hazard control from hive centrifugal extraction to tamper-sealed bottle, guaranteeing zero microbial contamination.',
    legacyStory:
      'Pharmaceutical-grade hygiene meets time-honored cold-straining craft, ensuring unpasteurized honey that is safe, active, and medicinal.',
    accent: 'bg-amber-500/10 border-amber-500/20 group-hover:bg-amber-500',
  },
];
