import React, { useState } from 'react';
import { Mail, ArrowDown, MapPin, Copy, Check, FileCode } from 'lucide-react';
import { UserProfile } from '../types';

interface HeroProps {
  profile: UserProfile;
  onOpenContact: () => void;
  onOpenHtmlModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  profile,
  onOpenContact,
  onOpenHtmlModal,
}) => {
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
      {/* Subtle radial ambient glow */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-500/5 blur-[120px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Main Hero Copy - 7 cols */}
          <div className="lg:col-span-8">
            {/* Status indicator - unboxed text with green glowing status dot */}
            <div className="mb-6 flex items-center gap-2 text-xs font-medium text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span>{profile.status}</span>
            </div>

            {/* Name Heading with strict text-wrap: balance */}
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {profile.name}
            </h1>

            {/* Role / Subtitle */}
            <p className="mt-3 text-lg font-medium text-zinc-300 sm:text-xl">
              {profile.role}
            </p>

            {/* Short Bio */}
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              {profile.bio}
            </p>

            {/* Location & Quick Meta (clean unboxed text with separators) */}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-zinc-400">
              <span className="flex items-center gap-1 text-zinc-300">
                <MapPin className="h-3.5 w-3.5 text-amber-400" />
                {profile.location}
              </span>
              <span aria-hidden="true">·</span>
              <span>Software Engineering</span>
              <span aria-hidden="true">·</span>
              <span>Design Systems</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-zinc-300">Plain HTML/CSS Ready</span>
            </div>

            {/* Primary Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenContact}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold text-zinc-950 transition-all hover:bg-zinc-200 active:scale-95"
              >
                <Mail className="h-4 w-4" />
                <span>Contact Me</span>
              </button>

              <button
                onClick={handleCopyEmail}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/[0.1] bg-zinc-900/60 px-4 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied Email</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-zinc-400" />
                    <span className="truncate max-w-[170px] sm:max-w-none">{profile.email}</span>
                  </>
                )}
              </button>

              <a
                href="#skills"
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-lg border border-white/[0.08] px-4 text-sm font-medium text-zinc-400 transition-colors hover:border-zinc-700 hover:text-white"
              >
                <span>Three Skills</span>
                <ArrowDown className="h-3.5 w-3.5" />
              </a>

              <button
                onClick={onOpenHtmlModal}
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-lg border border-amber-500/20 bg-amber-500/10 px-3.5 text-xs font-semibold text-amber-300 transition-colors hover:bg-amber-500/20"
                title="View and export plain HTML/CSS single-file code"
              >
                <FileCode className="h-3.5 w-3.5" />
                <span>Plain HTML/CSS Code</span>
              </button>
            </div>
          </div>

          {/* Right Visual / Avatar Frame - 4 cols */}
          <div className="flex justify-center lg:col-span-4 lg:justify-end">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px]">
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/[0.1] bg-zinc-900 shadow-2xl">
                {!imageError ? (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950 p-6 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-amber-500/10 text-xl font-bold text-amber-400">
                      {profile.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <span className="mt-3 font-display text-base font-semibold text-white">
                      {profile.name}
                    </span>
                    <span className="text-xs text-zinc-400">{profile.role}</span>
                  </div>
                )}
                {/* Subtle border highlight scrim */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
              </div>

              {/* Sub-badge: Minimalist availability badge */}
              <div className="mt-3 flex items-center justify-between text-xs text-zinc-400">
                <span className="font-mono text-[11px] text-zinc-300">EST. 2026</span>
                <span className="text-zinc-400">Personal Portfolio</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
