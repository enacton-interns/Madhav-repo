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
          ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60 shadow-lg shadow-black/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand logo */}
        <a
          href="#hero"
          className="group flex items-center space-x-2.5 focus:outline-none"
          aria-label="Madhav Kotak Home"
        >
          <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400 font-bold text-sm group-hover:border-indigo-500/50 group-hover:shadow-md group-hover:shadow-indigo-950/50 transition-all">
            MK
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-slate-100 group-hover:text-indigo-300 transition-colors">
              {PORTFOLIO_DATA.personal.name}
            </span>
            <span className="text-[10px] font-mono text-slate-400 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
              Software Engineer
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 bg-slate-900/60 border border-slate-800/80 rounded-full px-4 py-1.5 backdrop-blur-sm">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  isActive ? 'text-indigo-300' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-full bg-indigo-950/80 border border-indigo-500/30"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center space-x-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 px-3.5 py-2 rounded-xl transition-all hover:shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span>Resume</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center space-x-1.5 text-xs font-medium text-slate-950 bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 hover:from-indigo-300 hover:to-cyan-300 px-4 py-2 rounded-xl transition-all shadow-md shadow-indigo-950/40 hover:shadow-indigo-900/60 font-semibold"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Contact</span>
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
                  className="px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-indigo-400 hover:bg-slate-900 rounded-xl transition-all"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 flex flex-col space-y-2 border-t border-slate-900">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 py-2.5 text-sm font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-xl"
                >
                  <FileText className="w-4 h-4 text-indigo-400" />
                  <span>Resume / CV</span>
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 py-2.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-xl"
                >
                  <Send className="w-4 h-4" />
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
