import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Cpu, Code2, Server, Award, Sparkles, BookOpen } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-24 px-4 max-w-6xl mx-auto">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono-code text-cyan-300 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>01 // ABOUT THE DEVELOPER</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Engineering Security & Scalability
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column — Detailed Bio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 text-cyan-400">
              <Code2 className="w-32 h-32" />
            </div>

            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              Who I Am & What I Build
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
              I am a <strong className="text-cyan-300 font-semibold">Computer Science & Engineering student at RNS Institute of Technology</strong> (CGPA 9.43 / 10) and a <strong className="text-cyan-300 font-semibold">Software Developer Intern at ENMAZ Engineering Services (cognitest.io)</strong>.
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
              My engineering focus centers on <strong className="text-white">API Security Hardening</strong>, <strong className="text-white">Distributed Asynchronous Systems</strong>, and <strong className="text-white">Full-Stack Application Architecture</strong>. Rather than just building standard web apps, I delve into low-level security mechanics—implementing IP-pinned egress validation against SSRF attacks, eliminating worker lock contention using Redis/ARQ task queues, and building real-time Server-Sent Events (SSE) pipelines.
            </p>

            <p className="text-slate-400 text-sm leading-relaxed">
              When I'm not securing production platforms, I participate actively in algorithmic problem solving (250+ solved on LeetCode) and build production platforms for active commercial clients (such as Sapthagiri Studio).
            </p>
          </div>

          {/* 3 Engineering Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-panel p-5 rounded-2xl border-white/5 hover:border-cyan-500/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-sm mb-1">API Security</h4>
              <p className="text-xs text-slate-400 leading-normal">
                Remediated SSRF vulnerabilities with DNS-rebinding protection and egress validation.
              </p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border-white/5 hover:border-purple-500/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-sm mb-1">Async Systems</h4>
              <p className="text-xs text-slate-400 leading-normal">
                Scalable worker clusters using ARQ, Redis, Celery, and LangGraph multi-agent DAGs.
              </p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border-white/5 hover:border-emerald-500/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
                <Server className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-sm mb-1">Full-Stack Web</h4>
              <p className="text-xs text-slate-400 leading-normal">
                Production web applications with Next.js, React, Express, MongoDB, and FastAPI.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Column — Education & Verified Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          {/* Education Card */}
          <div className="glass-panel p-6 rounded-3xl border-white/10 relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">RNS Institute of Technology</h3>
                <p className="text-xs text-slate-400 font-mono-code">Bangalore, India</p>
              </div>
            </div>

            <div className="space-y-2 border-t border-white/5 pt-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Degree</span>
                <span className="text-slate-200 font-medium">B.E. Computer Science</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Duration</span>
                <span className="text-slate-200 font-mono-code">Oct. 2024 – Dec. 2028</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Academic Standing</span>
                <span className="text-cyan-400 font-extrabold font-mono-code">CGPA 9.43 / 10</span>
              </div>
            </div>
          </div>

          {/* Algorithmic Metrics */}
          <div className="glass-panel p-6 rounded-3xl border-white/10">
            <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" />
              Algorithmic Problem Solving
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white/5 p-3.5 rounded-2xl border border-white/5">
                <div className="text-xl font-bold text-cyan-300 font-mono-code">250+</div>
                <div className="text-xs text-slate-400">LeetCode Solved</div>
              </div>
              <div className="bg-white/5 p-3.5 rounded-2xl border border-white/5">
                <div className="text-xl font-bold text-purple-300 font-mono-code">50+</div>
                <div className="text-xs text-slate-400">HackerRank Solved</div>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Core member of the <strong className="text-slate-200">BigO DSA Club</strong> at RNSIT, focusing on advanced Data Structures, Graph algorithms, Dynamic Programming, and System Design patterns.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
