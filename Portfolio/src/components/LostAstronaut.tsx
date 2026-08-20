'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AstronautLottie } from './AstronautLottie';

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
        duration: 18 + Math.random() * 12, // 18s - 30s slow zero-g drift
      };

      setActiveTrajectory(trajectory);

      // Schedule next random flight in 15 to 30 seconds
      const nextDelay = (15 + Math.random() * 15) * 1000;
      timeoutId = setTimeout(triggerRandomFlight, nextDelay);
    };

    // First flight triggers after 3 seconds of browsing
    const initialTimer = setTimeout(triggerRandomFlight, 3000);

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
              opacity: 0.95,
            }}
            animate={{
              x: activeTrajectory.endX,
              y: activeTrajectory.endY,
              rotate: activeTrajectory.rotation,
              opacity: 0.95,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: activeTrajectory.duration,
              ease: 'linear',
            }}
            onAnimationComplete={() => setActiveTrajectory(null)}
            className="absolute top-0 left-0 w-14 h-14 flex items-center justify-center pointer-events-none drop-shadow-2xl"
          >
            <AstronautLottie className="w-14 h-14" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
