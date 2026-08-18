'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShootingStar {
  id: number;
  x: number;
  y: number;
}

interface AsteroidItem {
  id: number;
  type: 1 | 2 | 3 | 4;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  size: number;
  rotation: number;
  duration: number;
  delay: number;
}

export const SpaceEnvironment: React.FC = () => {
  const [shootingStar, setShootingStar] = useState<ShootingStar | null>(null);
  const [asteroids, setAsteroids] = useState<AsteroidItem[]>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 4 Persistent Floating Asteroid Rocks matching the 4 reference photo variations
    const w = window.innerWidth;
    const h = window.innerHeight;

    const initialAsteroids: AsteroidItem[] = [
      {
        id: 1,
        type: 1, // Heavy Top Crater Asteroid
        startX: -70,
        startY: h * 0.22,
        endX: w + 70,
        endY: h * 0.38,
        size: 36,
        rotation: 720,
        duration: 20,
        delay: 0,
      },
      {
        id: 2,
        type: 2, // Multi-Pitted Spherical Asteroid
        startX: w + 70,
        startY: h * 0.65,
        endX: -70,
        endY: h * 0.48,
        size: 32,
        rotation: -540,
        duration: 24,
        delay: 1.5,
      },
      {
        id: 3,
        type: 3, // Deep Central Crater Asteroid
        startX: w * 0.12,
        startY: -70,
        endX: w * 0.88,
        endY: h + 70,
        size: 38,
        rotation: 360,
        duration: 26,
        delay: 4,
      },
      {
        id: 4,
        type: 4, // Porous Cavity Asteroid
        startX: w + 70,
        startY: h * 0.18,
        endX: -70,
        endY: h * 0.78,
        size: 34,
        rotation: -720,
        duration: 22,
        delay: 7,
      },
    ];

    setAsteroids(initialAsteroids);

    // Shooting Star Spawner (triggers every 6 - 12 seconds)
    let starTimeout: NodeJS.Timeout;
    const triggerShootingStar = () => {
      const currentW = window.innerWidth;
      const currentH = window.innerHeight;

      setShootingStar({
        id: Date.now(),
        x: Math.random() * (currentW * 0.6) + currentW * 0.1,
        y: Math.random() * (currentH * 0.35) + currentH * 0.05,
      });

      const nextDelay = (6 + Math.random() * 6) * 1000;
      starTimeout = setTimeout(triggerShootingStar, nextDelay);
    };

    const firstStarTimer = setTimeout(triggerShootingStar, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(firstStarTimer);
      clearTimeout(starTimeout);
    };
  }, []);

  // Render Asteroid SVG matching the 4 variations from reference photo 2
  const renderAsteroidSvg = (type: 1 | 2 | 3 | 4) => {
    switch (type) {
      case 1:
        // Top-left: Heavy top crater bowl & porous lower surface
        return (
          <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-2xl" fill="none">
            <path
              d="M20 3 C29 3, 37 9, 37 20 C37 31, 29 37, 20 37 C10 37, 3 30, 3 20 C3 9, 10 3, 20 3 Z"
              fill="url(#ast-grad1)"
              stroke="#64748b"
              strokeWidth="1.2"
            />
            {/* Big Top Crater Bowl */}
            <ellipse cx="20" cy="12" rx="7" ry="5" fill="#1e293b" stroke="#94a3b8" strokeWidth="1" />
            <ellipse cx="20" cy="11.5" rx="5" ry="3.5" fill="#0f172a" />
            {/* Porous Small Craters */}
            <circle cx="10" cy="24" r="2.5" fill="#1e293b" stroke="#475569" strokeWidth="0.8" />
            <circle cx="28" cy="22" r="3" fill="#1e293b" stroke="#475569" strokeWidth="0.8" />
            <circle cx="20" cy="29" r="2" fill="#1e293b" stroke="#475569" strokeWidth="0.8" />
          </svg>
        );
      case 2:
        // Top-right: Multi-pitted spherical asteroid with deep circular cavities
        return (
          <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-2xl" fill="none">
            <path
              d="M18 2 C28 1, 38 8, 38 19 C38 30, 28 38, 18 38 C7 38, 2 29, 2 19 C2 8, 8 2, 18 2 Z"
              fill="url(#ast-grad1)"
              stroke="#64748b"
              strokeWidth="1.2"
            />
            {/* Multiple Deep Impact Pits */}
            <circle cx="14" cy="14" r="4.5" fill="#0f172a" stroke="#94a3b8" strokeWidth="1" />
            <circle cx="26" cy="16" r="3.5" fill="#0f172a" stroke="#94a3b8" strokeWidth="1" />
            <circle cx="16" cy="27" r="4" fill="#0f172a" stroke="#64748b" strokeWidth="0.8" />
            <circle cx="27" cy="28" r="2" fill="#0f172a" stroke="#475569" strokeWidth="0.8" />
          </svg>
        );
      case 3:
        // Bottom-left: Irregular jagged rock with deep central crater pit
        return (
          <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-2xl" fill="none">
            <path
              d="M16 3 L32 7 L38 20 L30 35 L14 37 L3 24 L5 10 Z"
              fill="url(#ast-grad1)"
              stroke="#64748b"
              strokeWidth="1.2"
            />
            {/* Deep Central Crater Pit */}
            <circle cx="22" cy="22" r="6" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.2" />
            <circle cx="21" cy="21" r="4" fill="#020617" />
            {/* Secondary Craters */}
            <circle cx="10" cy="14" r="2.5" fill="#1e293b" stroke="#475569" strokeWidth="0.8" />
            <circle cx="12" cy="28" r="2" fill="#1e293b" stroke="#475569" strokeWidth="0.8" />
          </svg>
        );
      case 4:
      default:
        // Bottom-right: Porous cavity rock with large impact basin
        return (
          <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-2xl" fill="none">
            <path
              d="M20 2 C32 4, 39 12, 37 24 C35 34, 25 38, 15 36 C5 34, 2 24, 4 14 C6 4, 12 1, 20 2 Z"
              fill="url(#ast-grad1)"
              stroke="#64748b"
              strokeWidth="1.2"
            />
            {/* Large Bottom Impact Basin */}
            <circle cx="24" cy="25" r="5.5" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1" />
            {/* Top Pores */}
            <circle cx="14" cy="12" r="3" fill="#1e293b" stroke="#94a3b8" strokeWidth="0.8" />
            <circle cx="28" cy="11" r="2" fill="#1e293b" stroke="#475569" strokeWidth="0.8" />
            <circle cx="10" cy="24" r="2" fill="#1e293b" stroke="#475569" strokeWidth="0.8" />
          </svg>
        );
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden select-none">
      {/* SVG Shading Gradients */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <linearGradient id="ast-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="40%" stopColor="#334155" />
            <stop offset="85%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>
      </svg>

      {/* Distant Ambient Nebula Glow Overlays */}
      <div className="absolute top-0 right-1/4 w-[550px] h-[550px] rounded-full bg-indigo-900/25 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[600px] h-[600px] rounded-full bg-cyan-950/25 blur-[150px] pointer-events-none" />

      {/* PHOTOREALISTIC FULL MOON (Replica of Reference Photo 1) */}
      <div
        className="absolute top-16 right-[4%] sm:right-[7%] w-32 h-32 sm:w-44 sm:h-44 rounded-full pointer-events-none transition-transform duration-300 shadow-[0_0_50px_rgba(226,232,240,0.22)]"
        style={{
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full rounded-full">
          <defs>
            {/* Lunar Spherical 3D Gradient */}
            <radialGradient id="moon-base" cx="38%" cy="38%" r="62%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="35%" stopColor="#e2e8f0" />
              <stop offset="65%" stopColor="#94a3b8" />
              <stop offset="88%" stopColor="#475569" />
              <stop offset="100%" stopColor="#1e293b" />
            </radialGradient>
          </defs>

          {/* Spherical Moon Base */}
          <circle cx="50" cy="50" r="49" fill="url(#moon-base)" />

          {/* Dark Lunar Maria Basalt Plains (Matching Reference Photo 1) */}
          <g opacity="0.45" fill="#334155">
            {/* Mare Tranquillitatis & Mare Serenitatis */}
            <path d="M45 18 C58 16, 75 22, 70 38 C65 50, 48 45, 42 36 C38 28, 38 20, 45 18 Z" />
            {/* Oceanus Procellarum */}
            <path d="M18 28 C30 25, 38 38, 32 55 C25 68, 12 55, 14 40 Z" />
            {/* Mare Imbrium */}
            <circle cx="36" cy="24" r="11" />
            {/* Mare Nubium & Mare Nectaris */}
            <circle cx="58" cy="62" r="10" />
            <circle cx="40" cy="68" r="8" />
          </g>

          {/* Major Tycho & Copernicus Impact Ray Basins */}
          <g opacity="0.5">
            {/* Tycho Crater at southern pole */}
            <circle cx="52" cy="78" r="2.5" fill="#ffffff" />
            <path d="M52 78 L35 50 M52 78 L68 55 M52 78 L52 95 M52 78 L25 80" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="1,1" />
            {/* Copernicus Crater */}
            <circle cx="34" cy="42" r="2" fill="#ffffff" />
            <path d="M34 42 L20 30 M34 42 L50 35 M34 42 L28 58" stroke="#ffffff" strokeWidth="0.4" strokeDasharray="1,1" />
          </g>

          {/* Spherical Shadow Occlusion Overlay */}
          <circle cx="50" cy="50" r="49" fill="none" stroke="#090d16" strokeWidth="3" opacity="0.6" />
        </svg>
      </div>

      {/* Occasional Shooting Star Streak */}
      <AnimatePresence>
        {shootingStar && (
          <motion.div
            key={shootingStar.id}
            initial={{
              x: shootingStar.x,
              y: shootingStar.y,
              opacity: 0,
              scaleX: 0.2,
            }}
            animate={{
              x: shootingStar.x + 240,
              y: shootingStar.y + 150,
              opacity: [0, 1, 1, 0],
              scaleX: [0.2, 1, 0.8, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.0,
              ease: 'easeOut',
            }}
            onAnimationComplete={() => setShootingStar(null)}
            className="absolute top-0 left-0 w-40 h-[2px] bg-gradient-to-r from-cyan-300 via-indigo-400 to-transparent rounded-full transform rotate-[32deg] origin-left shadow-[0_0_12px_#38bdf8]"
          />
        )}
      </AnimatePresence>

      {/* PHOTOREALISTIC MOVING CRATERED ASTEROIDS (Matching Reference Photo 2) */}
      {asteroids.map((ast) => (
        <motion.div
          key={ast.id}
          initial={{
            x: ast.startX,
            y: ast.startY,
            rotate: 0,
            opacity: 0.9,
          }}
          animate={{
            x: ast.endX,
            y: ast.endY,
            rotate: ast.rotation,
            opacity: 0.9,
          }}
          transition={{
            duration: ast.duration,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: ast.delay,
          }}
          className="absolute top-0 left-0 flex items-center justify-center pointer-events-none drop-shadow-2xl"
          style={{ width: ast.size, height: ast.size }}
        >
          {renderAsteroidSvg(ast.type)}
        </motion.div>
      ))}
    </div>
  );
};
