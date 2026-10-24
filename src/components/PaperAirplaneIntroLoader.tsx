import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PaperAirplaneIntroLoaderProps {
  onComplete?: () => void;
  targetWord?: string;
}

export const PaperAirplaneIntroLoader: React.FC<PaperAirplaneIntroLoaderProps> = ({
  onComplete,
  targetWord = 'TEJADILLA',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const airplaneRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const paperFoldRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);

  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onCompleteRef.current?.();
        },
      });

      // Digital take-off percentage counter
      const counterObj = { val: 0 };
      tl.to(
        counterObj,
        {
          val: 100,
          duration: 2.1,
          ease: 'power2.inOut',
          onUpdate: () => {
            setCounter(Math.floor(counterObj.val));
          },
        },
        0.1
      );

      // Paper airplane flight curve along an upward trajectory to the top edge of screen
      if (airplaneRef.current) {
        // Start position (bottom-left area)
        gsap.set(airplaneRef.current, {
          x: '-10vw',
          y: '80vh',
          rotation: -15,
          scale: 0.65,
          opacity: 0,
        });

        // Flight sequence: swoops through center, banks upward, climbs off screen
        tl.to(
          airplaneRef.current,
          {
            opacity: 1,
            duration: 0.4,
            ease: 'power1.out',
          },
          0.1
        )
          .to(
            airplaneRef.current,
            {
              x: '25vw',
              y: '45vh',
              rotation: -38,
              scale: 0.95,
              duration: 0.85,
              ease: 'power1.inOut',
            },
            0.2
          )
          .to(
            airplaneRef.current,
            {
              x: '52vw',
              y: '22vh',
              rotation: -52,
              scale: 1.15,
              duration: 0.75,
              ease: 'power2.inOut',
            },
            1.05
          )
          .to(
            airplaneRef.current,
            {
              x: '105vw',
              y: '-25vh',
              rotation: -60,
              scale: 1.4,
              duration: 0.65,
              ease: 'power3.in',
            },
            1.75
          );
      }

      // Trailing origami dashed flight path drawing behind the plane
      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        tl.to(
          pathRef.current,
          {
            strokeDashoffset: 0,
            duration: 1.9,
            ease: 'power2.inOut',
          },
          0.2
        );
      }

      // Paper peel / fold diagonal slit effect expanding across the screen
      if (paperFoldRef.current) {
        tl.to(
          paperFoldRef.current,
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: 0.9,
            ease: 'power3.inOut',
          },
          1.6
        );
      }

      // Seamless curtain lift transition revealing the white portfolio
      if (containerRef.current) {
        tl.to(
          containerRef.current,
          {
            opacity: 0,
            y: '-100%',
            duration: 0.65,
            ease: 'power4.inOut',
          },
          2.2
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f7f6f2] text-zinc-900 select-none overflow-hidden"
      style={{
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      }}
    >
      {/* Tactile Paper Texture Base with Subtle Crease Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(0,0,0,0.02) 1px, transparent 1px),
            linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px, 64px 64px, 64px 64px',
        }}
      />

      {/* Origami Paper Diagonal Fold Shadow Crease */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="w-[200vw] h-px bg-gradient-to-r from-transparent via-zinc-400/40 to-transparent -translate-x-1/4 translate-y-1/2 -rotate-25 shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
        />
        <div
          className="w-[200vw] h-px bg-gradient-to-r from-transparent via-zinc-300/30 to-transparent -translate-x-1/3 translate-y-1/3 -rotate-40 shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
        />
      </div>

      {/* Animated SVG Flight Path Trace */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M -100,850 C 200,800 300,500 500,350 C 700,200 850,50 1100,-150"
          fill="none"
          stroke="#18181b"
          strokeWidth="2.5"
          strokeDasharray="8 8"
          strokeLinecap="round"
          className="opacity-40"
        />
      </svg>

      {/* Centerpiece: Letterpress Embossed Typography & Flight Progress */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        
        {/* Subtle Aviation Eyebrow */}
        <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.34em] text-zinc-500 font-bold mb-3 flex items-center gap-2">
          <span className="w-6 h-px bg-zinc-400" />
          <span>Airlink Flying Rigor</span>
          <span className="w-6 h-px bg-zinc-400" />
        </span>

        {/* Wordmark with Tactile Letterpress Shadow */}
        <h1
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-zinc-900 leading-none mb-4"
          style={{
            textShadow: '0 2px 4px rgba(0,0,0,0.08), 0 1px 1px rgba(255,255,255,0.8)',
          }}
        >
          {targetWord}
        </h1>

        {/* Tactile Paper Badge Counter */}
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/90 border border-zinc-300 shadow-md shadow-zinc-900/5 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-zinc-900 animate-ping" />
          <span className="text-xs sm:text-sm font-mono font-black text-zinc-900 tracking-wider">
            TAKEOFF {String(counter).padStart(2, '0')}%
          </span>
          <span className="text-zinc-400 font-mono text-xs">·</span>
          <span className="text-[11px] font-mono text-zinc-600 uppercase tracking-widest font-semibold">
            ALT 8500 FT
          </span>
        </div>

      </div>

      {/* Floating 3D Origami Paper Airplane Graphic */}
      <div
        ref={airplaneRef}
        className="fixed top-0 left-0 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 pointer-events-none z-30 will-change-transform"
        style={{
          filter: 'drop-shadow(0 15px 18px rgba(0, 0, 0, 0.22)) drop-shadow(0 4px 6px rgba(0, 0, 0, 0.12))',
        }}
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full transform -rotate-45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Paper Airplane - Left Outer Wing (Highlight Paper) */}
          <polygon
            points="100,15 15,185 100,145"
            fill="#ffffff"
            stroke="#d4d4d8"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Paper Airplane - Left Inner Fold (Crease Shadow) */}
          <polygon
            points="100,15 55,160 100,145"
            fill="#f4f4f5"
          />

          {/* Paper Airplane - Right Outer Wing (Soft Shadowed Paper) */}
          <polygon
            points="100,15 185,185 100,145"
            fill="#e4e4e7"
            stroke="#d4d4d8"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Paper Airplane - Right Inner Fold */}
          <polygon
            points="100,15 145,160 100,145"
            fill="#d4d4d8"
          />

          {/* Paper Airplane - Center Keel Spine */}
          <line
            x1="100"
            y1="15"
            x2="100"
            y2="145"
            stroke="#71717a"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Wing Tip Crisp Accent Creases */}
          <line x1="15" y1="185" x2="100" y2="145" stroke="#a1a1aa" strokeWidth="1.2" />
          <line x1="185" y1="185" x2="100" y2="145" stroke="#a1a1aa" strokeWidth="1.2" />
        </svg>

        {/* Trailing Paper Wind Gust Particles */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 flex items-center gap-1.5 -mt-2 opacity-60">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-ping" />
          <span className="w-1 h-1 rounded-full bg-zinc-400" />
        </div>
      </div>

      {/* Diagonal Paper Peel Mask overlay that cuts open when the plane exits */}
      <div
        ref={paperFoldRef}
        className="absolute inset-0 bg-[#ebe9e1] pointer-events-none z-20"
        style={{
          clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
          boxShadow: 'inset 0 0 40px rgba(0,0,0,0.06)',
        }}
      />

    </div>
  );
};
