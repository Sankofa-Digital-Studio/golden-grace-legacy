import { PRODUCTS } from './catalog.js';

const photos = '/images/catalog-2026-11/';
const definitions = [
  ['pure-honey', 'Pure Honey', 'pure-honey-', 'regular.jpg'],
  ['creamed-honey', 'Creamed Honey', 'creamed-honey-', 'creamed.jpg'],
  ['vitality-blend', 'Vitality Blend Honey', 'vitality-blend-', null],
];

function group(id, title, rows, image) {
  const options = rows.flatMap((row) => row.sizes.map((size) => ({
    ...row, size, title,
  }))).sort((a, b) => {
    const weight = (size) => {
      const match = size.match(/^(\d+(?:\.\d+)?)\s*(kg|g)/);
      return match ? Number(match[1]) * (match[2] === 'kg' ? 1000 : 1) : 0;
    };
    return weight(a.size) - weight(b.size);
  });
  return {
    ...rows[0], id, title, options,
    sizes: options.map((option) => option.size),
    categories: [...new Set(rows.map((row) => row.category))],
    img: image ? photos + image : rows[0].img,
    imageNote: image ? 'Range photograph; packaging varies by size.' : undefined,
    accessoryImg: id === 'mini-honey-dipper' ? photos + 'dipper.jpg' : undefined,
    // Stock is recorded per original SKU, not a combined inventory total.
    remainingJars: undefined, totalBatchJars: undefined, scarcity: undefined,
  };
}

const consumed = new Set();
const grouped = definitions.map(([id, title, prefix, image]) => {
  const rows = PRODUCTS.filter((row) => row.id.startsWith(prefix));
  rows.forEach((row) => consumed.add(row.id));
  return group(id, title, rows, image);
});

const genericInfusions = PRODUCTS.filter((row) => row.id.startsWith('infused-selection-'));
for (const [id, title, prefix, image] of [
  ['lemon-ginger-turmeric', 'Lemon, Ginger & Turmeric Infused Honey', 'lemon-ginger-turmeric-', 'infused.jpg'],
  ['cinnamon-infused', 'Cinnamon Infused Honey', 'cinnamon-infused-', 'cinnamon.jpg'],
  ['garlic-infused', 'Garlic Infused Honey', 'garlic-infused-', 'infused-range.jpg'],
]) {
  const specific = PRODUCTS.filter((row) => row.id.startsWith(prefix));
  const sizes = new Map(genericInfusions.map((row) => [row.sizes[0], {
    ...row, id: `${row.id}-${id}`, sourceProductId: row.id,
  }]));
  // A flavour-specific price takes precedence over the generic range price.
  specific.forEach((row) => sizes.set(row.sizes[0], row));
  [...specific, ...genericInfusions].forEach((row) => consumed.add(row.id));
  grouped.push(group(id, title, [...sizes.values()], image));
}

for (const [id, title, suffix, image] of [
  ['mini-honey-dipper', 'Miniature Honey with Dipper', '-dipper', 'mini.jpg'],
  ['mini-honey-complete', 'Miniature Honey with Dipper and Bag', '-complete', 'mini-bag.jpg'],
]) {
  const rows = PRODUCTS.filter((row) => row.id.startsWith('mini-collection-') && row.id.endsWith(suffix));
  rows.forEach((row) => consumed.add(row.id));
  grouped.push(group(id, title, rows, image));
}
// Honey-only miniatures are already available in the Pure Honey size selector.
PRODUCTS.filter((row) => /^mini-collection-.*-honey$/.test(row.id)).forEach((row) => consumed.add(row.id));
const coasters = PRODUCTS.filter((row) => ['individual-coaster', 'coasters-set-5'].includes(row.id));
coasters.forEach((row) => consumed.add(row.id));
grouped.push(group('coasters', 'Golden Grace Coasters', coasters, null));

const productPhotos = {
  'white-ceramic-mug-giftbox': 'mug-box.jpg',
  'dual-coffee-mugs-pair': 'mug-pair.jpg',
};

export const SHOP_PRODUCTS = [
  ...grouped,
  ...PRODUCTS.filter((row) => !consumed.has(row.id)).map((row) => ({
    ...row,
    img: productPhotos[row.id] ? photos + productPhotos[row.id] : row.img,
    ...(row.category === 'Bee Services' ? { img: photos + 'harvest.jpg' } : {}),
  })),
];

export function matchesCategory(product, category) {
  return category === 'all' || (product.categories || [product.category]).includes(category);
}

export function resolveProductOption(product, size = product.sizes?.[0]) {
  if (!product.options) return { ...product, selectedSize: size };
  const option = product.options.find((entry) => entry.size === size);
  if (!option) throw new RangeError(`Unknown size for ${product.id}: ${size}`);
  const { options: _options, ...base } = product;
  return {
    ...base, ...option, title: product.title, img: product.img,
    productGroupId: product.id, selectedSize: size,
  };
}
