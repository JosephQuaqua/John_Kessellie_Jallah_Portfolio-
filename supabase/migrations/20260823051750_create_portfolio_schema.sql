/*
# Create John Kessellie Jallah Portfolio + CMS schema

1. Overview
Complete database for a public professional portfolio and secure admin CMS.
Public visitors can read published content and submit contact messages.
Authenticated admin manages all content.

2. New Tables
- profiles, experiences, education, publications, certifications,
  leadership_experiences, awards, skills, research_interests,
  contact_messages, media_library, site_settings

3. Security — RLS
- Public (anon, authenticated): SELECT only published rows; INSERT contact_messages only.
- Authenticated admin: full CRUD on all tables.
- profiles & site_settings: public SELECT, authenticated CRUD.
*/

-- ============ profiles ============
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL DEFAULT 'John Kessellie Jallah',
  professional_title text NOT NULL DEFAULT 'Public Health Professional',
  hero_tagline text NOT NULL DEFAULT 'Health Researcher • Data-Driven • Community Impact',
  short_bio text NOT NULL DEFAULT 'Dedicated and results-driven Health Science graduate with experience in public health research, teaching, healthcare administration, and community health initiatives.',
  full_bio text NOT NULL DEFAULT '',
  profile_image_url text,
  email text,
  phone text,
  location text,
  linkedin_url text,
  other_links jsonb DEFAULT '[]'::jsonb,
  cv_url text,
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_profiles" ON profiles;
CREATE POLICY "public_read_profiles" ON profiles FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_profiles" ON profiles;
CREATE POLICY "auth_insert_profiles" ON profiles FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_profiles" ON profiles;
CREATE POLICY "auth_update_profiles" ON profiles FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_profiles" ON profiles;
CREATE POLICY "auth_delete_profiles" ON profiles FOR DELETE TO authenticated USING (true);

-- ============ experiences ============
CREATE TABLE IF NOT EXISTS experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization text NOT NULL,
  position text NOT NULL,
  location text,
  start_date text,
  end_date text,
  is_current boolean DEFAULT false,
  description text,
  responsibilities text,
  organization_logo text,
  display_order int DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_experiences" ON experiences;
CREATE POLICY "public_read_experiences" ON experiences FOR SELECT TO anon, authenticated USING (is_published);
DROP POLICY IF EXISTS "auth_insert_experiences" ON experiences;
CREATE POLICY "auth_insert_experiences" ON experiences FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_experiences" ON experiences;
CREATE POLICY "auth_update_experiences" ON experiences FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_experiences" ON experiences;
CREATE POLICY "auth_delete_experiences" ON experiences FOR DELETE TO authenticated USING (true);

-- ============ education ============
CREATE TABLE IF NOT EXISTS education (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution text NOT NULL,
  institution_logo text,
  degree text NOT NULL,
  field_of_study text,
  location text,
  start_date text,
  end_date text,
  cgpa text,
  thesis text,
  relevant_courses text,
  description text,
  display_order int DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_education" ON education;
CREATE POLICY "public_read_education" ON education FOR SELECT TO anon, authenticated USING (is_published);
DROP POLICY IF EXISTS "auth_insert_education" ON education;
CREATE POLICY "auth_insert_education" ON education FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_education" ON education;
CREATE POLICY "auth_update_education" ON education FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_education" ON education;
CREATE POLICY "auth_delete_education" ON education FOR DELETE TO authenticated USING (true);

-- ============ publications ============
CREATE TABLE IF NOT EXISTS publications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  authors text,
  journal text,
  publication_date text,
  publication_year int,
  doi text,
  publication_url text,
  abstract text,
  category text,
  publication_image text,
  publication_file text,
  is_featured boolean DEFAULT false,
  display_order int DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_publications" ON publications;
CREATE POLICY "public_read_publications" ON publications FOR SELECT TO anon, authenticated USING (is_published);
DROP POLICY IF EXISTS "auth_insert_publications" ON publications;
CREATE POLICY "auth_insert_publications" ON publications FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_publications" ON publications;
CREATE POLICY "auth_update_publications" ON publications FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_publications" ON publications;
CREATE POLICY "auth_delete_publications" ON publications FOR DELETE TO authenticated USING (true);

-- ============ certifications ============
CREATE TABLE IF NOT EXISTS certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  issuer text,
  completion_date text,
  credential_id text,
  credential_url text,
  certificate_image text,
  certificate_file text,
  description text,
  display_order int DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_certifications" ON certifications;
CREATE POLICY "public_read_certifications" ON certifications FOR SELECT TO anon, authenticated USING (is_published);
DROP POLICY IF EXISTS "auth_insert_certifications" ON certifications;
CREATE POLICY "auth_insert_certifications" ON certifications FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_certifications" ON certifications;
CREATE POLICY "auth_update_certifications" ON certifications FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_certifications" ON certifications;
CREATE POLICY "auth_delete_certifications" ON certifications FOR DELETE TO authenticated USING (true);

-- ============ leadership_experiences ============
CREATE TABLE IF NOT EXISTS leadership_experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization text NOT NULL,
  position text NOT NULL,
  start_date text,
  end_date text,
  description text,
  image_url text,
  display_order int DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE leadership_experiences ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_leadership" ON leadership_experiences;
CREATE POLICY "public_read_leadership" ON leadership_experiences FOR SELECT TO anon, authenticated USING (is_published);
DROP POLICY IF EXISTS "auth_insert_leadership" ON leadership_experiences;
CREATE POLICY "auth_insert_leadership" ON leadership_experiences FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_leadership" ON leadership_experiences;
CREATE POLICY "auth_update_leadership" ON leadership_experiences FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_leadership" ON leadership_experiences;
CREATE POLICY "auth_delete_leadership" ON leadership_experiences FOR DELETE TO authenticated USING (true);

-- ============ awards ============
CREATE TABLE IF NOT EXISTS awards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  organization text,
  award_date text,
  description text,
  media_url text,
  display_order int DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE awards ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_awards" ON awards;
CREATE POLICY "public_read_awards" ON awards FOR SELECT TO anon, authenticated USING (is_published);
DROP POLICY IF EXISTS "auth_insert_awards" ON awards;
CREATE POLICY "auth_insert_awards" ON awards FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_awards" ON awards;
CREATE POLICY "auth_update_awards" ON awards FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_awards" ON awards;
CREATE POLICY "auth_delete_awards" ON awards FOR DELETE TO authenticated USING (true);

-- ============ skills ============
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL DEFAULT 'Research & Data',
  icon text,
  display_order int DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_skills" ON skills;
CREATE POLICY "public_read_skills" ON skills FOR SELECT TO anon, authenticated USING (is_published);
DROP POLICY IF EXISTS "auth_insert_skills" ON skills;
CREATE POLICY "auth_insert_skills" ON skills FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_skills" ON skills;
CREATE POLICY "auth_update_skills" ON skills FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_skills" ON skills;
CREATE POLICY "auth_delete_skills" ON skills FOR DELETE TO authenticated USING (true);

-- ============ research_interests ============
CREATE TABLE IF NOT EXISTS research_interests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  icon text,
  display_order int DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE research_interests ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_research_interests" ON research_interests;
CREATE POLICY "public_read_research_interests" ON research_interests FOR SELECT TO anon, authenticated USING (is_published);
DROP POLICY IF EXISTS "auth_insert_research_interests" ON research_interests;
CREATE POLICY "auth_insert_research_interests" ON research_interests FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_research_interests" ON research_interests;
CREATE POLICY "auth_update_research_interests" ON research_interests FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_research_interests" ON research_interests;
CREATE POLICY "auth_delete_research_interests" ON research_interests FOR DELETE TO authenticated USING (true);

-- ============ contact_messages ============
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'unread',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_insert_messages" ON contact_messages;
CREATE POLICY "public_insert_messages" ON contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_select_messages" ON contact_messages;
CREATE POLICY "auth_select_messages" ON contact_messages FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "auth_update_messages" ON contact_messages;
CREATE POLICY "auth_update_messages" ON contact_messages FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_messages" ON contact_messages;
CREATE POLICY "auth_delete_messages" ON contact_messages FOR DELETE TO authenticated USING (true);

-- ============ media_library ============
CREATE TABLE IF NOT EXISTS media_library (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name text NOT NULL,
  file_url text NOT NULL,
  file_type text,
  file_size bigint,
  storage_path text,
  uploaded_at timestamptz DEFAULT now()
);
ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "auth_select_media" ON media_library;
CREATE POLICY "auth_select_media" ON media_library FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_media" ON media_library;
CREATE POLICY "auth_insert_media" ON media_library FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_media" ON media_library;
CREATE POLICY "auth_update_media" ON media_library FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_media" ON media_library;
CREATE POLICY "auth_delete_media" ON media_library FOR DELETE TO authenticated USING (true);

-- ============ site_settings ============
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_title text NOT NULL DEFAULT 'John Kessellie Jallah',
  site_description text NOT NULL DEFAULT 'Public Health Professional • Health Researcher • Data-Driven Healthcare Advocate',
  footer_text text,
  analytics_id text,
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_site_settings" ON site_settings;
CREATE POLICY "public_read_site_settings" ON site_settings FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_site_settings" ON site_settings;
CREATE POLICY "auth_insert_site_settings" ON site_settings FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "auth_update_site_settings" ON site_settings;
CREATE POLICY "auth_update_site_settings" ON site_settings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "auth_delete_site_settings" ON site_settings;
CREATE POLICY "auth_delete_site_settings" ON site_settings FOR DELETE TO authenticated USING (true);

-- ============ indexes ============
CREATE INDEX IF NOT EXISTS idx_experiences_display_order ON experiences(display_order);
CREATE INDEX IF NOT EXISTS idx_education_display_order ON education(display_order);
CREATE INDEX IF NOT EXISTS idx_publications_year ON publications(publication_year);
CREATE INDEX IF NOT EXISTS idx_publications_display_order ON publications(display_order);
CREATE INDEX IF NOT EXISTS idx_certifications_display_order ON certifications(display_order);
CREATE INDEX IF NOT EXISTS idx_leadership_display_order ON leadership_experiences(display_order);
CREATE INDEX IF NOT EXISTS idx_awards_display_order ON awards(display_order);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_research_interests_display_order ON research_interests(display_order);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created ON contact_messages(created_at DESC);

-- ============ updated_at triggers ============
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS tr_profiles_updated ON profiles;
CREATE TRIGGER tr_profiles_updated BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
DROP TRIGGER IF EXISTS tr_experiences_updated ON experiences;
CREATE TRIGGER tr_experiences_updated BEFORE UPDATE ON experiences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
DROP TRIGGER IF EXISTS tr_education_updated ON education;
CREATE TRIGGER tr_education_updated BEFORE UPDATE ON education FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
DROP TRIGGER IF EXISTS tr_publications_updated ON publications;
CREATE TRIGGER tr_publications_updated BEFORE UPDATE ON publications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
DROP TRIGGER IF EXISTS tr_certifications_updated ON certifications;
CREATE TRIGGER tr_certifications_updated BEFORE UPDATE ON certifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
DROP TRIGGER IF EXISTS tr_leadership_updated ON leadership_experiences;
CREATE TRIGGER tr_leadership_updated BEFORE UPDATE ON leadership_experiences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
DROP TRIGGER IF EXISTS tr_awards_updated ON awards;
CREATE TRIGGER tr_awards_updated BEFORE UPDATE ON awards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
DROP TRIGGER IF EXISTS tr_skills_updated ON skills;
CREATE TRIGGER tr_skills_updated BEFORE UPDATE ON skills FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
DROP TRIGGER IF EXISTS tr_research_interests_updated ON research_interests;
CREATE TRIGGER tr_research_interests_updated BEFORE UPDATE ON research_interests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
DROP TRIGGER IF EXISTS tr_site_settings_updated ON site_settings;
CREATE TRIGGER tr_site_settings_updated BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
