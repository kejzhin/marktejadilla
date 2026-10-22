import React, { useRef, useMemo, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';

interface WordmarkIntroProps {
  word: string;
  pivotIndex?: number;
  className?: string;
  letterClassName?: string;
  dotClassName?: string;
  loop?: boolean;
  speed?: number;
  onComplete?: () => void;
}

const measureLetter = (
  letter: string,
  element: HTMLElement,
  containerHeight: number
): { cx: number; bottom: number; height: number } | null => {
  try {
    const canvas = ((measureLetter as unknown) as { canvas?: HTMLCanvasElement }).canvas ||=
      document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    const computed = getComputedStyle(element);
    ctx.font = `${computed.fontStyle} ${computed.fontWeight} ${computed.fontSize} ${computed.fontFamily}`;
    const metrics = ctx.measureText(letter);
    if (!Number.isFinite(metrics.actualBoundingBoxLeft)) return null;
    const offset =
      (containerHeight - (metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent)) / 2 +
      metrics.fontBoundingBoxAscent;
    return {
      cx: (metrics.actualBoundingBoxRight - metrics.actualBoundingBoxLeft) / 2,
      bottom: offset + metrics.fontBoundingBoxDescent,
      height: metrics.actualBoundingBoxAscent + metrics.fontBoundingBoxDescent,
    };
  } catch {
    return null;
  }
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const WordmarkIntro: React.FC<WordmarkIntroProps> = ({
  word,
  pivotIndex,
  className = '',
  letterClassName = '',
  dotClassName = 'bg-gray-200',
  loop = false,
  speed = 1.15,
  onComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const letters = useMemo(() => Array.from(word), [word]);
  const activePivot = useMemo(() => {
    if (Number.isInteger(pivotIndex) && letters[pivotIndex!]?.trim()) {
      return pivotIndex!;
    }
    const idx = letters.findIndex((ch) => 'Iil1'.includes(ch));
    return idx === -1 ? Math.floor(letters.length / 2) : idx;
  }, [letters, pivotIndex]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const h1 = h1Ref.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const letterEls = letterRefs.current.slice(0, letters.length);
    const pivotEl = letterEls[activePivot];

    if (!container || !h1 || !dot || !pivotEl) return;

    const otherIndices = letterEls
      .map((el, i) => (el && i !== activePivot && letters[i].trim() ? i : -1))
      .filter((i) => i !== -1);

    if (prefersReducedMotion()) {
      gsap.set(letterEls.filter(Boolean), { opacity: 1 });
      gsap.set(dot, { opacity: 0 });
      const timer = setTimeout(() => onCompleteRef.current?.(), 250);
      return () => clearTimeout(timer);
    }

    gsap.set(letterEls.filter(Boolean), { opacity: 0 });
    gsap.set(dot, { opacity: 0 });

    let ctx: gsap.Context | undefined;
    let isCancelled = false;

    (document.fonts?.ready ?? Promise.resolve()).then(() => {
      if (isCancelled) return;

      ctx = gsap.context(() => {
        gsap.set([...letterEls.filter(Boolean), dot], { clearProps: 'transform' });

        const containerRect = container.getBoundingClientRect();
        const fontSize = parseFloat(getComputedStyle(h1).fontSize) || 16;
        const letterBoxes = letterEls.map((el) => {
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return {
            left: rect.left - containerRect.left,
            top: rect.top - containerRect.top,
            w: rect.width,
            h: rect.height,
            cx: rect.left - containerRect.left + rect.width / 2,
            cy: rect.top - containerRect.top + rect.height / 2,
          };
        });

        const pivotBox = letterBoxes[activePivot];
        if (!pivotBox) return;

        const measured =
          measureLetter(letters[activePivot], pivotEl, pivotBox.h) ?? {
            cx: pivotBox.w / 2,
            bottom: pivotBox.h,
            height: pivotBox.h * 0.78,
          };

        const contactPoint = {
          x: pivotBox.left + measured.cx,
          y: pivotBox.top + measured.bottom,
        };
        const letterHeight = measured.height;
        const dotSize = fontSize * 0.24;

        // Offset calculation to guarantee the pivot letter and landing dot are DEAD CENTER in the viewport
        const deltaX = contactPoint.x - containerRect.width / 2;
        const deltaY = contactPoint.y - containerRect.height / 2;

        gsap.set(pivotEl, {
          transformOrigin: `${(measured.cx / pivotBox.w) * 100}% ${(measured.bottom / pivotBox.h) * 100}%`,
        });

        gsap.set(dot, {
          width: dotSize,
          height: dotSize,
          left: contactPoint.x - dotSize / 2,
          top: contactPoint.y + fontSize * 0.1,
        });

        const getTipPos = (angleDeg: number) => {
          const rad = (angleDeg * Math.PI) / 180;
          return {
            x: contactPoint.x + Math.sin(rad) * letterHeight,
            y: contactPoint.y - Math.cos(rad) * letterHeight,
          };
        };

        const dropStartY = -(window.innerHeight * 0.6);
        const ringSize = fontSize * 2.6;

        const triggerShockwave = (
          tl: gsap.core.Timeline,
          pos: { x: number; y: number },
          opacity: number,
          atTime: number
        ) => {
          if (!ring) return;
          tl.set(
            ring,
            {
              width: ringSize,
              height: ringSize,
              left: pos.x - ringSize / 2,
              top: pos.y - ringSize / 2,
            },
            atTime
          )
            .to(ring, { opacity, duration: 0.05, ease: 'none' }, atTime)
            .to(ring, { opacity: 0, duration: 0.34, ease: 'power2.out' }, atTime + 0.05);
        };

        const flingLetter = (
          tl: gsap.core.Timeline,
          idx: number,
          originPos: { x: number; y: number },
          atTime: number
        ) => {
          const el = letterEls[idx];
          const box = letterBoxes[idx];
          if (!el || !box) return atTime;

          const dx = originPos.x - box.cx;
          const dy = originPos.y - box.cy;
          const dur = 0.5 + Math.min(Math.abs(dx) / 900, 0.32);
          const arcPeak = -(Math.abs(dx) * 0.3 + fontSize * 0.25);
          const spin = (dx > 0 ? -1 : 1) * gsap.utils.random(170, 300);

          tl.set(
            el,
            {
              x: dx,
              y: dy,
              rotation: spin,
              scale: 0.3,
              opacity: 0,
              transformOrigin: '50% 50%',
            },
            atTime
          )
            .to(el, { opacity: 1, scale: 1, duration: dur * 0.45 }, atTime)
            .to(el, { x: 0, duration: dur, ease: 'power1.out' }, atTime)
            .to(el, { y: Math.min(dy, 0) + arcPeak, duration: dur * 0.45, ease: 'power2.out' }, atTime)
            .to(el, { y: 0, duration: dur * 0.55, ease: 'power2.in' }, atTime + dur * 0.45)
            .to(el, { rotation: 0, duration: dur, ease: 'power2.out' }, atTime)
            .to(el, { y: -fontSize * 0.05, duration: 0.09, ease: 'power2.out' }, atTime + dur)
            .to(el, { y: 0, duration: 0.16, ease: 'power2.in' }, atTime + dur + 0.09);

          return atTime + dur;
        };

        const tiltAndFling = (
          tl: gsap.core.Timeline,
          tiltAngle: number,
          indices: number[],
          atTime: number
        ) => {
          if (!indices.length) return atTime;
          const tip = getTipPos(tiltAngle);

          tl.to(pivotEl, { rotation: tiltAngle, duration: 0.4, ease: 'back.out(1.4)' }, atTime)
            .to(pivotEl, { rotation: tiltAngle + (tiltAngle < 0 ? 6 : -6), duration: 0.08 }, atTime + 0.34)
            .to(pivotEl, { rotation: tiltAngle, duration: 0.3, ease: 'elastic.out(1, 0.5)' }, atTime + 0.42);

          let maxEnd = atTime;
          indices.forEach((idx, n) => {
            const flingTime = atTime + 0.34 + n * 0.1;
            triggerShockwave(tl, tip, 0.5 - n * 0.1, flingTime);
            maxEnd = Math.max(maxEnd, flingLetter(tl, idx, tip, flingTime));
          });

          return maxEnd;
        };

        const master = gsap.timeline({
          defaults: { ease: 'power2.out' },
          repeat: loop ? -1 : 0,
          repeatDelay: loop ? 1.1 : 0,
          onComplete: () => {
            if (!loop) onCompleteRef.current?.();
          },
        });

        master.timeScale(speed);

        // Center the contact point in the viewport by shifting the container by (-deltaX, -deltaY)
        master
          .set(container, { x: -deltaX, y: -deltaY, opacity: 1 })
          .set(letterEls.filter(Boolean), { opacity: 0, x: 0, y: 0, rotation: 0, scale: 1 })
          .set(pivotEl, { opacity: 0, y: dropStartY, rotation: 0 })
          .set(dot, { opacity: 0, y: dropStartY, scale: 1 });

        const bounceScale = 0.5;
        const bounceTl = gsap.timeline({ defaults: { ease: 'power2.out' } });
        const bounceHeight = fontSize * 0.4;

        bounceTl
          .set(dot, { opacity: 1 }, 0)
          .to(dot, { y: 0, duration: 0.42, ease: 'power2.in' }, 0)
          .to(dot, { scaleX: 0.82, scaleY: 1.22, duration: 0.28, ease: 'power1.in' }, 0.14)
          .to(dot, { scaleX: 1.4, scaleY: 0.52, duration: 0.06 }, 0.42)
          .to(dot, { y: -bounceHeight, duration: 0.2 }, 0.48)
          .to(dot, { scaleX: 1, scaleY: 1, duration: 0.18 }, 0.48)
          .to(dot, { y: 0, duration: 0.18, ease: 'power2.in' }, 0.68)
          .to(dot, { scaleX: 0.92, scaleY: 1.08, duration: 0.14, ease: 'power1.in' }, 0.72)
          .to(dot, { scaleX: 1.2, scaleY: 0.74, duration: 0.05 }, 0.86)
          .to(dot, { scaleX: 1, scaleY: 1, duration: 0.36, ease: 'elastic.out(1, 0.42)' }, 0.91);

        triggerShockwave(bounceTl, contactPoint, 0.4, 0.42);
        triggerShockwave(bounceTl, contactPoint, 0.24, 0.86);

        const subBounce = fontSize * 0.13;
        bounceTl
          .set(pivotEl, { opacity: 1 }, 0.8)
          .to(pivotEl, { y: 0, duration: 0.34, ease: 'power2.in' }, 0.8)
          .to(pivotEl, { scaleX: 0.86, scaleY: 1.16, duration: 0.24, ease: 'power1.in' }, 0.88)
          .to(pivotEl, { scaleX: 1.32, scaleY: 0.64, duration: 0.06 }, 1.14)
          .to(pivotEl, { y: -subBounce, duration: 0.1 }, 1.2)
          .to(pivotEl, { scaleX: 1, scaleY: 1, duration: 0.12 }, 1.2)
          .to(pivotEl, { y: 0, duration: 0.1, ease: 'power2.in' }, 1.3)
          .to(pivotEl, { scaleX: 1.12, scaleY: 0.88, duration: 0.05 }, 1.4)
          .to(pivotEl, { scaleX: 1, scaleY: 1, duration: 0.38, ease: 'elastic.out(1, 0.4)' }, 1.45)
          .fromTo(pivotEl, { rotation: -9 }, { rotation: 0, duration: 0.5, ease: 'elastic.out(1, 0.36)' }, 1.19);

        triggerShockwave(bounceTl, contactPoint, 0.6, 1.14);
        triggerShockwave(bounceTl, contactPoint, 0.26, 1.4);

        master.add(bounceTl.timeScale(bounceScale), 0);

        const leftIndices = otherIndices.filter((i) => i < activePivot).reverse();
        const rightIndices = otherIndices.filter((i) => i > activePivot);

        let flingStartTime = 1.4 / bounceScale;
        flingStartTime = tiltAndFling(master, -63, leftIndices, flingStartTime);
        flingStartTime = tiltAndFling(
          master,
          58,
          rightIndices,
          leftIndices.length ? flingStartTime - 0.3 : flingStartTime
        );

        master
          .to(pivotEl, { rotation: 0, duration: 0.5, ease: 'elastic.out(1, 0.55)' }, flingStartTime - 0.16)
          .to(dot, { opacity: 0, scale: 0, duration: 0.3, ease: 'power2.in' }, flingStartTime - 0.12);

        // Once all letters are flung into place, smoothly transition container to (0, 0)
        master.to(
          container,
          { x: 0, y: 0, duration: 0.65, ease: 'power2.out' },
          flingStartTime + 0.1
        );
      });
    });

    return () => {
      isCancelled = true;
      ctx?.revert();
    };
  }, [letters, activePivot, speed, loop]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative inline-flex items-baseline justify-center select-none opacity-0"
    >
      <h1 ref={h1Ref} className={className}>
        {letters.map((char, idx) => (
          <span
            key={`${char}-${idx}`}
            ref={(el) => {
              letterRefs.current[idx] = el;
            }}
            className={`inline-block will-change-transform ${letterClassName}`}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>

      {/* Dropping / Bouncing Ball */}
      <span
        ref={dotRef}
        className={`absolute rounded-full pointer-events-none ${dotClassName}`}
      />

      {/* Expanding Shockwave Ring */}
      <span
        ref={ringRef}
        className="absolute rounded-full opacity-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%)',
        }}
      />
    </div>
  );
};
