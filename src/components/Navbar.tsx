import React, { useState } from 'react';
import { Mail, Menu, X, FileCode, Edit3 } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  profile: UserProfile;
  onOpenContact: () => void;
  onOpenHtmlModal: () => void;
  onOpenEditModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  onOpenContact,
  onOpenHtmlModal,
  onOpenEditModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#09090b]/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single element wordmark (Brand) */}
        <a
          href="#"
          className="font-display text-lg font-bold tracking-tight text-white transition-opacity hover:opacity-80"
        >
          {profile.name}
        </a>

        {/* Zone 2: Clean 4-6 text navigation links */}
        <nav className="hidden items-center gap-7 text-sm font-medium text-zinc-400 md:flex">
          <a
            href="#about"
            className="transition-colors hover:text-white"
          >
            About
          </a>
          <a
            href="#skills"
            className="transition-colors hover:text-white"
          >
            Three Skills
          </a>
          <a
            href="#projects"
            className="transition-colors hover:text-white"
          >
            Works
          </a>
          <button
            onClick={onOpenHtmlModal}
            className="flex items-center gap-1.5 text-xs text-amber-400/90 transition-colors hover:text-amber-300"
            title="View pure standalone HTML & CSS source code"
          >
            <FileCode className="h-3.5 w-3.5" />
            <span>Plain HTML/CSS</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenEditModal}
            className="hidden items-center gap-1.5 rounded-lg border border-white/[0.08] bg-zinc-900/60 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-800 hover:text-white sm:flex"
            title="Customize Name, Bio, and Skills"
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>Edit Profile</span>
          </button>

          <button
            onClick={onOpenContact}
            className="flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-1.5 text-xs font-semibold text-zinc-950 transition-all hover:bg-zinc-200 active:scale-95"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>Contact</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] text-zinc-300 transition-colors hover:bg-zinc-800 md:hidden"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-white/[0.08] bg-[#0c0c0f] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm font-medium text-zinc-300">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 transition-colors hover:text-white"
            >
              About
            </a>
            <a
              href="#skills"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 transition-colors hover:text-white"
            >
              Three Skills
            </a>
            <a
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 transition-colors hover:text-white"
            >
              Works
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHtmlModal();
              }}
              className="flex items-center gap-2 py-2 text-left text-amber-400 hover:text-amber-300"
            >
              <FileCode className="h-4 w-4" />
              <span>Get Plain HTML & CSS Bundle</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEditModal();
              }}
              className="flex items-center gap-2 py-2 text-left text-zinc-300 hover:text-white"
            >
              <Edit3 className="h-4 w-4" />
              <span>Edit Name, Bio & Skills</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2.5 text-xs font-semibold text-zinc-950"
            >
              <Mail className="h-4 w-4" />
              <span>Open Contact Window</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
