import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Mail, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';

interface TerminalLog {
  command: string;
  output: React.ReactNode;
}

export const TerminalContact: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<TerminalLog[]>([
    {
      command: 'connect --interactive',
      output: (
        <div className="text-sky-300 font-mono-code text-xs space-y-1">
          <div>[SYSTEM OK] Connection established to Hemanth S engineering console.</div>
          <div className="text-slate-400">Type <span className="text-yellow-300 font-bold">'help'</span> for available commands, or click quick action chips below.</div>
        </div>
      )
    }
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    let outputNode: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        outputNode = (
          <div className="text-xs font-mono-code text-slate-300 space-y-1">
            <div>Available Commands:</div>
            <div><span className="text-sky-400 font-bold">contact</span>   - Displays email and direct messaging channels.</div>
            <div><span className="text-sky-400 font-bold">resume</span>    - Opens/downloads official PDF resume.</div>
            <div><span className="text-sky-400 font-bold">skills</span>    - Outputs core technology stack.</div>
            <div><span className="text-sky-400 font-bold">socials</span>   - Outputs GitHub and LinkedIn profile links.</div>
            <div><span className="text-sky-400 font-bold">clear</span>     - Clears the terminal screen.</div>
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="text-xs font-mono-code text-slate-300 space-y-1">
            <div>Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sky-400 underline">{PERSONAL_INFO.email}</a></div>
            <div>Location: <span>{PERSONAL_INFO.location}</span></div>
          </div>
        );
        break;

      case 'resume':
        window.open(PERSONAL_INFO.resumePdf, '_blank');
        outputNode = <div className="text-xs font-mono-code text-emerald-400">Opening official resume PDF...</div>;
        break;

      case 'skills':
        outputNode = (
          <div className="text-xs font-mono-code text-slate-300">
            FastAPI, React.js, Next.js, Express.js, TypeScript, Python, Redis, ARQ, Celery, LangGraph, Supabase, PostgreSQL, MongoDB, Docker, SSRF Security.
          </div>
        );
        break;

      case 'socials':
        outputNode = (
          <div className="text-xs font-mono-code text-slate-300 space-y-1">
            <div>GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-sky-400 underline">{PERSONAL_INFO.github}</a></div>
            <div>LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-sky-400 underline">{PERSONAL_INFO.linkedin}</a></div>
          </div>
        );
        break;

      case 'clear':
        setLogs([]);
        setInputVal('');
        return;

      default:
        outputNode = (
          <div className="text-xs font-mono-code text-red-400">
            Command not recognized: '{cmd}'. Type <span className="text-yellow-300 font-bold">'help'</span> for command menu.
          </div>
        );
        break;
    }

    setLogs((prev) => [...prev, { command: cmd, output: outputNode }]);
    setInputVal('');
  };


  return (
    <section id="contact" className="relative py-16 sm:py-24 px-3.5 sm:px-4 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="mb-10 sm:mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-[11px] sm:text-xs font-mono-code text-sky-300 mb-3">
          <TerminalIcon className="w-3.5 h-3.5" />
          <span>06 // INITIATE DIRECT CONTACT</span>
        </div>
        <h2 className="text-2xl xs:text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Let's Build Together
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto px-2">
          Available for software engineering roles, full-stack internships, and technical collaboration.
        </p>
      </div>

      {/* Developer Terminal Interface (Full Width Centered) */}
      <div className="glass-panel rounded-2xl sm:rounded-3xl border-white/15 bg-[#050711] overflow-hidden shadow-2xl">
        {/* Terminal Window Top Bar */}
        <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-[#0b0e1e] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80 inline-block" />
            <span className="ml-1.5 sm:ml-2 text-[11px] sm:text-xs font-mono-code text-slate-400">hemanth@portfolio:~</span>
          </div>
          <span className="text-[9px] sm:text-[10px] font-mono-code text-sky-400/70">bash v5.2</span>
        </div>

        {/* Terminal History Output */}
        <div className="p-4 sm:p-6 font-mono-code text-[11px] sm:text-xs space-y-3.5 sm:space-y-4 max-h-[300px] sm:max-h-[360px] overflow-y-auto">
          {logs.map((log, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-sky-400 font-bold">hemanth@portfolio:~$</span>
                <span className="text-white">{log.command}</span>
              </div>
              <div className="pl-3 sm:pl-4">{log.output}</div>
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Command Input Form */}
        <form onSubmit={handleCommandSubmit} className="p-3 sm:p-4 bg-[#080b18] border-t border-white/10 flex items-center gap-2">
          <span className="text-sky-400 font-mono-code font-bold text-xs flex-shrink-0">hemanth@portfolio:~$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
            placeholder="type 'help', 'contact', 'resume', 'skills', or 'clear'..."
            className="flex-1 min-w-0 bg-transparent text-xs font-mono-code text-white outline-none placeholder:text-slate-600"
          />
          <button type="submit" aria-label="Execute command" className="px-3 py-1.5 rounded-lg bg-sky-500/20 text-sky-300 text-xs font-mono-code hover:bg-sky-500 hover:text-black active:scale-95 transition-all flex-shrink-0">
            Enter
          </button>
        </form>

        {/* Quick Action Chips */}
        <div className="p-3 sm:p-4 bg-[#050711] border-t border-white/5 grid grid-cols-1 xs:grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2 sm:gap-2.5">
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono-code text-sky-300 hover:bg-sky-500 hover:text-black active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Mail className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Email Me</span>
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono-code text-slate-200 hover:text-sky-300 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <LinkedinIcon className="w-3.5 h-3.5 flex-shrink-0" />
            <span>LinkedIn</span>
          </a>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono-code text-slate-200 hover:text-sky-300 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <GithubIcon className="w-3.5 h-3.5 flex-shrink-0" />
            <span>GitHub</span>
          </a>
          <a
            href={PERSONAL_INFO.resumePdf}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono-code text-slate-200 hover:text-sky-300 active:scale-95 transition-all flex items-center justify-center gap-2 col-span-1 xs:col-span-2 sm:col-span-1"
          >
            <FileText className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Download Resume</span>
          </a>
        </div>
      </div>
    </section>
  );
};
