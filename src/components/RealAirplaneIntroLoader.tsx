import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface RealAirplaneIntroLoaderProps {
  onComplete?: () => void;
  targetWord?: string;
}

export const RealAirplaneIntroLoader: React.FC<RealAirplaneIntroLoaderProps> = ({
  onComplete,
  targetWord = 'TEJADILLA',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const airplaneRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);

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

      const flightState = {
        progress: 0,
      };

      // Flight sequence: Takes off from bottom-left, ascends across center, accelerates off top-right edge
      tl.to(flightState, {
        progress: 1,
        duration: 2.3,
        ease: 'power2.inOut',
        onUpdate: () => {
          const p = flightState.progress;

          // 1. Calculate Airplane position along an ascending aerodynamic climb curve
          // x: from -15vw to 115vw (moving rightward)
          const xPos = -15 + p * 130;
          // y: starts at 90vh, rises upward parabolically to -25vh (moving upward)
          const yPos = 90 - Math.pow(p, 0.92) * 115;

          // 2. FORWARD FACING ROTATION:
          // Since SVG points straight up (0 deg), rotating clockwise (+deg) points toward the top-right flight vector!
          // Starts pointing at +46 deg (towards top-right), pitches up to +34 deg (steep upward climb)
          const rotation = 46 - p * 12;

          // Scale: expands naturally as it roars past
          const scale = 0.8 + p * 0.45;

          if (airplaneRef.current) {
            gsap.set(airplaneRef.current, {
              x: `${xPos}vw`,
              y: `${yPos}vh`,
              rotation: rotation,
              scale: scale,
              opacity: p > 0.01 ? 1 : p * 100,
            });
          }

          // 3. Trailing paper reveal effect:
          // The curtain peels open right along with the airplane's flight path!
          // We update the curtain clip-path polygon to wipe from bottom-left to top-right
          if (curtainRef.current) {
            const topCut = Math.max(0, Math.min(100, (p - 0.12) * 132));
            const bottomCut = Math.max(0, Math.min(100, (p + 0.08) * 132));

            curtainRef.current.style.clipPath = `polygon(
              ${topCut}% 0%,
              100% 0%,
              100% 100%,
              ${bottomCut}% 100%
            )`;
          }

          // 4. Shadow edge along the paper cut line
          if (shadowRef.current) {
            const shadowPos = (p - 0.02) * 132;
            shadowRef.current.style.left = `${shadowPos}%`;
          }
        },
      });

      // Quick fade out of container at the very end
      if (containerRef.current) {
        tl.to(
          containerRef.current,
          {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out',
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
      className="fixed inset-0 z-50 pointer-events-none select-none overflow-hidden"
    >
      {/* The Covering Paper Curtain Sheet (Peels open as the airplane flies across) */}
      <div
        ref={curtainRef}
        className="absolute inset-0 bg-[#f7f6f2] text-zinc-900 pointer-events-auto flex flex-col items-center justify-center will-change-[clip-path]"
        style={{
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          boxShadow: 'inset 0 0 60px rgba(0,0,0,0.06)',
        }}
      >
        {/* Subtle Paper Texture & Tactile Fibers */}
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

        {/* Centerpiece on the paper cover (Clean Wordmark only) */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
          <h1
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-zinc-900 leading-none"
            style={{
              textShadow: '0 2px 4px rgba(0,0,0,0.08), 0 1px 1px rgba(255,255,255,0.8)',
            }}
          >
            {targetWord}
          </h1>
        </div>

        {/* Dynamic Paper Cut Crease Line & Cast Shadow */}
        <div
          ref={shadowRef}
          className="absolute top-0 bottom-0 w-8 pointer-events-none -translate-x-full bg-gradient-to-r from-transparent to-black/15 -skew-x-12"
        />
      </div>

      {/* The REAL AIRPLANE (Facing FORWARD and UP into the flight path) */}
      <div
        ref={airplaneRef}
        className="fixed top-0 left-0 w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 pointer-events-none z-40 will-change-transform"
        style={{
          filter: 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.35)) drop-shadow(0 8px 10px rgba(0, 0, 0, 0.2))',
        }}
      >
        {/* Dual Jet Vapor Contrails (Streaming straight back from both turbofan engines behind the aircraft) */}
        <div className="absolute top-[60%] left-[31%] -translate-x-1/2 w-1.5 h-72 bg-gradient-to-b from-white/95 via-white/50 to-transparent blur-[1px] pointer-events-none" />
        <div className="absolute top-[60%] left-[69%] -translate-x-1/2 w-1.5 h-72 bg-gradient-to-b from-white/95 via-white/50 to-transparent blur-[1px] pointer-events-none" />

        {/* Real Twin-Engine Jet Aircraft Vector (Nose points straight UP along +Y) */}
        <svg
          viewBox="0 0 240 240"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Swept Wings */}
          <path
            d="M 120 70 L 220 145 L 210 155 L 132 120 L 132 170 L 160 195 L 155 202 L 120 188 L 85 202 L 80 195 L 108 170 L 108 120 L 30 155 L 20 145 Z"
            fill="#e4e4e7"
            stroke="#a1a1aa"
            strokeWidth="1.2"
          />

          {/* Wing Upper Shading Highlights */}
          <path
            d="M 120 70 L 220 145 L 210 155 L 132 120 Z"
            fill="#ffffff"
            opacity="0.8"
          />
          <path
            d="M 120 70 L 30 145 L 20 155 L 108 120 Z"
            fill="#d4d4d8"
            opacity="0.9"
          />

          {/* Wingtip Navigation Lights (Red Port on Left, Green Starboard on Right) */}
          <circle cx="20" cy="150" r="2.5" fill="#ef4444" />
          <circle cx="220" cy="150" r="2.5" fill="#10b981" />

          {/* Left Turbofan Jet Engine Pod */}
          <rect
            x="68"
            y="115"
            width="12"
            height="26"
            rx="5"
            fill="#27272a"
            stroke="#52525b"
            strokeWidth="1"
          />
          <ellipse cx="74" cy="116" rx="5" ry="2" fill="#71717a" />
          <ellipse cx="74" cy="141" rx="4" ry="2" fill="#f97316" />

          {/* Right Turbofan Jet Engine Pod */}
          <rect
            x="160"
            y="115"
            width="12"
            height="26"
            rx="5"
            fill="#3f3f46"
            stroke="#71717a"
            strokeWidth="1"
          />
          <ellipse cx="166" cy="116" rx="5" ry="2" fill="#a1a1aa" />
          <ellipse cx="166" cy="141" rx="4" ry="2" fill="#f97316" />

          {/* Streamlined Cylindrical Fuselage */}
          <path
            d="M 120 15 C 126 15 132 40 132 110 L 130 195 L 120 210 L 110 195 L 108 110 C 108 40 114 15 120 15 Z"
            fill="#f4f4f5"
            stroke="#71717a"
            strokeWidth="1.5"
          />

          {/* Fuselage Gloss Highlight Stripe */}
          <path
            d="M 120 18 C 124 18 128 45 128 110 L 126 190 L 120 205 Z"
            fill="#ffffff"
            opacity="0.95"
          />

          {/* Cockpit Windscreen Glass */}
          <path
            d="M 115 35 C 117 30 123 30 125 35 L 128 42 L 112 42 Z"
            fill="#09090b"
            stroke="#18181b"
            strokeWidth="0.8"
          />

          {/* Cabin Windows Row */}
          <line x1="113" y1="52" x2="113" y2="105" stroke="#71717a" strokeWidth="1.5" strokeDasharray="2 3" />
          <line x1="127" y1="52" x2="127" y2="105" stroke="#71717a" strokeWidth="1.5" strokeDasharray="2 3" />

          {/* Vertical Tail Stabilizer */}
          <path
            d="M 120 155 L 122 195 L 120 205 L 118 195 Z"
            fill="#18181b"
          />
        </svg>

        {/* Engine Afterburner / Thrust Glow at Nozzles */}
        <div className="absolute top-[58%] left-[31%] -translate-x-1/2 w-2 h-2 rounded-full bg-orange-500 blur-[1px] animate-pulse" />
        <div className="absolute top-[58%] left-[69%] -translate-x-1/2 w-2 h-2 rounded-full bg-orange-500 blur-[1px] animate-pulse" />
      </div>

    </div>
  );
};
