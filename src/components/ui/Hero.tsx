import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Download, ChevronDown } from 'lucide-react';
import { HeroCanvas } from '../3d/HeroCanvas';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const Hero: React.FC = () => {
  const scrollToProjects = () => {
    const projectsEl = document.getElementById('projects');
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center pt-28 pb-16 px-4 overflow-hidden">
      {/* 3D Background Focal Canvas */}
      <HeroCanvas />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-950/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border-sky-500/25 text-xs font-mono-code text-sky-300 mb-6 shadow-lg"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Software Developer Intern @ cognitest.io</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-300">RNSIT CGPA 9.43</span>
        </motion.div>

        {/* Main Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white mb-3 leading-none"
        >
          HEMANTH S
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl sm:text-2xl font-semibold text-slate-200 max-w-3xl mb-4 tracking-wide"
        >
          Full-Stack Developer & Security Engineer
        </motion.p>

        {/* Human bio paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm sm:text-base text-slate-400 max-w-2xl mb-10 leading-relaxed font-normal"
        >
          Building secure API platforms, async worker architectures (ARQ, Redis, Celery), and cloud web products across React, Next.js, FastAPI, Node.js, and Supabase.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={scrollToProjects}
            className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-sky-500 text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(56,189,248,0.35)] hover:shadow-[0_0_35px_rgba(56,189,248,0.5)] hover:scale-105 active:scale-95 transition-all"
          >
            <span>Explore Engineering Case Studies</span>
            <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </button>

          <a
            href={PERSONAL_INFO.resumePdf}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass-panel-interactive border-white/15 text-slate-100 font-semibold text-sm hover:border-sky-500/50 hover:text-sky-300 transition-all"
          >
            <Download className="w-4 h-4 text-sky-400" />
            <span>View Resume</span>
          </a>
        </motion.div>

        {/* Key Verified Metrics Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl"
        >
          <div className="glass-panel p-4 rounded-2xl border-white/5 text-left">
            <div className="text-2xl font-extrabold text-sky-400 font-mono-code mb-0.5">9.43 / 10</div>
            <div className="text-xs text-slate-400 font-medium">BE CSE CGPA</div>
          </div>
          <div className="glass-panel p-4 rounded-2xl border-white/5 text-left">
            <div className="text-2xl font-extrabold text-purple-400 font-mono-code mb-0.5">250+</div>
            <div className="text-xs text-slate-400 font-medium">LeetCode Solved</div>
          </div>
          <div className="glass-panel p-4 rounded-2xl border-white/5 text-left">
            <div className="text-2xl font-extrabold text-emerald-400 font-mono-code mb-0.5">Zero SSRF</div>
            <div className="text-xs text-slate-400 font-medium">Egress Security Guard</div>
          </div>
          <div className="glass-panel p-4 rounded-2xl border-white/5 text-left">
            <div className="text-2xl font-extrabold text-amber-400 font-mono-code mb-0.5">Deployed</div>
            <div className="text-xs text-slate-400 font-medium">Production Apps</div>
          </div>
        </motion.div>

        {/* Scroll Hint */}
        <div className="mt-16 flex flex-col items-center gap-2 text-slate-500 text-xs font-mono-code tracking-widest uppercase">
          <span>Scroll to Explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-sky-400" />
        </div>
      </div>
    </section>
  );
};
