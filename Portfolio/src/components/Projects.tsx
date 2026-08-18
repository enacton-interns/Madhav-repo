'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderGit2, ExternalLink, Star, Info, Layers } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { PORTFOLIO_DATA, Project } from '@/data/portfolioData';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
  const { projects } = PORTFOLIO_DATA;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = ['All', 'Full Stack', 'Systems', 'Web Apps', 'AI & Tools'];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="relative py-24 z-10 border-t border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col space-y-2 mb-10">
          <div className="flex items-center space-x-2 text-xs font-mono text-indigo-400">
            <FolderGit2 className="w-4 h-4" />
            <span>// FEATURED ENGINEERING PROJECTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Production applications & systems.
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-medium rounded-xl transition-all border ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-500/20 to-violet-500/20 border-indigo-500/50 text-indigo-200 shadow-md shadow-indigo-950/40'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project: Project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="subtle-glow-box rounded-3xl p-6 flex flex-col justify-between space-y-6 group hover:border-indigo-500/40 transition-all"
              >
                <div className="space-y-4">
                  {/* Category & Status Badges */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-amber-950/60 border border-amber-800/40 text-amber-300 flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-amber-300" />
                        <span>Flagship</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-100 group-hover:text-indigo-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{project.subtitle}</p>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Metrics Banner */}
                  <div className="px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800/80 text-xs font-mono text-indigo-300 flex items-center space-x-2">
                    <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className="truncate">{project.metrics}</span>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800/80 text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => setActiveProject(project)}
                    className="inline-flex items-center space-x-1.5 text-xs font-mono text-indigo-400 hover:text-indigo-300 hover:underline underline-offset-4"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Architecture & Details</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} GitHub`}
                      className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100 hover:border-slate-700 transition-colors"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} Live Demo`}
                      className="p-2 rounded-lg bg-indigo-950/80 border border-indigo-800/60 text-indigo-300 hover:text-white hover:border-indigo-600 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal Popup */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
};
