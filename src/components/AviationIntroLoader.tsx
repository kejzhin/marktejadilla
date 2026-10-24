import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Plane, Compass, Crosshair, ShieldCheck } from 'lucide-react';

interface AviationIntroLoaderProps {
  onComplete?: () => void;
  targetWord?: string;
}

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789✦▲◆';

export const AviationIntroLoader: React.FC<AviationIntroLoaderProps> = ({
  onComplete,
  targetWord = 'TEJADILLA',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGSVGElement>(null);
  const reticleRef = useRef<HTMLDivElement>(null);
  const laserRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const onCompleteRef = useRef(onComplete);

  const [counter, setCounter] = useState<number>(0);
  const [scrambled, setScrambled] = useState<string[]>(
    () => targetWord.split('').map(() => GLYPHS[Math.floor(Math.random() * GLYPHS.length)])
  );

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const letters = targetWord.split('');
    let frame = 0;
    const totalFrames = 42;
    const intervalTime = 40;

    // Scramble text animation resolving letter by letter
    const textInterval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      setScrambled(
        letters.map((char, index) => {
          const resolveThreshold = (index + 1) / letters.length;
          if (progress >= resolveThreshold * 0.85) {
            return char;
          }
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
      );

      if (frame >= totalFrames) {
        clearInterval(textInterval);
        setScrambled(letters);
      }
    }, intervalTime);

    return () => clearInterval(textInterval);
  }, [targetWord]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onCompleteRef.current?.();
        },
      });

      // Rotating radar ring
      if (ringRef.current) {
        gsap.to(ringRef.current, {
          rotation: 360,
          duration: 12,
          repeat: -1,
          ease: 'none',
        });
      }

      // Digital counter interpolation
      const counterObj = { val: 0 };
      tl.to(counterObj, {
        val: 100,
        duration: 1.9,
        ease: 'power2.inOut',
        onUpdate: () => {
          setCounter(Math.floor(counterObj.val));
        },
      }, 0.1);

      // Pulse reticle
      if (reticleRef.current) {
        tl.fromTo(
          reticleRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
          0
        );
      }

      // Supersonic light beam flare across the center at 100%
      if (laserRef.current) {
        tl.fromTo(
          laserRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.35, ease: 'power4.out' },
          1.85
        ).to(laserRef.current, {
          scaleY: 8,
          opacity: 0,
          duration: 0.28,
          ease: 'power2.out',
        }, 2.1);
      }

      // Final cinematic dissolve
      if (containerRef.current) {
        tl.to(
          containerRef.current,
          {
            opacity: 0,
            scale: 1.03,
            filter: 'blur(8px)',
            duration: 0.55,
            ease: 'power3.inOut',
          },
          2.25
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white select-none overflow-hidden px-4"
    >
      {/* Background Starfield & Coordinates Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      {/* Ambient Radial Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#050505]/70 to-[#050505] pointer-events-none" />

      {/* Top Telemetry Header Bar */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-[10px] sm:text-xs font-mono text-gray-500 uppercase tracking-widest border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 text-gray-400">
          <Plane className="w-3.5 h-3.5 text-[var(--accent)] animate-pulse" />
          <span>CALLSIGN: MARK-01</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-gray-500">
          <span>LAT 14.4593° N</span>
          <span>LON 120.9482° E</span>
          <span className="text-[var(--accent)] font-semibold">HDG 042°</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>SYSTEM READY</span>
        </div>
      </div>

      {/* Center Stage: Aeronautical Reticle & Radar Sweep */}
      <div ref={reticleRef} className="relative flex flex-col items-center justify-center my-auto">
        
        {/* Radar Ring Graphic */}
        <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 flex items-center justify-center mb-6">
          
          {/* Outer Rotating Compass Ticks Ring */}
          <svg
            ref={ringRef}
            viewBox="0 0 200 200"
            className="absolute inset-0 w-full h-full text-white/20 will-change-transform"
          >
            <circle
              cx="100"
              cy="100"
              r="94"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="2 6"
            />
            <circle
              cx="100"
              cy="100"
              r="78"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeOpacity="0.3"
            />
            {/* Compass cardinal notches */}
            <line x1="100" y1="2" x2="100" y2="10" stroke="var(--accent)" strokeWidth="2" />
            <line x1="100" y1="190" x2="100" y2="198" stroke="currentColor" strokeWidth="1.5" />
            <line x1="2" y1="100" x2="10" y2="100" stroke="currentColor" strokeWidth="1.5" />
            <line x1="190" y1="100" x2="198" y2="100" stroke="currentColor" strokeWidth="1.5" />
          </svg>

          {/* Artificial Horizon Pitch Ladder */}
          <div className="absolute inset-x-8 h-px bg-white/20 flex items-center justify-between px-2">
            <span className="text-[9px] font-mono text-gray-500">-10°</span>
            <div className="w-3 h-3 rounded-full border border-[var(--accent)] flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[var(--accent)]" />
            </div>
            <span className="text-[9px] font-mono text-gray-500">+10°</span>
          </div>

          {/* Center Digital Percentage Counter */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <div className="text-4xl sm:text-5xl md:text-6xl font-black font-mono tracking-tighter text-white tabular-nums drop-shadow-lg">
              <span ref={percentRef}>{String(counter).padStart(2, '0')}</span>
              <span className="text-lg sm:text-xl font-normal text-[var(--accent)] ml-1">%</span>
            </div>
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.28em] text-gray-400 mt-1">
              Flight Vector Sync
            </span>
          </div>
        </div>

        {/* Supersonic Laser Streak (triggers at 100%) */}
        <div
          ref={laserRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent pointer-events-none opacity-0 shadow-[0_0_20px_var(--accent)]"
        />

        {/* Kinetic Decrypted Wordmark */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 md:gap-3.5 tracking-tight mb-4">
          {scrambled.map((char, index) => (
            <span
              key={index}
              className={`inline-flex items-center justify-center w-8 h-11 sm:w-12 sm:h-16 md:w-16 md:h-20 text-3xl sm:text-5xl md:text-6xl font-black font-mono uppercase rounded-lg border transition-all duration-150 ${
                char === targetWord[index]
                  ? 'border-white/30 bg-white/[0.06] text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                  : 'border-white/10 bg-white/[0.02] text-[var(--accent)]/80 scale-95'
              }`}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Subtitle / Role Telemetry Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping" />
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-gray-300">
            Aviation Rigor · Data Operations
          </span>
        </div>

      </div>

      {/* Bottom Mission Status Footer */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[10px] sm:text-xs font-mono text-gray-500 uppercase tracking-widest border-t border-white/10 pt-3">
        <span className="text-gray-400">AIRLINK INTERNATIONAL AVIATION COLLEGE</span>
        <button
          type="button"
          onClick={() => onCompleteRef.current?.()}
          className="hover:text-white transition-colors cursor-pointer text-gray-400 underline decoration-dotted"
        >
          SKIP INTRO →
        </button>
      </div>

    </div>
  );
};
