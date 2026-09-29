import React from 'react';
import { UserProfile } from '../types';
import { ArrowUp, FileCode } from 'lucide-react';

interface FooterProps {
  profile: UserProfile;
  onOpenHtmlModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onOpenHtmlModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#09090b] py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Brand & Quiet Copyright */}
          <div className="text-center sm:text-left">
            <div className="font-display text-base font-bold text-white">
              {profile.name}
            </div>
            <p className="mt-1 text-xs text-zinc-400">
              Personal portfolio · Designed with semantic modern standards.
            </p>
          </div>

          {/* Quick Footer Links */}
          <div className="flex items-center gap-5 text-xs text-zinc-400">
            <button
              onClick={onOpenHtmlModal}
              className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
            >
              <FileCode className="h-3.5 w-3.5" />
              <span>Standalone HTML/CSS</span>
            </button>
            <span className="text-zinc-700" aria-hidden="true">
              ·
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Year notice */}
        <div className="mt-8 border-t border-white/[0.04] pt-6 text-center text-[11px] text-zinc-400">
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
