'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Crosshair,
  GraduationCap,
  Award,
  Trophy,
  MapPin,
  BookOpen,
  ShieldCheck,
  Zap,
  ExternalLink,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

/* ─────────────────────────────────────────────
   Professional highlights — real resume bullets
   ───────────────────────────────────────────── */
const HIGHLIGHTS = [
  {
    icon: ShieldCheck,
    text: 'AWS Certified Cloud Practitioner with hands-on multi-cloud governance experience.',
  },
  {
    icon: Zap,
    text: 'Built containerized deployment governance platforms reducing manual validation effort by 70–80%.',
  },
  {
    icon: Award,
    text: 'Engineered Shift-Left DevSecOps workflows catching 100% of critical security issues pre-deployment.',
  },
  {
    icon: Trophy,
    text: 'Selected in Top 45 out of 720+ teams at Vadodara Hackathon 6.0 (2025).',
  },
];

/* ─────────────────────────────────────────────
   Stagger animation variants
   ───────────────────────────────────────────── */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
};

export const About: React.FC = () => {
  const { personal } = PORTFOLIO_DATA;
  const edu = (personal as any).education;
  const certs = (personal as any).certifications as { name: string; issuer: string }[];

  return (
    <section id="about" className="relative py-24 z-10 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* ── Section Header ── */}
        <div className="flex flex-col space-y-2 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold space-gradient-text tracking-tight">
            Mission Profile
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ── LEFT: Bio + Education Card ── */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="lg:col-span-7 space-y-6"
          >
            {/* Bio Card */}
            <motion.div
              variants={fadeUp}
              className="subtle-glow-box rounded-3xl p-6 sm:p-8 space-y-5"
            >
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                {personal.bio}
              </p>
              <p className="text-slate-400 leading-relaxed text-sm">
                I focus on designing declarative infrastructure-as-code blueprints, building policy-as-code compliance engines, and orchestrating containerized multi-service environments. My goal is to automate everything from provisioning to security scanning, achieving zero-downtime releases with complete audit trails.
              </p>

              {/* Quick metadata row */}
              <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-mono text-slate-500">Location</div>
                  <div className="flex items-center space-x-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-300" />
                    <span className="text-sm font-semibold text-slate-200">{personal.location}</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-500">Focus</div>
                  <div className="text-sm font-semibold text-slate-200 mt-0.5">Cloud & DevSecOps</div>
                </div>
              </div>
            </motion.div>

            {/* Education Card */}
            {edu && (
              <motion.div
                variants={fadeUp}
                className="subtle-glow-box rounded-3xl p-6 sm:p-8 space-y-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-950/70 border border-indigo-800/40 flex items-center justify-center text-indigo-400">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-100">{edu.degree}</h3>
                    <p className="text-xs text-slate-400">{edu.university} • {edu.period}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <div className="text-xs font-mono text-slate-500">CGPA</div>
                    <div className="text-lg font-extrabold space-accent-gradient font-mono">{edu.cgpa}</div>
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-500">Coursework</div>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {edu.coursework.map((c: string) => (
                        <span
                          key={c}
                          className="px-2 py-0.5 text-[10px] font-mono rounded-md bg-slate-900 border border-slate-800 text-slate-400"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* ── RIGHT: Highlights + Certifications ── */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="lg:col-span-5 space-y-4"
          >
            {/* Professional Highlights */}
            {HIGHLIGHTS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="subtle-glow-box rounded-2xl p-5 space-y-2 hover:border-slate-700 transition-all group"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400 mt-0.5 shrink-0 group-hover:border-indigo-700/50 transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">{item.text}</p>
                  </div>
                </motion.div>
              );
            })}

            {/* Certifications */}
            {certs && certs.length > 0 && (
              <motion.div
                variants={fadeUp}
                className="subtle-glow-box rounded-2xl p-5 space-y-3"
              >
                <div className="flex items-center space-x-2 text-xs font-mono text-amber-300 font-bold mb-1">
                  <Award className="w-4 h-4 text-amber-300" />
                  <span>CERTIFICATIONS</span>
                </div>
                {certs.map((cert: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between space-x-3 py-2.5 border-b border-slate-800/60 last:border-0"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-950/40 border border-amber-800/40 flex items-center justify-center text-amber-300 shrink-0">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-100">{cert.name}</div>
                        <div className="text-xs text-slate-400">{cert.issuer}</div>
                      </div>
                    </div>
                    {cert.badgeUrl && (
                      <a
                        href={cert.badgeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1 px-2.5 py-1 text-xs font-mono rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 hover:border-amber-400 transition-all shrink-0"
                      >
                        <span>View Badge</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
