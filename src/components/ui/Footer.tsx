import React, { useState, useEffect } from 'react';
import { FileText, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';
import { FooterCanvas } from '../3d/FooterCanvas';

export const Footer: React.FC = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setTime(now.toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#040508] py-16 px-4 overflow-hidden">
      {/* 3D Interactive Footer Background Canvas */}
      <FooterCanvas />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side — Logo & Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="font-extrabold text-lg text-white tracking-tight flex items-center gap-2">
            HEMANTH S
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          </div>
          <p className="text-xs text-slate-400 max-w-sm mt-1">
            Full-stack software developer & security engineer. Crafted with precision, WebGL & React.
          </p>
        </div>

        {/* Middle — Live IST Clock & Status */}
        <div className="flex flex-col items-center text-xs font-mono-code text-slate-400 bg-white/5 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 shadow-lg">
          <div className="flex items-center gap-2 text-sky-300 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>IST (Bangalore): {time || '12:00:00 AM'}</span>
          </div>
          <div className="text-[10px] text-slate-400">Available for Internships & Engineering Roles</div>
        </div>

        {/* Right Side — Links & Scroll To Top */}
        <div className="flex items-center gap-4">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            className="p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-sky-400 hover:border-sky-500/30 transition-all"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-sky-400 hover:border-sky-500/30 transition-all"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.resumePdf}
            target="_blank"
            rel="noreferrer"
            aria-label="Resume PDF"
            className="p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-sky-400 hover:border-sky-500/30 transition-all"
          >
            <FileText className="w-4 h-4" />
          </a>
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="p-2.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 hover:bg-sky-500 hover:text-black transition-all shadow-md"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono-code">
        <div>© {new Date().getFullYear()} Hemanth S. All rights reserved.</div>
        <div>Engineered with React 19, TypeScript, Tailwind CSS & Three.js WebGL</div>
      </div>
    </footer>
  );
};
