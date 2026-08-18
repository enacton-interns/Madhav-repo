'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUp, Terminal, ShieldCheck } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export const Footer: React.FC = () => {
  const [utcTime, setUtcTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().slice(17, 22) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 z-10 border-t border-slate-900 bg-slate-950 text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Copyright */}
        <div className="flex flex-col items-center md:items-start space-y-1">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-200 text-sm">{PORTFOLIO_DATA.personal.name}</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs font-mono text-slate-500">Portfolio System</span>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            © {new Date().getFullYear()} Madhav Kotak. Built with Next.js, React & Tailwind CSS.
          </p>
        </div>

        {/* System Status Indicator */}
        <div className="flex items-center space-x-4 text-xs font-mono bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-full">
          <span className="flex items-center text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5 mr-1.5" /> Operational
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300 flex items-center">
            <Terminal className="w-3.5 h-3.5 mr-1.5 text-indigo-400" />
            {utcTime || '16:05 UTC'}
          </span>
        </div>

        {/* Scroll To Top Button */}
        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-100 transition-all cursor-pointer flex items-center space-x-1.5 text-xs font-mono"
          aria-label="Scroll back to top"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5 text-indigo-400" />
        </button>
      </div>
    </footer>
  );
};
