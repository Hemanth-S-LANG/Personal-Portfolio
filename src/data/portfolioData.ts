import type { Project, SkillCategory, ExperienceItem, AchievementItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Hemanth S',
  role: 'Full-Stack Developer & Security Engineer',
  tagline: 'Securing & scaling production API platforms, async microservice architectures, and modern web applications.',
  bio: 'Full-stack developer with hands-on experience securing and scaling a production API platform (cognitest.io), working across React, Node.js, Express, FastAPI, and Redis. Passionate about API security (SSRF, auth hardening), async job architectures, and cloud-backed microservices.',
  location: 'Bangalore, India',
  email: 'hs6384013@gmail.com',
  phone: '+91 6363285815',
  github: 'https://github.com/Hemanth-S-LANG',
  linkedin: 'https://www.linkedin.com/in/hemanth-s-685296318',
  leetcode: 'https://leetcode.com/u/Hemanth_S/',
  cgpa: '9.43 / 10',
  college: 'RNS Institute of Technology',
  degree: 'B.E. in Computer Science and Engineering (2024 – 2028)',
  resumePdf: '/Hemanth_S_Resume.pdf'
};

export const PROJECTS: Project[] = [
  {
    id: 'cognitest',
    title: 'Cognitest / SecureTester',
    subtitle: 'Production API Security & AI Testing Platform',
    category: 'Security & AI',
    featured: true,
    period: 'June 2026 – Present',
    role: 'Software Developer Intern',
    company: 'ENMAZ Engineering Services Pvt. Ltd. | cognitest.io',
    description: 'A production API security and automated testing platform built to detect zero-day vulnerabilities, execute distributed security test suites, and orchestrate LLM test cases safely.',
    technologies: ['FastAPI', 'React', 'TypeScript', 'Redux', 'PostgreSQL', 'Prisma', 'Redis', 'ARQ', 'Anthropic SDK', 'SSE', 'Docker'],
    liveDemo: 'https://cognitest.io',
    github: 'https://github.com/Hemanth-S-LANG',
    metrics: [
      { label: 'SSRF Exposure', value: '0 Outbound Vectors' },
      { label: 'Lock Contention', value: 'Eliminated via ARQ' },
      { label: 'LLM Spend Guardrail', value: 'Budget Enforced' },
      { label: 'Response Parse Bugs', value: '100% Fixed (Anthropic SDK)' }
    ],
    problem: 'Traditional API vulnerability testers often risk exposing internal infrastructure to Server-Side Request Forgery (SSRF) when triggering outbound webhooks, while high-concurrency AI test generator pipelines suffer from worker lock contention and runaway LLM token spend.',
    solution: 'Engineered robust egress validation pinning IPs and protecting DNS-rebinding, migrated test generation to an async worker queue powered by ARQ and Redis, built strict super-admin token budget analytics, and stabilized real-time telemetry streaming via SSE.',
    architecture: [
      'FastAPI Backend & Outbound Egress Guard: Custom network middleware validating IP ranges, DNS resolution, and TLS/vhost connection pinning to prevent SSRF vulnerabilities.',
      'Asynchronous Job Cluster: ARQ worker task distribution backed by Redis for concurrent AI test generation without database lock contention.',
      'Anthropic SDK Structured Outputs: Schema-validated LLM pipeline eliminating fragile regex parsing errors and fixing foreign-key cascade deletion bugs.',
      'Real-time Telemetry: SSE (Server-Sent Events) streaming connection connecting worker status directly to React/Redux UI dashboard.',
      'Token Spend Protection: Super-admin analytics suite enforcing hard budget limits, CSV audit exports, and cross-period LLM spend tracking.'
    ],
    keyHighlights: [
      'Remediated multiple SSRF vulnerabilities with DNS-rebinding protection and IP-pinned egress validation across outbound paths.',
      'Redesigned rate limiter and scaled AI test generation asynchronously with ARQ and Redis workers.',
      'Hardened auth by eliminating hardcoded credentials, securing Redis password auth, and implementing automatic JWT expiry re-authentication.',
      'Built super-admin token usage analytics panel from scratch with filtering, pagination, CSV export, and budget controls.',
      'Migrated AI layer to Anthropic SDK with structured outputs and added security headers (HSTS, X-Frame-Options, Referrer-Policy).'
    ],
    challenges: 'Preventing SSRF required safe DNS resolution without double-lookup race conditions. Eliminating rate limiter lock contention required shifting from synchronous blocking locks to atomic Redis sliding window counters with ARQ task queues.',
    impact: 'Protected the production platform against dangerous outbound SSRF exploits, enabled horizontal scaling of AI test generation workers, and gave leadership 100% visibility over LLM API costs.'
  },
  {
    id: 'lms',
    title: 'Learning Management System (LMS)',
    subtitle: 'Full-Stack Educational Platform with Role-Based Auth & AI Study Assistant',
    category: 'Full-Stack Web',
    featured: true,
    period: '2026',
    description: 'A comprehensive full-stack LMS enabling students and teachers to manage course sections, auto-generate timetables, share study notes, track assignments, and take anti-cheat quizzes with an AI study assistant.',
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Bcrypt', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/Hemanth-S-LANG/learning-management-system',
    metrics: [
      { label: 'Role Security', value: 'JWT + Role-Based Access' },
      { label: 'AI Study Assistant', value: 'Performance Analytics' },
      { label: 'Quiz Anti-Cheat', value: 'Tab Switch Detection' }
    ],
    problem: 'Educational institutions need an integrated portal that coordinates multi-section course enrollments, automatic student timetabling, quiz evaluation, and personalized AI study recommendations without cumbersome external plugins.',
    solution: 'Engineered a full-stack MERN-based LMS featuring role-based dashboards for students and teachers, automated weekly timetable generation with breaks, assignment tracking, interactive quiz engine with anti-cheat detection, and an AI study assistant analyzing performance.',
    architecture: [
      'React & Tailwind CSS Client: Multi-themed student/teacher interface with profile cropping, dynamic timetables, note readers, and quiz confetti celebration.',
      'Express & Node.js REST API: Role-guarded controller layer (Student/Teacher middleware) with bcrypt password hashing and JWT token auth.',
      'MongoDB & Mongoose Schema: Relational course models supporting multi-teacher sections (A, B, C), assignment submissions, and quiz question collections.',
      'AI Study Engine: Performance evaluation module generating 7-day study plans and tailored study suggestions based on student quiz scores.'
    ],
    keyHighlights: [
      'Built role-based authentication system with JWT and bcrypt for Student and Teacher portals.',
      'Implemented automatic weekly timetable generator with break management and course section assignment.',
      'Developed quiz creation engine supporting MCQs, True/False, and Descriptive questions with tab-switch anti-cheat tracking.',
      'Integrated AI Study Assistant delivering personalized 7-day study plans based on quiz metrics.'
    ],
    challenges: 'Designing dynamic MongoDB schemas that handle multi-section course availability where multiple professors teach separate sections of the same course.',
    impact: 'Delivered an end-to-end academic portal streamlining course management, student scheduling, and automated quiz evaluation.'
  },
  {
    id: 'my-notes-hub',
    title: 'Notable — Personal Notes Hub',
    subtitle: 'Cloud-Backed Personal Notes Workspace with Block-Based Editing',
    category: 'Full-Stack Web',
    featured: true,
    period: '2026',
    description: 'A modern cloud-backed personal note-taking workspace featuring rich block-based editing, drag-and-drop block reordering, Supabase authentication & cloud sync, attachment management, and PDF export.',
    technologies: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase', 'Radix UI', 'dnd-kit', 'jsPDF', 'TanStack Router'],
    github: 'https://github.com/Hemanth-S-LANG/my-notes-hub',
    metrics: [
      { label: 'Editor Engine', value: 'Block-Based + Drag & Drop' },
      { label: 'Cloud Sync', value: 'Supabase Real-Time Auth & DB' },
      { label: 'PDF Export', value: 'jsPDF + html2canvas Engine' }
    ],
    problem: 'Standard note applications either lock user data into proprietary formats or lack intuitive block-level reorganization and cross-device cloud persistence.',
    solution: 'Engineered Notable—a cloud-backed note editor supporting modular block types (text, images, dividers), fluid drag-and-drop block reordering via @dnd-kit, automatic cloud sync to Supabase with local-to-cloud migration on sign-in, and instant PDF rendering.',
    architecture: [
      'React 19 & TanStack Router Frontend: High-performance SPA client with dark/light theme switching, responsive sidebar navigation, and Radix UI components.',
      'Supabase Auth & Database Layer: Email/password and Google authentication paired with PostgreSQL tables enforcing Row-Level Security (RLS) for note/folder isolation.',
      'Draggable Block Architecture: Dynamic content canvas powered by @dnd-kit enabling reorderable text, image, and divider blocks.',
      'Cloud Storage & PDF Exporter: Supabase Storage bucket handling file attachments with signed URLs, coupled with jsPDF and html2canvas for document export.'
    ],
    keyHighlights: [
      'Built cloud sync engine seamlessly migrating local browser storage notes to Supabase upon user sign-in.',
      'Implemented rich block-based editor supporting reorderable text, image, and divider blocks via @dnd-kit.',
      'Integrated Supabase Storage for attachment uploads and built PDF export using jsPDF + html2canvas.',
      'Added full-text note search, folder management (All, Unfiled, Custom), and bulk note operations.'
    ],
    challenges: 'Ensuring debounced auto-save triggers do not collide with drag-and-drop block reordering state, while maintaining signed URL lifetime for Supabase attachment assets.',
    impact: 'Delivered a clean personal notes workspace combining desktop-grade editing flexibility with real-time cloud synchronization.'
  },
  {
    id: 'pixel-frame',
    title: 'Pixel-frame',
    subtitle: 'Full-Stack Studio Booking & Management Platform',
    category: 'Full-Stack Web',
    featured: true,
    period: 'August 2026 – Present',
    description: 'Full-stack production photography studio booking system with real-time slot conflict detection, server-side Razorpay signature verification, and admin dashboard.',
    technologies: ['Next.js', 'TypeScript', 'Express.js', 'Node.js', 'MongoDB', 'Razorpay API', 'Tailwind CSS'],
    liveDemo: 'https://sapthagiri.studio',
    github: 'https://github.com/Hemanth-S-LANG',
    metrics: [
      { label: 'Booking Status', value: 'Deployed for Real Client' },
      { label: 'Payment Security', value: 'Server-Side HMAC Verified' },
      { label: 'Slot Conflicts', value: '0 Overlaps Allowed' }
    ],
    problem: 'Creative studios face frequent scheduling overlaps, payment fraud, and cumbersome admin booking management when relying on manual messaging or unverified booking slips.',
    solution: 'Built a sleek Next.js frontend coupled with a TypeScript/Express REST API backend that handles real-time calendar slot lockouts, processes Razorpay payments securely via HMAC signature verification, and offers comprehensive slot control.',
    architecture: [
      'Next.js Client: Server-side rendered storefront for rapid load times and smooth mobile photo studio booking experience.',
      'Express/TypeScript API Backend: RESTful service handling slot reservation locks, validation middleware, and Razorpay webhook web calls.',
      'Razorpay Signature Guard: Server-side cryptographic signature validation verifying payment payloads before state persistence.',
      'MongoDB Booking Engine: Schema with compound indexes preventing double-booking race conditions during simultaneous user checkouts.'
    ],
    keyHighlights: [
      'Deployed for real client studio use (Sapthagiri Studio).',
      'Integrated Razorpay payment gateway with server-side signature verification to securely process bookings.',
      'Built admin dashboard featuring slot management, conflict detection, and duplicate booking prevention logic.'
    ],
    challenges: 'Ensuring atomic slot locks so two clients attempting checkout at the exact same millisecond cannot double-book the studio.',
    impact: 'Streamlined booking operations for a active commercial studio with automated server-validated payments and zero schedule conflicts.'
  },
  {
    id: 'multi-agent-ai',
    title: 'Multi-Agent AI Decision Ecosystem',
    subtitle: 'Orchestrated Multi-Agent AI Debate & Verdict Platform',
    category: 'Security & AI',
    featured: true,
    period: 'April 2026',
    description: 'Autonomous multi-agent debate platform where specialized AI agents argue complex questions from contrasting domain perspectives before a moderator agent synthesizes a reasoned verdict.',
    technologies: ['Python', 'FastAPI', 'LangGraph', 'Celery', 'Redis', 'React.js', 'Tailwind CSS'],
    github: 'https://github.com/Hemanth-S-LANG',
    metrics: [
      { label: 'Agent Workflow', value: 'LangGraph Orchestrated' },
      { label: 'Task Execution', value: 'Async Celery + Redis' },
      { label: 'State Stream', value: 'FastAPI SSE Telemetry' }
    ],
    problem: 'Single-prompt LLM answers often exhibit single-point bias and lack domain-specific dialectic reasoning when analyzing multi-faceted decisions.',
    solution: 'Designed a multi-agent debate ecosystem using LangGraph. Agents assume specialized personas (e.g., Security Analyst, Financial Strategist, Risk Auditor) to debate a prompt asynchronously, streaming live debate state to a interactive React frontend.',
    architecture: [
      'LangGraph DAG State Machine: Defines agent turn-taking, counter-argument routing, and moderator verdict synthesis nodes.',
      'Async Celery & Redis Task Broker: Handles non-blocking LLM API queries across parallel agent nodes.',
      'FastAPI Telemetry Server: Streams live agent dialogue state and argument graph directly to client UI via Server-Sent Events.'
    ],
    keyHighlights: [
      'Built multi-agent debate system where specialized AI agents argue questions from different perspectives before a moderator synthesizes a final verdict.',
      'Orchestrated agent workflows using LangGraph with async task processing via Celery and Redis.',
      'Built FastAPI backend streaming live debate state to a React frontend visualizing arguments and verdict history.'
    ],
    challenges: 'Managing graph cycle state transitions in LangGraph while ensuring live SSE updates remain synchronized with the debate step index without frontend stutter.',
    impact: 'Provided a transparent decision-support system allowing users to see raw arguments, rebuttal rounds, and final weighted synthesis.'
  },
  {
    id: 'amazon-clone',
    title: 'Amazon E-Commerce Interface Clone',
    subtitle: 'Front-End E-Commerce UI Replica with Custom Flexbox Styling',
    category: 'Utility Apps',
    featured: false,
    period: '2026',
    description: 'A complete Amazon storefront interface clone built with HTML5 and CSS3, recreating top navigation, multi-category product cards, search bar, language/account selectors, and responsive footer.',
    technologies: ['HTML5', 'CSS3', 'Flexbox', 'Font Awesome'],
    github: 'https://github.com/Hemanth-S-LANG/my-webpage',
    problem: 'Mastering modern CSS layout techniques, Flexbox alignment, and responsive e-commerce component structuring requires implementing complex commercial interface patterns.',
    solution: 'Built a pixel-accurate Amazon homepage replica featuring a dark top navigation bar, location dropdowns, search panel, promotional hero banner, and multi-column category shopping grid.',
    architecture: [
      'Semantic HTML5 Architecture: Clean document hierarchy utilizing header, nav, footer, section, and input dropdown components.',
      'Custom CSS Flexbox Layout: Border-radius search bar styling, category image grids, hover state transitions, and responsive wrap rules.'
    ],
    keyHighlights: [
      'Recreated Amazon top navigation with logo, location selector, custom search bar, and account links.',
      'Designed responsive product grid covering Electronics, Deals, Fresh, Fashion, Books, Mobiles, and Kitchen.',
      'Implemented hover interactions, custom dropdowns, and multi-column informational footer.'
    ],
    challenges: 'Structuring multi-level CSS flex containers to ensure consistent card heights and alignment across varying screen sizes without external frameworks.',
    impact: 'Demonstrated front-end CSS layout mastery and precise visual UI replication.'
  },
  {
    id: 'password-manager',
    title: 'Password Manager & Chrome Extension',
    subtitle: 'Full-Stack Credential Vault with Browser Autofill Extension',
    category: 'Security & AI',
    featured: false,
    period: 'March 2026 – April 2026',
    description: 'End-to-end credential management vault featuring salted hashing, dynamic password strength metrics dashboard, and a companion Chrome extension for zero-click autofill and autosave.',
    technologies: ['React', 'Express.js', 'MongoDB', 'Chrome Extension API', 'Crypto Hashing', 'Tailwind CSS'],
    github: 'https://github.com/Hemanth-S-LANG',
    metrics: [
      { label: 'Credential Vault', value: 'Hashed & Encrypted' },
      { label: 'Autofill Extension', value: 'Chrome Manifest V3' },
      { label: 'Password Scoring', value: 'Entropy Meter UI' }
    ],
    problem: 'Users need convenient, secure password management that works across desktop web dashboards and browser extensions without exposing credentials in plaintext.',
    solution: 'Created a full-stack password manager pairing a React web dashboard with a Chrome Manifest V3 companion extension for autofill, autosuggest, and autosave, backed by an Express/MongoDB vault.',
    architecture: [
      'React Web Dashboard: Central management panel for credential auditing, search, and visual strength scoring.',
      'Chrome Extension Companion: Background service worker listening to DOM input events to autofill and offer single-click credential autosave.',
      'Express REST Service: Authenticated REST backend enforcing cryptographic password hashing and token security.'
    ],
    keyHighlights: [
      'Built full-stack password manager storing credentials securely using hashing with React frontend & Express/MongoDB backend.',
      'Developed companion Chrome extension for autofill, autosuggest, and autosave of saved credentials.',
      'Implemented password strength scoring system with a visual metrics dashboard.'
    ],
    challenges: 'Designing Chrome extension background scripts that securely communicate with the web app backend while avoiding DOM injection vulnerabilities on untrusted sites.',
    impact: 'Delivered a slick personal security utility bridging web management and browser integration.'
  },
  {
    id: 'weather-app',
    title: 'Weather Analytics Application',
    subtitle: 'Interactive Meteorological Dashboard',
    category: 'Utility Apps',
    featured: false,
    period: '2026',
    description: 'Clean weather intelligence application providing real-time local and global weather metrics, forecast visualizers, and interactive search.',
    technologies: ['React', 'JavaScript', 'CSS3', 'OpenWeather API', 'Vercel'],
    liveDemo: 'https://weatherwebsite-4nzbr8k1o-hemanth-ss-projects-bc11f246.vercel.app/',
    github: 'https://github.com/Hemanth-S-LANG',
    problem: 'Cluttered weather interfaces often hide key environmental telemetry behind ads and complex layouts.',
    solution: 'Built a sleek weather dashboard highlighting temperature trends, humidity, wind vectors, and multi-day forecasts with fast location resolution.',
    architecture: ['React UI client interfacing with OpenWeather API via cached fetch calls, deployed on Vercel CDN.'],
    keyHighlights: ['Real-time forecast retrieval', 'Responsive weather visualization', 'Instant city search & geolocator integration'],
    challenges: 'Optimizing API call caching to avoid rate limits while keeping weather metrics updated.',
    impact: 'Provides clean weather data at high speed.'
  },
  {
    id: 'currency-converter',
    title: 'Currency Converter Platform',
    subtitle: 'Real-Time Financial Exchange Rate Converter',
    category: 'Utility Apps',
    featured: false,
    period: '2026',
    description: 'High-speed currency conversion tool tracking real-time international exchange rates with multi-currency comparison tables.',
    technologies: ['React', 'JavaScript', 'ExchangeRate API', 'Vercel'],
    liveDemo: 'https://currency-converter-eosin-iota.vercel.app/',
    github: 'https://github.com/Hemanth-S-LANG',
    problem: 'Calculating currency values across multiple foreign currencies often requires navigating heavy financial tools.',
    solution: 'Built a minimal, lightning-fast currency converter with instant input recalculation and currency swapping.',
    architecture: ['React client consuming financial exchange REST APIs with client-side state caching.'],
    keyHighlights: ['Instant bidirectional currency conversion', 'Support for 30+ fiat currencies', 'Clean responsive interface'],
    challenges: 'Handling floating-point precision in JavaScript during multi-currency cross calculations.',
    impact: 'Fast, accurate currency conversion.'
  },
  {
    id: 'browser-battle',
    title: 'Browser Battle',
    subtitle: 'Interactive Web Browser Game & Performance Benchmark',
    category: 'Utility Apps',
    featured: false,
    period: '2026',
    description: 'An interactive browser game and web performance test measuring frame render smoothness and user reaction times.',
    technologies: ['JavaScript', 'HTML5 Canvas', 'CSS3', 'Vercel'],
    liveDemo: 'https://browser-battle-tau.vercel.app/',
    github: 'https://github.com/Hemanth-S-LANG',
    problem: 'Testing browser render loop performance and input response requires engaging visual benchmarks.',
    solution: 'Developed an interactive canvas game evaluating FPS stability and player reflexes.',
    architecture: ['Vanilla JS canvas requestAnimationFrame render loop with zero external dependencies.'],
    keyHighlights: ['60FPS Canvas Animation Loop', 'Interactive gaming mechanics', 'Zero overhead lightweight bundle'],
    challenges: 'Maintaining constant 60FPS frame timing across varying client GPU capabilities.',
    impact: 'Fun interactive web showcase.'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Languages & Core',
    description: 'Core programming languages and computational fundamentals',
    skills: [
      { name: 'TypeScript', projectsUsed: ['cognitest', 'my-notes-hub', 'pixel-frame'] },
      { name: 'JavaScript', projectsUsed: ['cognitest', 'lms', 'my-notes-hub', 'pixel-frame', 'password-manager', 'weather-app', 'currency-converter', 'browser-battle'] },
      { name: 'Python', projectsUsed: ['cognitest', 'multi-agent-ai'] },
      { name: 'C / C++', projectsUsed: ['cognitest'] },
      { name: 'Java', projectsUsed: [] }
    ]
  },
  {
    title: 'Frameworks & Web',
    description: 'Full-stack web frameworks and client UI libraries',
    skills: [
      { name: 'React.js', projectsUsed: ['cognitest', 'lms', 'my-notes-hub', 'multi-agent-ai', 'password-manager', 'weather-app', 'currency-converter'] },
      { name: 'FastAPI', projectsUsed: ['cognitest', 'multi-agent-ai'] },
      { name: 'Next.js', projectsUsed: ['pixel-frame'] },
      { name: 'Vite', projectsUsed: ['lms', 'my-notes-hub'] },
      { name: 'Express.js', projectsUsed: ['lms', 'pixel-frame', 'password-manager'] },
      { name: 'Node.js', projectsUsed: ['lms', 'pixel-frame', 'password-manager'] },
      { name: 'Tailwind CSS', projectsUsed: ['cognitest', 'lms', 'my-notes-hub', 'pixel-frame', 'multi-agent-ai', 'password-manager'] },
      { name: 'HTML5 & CSS3', projectsUsed: ['amazon-clone', 'weather-app', 'browser-battle'] }
    ]
  },
  {
    title: 'Databases & Cloud Backends',
    description: 'Data storage engines, cloud platforms, and task processing',
    skills: [
      { name: 'Supabase', projectsUsed: ['my-notes-hub'] },
      { name: 'MongoDB', projectsUsed: ['lms', 'pixel-frame', 'password-manager'] },
      { name: 'PostgreSQL', projectsUsed: ['cognitest', 'my-notes-hub'] },
      { name: 'Redis', projectsUsed: ['cognitest', 'multi-agent-ai'] },
      { name: 'ARQ', projectsUsed: ['cognitest'] },
      { name: 'Celery', projectsUsed: ['multi-agent-ai'] },
      { name: 'Prisma ORM', projectsUsed: ['cognitest'] }
    ]
  },
  {
    title: 'Security & AI Engineering',
    description: 'API security hardening, AI orchestration, and real-time telemetry',
    skills: [
      { name: 'SSRF & Egress Protection', projectsUsed: ['cognitest'] },
      { name: 'Auth & JWT Security', projectsUsed: ['cognitest', 'lms', 'my-notes-hub', 'password-manager'] },
      { name: 'LangGraph', projectsUsed: ['multi-agent-ai'] },
      { name: 'Anthropic SDK', projectsUsed: ['cognitest'] },
      { name: 'SSE (Server-Sent Events)', projectsUsed: ['cognitest', 'multi-agent-ai'] },
      { name: 'Razorpay HMAC Verification', projectsUsed: ['pixel-frame'] }
    ]
  },
  {
    title: 'Developer Tools & DevOps',
    description: 'Deployment, containers, testing, and workflow tooling',
    skills: [
      { name: 'Git & GitHub', projectsUsed: ['cognitest', 'lms', 'my-notes-hub', 'amazon-clone', 'pixel-frame', 'multi-agent-ai', 'password-manager', 'weather-app', 'currency-converter', 'browser-battle'] },
      { name: 'Docker', projectsUsed: ['cognitest'] },
      { name: 'Postman', projectsUsed: ['cognitest', 'lms'] },
      { name: 'JMeter', projectsUsed: ['cognitest'] },
      { name: 'AWS', projectsUsed: ['cognitest'] },
      { name: 'Figma', projectsUsed: ['pixel-frame'] }
    ]
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'enmaz',
    role: 'Software Developer Intern',
    company: 'ENMAZ Engineering Services Pvt. Ltd. | cognitest.io',
    companyUrl: 'https://cognitest.io',
    location: 'JP Nagar 8th Phase, Bengaluru',
    period: 'June 2026 – Present',
    summary: 'Secured and scaled a production API vulnerability testing platform across FastAPI, React, Redux, ARQ, and Redis.',
    achievements: [
      'Identified and remediated multiple SSRF vulnerabilities in a FastAPI-based API testing platform, implementing DNS-rebinding protection, IP-pinned egress validation, and TLS/vhost-safe connection pinning across all outbound execution paths.',
      'Migrated AI test generation to an asynchronous job architecture using ARQ and Redis, enabling horizontal worker scaling, and redesigned the rate limiter to eliminate lock contention across concurrent workers.',
      'Hardened authentication and secrets management: eliminated hardcoded admin credentials, enforced environment-based configuration, secured Redis with password auth, and added JWT expiry handling with automatic re-authentication.',
      'Built a token usage analytics dashboard for the super-admin panel from scratch — filtering, pagination, CSV export, cross-period comparisons — and implemented token budget enforcement to prevent unbounded LLM API spend.',
      'Migrated the AI integration layer to Anthropic official SDK with structured outputs, replacing fragile regex-based response parsing, and resolved a foreign-key cascade bug causing silent project deletion failures.',
      'Fixed real-time test execution UX: resolved SSE stream handling for abandoned runs, corrected stale test result/run-count displays, and added security headers (HSTS, X-Frame-Options, Referrer-Policy) across the API.'
    ],
    technologies: ['FastAPI', 'React', 'TypeScript', 'Redux', 'PostgreSQL', 'Redis', 'ARQ', 'Anthropic SDK', 'SSE', 'Docker'],
    architectureFocus: ['Zero-Trust Egress Guard', 'Async Job Queue Scaling', 'LLM Token Spend Analytics', 'Real-Time SSE Telemetry']
  }
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    title: 'Competitive Programming Mastery',
    organization: 'LeetCode & HackerRank',
    description: 'Solved 250+ algorithmic problems on LeetCode and 50+ on HackerRank with deep focus on Data Structures & Algorithms (Trees, Graphs, Dynamic Programming, Heap, System Design).',
    highlight: '250+ LeetCode / 50+ HackerRank',
    category: 'Competitive Programming',
    link: 'https://leetcode.com/u/Hemanth_S/'
  },
  {
    title: 'BigO DSA Club Member',
    organization: 'RNS Institute of Technology',
    description: 'Active core member of the BigO Data Structures & Algorithms club, participating in peer code reviews, mock interview sessions, and algorithmic problem-solving workshops.',
    highlight: 'Active Member',
    category: 'Club / Leadership'
  },
  {
    title: 'Academic Distinction (CGPA 9.43)',
    organization: 'RNS Institute of Technology',
    description: 'Maintained an outstanding 9.43 / 10 CGPA in B.E. Computer Science & Engineering curriculum.',
    highlight: '9.43 / 10 CGPA',
    category: 'Academic'
  }
];

export const QUICK_METRICS = [
  { label: 'CGPA Score', value: '9.43/10', detail: 'Computer Science & Engineering at RNSIT' },
  { label: 'LeetCode Solved', value: '250+', detail: 'Focused on DS, Algorithms & Complex Systems' },
  { label: 'Production Internship', value: 'cognitest.io', detail: 'ENMAZ Engineering Services' },
  { label: 'SSRF Vulnerabilities Fixed', value: '100%', detail: 'DNS Rebinding & Egress Pinning' }
];
