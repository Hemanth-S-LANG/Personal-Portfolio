import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, CheckCircle2, ExternalLink } from 'lucide-react';
import { EXPERIENCES } from '../../data/portfolioData';

export const Experience: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<'all' | 'security' | 'async' | 'analytics'>('all');

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const exp = EXPERIENCES[0]; // ENMAZ / cognitest.io

  return (
    <section id="experience" className="relative py-16 sm:py-24 px-3.5 sm:px-4 max-w-6xl mx-auto">
      {/* Section Title */}
      <div className="mb-10 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-[11px] sm:text-xs font-mono-code text-purple-300 mb-3">
          <Briefcase className="w-3.5 h-3.5" />
          <span>02 // WORK EXPERIENCE & INTERNSHIPS</span>
        </div>
        <h2 className="text-2xl xs:text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Production Internship Track
        </h2>
      </div>

      {/* Main Experience Card */}
      <div className="relative border-l-2 border-cyan-500/30 ml-2.5 sm:ml-8 pl-4 sm:pl-10 space-y-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative group"
        >
          {/* Timeline Dot Indicator */}
          <div className="absolute -left-[23px] sm:-left-[47px] top-1.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.6)]">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 animate-pulse" />
          </div>

          <div className="glass-panel p-4 xs:p-6 sm:p-8 rounded-2xl sm:rounded-3xl border-white/10 hover:border-cyan-500/40 transition-all shadow-xl">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] sm:text-xs font-mono-code text-cyan-300">
                    Active Internship
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-[11px] sm:text-xs text-slate-400 flex items-center gap-1 font-mono-code">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    {exp.location}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{exp.role}</h3>
                <div className="text-sm sm:text-base text-cyan-400 font-semibold flex items-center gap-2 mt-0.5">
                  <span>{exp.company}</span>
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xl bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono-code text-slate-300 self-start">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>{exp.period}</span>
              </div>
            </div>

            {/* Summary bullet */}
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">
              {exp.summary}
            </p>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-6">
              {exp.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 sm:px-3 rounded-lg bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono-code text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Progressive Disclosure Toggle */}
            <button
              onClick={() => toggleExpand(0)}
              className="flex items-center justify-between gap-2 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs font-bold text-cyan-300 hover:bg-cyan-500/20 active:scale-[0.98] transition-all w-full text-left"
            >
              <span>{expandedIndex === 0 ? 'Hide Detailed Technical Work' : 'Inspect Technical Accomplishments & Security Architecture'}</span>
              {expandedIndex === 0 ? <ChevronUp className="w-4 h-4 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 flex-shrink-0" />}
            </button>

            {/* Expanded Content Drawer */}
            <AnimatePresence>
              {expandedIndex === 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden pt-5 sm:pt-6"
                >
                  {/* Category Filter Pills (Horizontal scrollable track on mobile) */}
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-4 sm:mb-6 w-full">
                    <button
                      onClick={() => setActiveTab('all')}
                      className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-medium whitespace-nowrap transition-all ${
                        activeTab === 'all'
                          ? 'bg-cyan-500 text-black font-extrabold'
                          : 'bg-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      All Achievements
                    </button>
                    <button
                      onClick={() => setActiveTab('security')}
                      className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-medium whitespace-nowrap transition-all ${
                        activeTab === 'security'
                          ? 'bg-cyan-500 text-black font-extrabold'
                          : 'bg-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      SSRF & Security Hardening
                    </button>
                    <button
                      onClick={() => setActiveTab('async')}
                      className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-medium whitespace-nowrap transition-all ${
                        activeTab === 'async'
                          ? 'bg-cyan-500 text-black font-extrabold'
                          : 'bg-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      Async Queue Scaling (ARQ + Redis)
                    </button>
                    <button
                      onClick={() => setActiveTab('analytics')}
                      className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-medium whitespace-nowrap transition-all ${
                        activeTab === 'analytics'
                          ? 'bg-cyan-500 text-black font-extrabold'
                          : 'bg-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      LLM Token Analytics & Dashboard
                    </button>
                  </div>

                  {/* Achievements List */}
                  <div className="space-y-3 sm:space-y-4">
                    {exp.achievements.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/20 transition-all"
                      >
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Architecture Takeaway Summary Box */}
                  <div className="mt-5 sm:mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-purple-950/30 to-slate-900/60 border border-cyan-500/30">
                    <h4 className="text-[11px] sm:text-xs font-bold font-mono-code text-cyan-300 uppercase tracking-wider mb-2">
                      Key Engineering Takeaways
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Remediated zero-day SSRF risks, eliminated rate limiter database contention by moving to async worker pools (ARQ + Redis), established hard LLM token spend guardrails, and upgraded response integrity with Anthropic SDK structured outputs.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
