import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowUpRight, Layers } from 'lucide-react';
import { PROJECTS } from '../../data/portfolioData';
import type { Project } from '../../types';
import { ProjectModal } from './ProjectModal';
import { ProjectCanvas } from '../3d/ProjectCanvas';
import { GithubIcon } from './Icons';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'Featured Case Studies', 'Security & AI', 'Full-Stack Web', 'Utility Apps'];

  const filteredProjects = PROJECTS.filter((p) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Featured Case Studies') return p.featured;
    return p.category === selectedCategory;
  });

  return (
    <section id="projects" className="relative py-24 px-4 max-w-6xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-purple-500/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono-code text-cyan-300 mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>03 // FEATURED CASE STUDIES & PROJECTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Architected Engineering Projects
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 bg-slate-950/60 p-1.5 rounded-2xl border border-white/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-black font-extrabold shadow-md'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="group relative glass-panel-interactive rounded-3xl p-6 sm:p-7 flex flex-col justify-between border-white/10 hover:border-cyan-500/40"
            >
              <div>
                {/* Top Bar inside Card */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-mono-code text-cyan-300">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-[10px] font-mono-code text-purple-300">
                        Featured Case Study
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-500 font-mono-code">{project.period}</span>
                </div>

                {/* 3D Visual Preview Canvas */}
                <div className="mb-5 relative group-hover:scale-[1.01] transition-transform">
                  <ProjectCanvas projectId={project.id} />
                </div>

                {/* Project Title & Subtitle */}
                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-1">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-400 font-mono-code mb-3">{project.subtitle}</p>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono-code text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="px-2 py-1 rounded-md bg-white/5 text-[11px] font-mono-code text-slate-500">
                      +{project.technologies.length - 5}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 group-hover:translate-x-1 transition-all"
                >
                  <span>Inspect Deep Case Study</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub Repository"
                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/30 transition-all"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Live Demo"
                      className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500 hover:text-black font-semibold transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Case Study Modal Drawer */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
