export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  github: string;
}

export interface ProfessionalSummary {
  content: string;
}

export interface TechnicalSkills {
  languages: string;
  frameworks: string;
  tools: string;
  methodologies: string;
  certifications: string;
}

export interface Experience {
  company: string;
  location: string;
  position: string;
  duration: string;
  technologies: string;
  achievements: string[];
}

export interface Project {
  name: string;
  duration: string;
  technologies: string;
  description: string[];
  url?: string;
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  professionalSummary: ProfessionalSummary;
  technicalSkills: TechnicalSkills;
  experience: Experience[];
  projects: Project[];
  education: Education[];
}

export interface CoverLetterData {
  personalInfo: PersonalInfo;
  recipientInfo: {
    hiringManager: string;
    company: string;
    position: string;
    date: string;
  };
  content: {
    opening: string;
    body: string;
    closing: string;
  };
}