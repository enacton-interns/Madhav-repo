export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  category: 'Full Stack' | 'Systems' | 'Web Apps' | 'AI & Tools';
  tags: string[];
  featured: boolean;
  metrics: string;
  githubUrl: string;
  liveUrl: string;
  architectureHighlights: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Full-time' | 'Contract';
  description: string;
  achievements: string[];
  skills: string[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: { name: string; level: number; highlight?: boolean }[];
}

export interface EngineeringPillar {
  id: string;
  title: string;
  description: string;
  icon: string;
  stats: string;
  technologies: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: 'Madhav Kotak',
    title: 'Aspiring Cloud & DevOps Engineer',
    eyebrow: 'DEVOPS • CLOUD • SECURITY',
    tagline: 'Building multi-cloud governance platforms, automated CI/CD pipelines, and DevSecOps solutions on AWS.',
    bio: 'AWS Certified Final Year B.Tech CSE student with hands-on experience in cloud networking, infrastructure automation, CI/CD pipelines, and DevSecOps. Skilled in Python, Terraform, Docker, and GitHub Actions. Built multi-cloud governance and compliance solutions on AWS.',
    status: 'Open to Cloud & DevOps Roles',
    location: 'Vadodara, Gujarat, India',
    education: {
      degree: 'B.Tech – Computer Science & Engineering',
      university: 'Parul University, Vadodara',
      period: 'Sept 2023 – Present',
      cgpa: '8.56 / 10',
      coursework: ['Computer Networks', 'Network Security', 'Cloud Computing', 'DSA', 'OS', 'DBMS'],
    },
    certifications: [
      { name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services' },
      { name: 'AWS Academy Cloud Foundations', issuer: 'Amazon Web Services' },
    ],
    achievements: [
      'Top 45 out of 720+ teams at Vadodara Hackathon 6.0 (2025)',
      'Solved 200+ problems on LeetCode',
    ],
    resumeUrl: '#contact',
    socials: {
      github: 'https://github.com/madhavkotak',
      linkedin: 'https://linkedin.com/in/madhavkotak',
      twitter: 'https://x.com/madhavkotak',
      email: 'madhavkotak124@gmail.com',
    },
    metrics: [
      { label: 'CGPA', value: '8.56' },
      { label: 'AWS Certifications', value: '2' },
      { label: 'Hackathon Rank', value: 'Top 45' },
      { label: 'LeetCode Problems', value: '200+' },
    ],
  },

  skills: [
    {
      title: 'Cloud',
      iconName: 'Cloud',
      skills: [
        { name: 'AWS EC2', level: 90, highlight: true },
        { name: 'AWS S3', level: 90, highlight: true },
        { name: 'AWS RDS', level: 85 },
        { name: 'AWS Lambda', level: 85 },
        { name: 'AWS IAM', level: 90, highlight: true },
        { name: 'CloudWatch', level: 80 },
        { name: 'VPC', level: 88 },
        { name: 'CloudFormation', level: 80 },
      ],
    },
    {
      title: 'DevOps',
      iconName: 'Workflow',
      skills: [
        { name: 'Docker', level: 90, highlight: true },
        { name: 'Kubernetes', level: 85, highlight: true },
        { name: 'Terraform', level: 88, highlight: true },
        { name: 'GitHub Actions', level: 90, highlight: true },
        { name: 'Git', level: 90 },
        { name: 'CI/CD Pipelines', level: 88 },
      ],
    },
    {
      title: 'Development',
      iconName: 'Code',
      skills: [
        { name: 'Python', level: 90, highlight: true },
        { name: 'Flask', level: 85, highlight: true },
        { name: 'FastAPI', level: 88, highlight: true },
        { name: 'Bash', level: 82 },
        { name: 'SQL', level: 85 },
        { name: 'REST APIs', level: 88 },
      ],
    },
    {
      title: 'Security',
      iconName: 'Shield',
      skills: [
        { name: 'Checkov', level: 85, highlight: true },
        { name: 'Trivy', level: 85, highlight: true },
        { name: 'JWT Auth', level: 88 },
        { name: 'RBAC', level: 85 },
        { name: 'Security Groups & NACLs', level: 88 },
        { name: 'CIS Benchmarks', level: 82 },
      ],
    },
    {
      title: 'Databases',
      iconName: 'Database',
      skills: [
        { name: 'PostgreSQL', level: 88, highlight: true },
        { name: 'MongoDB', level: 82, highlight: true },
      ],
    },
    {
      title: 'Tools & Concepts',
      iconName: 'Wrench',
      skills: [
        { name: 'Linux', level: 88, highlight: true },
        { name: 'Docker Compose', level: 85 },
        { name: 'Microservices', level: 85 },
        { name: 'Virtualization', level: 80 },
        { name: 'Data Structures & Algorithms', level: 85 },
        { name: 'Networking (TCP/IP, DNS, NAT)', level: 88, highlight: true },
      ],
    },
  ] as SkillCategory[],

  projects: [
    {
      id: 'aether-cloud',
      title: 'AetherCloud Observability Engine',
      subtitle: 'Real-time infrastructure monitoring platform',
      description: 'Distributed telemetry platform processing sub-second metric streams with clean dark interactive dashboards.',
      fullDescription: 'AetherCloud is an enterprise-grade observability engine designed for high-concurrency microservice tracking. Built with Go for metric ingest and Next.js for real-time visualization, it features zero-latency telemetry charts, custom alert triggers, and distributed log tracing.',
      category: 'Full Stack',
      tags: ['Next.js', 'TypeScript', 'Go', 'Tailwind CSS', 'Redis', 'PostgreSQL'],
      featured: true,
      metrics: 'Processes 2M+ telemetry events/sec with < 50ms query latencies.',
      githubUrl: 'https://github.com/madhavkotak/aether-cloud',
      liveUrl: 'https://aether-cloud.demo.dev',
      architectureHighlights: [
        'High-performance Go ingestion worker with Redis pipeline buffering.',
        'Next.js App Router frontend with real-time SSE chart streams.',
        'Custom Tailwind CSS glassmorphic telemetry cards with sub-100ms render speeds.',
      ],
    },
    {
      id: 'pulse-flow',
      title: 'PulseFlow Developer Studio',
      subtitle: 'Visual node workflow automation for serverless pipelines',
      description: 'Interactive flow builder enabling developers to visually compose, debug, and trigger microservice workflows.',
      fullDescription: 'PulseFlow streamlines serverless orchestration by providing a drag-and-drop node graph builder. Features real-time multiplayer editing, step execution logs, and automated deployment to AWS Lambda or Vercel Edge.',
      category: 'Web Apps',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'WebSockets', 'Node.js'],
      featured: true,
      metrics: 'Accelerated workflow build time by 65% across 15+ engineering teams.',
      githubUrl: 'https://github.com/madhavkotak/pulse-flow',
      liveUrl: 'https://pulse-flow.demo.dev',
      architectureHighlights: [
        'Custom canvas node engine optimized for 60 FPS pan and zoom interaction.',
        'WebSocket state synchronization for multi-user real-time canvas editing.',
        'Modular TypeScript plugin SDK for custom third-party node extensions.',
      ],
    },
    {
      id: 'nova-rag',
      title: 'Nova RAG Codebase Intelligence',
      subtitle: 'Semantic enterprise code search & AI documentation assistant',
      description: 'Sub-100ms vector search engine indexing millions of lines of code with hybrid sparse/dense retrieval.',
      fullDescription: 'Nova RAG allows engineering organizations to query complex monolithic codebases using natural language. Combines BM25 keyword matching with OpenAI vector embeddings stored in Pinecone to deliver pinpoint answers and file references.',
      category: 'AI & Tools',
      tags: ['Python', 'FastAPI', 'Next.js', 'Pinecone', 'TypeScript', 'Tailwind CSS'],
      featured: true,
      metrics: 'Indexes 50M+ lines of enterprise code in under 4 minutes.',
      githubUrl: 'https://github.com/madhavkotak/nova-rag',
      liveUrl: 'https://nova-rag.demo.dev',
      architectureHighlights: [
        'Hybrid retrieval pipeline merging BM25 keyword index and vector similarity.',
        'Asynchronous Python FastAPI service with streaming response chunking.',
        'Clean responsive Next.js search UI with syntax-highlighted code snippets.',
      ],
    },
    {
      id: 'orbit-ui',
      title: 'Orbit UI Design System',
      subtitle: 'Accessible, dark space-themed React component library',
      description: 'Production-ready component architecture designed for rapid development of modern, highly accessible web applications.',
      fullDescription: 'Orbit UI provides 40+ polished React components engineered with strict TypeScript typings, Tailwind CSS utility integration, and Framer Motion micro-animations. Designed with dark-mode defaults and space-inspired visual tokens.',
      category: 'Web Apps',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Storybook'],
      featured: false,
      metrics: 'Achieved 100% WCAG AAA accessibility score across all core primitives.',
      githubUrl: 'https://github.com/madhavkotak/orbit-ui',
      liveUrl: 'https://orbit-ui.demo.dev',
      architectureHighlights: [
        'Zero-runtime overhead using CSS variables and Tailwind CSS utilities.',
        'Fully keyboard accessible with Radix UI headless primitives.',
        'Comprehensive Storybook suite and Playwright automated visual diff testing.',
      ],
    },
    {
      id: 'chronos-grid',
      title: 'Chronos Distributed Edge Cache',
      subtitle: 'Ultra-low latency distributed memory grid',
      description: 'Lightweight distributed edge storage node with automated regional replication and peer-to-peer failover.',
      fullDescription: 'Chronos grid is an experimental distributed caching node written in Go. Uses consistent hashing and gossip protocol to synchronize key-value caches across multi-cloud regions with minimal overhead.',
      category: 'Systems',
      tags: ['Go', 'gRPC', 'Docker', 'Kubernetes', 'Redis', 'Prometheus'],
      featured: false,
      metrics: 'Sustained 99.999% uptime across 4 global edge regions.',
      githubUrl: 'https://github.com/madhavkotak/chronos-grid',
      liveUrl: 'https://chronos-grid.demo.dev',
      architectureHighlights: [
        'Implemented custom ring-hash algorithm for uniform key distribution.',
        'gRPC streaming protocol for peer-to-peer cache entry invalidation.',
        'Prometheus exporter endpoint for cluster load and latency monitoring.',
      ],
    },
  ] as Project[],

  experience: [
    {
      id: 'zenith',
      role: 'Senior Full-Stack Software Engineer',
      company: 'Zenith Technologies',
      location: 'San Francisco, CA',
      period: '2024 — Present',
      type: 'Full-time',
      description: 'Leading the frontend architecture and microservices modernizations for high-scale developer platform products.',
      achievements: [
        'Spearheaded full architectural migration of core web application to Next.js App Router & TypeScript, improving LCP performance by 62%.',
        'Architected real-time SSE notification service using Node.js and Redis, supporting over 300k concurrent active connections.',
        'Established automated CI/CD deployment gates using GitHub Actions, cutting average release cycles from 3 days to 25 minutes.',
        'Mentored 6 software engineers on TypeScript design patterns, code review standards, and web performance profiling.',
      ],
      skills: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'AWS', 'Redis', 'Docker'],
    },
    {
      id: 'apex',
      role: 'Software Engineer (Systems & Web)',
      company: 'Apex Systems Labs',
      location: 'San Jose, CA',
      period: '2022 — 2024',
      type: 'Full-time',
      description: 'Built high-throughput backend services and responsive client dashboards for enterprise telemetry systems.',
      achievements: [
        'Developed 12+ REST and GraphQL microservices in Go and Node.js serving 15M+ daily API queries.',
        'Designed interactive data analytics dashboards using React, Tailwind CSS, and WebGL charts.',
        'Optimized PostgreSQL query indexes and Redis caching layers, reducing database CPU load by 75%.',
        'Implemented OAuth2 / OIDC authentication security pipelines with zero downtime.',
      ],
      skills: ['React', 'TypeScript', 'Go', 'Node.js', 'PostgreSQL', 'GraphQL', 'Docker', 'Tailwind CSS'],
    },
    {
      id: 'quantum',
      role: 'Frontend Software Engineer',
      company: 'Quantum Interactive',
      location: 'Remote',
      period: '2020 — 2022',
      type: 'Full-time',
      description: 'Focused on creating pixel-perfect, accessible client applications and reusable internal design system components.',
      achievements: [
        'Crafted responsive design system components in React and TypeScript used across 8 production applications.',
        'Collaborated directly with product design teams to transform Figma specifications into smooth, accessible web interfaces.',
        'Reduced client bundle sizes by 40% through code splitting, tree shaking, and asset optimization.',
      ],
      skills: ['React', 'TypeScript', 'CSS/Tailwind', 'REST APIs', 'Jest', 'Webpack'],
    },
  ] as ExperienceItem[],

  pillars: [
    {
      id: 'pillar-web',
      title: 'High-Performance Web',
      description: 'Crafting ultra-responsive React & Next.js web applications prioritized for speed, accessibility, and smooth user interactions.',
      icon: 'Globe',
      stats: 'Sub-100ms LCP & 100/100 Lighthouse standard',
      technologies: ['React 19', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      id: 'pillar-systems',
      title: 'Resilient Systems',
      description: 'Designing distributed microservices, REST/GraphQL APIs, and background job pipelines capable of handling high concurrency.',
      icon: 'Cpu',
      stats: '99.99% operational uptime across production deployments',
      technologies: ['Node.js', 'Go (Golang)', 'Redis', 'PostgreSQL', 'Docker'],
    },
    {
      id: 'pillar-architecture',
      title: 'Clean Architecture',
      description: 'Enforcing modular software design, comprehensive static typing, automated testing, and developer experience standards.',
      icon: 'Layers',
      stats: 'Maintainable codebases with 90%+ test coverage',
      technologies: ['TypeScript', 'Design Systems', 'CI/CD', 'Jest/Playwright', 'ESLint'],
    },
    {
      id: 'pillar-cloud',
      title: 'Cloud & AI Integration',
      description: 'Leveraging cloud infrastructure, edge networks, and modern AI/RAG search primitives to solve enterprise engineering challenges.',
      icon: 'Zap',
      stats: 'Scalable serverless & vector intelligence architecture',
      technologies: ['AWS', 'Vercel Edge', 'Pinecone Vector DB', 'FastAPI', 'Docker'],
    },
  ] as EngineeringPillar[],
};
