'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2, GraduationCap, Award } from 'lucide-react';
import { PORTFOLIO_DATA, ExperienceItem } from '@/data/portfolioData';

export const Experience: React.FC = () => {
  const { experience } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="relative py-24 z-10 border-t border-slate-900 bg-slate-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col space-y-2 mb-12">
          <div className="flex items-center space-x-2 text-xs font-mono text-indigo-400">
            <Briefcase className="w-4 h-4" />
            <span>// WORK HISTORY & TRACK RECORD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Professional experience & achievements.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Vertical Timeline */}
          <div className="lg:col-span-8 relative space-y-8 pl-6 sm:pl-8 border-l border-slate-800">
            {experience.map((item: ExperienceItem, idx: number) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative group"
              >
                {/* Timeline node icon */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-slate-900 border-2 border-indigo-500 flex items-center justify-center text-indigo-400 shadow-md shadow-indigo-950/60 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <div className="w-1.5 h-1.5 rounded-full bg-current" />
                </div>

                <div className="subtle-glow-box rounded-3xl p-6 space-y-4">
                  {/* Role Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                    <div>
                      <h3 className="text-lg font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
                        {item.role}
                      </h3>
                      <div className="text-sm font-medium text-slate-300 flex items-center space-x-2">
                        <span>{item.company}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-xs font-mono text-slate-400 flex items-center">
                          <MapPin className="w-3 h-3 mr-1 text-slate-500" />
                          {item.location}
                        </span>
                      </div>
                    </div>

                    <div className="inline-flex items-center space-x-1.5 text-xs font-mono text-indigo-300 bg-indigo-950/80 border border-indigo-800/60 px-3 py-1 rounded-full self-start sm:self-center">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Key Achievements Bullet points */}
                  <div className="space-y-2 pt-1">
                    <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                      Key Impact & Achievements
                    </div>
                    <ul className="space-y-2">
                      {item.achievements.map((achievement, aIdx) => (
                        <li key={aIdx} className="flex items-start space-x-2 text-xs text-slate-300 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-slate-950 border border-slate-800/80 text-slate-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Education & Credentials Side Cards */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="subtle-glow-box rounded-3xl p-6 space-y-4"
            >
              <div className="flex items-center space-x-3 pb-3 border-b border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-100">Education</h3>
                  <p className="text-xs font-mono text-slate-400">Academic Background</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-sm font-semibold text-slate-200">
                    B.S. in Computer Science
                  </div>
                  <div className="text-xs text-slate-400">University of California</div>
                  <div className="text-xs font-mono text-indigo-400 mt-0.5">2016 — 2020</div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Focus on Data Structures, Distributed Systems, Software Engineering Principles, and Database Systems.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="subtle-glow-box rounded-3xl p-6 space-y-4"
            >
              <div className="flex items-center space-x-3 pb-3 border-b border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-100">Certifications</h3>
                  <p className="text-xs font-mono text-slate-400">Industry Credentials</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="text-xs font-bold text-slate-200">AWS Certified Solutions Architect</div>
                  <div className="text-[11px] font-mono text-indigo-400">Associate Level • Issued 2023</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="text-xs font-bold text-slate-200">Certified Kubernetes Application Developer (CKAD)</div>
                  <div className="text-[11px] font-mono text-indigo-400">Linux Foundation • Issued 2024</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
