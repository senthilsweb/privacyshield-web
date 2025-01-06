/ src/app/resume/[slug]/types.ts
export interface Profile {
  network: string;
  icon: string;
  username: string;
  url: string;
}

export interface Location {
  address: string;
  postalCode: string;
  city: string;
  state: string;
  countryCode: string;
  full_address: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  summary: string;
}

export interface Certification {
  name: string;
  date: string;
  issuer: string;
  url: string;
}

export interface TechnicalCompetency {
  name: string;
  icon: string;
}

export interface ResumeData {
  basics: {
    name: string;
    email: string;
    website: string;
    picture: string;
    phone: string;
    summary: string;
    location: Location;
    profiles: Profile[];
  };
  professionalSynopsis: string[];
  coreCompetencies: string[];
  technicalCompetencies: TechnicalCompetency[];
  notableAccomplishments: string[];
  certifications: Certification[];
  work: WorkExperience[];
}

export interface ResumeParams {
  slug: string;
}