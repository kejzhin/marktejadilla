import React, { useState, useRef, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { portfolioData } from '../data/portfolioData';
import { AviationIntroLoader } from './AviationIntroLoader';
import { ArrowUpRight, Download, CheckCircle2, Plane } from 'lucide-react';

interface HeroProps {
  onPreloadComplete?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onPreloadComplete }) => {
  const targetWord = portfolioData.profile.wordmark; // "TEJADILLA"
  const [isIntroDone, setIsIntroDone] = useState<boolean>(false);
  const [showIntroComponent, setShowIntroComponent] = useState<boolean>(true);

  const heroContentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const onPreloadCompleteRef = useRef(onPreloadComplete);

  useEffect(() => {
    onPreloadCompleteRef.current = onPreloadComplete;
  }, [onPreloadComplete]);

  // Subtle ambient dust particles layer matching light theme
  const stars = useMemo(
    () =>
      Array.from({ length: 45 }).map((_, i) => ({
        x: (i * 37) % 100,
        y: (i * 53) % 100,
        size: i % 4 === 0 ? 2 : 1,
        opacity: 0.15 + (i % 6) * 0.08,
      })),
    []
  );

  // Lock scroll during intro
  useEffect(() => {
    window.scrollTo(0, 0);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow || 'auto';
    };
  }, []);

  // Handle intro completion: unlock scroll and smoothly reveal the 2-column layout
  const handleIntroComplete = () => {
    setIsIntroDone(true);
    document.body.style.overflow = 'auto';
    onPreloadCompleteRef.current?.();

    setTimeout(() => {
      setShowIntroComponent(false);

      if (heroContentRef.current) {
        gsap.fromTo(
          heroContentRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }
        );
      }
    }, 350);
  };

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-16 text-zinc-900"
      style={{
        background: 'radial-gradient(ellipse at 50% 20%, #ffffff 0%, #f3f3f7 45%, #e8e8f2 85%)',
      }}
    >
      {/* Light Radial Ambient Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.9)_0%,rgba(240,240,245,0.4)_60%,transparent_90%)] pointer-events-none z-0" />

      {/* Dust Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {stars.map((star, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-zinc-400 pointer-events-none"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      {/* Standalone Centered Aviation Telemetry Intro Loading Screen */}
      {showIntroComponent && (
        <AviationIntroLoader
          targetWord={targetWord}
          onComplete={handleIntroComplete}
        />
      )}

      {/* Main 2-Column Hero: About Me on the Left, Profile Picture on the Right */}
      <div
        ref={heroContentRef}
        className={`relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 transition-opacity duration-700 ${
          isIntroDone ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[calc(100vh-10rem)]">
          
          {/* LEFT SIDE: About Me & Identity */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-start text-left z-20">

            {/* Eyebrow Label */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs uppercase tracking-[0.3em] font-mono text-black font-black">
                OBJECTIVE
              </span>
              <span className="w-10 h-0.5 bg-black/40" />
            </div>

            {/* Name Heading */}
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[4.75rem] font-black tracking-tight uppercase leading-[0.95] drop-shadow-sm text-zinc-900 mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-black via-zinc-900 to-zinc-700">
                {portfolioData.profile.fullName}
              </span>
            </h1>

            {/* Role Subtitle */}
            <p className="text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-5">
              <span className="font-black tracking-tight uppercase">
                {portfolioData.profile.role.bold}
              </span>{' '}
              <span className="font-serif italic text-zinc-600 font-light lowercase">
                {portfolioData.profile.role.light}
              </span>
            </p>

            {/* Exact Objective Narrative */}
            <p className="text-zinc-700 text-sm sm:text-base md:text-lg leading-relaxed font-normal max-w-2xl mb-6">
              Organized Virtual Assistant dedicated to improving accuracy and efficiency by maintaining and developing administrative and procedural processes. Focused and communicative individual possessing superb data entry, time management, and customer service skills. Offering 2 years of experience providing quality administrative support to clients.
            </p>

            {/* Key Capability Chips */}
            <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-200/80 bg-white/90 text-xs font-mono text-zinc-800 shadow-xs font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                <span>Superb Data Entry</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-200/80 bg-white/90 text-xs font-mono text-zinc-800 shadow-xs font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                <span>Administrative Processes</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-200/80 bg-white/90 text-xs font-mono text-zinc-800 shadow-xs font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                <span>Time Management</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-200/80 bg-white/90 text-xs font-mono text-zinc-800 shadow-xs font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                <span>Customer Service</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-200/80 bg-white/90 text-xs font-mono text-zinc-800 shadow-xs font-medium">
                <Plane className="w-3.5 h-3.5 text-black" />
                <span>BS Aviation (Flying)</span>
              </span>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href="#contact"
                className="group flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-black text-white text-xs sm:text-sm font-bold tracking-wider uppercase hover:bg-zinc-800 transition-all duration-300 shadow-md cursor-pointer"
              >
                <span>Get in Touch</span>
                <div className="w-5 h-5 rounded-full bg-white/20 group-hover:bg-white group-hover:text-black flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:rotate-45" />
                </div>
              </a>

              <a
                href={portfolioData.profile.cvDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-zinc-300 bg-white text-zinc-900 hover:bg-black hover:text-white hover:border-black text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-300 cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume (PDF)</span>
              </a>
            </div>

          </div>

          {/* RIGHT SIDE: Cutout Profile Picture */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end items-end relative w-full pt-4 lg:pt-0">
            <div className="relative group w-full max-w-[320px] xs:max-w-[360px] sm:max-w-[420px] lg:max-w-[480px] xl:max-w-[520px] flex justify-center items-end">
              
              {/* Subtle Ambient Backlight Halo */}
              <div className="absolute inset-0 -top-10 rounded-full bg-gradient-to-t from-transparent via-zinc-300/40 to-zinc-400/20 blur-3xl transform scale-95 pointer-events-none" />

              {/* Pure Transparent Silhouette Image */}
              <img
                ref={imageRef}
                src={portfolioData.profile.photoUrl}
                alt={portfolioData.profile.fullName}
                className="w-full h-auto max-h-[55vh] sm:max-h-[62vh] md:max-h-[70vh] lg:max-h-[78vh] xl:max-h-[82vh] object-contain object-bottom select-none transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 0%, black 86%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 86%, transparent 100%)',
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
