import React from 'react';

export const GithubIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export const LinkedinIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
  </svg>
);

// --- Tech Logos ---
export const ReactIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(0 12 12)" stroke="#38bdf8" />
    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" stroke="#38bdf8" />
    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" stroke="#38bdf8" />
    <circle cx="12" cy="12" r="2" fill="#38bdf8" />
  </svg>
);

export const TypeScriptIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fill="#3178c6" d="M3 3h18v18H3V3z" />
    <path fill="#fff" d="M12.5 11.5h-2v7h-2.2v-7h-2V9.7h6.2v1.8zm6.5 4.8c0 1.6-1.3 2.7-3.3 2.7-2.1 0-3.3-1.2-3.3-2.6h2c0 .6.5 1.1 1.3 1.1s1.2-.4 1.2-.9c0-.6-.4-.8-1.5-1.1-1.7-.5-2.8-1.1-2.8-2.6 0-1.5 1.2-2.6 3.1-2.6 1.8 0 3 .9 3.1 2.3h-2c-.1-.5-.5-.8-1.1-.8s-1 .3-1 .8c0 .5.3.7 1.4 1 1.8.5 2.9 1.1 2.9 2.7z" />
  </svg>
);

export const PythonIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fill="#3776ab" d="M11.9 2c-5.2 0-4.9 2.3-4.9 2.3v2.3h5v.7H5.1s-3.1-.3-3.1 4.9c0 5.2 2.7 5 2.7 5h1.6v-2.3s-.1-2.7 2.7-2.7h4.7s2.6 0 2.6-2.6V4.6S16.9 2 11.9 2zm-1.4 1.5c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z" />
    <path fill="#ffd43b" d="M12.1 22c5.2 0 4.9-2.3 4.9-2.3v-2.3h-5v-.7h6.9s3.1.3 3.1-4.9c0-5.2-2.7-5-2.7-5h-1.6v2.3s.1 2.7-2.7 2.7h-4.7s-2.6 0-2.6 2.6v4.7s-.2 2.6 4.8 2.6zm1.4-1.5c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z" />
  </svg>
);

export const FastAPIIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10" fill="#059669" />
    <path fill="#fff" d="M12 4l-1.5 7.5h4L11 20l1.5-7.5h-4L12 4z" />
  </svg>
);

export const SupabaseIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fill="#3ecf8e" d="M13.3 2.1a1 1 0 0 0-1.6 0L2.3 14.5a1 1 0 0 0 .8 1.6h8.4v5.8a1 1 0 0 0 1.6.8l9.4-12.4a1 1 0 0 0-.8-1.6h-8.4V2.1z" />
  </svg>
);

export const NodeIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fill="#539e43" d="M12 2L2 7.7v11.5L12 25l10-5.8V7.7L12 2zm-1 16.5l-4-2.3v-4.6l4 2.3v4.6zm6-3.5l-4 2.3v-4.6l4-2.3v4.6z" />
  </svg>
);

export const NextIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10" fill="#000" stroke="#fff" strokeWidth="1" />
    <path fill="#fff" d="M15 8h2v8h-2V8zm-6 0h2.2l4.8 6.4V8h1.8v8H15.6L10.8 9.6V16H9V8z" />
  </svg>
);

export const TailwindIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fill="#38bdf8" d="M12 6c-3.3 0-5.5 1.7-6.6 5 1.1-1.7 2.5-2.2 4.1-1.7 1 0 1.7.7 2.5 1.6C13.2 12.2 14.7 14 18 14c3.3 0 5.5-1.7 6.6-5-1.1 1.7-2.5 2.2-4.1 1.7-1 0-1.7-.7-2.5-1.6C16.8 7.8 15.3 6 12 6zm-6 8c-3.3 0-5.5 1.7-6.6 5 1.1-1.7 2.5-2.2 4.1-1.7 1 0 1.7.7 2.5 1.6C7.2 20.2 8.7 22 12 22c3.3 0 5.5-1.7 6.6-5-1.1 1.7-2.5 2.2-4.1 1.7-1 0-1.7-.7-2.5-1.6C9.8 15.8 8.3 14 5 14z" />
  </svg>
);

export const PostgresIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fill="#336791" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 17c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z" />
  </svg>
);

export const MongoIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fill="#47a248" d="M12 2s-4 4.5-4 10c0 4.4 2.5 7.5 4 10 1.5-2.5 4-5.6 4-10 0-5.5-4-10-4-10z" />
  </svg>
);

export const RedisIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fill="#dc382d" d="M4 6l8-4 8 4v12l-8 4-8-4V6z" />
  </svg>
);

export const ViteIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fill="#646cff" d="M21.5 4.3L12.5 21 3.5 4.3l4.8-.8 4.2 8.7 4.2-8.7z" />
  </svg>
);

export const DockerIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fill="#2496ed" d="M13 10h3v3h-3v-3zm-4 0h3v3H9v-3zm-4 0h3v3H5v-3zm4-4h3v3H9V6zm4 0h3v3h-3V6zm-8 4h3v3H5v-3zm0 4h14v2H5v-2z" />
  </svg>
);
