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
  type: 'Full-time' | 'Contract' | 'Project / Engineering' | 'Education' | string;
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
      id: 'multi-cloud-governance',
      title: 'Multi-Cloud Governance Platform',
      subtitle: 'Automated deployment compliance & infrastructure provisioning',
      description: 'A containerized deployment governance platform that automates compliance approvals and validation using a policy-as-code YAML engine, reducing manual effort by 70-80%.',
      fullDescription: 'Engineered a full-stack governance platform with declarative Terraform IaC blueprints for cloud resource provisioning, a state-machine deployment control plane with complete event auditing and rollback support, and a multi-service container environment orchestrated via Docker Compose. Features JWT authentication, RBAC-based tenant management, and a GitHub Actions CI/CD pipeline achieving zero-downtime releases.',
      category: 'Full Stack',
      tags: ['Python', 'FastAPI', 'Terraform', 'Docker', 'GitHub Actions', 'AWS', 'JWT', 'PostgreSQL'],
      featured: true,
      metrics: 'Reduced manual compliance validation effort by 70-80%.',
      githubUrl: 'https://github.com/MadhavKotak-24/multi-cloud-governance',
      liveUrl: '',
      architectureHighlights: [
        'Declarative Terraform IaC blueprints with automated dry-runs (terraform plan) for cloud resource provisioning.',
        'State-machine deployment control plane with complete event auditing and rollback support.',
        'Multi-service Docker Compose environment with FastAPI control plane, JWT auth, and RBAC tenant boundaries.',
        'GitHub Actions CI/CD pipeline for automated testing, linting, and zero-downtime deployment.',
      ],
    },
    {
      id: 'cloud-sentinel',
      title: 'CloudSentinel',
      subtitle: 'CSPM & DevSecOps Platform',
      description: 'A live AWS Cloud Security Posture Management auditor with Shift-Left DevSecOps workflows, reducing network compliance reporting time by 85% and catching 100% of critical security issues pre-deployment.',
      fullDescription: 'Developed a comprehensive CSPM platform using Boto3 to evaluate VPC Security Group ingress/egress rules, IAM privilege escalation vectors, and S3 public policies against CIS benchmarks. Engineered Shift-Left DevSecOps workflows integrating Checkov and Trivy for pre-deployment static analysis of Terraform configurations and container vulnerability scanning. Built a Terraform drift comparator for real-time diff timelines, and migrated the entire stack to a local Kubernetes (Kind) cluster with PVCs, ConfigMaps, and RBAC policies.',
      category: 'Full Stack',
      tags: ['Python', 'Flask', 'AWS', 'Boto3', 'Checkov', 'Trivy', 'Docker', 'Kubernetes', 'PostgreSQL'],
      featured: true,
      metrics: 'Reduced compliance reporting time by 85%, catching 100% of critical issues.',
      githubUrl: 'https://github.com/MadhavKotak-24/cloud-sentinel',
      liveUrl: '',
      architectureHighlights: [
        'Live AWS CSPM auditor evaluating VPC, IAM, and S3 policies against CIS benchmarks via Boto3.',
        'Shift-Left DevSecOps workflow integrating Checkov and Trivy for Terraform and container scanning.',
        'Terraform drift comparator with real-time diff timelines, reducing reconciliation time by 90%.',
        'Migrated to Kubernetes (Kind) cluster with PVCs, ConfigMaps, and RBAC for secure in-cluster scanning.',
      ],
    },
  ] as Project[],

  experience: [
    {
      id: 'cloud-sentinel-exp',
      role: 'Cloud Security & DevSecOps Engineer',
      company: 'CloudSentinel Platform',
      location: 'Vadodara, India',
      period: 'April 2026 — May 2026',
      type: 'Project / Engineering',
      description: 'Engineered an automated AWS Cloud Security Posture Management (CSPM) auditor and Shift-Left DevSecOps pipeline.',
      achievements: [
        'Developed live AWS CSPM auditor evaluating VPC Security Group ingress/egress rules, IAM privilege escalation vectors, and S3 public policies against CIS benchmarks using Boto3, reducing reporting time by 85%.',
        'Integrated Checkov and Trivy into pre-deployment static analysis for Terraform configurations and container images, catching 100% of critical security issues pre-release.',
        'Built a real-time Terraform drift comparator reducing network compliance reconciliation time by 90%.',
        'Migrated containerized services to a local Kubernetes (Kind) cluster with custom PVCs, ConfigMaps, and RBAC security policies.',
      ],
      skills: ['AWS', 'Boto3', 'Checkov', 'Trivy', 'Docker', 'Kubernetes (Kind)', 'Python', 'Flask', 'PostgreSQL'],
    },
    {
      id: 'governance-platform-exp',
      role: 'Cloud Infrastructure & DevOps Engineer',
      company: 'Multi-Cloud Governance Platform',
      location: 'Vadodara, India',
      period: 'Jan 2026 — March 2026',
      type: 'Project / Engineering',
      description: 'Designed and deployed a containerized deployment governance platform featuring automated configuration approvals and policy-as-code validation.',
      achievements: [
        'Engineered policy-as-code YAML validation engine reducing manual configuration validation effort by 70-80%.',
        'Designed declarative Terraform IaC blueprints for automated AWS cloud resource provisioning with terraform plan dry-runs.',
        'Built state-machine deployment control plane with complete event auditing, JWT authentication, and RBAC tenant isolation.',
        'Orchestrated GitHub Actions CI/CD pipelines for automated testing, linting, and zero-downtime releases.',
      ],
      skills: ['Terraform', 'FastAPI', 'Python', 'Docker Compose', 'GitHub Actions', 'AWS', 'JWT', 'RBAC'],
    },
    {
      id: 'parul-university',
      role: 'B.Tech Student in Computer Science & Engineering',
      company: 'Parul University',
      location: 'Vadodara, Gujarat',
      period: 'Sept 2023 — Present',
      type: 'Education',
      description: 'Pursuing B.Tech CSE with strong focus on Cloud Computing, Network Security, DevOps automation, and Systems Architecture.',
      achievements: [
        'Maintained an academic CGPA of 8.56 / 10 across core engineering coursework.',
        'Earned AWS Certified Cloud Practitioner and AWS Academy Cloud Foundations certifications.',
        'Secured Top 45 rank out of 720+ competing teams at Vadodara Hackathon 6.0 (2025).',
        'Solved 200+ algorithmic and data structures problems on LeetCode.',
      ],
      skills: ['Computer Networks', 'Network Security', 'Cloud Computing', 'DSA', 'OS', 'DBMS', 'Linux'],
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
