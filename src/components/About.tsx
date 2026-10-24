import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/portfolioData';
import { Plane, Globe, Calendar, MapPin, User, Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
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
      id="about"
      className="relative text-zinc-900 pt-20 md:pt-28 pb-0 px-6 md:px-12 lg:px-16 flex flex-col justify-center overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f5f5f8_35%,#ededf4_70%,#ffffff_100%)]"
    >
      {/* Light Gradient Ambient Aura */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.03)_0%,transparent_75%)] pointer-events-none z-0" />
      <div className="max-w-[1600px] mx-auto w-full z-10 py-6 md:py-12">
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 pb-6 border-b border-zinc-200">
          <div>
            <span className="text-[11px] md:text-xs uppercase tracking-[0.32em] text-zinc-500 font-mono font-bold block mb-2">
              Background & Overview
            </span>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-black via-zinc-900 to-zinc-700 leading-none uppercase">
              Intro
            </h2>
          </div>
        </div>

        {/* Two-Column Balanced Information Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch mb-16">
          
          {/* Left Column: Professional Profile Narrative */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-zinc-200/90 shadow-lg shadow-zinc-900/5 flex flex-col justify-between h-full hover:border-black transition-colors duration-300">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.26em] text-zinc-500 font-bold block mb-3">
                  Summary
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-zinc-900 uppercase tracking-tight mb-4">
                  Professional Profile
                </h3>
                <p className="text-zinc-700 text-sm sm:text-base leading-relaxed font-normal mb-5">
                  Dedicated professional bringing flight-training procedural discipline, checklist precision, and calm problem-solving to high-volume remote operations. Experienced across CRM data pipelines, employee time logging, truck fleet operational monitoring, YouTube release scheduling, Canva video editing, and high-velocity retail sneaker reselling at By The Hype PH.
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-100 flex items-center gap-2 text-xs sm:text-sm font-mono text-zinc-600">
                <Plane className="w-4 h-4 text-black shrink-0" />
                <span>Graduate of BS in Aviation Major in Flying (Airlink International Aviation College, Jan 2025).</span>
              </div>
            </div>
          </div>

          {/* Right Column: Personal Bio Data Table from CV */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="w-full p-8 sm:p-10 rounded-3xl bg-white border border-zinc-200/90 shadow-lg shadow-zinc-900/5 flex flex-col justify-between h-full hover:border-black transition-colors duration-300">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.26em] text-zinc-500 font-bold block mb-3">
                  Personal Information
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-zinc-900 uppercase tracking-tight mb-5">
                  Personal Background (from CV)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-2.5 text-zinc-800">
                    <Calendar className="w-4 h-4 text-black shrink-0" />
                    <span><strong>Date of Birth:</strong> {portfolioData.profile.birthDate}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-zinc-800">
                    <MapPin className="w-4 h-4 text-black shrink-0" />
                    <span><strong>Place of Birth:</strong> {portfolioData.profile.birthPlace}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-zinc-800">
                    <User className="w-4 h-4 text-black shrink-0" />
                    <span><strong>Citizenship:</strong> {portfolioData.profile.citizenship} · Single</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-zinc-800">
                    <Globe className="w-4 h-4 text-black shrink-0" />
                    <span><strong>Languages:</strong> {portfolioData.profile.languages.join(', ')}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-zinc-800">
                    <Compass className="w-4 h-4 text-black shrink-0" />
                    <span><strong>Height:</strong> {portfolioData.profile.height} · Roman Catholic</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-zinc-800">
                    <Plane className="w-4 h-4 text-black shrink-0" />
                    <span><strong>Degree:</strong> BS Aviation (Flying)</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-zinc-200 text-xs text-zinc-600 leading-relaxed font-mono">
                <strong>Address:</strong> {portfolioData.profile.location}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Core Competencies Infinite Marquee Rows */}
      <div className="relative mt-auto -mx-6 md:-mx-12 lg:-mx-16 pt-12 pb-6 bg-zinc-950 text-white border-t border-zinc-900">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-6 flex items-center gap-4">
          <span className="text-[11px] uppercase tracking-[0.32em] text-zinc-400 font-mono font-medium">
            Core Competencies & Stack
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-zinc-700 to-transparent" />
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
                    className="mx-1.5 md:mx-2 inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 md:px-5 md:py-2.5 text-xs md:text-sm font-medium tracking-wide text-zinc-200 transition-colors duration-300 hover:border-white hover:text-white"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white opacity-80" />
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
