import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ACHIEVEMENTS } from '../../data/portfolioData';
import { AchievementsCanvas } from '../3d/AchievementsCanvas';

export const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="relative py-16 sm:py-24 px-3.5 sm:px-4 max-w-6xl mx-auto">
      {/* Ambient background lighting */}
      <div className="absolute top-1/4 left-10 w-64 h-64 sm:w-80 sm:h-80 bg-sky-500/10 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] sm:text-xs font-mono-code text-amber-300 mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>05 // ACHIEVEMENTS & CREDENTIALS</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Verified Milestones
          </h2>
        </div>

        {/* 3D Interactive Trophy Canvas Focal Element */}
        <div className="w-28 h-28 xs:w-32 xs:h-32 md:w-40 md:h-40 mx-auto md:mx-0 flex-shrink-0">
          <AchievementsCanvas />
        </div>
      </div>

      {/* Achievements Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
        {ACHIEVEMENTS.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="glass-panel-interactive p-5 xs:p-6 rounded-2xl sm:rounded-3xl border-white/10 hover:border-amber-500/40 flex flex-col justify-between active:scale-[0.98]"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] sm:text-[11px] font-mono-code text-amber-300 font-semibold">
                  {item.category}
                </span>
                {item.highlight && (
                  <span className="text-[11px] sm:text-xs font-extrabold text-sky-400 font-mono-code">
                    {item.highlight}
                  </span>
                )}
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white mb-1">{item.title}</h3>
              <div className="text-[11px] sm:text-xs text-slate-400 font-mono-code mb-3">{item.organization}</div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {item.description}
              </p>
            </div>

            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 pt-3 border-t border-white/10 active:scale-95 transition-all"
              >
                <span>View LeetCode Verification</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </motion.div>
        ))}
      </div>

      {/* Selective Credentials Pill Strip */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl sm:rounded-3xl border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#080b18]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 flex-shrink-0">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-xs sm:text-sm">Selective Technical Credentials</h4>
            <p className="text-[11px] sm:text-xs text-slate-400">High-value verified engineering milestones</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-2.5 w-full md:w-auto">
          <div className="px-3 sm:px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono-code text-slate-200 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span>LeetCode 250+ DSA Solved</span>
          </div>
          <div className="px-3 sm:px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono-code text-slate-200 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span>ENMAZ cognitest.io Intern</span>
          </div>
          <div className="px-3 sm:px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono-code text-slate-200 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span>RNSIT BE CSE (CGPA 9.43)</span>
          </div>
        </div>
      </div>
    </section>
  );
};
