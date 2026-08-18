'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Trajectory {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  rotation: number;
  duration: number;
}

export const LostAstronaut: React.FC = () => {
  const [activeTrajectory, setActiveTrajectory] = useState<Trajectory | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId: NodeJS.Timeout;

    const triggerRandomFlight = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Random entry sides: 0: Left, 1: Top, 2: Right, 3: Bottom
      const entrySide = Math.floor(Math.random() * 4);
      let startX = -80;
      let startY = -80;
      let endX = w + 80;
      let endY = h + 80;

      if (entrySide === 0) {
        // Left -> Right
        startX = -80;
        startY = Math.random() * h;
        endX = w + 80;
        endY = Math.random() * h;
      } else if (entrySide === 1) {
        // Top -> Bottom
        startX = Math.random() * w;
        startY = -80;
        endX = Math.random() * w;
        endY = h + 80;
      } else if (entrySide === 2) {
        // Right -> Left
        startX = w + 80;
        startY = Math.random() * h;
        endX = -80;
        endY = Math.random() * h;
      } else {
        // Bottom -> Top
        startX = Math.random() * w;
        startY = h + 80;
        endX = Math.random() * w;
        endY = -80;
      }

      const trajectory: Trajectory = {
        id: Date.now(),
        startX,
        startY,
        endX,
        endY,
        rotation: (Math.random() > 0.5 ? 1 : -1) * (360 + Math.random() * 720),
        duration: 16 + Math.random() * 10, // 16s - 26s slow zero-g drift
      };

      setActiveTrajectory(trajectory);

      // Schedule next random flight in 18 to 35 seconds
      const nextDelay = (18 + Math.random() * 17) * 1000;
      timeoutId = setTimeout(triggerRandomFlight, nextDelay);
    };

    // First flight triggers after 8 seconds of browsing
    const initialTimer = setTimeout(triggerRandomFlight, 8000);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {activeTrajectory && (
          <motion.div
            key={activeTrajectory.id}
            initial={{
              x: activeTrajectory.startX,
              y: activeTrajectory.startY,
              rotate: 0,
              opacity: 1,
            }}
            animate={{
              x: activeTrajectory.endX,
              y: activeTrajectory.endY,
              rotate: activeTrajectory.rotation,
              opacity: 1,
            }}
            exit={{ opacity: 1 }}
            transition={{
              duration: activeTrajectory.duration,
              ease: 'linear',
            }}
            onAnimationComplete={() => setActiveTrajectory(null)}
            className="absolute top-0 left-0 w-8 h-8 flex items-center justify-center pointer-events-none drop-shadow-lg"
          >
            <svg
              className="w-10 h-10 text-slate-100 drop-shadow-2xl"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Thruster Particle Flame Stream */}
              <g>
                <path d="M6 32 L-4 35 L6 38 Z" fill="#38bdf8" />
                <circle cx="-6" cy="35" r="2.5" fill="#67e8f9" />
              </g>

              {/* Backpack Tank */}
              <rect x="12" y="22" width="7" height="22" rx="3.5" fill="#334155" />
              <rect x="14" y="26" width="3" height="6" rx="1.5" fill="#64748b" />

              {/* Suit Torso */}
              <rect x="18" y="24" width="26" height="22" rx="8" fill="#f8fafc" />
              <rect x="25" y="30" width="12" height="10" rx="3" fill="#0f172a" />
              <circle cx="29" cy="35" r="2" fill="#38bdf8" />
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
                fill="#38bdf8"
                opacity={0.95}
              />

              {/* Arms & Legs */}
              <path d="M38 32 L46 36" stroke="#f8fafc" strokeWidth="4.5" strokeLinecap="round" />
              <g>
                <rect x="22" y="44" width="7" height="14" rx="3.5" fill="#cbd5e1" />
                <rect x="33" y="44" width="7" height="14" rx="3.5" fill="#94a3b8" />
              </g>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
