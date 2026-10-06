import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, FileText, Menu, X } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' }
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 pt-3 sm:pt-6 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => scrollToSection('hero')}
          className="group flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full glass-panel border-white/10 hover:border-cyan-500/40 transition-all text-left active:scale-95"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform flex-shrink-0">
            <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div>
            <div className="font-bold text-xs sm:text-sm text-slate-100 tracking-tight flex items-center gap-1.5">
              HEMANTH S
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Available for engineering roles" />
            </div>
            <div className="text-[9px] sm:text-[10px] text-slate-400 font-mono-code leading-none">
              CS @ RNSIT
            </div>
          </div>
        </button>

        {/* Desktop Navigation Pill */}
        <nav className="hidden sm:flex items-center gap-1 p-1.5 rounded-full glass-panel border-white/10 shadow-2xl">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Buttons — visible on desktop alongside the nav pill */}
        <div className="hidden md:flex items-center gap-2.5">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            className="p-2.5 rounded-full glass-panel hover:text-cyan-400 border-white/10 hover:border-cyan-500/40 text-slate-300 transition-all"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2.5 rounded-full glass-panel hover:text-cyan-400 border-white/10 hover:border-cyan-500/40 text-slate-300 transition-all"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.resumePdf}
            download="Hemanth_S_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg hover:shadow-cyan-500/25 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            Resume
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="sm:hidden p-2.5 rounded-full glass-panel border-white/10 text-slate-200 hover:text-cyan-400 active:scale-95 transition-all"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Backdrop & Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Dark Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 sm:hidden"
            />

            {/* Floating Drawer Container */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative z-50 sm:hidden mt-3 max-w-6xl mx-auto rounded-3xl glass-panel p-5 border-white/15 shadow-2xl flex flex-col gap-4 bg-[#090c19]/95"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-mono-code text-cyan-400 font-bold uppercase tracking-wider">
                  Navigation Menu
                </span>
                <span className="text-[10px] font-mono-code text-slate-400">
                  {NAV_ITEMS.length} Sections
                </span>
              </div>

              {/* Grid of Navigation Items */}
              <div className="grid grid-cols-2 gap-2.5">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`px-4 py-3 rounded-2xl text-left text-xs font-medium border transition-all flex items-center justify-between active:scale-95 ${
                        isActive
                          ? 'bg-cyan-500/15 border-cyan-400/50 text-cyan-300 font-bold shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                          : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 hover:border-white/10'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />}
                    </button>
                  );
                })}
              </div>

              {/* Quick Action Footer in Drawer */}
              <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <a
                      href={PERSONAL_INFO.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub Profile"
                      className="p-3 rounded-2xl bg-white/5 border border-white/10 text-slate-300 hover:text-cyan-400 active:scale-95"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                    <a
                      href={PERSONAL_INFO.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn Profile"
                      className="p-3 rounded-2xl bg-white/5 border border-white/10 text-slate-300 hover:text-cyan-400 active:scale-95"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                  </div>

                  <a
                    href={PERSONAL_INFO.resumePdf}
                    download="Hemanth_S_Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-extrabold text-xs shadow-lg active:scale-95 transition-all"
                  >
                    <FileText className="w-4 h-4" />
                    Download Resume
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
