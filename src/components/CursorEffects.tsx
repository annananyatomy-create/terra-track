import React, { useEffect, useState, useRef } from 'react';

interface Bubble {
  id: number;
  x: number;
  y: number;
  radius: number;
  color: string;
  strokeColor: string;
  opacity: number;
  vx: number;
  vy: number;
  wobbleSpeed: number;
  wobbleOffset: number;
  life: number;
  maxLife: number;
}

interface SplashDroplet {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
}

interface WaterRipple {
  id: number;
  x: number;
  y: number;
  maxRadius: number;
  color: string;
}

export const CursorEffects: React.FC = () => {
  const [enabled, setEnabled] = useState<boolean>(true);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);
  const [cursorHovered, setCursorHovered] = useState<boolean>(false);
  const [cursorClicked, setCursorClicked] = useState<boolean>(false);
  const [hoverType, setHoverType] = useState<'button' | 'link' | 'card' | 'input' | null>(null);

  // Position references for high-precision, low-latency tracking
  const mousePos = useRef({ x: -100, y: -100 });
  const prevMousePos = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });
  const ringRef = useRef<HTMLDivElement>(null);
  const dropletRef = useRef<HTMLDivElement>(null);
  const causticRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<WaterRipple[]>([]);
  const bubblesRef = useRef<Bubble[]>([]);
  const splashDropletsRef = useRef<SplashDroplet[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    let animationFrameId: number;
    let bubbleIdCounter = 0;
    let lastBubbleTime = 0;
    let lastWakeTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Update ambient underwater caustic glow directly with smooth positioning
      if (causticRef.current) {
        causticRef.current.style.transform = `translate3d(${e.clientX - 240}px, ${e.clientY - 240}px, 0)`;
      }

      // Velocity calculation for dynamic green water effects
      const dx = e.clientX - prevMousePos.current.x;
      const dy = e.clientY - prevMousePos.current.y;
      const speed = Math.hypot(dx, dy);
      prevMousePos.current = { x: e.clientX, y: e.clientY };

      const now = performance.now();

      // Emit translucent green water bubbles on movement
      if (enabled && now - lastBubbleTime > 28) {
        lastBubbleTime = now;
        const emeraldShades = [
          { fill: 'rgba(167, 243, 208, 0.28)', stroke: 'rgba(52, 211, 153, 0.85)' },
          { fill: 'rgba(110, 231, 183, 0.3)', stroke: 'rgba(16, 185, 129, 0.9)' },
          { fill: 'rgba(209, 250, 229, 0.32)', stroke: 'rgba(5, 150, 105, 0.8)' },
          { fill: 'rgba(52, 211, 153, 0.25)', stroke: 'rgba(16, 185, 129, 0.95)' },
        ];
        const shade = emeraldShades[Math.floor(Math.random() * emeraldShades.length)];
        const baseRadius = Math.random() * 3.2 + 1.8;

        bubblesRef.current.push({
          id: bubbleIdCounter++,
          x: e.clientX + (Math.random() * 6 - 3),
          y: e.clientY + (Math.random() * 6 - 3),
          radius: baseRadius,
          color: shade.fill,
          strokeColor: shade.stroke,
          opacity: 0.9,
          vx: (Math.random() - 0.5) * 0.9,
          vy: -(Math.random() * 1.4 + 0.7), // Natural upward water buoyancy
          wobbleSpeed: Math.random() * 0.08 + 0.04,
          wobbleOffset: Math.random() * Math.PI * 2,
          life: 0,
          maxLife: Math.random() * 24 + 16, // Snappy clean lifespan
        });

        if (bubblesRef.current.length > 28) {
          bubblesRef.current.shift();
        }
      }

      // Smooth water wake ripple on rapid movement (380ms duration)
      if (enabled && speed > 26 && now - lastWakeTime > 110) {
        lastWakeTime = now;
        const wakeRipple: WaterRipple = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          maxRadius: Math.min(speed * 1.2, 38),
          color: 'rgba(52, 211, 153, 0.7)',
        };
        setRipples((prev) => [...prev.slice(-3), wakeRipple]);
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== wakeRipple.id));
        }, 380);
      }

      // Check hovered interactive elements with smooth state transitions
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactiveEl = target.closest(
          'button, a, input, select, textarea, [role="button"], [role="tab"], .hover-interactive'
        );
        if (interactiveEl) {
          setCursorHovered(true);
          if (interactiveEl.tagName === 'BUTTON' || interactiveEl.getAttribute('role') === 'button') {
            setHoverType('button');
          } else if (interactiveEl.tagName === 'A') {
            setHoverType('link');
          } else if (interactiveEl.tagName === 'INPUT' || interactiveEl.tagName === 'TEXTAREA' || interactiveEl.tagName === 'SELECT') {
            setHoverType('input');
          } else {
            setHoverType('card');
          }
        } else {
          setCursorHovered(false);
          setHoverType(null);
        }
      }
    };

    // Instant click reaction: water ripple wave & silky splash droplets
    const handleMouseDown = (e: MouseEvent) => {
      setCursorClicked(true);

      const now = Date.now();
      const wave1: WaterRipple = { id: now, x: e.clientX, y: e.clientY, maxRadius: 46, color: 'rgba(16, 185, 129, 0.9)' };
      const wave2: WaterRipple = { id: now + 1, x: e.clientX, y: e.clientY, maxRadius: 32, color: 'rgba(52, 211, 153, 0.75)' };
      setRipples((prev) => [...prev.slice(-3), wave1, wave2]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== wave1.id && r.id !== wave2.id));
      }, 380);

      // Fast, smooth water splash droplets
      const splashCount = 7;
      for (let i = 0; i < splashCount; i++) {
        const angle = (Math.PI * 2 * i) / splashCount + (Math.random() * 0.4 - 0.2);
        const force = Math.random() * 3.6 + 2.2;
        splashDropletsRef.current.push({
          id: Math.random(),
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * force,
          vy: Math.sin(angle) * force - 1.0,
          radius: Math.random() * 2.2 + 1.4,
          opacity: 0.95,
          color: Math.random() > 0.4 ? '#10b981' : '#34d399',
        });
      }
    };

    const handleMouseUp = () => {
      setCursorClicked(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Highly responsive animation loop with monitor VSync synchronization
    const renderLoop = () => {
      // 1. Update dot point directly in sync with VSync for 0ms lag
      if (dropletRef.current) {
        dropletRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      // 2. Adaptive fluid drag: provides instantaneous response while preserving silky smooth liquid trailing
      const dx = mousePos.current.x - followerPos.current.x;
      const dy = mousePos.current.y - followerPos.current.y;
      const distance = Math.hypot(dx, dy);
      const fluidDrag = distance > 60 ? 0.52 : 0.46;
      followerPos.current.x += dx * fluidDrag;
      followerPos.current.y += dy * fluidDrag;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0)`;
      }

      // 3. Render Green Water Bubbles & Splash Droplets on Canvas
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Render Bubbles with smooth sinusoidal wobble
        for (let i = bubblesRef.current.length - 1; i >= 0; i--) {
          const b = bubblesRef.current[i];
          b.life += 1;
          b.y += b.vy;
          b.x += b.vx + Math.sin(b.life * b.wobbleSpeed + b.wobbleOffset) * 0.45;
          b.opacity = 1 - b.life / b.maxLife;

          if (b.life >= b.maxLife || b.y < 0) {
            bubblesRef.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
          ctx.fillStyle = b.color;
          ctx.globalAlpha = b.opacity * 0.75;
          ctx.fill();

          ctx.strokeStyle = b.strokeColor;
          ctx.lineWidth = 1.1;
          ctx.globalAlpha = b.opacity * 0.95;
          ctx.stroke();

          // Specular shine reflection
          ctx.beginPath();
          ctx.arc(
            b.x - b.radius * 0.35,
            b.y - b.radius * 0.35,
            b.radius * 0.32,
            Math.PI * 0.9,
            Math.PI * 1.6
          );
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.lineWidth = 0.9;
          ctx.stroke();

          ctx.restore();
        }

        // Render Splash Droplets
        for (let i = splashDropletsRef.current.length - 1; i >= 0; i--) {
          const s = splashDropletsRef.current[i];
          s.x += s.vx;
          s.y += s.vy;
          s.vy += 0.22; // Snappy gravity
          s.vx *= 0.94;
          s.opacity -= 0.045;
          s.radius *= 0.96;

          if (s.opacity <= 0 || s.radius < 0.4) {
            splashDropletsRef.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.fillStyle = s.color;
          ctx.globalAlpha = s.opacity;
          ctx.shadowBlur = 5;
          ctx.shadowColor = '#10b981';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(s.x - s.radius * 0.3, s.y - s.radius * 0.3, s.radius * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled]);

  if (isTouchDevice || !enabled) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={() => setEnabled(true)}
          className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-emerald-200 text-[11px] font-semibold text-emerald-800 hover:bg-[#F5FFF9] shadow-sm flex items-center gap-1.5 transition-all"
          title="Enable Green Water cursor effects"
        >
          <span className="w-2 h-2 rounded-full bg-slate-300" />
          <span>Water FX: Off</span>
        </button>
      </div>
    );
  }

  return (
    <>
      {/* 1. Ambient Green Lagoon Caustic Glow (Lightweight & Low Latency) */}
      <div
        ref={causticRef}
        className="pointer-events-none fixed top-0 left-0 w-[480px] h-[480px] rounded-full blur-3xl z-10 opacity-65"
        style={{
          willChange: 'transform',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(52, 211, 153, 0.08) 38%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* 2. Water Bubbles & Aquatic Wake Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-30"
        aria-hidden="true"
      />

      {/* 3. Fluid Follower Ring with Silky Spring Transitions */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-40 -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
        aria-hidden="true"
      >
        <div
          className={`animate-water-droplet rounded-full border transition-[width,height,border-color,background-color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center relative ${
            cursorClicked
              ? 'w-7 h-7 border-[#10b981] bg-[#10b981]/30 shadow-[0_0_14px_rgba(16,185,129,0.6)]'
              : cursorHovered
              ? hoverType === 'button'
                ? 'w-13 h-13 border-[#10b981] bg-[#10b981]/15 shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                : 'w-11 h-11 border-[#34d399] bg-[#34d399]/15 shadow-[0_0_16px_rgba(52,211,153,0.4)]'
              : 'w-8 h-8 border-[#10b981]/70 bg-[#10b981]/10 shadow-[0_0_10px_rgba(16,185,129,0.25)]'
          }`}
        >
          {/* Faint internal liquid core wave */}
          <span className="w-3.5 h-3.5 rounded-full border border-[#34d399]/50 animate-ping opacity-30 pointer-events-none" />
        </div>
      </div>

      {/* 4. REDESIGNED PRIMARY DOT POINT: Aquatic Crystal Dewdrop with Smooth Liquid Transitions */}
      <div
        ref={dropletRef}
        className="pointer-events-none fixed top-0 left-0 z-50 -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
        aria-hidden="true"
      >
        <div
          className={`relative flex items-center justify-center transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            cursorClicked
              ? 'scale-75 rotate-45'
              : cursorHovered
              ? 'scale-125'
              : 'scale-100'
          }`}
        >
          {/* Outer Translucent Water Meniscus Halo */}
          <div
            className={`rounded-full border transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center ${
              cursorHovered
                ? 'w-5 h-5 border-[#34d399] bg-[#34d399]/20 shadow-[0_0_12px_rgba(52,211,153,0.7)]'
                : 'w-4 h-4 border-[#10b981]/80 bg-[#10b981]/10 shadow-[0_0_8px_rgba(16,185,129,0.4)]'
            }`}
          >
            {/* Inner Emerald Jewel Water Bead */}
            <div className="w-2 h-2 rounded-full bg-gradient-to-tr from-[#059669] via-[#10b981] to-[#6ee7b7] shadow-[0_0_6px_#10b981] relative">
              {/* Brilliant Specular Light Reflection */}
              <span className="absolute top-0.5 left-0.5 w-0.5 h-0.5 rounded-full bg-white shadow-[0_0_2px_white] pointer-events-none" />
            </div>
          </div>

          {/* Micro-droplet pulse wave when hovering interactive links */}
          {cursorHovered && (
            <span className="absolute inset-0 rounded-full border border-[#34d399] animate-ping opacity-50 pointer-events-none" />
          )}
        </div>
      </div>

      {/* 5. Snappy Water Ripples on Click & Fast Movement (380ms duration) */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="pointer-events-none fixed z-20 rounded-full -translate-x-1/2 -translate-y-1/2 animate-water-ripple"
          style={{
            top: ripple.y,
            left: ripple.x,
            width: ripple.maxRadius * 2,
            height: ripple.maxRadius * 2,
            border: `2px solid ${ripple.color}`,
            boxShadow: `0 0 12px ${ripple.color}`,
          }}
          aria-hidden="true"
        />
      ))}

      {/* 6. Green Water Theme Control Badge */}
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={() => setEnabled(false)}
          className="group px-3 py-1.5 rounded-full bg-white/95 hover:bg-[#F5FFF9] backdrop-blur-md border border-emerald-300 text-[11px] font-semibold text-emerald-800 shadow-md flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
          title="Toggle green water cursor effects"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]" />
          </span>
          <span className="flex items-center gap-1">
            <span className="text-xs">💧</span>
            <span>Water FX: On</span>
          </span>
        </button>
      </div>
    </>
  );
};
