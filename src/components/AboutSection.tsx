import React from 'react';
import { UserProfile } from '../types';
import { Terminal, ShieldCheck, Zap } from 'lucide-react';

interface AboutSectionProps {
  profile: UserProfile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  return (
    <section id="about" className="border-t border-white/[0.08] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Heading and Editorial Kicker */}
          <div className="lg:col-span-4">
            <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase">
              Profile & Background
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Engineering with Purpose & Precision
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              Based in {profile.location}. Working at the intersection of modern frontend mechanics, design systems, and robust backend engineering.
            </p>
          </div>

          {/* Right Column: Bio Narrative and Principles */}
          <div className="lg:col-span-8 space-y-8">
            <div className="rounded-xl border border-white/[0.08] bg-[#121215] p-6 sm:p-8">
              <p className="text-base leading-relaxed text-zinc-300 sm:text-lg">
                Hello, I&apos;m <span className="font-semibold text-white">{profile.name}</span>. {profile.bio}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                I believe that exceptional software is born from intentional design, clean code semantics, and empathetic user experiences. Whether crafting a single-page responsive application or orchestrating scalable cloud infrastructure, my focus remains steadfast: deliver fast, resilient, and accessible tools that empower users.
              </p>
            </div>

            {/* Three Pillar Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-white/[0.08] bg-zinc-900/40 p-5">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-amber-400/10 text-amber-400">
                  <Zap className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-semibold text-white">Performance First</h3>
                <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                  Lean asset footprints, sub-100ms interaction latency, and strict optimization across all devices.
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-zinc-900/40 p-5">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-semibold text-white">Accessibility & WCAG</h3>
                <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                  WCAG AA compliance, intuitive keyboard navigation, screen-reader friendly semantics, and clear contrast.
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-zinc-900/40 p-5">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-400/10 text-blue-400">
                  <Terminal className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-semibold text-white">Clean Architecture</h3>
                <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                  Maintainable TypeScript codebases, decoupled modular components, and reliable data pipelines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
