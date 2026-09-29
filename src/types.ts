export interface SkillItem {
  id: string;
  number: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  technologies: string[];
  highlights: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  role: string;
  year: string;
  description: string;
  tags: string[];
  metrics: string;
  linkText: string;
  url?: string;
}

export interface UserProfile {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  avatarUrl: string;
  status: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
  };
  skills: SkillItem[];
}
