import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Plane, Award, Globe, Calendar, MapPin, User, Check, Compass, FileText } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="bg-[#050505] text-white pt-20 md:pt-28 pb-0 px-6 md:px-12 lg:px-16 flex flex-col justify-center relative overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto w-full z-10 py-6 md:py-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/10">
          <div>
            <span className="text-[11px] md:text-xs uppercase tracking-[0.32em] text-gray-400 font-mono font-medium block mb-2">
              Background & Credentials
            </span>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600 drop-shadow-2xl leading-none uppercase">
              Intro
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-xs font-mono text-gray-300">
              <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>{portfolioData.profile.shortLocation}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-xs font-mono text-gray-300">
              <Plane className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>BS Aviation (Flying)</span>
            </span>
          </div>
        </div>

        {/* Two-Column Structured Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          
          {/* Left Column: Objective & Background Narrative */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            
            {/* Prominent Career Objective Quote from CV */}
            <div className="w-full p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/15 backdrop-blur-md shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 text-[var(--accent)] opacity-20 font-serif text-7xl leading-none select-none pointer-events-none">
                “
              </div>
              <span className="text-[11px] font-mono uppercase tracking-[0.28em] text-[var(--accent)] font-bold block mb-3">
                Career Objective (from Official CV)
              </span>
              <p className="text-gray-100 text-base sm:text-lg italic font-serif leading-relaxed relative z-10">
                &ldquo;{portfolioData.profile.objective}&rdquo;
              </p>
            </div>

            {/* Profile Narrative Description */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-3">
                Professional Profile
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light mb-4">
                Dedicated professional bringing flight-training procedural discipline, checklist precision, and calm problem-solving to high-volume remote operations. Experienced across CRM data pipelines, employee time logging, truck fleet operational monitoring, YouTube release scheduling, Canva video editing, and high-velocity retail sneaker reselling at By The Hype PH.
              </p>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-mono">
                Graduate of Bachelor of Science in Aviation Major in Flying (Airlink International Aviation College, Jan 2025).
              </p>
            </div>

          </div>

          {/* Right Column: Personal Bio Data Table & Special Skills from CV */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            
            {/* Comprehensive Personal Information Table from CV */}
            <div className="w-full p-6 sm:p-7 rounded-3xl bg-neutral-950/80 border border-white/10 shadow-lg">
              <span className="text-[11px] font-mono uppercase tracking-[0.26em] text-gray-400 font-semibold block mb-4">
                Personal Background (from CV)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm">
                <div className="flex items-center gap-2.5 text-gray-300">
                  <Calendar className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  <span><strong>Date of Birth:</strong> {portfolioData.profile.birthDate}</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-300">
                  <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  <span><strong>Place of Birth:</strong> {portfolioData.profile.birthPlace}</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-300">
                  <User className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  <span><strong>Citizenship:</strong> {portfolioData.profile.citizenship} · Single</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-300">
                  <Globe className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  <span><strong>Languages:</strong> {portfolioData.profile.languages.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-300">
                  <Compass className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  <span><strong>Height:</strong> {portfolioData.profile.height} · Roman Catholic</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-300">
                  <Plane className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  <span><strong>Degree:</strong> BS Aviation (Flying)</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 text-xs text-gray-400 leading-relaxed">
                <strong>Address:</strong> {portfolioData.profile.location}
              </div>
            </div>

            {/* Special Skills directly from CV */}
            <div className="w-full p-6 sm:p-7 rounded-3xl bg-neutral-950/80 border border-white/10 shadow-lg">
              <span className="text-[11px] font-mono uppercase tracking-[0.26em] text-[var(--accent)] font-semibold block mb-4">
                Special Skills (from CV)
              </span>
              <div className="flex flex-col gap-2.5">
                {portfolioData.specialSkills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-2.5 text-xs text-gray-200"
                  >
                    <Check className="w-3.5 h-3.5 text-[var(--accent)] shrink-0 mt-0.5" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Core Competencies Infinite Marquee Rows */}
      <div className="relative mt-auto -mx-6 md:-mx-12 lg:-mx-16 pt-12 pb-4 bg-[#030303] border-t border-white/10">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-6 flex items-center gap-4">
          <span className="text-[11px] uppercase tracking-[0.32em] text-gray-400 font-mono font-medium">
            Core Competencies & Stack
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
        </div>

        {/* 4 Staggered Marquee Rows */}
        <div className="flex flex-col gap-3">
          {portfolioData.stackMarquees.map((marquee, idx) => (
            <div key={idx} className="marquee-row py-1">
              <div
                className="marquee-track flex items-center"
                style={{
                  '--marquee-duration': `${marquee.duration}s`,
                  '--marquee-direction': marquee.reverse ? 'reverse' : 'normal'
                } as React.CSSProperties}
              >
                {[...Array(4)].flatMap(() => marquee.items).map((item, i) => (
                  <span
                    key={`${item}-${i}`}
                    className="mx-1.5 md:mx-2 inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 md:px-5 md:py-2.5 text-xs md:text-sm font-medium tracking-wide text-gray-300 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)] opacity-60" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
