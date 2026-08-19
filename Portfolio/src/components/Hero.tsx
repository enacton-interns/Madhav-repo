'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Code2, Shield, Terminal, Send, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

interface HeroProps {
  isRevealed?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isRevealed = true }) => {
  const { personal } = PORTFOLIO_DATA;

  return (
    <section id="hero" className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-start space-y-8 max-w-3xl">
          {/* Eyebrow & Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap items-center gap-3"
          >
            {/* Eyebrow Tag */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 font-mono text-xs font-semibold tracking-widest uppercase backdrop-blur-md shadow-sm">
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
              <span>{personal.eyebrow}</span>
            </div>

            {/* Status Beacon */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-400 backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-slate-300">{personal.status}</span>
            </div>
          </motion.div>

          {/* Main Heading & Supporting Text */}
          <div className="space-y-5">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 leading-[1.15]"
            >
              Hi, I&apos;m <span className="space-accent-gradient">{personal.name}</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal max-w-2xl"
            >
              A software engineer specialized in <span className="text-slate-100 font-medium">DevOps</span>, <span className="text-slate-100 font-medium">cloud infrastructure</span>, <span className="text-slate-100 font-medium">automation</span>, and <span className="text-slate-100 font-medium">security</span>. I build resilient distributed systems, automated CI/CD pipelines, and high-performance applications that scale.
            </motion.p>
          </div>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <a
              href="#projects"
              className="inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-slate-950 font-semibold text-sm hover:opacity-95 transition-all shadow-lg shadow-indigo-950/50 hover:shadow-indigo-900/60 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Code2 className="w-4 h-4" />
              <span>Explore My Work</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Send className="w-4 h-4 text-indigo-400" />
              <span>Get In Touch</span>
            </a>
          </motion.div>

          {/* Subtle Social Links & Stack Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-slate-900/90 w-full"
          >
            <div className="flex items-center space-x-3">
              <a
                href={personal.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/90 text-slate-400 hover:text-slate-100 hover:border-slate-700 transition-all hover:scale-105"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={personal.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/90 text-slate-400 hover:text-slate-100 hover:border-slate-700 transition-all hover:scale-105"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personal.socials.email}`}
                aria-label="Email Contact"
                className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/90 text-slate-400 hover:text-slate-100 hover:border-slate-700 transition-all hover:scale-105"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              <span>Kubernetes • Docker • AWS • Terraform • Git / GitHub</span>
            </div>
          </motion.div>

          {/* Key Engineering Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 w-full"
          >
            {personal.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="subtle-glow-box rounded-2xl p-4 flex flex-col justify-between"
              >
                <div className="text-2xl sm:text-3xl font-extrabold space-accent-gradient font-mono">
                  {metric.value}
                </div>
                <div className="text-xs text-slate-400 mt-1 font-medium">{metric.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Small Scroll Indicator Near Bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isRevealed ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="flex justify-center mt-14"
      >
        <a
          href="#about"
          className="flex flex-col items-center space-y-1.5 text-slate-400 hover:text-indigo-400 text-xs font-mono tracking-wider transition-colors group"
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown className="w-4 h-4 animate-bounce text-slate-400 group-hover:text-indigo-400" />
        </a>
      </motion.div>
    </section>
  );
};
