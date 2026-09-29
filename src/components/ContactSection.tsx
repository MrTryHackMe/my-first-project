import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Mail, Copy, Check, ArrowUpRight, MessageSquare } from 'lucide-react';

interface ContactSectionProps {
  profile: UserProfile;
  onOpenContact: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  profile,
  onOpenContact,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="border-t border-white/[0.08] py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {/* Unboxed Kicker */}
        <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase">
          Get in Touch
        </span>

        {/* Large Modern Headline */}
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
          Let&apos;s Build Something Resilient Together
        </h2>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-xl text-base text-zinc-400 sm:text-lg">
          Whether you have an upcoming project, need architectural guidance, or want to discuss full-time engineering roles, my inbox is open.
        </p>

        {/* Interactive Contact Actions Container */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* Main Contact Button */}
          <button
            onClick={onOpenContact}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-7 text-sm font-bold text-zinc-950 shadow-lg shadow-white/5 transition-all hover:bg-zinc-200 active:scale-95 sm:w-auto"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Open Contact Dialog</span>
          </button>

          {/* Copy Direct Email Button */}
          <button
            onClick={handleCopyEmail}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-zinc-900/80 px-6 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-800 sm:w-auto"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-zinc-400" />
                <span>Copy: {profile.email}</span>
              </>
            )}
          </button>

          {/* Direct Mailto link */}
          <a
            href={`mailto:${profile.email}`}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] px-5 text-sm font-medium text-zinc-400 transition-colors hover:border-zinc-700 hover:text-white sm:w-auto"
          >
            <Mail className="h-4 w-4" />
            <span>Launch Mail App</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Social Links Bar */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-400">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <span>GitHub</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <span className="text-zinc-700" aria-hidden="true">
            ·
          </span>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <span className="text-zinc-700" aria-hidden="true">
            ·
          </span>
          <a
            href={profile.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <span>X / Twitter</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
