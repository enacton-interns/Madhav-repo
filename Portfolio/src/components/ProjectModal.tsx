'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Cpu, Layers, CheckCircle2, Star } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { Project } from '@/data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal content box */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-6 text-slate-100 max-h-[90vh] overflow-y-auto"
        >
          {/* Header Bar */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-4">
            <div className="space-y-1 pr-6">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-950/80 text-indigo-300 border border-indigo-800/60">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-amber-950/80 text-amber-300 border border-amber-800/60 flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-amber-300" />
                    <span>Flagship</span>
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-extrabold text-slate-100 pt-1">{project.title}</h3>
              <p className="text-xs text-slate-400 font-mono">{project.subtitle}</p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close Project Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Key Metrics Banner */}
          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/40 flex items-center space-x-3 text-indigo-200">
            <Cpu className="w-5 h-5 text-indigo-400 shrink-0" />
            <span className="text-xs font-mono leading-relaxed">{project.metrics}</span>
          </div>

          {/* Full Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Project Overview
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">{project.fullDescription}</p>
          </div>

          {/* Tech Stack Tags */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Technologies & Tools Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Architecture Highlights */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
              <Layers className="w-4 h-4 text-violet-400" />
              <span>Architectural Highlights</span>
            </h4>
            <ul className="space-y-2">
              {project.architectureHighlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions Bar */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-slate-950 font-semibold text-xs hover:opacity-95 transition-all shadow-md shadow-indigo-950/50"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Application</span>
              </a>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-mono transition-all"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>View Source</span>
              </a>
            </div>

            <button
              onClick={onClose}
              className="text-xs font-mono text-slate-400 hover:text-slate-200 underline underline-offset-4"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
