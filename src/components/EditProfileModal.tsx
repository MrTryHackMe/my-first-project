import React, { useState } from 'react';
import { UserProfile } from '../types';
import { DEFAULT_PROFILE } from '../data/portfolioData';
import { X, Save, RotateCcw, Check } from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSave: (updated: UserProfile) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
}) => {
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [savedFeedback, setSavedFeedback] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedFeedback(true);
    setTimeout(() => {
      setSavedFeedback(false);
      onClose();
    }, 800);
  };

  const handleReset = () => {
    setFormData(DEFAULT_PROFILE);
    onSave(DEFAULT_PROFILE);
    setSavedFeedback(true);
    setTimeout(() => {
      setSavedFeedback(false);
      onClose();
    }, 800);
  };

  const handleSkillChange = (
    index: number,
    field: 'name' | 'shortDescription' | 'technologies',
    value: string
  ) => {
    const newSkills = [...formData.skills];
    if (field === 'technologies') {
      newSkills[index] = {
        ...newSkills[index],
        technologies: value.split(',').map((t) => t.trim()).filter(Boolean),
      };
    } else {
      newSkills[index] = {
        ...newSkills[index],
        [field]: value,
      };
    }
    setFormData({ ...formData, skills: newSkills });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col w-full max-w-2xl max-h-[90vh] rounded-2xl border border-white/[0.1] bg-[#121215] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4 bg-zinc-900/60">
          <div>
            <h3 className="font-display text-lg font-bold text-white">
              Edit Personal Profile
            </h3>
            <p className="text-xs text-zinc-400">
              Update your name, bio, and 3 skills. Changes persist in your browser.
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-zinc-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border border-white/[0.08] bg-zinc-900 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Professional Role
              </label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full rounded-lg border border-white/[0.08] bg-zinc-900 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-lg border border-white/[0.08] bg-zinc-900 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Location & Timezone
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full rounded-lg border border-white/[0.08] bg-zinc-900 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Short Bio
            </label>
            <textarea
              rows={3}
              required
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full rounded-lg border border-white/[0.08] bg-zinc-900 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
            />
          </div>

          {/* Three Skills Customization */}
          <div className="border-t border-white/[0.08] pt-4">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">
              The Three Core Skills
            </div>

            <div className="space-y-4">
              {formData.skills.slice(0, 3).map((skill, index) => (
                <div
                  key={skill.id}
                  className="rounded-xl border border-white/[0.06] bg-zinc-900/70 p-4"
                >
                  <div className="flex items-center gap-2 mb-2 font-mono text-xs text-amber-400">
                    <span>Skill {index + 1} ({skill.number})</span>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                      placeholder="Skill Title"
                      className="w-full rounded-lg border border-white/[0.08] bg-zinc-950 px-3 py-1.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                    />
                    <textarea
                      rows={2}
                      value={skill.shortDescription}
                      onChange={(e) => handleSkillChange(index, 'shortDescription', e.target.value)}
                      placeholder="Brief description of this skill"
                      className="w-full rounded-lg border border-white/[0.08] bg-zinc-950 px-3 py-1.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={skill.technologies.join(', ')}
                      onChange={(e) => handleSkillChange(index, 'technologies', e.target.value)}
                      placeholder="Comma-separated tools (e.g. React, TypeScript, Tailwind)"
                      className="w-full rounded-lg border border-white/[0.08] bg-zinc-950 px-3 py-1.5 text-xs text-zinc-300 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between border-t border-white/[0.08] pt-4">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset to Defaults</span>
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-white/[0.08] bg-zinc-900 px-4 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-lg bg-white px-5 py-2 text-xs font-bold text-zinc-950 hover:bg-zinc-200"
              >
                {savedFeedback ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Save className="h-3.5 w-3.5" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
