/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { UserProfile } from './types';
import { DEFAULT_PROFILE } from './data/portfolioData';
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

const STORAGE_KEY = 'etornam_portfolio_profile_v1';

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure image URL is preserved from current bundle if default was used
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

  // Sync document title with profile name
  useEffect(() => {
    document.title = `${profile.name} — Personal Website`;
  }, [profile.name]);

  const handleSaveProfile = (updated: UserProfile) => {
    setProfile(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Storage error fallback
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] antialiased selection:bg-amber-500/20 selection:text-amber-200">
      {/* Navigation (Strict 3-zone contract) */}
      <Navbar
        profile={profile}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenHtmlModal={() => setIsHtmlModalOpen(true)}
        onOpenEditModal={() => setIsEditModalOpen(true)}
      />

      {/* Main Single Page Content */}
      <main id="main-content">
        {/* Hero Section */}
        <Hero
          profile={profile}
          onOpenContact={() => setIsContactOpen(true)}
          onOpenHtmlModal={() => setIsHtmlModalOpen(true)}
        />

        {/* About Section */}
        <AboutSection profile={profile} />

        {/* Three Primary Skills Section */}
        <SkillsSection profile={profile} />

        {/* Selected Featured Works */}
        <ProjectsSection />

        {/* Contact Section with Prominent Action Button */}
        <ContactSection
          profile={profile}
          onOpenContact={() => setIsContactOpen(true)}
        />
      </main>

      {/* Clean Quiet Footer */}
      <Footer
        profile={profile}
        onOpenHtmlModal={() => setIsHtmlModalOpen(true)}
      />

      {/* Modals & Dialogs */}
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
    </div>
  );
}
