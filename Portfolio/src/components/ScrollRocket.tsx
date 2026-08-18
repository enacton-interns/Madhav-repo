'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/* ─────────────────────────────────────────────
   Section waypoints the rocket "visits" as it
   descends through the portfolio journey.
   ───────────────────────────────────────────── */
const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];

/* ─────────────────────────────────────────────
   Exhaust particle type
   ───────────────────────────────────────────── */
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  life: number;
  vx: number;
  vy: number;
}

export const ScrollRocket: React.FC = () => {
  const rocketRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const nextIdRef = useRef(0);
  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);

  /* --- Scroll progress (0 → 1) --- */
  const scrollProgress = useMotionValue(0);
  const smoothProgress = useSpring(scrollProgress, {
    stiffness: 60,
    damping: 20,
    mass: 0.8,
  });

  /* --- Rocket tilt based on scroll velocity --- */
  const tiltAngle = useMotionValue(0);
  const smoothTilt = useSpring(tiltAngle, {
    stiffness: 100,
    damping: 18,
    mass: 0.5,
  });

  /* --- Viewport dimensions --- */
  const [windowH, setWindowH] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  /* --- Current section label for the waypoint dot --- */
  const [activeSection, setActiveSection] = useState('');

  /* ─────────────────────────────────────────────
     Resize listener
     ───────────────────────────────────────────── */
  useEffect(() => {
    const onResize = () => {
      setWindowH(window.innerHeight);
      setIsMobile(window.innerWidth < 768);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* ─────────────────────────────────────────────
     Scroll handler — updates progress + velocity
     ───────────────────────────────────────────── */
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? Math.min(y / maxScroll, 1) : 0;
        scrollProgress.set(progress);

        /* velocity for tilt (-1 to 1 range capped) */
        const delta = y - lastScrollY.current;
        scrollVelocity.current = delta;
        const clampedTilt = Math.max(-18, Math.min(18, delta * 0.6));
        tiltAngle.set(clampedTilt);

        lastScrollY.current = y;
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollProgress, tiltAngle]);

  /* ─────────────────────────────────────────────
     Active section detection via IntersectionObserver
     ───────────────────────────────────────────── */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* ─────────────────────────────────────────────
     Canvas exhaust particle system (lightweight)
     ───────────────────────────────────────────── */
  const spawnParticle = useCallback((rocketX: number, rocketY: number) => {
    const p: Particle = {
      id: nextIdRef.current++,
      x: rocketX + (Math.random() - 0.5) * 4,
      y: rocketY + 12,
      size: 1.5 + Math.random() * 2,
      opacity: 0.5 + Math.random() * 0.3,
      life: 1,
      vx: (Math.random() - 0.5) * 0.6,
      vy: 0.3 + Math.random() * 0.5,
    };
    particlesRef.current.push(p);
    /* cap particles */
    if (particlesRef.current.length > 30) {
      particlesRef.current.shift();
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isMobile) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameCount = 0;

    const tick = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* spawn particles from rocket position */
      const rocket = rocketRef.current;
      if (rocket && Math.abs(scrollVelocity.current) > 0.5) {
        const rocketRect = rocket.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();
        const rx = rocketRect.left - canvasRect.left + rocketRect.width / 2;
        const ry = rocketRect.top - canvasRect.top + rocketRect.height;

        /* spawn every other frame to keep it subtle */
        if (frameCount % 2 === 0) {
          spawnParticle(rx, ry);
        }
      }

      /* update & draw particles */
      particlesRef.current = particlesRef.current.filter((p) => {
        p.life -= 0.025;
        p.x += p.vx;
        p.y += p.vy;
        p.opacity *= 0.96;
        p.size *= 0.98;

        if (p.life <= 0 || p.opacity < 0.02) return false;

        /* draw particle */
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, `rgba(165, 180, 252, ${p.opacity})`);
        gradient.addColorStop(0.4, `rgba(129, 140, 248, ${p.opacity * 0.6})`);
        gradient.addColorStop(1, `rgba(99, 102, 241, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        return true;
      });

      frameCount++;
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isMobile, spawnParticle]);

  /* ─────────────────────────────────────────────
     Compute rocket Y from smoothProgress
     ───────────────────────────────────────────── */
  const rocketY = useTransform(smoothProgress, [0, 1], [80, windowH - 100]);

  /* Don't render on mobile */
  if (isMobile) return null;

  return (
    <div
      className="fixed left-[calc(50%-37rem)] top-0 bottom-0 w-12 z-[15] pointer-events-none hidden md:block"
      aria-hidden="true"
    >
      {/* Exhaust particle canvas — sits behind the rocket */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Vertical dotted travel line (very subtle) */}
      <div className="absolute left-1/2 -translate-x-px top-20 bottom-20 w-px bg-gradient-to-b from-transparent via-slate-800/40 to-transparent" />

      {/* Rocket */}
      <motion.div
        ref={rocketRef}
        style={{
          y: rocketY,
          rotate: smoothTilt,
        }}
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        {/* Rocket SVG — small, clean, minimal */}
        <svg
          width="20"
          height="28"
          viewBox="0 0 20 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_6px_rgba(129,140,248,0.4)]"
        >
          {/* Nose cone */}
          <path
            d="M10 0 C10 0, 4 8, 4 14 L4 20 L16 20 L16 14 C16 8, 10 0, 10 0Z"
            fill="url(#rocketBody)"
            stroke="rgba(148,163,184,0.3)"
            strokeWidth="0.5"
          />
          {/* Window */}
          <circle cx="10" cy="12" r="2.5" fill="url(#rocketWindow)" />
          <circle cx="10" cy="12" r="1.8" fill="url(#rocketWindowInner)" />
          {/* Fins */}
          <path d="M4 17 L0 24 L4 21Z" fill="#4338ca" opacity="0.7" />
          <path d="M16 17 L20 24 L16 21Z" fill="#4338ca" opacity="0.7" />
          {/* Thruster nozzle */}
          <rect x="6" y="20" width="8" height="2" rx="0.5" fill="#334155" />
          {/* Subtle exhaust glow */}
          <ellipse cx="10" cy="24" rx="3" ry="4" fill="url(#exhaustGlow)" opacity="0.6" />

          <defs>
            <linearGradient id="rocketBody" x1="10" y1="0" x2="10" y2="22" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="40%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <radialGradient id="rocketWindow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#1e3a5f" />
            </radialGradient>
            <radialGradient id="rocketWindowInner" cx="0.35" cy="0.35" r="0.5">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#0284c7" />
            </radialGradient>
            <radialGradient id="exhaustGlow" cx="0.5" cy="0" r="1">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#6366f1" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Section waypoint dots along the travel line */}
      {SECTION_IDS.map((id, i) => {
        const yPercent = (i / (SECTION_IDS.length - 1)) * 100;
        const isActive = activeSection === id;

        return (
          <div
            key={id}
            className="absolute left-1/2 -translate-x-1/2 flex items-center"
            style={{ top: `calc(${yPercent * 0.7 + 10}%)` }}
          >
            {/* Waypoint dot */}
            <div
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                isActive
                  ? 'bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.6)] scale-150'
                  : 'bg-slate-700'
              }`}
            />
          </div>
        );
      })}
    </div>
  );
};
