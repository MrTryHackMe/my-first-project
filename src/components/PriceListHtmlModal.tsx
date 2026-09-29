import React, { useState } from 'react';
import { BusinessConfig, ProductItem } from '../types';
import { generatePriceListPlainHtmlBundle } from '../data/productsData';
import { X, Copy, Check, Download, Eye, Code, FileCode } from 'lucide-react';

interface PriceListHtmlModalProps {
  isOpen: boolean;
  onClose: () => void;
  business: BusinessConfig;
  products: ProductItem[];
}

export const PriceListHtmlModal: React.FC<PriceListHtmlModalProps> = ({
  isOpen,
  onClose,
  business,
  products,
}) => {
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const htmlBundle = generatePriceListPlainHtmlBundle(business, products);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(htmlBundle);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([htmlBundle], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${business.name.toLowerCase().replace(/\s+/g, '-')}-price-list.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col w-full max-w-4xl h-[88vh] rounded-2xl border border-white/[0.1] bg-[#121215] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-3.5 bg-zinc-900/60">
          <div className="flex items-center gap-2">
            <FileCode className="h-4 w-4 text-emerald-400" />
            <span className="font-display text-sm font-bold text-white">
              Price List — Plain HTML & CSS Standalone Export
            </span>
            <span className="hidden sm:inline text-xs text-zinc-400">
              · Ready to host anywhere
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-lg bg-zinc-800/80 p-0.5 border border-white/[0.06]">
              <button
                onClick={() => setActiveTab('code')}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  activeTab === 'code'
                    ? 'bg-zinc-700 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Code className="h-3.5 w-3.5" />
                <span>Source</span>
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  activeTab === 'preview'
                    ? 'bg-zinc-700 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Eye className="h-3.5 w-3.5" />
                <span>Preview</span>
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:bg-zinc-700 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Copy Code</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-zinc-950 hover:bg-zinc-200 transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Download</span>
            </button>

            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors ml-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto bg-[#09090b]">
          {activeTab === 'code' ? (
            <div className="p-4">
              <pre className="font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto selection:bg-emerald-500/30">
                <code>{htmlBundle}</code>
              </pre>
            </div>
          ) : (
            <iframe
              title="Price List Plain HTML Preview"
              srcDoc={htmlBundle}
              className="w-full h-full border-none bg-[#09090b]"
              sandbox="allow-scripts allow-popups"
            />
          )}
        </div>
      </div>
    </div>
  );
};
