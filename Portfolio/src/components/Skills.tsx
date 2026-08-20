'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu } from 'lucide-react';
import { PORTFOLIO_DATA, SkillCategory } from '@/data/portfolioData';

/* ─────────────────────────────────────────────
   Animation variants
   ───────────────────────────────────────────── */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemFade = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
};

export const Skills: React.FC = () => {
  const { skills } = PORTFOLIO_DATA;

  return (
    <section id="skills" className="relative py-24 z-10 border-t border-slate-900 bg-slate-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* ── Section Header ── */}
        <div className="flex flex-col space-y-2 mb-14">
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 tracking-wider">
            <Terminal className="w-4 h-4 text-slate-300" />
            <span>// TECHNICAL MATRIX & SYSTEM CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold space-gradient-text tracking-tight">
            Engineering stack & core tools.
          </h2>
          <p className="text-sm text-slate-400 max-w-xl">
            Clean architectural breakdown of technologies used for cloud infrastructure, automation, security, and backend systems.
          </p>
        </div>

        {/* ── Technical Matrix Layout (Clean & Non-Templated) ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {skills.map((category: SkillCategory, idx: number) => (
            <motion.div
              key={category.title}
              variants={itemFade}
              className="relative pl-6 border-l-2 border-slate-800 hover:border-slate-500 transition-colors duration-300 space-y-4 group"
            >
              {/* Category Header with Index Number */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <span className="text-xs font-mono font-bold text-slate-400">0{idx + 1}</span>
                  <span className="text-xs font-mono text-slate-500">//</span>
                  <h3 className="text-base font-extrabold text-slate-100 group-hover:text-slate-50 transition-colors">
                    {category.title}
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                  {category.skills.length} SYS_UNITS
                </span>
              </div>

              {/* Technology Tags Matrix */}
              <div className="flex flex-wrap gap-2 pt-1">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`
                      inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono
                      transition-all duration-200 cursor-default
                      ${
                        skill.highlight
                          ? 'bg-slate-900 border border-slate-700 text-slate-100 hover:border-slate-500 hover:shadow-[0_0_12px_-4px_rgba(255,255,255,0.2)]'
                          : 'bg-slate-950 border border-slate-800/90 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }
                    `}
                  >
                    {skill.highlight && (
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-pulse" />
                    )}
                    <span>{skill.name}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
