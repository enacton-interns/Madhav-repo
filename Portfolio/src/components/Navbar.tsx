'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText, Send } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const resumeUrl = PORTFOLIO_DATA.personal.resumeUrl || '/Madhav_Kotak_Resume.pdf';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl shadow-black/40 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand logo & role */}
        <a
          href="#hero"
          className="group flex items-center space-x-3 focus:outline-none"
          aria-label="Madhav Kotak Home"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-center text-amber-300 font-extrabold text-sm group-hover:border-amber-400/60 group-hover:shadow-[0_0_15px_rgba(254,240,138,0.2)] transition-all">
            MK
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold tracking-tight text-slate-100 group-hover:text-amber-200 transition-colors">
              {PORTFOLIO_DATA.personal.name}
            </span>
            <span className="text-xs font-mono text-amber-300/90 font-medium flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
              DevOps Engineer
            </span>
          </div>
        </a>

        {/* Desktop Navigation Link Floating Capsule */}
        <nav className="hidden md:flex items-center space-x-1.5 bg-slate-900/80 border border-slate-800/90 rounded-full px-5 py-2 backdrop-blur-md shadow-lg shadow-black/30">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 ${
                  isActive ? 'text-amber-200' : 'text-slate-300 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-full bg-amber-950/60 border border-amber-400/40 shadow-[0_0_12px_rgba(254,240,138,0.15)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Action CTAs */}
        <div className="hidden md:flex items-center space-x-3.5">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-400/40 px-4 py-2.5 rounded-xl transition-all shadow-sm"
          >
            <FileText className="w-4 h-4 text-amber-300" />
            <span>Resume</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center space-x-2 text-xs sm:text-sm font-extrabold text-slate-950 bg-amber-100 hover:bg-white px-5 py-2.5 rounded-xl transition-all shadow-md shadow-amber-200/10 hover:shadow-amber-200/25 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Send className="w-4 h-4 text-slate-950" />
            <span>Contact</span>
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-amber-300" /> : <Menu className="w-5 h-5 text-amber-300" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-3 pb-6 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex flex-col space-y-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-base font-semibold text-slate-200 hover:text-amber-300 hover:bg-slate-900/80 rounded-xl transition-all"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 flex flex-col space-y-2.5 border-t border-slate-900">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 py-3 text-sm font-semibold text-slate-200 bg-slate-900 border border-slate-800 rounded-xl"
                >
                  <FileText className="w-4 h-4 text-amber-300" />
                  <span>Resume / CV</span>
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 py-3 text-sm font-extrabold text-slate-950 bg-amber-100 hover:bg-white rounded-xl shadow-md"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>Get in Touch</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
