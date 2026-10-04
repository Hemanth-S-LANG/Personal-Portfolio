import React, { useState } from 'react';
import { Cpu, Link2, ArrowRight, LayoutGrid, Radio } from 'lucide-react';
import { SKILL_CATEGORIES, PROJECTS } from '../../data/portfolioData';
import {
  TypeScriptIcon,
  ReactIcon,
  PythonIcon,
  FastAPIIcon,
  SupabaseIcon,
  NodeIcon,
  NextIcon,
  TailwindIcon,
  PostgresIcon,
  MongoIcon,
  RedisIcon,
  ViteIcon,
  DockerIcon,
  GithubIcon
} from './Icons';

interface TechFlashCard {
  name: string;
  icon: React.ReactNode;
  projectsUsed: string[];
}

const TECH_FLASH_CARDS_ROW1: TechFlashCard[] = [
  { name: 'TypeScript', icon: <TypeScriptIcon className="w-4 h-4" />, projectsUsed: ['cognitest', 'my-notes-hub', 'pixel-frame'] },
  { name: 'React.js', icon: <ReactIcon className="w-4 h-4 text-sky-400" />, projectsUsed: ['cognitest', 'my-notes-hub', 'multi-agent-ai', 'password-manager', 'weather-app', 'currency-converter'] },
  { name: 'FastAPI', icon: <FastAPIIcon className="w-4 h-4" />, projectsUsed: ['cognitest', 'multi-agent-ai'] },
  { name: 'Supabase', icon: <SupabaseIcon className="w-4 h-4" />, projectsUsed: ['my-notes-hub'] },
  { name: 'Vite', icon: <ViteIcon className="w-4 h-4" />, projectsUsed: ['my-notes-hub'] },
  { name: 'Python', icon: <PythonIcon className="w-4 h-4" />, projectsUsed: ['cognitest', 'multi-agent-ai'] },
  { name: 'Tailwind CSS', icon: <TailwindIcon className="w-4 h-4" />, projectsUsed: ['cognitest', 'my-notes-hub', 'pixel-frame', 'multi-agent-ai', 'password-manager'] },
  { name: 'PostgreSQL', icon: <PostgresIcon className="w-4 h-4" />, projectsUsed: ['cognitest', 'my-notes-hub'] }
];

const TECH_FLASH_CARDS_ROW2: TechFlashCard[] = [
  { name: 'Node.js', icon: <NodeIcon className="w-4 h-4" />, projectsUsed: ['pixel-frame', 'password-manager'] },
  { name: 'Next.js', icon: <NextIcon className="w-4 h-4" />, projectsUsed: ['pixel-frame'] },
  { name: 'MongoDB', icon: <MongoIcon className="w-4 h-4" />, projectsUsed: ['pixel-frame', 'password-manager'] },
  { name: 'Redis', icon: <RedisIcon className="w-4 h-4" />, projectsUsed: ['cognitest', 'multi-agent-ai'] },
  { name: 'Express.js', icon: <NodeIcon className="w-4 h-4 text-emerald-400" />, projectsUsed: ['pixel-frame', 'password-manager'] },
  { name: 'Docker', icon: <DockerIcon className="w-4 h-4" />, projectsUsed: ['cognitest'] },
  { name: 'Git & GitHub', icon: <GithubIcon className="w-4 h-4" />, projectsUsed: ['cognitest', 'my-notes-hub', 'pixel-frame', 'multi-agent-ai', 'password-manager', 'weather-app', 'currency-converter', 'browser-battle'] },
  { name: 'JavaScript', icon: <TypeScriptIcon className="w-4 h-4 text-yellow-400" />, projectsUsed: ['cognitest', 'my-notes-hub', 'pixel-frame', 'password-manager', 'weather-app', 'currency-converter', 'browser-battle'] }
];

export const SkillsEcosystem: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [highlightedProjectIds, setHighlightedProjectIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'marquee' | 'grid'>('marquee');

  const handleMouseEnterSkill = (skillName: string, projectIds: string[]) => {
    setHoveredSkill(skillName);
    setHighlightedProjectIds(projectIds);
  };

  const handleMouseLeaveSkill = () => {
    setHoveredSkill(null);
    setHighlightedProjectIds([]);
  };

  return (
    <section id="skills" className="relative py-24 px-4 max-w-6xl mx-auto">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-sky-500/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-xs font-mono-code text-sky-300 mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>04 // TECHNICAL ECOSYSTEM</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Technologies & Tools
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Hover over any moving technology card to inspect the production projects where I used it.
          </p>
        </div>

        {/* View Switcher Controls */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-2xl border border-white/10">
          <button
            onClick={() => setViewMode('marquee')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono-code flex items-center gap-1.5 transition-all ${
              viewMode === 'marquee'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            Moving Cards Track
          </button>

          <button
            onClick={() => setViewMode('grid')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono-code flex items-center gap-1.5 transition-all ${
              viewMode === 'grid'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Category Grid
          </button>
        </div>
      </div>

      {viewMode === 'marquee' ? (
        /* --- MOVING FLASH CARDS MARQUEE TRACK (User Requested Visual) --- */
        <div className="space-y-6">
          {/* Row 1 — Moving Left */}
          <div className="relative overflow-hidden py-3 group">
            <div className="flex w-max gap-4 animate-marquee group-hover:[animation-play-state:paused]">
              {[...TECH_FLASH_CARDS_ROW1, ...TECH_FLASH_CARDS_ROW1, ...TECH_FLASH_CARDS_ROW1].map((card, idx) => {
                const isHovered = hoveredSkill === card.name;
                return (
                  <button
                    key={`${card.name}-${idx}`}
                    onMouseEnter={() => handleMouseEnterSkill(card.name, card.projectsUsed)}
                    onMouseLeave={handleMouseLeaveSkill}
                    className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl border text-xs sm:text-sm font-medium font-mono-code transition-all duration-200 shadow-md ${
                      isHovered
                        ? 'bg-sky-500 text-slate-950 font-extrabold border-sky-400 scale-105 shadow-[0_0_20px_rgba(56,189,248,0.4)]'
                        : 'bg-[#0b0e18]/80 border-white/10 text-slate-200 hover:border-sky-400/50 hover:bg-[#121727]'
                    }`}
                  >
                    <span className="flex-shrink-0">{card.icon}</span>
                    <span>{card.name}</span>
                    {card.projectsUsed.length > 0 && (
                      <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-sky-500/10 text-sky-300 font-bold">
                        {card.projectsUsed.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 2 — Moving Right */}
          <div className="relative overflow-hidden py-3 group">
            <div className="flex w-max gap-4 animate-marquee-reverse group-hover:[animation-play-state:paused]">
              {[...TECH_FLASH_CARDS_ROW2, ...TECH_FLASH_CARDS_ROW2, ...TECH_FLASH_CARDS_ROW2].map((card, idx) => {
                const isHovered = hoveredSkill === card.name;
                return (
                  <button
                    key={`${card.name}-${idx}`}
                    onMouseEnter={() => handleMouseEnterSkill(card.name, card.projectsUsed)}
                    onMouseLeave={handleMouseLeaveSkill}
                    className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl border text-xs sm:text-sm font-medium font-mono-code transition-all duration-200 shadow-md ${
                      isHovered
                        ? 'bg-purple-500 text-slate-950 font-extrabold border-purple-400 scale-105 shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                        : 'bg-[#0b0e18]/80 border-white/10 text-slate-200 hover:border-purple-400/50 hover:bg-[#121727]'
                    }`}
                  >
                    <span className="flex-shrink-0">{card.icon}</span>
                    <span>{card.name}</span>
                    {card.projectsUsed.length > 0 && (
                      <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-purple-500/10 text-purple-300 font-bold">
                        {card.projectsUsed.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* --- CATEGORIZED GRID VIEW --- */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((cat) => (
            <div
              key={cat.title}
              className="glass-panel p-6 rounded-3xl border-white/10 hover:border-white/20 transition-all"
            >
              <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                {cat.title}
              </h3>
              <p className="text-xs text-slate-400 mb-4">{cat.description}</p>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => {
                  const isHovered = hoveredSkill === skill.name;
                  return (
                    <button
                      key={skill.name}
                      onMouseEnter={() => handleMouseEnterSkill(skill.name, skill.projectsUsed)}
                      onMouseLeave={handleMouseLeaveSkill}
                      className={`px-3.5 py-2 rounded-xl text-xs font-mono-code border transition-all ${
                        isHovered
                          ? 'bg-sky-500 text-slate-950 font-extrabold border-sky-400 scale-105'
                          : 'bg-white/5 border-white/10 text-slate-200 hover:border-sky-500/40'
                      }`}
                    >
                      {skill.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Hover Evidence Trace Box */}
      <div className="mt-10 glass-panel p-6 rounded-3xl border-white/10 bg-[#090c19]/90 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 flex-shrink-0">
            <Link2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono-code text-sky-400 uppercase tracking-widest">
              Evidence Traceability
            </div>
            {hoveredSkill ? (
              <div className="text-sm font-bold text-white">
                <span className="text-sky-400">{hoveredSkill}</span> is verified in {highlightedProjectIds.length} project(s)
              </div>
            ) : (
              <div className="text-xs text-slate-400">
                Hover over any moving technology card above to inspect verified code implementation.
              </div>
            )}
          </div>
        </div>

        {hoveredSkill && highlightedProjectIds.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {highlightedProjectIds.map((projId) => {
              const proj = PROJECTS.find((p) => p.id === projId);
              if (!proj) return null;
              return (
                <div
                  key={projId}
                  className="px-3 py-1.5 rounded-xl bg-sky-950/40 border border-sky-500/30 text-xs font-mono-code text-white flex items-center gap-2"
                >
                  <span>{proj.title}</span>
                  <ArrowRight className="w-3 h-3 text-sky-400" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
