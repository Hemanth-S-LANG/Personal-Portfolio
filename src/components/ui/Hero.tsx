import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Download, ChevronDown } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

// Lazy-load the heavy Three.js canvas — doesn't block the initial HTML render
const HeroCanvas = lazy(() =>
  import('../3d/HeroCanvas').then((m) => ({ default: m.HeroCanvas }))
);

// Shown instantly while Three.js is downloading — a pulsing orb so the
// section never looks empty or white
const HeroCanvasPlaceholder: React.FC = () => (
  <div className="absolute inset-0 w-full h-full pointer-events-none z-0 flex items-center justify-center overflow-hidden">
    {/* Outer slow-pulse ring */}
    <div className="absolute w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] rounded-full border border-sky-500/20 animate-pulse" />
    {/* Middle glow orb */}
    <div
      className="absolute w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] rounded-full"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(122,60,255,0.18) 0%, rgba(0,240,255,0.10) 55%, transparent 75%)',
        animation: 'heroPulse 2.4s ease-in-out infinite',
      }}
    />
    {/* Inner core bright dot */}
    <div
      className="absolute w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] rounded-full"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(0,240,255,0.22) 0%, transparent 70%)',
        animation: 'heroPulse 2.4s ease-in-out infinite 0.4s',
      }}
    />
  </div>
);

export const Hero: React.FC = () => {
  const scrollToProjects = () => {
    const projectsEl = document.getElementById('projects');
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center pt-24 xs:pt-28 pb-12 sm:pb-16 px-3.5 sm:px-4 overflow-hidden">
      {/* 3D Background Focal Canvas — lazy loaded, placeholder shown instantly */}
      <Suspense fallback={<HeroCanvasPlaceholder />}>
        <HeroCanvas />
      </Suspense>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-950/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center w-full">
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex flex-wrap items-center justify-center gap-1.5 xs:gap-2.5 px-3 py-1.5 xs:px-4 xs:py-1.5 rounded-full glass-panel border-sky-500/25 text-[11px] xs:text-xs font-mono-code text-sky-300 mb-5 sm:mb-6 shadow-lg text-center"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          <span>Software Developer Intern @ cognitest.io</span>
          <span className="hidden xs:inline text-slate-600">•</span>
          <span className="text-slate-300">RNSIT CGPA 9.43</span>
        </motion.div>

        {/* Main Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl xs:text-6xl sm:text-7xl font-extrabold tracking-tight text-white mb-3 leading-tight sm:leading-none"
        >
          HEMANTH S
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg xs:text-xl sm:text-2xl font-semibold text-slate-200 max-w-3xl mb-4 tracking-wide px-2"
        >
          Full-Stack Developer & Security Engineer
        </motion.p>

        {/* Human bio paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xs xs:text-sm sm:text-base text-slate-400 max-w-2xl mb-8 sm:mb-10 leading-relaxed font-normal px-2"
        >
          Building secure API platforms, async worker architectures (ARQ, Redis), and cloud web products across React, Next.js, FastAPI, Node.js, and PostgreSQL.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col xs:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 w-full max-w-md xs:max-w-none px-2"
        >
          <button
            onClick={scrollToProjects}
            className="w-full xs:w-auto group relative inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-sky-500 text-slate-950 font-bold text-xs sm:text-sm shadow-[0_0_25px_rgba(56,189,248,0.35)] hover:shadow-[0_0_35px_rgba(56,189,248,0.5)] active:scale-95 transition-all"
          >
            <span>Explore Engineering Case Studies</span>
            <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </button>

          <a
            href={PERSONAL_INFO.resumePdf}
            download="Hemanth_S_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="w-full xs:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full glass-panel-interactive border-white/15 text-slate-100 font-semibold text-xs sm:text-sm hover:border-sky-500/50 hover:text-sky-300 active:scale-95 transition-all"
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
          className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-4xl px-2"
        >
          <div className="glass-panel p-3.5 sm:p-4 rounded-2xl border-white/5 text-left">
            <div className="text-xl xs:text-2xl font-extrabold text-sky-400 font-mono-code mb-0.5">9.43 / 10</div>
            <div className="text-[11px] sm:text-xs text-slate-400 font-medium">BE CSE CGPA</div>
          </div>
          <div className="glass-panel p-3.5 sm:p-4 rounded-2xl border-white/5 text-left">
            <div className="text-xl xs:text-2xl font-extrabold text-purple-400 font-mono-code mb-0.5">250+</div>
            <div className="text-[11px] sm:text-xs text-slate-400 font-medium">LeetCode Solved</div>
          </div>
          <div className="glass-panel p-3.5 sm:p-4 rounded-2xl border-white/5 text-left">
            <div className="text-xl xs:text-2xl font-extrabold text-emerald-400 font-mono-code mb-0.5">Zero SSRF</div>
            <div className="text-[11px] sm:text-xs text-slate-400 font-medium">Egress Security Guard</div>
          </div>
          <div className="glass-panel p-3.5 sm:p-4 rounded-2xl border-white/5 text-left">
            <div className="text-xl xs:text-2xl font-extrabold text-amber-400 font-mono-code mb-0.5">Deployed</div>
            <div className="text-[11px] sm:text-xs text-slate-400 font-medium">Production Apps</div>
          </div>
        </motion.div>

        {/* Scroll Hint */}
        <div className="mt-12 sm:mt-16 flex flex-col items-center gap-2 text-slate-500 text-[11px] sm:text-xs font-mono-code tracking-widest uppercase">
          <span>Scroll to Explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-sky-400" />
        </div>
      </div>
    </section>
  );
};
