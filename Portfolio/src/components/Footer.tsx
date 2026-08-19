'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-10 z-10 border-t border-slate-900 bg-slate-950 text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand & Copyright */}
        <div className="flex flex-col items-center sm:items-start space-y-1 text-center sm:text-left">
          <span className="font-bold text-slate-200 text-sm">{PORTFOLIO_DATA.personal.name}</span>
          <p className="text-xs text-slate-400 font-mono">
            © 2026 • Built with curiosity and code.
          </p>
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
