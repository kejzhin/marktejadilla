import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolioData';
import { Plane, Users, Sparkles, BookOpen, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Credentials: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'seminars' | 'education' | 'references' | 'skills'>('seminars');
  const sectionRef = useRef<HTMLElement>(null);
  const leftBoxRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (leftBoxRef.current && rightContentRef.current) {
        gsap.fromTo(
          [leftBoxRef.current, rightContentRef.current],
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="credentials"
      className="relative w-full text-zinc-900 pt-16 md:pt-24 pb-24 overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f5f5f8_35%,#ededf4_70%,#ffffff_100%)]"
    >
      {/* Light Ambient Aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(0,0,0,0.02)_0%,transparent_80%)] pointer-events-none z-0" />
      <div className="max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-10 px-6 md:px-12 lg:px-16">
        
        {/* Left Summary Box */}
        <div ref={leftBoxRef} className="w-full lg:w-[320px] xl:w-[360px] shrink-0 flex flex-col">
          <div className="bg-white p-6 sm:p-7 border border-zinc-200/90 rounded-2xl shadow-lg shadow-zinc-900/5 hover:border-black transition-colors duration-300">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-zinc-500 font-bold block mb-3">
              Qualifications & Trust
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tighter text-zinc-900 leading-[0.95] mb-5">
              Aviation rigor & verified references that deliver.
            </h2>
            <p className="text-zinc-600 text-sm font-normal leading-relaxed">
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
                  ? 'border-black bg-black text-white font-bold shadow-md'
                  : 'border-zinc-200 bg-white text-zinc-700 hover:text-black font-semibold'
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
                  ? 'border-black bg-black text-white font-bold shadow-md'
                  : 'border-zinc-200 bg-white text-zinc-700 hover:text-black font-semibold'
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
                  ? 'border-black bg-black text-white font-bold shadow-md'
                  : 'border-zinc-200 bg-white text-zinc-700 hover:text-black font-semibold'
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
                  ? 'border-black bg-black text-white font-bold shadow-md'
                  : 'border-zinc-200 bg-white text-zinc-700 hover:text-black font-semibold'
              }`}
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                Special Skills ({portfolioData.specialSkills.length})
              </span>
              <span className="text-xs">→</span>
            </button>
          </div>
        </div>

        {/* Right Content Area */}
        <div ref={rightContentRef} className="flex-1 w-full min-w-0">
          
          {/* TAB 1: Aviation Seminars & Training */}
          {activeTab === 'seminars' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
                <h3 className="text-lg font-black uppercase tracking-wider text-zinc-900">
                  Aviation Training & Industry Symposiums
                </h3>
                <span className="text-xs font-mono text-zinc-500 font-medium">Airlink International Aviation College</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {portfolioData.seminars.map((sem, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-md shadow-zinc-900/5 hover:border-black transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-2">
                        <span className="text-black font-bold">{sem.date}</span>
                        <span>Pasay City</span>
                      </div>
                      <h4 className="text-base font-extrabold uppercase tracking-tight text-zinc-900 mb-1">
                        {sem.title}
                      </h4>
                      {sem.theme && (
                        <p className="text-xs font-serif italic text-zinc-600 mb-3">
                          {sem.theme}
                        </p>
                      )}
                      <p className="text-xs text-zinc-700 font-normal leading-relaxed mb-4">
                        {sem.description}
                      </p>
                    </div>
                    <div className="text-[11px] font-mono text-zinc-500 pt-3 border-t border-zinc-100 flex items-center gap-1.5">
                      <Plane className="w-3 h-3 text-black" />
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
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
                <h3 className="text-lg font-black uppercase tracking-wider text-zinc-900">
                  Academic Degree & Education History
                </h3>
                <span className="text-xs font-mono text-zinc-500 font-medium">Official CV Records</span>
              </div>

              <div className="space-y-4">
                {portfolioData.education.map((edu, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-md shadow-zinc-900/5 hover:border-black transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold block mb-1">
                          {edu.category}
                        </span>
                        <h4 className="text-lg font-black uppercase text-zinc-900 leading-tight">
                          {edu.degree}
                        </h4>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-mono text-black font-bold shrink-0 self-start sm:self-auto">
                        {edu.year}
                      </span>
                    </div>

                    <div className="text-sm font-semibold text-zinc-800 mb-2">
                      {edu.institution} · <span className="text-zinc-500 font-normal">{edu.location}</span>
                    </div>

                    {edu.details && (
                      <p className="text-xs text-zinc-600 font-normal leading-relaxed pt-2 border-t border-zinc-100">
                        {edu.details}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Character References */}
          {activeTab === 'references' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
                <h3 className="text-lg font-black uppercase tracking-wider text-zinc-900">
                  Verified Character References (from CV)
                </h3>
                <span className="text-xs font-mono text-zinc-500 font-medium">Direct Professional Contacts</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {portfolioData.characterReferences.map((ref, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-md shadow-zinc-900/5 hover:border-black transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 text-black font-bold border border-zinc-200">
                          {ref.location}
                        </span>
                      </div>
                      <h4 className="text-xl font-black uppercase tracking-tight text-zinc-900 mb-1">
                        {ref.name}
                      </h4>
                      <p className="text-sm font-bold text-black mb-1">
                        {ref.title}
                      </p>
                      <p className="text-xs text-zinc-600 font-medium mb-4">
                        {ref.company}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                      <span className="text-xs font-mono text-zinc-500 font-bold">Direct Phone:</span>
                      <a
                        href={`tel:${ref.contact}`}
                        className="text-xs font-mono text-black font-extrabold hover:underline"
                      >
                        {ref.contact}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Special Skills */}
          {activeTab === 'skills' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-200">
                <h3 className="text-lg font-black uppercase tracking-wider text-zinc-900">
                  Key Competencies & Special Skills (from CV)
                </h3>
                <span className="text-xs font-mono text-zinc-500 font-medium">Official CV Strengths</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {portfolioData.specialSkills.map((skill, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-white border border-zinc-200/90 shadow-xs flex items-start gap-3 text-sm text-zinc-900 font-medium hover:border-black transition-colors"
                  >
                    <Check className="w-4 h-4 text-black shrink-0 mt-0.5" />
                    <span>{skill}</span>
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
