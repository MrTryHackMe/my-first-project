import coldBrewImg from '../assets/images/item_cold_brew_1790646346919.jpg';
import scentedCandleImg from '../assets/images/item_scented_candle_1790646364168.jpg';
import ceramicMugImg from '../assets/images/item_ceramic_mug_1790646376159.jpg';
import organicHoneyImg from '../assets/images/item_organic_honey_1790646386922.jpg';
import linenApronImg from '../assets/images/item_linen_apron_1790646397128.jpg';
import matchaTinImg from '../assets/images/item_matcha_tin_1790646407649.jpg';
import { ProductItem, BusinessConfig } from '../types';

export const DEFAULT_BUSINESS_CONFIG: BusinessConfig = {
  name: 'Lumina Artisanal Provisions',
  tagline: 'Handcrafted small-batch goods & pantry essentials',
  description: 'Pure ingredients, sustainable craft, and thoughtful design. Direct order on WhatsApp with same-day local dispatch.',
  whatsappNumber: '233540000000', // Default placeholder; easily editable in the UI
  currency: 'USD',
  currencyRate: 1,
  currencySymbol: '$',
  deliveryNotice: 'Same-day dispatch for orders confirmed before 3 PM',
  operatingHours: 'Mon – Sat: 8:00 AM – 7:00 PM',
};

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    name: 'Single Origin Cold Brew (750ml)',
    price: 14.0,
    category: 'Provisions',
    shortDescription: 'Slow-dripped Ethiopian Yirgacheffe with bright floral notes of jasmine, bergamot, and sweet citrus peel.',
    fullDescription: 'Brewed over 18 hours using icy mineral water. Bottled in apothecary amber glass to protect delicate aromatic compounds.',
    imageUrl: coldBrewImg,
    inStock: true,
    unit: '750ml glass bottle',
    badge: 'Best Seller',
  },
  {
    id: 'prod-2',
    name: 'Smoked Cedar & Amber Candle',
    price: 26.0,
    category: 'Home & Living',
    shortDescription: 'Hand-poured coconut-soy wax infused with wild cedarwood, crushed black peppercorn, and warm amber resin.',
    fullDescription: 'Cast in a reusable matte black ceramic vessel with a crackling wooden wick. Clean 55-hour burn time with zero paraffin.',
    imageUrl: scentedCandleImg,
    inStock: true,
    unit: '280g vessel · 55hr burn',
    badge: 'Artisanal Blend',
  },
  {
    id: 'prod-3',
    name: 'Hand-Thrown Stoneware Mug',
    price: 22.0,
    category: 'Ceramics',
    shortDescription: 'Matte speckled ceramic with an ergonomic thumb rest, high-fired for daily durability and heat retention.',
    fullDescription: 'Individually thrown by local potters using natural riverbed stoneware clay. Finished with food-safe non-toxic lead-free glaze.',
    imageUrl: ceramicMugImg,
    inStock: true,
    unit: '340ml capacity',
    badge: 'Small Batch',
  },
  {
    id: 'prod-4',
    name: 'Raw Wildflower Forest Honey (350g)',
    price: 16.0,
    category: 'Provisions',
    shortDescription: 'Unfiltered, cold-extracted organic forest honey with floral terroir, delicate pollen notes, and smooth crystallisation.',
    fullDescription: 'Harvested directly from wild forest apiaries. Retains natural enzymes, propolis, and rich amber color.',
    imageUrl: organicHoneyImg,
    inStock: true,
    unit: '350g hex jar',
    badge: '100% Organic',
  },
  {
    id: 'prod-5',
    name: 'Washed French Linen Apron',
    price: 44.0,
    category: 'Home & Living',
    shortDescription: 'Heavyweight natural European flax linen with deep front double utility pockets and ergonomic cross-back straps.',
    fullDescription: 'Stone-washed for immediate softness and effortless drape. No neck strain design that softens beautifully with every wash.',
    imageUrl: linenApronImg,
    inStock: true,
    unit: 'One size · Unisex',
    badge: 'Pure Linen',
  },
  {
    id: 'prod-6',
    name: 'Ceremonial Grade Uji Matcha (50g)',
    price: 32.0,
    category: 'Provisions',
    shortDescription: 'First-harvest stone-ground tencha from Kyoto, delivering electric green hue and rich umami sweetness with zero bitterness.',
    fullDescription: 'Shade-grown for 30 days prior to spring harvest. Packed in an airtight UV-shielded matte black metal canister.',
    imageUrl: matchaTinImg,
    inStock: true,
    unit: '50g sealed tin',
    badge: 'Kyoto Import',
  },
];

export function buildWhatsAppOrderLink(
  whatsappNumber: string,
  product: ProductItem,
  currencySymbol: string = '$',
  price: number = product.price
): string {
  const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '');
  const message = `Hello! I would like to order:
*${product.name}*
Price: ${currencySymbol}${price.toFixed(2)}

Please let me know how to proceed with payment and delivery.`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function generatePriceListPlainHtmlBundle(
  business: BusinessConfig,
  products: ProductItem[]
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${business.name} — Price List</title>
  <meta name="description" content="${business.description.replace(/"/g, '&quot;')}">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #09090b;
      --card-bg: #121215;
      --border: #27272a;
      --text: #f4f4f5;
      --text-muted: #a1a1aa;
      --wa-green: #25d366;
      --wa-green-hover: #1eb956;
      --accent: #f59e0b;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      padding-bottom: 4rem;
    }
    .container { max-width: 1140px; margin: 0 auto; padding: 0 1.25rem; }
    header {
      border-bottom: 1px solid var(--border);
      padding: 1.25rem 0;
      position: sticky;
      top: 0;
      background: rgba(9, 9, 11, 0.95);
      backdrop-filter: blur(8px);
      z-index: 40;
    }
    .nav-wrap { display: flex; align-items: center; justify-content: space-between; }
    .brand { font-size: 1.2rem; font-weight: 700; letter-spacing: -0.02em; }
    .hero { text-align: center; padding: 3.5rem 0 2.5rem; max-width: 680px; margin: 0 auto; }
    .hero-kicker { font-size: 0.8rem; color: var(--accent); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
    .hero-title { font-size: 2.5rem; font-weight: 800; letter-spacing: -0.03em; line-height: 1.2; margin-bottom: 0.75rem; }
    .hero-desc { color: var(--text-muted); font-size: 1.05rem; }
    
    .grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
      margin-top: 2rem;
    }
    @media (min-width: 640px) { .grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .grid { grid-template-columns: repeat(3, 1fr); } }

    .card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 14px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: transform 0.2s, border-color 0.2s;
    }
    .card:hover { transform: translateY(-2px); border-color: #3f3f46; }
    .card-img-wrap { width: 100%; aspect-ratio: 4/3; background: #1c1c20; overflow: hidden; }
    .card-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
    .card-body { padding: 1.25rem; flex-grow: 1; display: flex; flex-direction: column; }
    .card-cat { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.4rem; }
    .card-title { font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem; line-height: 1.3; }
    .card-desc { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.25rem; flex-grow: 1; }
    .card-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 1rem; border-top: 1px solid var(--border); gap: 0.75rem; }
    .card-price { font-size: 1.35rem; font-weight: 800; font-variant-numeric: tabular-nums; color: #fff; }
    .btn-wa {
      background: var(--wa-green);
      color: #050505;
      font-weight: 700;
      font-size: 0.825rem;
      padding: 0.6rem 1rem;
      border-radius: 8px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      transition: background 0.15s;
      white-space: nowrap;
    }
    .btn-wa:hover { background: var(--wa-green-hover); }
    footer { margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--border); text-align: center; color: var(--text-muted); font-size: 0.85rem; }
  </style>
</head>
<body>
  <header>
    <div class="container nav-wrap">
      <div class="brand">${business.name}</div>
      <div style="font-size: 0.85rem; color: var(--text-muted);">${business.operatingHours}</div>
    </div>
  </header>

  <main class="container">
    <div class="hero">
      <div class="hero-kicker">Curated Catalog</div>
      <h1 class="hero-title">Artisanal Price List</h1>
      <p class="hero-desc">${business.description}</p>
    </div>

    <div class="grid">
      ${products
        .map(
          (p) => `
      <div class="card">
        <div class="card-img-wrap">
          <img src="${p.imageUrl}" alt="${p.name}">
        </div>
        <div class="card-body">
          <div class="card-cat">${p.category} ${p.unit ? `· ${p.unit}` : ''}</div>
          <h2 class="card-title">${p.name}</h2>
          <p class="card-desc">${p.shortDescription}</p>
          <div class="card-footer">
            <div class="card-price">${business.currencySymbol}${p.price.toFixed(2)}</div>
            <a 
              href="${buildWhatsAppOrderLink(business.whatsappNumber, p, business.currencySymbol, p.price)}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn-wa"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </div>
      `
        )
        .join('')}
    </div>
  </main>

  <footer>
    <div class="container">
      &copy; 2026 ${business.name}. Orders fulfilled promptly via WhatsApp.
    </div>
  </footer>
</body>
</html>`;
}
