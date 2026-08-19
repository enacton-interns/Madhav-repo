'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Compass, ArrowRight } from 'lucide-react';

interface NavNode {
  id: string;
  label: string;
  sectionId: string;
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  description: string;
}

const NAV_NODES: NavNode[] = [
  {
    id: 'about',
    label: 'ABOUT',
    sectionId: 'about',
    x: 15,
    y: 50,
    description: 'Mission Profile & Background',
  },
  {
    id: 'skills',
    label: 'SKILLS',
    sectionId: 'skills',
    x: 32,
    y: 25,
    description: 'Cloud & DevSecOps Arsenal',
  },
  {
    id: 'projects',
    label: 'PROJECTS',
    sectionId: 'projects',
    x: 52,
    y: 70,
    description: 'Selected Engineering Missions',
  },
  {
    id: 'experience',
    label: 'EXPERIENCE',
    sectionId: 'experience',
    x: 72,
    y: 30,
    description: 'Chronological Mission Log',
  },
  {
    id: 'contact',
    label: 'CONTACT',
    sectionId: 'contact',
    x: 88,
    y: 55,
    description: 'Comm Channel & Signal',
  },
];

/* Connections between adjacent nodes in order */
const CONNECTIONS = [
  [0, 1], // ABOUT -> SKILLS
  [1, 2], // SKILLS -> PROJECTS
  [2, 3], // PROJECTS -> EXPERIENCE
  [3, 4], // EXPERIENCE -> CONTACT
];

export const SpaceOverview: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string>('about');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  /* Detect active section on scroll via IntersectionObserver */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_NODES.forEach((node) => {
      const el = document.getElementById(node.sectionId);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveNodeId(node.id);
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

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="navigation" className="relative py-20 z-10 border-t border-slate-900 bg-slate-950/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center space-y-2 mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-indigo-400">
            <Compass className="w-4 h-4" />
            <span>// SYSTEM CONSTELLATION MAP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Navigation.
          </h2>
          <p className="text-sm text-slate-400 max-w-md">
            Click any star node on the constellation map below to jump directly to that portfolio milestone.
          </p>
        </div>

        {/* ── Desktop/Tablet Constellation Visual Map ── */}
        <div className="relative w-full h-72 sm:h-80 subtle-glow-box rounded-3xl p-6 overflow-hidden hidden md:block border border-slate-800/80">
          {/* Thin Constellation Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#c084fc" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {CONNECTIONS.map(([startIdx, endIdx], i) => {
              const start = NAV_NODES[startIdx];
              const end = NAV_NODES[endIdx];
              const isHighlighted =
                (hoveredNodeId === start.id || hoveredNodeId === end.id) ||
                (activeNodeId === start.id || activeNodeId === end.id);

              return (
                <line
                  key={i}
                  x1={`${start.x}%`}
                  y1={`${start.y}%`}
                  x2={`${end.x}%`}
                  y2={`${end.y}%`}
                  stroke={isHighlighted ? 'url(#lineGrad)' : 'rgba(148, 163, 184, 0.2)'}
                  strokeWidth={isHighlighted ? '1.5' : '1'}
                  strokeDasharray={isHighlighted ? 'none' : '3 3'}
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>

          {/* Star Nodes */}
          {NAV_NODES.map((node) => {
            const isActive = activeNodeId === node.id;
            const isHovered = hoveredNodeId === node.id;

            return (
              <div
                key={node.id}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10"
                onClick={() => scrollToSection(node.sectionId)}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
              >
                {/* Outer Glow Halo */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-indigo-500/20 border border-indigo-400 shadow-[0_0_16px_rgba(129,140,248,0.7)] scale-110'
                      : isHovered
                      ? 'bg-slate-800/60 border border-slate-600 shadow-[0_0_12px_rgba(148,163,184,0.4)] scale-105'
                      : 'bg-slate-900/40 border border-slate-800'
                  }`}
                >
                  {/* Central Star Point */}
                  <div
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-indigo-300 shadow-[0_0_8px_#818cf8] scale-125'
                        : isHovered
                        ? 'bg-slate-200'
                        : 'bg-slate-500'
                    }`}
                  />
                </div>

                {/* Node Label */}
                <div className="mt-2 text-center pointer-events-none">
                  <span
                    className={`text-xs font-mono font-bold tracking-wider transition-colors duration-200 block ${
                      isActive
                        ? 'text-indigo-300'
                        : isHovered
                        ? 'text-slate-100'
                        : 'text-slate-400'
                    }`}
                  >
                    {node.label}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono hidden group-hover:block transition-opacity">
                    {node.description}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Mobile Responsive Grid Navigation ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:hidden">
          {NAV_NODES.map((node) => {
            const isActive = activeNodeId === node.id;
            return (
              <button
                key={node.id}
                onClick={() => scrollToSection(node.sectionId)}
                className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  isActive
                    ? 'bg-indigo-950/70 border-indigo-500/50 text-indigo-200 shadow-lg shadow-indigo-950/50'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      isActive ? 'bg-indigo-400 shadow-[0_0_8px_#818cf8]' : 'bg-slate-600'
                    }`}
                  />
                  <div>
                    <span className="text-xs font-mono font-bold block">{node.label}</span>
                    <span className="text-[11px] text-slate-400">{node.description}</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
