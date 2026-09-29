import avatarImage from '../assets/images/avatar_etornam_portrait_1790644079901.jpg';
import { UserProfile, ProjectItem } from '../types';

export const DEFAULT_PROFILE: UserProfile = {
  name: 'Etornam Sepenoo',
  role: 'Full-Stack Software Engineer & UI Architect',
  tagline: 'Crafting resilient web architectures and clean digital experiences.',
  bio: 'Creative Software Engineer & Product Designer with a focus on building performant, accessible digital products and refined web interfaces. Driven by craft, functional minimalism, and high-impact engineering.',
  location: 'Accra & Remote (UTC / GMT)',
  email: 'etornamsepenoo8@gmail.com',
  avatarUrl: avatarImage,
  status: 'Available for freelance & full-time opportunities',
  socials: {
    github: 'https://github.com/etornam-sepenoo',
    linkedin: 'https://linkedin.com/in/etornam-sepenoo',
    twitter: 'https://x.com/etornamsepenoo',
  },
  skills: [
    {
      id: 'skill-1',
      number: '01',
      name: 'Frontend & Creative Web Engineering',
      category: 'Interface & Client-Side',
      shortDescription: 'Modern, reactive web interfaces engineered with strict type safety, responsive layouts, and zero-latency interactions.',
      fullDescription: 'Deep expertise in modern JavaScript/TypeScript ecosystems, building accessible component architectures, component state management, fluid animations, and mobile-first responsive interfaces optimized for Core Web Vitals.',
      technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite & Next.js', 'HTML5 / Modern CSS', 'Motion / Canvas'],
      highlights: [
        'Responsive layout engineering across 320px mobile to 4K ultrawide displays',
        'Sub-100ms interaction latency with micro-interactions and smooth curves',
        'Strict WCAG 2.1 AA accessibility compliance and keyboard navigation',
        'Performance optimization achieving 95+ Lighthouse audit metrics'
      ]
    },
    {
      id: 'skill-2',
      number: '02',
      name: 'UI/UX & Design Systems Architecture',
      category: 'Product Design & Systematics',
      shortDescription: 'Crafting coherent, mathematically calibrated design systems, intuitive user workflows, and high-contrast dark themes.',
      fullDescription: 'Bridging the divide between product strategy and engineering execution. Designing token-based design systems, modular component libraries, typographic scales, and clean ergonomics that scale seamlessly across products.',
      technologies: ['Design Tokens', 'Figma to Code', 'Information Architecture', 'Ergonomic UX', 'Typographic Hierarchy', 'Dark Mode Optics'],
      highlights: [
        'Tokenized color palettes respecting the 60-30-10 distribution rule',
        'Accessible touch target geometries exceeding 44px on mobile viewports',
        'Design tokens synchronizing typography, spacing, and elevation scales',
        'Rapid interactive prototyping and usability testing workflows'
      ]
    },
    {
      id: 'skill-3',
      number: '03',
      name: 'Backend & Cloud Infrastructure',
      category: 'Server-Side & APIs',
      shortDescription: 'Robust server-side services, relational database architecture, secure RESTful APIs, and cloud container deployments.',
      fullDescription: 'Developing secure, scalable backend services and microservices. Experienced in REST and GraphQL API design, database modeling, authentication systems, cloud deployment pipelines, and resilient performance under load.',
      technologies: ['Node.js & Express', 'PostgreSQL / SQL', 'REST & GraphQL', 'Docker & Cloud Run', 'Authentication & RBAC', 'CI/CD Pipelines'],
      highlights: [
        'Secure API routes with rate-limiting, CORS, and role-based access control',
        'Normalized relational schemas and indexed queries for sub-second lookups',
        'Cloud-native containerized deployments with horizontal auto-scaling',
        'Reliable data validation and strict error recovery pipelines'
      ]
    }
  ]
};

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Aura Studio Platform',
    role: 'Lead Frontend Engineer',
    year: '2026',
    description: 'High-performance creative portfolio and publishing system with real-time media rendering, dark mode ergonomics, and sub-100ms page transitions.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    metrics: '99/100 Core Web Vitals · 40k+ Active Readers',
    linkText: 'Explore System',
    url: '#skills'
  },
  {
    id: 'proj-2',
    title: 'Pulse Design System',
    role: 'UI Architect & Designer',
    year: '2025',
    description: 'Enterprise design system containing 60+ modular, accessible components with tokenized color palettes, dark theme contrast compensation, and zero-pill discipline.',
    tags: ['Design Systems', 'WCAG AA', 'Figma', 'Tokens'],
    metrics: '60+ Reusable Components · 4 Product Teams',
    linkText: 'View Architecture',
    url: '#skills'
  },
  {
    id: 'proj-3',
    title: 'Nimbus Cloud API Gateway',
    role: 'Full-Stack Developer',
    year: '2025',
    description: 'Lightweight distributed API proxy and telemetry dispatcher engineered for resilient microservice orchestration, token authentication, and data caching.',
    tags: ['Node.js', 'PostgreSQL', 'Express', 'Docker'],
    metrics: 'Sub-15ms Latency · 99.98% Service Uptime',
    linkText: 'Review Infrastructure',
    url: '#skills'
  }
];

export function generatePlainHtmlCssBundle(profile: UserProfile): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${profile.name} — Personal Website</title>
  <meta name="description" content="${profile.bio.replace(/"/g, '&quot;')}">
  <style>
    /* CSS Reset & Dark Mode Theme */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    :root {
      --bg: #09090b;
      --card-bg: #121215;
      --border: #27272a;
      --text: #f4f4f5;
      --text-muted: #a1a1aa;
      --accent: #f59e0b;
      --accent-hover: #d97706;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    .container {
      max-width: 1040px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    /* Header Navigation */
    header {
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      background: rgba(9, 9, 11, 0.95);
      backdrop-filter: blur(8px);
      z-index: 50;
    }
    .nav-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64px;
    }
    .brand {
      font-size: 1.15rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
    .nav-links {
      display: flex;
      gap: 1.5rem;
      font-size: 0.9rem;
      color: var(--text-muted);
    }
    .nav-links a:hover {
      color: var(--text);
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.55rem 1.25rem;
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
      white-space: nowrap;
    }
    .btn-primary {
      background-color: var(--text);
      color: var(--bg);
      border: 1px solid var(--text);
    }
    .btn-primary:hover {
      background-color: #e4e4e7;
    }
    .btn-secondary {
      background-color: transparent;
      color: var(--text);
      border: 1px solid var(--border);
    }
    .btn-secondary:hover {
      background-color: #18181b;
    }

    /* Hero Section */
    .hero {
      padding: 5rem 0 3.5rem;
      display: grid;
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
    @media (min-width: 768px) {
      .hero {
        grid-template-columns: 1fr auto;
        align-items: center;
      }
    }
    .hero-kicker {
      font-size: 0.85rem;
      color: var(--accent);
      font-weight: 600;
      margin-bottom: 0.75rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .hero-kicker-dot {
      width: 8px;
      height: 8px;
      background-color: #10b981;
      border-radius: 50%;
      display: inline-block;
    }
    .hero-title {
      font-size: 2.75rem;
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -0.03em;
      margin-bottom: 1rem;
    }
    .hero-role {
      font-size: 1.25rem;
      color: var(--text-muted);
      margin-bottom: 1.25rem;
      font-weight: 500;
    }
    .hero-bio {
      font-size: 1.05rem;
      color: #d4d4d8;
      max-width: 620px;
      margin-bottom: 2rem;
    }
    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }
    .avatar-box {
      width: 160px;
      height: 160px;
      border-radius: 16px;
      border: 1px solid var(--border);
      overflow: hidden;
      background: #18181b;
    }
    .avatar-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Sections */
    section {
      padding: 4rem 0;
      border-top: 1px solid var(--border);
    }
    .section-header {
      margin-bottom: 2.5rem;
    }
    .section-kicker {
      font-size: 0.8rem;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    .section-title {
      font-size: 1.85rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    /* Skills Grid */
    .skills-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    @media (min-width: 768px) {
      .skills-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    .skill-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .skill-num {
      font-size: 0.85rem;
      font-family: monospace;
      color: var(--accent);
      margin-bottom: 0.75rem;
    }
    .skill-name {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
      line-height: 1.3;
    }
    .skill-desc {
      font-size: 0.95rem;
      color: var(--text-muted);
      margin-bottom: 1.5rem;
      flex-grow: 1;
    }
    .tech-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      font-size: 0.8rem;
      color: #d4d4d8;
    }
    .tech-item {
      color: var(--text-muted);
    }
    .tech-item:not(:last-child)::after {
      content: " ·";
      color: #52525b;
    }

    /* Contact Section */
    .contact-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 3rem 2rem;
      text-align: center;
      max-width: 720px;
      margin: 0 auto;
    }
    .contact-title {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }
    .contact-text {
      color: var(--text-muted);
      margin-bottom: 2rem;
      font-size: 1.05rem;
    }
    .contact-email {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text);
      display: block;
      margin-bottom: 1.5rem;
      text-decoration: underline;
      text-underline-offset: 4px;
    }

    /* Footer */
    footer {
      border-top: 1px solid var(--border);
      padding: 2.5rem 0;
      text-align: center;
      font-size: 0.85rem;
      color: var(--text-muted);
    }
    .footer-content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
      justify-content: space-between;
    }
    @media (min-width: 640px) {
      .footer-content {
        flex-direction: row;
      }
    }
  </style>
</head>
<body>

  <!-- Top Navigation (3-zone contract) -->
  <header>
    <div class="container nav-wrap">
      <a href="#" class="brand">${profile.name}</a>
      <nav class="nav-links">
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
      </nav>
      <div>
        <a href="mailto:${profile.email}" class="btn btn-primary">Contact Me</a>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <main class="container">
    <section class="hero" style="border-top: none;">
      <div>
        <div class="hero-kicker">
          <span class="hero-kicker-dot"></span>
          <span>${profile.status}</span>
        </div>
        <h1 class="hero-title">${profile.name}</h1>
        <p class="hero-role">${profile.role}</p>
        <p class="hero-bio">${profile.bio}</p>
        <div class="hero-actions">
          <a href="mailto:${profile.email}" class="btn btn-primary">Get in Touch</a>
          <a href="#skills" class="btn btn-secondary">Explore 3 Core Skills</a>
        </div>
      </div>
      <div class="avatar-box">
        <img src="${profile.avatarUrl}" alt="${profile.name}">
      </div>
    </section>

    <!-- About Section -->
    <section id="about">
      <div class="section-header">
        <div class="section-kicker">Background</div>
        <h2 class="section-title">About Me</h2>
      </div>
      <p style="font-size: 1.1rem; color: #d4d4d8; max-width: 800px; margin-bottom: 1.5rem;">
        ${profile.bio}
      </p>
      <p style="color: var(--text-muted); max-width: 800px;">
        Located in ${profile.location}. I work with product teams, founders, and enterprises to develop intuitive interfaces and scalable software systems with precision and care.
      </p>
    </section>

    <!-- Three Skills Section -->
    <section id="skills">
      <div class="section-header">
        <div class="section-kicker">Core Competencies</div>
        <h2 class="section-title">Three Primary Skills</h2>
      </div>
      <div class="skills-grid">
        ${profile.skills.map(s => `
        <div class="skill-card">
          <div>
            <div class="skill-num">${s.number}</div>
            <h3 class="skill-name">${s.name}</h3>
            <p class="skill-desc">${s.shortDescription}</p>
          </div>
          <div class="tech-list">
            ${s.technologies.map(t => `<span class="tech-item">${t}</span>`).join('')}
          </div>
        </div>
        `).join('')}
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact">
      <div class="contact-card">
        <h2 class="contact-title">Let's Connect</h2>
        <p class="contact-text">
          Have an upcoming project, freelance inquiry, or team opening? Reach out directly.
        </p>
        <a href="mailto:${profile.email}" class="contact-email">${profile.email}</a>
        <div>
          <a href="mailto:${profile.email}" class="btn btn-primary">Send Email</a>
        </div>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer>
    <div class="container footer-content">
      <div>&copy; 2026 ${profile.name}. All rights reserved.</div>
      <div>Designed with modern plain HTML & CSS standards.</div>
    </div>
  </footer>

</body>
</html>`;
}
