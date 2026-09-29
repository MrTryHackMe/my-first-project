import React, { useState } from 'react';
import { FEATURED_PROJECTS } from '../data/portfolioData';
import { ProjectItem } from '../types';
import { ExternalLink, Sparkles, X } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="border-t border-white/[0.08] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase">
              Demonstrated Works
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Selected Projects
            </h2>
          </div>
          <p className="mt-2 text-sm text-zinc-400 md:mt-0">
            Real implementations demonstrating each of the three core disciplines.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {FEATURED_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="flex flex-col justify-between rounded-xl border border-white/[0.08] bg-[#121215] p-6 transition-all hover:border-zinc-700 hover:bg-[#15151a]"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="font-medium text-zinc-300">{project.role}</span>
                  <span className="font-mono text-zinc-500">{project.year}</span>
                </div>

                <h3 className="mt-4 font-display text-lg font-bold text-white">
                  {project.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {project.description}
                </p>

                {/* Tags (unboxed text with · separators) */}
                <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs text-zinc-400">
                  {project.tags.map((tag, idx) => (
                    <React.Fragment key={tag}>
                      <span className="text-zinc-300">{tag}</span>
                      {idx < project.tags.length - 1 && (
                        <span className="text-zinc-600" aria-hidden="true">
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-white/[0.06] pt-4 flex items-center justify-between">
                <span className="font-mono text-[11px] text-amber-400/90 truncate max-w-[190px]">
                  {project.metrics}
                </span>
                <button
                  onClick={() => setActiveProject(project)}
                  className="flex items-center gap-1 text-xs font-semibold text-white hover:text-amber-300 transition-colors"
                >
                  <span>Details</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
        >
          <div className="relative w-full max-w-lg rounded-2xl border border-white/[0.1] bg-[#121215] p-6 sm:p-8 text-left shadow-2xl">
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-zinc-800"
              aria-label="Close dialog"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2 text-xs font-medium text-amber-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Project Case Study</span>
            </div>

            <h3 className="mt-2 font-display text-2xl font-bold text-white">
              {activeProject.title}
            </h3>

            <p className="mt-1 text-xs text-zinc-400">
              {activeProject.role} · {activeProject.year}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-zinc-300">
              {activeProject.description}
            </p>

            <div className="mt-6 rounded-lg bg-zinc-900/80 p-4 border border-white/[0.06]">
              <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Measurable Impact & Architecture
              </div>
              <p className="mt-1 font-mono text-sm text-emerald-400">
                {activeProject.metrics}
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setActiveProject(null)}
                className="rounded-lg border border-white/[0.08] bg-zinc-900 px-4 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
