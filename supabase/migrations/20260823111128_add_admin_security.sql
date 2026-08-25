-- =====================================================
-- SECURE ADMIN AUTHORIZATION
-- =====================================================

-- Create a table containing users authorized to manage
-- the portfolio and CMS.
CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;


-- =====================================================
-- HELPER FUNCTION: CHECK ADMIN STATUS
-- =====================================================

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE user_id = auth.uid()
  );
$$;


-- =====================================================
-- ADMIN_USERS POLICIES
-- =====================================================

-- A normal user cannot view the list of administrators.
-- Only an administrator can view it.
CREATE POLICY "admins_can_view_admin_users"
ON public.admin_users
FOR SELECT
TO authenticated
USING (public.is_admin());


-- =====================================================
-- REMOVE INSECURE POLICIES
-- =====================================================

-- profiles
DROP POLICY IF EXISTS "auth_insert_profiles" ON public.profiles;
DROP POLICY IF EXISTS "auth_update_profiles" ON public.profiles;
DROP POLICY IF EXISTS "auth_delete_profiles" ON public.profiles;

-- experiences
DROP POLICY IF EXISTS "auth_insert_experiences" ON public.experiences;
DROP POLICY IF EXISTS "auth_update_experiences" ON public.experiences;
DROP POLICY IF EXISTS "auth_delete_experiences" ON public.experiences;

-- education
DROP POLICY IF EXISTS "auth_insert_education" ON public.education;
DROP POLICY IF EXISTS "auth_update_education" ON public.education;
DROP POLICY IF EXISTS "auth_delete_education" ON public.education;

-- publications
DROP POLICY IF EXISTS "auth_insert_publications" ON public.publications;
DROP POLICY IF EXISTS "auth_update_publications" ON public.publications;
DROP POLICY IF EXISTS "auth_delete_publications" ON public.publications;

-- certifications
DROP POLICY IF EXISTS "auth_insert_certifications" ON public.certifications;
DROP POLICY IF EXISTS "auth_update_certifications" ON public.certifications;
DROP POLICY IF EXISTS "auth_delete_certifications" ON public.certifications;

-- leadership
DROP POLICY IF EXISTS "auth_insert_leadership" ON public.leadership_experiences;
DROP POLICY IF EXISTS "auth_update_leadership" ON public.leadership_experiences;
DROP POLICY IF EXISTS "auth_delete_leadership" ON public.leadership_experiences;

-- awards
DROP POLICY IF EXISTS "auth_insert_awards" ON public.awards;
DROP POLICY IF EXISTS "auth_update_awards" ON public.awards;
DROP POLICY IF EXISTS "auth_delete_awards" ON public.awards;

-- skills
DROP POLICY IF EXISTS "auth_insert_skills" ON public.skills;
DROP POLICY IF EXISTS "auth_update_skills" ON public.skills;
DROP POLICY IF EXISTS "auth_delete_skills" ON public.skills;

-- research interests
DROP POLICY IF EXISTS "auth_insert_research_interests" ON public.research_interests;
DROP POLICY IF EXISTS "auth_update_research_interests" ON public.research_interests;
DROP POLICY IF EXISTS "auth_delete_research_interests" ON public.research_interests;

-- contact messages
DROP POLICY IF EXISTS "auth_select_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "auth_update_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "auth_delete_messages" ON public.contact_messages;

-- media library
DROP POLICY IF EXISTS "auth_select_media" ON public.media_library;
DROP POLICY IF EXISTS "auth_insert_media" ON public.media_library;
DROP POLICY IF EXISTS "auth_update_media" ON public.media_library;
DROP POLICY IF EXISTS "auth_delete_media" ON public.media_library;

-- site settings
DROP POLICY IF EXISTS "auth_insert_site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "auth_update_site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "auth_delete_site_settings" ON public.site_settings;


-- =====================================================
-- ADMIN CRUD POLICIES
-- =====================================================

-- PROFILES
CREATE POLICY "admins_manage_profiles"
ON public.profiles
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- EXPERIENCES
CREATE POLICY "admins_manage_experiences"
ON public.experiences
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- EDUCATION
CREATE POLICY "admins_manage_education"
ON public.education
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- PUBLICATIONS
CREATE POLICY "admins_manage_publications"
ON public.publications
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- CERTIFICATIONS
CREATE POLICY "admins_manage_certifications"
ON public.certifications
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- LEADERSHIP EXPERIENCES
CREATE POLICY "admins_manage_leadership"
ON public.leadership_experiences
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- AWARDS
CREATE POLICY "admins_manage_awards"
ON public.awards
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- SKILLS
CREATE POLICY "admins_manage_skills"
ON public.skills
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- RESEARCH INTERESTS
CREATE POLICY "admins_manage_research_interests"
ON public.research_interests
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- CONTACT MESSAGES
CREATE POLICY "admins_manage_contact_messages"
ON public.contact_messages
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- MEDIA LIBRARY
CREATE POLICY "admins_manage_media_library"
ON public.media_library
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- SITE SETTINGS
CREATE POLICY "admins_manage_site_settings"
ON public.site_settings
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());