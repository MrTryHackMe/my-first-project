import React, { useState, useMemo } from 'react';
import { ProductItem, BusinessConfig } from '../types';
import { buildWhatsAppOrderLink } from '../data/productsData';
import {
  MessageCircle,
  Search,
  ExternalLink,
  Settings,
  Sparkles,
  FileCode,
  ShieldCheck,
  Clock,
  Truck,
  Check,
  Copy,
} from 'lucide-react';

interface PriceListPageProps {
  business: BusinessConfig;
  products: ProductItem[];
  onOpenSettings: () => void;
  onOpenHtmlModal: () => void;
  onSwitchToPortfolio?: () => void;
}

const CURRENCIES = [
  { code: 'USD', symbol: '$', rate: 1.0, label: 'USD ($)' },
  { code: 'GHS', symbol: 'GH₵', rate: 15.5, label: 'GHS (GH₵)' },
  { code: 'GBP', symbol: '£', rate: 0.79, label: 'GBP (£)' },
  { code: 'EUR', symbol: '€', rate: 0.92, label: 'EUR (€)' },
];

export const PriceListPage: React.FC<PriceListPageProps> = ({
  business,
  products,
  onOpenSettings,
  onOpenHtmlModal,
  onSwitchToPortfolio,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLinkIndex, setCopiedLinkIndex] = useState<number | null>(null);
  const [quickOrderProduct, setQuickOrderProduct] = useState<ProductItem | null>(null);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [customerNote, setCustomerNote] = useState('');

  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return ['All', ...Array.from(cats)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesCat =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchesQuery =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesQuery;
    });
  }, [products, selectedCategory, searchQuery]);

  const formatPrice = (basePriceUsd: number) => {
    const converted = basePriceUsd * selectedCurrency.rate;
    return `${selectedCurrency.symbol}${converted.toFixed(2)}`;
  };

  const getConvertedPriceValue = (basePriceUsd: number) => {
    return basePriceUsd * selectedCurrency.rate;
  };

  const handleCopyLink = async (product: ProductItem, index: number) => {
    const link = buildWhatsAppOrderLink(
      business.whatsappNumber,
      product,
      selectedCurrency.symbol,
      getConvertedPriceValue(product.price)
    );
    try {
      await navigator.clipboard.writeText(link);
      setCopiedLinkIndex(index);
      setTimeout(() => setCopiedLinkIndex(null), 2000);
    } catch {
      // Fallback
    }
  };

  const handleLaunchQuickWhatsApp = (product: ProductItem) => {
    const cleanPhone = business.whatsappNumber.replace(/[^0-9]/g, '');
    const priceFormatted = formatPrice(product.price * orderQuantity);
    const text = `Hello! I would like to order:
*${product.name}*
Quantity: ${orderQuantity}
Total: ${priceFormatted}${customerNote ? `\nNote: ${customerNote}` : ''}

Please let me know how to proceed with payment and delivery.`;

    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setQuickOrderProduct(null);
    setOrderQuantity(1);
    setCustomerNote('');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] antialiased selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Small Business Top Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#09090b]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Wordmark */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <span className="font-display text-base font-bold tracking-tight text-white">
                {business.name}
              </span>
              <span className="hidden sm:inline text-xs text-zinc-400 ml-2">
                · Direct WhatsApp Orders
              </span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2.5">
            {/* Currency Selector */}
            <div className="flex items-center rounded-lg border border-white/[0.08] bg-zinc-900/80 px-2 py-1 text-xs">
              <span className="text-zinc-500 mr-1.5 hidden sm:inline">Currency:</span>
              <select
                value={selectedCurrency.code}
                onChange={(e) => {
                  const found = CURRENCIES.find((c) => c.code === e.target.value);
                  if (found) setSelectedCurrency(found);
                }}
                className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
              >
                {CURRENCIES.map((curr) => (
                  <option key={curr.code} value={curr.code} className="bg-zinc-900 text-white">
                    {curr.code} ({curr.symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* Standalone HTML Button */}
            <button
              onClick={onOpenHtmlModal}
              className="hidden items-center gap-1.5 rounded-lg border border-white/[0.08] bg-zinc-900/60 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white sm:flex"
              title="View standalone HTML & CSS source"
            >
              <FileCode className="h-3.5 w-3.5 text-emerald-400" />
              <span>Plain HTML</span>
            </button>

            {/* WhatsApp Settings Button */}
            <button
              onClick={onOpenSettings}
              className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-zinc-900/80 px-2.5 py-1.5 text-xs font-medium text-zinc-300 hover:border-zinc-700 hover:text-white"
              title="Set WhatsApp Phone Number"
            >
              <Settings className="h-3.5 w-3.5 text-zinc-400" />
              <span className="hidden sm:inline">WhatsApp Config</span>
            </button>

            {/* Optional switch back to developer personal website */}
            {onSwitchToPortfolio && (
              <button
                onClick={onSwitchToPortfolio}
                className="hidden lg:flex items-center gap-1 rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-300 hover:bg-amber-500/20"
              >
                <span>Portfolio View</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero / Price List Header */}
      <section className="relative overflow-hidden pt-10 pb-8 md:pt-14 md:pb-12 border-b border-white/[0.06]">
        <div
          className="pointer-events-none absolute top-10 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-500/5 blur-[100px]"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400 mb-4">
            <MessageCircle className="h-3.5 w-3.5" />
            <span>Instant Ordering via WhatsApp</span>
          </div>

          <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            {business.name}
          </h1>

          <p className="mt-2 text-base font-medium text-zinc-300 sm:text-lg">
            {business.tagline}
          </p>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
            {business.description}
          </p>

          {/* Delivery and Trust Points (clean unboxed text with separators) */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <Truck className="h-3.5 w-3.5 text-emerald-400" />
              {business.deliveryNotice}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5 text-zinc-300">
              <Clock className="h-3.5 w-3.5 text-emerald-400" />
              {business.operatingHours}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5 text-zinc-300">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              WhatsApp Verified Business
            </span>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="sticky top-16 z-30 border-b border-white/[0.08] bg-[#09090b]/95 backdrop-blur-md py-3.5">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          {/* Category Tabs (clean segmented buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-white text-zinc-950 shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search 6 artisanal items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-white/[0.08] bg-zinc-900/80 pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:border-emerald-400 focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Main 6-Item Clean Cards Grid */}
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Selected Price List
          </div>
          <div className="text-xs text-zinc-500">
            Showing {filteredProducts.length} of {products.length} items
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product, index) => {
            const convertedPrice = getConvertedPriceValue(product.price);
            const waLink = buildWhatsAppOrderLink(
              business.whatsappNumber,
              product,
              selectedCurrency.symbol,
              convertedPrice
            );

            return (
              <div
                key={product.id}
                className="group flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#121215] overflow-hidden transition-all duration-200 hover:border-zinc-700 hover:bg-[#15151a]"
              >
                {/* 4:3 Image Container */}
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Badge top-left (unboxed or subtle clean indicator) */}
                    {product.badge && (
                      <div className="absolute top-3 left-3 rounded-md bg-black/70 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-emerald-300 border border-white/[0.08]">
                        {product.badge}
                      </div>
                    )}

                    {/* Stock Status indicator */}
                    <div className="absolute top-3 right-3 rounded-md bg-black/70 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-zinc-300 border border-white/[0.08] flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span>In Stock</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6">
                    {/* Category and unit (clean unboxed text with ·) */}
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-2">
                      <span className="uppercase tracking-wider text-[11px] font-semibold text-zinc-400">
                        {product.category}
                      </span>
                      {product.unit && (
                        <>
                          <span aria-hidden="true" className="text-zinc-600">
                            ·
                          </span>
                          <span className="text-zinc-400">{product.unit}</span>
                        </>
                      )}
                    </div>

                    {/* Product Name */}
                    <h2 className="font-display text-lg font-bold text-white transition-colors group-hover:text-emerald-300">
                      {product.name}
                    </h2>

                    {/* Short Description */}
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                      {product.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Footer with Price and WhatsApp Action */}
                <div className="border-t border-white/[0.06] bg-zinc-900/30 p-5 sm:p-6">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block">
                        Price
                      </span>
                      <span className="font-mono text-2xl font-extrabold tabular-nums text-white">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    {product.unit && (
                      <span className="text-xs text-zinc-400">
                        per {product.unit.split('·')[0].trim()}
                      </span>
                    )}
                  </div>

                  {/* Primary WhatsApp Order Button */}
                  <div className="flex flex-col gap-2">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 text-xs font-bold text-zinc-950 transition-all hover:bg-[#20ba5a] active:scale-[0.98] shadow-md shadow-[#25D366]/10"
                    >
                      <MessageCircle className="h-4 w-4 shrink-0 fill-current" />
                      <span>Order on WhatsApp</span>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" />
                    </a>

                    {/* Secondary Quick Options */}
                    <div className="flex items-center justify-between pt-1 text-[11px] text-zinc-400">
                      <button
                        onClick={() => setQuickOrderProduct(product)}
                        className="hover:text-zinc-200 transition-colors"
                      >
                        Customize Qty / Note
                      </button>
                      <button
                        onClick={() => handleCopyLink(product, index)}
                        className="flex items-center gap-1 hover:text-zinc-200 transition-colors"
                        title="Copy direct WhatsApp message link"
                      >
                        {copiedLinkIndex === index ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-400" />
                            <span className="text-emerald-400">Link Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Copy Link</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* If no items match search */}
        {filteredProducts.length === 0 && (
          <div className="rounded-2xl border border-white/[0.08] bg-[#121215] p-12 text-center">
            <p className="text-base text-zinc-400">
              No products found matching &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-3 text-xs font-semibold text-emerald-400 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>

      {/* How It Works & Ordering Policy */}
      <section className="border-t border-white/[0.08] bg-[#0c0c0f] py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Simple 3-Step Process
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
              How Ordering on WhatsApp Works
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-white/[0.08] bg-[#121215] p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 font-mono font-bold mb-4">
                01
              </div>
              <h3 className="font-semibold text-white text-base">Select Your Item</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Click &quot;Order on WhatsApp&quot; on any card. WhatsApp will automatically launch with the item name and price pre-filled in your chat.
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-[#121215] p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 font-mono font-bold mb-4">
                02
              </div>
              <h3 className="font-semibold text-white text-base">Confirm Address</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Send the message to our business chat. Our team immediately confirms stock availability and calculates your local delivery fare.
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-[#121215] p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 font-mono font-bold mb-4">
                03
              </div>
              <h3 className="font-semibold text-white text-base">Pay & Receive</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Pay securely via Mobile Money, Bank Transfer, or Cash on Delivery upon arrival. Your order is packed and dispatched immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-[#09090b] py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row text-xs text-zinc-400">
            <div>
              &copy; {new Date().getFullYear()} {business.name}. Artisanal small-batch price list.
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={onOpenHtmlModal}
                className="hover:text-emerald-400 transition-colors"
              >
                Standalone Plain HTML/CSS
              </button>
              <span className="text-zinc-700">·</span>
              <button
                onClick={onOpenSettings}
                className="hover:text-white transition-colors"
              >
                Configure WhatsApp Number
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Quick Customize Quantity & Note Dialog */}
      {quickOrderProduct && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
          onClick={() => setQuickOrderProduct(null)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-white/[0.1] bg-[#121215] p-6 text-left shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              Order Details
            </div>
            <h3 className="font-display text-xl font-bold text-white">
              {quickOrderProduct.name}
            </h3>
            <p className="mt-1 text-xs text-zinc-400">
              Unit Price: {formatPrice(quickOrderProduct.price)}
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setOrderQuantity(Math.max(1, orderQuantity - 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-zinc-900 text-lg font-bold text-white hover:bg-zinc-800"
                  >
                    -
                  </button>
                  <span className="font-mono text-base font-bold text-white w-8 text-center">
                    {orderQuantity}
                  </span>
                  <button
                    onClick={() => setOrderQuantity(orderQuantity + 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-zinc-900 text-lg font-bold text-white hover:bg-zinc-800"
                  >
                    +
                  </button>
                  <div className="ml-auto font-mono text-sm font-bold text-emerald-400">
                    Total: {formatPrice(quickOrderProduct.price * orderQuantity)}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Delivery Note or Special Instructions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Please deliver after 5pm / ring the doorbell"
                  value={customerNote}
                  onChange={(e) => setCustomerNote(e.target.value)}
                  className="w-full rounded-lg border border-white/[0.08] bg-zinc-900 px-3 py-2 text-xs text-white focus:border-emerald-400 focus:outline-none"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setQuickOrderProduct(null)}
                  className="flex-1 rounded-xl border border-white/[0.08] bg-zinc-900 py-2.5 text-xs font-medium text-zinc-300 hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleLaunchQuickWhatsApp(quickOrderProduct)}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] py-2.5 text-xs font-bold text-zinc-950 hover:bg-[#20ba5a]"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Send to WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
