import React, { useState } from 'react';
import { portfolioData, SeminarItem, EducationItem, CharacterReference } from '../data/portfolioData';
import { Plane, Award, Users, Sparkles, Download, Phone, MapPin, Calendar, BookOpen, Check } from 'lucide-react';

export const Credentials: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'seminars' | 'education' | 'references' | 'skills'>('seminars');

  return (
    <section
      id="credentials"
      className="bg-[#050505] w-full text-white pt-16 md:pt-24 pb-24 overflow-hidden relative"
    >
      <div className="max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-10 px-6 md:px-12 lg:px-16">
        
        {/* Left Card: Dark Structured Summary Box (Matching Demo Left Block) */}
        <div className="w-full lg:w-[320px] xl:w-[360px] shrink-0 flex flex-col">
          <div className="bg-white/[0.05] p-6 sm:p-7 border-t-2 border-white/80 rounded-b-2xl">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-gray-400 block mb-3">
              Qualifications & Trust
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tighter text-white leading-[0.95] mb-5">
              Aviation rigor & verified references that deliver.
            </h2>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              Combining 4 specialized aviation seminars, formal flying college education, and high-trust character references from international executives.
            </p>
          </div>

          {/* Tab Navigation Pill Bar */}
          <div className="flex flex-wrap lg:flex-col gap-2 mt-4">
            <button
              type="button"
              onClick={() => setActiveTab('seminars')}
              className={`flex-1 lg:flex-none text-left px-4 py-3 rounded-xl border text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-between cursor-pointer ${
                activeTab === 'seminars'
                  ? 'border-[var(--accent)] bg-white/10 text-white font-semibold'
                  : 'border-white/10 bg-white/[0.02] text-gray-400 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <Plane className="w-3.5 h-3.5" />
                Flight Seminars ({portfolioData.seminars.length})
              </span>
              <span className="text-xs">→</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('education')}
              className={`flex-1 lg:flex-none text-left px-4 py-3 rounded-xl border text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-between cursor-pointer ${
                activeTab === 'education'
                  ? 'border-[var(--accent)] bg-white/10 text-white font-semibold'
                  : 'border-white/10 bg-white/[0.02] text-gray-400 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5" />
                Education ({portfolioData.education.length})
              </span>
              <span className="text-xs">→</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('references')}
              className={`flex-1 lg:flex-none text-left px-4 py-3 rounded-xl border text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-between cursor-pointer ${
                activeTab === 'references'
                  ? 'border-[var(--accent)] bg-white/10 text-white font-semibold'
                  : 'border-white/10 bg-white/[0.02] text-gray-400 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5" />
                Character References ({portfolioData.characterReferences.length})
              </span>
              <span className="text-xs">→</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('skills')}
              className={`flex-1 lg:flex-none text-left px-4 py-3 rounded-xl border text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-between cursor-pointer ${
                activeTab === 'skills'
                  ? 'border-[var(--accent)] bg-white/10 text-white font-semibold'
                  : 'border-white/10 bg-white/[0.02] text-gray-400 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                Special Skills
              </span>
              <span className="text-xs">→</span>
            </button>
          </div>
        </div>

        {/* Right Content Area: Responsive interactive grid matching selected tab */}
        <div className="flex-1 w-full min-w-0">
          
          {/* TAB 1: Aviation Seminars & Training */}
          {activeTab === 'seminars' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h3 className="text-lg font-bold uppercase tracking-wider text-white">
                  Aviation Training & Industry Symposiums
                </h3>
                <span className="text-xs font-mono text-gray-400">Airlink International Aviation College</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {portfolioData.seminars.map((sem, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-white/[0.035] border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-2">
                        <span className="text-[var(--accent)] font-semibold">{sem.date}</span>
                        <span>Pasay City</span>
                      </div>
                      <h4 className="text-base font-black uppercase text-white leading-snug mb-1">
                        {sem.title}
                      </h4>
                      <p className="text-xs font-serif italic text-gray-300 mb-3">
                        {sem.theme}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
                        {sem.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-gray-400">
                      <Plane className="w-3 h-3 text-[var(--accent)]" />
                      <span>{sem.institution}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Educational Background */}
          {activeTab === 'education' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h3 className="text-lg font-bold uppercase tracking-wider text-white">
                  Academic Timeline & Flying Degree
                </h3>
                <span className="text-xs font-mono text-gray-400">Bacoor & Pasay City</span>
              </div>

              <div className="space-y-3">
                {portfolioData.education.map((edu, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-white/[0.035] border border-white/10 hover:border-white/25 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="max-w-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-white/10 text-gray-300">
                          {edu.category}
                        </span>
                        <span className="text-xs font-mono text-[var(--accent)]">{edu.year}</span>
                      </div>
                      <h4 className="text-lg font-black text-white">{edu.degree}</h4>
                      <p className="text-sm text-gray-300 font-medium">{edu.institution}</p>
                      {edu.details && (
                        <p className="text-xs text-gray-400 mt-2 font-light leading-relaxed">
                          {edu.details}
                        </p>
                      )}
                    </div>

                    {edu.location && (
                      <div className="text-xs font-mono text-gray-400 shrink-0 md:text-right">
                        <MapPin className="w-3.5 h-3.5 inline mr-1 text-[var(--accent)]" />
                        {edu.location}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Character References */}
          {activeTab === 'references' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h3 className="text-lg font-bold uppercase tracking-wider text-white">
                  Executive Character References
                </h3>
                <span className="text-xs font-mono text-gray-400">Directly Contactable</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {portfolioData.characterReferences.map((refItem, i) => (
                  <div
                    key={i}
                    className="p-6 sm:p-7 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between shadow-lg"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4 text-white font-mono font-bold text-sm">
                        {refItem.name.slice(0, 2).toUpperCase()}
                      </div>
                      <h4 className="text-xl font-bold text-white mb-0.5">{refItem.name}</h4>
                      <p className="text-xs font-mono text-[var(--accent)] mb-1">{refItem.title}</p>
                      <p className="text-sm text-gray-300 font-medium mb-4">{refItem.company}</p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <a
                        href={`tel:${refItem.contact.replace(/[\s()-]/g, '')}`}
                        className="inline-flex items-center gap-2 text-xs font-mono text-white bg-white/10 hover:bg-white hover:text-black px-3.5 py-1.5 rounded-full transition-all"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{refItem.contact}</span>
                      </a>
                      {refItem.location && (
                        <span className="text-[11px] font-mono text-gray-400">
                          {refItem.location}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Special Skills */}
          {activeTab === 'skills' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h3 className="text-lg font-bold uppercase tracking-wider text-white">
                  Operational Traits & Special Skills
                </h3>
                <span className="text-xs font-mono text-gray-400">From Curriculum Vitae</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {portfolioData.specialSkills.map((skill, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-xl bg-white/[0.035] border border-white/10 flex items-start gap-3.5"
                  >
                    <div className="w-6 h-6 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm text-gray-200 leading-snug">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
