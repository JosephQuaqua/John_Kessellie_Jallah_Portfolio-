export interface Profile {
  id: string;
  full_name: string;
  professional_title: string;
  hero_tagline: string;
  short_bio: string;
  full_bio: string;
  profile_image_url: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  linkedin_url: string | null;
  other_links: { label: string; url: string }[];
  cv_url: string | null;
  updated_at: string;
}

export interface Experience {
  id: string;
  organization: string;
  position: string;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  is_current: boolean;
  description: string | null;
  responsibilities: string | null;
  organization_logo: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Education {
  id: string;
  institution: string;
  institution_logo: string | null;
  degree: string;
  field_of_study: string | null;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  cgpa: string | null;
  thesis: string | null;
  relevant_courses: string | null;
  description: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string | null;
  journal: string | null;
  publication_date: string | null;
  publication_year: number | null;
  doi: string | null;
  publication_url: string | null;
  abstract: string | null;
  category: string | null;
  publication_image: string | null;
  publication_file: string | null;
  is_featured: boolean;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string | null;
  completion_date: string | null;
  credential_id: string | null;
  credential_url: string | null;
  certificate_image: string | null;
  certificate_file: string | null;
  description: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface LeadershipExperience {
  id: string;
  organization: string;
  position: string;
  start_date: string | null;
  end_date: string | null;
  description: string | null;
  image_url: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Award {
  id: string;
  title: string;
  organization: string | null;
  award_date: string | null;
  description: string | null;
  media_url: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  icon: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ResearchInterest {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: string;
  created_at: string;
}

export interface MediaItem {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string | null;
  file_size: number | null;
  storage_path: string | null;
  uploaded_at: string;
}

export interface SiteSettings {
  id: string;
  site_title: string;
  site_description: string;
  footer_text: string | null;
  analytics_id: string | null;
  updated_at: string;
}

export type TableName =
  | 'profiles'
  | 'experiences'
  | 'education'
  | 'publications'
  | 'certifications'
  | 'leadership_experiences'
  | 'awards'
  | 'skills'
  | 'research_interests'
  | 'contact_messages'
  | 'media_library'
  | 'site_settings';
