import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Layers, AlertCircle, Zap } from 'lucide-react';
import type { Project } from '../../types';
import { GithubIcon } from './Icons';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-[#090c19] border border-white/15 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 my-auto max-h-[92vh] sm:max-h-[90vh] flex flex-col"
        >
          {/* Top Bar / Header */}
          <div className="sticky top-0 z-20 flex items-center justify-between p-4 sm:p-6 bg-[#090c19]/95 backdrop-blur-md border-b border-white/10">
            <div className="max-w-[80%]">
              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] sm:text-xs font-mono-code text-cyan-300">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-[10px] sm:text-xs font-mono-code text-purple-300">
                    Featured Case Study
                  </span>
                )}
              </div>
              <h3 className="text-lg sm:text-2xl font-extrabold text-white truncate">{project.title}</h3>
              <p className="text-[11px] sm:text-xs text-slate-400 font-mono-code truncate">{project.subtitle}</p>
            </div>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-2.5 rounded-full bg-white/10 border border-white/15 text-slate-200 hover:text-white hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center min-w-[40px] min-h-[40px]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body Content */}
          <div className="p-4 sm:p-8 overflow-y-auto space-y-6 sm:space-y-8 flex-1">
            {/* Quick Links Header */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono-code text-cyan-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200 hover:text-cyan-300 active:scale-95 transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-extrabold text-xs shadow-lg active:scale-95 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>

            {/* Metrics Grid */}
            {project.metrics && project.metrics.length > 0 && (
              <div>
                <h4 className="text-[11px] sm:text-xs font-mono-code text-slate-400 uppercase tracking-widest mb-3">
                  Verified Engineering Metrics
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="p-3.5 sm:p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20">
                      <div className="text-base sm:text-lg font-extrabold text-cyan-400 font-mono-code">{m.value}</div>
                      <div className="text-[11px] sm:text-xs text-slate-400 mt-1">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Problem & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  The Problem
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 space-y-2">
                <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  Engineered Solution
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Technical Architecture */}
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-3.5 flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" />
                Technical Architecture Breakdown
              </h4>
              <div className="space-y-2.5 sm:space-y-3">
                {project.architecture.map((arch, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3"
                  >
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-purple-500/20 text-purple-300 font-mono-code font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {arch}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Contributions & Highlights */}
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-3.5 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Personal Contributions & Highlights
              </h4>
              <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
                {project.keyHighlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 sm:p-3.5 rounded-xl bg-white/5 border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-200">{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Challenges & Impact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-2">
              <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10">
                <h5 className="font-bold text-slate-200 text-xs uppercase tracking-wider mb-2 font-mono-code">
                  Key Technical Challenges Overcome
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {project.challenges}
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
                <h5 className="font-bold text-emerald-300 text-xs uppercase tracking-wider mb-2 font-mono-code">
                  Real Impact & Verified Results
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {project.impact}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
