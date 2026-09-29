export interface ProductItem {
  id: string;
  name: string;
  price: number;
  category: string;
  shortDescription: string;
  fullDescription?: string;
  imageUrl: string;
  inStock: boolean;
  unit?: string;
  badge?: string;
}

export interface BusinessConfig {
  name: string;
  tagline: string;
  description: string;
  whatsappNumber: string; // e.g. "233540000000" or "1234567890"
  currency: 'USD' | 'GHS' | 'GBP' | 'EUR';
  currencyRate: number; // multiplier relative to USD
  currencySymbol: string;
  deliveryNotice: string;
  operatingHours: string;
}

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
