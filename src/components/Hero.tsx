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
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const heroContentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const onPreloadCompleteRef = useRef(onPreloadComplete);

  useEffect(() => {
    onPreloadCompleteRef.current = onPreloadComplete;
  }, [onPreloadComplete]);

  // Subtle starry dust particles layer matching the aesthetic
  const stars = useMemo(
    () =>
      Array.from({ length: 55 }).map((_, i) => ({
        x: (i * 37) % 100,
        y: (i * 53) % 100,
        size: i % 4 === 0 ? 2 : 1,
        opacity: 0.15 + (i % 6) * 0.1,
      })),
    []
  );

  // Preload profile image
  useEffect(() => {
    const img = new window.Image();
    img.src = portfolioData.profile.photoUrl;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(true);
  }, []);

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
      className="relative min-h-[100svh] flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-16"
      style={{
        background: 'radial-gradient(circle at 50% 35%, #181818 0%, #0c0c0c 45%, #050505 85%)',
      }}
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px] pointer-events-none" />

      {/* Starry Dust Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {stars.map((star, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white pointer-events-none"
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
              <span className="text-xs uppercase tracking-[0.3em] font-mono text-[var(--accent)] font-bold">
                OBJECTIVE
              </span>
              <span className="w-10 h-px bg-[var(--accent)]/40" />
            </div>

            {/* Name Heading (Clean, bold, non-overlapping) */}
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[4.75rem] font-black tracking-tight uppercase leading-[0.95] drop-shadow-2xl text-white mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-100 to-gray-400">
                {portfolioData.profile.fullName}
              </span>
            </h1>

            {/* Role Subtitle */}
            <p className="text-xl sm:text-2xl md:text-3xl text-white drop-shadow-md leading-tight mb-5">
              <span className="font-bold tracking-tight uppercase">
                {portfolioData.profile.role.bold}
              </span>{' '}
              <span className="font-serif italic text-gray-300 font-light lowercase">
                {portfolioData.profile.role.light}
              </span>
            </p>

            {/* Exact Objective Narrative */}
            <p className="text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed font-light max-w-2xl mb-6">
              Organized Virtual Assistant dedicated to improving accuracy and efficiency by maintaining and developing administrative and procedural processes. Focused and communicative individual possessing superb data entry, time management, and customer service skills. Offering 2 years of experience providing quality administrative support to clients.
            </p>

            {/* Key Capability Chips */}
            <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-xs font-mono text-gray-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>Superb Data Entry</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-xs font-mono text-gray-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>Administrative Processes</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-xs font-mono text-gray-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>Time Management</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-xs font-mono text-gray-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>Customer Service</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-xs font-mono text-gray-300">
                <Plane className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>BS Aviation (Flying)</span>
              </span>
            </div>

            {/* CTA Action Buttons (View Services Removed) */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href="#contact"
                className="group flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[var(--accent)] text-black text-xs sm:text-sm font-bold tracking-wider uppercase hover:bg-[var(--accent-hover)] transition-all duration-300 shadow-lg cursor-pointer"
              >
                <span>Get in Touch</span>
                <div className="w-5 h-5 rounded-full bg-black/10 group-hover:bg-black group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:rotate-45" />
                </div>
              </a>

              <a
                href={portfolioData.profile.cvDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md hover:bg-white hover:text-black hover:border-white text-xs sm:text-sm font-medium tracking-wide uppercase transition-all duration-300 cursor-pointer text-gray-200"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume (PDF)</span>
              </a>
            </div>

          </div>

          {/* RIGHT SIDE: Cutout Profile Picture (Pure silhouette, NO card box, NO background shape, NO border) */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end items-end relative w-full pt-4 lg:pt-0">
            <div className="relative group w-full max-w-[320px] xs:max-w-[360px] sm:max-w-[420px] lg:max-w-[480px] xl:max-w-[520px] flex justify-center items-end">
              
              {/* Subtle Ambient Backlight Halo behind silhouette */}
              <div className="absolute inset-0 -top-10 rounded-full bg-gradient-to-t from-transparent via-white/[0.04] to-white/[0.08] blur-3xl transform scale-95 pointer-events-none" />

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
