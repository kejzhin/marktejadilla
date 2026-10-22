import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Plane, Database, Video, ShoppingBag, Globe, Calendar, MapPin, Award } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="bg-[#050505] text-white pt-24 md:pt-32 pb-0 px-6 md:px-12 lg:px-16 flex flex-col justify-center relative overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto w-full z-10 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 md:gap-14 lg:gap-20 items-center">
          
          {/* Left Column: Eyebrow + Massive "Intro" */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="text-[11px] md:text-xs uppercase tracking-[0.34em] text-gray-500 mb-4 md:mb-6 font-mono font-medium">
              About me
            </span>
            <h2 className="max-w-full overflow-hidden text-[18vw] sm:text-[16vw] md:text-[9rem] lg:text-[11rem] xl:text-[13rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-800 drop-shadow-2xl leading-[0.85] select-none">
              Intro
            </h2>
            <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-xs font-mono text-gray-300">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
                {portfolioData.profile.shortLocation}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-xs font-mono text-gray-300">
                <Plane className="w-3.5 h-3.5 text-[var(--accent)]" />
                BS Aviation (Flying)
              </span>
            </div>
          </div>

          {/* Right Column: Frosted Glass Narrative Card */}
          <div className="relative bg-white/5 backdrop-blur-md px-6 py-8 sm:p-10 lg:p-12 rounded-3xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.25)] hover:bg-white/[0.07] transition-colors duration-300 text-left">
            <div className="space-y-6">
              <p className="text-gray-200 text-base sm:text-lg md:text-xl leading-[1.75] font-light">
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
                  Hey, I&apos;m {portfolioData.profile.fullName}.
                </span>{' '}
                A Data Entry Specialist, Admin Virtual Assistant, and Aviation Flying Graduate with a multidisciplinary track record spanning CRM database administration, employee time audits, social media video scheduling, Canva multimedia production, and high-velocity sneaker resale commerce.
              </p>

              {/* CV Objective Quote */}
              <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 text-gray-300 text-sm sm:text-base italic leading-relaxed font-serif">
                &ldquo;{portfolioData.profile.objective}&rdquo;
              </div>

              {/* Personal Information & Education Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Plane className="w-4 h-4 text-[var(--accent)]" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono text-gray-400 uppercase tracking-wider">Aviation Degree</span>
                    <span className="text-white font-medium">BS Aviation Major in Flying</span>
                    <span className="block text-xs text-gray-400">Airlink Int. Aviation College (2025)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Award className="w-4 h-4 text-[var(--accent)]" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono text-gray-400 uppercase tracking-wider">STEM Background</span>
                    <span className="text-white font-medium">Univ. of Perpetual Help DALTA</span>
                    <span className="block text-xs text-gray-400">Senior High STEM (2018)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Globe className="w-4 h-4 text-[var(--accent)]" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono text-gray-400 uppercase tracking-wider">Languages</span>
                    <span className="text-white font-medium">Filipino & English</span>
                    <span className="block text-xs text-gray-400">Bilingual Proficiency</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Calendar className="w-4 h-4 text-[var(--accent)]" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono text-gray-400 uppercase tracking-wider">Origin & Citizenship</span>
                    <span className="text-white font-medium">Filipino · Born Kuwait City</span>
                    <span className="block text-xs text-gray-400">Based in Bacoor, Cavite</span>
                  </div>
                </div>
              </div>

              {/* 4 Stats Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
                {portfolioData.stats.map((stat) => (
                  <div key={stat.label} className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                    <div className="text-xl sm:text-2xl font-black font-mono text-white">
                      {stat.value}
                    </div>
                    <div className="text-[11px] font-medium text-gray-400 tracking-tight mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* The Stack Section with Multi-Row Infinite Marquees */}
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
