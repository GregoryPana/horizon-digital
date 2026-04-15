import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

// Types for component props
interface HeroProps {
  trustBadge?: {
    text: string;
    icons?: string[];
  };
  headline: {
    lines: string[];
    rotatingWords?: string[];
  };
  subtitle: string;
  tags?: {
    text: string;
    icon: React.ReactNode;
  }[];
  buttons?: {
    primary?: {
      text: string;
      onClick?: () => void;
      link?: string;
    };
    secondary?: {
      text: string;
      onClick?: () => void;
      link?: string;
    };
  };
  className?: string;
}

// Reusable Shader Background Hook
const useShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const pointersRef = useRef<PointerHandler | null>(null);

  // WebGL Renderer class
  class WebGLRenderer {
    private canvas: HTMLCanvasElement;
    private gl: WebGL2RenderingContext;
    private program: WebGLProgram | null = null;
    private vs: WebGLShader | null = null;
    private fs: WebGLShader | null = null;
    private buffer: WebGLBuffer | null = null;
    private shaderSource: string;
    private mouseMove = [0, 0];
    private mouseCoords = [0, 0];
    private pointerCoords = [0, 0];
    private nbrOfPointers = 0;

    private vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

    private vertices = [-1, 1, -1, -1, 1, 1, 1, -1];

    constructor(canvas: HTMLCanvasElement, scale: number) {
      this.canvas = canvas;
      this.gl = canvas.getContext('webgl2')!;
      this.gl.viewport(0, 0, canvas.width * scale, canvas.height * scale);
      this.shaderSource = defaultShaderSource;
    }

    updateShader(source: string) {
      this.reset();
      this.shaderSource = source;
      this.setup();
      this.init();
    }

    updateMove(deltas: number[]) {
      this.mouseMove = deltas;
    }

    updateMouse(coords: number[]) {
      this.mouseCoords = coords;
    }

    updatePointerCoords(coords: number[]) {
      this.pointerCoords = coords;
    }

    updatePointerCount(nbr: number) {
      this.nbrOfPointers = nbr;
    }

    updateScale(scale: number) {
      this.gl.viewport(0, 0, this.canvas.width * scale, this.canvas.height * scale);
    }

    compile(shader: WebGLShader, source: string) {
      const gl = this.gl;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const error = gl.getShaderInfoLog(shader);
        console.error('Shader compilation error:', error);
      }
    }

    test(source: string) {
      let result = null;
      const gl = this.gl;
      const shader = gl.createShader(gl.FRAGMENT_SHADER)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        result = gl.getShaderInfoLog(shader);
      }
      gl.deleteShader(shader);
      return result;
    }

    reset() {
      const gl = this.gl;
      if (this.program && !gl.getProgramParameter(this.program, gl.DELETE_STATUS)) {
        if (this.vs) {
          gl.detachShader(this.program, this.vs);
          gl.deleteShader(this.vs);
        }
        if (this.fs) {
          gl.detachShader(this.program, this.fs);
          gl.deleteShader(this.fs);
        }
        gl.deleteProgram(this.program);
      }
    }

    setup() {
      const gl = this.gl;
      this.vs = gl.createShader(gl.VERTEX_SHADER)!;
      this.fs = gl.createShader(gl.FRAGMENT_SHADER)!;
      this.compile(this.vs, this.vertexSrc);
      this.compile(this.fs, this.shaderSource);
      this.program = gl.createProgram()!;
      gl.attachShader(this.program, this.vs);
      gl.attachShader(this.program, this.fs);
      gl.linkProgram(this.program);

      if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(this.program));
      }
    }

    init() {
      const gl = this.gl;
      const program = this.program!;
      
      this.buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

      const position = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

      (program as any).resolution = gl.getUniformLocation(program, 'resolution');
      (program as any).time = gl.getUniformLocation(program, 'time');
      (program as any).move = gl.getUniformLocation(program, 'move');
      (program as any).touch = gl.getUniformLocation(program, 'touch');
      (program as any).pointerCount = gl.getUniformLocation(program, 'pointerCount');
      (program as any).pointers = gl.getUniformLocation(program, 'pointers');
    }

    render(now = 0) {
      const gl = this.gl;
      const program = this.program;
      
      if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return;

      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      
      gl.uniform2f((program as any).resolution, this.canvas.width, this.canvas.height);
      gl.uniform1f((program as any).time, now * 0.4e-3); // Slower animation (0.4 instead of 1.0)
      gl.uniform2f((program as any).move, this.mouseMove[0], this.mouseMove[1]);
      gl.uniform2f((program as any).touch, this.mouseCoords[0], this.mouseCoords[1]);
      gl.uniform1i((program as any).pointerCount, this.nbrOfPointers);
      gl.uniform2fv((program as any).pointers, new Float32Array(this.pointerCoords));
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
  }

  // Pointer Handler class
  class PointerHandler {
    private scale: number;
    private active = false;
    private pointers = new Map<number, number[]>();
    private lastCoords = [0, 0];
    private moves = [0, 0];

    constructor(element: HTMLCanvasElement, scale: number) {
      this.scale = scale;
      
      const map = (element: HTMLCanvasElement, scale: number, x: number, y: number) => 
        [x * scale, element.height - y * scale];

      element.addEventListener('pointerdown', (e) => {
        this.active = true;
        this.pointers.set(e.pointerId, map(element, this.getScale(), e.clientX, e.clientY));
      });

      element.addEventListener('pointerup', (e) => {
        if (this.count === 1) {
          this.lastCoords = this.first;
        }
        this.pointers.delete(e.pointerId);
        this.active = this.pointers.size > 0;
      });

      element.addEventListener('pointerleave', (e) => {
        if (this.count === 1) {
          this.lastCoords = this.first;
        }
        this.pointers.delete(e.pointerId);
        this.active = this.pointers.size > 0;
      });

      element.addEventListener('pointermove', (e) => {
        if (!this.active) return;
        this.lastCoords = [e.clientX, e.clientY];
        this.pointers.set(e.pointerId, map(element, this.getScale(), e.clientX, e.clientY));
        this.moves = [this.moves[0] + e.movementX, this.moves[1] + e.movementY];
      });
    }

    getScale() {
      return this.scale;
    }

    updateScale(scale: number) {
      this.scale = scale;
    }

    get count() {
      return this.pointers.size;
    }

    get move() {
      return this.moves;
    }

    get coords() {
      return this.pointers.size > 0 
        ? Array.from(this.pointers.values()).flat() 
        : [0, 0];
    }

    get first() {
      return this.pointers.values().next().value || this.lastCoords;
    }
  }

  const resize = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
    
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    
    if (rendererRef.current) {
      rendererRef.current.updateScale(dpr);
    }
  };

  const loop = (now: number) => {
    if (!rendererRef.current || !pointersRef.current) return;
    
    rendererRef.current.updateMouse(pointersRef.current.first);
    rendererRef.current.updatePointerCount(pointersRef.current.count);
    rendererRef.current.updatePointerCoords(pointersRef.current.coords);
    rendererRef.current.updateMove(pointersRef.current.move);
    rendererRef.current.render(now);
    animationFrameRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);

    // Defer initialization to allow the text to paint first (better LCP)
    const initTimer = setTimeout(() => {
      rendererRef.current = new WebGLRenderer(canvas, dpr);
      pointersRef.current = new PointerHandler(canvas, dpr);
      
      rendererRef.current.setup();
      rendererRef.current.init();
      
      resize();
      
      if (rendererRef.current.test(defaultShaderSource) === null) {
        rendererRef.current.updateShader(defaultShaderSource);
      }
      
      loop(0);
    }, 200);
    
    window.addEventListener('resize', resize);
    
    return () => {
      clearTimeout(initTimer);
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.reset();
      }
    };
  }, []);

  return canvasRef;
};

// ── Character Wave Animation Component ──
const WaveChar: React.FC<{
  char: string;
  index: number;
  delay: number;
  className?: string;
  style?: React.CSSProperties;
}> = ({ char, index, delay, className, style }) => (
  <motion.span
    key={index}
    initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{
      duration: 0.5,
      delay,
      ease: [0.16, 1, 0.3, 1],
    }}
    className={className}
    style={{ display: 'inline-block', ...style }}
  >
    {char === ' ' ? '\u00A0' : char}
  </motion.span>
);

// ── Subtitle Wave Animation Component (Word-based to prevent mid-word wrapping) ──
const SubtitleWaveWord: React.FC<{
  word: string;
  index: number;
  delay: number;
}> = ({ word, index, delay }) => (
  <motion.span
    key={index}
    initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{
      duration: 0.5,
      delay,
      ease: [0.16, 1, 0.3, 1],
    }}
    style={{ display: 'inline-block', whiteSpace: 'pre' }}
  >
    {word}
  </motion.span>
);

// Reusable Hero Component
const Hero: React.FC<HeroProps> = ({
  trustBadge,
  headline,
  subtitle,
  tags,
  buttons,
  className = ""
}) => {
  const canvasRef = useShaderBackground();
  const [slotActive, setSlotActive] = useState(false);

  // ── Build the full title text for per-character animation ──
  // For lines with rotating words, show line with FIRST rotating word statically
  // The slot machine only activates after all animations complete
  const titleData = useMemo(() => {
    return headline.lines.map((line, lineIndex) => {
      const hasSlot = lineIndex === 0 && headline.rotatingWords && headline.rotatingWords.length > 1;
      if (hasSlot) {
        const rotatingWord0 = headline.rotatingWords![0];
        const parts = line.split(rotatingWord0);
        const prefix = parts[0].trim();
        const suffix = parts[1].trim();
        return { line, prefix, suffix, rotatingWord0, hasSlot: true, lineIndex };
      }
      return { line, prefix: '', suffix: '', rotatingWord0: '', hasSlot: false, lineIndex };
    });
  }, [headline]);

  // ── High-End Concurrent Timeline Sequencing ──
  // Do NOT wait for previous elements to finish. An organic, concurrent resolve is 
  // vastly superior to a sequential "waterfall" typical of generic AI layouts.
  
  const EYEBROW_START = 0.1;
  const TITLE_START = 0.1;
  const CHAR_STAGGER = 0.015; // Extremely fast, snappy organic ripple
  
  const SUBTITLE_START = 0.3; // Subtitle resolves slightly after title starts
  const CTA_START = 0.45;     // CTAs are critical - bring them in ASAP
  const PILLS_START = 0.55;   // Decorative tag pills rest at the end 

  // Slot activation — activates the rotating mechanism shortly after initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setSlotActive(true);
    }, 1800); // Wait for the initial animations to clearly settle
    return () => clearTimeout(timer);
  }, []);

  // ── Build character delay map for title ──
  let charCounter = 0;

  return (
    <div className={`relative w-full h-[100dvh] lg:min-h-[100dvh] flex flex-col overflow-hidden bg-[#0A0A0C] ${className}`}>
      <style>{`
        .animate-gradient {
          background-size: 300% auto;
          animation: cta-gradient 4s linear infinite;
        }

        .cta-gradient-anim {
          animation: cta-gradient 6s linear infinite;
        }
        @media (min-width: 640px) {
          .cta-gradient-anim {
            animation: cta-gradient 5s linear infinite;
          }
        }

        @keyframes hero-slot {
          0%, 15% { transform: translate3d(0, 0, 0); }
          20%, 35% { transform: translate3d(0, -20%, 0); }
          40%, 55% { transform: translate3d(0, -40%, 0); }
          60%, 75% { transform: translate3d(0, -60%, 0); }
          80%, 100% { transform: translate3d(0, -80%, 0); }
        }

        @keyframes cta-gradient {
          0% { background-position: 0% 50%; }
          100% { background-position: -300% 50%; }
        }
      `}</style>
      
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover touch-none"
        style={{ background: '#0A0A0C' }}
      />
      
      {/* Overlay Background */}
      <div className="absolute inset-x-0 bottom-0 z-[1] h-full bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/50 to-transparent pointer-events-none" />

      {/* Hero Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full pt-16 md:pt-20 pb-16 md:pb-20 lg:pb-[8vh] text-white px-6">
        
        {/* Centered Block: Eyebrow, Title, Subtitle, Tags */}
        <div className="w-full flex flex-col items-center space-y-5 sm:space-y-8 lg:space-y-12 mb-4 sm:mb-12 lg:mb-28">
          
          {/* ═══ EYEBROW PILL — Animates 5th (after CTAs) ═══ */}
          {trustBadge && (
            <motion.div
              initial={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: EYEBROW_START, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-6 sm:py-2 bg-cyan/5 backdrop-blur-md border border-cyan/40 rounded-full text-[11px] sm:text-xs lg:text-sm font-bold uppercase tracking-[0.2em] lg:tracking-[0.35em] text-accent leading-none">
                {trustBadge.icons && (
                  <div className="flex gap-1.5">
                    {trustBadge.icons.map((icon, index) => (
                      <span key={index}>{icon}</span>
                    ))}
                  </div>
                )}
                <span>{trustBadge.text}</span>
              </div>
            </motion.div>
          )}

          <div className="text-center space-y-4 sm:space-y-6 w-full mx-auto flex flex-col items-center">
            
            {/* ═══ HERO TITLE — Per-character wave animation (Phase 1) ═══ */}
            <div className="space-y-1.5 sm:space-y-3 max-w-[95vw] lg:max-w-none mx-auto flex flex-col items-center">
              {titleData.map((td) => {
                const lineCharStart = charCounter;

                if (td.hasSlot) {
                  // Line with rotating words — show prefix + first word (static initially) + suffix
                  const prefixChars = td.prefix.split('');
                  const wordChars = td.rotatingWord0.split('');
                  const suffixChars = td.suffix.split('');

                  const prefixElements = prefixChars.map((c, i) => {
                    const delay = TITLE_START + (lineCharStart + i) * CHAR_STAGGER;
                    charCounter++;
                    return (
                      <WaveChar
                        key={`p-${i}`}
                        char={c}
                        index={i}
                        delay={delay}
                        className="bg-clip-text text-transparent"
                        style={{ backgroundImage: 'linear-gradient(to bottom right, white, #e2e8f0, #cbd5e1)' }}
                      />
                    );
                  });

                  const wordElements = wordChars.map((c, i) => {
                    const delay = TITLE_START + charCounter * CHAR_STAGGER;
                    charCounter++;
                    return (
                      <WaveChar
                        key={`w-${i}`}
                        char={c}
                        index={i}
                        delay={delay}
                        className="text-accent"
                      />
                    );
                  });

                  const suffixElements = suffixChars.map((c, i) => {
                    const delay = TITLE_START + charCounter * CHAR_STAGGER;
                    charCounter++;
                    return (
                      <WaveChar
                        key={`s-${i}`}
                        char={c}
                        index={i}
                        delay={delay}
                        className="bg-clip-text text-transparent"
                        style={{ backgroundImage: 'linear-gradient(to bottom right, white, #e2e8f0, #cbd5e1)' }}
                      />
                    );
                  });

                  return (
                    <h1
                      key={td.lineIndex}
                      className="block w-full text-center text-[clamp(1.6rem,8.5vw,6.5rem)] sm:text-[clamp(2.2rem,8.5vw,6.5rem)] font-bold font-display uppercase leading-[1.1] lg:leading-[0.95] tracking-[0.02em]"
                    >
                      {/* block + text-center: inline-block WaveChar spans center via CSS text-align inheritance */}
                      <span className="block w-full text-center">
                        {td.prefix && (
                          <span className="block w-full text-center h-[1.1em] lg:h-[0.95em] whitespace-nowrap">
                            {prefixElements}
                          </span>
                        )}
                        <span className="block w-full text-center overflow-hidden h-[1.1em] lg:h-[0.95em]">
                          <span
                            className="block w-full"
                            style={slotActive ? { animation: 'hero-slot 12s cubic-bezier(0.4, 0, 0.2, 1) infinite' } : undefined}
                          >
                            {/* First word: WaveChar animation on initial load */}
                            <span className="block w-full text-center text-accent h-[1.1em] lg:h-[0.95em] whitespace-nowrap">
                              {wordElements}
                            </span>
                            {/* Remaining words for slot rotation */}
                            {headline.rotatingWords!.slice(1).map((word, i) => (
                              <span
                                key={i + 1}
                                className="block w-full text-center text-accent h-[1.1em] lg:h-[0.95em] whitespace-nowrap"
                              >
                                {word}
                              </span>
                            ))}
                            {/* Repeat first word for seamless loop */}
                            <span className="block w-full text-center text-accent h-[1.1em] lg:h-[0.95em] whitespace-nowrap">
                              {headline.rotatingWords![0]}
                            </span>
                          </span>
                        </span>
                        {td.suffix && (
                          <span className="block w-full text-center h-[1.1em] lg:h-[0.95em] whitespace-nowrap">
                            {suffixElements}
                          </span>
                        )}
                      </span>
                    </h1>
                  );
                } else {
                  // Non-slot line — simple per-char wave
                  const chars = td.line.split('');
                  const isGradientLine = td.lineIndex === 1;
                  const elements = chars.map((c, i) => {
                    const delay = TITLE_START + charCounter * CHAR_STAGGER;
                    charCounter++;
                    return (
                      <WaveChar
                        key={`l${td.lineIndex}-${i}`}
                        char={c}
                        index={i}
                        delay={delay}
                        className={isGradientLine ? 'text-accent' : 'bg-clip-text text-transparent'}
                        style={
                          isGradientLine
                            ? undefined
                            : { backgroundImage: 'linear-gradient(to bottom right, white, #e2e8f0, #cbd5e1)' }
                        }
                      />
                    );
                  });

                  return (
                    <h1
                      key={td.lineIndex}
                      className="block w-full text-center text-[clamp(1.6rem,8.5vw,6.5rem)] sm:text-[clamp(2.2rem,8.5vw,6.5rem)] font-bold font-display uppercase leading-[1.1] lg:leading-[0.95] tracking-[0.02em]"
                    >
                      <span className="block w-full text-center whitespace-nowrap">
                        {elements}
                      </span>
                    </h1>
                  );
                }
              })}
            </div>
            
            {/* ═══ SUBTITLE — Per-word wave animation (Phase 2) ═══ */}
            <div className="max-w-2xl sm:max-w-3xl mx-auto">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 font-normal leading-relaxed" style={{ overflowWrap: 'break-word', wordBreak: 'normal' }}>
                {subtitle.split(' ').map((word, i, arr) => (
                  <SubtitleWaveWord
                    key={i}
                    word={i < arr.length - 1 ? word + ' ' : word}
                    index={i}
                    delay={SUBTITLE_START + i * 0.04}
                  />
                ))}
              </p>
            </div>

            {/* ═══ TRUST PILLS — Fade in from blur (Phase 3) ═══ */}
            {tags && (
               <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-4 sm:gap-y-3 mt-4 sm:mt-12 w-full max-w-[95vw] sm:max-w-none">
               {tags.map((tag, idx) => (
                     <motion.div
                    key={tag.text}
                    initial={{ opacity: 0, filter: 'blur(12px)', scale: 0.92 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                    transition={{ duration: 0.55, delay: PILLS_START + (idx * 0.08), ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      "flex items-center justify-start gap-1.5 rounded-[1rem] sm:rounded-full border border-cyan/40 bg-cyan/5 px-3 py-2 sm:px-5 sm:py-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.08em] text-accent backdrop-blur-md md:border-accent/50 md:bg-accent/10 min-h-[44px] sm:min-h-0 text-left leading-[1.2]",
                      idx >= 2 && "col-span-1"
                    )}
                  >
                    <span className="flex-shrink-0 text-cyan scale-90 md:scale-100">{tag.icon}</span>
                    <span className="opacity-90 leading-tight">{tag.text}</span>
                  </motion.div>
               ))}
             </div>
            )}
          </div>
        </div>
          
        {/* ═══ CTA BUTTONS — Primary from left, Secondary from right (Phase 4) ═══ */}
        {buttons && (
          <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center items-center w-full px-6 relative z-20">
            {buttons.primary && (
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: CTA_START, ease: [0.16, 1, 0.3, 1] }}
                className="w-full sm:w-auto"
              >
                <Link 
                  to={buttons.primary.link || '#'}
                  onClick={buttons.primary.onClick}
                  className="px-8 py-4 sm:px-10 sm:py-5 text-black rounded-full font-black uppercase tracking-[0.2em] text-xs sm:text-sm transition-all duration-300 hover:scale-[1.02] hover:brightness-110 active:scale-95 text-center flex items-center justify-center w-full sm:w-auto sm:min-w-[240px] cta-gradient-anim"
                  style={{ backgroundImage: 'linear-gradient(90deg, var(--accent), var(--accent-2), #0C7CC4, var(--accent))', backgroundSize: '300% 100%' }}
                >
                  {buttons.primary.text}
                </Link>
              </motion.div>
            )}
            {buttons.secondary && (
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: CTA_START + 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="w-full sm:w-auto"
              >
                <Link 
                  to={buttons.secondary.link || '#'}
                  onClick={buttons.secondary.onClick}
                  className="group px-8 py-4 sm:px-10 sm:py-5 text-white rounded-full font-black uppercase tracking-[0.2em] text-xs sm:text-sm transition-all duration-300 backdrop-blur-md text-center flex items-center justify-center w-full sm:w-auto sm:min-w-[240px] hover:brightness-125 cta-gradient-anim"
                  style={{ border: '1px solid transparent', backgroundImage: 'linear-gradient(#0A0A0C, #0A0A0C), linear-gradient(90deg, rgba(94,209,222,0.4), rgba(56,189,248,0.4), rgba(12,124,196,0.3), rgba(94,209,222,0.4))', backgroundOrigin: 'padding-box, border-box', backgroundClip: 'padding-box, border-box', backgroundSize: '100% 100%, 300% 100%' }}
                >
                  {buttons.secondary.text} <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </motion.div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

const defaultShaderSource = `#version 300 es
/*********
* Made by Matthias Hurrle (@atzedent)
* Modified for Abyss Theme (Oceanic/Cyan)
*/
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)

// Returns a pseudo random number for a given point (white noise)
float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}

// Returns a pseudo random number for a given point (value noise)
float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float
  a=rnd(i),
  b=rnd(i+vec2(1,0)),
  c=rnd(i+vec2(0,1)),
  d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}

// Returns a pseudo random number for a given point (fractal noise)
float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) {
    t+=a*noise(p);
    p*=2.*m;
    a*=.5;
  }
  return t;
}

float clouds(vec2 p) {
	float d=1., t=.0;
	for (float i=.0; i<3.; i++) {
		float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
		t=mix(t,d,a);
		d=a;
		p*=2./(i+1.);
	}
	return t;
}

void main(void) {
	vec2 uv=(FC-.5*R)/MN, st=uv*vec2(2,1);
	vec3 col=vec3(0);
	float bg=clouds(vec2(st.x+T*.5,-st.y));
	uv*=1.-.3*(sin(T*.2)*.5+.5);
  vec2 p0 = uv; // save initial uv
	for (float i=1.; i<25.; i++) { // Increased to 25 for more stars as requested
		uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.5+.1*uv.x);
		vec2 p=uv + vec2(sin(i*1.3)*0.35, cos(i*0.7)*0.2); // Reduced spread to keep them more cohesive
		float d=length(p);
    
    // Adjusted colors for Oceanic Abyss (Cyan/Blue)
		col+=.00125/d*(cos(sin(i)*vec3(0.2, 0.7, 1.2))+1.);
    
		float b=noise(i+p+bg*1.731);
		col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
    
    // Mix with oceanic background tones
		col=mix(col,vec3(bg*.02, bg*.15, bg*.22), d);
	}
  // Soft center horizontal mask to reduce brightness behind text
  float m = smoothstep(0.0, 0.5, abs(p0.y)); 
  col *= mix(0.4, 1.0, m);
	O=vec4(col, 1.0);
}`;

export default Hero;
