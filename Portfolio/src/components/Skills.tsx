'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Code,
  Cloud,
  Database,
  Shield,
  Wrench,
  GitBranch,
  Terminal,
} from 'lucide-react';
import { PORTFOLIO_DATA, SkillCategory } from '@/data/portfolioData';

/* ─────────────────────────────────────────────
   Icon map for category headers
   ───────────────────────────────────────────── */
const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Cloud,
  Code,
  Database,
  Shield,
  Wrench,
  Workflow: GitBranch,
};

/* ─────────────────────────────────────────────
   Animation variants
   ───────────────────────────────────────────── */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const cardFade = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

export const Skills: React.FC = () => {
  const { skills } = PORTFOLIO_DATA;

  return (
    <section id="skills" className="relative py-24 z-10 border-t border-slate-900 bg-slate-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* ── Section Header ── */}
        <div className="flex flex-col space-y-2 mb-12">
          <div className="flex items-center space-x-2 text-xs font-mono text-indigo-400">
            <Terminal className="w-4 h-4" />
            <span>// TECHNICAL ARSENAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Tools, frameworks & core technologies.
          </h2>
          <p className="text-sm text-slate-400 max-w-xl">
            Technologies I work with daily — from cloud infrastructure and container orchestration to security scanning and automation.
          </p>
        </div>

        {/* ── Skills Categories Grid ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {skills.map((category: SkillCategory) => {
            const IconComponent = ICON_MAP[category.iconName] || Code;
            return (
              <motion.div
                key={category.title}
                variants={cardFade}
                className="subtle-glow-box rounded-2xl p-5 sm:p-6 space-y-4 group"
              >
                {/* Category header */}
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-950/60 border border-indigo-800/40 flex items-center justify-center text-indigo-400 group-hover:border-indigo-600/50 transition-colors">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-100">{category.title}</h3>
                    <p className="text-[11px] font-mono text-slate-500">
                      {category.skills.length} {category.skills.length === 1 ? 'technology' : 'technologies'}
                    </p>
                  </div>
                </div>

                {/* Technology tags */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className={`
                        inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium
                        transition-all duration-200 cursor-default
                        ${
                          skill.highlight
                            ? 'bg-indigo-950/70 border border-indigo-700/40 text-indigo-200 hover:border-indigo-500/60 hover:shadow-[0_0_12px_-3px_rgba(129,140,248,0.3)] hover:text-indigo-100'
                            : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-slate-200 hover:shadow-[0_0_10px_-3px_rgba(148,163,184,0.15)]'
                        }
                      `}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
