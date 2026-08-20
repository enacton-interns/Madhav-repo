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
    phone: '+91 8758249503',
    education: {
      degree: 'B.Tech – Computer Science & Engineering',
      university: 'Parul University, Vadodara',
      period: 'Sept 2023 – Present',
      cgpa: '8.56 / 10',
      coursework: ['Computer Networks', 'Network Security', 'Cloud Computing', 'DSA', 'OS', 'DBMS'],
    },
    certifications: [
      {
        name: 'AWS Certified Cloud Practitioner',
        issuer: 'Amazon Web Services',
        badgeUrl: 'https://www.credly.com/badges/f82a3171-f117-4589-a6be-115c1dc1fecf/public_url',
      },
      {
        name: 'AWS Academy Cloud Foundations',
        issuer: 'Amazon Web Services',
        badgeUrl: 'https://www.credly.com/badges/91946810-bb0c-4cfa-babc-398a2bf80334/public_url',
      },
    ],
    achievements: [
      {
        title: 'Selected in Top 45 teams out of 720+ teams at Vadodara Hackathon 6.0 (2025)',
        url: '',
      },
      {
        title: 'Solved 200+ questions on LeetCode',
        url: 'https://leetcode.com/u/Madhav_Kotak/',
      },
    ],
    resumeUrl: '/Madhav_Kotak_Resume.pdf',
    socials: {
      github: 'https://github.com/MadhavKotak-24/',
      linkedin: 'https://www.linkedin.com/in/madhav-d-kotak/',
      email: 'madhavkotak124@gmail.com',
      leetcode: 'https://leetcode.com/u/Madhav_Kotak/',
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
      title: 'DevOps & Tools',
      iconName: 'Workflow',
      skills: [
        { name: 'Docker', level: 90, highlight: true },
        { name: 'Kubernetes', level: 85, highlight: true },
        { name: 'Terraform', level: 88, highlight: true },
        { name: 'GitHub Actions', level: 90, highlight: true },
        { name: 'Git', level: 90 },
        { name: 'Linux', level: 90, highlight: true },
      ],
    },
    {
      title: 'Networking',
      iconName: 'Network',
      skills: [
        { name: 'TCP/IP', level: 88, highlight: true },
        { name: 'OSI Model', level: 88 },
        { name: 'Subnetting & CIDR', level: 88, highlight: true },
        { name: 'DNS', level: 85 },
        { name: 'NAT', level: 85 },
        { name: 'Security Groups', level: 90, highlight: true },
        { name: 'NACLs', level: 88 },
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
      title: 'Database',
      iconName: 'Database',
      skills: [
        { name: 'PostgreSQL', level: 88, highlight: true },
        { name: 'MongoDB', level: 82, highlight: true },
      ],
    },
  ] as SkillCategory[],

  projects: [
    {
      id: 'multi-cloud-governance',
      title: 'Multi-Cloud Governance Platform',
      subtitle: 'Jan 2026 – March 2026',
      description: 'Engineered a containerized deployment governance platform that automates configuration approvals and compliance validation, reducing manual validation effort by ~70–80% using a policy-as-code YAML engine.',
      fullDescription: 'Engineered a containerized deployment governance platform that automates configuration approvals and compliance validation. Designed declarative Terraform IaC blueprints for cloud resource provisioning with automated dry-runs (terraform plan); built a state-machine deployment control plane with complete event auditing and rollback support. Orchestrated a multi-service container environment using Docker Compose; built a FastAPI control plane with JWT auth and RBAC to manage deployment configurations across tenant boundaries. Integrated GitHub Actions CI/CD pipeline achieving zero-downtime releases.',
      category: 'Full Stack',
      tags: ['Python', 'FastAPI', 'Terraform', 'Docker', 'GitHub Actions', 'AWS', 'JWT', 'PostgreSQL'],
      featured: true,
      metrics: 'Reduced manual validation effort by ~70–80%.',
      githubUrl: 'https://github.com/MadhavKotak-24/Multi-Cloud-Governance-Platform',
      liveUrl: 'https://multi-cloud-governance-platform-1.onrender.com/',
      architectureHighlights: [
        'Engineered a containerized deployment governance platform with policy-as-code YAML validation engine reducing manual effort by ~70–80%.',
        'Designed declarative Terraform IaC blueprints for cloud resource provisioning with automated dry-runs (terraform plan) and state-machine rollback support.',
        'Orchestrated multi-service Docker Compose environment with FastAPI control plane, JWT authentication, and RBAC tenant isolation.',
        'Integrated GitHub Actions CI/CD pipeline for automated testing, linting, and zero-downtime deployment releases.',
      ],
    },
    {
      id: 'cloud-sentinel',
      title: 'CloudSentinel — CSPM & DevSecOps Platform',
      subtitle: 'April 2026 – May 2026',
      description: 'Developed live AWS CSPM auditor evaluating VPC Security Group, IAM, and S3 policies against CIS benchmarks using Boto3, reducing network compliance reporting time by 85% and catching 100% of critical security issues.',
      fullDescription: 'Developed a live AWS CSPM auditor using Boto3 to evaluate VPC Security Group ingress/egress rules, IAM privilege escalation vectors, and S3 public policies against CIS benchmarks. Engineered Shift-Left DevSecOps workflow integrating Checkov and Trivy to automate pre-deployment static analysis of Terraform network configurations and container vulnerability screening, catching 100% of critical issues. Built a Terraform drift comparator for real-time diff timelines, reducing reconciliation time by 90%. Migrated the container stack to a local Kubernetes (Kind) cluster with PVCs, ConfigMaps, and RBAC policies.',
      category: 'Full Stack',
      tags: ['Python', 'Flask', 'AWS Boto3', 'Checkov', 'Trivy', 'Docker', 'Kubernetes', 'JWT', 'PostgreSQL', 'Chart.js'],
      featured: true,
      metrics: 'Reduced network compliance reporting time by 85%, catching 100% of critical issues.',
      githubUrl: 'https://github.com/MadhavKotak-24/CloudSentinel',
      liveUrl: 'https://cloudsentinel-frontend.netlify.app/index.html',
      architectureHighlights: [
        'Developed live AWS CSPM auditor evaluating VPC, IAM, and S3 policies against CIS benchmarks via Boto3, reducing reporting time by 85%.',
        'Engineered Shift-Left DevSecOps workflow integrating Checkov and Trivy for Terraform static analysis and container vulnerability scanning.',
        'Built Terraform drift comparator evaluating expected network state against live cloud assets, reducing reconciliation time by 90%.',
        'Migrated container stack to local Kubernetes (Kind) cluster configuring PVCs, ConfigMaps, and RBAC policies for secure in-cluster scanning.',
      ],
    },
  ] as Project[],

  experience: [
    {
      id: 'enacton-technologies',
      role: 'DevOps Intern',
      company: 'Enacton Technologies Pvt. Ltd.',
      location: 'Vadodara, India',
      period: 'July 2026 — Present',
      type: 'Internship',
      description: 'Gaining hands-on exposure to production infrastructure management across DigitalOcean, Hetzner, Contabo, AWS, and GCP.',
      achievements: [
        'Gaining hands-on exposure to production infrastructure management across DigitalOcean, Hetzner, Contabo, AWS, and GCP.',
        'Supporting affiliate and SaaS platforms with Nginx, Docker, Cloudflare, and Ansible.',
        'Managing multi-cloud production environments and containerized deployment workflows.',
      ],
      skills: ['DigitalOcean', 'Hetzner', 'Contabo', 'AWS', 'GCP', 'Nginx', 'Docker', 'Cloudflare', 'Ansible'],
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
        'Selected in Top 45 teams out of 720+ competing teams at Vadodara Hackathon 6.0 (2025).',
        'Solved 200+ questions on LeetCode.',
      ],
      skills: ['Computer Networks', 'Network Security', 'Cloud Computing', 'DSA', 'OS', 'DBMS', 'Linux'],
    },
  ] as ExperienceItem[],

  pillars: [
    {
      id: 'pillar-web',
      title: 'Cloud & Infrastructure',
      description: 'Building multi-cloud governance platforms, declarative IaC with Terraform, and automated AWS cloud resource provisioning.',
      icon: 'Globe',
      stats: 'AWS Certified Practitioner & Foundations',
      technologies: ['AWS EC2', 'AWS S3', 'AWS VPC', 'Terraform', 'IAM'],
    },
    {
      id: 'pillar-systems',
      title: 'DevOps & Containers',
      description: 'Designing automated CI/CD pipelines with GitHub Actions, containerizing applications with Docker, and orchestrating Kubernetes clusters.',
      icon: 'Cpu',
      stats: 'Zero-downtime releases & local Kind K8s clusters',
      technologies: ['Docker', 'Kubernetes', 'GitHub Actions', 'Docker Compose', 'Git'],
    },
    {
      id: 'pillar-architecture',
      title: 'DevSecOps & Compliance',
      description: 'Implementing Shift-Left DevSecOps static analysis with Checkov and Trivy, live CSPM Boto3 auditing against CIS benchmarks.',
      icon: 'Layers',
      stats: '85% faster compliance reporting & 100% issue catch',
      technologies: ['Checkov', 'Trivy', 'Boto3', 'CIS Benchmarks', 'JWT & RBAC'],
    },
    {
      id: 'pillar-cloud',
      title: 'Backend & APIs',
      description: 'Developing high-performance REST APIs in Python with FastAPI and Flask, integrated with PostgreSQL and MongoDB.',
      icon: 'Zap',
      stats: 'State-machine control plane & event auditing',
      technologies: ['Python', 'FastAPI', 'Flask', 'PostgreSQL', 'MongoDB'],
    },
  ] as EngineeringPillar[],
};
