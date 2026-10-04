export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Security & AI' | 'Full-Stack Web' | 'Utility Apps';
  featured: boolean;
  period: string;
  role?: string;
  company?: string;
  description: string;
  technologies: string[];
  liveDemo?: string;
  github: string;
  metrics?: { label: string; value: string }[];
  problem: string;
  solution: string;
  architecture: string[];
  keyHighlights: string[];
  challenges: string;
  impact: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level?: string;
    icon?: string;
    projectsUsed: string[]; // Project IDs
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  summary: string;
  achievements: string[];
  technologies: string[];
  architectureFocus: string[];
}

export interface AchievementItem {
  title: string;
  organization: string;
  date?: string;
  description: string;
  highlight: string;
  category: 'Competitive Programming' | 'Academic' | 'Club / Leadership';
  link?: string;
}
