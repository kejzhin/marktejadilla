import React, { useRef, useEffect } from 'react';

interface MosaicCanvasProps {
  src: string;
  anchorRef: React.RefObject<HTMLImageElement | null>;
  play: boolean;
  className?: string;
}

const VERTEX_SHADER = `#version 300 es
precision highp float;
in vec2 aHome;
in vec3 aAir;
in vec4 aInfo;
in vec3 aCell;
uniform vec2 uRes;
uniform vec4 uRect;
uniform float uCell;
uniform float uDpr;
uniform float uTime;
uniform float uReveal;
uniform float uScatter;
uniform vec2 uMouse;

out vec2 vCell;
out float vBright;
out float vLand;
out float vAlpha;
out float vPhase;

float inOut(float t) {
  return t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;
}

void main() {
  float bright = aInfo.x;
  float delay  = aInfo.y;
  float dur    = aInfo.z;
  float phase  = aInfo.w;
  float depth  = aAir.z;
  bool dust    = aCell.z > 0.5;

  vec2 drift = vec2(sin(uTime * 0.31 + phase * 6.283), cos(uTime * 0.23 + phase * 9.1))
             * (6.0 + 22.0 * (1.0 - depth));
  vec2 air  = aAir.xy * uRes + drift;
  vec2 home = uRect.xy + aHome * uRect.zw;

  float appear = smoothstep(0.0, 0.8, uReveal - delay * 0.35);
  float fly    = dust ? 0.0 : clamp((uReveal - delay) / dur, 0.0, 1.0);
  float e      = inOut(fly);

  float q = clamp(uScatter * 1.7 - phase * 0.7, 0.0, 1.0);
  q = q * q;
  float k = e * (1.0 - q);

  vec2 pos = mix(air, home, k);
  vec2 d = home - air;
  pos += vec2(-d.y, d.x) * 0.18 * sin(3.14159 * k) * (phase - 0.5);

  vec2 m = pos - uMouse;
  float ml = length(m);
  pos += (ml > 0.001 ? m / ml : vec2(0.0)) * smoothstep(110.0, 0.0, ml) * 20.0 * k;

  float land  = smoothstep(0.55, 1.0, k);
  float speck = mix(2.2, 0.9, depth);
  float tile  = uCell * (0.28 + 0.68 * bright);
  float size  = mix(speck, tile, land);
  float dustA = dust ? mix(0.55, 0.22, smoothstep(2.0, 4.0, uReveal)) : 1.0;

  vAlpha  = appear * mix(0.25 + 0.55 * (1.0 - depth), 1.0, land) * dustA;
  vBright = bright;
  vLand   = land;
  vCell   = aCell.xy;
  vPhase  = phase;

  vec2 clip = pos / uRes * 2.0 - 1.0;
  gl_Position  = vec4(clip.x, -clip.y, 0.0, 1.0);
  gl_PointSize = max(size * uDpr, 1.0);
}`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;
uniform sampler2D uAtlas;
uniform vec2 uWin;
uniform float uTime;

in vec2 vCell;
in float vBright;
in float vLand;
in float vAlpha;
in float vPhase;

out vec4 outColor;

void main() {
  vec3 c = texture(uAtlas, vCell + gl_PointCoord * uWin).rgb;
  float peak = max(max(c.r, c.g), max(c.b, 0.06));
  vec3 hue = c / peak;
  vec3 tile = mix(hue, min(c * 1.8, 1.0), 0.35);
  tile = mix(tile, vec3(1.0), 0.15);

  float twinkle = 0.9 + 0.1 * sin(uTime * 1.6 + vPhase * 47.0);
  tile *= (0.12 + 0.92 * vBright) * twinkle;

  vec3 speck = vec3(0.9, 0.92, 1.0);
  vec3 rgb = mix(speck, tile, vLand);

  outColor = vec4(rgb * vAlpha, vAlpha);
}`;

const createShader = (gl: WebGL2RenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('Shader creation failed');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(info ?? 'Shader compile failed');
  }
  return shader;
};

const getCellPitch = (width: number) => Math.min(6, Math.max(3.5, width / 200));

const generateAtlas = (): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // Rich gradient palette mimicking screenshots/projects
  const gradients = [
    ['#3b82f6', '#1d4ed8', '#0f172a'],
    ['#e8e4dc', '#94a3b8', '#1e293b'],
    ['#6366f1', '#4338ca', '#090d16'],
    ['#0ea5e9', '#0284c7', '#030712'],
  ];

  gradients.forEach((stops, idx) => {
    const x = (idx % 2) * 512;
    const y = Math.floor(idx / 2) * 320;
    const grad = ctx.createLinearGradient(x, y, x + 512, y + 320);
    grad.addColorStop(0, stops[0]);
    grad.addColorStop(0.5, stops[1]);
    grad.addColorStop(1, stops[2]);
    ctx.fillStyle = grad;
    ctx.fillRect(x, y, 512, 320);

    // Subtle noise/details
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    for (let i = 0; i < 40; i++) {
      ctx.fillRect(x + (i * 27) % 512, y + (i * 19) % 320, 8, 8);
    }
  });

  return canvas;
};

const buildGeometry = (img: HTMLImageElement, width: number, visibleRatio: number) => {
  const cell = getCellPitch(width);
  const gridW = Math.max(20, Math.round(width / cell));
  const gridH = Math.round((gridW * img.naturalHeight) / img.naturalWidth);

  const canvas = document.createElement('canvas');
  canvas.width = gridW;
  canvas.height = gridH;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;

  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, gridW, gridH);
  const data = ctx.getImageData(0, 0, gridW, gridH).data;

  const homes: number[] = [];
  const airs: number[] = [];
  const infos: number[] = [];
  const cellAttrs: number[] = [];
  const pW = 56 / 1024;
  const pH = 56 / 640;
  let maxSettle = 0;

  const addPoint = (hx: number, hy: number, bright: number, isDust: boolean) => {
    homes.push(hx, hy);
    airs.push(Math.random() * 1.2 - 0.1, Math.random() * 1.2 - 0.1, Math.random());
    const delay = 0.35 + Math.random() * 1.0 + hy * 0.45;
    const dur = 1.35 + Math.random() * 0.55;
    if (!isDust) maxSettle = Math.max(maxSettle, delay + dur);
    infos.push(bright, delay, dur, Math.random());
    cellAttrs.push(Math.random() * (1 - pW), Math.random() * (1 - pH), isDust ? 1 : 0);
  };

  const brightness = new Float32Array(gridW * gridH);
  for (let i = 0; i < gridW * gridH; i++) {
    const idx = i * 4;
    const a = data[idx + 3] / 255;
    const lum = (0.2126 * data[idx] + 0.7152 * data[idx + 1] + 0.0722 * data[idx + 2]) / 255;
    brightness[i] = lum * a;
  }

  const valid = Array.from(brightness).filter((b) => b >= 0.035).sort((a, b) => a - b);
  const minB = valid[Math.floor(valid.length * 0.02)] ?? 0;
  const maxB = valid[Math.floor(valid.length * 0.97)] ?? 1;
  const maxRow = Math.min(gridH, Math.ceil(gridH * visibleRatio));

  for (let y = 0; y < maxRow; y++) {
    for (let x = 0; x < gridW; x++) {
      const b = brightness[y * gridW + x];
      if (b < 0.035 || (b < 0.08 && Math.random() < 0.45)) continue;
      const norm = Math.min(1, Math.max(0, (b - minB) / (maxB - minB)));
      const shaped = 0.2 * norm + 0.8 * Math.pow(norm, 1.4);
      addPoint((x + 0.5) / gridW, (y + 0.5) / gridH, shaped, false);
    }
  }

  // Floating ambient dust specks
  const dustCount = Math.round((homes.length / 2) * 0.07);
  for (let i = 0; i < dustCount; i++) {
    addPoint(0.5, 0.5, 0.3, true);
  }

  return {
    settle: maxSettle,
    cell,
    count: homes.length / 2,
    home: new Float32Array(homes),
    air: new Float32Array(airs),
    info: new Float32Array(infos),
    cellAttr: new Float32Array(cellAttrs),
  };
};

export const MosaicCanvas: React.FC<MosaicCanvasProps> = ({
  src,
  anchorRef,
  play,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (play && startTimeRef.current === null) {
      startTimeRef.current = performance.now() / 1000;
    }
  }, [play]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const anchor = anchorRef.current;
    if (!canvas || !anchor) return;

    const gl = canvas.getContext('webgl2', {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
    });

    const fallback = () => {
      if (anchor) anchor.style.visibility = 'visible';
      if (canvas) canvas.style.display = 'none';
    };

    if (!gl) {
      fallback();
      return;
    }

    let program: WebGLProgram;
    try {
      program = gl.createProgram()!;
      gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER));
      gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error('Link failed');
      }
    } catch {
      fallback();
      return;
    }

    gl.useProgram(program);

    const getLoc = (name: string) => gl.getUniformLocation(program, name);
    const uniforms = {
      res: getLoc('uRes'),
      rect: getLoc('uRect'),
      cell: getLoc('uCell'),
      dpr: getLoc('uDpr'),
      time: getLoc('uTime'),
      reveal: getLoc('uReveal'),
      scatter: getLoc('uScatter'),
      mouse: getLoc('uMouse'),
      atlas: getLoc('uAtlas'),
      win: getLoc('uWin'),
    };

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    const buffers = ['aHome', 'aAir', 'aInfo', 'aCell'].map((attr, idx) => {
      const buf = gl.createBuffer();
      const loc = gl.getAttribLocation(program, attr);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, [2, 3, 4, 3][idx], gl.FLOAT, false, 0, 0);
      return buf;
    });

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.uniform2f(uniforms.win, 56 / 1024, 56 / 640);

    // Create Atlas texture
    const atlasCanvas = generateAtlas();
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      atlasCanvas
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    let loadedImg: HTMLImageElement | null = null;
    let particleCount = 0;
    let cellPitch = 5;
    let cachedWidth = -1;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => {
      loadedImg = img;
      updateBuffers();
    };

    const updateBuffers = () => {
      if (!loadedImg) return;
      const anchorRect = anchor.getBoundingClientRect();
      const w = anchorRect.width;
      if (w < 10 || Math.abs(w - cachedWidth) < 1) return;
      cachedWidth = w;

      const canvasRect = canvas.getBoundingClientRect();
      const visibleRatio = Math.max(0, Math.min(1, (canvasRect.bottom - anchorRect.top) / anchorRect.height));
      const geom = buildGeometry(loadedImg, w, visibleRatio);
      if (!geom) return;

      particleCount = geom.count;
      cellPitch = geom.cell;

      [geom.home, geom.air, geom.info, geom.cellAttr].forEach((data, i) => {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers[i]);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      });
    };

    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
      if (mouse.x < -999) {
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
      }
    };
    const onMouseLeave = () => {
      mouse.tx = -9999;
      mouse.ty = -9999;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave, { passive: true });

    let rafId: number;
    const render = () => {
      if (!particleCount || startTimeRef.current === null) {
        gl.clear(gl.COLOR_BUFFER_BIT);
        rafId = requestAnimationFrame(render);
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const cssW = Math.round(rect.width * dpr);
      const cssH = Math.round(rect.height * dpr);

      if (canvas.width !== cssW || canvas.height !== cssH) {
        canvas.width = cssW;
        canvas.height = cssH;
      }
      updateBuffers();

      const anchorRect = anchor.getBoundingClientRect();
      const now = performance.now() / 1000;
      const revealSec = now - startTimeRef.current;
      const scatter = Math.min(1, Math.max(0, -rect.top / (rect.height * 0.7)));

      mouse.x += (mouse.tx - mouse.x) * 0.18;
      mouse.y += (mouse.ty - mouse.y) * 0.18;

      gl.viewport(0, 0, cssW, cssH);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform2f(uniforms.res, rect.width, rect.height);
      gl.uniform4f(
        uniforms.rect,
        anchorRect.left - rect.left,
        anchorRect.top - rect.top,
        anchorRect.width,
        anchorRect.height
      );
      gl.uniform1f(uniforms.cell, cellPitch);
      gl.uniform1f(uniforms.dpr, dpr);
      gl.uniform1f(uniforms.time, now);
      gl.uniform1f(uniforms.reveal, revealSec);
      gl.uniform1f(uniforms.scatter, scatter);
      gl.uniform2f(uniforms.mouse, mouse.x, mouse.y);

      gl.bindVertexArray(vao);
      gl.drawArrays(gl.POINTS, 0, particleCount);

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      buffers.forEach((b) => gl.deleteBuffer(b));
      gl.deleteTexture(texture);
      gl.deleteProgram(program);
    };
  }, [src, anchorRef, play]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-auto z-10 ${className}`}
    />
  );
};
