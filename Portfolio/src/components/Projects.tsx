'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FolderGit2,
  ExternalLink,
  Calendar,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { PORTFOLIO_DATA, Project } from '@/data/portfolioData';

/* ─────────────────────────────────────────────
   Animation variants
   ───────────────────────────────────────────── */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' as const },
  },
};

export const Projects: React.FC = () => {
  const { projects } = PORTFOLIO_DATA;

  return (
    <section id="projects" className="relative py-24 z-10 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* ── Section Header ── */}
        <div className="flex flex-col space-y-2 mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold space-gradient-text tracking-tight">
            Selected Missions
          </h2>
          <p className="text-sm sm:text-base text-slate-200 max-w-xl font-normal leading-relaxed">
            Real-world projects built with cloud infrastructure, container orchestration, and DevSecOps best practices.
          </p>
        </div>

        {/* ── Project Cards ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="grid grid-cols-1 gap-8"
        >
          {projects.map((project: Project) => (
            <motion.div
              key={project.id}
              variants={cardVariant}
              className="group relative rounded-3xl border border-slate-800/80 bg-slate-950/60 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400/30 hover:shadow-[0_0_40px_-12px_rgba(254,240,138,0.12)]"
            >
              {/* Subtle top-edge glow on hover */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/0 to-transparent group-hover:via-amber-400/40 transition-all duration-500" />

              <div className="p-6 sm:p-8 lg:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* ── Left: Project Info ── */}
                  <div className="lg:col-span-7 space-y-5">
                    {/* Featured badge + category */}
                    <div className="flex flex-wrap items-center gap-3">
                      {project.featured && (
                        <span className="inline-flex items-center space-x-1.5 text-[11px] font-mono px-2.5 py-1 rounded-lg bg-amber-950/40 border border-amber-400/30 text-amber-200">
                          <Sparkles className="w-3 h-3 text-amber-300" />
                          <span>Featured</span>
                        </span>
                      )}
                      <span className="inline-flex items-center space-x-1.5 text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400">
                        <Calendar className="w-3 h-3" />
                        <span>{project.category}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight group-hover:text-amber-200 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-sm font-mono text-slate-400 mt-1">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Key metric highlight */}
                    <div className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-mono text-emerald-300">{project.metrics}</span>
                    </div>

                    {/* Tech stack tags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-slate-900 border border-slate-800 text-slate-400 transition-all duration-200 hover:border-slate-700 hover:text-slate-300 cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ── Right: Key Features + Links ── */}
                  <div className="lg:col-span-5 space-y-5">
                    {/* Architecture highlights */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                        Key Contributions
                      </h4>
                      <ul className="space-y-2.5">
                        {project.architectureHighlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start space-x-2.5">
                            <ChevronRight className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                            <span className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                              {highlight}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action links */}
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-800/60">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${project.title} GitHub Repository`}
                          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium hover:text-slate-100 hover:border-slate-700 transition-all hover:shadow-[0_0_12px_-4px_rgba(148,163,184,0.15)]"
                        >
                          <GithubIcon className="w-4 h-4" />
                          <span>Source Code</span>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${project.title} Live Demo`}
                          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-950/40 border border-amber-400/30 text-amber-200 text-xs font-medium hover:text-white hover:border-amber-400/50 transition-all hover:shadow-[0_0_12px_-4px_rgba(254,240,138,0.2)]"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom subtle gradient accent */}
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-800/0 to-transparent group-hover:via-indigo-500/20 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
