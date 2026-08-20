'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Copy, Check, Sparkles, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '@/data/portfolioData';

import { CheeseMoonSvg } from './SpaceEnvironment';

export const Contact: React.FC = () => {
  const { personal } = PORTFOLIO_DATA;

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#818cf8', '#c084fc', '#38bdf8'],
        });
      } catch (err) {
        // silent fallback
      }

      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <section id="contact" className="relative py-28 z-10 border-t border-slate-900 overflow-hidden">
      {/* 3D Cheese Moon near the horizon */}
      <div className="absolute right-[4%] bottom-[6%] w-52 h-52 pointer-events-none opacity-30 hidden lg:block">
        <CheeseMoonSvg />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col space-y-3 mb-14">
          <div className="flex items-center space-x-2 text-xs font-mono text-amber-300 tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>// COMM CHANNEL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold space-gradient-text tracking-tight">
            Ready for the next mission?
          </h2>
          <p className="text-base text-slate-400 max-w-2xl leading-relaxed">
            Whether you&apos;re looking to discuss a cloud engineering role, infrastructure automation, DevSecOps pipelines, or technical collaboration, my inbox is always open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Info & Direct Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 subtle-glow-box rounded-3xl p-7 sm:p-8 space-y-6"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-100">{personal.name}</h3>
              <p className="text-xs font-mono text-amber-300">{personal.title}</p>
            </div>

            <div className="space-y-4 pt-3 border-t border-slate-800/80">
              <div className="flex items-center space-x-3 text-xs text-slate-300">
                <MapPin className="w-4 h-4 text-amber-300 shrink-0" />
                <span>{personal.location}</span>
              </div>

              {/* Email Copy Card */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="flex items-center space-x-2.5 text-xs text-slate-200 font-mono truncate mr-2">
                  <Mail className="w-4 h-4 text-amber-300 shrink-0" />
                  <span className="truncate">{personal.socials.email}</span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 transition-colors flex items-center space-x-1 shrink-0 cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-300" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Connect Elsewhere
              </div>
              <div className="flex items-center space-x-3">
                <a
                  href={personal.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400/40 text-slate-300 hover:text-amber-200 transition-all text-xs font-medium"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={personal.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400/40 text-slate-300 hover:text-amber-200 transition-all text-xs font-medium"
                >
                  <LinkedinIcon className="w-4 h-4 text-amber-300" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Direct Message Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 subtle-glow-box rounded-3xl p-7 sm:p-8"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-100">Message Sent!</h3>
                <p className="text-xs text-slate-400 max-w-md">
                  Thank you for reaching out. I have received your message and will respond promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-mono text-amber-300 hover:underline pt-2 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Your Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">Subject</label>
                  <input
                    type="text"
                    placeholder="Engineering Role / Project Collaboration"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Hello Madhav, I saw your portfolio and would love to discuss..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-amber-100 hover:bg-white text-slate-950 font-extrabold text-sm transition-all shadow-md shadow-amber-200/10 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="font-mono text-xs animate-pulse text-slate-950">Sending...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-slate-950" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
