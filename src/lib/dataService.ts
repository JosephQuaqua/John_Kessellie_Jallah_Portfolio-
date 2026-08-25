import { supabase } from './supabase';
import type {
  Profile,
  Experience,
  Education,
  Publication,
  Certification,
  LeadershipExperience,
  Award,
  Skill,
  ResearchInterest,
  ContactMessage,
  MediaItem,
  SiteSettings,
} from '@/types/database';

// ============ Profile ============
export async function getProfile(): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data as Profile | null;
}

export async function updateProfile(id: string, updates: Partial<Profile>): Promise<Profile> {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Profile;
}

// ============ Site Settings ============
export async function getSiteSettings(): Promise<SiteSettings | null> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data as SiteSettings | null;
}

export async function updateSiteSettings(id: string, updates: Partial<SiteSettings>): Promise<SiteSettings> {
  const { data, error } = await supabase
    .from('site_settings')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as SiteSettings;
}

// ============ Generic fetch (published only for public) ============
async function fetchPublished<T>(table: string, orderBy = 'display_order'): Promise<T[]> {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq('is_published', true)
    .order(orderBy, { ascending: true });
  if (error) throw error;
  return (data || []) as T[];
}

export const fetchExperiences = () => fetchPublished<Experience>('experiences');
export const fetchEducation = () => fetchPublished<Education>('education');
export const fetchPublications = () => fetchPublished<Publication>('publications');
export const fetchCertifications = () => fetchPublished<Certification>('certifications');
export const fetchLeadership = () => fetchPublished<LeadershipExperience>('leadership_experiences');
export const fetchAwards = () => fetchPublished<Award>('awards');
export const fetchSkills = () => fetchPublished<Skill>('skills');
export const fetchResearchInterests = () => fetchPublished<ResearchInterest>('research_interests');

export async function fetchFeaturedPublications(): Promise<Publication[]> {
  const { data, error } = await supabase
    .from('publications')
    .select('*')
    .eq('is_published', true)
    .eq('is_featured', true)
    .order('display_order', { ascending: true });
  if (error) throw error;
  return (data || []) as Publication[];
}

export async function fetchPublicationById(id: string): Promise<Publication | null> {
  const { data, error } = await supabase
    .from('publications')
    .select('*')
    .eq('id', id)
    .eq('is_published', true)
    .maybeSingle();
  if (error) throw error;
  return data as Publication | null;
}

// ============ Contact Messages (public insert) ============
export async function submitMessage(msg: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<void> {
  const { error } = await supabase.from('contact_messages').insert(msg);
  if (error) throw error;
}

// ============ Admin CRUD (all rows) ============
async function fetchAll<T>(table: string, orderBy = 'display_order'): Promise<T[]> {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .order(orderBy, { ascending: true });
  if (error) throw error;
  return (data || []) as T[];
}

export const adminFetchExperiences = () => fetchAll<Experience>('experiences');
export const adminFetchEducation = () => fetchAll<Education>('education');
export const adminFetchPublications = () => fetchAll<Publication>('publications');
export const adminFetchCertifications = () => fetchAll<Certification>('certifications');
export const adminFetchLeadership = () => fetchAll<LeadershipExperience>('leadership_experiences');
export const adminFetchAwards = () => fetchAll<Award>('awards');
export const adminFetchSkills = () => fetchAll<Skill>('skills');
export const adminFetchResearchInterests = () => fetchAll<ResearchInterest>('research_interests');
export const adminFetchMessages = () => fetchAll<ContactMessage>('contact_messages', 'created_at');
export const adminFetchMedia = () => fetchAll<MediaItem>('media_library', 'uploaded_at');

async function insertRow<T>(table: string, row: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.from(table).insert(row).select().single();
  if (error) throw error;
  return data as T;
}

async function updateRow<T>(table: string, id: string, updates: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.from(table).update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data as T;
}

async function deleteRow(table: string, id: string): Promise<void> {
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) throw error;
}

export const crud = {
  insert: insertRow,
  update: updateRow,
  delete: deleteRow,
};


export async function submitContactMessage(data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}) {
  const { error } = await supabase
    .from('contact_messages')
    .insert([
      {
        name: data.name,
        email: data.email,
        subject: data.subject || null,
        message: data.message,
      },
    ]);

  if (error) {
    throw error;
  }
}