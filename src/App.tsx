/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { UserProfile, BusinessConfig, ProductItem } from './types';
import { DEFAULT_PROFILE } from './data/portfolioData';
import { DEFAULT_BUSINESS_CONFIG, INITIAL_PRODUCTS } from './data/productsData';
import { PriceListPage } from './components/PriceListPage';
import { WhatsAppSettingsModal } from './components/WhatsAppSettingsModal';
import { PriceListHtmlModal } from './components/PriceListHtmlModal';

// Components for Portfolio View
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { PlainHtmlModal } from './components/PlainHtmlModal';
import { EditProfileModal } from './components/EditProfileModal';
import { ShoppingBag, User } from 'lucide-react';

const STORAGE_KEY_PROFILE = 'etornam_portfolio_profile_v1';
const STORAGE_KEY_BUSINESS = 'small_biz_config_v1';

export default function App() {
  const [activeView, setActiveView] = useState<'pricelist' | 'portfolio'>('pricelist');

  // Business State
  const [business, setBusiness] = useState<BusinessConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BUSINESS);
      if (saved) return { ...DEFAULT_BUSINESS_CONFIG, ...JSON.parse(saved) };
    } catch {
      // Fallback
    }
    return DEFAULT_BUSINESS_CONFIG;
  });

  const [products] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [isWaSettingsOpen, setIsWaSettingsOpen] = useState(false);
  const [isPriceListHtmlOpen, setIsPriceListHtmlOpen] = useState(false);

  // Portfolio State
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_PROFILE,
          ...parsed,
          avatarUrl: DEFAULT_PROFILE.avatarUrl,
        };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_PROFILE;
  });

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isHtmlModalOpen, setIsHtmlModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Sync document title
  useEffect(() => {
    if (activeView === 'pricelist') {
      document.title = `${business.name} — Price List & WhatsApp Orders`;
    } else {
      document.title = `${profile.name} — Personal Website`;
    }
  }, [activeView, business.name, profile.name]);

  const handleSaveBusiness = (updated: BusinessConfig) => {
    setBusiness(updated);
    try {
      localStorage.setItem(STORAGE_KEY_BUSINESS, JSON.stringify(updated));
    } catch {
      // Storage error fallback
    }
  };

  const handleSaveProfile = (updated: UserProfile) => {
    setProfile(updated);
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(updated));
    } catch {
      // Storage error fallback
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5]">
      {/* Top Universal App Switcher Bar */}
      <div className="bg-[#121215] border-b border-white/[0.08] px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 p-0.5 bg-zinc-900 rounded-lg border border-white/[0.06]">
          <button
            onClick={() => setActiveView('pricelist')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-semibold transition-colors ${
              activeView === 'pricelist'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>Small Business Price List</span>
          </button>

          <button
            onClick={() => setActiveView('portfolio')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-semibold transition-colors ${
              activeView === 'portfolio'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <User className="h-3.5 w-3.5" />
            <span>Developer Portfolio</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[11px] text-zinc-500">
          <span>Active View:</span>
          <span className="text-zinc-300 font-medium">
            {activeView === 'pricelist'
              ? '6-Item WhatsApp Storefront'
              : 'Personal Website'}
          </span>
        </div>
      </div>

      {/* Main Content Render based on View */}
      {activeView === 'pricelist' ? (
        <>
          <PriceListPage
            business={business}
            products={products}
            onOpenSettings={() => setIsWaSettingsOpen(true)}
            onOpenHtmlModal={() => setIsPriceListHtmlOpen(true)}
            onSwitchToPortfolio={() => setActiveView('portfolio')}
          />

          <WhatsAppSettingsModal
            isOpen={isWaSettingsOpen}
            onClose={() => setIsWaSettingsOpen(false)}
            config={business}
            onSave={handleSaveBusiness}
          />

          <PriceListHtmlModal
            isOpen={isPriceListHtmlOpen}
            onClose={() => setIsPriceListHtmlOpen(false)}
            business={business}
            products={products}
          />
        </>
      ) : (
        <>
          {/* Portfolio View */}
          <Navbar
            profile={profile}
            onOpenContact={() => setIsContactOpen(true)}
            onOpenHtmlModal={() => setIsHtmlModalOpen(true)}
            onOpenEditModal={() => setIsEditModalOpen(true)}
          />

          <main id="main-content">
            <Hero
              profile={profile}
              onOpenContact={() => setIsContactOpen(true)}
              onOpenHtmlModal={() => setIsHtmlModalOpen(true)}
            />
            <AboutSection profile={profile} />
            <SkillsSection profile={profile} />
            <ProjectsSection />
            <ContactSection
              profile={profile}
              onOpenContact={() => setIsContactOpen(true)}
            />
          </main>

          <Footer
            profile={profile}
            onOpenHtmlModal={() => setIsHtmlModalOpen(true)}
          />

          <ContactModal
            isOpen={isContactOpen}
            onClose={() => setIsContactOpen(false)}
            profile={profile}
          />

          <PlainHtmlModal
            isOpen={isHtmlModalOpen}
            onClose={() => setIsHtmlModalOpen(false)}
            profile={profile}
          />

          <EditProfileModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            profile={profile}
            onSave={handleSaveProfile}
          />
        </>
      )}
    </div>
  );
}
