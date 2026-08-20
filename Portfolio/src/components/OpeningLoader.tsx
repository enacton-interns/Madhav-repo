'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AstronautLottie } from './AstronautLottie';

interface OpeningLoaderProps {
  onComplete: () => void;
  onShutterOpen: () => void;
}

export const OpeningLoader: React.FC<OpeningLoaderProps> = ({
  onComplete,
  onShutterOpen,
}) => {
  const [isShutterOpen, setIsShutterOpen] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const hasLaunchedRef = useRef(false);

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
          // Smooth zero-g trajectory towards deep space
          state.x += state.vx;
          state.y += state.vy;
          state.vx *= 0.994;
          state.vy -= 0.15; // Fluid upward trajectory towards deep space
          state.rotation += state.spinSpeed;
          state.scale = Math.max(0.12, state.scale * 0.985); // Shrinks into deep space
        } else {
          // Fluid zero-g lerp follow mouse cursor
          state.x += (state.targetX - state.x) * 0.07;
          state.y += (state.targetY - state.y) * 0.07;
        }

        if (el) {
          el.style.transform = `translate3d(${state.x - 40}px, ${state.y - 40}px, 0px) rotate(${state.rotation}deg) scale(${state.scale})`;
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

  // Handle Control Console Launch Click (Single, Smooth, Non-Repeating Trigger)
  const handleLaunch = () => {
    if (hasLaunchedRef.current) return;
    hasLaunchedRef.current = true;

    setIsUnlocking(true);

    // Apply single fluid impulse to astronaut recoil toward deep space
    const state = astroStateRef.current;
    state.isRecoiling = true;
    state.vx = 8.5;
    state.vy = -16.5;
    state.spinSpeed = 5.5;

    // Trigger website reveal & single shutter slide-up
    setIsShutterOpen(true);
    onShutterOpen();

    // Complete loader unmount cleanly after single slide-up finishes (1.8s)
    setTimeout(() => {
      onComplete();
    }, 1800);
  };

  if (reducedMotion) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none font-sans cursor-default">
      {/* Industrial Metallic Roller Shutter Door (Single Smooth Slide Up) */}
      <motion.div
        initial={{ y: '0%' }}
        animate={{ y: isShutterOpen ? '-100%' : '0%' }}
        transition={{
          duration: 1.6,
          ease: [0.22, 1, 0.36, 1], // Smooth cubic bezier easeOutExpo slide UP
        }}
        className="absolute inset-0 bg-slate-950 flex flex-col justify-between border-b-8 border-slate-700 shadow-[0_30px_100px_rgba(0,0,0,0.95)] z-40 pointer-events-auto"
      >
        {/* TOP SPOOL HOUSING & HUD BAR */}
        <div className="relative z-30 w-full bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 border-b-4 border-slate-700 shadow-2xl flex flex-col items-center pt-4 pb-3 px-6">
          <div className="w-full max-w-5xl h-10 sm:h-14 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 border-2 border-slate-600 shadow-inner flex items-center justify-between px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <div className="px-4 py-1 rounded bg-slate-950/90 border border-slate-700 text-[10px] sm:text-xs font-mono font-bold text-amber-300 tracking-widest uppercase">
              INDUSTRIAL AIRLOCK // ROLLER SHUTTER v5.0
            </div>
            <div className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
          </div>
        </div>

        {/* CENTER SLATTED STEEL ROLLER BLIND PANEL */}
        <div className="relative flex-1 w-full bg-slate-950 overflow-hidden flex flex-col justify-center items-center">
          <div
            className="absolute inset-0 opacity-90"
            style={{
              backgroundImage: `linear-gradient(to bottom, #334155 1px, #0f172a 1px, #1e293b 4px, #020617 6px)`,
              backgroundSize: '100% 12px',
            }}
          />

          {/* LEFT & RIGHT VERTICAL COLUMNS WITH AMBER LED LIGHT STRIPS */}
          <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-20 bg-slate-900 border-r-4 border-slate-700 flex flex-col justify-between py-6 px-2 z-20 shadow-2xl">
            <div className="w-2.5 h-full mx-auto bg-amber-500 rounded-full shadow-[0_0_15px_#f59e0b] animate-pulse" />
          </div>

          <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-20 bg-slate-900 border-l-4 border-slate-700 flex flex-col justify-between py-6 px-2 z-20 shadow-2xl">
            <div className="w-2.5 h-full mx-auto bg-amber-500 rounded-full shadow-[0_0_15px_#f59e0b] animate-pulse" />
          </div>

          {/* CENTER LAUNCH CONTROL TERMINAL */}
          <div className="relative z-30 flex flex-col items-center">
            {isUnlocking && (
              <motion.div
                initial={{ scale: 0.3, opacity: 1 }}
                animate={{ scale: 6, opacity: 0 }}
                transition={{ duration: 1.0, ease: 'easeOut' }}
                className="absolute -top-6 w-24 h-24 rounded-full border-4 border-amber-400 bg-amber-400/40 blur-md pointer-events-none"
              />
            )}

            <div className="relative flex flex-col items-center p-5 rounded-3xl bg-slate-900/95 border-2 border-slate-700 shadow-2xl backdrop-blur-md space-y-3">
              <div className="text-[11px] font-mono font-bold tracking-widest text-slate-300 uppercase">
                {isUnlocking ? 'UNROLLING SHUTTER...' : 'PRIMARY LAUNCH CONSOLE'}
              </div>

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
                      ? '0 0 50px rgba(250, 204, 21, 1)'
                      : '0 0 20px rgba(245, 158, 11, 0.5)',
                  }}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center border-2 transition-all ${
                    isUnlocking
                      ? 'bg-amber-300 border-white text-slate-950'
                      : 'bg-slate-950 border-amber-500/80 text-amber-400 group-hover:border-amber-300 group-hover:bg-slate-900'
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

        {/* BOTTOM FLOOR THRESHOLD PLATE */}
        <div className="relative z-30 w-full bg-slate-900 border-t-4 border-slate-700 py-3 sm:py-4 px-6 flex flex-col items-center justify-center shadow-2xl">
          <div className="w-full max-w-xl h-3.5 rounded bg-[linear-gradient(135deg,#f59e0b_25%,#0f172a_25%,#0f172a_50%,#f59e0b_50%,#f59e0b_75%,#0f172a_75%)] bg-[length:20px_20px] border border-slate-700 shadow-inner" />
          {!isUnlocking && (
            <div className="mt-2 text-[10px] font-mono text-amber-300 font-bold tracking-wider animate-pulse">
              CLICK BUTTON TO ROLL SHUTTER UP & LAUNCH WEBSITE
            </div>
          )}
        </div>
      </motion.div>

      {/* 60 FPS Physics Lottie Astronaut Element */}
      <div
        ref={astroElementRef}
        className="absolute top-0 left-0 z-50 w-20 h-20 flex items-center justify-center pointer-events-none will-change-transform"
      >
        <AstronautLottie className="w-20 h-20" />
      </div>
    </div>
  );
};
