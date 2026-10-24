import React, { useState } from 'react';
import { portfolioData, WorkExperienceItem } from '../data/portfolioData';
import { ArrowUpRight, Calendar, Building2, CheckCircle2, Briefcase, FileText } from 'lucide-react';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
  const [selectedExperience, setSelectedExperience] = useState<WorkExperienceItem | null>(null);

  return (
    <section
      id="project"
      className="bg-[#050505] w-full text-white pt-16 md:pt-24 pb-24 px-6 md:px-12 lg:px-16 relative overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto w-full">
        {/* Section Top Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start w-full z-10 gap-8 lg:gap-12 mb-16 lg:mb-24">
          {/* Left Title: "WORK experience" */}
          <div className="w-full lg:w-7/12 overflow-visible">
            <span className="text-[11px] md:text-xs uppercase tracking-[0.32em] text-gray-400 font-mono font-medium block mb-3">
              Official Employment History
            </span>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter drop-shadow-2xl leading-[0.9] uppercase">
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="flex items-center gap-3">
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600">
                    Work
                  </span>
                  <span className="font-light italic text-gray-300 lowercase font-serif pr-4 pt-1 sm:pt-2 md:pt-3">
                    experience
                  </span>
                </span>
              </span>
            </h2>
          </div>

          {/* Right Header Description + Action */}
          <div className="w-full lg:w-5/12 flex flex-col items-start lg:items-end text-left lg:text-right">
            <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed max-w-md">
              Verifiable professional history across virtual assistant operations, CRM database auditing, social media scheduling, and retail commerce from my official CV.
            </p>
          </div>
        </div>

        {/* 4 Official Work Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 w-full">
          {portfolioData.workExperience.map((exp, idx) => (
            <div
              key={exp.id}
              className="group relative flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-neutral-950/70 border border-white/10 hover:border-white/25 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              {/* Top Row: Category + Period */}
              <div>
                <div className="flex items-center justify-between gap-4 mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[var(--accent)]">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{exp.category}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-400">
                    <Calendar className="w-3.5 h-3.5 text-gray-500" />
                    <span>{exp.period}</span>
                  </span>
                </div>

                {/* Role Title & Company */}
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-colors">
                  {exp.role}
                </h3>
                <div className="flex items-center gap-2 text-sm font-mono text-gray-400 mb-6">
                  <Building2 className="w-4 h-4 text-[var(--accent)]" />
                  <span className="font-semibold text-gray-300">{exp.company}</span>
                </div>

                {/* Key Responsibilities directly from CV */}
                <ul className="space-y-3 mb-8">
                  {exp.bulletPoints.slice(0, 4).map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-sm text-gray-300 font-light leading-snug">
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                  {exp.bulletPoints.length > 4 && (
                    <li className="text-xs font-mono text-gray-500 pl-7">
                      + {exp.bulletPoints.length - 4} more verified responsibilities...
                    </li>
                  )}
                </ul>
              </div>

              {/* Bottom: Tools Used + Detail Trigger */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {exp.tools.map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/5 text-[11px] font-mono text-gray-400"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedExperience(exp)}
                  className="cursor-pointer shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white hover:text-black text-xs font-mono text-gray-200 transition-all"
                >
                  <span>Full Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Dialog for complete bullet points */}
      {selectedExperience && (
        <ProjectModal
          project={selectedExperience}
          onClose={() => setSelectedExperience(null)}
        />
      )}
    </section>
  );
};
