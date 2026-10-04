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
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 sm:pt-6 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => scrollToSection('hero')}
          className="group flex items-center gap-2.5 px-3.5 py-2 rounded-full glass-panel border-white/10 hover:border-cyan-500/40 transition-all text-left"
        >
          <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-sm text-slate-100 tracking-tight flex items-center gap-1.5">
              HEMANTH S
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Available for engineering roles" />
            </div>
            <div className="text-[10px] text-slate-400 font-mono-code leading-none">
              CS @ RNSIT
            </div>
          </div>
        </button>

        {/* Desktop Navigation Pill */}
        <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full glass-panel border-white/10 shadow-2xl">
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

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
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
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg hover:shadow-cyan-500/25 hover:scale-[1.02] transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            Resume
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="md:hidden p-2.5 rounded-full glass-panel border-white/10 text-slate-200 hover:text-cyan-400"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-3 max-w-6xl mx-auto rounded-2xl glass-panel p-5 border-white/10 shadow-2xl flex flex-col gap-3"
          >
            <div className="grid grid-cols-2 gap-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2.5 rounded-xl text-left text-xs font-medium border transition-all ${
                    activeSection === item.id
                      ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 font-semibold'
                      : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-cyan-400"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-cyan-400"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
              <a
                href={PERSONAL_INFO.resumePdf}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-black font-semibold text-xs"
              >
                <FileText className="w-4 h-4" />
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
