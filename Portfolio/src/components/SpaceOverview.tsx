'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Globe, Cpu, Layers, Zap, CheckCircle2, ChevronRight } from 'lucide-react';
import { PORTFOLIO_DATA, EngineeringPillar } from '@/data/portfolioData';

const PILLAR_ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Globe,
  Cpu,
  Layers,
  Zap,
};

export const SpaceOverview: React.FC = () => {
  const { pillars } = PORTFOLIO_DATA;
  const [selectedPillarId, setSelectedPillarId] = useState<string>(pillars[0].id);

  const activePillar = pillars.find((p) => p.id === selectedPillarId) || pillars[0];

  return (
    <section id="overview" className="relative py-24 z-10 border-t border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col space-y-2 mb-12">
          <div className="flex items-center space-x-2 text-xs font-mono text-indigo-400">
            <Compass className="w-4 h-4" />
            <span>// SYSTEM CONSTELLATION OVERVIEW</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Orbital engineering pillars.
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl">
            Click on any orbital node below to inspect the engineering architecture, performance benchmarks, and core technology stack.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Orbital Visual Graph */}
          <div className="lg:col-span-6 relative flex items-center justify-center p-6 sm:p-10 min-h-[380px] subtle-glow-box rounded-3xl overflow-hidden">
            {/* Ambient Background Orbital Ring */}
            <div className="absolute w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] rounded-full border border-indigo-500/20 border-dashed animate-[spin_60s_linear_infinite]" />
            <div className="absolute w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] rounded-full border border-violet-500/20 border-dashed animate-[spin_40s_linear_infinite_reverse]" />

            {/* Central Core Node */}
            <div className="relative z-10 w-24 h-24 rounded-full bg-slate-950 border-2 border-indigo-500/60 flex flex-col items-center justify-center text-center p-2 shadow-2xl shadow-indigo-950/80">
              <span className="text-xs font-mono font-bold space-accent-gradient">MK_CORE</span>
              <span className="text-[10px] font-mono text-slate-400">Hub</span>
            </div>

            {/* Satellite Orbital Nodes */}
            <div className="absolute inset-0 flex items-center justify-center">
              {pillars.map((pillar, idx) => {
                const isSelected = selectedPillarId === pillar.id;
                const IconComponent = PILLAR_ICON_MAP[pillar.icon] || Globe;

                // Position nodes evenly in circle angles: 0, 90, 180, 270 deg
                const angleDeg = idx * 90 - 45;
                const angleRad = (angleDeg * Math.PI) / 180;
                const radius = 130; // radius in px
                const x = Math.cos(angleRad) * radius;
                const y = Math.sin(angleRad) * radius;

                return (
                  <motion.button
                    key={pillar.id}
                    onClick={() => setSelectedPillarId(pillar.id)}
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`absolute z-20 w-14 h-14 rounded-2xl flex items-center justify-center transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-slate-950 border-white shadow-xl shadow-indigo-500/30 scale-110'
                        : 'bg-slate-900/90 border-slate-800 text-indigo-400 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <IconComponent className="w-6 h-6" />
                    {isSelected && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right Selected Pillar Detail View */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="subtle-glow-box rounded-3xl p-6 sm:p-8 space-y-6"
              >
                <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-950/80 border border-indigo-800/60 flex items-center justify-center text-indigo-400">
                    {React.createElement(PILLAR_ICON_MAP[activePillar.icon] || Globe, {
                      className: 'w-5 h-5',
                    })}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">{activePillar.title}</h3>
                    <span className="text-xs font-mono text-indigo-400">Orbital Node Active</span>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">{activePillar.description}</p>

                {/* Benchmark Stat */}
                <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/40 flex items-center space-x-3">
                  <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs font-mono text-indigo-200">{activePillar.stats}</span>
                </div>

                {/* Tech Stack List */}
                <div className="space-y-2">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Core Technologies & Tools
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activePillar.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 flex items-center space-x-1.5"
                      >
                        <CheckCircle2 className="w-3 h-3 text-indigo-400" />
                        <span>{tech}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
