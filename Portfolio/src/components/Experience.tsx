'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2, Award, Terminal } from 'lucide-react';
import { PORTFOLIO_DATA, ExperienceItem } from '@/data/portfolioData';

/* ─────────────────────────────────────────────
   Animation variants for timeline items
   ───────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  },
};

export const Experience: React.FC = () => {
  const { experience } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="relative py-24 z-10 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* ── Section Header ── */}
        <div className="flex flex-col space-y-2 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold space-gradient-text tracking-tight">
            Professional Timeline
          </h2>
          <p className="text-sm sm:text-base text-slate-200 max-w-xl font-normal leading-relaxed">
            A chronological timeline of engineering roles, core projects, education, and technical achievements.
          </p>
        </div>

        {/* ── Vertical Timeline Container (Aligned flush with max-w-6xl header) ── */}
        <div className="relative pl-4 sm:pl-6">
          {/* Thin Vertical Timeline Line */}
          <div className="absolute left-0 sm:left-1 top-3 bottom-3 w-px bg-gradient-to-b from-amber-400/50 via-slate-800 to-slate-900" />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={containerVariants}
            className="space-y-10"
          >
            {experience.map((item: ExperienceItem) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="relative group"
              >
                {/* ── Milestone Node Dot (Illuminates on View / Hover) ── */}
                <div className="absolute -left-[18px] sm:-left-[22px] top-2.5 w-3.5 h-3.5 rounded-full bg-slate-950 border-2 border-amber-400/60 flex items-center justify-center group-hover:border-amber-300 group-hover:scale-125 group-hover:shadow-[0_0_12px_rgba(254,240,138,0.8)] transition-all duration-300">
                  <div className="w-1 h-1 rounded-full bg-amber-300 group-hover:bg-amber-200 transition-colors" />
                </div>

                {/* ── Content Card ── */}
                <div className="subtle-glow-box rounded-2xl p-6 sm:p-8 space-y-5 border border-slate-800/80 hover:border-amber-400/30 transition-all duration-300">
                  {/* Top Metadata Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/60">
                    <div>
                      <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-amber-950/40 border border-amber-400/30 text-amber-200 font-semibold">
                        {item.company}
                      </span>
                      <h3 className="text-xl font-extrabold text-slate-100 mt-2">
                        {item.role}
                      </h3>
                    </div>

                    <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-300" />
                        <span>{item.period}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* High Level Summary Description */}
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {item.description}
                  </p>

                  {/* Key Contributions & Achievements */}
                  {item.achievements && item.achievements.length > 0 && (
                    <div className="space-y-2.5 pt-1">
                      <div className="text-xs font-mono text-slate-500 uppercase tracking-wider flex items-center space-x-1.5">
                        <Award className="w-3.5 h-3.5 text-amber-300" />
                        <span>Key Achievements & Impact</span>
                      </div>
                      <ul className="space-y-2">
                        {item.achievements.map((ach, idx) => (
                          <li key={idx} className="flex items-start space-x-2.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400/90 mt-0.5 shrink-0" />
                            <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                              {ach}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies Stack Tags */}
                  {item.skills && item.skills.length > 0 && (
                    <div className="pt-3 flex flex-wrap items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-slate-500 mr-1" />
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 text-[11px] font-mono rounded bg-slate-900 border border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
