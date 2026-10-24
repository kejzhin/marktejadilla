import React, { useState } from 'react';
import { portfolioData, WorkExperienceItem } from '../data/portfolioData';
import { ArrowUpRight, Calendar, Building2, CheckCircle2, Briefcase } from 'lucide-react';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
  const [selectedExperience, setSelectedExperience] = useState<WorkExperienceItem | null>(null);

  return (
    <section
      id="project"
      className="relative w-full text-zinc-900 pt-16 md:pt-24 pb-24 px-6 md:px-12 lg:px-16 overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f5f5f8_35%,#ededf4_70%,#ffffff_100%)]"
    >
      {/* Light Ambient Aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(0,0,0,0.02)_0%,transparent_80%)] pointer-events-none z-0" />
      <div className="max-w-[1600px] mx-auto w-full">
        {/* Section Top Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start w-full z-10 gap-8 lg:gap-12 mb-16 lg:mb-24">
          {/* Left Title: "WORK experience" */}
          <div className="w-full lg:w-7/12 overflow-visible">
            <span className="text-[11px] md:text-xs uppercase tracking-[0.32em] text-zinc-500 font-mono font-bold block mb-3">
              Official Employment History
            </span>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter drop-shadow-sm leading-[0.9] uppercase">
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="flex items-center gap-3">
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-black via-zinc-900 to-zinc-700">
                    Work
                  </span>
                  <span className="font-light italic text-zinc-600 lowercase font-serif pr-4 pt-1 sm:pt-2 md:pt-3">
                    experience
                  </span>
                </span>
              </span>
            </h2>
          </div>
        </div>

        {/* 4 Official Work Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 w-full">
          {portfolioData.workExperience.map((exp) => (
            <div
              key={exp.id}
              className="group relative flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-white border border-zinc-200/90 shadow-xl shadow-zinc-900/5 hover:border-black transition-all duration-300"
            >
              {/* Top Row: Category + Period */}
              <div>
                <div className="flex items-center justify-between gap-4 mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-mono text-black font-bold">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{exp.category}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{exp.period}</span>
                  </span>
                </div>

                {/* Role Title & Company */}
                <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 uppercase tracking-tight mb-2 group-hover:text-black transition-colors">
                  {exp.role}
                </h3>
                <div className="flex items-center gap-2 text-sm font-mono text-zinc-600 mb-6">
                  <Building2 className="w-4 h-4 text-black" />
                  <span className="font-bold text-zinc-900">{exp.company}</span>
                </div>

                {/* Key Responsibilities directly from CV */}
                <ul className="space-y-3 mb-8">
                  {exp.bulletPoints.slice(0, 4).map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-sm text-zinc-800 font-normal leading-snug">
                      <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                  {exp.bulletPoints.length > 4 && (
                    <li className="text-xs font-mono text-zinc-500 pl-7">
                      + {exp.bulletPoints.length - 4} more verified responsibilities...
                    </li>
                  )}
                </ul>
              </div>

              {/* Bottom: Tools Used + Detail Trigger */}
              <div className="pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {exp.tools.map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg bg-zinc-100 border border-zinc-200 text-[11px] font-mono text-zinc-800 font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedExperience(exp)}
                  className="cursor-pointer shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black text-white hover:bg-zinc-800 text-xs font-mono transition-all"
                >
                  <span>Full Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Dialog */}
      {selectedExperience && (
        <ProjectModal
          project={selectedExperience}
          onClose={() => setSelectedExperience(null)}
        />
      )}
    </section>
  );
};
