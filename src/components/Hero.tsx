import React, { useState, useRef, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { portfolioData } from '../data/portfolioData';
import { WordmarkIntro } from './WordmarkIntro';
import { ArrowUpRight } from 'lucide-react';

interface HeroProps {
  onPreloadComplete?: () => void;
}

const TITLE_CLASSES =
  'flex items-baseline text-[12vw] sm:text-[13vw] md:text-[9.5rem] lg:text-[13rem] font-black tracking-tighter drop-shadow-2xl leading-none uppercase select-none';
const GRADIENT_TEXT_CLASSES =
  'text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-700';

export const Hero: React.FC<HeroProps> = ({ onPreloadComplete }) => {
  const targetWord = portfolioData.profile.wordmark; // "TEJADILLA"
  const [displayedText, setDisplayedText] = useState<string>(targetWord);
  const [isIntroDone, setIsIntroDone] = useState<boolean>(false);
  const [showIntroComponent, setShowIntroComponent] = useState<boolean>(true);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const titleWrapperRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const leftHalfRef = useRef<HTMLSpanElement>(null);
  const rightHalfRef = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const onPreloadCompleteRef = useRef(onPreloadComplete);

  useEffect(() => {
    onPreloadCompleteRef.current = onPreloadComplete;
  }, [onPreloadComplete]);

  // Generate subtle starry dust specks matching demo screenshot
  const stars = useMemo(
    () =>
      Array.from({ length: 60 }).map((_, i) => ({
        x: (i * 37) % 100,
        y: (i * 53) % 100,
        size: i % 4 === 0 ? 2 : 1,
        opacity: 0.15 + (i % 6) * 0.1,
      })),
    []
  );

  // Preload profile image
  const imagePromise = useMemo(() => {
    return new Promise<void>((resolve) => {
      const img = new window.Image();
      img.src = portfolioData.profile.photoUrl;
      if (img.complete) {
        resolve();
      } else {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      }
    });
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

  // Once WordmarkIntro completes, trigger scramble to "PORTFOLIO" & slide down transition
  useEffect(() => {
    if (!isIntroDone) return;

    let isMounted = true;
    let scrambleInterval: NodeJS.Timeout | undefined;
    let ctx: gsap.Context | undefined;
    const finalWord = 'PORTFOLIO';
    const initialWord = targetWord;
    let step = 0;

    imagePromise.then(() => {
      if (!isMounted) return;

      scrambleInterval = setInterval(() => {
        setDisplayedText(
          finalWord
            .split('')
            .map((char, idx) => {
              if (idx < Math.floor(step)) return finalWord[idx];
              if (idx < initialWord.length) return initialWord[idx];
              return '';
            })
            .join('')
        );

        if (step >= finalWord.length) {
          clearInterval(scrambleInterval);

          ctx = gsap.context(() => {
            const tl = gsap.timeline({
              onComplete: () => {
                document.body.style.overflow = 'auto';
                setImageLoaded(true);
                onPreloadCompleteRef.current?.();
              },
            });

            const isMobile = window.innerWidth < 768;

            // Glide wordmark from vertical center (50%) to upper-third (20% on mobile) or lower-third (72% on desktop)
            tl.to(
              titleWrapperRef.current,
              {
                top: isMobile ? '20%' : '72%',
                duration: 1.5,
                ease: 'power3.inOut',
              },
              '+=0.15'
            );

            // Animate role & contact button in
            tl.fromTo(
              [roleRef.current, actionsRef.current],
              { y: 35, opacity: 0 },
              { y: 0, opacity: 1, duration: 1.2, stagger: 0.18, ease: 'power3.out' },
              '-=1.0'
            );

            // Split the two halves horizontally on desktop to frame the silhouette
            const splitDistance = isMobile
              ? 0
              : Math.min(320, window.innerWidth * 0.22);

            if (!isMobile) {
              tl.to(
                leftHalfRef.current,
                { x: -splitDistance / 2, duration: 1.5, ease: 'power3.out' },
                '<'
              );
              tl.to(
                rightHalfRef.current,
                { x: splitDistance / 2, duration: 1.5, ease: 'power3.out' },
                '<'
              );
            }
          });
        }

        step += 1 / 3;
      }, 45);
    });

    return () => {
      isMounted = false;
      if (scrambleInterval) clearInterval(scrambleInterval);
      ctx?.revert();
    };
  }, [isIntroDone, imagePromise, targetWord]);

  // Split string in half for the horizontal reveal
  const splitPoint = Math.ceil(displayedText.length / 2);
  const leftText = displayedText.slice(0, splitPoint);
  const rightText = displayedText.slice(splitPoint);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[100svh] flex items-end justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 50% 35%, #181818 0%, #0c0c0c 45%, #050505 85%)',
      }}
    >
      {/* Background ambient lighting & starry specks */}
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px] pointer-events-none" />

      {/* Starry Dust Layer matching demo screenshot */}
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

      {/* Main Animated Title & Headers Container */}
      <div
        ref={titleWrapperRef}
        className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none select-none flex flex-col items-center justify-center w-max max-w-full px-2"
      >
        {/* Scrambled & Split Title */}
        <h1
          ref={h1Ref}
          className={`${TITLE_CLASSES} ${GRADIENT_TEXT_CLASSES} transition-opacity duration-300 ${
            isIntroDone ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span ref={leftHalfRef} className="inline-block will-change-transform">
            {leftText}
          </span>
          <span ref={rightHalfRef} className="inline-block will-change-transform">
            {rightText}
          </span>
        </h1>

        {/* Wordmark Physics Intro Loader Animation */}
        {showIntroComponent && (
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              isIntroDone ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <WordmarkIntro
              word={targetWord}
              className={TITLE_CLASSES}
              letterClassName={GRADIENT_TEXT_CLASSES}
              dotClassName="bg-[var(--accent)]"
              speed={1.15}
              onComplete={() => {
                setIsIntroDone(true);
                setTimeout(() => setShowIntroComponent(false), 320);
              }}
            />
          </div>
        )}

        {/* Role Subtitle Text (Positioned to match demo screenshot with zero overlap) */}
        <p
          ref={roleRef}
          className="absolute -bottom-8 sm:-bottom-10 md:-bottom-14 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-6 text-white text-sm sm:text-lg md:text-2xl lg:text-3xl drop-shadow-md z-30 opacity-0 w-max text-center md:text-left pointer-events-auto"
        >
          <span className="font-bold tracking-tight uppercase">
            {portfolioData.profile.role.bold}
          </span>{' '}
          <span className="font-serif italic text-gray-300 font-light lowercase">
            {portfolioData.profile.role.light}
          </span>
        </p>

        {/* Contact Action Buttons (Matching demo round arrow + Contact pill) */}
        <div
          ref={actionsRef}
          className="absolute -bottom-20 sm:-bottom-24 md:-bottom-14 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-6 flex items-center gap-2 sm:gap-3 pointer-events-auto z-30 opacity-0 w-max"
        >
          <a
            href="#contact"
            aria-label="Direct contact"
            className="group w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border border-gray-400/35 flex items-center justify-center backdrop-blur-md bg-black/30 hover:bg-white hover:border-white transition-all duration-300 cursor-pointer"
          >
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-300 group-hover:text-black group-hover:rotate-45 transition-all duration-300" />
          </a>
          <a
            href="#contact"
            className="px-4 py-1.5 sm:px-5 sm:py-2.5 rounded-full border border-gray-400/35 flex items-center justify-center backdrop-blur-md bg-black/30 hover:bg-white/10 hover:border-gray-400/60 transition-all cursor-pointer text-xs sm:text-sm font-light italic text-gray-200"
          >
            <span>Contact</span>
          </a>
        </div>
      </div>

      {/* Center Display Picture: Pure Cutout Silhouette (NO card box, NO background shape, NO border, NO badge) */}
      <div
        className={`absolute inset-x-0 bottom-0 z-10 text-center flex flex-col items-center justify-end w-full pointer-events-none transition-opacity duration-1000 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[380px] md:max-w-[460px] lg:max-w-[540px] flex justify-center items-end">
          <img
            src={portfolioData.profile.photoUrl}
            alt={portfolioData.profile.fullName}
            className="w-full h-auto max-h-[58vh] sm:max-h-[64vh] md:max-h-[72vh] lg:max-h-[78vh] object-contain object-bottom pointer-events-auto select-none"
            style={{
              maskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
            }}
          />
        </div>
      </div>
    </section>
  );
};
