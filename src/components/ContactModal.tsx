import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { X, Send, Copy, Check, Mail, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  profile,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in your name, email, and message.');
      return;
    }

    // Basic email check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please provide a valid email address.');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleLaunchMailClient = () => {
    const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject || `Inquiry from ${name}`
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-white/[0.1] bg-[#121215] p-6 sm:p-8 text-left shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          aria-label="Close dialog"
        >
          <X className="h-4 w-4" />
        </button>

        {submitted ? (
          <div className="py-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 mb-4">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white">
              Message Ready!
            </h3>
            <p className="mt-2 text-sm text-zinc-400 max-w-sm mx-auto">
              Thank you, <span className="text-white font-medium">{name}</span>. Your message has been prepared for dispatch to{' '}
              <span className="text-zinc-200">{profile.email}</span>.
            </p>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
              <button
                onClick={handleLaunchMailClient}
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-zinc-950 hover:bg-zinc-200 transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>Launch Mail App With Draft</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setSubject('');
                  setMessage('');
                  onClose();
                }}
                className="rounded-xl border border-white/[0.08] bg-zinc-900 px-5 py-2.5 text-xs font-medium text-zinc-300 hover:bg-zinc-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div>
              <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase">
                Direct Contact
              </span>
              <h3
                id="contact-modal-title"
                className="mt-1 font-display text-2xl font-bold text-white"
              >
                Contact {profile.name}
              </h3>
              <p className="mt-1 text-xs text-zinc-400">
                Send a message directly or copy the verified email address.
              </p>
            </div>

            {/* Quick Email Banner */}
            <div className="mt-4 flex items-center justify-between rounded-xl border border-white/[0.06] bg-zinc-900/60 p-3 text-xs">
              <div className="flex items-center gap-2 truncate text-zinc-300">
                <Mail className="h-4 w-4 text-amber-400 shrink-0" />
                <span className="truncate font-mono">{profile.email}</span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="flex shrink-0 items-center gap-1 rounded-lg border border-white/[0.08] bg-zinc-800 px-2.5 py-1 text-[11px] font-medium text-zinc-200 hover:bg-zinc-700 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 text-zinc-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="mt-3 rounded-lg bg-red-500/10 border border-red-500/20 p-2.5 text-xs text-red-300">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Your Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full rounded-lg border border-white/[0.08] bg-zinc-900/80 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Your Email <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full rounded-lg border border-white/[0.08] bg-zinc-900/80 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Project inquiry / Full-time role"
                  className="w-full rounded-lg border border-white/[0.08] bg-zinc-900/80 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Message <span className="text-amber-400">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hi Etornam, I would love to talk about an upcoming web project..."
                  className="w-full rounded-lg border border-white/[0.08] bg-zinc-900/80 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <a
                  href={`mailto:${profile.email}`}
                  className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors flex items-center gap-1"
                >
                  <span>Prefer default mail app?</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg border border-white/[0.08] bg-zinc-900 px-3.5 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-800 transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-bold text-zinc-950 hover:bg-zinc-200 transition-all active:scale-95 disabled:opacity-50"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
