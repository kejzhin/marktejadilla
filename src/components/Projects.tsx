import React, { useState } from 'react';
import { portfolioData, ProjectItem } from '../data/portfolioData';
import { ArrowUpRight, Calendar, Building2, Check, ExternalLink } from 'lucide-react';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section
      id="project"
      className="bg-[#050505] w-full text-white pt-16 md:pt-24 pb-24 px-6 md:px-12 lg:px-16 relative overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto w-full">
        {/* Section Top Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start w-full z-10 gap-8 lg:gap-12 mb-16 lg:mb-28">
          {/* Left Title: "SELECTED work" */}
          <div className="w-full lg:w-7/12 overflow-visible">
            <span className="text-[11px] md:text-xs uppercase tracking-[0.32em] text-gray-400 font-mono font-medium block mb-3">
              Career Milestones & Roles
            </span>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter drop-shadow-2xl leading-[0.9] uppercase">
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="flex items-center gap-3">
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600">
                    Selected
                  </span>
                  <span className="font-light italic text-gray-300 lowercase font-serif pr-4 pt-1 sm:pt-2 md:pt-3">
                    work
                  </span>
                </span>
              </span>
            </h2>
          </div>

          {/* Right Header Description + Action */}
          <div className="w-full lg:w-5/12 flex flex-col items-start lg:items-end text-left lg:text-right">
            <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed mb-6 max-w-md">
              Delivering data accuracy, strict procedural discipline, high-velocity commerce, and engaging multimedia editing tailored to demanding operational environments.
            </p>
            <a
              href={portfolioData.profile.cvDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer px-6 py-2.5 rounded-full border border-[var(--accent)] bg-[var(--accent)] text-black font-semibold text-xs md:text-sm hover:bg-[var(--accent-hover)] transition-all flex items-center gap-2 shadow-sm"
            >
              <span>Download Complete CV</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Alternating Project Showcase Cards */}
        <div className="flex flex-col gap-20 lg:gap-32 w-full">
          {portfolioData.projects.map((proj, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={proj.id}
                className={`flex flex-col ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } items-center justify-between gap-10 lg:gap-16 w-full group`}
              >
                {/* Visual / Image Frame */}
                <div className="w-full lg:w-6/12 overflow-hidden relative aspect-[16/10] bg-[#111] rounded-2xl border border-white/10 shadow-2xl">
                  {/* Subtle ambient gradient mesh */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${proj.fallbackGradient} opacity-60 mix-blend-multiply pointer-events-none`} />

                  <img
                    src={proj.image}
                    alt={proj.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-85 group-hover:opacity-100"
                  />

                  {/* Overlay Badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-mono uppercase tracking-wider text-gray-200">
                      {proj.category}
                    </span>
                  </div>

                  {/* Overlay Period Tag */}
                  <div className="absolute bottom-4 right-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-xs font-mono text-gray-300">
                      {proj.period}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="w-full lg:w-6/12 flex flex-col items-start">
                  {/* Company & Role Eyebrow */}
                  <div className="flex items-center gap-3 text-xs font-mono text-gray-400 mb-3">
                    <span className="inline-flex items-center gap-1.5 text-[var(--accent)] font-semibold">
                      <Building2 className="w-3.5 h-3.5" />
                      {proj.company}
                    </span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {proj.period}
                    </span>
                  </div>

                  {/* Stylized Title with Italic Serif Accent Word */}
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase text-white mb-2">
                    {proj.title}{' '}
                    <span className="font-serif italic lowercase font-light text-gray-300 pr-1">
                      {proj.accentWord}
                    </span>
                  </h3>
                  <h4 className="text-xs sm:text-sm font-mono text-gray-400 uppercase tracking-widest mb-4">
                    {proj.subtitle}
                  </h4>

                  {/* Description */}
                  <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed mb-6">
                    {proj.description}
                  </p>

                  {/* Key Metrics / Highlights Strip */}
                  {proj.metrics && (
                    <div className="grid grid-cols-3 gap-2.5 w-full mb-6 py-3 border-y border-white/10">
                      {proj.metrics.map((m, i) => (
                        <div key={i} className="text-left">
                          <div className="text-base sm:text-lg font-black font-mono text-white">
                            {m.value}
                          </div>
                          <div className="text-[10px] sm:text-[11px] font-mono text-gray-400 uppercase tracking-wider">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tool Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {proj.tools.map((tool, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-gray-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* Action Button to Open Full Modal */}
                  <button
                    type="button"
                    onClick={() => setSelectedProject(proj)}
                    className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white font-medium text-xs sm:text-sm hover:bg-white hover:text-black transition-all"
                  >
                    <span>View Role Responsibilities</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
