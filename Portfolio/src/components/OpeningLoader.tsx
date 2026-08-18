'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface OpeningLoaderProps {
  onComplete: () => void;
  onShutterOpen: () => void;
}

export const OpeningLoader: React.FC<OpeningLoaderProps> = ({
  onComplete,
  onShutterOpen,
}) => {
  const [phase, setPhase] = useState<'interactive' | 'unlocking' | 'recoiling' | 'done'>(
    'interactive'
  );
  const [reducedMotion, setReducedMotion] = useState(false);

  // Ultra-Smooth 60 FPS RAF Physics State for Astronaut
  const astroStateRef = useRef({
    x: 400,
    y: 300,
    vx: 0,
    vy: 0,
    rotation: 0,
    spinSpeed: 0,
    targetX: 400,
    targetY: 300,
    isRecoiling: false,
    opacity: 1,
    scale: 1,
  });

  const astroElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const w = window.innerWidth;
      const h = window.innerHeight;
      astroStateRef.current.x = w / 2;
      astroStateRef.current.y = h / 2 - 40;
      astroStateRef.current.targetX = w / 2;
      astroStateRef.current.targetY = h / 2 - 40;

      // Accessibility check
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setReducedMotion(true);
        onShutterOpen();
        onComplete();
        return;
      }

      // Mouse Move Tracking
      const handleMouseMove = (e: MouseEvent) => {
        if (!astroStateRef.current.isRecoiling) {
          astroStateRef.current.targetX = e.clientX;
          astroStateRef.current.targetY = e.clientY;
        }
      };

      window.addEventListener('mousemove', handleMouseMove);

      // 60 FPS Silky-Smooth RAF Physics Engine
      let animationFrameId: number;

      const loop = () => {
        const state = astroStateRef.current;
        const el = astroElementRef.current;

        if (state.isRecoiling) {
          // Exponential damping + ultra-smooth parabolic zero-g arc (100% solid opacity, 0 fading)
          state.x += state.vx;
          state.y += state.vy;
          state.vx *= 0.994; // Soft airless zero-g resistance
          state.vy += 0.18; // Ultra-smooth parabolic arc
          state.rotation += state.spinSpeed;
          state.scale = Math.max(0.25, state.scale * 0.992);
          state.opacity = 1; // Always 100% solid throughout flight
        } else {
          // Fluid zero-g lerp follow mouse cursor
          state.x += (state.targetX - state.x) * 0.07;
          state.y += (state.targetY - state.y) * 0.07;
        }

        if (el) {
          el.style.transform = `translate3d(${state.x - 24}px, ${state.y - 24}px, 0px) rotate(${state.rotation}deg) scale(${state.scale})`;
          el.style.opacity = `${state.opacity}`;
        }

        animationFrameId = requestAnimationFrame(loop);
      };

      loop();

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [onShutterOpen, onComplete]);

  // Handle Control Console Launch Click
  const handleLaunch = () => {
    if (phase !== 'interactive') return;

    setPhase('unlocking');

    // Trigger silky-smooth initial impulse for astronaut recoil in RAF physics engine
    const state = astroStateRef.current;
    state.isRecoiling = true;
    state.vx = 9.5;
    state.vy = -13.5;
    state.spinSpeed = 5.5; // Steady, fluid 5.5deg/frame rotational tumble

    setTimeout(() => {
      setPhase('recoiling');
      onShutterOpen(); // Triggers website launch & hero reveal
    }, 450);

    setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 2700);
  };

  if (reducedMotion || phase === 'done') return null;

  const isShutterOpen = phase === 'recoiling';
  const isUnlocking = phase === 'unlocking';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none font-sans cursor-default">
      {/* Industrial Metallic Roller Shutter Door (Replica of Reference Image) */}
      <motion.div
        initial={{ y: '0%' }}
        animate={{ y: isShutterOpen ? '-100%' : '0%' }}
        transition={{
          duration: 2.2,
          ease: [0.77, 0, 0.175, 1], // Smooth industrial roller shutter slide UP
        }}
        className="absolute inset-0 bg-slate-950 flex flex-col justify-between border-b-8 border-slate-700 shadow-[0_30px_100px_rgba(0,0,0,0.95)] z-40 pointer-events-auto"
      >
        {/* TOP CYLINDRICAL ROLLER DRUM SPOOL & HUD BAR */}
        <div className="relative z-30 w-full bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border-b-4 border-slate-700 shadow-2xl flex flex-col items-center pt-4 pb-3 px-6">
          {/* Cylindrical Spool Housing */}
          <div className="w-full max-w-5xl h-10 sm:h-14 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 border-2 border-slate-600 shadow-inner flex items-center justify-between px-6 relative overflow-hidden">
            {/* Horizontal Spool Ridge Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            {/* Top Telemetry Display */}
            <div className="px-4 py-1 rounded bg-slate-950/90 border border-slate-700 text-[10px] sm:text-xs font-mono font-bold text-cyan-300 tracking-widest uppercase">
              INDUSTRIAL AIRLOCK // ROLLER SHUTTER v5.0
            </div>
            <div className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
          </div>
        </div>

        {/* CENTER SLATTED STEEL ROLLER BLIND PANEL */}
        <div className="relative flex-1 w-full bg-slate-950 overflow-hidden flex flex-col justify-center items-center">
          {/* Slatted Horizontal Steel Roller Blind Texture */}
          <div
            className="absolute inset-0 opacity-90"
            style={{
              backgroundImage: `linear-gradient(to bottom, #334155 1px, #0f172a 1px, #1e293b 4px, #020617 6px)`,
              backgroundSize: '100% 12px',
            }}
          />

          {/* LEFT & RIGHT VERTICAL COLUMNS WITH AMBER LED LIGHT STRIPS */}
          <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-20 bg-slate-900 border-r-4 border-slate-700 flex flex-col justify-between py-6 px-2 z-20 shadow-2xl">
            {/* Vertical Glowing Amber LED Strip */}
            <div className="w-2.5 h-full mx-auto bg-amber-500 rounded-full shadow-[0_0_15px_#f59e0b] animate-pulse" />
          </div>

          <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-20 bg-slate-900 border-l-4 border-slate-700 flex flex-col justify-between py-6 px-2 z-20 shadow-2xl">
            {/* Vertical Glowing Amber LED Strip */}
            <div className="w-2.5 h-full mx-auto bg-amber-500 rounded-full shadow-[0_0_15px_#f59e0b] animate-pulse" />
          </div>

          {/* SIDE DIGITAL CONTROL BOX (Left Pillar) */}
          <div className="absolute left-14 sm:left-24 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-center p-3 rounded-2xl bg-slate-900 border-2 border-slate-700 shadow-2xl space-y-2">
            <div className="w-16 h-8 rounded bg-slate-950 border border-slate-800 flex items-center justify-center font-mono text-[9px] text-cyan-400 font-bold">
              {isUnlocking ? 'OPEN' : 'LOCKED'}
            </div>
            <div className="text-amber-500 font-bold text-xs">▲</div>
          </div>

          {/* CENTER LAUNCH CONTROL TERMINAL */}
          <div className="relative z-30 flex flex-col items-center">
            {/* Shockwave Blast Ring */}
            {isUnlocking && (
              <motion.div
                initial={{ scale: 0.3, opacity: 1 }}
                animate={{ scale: 6, opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute -top-6 w-24 h-24 rounded-full border-4 border-cyan-400 bg-cyan-400/40 blur-md pointer-events-none"
              />
            )}

            {/* Tactile Control Console Box */}
            <div className="relative flex flex-col items-center p-5 rounded-3xl bg-slate-900/95 border-2 border-slate-700 shadow-2xl backdrop-blur-md space-y-3">
              <div className="text-[11px] font-mono font-bold tracking-widest text-slate-300 uppercase">
                {isUnlocking ? 'UNROLLING SHUTTER...' : 'PRIMARY LAUNCH CONSOLE'}
              </div>

              {/* Glowing Tactile Launch Button */}
              <button
                onClick={handleLaunch}
                aria-label="Roll Shutter Up"
                className="group relative focus:outline-none cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    boxShadow: isUnlocking
                      ? '0 0 50px rgba(56, 189, 248, 1)'
                      : '0 0 20px rgba(245, 158, 11, 0.5)',
                  }}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center border-2 transition-all ${
                    isUnlocking
                      ? 'bg-cyan-400 border-white text-slate-950'
                      : 'bg-slate-950 border-amber-500/80 text-amber-400 group-hover:border-cyan-400 group-hover:bg-slate-900'
                  }`}
                >
                  <div
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full transition-transform group-hover:scale-110 ${
                      isUnlocking ? 'bg-slate-950 animate-ping' : 'bg-amber-400'
                    }`}
                  />
                </motion.div>
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM FLOOR THRESHOLD PLATE WITH HAZARD STRIPES */}
        <div className="relative z-30 w-full bg-slate-900 border-t-4 border-slate-700 py-3 sm:py-4 px-6 flex flex-col items-center justify-center shadow-2xl">
          <div className="w-full max-w-xl h-3.5 rounded bg-[linear-gradient(135deg,#f59e0b_25%,#0f172a_25%,#0f172a_50%,#f59e0b_50%,#f59e0b_75%,#0f172a_75%)] bg-[length:20px_20px] border border-slate-700 shadow-inner" />
          {!isUnlocking && !isShutterOpen && (
            <div className="mt-2 text-[10px] font-mono text-cyan-300 font-bold tracking-wider animate-pulse">
              CLICK BUTTON TO ROLL SHUTTER UP & LAUNCH WEBSITE
            </div>
          )}
        </div>
      </motion.div>

      {/* 60 FPS Physics Astronaut Element (Zero-Lag RAF Physics Translation & Rotation) */}
      <div
        ref={astroElementRef}
        className="absolute top-0 left-0 z-50 w-12 h-12 flex items-center justify-center pointer-events-none will-change-transform"
      >
        <svg
          className="w-12 h-12 text-slate-100 drop-shadow-2xl"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Thruster Particle Flame Stream */}
          <motion.g
            animate={{ opacity: [0.6, 1, 0.6], scale: [0.9, 1.1, 0.9] }}
            transition={{ repeat: Infinity, duration: 0.12 }}
          >
            <path d="M6 32 L-4 35 L6 38 Z" fill="#38bdf8" />
            <circle cx="-6" cy="35" r="2.5" fill="#67e8f9" />
          </motion.g>

          {/* Backpack Tank */}
          <rect x="12" y="22" width="7" height="22" rx="3.5" fill="#334155" />
          <rect x="14" y="26" width="3" height="6" rx="1.5" fill="#64748b" />

          {/* Suit Torso */}
          <rect x="18" y="24" width="26" height="22" rx="8" fill="#f8fafc" />
          <rect x="25" y="30" width="12" height="10" rx="3" fill="#0f172a" />
          <circle
            cx="29"
            cy="35"
            r="2"
            fill={phase === 'unlocking' ? '#38bdf8' : '#818cf8'}
          />
          <circle cx="35" cy="35" r="1.5" fill="#34d399" />

          {/* Helmet & Visor */}
          <rect
            x="20"
            y="8"
            width="22"
            height="20"
            rx="10"
            fill="#1e293b"
            stroke="#475569"
            strokeWidth="1.5"
          />
          <path
            d="M24 13 Q31 9 38 13 C37 21 26 21 24 13 Z"
            fill={phase === 'unlocking' ? '#38bdf8' : '#818cf8'}
            opacity={0.9}
          />

          {/* Arms & Legs */}
          <path d="M38 32 L46 36" stroke="#f8fafc" strokeWidth="4.5" strokeLinecap="round" />
          <g>
            <rect x="22" y="44" width="7" height="14" rx="3.5" fill="#cbd5e1" />
            <rect x="33" y="44" width="7" height="14" rx="3.5" fill="#94a3b8" />
          </g>
        </svg>
      </div>
    </div>
  );
};
