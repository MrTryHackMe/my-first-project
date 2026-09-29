import React, { useState } from 'react';
import { BusinessConfig } from '../types';
import { X, Check, Phone, Save, MessageCircle } from 'lucide-react';

interface WhatsAppSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: BusinessConfig;
  onSave: (updated: BusinessConfig) => void;
}

export const WhatsAppSettingsModal: React.FC<WhatsAppSettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [phone, setPhone] = useState(config.whatsappNumber);
  const [businessName, setBusinessName] = useState(config.name);
  const [deliveryNotice, setDeliveryNotice] = useState(config.deliveryNotice);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: BusinessConfig = {
      ...config,
      name: businessName.trim() || config.name,
      whatsappNumber: phone.replace(/[^0-9]/g, '') || config.whatsappNumber,
      deliveryNotice: deliveryNotice.trim() || config.deliveryNotice,
    };
    onSave(updated);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl border border-white/[0.1] bg-[#121215] p-6 text-left shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-zinc-800"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
          <MessageCircle className="h-4 w-4" />
          <span>WhatsApp Configuration</span>
        </div>

        <h3 className="mt-1 font-display text-xl font-bold text-white">
          Business WhatsApp Number
        </h3>
        <p className="mt-1 text-xs text-zinc-400">
          When customers click &quot;Order on WhatsApp&quot;, orders will be directed to this phone number with the item pre-filled.
        </p>

        <form onSubmit={handleSave} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              WhatsApp Phone Number (with Country Code)
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 233540000000 or 15551234567"
                className="w-full rounded-lg border border-white/[0.08] bg-zinc-900 pl-9 pr-3 py-2 text-xs font-mono text-white focus:border-emerald-400 focus:outline-none"
              />
            </div>
            <p className="mt-1 text-[11px] text-zinc-500">
              Format: Country code + number without spaces or `+` (e.g. `233` for Ghana, `1` for US/CA, `44` for UK).
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Business Name
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full rounded-lg border border-white/[0.08] bg-zinc-900 px-3 py-2 text-xs text-white focus:border-emerald-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Delivery Notice / Banner Text
            </label>
            <input
              type="text"
              value={deliveryNotice}
              onChange={(e) => setDeliveryNotice(e.target.value)}
              className="w-full rounded-lg border border-white/[0.08] bg-zinc-900 px-3 py-2 text-xs text-white focus:border-emerald-400 focus:outline-none"
            />
          </div>

          <div className="mt-6 flex justify-end gap-2 border-t border-white/[0.08] pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-white/[0.08] bg-zinc-900 px-4 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-5 py-2 text-xs font-bold text-zinc-950 hover:bg-emerald-400 transition-colors"
            >
              {saved ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="h-3.5 w-3.5" />
                  <span>Update Number</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
