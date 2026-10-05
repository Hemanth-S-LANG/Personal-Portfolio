import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './components/ui/Navbar';
import { Hero } from './components/ui/Hero';
import { About } from './components/ui/About';
import { Experience } from './components/ui/Experience';
import { Projects } from './components/ui/Projects';
import { SkillsEcosystem } from './components/ui/SkillsEcosystem';
import { Achievements } from './components/ui/Achievements';
import { TerminalContact } from './components/ui/TerminalContact';
import { Footer } from './components/ui/Footer';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#040508] text-slate-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-white">
      {/* Top Fixed Floating Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <SkillsEcosystem />
        <Achievements />
        <TerminalContact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Vercel Analytics */}
      <Analytics />
    </div>
  );
};

export default App;
