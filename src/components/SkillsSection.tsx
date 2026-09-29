import React, { useState } from 'react';
import { UserProfile } from '../types';
import { ChevronDown, ChevronUp, Layers, Palette, Server, CheckCircle2 } from 'lucide-react';

interface SkillsSectionProps {
  profile: UserProfile;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ profile }) => {
  const [expandedSkillId, setExpandedSkillId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedSkillId((prev) => (prev === id ? null : id));
  };

  const getSkillIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Layers className="h-5 w-5 text-amber-400" />;
      case 1:
        return <Palette className="h-5 w-5 text-emerald-400" />;
      case 2:
      default:
        return <Server className="h-5 w-5 text-blue-400" />;
    }
  };

  return (
    <section id="skills" className="border-t border-white/[0.08] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase">
              Core Competencies
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
              Three Primary Skills
            </h2>
          </div>
          <p className="mt-3 text-sm text-zinc-400 md:mt-0 md:max-w-md md:text-right">
            Carefully cultivated across years of shipping web applications, design systems, and resilient server infrastructure.
          </p>
        </div>

        {/* 3 Skill Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {profile.skills.slice(0, 3).map((skill, index) => {
            const isExpanded = expandedSkillId === skill.id;

            return (
              <div
                key={skill.id}
                className="group flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#121215] p-6 transition-all duration-200 hover:border-zinc-700 hover:bg-[#151519] sm:p-7"
              >
                <div>
                  {/* Top Bar with Editorial Index & Category */}
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 border border-white/[0.06]">
                        {getSkillIcon(index)}
                      </div>
                      <span className="font-mono text-xs font-semibold tracking-wider text-amber-400">
                        {skill.number}
                      </span>
                    </div>
                    <span className="text-[11px] font-medium tracking-tight text-zinc-400">
                      {skill.category}
                    </span>
                  </div>

                  {/* Skill Name */}
                  <h3 className="mt-5 font-display text-lg font-bold text-white transition-colors group-hover:text-amber-300 sm:text-xl">
                    {skill.name}
                  </h3>

                  {/* Short Description */}
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    {skill.shortDescription}
                  </p>

                  {/* Technology Stack Tags (Clean unboxed inline text with separators) */}
                  <div className="mt-5 pt-4 border-t border-white/[0.04]">
                    <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Tools & Stack
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-300">
                      {skill.technologies.map((tech, i) => (
                        <React.Fragment key={tech}>
                          <span className="text-zinc-300">{tech}</span>
                          {i < skill.technologies.length - 1 && (
                            <span className="text-zinc-600" aria-hidden="true">
                              ·
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Expandable In-Depth Highlights */}
                  {isExpanded && (
                    <div className="mt-5 border-t border-white/[0.08] pt-4 animate-in fade-in duration-200">
                      <p className="text-xs leading-relaxed text-zinc-300 mb-3">
                        {skill.fullDescription}
                      </p>
                      <div className="space-y-2">
                        {skill.highlights.map((highlight, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2 text-xs text-zinc-400">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Action: Expand / Collapse Toggle */}
                <div className="mt-6 pt-4 border-t border-white/[0.06]">
                  <button
                    onClick={() => toggleExpand(skill.id)}
                    className="flex w-full items-center justify-between text-xs font-medium text-zinc-400 transition-colors hover:text-white"
                  >
                    <span>{isExpanded ? 'Collapse Details' : 'View Deep Dive'}</span>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
